import React from "react";

//components
import Header from "./components/header";
import OverallCard from "./components/overallCard";
//styles
import "./styles/App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <OverallCard />
    </div>
  );
};

export default App;
