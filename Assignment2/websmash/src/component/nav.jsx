import React from "react";
import '../css/nav.css';
import Header from '../component/header';

class Nav extends React.Component {
    state = {
        menu: ["Home", "Car", "Train", "Plane"]
    }

    render() {
        return (
            <div className="nav-container">
                <Header />
                <div className="nav-items">
                    {this.state.menu.map((item, index) => (
                        <a key={index} href="#">{item}</a>
                    ))}
                </div>
            </div>
        );
    }
}

export default Nav;
