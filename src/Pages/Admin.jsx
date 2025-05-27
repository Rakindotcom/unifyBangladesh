import { useState, useEffect } from "react";
import { PlusCircle, ShoppingCart } from "lucide-react";
import { db } from "../firebase";
import {setDoc ,doc} from "firebase/firestore";
import axios from "axios";

import { collection, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {  motion, AnimatePresence } from "framer-motion";

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    let q = query(collection(db, "orders"));
    
    // Add status filter
    if (selectedStatus !== "all") {
      q = query(q, where("status", "==", selectedStatus));
    }
    
    // Add date range filter
    if (startDate && endDate) {
      q = query(q,
        where("createdAt", ">=", startDate),
        where("createdAt", "<=", endDate)
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [selectedStatus, startDate, endDate]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };

  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 border border-orange-600/20 shadow-md shadow-gray-500">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">Customer Orders</h2>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label>Status:</label>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded p-1"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <label>From:</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            className="border rounded p-1"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <label>To:</label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            className="border rounded p-1"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-gray-800 text-center">No orders found.</p>
        ) : (
          orders.map(order => (
            <div 
              key={order.id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div>
                  <h3 className="font-semibold">{order.user.name}</h3>
                  <p className="text-sm text-gray-600">{order.user.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <span className="font-bold">৳{order.total}</span>
                </div>
              </div>

              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Delivery Info</h4>
                        <p>Address: {order.user.address}</p>
                        <p>Phone: {order.user.phone}</p>
                        <p>Location: {order.deliveryLocation}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Order Details</h4>
                        <p>Date: {order.createdAt?.toLocaleDateString()}</p>
                        <p>Subtotal: ৳{order.subtotal}</p>
                        <p>Delivery: ৳{order.deliveryCharge}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Items</h4>
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex gap-4">
                            <img 
                              src={item.photoUrl} 
                              alt={item.productName}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p>{item.productName}</p>
                              <p className="text-sm">Size: {item.size}</p>
                              <p className="text-sm">Quantity: {item.quantity}</p>
                              <p className="text-sm">Price: ৳{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="border rounded p-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </section>
  );
};


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

  // Simulate loading (replace with auth check later)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      setError("Photo must be under 1MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed (JPG, PNG, WebP)");
      return;
    }
    setFormData({ ...formData, photo: file });
    setError("");
  };

  const handleCategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, categories: selected });
  };

  const handleSubmit = async (e) => {
    console.log("Form submitted with data:", formData);
    e.preventDefault();
    setError("");
    console.log("Submitting form...");
    // Validate all fields
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
      console.log("Validation failed: All fields are required");
      setError("All fields are required");
      return;
    }

    console.log("All fields are valid, proceeding with submission...");

    try {
      // Check for existing product ID
      // const productsRef = await collection(db, "products");
      // const q = await query(productsRef, where("productID", "==", formData.productID));
      // const querySnapshot = await getDocs(q);
      
      // if (!querySnapshot.empty) {
      //    console.log("Product ID already exists:", formData.productID);
      //   throw new Error("Product ID already exists. Please use a unique ID.");
      // }

      // console.log("Product ID is unique, proceeding to add product...");

      // // Upload image to Firebase Storage
      // const storageRef = ref(
      //   storage,
      //   `products/${formData.productID}/${formData.photo.name}`
      // );
      // const uploadTask = await uploadBytes(storageRef, formData.photo);
      // const photoURL = await getDownloadURL(uploadTask.ref);

      // Create product data object
      const imageFormData = new FormData();
      imageFormData.append("file", formData.photo);
      imageFormData.append("upload_preset", "unify-bangladesh");
      const res = await axios.post("https://api.cloudinary.com/v1_1/djx4fqoay/image/upload", imageFormData);
      const imageUrl = res.data.secure_url;

      const productData = {
        productName: formData.productName,
        categories: formData.categories,
        size: formData.size,
        regularPrice: parseFloat(formData.regularPrice),
        productID: formData.productID,
        price: parseFloat(formData.price),
        description: formData.description,
        photoUrl: imageUrl,
        createdAt: new Date(),
      };

      // Add to Firestore
      // Create document reference
      const docRef = doc(db, "products", formData.productID);

// Add to Firestore
      await setDoc(docRef, productData);
      console.log("Product added successfully:", productData);
      setFormData({
        productName: "",
        categories: [],
        size: "",
        regularPrice: "",
        productID: "",
        price: "",
        description: "",
        photoUrl: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      });
      
      // Clear file input
     // fileInputRef.current.value = "";
      alert("Product added successfully!");
    } catch (err) {
      setError(err.message || "Failed to add product. Please try again.");
      console.error("Error adding product:", err);
    }
  };

  // Loading and remaining JSX remains the same as original
  // ... (keep all the existing JSX code below this point)`

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
        {activeTab === "orders" && <OrdersTab />}
      </div>
    </div>
  );
};

export default Admin;