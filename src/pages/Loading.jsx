import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { keyframes, styled } from '@mui/system';

const backgroundPulse = keyframes`
  0% { opacity: 0.3; }
  100% { opacity: 0.6; }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const progressShine = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const Root = styled(Box)`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  min-height: 100vh;
  color: #e2e8f0;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(600px circle at 20% 30%, #3b82f620 0%, transparent 50%),
      radial-gradient(800px circle at 80% 70%, #3b82f620 0%, transparent 50%),
      radial-gradient(400px circle at 40% 80%, #06b6d420 0%, transparent 50%);
    animation: ${backgroundPulse} 8s ease-in-out infinite alternate;
  }
`;

const FloatingElement = styled('div')`
  position: absolute;
  opacity: 0.1;
  animation: ${float} 6s ease-in-out infinite;

  &:nth-of-type(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &:nth-of-type(2) {
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }

  &:nth-of-type(3) {
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }
`;

const GeometricShape = styled('div')`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3b82f640, #06b6d440);
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const LoadingContainer = styled(Box)`
  text-align: center;
  background: rgba(15, 15, 35, 0.8);
  backdrop-filter: blur(20px);
  padding: 60px 50px;
  border-radius: 24px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  position: relative;
  z-index: 10;
  overflow: hidden;
`;

const LoadingLogo = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  height: 120px;
`;

const NorseLogo = styled('svg')`
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.4));

  .logo-triangle {
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
    transition: stroke-dashoffset 0.8s ease-out;
  }

  .logo-node {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  .logo-line {
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    transition: stroke-dashoffset 0.5s ease-out;
  }
`;

const LoadingMessage = styled(Typography)`
  font-size: 1.3rem;
  color: #94a3b8;
  margin-bottom: 30px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ProgressBar = styled(Box)`
  width: 100%;
  height: 6px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 3px;
  margin: 20px 0;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(Box)`
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #7aa4e7);
  border-radius: 3px;
  width: 0%;
  transition: width 0.5s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: ${progressShine} 2s ease-in-out infinite;
  }
`;

const StatusIndicator = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #64748b;
`;

