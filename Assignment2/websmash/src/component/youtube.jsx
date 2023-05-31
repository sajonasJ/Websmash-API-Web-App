import React, { useState, useEffect } from 'react';
import SearchButton from '../component/searchButton';
import '../css/youtube.css';

const YTID = '523712342751-tp8bha3p6ss9fhuk3mba331etieql7d7.apps.googleusercontent.com';

function Youtube() {
    // State variables
    const [searchResults, setSearchResults] = useState([]); // Stores the search results from YouTube API
    const [searchQuery, setSearchQuery] = useState(''); // Stores the user's search query
    const [accessToken, setAccessToken] = useState(null); // Stores the access token for YouTube API authentication
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Stores the login status

    useEffect(() => {
        // Check if there is an access token in the URL hash when the component mounts
        const { hash } = window.location;
        if (hash) {
            const token = new URLSearchParams(hash.substr(1)).get('access_token');
            if (token) {
                setAccessToken(token);
                setIsLoggedIn(true);
            }
        }
    }, []);

    // Function to initiate OAuth sign-in flow for YouTube API
    const oauthSignIn = () => {
        // OAuth2 endpoint and parameters
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
        var form = document.createElement('form');
        form.setAttribute('method', 'GET');
        form.setAttribute('action', oauth2Endpoint);
        var params = {
            'client_id': YTID,
            'redirect_uri': 'https://localhost:3000',
            'response_type': 'token',
            'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
            'include_granted_scopes': 'true',
            'state': 'pass-through value'
        };

        // Create form inputs with OAuth parameters
        for (var p in params) {
            var input = document.createElement('input');
            // Set the type of the input element to 'hidden'
            input.setAttribute('type', 'hidden');
            // Set the name attribute of the input element to the current property name
            input.setAttribute('name', p);
            // Set the value attribute of the input element to the value of the current property
            input.setAttribute('value', params[p]);
            // Append the input element as a child of the form element
            form.appendChild(input);
        }
        // Append the form element as a child of the document body
        document.body.appendChild(form);
        // Submit the form
        form.submit();
    }

    // Function to log out and revoke the access token
    const logout = () => {
        fetch(`https://oauth2.googleapis.com/revoke`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${accessToken}`
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to revoke token');
                }
                console.log('Token revoked');
                setAccessToken(null);
                setIsLoggedIn(false);
                window.location.hash = '';
            })
            .catch(error => console.error('Error revoking token:', error));
    }

    // Function to search YouTube using the YouTube API
    async function searchYouTube(query) {
        try {
            const queryString = `q=${encodeURIComponent(query)}&part=snippet&videoEmbeddable=true&type=video`;
            const apiUrl = `/api/youtube/search?${queryString}`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Error searching YouTube: ' + response.status);
            }

            const responseData = await response.json();
            setSearchResults(responseData.items);
        } catch (error) {
            console.error('Error searching YouTube:', error);
        }
    }

    // Function to handle the search button click
    function handleSearch() {
        if (searchQuery !== '') {
            searchYouTube(searchQuery);
        }
    }

    return (
        <div className='youtube'>
            <SearchButton
                onClick={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {!isLoggedIn && <button className='yt-btn-in' onClick={oauthSignIn}>Sign In</button>}
            {isLoggedIn && <button className='yt-btn-off' onClick={logout}>Log Out</button>}
            {searchResults.length > 0 && (
                <div className='yt-video-container'>
                    {/* Render each search result video */}
                    {searchResults.map((item) => (
                        <div key={item.id.videoId} className='yt-frame'>
                            {/* Render YouTube video iframe */}
                            <iframe className='yt-iframe'
                                width='560'
                                height='315'
                                src={`https://www.youtube.com/embed/${item.id.videoId}`}
                                title={item.snippet.title}
                                frameborder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowfullscreen
                            ></iframe>
                            {/* <div className='yt-title'><h4>{item.snippet.title}</h4></div> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Youtube;
