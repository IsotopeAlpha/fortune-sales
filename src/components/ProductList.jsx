import React from 'react';
import Product from './Product';

const ProductList = ({ products, onAddToCart }) => {
    return (
        <div className="w-full max-h-[70vh] flex flex-wrap grid grid-cols-2 sm:grid-cols-4 overflow-y-auto gap-4 p-2 sm:p-6 no-scrollbar justify-center transition-transform duration-300 hover:-translate-y-1">
            {products.map((product) => (
                <Product key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductList;