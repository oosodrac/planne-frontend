import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Balde from './components/Balde';
import Fruta from './components/Fruta';
import Home from './modules/Home';
import Header from './shared/Header';

function App() {
  return (
    <>
    <Header/>
      <Container className='p-4' >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="balde" element={<Balde/>} />
        <Route path="fruta" element={<Fruta/>} />
      </Routes>
      </Container>
    </>
  );
}

export default App;
