export const formatImageUrl = (url) => {
    if (!url) return '';
    
    // Check if the URL contains a double absolute path (happens with ImageField + remote URLs)
    // Example: https://domain.com/media/https://remote.com/image.jpg
    const mediaIndex = url.lastIndexOf('/media/http');
    if (mediaIndex !== -1) {
        // Extract just the remote URL part
        return decodeURIComponent(url.substring(mediaIndex + 7));
    }
    
    // If it's already a full HTTP URL, return as is
    if (url.startsWith('http')) {
        return url;
    }
    
    // Otherwise, append the base URL (for local relative paths)
    const base = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/').replace(/\/api\/?$/, '');
    return `${base}${url}`;
};
