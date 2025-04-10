const contextMenuItemId = "navigateToCoordinates";

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: contextMenuItemId,
        title: "Navigate to Coordinates",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === contextMenuItemId) {
        const selectedText = info.selectionText;
        const coordinates = extractCoordinates(selectedText);
        
        if (coordinates) {
            const url = buildUrl(coordinates.latitude, coordinates.longitude);
            chrome.tabs.create({ url: url });
        } else {
            alert("No valid coordinates selected.");
        }
    }
});

function extractCoordinates(text) {
    const regex = /(-?\d+\.\d+),\s*(-?\d+\.\d+)/;
    const match = text.match(regex);
    
    if (match) {
        return {
            latitude: match[1],
            longitude: match[2]
        };
    }
    return null;
}

function buildUrl(latitude, longitude) {
    return `https://example.com/map?lat=${latitude}&lon=${longitude}`;
}