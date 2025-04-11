import { parseUrl } from '../utils/parseUrl.js';
import { buildUrl } from '../utils/urlBuilder.js';

document.addEventListener('DOMContentLoaded', function() {
    const coordinatesInfo = document.getElementById('coordinates-info');
    const navigateButton = document.getElementById('navigate-button');
    let latitude, longitude;
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentUrl = tabs[0].url;
        const coordinates = parseUrl(currentUrl);
        if (coordinates) {
            latitude = coordinates.lat;
            longitude = coordinates.lng;
            coordinatesInfo.textContent = `Coordinates: ${latitude}, ${longitude}`;
            navigateButton.disabled = false;
        } else {
            coordinatesInfo.textContent = "No valid coordinates found in URL";
        }
    });

    navigateButton.addEventListener('click', function() {
        if (latitude && longitude) {
            const url = buildUrl(latitude, longitude);
            chrome.tabs.create({ url: url });
        }
    });    
});