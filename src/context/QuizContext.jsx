import React, { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [view, setView] = useState('start'); // start, quiz, scores
    const [playerName, setPlayerName] = useState('');
    const [scores, setScores] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                const response = await fetch('/questions.json');
                if (!response.ok) throw new Error('Failed to fetch questions');
                const data = await response.json();
                setQuestions(data);
                setError(null);
            } catch (err) {
                console.error("API Error:", err);
                setError("Failed to load questions. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);
    useEffect(() => {
        const savedScores = localStorage.getItem('trivia_high_scores');
        if (savedScores) {
            try {
                setScores(JSON.parse(savedScores));
            } catch (e) {
                console.error("Failed to parse high scores", e);
                setScores([]);
            }
        }
    }, []);

    const addScore = (points, total) => {
        const newEntry = {
            name: playerName,
            points,
            total,
            date: new Date().toISOString(),
            id: Date.now()
        };
        
        const updatedScores = [newEntry, ...scores].slice(0, 20);
        setScores(updatedScores);
        localStorage.setItem('trivia_high_scores', JSON.stringify(updatedScores));
    };
    const clearScores = () => {
        setScores([]);
        localStorage.removeItem('trivia_high_scores');
    };

    const startQuiz = (name) => {
        setPlayerName(name);
        setView('quiz');
    };

    const value = {
        view,
        setView,
        playerName,
        setPlayerName,
        scores,
        addScore,
        clearScores,
        startQuiz,
        questions,
        loading,
        error
    };

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
}
export function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
}
