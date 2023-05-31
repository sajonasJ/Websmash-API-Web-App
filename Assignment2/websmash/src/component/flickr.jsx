import React, { useState, useEffect } from 'react';
import '../css/flickr.css';
import SearchButton from '../component/searchButton';

const FLICKRKEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';
const INTRSTNG = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=' + FLICKRKEY + '&per_page=5&format=json&nojsoncallback=1';
const GETSIZES = 'https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=' + FLICKRKEY + '&photo_id=';

function Flickr() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(INTRSTNG)
      .then(response => {
        // console.log('Response:', response); // Log the response
        return response.json();
      })
      .then(data => fetchPhoto(data))
      .catch(err => console.error('Error happened during fetching!', err));
  }, []);

  const fetchPhoto = (data) => {
    let requests = data.photos.photo.map(photo => {
      let photoObj = { id: photo.id, title: photo.title };
      return fetch(GETSIZES + photoObj.id)
        .then(response => response.json())
        .then(data => {
        //   console.log('Sizes fetched:', data.sizes.size);
          if (data.sizes.size[6] && data.sizes.size[data.sizes.size.length - 1]) {
            photoObj.file = data.sizes.size[6].source;
            // photoObj.full = data.sizes.size[data.sizes.size.length - 1].source;
          } else {
            throw new Error('Could not access the expected sizes');
          }
          return photoObj;
        });
    });

    Promise.all(requests)
      .then(results => setImages(results))
      .catch(err => console.error('Error happened during fetching! promse', err));
  };

  return (
    <div className='flickr-container'>
      <SearchButton
        // onClick={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className='images-container'>
        {images.map(photo => (
          <div key={photo.id}>
            <img src={photo.file} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Flickr;
