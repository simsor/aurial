import {h, render} from 'preact'
import Subsonic from './subsonic'
import App from './jsx/app'

/**
* Application bootstrap
*/
const subsonic = new Subsonic(
	localStorage.getItem('url') || 'https://demo.subsonic.org',
	localStorage.getItem('username') || 'guest2',
	localStorage.getItem('token') || '462707a1daa7b926a8301992e2b8e325',
	localStorage.getItem('salt') || '90357c6c7b5cf5f32abd22c6e94dd4c2',
	"1.13.0", "Aurial"
);

const container = document.createElement('app');
document.body.appendChild(container);
render(
	<App subsonic={subsonic}
		trackBuffer={localStorage.getItem('trackBuffer') || 0}
		persistQueue={localStorage.getItem('persistQueue') === 'true'}
	/>,
	container);
