import React from 'react'
import ReactDOM from 'react-dom'
import Subsonic from './subsonic'
import App from './jsx/app'

/**
* Application bootstrap
*/
const subsonic = new Subsonic(
  localStorage.getItem('url') || 'http://localhost:4040',
  localStorage.getItem('username') || '',
  localStorage.getItem('token') || '',
  localStorage.getItem('salt') || '',
  "1.13.0", "Aurial"
);

const container = document.createElement('app');
document.body.appendChild(container);
ReactDOM.render(<App subsonic={subsonic} trackBuffer={localStorage.getItem('trackBuffer') || 0}/>, container);
