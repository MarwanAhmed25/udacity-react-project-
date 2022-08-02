import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/home";
import Search from "./components/search";
import {update, getAll } from './BooksAPI';
import { useEffect, useState } from "react";
function App() {

  const updateShelf = async (value, b) => {
    await update(b, value);
    //console.log(res);
  }
  const [books, setBooks] = useState([]);

  useEffect(()=>{
    const getBooks = async()=>{
      const res = await getAll();
      setBooks(res);
    }

    getBooks();
  },[]);
  
  return (
    <Routes>
      <Route path="/" element={<Home updateShelf={updateShelf} />}></Route>
      <Route path="/search" element={<Search updateShelf={updateShelf} homeBooks={books}/>}></Route>
    </Routes>
  );
}

export default App;