const StatusDot = styled('div')`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3b82f6;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Loading = () => {
  const navigate = useNavigate();
  const progressFillRef = useRef(null);
  const loadingMessageRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const triangleRef = useRef(null);
  const node1Ref = useRef(null);
  const node2Ref = useRef(null);
  const node3Ref = useRef(null);
  const nodeCenterRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const updateMessage = (message) => {
    if (loadingMessageRef.current) {
      loadingMessageRef.current.textContent = message;
    }
  };

  const updateProgress = (percentage) => {
    if (progressFillRef.current) {
      progressFillRef.current.style.width = percentage + '%';
    }
  };

  const animateLogo = () => {
    setTimeout(() => { if(triangleRef.current) triangleRef.current.style.strokeDashoffset = '0'; }, 500);
    setTimeout(() => { if(node1Ref.current) node1Ref.current.style.opacity = '1'; }, 1200);
    setTimeout(() => { if(node2Ref.current) node2Ref.current.style.opacity = '1'; }, 1500);
    setTimeout(() => { if(node3Ref.current) node3Ref.current.style.opacity = '1'; }, 1800);
    setTimeout(() => { if(nodeCenterRef.current) nodeCenterRef.current.style.opacity = '1'; }, 2100);
    setTimeout(() => { if(line1Ref.current) line1Ref.current.style.strokeDashoffset = '0'; }, 2400);
    setTimeout(() => { if(line2Ref.current) line2Ref.current.style.strokeDashoffset = '0'; }, 2600);
    setTimeout(() => { if(line3Ref.current) line3Ref.current.style.strokeDashoffset = '0'; }, 2800);
  };

  const reverseLogo = () => {
    setTimeout(() => { if(line3Ref.current) line3Ref.current.style.strokeDashoffset = '50'; }, 0);
    setTimeout(() => { if(line2Ref.current) line2Ref.current.style.strokeDashoffset = '50'; }, 200);
    setTimeout(() => { if(line1Ref.current) line1Ref.current.style.strokeDashoffset = '50'; }, 400);
    setTimeout(() => { if(nodeCenterRef.current) nodeCenterRef.current.style.opacity = '0'; }, 700);
    setTimeout(() => { if(node3Ref.current) node3Ref.current.style.opacity = '0'; }, 1000);
    setTimeout(() => { if(node2Ref.current) node2Ref.current.style.opacity = '0'; }, 1300);
    setTimeout(() => { if(node1Ref.current) node1Ref.current.style.opacity = '0'; }, 1600);
    setTimeout(() => { if(triangleRef.current) triangleRef.current.style.strokeDashoffset = '300'; }, 2000);
  };

  useEffect(() => {
    let isForward = true;
    animateLogo();
    animationIntervalRef.current = setInterval(() => {
      if (isForward) {
        reverseLogo();
      } else {
        animateLogo();
      }
      isForward = !isForward;
    }, 3500);

    const performInitialization = async () => {
      updateMessage('Checking authentication...');
      updateProgress(20);
      await sleep(800);

      const sessionToken = localStorage.getItem('session_token');
      const studentId = localStorage.getItem('student_id');

      if (!sessionToken || !studentId) {
        console.log('No session found, would normally redirect to login');
      }

      updateMessage('Initializing student profile...');
      updateProgress(60);
      await sleep(500);

      // In a real app, you would initialize student state here.
      // For now, we just simulate it.

      updateMessage('Setting up your workspace...');
      updateProgress(90);
      await sleep(800);

      updateMessage('Ready!');
      updateProgress(100);

      await sleep(1500);

      navigate('/dashboard');
    };

    performInitialization();

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [navigate]);

  return (
    <Root>
      <FloatingElement><GeometricShape /></FloatingElement>
      <FloatingElement><GeometricShape /></FloatingElement>
      <FloatingElement><GeometricShape /></FloatingElement>

      <LoadingContainer>
        <LoadingLogo>
          <NorseLogo viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heroSymbolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#f8fafc', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#e2e8f0', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="heroGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform="translate(60, 60)" filter="url(#heroGlow)">
              <polygon ref={triangleRef} className="logo-triangle" points="-35,-26 33,-26 0,33" fill="none" stroke="url(#heroSymbolGradient)" strokeWidth="2.5" strokeLinejoin="round" />
              <circle ref={node1Ref} className="logo-node" id="node-1" cx="-28" cy="-22" r="2.5" fill="url(#heroSymbolGradient)" />
              <circle ref={node2Ref} className="logo-node" id="node-2" cx="27" cy="-22" r="2.5" fill="url(#heroSymbolGradient)" />
              <circle ref={node3Ref} className="logo-node" id="node-3" cx="0" cy="25" r="2.5" fill="url(#heroSymbolGradient)" />
              <circle ref={nodeCenterRef} className="logo-node" id="node-center" cx="0" cy="-5" r="3" fill="url(#heroSymbolGradient)" />
              <line ref={line1Ref} className="logo-line" id="line-1" x1="-26" y1="-21" x2="2" y2="-3" stroke="url(#heroSymbolGradient)" strokeWidth="1.5" opacity="0.85" />
              <line ref={line2Ref} className="logo-line" id="line-2" x1="26" y1="-21" x2="-2" y2="-3" stroke="url(#heroSymbolGradient)" strokeWidth="1.5" opacity="0.85" />
              <line ref={line3Ref} className="logo-line" id="line-3" x1="0" y1="-3" x2="0.0001" y2="22" stroke="url(#heroSymbolGradient)" strokeWidth="1.5" opacity="0.85" />
            </g>
          </NorseLogo>
        </LoadingLogo>
        <LoadingMessage ref={loadingMessageRef}>Checking authentication...</LoadingMessage>
        <ProgressBar>
          <ProgressFill ref={progressFillRef} />
        </ProgressBar>
        <StatusIndicator>
          <StatusDot />
          <span>Initializing your learning environment</span>
        </StatusIndicator>
      </LoadingContainer>
    </Root>
  );
};

export default Loading;
