import React from 'react';
import Card from './Card';
import Button from './Button';

export default function ErrorMessage({ message, onRetry }) {
    return (
        <div className="error-view" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '80vh' 
        }}>
            <Card style={{ textAlign: 'center', border: '1px solid var(--danger)' }}>
                <h2 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Oops! Not Good.</h2>
                <p style={{ color: 'var(--text-main)', marginBottom: '1.5rem' }}>{message}</p>
                <Button onClick={onRetry || (() => window.location.reload())}>
                    Try Again
                </Button>
            </Card>
        </div>
    );
}
