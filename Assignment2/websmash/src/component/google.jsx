import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';


function Google() {
    const [user, setUser] = useState({});

    function handleCallbackResponse(response) {
        console.log('encoded JWT ID token' + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById('signInDiv').hidden = true;
    }
    function handleSignOut(event) {
        setUser({});
        document.getElementById('signInDiv').hidden = false;
    }


    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id: "523712342751-tp8bha3p6ss9fhuk3mba331etieql7d7.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline,', size: "large" }
        )

    }, []);
    return (
        <div className='google'>
            <div id="signInDiv"></div>
            {Object.keys(user).length != 0 &&
            <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            
            }
            {user &&
                <div>
                    <img src={user.picture}></img>
                    <h3>{user.name}</h3>
                </div>
            }
        </div>
    )
}
export default Google;

