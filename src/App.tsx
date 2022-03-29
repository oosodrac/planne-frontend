import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Balde from './components/Balde/Balde';
import Deposito from './components/BaldeFruta/Deposito';
import Fruta from './components/Fruta/Fruta';
import Home from './modules/Home';
import Header from './layouts/Header';
import NotFound from './layouts/NotFound';

function App() {
  return (
    <>
    <Header/>
      <Container className='p-4' >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="balde" element={<Balde/>} />
        <Route path="fruta" element={<Fruta/>} />
        <Route path="deposito" element={<Deposito/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </Container>
    </>
  );
}

export default App;
