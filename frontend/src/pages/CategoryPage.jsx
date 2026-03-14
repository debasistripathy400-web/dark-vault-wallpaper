import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { Filter, Grid, List as ListIcon } from 'lucide-react';
import '../index.css';

const CategoryPage = () => {
    const { slug } = useParams();
    const [wallpapers, setWallpapers] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryData = async () => {
            setLoading(true);
            try {
                // Fetch category info
                const catRes = await axiosInstance.get(`/categories/${slug}/`);
                setCategory(catRes.data);

                // Fetch wallpapers in this category
                const wpRes = await axiosInstance.get(`/wallpapers/?category__slug=${slug}`);
                setWallpapers(wpRes.data.results || wpRes.data);
                
                setLoading(false);
            } catch (err) {
                console.error("Error fetching category data", err);
                setLoading(false);
            }
        };
        fetchCategoryData();
    }, [slug]);

    if (loading) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading {slug}...</div>;

    return (
        <div style={{paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px'}}>
            <div className="container">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', flexWrap: 'wrap', gap: '20px'}}>
                    <div>
                        <h1 className="text-gradient" style={{fontSize: '3.5rem', marginBottom: '10px'}}>{category?.name}</h1>
                        <p style={{color: 'var(--text-secondary)'}}>Explore high-quality {category?.name.toLowerCase()} wallpapers.</p>
                    </div>
                    
                    <div className="glass-panel" style={{display: 'flex', padding: '10px', gap: '10px', borderRadius: '30px'}}>
                        <button className="glass-card" style={{padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', color: 'white'}}>
                            <Filter size={18} /> Filter
                        </button>
                        <select className="glass-input" style={{padding: '8px 15px', border: 'none', backgroundColor: 'transparent'}}>
                            <option value="latest">Latest</option>
                            <option value="popular">Popular</option>
                            <option value="downloads">Most Downloaded</option>
                        </select>
                    </div>
                </div>

                <div className="wallpaper-grid">
                    {wallpapers.length > 0 ? wallpapers.map(wp => (
                        <Link key={wp.id} to={`/wallpaper/${wp.id}`} className="wallpaper-card glass-card" style={{textDecoration: 'none', color: 'inherit'}}>
                            <img src={wp.image} alt={wp.title} className="wallpaper-img-placeholder" style={{objectFit: 'cover'}} />
                            <div className="wallpaper-info">
                                <h4>{wp.title}</h4>
                                <span>{wp.resolution}</span>
                            </div>
                        </Link>
                    )) : (
                        <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '100px', color: 'var(--text-secondary)'}}>
                            <h2 style={{marginBottom: '20px'}}>No wallpapers found in this category yet.</h2>
                            <Link to="/upload" className="btn-glow" style={{textDecoration: 'none'}}>Be the first to upload!</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
