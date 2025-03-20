import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import WatchRoom from './pages/WatchRoom';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateRoom />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/watch/:roomId" element={<WatchRoom />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;