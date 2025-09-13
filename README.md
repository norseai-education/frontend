# NorseAI - AI Teacher Platform

A modern React application built with Vite for the NorseAI AI Teacher platform. This project provides an interactive learning environment with chat functionality, user authentication, and a comprehensive dashboard.

## Features

- **AI-Powered Chat**: Interactive conversations with AI teacher
- **User Authentication**: Secure login and signup system
- **Dashboard**: Comprehensive analytics and user management
- **Responsive Design**: Mobile-first approach with Material-UI
- **Real-time Communication**: WebSocket-based chat system

## Tech Stack

- **Frontend**: React 18 with Vite
- **UI Library**: Material-UI (MUI) with custom theming
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Vite with HMR
- **Styling**: Emotion (CSS-in-JS)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Logo, etc.)
│   ├── chat/           # Chat-related components
│   ├── admin/          # Admin dashboard components
│   └── Layout.jsx      # Main layout wrapper
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── styles/             # Theme and styling
└── types/              # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Setup

Make sure you have Node.js 18+ and npm installed. The project uses modern JavaScript features and requires a compatible browser.

## Contributing

This project is part of the NorseAI platform. Please follow the established coding standards and use the provided ESLint configuration.
