import React from "react";

//components
import Header from "./components/header";
import DataCard from "./components/dataCard";
import DataTable from "./components/dataTable";
//styles
import "./styles/App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <DataCard />
    </div>
  );
};

export default App;
