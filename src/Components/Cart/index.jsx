import React,{useContext} from 'react'
import './index.css';
import { cartVar, CartContext, cartSubtotal } from '../../Context/cartContext';
import {motion} from 'framer-motion';
import { useReactiveVar } from "@apollo/client"
import CartItem from './cartItem';
function Cart() {

    const {toggleCart} = useContext(CartContext);
   // console.log(cartSubtotal)
    const { items: cartItems } = useReactiveVar(cartVar);
    const subTotal = cartSubtotal()
    return (
        <div id="cart">
            <div className="background">
                <motion.aside className="main-cart"
                    initial={{x: "100%"}}
                    animate={{x: 0}}
                    exit={{x: "100%" }}
                    transition={{type:"tween", duration: 0.3}}
                    >
                        <div className="cart-header">
                            <div className="icon-wrapper">
                                <button className="icon-button" onClick={toggleCart}>
                                    <img src="image/arrow.svg" alt="back-icon"/>
                                </button>
                                <span className="icon-title">Back</span>
                            </div>
                            <div className="icon-wrapper">
                                <span className="icon-title">Your Cart</span>
                                <button className="icon-button">
                                    <img src="image/cart.svg" alt="back-icon"/>
                                </button>
                            </div>
                        </div>
                        <div className="body">
                            {cartItems.length > 0 ? (
                            <>
                            {cartItems.map((book,index) => {
                                return(
                                    <CartItem book={book} index={index}  key={index}/>
                                )
                            })}
                            <div className="cart-footer">
                                <div className="summary">
                                    <p className="summary-title">Subtotal</p>
                                    <p className="summary-total">${subTotal}</p>
                                </div>
                                <button type="button" className="cart-btn">
                                    <span className="btn-icon">
                                        <svg width="24" height="24" className="cart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path style={{fill:'white' }} fillRule="evenodd" clipRule="evenodd" d="M19.5545 13.3568L6.90606 14.6356C6.56202 14.6699 6.2604 15.0034 6.2604 15.3489C6.2604 15.662 6.51515 15.917 6.82828 15.917H19.4693C19.9404 15.917 20.3216 16.2986 20.3216 16.7691C20.3216 17.2396 19.9404 17.6214 19.4693 17.6214H6.82828C6.81374 17.6214 6.79899 17.621 6.78444 17.6202C5.56667 17.597 4.58061 16.6109 4.55737 15.3931C4.55677 15.3784 4.55636 15.3636 4.55636 15.3491C4.55636 14.758 4.78141 14.1836 5.1903 13.7317C5.59939 13.2798 6.14828 12.9986 6.73657 12.9398L7.14545 12.899L4.48384 3.70424H2.85212C2.38141 3.70424 2 3.32263 2 2.85212C2 2.38162 2.38141 2 2.85212 2H5.12424C5.50364 2 5.83737 2.25091 5.94263 2.61515L6.42242 4.27212H19.4693C19.9404 4.27212 20.3216 4.65354 20.3216 5.12424V12.5089C20.3216 12.9469 19.9897 13.3131 19.5545 13.3568ZM18.6174 5.97636H6.91556L8.8697 12.7267L18.6174 11.7378V5.97636Z" fill="black"/>
                                            <path style={{fill:'white' }} d="M4.98223 22C6.00189 22 6.82849 21.1734 6.82849 20.1537C6.82849 19.1341 6.00189 18.3075 4.98223 18.3075C3.96257 18.3075 3.13597 19.1341 3.13597 20.1537C3.13597 21.1734 3.96257 22 4.98223 22Z" fill="black"/>
                                            <path style={{fill:'white' }} d="M18.4754 22C19.495 22 20.3216 21.1734 20.3216 20.1537C20.3216 19.1341 19.495 18.3075 18.4754 18.3075C17.4557 18.3075 16.6291 19.1341 16.6291 20.1537C16.6291 21.1734 17.4557 22 18.4754 22Z" fill="black"/>
                                        </svg>
                                    </span>
                                    <span className="btn-title">
                                        Proceed to cart
                                    </span>
                                </button>
                            </div>
                            </>
                            ):(
                                <div className="cart-empty">
                                    <span>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.5545 13.3568L6.90606 14.6356C6.56202 14.6699 6.2604 15.0034 6.2604 15.3489C6.2604 15.662 6.51515 15.917 6.82828 15.917H19.4693C19.9404 15.917 20.3216 16.2986 20.3216 16.7691C20.3216 17.2396 19.9404 17.6214 19.4693 17.6214H6.82828C6.81374 17.6214 6.79899 17.621 6.78444 17.6202C5.56667 17.597 4.58061 16.6109 4.55737 15.3931C4.55677 15.3784 4.55636 15.3636 4.55636 15.3491C4.55636 14.758 4.78141 14.1836 5.1903 13.7317C5.59939 13.2798 6.14828 12.9986 6.73657 12.9398L7.14545 12.899L4.48384 3.70424H2.85212C2.38141 3.70424 2 3.32263 2 2.85212C2 2.38162 2.38141 2 2.85212 2H5.12424C5.50364 2 5.83737 2.25091 5.94263 2.61515L6.42242 4.27212H19.4693C19.9404 4.27212 20.3216 4.65354 20.3216 5.12424V12.5089C20.3216 12.9469 19.9897 13.3131 19.5545 13.3568ZM18.6174 5.97636H6.91556L8.8697 12.7267L18.6174 11.7378V5.97636Z" fill="black"/>
                                            <path d="M4.98223 22C6.00189 22 6.82849 21.1734 6.82849 20.1537C6.82849 19.1341 6.00189 18.3075 4.98223 18.3075C3.96257 18.3075 3.13597 19.1341 3.13597 20.1537C3.13597 21.1734 3.96257 22 4.98223 22Z" fill="black"/>
                                            <path d="M18.4754 22C19.495 22 20.3216 21.1734 20.3216 20.1537C20.3216 19.1341 19.495 18.3075 18.4754 18.3075C17.4557 18.3075 16.6291 19.1341 16.6291 20.1537C16.6291 21.1734 17.4557 22 18.4754 22Z" fill="black"/>
                                        </svg>
                                    </span>
                                    <h5>Your Cart is empty</h5>
                                </div>
                            )}
                        </div>
                    </motion.aside>
            </div>
        </div>
    )
}

export default Cart
