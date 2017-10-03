import React, { Component } from 'react';
import './App.css';
import Header from './components/HeaderComponent';
import Location from './components/LocationComponent';
import request from 'superagent';
import _ from 'lodash';
const env = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
const salesLocation = process.env.NODE_ENV === 'development' ? '/data/sales.json' : '';
const pixelsLocation = process.env.NODE_ENV === 'development' ? '/data/pixels.json' : '';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            innerRadius: 250,
            sale: [],
            pixel: []
        };
    }
    updateRadius(e) {
        this.setState({
            innerRadius: e.target.value
        });
    }
    componentDidMount() {
        request
            .get(`${env}${salesLocation}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                this.setState({
                    sale: JSON.parse(res.text)
                });
            });

        request
            .get(`${env}${pixelsLocation}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                let px = _.uniqBy(JSON.parse(res.text), 'ip_address');
                this.setState({
                    pixel: px
                });
            });
    }
    render() {
        return (
            <div className="map">
                <Header />
                <div className="radius">
                    Update radius: <input type="number" name="radius" onChange={this.updateRadius.bind(this)} />
                    <br />Inner circle: {this.state.innerRadius} meters <br />Outer circle:{' '}
                    {this.state.innerRadius * 2.5} meters
                </div>
                <Location innerRadius={this.state.innerRadius} sale={this.state.sale} pixel={this.state.pixel} />
            </div>
        );
    }
}

export default App;
