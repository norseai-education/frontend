import React, { useState } from "react";

const questions = [
    {
        question: "What is supervised learning?",
        options: [
            "Learning without labeled data",
            "Learning with labeled data",
            "Learning by reinforcement",
            "Learning by clustering"
        ],
        answer: 1
    },
    {
        question: "Which algorithm is used for classification?",
        options: [
            "K-Means",
            "Linear Regression",
            "Decision Tree",
            "Apriori"
        ],
        answer: 2
    },
    {
        question: "What does overfitting mean?",
        options: [
            "Model fits training data too well",
            "Model fits test data perfectly",
            "Model underperforms on training data",
            "Model generalizes well"
        ],
        answer: 0
    }
];

const MachineLearningAssessment = () => {
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
        <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
            <h2>Machine Learning Assessment</h2>
            {showResult ? (
                <div>
                    <h3>Your Score: {score} / {questions.length}</h3>
                </div>
            ) : (
                <div>
                    <p>{questions[current].question}</p>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {questions[current].options.map((opt, idx) => (
                            <li key={idx} style={{ marginBottom: 8 }}>
                                <button
                                    style={{
                                        background: selected === idx ? "#007bff" : "#eee",
                                        color: selected === idx ? "#fff" : "#000",
                                        padding: "8px 16px",
                                        border: "none",
                                        borderRadius: 4,
                                        cursor: "pointer"
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
                            padding: "8px 16px",
                            background: "#28a745",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            cursor: selected === null ? "not-allowed" : "pointer"
                        }}
                    >
                        {current < questions.length - 1 ? "Next" : "Finish"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MachineLearningAssessment;