// ChatApp.tsx
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Fab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, MoreVert, Send, AttachFile, EmojiEmotions } from "@mui/icons-material";
import Layout from '../Layout';

const drawerWidth = 220;

const contacts = [
  { id: 1, name: "Math 101", message: "Hey, I'm going to meet a friend...", avatar: "B", online: true, unread: 2 },
  { id: 2, name: "Math 102", message: "Let's finish that design...", avatar: "S", online: false, unread: 0 },
  { id: 3, name: "Math 103", message: "Cool, I'll check it", avatar: "J", online: true, unread: 1 },
  { id: 4, name: "Math 104", message: "Thanks for your help!", avatar: "A", online: false, unread: 0 },
];

const initialMessages = [
  { id: 1, sender: "Bella", text: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁", time: "10:13 am", type: "received", pinned: true },
  { id: 2, sender: "Me", text: "Wow that's great", time: "10:14 am", type: "sent" },
  { id: 3, sender: "Bella", images: ["/img1.jpg", "/img2.jpg"], time: "10:15 am", type: "received" },
  { id: 4, sender: "Bella", file: { name: "design-phase-1-approved.pdf", size: "12.5 MB" }, time: "10:16 am", type: "received" },
];

export default function ChatApp() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "Me",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "sent"
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <Box sx={{
        display: "flex",
        height: "100%", // Let Layout handle the height
        bgcolor: theme.palette.background.default,
        overflow: 'hidden',
        p: 1
      }}>
        {/* Sidebar */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileDrawerOpen : true}
          onClose={() => setMobileDrawerOpen(false)}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              top: (theme.mixins.toolbar.minHeight || 64) + 30, // Push down below navbar + 1px
              height: `calc(100% - ${(theme.mixins.toolbar.minHeight || 64) + 30}px)`, // Adjust height accordingly
              borderRight: `1px solid ${theme.palette.divider}`,
              margin: 2,
              borderRadius: 2,
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              Chats
            </Typography>
          </Box>

          <Box p={2}>
            <TextField
              size="small"
              placeholder="Search conversations..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: theme.palette.background.paper,
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                }
              }}
            />
          </Box>

          <Divider />

          <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {contacts.map((contact) => (
              <ListItem
                button
                key={contact.id}
                selected={selectedContact.id === contact.id}
                onClick={() => {
                  setSelectedContact(contact);
                  if (isMobile) setMobileDrawerOpen(false);
                }}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: theme.palette.primary.light + '20',
                    '&:hover': {
                      bgcolor: theme.palette.primary.light + '30',
                    }
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{
                    bgcolor: contact.online ? theme.palette.success.main : theme.palette.grey[400],
                    position: 'relative'
                  }}>
                    {contact.avatar}
                    {contact.online && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: 12,
                          height: 12,
                          bgcolor: theme.palette.success.main,
                          border: `2px solid ${theme.palette.background.paper}`,
                          borderRadius: '50%'
                        }}
                      />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {contact.name}
                      </Typography>
                      {contact.unread > 0 && (
                        <Box
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            borderRadius: '50%',
                            width: 20,
                            height: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {contact.unread}
                        </Box>
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {contact.message}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Chat window */}
        <Box sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          position: 'relative',
          height: '100%', // Use full available height from Layout
          overflow: 'hidden',
          borderRadius: 0,
          boxShadow: theme.shadows[2],
          margin: 2, // Add margin around the chat box
          marginLeft: 2 // Reduce left margin since sidebar already has margin
        }}>
          {/* Header */}
          <Box sx={{
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            display: 'flex',
            alignItems: 'center',
            minHeight: 70,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)' // Subtle shadow to distinguish from navbar
          }}>
            {isMobile && (
              <IconButton
                onClick={() => setMobileDrawerOpen(true)}
                sx={{ mr: 1 }}
              >
                <Search />
              </IconButton>
            )}
            <Avatar sx={{
              mr: 2,
              bgcolor: selectedContact.online ? theme.palette.success.main : theme.palette.grey[400]
            }}>
              {selectedContact.avatar}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {selectedContact.name}
              </Typography>
              <Typography variant="body2" color={selectedContact.online ? "success.main" : "text.secondary"}>
                {selectedContact.online ? "Online" : "Offline"}
              </Typography>
            </Box>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            bgcolor: theme.palette.grey[50],
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0, // Allow flex shrinking
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.grey[100],
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.grey[400],
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: theme.palette.grey[500],
            }
          }}>
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: msg.type === "sent" ? "row-reverse" : "row",
                  alignItems: 'flex-end'
                }}
              >
                <Box sx={{ maxWidth: '70%', minWidth: 120 }}>
                  {msg.text && (
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        bgcolor: msg.type === "sent"
                          ? theme.palette.primary.main
                          : theme.palette.background.paper,
                        color: msg.type === "sent"
                          ? theme.palette.primary.contrastText
                          : theme.palette.text.primary,
                        borderRadius: msg.type === "sent" ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        position: 'relative',
                        wordWrap: 'break-word'
                      }}
                    >
                      <Typography variant="body1">{msg.text}</Typography>
                      {msg.pinned && (
                        <Typography variant="caption" sx={{
                          position: 'absolute',
                          top: -8,
                          right: 16,
                          bgcolor: theme.palette.warning.main,
                          color: 'white',
                          px: 1,
                          borderRadius: 1,
                          fontSize: '0.7rem'
                        }}>
                          📌 Pinned
                        </Typography>
                      )}
                    </Paper>
                  )}

                  {msg.images && (
                    <Box sx={{ display: "flex", gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {msg.images.map((src, i) => (
                        <Box
                          key={i}
                          component="img"
                          src={src}
                          alt="chat"
                          sx={{
                            width: 120,
                            height: 120,
                            borderRadius: 2,
                            objectFit: 'cover',
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.8 }
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  {msg.file && (
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        bgcolor: theme.palette.info.light,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 2,
                        mt: 1
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        📎 {msg.file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {msg.file.size}
                      </Typography>
                    </Paper>
                  )}

                  <Typography
                    variant="caption"
                    sx={{
                      ml: msg.type === "sent" ? 0 : 1,
                      mr: msg.type === "sent" ? 1 : 0,
                      mt: 0.5,
                      color: theme.palette.text.secondary,
                      display: 'block',
                      textAlign: msg.type === "sent" ? 'right' : 'left'
                    }}
                  >
                    {msg.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Input box */}
          <Box sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexShrink: 0, // Prevent shrinking
            position: 'relative',
            zIndex: 1
          }}>
            <IconButton size="small" color="inherit">
              <AttachFile />
            </IconButton>
            <IconButton size="small" color="inherit">
              <EmojiEmotions />
            </IconButton>
            <TextField
              placeholder="Type your message..."
              fullWidth
              size="small"
              multiline
              maxRows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: theme.palette.grey[50],
                  borderRadius: 3,
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  }
                }
              }}
            />
            <Fab
              color="primary"
              size="small"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              sx={{
                boxShadow: theme.shadows[4],
                '&:hover': {
                  boxShadow: theme.shadows[8],
                }
              }}
            >
              <Send />
            </Fab>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
