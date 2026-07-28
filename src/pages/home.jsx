import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegCircleDot } from "react-icons/fa6";
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";
import BackGround from "../assets/background.jpeg";
import { RiUserCommunityFill } from "react-icons/ri";
import { CgLogOff } from "react-icons/cg";

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}products`);
    setProducts(response.data.data);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => {
    const totalPrice = cart.reduce((sum, item) => sum + Number(item?.price || 0), 0);
    setTotal(totalPrice);
  };

  useEffect(() => {
    if (products === null) {
      getProducts();
    }
  }, [products]);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return products === null ? (
    <main className="min-h-screen min-w-screen bg-gradient-to-br from-violet-900 via-purple-800 to-slate-950 flex items-center justify-center px-6 py-10 text-white">
      <div className="flex flex-col items-center justify-center gap-8 rounded-[2rem] border border-white/10 bg-white/10 p-10 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <FaRegCircleDot className="animate-ping text-white" size={80} thickness={4} />
        <p className="text-3xl font-semibold">Loading...</p>
      </div>
    </main>
  ) : (
    <main className="relative min-h-screen max-w-screen bg-slate-950 text-slate-50">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${BackGround})` }}
      />
      <div className="relative max-w-screen z-10 mx-auto px-4 py-6 sm:px-6 sm:py-8  overflow-auto">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">Gem</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Modern shopping with a polished layout. Browse products, add them to your cart, and checkout with confidence.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Cart
                className="rounded-3xl bg-white/10 p-3 text-whiteshadow-lg shadow-black/20 transition hover:bg-white/15"
                cart={cart}
                removeItem={removeItem}
                total={total}
                color="white"
              />
              <Link
                to="/profile"
                className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-white transition hover:bg-white/20"
              >
                <RiUserCommunityFill size={24} />
              </Link>
              <Link
                to="/"
                className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-white transition hover:bg-white/20"
              >
                <CgLogOff size={24} />
              </Link>
            </div>
          </div>
        </header>

        <section className="w-full mt-8 grid gap-8 xl:grid-cols-[1.7fr_1fr]">
          <div className="w-full rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Featured products</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Select the best items curated just for you and add them to your cart with one click.
                  </p>
                </div>
                <div className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm text-violet-200">
                  {products.length} items available
                </div>
              </div>
              <ProductList products={products} onAddToCart={handleAddToCart} />
            </div>
          </div>

          <aside className="h-fit rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/90 to-violet-950/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white">Order summary</h2>
              <p className="mt-2 text-sm text-slate-400">Track your cart activity and see your total in real time.</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-[1.75rem] bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Items in cart</p>
                <p className="mt-4 text-5xl font-semibold text-white">{cart.length}</p>
              </div>
              <div className="rounded-[1.75rem] bg-white/5 p-6">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-sm">Total</span>
                  <span className="text-4xl font-semibold text-white">${total}</span>
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-slate-300">
                <p className="text-sm text-slate-400">Pro tip:</p>
                <p className="mt-2 text-sm leading-6">Add more products to see your cart update instantly and unlock a smoother checkout experience.</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
