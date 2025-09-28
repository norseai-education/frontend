import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, MessageSquare, Send, Bot, Loader2 } from 'lucide-react';

// --- Environment Variables ---
const appId = typeof window !== 'undefined' && window.__app_id !== undefined ? window.__app_id : 'default-app-id';

// --- Dummy Conversation Flow (Simulates API Responses) ---
const DUMMY_CONVERSATION_FLOW = [
    {
        keywords: ['history', 'french revolution', 'revolution', 'world war'],
        response: "That's a fascinating period! As a professional tutor, I can tell you the French Revolution was primarily driven by Enlightenment ideals, severe economic hardship, and the deep social inequality of the *Ancien Régime*. ",
        followup: 'To encourage deeper thinking, why was the concept of the "social contract" so dangerous to the French monarchy?',
    },
    {
        keywords: ['math', 'calculus', 'derivative', 'algebra'],
        response: "Calculus is a powerful tool! A derivative, at its core, represents the instantaneous rate of change of a function. Think of it as finding the precise speed of an object at a single point in time. ",
        followup: 'How does the chain rule allow us to take derivatives of composite functions?',
    },
    {
        keywords: ['science', 'biology', 'photosynthesis', 'chemistry'],
        response: "Photosynthesis is key to life! It's the process where plants convert light energy, carbon dioxide, and water into glucose (sugar) and oxygen. It's truly nature's factory. ",
        followup: 'What is the specific role of chlorophyll in the light-dependent reactions?',
    },
    {
        keywords: ['economic', 'supply', 'demand', 'macro', 'micro'],
        response: "Great question in economics! The Law of Supply states that as price increases, quantity supplied increases, while the Law of Demand states that as price increases, quantity demanded decreases. They meet at the market equilibrium. ",
        followup: 'What happens to the equilibrium price if consumer income rises sharply for a normal good?',
    },
];

const DEFAULT_RESPONSE = {
    response: "I see you're exploring a new topic! As your professional AI tutor, I'm prepared to discuss any academic subject. Since I am currently using a **dummy data file**, try asking about **History, Math, Science, or Economics** to trigger a specific, detailed response.",
    followup: 'What is the specific topic or question you need help with in your current academic subject?',
};

const INITIAL_MESSAGE = {
    role: 'model',
    text: "Hello! I am Profe AI, your academic tutor. I'm running on a dummy data file, so please ask about **History, Math, Science, or Economics** to see a simulated answer!",
};

