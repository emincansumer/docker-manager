const { app, BrowserWindow } = require('electron');
const Shell = require('node-powershell');

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // load data
  loadData();

  // and load the index.html of the app.
  win.loadFile('index.html');

  
}

function loadData() {
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });
 
  ps.addCommand('echo node-powershell');
  ps.invoke()
    .then(output => {
      console.log(output);
      global.sharedObject = {
        commandResult: output
      };
    })
    .catch(err => {
      console.log(err);
    });
}

app.on('ready', createWindow);