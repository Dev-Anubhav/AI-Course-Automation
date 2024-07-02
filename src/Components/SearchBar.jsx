// Searchbar.jsx
import React, { useContext } from 'react';
import { SearchContext } from './SearchContext';

const Searchbar = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search value:", searchValue);
    setSearchValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Searchbar;
