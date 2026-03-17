import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Github, Mail } from 'lucide-react';
import '../index.css';

const Footer = () => {
  return (
    <footer className="glass-panel" style={{
      marginTop: 'auto',
      padding: '60px 0 30px',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: 'none',
      borderRadius: 0
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        <div>
          <div style={{marginBottom: '15px'}}>
            <img src="/assets/logo.png" alt="DarkVault Logo" style={{height: '80px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(208, 0, 0, 0.2))'}} />
          </div>
          <p style={{color: 'var(--accent-crimson)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px', marginBottom: '20px', textTransform: 'uppercase'}}>Enter the Realm of Dark Aesthetics</p>
          <p style={{color: 'var(--text-secondary)', lineHeight: 1.6}}>
            The premier sanctuary for mysterious and gothic artworks. Join the cult of aesthetic darkness.
          </p>
          <div style={{display: 'flex', gap: '20px', marginTop: '20px'}}>
            <a href="https://www.instagram.com/d.ttripathyy._/" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
              <Instagram size={20} color="var(--text-secondary)" style={{cursor: 'pointer'}} />
            </a>
            <a href="https://www.linkedin.com/in/debasis-tripathy-4709b4323/" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
              <Linkedin size={20} color="var(--text-secondary)" style={{cursor: 'pointer'}} />
            </a>
            <a href="https://github.com/debasistripathy400-web/dark-vault-wallpaper" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}} title="Share Project Code">
              <Github size={20} color="var(--neon-cyan)" style={{cursor: 'pointer'}} />
            </a>
            <button 
              onClick={() => {
                navigator.clipboard.writeText("https://github.com/debasistripathy400-web/dark-vault-wallpaper");
                alert("Project repository link copied to clipboard! Thanks for sharing the code.");
              }}
              className="glass-panel"
              style={{
                background: 'transparent',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: '10px',
                fontSize: '0.7rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              Share Code
            </button>
          </div>
        </div>

        <div>
          <h4 style={{marginBottom: '20px', color: 'white'}}>Quick Links</h4>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <li><Link to="/" style={{color: 'var(--text-secondary)', textDecoration: 'none'}}>Home</Link></li>
            <li><Link to="/wallpapers" style={{color: 'var(--text-secondary)', textDecoration: 'none'}}>All Wallpapers</Link></li>
            <li><Link to="/profile" style={{color: 'var(--text-secondary)', textDecoration: 'none'}}>My Profile</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{marginBottom: '20px', color: 'white'}}>Legal</h4>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <li><Link to="/terms" style={{color: 'var(--text-secondary)', textDecoration: 'none'}}>Terms of Service</Link></li>
            <li><Link to="/privacy" style={{color: 'var(--text-secondary)', textDecoration: 'none'}}>Privacy Policy</Link></li>
            <li><Link to="/copyright" style={{color: 'var(--text-secondary)', textDecoration: 'none'}}>Copyright Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{marginBottom: '20px', color: 'white'}}>Contact Us</h4>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)'}}>
              <Mail size={18} />
              <a href="mailto:debasistripathy400@gmail.com" style={{color: 'inherit', textDecoration: 'none'}}>debasistripathy400@gmail.com</a>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)'}}>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
              <a href="https://wa.me/918117091712" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>+91 8117091712</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{
        paddingTop: '30px',
        borderTop: '1px solid var(--glass-border)',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}>
        &copy; 2026 DarkVault ✨ Descend into high-fidelity darkness.
      </div>
    </footer>
  );
};

export default Footer;
