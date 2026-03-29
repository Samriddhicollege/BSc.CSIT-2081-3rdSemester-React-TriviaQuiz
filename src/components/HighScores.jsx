import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { useQuiz } from '../context/QuizContext';

export default function HighScores({ onBack }) {
    const { scores, clearScores } = useQuiz();
    const [searchQuery, setSearchQuery] = useState('');
    
    // Sort scores by points (highest first)
    const sortedScores = useMemo(() => {
        return [...scores].sort((a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points;
            }
            return new Date(b.date) - new Date(a.date);
        });
    }, [scores]);

    // Filtering logic (Search)
    const filteredScores = useMemo(() => {
        if (!searchQuery.trim()) return sortedScores;
        return sortedScores.filter(score => 
            score.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [sortedScores, searchQuery]);

    return (
        <Card className="high-scores">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ margin: 0 }}>🏆 High Scores</h2>
                {scores.length > 0 && (
                    <Button 
                        variant="secondary" 
                        onClick={clearScores}
                        style={{ width: 'auto', padding: '8px 16px', fontSize: '0.9rem', marginTop: 0 }}
                    >
                        Clear All
                    </Button>
                )}
            </div>

            {scores.length > 0 && (
                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Search players..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ padding: '10px 15px', borderRadius: '10px' }}
                    />
                </div>
            )}

            {filteredScores.length > 0 ? (
                <div className="scores-list" style={{ marginTop: '0.5rem' }}>
                    {filteredScores.map((score, index) => (
                        <div key={score.id || index} className="score-item" style={{ position: 'relative' }}>
                            <div className="player-info" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ 
                                    width: '28px', 
                                    height: '28px', 
                                    background: index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : index === 2 ? '#b45309' : 'rgba(255,255,255,0.1)',
                                    color: index < 3 ? '#000' : '#fff',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold'
                                }}>
                                    {index + 1}
                                </span>
                                <div>
                                    <strong>{score.name}</strong>
                                    <span className="score-date" style={{ display: 'block' }}>
                                        {new Date(score.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="player-score">
                                <span className="score-value">{score.points}</span>
                                <span className="total-value">/{score.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-data">
                    <p>
                        {scores.length > 0 
                            ? "No players found matching your search." 
                            : "No history found. Take a quiz to see your scores here!"}
                    </p>
                </div>
            )}

            <Button onClick={onBack} style={{ marginTop: '20px', width: '100%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                Back to Start
            </Button>
        </Card>
    );
}
