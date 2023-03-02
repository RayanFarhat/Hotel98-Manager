// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
    contextBridge.exposeInMainWorld("versions", process.versions);
});

contextBridge.exposeInMainWorld('db', {
    create: (args) => ipcRenderer.invoke('create-db', args),
    add: (args) => ipcRenderer.invoke('add-db', args),
    read: (args) => ipcRenderer.invoke('read-db', args),
    remove: (args) => ipcRenderer.invoke('remove-db', args),
    update: (args) => ipcRenderer.invoke('update-db', args),
});