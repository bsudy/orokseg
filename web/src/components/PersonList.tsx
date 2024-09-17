import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { Person } from "../gql/graphql";

export const PersonList = ({ persons }: { persons: Person[] } ) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {persons && persons.map(person =>
                <ListItem key={person.grampsId}>
                    <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${person.displayName}`} secondary={ `${person.grampsId}` } />
                </ListItem>
            )}
        </List>
    )
}
// export default PersonList;