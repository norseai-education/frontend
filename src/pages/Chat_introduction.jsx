import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, MessageSquare, Send, Bot, Loader2 } from 'lucide-react';

// --- Environment Variables ---
// These global variables are provided by the canvas environment.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- Dummy Conversation Flow (Simulates API Responses) ---
// This local JSON structure allows interaction without an API key.
// Responses are triggered by keywords in the user's input.
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
        const userMessage = { role: 'user', text: input.trim() }; // Keep original casing for display
        
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // --- Simulate Network Delay (800ms) ---
        await new Promise(resolve => setTimeout(resolve, 800));

        // --- Dummy JSON Logic ---
        
        // Find a matching response based on keywords
        let matchingFlow = DUMMY_CONVERSATION_FLOW.find(flow =>
            flow.keywords.some(keyword => userText.includes(keyword))
        );

        // Use default response if no keywords match
        if (!matchingFlow) {
            matchingFlow = DEFAULT_RESPONSE;
        }

        // Combine the main response and the follow-up question
        const combinedText = `${matchingFlow.response}\n\n*${matchingFlow.followup}*`;

        const aiMessage = { role: 'model', text: combinedText };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
        
    }, [input, isLoading]);


    // Component to render a single message (Sources display logic removed)
    const Message = ({ message }) => {
        const isUser = message.role === 'user';
        const roleIcon = isUser ? <MessageSquare className="w-5 h-5" /> : <Bot className="w-5 h-5" />;
        // Adjusted colors for a cleaner MUI-Primary feel
        const bgColor = isUser ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-800 shadow-md border border-gray-100';
        const alignment = isUser ? 'self-end' : 'self-start';
        const corner = isUser ? 'rounded-br-none' : 'rounded-bl-none';

        return (
            <div className={`flex flex-col max-w-4/5 md:max-w-3/4 mb-4 ${alignment}`}>
                <div className={`flex items-start p-4 rounded-xl ${bgColor} ${corner} transition-shadow duration-300`}>
                    <div className={`mr-3 ${isUser ? 'order-2 ml-2' : 'order-1 mr-2'} flex-shrink-0`}>
                        {roleIcon}
                    </div>
                    {/* Render LaTeX for Math/Science (uses $...$ or $$...$$) */}
                    <p className={`text-sm leading-relaxed ${isUser ? 'order-1' : 'order-2'}`}>
                        {message.text}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans flex flex-col items-center p-4">
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />

            {/* Tailwind Config for Inter font */}
            <style>{`
                :root { font-family: 'Inter', sans-serif; }
                .chat-container {
                    display: flex;
                    flex-direction: column;
                    height: 90vh; /* Set height for fixed chat window */
                }
            `}</style>

            {/* Main Chat Card (MUI Paper Simulation - High Elevation) */}
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden chat-container transition-shadow duration-300">
                {/* Header (MUI AppBar Simulation - Primary Color) */}
                <header className="flex items-center justify-center p-4 bg-indigo-700 text-white shadow-xl flex-shrink-0">
                    <BookOpen className="w-6 h-6 mr-3" />
                    <h1 className="text-xl font-bold tracking-tight">Profe AI: Academic Tutor (Dummy Mode)</h1>
                </header>

                {/* Message Display Area (MUI List/Paper content) */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white">
                    {messages.map((msg, index) => (
                        <Message key={index} message={msg} />
                    ))}
                    {/* Typing/Loading Indicator */}
                    {isLoading && (
                        <div className="self-start flex items-center p-3 max-w-xs bg-gray-100 rounded-xl rounded-bl-none shadow-md border border-gray-100">
                            <Loader2 className="w-4 h-4 mr-2 text-indigo-500 animate-spin" />
                            <span className="text-sm text-gray-600">Profe AI is looking up the answer...</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area (MUI TextField/Paper Simulation) */}
                <form onSubmit={handleSendMessage} className="p-4 bg-gray-50 border-t border-gray-200 flex items-center flex-shrink-0">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about History, Math, Science, or Economics..."
                        className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-sm placeholder-gray-500 shadow-inner mr-2"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-indigo-300 transition duration-150 shadow-md hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                        aria-label="Send message"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </form>
            </div>
            <div className='mt-2 text-xs text-gray-400'>
                App ID: {appId}
            </div>
        </div>
    );
};

export default ChatIntroduction;