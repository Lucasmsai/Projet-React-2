import './App.css';
import Header from './composants/Header/Header.js';
import LoginPage from './pages/LoginPage.js'; // Page de connexion
import HomePage from './pages/HomePage.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
    </>
    
  );
}

export default App;