export function extractCoordinatesFromUrl(url) {
    const regex = /[?&]lat=([-+]?[0-9]*\.?[0-9]+)&lon=([-+]?[0-9]*\.?[0-9]+)/;
    const match = url.match(regex);
    if (match) {
        return {
            latitude: parseFloat(match[1]),
            longitude: parseFloat(match[2])
        };
    }
    return null;
}

export function extractCoordinatesFromText(text) {
    const regex = /([-+]?[0-9]*\.?[0-9]+)\s*,\s*([-+]?[0-9]*\.?[0-9]+)/;
    const match = text.match(regex);
    if (match) {
        return {
            latitude: parseFloat(match[1]),
            longitude: parseFloat(match[2])
        };
    }
    return null;
}