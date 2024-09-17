import { Person } from "../model/Person";

export class Client {
  constructor(private baseUrl: String = "http://localhost:8081/api") {}

  async getPersonList(): Promise<Person[]> {
    const resp = await fetch(`${this.baseUrl}/persons`);
    // TODO check errror code.
    return resp.json();
  }
}
