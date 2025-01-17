import './App.css';
import Header from './composants/Header/Header.js';
import LoginPage from './pages/LoginPage.js'; // Page de connexion
import HomePage from './pages/HomePage.js';
import SignupPage from './pages/SignupPage.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js';

function App() {

  return (
    <>
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
    </>
    
  );
}

export default App;