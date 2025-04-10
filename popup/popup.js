document.addEventListener('DOMContentLoaded', function() {
    const navigateButton = document.getElementById('navigateButton');
    const coordinatesInput = document.getElementById('coordinatesInput');

    navigateButton.addEventListener('click', function() {
        const coordinates = coordinatesInput.value.trim();
        if (coordinates) {
            const [lat, long] = coordinates.split(',').map(coord => coord.trim());
            if (isValidCoordinate(lat) && isValidCoordinate(long)) {
                const url = buildUrl(lat, long);
                chrome.tabs.create({ url: url });
            } else {
                alert('Please enter valid latitude and longitude.');
            }
        } else {
            alert('Please enter coordinates.');
        }
    });

    function isValidCoordinate(coord) {
        const num = parseFloat(coord);
        return !isNaN(num) && num >= -90 && num <= 90;
    }

    function buildUrl(lat, long) {
        // Replace with the actual URL structure for the external mapping site
        return `https://example.com/map?lat=${lat}&long=${long}`;
    }
});