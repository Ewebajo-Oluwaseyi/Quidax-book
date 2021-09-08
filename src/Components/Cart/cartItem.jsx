import React, {useContext} from 'react'
import { gql, useQuery } from "@apollo/client";
import './cartItem.css';
import { CartContext } from '../../Context/cartContext';

const GET_CART = gql`
  query BookInCart($cartItemId: String) {
    books(where: { id: $cartItemId }) {
      title
      image_url
      authors {
        name
      }
      price
      available_copies
    }
  }
  `
function CartItem({book, index}) {
    const cartItemId = book.id
    const cartItemQuantity = book.quantity
    const { loading, data } = useQuery(GET_CART, {
    variables: { cartItemId }
    })

    const {decreaseQuantity, increaseQuantity, removeItemFromCart} = useContext(CartContext);
    const bookItem = data && data.books[0]



    if (loading) {
        return "..."
      }
    return (
        <div className="cart-item">
            <div className="cart-img">
                <img src={bookItem.image_url} alt=""/ >
            </div>
            <div className="cart-item-meta">
                <div className="meta-cart-left">
                    <div>
                        <h5 className="cart-book-title">
                            {bookItem.title}
                        </h5>
                        <p className="cart-book-author">
                            {bookItem.authors[0].name}
                        </p>
                    </div>
                    <p className="remove-book" onClick={(()=>removeItemFromCart(book))}>Remove</p>
                </div>
                <div className="meta-cart-right">
                    <div>
                        <span className="cart-amount">${bookItem.price}</span>
                        <div className="cart-quantity">
                            <button className="cartbtn" onClick={(() => decreaseQuantity(book))}>-</button>
                            <span className="quantity">{cartItemQuantity}</span>
                            <button className="cartbtn" onClick={(() => increaseQuantity(book, bookItem.available_copies))}>+</button>
                        </div>
                    </div>
                    <span className="subtotal">${(bookItem.price * cartItemQuantity).toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem
