import React from 'react';
import '../index.css';

const PrivacyPolicy = () => {
  return (
    <div style={{paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh'}}>
      <div className="container" style={{maxWidth: '800px'}}>
        <div className="glass-panel" style={{padding: '50px', borderRadius: '24px'}}>
          <h1 className="text-gradient" style={{fontSize: '3rem', marginBottom: '30px'}}>Privacy Policy</h1>
          
          <div style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
            <p style={{marginBottom: '20px'}}>
              At <strong>DarkVault</strong>, we respect your privacy as much as we value digital art. This policy outlines how we handle the shadows of your data.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>1. Information We Collect</h3>
            <div style={{marginBottom: '20px'}}>
              We collect minimal information required for functional use:
              <ul style={{marginLeft: '20px', marginTop: '10px'}}>
                <li>Account details (Username & Email) for registered users.</li>
                <li>Usage statistics (Downloads and Page Views) to rank popular content.</li>
                <li>IP addresses for security and spam prevention.</li>
              </ul>
            </div>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>2. Cookies</h3>
            <p style={{marginBottom: '20px'}}>
              We use "session cookies" to keep you logged in and local storage to remember your theme preferences. No tracking or advertising cookies are used for third-party profiling.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>3. Data Security</h3>
            <p style={{marginBottom: '20px'}}>
              Your data is stored securely in our encrypted vault. While we strive to protect your personal information, no method of transmission over the Internet is 100% secure.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>4. Your Rights</h3>
            <p style={{marginBottom: '20px'}}>
              You have the right to access, correct, or delete your account data at any time. If you wish to disappear from our records, simply delete your account from your profile settings.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>5. Third-Party Links</h3>
            <p style={{marginBottom: '20px'}}>
              Our site may contain links to external artistic platforms. We are not responsible for the privacy practices of those external realms.
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

export default PrivacyPolicy;
