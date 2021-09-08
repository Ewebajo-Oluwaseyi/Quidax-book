import React, {useContext} from 'react'
import './SearchPage.css';
import Cart from '../../Components/Cart/index'
import { CartContext } from "../../Context/cartContext";
import BookCard from "../../Components/Home/Books/bookCard";
import {AnimatePresence} from 'framer-motion';
import { BookContext } from "../../Context/bookContext";
import {useHistory} from "react-router-dom";
import Loader from '../../Components/Loader/index';

function SearchPage() {
    const {cartIsOpen} = useContext(CartContext);
   const {searchedBooks, query, setAllBooks} = useContext(BookContext);
   console.log(searchedBooks)
    const history = useHistory();
   if (searchedBooks && searchedBooks.length === 0 && query === null){
        history.push('/')
    }
   //console.log(searchedBooks)
   if (searchedBooks === []) {
    return <Loader />
  }
    return (
        <>
            <div id="search">
            <div className="search-head">
                {
                    query && query.length > 0 ? (
                        <h4 className="title"> {searchedBooks && searchedBooks.length} results found</h4>
                    ) :
                    (
                        <h4 className="title">Start typing to search</h4>
                    )
                }

            </div>
             <div className="search-books-wrapper">
                {searchedBooks && searchedBooks.map((book, i) => {
                    return (
                        <BookCard book={book} key={i}/>
                    )
                })}
             </div>
        </div>
             <AnimatePresence>
                {cartIsOpen && (
                <Cart />
                )}
            </AnimatePresence>
        </>

    )
}

export default SearchPage
