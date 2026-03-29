import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizProvider, useQuiz } from './context/QuizContext';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import HighScores from './components/HighScores';
import Navbar from './components/Navbar';
import Loader from './components/common/Loader';
import ErrorMessage from './components/common/ErrorMessage';
import './App.css';

function QuizApp() {
  const { view, setView, playerName, loading, error } = useQuiz();
  const [quizDifficultyTimer, setQuizDifficultyTimer] = useState(30);
  const [difficultyLabel, setDifficultyLabel] = useState('Medium');

  const handleStart = (name, seconds, label) => {
    setQuizDifficultyTimer(seconds);
    setDifficultyLabel(label);
    setView('quiz');
  };

  if (loading) return <Loader message="Initializing Trivia Master..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="app-container">
      <Navbar 
        playerName={playerName} 
        difficulty={difficultyLabel} 
        showStats={view === 'quiz'} 
      />

      <main className="main-content">
        <AnimatePresence mode="wait">
            {view === 'start' && (
                <motion.div 
                    key="start"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%' }}
                >
                    <StartScreen 
                    onStart={handleStart} 
                    onViewHighScores={() => setView('scores')} 
                    />
                </motion.div>
            )}

            {view === 'quiz' && (
                <motion.div 
                    key="quiz"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%' }}
                >
                    <Quiz 
                    playerName={playerName} 
                    timerLimit={quizDifficultyTimer}
                    difficulty={difficultyLabel}
                    onFinish={() => {}}
                    onRestart={() => setView('start')}
                    />
                </motion.div>
            )}

            {view === 'scores' && (
                <motion.div 
                    key="scores"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%' }}
                >
                    <HighScores 
                    onBack={() => setView('start')} 
                    />
                </motion.div>
            )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}

export default App;
