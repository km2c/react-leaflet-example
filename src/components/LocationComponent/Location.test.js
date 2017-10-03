import React from 'react';
import ReactDOM from 'react-dom';
import Location from './index';
import SaleData from '../../data/sales.json';
import PixelData from '../../data/pixels.json';

it('has data', () => {
	expect(SaleData).length
	expect(PixelData).length
});

it('has the location element exported', () => {
	expect(<Location />).toBeDefined()
})
