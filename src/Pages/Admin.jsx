import { useState, useEffect } from "react";
import { PlusCircle, ShoppingCart } from "lucide-react";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("addProduct");
  const [formData, setFormData] = useState({
    productName: "",
    categories: [],
    size: "",
    regularPrice: "",
    productID: "",
    price: "",
    description: "",
    photo: null,
  });
  const [error, setError] = useState("");
  const [orders] = useState([]); // Empty, no mock data

  // Simulate loading (replace with auth check later)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // 2s mock delay
    return () => clearTimeout(timer);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1 * 1024 * 1024) {
      setError("Photo must be under 1MB");
      return;
    }
    if (file && !file.type.startsWith("image/")) {
      setError("Only image files are allowed (JPG, PNG, WebP)");
      return;
    }
    setFormData({ ...formData, photo: file });
    setError("");
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, categories: selected });
  };

  // Handle form submission (mock, replace with Firebase later)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.productName ||
      !formData.categories.length ||
      !formData.size ||
      !formData.regularPrice ||
      !formData.productID ||
      !formData.price ||
      !formData.description ||
      !formData.photo
    ) {
      setError("All fields are required");
      return;
    }
    // Mock success
    setFormData({
      productName: "",
      categories: [],
      size: "",
      regularPrice: "",
      productID: "",
      price: "",
      description: "",
      photo: null,
    });
    setError("");
    alert("Product added successfully! (UI-only)");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div
          className="flex flex-col items-center space-y-4 animate-fadeIn"
          aria-live="polite"
          aria-label="Loading admin panel"
        >
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-4 border-maroon border-b-transparent rounded-full animate-spin-slow"></div>
          </div>
          <p className="text-orange-600 text-12px font-bold">
            Loading Admin Panel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-12 font-inter">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 text-center mb-12">
          Admin Panel
        </h1>

        {/* Tabs */}
        <div className="flex border-b border-orange-600/20 mb-8 sm:flex-row flex-col">
          <button
            className={`flex-1 py-3 px-4 text-base font-bold text-center transition-colors ${
              activeTab === "addProduct"
                ? "bg-orange-600 text-white"
                : "bg-white text-orange-600 hover:bg-orange-600/10"
            }`}
            onClick={() => setActiveTab("addProduct")}
            aria-label="Add Product Tab"
          >
            <PlusCircle className="inline h-5 w-5 mr-2" />
            Add Product
          </button>
          <button
            className={`flex-1 py-3 px-4 text-base font-bold text-center transition-colors ${
              activeTab === "orders"
                ? "bg-orange-600 text-white"
                : "bg-white text-orange-600 hover:bg-orange-600/10"
            }`}
            onClick={() => setActiveTab("orders")}
            aria-label="Customer Orders Tab"
          >
            <ShoppingCart className="inline h-5 w-5 mr-2" />
            Customer Orders
          </button>
        </div>

        {/* Add Product Tab */}
        {activeTab === "addProduct" && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-orange-600/20 shadow-md shadow-gray-500">
            <h2 className="text-2xl font-bold text-orange-600 mb-6">Add New Product</h2>
            {error && <p className="text-maroon text-12px mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="productName" className="block text-gray-800 text-12px font-medium mb-1">
                  Product Name
                </label>
                <input
                  id="productName"
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-12px text-gray-800 focus:outline-none focus:border-orange-600"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="categories" className="block text-gray-800 text-12px font-medium mb-1">
                  Categories (Hold Ctrl/Cmd to select multiple)
                </label>
                <select
                  id="categories"
                  multiple
                  name="categories"
                  value={formData.categories}
                  onChange={handleCategoryChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-12px text-gray-800 focus:outline-none focus:border-orange-600"
                  required
                  aria-required="true"
                >
                  <option value="Cream & Moisturizers">Cream & Moisturizers</option>
                  <option value="Essence">Essence</option>
                  <option value="Eye Care">Eye Care</option>
                  <option value="Face Mask">Face Mask</option>
                  <option value="Face Primer">Face Primer</option>
                  <option value="Facewash & Cleanser">Facewash & Cleanser</option>
                  <option value="Fragrance">Fragrance</option>
                  <option value="Hair Care">Hair Care</option>
                  <option value="Lip Care">Lip Care</option>
                  <option value="Lotion">Lotion</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Makeup Remover">Makeup Remover</option>
                  <option value="Non Pharma">Non Pharma</option>
                  <option value="Serum">Serum</option>
                  <option value="Sunscreen">Sunscreen</option>
                  <option value="Toner">Toner</option>
                  <option value="Tools & Accessories">Tools & Accessories</option>
                </select>
              </div>
              <div>
                <label htmlFor="size" className="block text-gray-800 text-12px font-medium mb-1">
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-12px text-gray-800 focus:outline-none focus:border-orange-600"
                  required
                  aria-required="true"
                >
                  <option value="">Select Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div>
                <label htmlFor="regularPrice" className="block text-gray-800 text-12px font-medium mb-1">
                  Regular Price
                </label>
                <input
                  id="regularPrice"
                  type="number"
                  name="regularPrice"
                  value={formData.regularPrice}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-12px text-maroon focus:outline-none focus:border-orange-600"
                  required
                  min="0"
                  step="0.01"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="productID" className="block text-gray-800 text-12px font-medium mb-1">
                  Product ID
                </label>
                <input
                  id="productID"
                  type="text"
                  name="productID"
                  value={formData.productID}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-12px text-gray-800 focus:outline-none focus:border-orange-600"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-800 text-12px font-medium mb-1">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-12px text-maroon focus:outline-none focus:border-orange-600"
                  required
                  min="0"
                  step="0.01"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-800 text-12px font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-12px text-gray-800 focus:outline-none focus:border-orange-600"
                  rows="4"
                  required
                  aria-required="true"
                ></textarea>
              </div>
              <div>
                <label htmlFor="photo" className="block text-gray-800 text-12px font-medium mb-1">
                  Photo (Max 1MB, JPG/PNG/WebP)
                </label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-12px text-gray-800 focus:outline-none focus:border-orange-600"
                  required
                  aria-required="true"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 px-6 rounded-lg font-bold text-base transition-colors duration-200 shadow-md hover:shadow-orange-600/40"
                aria-label="Add Product"
              >
                Add Product
              </button>
            </form>
          </section>
        )}

        {/* Customer Orders Tab */}
        {activeTab === "orders" && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-orange-600/20 shadow-md shadow-gray-500">
            <h2 className="text-2xl font-bold text-orange-600 mb-6">Customer Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-800 text-12px justifiedCenter">No orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-12px text-gray-800">
                  <thead>
                    <tr className="border-b border-orange-600/20">
                      <th className="py-3 px-4 font-bold text-orange-600">Order ID</th>
                      <th className="py-3 px-4 font-bold text-orange-600">Customer</th>
                      <th className="py-3 px-4 font-bold text-orange-600">Products</th>
                      <th className="py-3 px-4 font-bold text-orange-600">Total</th>
                      <th className="py-3 px-4 font-bold text-orange-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.customerName}</td>
                        <td className="py-3 px-4">
                          {order.products?.map((p) => p.productName).join(", ")}
                        </td>
                        <td className="py-3 px-4 text-maroon">
                          <span className="text-maroon">{order.total}</span>
                        </td>
                        <td className="py-3 px-4">{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Admin;