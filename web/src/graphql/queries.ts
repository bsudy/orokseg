import { gql } from '@apollo/client';


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