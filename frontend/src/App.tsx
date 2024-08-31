import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProtectedRoute from './components/utils/ProtectedRoutes';
import Home from './screens/Home';
import { Admin } from './screens/Admin';
import { Defis } from './screens/Challenges';
import { Factions } from './screens/Factions';
import { Mails } from './screens/Emails';
import { Parrainage } from './screens/Parrainage';
import { Events } from './screens/Events';
import { Wei } from './screens/Wei';
import { Login } from './screens/Login';
import { Souhait } from './screens/Desires';
import { Profil } from './screens/Profil'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/Admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/Defis' element={<ProtectedRoute><Defis /></ProtectedRoute>} />
        <Route path='/Factions' element={<ProtectedRoute><Factions /></ProtectedRoute>} />
        <Route path='/Mails' element={<ProtectedRoute><Mails /></ProtectedRoute>} />
        <Route path='/Parrainage' element={<ProtectedRoute><Parrainage /></ProtectedRoute>} />
        <Route path='/Events' element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path='/Profil' element={<ProtectedRoute><Profil /></ProtectedRoute>} />
        <Route path='/Wei' element={<ProtectedRoute><Wei /></ProtectedRoute>} />
        <Route path='/Souhait' element={<ProtectedRoute><Souhait /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
