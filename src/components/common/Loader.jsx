import React from 'react';

export default function Loader({ message = "Loading..." }) {
    return (
        <div className="loader-view" style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '80vh' 
        }}>
            <div className="loader"></div>
            <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                {message}
            </p>
        </div>
    );
}
