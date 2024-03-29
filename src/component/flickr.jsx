import React, { useState, useEffect } from 'react';
import '../css/flickr.css';
import SearchButton from '../component/searchButton';

const FLICKRKEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';
const INTRSTNG = '/api/flickr/?method=flickr.interestingness.getList&api_key=' + FLICKRKEY + '&per_page=10&format=json&nojsoncallback=1';
const GETSIZES = '/api/flickr/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=' + FLICKRKEY + '&photo_id=';
const SEARCH = '/api/flickr/?method=flickr.photos.search&content_type=1&api_key=' + FLICKRKEY + '&per_page=10&format=json&nojsoncallback=1&sort=interestingness-desc&text=';

function Flickr() {
    // Define state variables using the useState hook
    const [images, setImages] = useState([]); // State variable for storing fetched images
    const [searchQuery, setSearchQuery] = useState(''); // State variable for storing the user's search query

  useEffect(() => {
    // Fetches interesting photos when the component mounts
    fetch(INTRSTNG)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => fetchPhoto(data))
      .catch(err => console.error('Error happened during fetching!', err));
  }, []);

  // Fetches photo details for each photo in the data received
  const fetchPhoto = (data) => {
    if (!data.photos || !data.photos.photo) {
      console.error('Invalid data structure:', data);
      return;
    }

    let requests = data.photos.photo.map(photo => {
      let photoObj = { id: photo.id, title: photo.title };
      return fetch(GETSIZES + photoObj.id)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.sizes.size[6] && data.sizes.size[data.sizes.size.length - 1]) {
            photoObj.file = data.sizes.size[6].source;
          } else {
            throw new Error('Could not access the expected sizes');
          }
          return photoObj;
        });
    });

    // Wait for all photo requests to complete and set the images state
    Promise.all(requests)
      .then(results => setImages(results))
      .catch(err => console.error('Error happened during fetching! Promise.all', err));
  };


  const handleSearch = () => {
    // Fetches photos based on the search query
    fetch(SEARCH + searchQuery)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => fetchPhoto(data))
      .catch(err => console.error('Error happened during fetching!', err));
  };


  return (
    <div className='flickr-container'>
      {/* SearchButton component */}
      <SearchButton
        onClick={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className='row'>
        {/* Displaying the images */}
        {images.map(photo => (
          <div className='image-container' key={photo.id}>
            <img src={photo.file} alt={photo.title} />
            <p className='p-title'>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Flickr;
