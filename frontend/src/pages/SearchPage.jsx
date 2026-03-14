import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import '../index.css';

const SearchPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [wallpapers, setWallpapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/wallpapers/?search=${query || ''}`);
                setWallpapers(response.data.results || response.data);
                setLoading(false);
            } catch (err) {
                console.error("Search error", err);
                setLoading(false);
            }
        };
        fetchResults();
    }, [query]);

    if (loading) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Searching for "{query}"...</div>;

    return (
        <div style={{paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px'}}>
            <div className="container">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', flexWrap: 'wrap', gap: '20px'}}>
                    <div>
                        <h1 className="text-gradient" style={{fontSize: '2.5rem', marginBottom: '10px'}}>Search Results for "{query}"</h1>
                        <p style={{color: 'var(--text-secondary)'}}>Found {wallpapers.length} breathtaking wallpapers matching your search.</p>
                    </div>
                </div>

                <div className="wallpaper-grid">
                    {wallpapers.length > 0 ? wallpapers.map(wp => (
                        <Link key={wp.id} to={`/wallpaper/${wp.id}`} className="wallpaper-card glass-card" style={{textDecoration: 'none', color: 'inherit'}}>
                            <img src={wp.image} alt={wp.title} className="wallpaper-img-placeholder" style={{objectFit: 'cover'}} />
                            <div className="wallpaper-info">
                                <h4>{wp.title}</h4>
                                <span>{wp.resolution} • {wp.category_details?.name}</span>
                            </div>
                        </Link>
                    )) : (
                        <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '100px', color: 'var(--text-secondary)'}}>
                            <SearchIcon size={50} style={{marginBottom: '20px', opacity: 0.3}} />
                            <h2 style={{marginBottom: '20px'}}>No results for "{query}"</h2>
                            <p>Try searching for keywords like "Nature", "Abstract", or "Cyberpunk".</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
