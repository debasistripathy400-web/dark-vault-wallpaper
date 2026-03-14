import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { User, Mail, Lock } from 'lucide-react';
import '../index.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/register/', formData);
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            setError('Registration failed. Username or email might be taken.');
        }
    };

    return (
        <div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px'}}>
            <div className="glass-card" style={{padding: '40px', width: '100%', maxWidth: '400px', textAlign: 'center'}}>
                <h2 className="text-gradient" style={{marginBottom: '5px', fontSize: '2rem'}}>Descend Into Shadows</h2>
                <p style={{color: 'var(--text-secondary)', marginBottom: '30px'}}>Create your vault and start collecting masterpieces.</p>
                
                {error && <p style={{color: '#ff4d4f', marginBottom: '15px'}}>{error}</p>}

                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <div className="glass-input" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <User size={18} color="var(--text-secondary)" />
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            value={formData.username}
                            onChange={handleChange}
                            required 
                            style={{background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none'}}
                        />
                    </div>

                    <div className="glass-input" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Mail size={18} color="var(--text-secondary)" />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email Address" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            style={{background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none'}}
                        />
                    </div>
                    
                    <div className="glass-input" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Lock size={18} color="var(--text-secondary)" />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                            style={{background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none'}}
                        />
                    </div>

                    <button type="submit" className="btn-glow" style={{marginTop: '10px', fontSize: '1.1rem'}}>Sign Up</button>
                </form>

                <p style={{marginTop: '25px', color: 'var(--text-secondary)'}}>
                    Already have an account? <Link to="/login" style={{color: 'var(--neon-purple)', textDecoration: 'none'}}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
