import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Shelf from "./shelf";
import { getAll } from "../BooksAPI";

const Home = ({updateShelf}) => {

  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const getBooks = async() => {
      const res = await getAll();
      setBooks(res);
    }

    getBooks();
  }, [books]);

  return (
    <div className="app">

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf updateShelf={updateShelf} title='Currently Reading' category='currentlyReading' books={books}/>
            <Shelf updateShelf={updateShelf} title='Want To Read' category='wantToRead' books={books}/>
            <Shelf updateShelf={updateShelf} title='Read' category='read' books={books}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>

    </div>
  );
}

export default Home;