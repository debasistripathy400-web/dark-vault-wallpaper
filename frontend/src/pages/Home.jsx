import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { Search, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import './Home.css';

const AnimatedShape = ({ position, color, type }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={position} ref={meshRef}>
        {type === 'dodecahedron' ? <dodecahedronGeometry args={[1, 0]} /> : <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />}
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} wireframe />
      </mesh>
    </Float>
  );
};

const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      {/* Lights - Updated to Crimson/Purple Gothic Theme */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#9d0208" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3c096c" />
      
      {/* Environment */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      {/* Objects */}
      <AnimatedShape position={[-3, 1, -2]} color="#ffffff" type="dodecahedron" />
      <AnimatedShape position={[3, -1, -2]} color="#ffffff" type="torusknot" />
      <AnimatedShape position={[0, -2, -4]} color="#ffffff" type="dodecahedron" />
    </Canvas>
  );
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trending, setTrending] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wallpaperRes, categoryRes] = await Promise.all([
          axiosInstance.get('/wallpapers/?ordering=-views&limit=6'),
          axiosInstance.get('/categories/')
        ]);
        setTrending(wallpaperRes.data.results || wallpaperRes.data);
        setCategories(categoryRes.data.results || categoryRes.data);
      } catch (err) {
        console.error("Error fetching home data", err);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section with 3D Background */}
      <section className="hero-section">
        <div className="canvas-container">
          <HeroScene />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title text-gradient" style={{fontSize: '5rem', marginBottom: '5px'}}>DARKVAULT</h1>
          <p className="hero-tagline" style={{
            color: 'var(--accent-crimson)', 
            fontSize: '1.2rem', 
            fontWeight: 700, 
            letterSpacing: '5px', 
            marginBottom: '30px',
            textTransform: 'uppercase'
          }}>Enter the Realm of Dark Aesthetics</p>
          <p className="hero-subtitle" style={{maxWidth: '600px', margin: '0 auto 40px'}}>
            Descend into a curated sanctuary of gothic artworks, mysterious landscapes, and dark high-fidelity captures.
          </p>
          
          <form className="search-bar glass-panel" onSubmit={handleSearch}>
            <Search className="search-icon" size={20} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search the shadows..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input search-input"
            />
            <button type="submit" className="btn-glow search-btn">Explore</button>
          </form>

          <div className="trending-tags">
            <span>Popular:</span>
            {categories.slice(0, 4).map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="tag glass-card" style={{textDecoration: 'none'}}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Wallpapers */}
      <section className="featured-section container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
          <h2 className="section-title text-gradient" style={{margin: 0}}>Trending Wallpapers</h2>
          <Link to="/wallpapers" style={{color: 'var(--neon-cyan)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px'}}>
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="wallpaper-grid">
           {trending.length > 0 ? trending.map(wp => (
             <Link key={wp.id} to={`/wallpaper/${wp.id}`} className="wallpaper-card glass-card" style={{textDecoration: 'none', color: 'inherit'}}>
               <img src={wp.image} alt={wp.title} className="wallpaper-img-placeholder" style={{objectFit: 'cover'}} />
               <div className="wallpaper-info">
                  <h4>{wp.title}</h4>
                  <span>{wp.resolution} • {wp.category_details?.name}</span>
               </div>
             </Link>
           )) : (
             // Fallback placeholders if no data yet
             [1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="wallpaper-card glass-card">
                 <div className="wallpaper-img-placeholder" style={{
                   background: `linear-gradient(45deg, var(--neon-purple), var(--neon-blue))`,
                   opacity: 0.3
                 }}></div>
                 <div className="wallpaper-info">
                    <h4>Nebula Dream {i}</h4>
                    <span>4K Ultra HD</span>
                 </div>
               </div>
             ))
           )}
        </div>
      </section>

      {/* Categories Preview */}
      <section className="categories-section container" style={{paddingBottom: '100px'}}>
        <h2 className="section-title text-gradient">Browse Categories</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '25px'}}>
          {categories.length > 0 ? categories.map(cat => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.slug}`} 
              className="glass-card category-card-new" 
              style={{
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: cat.cover_image ? 'transparent' : 'linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(0, 245, 212, 0.1))'
              }}
            >
              {cat.cover_image && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  backgroundImage: `url(${cat.cover_image.startsWith('http') ? cat.cover_image : `${(import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/').replace(/\/api\/?$/, '')}${cat.cover_image}`})`,
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
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))',
                zIndex: 1
              }}></div>
              <h3 style={{
                fontSize: '1.4rem', 
                zIndex: 2, 
                fontWeight: 700, 
                letterSpacing: '1px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                textTransform: 'uppercase'
              }}>{cat.name}</h3>
            </Link>
          )) : (
            // Fallback categories if none fetched or while loading
            ['Nature', 'Gaming', 'Abstract', 'Cars'].map((name, i) => (
              <div key={i} className="glass-card" style={{height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', opacity: 0.2}}>
                 <h3 style={{fontSize: '1.2rem'}}>{name}</h3>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

