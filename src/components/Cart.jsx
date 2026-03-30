import { useState } from "react";
import { BiCart, BiTrash } from "react-icons/bi";

const Cart = ({ cart, removeItem, total }) => {
  const [viewCart, setViewCart] = useState(false);
  

  return (
    <>
      {viewCart ? (
        <div className="absolute absolute left-0 bottom-0 sm:top-0 bg-purple-500 text-white p-4 rounded-md w-full h-[50vh] p-4 shadow-md transition-transform transform translate-y-0 sm:translate-y-0 overflow-y-auto">
          {cart.length > 0 ? (
            <>
              {" "}
              <table className="w-full">
                <thead>
                  <tr>Products</tr>
                </thead>
                <tbody className="h-[30vh] sm:h-[35vh] overflow-y-auto">
                  
                  {cart.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">
                        <img src={item?.imageUrl} alt={item.name} className="h-[50px] w-[50px] object-cover" />
                      </td>
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
          <div className="w-full h-fit flex justify-between cart-center mb-4">
            <button
              onClick={() => setViewCart(false)}
              className="bg-white text-purple-500 font-bold py-2 px-4 rounded"
            >
              Close Cart
            </button>
            {cart.length > 0 && (
              <button
                onClick={() => setViewCart(false)}
                className="bg-white text-purple-500 font-bold py-2 px-4 rounded"
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="relative cursor-pointer"
          onClick={() => { setViewCart(!viewCart)}}
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
