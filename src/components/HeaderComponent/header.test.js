import React from 'react';
import ReactDOM from 'react-dom';
import Header from './index';

it('has the header element exported', () => {
	expect(<Header />).toBeDefined()
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
});
