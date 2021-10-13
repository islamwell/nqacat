import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/home";
import Catergory from "./containers/catergory";
import Player from "./containers/player";
import Layout from "./containers/layout";
import Search from "./containers/search";
import Favorite from "./components/Favorite/Favorite"
import Cache from "./components/Cache/Cache"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box, Container, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Roboto, Arial',
      },
    palette: {
        primary: {
            main: "#179992",
        },
    }
});
const useStyles = makeStyles((theme) => ({
    
    title: {
      color: "rgb(16, 107, 102)",
    },
    
    recentContainer: {
      padding: theme.spacing(3),
      borderRadius: 10,
    },
    
  }));
  
function App() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Layout>
                    <Switch>
                        
                        
                        <Route exact path="/category/:id">
                            <Catergory />
                        </Route>
                        <Route exact path="/item">
                            <Player />
                        </Route>
                        <Route exact path="/search">
                            <Search />
                        </Route>
                        <Route exact path="/favorites">
                            <div className="fav-redirect-container">
                            <Grid style={{overflow:"visible"}} item xs={12} md={4}>
            <Box className={classes.title} mb={3} fontSize="h4.fontSize" fontWeight="fontWeightBold">
              Favorites
            </Box>
            <Favorite />
            </Grid>
          <Grid style={{overflow:"visible"}} item xs={12} md={4}>
            <Box className={classes.title} mb={3} fontSize="h4.fontSize" fontWeight="fontWeightBold">
              Cached
            </Box>
            <Cache />
            </Grid>
                            </div>    
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;
