import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const removeItem = (index) => {
      setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
    };

  useEffect(() => {
    const calculateTotal = () => {
      let totalPrice = 0;
      for (let i = 0; i < cart.length; i++) {
        totalPrice = totalPrice + cart[i].price;
      }
      setTotal(totalPrice);
    };
    calculateTotal();
  }, [total, cart]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="w-[100vw] mx-auto bg-[#707070] min-h-screen sm:pt-[10%]">
      <div className="w-[100vw] h-[10%] absolute bottom-0 sm:top-0 fixed flex justify-between items-center bg-white p-4 shadow-md shadow-black">
        <h3 className="md:text-2xl font-bold text-black p-2">
          Fortune Sales
        </h3>
        <Cart cart={cart} removeItem={()=>removeItem()} total={total}/>
      </div>
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
