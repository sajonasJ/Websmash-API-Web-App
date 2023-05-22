import React, { useState, useRef, useEffect } from 'react';
import { createClient } from 'pexels';
import '../css/pexel.css';
import $ from 'jquery'; // Import jQuery

// Model: Pexels API token
const pexelsToken = 'vS9CdDTJeWceXZXxIwVWdiOoiRLeCN4LhA7Y1pe8lXOJGu2gfWjQzFJr';
const client = createClient(pexelsToken);

const VideoSearch = () => {
  // State variables for the View
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  // Controller: Handles video playback
  const handleVideoClick = (index) => {
    const videoRef = videoRefs.current[index];
    if (videoRef && videoRef.current) {
      $(videoRef.current).trigger('play'); // Use jQuery to play the video
    }
  };

  // Controller: Handles video search
  const handleSearch = () => {
    if (searchQuery !== '') {
      searchVideos(searchQuery);
    }
  };

  // Controller: Handles pressing Enter key for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Controller: Searches videos based on the query
  const searchVideos = (query) => {
    client.videos.search({ query, per_page: 15 })
      .then(response => {
        // Handle the videos returned by the search
        console.log(response);
        if (response.videos && response.videos.length > 0) {
          setVideos(response.videos);
        }
      })
      .catch(error => {
        console.error('Error fetching videos: ', error);
      });
  };

  // Model: Fetches popular videos on component mount or when search query is empty
  useEffect(() => {
    if (searchQuery === '') {
      fetch('/api/videos/popular') // Proxy endpoint
        .then(response => {
          if (!response.ok) {
            throw new Error('Error fetching videos: ' + response.status);
          }
          return response.json();
        })
        .then(responseData => {
          // Handle the videos returned
          console.log(responseData);
          if (responseData.videos && responseData.videos.length > 0) {
            setVideos(responseData.videos);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [searchQuery]);

  // View: Renders the component
  return (
    <div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Handle Enter key press
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="video-container"
          onClick={() => handleVideoClick(index)}
        >
          <video
            controls
            ref={(ref) => (videoRefs.current[index] = ref)}
          >
            <source src={video.video_files[0].link} type={video.video_files[0].file_type} />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoSearch;
