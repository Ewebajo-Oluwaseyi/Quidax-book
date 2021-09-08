import React, {Component} from 'react'
import './index.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Book from './book.jsx'

class index extends Component {
    render() {
   console.log(this.props.books && this.props.books)
      const featureBook = this.props.books && this.props.books.filter((book) => book.featured)
      const self = this;
      const options = {
        loop: true,
        dots: true,
            margin: 10,
            responsive: {
                0: {
                    items: 2,
                    dots: true,
                },
                600: {
                    items: 4,
                    dots: true,
                },
                1000: {
                    items: 6,
                    dots: true,
                },
                1200: {
                    items: 8,
                    dots: true,
                }
        },
        onInitialized: function () {
            self.carousel = this;
        }
    }
    return (
        <div id="featured-books">
           <div className="title">
               <h4>Features Books</h4>
            </div>
            <div className="featured-container">
                <div className="featured-books-wrapper">
                    <div className="left-nav"  onClick={() => this.carousel.prev()}>
                        <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.5 10.5L5.49846 0.5L0.5 5.5L5.5 10.5Z" fill="black"/>
                        </svg>
                    </div>
                    <OwlCarousel className='owl-theme' {...options}>
                        {
                            featureBook && featureBook.map((book, i) => {
                                return(
                                    <Book book={book} key={i}/>
                                )
                            })
                        }
                    </OwlCarousel>
                    <div className="right-nav" onClick={() => this.carousel.next()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 512 512"><title>ionicons-v5-b</title><polygon points="144 448 368 256 144 64 144 448"/></svg>
                    </div>
                </div>
            </div>
        </div>
    )
    }

}

export default index
