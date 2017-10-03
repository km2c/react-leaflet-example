import React, { Component } from 'react';
import './header.css';

class Header extends Component {
    toggleOpacity(e) {
        e.preventDefault();
        let circle = document.querySelectorAll('path[stroke="#DF1E36"]');
        circle.forEach(function(k) {
            if (k.style.display !== 'none') {
                k.style.display = 'none';
            } else {
                k.style.display = 'block';
            }
        });
    }
    render() {
        return (
            <div>
                <h1>
                    <b>Leaflet</b> Anonymap
                </h1>
                <div className="link-bar">
                    <a href="" onClick={this.toggleOpacity} className="toggle">
                        Toggle radius
                    </a>
                </div>
            </div>
        );
    }
}

export default Header;
