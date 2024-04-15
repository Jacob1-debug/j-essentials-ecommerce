// Slug.js
import React, { useContext } from 'react';
import Layout from '@/components/Layout';
import products from '@/utils/data';
import { useRouter } from 'next/router';
import { Store } from '@/utils/Store';
import ProductItem from '@/components/productitem';

export default function ProductScreen() {
  const router = useRouter();
  const { slug } = router.query;
  const product = products.find((x) => x.slug === slug);
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);

    if (existItem) {
      const quantity = existItem.quantity + 1;
      if (product.countInStock < quantity) {
        alert('Sorry, product is out of stock');
        return;
      }
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...existItem, quantity },
      });
    } else {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity: 1 },
      });
    }
  };

  const removeFromCartHandler = () => {
    dispatch({
      type: 'CART_REMOVE_ITEM',
      payload: product,
    });
  };

  const increaseQuantityHandler = () => {
    if (product.countInStock > 0) {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity: product.quantity + 1 },
      });
    } else {
      alert('Sorry, product is out of stock');
    }
  };

  const decreaseQuantityHandler = () => {
    if (product.quantity > 1) {
      dispatch({
        type: 'CART_REMOVE_ITEM',
        payload: product,
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Render a loading message if product is undefined
  }

  return (
    <Layout title={product.name}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img src={product.image} alt={product.name} className="w-full h-auto" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-gray-600 mb-2">Price: ${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-2">Rating: {product.rating}</p>
              <p className="text-gray-600 mb-2">Number of Reviews: {product.numReviews}</p>
              <p className="text-gray-600 mb-2">Description: {product.description}</p>
              <button className="primary-button px-4 py-2 rounded-md" onClick={addToCartHandler}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
