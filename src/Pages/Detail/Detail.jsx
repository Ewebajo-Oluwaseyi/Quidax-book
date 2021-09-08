import React, {useContext} from 'react'
import './Detail.css';
import {useParams, useHistory} from "react-router-dom"
import ReactStars from "react-rating-stars-component";
import {GET_BOOK} from '../../quaries/getBook';
import {useQuery} from '@apollo/client';
import Loader from '../../Components/Loader/index';
import { CartContext } from "../../Context/cartContext";
import {AnimatePresence} from 'framer-motion';
import Cart from '../../Components/Cart/index'

function Details() {
    const {id} = useParams()
    // console.log(id)
    let history = useHistory();

    //const books = BookDatas.filter((BookData, i) => BookData.id === Number(id))
    //const book = books.map((b, i) => {return b})[0]

    const { loading,  data } = useQuery(GET_BOOK, { variables: { id } });
    const book = data && data.books[0]
   // console.log(data && data.books[0])
    const getCopies = (copies) => {
        if (copies > 0) {
            return `${copies} copies available`
        } else {
            return 'Out of stock'
        }
    }
    const {addItemToCart, cartOpen} = useContext(CartContext);
    const addToCart = (e, book) => {
        e.preventDefault()
       // console.log(book)
        addItemToCart(book.id, book.available_copies, book.price)
      }

    if (loading) {
        return <Loader />
      }
    return (
        <>
        <div id="detail-head">
            <div className="detail-aside">
                <div className="back">
                    <button onClick={()=> history.goBack()}>
                        <span className="icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20 13.2819V11.5338H7.37343L12.6712 6.23606L11.4351 5L4.90132 11.5338L4 12.4078L4.90132 13.2819L11.4351 19.8157L12.6712 18.5796L7.37343 13.2819H20Z" fill="black"/>
                            </svg>
                        </span>
                        <span className="title">
                            Back
                        </span>
                    </button>
                </div>
                <div className="detaail-image-wrapper">
                    <img src={book.image_url} alt=""/>
                </div>

                <div className="detail-meta">
                    <p className={`${book.available_copies > 0 ? 'stock' : 'no-stock'}`}>{getCopies(book.available_copies)}</p>
                    <p className="price">${book.price}</p>
                </div>

                {book.available_copies > 0 && (<div className="aside-button" onClick={(e) => addToCart(e, book)}>
                        <button type="button" className="detail-cart-btn">
                         <span className="btn-icon">
                            <svg width="24" height="24" className="cart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path style={{fill:'white' }} fillRule="evenodd" clipRule="evenodd" d="M19.5545 13.3568L6.90606 14.6356C6.56202 14.6699 6.2604 15.0034 6.2604 15.3489C6.2604 15.662 6.51515 15.917 6.82828 15.917H19.4693C19.9404 15.917 20.3216 16.2986 20.3216 16.7691C20.3216 17.2396 19.9404 17.6214 19.4693 17.6214H6.82828C6.81374 17.6214 6.79899 17.621 6.78444 17.6202C5.56667 17.597 4.58061 16.6109 4.55737 15.3931C4.55677 15.3784 4.55636 15.3636 4.55636 15.3491C4.55636 14.758 4.78141 14.1836 5.1903 13.7317C5.59939 13.2798 6.14828 12.9986 6.73657 12.9398L7.14545 12.899L4.48384 3.70424H2.85212C2.38141 3.70424 2 3.32263 2 2.85212C2 2.38162 2.38141 2 2.85212 2H5.12424C5.50364 2 5.83737 2.25091 5.94263 2.61515L6.42242 4.27212H19.4693C19.9404 4.27212 20.3216 4.65354 20.3216 5.12424V12.5089C20.3216 12.9469 19.9897 13.3131 19.5545 13.3568ZM18.6174 5.97636H6.91556L8.8697 12.7267L18.6174 11.7378V5.97636Z" fill="black"/>
                                <path style={{fill:'white' }} d="M4.98223 22C6.00189 22 6.82849 21.1734 6.82849 20.1537C6.82849 19.1341 6.00189 18.3075 4.98223 18.3075C3.96257 18.3075 3.13597 19.1341 3.13597 20.1537C3.13597 21.1734 3.96257 22 4.98223 22Z" fill="black"/>
                                <path style={{fill:'white' }} d="M18.4754 22C19.495 22 20.3216 21.1734 20.3216 20.1537C20.3216 19.1341 19.495 18.3075 18.4754 18.3075C17.4557 18.3075 16.6291 19.1341 16.6291 20.1537C16.6291 21.1734 17.4557 22 18.4754 22Z" fill="black"/>
                            </svg>
                         </span>
                          <span className="btn-title">
                            Add to cart
                          </span>
                        </button>
                </div>)}
            </div>

            <main className="detail-main">
                <div className="detail-content">
                   <h1 className="title">{book.title}</h1>
                    <div className="author">
                        <h5>{book.authors[0].name}</h5>
                        <p className="year">{new Date(book.date).getFullYear()}</p>
                    </div>
                    <div className="content-meta">
                        <div className="stats-ratings">
                            <div className="left-side">
                                <div className="stats-left">
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4659 19C13.8847 19 14.2243 18.6593 14.2243 18.2391C14.2243 17.1103 13.8931 16.059 13.323 15.1778C14.0477 14.5265 15.005 14.1304 16.0545 14.1304C18.3163 14.1304 20.1499 15.97 20.1499 18.2391C20.1499 18.6593 20.4894 19 20.9083 19C21.3271 19 21.6667 18.6593 21.6667 18.2391C21.6667 15.1295 19.154 12.6087 16.0545 12.6087C14.6269 12.6087 13.3238 13.1435 12.3333 14.0243C11.3429 13.1435 10.0398 12.6087 8.61213 12.6087C5.51264 12.6087 3 15.1295 3 18.2391C3 18.6593 3.33955 19 3.7584 19C4.17725 19 4.51679 18.6593 4.51679 18.2391C4.51679 15.97 6.35034 14.1304 8.61213 14.1304C9.66164 14.1304 10.6189 14.5265 11.3436 15.1778C10.7735 16.059 10.4424 17.1103 10.4424 18.2391C10.4424 18.6593 10.7819 19 11.2008 19C11.6196 19 11.9592 18.6593 11.9592 18.2391C11.9592 17.6258 12.0932 17.0438 12.3333 16.5211C12.5735 17.0438 12.7075 17.6258 12.7075 18.2391C12.7075 18.6593 13.047 19 13.4659 19ZM8.61213 12C6.68542 12 5.12351 10.433 5.12351 8.5C5.12351 6.567 6.68542 5 8.61213 5C10.5388 5 12.1008 6.567 12.1008 8.5C12.1008 10.433 10.5388 12 8.61213 12ZM8.61213 10.4783C9.70115 10.4783 10.584 9.59256 10.584 8.5C10.584 7.40744 9.70115 6.52174 8.61213 6.52174C7.52312 6.52174 6.6403 7.40744 6.6403 8.5C6.6403 9.59256 7.52312 10.4783 8.61213 10.4783ZM16.0545 10.4783C17.1435 10.4783 18.0264 9.59256 18.0264 8.5C18.0264 7.40744 17.1435 6.52174 16.0545 6.52174C14.9655 6.52174 14.0827 7.40744 14.0827 8.5C14.0827 9.59256 14.9655 10.4783 16.0545 10.4783ZM16.0545 12C14.1278 12 12.5659 10.433 12.5659 8.5C12.5659 6.567 14.1278 5 16.0545 5C17.9812 5 19.5432 6.567 19.5432 8.5C19.5432 10.433 17.9812 12 16.0545 12Z" fill="black"/>
                                        </svg>
                                    </span>
                                    <span>{book.number_of_purchases}</span>
                                </div>
                                <div className="stats-right">
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.3639 19L18.4542 13.2819C19.2727 12.4841 19.7333 11.3961 19.7333 10.2608C19.7333 9.12548 19.2727 8.03745 18.4542 7.23969C16.7692 5.60758 14.0778 5.58411 12.3639 7.1866C10.647 5.58714 7.95552 5.61546 6.27355 7.25068C5.45657 8.0499 4.99792 9.13876 5.00001 10.2741C5.0021 11.4094 5.46477 12.4966 6.28468 13.2929L12.3639 19ZM7.31798 8.28518C7.92863 7.68507 8.77925 7.38605 9.63677 7.47005C10.4943 7.55405 11.2688 8.01226 11.748 8.71912L12.3639 9.6346L12.9798 8.71912C13.0884 8.56256 13.2127 8.41718 13.3508 8.28518C14.4778 7.19368 16.2828 7.19368 17.4098 8.28518C17.9448 8.80594 18.2468 9.51599 18.2489 10.2576C18.251 10.9992 17.9529 11.7109 17.4209 12.2346L12.3639 16.9786L7.31798 12.2401C6.78278 11.7176 6.48162 11.0056 6.48162 10.2626C6.48162 9.51968 6.78278 8.80762 7.31798 8.28518Z" fill="black"/>
                                        </svg>
                                    </span>
                                    <span>{book.likes}</span>
                                </div>
                            </div>
                            <div className="right-side">
                                <div className="rating-meta">
                                    <dl>
                                        <dt className="rating">
                                            <span>Ratings:</span> {book.rating}
                                        </dt>
                                        <dd>
                                            <ReactStars count={Math.floor(book.rating)} isHalf={true} size={18} color="#67c100" />
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="genre_tags">
                            <dl className="gen">
                                <dt>Genre</dt>
                                <dd>{book.genres.slice(0,2).map((genre, i) => {
                                    return (
                                        <span key={i}>{genre.name}{ i !== book.genres.slice(0,2).length - 1 ? ', ': ''}</span>
                                    )
                                })}</dd>
                            </dl>
                            <dl className="tg">
                                <dt>Tags</dt>
                                <dd>{book.tags.slice(0,2).map((tag, i) => {
                                    return (
                                        <span key={i}>{tag.name}{ i !== book.tags.slice(0,2).length - 1 ? ', ': ''}</span>
                                    )
                                })}</dd>
                            </dl>
                        </div>
                        <div className="publisher_released">
                            <dl className="publisher">
                                <dt>Publisher</dt>
                                <dd>{book.publisher}</dd>
                            </dl>
                            <dl className="released">
                                <dt>Released</dt>
                                <dd>{new Date(book.release_date).toDateString()}</dd>
                            </dl>
                        </div>
                    </div>
                    <h4 className="subtitle">{book.subtitle}</h4>
                    <div className="description">{book.full_description}</div>
                </div>

                {book.available_copies > 0 && (<div className="mobile-cart-button" onClick={(e) => addToCart(e, book)}>
                    <button type="button" className="details-cart-button">
                        <span className="btn-icon">
                            <svg width="24" height="24" className="cart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path style={{fill:'white' }} fillRule="evenodd" clipRule="evenodd" d="M19.5545 13.3568L6.90606 14.6356C6.56202 14.6699 6.2604 15.0034 6.2604 15.3489C6.2604 15.662 6.51515 15.917 6.82828 15.917H19.4693C19.9404 15.917 20.3216 16.2986 20.3216 16.7691C20.3216 17.2396 19.9404 17.6214 19.4693 17.6214H6.82828C6.81374 17.6214 6.79899 17.621 6.78444 17.6202C5.56667 17.597 4.58061 16.6109 4.55737 15.3931C4.55677 15.3784 4.55636 15.3636 4.55636 15.3491C4.55636 14.758 4.78141 14.1836 5.1903 13.7317C5.59939 13.2798 6.14828 12.9986 6.73657 12.9398L7.14545 12.899L4.48384 3.70424H2.85212C2.38141 3.70424 2 3.32263 2 2.85212C2 2.38162 2.38141 2 2.85212 2H5.12424C5.50364 2 5.83737 2.25091 5.94263 2.61515L6.42242 4.27212H19.4693C19.9404 4.27212 20.3216 4.65354 20.3216 5.12424V12.5089C20.3216 12.9469 19.9897 13.3131 19.5545 13.3568ZM18.6174 5.97636H6.91556L8.8697 12.7267L18.6174 11.7378V5.97636Z" fill="black"/>
                            <path style={{fill:'white' }} d="M4.98223 22C6.00189 22 6.82849 21.1734 6.82849 20.1537C6.82849 19.1341 6.00189 18.3075 4.98223 18.3075C3.96257 18.3075 3.13597 19.1341 3.13597 20.1537C3.13597 21.1734 3.96257 22 4.98223 22Z" fill="black"/>
                            <path style={{fill:'white' }} d="M18.4754 22C19.495 22 20.3216 21.1734 20.3216 20.1537C20.3216 19.1341 19.495 18.3075 18.4754 18.3075C17.4557 18.3075 16.6291 19.1341 16.6291 20.1537C16.6291 21.1734 17.4557 22 18.4754 22Z" fill="black"/>
                            </svg>
                        </span>
                        <div className="details-cart-labels">
                            <span className="details-cart-btn-title">
                             Add to cart
                            </span>
                            <span className="details-cart-btn-stock">
                            {book.available_copies} Copies available
                            </span>
                        </div>
                        <span className="details-cart-btn-price">
                            ${book.price}
                        </span>
                    </button>
                            </div>)}
            </main>
        </div>
        <AnimatePresence>
                {cartOpen && (
                <Cart />
                )}</AnimatePresence>
        </>
    )
}

export default Details;
