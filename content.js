document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.href;
    const coordinates = parseUrl(currentUrl);

    if (coordinates) {
        chrome.runtime.sendMessage({ 
            action: 'navigateToAc', 
            coordinates: coordinates 
        });
    }
});