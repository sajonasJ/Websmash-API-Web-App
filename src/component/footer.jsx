import React from 'react';
import logo from '../logo.svg';
import '../css/footer.css';

function Footer() {
    //Creates the react footer component
    return (
        <div className='footer'>
            <h2 className='h2-footer'>Jonas Sajonas @ Griffith University</h2>
            <img src={logo} className='App-logo' alt='logo' />
        </div>
    );
}

export default Footer;
