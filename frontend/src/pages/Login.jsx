import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Mail, Lock, User as UserIcon } from 'lucide-react';
import '../index.css';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser(e);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px'}}>
            <div className="glass-card" style={{padding: '40px', width: '100%', maxWidth: '400px', textAlign: 'center'}}>
                <h2 className="text-gradient" style={{marginBottom: '5px', fontSize: '2rem'}}>Re-enter the Vault</h2>
                <p style={{color: 'var(--text-secondary)', marginBottom: '30px'}}>Continue your descent into aesthetics.</p>
                
                {error && <p style={{color: '#ff4d4f', marginBottom: '15px'}}>{error}</p>}

                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <div className="glass-input" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <UserIcon size={18} color="var(--text-secondary)" />
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
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
                            required 
                            style={{background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none'}}
                        />
                    </div>

                    <button type="submit" className="btn-glow" style={{marginTop: '10px', fontSize: '1.1rem'}}>Login</button>
                </form>

                <p style={{marginTop: '25px', color: 'var(--text-secondary)'}}>
                    New here? <Link to="/register" style={{color: 'var(--neon-cyan)', textDecoration: 'none'}}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
