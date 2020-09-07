import React, { useState, useEffect } from "react";
//
import StateCard from "./stateCard";
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
    height: "30vh",
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
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 150,
    textAlign: "center",
    lineHeight: "15vh",
    borderTop: "1px solid #9e9e9e",
  },
});

const OverallCard = () => {
  const classes = useStyles();
  // const auUrl = "au";
  // const allUrl = "all";
  const allUrl = "https://corona.lmao.ninja/v2/all";
  const auUrl = "https://corona.lmao.ninja/v2/countries/AU";
  const states = ["NSW", "VIC", "ACT", "QLD", "SA", "TAS", "WA", "NT"];
  const sections = [
    { name: "Today Cases", id: "todayCases" },
    { name: "Cases", id: "cases" },
    { name: "Recovered", id: "recovered" },
    { name: "Active", id: "active" },
    { name: "Deaths", id: "deaths" },
    { name: "Today Death", id: "todayDeaths" },
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
  const handleColor = (prop) => {
    if (prop === "Today Cases") {
      return "#f50057";
    } else if (prop === "Cases") {
      return "#2196f3";
    } else if (prop === "Recovered") {
      return "#76ff03";
    } else if (prop === "Active") {
      return "#ffc400";
    } else {
      return "#9e9e9e";
    }
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
                    {section.name || "..."}
                  </Typography>
                  <Typography
                    className={classes.cardTextNumber}
                    style={{ color: handleColor(section.name) }}
                  >
                    {stats[section.id] || "..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <StateCard />
    </React.Fragment>
  );
};

export default OverallCard;
