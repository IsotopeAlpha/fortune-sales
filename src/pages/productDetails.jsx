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
  console.log("Product details:", product); // Log the product details to the console

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        >
          ← Back to products
        </button>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="overflow-hidden rounded-3xl bg-slate-50 shadow-inner lg:flex-1">
                <img
                  src={product?.imageUrl || product?.image}
                  alt={product?.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    {product?.name}
                  </h1>
                  
                  <p className="text-sm uppercase tracking-[0.24em] text-sky-600">
                    {product?.category} Category
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {product?.description}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm font-medium text-slate-500">Price</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">
                      {formattedPrice}
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>

            
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
