import React from 'react';

const Product = ({ product, onAddToCart }) => {
    return (
        <div className="bg-green-500 hover:bg-[#f0f0f0] p-4 rounded-md hover:shadow-lg shadow-md m-4 w-[40%] sm:w-[30%]">
            <img src={`https://via.placeholder.com/150?text=${product.image}`} alt={product.name} className="w-full h-8 object-cover mb-2" />
            <h3 className="text-lg text-black font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">Price: ${product.price}</p>
            <button
                onClick={() => onAddToCart(product)}
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default Product;
