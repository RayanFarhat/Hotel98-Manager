// Module to control the application lifecycle and the native browser window.
const { app, Menu, dialog, BrowserWindow, protocol, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

// Create the native browser window.
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        icon: __dirname + '/Hotel98Logo.ico',
        // Set the path of an additional "preload" script that can be used to
        // communicate between node-land and browser-land.
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // In production, set the initial browser path to the local bundle generated
    // by the Create React App build process.
    // In development, set it to localhost to allow live/hot-reloading.
    const appURL = app.isPackaged
        ? url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
        })
        : "http://localhost:3000";
    mainWindow.loadURL(appURL);

    // Automatically open Chrome's DevTools in development mode.
    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
    protocol.registerHttpProtocol(
        "file",
        (request, callback) => {
            const url = request.url.substr(8);
            callback({ path: path.normalize(`${__dirname}/${url}`) });
        },
        // (error) => {
        //     if (error) console.error("Failed to register protocol");
        // }
    );
}

// Create the app menu
const menuTemplate = [
    {
        label: 'Help',
        submenu: [
            {
                label: 'About Hotel98',
                click: () => {
                    // Show a dialog box with some help text
                    dialog.showMessageBox({
                        type: 'info',
                        message: 'Hotel98 v1.0',
                        detail: "Hotel98 is a simple hotel manager software app for small hotel businesses.\n??COPYRIGHT: Rayan Farhat",
                        buttons: ['OK']
                    });
                }
            }
        ]
    }
];

// Create the app menu from the template
const menu = Menu.buildFromTemplate(menuTemplate);
// Set the app menu
Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
    setupLocalFilesNormalizerProxy();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = "https://my-electron-app.com";
app.on("web-contents-created", (event, contents) => {
    contents.on("will-navigate", (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);

        if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
            event.preventDefault();
        }
    });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


const DatabaseConstructor = require('better-sqlite3');
let db;

ipcMain.handle('create-db', async (events, args) => {
    db = new DatabaseConstructor('data.db', { verbose: console.log });

    db.prepare(`CREATE TABLE IF NOT EXISTS rents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fromDate TEXT NOT NULL,
        toDate TEXT NOT NULL,
        takers TEXT NOT NULL,
        price INTEGER NOT NULL,
        roomNumber INTEGER NOT NULL
      )`).run();
});

ipcMain.handle('read-db', (events, args) => {
    // Prepare a SELECT statement to read data from the my_table table
    // Execute the SELECT statement and retrieve all rows
    return db.prepare('SELECT * FROM rents').all();
});

ipcMain.handle('add-db', (events, args) => {
    // insert a new row into 'my_table' with ID automatically generated by SQLite
    db.prepare('INSERT INTO rents (fromDate, toDate, takers, price, roomNumber) VALUES (?, ?, ?, ?, ?)')
        .run(args.fromDate, args.toDate, args.takers, args.price, args.roomNumber);
});

ipcMain.handle('update-db', (events, args) => {
    db.prepare('UPDATE rents SET fromDate = ?, toDate = ?, takers = ?, price = ?, roomNumber = ? WHERE id = ?')
        .run(args.fromDate, args.toDate, args.takers, args.price, args.roomNumber, args.id);
});

// i get the id of the rent element
ipcMain.handle('remove-db', (events, args) => {
    db.prepare('DELETE FROM rents WHERE id = ?').run(args);
});

