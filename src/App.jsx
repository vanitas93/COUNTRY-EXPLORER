import React, { useState, useEffect } from "react";
import "./App.css";
import CountryCard from "./components/CountryCard";
import Searchbar from "./components/Searchbar";
import Select from "./components/Select";

//Logo
import { BsFillMoonFill } from "react-icons/bs";

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
        <h1>Where in the world?</h1>
        <button className="dark-mode-btn">
          <BsFillMoonFill />
          Dark Mode
        </button>
      </header>
      <div className="handlers">
        <Searchbar setInputText={setInputText} inputText={inputText} />
        <Select setRegionHandler={setRegionHandler} />
      </div>
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
