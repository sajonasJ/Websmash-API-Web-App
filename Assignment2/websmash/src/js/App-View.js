import logo from '../logo.svg';
import '../css/App.css';
import React from 'react';
import Nav from '../component/nav';
import Footer from '../component/footer';
import Rando from '../component/rando';


function App() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">
      <Rando/>
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
      <Footer />
    </div>
  );
}

export default App;