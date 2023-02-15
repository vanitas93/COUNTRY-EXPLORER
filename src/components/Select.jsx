import React from "react";

function Select({ setRegionHandler }) {
  return (
    <div className="Select">
      <select
        onChange={setRegionHandler}
        name="todos"
        className="filter-todo"
        defaultValue="Filter by Region"
      >
        <option disabled>Filter by Region</option>
        <option value="all">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default Select;
