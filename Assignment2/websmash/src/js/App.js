import '../css/App.css';
import React from 'react';
import Footer from '../component/footer';
import WebSmash from '../component/websmash';

function App() {
  //creates main react component
  return (
    <div className="App">
      <WebSmash/>
      <Footer/>
    </div>
  );
}

export default App;