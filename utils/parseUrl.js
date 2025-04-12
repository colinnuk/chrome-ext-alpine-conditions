function parseGoogleMapsUrl(url) {
    try {
        // Extract coordinates from Google Maps URL format: @lat,lng,zoom
        const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match && match.length >= 3) {
            return {
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2])
            };
        }
    } catch (error) {
        console.error("Error parsing Google Maps URL:", error);
    }
    return null;
}

function parseGaiaGpsUrl(url) {
    try {
        const urlObj = new URL(url);
        
        const locParam = urlObj.searchParams.get('loc');
        if (locParam) {
            const parts = locParam.split('/');
            if (parts.length >= 3) {
                // Format: zoom/longitude/latitude
                return {
                    lat: parseFloat(parts[2]),
                    lng: parseFloat(parts[1])
                };
            }
        }
        // Fallback to lat/lon parameters if loc is not available
        const lat = urlObj.searchParams.get('lat');
        const lng = urlObj.searchParams.get('lon');
        
        if (lat && lng) {
            return {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            };
        }
    } catch (error) {
        console.error("Error parsing Gaia GPS URL:", error);
    }
    return null;
}

function parseCalTopoUrl(url) {
    try {
        // Extract coordinates from CalTopo URL format: ll=lat,lng
        const match = url.match(/ll=(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match && match.length >= 3) {
            return {
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2])
            };
        }
    } catch (error) {
        console.error("Error parsing CalTopo URL:", error);
    }
    return null;
}

function tryParseGenericLatLonUrl(url) {
    try {
        const urlObj = new URL(url);
        const params = urlObj.searchParams;

        let lat = params.get('lat') || params.get('latitude');
        let lng = params.get('lon') || params.get('longitude');

        if (lat && lng) {
            return {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            };
        }
    } catch (error) {
        console.error("Error parsing generic lat/lon URL:", error);
    }
    return null;
}

function identifySiteFromUrl(url) {
    try {
        if (url.includes('google.com/maps')) {
            return 'google';
        } else if (url.includes('gaiagps.com')) {
            return 'gaia';
        } else if (url.includes('caltopo.com')) {
            return 'caltopo';
        }
    } catch (error) {
        console.error("Error identifying site from URL:", error);
    }
    return null;
}

export function parseUrl(url) {
    const siteType = identifySiteFromUrl(url);

    switch (siteType) {
        case 'google':
            return parseGoogleMapsUrl(url);
        case 'gaia':
            return parseGaiaGpsUrl(url);
        case 'caltopo':
            return parseCalTopoUrl(url);
    }
    return tryParseGenericLatLonUrl(url);
}
