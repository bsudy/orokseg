import { Box, CircularProgress } from "@mui/material";
import { PersonList } from "../components/PersonList";
import { useQuery } from "@apollo/client";
import { GET_PERSON_LIST } from "../graphql/queries";
import { PersonListQuery } from "../gql/graphql";

export function Persons() {
  const { loading, error, data } = useQuery<PersonListQuery>(GET_PERSON_LIST);

  return (
    <div>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <h1>Person List</h1>

        {error && <p>Error: {`${error}`}</p>}
        <Box sx={{ m: 1, position: "relative" }}>
          {/* <Button variant="contained" onClick={load}>Refresh</Button> */}
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: "yellow",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            ></CircularProgress>
          )}
        </Box>
        {data && <PersonList persons={data.persons?.persons || []} />}
        {/* <PersonList persons={persons} /> */}
      </Box>
    </div>
  );
}
