import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false, style }) {
    const baseStyle = {
        padding: '12px 24px',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        width: '100%',
        border: 'none',
        outline: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
    };

    const variants = {
        primary: {
            background: 'var(--primary)',
            color: 'white',
            boxShadow: '0 4px 14px 0 rgba(244, 63, 94, 0.39)',
        },
        secondary: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        success: {
            background: 'var(--success)',
            color: 'white',
        }
    };

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{ ...baseStyle, ...variants[variant] }}
            className={`btn btn-${variant}`}
        >
            {children}
        </motion.button>
    );
}
