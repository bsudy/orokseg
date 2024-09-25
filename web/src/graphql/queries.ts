import { gql } from "@apollo/client";

export const GET_PERSON_LIST = gql`
  query personList {
    persons {
      persons {
        grampsId
        handle
        displayName
      }
      hasMore
    }
  }
`;

export const NAME_FIELDS = gql`
  fragment NameFields on Name {
    givenName
    displayName
    suffix
    surnames {
      surname
      prefix
      primary
    }
  }
`;

export const PERSON_FIELDS = gql`
  ${NAME_FIELDS}
  fragment PersonFields on Person {
    grampsId
    displayName
    gender
    name {
      ...NameFields
    }
  }
`;

export const GET_PERSON = gql`
  ${PERSON_FIELDS}
  query person($grampsId: ID!) {
    personById(id: $grampsId) {
      ...PersonFields
      parentFamilies {
        grampsId
        handle
        children {
          handle
          motherRelationType
          fatherRelationType
          privacy
          person {
            ...PersonFields
          }
        }
      }
      notes {
        handle
        grampsId
        change
        format
        privacy
        type {
          type
          value
        }
        text {
          text
          tags {
            name
            value
            ranges {
              start
              end
            }
          }
        }
      }
      families {
        grampsId
        handle
        children {
          handle
          motherRelationType
          fatherRelationType
          privacy
          person {
            ...PersonFields
            families {
              grampsId
              handle
              children {
                handle
                person {
                  ...PersonFields
                }
              }
            }
          }
        }
        father {
          ...PersonFields
        }
      }
    }
  }
`;
