import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import { Acces } from './screens/Acces';
import { Defis } from './screens/Defis';
import { Factions } from './screens/Factions';
import { Mails } from './screens/Mails';
import { Parrainage } from './screens/Parrainage';
import { Events } from './screens/Events';
import { Wei } from './screens/Wei';
import { Login } from './screens/Login';
import { Souhait } from './screens/Souhait';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Acces' element={<Acces/>}/>
        <Route path='/Defis' element={<Defis/>}/>
        <Route path='/Factions' element={<Factions/>}/>
        <Route path='/Mails' element={<Mails/>}/>
        <Route path='/Parrainage' element={<Parrainage/>}/>
        <Route path='/Events' element={<Events/>}/>
        <Route path='/Wei' element={<Wei/>}/>
        <Route path='/Souhait' element={<Souhait/>}/>
      </Routes>
    </div>
  );
}

export default App;
