import logo from '../logo.svg';
import '../css/App.css';
import React from 'react';
import Nav from '../component/nav';
import Footer from '../component/footer';
import Rando from '../component/rando';
import VideoSearch from '../component/pexel';
import Google from '../component/google';


function App() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">
       
       
      <Rando/>
      <Google/>
        <img src={logo} className="App-logo" alt="logo" />
  
        <p>
          Jonas is Learning React
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
      <h1>My App</h1>
      <VideoSearch />
    </div>
      <Footer />
    </div>
  );
}

export default App;