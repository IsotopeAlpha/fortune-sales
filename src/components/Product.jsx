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
    <div className="max-w-full p-5 m-4 bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 transition-transform duration-300 hover:-translate-y-1">
      <div className="w-full items-center justify-center overflow-hidden rounded-3xl bg-slate-100">
        <img
          src={
            product?.imageUrl ||
            `https://via.placeholder.com/400x300?text=${encodeURIComponent(
              product?.name || "Product"
            )}`
          }
          alt={product?.name}
          className="w-fit h-32 object-cover items-center justify-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{product?.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {product?.description || "Fresh, high-quality produce ready for your cart."}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
            GH¢{product?.price}
          </span>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3">
          <Link
            to="/product"
            state={{ product }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Details <BiChevronDown className="text-base" />
          </Link>

          <button
            onClick={() => setViewQuantity((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-300 px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-purple-700"
          >
            {viewQuantity ? "Hide" : "+ Add"} Cart
            {viewQuantity ? <BiChevronUp className="text-base" /> : <BiChevronDown className="text-base" />}
          </button>
        </div>

        <div className={`${viewQuantity ? "block" : "hidden"} space-y-3`}>
          <div className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2">
            <button
              type="button"
              onClick={() => updateQuantity(quantity - 1)}
              className="h-10 w-10 rounded-2xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              -
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
              className="w-20 bg-transparent text-center text-lg font-semibold text-slate-900 outline-none"
            />
            <button
              type="button"
              onClick={() => updateQuantity(quantity + 1)}
              className="h-10 w-10 rounded-2xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
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
            className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-purple-700"
          >
            Add {quantity} to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
