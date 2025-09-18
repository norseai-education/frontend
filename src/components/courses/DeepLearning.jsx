import React, { useState } from 'react';

const questions = [
    {
        question: "What is the main purpose of an activation function in a neural network?",
        options: [
            "To initialize weights",
            "To introduce non-linearity",
            "To optimize the loss function",
            "To prevent overfitting"
        ],
        answer: 1
    },
    {
        question: "Which of the following is a popular optimizer for deep learning?",
        options: [
            "Adam",
            "RMSprop",
            "SGD",
            "All of the above"
        ],
        answer: 3
    },
    {
        question: "What does 'backpropagation' refer to?",
        options: [
            "Forward pass of data",
            "Updating weights using gradients",
            "Splitting data into batches",
            "Normalizing input data"
        ],
        answer: 1
    },
    {
        question: "Which layer is typically used for image classification tasks?",
        options: [
            "Convolutional Layer",
            "Recurrent Layer",
            "Dropout Layer",
            "Embedding Layer"
        ],
        answer: 0
    },
    {
        question: "What is overfitting in deep learning?",
        options: [
            "Model performs well on training data but poorly on new data",
            "Model performs well on both training and test data",
            "Model performs poorly on training data",
            "Model uses too few parameters"
        ],
        answer: 0
    }
];

function DeepLearningAssessment() {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleOptionClick = (idx) => {
        setSelected(idx);
    };

    const handleNext = () => {
        if (selected === questions[current].answer) {
            setScore(score + 1);
        }
        setSelected(null);
        if (current < questions.length - 1) {
            setCurrent(current + 1);
        } else {
            setShowResult(true);
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: 'auto', padding: 24 }}>
            <h2>Deep Learning Assessment</h2>
            {showResult ? (
                <div>
                    <h3>Your Score: {score} / {questions.length}</h3>
                </div>
            ) : (
                <div>
                    <p><strong>Question {current + 1}:</strong> {questions[current].question}</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {questions[current].options.map((opt, idx) => (
                            <li key={idx} style={{ marginBottom: 8 }}>
                                <button
                                    style={{
                                        width: '100%',
                                        padding: 8,
                                        background: selected === idx ? '#d1eaff' : '#f5f5f5',
                                        border: '1px solid #ccc',
                                        cursor: 'pointer'
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
                        style={{ marginTop: 16, padding: '8px 16px' }}
                    >
                        {current === questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default DeepLearningAssessment;