import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_PERSON } from "../graphql/queries";
import { PersonQuery } from "../gql/graphql";
import PersonDetails from "../components/PersonDetails.";
import { useParams } from "react-router-dom";

type PersonParams = {
  grampsId: string;
};

export function Person() {
  const { grampsId } = useParams<PersonParams>();

  const { loading, error, data } = useQuery<PersonQuery>(GET_PERSON, {
    variables: { grampsId },
  });

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          flexDirection: "column",
          margin: "10px",
        }}
      >
        <Typography variant="h1" component="h1">
          Person
        </Typography>

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
        {data && <PersonDetails person={data.personById!} />}
        {/* <PersonList persons={persons} /> */}
      </Box>
    </div>
  );
}
