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
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Chip,
  Alert,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  ExitToApp as ExitIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import ChatService from '../services/chatService';

const Chat = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Chat state
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [status, setStatus] = useState('Connecting...');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');

  // Refs
  const chatBoxRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize chat and check status
  useEffect(() => {
    if (!user?.studentId) {
      setError('No student session found. Redirecting to home...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
      return;
    }

    initializeChat();

    // Check status periodically
    const statusInterval = setInterval(checkStatus, 30000);
    return () => clearInterval(statusInterval);
  }, [user?.studentId, navigate]);

  const initializeChat = async () => {
    try {
      setStatus('Connecting...');
      setError('');
      
      // Get initial status
      await checkStatus();
      
      // Add welcome message
      setMessages([{
        id: 1,
        sender: 'ai',
        text: 'Hey there! How are you doing today?',
        timestamp: new Date()
      }]);
      
      setStatus('Connected');
    } catch (err) {
      console.error('Failed to initialize chat:', err);
      setError('Failed to connect to your AI tutor. Please try again.');
      setStatus('Connection failed');
    }
  };

  const checkStatus = async () => {
    if (!user?.studentId || isStreaming) return;
    
    try {
      const statusData = await ChatService.getStatus(user.studentId);
      if (statusData.active) {
        const msgCount = statusData.messageCount || 0;
        setStatus(`Connected (${msgCount} messages)`);
      }
    } catch (err) {
      console.error('Status check failed:', err);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || isStreaming) return;

<<<<<<< HEAD
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
=======
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsStreaming(true);
    setStatus('Sending message...');
    setError('');

    // Add placeholder AI message for response
    const aiMessageId = Date.now() + 1;
    const aiMessage = {
      id: aiMessageId,
      sender: 'ai',
      text: '',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);

    try {
      const response = await ChatService.sendMessage(user.studentId, inputMessage);
      
      // Update the AI message with the complete response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, text: response }
            : msg
        )
      );

    } catch (err) {
      console.error('Chat error:', err);
      setError('Failed to send message. Please try again.');
      
      // Update AI message with error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, text: 'Sorry, I encountered an error. Please try again.' }
            : msg
        )
      );
>>>>>>> temp-assessment-branch
    } finally {
      setIsStreaming(false);
      setStatus('Connected');
    }
  };

<<<<<<< HEAD
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
=======
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleEndSession = async () => {
    if (!window.confirm('Are you sure you want to end this lesson?')) return;
    
    try {
      await ChatService.endSession(user.studentId);
      navigate('/');
    } catch (err) {
      console.error('Error ending session:', err);
      // Navigate anyway
      navigate('/');
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', py: 2 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <BotIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" color="primary">
                  AI Tutor Session
                </Typography>
                <Chip 
                  label={status} 
                  size="small" 
                  color={status === 'Connected' ? 'success' : 'default'}
                  variant="outlined"
                />
              </Box>
            </Box>
            <IconButton 
              onClick={handleEndSession} 
              color="error"
              title="End Session"
            >
              <ExitIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Messages Area */}
        <Paper 
          ref={chatBoxRef}
          elevation={1} 
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 2
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: 1
              }}
            >
              {message.sender === 'ai' && (
                <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                  <BotIcon fontSize="small" />
                </Avatar>
              )}
              
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'background.default',
                  color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                  borderRadius: 2,
                  ...(message.sender === 'user' ? {
                    borderBottomRightRadius: 4
                  } : {
                    borderBottomLeftRadius: 4
                  })
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {message.text || (isStreaming && message.sender === 'ai' ? '...' : '')}
                </Typography>
              </Paper>

              {message.sender === 'user' && (
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  <PersonIcon fontSize="small" />
                </Avatar>
              )}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Paper>

        {/* Input Area */}
        <Paper elevation={2} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Ask your AI tutor anything..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isStreaming}
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSendMessage}
              disabled={isStreaming || !inputMessage.trim()}
              sx={{ minWidth: 100 }}
            >
              {isStreaming ? 'Sending...' : 'Send'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
>>>>>>> temp-assessment-branch
  );
};

export default Chat;
