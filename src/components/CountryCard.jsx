import React from "react";

function CountryCard({ name, flag, capital, population, region }) {
  return (
    <div className="country-card">
      <div className="flags">
        <img src={flag} alt="Country-flag" />
      </div>
      <div className="country-text">
        <h2>{name} </h2>
        <p>Population: {population} inhabitants</p>
        <p>Region: {region}</p>
        <p>Capital: {capital} </p>
      </div>
    </div>
  );
}

export default CountryCard;
