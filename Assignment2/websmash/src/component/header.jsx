import React from "react";
import '../css/header.css';
import wbs from '../assets/wbs.png';

function Header() {
    // Creates the header component
    return (
        <div className='header'>
            <a className='a-title' href='#'> <img src={wbs} className='wbs-logo' alt='logo' /></a>
        </div>
    );
}

export default Header;
