import React, { useState } from "react";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(term);
  };

  return (
    <div className="search-bar ui segment">
      <form className=" ui form" onSubmit={(e) => onFormSubmit(e)}>
        <div className=" field">
          <label>Video Search</label>
          <input
            type="text"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
