import React, { useState, useEffect } from "react";
import "./App.css";
import CountryCard from "./components/CountryCard";
import Searchbar from "./components/Searchbar";

import { fetchAllData, fetchDataName } from "./services/services";

function App() {
  //Variables
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [region, setRegion] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  //UseEffects
  useEffect(() => {
    fetchAllCountriesData();
  }, []);

  useEffect(() => {
    fetchData();
    filterCountries();
  }, [inputText]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  //Functions
  //Summon all countries at start
  const fetchAllCountriesData = async () => {
    try {
      const result = await fetchAllData();
      setData(result.data);
    } catch (error) {
      return <p>ERROR</p>;
    }
  };
  //Summon countries by name
  const fetchData = async () => {
    try {
      const result = await fetchDataName(inputText);
      setData(result.data);
    } catch (error) {
      return <p>ERROR</p>;
    }
  };

  //Filter Countries selector
  const setRegionHandler = (e) => {
    setRegion(e.target.value);
  };

  //Show Filtered countries only
  const filterCountries = () => {
    switch (region) {
      case "Africa":
        setFilteredData(data.filter((item) => item.region === "Africa"));
        break;
      case "Americas":
        setFilteredData(data.filter((item) => item.region === "Americas"));
        break;
      case "Asia":
        setFilteredData(data.filter((item) => item.region === "Asia"));
        break;
      case "Europe":
        setFilteredData(data.filter((item) => item.region === "Europe"));
        break;
      case "Oceania":
        setFilteredData(data.filter((item) => item.region === "Oceania"));
        break;
      default:
        setFilteredData(data);
        break;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>TAKE ME HOME COUNTRY ROAD</h1>
        <Searchbar setInputText={setInputText} inputText={inputText} />
        <select
          onChange={setRegionHandler}
          name="todos"
          className="filter-todo"
        >
          <option value="" disabled selected>
            Filter by Region
          </option>
          <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
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
