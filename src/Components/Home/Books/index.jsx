import React from 'react'
import './index.css';
import BookCard from './bookCard.jsx';

function index({books}) {
    return (
        <div className="books">
            <div className="title-section">
                <h4 className="title">All Books</h4>
            </div>
            <div className="book-wrapper">
                {books && books.map((book, i) => {
                    return(
                        <BookCard book={book}/>
                    )
                })}
            </div>
        </div>
    )
}

export default index
