import React, { useState, useContext } from 'react'
import BooksCarousel from '../../Components/Home/BooksCarousel/index';
import BookData from '../../Components/data';
import Books from '../../Components/Home/Books/index'
import {AnimatePresence} from 'framer-motion';
import Cart from '../../Components/Cart/index'
import { CartContext } from '../../Context/cartContext';
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../quaries/getAllBooks";
import Loader from '../../Components/Loader/index';

function Body() {
    const { loading, data } = useQuery(GET_BOOKS);
    console.log(data && data.books)
    const books = data && data.books;
    const {cartOpen} = useContext(CartContext);


      if (loading) {
        return <Loader />
      }

    return (
        <>
            <div>
            <BooksCarousel books={books}/>
            <Books books={books}/>
            </div>
            <AnimatePresence>
                {cartOpen && (
                <Cart />
                )}</AnimatePresence>
        </>
    )
}

export default Body;
