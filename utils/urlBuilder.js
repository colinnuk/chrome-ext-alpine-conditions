function buildGoogleMapsUrl(lat, lng) {
    return `https://www.google.com/maps/@${lat},${lng},15z`;
}

function buildGaiaGpxUrl(lat, lng) {
    return `https://www.gaiagps.com/map/?lat=${lat}&lon=${lng}`;
}

function buildCalTopoUrl(lat, lng) {
    return `https://caltopo.com/map.html#ll=${lat},${lng}`;
}

function buildCustomUrl(lat, lng, site) {
    switch (site) {
        case 'google':
            return buildGoogleMapsUrl(lat, lng);
        case 'gaia':
            return buildGaiaGpxUrl(lat, lng);
        case 'caltopo':
            return buildCalTopoUrl(lat, lng);
        default:
            return null;
    }
}

export { buildGoogleMapsUrl, buildGaiaGpxUrl, buildCalTopoUrl, buildCustomUrl };