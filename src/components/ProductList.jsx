import React from 'react';
import Product from './Product';

const ProductList = ({ products, onAddToCart }) => {
    return (
        <div className="w-[100vw] h-[90vh] flex flex-wrap justify-center overflow-y-auto">
            {products.map((product) => (
                <Product key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductList;