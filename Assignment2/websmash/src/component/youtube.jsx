import React, { useState, useEffect } from 'react';
import SearchButton from '../component/searchButton';
import '../css/youtube.css';

const YTID = '523712342751-tp8bha3p6ss9fhuk3mba331etieql7d7.apps.googleusercontent.com';

function Youtube() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const { hash } = window.location;
        if (hash) {
            const token = new URLSearchParams(hash.substr(1)).get('access_token');
            if (token) {
                setAccessToken(token);
                setIsLoggedIn(true);
            }
        }
    }, []);

    const oauthSignIn = () => {
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

        for (var p in params) {
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);
            input.setAttribute('value', params[p]);
            form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
    }

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
                    {searchResults.map((item) => (
                        <div key={item.id.videoId} className='yt-frame'>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${item.id.videoId}`}
                                title={item.snippet.title}
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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