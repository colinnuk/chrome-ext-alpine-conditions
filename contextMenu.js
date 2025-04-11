import { parseText } from './utils/parseText.js';
import { buildUrl } from './utils/urlBuilder.js';

const contextMenuItemId = "navigateToCoordinates";

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: contextMenuItemId,
        title: "Navigate to Alpine Conditions",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === contextMenuItemId) {
        const selectedText = info.selectionText;
        const coordinates = parseText(selectedText);
        
        if (coordinates) {
            const url = buildUrl(coordinates.latitude, coordinates.longitude);
            chrome.tabs.create({ url: url });
        }
    }
});