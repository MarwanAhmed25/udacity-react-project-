import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";

const Search = ({ updateShelf, homeBooks }) => {

  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const updateQuery = (q) => {
    setQuery(q.trim());
  }

  const clearQuery = () => {
    updateQuery('');
  }

  const updatValue = async(value, b)=>{
    const ele = document.getElementById('selection');
    
    ele.value = value;
    
    await updateShelf(value,b);
  }

  useEffect(() => {
    const searchRes = async () => {
      if (query !== '') {
        const res = await search(query, 50);
        setBooks(res);
      }
    }

    searchRes();
  }, [query]);


  const compare = ()=>{
    if(books.length && homeBooks.length){
      homeBooks.forEach(hBook => {
        books.forEach(b => {
          if(hBook.id === b.id)
            {
              b.shelf = hBook.shelf;
            }
        });
      });
    }
  }
compare();
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to='/' onClick={() => clearQuery()} className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input onChange={(e) => updateQuery(e.target.value)} type="text" placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {query && books && books.length ? books.map((b) => <li key={b.id}>
            <div className="book">
              <div className="book-top">

                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    
                    backgroundImage:
                      `url(${b.imageLinks? b.imageLinks.thumbnail: ""})`,

                  }}
                ></div> 
                
                <div className="book-shelf-changer">
                  <select id="selection" value={b.shelf} onChange={(e) => { updatValue(e.target.value, b); }}>
                    <option value="none0" disabled>
                      Move to...
                    </option>
                    <option value="none">None</option>
                    <option value="currentlyReading">
                      Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    
                  </select>
                </div>
              </div>
              <div className="book-title">{b.title}</div>
              <div className="book-authors">{b.authors? b.authors : ""}</div>
            </div>
          </li>
          ) : <div></div>}
        </ol>
      </div>
    </div>
  )
}

export default Search;
