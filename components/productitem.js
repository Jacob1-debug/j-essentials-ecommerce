import React from 'react';
import Link from 'next/link';

export default function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} layout="fill" className="rounded shadow" />
      </Link>
      <div className="product-info grid place-items-center"> {/* Grid with centered content */}
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg"> {product.name}</h2>
        </Link>
        <p className="mb-2"> {product.price}</p>
        <button className="primary-button bg-#d7b88c">Add to Cart</button>
      </div>
    </div>
  );
}
