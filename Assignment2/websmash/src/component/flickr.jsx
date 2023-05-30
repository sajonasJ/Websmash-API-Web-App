import React from "react";
import '../css/flickr.css';
        import SearchButton from '../component/searchButton';

function Flickr() {
    return (
        <div className='flickr-container'>
        <SearchButton
        //   onClick={handleSearch}
        //   searchQuery={searchQuery}
        //   setSearchQuery={setSearchQuery}
        />
        </div>
    );
}

export default Flickr;