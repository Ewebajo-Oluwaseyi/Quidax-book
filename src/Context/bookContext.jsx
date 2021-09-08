import {createContext, useState} from 'react';
import Book from '../Components/data.js';
import { GET_BOOKS } from "../quaries/getAllBooks";
import { useQuery } from "@apollo/client";

const BookContextProvider = (props) => {
    const { data } = useQuery(GET_BOOKS);

    const [books, setBooks] = useState(data && data.books);
   // console.log(books)
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [query, setQuery] = useState(null);

    const setAllBooks = () => {
        setBooks(data && data.books)

    }


    const search = (searchTerm) => {
        setQuery(searchTerm);
       // console.log(searchTerm)
       if(searchTerm === "" || searchTerm.length < 1) {
            return setSearchedBooks([])
        }
       // console.log(books)
        const searchBooks =  books && books.filter((book) => {
            return book.title.toLowerCase().match(searchTerm.toLowerCase()) || book.authors[0].name.toLowerCase().match(searchTerm.toLowerCase());
        });

        setSearchedBooks(books && [...searchBooks]);
    }

    const getSingleBook = (id) => {
        const singleBook = books.find(b =>  Number(b.id) === Number(id));
        return singleBook;
    }

    return (
        <BookContext.Provider value={{books, searchedBooks, search, query, getSingleBook,  setAllBooks}}>
            {props.children}
        </BookContext.Provider>
    )
}

export const BookContext = createContext();

export default BookContextProvider;

