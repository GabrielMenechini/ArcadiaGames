import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import './index.css';

import PrivateRoute from "./components/PrivateRoute";

import Login from './pages/Login';
import Forms from "./pages/Forms";
import Home from './pages/Home';
import Games from './pages/Games';
import React from 'react';
import GTA5 from './pages/GTA5';
import UsersCrud from './pages/UsersCrud';





function App() {
  return (
    <div>
      <div className="App"></div>

      <BrowserRouter>
        <Routes>
          {}
          <Route path="/" element={<Login />} />

          {}
          <Route
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:name" element={<GTA5 />} />
            <Route path="/users" element={<UsersCrud />} />
            <Route
              />
          </Route>

          {}
          <Route path="/forms" element={<Forms />} />

          {}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;