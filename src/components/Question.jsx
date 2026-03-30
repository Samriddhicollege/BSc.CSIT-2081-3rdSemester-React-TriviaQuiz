import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './common/Card';

export default function Question({ 
    question, 
    currentNumber, 
    totalQuestions, 
    onAnswer, 
    selectedAnswer, 
    timeLeft,
    initialTime 
}) {
    const progressPercent = (currentNumber / totalQuestions) * 100;
    const timerPercent = (timeLeft / initialTime) * 100;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <Card className="question-card">
            <div className="progress-container">
                <motion.div 
                    className="progress-bar" 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="card-header">
                <span className="question-count">Question {currentNumber}/{totalQuestions}</span>
                <div className={`timer ${timeLeft <= 5 ? 'warning' : ''}`}>
                    ⏱️ {timeLeft}s
                </div>
            </div>

        
            <div className={`timer-progress ${timeLeft <= 5 ? 'warning' : ''}`}>
                <motion.div 
                    className="timer-bar" 
                    initial={{ width: '100%' }}
                    animate={{ width: `${timerPercent}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.h2 
                    key={question.id}
                    className="question-text"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    {question.question}
                </motion.h2>
            </AnimatePresence>

            <motion.div 
                className="options-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={question.id + "-options"}
            >
                {question.options.map((option, index) => {
                    let className = "option-btn";
                    if (selectedAnswer) {
                        if (option === question.correctAnswer) {
                            className += " correct";
                        } else if (option === selectedAnswer) {
                            className += " incorrect";
                        }
                    }

                    return (
                        <motion.button
                            key={index}
                            variants={itemVariants}
                            whileHover={!selectedAnswer ? { scale: 1.02, x: 5 } : {}}
                            whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                            className={className}
                            onClick={() => onAnswer(option)}
                            disabled={!!selectedAnswer}
                        >
                            {option}
                        </motion.button>
                    );
                })}
            </motion.div>

            {selectedAnswer && (
                <motion.div 
                    className="feedback"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {selectedAnswer === question.correctAnswer
                        ? "✨ Excellent! That's correct."
                        : selectedAnswer === 'Time is up!'
                            ? "⏰ Oops! Time is up."
                            : `❌ Not quite. The correct answer was: ${question.correctAnswer}`}
                </motion.div>
            )}
        </Card>
    );
}
