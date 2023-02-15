import React, { useState, useEffect } from "react";
import "./App.css";
import CountryCard from "./components/CountryCard";
import Searchbar from "./components/Searchbar";
import Select from "./components/Select";

import { fetchAllData, fetchDataName } from "./services/services";

function App() {
  //Variables
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [region, setRegion] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  //UseEffects

  useEffect(() => {
    fetchDataByName();
    filterCountries();
  }, [inputText]);

  useEffect(() => {
    filterCountries();
  }, [region]);

  //Functions
  //Summon all countries at start
  const fetchAllCountriesData = async () => {
    try {
      const result = await fetchAllData();
      setData(result.data);
      setFilteredData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //Summon countries by name
  const fetchDataByName = async () => {
    if (inputText === "") {
      fetchAllCountriesData();
    } else {
      try {
        const result = await fetchDataName(inputText);
        setData(result.data);
        setFilteredData(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Filter Countries selector
  const setRegionHandler = (e) => {
    setRegion(e.target.value);
  };

  //Show Filtered countries only
  const filterCountries = () => {
    if (region === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.region === region));
    }
  };

  return (
    <div className="App">
      <header>
        <h1>TAKE ME HOME COUNTRY ROAD</h1>
        <Searchbar setInputText={setInputText} inputText={inputText} />
        <Select setRegionHandler={setRegionHandler} />
      </header>
      <div className="countries-list">
        {data ? (
          filteredData.map((item) => {
            return (
              <CountryCard
                key={item.name.common}
                name={item.name.common}
                flag={item.flags.png}
                capital={item.capital}
                population={item.population}
                region={item.region}
              />
            );
          })
        ) : (
          <p>Data Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
