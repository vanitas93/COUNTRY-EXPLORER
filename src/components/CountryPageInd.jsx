import React from "react";

function CountryPageInd({
  flag,
  name,
  nameNative,
  population,
  region,
  subRegion,
  capital,
  topLevelDomain,
  currencies,
  languages,
}) {
  return (
    <div className="CountryPageInd">
      <button></button>
      <img src={flag} alt="" />
      <div className="dataInfo">
        <h1></h1>
        <p>{name}</p>
        <p>{nameNative}</p>
        <p>{population}</p>
        <p>{region}</p>
        <p>{subRegion}</p>
        <p>{capital}</p>
        <p>{topLevelDomain}</p>
        <p>{currencies}</p>
        <p>{languages}</p>
      </div>
    </div>
  );
}

export default CountryPageInd;
