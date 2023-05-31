import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import SearchButton from '../component/searchButton';

const YTKEY = 'AIzaSyCuuOLa6e7ikhWMj0hC4EU7xNLWESpPi4k';
const YTID = '523712342751-tp8bha3p6ss9fhuk3mba331etieql7d7.apps.googleusercontent.com';

function Youtube() {
    const [user, setUser] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    function handleCallbackResponse(response) {
        var userObject = jwt_decode(response.credential);
        setUser(userObject);
        document.getElementById('signInDiv').hidden = true;
    }

    function handleSignOut() {
        setUser({});
        document.getElementById('signInDiv').hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: YTID,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline', size: 'large' }
        );

        // Check if the user is already authenticated on component mount
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const userObject = jwt_decode(token);
            setUser(userObject);
            document.getElementById('signInDiv').hidden = true;
        }
    }, []);

    async function searchYouTube(query) {
        try {
            const queryString = `q=${encodeURIComponent(query)}&part=snippet&key=${YTKEY}`;
            const apiUrl = `/api/youtube/search?${queryString}`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
        <div className='google'>
            <SearchButton
                onClick={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div id='signInDiv'></div>
            {user && (
                <div>
                    <img src={user.picture} alt='User Profile' />
                    <h3>{user.name}</h3>
                </div>
            )}

            {Object.keys(user).length !== 0 && (
                <button className='google-yt-btn' onClick={handleSignOut}>Sign Out</button>
            )}

            {searchResults.length > 0 && (
                <div className='yt-video-container'>
                    {searchResults.map((item) => (
                        <div key={item.id.videoId} className='yt-frame'>
                            <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
                            <div className='yt-title'><h4>{item.snippet.title}</h4></div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}

export default Youtube;