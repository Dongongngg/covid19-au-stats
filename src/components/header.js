import React from "react";

import { makeStyles, Grid, Typography } from "@material-ui/core/";

const useStyles = makeStyles({
  header: {
    width: "100%",
    padding: 0,
    backgroundColor: "#2196f3",
    color: "#e3f2fd",
  },
  title: { textAlign: "center" },
});
const Header = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.header}>
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.title}>
          AU Covid-19 Tracker
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
