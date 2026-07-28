import React from 'react';
import Product from './Product';

const ProductList = ({ products, onAddToCart }) => {
    return (
        <div className="w-full sm:max-h-[80vh] max-h-[80vh] flex flex-wrap grid grid-cols-1 sm:grid-cols-2 overflow-y-auto gap-4 p-2 sm:p-6 bg-black rounded-3xl shadow-lg ring-1 ring-slate-500 no-scrollbar justify-center transition-transform duration-300 hover:-translate-y-1">
            {products.map((product) => (
                <Product key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductList;