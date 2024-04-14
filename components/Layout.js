// Layout.js
import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '@/utils/Store';

export default function Layout({ children }) {
  const { state } = useContext(Store);
  const { cart } = state;

  // Calculate total quantity of items in the cart
  const totalItemsInCart = cart.cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="layout">
        <header className="header">
          <nav className="nav">
            <ul className="nav-links flex justify-between items-center">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/cart">Cart {totalItemsInCart > 0 && <span className='ml-1 rounded-full bg-red-600 py-1 font-bold text-white'>{totalItemsInCart}</span>}</Link>
              </li>
              <li>
                <Link href="/login">Log In</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">
          <p>© Jari Essentials</p>
        </footer>
      </div>
    </>
  );
}
