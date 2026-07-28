import { useState } from "react";
import { BiCart, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const Cart = ({ cart, removeItem }) => {
  const [viewCart, setViewCart] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {viewCart ? (
        <div className="relative fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center rounded-3xl">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <p className="text-sm text-slate-400">
                  {cart.length} item{cart.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => setViewCart(false)}
                className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-slate-600"
              >
                Close
              </button>
            </div>

            {cart.length > 0 ? (
              <div className="space-y-4 p-5">
                <div className="overflow-x-auto rounded-3xl border border-slate-700 bg-slate-950">
                  <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-900">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Subtotal
                        </th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-950">
                      {cart.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item?.imageUrl}
                                alt={item.name}
                                className="h-14 w-14 rounded-2xl object-cover"
                              />
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-slate-500">{item.category ?? ""}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-slate-200">GH¢ {item.price}</td>
                          <td className="px-4 py-4 text-slate-200">{item.quantity}</td>
                          <td className="px-4 py-4 text-slate-200">GH¢ {(item.price * item.quantity)}</td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => removeItem(index)}
                              className="rounded-xl bg-rose-500/10 p-2 text-rose-400 transition hover:bg-rose-500/20"
                            >
                              <BiTrash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-3xl border border-slate-700 bg-slate-800 px-5 py-4 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Order total</p>
                    <p className="mt-1 text-2xl font-semibold">GH¢ {total}</p>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:flex-row">
                    <Link to="/checkout">
                      <button
                        onClick={() => {
                          localStorage.setItem("cart", JSON.stringify(cart));
                          setViewCart(false);
                        }}
                        className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-violet-500/20 transition hover:bg-violet-400"
                      >
                        Place Order
                      </button>
                    </Link>
                    <button
                      onClick={() => setViewCart(false)}
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-800"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 p-10 text-center">
                <div className="text-4xl">🛒</div>
                <h3 className="text-xl font-semibold">Your cart is empty</h3>
                <p className="max-w-sm text-sm text-slate-400">
                  Add products to your cart and come back to review your order.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setViewCart(true)}
          className="relative inline-flex items-center justify-center rounded-full text-purple-500 bg-slate-200 shadow-xl shadow-violet-500/30 transition hover:bg-violet-400"
          aria-label="Open cart"
        >
          <BiCart size={30} />
          <span className="absolute -right-1 -top-1 flex h-6 min-w-[24px] items-center justify-center rounded-full  px-1.5 text-xs font-bold text-purple-500 shadow-sm">
            {cart.length}
          </span>
        </button>
      )}
    </>
  );
};

export default Cart;
