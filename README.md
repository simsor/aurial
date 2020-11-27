# Aurial

Aurial is a browser-based HTML/JavaScript client interface for streaming music
from [Subsonic](http://subsonic.org/), [Airsonic](https://airsonic.github.io/),
[Navidrome](https://www.navidrome.org/), or other software and services
implementing the Subsonic API, and does does not require the use of a
Flash-based player or plugin.

Aurial's aim is to provide a simple, intuitive and straight-forward interface
to browse and play your music, and to be as easy to deploy as it is to
configure and use.

As such, it focusses exclusively on playback of your music library, and by
design does not support other media types, such as video, podcasts or internet
radio.


## Building

The project is built via NPM and [Webpack](https://webpack.github.io/).

Install `npm` for your platform, and then execute the following in the project
root directory (alternatively, `yarn` may also be used):

```
$ npm install
$ npm run <watch|dist|start|gui|pack|pack-installer>
```

A `dist` directory will be produced containing the built output, which may be
served via an HTTP server and accessed via a web browser.

`watch` includes additional debug information, which may not be optimal for
production or general-use deployments, and produces a significantly larger
download; it recompiles code as changes are made. `dist` will produce
uglified and minified output suitable for "production" deployment. `start` will
run Aurial in Webpack's dev server on port 8080 (or next available port above
that), and allows automatic reloading of the page as code changes are made.

`gui` will build the app using Electron and run it. There is no auto-reload in this mode.

`pack` and `pack-installer` will pack the application using `electron-builder` respectively in "directory" mode and in "installer" mode for the current platform. Don't hesitate to edit `package.json` if you want to build it for other platforms.