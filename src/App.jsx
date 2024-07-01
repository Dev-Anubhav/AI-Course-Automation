import { useState } from 'react';
import './App.css'
import SearchBar from './Components/SearchBar'
import Navbar from './Components/NavBar';
import Home from './Components/home';

function App() {

  return (
   <>
   <Navbar />
   <SearchBar />
   
<Home />
   </>
  )
}

export default App
