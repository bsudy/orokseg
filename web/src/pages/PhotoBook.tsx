import { useState } from "react";
import { Family } from "../gql/graphql";
import { useParams } from "react-router-dom";
import { GET_FAMILY } from "../graphql/queries";
import { useApolloClient } from "@apollo/client";
import { PhotoBookPage } from "../components/PhotoBookPage";

type PhotoBookParams = {
  famGrampsId: string;
};

export function PhotoBook() {
  const client = useApolloClient();

  const { famGrampsId } = useParams<PhotoBookParams>();

  const [families, setFamilies] = useState([] as Family[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null as unknown | null);

  const fetchFamily = async (families: Family[], famId: String) => {
    console.log("fetchFamily", famId);
    if (families.find((f) => f.grampsId === famId)) {
      return;
    }
    const res = await client.query({
      query: GET_FAMILY,
      variables: { grampsId: famId },
    });
    if (res.error) {
      console.error(res.error);
      throw res.error;
    }

    families.push(res.data.familyById);

    return res.data.familyById;
  };

  const goDown = async (family: Family, down: number, families: Family[]) => {
    if (down === 0) {
      return;
    }

    const newFamilies = [] as Family[];
    for (const child of family.children || []) {
      for (const family of child.person?.families || []) {
        const fam = await fetchFamily(families, family.grampsId);
        if (fam) {
          newFamilies.push(fam);
        }
      }
    }
    for (const fam of newFamilies) {
      await goDown(fam, down - 1, families);
    }
  };

  const goUp = async (family: Family, up: number, families: Family[]) => {
    if (up === 0) {
      return;
    }

    const newFamilies = [] as Family[];
    for (const parentFamily of [
      ...(family.father?.parentFamilies || []),
      ...(family.mother?.parentFamilies || []),
    ]) {
      const fam = await fetchFamily(families, parentFamily.grampsId);
      if (fam) {
        newFamilies.push(fam);
      }
    }
    for (const fam of newFamilies) {
      await goUp(fam, up - 1, families);
    }
  };

  const generate = async (
    famGrampsId: string | undefined,
    down: number,
    up: number,
  ) => {
    if (!famGrampsId) {
      console.error("No family id");
      return;
    }
    console.log("generate");
    try {
      setLoading(true);
      setError(null);
      setFamilies([]);
      const families = [] as Family[];
      const family = await fetchFamily(families, famGrampsId);
      if (!family) {
        throw new Error("Family not found");
      }
      await goDown(family, down, families);
      await goUp(family, up, families);

      setFamilies(families);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="photoBook-header">
        <h1>Photo Book</h1>
        <button onClick={() => generate(famGrampsId, 2, 2)}>Generate</button>
      </div>

      <div className="photoBook">
        {loading && <div>Loading...</div>}
        {!!error && <div>Error: {`${error}`}</div>}
        {families && <PhotoBookPage families={families} />}
      </div>
    </div>
  );
}
