import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axiosInstance from '../api/axios';
import { Camera, Save, Download as DownloadIcon, Heart, Clock } from 'lucide-react';
import { formatImageUrl } from '../utils/formatUrl';
import '../index.css';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState({
        username: '',
        bio: '',
        email: ''
    });
    const [downloads, setDownloads] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [activeTab, setActiveTab] = useState('settings');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/auth/profile/');
                setProfileData(response.data);
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };

        const fetchDownloads = async () => {
            try {
                const response = await axiosInstance.get('/downloads/');
                setDownloads(response.data.results || response.data);
            } catch (error) {
                console.error("Error fetching downloads", error);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await axiosInstance.get('/favorites/');
                setFavorites(response.data.results || response.data);
            } catch (error) {
                console.error("Error fetching favorites", error);
            }
        };

        fetchProfile();
        fetchDownloads();
        fetchFavorites();
    }, []);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put('/auth/profile/', profileData);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile.");
        }
    };

    if (!user) {
        return <div style={{paddingTop: '100px', textAlign: 'center'}}>Please login to view this page.</div>;
    }

    return (
        <div style={{minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px', display: 'flex', justifyContent: 'center'}}>
            <div className="container" style={{maxWidth: '1000px'}}>
                
                {/* Header Section */}
                <div className="glass-card" style={{padding: '40px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap'}}>
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '50%', 
                        background: 'linear-gradient(45deg, var(--neon-purple), var(--neon-cyan))',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        boxShadow: '0 0 30px rgba(157, 78, 221, 0.4)'
                    }}>
                        <Camera size={40} color="white" />
                    </div>
                    <div style={{flex: 1}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px'}}>
                            <h2 className="text-gradient" style={{fontSize: '2.5rem', margin: 0}}>{profileData.username || user.username}</h2>
                            <span className="tag glass-panel" style={{fontSize: '0.7rem'}}>{user.role}</span>
                        </div>
                        <p style={{color: 'var(--text-secondary)'}}>{profileData.bio || 'No bio provided.'}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{display: 'flex', gap: '15px', marginBottom: '30px'}}>
                    <button 
                        className={activeTab === 'settings' ? 'btn-glow' : 'glass-card'} 
                        onClick={() => setActiveTab('settings')}
                        style={{padding: '12px 25px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', cursor: 'pointer', color: 'white'}}
                    >
                        <Save size={18} /> Account Settings
                    </button>
                    <button 
                        className={activeTab === 'downloads' ? 'btn-glow' : 'glass-card'} 
                        onClick={() => setActiveTab('downloads')}
                        style={{padding: '12px 25px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', cursor: 'pointer', color: 'white'}}
                    >
                        <DownloadIcon size={18} /> Downloads ({downloads.length})
                    </button>
                    <button 
                        className={activeTab === 'favorites' ? 'btn-glow' : 'glass-card'} 
                        onClick={() => setActiveTab('favorites')}
                        style={{padding: '12px 25px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', cursor: 'pointer', color: 'white'}}
                    >
                        <Heart size={18} /> Favorites ({favorites.length})
                    </button>
                </div>

                {/* Tab Content */}
                <div className="glass-panel" style={{padding: '40px', borderRadius: '24px'}}>
                    {activeTab === 'settings' ? (
                        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '25px'}}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                <label style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Username</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={profileData.username} 
                                    onChange={handleChange}
                                    className="glass-input" 
                                />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                <label style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Email Address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={profileData.email} 
                                    className="glass-input" 
                                    disabled
                                    style={{opacity: 0.7, cursor: 'not-allowed'}}
                                />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                <label style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Bio</label>
                                <textarea 
                                    name="bio" 
                                    value={profileData.bio || ''} 
                                    onChange={handleChange}
                                    className="glass-input" 
                                    rows="4"
                                    placeholder="Tell the community about yourself..."
                                />
                            </div>
                            
                            {user.role === 'ADMIN' && (
                                <div className="glass-card" style={{padding: '20px', marginBottom: '20px', border: '1px solid var(--neon-purple)'}}>
                                    <h4 style={{color: 'var(--neon-purple)', marginBottom: '10px'}}>Admin Control</h4>
                                    <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '15px'}}>Access the core database to manage categories, users, and wallpapers.</p>
                                    <a href={`${(import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/').replace(/\/api\/?$/, '')}/admin/`} target="_blank" rel="noopener noreferrer" className="btn-glow" style={{padding: '10px 20px', fontSize: '0.9rem', display: 'inline-block', textDecoration: 'none'}}>
                                        Go to Admin Panel
                                    </a>
                                </div>
                            )}

                            <button type="submit" className="btn-glow" style={{padding: '15px', marginTop: '10px'}}>
                                Update Profile
                            </button>
                        </form>
                    ) : (
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px'}}>
                            {activeTab === 'downloads' ? (
                                downloads.length > 0 ? downloads.map(item => (
                                    <Link key={item.id} to={`/wallpaper/${item.wallpaper_details.id}`} className="glass-card" style={{textDecoration: 'none', color: 'inherit', overflow: 'hidden'}}>
                                        <div style={{height: '160px', overflow: 'hidden'}}>
                                            <img src={item.wallpaper_details.image.startsWith('http') ? item.wallpaper_details.image : `${(import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/').replace(/\/api\/?$/, '')}${item.wallpaper_details.image}`} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                        </div>
                                        <div style={{padding: '15px'}}>
                                            <h4 style={{marginBottom: '5px'}}>{item.wallpaper_details.title}</h4>
                                            <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: 'var(--text-secondary)'}}>
                                                <Clock size={12} /> {new Date(item.downloaded_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: 'var(--text-secondary)'}}>
                                        <DownloadIcon size={40} style={{marginBottom: '15px', opacity: 0.3}} />
                                        <p>You haven't downloaded any wallpapers yet.</p>
                                        <Link to="/wallpapers" className="text-gradient" style={{textDecoration: 'none', display: 'block', marginTop: '10px'}}>Browse Wallpapers</Link>
                                    </div>
                                )
                            ) : (
                                favorites.length > 0 ? favorites.map(item => (
                                    <Link key={item.id} to={`/wallpaper/${item.wallpaper_details.id}`} className="glass-card" style={{textDecoration: 'none', color: 'inherit', overflow: 'hidden'}}>
                                        <div style={{height: '160px', overflow: 'hidden'}}>
                                            <img src={item.wallpaper_details.image.startsWith('http') ? item.wallpaper_details.image : `${(import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/').replace(/\/api\/?$/, '')}${item.wallpaper_details.image}`} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                        </div>
                                        <div style={{padding: '15px'}}>
                                            <h4 style={{marginBottom: '5px'}}>{item.wallpaper_details.title}</h4>
                                            <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: 'var(--text-secondary)'}}>
                                                <Heart size={12} color="var(--neon-cyan)" fill="var(--neon-cyan)" /> Favorited
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: 'var(--text-secondary)'}}>
                                        <Heart size={40} style={{marginBottom: '15px', opacity: 0.3}} />
                                        <p>Your vault of favorites is empty.</p>
                                        <Link to="/wallpapers" className="text-gradient" style={{textDecoration: 'none', display: 'block', marginTop: '10px'}}>Go explore the shadows</Link>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Profile;

