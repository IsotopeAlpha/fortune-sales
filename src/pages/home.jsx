import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegCircleDot } from "react-icons/fa6";
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import BackGround from "../assets/background.jpeg";

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}products`).then((res) => {
      setProducts(res.data.data);
    });
  };

  const removeItem = (index) => {
    const newArray = cart.splice(index, 1);

    setCart(newArray);
    console.log(cart);
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice = totalPrice + parseInt(cart[i]?.price);
    }
    setTotal(totalPrice);
  };

  useEffect(() => {
    if (products === null) {
      getProducts();
    }
    if (cart.length > 0 && products !== null) {
      calculateTotal();
    }
  }, [total, cart, products]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return products === null ? (
    <p className="w-[100vw] h-[100vh] bg-purple-500 flex flex-col justify-center items-center">
      <FaRegCircleDot
        className="text-white  animate-ping"
        size={80}
        thickness={4}
      />
      <p className="text-2xl mt-20 text-white">Loading...</p>
    </p>
  ) : (
    <>
      <img src={BackGround} alt="back" className="h-screen blur" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative w-[100vw] mx-auto  min-h-screen sm:pt-[10%]">
          <div className="w-[100vw] h-[8vh] absolute bottom-0 sm:top-0 fixed flex justify-between items-center bg-purple-500 p-4 shadow-lg sm:border-b border-t border-gray-200">
            <h3 className="sm:text-2xl font-bold text-white p-2 animate-pulse">
              Gem
            </h3>
            <p className="flex gap-2 items-center ">
              <Cart
                className="hover:bg-[#ffda73] p-[1rem] rounded-md "
                cart={cart}
                removeItem={() => removeItem()}
                total={total}
              />
              <Link
                to={"/profile"}
                className="hover:bg-[#ffda73] p-[1rem] rounded-md text-white"
              >
                <BiUser
                  size={30}
                  color="#ffffff"
                  className="hover:bg-[#ffda73] p-[1rem] rounded-md "
                />
              </Link>
              <Link
                to={"/"}
                className="hover:bg-[#ffda73] p-[1rem] rounded-md "
              >
                <LuLogOut color="red" size={30} />
              </Link>
            </p>
          </div>
          {products && (
            <ProductList products={products} onAddToCart={handleAddToCart} />
          )}
        </div>
      </div>
    </>
  );
}
