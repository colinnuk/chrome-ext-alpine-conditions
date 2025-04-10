document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.href;
    const coordinates = extractCoordinates(currentUrl);

    if (coordinates) {
        chrome.runtime.sendMessage({ action: 'updateCoordinates', coordinates: coordinates });
    }

    function extractCoordinates(url) {
        const regex = /[+-]?([0-9]*[.])?[0-9]+,[ ]*[+-]?([0-9]*[.])?[0-9]+/;
        const match = url.match(regex);
        return match ? match[0].split(',').map(coord => parseFloat(coord.trim())) : null;
    }
});