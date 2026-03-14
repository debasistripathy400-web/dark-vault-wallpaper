import React from 'react';
import '../index.css';

const CopyrightPolicy = () => {
  return (
    <div style={{paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh'}}>
      <div className="container" style={{maxWidth: '800px'}}>
        <div className="glass-panel" style={{padding: '50px', borderRadius: '24px'}}>
          <h1 className="text-gradient" style={{fontSize: '3rem', marginBottom: '30px'}}>Copyright Policy</h1>
          
          <div style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
            <p style={{marginBottom: '20px'}}>
              <strong>DarkVault</strong> respects the intellectual property of artists and dark creators. We honor the "Copyright of the Crimson Soul."
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>1. Digital Rights</h3>
            <p style={{marginBottom: '20px'}}>
              All wallpapers hosted on this site remain the property of their respective creators. DarkVault provides a platform for distribution to the aesthetic community but does not claim ownership of user-uploaded art.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>2. Reporting Infringement (DMCA)</h3>
            <div style={{marginBottom: '20px'}}>
              If you believe your work has been uploaded to DarkVault without permission, please send a takedown notice to <strong>debasistripathy400@gmail.com</strong> with the following:
              <ul style={{marginLeft: '20px', marginTop: '10px'}}>
                <li>A link to the offending wallpaper on DarkVault.</li>
                <li>Proof of your original work or authorship.</li>
                <li>Your contact information.</li>
              </ul>
            </div>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>3. AI-Generated Content</h3>
            <p style={{marginBottom: '20px'}}>
              Wallpapers generated using our AI tools are provided under a permissive license for personal use. Attribution to DarkVault is appreciated but not mandatory for private use.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>4. Artist Credit</h3>
            <p style={{marginBottom: '20px'}}>
              Where possible, we encourage uploaders to provide correct attribution and links to the original artist's portfolio. We value the integrity of the creative process.
            </p>

            <p style={{marginTop: '40px', fontSize: '0.9rem', fontStyle: 'italic'}}>
              Last updated: March 15, 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightPolicy;
