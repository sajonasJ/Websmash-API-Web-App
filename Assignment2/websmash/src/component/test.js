import React, { useState, useEffect } from 'react';
import '../css/flickr.css';

import SearchButton from '../component/searchButton';

const FLICKRKEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';

function Flickr() {
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${FLICKRKEY}&per_page=5&format=json&nojsoncallback=1`)
            .then(response => response.json())
            .then(data => {
                console.log('Data from API:', data);
                const photoArray = data.photos.photo.map((photo) => {
                    let srcPath = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                    return (
                        <img key={photo.id} alt={photo.title} src={srcPath}></img>
                    )
                });
                setImages(photoArray);
            })
            .catch(err => {
                console.error('Error happened during fetching!', err);
            });
    }, []); // empty dependency array, so this effect runs only once when the component is mounted

    return (
        <div className='flickr-container'>
            <SearchButton
                // onClick={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery} />
            <div className='images-container'>
                {images}
            </div>
        </div>
    );
}

export default Flickr;
