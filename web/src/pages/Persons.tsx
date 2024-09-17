import { useEffect, useState } from "react";
import { Person } from "../model/Person";
import { Client } from "../client/Client";
import { Avatar, Box, Button, CircularProgress, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { PersonList } from "../components/PersonList";
import { useQuery } from "@apollo/client";
import { GET_PERSON_LIST } from "../graphql/queries";
import { PersonListQuery } from "../gql/graphql";



export function Persons() {

    // const [persons, setPersons] = useState<Person[]>([]);
    // const [error, setError] = useState<string | null>(null);
    // const [loading, setLoading] = useState<boolean>(false);

    const { loading, error, data } = useQuery<PersonListQuery>(GET_PERSON_LIST);

    // const load = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         new Client().getPersonList().then(persons => {
    //             setPersons(persons);
    //             setError(null);
    //         }).catch(err => {
    //             setError(err.message);
    //         }).finally(() => {
    //             setLoading(false);
    //         });
    //     }, 1000);
    // }

    // useEffect(() => {
    //     load();
    // }, []);

    return (
        <div>
            
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h1>Person List</h1>
                
                {error && <p>Error: {`${error}`}</p>}
                <Box sx={{ m: 1, position: 'relative' }}>

                    {/* <Button variant="contained" onClick={load}>Refresh</Button> */}
                    {loading && (
                        <CircularProgress
                        size={24}
                        sx={{
                            color: 'yellow',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
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