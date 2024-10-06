import { JsonFam, JsonGedcomData, JsonImage, JsonIndi } from "topola";
import { Family, MediumRef, Person } from "../gql/graphql";
import { getCutout } from "../utils/medium";
import { displayFirstname, displaySurname } from "../utils/name";
import { Maybe } from "graphql/jsutils/Maybe";
import {
  OroksegJsonGedcomData,
  OroksegJsonFam,
} from "../components/charts/OroksegChart";

class TopolaConverter {
  private indis = {} as Record<string, JsonIndi>;
  private fams = {} as Record<string, JsonFam>;

  constructor(readonly pages?: Record<string, number>) {}

  private registerFamily(family: Family): OroksegJsonFam | undefined {
    if (!Object.keys(this.fams).includes(family.grampsId)) {
      const jsonFam = {
        id: family.grampsId,
        husb: family.father?.grampsId,
        wife: family.mother?.grampsId,
        children: family.children
          ?.map((child) => child.person?.grampsId)
          .filter((id) => id !== undefined) as string[] | undefined,
        // marriage: {
        //   type: "MARR",
        //   date: {
        //     year: 1900,
        //   },
        //   place: "Székesfehérvár",
        // },
        page: this.pages?.[family.grampsId],
      } as OroksegJsonFam;
      this.fams[family.grampsId] = jsonFam;
      return jsonFam;
    }
  }

  private async toImg(mediumRef: MediumRef): Promise<JsonImage> {
    return {
      url: await getCutout(mediumRef),
      title: mediumRef.medium.description || "",
    };
  }

  private async toTopolaIndi(person: Person): Promise<JsonIndi> {
    const images = [];
    if (
      person.mediumRefs &&
      person.mediumRefs.length > 0 &&
      person.mediumRefs[0]
    ) {
      images.push(await this.toImg(person.mediumRefs[0]));
    }
    return {
      id: person.grampsId,
      firstName: displayFirstname(person.name),
      lastName: displaySurname(person.name),
      // famc: null,
      fams: [],
      images,
    };
  }

  private async processPerson(person?: Person | Maybe<Person>) {
    if (!person) {
      return;
    }
    if (!Object.keys(this.indis).includes(person.grampsId)) {
      this.indis[person.grampsId] = await this.toTopolaIndi(person);
    }
  }

  private async processParentFamily(person?: Person | Maybe<Person>) {
    if (!person) {
      return;
    }
    return await Promise.all(
      (person.parentFamilies || []).map(async (family) => {
        const fam = this.registerFamily(family);
        if (fam) {
          await this.processPerson(family.father);
          await this.processPerson(family.mother);
        }
        this.indis[person.grampsId].famc = family.grampsId;
      }),
    );
  }

  async addPerson(person: Person) {
    await this.processPerson(person);
    await Promise.all(
      (person.families || []).map(async (family) => {
        this.addFamily(family);
        // TODO what if not single parents? Shall we take the first one.
        this.indis[person.grampsId].fams?.push(family.grampsId);
      }),
    );

    await this.processParentFamily(person);
  }

  async addFamily(family: Family) {
    // console.log("Add family", family);
    const fam = this.registerFamily(family);
    if (fam) {
      if (family.father) {
        await this.processPerson(family.father);
        this.indis[family.father.grampsId].fams?.push(family.grampsId);
        await this.processParentFamily(family.father);
      }
      if (family.mother) {
        await this.processPerson(family.mother);
        this.indis[family.mother.grampsId].fams?.push(family.grampsId);
        await this.processParentFamily(family.mother);
      }
    }

    await Promise.all(
      (family.children || []).map(async (child) => {
        // console.log("Add child", displayName(child.person?.name));
        if (
          child.person &&
          !Object.keys(this.indis).includes(child.person?.grampsId)
        ) {
          await this.processPerson(child.person!);
          // spouses of children
          await Promise.all(
            (child.person?.families || []).map(async (family) => {
              await this.addFamily(family);
            }),
          );
        }
        this.indis[child.person!.grampsId].famc = family.grampsId;
      }),
    );
  }

  getTopolaData(): JsonGedcomData {
    return {
      indis: Object.values(this.indis),
      fams: Object.values(this.fams),
    };
  }
}

export async function familyToTopolaData(
  family: Family,
  pages?: Record<string, number>,
): Promise<OroksegJsonGedcomData> {
  const converter = new TopolaConverter(pages);
  await converter.addFamily(family);
  return converter.getTopolaData();
}

export async function personToTopolaData(
  person: Person,
  pages?: Record<string, number>,
): Promise<OroksegJsonGedcomData> {
  const converter = new TopolaConverter(pages);
  await converter.addPerson(person);
  return converter.getTopolaData();
}
