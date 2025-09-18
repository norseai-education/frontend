import React from 'react';

const pythonQuestions = [
    {
        question: "What is the output of print(2 ** 3)?",
        options: ["6", "8", "9", "12"],
        answer: "8",
    },
    {
        question: "Which keyword is used to define a function in Python?",
        options: ["func", "def", "function", "define"],
        answer: "def",
    },
    {
        question: "What is the correct file extension for Python files?",
        options: [".py", ".python", ".pt", ".pyt"],
        answer: ".py",
    },
];

function Programming() {
    const [current, setCurrent] = React.useState(0);
    const [selected, setSelected] = React.useState(null);
    const [score, setScore] = React.useState(0);
    const [showScore, setShowScore] = React.useState(false);

    const handleOptionClick = (option) => {
        setSelected(option);
    };

    const handleNext = () => {
        if (selected === pythonQuestions[current].answer) {
            setScore(score + 1);
        }
        setSelected(null);
        if (current < pythonQuestions.length - 1) {
            setCurrent(current + 1);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
            <h2>Python Assessment</h2>
            {showScore ? (
                <div>
                    <h3>Your score: {score} / {pythonQuestions.length}</h3>
                </div>
            ) : (
                <div>
                    <p>{pythonQuestions[current].question}</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {pythonQuestions[current].options.map((option) => (
                            <li key={option} style={{ marginBottom: 8 }}>
                                <button
                                    style={{
                                        padding: '8px 16px',
                                        background: selected === option ? '#d3d3d3' : '#fff',
                                        border: '1px solid #ccc',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleNext}
                        disabled={selected === null}
                        style={{ marginTop: 16, padding: '8px 16px' }}
                    >
                        {current < pythonQuestions.length - 1 ? 'Next' : 'Finish'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Programming;