import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Menu, X, User, LogOut, Upload, Settings } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar glass-panel">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)} style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
                    <img src="/assets/logo.png" alt="DarkVault Logo" style={{height: '85px', width: 'auto', filter: 'drop-shadow(0 0 12px rgba(208, 0, 0, 0.4))'}} />
                </Link>

                <div className="menu-icon" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <X color="white" /> : <Menu color="white" />}
                </div>

                <ul className={isMobileMenuOpen ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={toggleMobileMenu}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/categories" className="nav-links" onClick={toggleMobileMenu}>Categories</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ai-generator" className="nav-links" onClick={toggleMobileMenu}>AI Generator</Link>
                    </li>
                    {user && (user.role === 'ADMIN' || user.role === 'MODERATOR') && (
                        <li className="nav-item">
                            <Link to="/moderation" className="nav-links" style={{color: 'var(--neon-purple)'}} onClick={toggleMobileMenu}>Moderation</Link>
                        </li>
                    )}
                    
                    {user ? (
                        <>
                            <li className="nav-item nav-profile">
                                <span className="nav-links profile-trigger" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                                    <User size={20} /> {user.username}
                                </span>
                                {isProfileDropdownOpen && (
                                    <div className="profile-dropdown glass-card">
                                        <div style={{padding: '10px 15px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '5px'}}>
                                            <span style={{fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px'}}>Role</span>
                                            <p style={{fontSize: '0.9rem', color: user.role === 'ADMIN' ? 'var(--neon-purple)' : 'var(--neon-cyan)', fontWeight: 'bold'}}>{user.role}</p>
                                        </div>
                                        <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileDropdownOpen(false)}><Settings size={16}/> Profile</Link>
                                        <button onClick={() => { logoutUser(); setIsProfileDropdownOpen(false); }} className="dropdown-item logout"><LogOut size={16}/> Logout</button>
                                    </div>
                                )}
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-links" style={{padding: '0.5rem 1.2rem'}} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="btn-glow" onClick={toggleMobileMenu}>Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
