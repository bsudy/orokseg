import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Person } from "../gql/graphql";
import { useNavigate } from "react-router-dom";
import { AccountTree } from "@mui/icons-material";
import { displayName } from "../utils/name";

export const PersonList = ({ persons }: { persons: Person[] }) => {
  // This is not ideal here. It makes the component less reusable.
  const navigate = useNavigate();

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {persons &&
        persons.map((person) => (
          <ListItem
            key={person.grampsId}
            onClick={(evt) => {
              evt.preventDefault();
              navigate("/people/" + person.grampsId);
            }}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="tree"
                onClick={(evt) => {
                  evt.preventDefault();
                  evt.stopPropagation();
                  navigate("/people/tree/" + person.grampsId);
                }}
              >
                <AccountTree />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={displayName(person?.name)}
              secondary={`${person.grampsId}`}
            />
          </ListItem>
        ))}
    </List>
  );
};
// export default PersonList;
