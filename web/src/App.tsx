import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { Persons } from "./pages/Persons";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { Person, PersonViewType } from "./pages/Person";
import { PhotoBookPage } from "./pages/PhotoBookPage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {},
  title: {
    flexGrow: 1,
  },
  main: {},
  footer: {
    padding: 4,
  },
}));

function App() {
  const classes = useStyles();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/people",
      element: <Persons />,
    },
    {
      path: "/people/tree/:grampsId",
      element: <Person type={PersonViewType.Tree} />,
    },
    {
      path: "/people/:grampsId",
      element: <Person type={PersonViewType.Details} />,
    },
    {
      path: "/families/:famGrampsId/book/",
      element: <PhotoBookPage />,
    },
  ]);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Örökség
            </Typography>
            <Button
              color="inherit"
              onClick={(evt) => {
                evt.preventDefault();
                router.navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={(evt) => {
                evt.preventDefault();
                router.navigate("/people");
              }}
            >
              People
            </Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
      {/* <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer> */}
    </div>
  );
}

export default App;
