import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import './Home.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/categories/');
                setCategories(response.data.results || response.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div style={{paddingTop: '120px', minHeight: '100vh'}} className="container">
            <h1 className="section-title text-gradient" style={{fontSize: '3.5rem', marginBottom: '50px'}}>All Categories</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', paddingBottom: '100px'}}>
                {categories.length > 0 ? categories.map(cat => (
                    <Link 
                        key={cat.id} 
                        to={`/category/${cat.slug}`} 
                        className="glass-card category-card-new" 
                        style={{
                            height: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            background: cat.cover_image ? 'transparent' : 'linear-gradient(45deg, rgba(0, 243, 255, 0.05), rgba(157, 78, 221, 0.05))'
                        }}
                    >
                        {cat.cover_image && (
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, width: '100%', height: '100%',
                                backgroundImage: `url(${cat.cover_image.startsWith('http') ? cat.cover_image : `http://127.0.0.1:8000${cat.cover_image}`})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: 0.6,
                                zIndex: 0,
                                transition: 'transform 0.5s ease',
                            }} className="cat-bg-img"></div>
                        )}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, width: '100%', height: '100%',
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))',
                            zIndex: 1
                        }}></div>
                        <h3 style={{
                            fontSize: '1.8rem', 
                            zIndex: 2, 
                            fontWeight: 800, 
                            letterSpacing: '2px',
                            textShadow: '0 4px 15px rgba(0,0,0,0.8)',
                            textTransform: 'uppercase'
                        }}>{cat.name}</h3>
                    </Link>
                )) : (
                    // Fallback categories if none fetched or while loading
                    ['Nature', 'Gaming', 'Abstract', 'Cars', 'Technology', 'Minimalist'].map((name, i) => (
                      <div key={i} className="glass-card" style={{height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', opacity: 0.1}}>
                         <h3 style={{fontSize: '1.5rem'}}>{name}</h3>
                      </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Categories;
