import React, { useEffect, useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { useQuiz } from '../context/QuizContext';

export default function Result({ score, totalQuestions, onRestart }) {
    const { playerName, setView } = useQuiz();
    const [isPerfect, setIsPerfect] = useState(false);
    const percentage = Math.round((score / totalQuestions) * 100);

    useEffect(() => {
        if (score === totalQuestions && totalQuestions > 0) {
            setIsPerfect(true);
        }
    }, [score, totalQuestions]);

    let message = "";
    if (percentage >= 80) message = `Amazing, ${playerName}!`;
    else if (percentage >= 50) message = `Well done, ${playerName}!`;
    else message = `Keep practicing, ${playerName}!`;

    const handleShare = () => {
        const text = `I just scored ${score}/${totalQuestions} on Trivia Master! 🏆 Can you beat my score?`;
        navigator.clipboard.writeText(text).then(() => {
            alert('Score copied to clipboard!');
        });
    };

    return (
        <Card className={`result-container ${isPerfect ? 'pulse-gold' : ''}`}>
            {isPerfect && (
                <div className="perfect-badge" style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                    🏆 PERFECT SCORE! 🏆
                </div>
            )}
            
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Quiz Completed!</h2>

            <div className={`score-circle ${isPerfect ? 'perfect' : ''}`}>
                <h2>{score}</h2>
                <p>out of {totalQuestions}</p>
            </div>

            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>{message}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                You scored {percentage}%. Your result has been saved.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button onClick={onRestart} style={{ flex: 1 }}>Play Again</Button>
                    <Button 
                        variant="secondary" 
                        onClick={() => setView('scores')}
                        style={{ flex: 1 }}
                    >
                        High Scores
                    </Button>
                </div>
                <Button 
                    onClick={handleShare}
                    style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        width: '100%',
                        fontSize: '0.9rem'
                    }}
                >
                    🔗 Share Result
                </Button>
            </div>
        </Card>
    );
}
