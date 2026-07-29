import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location?.state?.product || {
    id: "FORT-1023",
    name: "Fortune Pro Water Bottle",
    category: "Fitness Accessories",
    price: 24.99,
    rating: 4.8,
    inventory: 120,
    description:
      "A durable insulated water bottle with a leak-proof lid, designed to keep drinks cold for 24 hours and hot for 12 hours. Ideal for workouts, office, and outdoor adventures.",
    image:
      "https://images.unsplash.com/photo-1517971071642-34a2c6a5d158?auto=format&fit=crop&w=900&q=80",
    features: [
      "18/8 stainless steel",
      "Double-wall vacuum insulation",
      "Non-slip base",
      "BPA-free materials",
    ],
  };
  

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-800 text-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-3 rounded-2xl border border-slate-700 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-950/40 transition duration-200 hover:translate-x-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sky-300 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M12.79 16.29a1 1 0 0 1-1.42 1.42l-6-6a1 1 0 0 1 0-1.42l6-6a1 1 0 1 1 1.42 1.42L8.41 10l4.38 4.29z" clipRule="evenodd" />
              </svg>
            </span>
            Back to products
          </button>
          <div className="text-sm text-slate-400">Product ID: <span className="font-medium text-slate-100">{product?.id}</span></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section className="rounded-2xl bg-slate-800 p-6 shadow-md ring-1 ring-slate-700 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-inner lg:flex-1">
                  <img
                    src={product?.imageUrl || product?.image}
                    alt={product?.name}
                    className="h-80 w-full object-cover sm:h-96"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
                      {product?.name}
                    </h1>

                    <p className="mt-2 text-sm uppercase tracking-wider text-sky-400">{product?.category}</p>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-amber-600/20 px-2 py-1 text-sm font-semibold text-amber-300">{product?.rating}★</span>
                        <span className="text-sm text-slate-400">{product?.status} in stock</span>
                      </div>
                    </div>

                    <p className="mt-4 text-base leading-7 text-slate-300">{product?.description}</p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {(product?.features || []).map((f, i) => (
                        <li key={i} className="rounded-full bg-slate-700 px-3 py-1 text-sm text-slate-200">{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-slate-800 p-6 shadow-md ring-1 ring-slate-700">
              <p className="text-sm font-medium text-slate-400">Price</p>
              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <p className="text-3xl font-extrabold text-slate-100">GH¢ {product?.price}</p>
                  <p className="text-sm text-slate-400">Taxes and shipping calculated at checkout</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="rounded-xl border border-transparent bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-200 hover:scale-[1.01] hover:drop-shadow-xl">
                  Buy now
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-800 p-6 shadow-sm ring-1 ring-slate-700">
              <h3 className="text-xl font-medium text-slate-100">Details</h3>
              <div className="mt-3 text-sm text-slate-300">
                <p><span className="font-medium text-slate-100">Category:</span> {product?.category}</p>
                <p className="mt-2"><span className="font-medium text-slate-100">Availability:</span> {product?.status}</p>
                </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
