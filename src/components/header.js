import React from "react";

import { makeStyles, Grid, Typography } from "@material-ui/core/";

const useStyles = makeStyles({
  header: {
    width: "100%",
    height: "5vh",
    padding: 0,
    backgroundColor: "#2196f3",
    color: "#e3f2fd",
  },
  title: { textAlign: "center" },
});
const Header = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.header} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.title}>
          AU Covid-19 Stats
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
