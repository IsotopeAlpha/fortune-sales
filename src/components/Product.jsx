import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsCurrencyExchange } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa6";

const Product = ({ product, onAddToCart }) => {
  const [viewMore, setViewMore] = useState(false);

  return (
    <div className=" bg-purple-500  text-white p-2 rounded-md border border-purple-200 m-4 sm:w-fit w-[40vw] h-fit hover:transition-transform hover:scale-105 hover:shadow-lg flex flex-col items-center">
      <img
        src={
          product?.imageUrl ||
          `https://via.placeholder.com/150?text=${product.image}`
        }
        alt={product.name}
        className=" h-[100px]  sm:h-[150px] object-cover mb-2 bg-white rounded-md shadow-md"
      />
      <div className="flex justify-between items-center w-full">
        <h3 className="sm:text-lg font-bold">{product.name}</h3>
        <p
          onClick={() => setViewMore(!viewMore)}
          className="text-white text-sm mb-2 underline cursor-pointer"
        >
          {viewMore ? (
            <p className="flex items-center">
              Collapse <BiChevronUp />
            </p>
          ) : (
            <p className="flex items-center">
              Details <BiChevronDown />
            </p>
          )}
        </p>
      </div>

      <p className="w-full text-left text-black flex items-center font-bold rounded">
        ¢{product.price}
      </p>

      {viewMore && <p className="text-black mb-2">{product.description}</p>}

      <button
        onClick={() => onAddToCart(product)}
        className="bg-white text-purple-500 border-2 border-purple-900 hover:text-purple-700 text-sm font-bold py-1 px-2 rounded shadow-md"
      >
        + Cart
      </button>
    </div>
  );
};

export default Product;
