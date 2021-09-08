import React, {useContext, useState} from 'react'
import './header.css';
import { CartContext } from "../../Context/cartContext";
import {Link, useHistory} from "react-router-dom";
import { BookContext } from "../../Context/bookContext";
import {motion, AnimatePresence} from 'framer-motion';

function Header() {

    let history = useHistory();
    const [searchText, setSearchText] = useState("");
    const {toggleCart, noOfCartItems} = useContext(CartContext);
    const {search} = useContext(BookContext);
    const [openMobileSearch, setOpenMobileSearch] = useState(false);
    const toggleMobileSearch = () => {
        setOpenMobileSearch(!openMobileSearch)
    }

    const onChangeSearch = (e) => {
        if (window.location.pathname !== '/search'){
            history.push('/search')
        }

        setSearchText(e.target.value);
       search(searchText);
    };

    return (
        <div className="header">
            <div className="brand">
                <div className="logo">
                <Link to="/">
                    <img src="image/logo-full.svg" className="logo-full" alt="logo"/>
                    <img src="image/logo-mobile.svg" className="logo-mobile" alt="brand-logo"/>
                </Link>

                </div>
            </div>
            <div className="search">
                <input type="text" onKeyUp={onChangeSearch} className="search-input" placeholder="Search books, genres, authors, etc."/>
                <button className="search-button">
                    <img src="image/search.svg" alt="search-icon"></img>
                </button>
                <button className="mobile-search-button" onClick={toggleMobileSearch}>
                    <img src="image/search.svg" alt="search-icon"/>
                </button>
            </div>
            <div className="icons">
                <div className="books-icon">
                    <img src="image/books.svg" alt=""/>
                </div>
                <button className="cart-icon" onClick={toggleCart}>
                    <img src="image/cart.svg" alt=""/>
                    <span>{noOfCartItems()}</span>
                </button>
            </div>

            <AnimatePresence>
            {openMobileSearch && (
            <div className="mobile-search-overlay">
            <motion.div className="mobile-search-container"
            initial={{y: "-100%"}}
            animate={{y: 0}}
            exit={{y: "-100%" }}
            transition={{type:"tween", duration: 0.5}}
            >
                <button className="close-button" onClick={toggleMobileSearch}>
                    <img src="image/arrow.svg" alt="search-icon"/>
                </button>
                <div className="mobile-search-wrapper">
                    <input type="text" onKeyUp={onChangeSearch} className="mobile-search" placeholder="Search books, genres, author, etc." />
                        <button className="search-button">
                        <img src="image/search.svg" alt="search-icon"/>
                    </button>
                </div>
            </motion.div>
            </div>
        )}
        </AnimatePresence>
        </div>
    )
}

export default Header
