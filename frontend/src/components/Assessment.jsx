import React, { useState } from 'react';
import { quizQuestions } from '../data/quizData';

const Assessment = ({ mode, onComplete }) => {
    const [step, setStep] = useState(0);
    const [scores, setScores] = useState({});

    // Safely get questions based on mode
    const questions = quizQuestions[mode] || [];

    if (questions.length === 0) {
        return <div style={{ color: 'red' }}>Error: No questions found for {mode}.</div>;
    }

    const handleAnswer = (value) => {
        const currentQuestion = questions[step];
        const skill = currentQuestion.skill;
        const newScores = { ...scores, [skill]: (scores[skill] || 0) + value };
        setScores(newScores);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            const weakest = Object.keys(newScores).reduce((a, b) =>
                newScores[a] < newScores[b] ? a : b
            );
            onComplete(weakest);
        }
    };

    return (
        <div className="assessment-container" style={{
            position: 'relative',
            backgroundColor: 'white',
            padding: '30px 25px', // Reduced padding
            borderRadius: '25px',
            maxWidth: '500px',    // Reduced width from 700px to 500px
            margin: '20px auto',  // Reduced top margin
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
            zIndex: 1000
        }}>
            {/* EXIT BUTTON */}
            <button
                onClick={() => onComplete(null)}
                style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'none', border: 'none', fontSize: '1.5rem',
                    cursor: 'pointer', color: '#ff5252', fontWeight: 'bold'
                }}
            >✕</button>

            <h4 style={{ color: '#0288D1', marginBottom: '8px', fontSize: '0.9rem' }}>
                Question {step + 1} of {questions.length}
            </h4>

            <h2 style={{ marginBottom: '25px', color: '#222', lineHeight: '1.3', fontSize: '1.4rem' }}>
                {questions[step]?.q}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {["Never", "Rarely", "Sometimes", "Often"].map((label, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="quiz-opt"
                        style={{ padding: '12px', fontSize: '1rem' }} // Smaller buttons
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Assessment;