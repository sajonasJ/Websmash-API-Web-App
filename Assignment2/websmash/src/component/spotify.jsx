import React, { useEffect, useState } from 'react';
import SearchButton from '../component/searchButton';
import '../css/spotify.css';

const SPOTIFY_CLIENT_ID = 'b385a7550af34cb2bde8a992baf52101';
const SPOTIFY_REDIRECT_URI = 'https://localhost:3000';
const SPOTIFY_SCOPES = [];

function Spotify() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.hash.substr(1));
        const accessToken = urlParams.get('access_token');

        if (accessToken) {
            // Perform any necessary actions with the access token
            console.log('Access token:', accessToken);
            setIsLoggedIn(true);

            const expiresIn = urlParams.get('expires_in');
            const expirationTime = new Date().getTime() + expiresIn * 1000;
            console.log('Token expires at:', new Date(expirationTime));
        }
    }, []);

    const oauthSignIn = () => {
        const authUrl = 'https://accounts.spotify.com/authorize' +
            '?response_type=token' +
            '&client_id=' + encodeURIComponent(SPOTIFY_CLIENT_ID) +
            '&scope=' + encodeURIComponent(SPOTIFY_SCOPES.join(' ')) +
            '&redirect_uri=' + encodeURIComponent(SPOTIFY_REDIRECT_URI);

        window.location.href = authUrl;
    };

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
            {!isLoggedIn && <button className='spotify-btn-in' onClick={oauthSignIn}>Login</button>}
            {isLoggedIn && <button className='spotify-btn-off' onClick={logout}>Logged In</button>}
            {searchResults.length > 0 && (
                <div className='search-results'>
                    <h2>Search Results</h2>
                    <div className='spotify-music-container'>
                        {searchResults.map((track) => (
                            <div className='spotify-frame' key={track.id}>
                                <iframe className='spotify-iframe'
                                    src={`https://open.spotify.com/embed/track/${track.id}`}
                                    width='300'
                                    height='85'
                                    frameborder='0'
                                    allowtransparency='true'
                                    allow='encrypted-media'
                                > </iframe>
                                Album: {track.album.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Spotify;
