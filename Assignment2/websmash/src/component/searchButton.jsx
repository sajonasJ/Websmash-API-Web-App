import React, { useState, useRef, useEffect } from 'react';
import '../css/searchButton.css';


const SearchButton = ({ onClick, searchQuery, setSearchQuery }) => {
  return (
    <div className='search-btn'>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={onClick}>Search</button>
    </div>
  );
};

export default SearchButton;
