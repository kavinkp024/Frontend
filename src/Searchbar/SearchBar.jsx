import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({onSearch}) {
  const [inputTerm, setInputTerm] = useState('');

   const handleChange = (event) => {
    setInputTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputTerm);
}

  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder=" Search......"
        value={inputTerm}
        className='search-bar'
        onChange={handleChange}
      />
      <button className='search-button' type="submit">Click</button>
      </form>
    </div>
  );
}

export default SearchBar;