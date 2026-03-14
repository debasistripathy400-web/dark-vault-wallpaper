import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axios';
import AuthContext from '../context/AuthContext';
import { Upload as UploadIcon, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Upload = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        resolution: '1080p',
        categoryId: '',
        selectedTags: [],
        image: null
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        // Fetch categories and tags
        const fetchData = async () => {
            try {
                const catRes = await axiosInstance.get('/categories/');
                const tagRes = await axiosInstance.get('/tags/');
                setCategories(catRes.data);
                setTags(tagRes.data);
                
                if(catRes.data.length > 0) {
                    setFormData(prev => ({...prev, categoryId: catRes.data[0].id}));
                }
            } catch (err) {
                console.error("Failed to load categories/tags", err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) return alert("Please select an image");

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('resolution', formData.resolution);
        data.append('category', formData.categoryId);
        data.append('image', formData.image);
        
        // Append tags properly format might vary based on your DRF setup
        formData.selectedTags.forEach(tagId => {
            data.append('tags', tagId);
        });

        try {
            await axiosInstance.post('/wallpapers/', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Wallpaper uploaded successfully! Pending approval.");
            navigate('/');
        } catch (error) {
            console.error("Upload error", error);
            alert("Upload failed.");
        }
    };

    if (!user) return <div style={{paddingTop: '100px', textAlign: 'center'}}>Please login to upload wallpapers.</div>;

    return (
        <div style={{minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px', display: 'flex', justifyContent: 'center'}}>
            <div className="glass-card" style={{padding: '40px', width: '100%', maxWidth: '800px'}}>
                <h2 className="text-gradient" style={{fontSize: '2.5rem', marginBottom: '10px'}}><UploadIcon size={30} style={{marginRight: '15px'}}/>Upload Wallpaper</h2>
                <p style={{color: 'var(--text-secondary)', marginBottom: '40px'}}>Share your stunning creations with the world.</p>

                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
                    
                    {/* Image Preview Area */}
                    <div style={{
                        width: '100%', height: '300px', borderRadius: '12px', 
                        border: '2px dashed var(--glass-border)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        overflow: 'hidden', position: 'relative', background: 'rgba(0,0,0,0.2)'
                    }}>
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                        ) : (
                            <div style={{textAlign: 'center', color: 'var(--text-secondary)'}}>
                                <ImageIcon size={50} style={{marginBottom: '10px', opacity: 0.5}}/>
                                <p>Click here or drag and drop your image</p>
                                <p style={{fontSize: '0.8rem', marginTop: '5px'}}>Supports JPG, PNG, WEBP</p>
                            </div>
                        )}
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer'}} 
                        />
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <label style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="glass-input" 
                                placeholder="E.g., Neon Cyberpunk City"
                            />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <label style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Resolution</label>
                            <select 
                                name="resolution" 
                                value={formData.resolution}
                                onChange={handleChange}
                                className="glass-input" 
                                style={{backgroundColor: 'var(--bg-primary)'}}
                            >
                                <option value="1080p">1080p Full HD</option>
                                <option value="1440p">1440p QHD</option>
                                <option value="4K">4K Ultra HD</option>
                                <option value="Mobile">Mobile Format</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <label style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Category</label>
                            <select 
                                name="categoryId" 
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="glass-input" 
                                style={{backgroundColor: 'var(--bg-primary)'}}
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <label style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Description (Optional)</label>
                        <textarea 
                            name="description" 
                            value={formData.description}
                            onChange={handleChange}
                            className="glass-input" 
                            rows="4"
                            placeholder="Tell us about this artwork..."
                        />
                    </div>
                    
                    <button type="submit" className="btn-glow" style={{fontSize: '1.2rem', padding: '15px'}}>Upload Now</button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
