import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  ChatBubbleOutline as ChatIcon,
  AttachMoney as PricingIcon,
  QuestionAnswer as FaqIcon,
  Send as SendIcon,
  RemoveCircleOutline as MinimizeIcon,
  Check as CheckIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#42a5f5',
    },
    background: {
      default: '#f4f4f4',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

const LoadingIndicator = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
    <CircularProgress />
  </Box>
);

const MessageBubble = ({ message, isBot }) => {
  const align = isBot ? 'flex-start' : 'flex-end';
  const bgColor = isBot ? '#f0f0f0' : '#673ab7';
  const textColor = isBot ? 'text.primary' : 'white';
  const avatarBgColor = isBot ? '#673ab7' : '#f0f0f0';

  const formatTextWithLinks = (text) => {
    // Regex to find links (e.g., http://, https://)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-400 underline" // Tailwind classes for link styling
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: align, mb: 2 }}>
      {isBot && (
        <Avatar
          sx={{
            bgcolor: avatarBgColor,
            mr: 1,
            mt: 0.5,
            width: 32,
            height: 32,
            alignSelf: 'flex-start',
            color: 'white',
          }}
        >
          {/* Use a simple character or icon for the bot avatar */}
          🤖
        </Avatar>
      )}
      <Box
        sx={{
          maxWidth: '80%',
          p: 1.5,
          bgcolor: bgColor,
          color: textColor,
          borderRadius: '16px',
          borderTopLeftRadius: isBot ? '4px' : '16px',
          borderTopRightRadius: isBot ? '16px' : '4px',
          boxShadow: 1,
          wordBreak: 'break-word',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
          {formatTextWithLinks(message.text)}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mt: 1,
            fontSize: '0.7rem',
            color: isBot ? 'text.secondary' : 'rgba(255,255,255,0.7)',
          }}
        >
          <Typography variant="caption" sx={{ mr: 0.5 }}>
            {message.timestamp}
          </Typography>
          <CheckIcon sx={{ fontSize: 14, color: isBot ? 'primary.main' : 'rgba(255,255,255,0.7)' }} />
        </Box>
      </Box>
    </Box>
  );
};

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [expandedFooter, setExpandedFooter] = useState(false);

  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemPrompt = "You are a friendly and helpful assistant in a chat application. Respond conversationally and concisely. Provide well-formatted responses. Use links when necessary.";
      const userQuery = input;
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        tools: [{ "google_search": {} }],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      const botMessage = {
        text: result?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Please try again.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API call failed:", error);
      const errorMessage = {
        text: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleFooter = () => {
    setExpandedFooter(!expandedFooter);
  };

  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  const userName = isAuthenticated && user ? user.name : 'Guest';
  const userAvatar = isAuthenticated && user ? user.picture : null;

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: '95%', sm: 450 },
        height: '85vh',
        maxHeight: 650,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        bgcolor: 'white',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(45deg, #673ab7 30%, #42a5f5 90%)',
          color: 'white',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={userAvatar} sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Welcome {userName} to NorseAI
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit">
          <MinimizeIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
          },
        }}
      >
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            isBot={message.sender === 'bot'}
          />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </Box>

      {/* Footer Links Section */}
      <Box sx={{
        p: 1.5,
        borderTop: '1px solid #e0e0e0',
        bgcolor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mb: expandedFooter ? 1 : 0 }}>
          <Button
            startIcon={<ChatIcon />}
            variant="text"
            size="small"
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              color: 'primary.main',
            }}
          >
            What is NorseAI?
          </Button>
     
          <Button
            startIcon={<FaqIcon />}
            variant="text"
            size="small"
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              color: 'primary.main',
            }}
          >
            FAQs
          </Button>
        </Stack>
        <Box sx={{ textAlign: 'center' }}>
          <IconButton onClick={toggleFooter}>
            {expandedFooter ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>

      <form onSubmit={handleSendMessage}>
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'white',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ '& fieldset': { borderRadius: '25px', borderColor: '#e0e0e0' } }}
          />
          <IconButton
            type="submit"
            color="primary"
            sx={{ ml: 1, bgcolor: '#673ab7', color: 'white', '&:hover': { bgcolor: '#5e35b1' } }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
          </IconButton>
        </Box>
      </form>
    </Paper>
  );
};

export default function MainChat() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          p: 2,
        }}
      >
        <ChatSection />
      </Box>
    </ThemeProvider>
  );
}
