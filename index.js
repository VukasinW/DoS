const { app, BrowserWindow } = require('electron');


app.whenReady().then(() => {
    const window = new BrowserWindow({
        width: 540,
        height: 500,
        autoHideMenuBar: true,
        maximizable: false,
        resizable: false,
        title: 'Death Star DDoS Attacker',
        // icon: './resources/app/iterface/resources/icon.png',
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true
        }
    });

    window.setIcon(`${process.cwd()}/resources/icon.png`);
    window.loadFile(`${process.cwd()}/interface/index.html`);
});
