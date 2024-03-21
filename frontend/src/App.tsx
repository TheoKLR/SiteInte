import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Defis' element={<Defis />} />
        <Route path='/Factions' element={<Factions />} />
        <Route path='/Mails' element={<Mails />} />
        <Route path='/Parrainage' element={<Parrainage />} />
        <Route path='/Events' element={<Events />} />
        <Route path='/Wei' element={<Wei />} />
        <Route path='/Souhait' element={<Souhait />} />
      </Routes>
    </div>
  );
}

export default App;
