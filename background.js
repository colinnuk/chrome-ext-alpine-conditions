const contextMenu = require('./contextMenu');
const { openTabWithCoordinates } = require('./utils/urlBuilder');

chrome.runtime.onInstalled.addListener(() => {
    contextMenu.createContextMenu();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openTab') {
        openTabWithCoordinates(request.lat, request.lng);
    }
});