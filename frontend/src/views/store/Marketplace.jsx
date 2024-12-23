import { useState, useEffect } from "react";
import PageTitle from "../../components/base/PageTitle.jsx";
import axiosClient from "../../AxiosClient.js";
import ShoppingCartIcon from "../../components/icons/ShoppingCartIcon.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosClientWithoutAuth = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  });

  // Fetch products from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosClientWithoutAuth.get("/marketplace");
      setProducts(response.data.records);
    } catch (error) {
      console.error("Failed to fetch products:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
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
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Calculate total items in cart
  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full max-w-[1024px] mx-auto">
    <div className="w-full text-end my-4 mb-8">
        <Link to={"/login"} className="text-blue-500 hover:border-b border-blue-500 hover:font-bold text-lg">Login</Link>
    </div>
      <div className="flex justify-between items-center mb-4">
        <PageTitle classes={"text-indigo-500"} title={"Marketplace"} />
        <div className="relative">
          <ShoppingCartIcon className="h-8 w-8 text-gray-600" />
          {totalItemsInCart > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-sm rounded-full px-2 py-0.5">
              {totalItemsInCart}
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
    </div>
  );
}
