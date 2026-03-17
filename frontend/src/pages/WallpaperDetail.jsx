import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { Download, Heart, Share2, Expand, Maximize, Eye } from 'lucide-react';
import { formatImageUrl } from '../utils/formatUrl';
import '../index.css';

const WallpaperDetail = () => {
    const { id } = useParams();
    const [wallpaper, setWallpaper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const fetchWallpaper = async () => {
            try {
                const response = await axiosInstance.get(`/wallpapers/${id}/`);
                setWallpaper(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch wallpaper", err);
                setLoading(false);
            }
        };

        const checkFavorite = async () => {
            try {
                // We'll check the list of favorites for this user
                const response = await axiosInstance.get('/favorites/');
                const favs = response.data.results || response.data;
                const match = favs.find(f => f.wallpaper === parseInt(id));
                if (match) setIsFavorited(true);
            } catch (err) {
                // Silent error if not logged in
            }
        };

        fetchWallpaper();
        checkFavorite();
    }, [id]);

    const handleDownload = async () => {
        const formattedUrl = formatImageUrl(wallpaper.image);
        try {
            // First, record the download in the backend
            await axiosInstance.post(`/wallpapers/${id}/download/`);
            
            // Try to fetch as blob for "proper" download
            const response = await fetch(formattedUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', `${wallpaper.title.replace(/\s+/g, '_')}_DarkVault.jpg`);
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            // Optimistically update the UI count
            setWallpaper(prev => ({ ...prev, downloads: (prev.downloads || 0) + 1 }));
        } catch (error) {
            console.warn("Blob download failed, falling back to direct link:", error);
            // Fallback: Open in new tab or direct download if server supports it
            const link = document.createElement('a');
            link.href = formattedUrl;
            link.target = '_blank';
            link.setAttribute('download', `${wallpaper.title.replace(/\s+/g, '_')}_DarkVault.jpg`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Still update the count
            setWallpaper(prev => ({ ...prev, downloads: (prev.downloads || 0) + 1 }));
        }
    };

    const handleFavorite = async () => {
        try {
            const response = await axiosInstance.post(`/wallpapers/${id}/favorite/`);
            if (response.data.status === 'favorited') {
                setIsFavorited(true);
            } else {
                setIsFavorited(false);
            }
        } catch (error) {
            console.error("Favorite failed", error);
            if(error.response?.status === 401) {
                alert("Please login into your vault to favorite wallpapers.");
            }
        }
    };

    if (loading) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>;
    if (!wallpaper) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Wallpaper not found.</div>;

    return (
        <div style={{paddingTop: '100px', minHeight: '100vh', paddingBottom: '50px'}}>
            <div className="container" style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
                
                {/* Header Info */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px'}}>
                    <div>
                        <h1 className="text-gradient" style={{fontSize: '3rem', marginBottom: '10px'}}>{wallpaper.title}</h1>
                        <div style={{display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-secondary)'}}>
                            <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Eye size={16}/> {wallpaper.views || 0}</span>
                            <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Download size={16}/> {wallpaper.downloads || 0}</span>
                            <span style={{background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem'}}>
                                {wallpaper.resolution}
                            </span>
                        </div>
                    </div>
                    
                    <div style={{display: 'flex', gap: '15px'}}>
                        <button 
                            className="glass-card" 
                            style={{
                                padding: '12px', 
                                border: 'none', 
                                color: isFavorited ? 'var(--neon-cyan)' : 'white', 
                                cursor: 'pointer', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                transition: 'all 0.3s ease'
                            }} 
                            onClick={handleFavorite}
                            title={isFavorited ? "Remove from vault" : "Add to favorites"}
                        >
                            <Heart size={24} fill={isFavorited ? "var(--neon-cyan)" : "none"} />
                        </button>
                        <button className="glass-card" style={{padding: '12px', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Share2 size={24} />
                        </button>
                        <button className="btn-glow" onClick={handleDownload} style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem'}}>
                            <Download size={20} /> Free Download
                        </button>
                    </div>
                </div>

                {/* Main Image View */}
                <div 
                    id="wallpaper-preview-container"
                    className="glass-panel" 
                    style={{
                        width: '100%', 
                        maxHeight: '75vh', 
                        borderRadius: '20px', 
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#000',
                        position: 'relative'
                    }}
                >
                    <img 
                        src={formatImageUrl(wallpaper.image)} 
                        alt={wallpaper.title} 
                        style={{maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain'}} 
                    />
                    <button 
                        onClick={() => {
                            const container = document.getElementById('wallpaper-preview-container');
                            if (container.requestFullscreen) {
                                container.requestFullscreen();
                            } else if (container.webkitRequestFullscreen) { /* Safari */
                                container.webkitRequestFullscreen();
                            } else if (container.msRequestFullscreen) { /* IE11 */
                                container.msRequestFullscreen();
                            }
                        }}
                        style={{
                            position: 'absolute', bottom: '20px', right: '20px', 
                            background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', 
                            color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer',
                            backdropFilter: 'blur(5px)',
                            zIndex: 10
                        }}
                    >
                        <Maximize size={24} />
                    </button>
                </div>

                {/* Details Grid */}
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '20px'}}>
                    
                    {/* Uploader Info */}
                    <div className="glass-card" style={{padding: '25px', display: 'flex', alignItems: 'center', gap: '20px'}}>
                        <div style={{width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--neon-cyan), var(--neon-blue))'}}></div>
                        <div>
                            <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '5px'}}>Uploaded by</p>
                            <h3 style={{fontSize: '1.2rem'}}>{wallpaper.uploader_details?.username || 'Unknown Artist'}</h3>
                        </div>
                    </div>

                    {/* Metadata & Description */}
                    <div className="glass-card" style={{padding: '25px'}}>
                        <h3 style={{marginBottom: '15px'}}>Details</h3>
                        <p style={{color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px'}}>
                            {wallpaper.description || 'No description provided for this artwork.'}
                        </p>
                        
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                            {wallpaper.category_details && (
                                <span className="tag glass-panel" style={{padding: '5px 12px', fontSize: '0.8rem'}}>
                                    Category: {wallpaper.category_details.name}
                                </span>
                            )}
                            {wallpaper.tags_details && wallpaper.tags_details.map(tag => (
                                <span key={tag.id} className="tag glass-panel" style={{padding: '5px 12px', fontSize: '0.8rem'}}>
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default WallpaperDetail;