const ChatIntroduction = () => {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to the latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = useCallback(async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input.trim().toLowerCase();
        const userMessage = { role: 'user', text: input.trim() }; 
        
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // --- Simulate Network Delay (800ms) ---
        await new Promise(resolve => setTimeout(resolve, 800));

        // --- Dummy JSON Logic ---
        let matchingFlow = DUMMY_CONVERSATION_FLOW.find(flow =>
            flow.keywords.some(keyword => userText.includes(keyword))
        );

        if (!matchingFlow) {
            matchingFlow = DEFAULT_RESPONSE;
        }

        const combinedText = `${matchingFlow.response}\n\n*${matchingFlow.followup}*`;

        const aiMessage = { role: 'model', text: combinedText };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
        
    }, [input, isLoading]);


    // Component to render a single message
    const Message = ({ message }) => {
        const isUser = message.role === 'user';
        const roleIcon = isUser ? <MessageSquare className="message-icon" /> : <Bot className="message-icon" />;
        
        // Use pure CSS classes for styling and alignment
        const messageClass = isUser ? 'user-message' : 'ai-message';

        return (
            <div className={`message-wrapper ${isUser ? 'align-right' : 'align-left'}`}>
                <div className={`message-box ${messageClass}`}>
                    <div className={`icon-container ${isUser ? 'user-icon' : 'ai-icon'}`}>
                        {roleIcon}
                    </div>
                    <p className="message-text">
                        {message.text}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="app-container">
            {/* Pure CSS Block to simulate MUI styles */}
            <style>
            {`
                :root {
                    --mui-primary: #3f51b5; /* Indigo 500 */
                    --mui-primary-dark: #303f9f; /* Indigo 700 */
                    --mui-surface: #ffffff;
                    --mui-background: #f4f5f7;
                    --mui-shadow-low: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Elevation 1 */
                    --mui-shadow-high: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Elevation 8 */
                    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
                }

                .app-container {
                    min-height: 100vh;
                    background-color: var(--mui-background);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                }

                .chat-container {
                    width: 100%;
                    max-width: 900px;
                    background-color: var(--mui-surface);
                    box-shadow: var(--mui-shadow-high); /* MUI Paper Elevation */
                    border-radius: 8px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    height: 90vh;
                }

                /* Header (MUI AppBar Simulation) */
                .chat-app-bar {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    background-color: var(--mui-primary-dark);
                    color: white;
                    box-shadow: var(--mui-shadow-low);
                    flex-shrink: 0;
                }

                .app-title {
                    font-size: 20px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    margin-left: 12px;
                }

                /* Message Area */
                .message-area {
                    flex-grow: 1;
                    overflow-y: auto;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                /* Message Styles */
                .message-wrapper {
                    display: flex;
                    width: 100%;
                }

                .align-right {
                    justify-content: flex-end;
                }
                .align-left {
                    justify-content: flex-start;
                }

                .message-box {
                    display: flex;
                    align-items: flex-start;
                    padding: 12px 16px;
                    border-radius: 20px;
                    max-width: 70%;
                    box-shadow: var(--mui-shadow-low);
                }

                .user-message {
                    background-color: var(--mui-primary);
                    color: white;
                    border-top-right-radius: 4px; /* Simulating one square corner */
                    order: 2; /* Move icon to the right */
                }

                .ai-message {
                    background-color: #e8eaf6; /* Light Indigo background */
                    color: #424242;
                    border-top-left-radius: 4px;
                    border: 1px solid #c5cae9;
                }

                .message-icon {
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                }
                
                .icon-container {
                    margin-right: 8px;
                    order: 1;
                }

                .user-icon {
                    margin-left: 8px;
                    margin-right: 0;
                    order: 2;
                }

                .message-text {
                    font-size: 14px;
                    line-height: 1.5;
                    white-space: pre-wrap;
                    order: 2;
                }
                .user-icon + .message-text {
                    order: 1;
                }

                /* Loading Indicator */
                .loading-indicator {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    max-width: 250px;
                    background-color: #f0f0f0;
                    border-radius: 12px;
                    box-shadow: var(--mui-shadow-low);
                }

                .loading-icon {
                    width: 18px;
                    height: 18px;
                    margin-right: 8px;
                    color: var(--mui-primary);
                    animation: spin 1s linear infinite;
                }

                /* Input Area (MUI TextField/Button Simulation) */
                .input-area {
                    padding: 16px;
                    background-color: var(--mui-surface);
                    border-top: 1px solid #e0e0e0;
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }

                .input-field {
                    flex-grow: 1;
                    padding: 12px 20px;
                    border: 1px solid #bdbdbd; /* Light gray border */
                    border-radius: 25px; /* Fully rounded */
                    font-size: 16px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    margin-right: 8px;
                    outline: none;
                }

                .input-field:focus {
                    border-color: var(--mui-primary);
                    box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.4); /* MUI focus ring */
                }

                .send-button {
                    padding: 12px;
                    background-color: var(--mui-primary);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: var(--mui-shadow-low);
                    transition: background-color 0.2s, box-shadow 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .send-button:hover:not(:disabled) {
                    background-color: var(--mui-primary-dark);
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                }

                .send-button:disabled {
                    background-color: #c5cae9;
                    cursor: not-allowed;
                    box-shadow: none;
                }

                /* Animation for Loader */
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}
            </style>

            <div className="chat-container">
                {/* Header (MUI AppBar Simulation) */}
                <header className="chat-app-bar">
                    <BookOpen className="message-icon" />
                    <h1 className="app-title">Profe AI: Academic Tutor (Dummy Mode)</h1>
                </header>

                {/* Message Display Area (MUI List/Paper content) */}
                <div className="message-area">
                    {messages.map((msg, index) => (
                        <Message key={index} message={msg} />
                    ))}
                    {/* Typing/Loading Indicator */}
                    {isLoading && (
                        <div className="message-wrapper align-left">
                            <div className="loading-indicator">
                                <Loader2 className="loading-icon" />
                                <span style={{ fontSize: '14px', color: '#616161' }}>Profe AI is looking up the answer...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area (MUI TextField/Paper Simulation) */}
                <form onSubmit={handleSendMessage} className="input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about History, Math, Science, or Economics..."
                        className="input-field"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="send-button"
                        aria-label="Send message"
                    >
                        {isLoading ? (
                            <Loader2 style={{ width: '20px', height: '20px' }} />
                        ) : (
                            <Send style={{ width: '20px', height: '20px' }} />
                        )}
                    </button>
                </form>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#9e9e9e' }}>
                App ID: {appId}
            </div>
        </div>
    );
};

export default ChatIntroduction;
