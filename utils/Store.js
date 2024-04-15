import React, { createContext, useReducer } from 'react';
import Cookie from 'js-cookie';

export const Store = createContext();

const initialState = {
  cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItemIndex = state.cart.cartItems.findIndex((item) => item.slug === newItem.slug);
      if (existItemIndex !== -1) {
        const updatedCartItems = [...state.cart.cartItems];
        updatedCartItems[existItemIndex].quantity += newItem.quantity;
        Cookie.set('cart', JSON.stringify({ ...state.cart, cartItems: updatedCartItems }));
        return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
      } else {
        Cookie.set('cart', JSON.stringify({ ...state.cart, cartItems: [...state.cart.cartItems, newItem] }));
        return { ...state, cart: { ...state.cart, cartItems: [...state.cart.cartItems, newItem] } };
      }
    }
    case 'CART_REMOVE_ITEM': {
      const updatedCartItems = state.cart.cartItems.filter((item) => item.slug !== action.payload.slug);
      Cookie.set('cart', JSON.stringify({ ...state.cart, cartItems: updatedCartItems }));
      return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
    }
    case 'CART_INCREASE_QUANTITY': {
      const updatedCartItems = state.cart.cartItems.map((cartItem) =>
        cartItem.slug === action.payload.slug ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      Cookie.set('cart', JSON.stringify({ ...state.cart, cartItems: updatedCartItems }));
      return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
    }
    case 'CART_DECREASE_QUANTITY': {
      const updatedCartItems = state.cart.cartItems.map((cartItem) =>
        cartItem.slug === action.payload.slug ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
      Cookie.set('cart', JSON.stringify({ ...state.cart, cartItems: updatedCartItems }));
      return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
    }
    // Add other cases as needed
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function ProvideStore({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}