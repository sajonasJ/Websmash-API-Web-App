import React, { useEffect } from 'react';
import '../css/nav.css';
import Header from '../component/header';
import Youtube from '../component/youtube';
import Pexels from '../component/pexels';
import Flickr from '../component/flickr';
import Spotify from '../component/spotify';
import flickrImg from '../assets/flickrImg.png';
import youtubeImg from '../assets/youtubeImg.png';
import pexelsImg from '../assets/pexelsImg.png';
import spotifyImg from '../assets/spotifyImg.png';
import wsImg from '../assets/wsImg.png';
import Instruction from '../component/instruction';

function Nav() {
  // useEffect hook to open the default tab when the component mounts
  useEffect(() => {
    document.getElementById('defaultOpen').click();
  }, []);

  // Function to open a specific tab and set its background color
  function openPage(pageName, elmnt, color) {
    const tabcontent = document.getElementsByClassName('tabname');
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    const tablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = '';
    }

    document.getElementById(pageName).style.display = 'block';
    elmnt.style.backgroundColor = color;
  }

  return (
    <div className='nav-container'>
    
      {/* Button for the Instruction tab */}
      <button className='tablink' onClick={(e) => openPage('Instruction', e.target, '#245c6c')} id='defaultOpen'><img src={wsImg} className='websmash-img' alt='ws-logo' /></button>
      {/* Button for the Youtube tab */}
      <button className='tablink' onClick={(e) => openPage('Youtube', e.target, '#dad7cd')}><img src={youtubeImg} className='youtube-img' alt='youtube-logo' /></button>
      {/* Button for the Pexels tab */}
      <button className='tablink' onClick={(e) => openPage('Pexels', e.target, '#04866c')}><img src={pexelsImg} className='pexels-img' alt='pexels-logo' /></button>
      {/* Button for the Flickr tab */}
      <button className='tablink' onClick={(e) => openPage('Flickr', e.target, '#d3d3d3')}><img src={flickrImg} className='flickr-img' alt='flickr-logo' /></button>
      {/* Button for the Spotify tab */}
      <button className='tablink' onClick={(e) => openPage('Spotify', e.target, '#298e4c')}><img src={spotifyImg} className='spotify-img' alt='spotify-logo' /></button>

      {/* Instruction tab */}
      <div id='Instruction' className='tabname'>
        <h1>WebSmash</h1>
        <br/>
        <Instruction />
      </div>

      {/* Youtube tab */}
      <div id='Youtube' className='tabname'>
        <h1>Youtube</h1>
        {/* <br/> */}
        <Youtube />
      </div>

      {/* Pexels tab */}
      <div id='Pexels' className='tabname'>
        <h1>Pexels</h1>
        <Pexels />
      </div>

      {/* Flickr tab */}
      <div id='Flickr' className='tabname'>
        <h1>Flickr</h1>
        <Flickr />
      </div>

      {/* Spotify tab */}
      <div id='Spotify' className='tabname'>
        <h1>Spotify</h1>
        <Spotify />
      </div>
    </div>
  );
}

export default Nav;
