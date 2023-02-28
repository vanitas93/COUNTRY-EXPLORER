import React, { useState, useEffect } from "react";
import "./App.css";
import CountryCard from "./components/CountryCard";
import Searchbar from "./components/Searchbar";
import Select from "./components/Select";

//Logo
import { BsFillMoonFill } from "react-icons/bs";

import { fetchAllData, fetchDataName } from "./services/services";
import CountryPageInd from "./components/CountryPageInd";

function App() {
  //Variables
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [region, setRegion] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [DarkModeTheme, setDarkModeTheme] = useState(false);
  const [countryActivated, setCountryActivated] = useState(false);

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

  //Dark Mode Activation
  const darkModeHandler = () => {
    setDarkModeTheme(!DarkModeTheme);
    const header = document.querySelector(".main-header");
    const countryCard = document.querySelectorAll(".country-card");
    if (DarkModeTheme === false) {
      document.body.classList.add("dark-mode");
      header.classList.add("dark-mode");
      countryCard.forEach((countryCard) => {
        countryCard.classList.add("dark-mode");
      });
    } else {
      document.body.classList.remove("dark-mode");
      header.classList.remove("dark-mode");
      countryCard.forEach((countryCard) => {
        countryCard.classList.remove("dark-mode");
      });
    }
  };

  return (
    <div className="App">
      <header className="main-header">
        <h1>Where in the world?</h1>
        <button onClick={darkModeHandler} className="dark-mode-btn">
          <BsFillMoonFill />
          Dark Mode
        </button>
      </header>
      {countryActivated ? (
        <div className="indPage">
          filteredData.filter((item) =>
          {
            <CountryPageInd
              flag={item.flags.png}
              key={item.name.common}
              name={item.name.common}
              nameNative={item.name.nativeName}
              population={item.population}
              region={item.region}
              subRegion={item.subregion}
              capital={item.capital}
              topLevelDomain={item.tld}
              currencies={item.currencies}
              languages={item.languages}
            />
          }
          )
        </div>
      ) : (
        <div className="main-page">
          <div className="handlers">
            <Searchbar setInputText={setInputText} inputText={inputText} />
            <Select setRegionHandler={setRegionHandler} />
          </div>
          <div className="countries-list">
            {data ? (
              filteredData.map((item) => {
                return (
                  <CountryCard
                    setCountryActivated={setCountryActivated}
                    countryActivated={countryActivated}
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
      )}
    </div>
  );
}

export default App;
