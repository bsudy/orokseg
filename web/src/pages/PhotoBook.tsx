import { useState } from "react";
import { Family } from "../gql/graphql";
import { useParams } from "react-router-dom";
import { GET_FAMILY } from "../graphql/queries";
import { useApolloClient} from "@apollo/client";
import { PhotoBookPage } from "../components/PhotoBookPage";

type PhotoBookParams = {
  famGrampsId: string;
};

export function PhotoBook() {

  const client = useApolloClient()
  
  const { famGrampsId } = useParams<PhotoBookParams>();

  // const [startFamilies, setStartFamilies] = useState([] as Family[]);
  // const [excludeFamilies, setExcludeFamilies] = useState([] as Family[]);
  // const [generationsUp, setGenerationsUp] = useState(4);
  // const [generationsDown, setGenerationsDown] = useState(4);

  // const [getFamilyQuery, { loading, error, data }] = useLazyQuery(GET_FAMILY);

  const [families, setFamilies] = useState([] as Family[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null as unknown | null);
  
  const addFamily = (famId: String) => {
    console.log("addFamily");
  }

  const removeFamily = (famId: String) => {
    console.log("removeFamily");
  }

  const fetchFamily = async (families: Family[], famId: String) => {
    console.log("fetchFamily", famId);
    if (families.find(f => f.grampsId === famId)) {
      return;
    }
    const res = await client.query({
      query: GET_FAMILY,
      variables: { grampsId: famId }
    });
    if (res.error) {
      console.error(res.error);
      throw res.error;
    }
    
    families.push(res.data.familyById);

    return res.data.familyById;
  }

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
  }

  const goUp = async (family: Family, up: number, families: Family[]) => {
    if (up === 0) {
      return;
    }

    const newFamilies = [] as Family[];
    for (const parentFamily of [
      ...family.father?.parentFamilies || [],
      ...family.mother?.parentFamilies || []
    ]) {
      const fam = await fetchFamily(families, parentFamily.grampsId);
      if (fam) {
        newFamilies.push(fam);
      }
    }
    for (const fam of newFamilies) {
      await goUp(fam, up - 1, families);
    }
  }

  const generate = async (famGrampsId: string | undefined, down: number, up: number) => {
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
  }


  // TODO: show all families
  return (
    <div>
      <h1>Photo Book</h1>
      <button onClick={() => generate(famGrampsId, 2, 2)}>Generate</button>

      <div className="photoBook">
        {loading && <div>Loading...</div>}
        {!!error && <div>Error: {`${error}`}</div>}
        {families.map((family, idx) => {
          return (
            <div key={family.grampsId} className={`photoBook-page-${family.grampsId}`}  >
              <PhotoBookPage family={family} pageNum={(idx * 2) + 1} />
            </div>
          );
        })}
      </div>
    </div>
  );
}