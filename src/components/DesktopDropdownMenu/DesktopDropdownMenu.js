import React from "react";
import Menu from "./Menu";
import Grid from '@material-ui/core/Grid'
import MenuItem from "@material-ui/core/MenuItem";

import categoryStrcture from "../../data/category-strcture";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  button: {
      fontSize: 14,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      height: 40,
      zIndex: 10,
  },
}));

export default function SimpleMenu() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container style={{ display: "flex" }}>
      {categoryStrcture.map((category, key) => (
          <Grid item>
            <Menu key={key} category={category} />
          </Grid>
      ))}
      <Grid item>
        <MenuItem 
          className={classes.button}
          onClick={() => {
              history.push("/favorites")
          }}> 
            Favorites 
        </MenuItem>
      </Grid>
    </Grid>
  );
}
