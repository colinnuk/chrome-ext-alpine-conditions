import { buildUrl } from './utils/urlBuilder.js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'navigateToAc') {
        const { latitude, longitude } = request.coordinates;
        const url = buildUrl(latitude, longitude);
        chrome.tabs.create({ url: url });
    } else if (request.action === 'getCoordinates') {

        sendResponse({ coordinates: latestCoordinates });
    }
});