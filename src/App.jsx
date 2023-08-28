import { useEffect, useState } from 'react'
import io from 'socket.io-client';
import './App.css'
import Chat from './components/chat/chat'
import Register from './components/auth/register';
import Login from './components/auth/login';
import { Route, Routes } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { url } from './config';
function App() {
  const socket = io.connect(url);
  // socket.on('connect', () => {
  //   console.log('Connected to server');
  // });

  // socket.on('disconnect', () => {
  //   console.log('Disconnected from server');
  // });
  // socket.on("message", (event) => {
  //   console.log(event);
  // });

  // getUser


  useEffect(() => {
    // ... other codes

    // Emitting an event that will trigger in the backend
    socket.emit("reply");

    // ... other codes
  }, [socket])
  return (
    <Routes>
      {/* <Chat /> */}
      <Route path="/" element={<Chat />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  )
}

export default App
