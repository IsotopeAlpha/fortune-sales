import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegCircleDot } from "react-icons/fa6";
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";
import BackGround from "../assets/background.jpeg";
import { RiUserCommunityFill } from "react-icons/ri";
import { CgLogOff } from "react-icons/cg";
import { AiOutlineWhatsApp, AiOutlineArrowUp, AiOutlineMail } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getProducts = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}products`,
    );
    const fetchedProducts = response.data.data;
    setProducts(fetchedProducts || []);

    const categorySet = new Set(["All"]);
    (fetchedProducts || []).forEach((product) => {
      const category =
        product?.category ||
        product?.category?.name ||
        product?.category?.title;
      if (category) {
        categorySet.add(category);
      }
    });
    setCategories(Array.from(categorySet));
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + Number(item?.price || 0),
      0,
    );
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

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => {
          const category =
            product?.category ||
            product?.category?.name ||
            product?.category?.title;
          return category === selectedCategory;
        });

  return products === null ? (
    <main className="min-h-screen min-w-screen bg-[#e3e1dc] flex items-center justify-center px-6 py-10 text-white">
      <div className="flex flex-col items-center justify-center gap-8 rounded-[2rem] border border-white/10 bg-white/10 p-10">
        <FaRegCircleDot
          className="animate-ping text-slate-900/80"
          size={80}
          thickness={4}
        />
        <p className="text-3xl font-semibold text-slate-900/80">Loading...</p>
      </div>
    </main>
  ) : (
    <main
      id="top"
      className="relative min-h-screen max-w-screen bg-[#e3e1dc] text-slate-50"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${BackGround})` }}
      />
      <div className="relative max-w-screen z-10 mx-auto px-4 py-6 sm:px-6 sm:py-8  overflow-auto">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-purple-500">
                <img src="/logo.PNG" alt="Gem Logo" className="h-10 w-10" />
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                  Gem Basics
                </h1>
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Modern shopping with a polished layout. Browse products, add
                them to your cart, and checkout with confidence.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3"></div>
          </div>
        </header>

        <div className="w-full rounded-[2rem] p-2 ">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-black sm:text-3xl">
                  Featured products
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  Select the best items curated just for you and add them to
                  your cart with one click.
                </p>
              </div>
              <div className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm text-black/80 shadow-sm shadow-black/10 backdrop-blur-sm">
                {products.length} items available
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    selectedCategory === category
                      ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white"
                      : "bg-gradient-to-br from-slate-900 to-violet-950/90 text-violet-200 hover:bg-violet-500/25"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        <footer className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/80 px-6 py-8 text-slate-300 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
                  Gem Basics
                </p>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  Built for effortless browsing and checkout, powered by modern
                  design and fast service.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-flow-col sm:auto-cols-max">
                <a
                  href="#top"
                  className="text-sm text-white transition hover:text-emerald-300"
                >
                  <AiOutlineArrowUp size={16} className="mr-2 inline" />
                  Back to top
                </a>
                <a
                  href="mailto:support@gembasics.com"
                  className="text-sm text-white transition hover:text-emerald-300"
                >
                  <AiOutlineMail size={16} className="mr-2 inline" />
                  Support
                </a>
                <a
                  href="https://www.facebook.com/gembasics"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white transition hover:text-emerald-300"
                >
                  <FaFacebookF size={16} className="mr-2 inline" />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/gembasics"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white transition hover:text-emerald-300"
                >
                  <FaInstagram size={16} className="mr-2 inline" />
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@gembasics"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white transition hover:text-emerald-300"
                >
                  <SiTiktok size={16} className="mr-2 inline" />
                  TikTok
                </a>
                <a
                  href="https://wa.me/233540222972"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white transition hover:text-emerald-300"
                >
                  <AiOutlineWhatsApp size={16} className="mr-2 inline" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 text-sm text-slate-500">
              © {new Date().getFullYear()} Gem Basics. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
      <div className="fixed bottom-20  right-0 z-40 flex items-center justify-center px-4 py-6  sm:px-6">
        <Cart
          className="rounded-full bg-white/10 p-3 text-white shadow-2xl shadow-black/20 transition hover:bg-white/15"
          cart={cart}
          removeItem={removeItem}
          total={total}
          color="white"
        />
      </div>

      <a
        href="https://wa.me/233540222972?text=Hello%2C%20I%20would%20like%20to%20chat%20about%20a%20product."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-black/30 transition hover:bg-emerald-600"
        aria-label="Chat on WhatsApp"
      >
        <AiOutlineWhatsApp
          size={28}
          color="white"
          style={{ animation: "whatsapp-scale 1.5s ease-in-out infinite" }}
        />
      </a>
      <style>{`
        @keyframes whatsapp-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </main>
  );
}
