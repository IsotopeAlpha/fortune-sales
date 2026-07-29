import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link } from "react-router-dom";

const Product = ({ product, onAddToCart }) => {
  const [viewQuantity, setViewQuantity] = useState(false);
  const [quantity, setQuantity] = useState(product?.quantity || 1);

  const updateQuantity = (value) => {
    if (value < 1) return;
    setQuantity(value);
  };

  return (
    <div className="max-w-[40vw] overflow-hidden rounded-2xl bg-transparent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 shadow-lg hover:shadow-black/20">
      <Link to="/product" state={{ product }}>
        <div className="relative w-full h-40 sm:h-50 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
          <img
            src={
              product?.imageUrl ||
              `https://via.placeholder.com/400x300?text=${encodeURIComponent(
                product?.name || "Product",
              )}`
            }
            alt={product?.name}
            className="w-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-3 right-3 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold text-white shadow-lg">
            GH¢{product?.price}
          </div>
        </div>
      </Link>
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-2 line-clamp-2">
            {product?.name}
          </h3>
        </div>

        <div className="flex gap-2 items-center justify-between">
          <button
            onClick={() => setViewQuantity((prev) => !prev)}
            className="flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-semibold text-white transition duration-200 hover:from-emerald-500 hover:to-emerald-700 hover:shadow-lg  shadow-md"
          >
            {viewQuantity ? "Hide" : "+ Add"} Cart
            {viewQuantity ? (
              <BiChevronUp className="text-base" />
            ) : (
              <BiChevronDown className="text-base" />
            )}
          </button>
        </div>

        {viewQuantity && (
          <div className="space-y-1 border-t border-slate-200 pt-4">
            <div className="w-[90wv] flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3">
              <button
                type="button"
                onClick={() => updateQuantity(quantity - 1)}
                className="h-9 w-9 rounded-lg bg-slate-200 text-slate-700 font-bold shadow-sm transition hover:bg-slate-300"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value, 10);
                  if (!Number.isNaN(newQuantity) && newQuantity > 0) {
                    setQuantity(newQuantity);
                  }
                }}
                className="sm:w-16 w-6 bg-transparent text-center text-lg font-bold text-slate-900 outline-none"
              />
              <button
                type="button"
                onClick={() => updateQuantity(quantity + 1)}
                className="h-9 w-9 rounded-lg bg-slate-200 text-slate-700 font-bold shadow-sm transition hover:bg-slate-300"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                onAddToCart({ ...product, quantity });
                setViewQuantity(false);
                console.log(product, quantity);
              }}
              className="w-full rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-600"
            >
              Add {quantity} to cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
