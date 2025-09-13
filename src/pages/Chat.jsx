import React, { useState, useEffect, useRef } from 'react';

// Main Chat component which can be used inside a larger application
const Chat = () => {
  // State for the chat messages, stored as an array of objects
  const [messages, setMessages] = useState([]);
  // State to manage the user's input text
  const [inputMessage, setInputMessage] = useState('');
  // State for the connection and streaming status
  const [status, setStatus] = useState('Connecting...');
  // State to check if an AI response is currently streaming
  const [isStreaming, setIsStreaming] = useState(false);
  // State to hold the current user's ID
  const [studentId, setStudentId] = useState(null);

  // Ref to automatically scroll the chatbox to the bottom when new messages arrive
  const chatBoxRef = useRef(null);

  // useEffect to handle initial setup and checks
  useEffect(() => {
    const student = localStorage.getItem('student_id');
    if (!student) {
      setStatus('Student not found. Redirecting to home...');
      setTimeout(() => {
        window.location.assign('/');
      }, 2000);
      return;
    }
    setStudentId(student);
    setStatus('Connected');

    // Interval to periodically check the chat status
    const statusCheckInterval = setInterval(async () => {
      if (isStreaming || !student) return;
      try {
        const response = await fetch(`/chat/status/${student}`);
        if (response.ok) {
          const statusData = await response.json();
          if (statusData.active) {
            const msgCount = statusData.message_count || 0;
            setStatus(`Connected (${msgCount} messages)`);
          }
        }
      } catch (e) {
        console.error('Connection check failed:', e);
      }
    }, 30000); // Check every 30 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(statusCheckInterval);
  }, [isStreaming, studentId]);

  // useEffect to scroll the chatbox to the bottom whenever messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || isStreaming) return;

    // Add the user's message to the state
    setMessages(prevMessages => [...prevMessages, { sender: 'user', text: message }]);
    setInputMessage('');
    setIsStreaming(true);
    setStatus('AI is typing...');

    // Add a temporary AI message to the state to show streaming
    let currentAiText = '';
    setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: '' }]);

    try {
      const response = await fetch('/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, message: message }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        currentAiText += chunk;

        // Update the last message in state with the new chunk
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].text = currentAiText;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Streaming error:', error);
      // Update the last message with an error message
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1].text = "Sorry, an error occurred. Please try again.";
        return newMessages;
      });
    } finally {
      setIsStreaming(false);
      setStatus('Connected');
    }
  };

  // Main component JSX structure
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 font-sans antialiased">
      {/* Chat Box */}
      <div 
        ref={chatBoxRef}
        className="flex-1 bg-white p-6 rounded-xl shadow-lg overflow-y-auto mb-4 flex flex-col gap-4"
        style={{ maxHeight: '60vh' }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            <div 
              className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.sender === 'user' 
                ? 'bg-blue-500 text-white rounded-tr-none' 
                : 'bg-gray-200 text-gray-800 rounded-tl-none'}`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Area */}
      <div className="flex items-center p-2 bg-white rounded-xl shadow-lg">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          disabled={isStreaming}
          className="flex-1 px-4 py-3 border-none rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSendMessage} 
          disabled={isStreaming}
          className="ml-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
      
      {/* Status Bar */}
      <div className="mt-4 text-center text-gray-500 text-xs">
        {status}
      </div>
    </div>
  );
};

export default Chat;
