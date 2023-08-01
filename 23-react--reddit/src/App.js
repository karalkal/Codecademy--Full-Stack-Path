import { nanoid } from 'nanoid'
import styles from './App.module.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';

function App() {
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"



  return (
    <>
      <Header />
    </>
  );
}

export default App;
