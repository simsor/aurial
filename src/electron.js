const { app, BrowserWindow } = require('electron');

function createWindow () {
    if (process.platform == "win32") {
        app.setAppUserModelId("Aurial Music Player");
    }

    // Create the browser window.
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: "dist/css/aurial_icon.png",
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (process.env["NODE_ENV"] == "production") {
        win.setMenu(null);
    }

    // and load the index.html of the app.
    win.loadFile(__dirname + '/index.html');
}

app.on('ready', createWindow);
