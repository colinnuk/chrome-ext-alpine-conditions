chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Background script received message:", request);
    
    if (request.action === "openTab") {
        chrome.tabs.create({ url: request.url });
        sendResponse({ success: true });
    }
    
    return true;
});
