import React, { useEffect, useState } from 'react';
import SearchButton from '../component/searchButton';
import '../css/spotify.css';
import spotifyHolder from '../assets/spotify.png';

const SPOTIFY_CLIENT_ID = 'b385a7550af34cb2bde8a992baf52101';
const SPOTIFY_REDIRECT_URI = 'https://localhost:3000';
const SPOTIFY_SCOPES = [];

function Spotify() {
    // State variables
    const [searchQuery, setSearchQuery] = useState(''); // Stores the user's search query
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Stores the login status
    const [searchResults, setSearchResults] = useState([]); // Stores the search results from Spotify API

    useEffect(() => {
        // Check if there is an access token in the URL hash when the component mounts
        const urlParams = new URLSearchParams(window.location.hash.substr(1));
        const accessToken = urlParams.get('access_token');

        if (accessToken) {
            // Perform any necessary actions with the access token
            console.log('Access token:', accessToken);
            setIsLoggedIn(true);
            // Testing for expiration of token on the console.
            const expiresIn = urlParams.get('expires_in');
            const expirationTime = new Date().getTime() + expiresIn * 1000;
            console.log('Token expires at:', new Date(expirationTime));
        }
    }, []);

    // Function to initiate OAuth sign-in flow for Spotify API
    const oauthSignInSpotify = () => {
        const authUrl = 'https://accounts.spotify.com/authorize' +
            '?response_type=token' +
            '&client_id=' + SPOTIFY_CLIENT_ID +
            '&redirect_uri=' + SPOTIFY_REDIRECT_URI;
        window.location.href = authUrl;
    };

    // Function to handle the search button click
    const handleSearch = () => {
        fetch(`/api/spotify/v1/search?type=album,artist,track&q=${encodeURIComponent(searchQuery)}&market=US&limit=10`)
            .then(response => {
                if (!response.ok) {
                    console.error('HTTP error', response.status);
                    throw new Error('HTTP error ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log('Search Results:', data);
                if (!data.tracks) {
                    console.error('No tracks in response', data);
                    return;
                }
                setSearchResults(data.tracks.items);
            })
            .catch((error) => {
                console.error('Error occurred while searching:', error);
            });
    };

    // Function to handle the logout button click
    const logout = () => {
        window.location.href = '/';
    };

    return (
        <div className='spotify'>
            <SearchButton
                onClick={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {!isLoggedIn && <button className='spotify-btn-in' onClick={oauthSignInSpotify}>Login</button>}
            {isLoggedIn && <button className='spotify-btn-off' onClick={logout}>Logged In</button>}
            {searchResults.length > 0 ? (
                <div className='search-results'>
                    <h2>Search Results</h2>
                    <div className='spotify-music-container'>
                        {/* Render each search result track */}
                        {searchResults.map((track, index) => (
                            <div className='spotify-frame' style={{ animationDelay: `${index * 0.1}s` }} key={track.id}>
                                {/* Render Spotify track iframe */}
                                <iframe className='spotify-iframe'
                                    src={`https://open.spotify.com/embed/track/${track.id}`}
                                    width='300'
                                    height='85'
                                    frameborder='0'
                                    allowtransparency='true'
                                    allow='encrypted-media'
                                ></iframe>
                                Album: {track.album.name}
                            </div>
                        ))}

                    </div>
                </div>
            ) : (
                // This is the placeholder image that will render if searchResults is empty
                <div className='placeholder-container'>
                    <img className='placeholder-img' src={spotifyHolder} alt='placeholder' />
                </div>
            )}
        </div>
    );
}

export default Spotify;
