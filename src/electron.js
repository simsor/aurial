const { app, BrowserWindow } = require('electron');

function createWindow () {
    if (process.platform == "win32") {
        app.setAppUserModelId("Aurial Music Player");
    }

    console.log(__dirname);

    // Create the browser window.
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: "dist/css/aurial_icon.png",
        webPreferences: {
            nodeIntegration: true
        }
    });
    //win.setMenu(null);

    // and load the index.html of the app.
    win.loadFile('index.html');
}

app.on('ready', createWindow);
