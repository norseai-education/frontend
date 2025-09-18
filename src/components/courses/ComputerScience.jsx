import React, { useState } from 'react';

const questions = [
    {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        answer: 1,
    },
    {
        question: "Which data structure uses FIFO order?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: 1,
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        answer: 2,
    },
    {
        question: "What does HTTP stand for?",
        options: [
            "HyperText Transfer Protocol",
            "HyperText Transmission Process",
            "High Transfer Text Protocol",
            "Hyper Transmission Text Process",
        ],
        answer: 0,
    },
];

const ComputerScienceAssessment = () => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleOptionClick = (idx) => {
        setSelected(idx);
    };

    const handleNext = () => {
        if (selected === questions[current].answer) {
            setScore(score + 1);
        }
        if (current < questions.length - 1) {
            setCurrent(current + 1);
            setSelected(null);
        } else {
            setFinished(true);
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
            <h2>Computer Science Assessment</h2>
            {finished ? (
                <div>
                    <h3>Your Score: {score} / {questions.length}</h3>
                </div>
            ) : (
                <div>
                    <p>
                        <strong>Question {current + 1}:</strong> {questions[current].question}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {questions[current].options.map((opt, idx) => (
                            <li key={idx} style={{ marginBottom: 8 }}>
                                <button
                                    style={{
                                        background: selected === idx ? '#007bff' : '#f0f0f0',
                                        color: selected === idx ? '#fff' : '#000',
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleOptionClick(idx)}
                                >
                                    {opt}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleNext}
                        disabled={selected === null}
                        style={{
                            marginTop: 16,
                            padding: '8px 16px',
                            background: '#28a745',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: selected === null ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {current < questions.length - 1 ? 'Next' : 'Finish'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ComputerScienceAssessment;