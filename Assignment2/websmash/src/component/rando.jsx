import React from "react";
import '../css/rando.css';



class Rando extends React.Component {
    render() {
        return (
            <div className="rando-btn">
                <input type="text" id="search-input" onChange={this.handleChange}/><br/>
                <button className="search-btn" onClick={this.search}>Search</button>
            </div>
        );
    }

}

export default Rando;