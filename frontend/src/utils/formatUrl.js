export const formatImageUrl = (url) => {
    if (!url) return '';
    
    // 1. If it's a relative path starting with /media/http, extract the absolute part
    if (url.startsWith('/media/http')) {
        return decodeURIComponent(url.substring(7));
    }

    // 2. If it's an absolute path but contains another protocol mid-way
    // Example: https://yourdomain.com/https://images.unsplash.com/...
    // Example: https://yourdomain.com/media/https://images.unsplash.com/...
    const nestedHttpIndex = url.indexOf('http', 1);
    if (nestedHttpIndex !== -1) {
        // Find the start of the true absolute URL (the second 'http')
        let trueUrl = url.substring(nestedHttpIndex);
        // If it was prefixed with /media/, extract only the URL payload
        if (trueUrl.startsWith('media/http')) {
            trueUrl = trueUrl.substring(6);
        }
        return decodeURIComponent(trueUrl);
    }
    
    // 3. If it's pure domain without protocol (some seeders/databases might store it like this)
    if ((url.includes('unsplash.com') || url.includes('images.unsplash.com')) && !url.startsWith('http')) {
        return `https://${url.replace(/^\/+/, '')}`;
    }

    // 4. Normal absolute URLs
    if (url.startsWith('http')) {
        return url;
    }

    // 5. Handling relative static/media paths
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/';
    const base = apiBaseUrl.replace(/\/api\/?$/, '');
    let cleanUrl = url.replace('/media/media/', '/media/');
    
    if (!cleanUrl.startsWith('/') && !cleanUrl.startsWith('http')) {
        cleanUrl = '/' + cleanUrl;
    }

    return `${base}${cleanUrl}`;
};
