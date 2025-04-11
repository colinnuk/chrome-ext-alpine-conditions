import { parseText } from './utils/parseText.js';
import { buildUrl } from './utils/urlBuilder.js';

document.addEventListener('mouseup', function() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        const coordinates = parseText(selectedText);
        if (coordinates) {
            showCoordinateButton(coordinates, window.getSelection().getRangeAt(0));
            return;
        }
    }
    removeCoordinateButton();
});

function showCoordinateButton(coordinates, range) {    
    const button = document.createElement('button');
    button.id = 'alpine-conditions-button';
    button.innerHTML = '🏔️ View location on Alpine Conditions';
    button.type = 'button';
    button.style.cssText = `
        position: absolute;
        background: #4285F4;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        z-index: 999999;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        border: none;
        outline: none;
        transition: background 0.2s ease;
    `;
    
    button.addEventListener('mouseover', function() {
        this.style.background = '#3367D6';
    });
    
    button.addEventListener('mouseout', function() {
        this.style.background = '#4285F4';
    });
    
    const rect = range.getBoundingClientRect();
    button.style.top = `${rect.bottom + window.scrollY + 5}px`;
    button.style.left = `${rect.left + window.scrollX}px`;
    
    const clickHandler = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const url = buildUrl(coordinates.latitude, coordinates.longitude);        
        
        chrome.runtime.sendMessage({ action: "openTab", url: url });
        return false;
    };
    
    button.addEventListener('click', clickHandler);
    document.body.appendChild(button);
}

function removeCoordinateButton() {
    const existingButton = document.getElementById('alpine-conditions-button');
    if (existingButton) {
        existingButton.remove();
    }
}
