export const formatImageUrl = (url) => {
    if (!url) return '';
    
    // 1. If it's already a full HTTP URL (and not double-prefixed), return as is
    if (url.startsWith('http') && !url.includes('/media/http')) {
        return url;
    }

    // 2. Check if the URL contains a double absolute path 
    // Example: /media/https://remote.com/image.jpg
    const mediaHttpIndex = url.indexOf('/media/http');
    if (mediaHttpIndex !== -1) {
        return decodeURIComponent(url.substring(mediaHttpIndex + 7));
    }

    // 3. Handle double /media/ if they exist
    let cleanUrl = url.replace('/media/media/', '/media/');
    
    // 4. Resolve relative paths
    const base = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/api\/?$/, '');
    
    // Ensure cleanUrl has a leading slash if it's relative
    if (!cleanUrl.startsWith('/') && !cleanUrl.startsWith('http')) {
        cleanUrl = '/' + cleanUrl;
    }

    return `${base}${cleanUrl}`;
};
