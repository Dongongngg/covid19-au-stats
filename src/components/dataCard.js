import React, { useState, useEffect } from "react";
//mui
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Switch,
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
  switchTitle: {
    display: "inline-block",
    padding: 15,
  },
  switch: {
    marginBottom: 7,
  },
  container: {
    width: "100%",
    margin: 0,
  },
  cardRoot: {
    display: "flex",
    width: "75%",
    minWidth: 250,
    height: "33vh",
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
    fontSize: "calc(20px + 2vmin)",
    color: "#212121",
    textAlign: "center",
    lineHeight: "15vh",
  },
  cardTextNumber: {
    fontSize: "calc(20px + 2vmin)",
    color: "#9e9e9e",
    textAlign: "center",
    lineHeight: "15vh",
  },
});

const DataCard = () => {
  const classes = useStyles();
  const auUrl = "au";
  const allUrl = "all";
  //   const allUrl = "https://corona.lmao.ninja/v2/all";
  //   const auUrl = "https://corona.lmao.ninja/v2/countries/AU";
  const states = ["NSW", "VIC", "ACT", "QLD", "SA", "TAS", "WA", "NT"];
  const sections = [
    { name: "Cases", id: "cases" },
    { name: "Today Cases", id: "todayCases" },
    { name: "Deaths", id: "deaths" },
    { name: "Today Death", id: "todayDeaths" },
    { name: "Recovered", id: "recovered" },
    { name: "Active", id: "active" },
  ];
  const [stats, setStats] = useState({});
  const [allCountry, setAllCountry] = useState(false);
  const [url, setUrl] = useState(auUrl);
  const [loading, setLoading] = useState(true);

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
  }, [allCountry]);

  const handleSwitch = (event) => {
    setAllCountry(event.target.checked);
    setUrl((allCountry && auUrl) || allUrl);
  };

  return (
    <React.Fragment>
      <Loading open={loading} />
      <Paper className={classes.paper}>
        <Grid container justify="flex-end">
          <Grid item>
            <Typography variant="h6" className={classes.switchTitle}>
              Check all countries
            </Typography>
            <Switch
              color="primary"
              checked={allCountry}
              onChange={handleSwitch}
              className={classes.switch}
            />
          </Grid>
        </Grid>

        <Grid
          container
          className={classes.container}
          spacing={3}
          alignItems="center"
        >
          {sections.map((section) => (
            <Grid item xs={12} md={6} lg={4} key={section.name}>
              <Card className={classes.cardRoot} elevation={3}>
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.cardTextTitle} variant="h3">
                    {section.name || "Error"}
                  </Typography>
                  <Typography className={classes.cardTextNumber} variant="h3">
                    {stats[section.id] || "Error"}
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

export default DataCard;
