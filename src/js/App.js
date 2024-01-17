import '../css/App.css';
import React from 'react';
import Footer from '../component/footer';
import WebSmash from '../component/websmash';
import Header from '../component/header';

function App() {
  //creates main react component
  return (
    <div className="App">
      <Header/>
      <WebSmash/>
      <Footer/>
    </div>
  );
}

export default App;