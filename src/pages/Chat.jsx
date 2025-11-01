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
import { useNavigate, useBlocker } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';
import ChatService from '../services/chatService';
import UserService from '../services/userService';
import EvaluatorService from '../services/evaluatorService';
import LatexRenderer from '../components/common/LatexRenderer';
import EvaluationPanel from '../components/chat/EvaluationPanel';
import { useLocation } from 'react-router-dom';

// Main Chat component which can be used inside a larger application
const Chat = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const location = useLocation();
  
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
  // Error state
  const [error, setError] = useState('');
  // Evaluation state
  const [currentEvaluation, setCurrentEvaluation] = useState('');
  const [currentGrade, setCurrentGrade] = useState(null);
  const [evaluationObjectId, setEvaluationObjectId] = useState(null);
  // State to track if we should block navigation
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(true);
  // State to track if session is being ended (to prevent double blocking)
  const [isEndingSession, setIsEndingSession] = useState(false);

  // Ref to automatically scroll the chatbox to the bottom when new messages arrive
  const chatBoxRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Fetch student ID from user email
  useEffect(() => {
    const fetchStudentId = async () => {
      if (user?.email) {
        try {
          const id = await UserService.getStudentId(user.email);
          setStudentId(id.student_id);
        } catch (err) {
          console.error('Error fetching student ID:', err);
          setError('Failed to load user information.');
        }
      }
    };
    
    fetchStudentId();
  }, [user]);

  // useEffect to scroll the chatbox to the bottom whenever messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize chat when studentId is available
  useEffect(() => {
    if (studentId) {
      initializeChat();
    }
  }, [studentId]);

  const initializeChat = async () => {
    try {
      setStatus('Connecting...');
      setError('');
      
      // Get initial status
      await checkStatus();
      
      const isFirstTime = location.state?.isFirstTime;

      if (isFirstTime) {
        const aiResponse = await ChatService.sendMessage(studentId, `Hey there! Nice to meet you! I'm ${user.name}.`);
        if (aiResponse && typeof aiResponse === 'object' && aiResponse.content) {
          setMessages([{
            id: 1,
            sender: 'ai',
            text: aiResponse.content,
            timestamp: new Date()
          }]);
          // Store evaluation if present
          if (aiResponse.evaluation || aiResponse.grade) {
            await storeEvaluationData(aiResponse.evaluation, aiResponse.grade);
          }
        }
      } else {
        const aiResponse = await ChatService.sendMessage(studentId, `Hey there! It's ${user.name} again. I'm here for another lesson!`);
        if (aiResponse && typeof aiResponse === 'object' && aiResponse.content) {
          setMessages([{
            id: 1,
            sender: 'ai',
            text: aiResponse.content,
            timestamp: new Date()
          }]);
          // Store evaluation if present
          if (aiResponse.evaluation || aiResponse.grade) {
            await storeEvaluationData(aiResponse.evaluation, aiResponse.grade);
          }
        }
      }

      setStatus('Connected');
    } catch (err) {
      console.error('Failed to initialize chat:', err);
      setError('Failed to connect to your AI tutor. Please try again.');
      setStatus('Connection failed');
    }
  };

  const checkStatus = async () => {
    if (!studentId || isStreaming) return;
    
    try {
      const statusData = await ChatService.getStatus(studentId);
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

  // Helper function to store evaluation data
  const storeEvaluationData = async (evaluation, grade) => {
    if (!studentId) return;

    try {
      const objectId = await EvaluatorService.storeEvaluation(
        studentId,
        evaluation || '',
        grade || {}
      );
      
      // Store the object_id (assuming it's returned as a string or number)
      setEvaluationObjectId(objectId);
      setCurrentEvaluation(evaluation || '');
      setCurrentGrade(grade || null);
    } catch (err) {
      console.error('Error storing evaluation:', err);
      // Don't show error to user as this is background operation
    }
  };

  // Handle evaluation update from EvaluationPanel
  const handleEvaluationUpdate = (updatedEvaluation, updatedGrade) => {
    setCurrentEvaluation(updatedEvaluation);
    setCurrentGrade(updatedGrade);
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || isStreaming) return;

    // Add the user's message to the state
    const userMessageId = Date.now();
    setMessages(prevMessages => [...prevMessages, { id: userMessageId, sender: 'user', text: message }]);
    setInputMessage('');
    setIsStreaming(true);
    setStatus('AI is typing...');

    try {
      // Get the AI response using the regular sendMessage method
      const aiResponse = await ChatService.sendMessage(studentId, message);
      if (aiResponse === "complete") {
        navigate('/endlesson');
        return;
      }
      
      // Check if aiResponse is an object with content
      if (aiResponse && typeof aiResponse === 'object' && aiResponse.content) {
        // Add the AI response to the state
        const aiMessageId = Date.now() + 1;
        setMessages(prevMessages => [...prevMessages, { id: aiMessageId, sender: 'ai', text: aiResponse.content }]);
        
        // Store evaluation if present
        if (aiResponse.evaluation || aiResponse.grade) {
          await storeEvaluationData(aiResponse.evaluation, aiResponse.grade);
        }
      } else {
        // Handle case where response is just a string
        const aiMessageId = Date.now() + 1;
        setMessages(prevMessages => [...prevMessages, { id: aiMessageId, sender: 'ai', text: String(aiResponse) }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Add error message to the state
      const errorMessageId = Date.now() + 1;
      setMessages(prevMessages => [...prevMessages, { id: errorMessageId, sender: 'ai', text: "Sorry, an error occurred. Please try again." }]);
    } finally {
      setIsStreaming(false);
      setStatus('Connected');
    }
  };

  // Main component JSX structure
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleEndSession = async () => {
    if (!window.confirm('Are you sure you want to end this lesson?')) return;
    
    // Disable navigation blocking and end session
    setShouldBlockNavigation(false);
    setIsEndingSession(true);
    
    try {
      await ChatService.endSession(studentId);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error ending session:', err);
      // Navigate anyway
      navigate('/dashboard');
    }
  };

  // Block navigation when leaving chat page
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      shouldBlockNavigation &&
      !isEndingSession &&
      currentLocation.pathname !== nextLocation.pathname
  );

  // Handle navigation blocking - show confirmation dialog
  useEffect(() => {
    if (blocker.state === 'blocked' && !isEndingSession && studentId) {
      const shouldProceed = window.confirm(
        'Are you sure you want to leave this lesson? Your session will be ended.'
      );
      
      if (shouldProceed) {
        // End session and proceed with navigation
        setShouldBlockNavigation(false);
        setIsEndingSession(true);
        ChatService.endSession(studentId)
          .then(() => {
            blocker.proceed();
          })
          .catch((err) => {
            console.error('Error ending session:', err);
            // Proceed with navigation even if session end fails
            blocker.proceed();
          });
      } else {
        // Reset blocker to allow user to continue
        blocker.reset();
      }
    }
  }, [blocker, isEndingSession, studentId]);

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', py: 2 }}>
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

        {/* Main Content Area - Chat and Evaluation Side by Side */}
        <Box sx={{ display: 'flex', gap: 2, flex: 1, minHeight: 0 }}>
          {/* Chat Area - Left Side */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
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
                      bgcolor: message.sender === 'user' ? 'primary.main' : '#f5f5f5',
                      color: message.sender === 'user' ? 'primary.contrastText' : '#000000',
                      borderRadius: 2,
                      ...(message.sender === 'user' ? {
                        borderBottomRightRadius: 4
                      } : {
                        borderBottomLeftRadius: 4
                      })
                    }}
                  >
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                      <LatexRenderer>{message.text || (isStreaming && message.sender === 'ai' ? '...' : '')}</LatexRenderer>
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
          </Box>

          {/* Evaluation Panel - Right Side */}
          <Box sx={{ width: 350, minWidth: 350, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <EvaluationPanel
              evaluation={currentEvaluation}
              grade={currentGrade}
              objectId={evaluationObjectId}
              onUpdate={handleEvaluationUpdate}
            />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default Chat;