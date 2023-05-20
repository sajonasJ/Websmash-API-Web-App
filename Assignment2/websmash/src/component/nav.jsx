import React from "react";
import '../css/nav.css';
import Header from '../component/header';

class Nav extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="nav-items">
                    <a href="#">Home</a>
                    <a href="#">Car</a>
                    <a href="#">Train</a>
                    <a href="#">Plane</a>
                </div>
            </div>
        );
    }
}

export default Nav;