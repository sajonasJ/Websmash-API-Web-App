import React from "react";
import '../css/header.css';


class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <a className="a-header" href="http://localhost:3000/#"><h2 className="h2-header">Web Smash</h2></a>
            </div>
        );
    }
}

export default Header;