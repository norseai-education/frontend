import React, { useState, useEffect, useRef } from 'react';
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
    } finally {
      setIsStreaming(false);
      setStatus('Connected');
    }
  };

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
  );
};

export default Chat;
