import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Mic, Stop } from '@mui/icons-material';
// import { initializeApp } from "firebase/app";
// import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
// import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore";

const Voice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello there! I'm an AI voice assistant. Press the microphone button to start a conversation.", sender: 'ai' }
  ]);
  const [userId, setUserId] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const chatWindowRef = useRef(null);

  // const firebaseConfig = {}; // Replace with your Firebase config
  // const appId = 'default-app-id'; // Replace with your App ID

  useEffect(() => {
    // const app = initializeApp(firebaseConfig);
    // const auth = getAuth(app);
    // const db = getFirestore(app);
    // onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     setUserId(user.uid);
    //     const conversationsRef = collection(db, `artifacts/${appId}/public/data/conversations`);
    //     onSnapshot(conversationsRef, (snapshot) => {
    //       snapshot.docChanges().forEach(change => {
    //         if (change.type === "added") {
    //           const message = change.doc.data();
    //           if (message.userId !== user.uid) {
    //             setMessages(prev => [...prev, message]);
    //           }
    //         }
    //       });
    //     });
    //   } else {
    //     await signInAnonymously(auth);
    //   }
    // });
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const displayMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender, userId }]);
  };

  const saveMessage = async (text, sender) => {
    // if (!userId) return;
    // const db = getFirestore();
    // try {
    //   await addDoc(collection(db, `artifacts/${appId}/public/data/conversations`), {
    //     text,
    //     sender,
    //     timestamp: new Date(),
    //     userId
    //   });
    // } catch (error) {
    //   console.error("Error writing message to Firestore:", error);
    // }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    audioChunks.current = [];
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = event => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
          stream.getTracks().forEach(track => track.stop());
          // processAudio(audioBlob); // This function needs to be implemented
        };
        mediaRecorder.current.start();
      })
      .catch(err => {
        console.error('Error accessing microphone:', err);
        setIsRecording(false);
        displayMessage('Error accessing microphone. Please check permissions.', 'ai');
      });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  };

  return (
    <Paper elevation={3} sx={{
      width: '100%',
      maxWidth: '900px',
      backgroundColor: 'background.paper',
      borderRadius: '1rem',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      mt: 4
    }}>
      <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          User ID: {userId || 'Loading...'}
        </Typography>
      </Box>
      <Box ref={chatWindowRef} sx={{
        height: '70vh',
        p: 2,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              p: 1.5,
              borderRadius: '0.75rem',
              maxWidth: '80%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main',
              color: msg.sender === 'user' ? 'primary.contrastText' : 'secondary.contrastText',
              borderTopRightRadius: msg.sender === 'user' ? 0 : '0.75rem',
              borderTopLeftRadius: msg.sender === 'ai' ? 0 : '0.75rem',
            }}
          >
            <Typography variant="body1">{msg.text}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, borderTop: 1, borderColor: 'divider' }}>
        {!isRecording ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Mic />}
            onClick={handleStartRecording}
            sx={{ borderRadius: '9999px', px: 3, py: 1.5 }}
          >
            Start
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            startIcon={<Stop />}
            onClick={handleStopRecording}
            sx={{ borderRadius: '9999px', px: 3, py: 1.5 }}
          >
            Stop
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default Voice;
