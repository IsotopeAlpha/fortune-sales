import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import axios from "axios";

const App = () => {
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
    if(products === null) {
      getProducts();
    }
    if(cart.length > 0  && products !== null ){
      calculateTotal();
    }
  }, [total, cart, products]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="relative w-[100vw] mx-auto bg-white min-h-screen sm:pt-[10%]">
      <div className="w-[100vw] h-[10%] absolute bottom-0 sm:top-0 fixed flex justify-between items-center bg-purple-500 p-4 shadow-lg sm:border-b border-t border-gray-200">
        <h3 className="sm:text-2xl font-bold text-white p-2 animate-pulse">Gem</h3>
        <Cart cart={cart} removeItem={() => removeItem()} total={total} />
      </div>
      {products && <ProductList products={products} onAddToCart={handleAddToCart} />}
    </div>
  );
};

export default App;
