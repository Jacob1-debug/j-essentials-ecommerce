// cart.js
import React, { useContext } from 'react';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';

export default function Cart() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const removeFromCartHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  
  const increaseQuantityHandler = (item) => {
    if (item.quantity < item.countInStock) {
      dispatch({ type: 'CART_INCREASE_QUANTITY', payload: item });
    } else {
      alert('Sorry, product is out of stock');
    }
  };
  
  const decreaseQuantityHandler = (item) => {
    dispatch({ type: 'CART_DECREASE_QUANTITY', payload: item });
  };
  
  const checkoutHandler = () => {
    const totalPrice = cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.cartItems.reduce((total, item) => total + item.quantity, 0);
  
    alert(`Total Price: $${totalPrice.toFixed(2)}\nTotal Items: ${totalItems}`);
  };
  
  

  

  return (
    <Layout title="Shopping Cart">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
        {cart.cartItems.length === 0 ? (
          <div className="text-center">
            <h2>Your cart is empty</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cart.cartItems.map((item) => (
              <div key={item.slug} className="border rounded p-4">
                <img src={item.image} alt={item.name} className="w-full h-auto" />
                <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    onClick={() => decreaseQuantityHandler(item)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <button
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    onClick={() => increaseQuantityHandler(item)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                    onClick={() => removeFromCartHandler(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart.cartItems.length > 0 && (
          <div className="mt-8 flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
              onClick={checkoutHandler}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
