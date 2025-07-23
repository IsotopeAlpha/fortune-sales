import { useState } from "react";
import { BiCart, BiTrash } from "react-icons/bi";

const Cart = ({ cart, removeItem, total }) => {
  const [viewCart, setViewCart] = useState(false);
  

  return (
    <>
      {viewCart ? (
        <div className="absolute sm:relative left-0 bottom-0 bg-white text-black p-4 rounded-md w-screen h-screen sm:h-[50vh] mb-4 overflow-y-auto">
          {cart.length > 0 ? (
            <>
              {" "}
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Product</th>
                    <th className="text-left p-2">Price</th>
                  </tr>
                </thead>
                <tbody className=" h-screen pb-[30%] overflow-auto ">
                  
                  {cart.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">GH¢ {item.price}</td>
                      <td>
                        <BiTrash
                          className="cursor-pointer text-red-500"
                          onClick={() => {
                            removeItem(index);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total:</td>
                    <td>GH¢ {total}</td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <div className="flex justify-center cart-center">
              No item in cart
            </div>
          )}
          <div className="w-full flex justify-between cart-center mb-4">
            <button
              onClick={() => setViewCart(false)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close Cart
            </button>
            {cart.length > 0 && (
              <button
                onClick={() => setViewCart(false)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="relative cursor-pointer"
          onClick={() => setViewCart(!viewCart)}
        >
          <BiCart size={40} color="#000000" />
          <div className="absolute top-0 right-0 bg-[#f0f0f0] text-white text-xs font-bold rounded-full w-5 h-5 flex cart-center justify-center shadow-md">
            <span className="text-black font-bold">{cart.length}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
