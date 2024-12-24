import { useState, useEffect } from "react";
import PageTitle from "../../components/base/PageTitle.jsx";
import ShoppingCartIcon from "../../components/icons/ShoppingCartIcon.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/base/Pagination.jsx";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const axiosClientWithoutAuth = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  });

  // Fetch products from the API
  const fetchProducts = async (url = "/marketplace", searchKeyword = "") => {
    setLoading(true);
    try {
      const response = await axiosClientWithoutAuth.get(url, {
        params: {
          search: searchKeyword,
          minPrice: priceRange.min || undefined,
          maxPrice: priceRange.max || undefined,
        },
      });
      console.log("Marketplace Data: ", response);
      setProducts(response.data.records);
      setMeta(response.data.meta);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Calculate total items in cart
  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  //This method is for the pagination.
  const handlePageChange = (url) => {
    fetchProducts(url);
  };

  return (
    <div className="w-full max-w-[1024px] mx-auto mb-10">
      <div className="w-full text-end my-4 mb-8">
        <Link
          to={"/login"}
          className="text-blue-500 hover:border-b border-blue-500 hover:font-bold text-lg"
        >
          Login
        </Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <PageTitle title={"Marketplace"} />
        <div className="relative">
          <ShoppingCartIcon className="h-8 w-8 text-gray-600" />
          {totalItemsInCart > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-sm rounded-full px-2 py-0.5">
              {totalItemsInCart}
            </span>
          )}
        </div>
      </div>

      <form
        className="flex flex-col md:flex-row gap-4 mb-6 w-full"
        onSubmit={handleFilterSubmit}
      >
        <input
          type="text"
          placeholder="Search products by name or SKU"
          value={searchKeyword}
          onChange={handleSearchChange}
          className="p-2 border rounded-md w-full md:w-auto flex-grow"
        />
        <div className="block sm:flex gap-2">
          <input
            type="number"
            placeholder="Min price"
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
            className="p-2 border rounded-md w-full mb-4 sm:mb-0"
          />
          <input
            type="number"
            placeholder="Max price"
            name="max"
            value={priceRange.max}
            onChange={handlePriceChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Filter
        </button>
      </form>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
            >
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">SKU: {product.sku}</p>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
              <p className="text-gray-800 font-bold">Price: ${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="bg-white rounded-lg px-2 pt-2 pb-5 mb-4">
        <Pagination meta={meta} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
