import React, { useEffect, useState } from "react";

const FetchAPI = () => {
  const [productsdata, setProductsData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  async function getProducts() {
    let resp = await fetch("https://fakestoreapi.com/products");
    let data = await resp.json();
    console.log(data);
    setProductsData(data);
  }
  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = productsdata?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="flex items-center justify-between p-4 bg-blue-300">
        <h1 className="font-bold text-xl sm:text-2xl">
          Fetching products from API
        </h1>

        <input
          type="text"
          placeholder="Search product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 mx-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </header>

      <section className="p-3 bg-gray-100 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {productsdata === null ? (
          <div className="flex justify-center items-center col-span-full py-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts?.length === 0 ? (
          <p className="text-center col-span-full">
            No matching products found.
          </p>
        ) : (
          filteredProducts.map((singleproduct) => {
            let { id, brand, category, description, image, price, title } =
              singleproduct;

            return (
              <div key={id} className="bg-white my-2 p-3 rounded shadow">
                <img src={image} alt="" height={100} width={100} />
                <h2 className="font-bold">{title}</h2>
                <p className="font-light">{description.slice(0, 50)}....</p>
                <p className="font-light">Brand: {brand}</p>
                <h3 className="font-light">Price: Rs.{price}</h3>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};
export default FetchAPI;
