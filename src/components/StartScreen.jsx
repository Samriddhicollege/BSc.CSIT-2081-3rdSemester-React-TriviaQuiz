import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { useQuiz } from '../context/QuizContext';

export default function StartScreen({ onStart, onViewHighScores }) {
    const { playerName, setPlayerName } = useQuiz();
    const [difficulty, setDifficulty] = useState('Medium'); 
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim().length < 2) {
            setError('Please enter at least 2 characters.');
            return;
        }
        setError('');
        const timerSeconds = difficulty === 'Easy' ? 45 : difficulty === 'Medium' ? 30 : 15;
        onStart(playerName.trim(), timerSeconds, difficulty);
    };

    return (
        <Card className="start-screen">
            <div className="start-icon" style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌍</div>
            <p className="subtitle" style={{ marginBottom: '1.5rem', opacity: 0.9 }}>Ready to test your global knowledge?</p>

            <form onSubmit={handleSubmit} className="start-form">
                <div className="input-group">
                    <label htmlFor="name">Enter Your Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="e.g. Einstein"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className={error ? 'input-error' : ''}
                    />
                    {error && <span className="error-text">{error}</span>}
                </div>

                <div className="difficulty-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Select Difficulty
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {['Easy', 'Medium', 'Hard'].map((level) => (
                            <button
                                key={level}
                                type="button"
                                onClick={() => setDifficulty(level)}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    background: difficulty === level ? '#fbbf24' : 'rgba(255,255,255,0.1)',
                                    color: difficulty === level ? '#000' : '#fff',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.75rem', marginTop: '8px', color: 'var(--text-muted)' }}>
                        Timer: {difficulty === 'Easy' ? '45s' : difficulty === 'Medium' ? '30s' : '15s'} per question.
                    </p>
                </div>

                <Button type="submit" style={{ width: '100%' }}>Start Quiz</Button>
            </form>

            <Button 
                variant="secondary" 
                onClick={onViewHighScores} 
                style={{ width: '100%', marginTop: '1rem' }}
            >
                View High Scores
            </Button>
        </Card>
    );
}
