import React from "react";

function Searchbar({ setInputText, inputText }) {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="searchbar">
      <form action="submit">
        <input
          placeholder="Search for a country..."
          value={inputText}
          onChange={inputTextHandler}
          type="text"
        />
      </form>
    </div>
  );
}

export default Searchbar;
