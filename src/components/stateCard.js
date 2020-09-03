import React, { useState, useEffect } from "react";

//mui
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core/";
//
import Loading from "./loading";
const useStyles = makeStyles({
  paper: {
    paddingBottom: "5vh",
    margin: 15,
  },
  title: {
    textAlign: "center",
    paddingTop: "5vh",
    paddingBottom: "5vh",
  },
  container: {
    width: "100%",
    margin: 0,
  },
  cardRoot: {
    display: "flex",
    width: "50%",
    minWidth: 150,
    height: "16vh",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "10px",
    transition: "all .2s ease-in-out",
    "&:hover": { transform: "scale(1.05)" },
  },
  cardContent: {
    margin: "auto",
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  cardTextTitle: {
    fontSize: "calc(10px + 2vmin)",
    color: "#212121",
    textAlign: "center",
    lineHeight: "6vh",
  },
  cardTextNumber: {
    fontSize: "calc(10px + 2vmin)",
    color: "#9e9e9e",
    textAlign: "center",
    lineHeight: "6vh",
  },
  tabBox: {
    width: "100%",
    padding: 10,
  },
});

const OverallCard = () => {
  const classes = useStyles();
  const auUrl = "au";
  const allUrl = "all";
  //   const allUrl = "https://corona.lmao.ninja/v2/all";
  //   const auUrl = "https://corona.lmao.ninja/v2/countries/AU";
  const states = ["NSW", "VIC", "ACT", "QLD", "SA", "TAS", "WA", "NT"];

  const [stats, setStats] = useState({});
  const [url, setUrl] = useState(auUrl);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await fetch(url);
      const stats = await data.json();
      setStats(stats);
      console.log("api", stats);
    };

    const timer = setTimeout(() => {
      getData();
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <React.Fragment>
      <Loading open={loading} />
      <Paper className={classes.paper}>
        <Grid container className={classes.container}>
          <Tabs
            value={tab}
            onChange={handleTab}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={classes.tabBox}
          >
            <Tab label="Today" />
            <Tab label="All" />
            <Tab label="Deaths" />
          </Tabs>
        </Grid>
        <Grid
          container
          className={classes.container}
          spacing={3}
          alignItems="center"
        >
          {states.map((state) => (
            <Grid item xs={6} md={4} lg={3} key={state}>
              <Card className={classes.cardRoot} elevation={3}>
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.cardTextTitle} variant="h3">
                    {state}
                  </Typography>
                  <Typography className={classes.cardTextNumber} variant="h3">
                    Error
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default OverallCard;
