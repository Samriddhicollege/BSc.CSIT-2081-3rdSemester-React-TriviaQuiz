import React, { useState, useEffect } from 'react';
import CategorySelector from './CategorySelector';
import Question from './Question';
import Result from './Result';
import Card from './common/Card';
import Button from './common/Button';
import { useQuiz } from '../context/QuizContext';

export default function Quiz({ playerName, timerLimit, difficulty, onRestart }) {
    const { questions, addScore } = useQuiz();
    const [appState, setAppState] = useState('category_selection'); 
    const [category, setCategory] = useState('All');
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(timerLimit);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        let timer;
        if (appState === 'playing' && !selectedAnswer && timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (appState === 'playing' && timeLeft === 0 && !selectedAnswer) {
            handleAnswerTimeUp();
        }
        return () => clearTimeout(timer);
    }, [appState, timeLeft, selectedAnswer]);

    const handleStartQuiz = (selectedCategory) => {
        let filtered = questions.filter(q => 
            (selectedCategory === 'All' || q.category === selectedCategory) && 
            q.difficulty === difficulty
        );
        
        if (selectedCategory !== 'All' && filtered.length < 10) {
            const otherQuestionsOfSameDifficulty = questions.filter(q => 
                q.category !== selectedCategory && 
                q.difficulty === difficulty
            );
            const needed = 10 - filtered.length;
            filtered = [...filtered, ...shuffleArray(otherQuestionsOfSameDifficulty).slice(0, needed)];
        }
        
        const shuffled = shuffleArray(filtered).slice(0, 10);
        setCategory(selectedCategory);
        setCurrentQuestions(shuffled);
        setAppState('playing');
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setTimeLeft(timerLimit);
    };

    const handleAnswerTimeUp = () => {
        setSelectedAnswer('Time is up!');
        setTimeout(() => goToNextQuestion(), 2000);
    };

    const handleAnswer = (answer) => {
        if (selectedAnswer) return;
        setSelectedAnswer(answer);
        const currentQ = currentQuestions[currentQuestionIndex];

        if (answer === currentQ.correctAnswer) {
            setScore(prev => prev + 1);
        }
        setTimeout(() => goToNextQuestion(), 2000);
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex + 1 < currentQuestions.length) {
            setSelectedAnswer(null);
            setTimeLeft(timerLimit);
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setAppState('result');
            addScore(score, currentQuestions.length);
        }
    };

    return (
        <div className="quiz-view">
            {appState === 'category_selection' && (
                <CategorySelector onSelectCategory={handleStartQuiz} />
            )}

            {appState === 'playing' && currentQuestions.length > 0 && (
                <Question
                    question={currentQuestions[currentQuestionIndex]}
                    currentNumber={currentQuestionIndex + 1}
                    totalQuestions={currentQuestions.length}
                    onAnswer={handleAnswer}
                    selectedAnswer={selectedAnswer}
                    timeLeft={timeLeft}
                    initialTime={timerLimit}
                />
            )}

            {appState === 'playing' && currentQuestions.length === 0 && (
                <div className="glass-card">
                    <h2>No questions available for this level.</h2>
                    <button className="btn" onClick={onRestart}>Go Back</button>
                </div>
            )}

            {appState === 'result' && (
                <Result
                    playerName={playerName}
                    score={score}
                    totalQuestions={currentQuestions.length}
                    onRestart={onRestart}
                />
            )}
        </div>
    );
}