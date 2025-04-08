import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Card from './components/Card';

import Contador from './components/contador';
import Login from './pages/Login';
import Home from './pages/Home';
import Games from './pages/Games';

function App() {
  
  return (
    <div className=""  >Aula 2 - componentes
    <Card texto="Gustavo lima" header='Card1' footer='footer card1'></Card>
      <Card texto="Arcane Odyssey é vida" header='Card2'></Card>
      
     
      <Contador></Contador>

      

    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </BrowserRouter>
  </div>);

}

export default App
