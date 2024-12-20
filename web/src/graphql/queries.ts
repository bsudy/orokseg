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

export const ATTRIBUTE_FIELDS = gql`
  fragment AttributeFields on Attribute {
    type
    customType
    value
  }
`;

export const MEDIIM_REF_FILED = gql`
  fragment MediumRefFields on MediumRef {
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
      tags
    }
  }
`;

export const EVENT_FIELDS = gql`
  fragment EventFields on EventRef {
    handle
    event {
      handle
      grampsId
      date {
        startDate {
          day
          month
          year
        }
        endDate {
          day
          month
          year
        }
        text
      }
      type {
        type
        value
      }
      description
      attributes {
        type
        customType
        value
      }
    }
  }
`;

export const PERSON_FIELDS = gql`
  ${NAME_FIELDS}
  ${MEDIIM_REF_FILED}
  ${ATTRIBUTE_FIELDS}
  ${EVENT_FIELDS}
  fragment PersonFields on Person {
    grampsId
    handle
    displayName
    gender
    name {
      ...NameFields
    }
    mediumRefs {
      ...MediumRefFields
    }
    attributes {
      ...AttributeFields
    }
    birthEvent {
      ...EventFields
    }
    deathEvent {
      ...EventFields
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

// parentFamilies {
//   grampsId
//   handle
//   children {
//     handle
//     motherRelationType
//     fatherRelationType
//     privacy
//     person {
//       ...PersonFields
//     }
//   }
// }

export const GET_PERSON = gql`
  ${PERSON_FIELDS}
  query person($grampsId: ID!) {
    personById(id: $grampsId) {
      ...PersonFields

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
        }
        mother {
          ...PersonFields
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
        }
      }
    }
  }
`;

export const GET_FAMILY = gql`
  ${MEDIIM_REF_FILED}
  ${PERSON_FIELDS}
  query family($grampsId: ID!) {
    familyById(id: $grampsId) {
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
            father {
              ...PersonFields
            }
            mother {
              ...PersonFields
            }
          }
        }
      }
      mediumRefs {
        ...MediumRefFields
      }
      # Should we go sides with other partners?
      father {
        ...PersonFields
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
      }
      # Should we go sides with other partners?
      mother {
        ...PersonFields
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
      }
    }
  }
`;
