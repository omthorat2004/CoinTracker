import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WatchList from './pages/WatchList';
function App() {
 
  return (
    <>
    
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/watchlists' element={<WatchList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
