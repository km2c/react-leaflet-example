import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Circle, Popup, LayerGroup, LayersControl, FeatureGroup, TileLayer } from 'react-leaflet';
import './Location.css';

// eslint-disable-next-line
import MakiMarkers from 'leaflet-makimarkers';
const mark = L.MakiMarkers;

mark.accessToken = 'pk.eyJ1IjoibWF0dGdyb3ZlciIsImEiOiJjaXphOTN4bTkwMXN3MndvOHUxYnRnemFrIn0.c6KQEI_ziiWRGROmNtWKgw';
let phone = mark.icon({ icon: 'mobilephone', color: '#DF1E36', size: 's' });
let house = mark.icon({ icon: 'warehouse', color: '#4286f4', size: 's' });

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lng: null
        };
    }

    setLatLong(e) {
        this.setState({
            lat: e.latlng.lat,
            lng: e.latlng.lng
        });
    }

    render() {
        const SaleData = this.props.sale;
        const PixelData = this.props.pixel;
        const position = SaleData.length ? [SaleData[0].latitude, SaleData[0].longitude] : [0, 0];
        let inner = this.props.innerRadius * 1;
        let outer = inner * 2.5;
        let dynPos = [this.state.lat, this.state.lng];
        let url = `http://google.com/maps?z=12&t=k&q=loc:${this.state.lat}+${this.state.lng}`;
        let sale = SaleData.map(s => (
            <LayerGroup key={Math.random()}>
                <Marker position={[s.latitude, s.longitude]} icon={house} key={Math.random()}>
                    <Popup>
                        <span>Sales ID: {s.sales_id}</span>
                    </Popup>
                </Marker>
                <Circle
                    center={[s.latitude, s.longitude]}
                    radius={inner}
                    color={'#DF1E36'}
                    weight={2}
                    fillColor={'#DF1E36'}
                    fillOpacity={0.1}
                />
                <Circle
                    center={[s.latitude, s.longitude]}
                    radius={outer}
                    color={'#DF1E36'}
                    weight={1}
                    fillColor={'#DF1E36'}
                    fillOpacity={0.075}
                />
            </LayerGroup>
        ));
        let pixel = PixelData.map(p => (
            <Marker position={[p.pixel_latitude, p.pixel_longitude]} icon={phone} key={Math.random()}>
                <Popup>
                    <span>
                        IP address: {p.ip_address} <br />Sales ID: {p.sales_id}
                    </span>
                </Popup>
            </Marker>
        ));

        return (
            <Map center={position} zoom={13} onClick={this.setLatLong.bind(this)}>
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                <LayersControl position="topright">
                    <LayersControl.Overlay name="Sales" checked>
                        <FeatureGroup color="purple">{sale}</FeatureGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Pixels" checked>
                        <FeatureGroup color="purple">{pixel}</FeatureGroup>
                    </LayersControl.Overlay>
                </LayersControl>

                {this.state.lat ? (
                    <Marker position={dynPos}>
                        <Popup>
                            <span>
                                <a href={url} target="_blank">
                                    lat: {this.state.lat} <br /> lng: {this.state.lng}
                                </a>
                            </span>
                        </Popup>
                    </Marker>
                ) : (
                    ''
                )}
            </Map>
        );
    }
}

export default Location;
