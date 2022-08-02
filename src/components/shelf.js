

const Shelf = ({category, title, books, updateShelf})=>{

    return (
        <div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.length ? books.filter((b) => b.shelf === category).map((b) => {

                    return (<li key={b.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage:
                                `url(${b.imageLinks.smallThumbnail})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select value={category} onChange={(e) => { updateShelf(e.target.value, b); }}>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">
                          {b.title}
                        </div>
                        <div className="book-authors">{b.authors}</div>
                      </div>
                    </li>)

                  }) : <span>none</span>}
                </ol>
              </div>
            </div>
            
    )
}

export default Shelf;