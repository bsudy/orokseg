import { gql } from "@apollo/client";

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
    handle
    displayName
    gender
    name {
      ...NameFields
    }
  }
`;

export const GET_PERSON_LIST = gql`
  ${PERSON_FIELDS}
  query personList {
    persons {
      persons {
        ...PersonFields
      }
      hasMore
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
      mediumRefs {
        handle
        rectangle {
          x1
          y1
          x2
          y2
        }
        medium {
          handle
          grampsId
          mime
          description
          contentUrl
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
      parentFamilies {
        grampsId
        handle
        father {
          ...PersonFields
        }
        mother {
          ...PersonFields
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
        mother {
          ...PersonFields
        }
      }
    }
  }
`;
