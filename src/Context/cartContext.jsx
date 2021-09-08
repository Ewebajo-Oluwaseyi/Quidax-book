import {createContext, useState} from 'react';
import { makeVar } from "@apollo/client";

export const cartVar = makeVar({
    items: []
  });
export const cartSubtotal = () => {
    const { items } = cartVar()

    const sum = items.reduce((sum, item) => {
      return (sum += item.price * item.quantity)
    }, 0)

    return sum
  }

const CartContextProvider = (props) => {
    const [cartOpen, setCartOpen] = useState(false);

      const increaseQuantity = (bookInCart, bookQuantity) => {
         // console.log(bookInCart)
        if (bookInCart.quantity < bookQuantity) {
          bookInCart.quantity = bookInCart.quantity + 1
        }

        cartVar({ ...cartVar() })
      }

    const decreaseQuantity = bookInCart => {
        if (bookInCart.quantity === 1) {
          removeItemFromCart(bookInCart)
        } else {
          bookInCart.quantity = bookInCart.quantity - 1
        }
        cartVar({ ...cartVar() })
      }


    const getBook = bookId => {
        console.log(bookId)
        const bookInCart = cartVar().items.filter(cartItem => cartItem.id === bookId)
       // console.log(bookInCart)
        return bookInCart
      }
    const addItemToCart = (bookId, bookQuantity, bookPrice) => {
         //console.log(bookId)
        const bookInCart = getBook(bookId);
       // console.log(bookInCart.length)
        const { items: itemsInCart } = cartVar();
       // console.log(itemsInCart)
        if (bookInCart.length === 0) {
            const item = {
                id: bookId,
                quantity: 1,
                price: bookPrice
            }
            cartVar().items = [item, ...itemsInCart];

            setCartOpen(!cartOpen)
        } else {
            increaseQuantity(bookInCart[0], bookQuantity)
        }

    }




      const removeItemFromCart = cartItem => {

        const { items } = cartVar()
        const bookInCart = items[items.indexOf(cartItem)]

        cartVar().items = items.filter(item => bookInCart.id !== item.id)
        cartVar({ ...cartVar() })

       // console.log(bookInCart)
      }

    const toggleCart = () => {
        setCartOpen(!cartOpen)
    }


      const noOfCartItems = () => {
        const { items } = cartVar()

        const sum = items.reduce((sum, item) => {
          return (sum += item.quantity)
        }, 0)

        return sum
      }
      return (
        <CartContext.Provider value={{toggleCart, cartOpen, noOfCartItems, getBook, addItemToCart, increaseQuantity, decreaseQuantity, removeItemFromCart}}>
            {props.children}
        </CartContext.Provider>
    )
}

export const CartContext = createContext();

export default CartContextProvider;



