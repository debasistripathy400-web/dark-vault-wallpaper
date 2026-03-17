import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { Filter, Search as SearchIcon, SortDesc } from 'lucide-react';
import { formatImageUrl } from '../utils/formatUrl';
import '../index.css';

const WallpapersPage = () => {
    const [wallpapers, setWallpapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        resolution: '',
        ordering: '-uploaded_at'
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.get('/categories/');
                setCategories(res.data.results || res.data);
            } catch (err) {
                console.error("Error fetching categories", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchWallpapers = async () => {
            setLoading(true);
            try {
                let url = `/wallpapers/?ordering=${filters.ordering}`;
                if (filters.category) url += `&category__slug=${filters.category}`;
                if (filters.resolution) url += `&resolution=${filters.resolution}`;
                
                const response = await axiosInstance.get(url);
                setWallpapers(response.data.results || response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching wallpapers", err);
                setLoading(false);
            }
        };
        fetchWallpapers();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div style={{paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px'}}>
            <div className="container">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px'}}>
                    <h1 className="text-gradient" style={{fontSize: '3rem'}}>All Wallpapers</h1>
                    
                    <div className="glass-panel" style={{display: 'flex', padding: '10px', gap: '15px', borderRadius: '30px', flexWrap: 'wrap'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px'}}>
                            <Filter size={18} color="var(--text-secondary)" />
                            <select name="category" value={filters.category} onChange={handleFilterChange} className="glass-input" style={{padding: '5px 10px', border: 'none', background: 'transparent'}}>
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px'}}>
                            <SortDesc size={18} color="var(--text-secondary)" />
                            <select name="ordering" value={filters.ordering} onChange={handleFilterChange} className="glass-input" style={{padding: '5px 10px', border: 'none', background: 'transparent'}}>
                                <option value="-uploaded_at">Latest</option>
                                <option value="-views">Most Popular</option>
                                <option value="-downloads">Most Downloaded</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="wallpaper-grid">
                    {wallpapers.length > 0 ? wallpapers.map(wp => (
                        <Link key={wp.id} to={`/wallpaper/${wp.id}`} className="wallpaper-card glass-card" style={{textDecoration: 'none', color: 'inherit'}}>
                            <img src={formatImageUrl(wp.image)} alt={wp.title} className="wallpaper-img-placeholder" style={{objectFit: 'cover'}} />
                            <div className="wallpaper-info">
                                <h4>{wp.title}</h4>
                                <span>{wp.resolution} • {wp.category_details?.name}</span>
                            </div>
                        </Link>
                    )) : (
                        <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '100px', color: 'var(--text-secondary)'}}>
                            {loading ? <h2>Loading wallpapers...</h2> : <h2>No wallpapers found matching your filters.</h2>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WallpapersPage;
