import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
    } else {
      setCart((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, quantity: parseInt(quantity) } : item,
        ),
      );
    }
  };

  const handlePlaceOrder = async(e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Cart is empty. Add items before placing an order.");
      return;
    }
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address || !customerInfo.city || !customerInfo.postalCode ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);

    const data = {
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
      city: customerInfo.city,
      postalCode: customerInfo.postalCode,
      products:cart,
      totalAmount: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    };

     try {
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}orders`, data)
        .then((res) => {
          console.log("Order response:", res.data);

          if (res.data.status === "error") {
            setLoading(false);
            toast.error(res.data.message);
          } else {
            setLoading(false);
            toast.success("Order placed successfully!");
            setCart([]);
            localStorage.removeItem("cart");
            
          } 
        });
    } catch (error) {
      throw error;
    }
    console.log("Order placed:", { customerInfo, cart });
    setCart([]);
    
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen min-w-screen bg-slate-950 text-slate-100 py-10 px-4">
      <ToastContainer />
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center rounded-full border border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition duration-200 hover:from-slate-800 hover:to-slate-900 hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/30"
      >
        ← Back
      </button>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-mxl font-semibold tracking-tight text-slate-100 mb-8">
          Your Order
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-sm">
            <h2 className="text-2xl sm:text-md font-semibold text-slate-100 mb-5">
              Shopping Cart
            </h2>
            {cart.length === 0 ? (
              <p className="rounded-2xl bg-slate-800 px-4 py-6 text-slate-300">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-slate-700 bg-slate-950 p-4 shadow-sm sm:flex sm:items-center sm:justify-between"
                  >
                    <div className="space-y-2 sm:flex-1">
                      <h3 className="text-lg font-medium text-slate-100">
                        {item?.name}
                      </h3>
                      <p className="text-sm text-slate-300">GH¢{item?.price}</p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:w-64">
                      <label
                        className="text-sm font-medium text-slate-300"
                        htmlFor={`qty-GH¢{index}`}
                      >
                        Quantity
                      </label>
                      <input
                        id={`qty-GH¢{index}`}
                        type="number"
                        min="1"
                        value={item?.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(index, e.target.value)
                        }
                        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                      />
                      <p className="text-sm font-medium text-slate-300">
                        Subtotal: GH¢
                        {(item?.price || 0) * (item?.quantity || 0)}
                      </p>
                      <button
                        className="inline-flex justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-red-950/20 transition duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="rounded-3xl bg-slate-800 px-6 py-5 text-white shadow-sm">
                  <h3 className="text-lg font-semibold">
                    Total: GH¢{totalPrice.toFixed(2)}
                  </h3>
                </div>
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-sm">
            <h2 className="text-2xl sm:text-md font-semibold text-slate-100 mb-5">
              Shipping Information
            </h2>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-200"
                  >
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-200"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-slate-200"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-slate-200"
                >
                  Address *
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="text-sm font-medium text-slate-200"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="postalCode"
                    className="text-sm font-medium text-slate-200"
                  >
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    name="postalCode"
                    value={customerInfo.postalCode}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={handlePlaceOrder}
                className="w-full rounded-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 px-6 py-3 text-base font-semibold text-white shadow-2xl shadow-slate-950/20 transition duration-200 hover:from-slate-600 hover:via-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500/40"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
