import React from "react";
import { Typography, Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
  heroContent: {
    padding: "8, 0, 6ps",
  },
  heroButtons: {
    marginTop: 4,
  },
  footer: {
    padding: 4,
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Örökség
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Here comes all kind of information about your family.
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default Home;
