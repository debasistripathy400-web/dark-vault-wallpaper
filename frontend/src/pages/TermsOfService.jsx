import React from 'react';
import '../index.css';

const TermsOfService = () => {
  return (
    <div style={{paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh'}}>
      <div className="container" style={{maxWidth: '800px'}}>
        <div className="glass-panel" style={{padding: '50px', borderRadius: '24px'}}>
          <h1 className="text-gradient" style={{fontSize: '3rem', marginBottom: '30px'}}>Terms of Service</h1>
          
          <div style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
            <p style={{marginBottom: '20px'}}>
              Welcome to <strong>DarkVault</strong>. By accessing our sanctuary of shadows, you agree to be bound by these Terms of Service. Please read them carefully before descending further.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>1. Acceptance of Terms</h3>
            <p style={{marginBottom: '20px'}}>
              By using DarkVault, you confirm that you are at least 13 years of age and agree to abide by these terms. If you do not agree, you are not permitted to use this site.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>2. User Content</h3>
            <p style={{marginBottom: '20px'}}>
              Users may upload wallpapers provided they hold the necessary rights to the content. Artificial Intelligence generated content is permitted as long as it adheres to our quality standards.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>3. Usage License</h3>
            <p style={{marginBottom: '20px'}}>
              Wallpapers on DarkVault are provided for personal, non-commercial use as desktop and mobile backgrounds. Redistribution or commercial sale of these artworks without explicit permission from the original creator is strictly prohibited.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>4. Prohibited Conduct</h3>
            <p style={{marginBottom: '20px'}}>
              You agree not to use DarkVault for any unlawful purposes, including the transmission of malware, harassment of other users, or the upload of content that violates third-party intellectual property rights.
            </p>

            <h3 style={{color: 'white', marginTop: '30px', marginBottom: '15px'}}>5. Termination</h3>
            <p style={{marginBottom: '20px'}}>
              We reserve the right to terminate access to DarkVault or remove any content at our sole discretion, without prior notice, if these terms are violated.
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

export default TermsOfService;
