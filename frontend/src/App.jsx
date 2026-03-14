import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import WallpaperDetail from './pages/WallpaperDetail';
import CategoryPage from './pages/CategoryPage';
import Categories from './pages/Categories';
import SearchPage from './pages/SearchPage';
import WallpapersPage from './pages/WallpapersPage';
import AIWallpaperGenerator from './pages/AIWallpaperGenerator';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CopyrightPolicy from './pages/CopyrightPolicy';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/wallpaper/:id" element={<WallpaperDetail />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/wallpapers" element={<WallpapersPage />} />
              <Route path="/ai-generator" element={<AIWallpaperGenerator />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/copyright" element={<CopyrightPolicy />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
