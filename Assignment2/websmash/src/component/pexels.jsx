import React, { useState, useRef, useEffect } from 'react';
import '../css/pexels.css';
import $ from 'jquery';
import SearchButton from '../component/searchButton';

function Pexels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);


  const handleVideoClick = (index) => {
    const videoRef = videoRefs.current[index];
    if (videoRef && videoRef.current) {
      $(videoRef.current).trigger('play');
    }
  };

  const handleSearch = () => {
    if (searchQuery !== '') {
      searchVideos(searchQuery);
    }
  };

  const searchVideos = async (query) => {
    try {
      const response = await fetch(`/api/videos/search?query=${query}&per_page=5`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching videos: ' + response.status);
      }

      const responseData = await response.json();
      if (responseData.videos && responseData.videos.length > 0) {
        setVideos(responseData.videos);
      }
    } catch (error) {
      console.error('Error fetching videos: ', error);
    }
  };

  useEffect(() => {
    const fetchPopularVideos = async () => {
      try {
        const response = await fetch('/api/videos/popular?per_page=5');
        if (!response.ok) {
          throw new Error('Error fetching videos: ' + response.status);
        }

        const responseData = await response.json();
        if (responseData.videos && responseData.videos.length > 0) {
          setVideos(responseData.videos);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (searchQuery === '') {
      fetchPopularVideos();
    }
  }, [searchQuery]);


  return (
    <div className='pexel-container'>
      <SearchButton
        onClick={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
     <div className='pexel-container-frame'>
        {videos.map((video, index) => (
          <div key={video.id} className="video-container"
            onClick={() => handleVideoClick(index)}>
            <video controls ref={(ref) => (videoRefs.current[index] = ref)}>
              <source src={video.video_files[0].link} type={video.video_files[0].file_type} />
              Your browser does not support the video tag.
            </video>
            <p className="video-uploader">Uploader: {video.user.name}</p> {/* This line displays the uploader's name */}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Pexels;
