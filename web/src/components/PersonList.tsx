import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Person } from "../gql/graphql";
import { useNavigate } from "react-router-dom";

export const PersonList = ({ persons }: { persons: Person[] }) => {
  // This is not ideal here. It makes the component less reusable.
  const navigate = useNavigate();

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {persons &&
        persons.map((person) => (
          <ListItemButton
            key={person.grampsId}
            onClick={(evt) => {
              evt.preventDefault();
              navigate("/people/" + person.grampsId);
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${person.displayName}`}
              secondary={`${person.grampsId}`}
            />
          </ListItemButton>
        ))}
    </List>
  );
};
// export default PersonList;
