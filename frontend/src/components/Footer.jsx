import React from 'react';

const Footer = ({ mode, activeTheme, onNavigate }) => {
    const isHome = mode === 'home';

    return (
        <footer className="main-footer" style={{
            background: isHome ? 'rgba(0, 0, 0, 0.6)' : (mode === 'mindCare' ? '#F0F9FF' : '#FAF5FF'),
            backdropFilter: isHome ? 'blur(10px)' : 'none',
            color: isHome ? 'white' : '#555',
            padding: '40px 50px 20px',
            borderTop: isHome ? 'none' : `1px solid ${activeTheme.accent}15`
        }}>
            <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
                <div className="footer-brand" style={{ flex: '1', minWidth: '250px' }}>
                    <h3 style={{ color: isHome ? 'white' : activeTheme.accent, marginBottom: '10px' }}>WellBeing Hub</h3>
                    <p style={{ color: isHome ? '#ddd' : '#777', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        "A comprehensive platform dedicated to holistic self-improvement. From calming mental exercises to actionable career skills, we provide the tools you need to thrive every day."          </p>
                </div>

                <div className="footer-links" style={{ display: 'flex', gap: '50px' }}>
                    <div className="footer-col">
                        <h4 style={{ color: isHome ? 'white' : '#444', marginBottom: '15px' }}>Navigation</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: isHome ? '#bbb' : '#666' }}>
                            <li
                                onClick={() => onNavigate('home')}
                                style={{ marginBottom: '8px', cursor: 'pointer' }}
                                className="footer-nav-link"
                            >
                                Main Dashboard
                            </li>
                            <li
                                onClick={() => onNavigate('mindCare')}
                                style={{ marginBottom: '8px', cursor: 'pointer' }}
                                className="footer-nav-link"
                            >
                                Mind Bloom
                            </li>
                            <li
                                onClick={() => onNavigate('personality')}
                                style={{ cursor: 'pointer' }}
                                className="footer-nav-link"
                            >
                                Identity Bloom
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom" style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                <p style={{ color: isHome ? '#aaa' : '#999', fontSize: '0.8rem' }}>
                    © 2026 WellBeing Hub | Developed by Zoya, Rahmat, Sania and Munnazzah
                </p>
                <p style={{ color: isHome ? '#aaa' : '#999', fontSize: '0.8rem' }}>Notice: Well Being Hub is a self-help tool designed to help you improve and grow at your own pace. We are here to support your journey, but we are not a substitute for professional medical, mental health, or expert advice.</p>
            </div>
        </footer>
    );
};

export default Footer;