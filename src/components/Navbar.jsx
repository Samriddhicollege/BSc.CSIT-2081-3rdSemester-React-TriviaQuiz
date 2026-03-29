import React from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';

export default function Navbar({ playerName, difficulty, category, showStats }) {
    const { setView } = useQuiz();

    return (
        <nav className="navbar" style={{ width: '100%', marginBottom: '2rem' }}>
            <motion.h1 
                className="title" 
                onClick={() => setView('start')} 
                style={{ cursor: 'pointer', marginBottom: '1rem' }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                Trivia Master
            </motion.h1>

            {showStats && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ 
                        display: 'flex', 
                        gap: '10px', 
                        flexWrap: 'wrap', 
                        justifyContent: 'center' 
                    }}
                >
                    <div className="player-badge">
                        Player: <strong>{playerName}</strong>
                    </div>
                    <div className="player-badge" style={{ borderColor: 'rgba(251, 191, 36, 0.4)' }}>
                        Difficulty: <strong>{difficulty}</strong>
                    </div>
                    {category && (
                        <div className="player-badge">
                            Category: <strong>{category}</strong>
                        </div>
                    )}
                </motion.div>
            )}
        </nav>
    );
}
