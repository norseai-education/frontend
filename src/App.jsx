import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Loading from './pages/Loading';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Logout from './pages/Logout';
import Assessment from './pages/Assessment';
import Access from './pages/Access';
import NotFound from './pages/NotFound';
import MathAssessment from './pages/MathAssessment';
import CSAssessment from './pages/CSAssessment';
import AnalyticsAssessment from './pages/AnalyticsAssessment';
import GeometryAssessment from './pages/GeometryAssessment';
import MachineLearningAssessment from './pages/MachineLearningAssessment';
import DeepLearningAssessment from './pages/DeepLearningAssessment';
import UserDetails from './pages/UserDetails';
import PlaceholderPage from './pages/PlaceholderPage';
import Courses from './pages/Courses';
import Analysis from './pages/Analysis';
import Materials from './pages/Materials';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/access" element={<Access />} />
        <Route path="/math-assessment" element={<MathAssessment />} />
        <Route path="/cs-assessment" element={<CSAssessment />} />
        <Route path="/analytics-assessment" element={<AnalyticsAssessment />} />
        <Route path="/geometry-assessment" element={<GeometryAssessment />} />
        <Route path="/machine-learning-assessment" element={<MachineLearningAssessment />} />
        <Route path="/deep-learning-assessment" element={<DeepLearningAssessment />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/apps" element={<PlaceholderPage title="Apps" />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;