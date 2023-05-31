// TESTING FILE
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const YTKEY='AIzaSyCuuOLa6e7ikhWMj0hC4EU7xNLWESpPi4k';

function Google() {
  const [user, setUser] = useState({});
  const [searchResults, setSearchResults] = useState([]);

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
      client_id: "523712342751-tp8bha3p6ss9fhuk3mba331etieql7d7.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: "large" }
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
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: query,
          key: YTKEY,
        }
      });
      console.log('YouTube API Response:', response.data); // Log the response

      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error searching YouTube:', error);
    }
  }

  return (
    <div className='google'>
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 &&
        <button onClick={handleSignOut}>Sign Out</button>
      }
      {user &&
        <div>
          <img src={user.picture} alt="User Profile" />
          <h3>{user.name}</h3>
        </div>
      }

      <input type="text" onChange={(e) => searchYouTube(e.target.value)} />

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((item) => (
            <li key={item.id.videoId}>
              <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Google;

