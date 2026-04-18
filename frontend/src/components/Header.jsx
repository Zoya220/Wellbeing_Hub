import React from 'react';

const Header = ({ user, activeTheme, onHome, onLogout }) => {
    return (
        <nav className="navbar" style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(15px)',
            borderBottom: `1px solid ${activeTheme.accent}22`
        }}>
            <div className="nav-left">
                <h2 className="nav-logo" style={{ color: activeTheme.accent, margin: 0 }}>
                    {activeTheme.accent === '#0288D1' ? '🌸 Mind Bloom' : '✨ Identity Bloom'}
                </h2>
            </div>

            <div className="nav-right">
                <div className="profile-text-only" style={{ marginRight: '15px' }}>
                    <span style={{ color: '#555', fontSize: '0.9rem' }}>Welcome back, </span>
                    <span style={{ color: activeTheme.accent, fontWeight: '600' }}>
                        {user?.name || "Explorer"}
                    </span>
                </div>
                <button onClick={onHome} className="nav-home-btn-hover">Home</button>
                <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
        </nav>
    );
};

export default Header;