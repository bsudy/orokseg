import { Maybe } from "graphql/jsutils/Maybe";
import { Name } from "../gql/graphql";

export const displayName = (name?: Maybe<Name> | Name) => {
  console.log("displayName", name);
  if (name) {
    const surname = displaySurname(name);
    const firstname = displayFirstname(name);
    return `${surname}, ${firstname}`.trim();
  }
  return "<Unknown>";
};

export function displaySurname(name?: Maybe<Name> | Name) {
  if (name) {
    return name.surnames
      .map((surname) => `${surname.prefix} ${surname.surname}`)
      .join(" ")
      .trim();
  }
  return "<Unknown>";
}

export function displayFirstname(name?: Maybe<Name> | Name) {
  if (name) {
    return `${name.givenName} ${name.suffix}`.trim();
  }
  return "<Unknown>";
}
