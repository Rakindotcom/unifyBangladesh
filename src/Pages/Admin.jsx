import { useState, useEffect } from "react"
import { PlusCircle, ShoppingCart, Upload, Filter, Eye, EyeOff } from "lucide-react"
import { db } from "../firebase"
import { setDoc, doc } from "firebase/firestore"
import axios from "axios"
import { collection, query, where, onSnapshot, updateDoc } from "firebase/firestore"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import "../CSS/admin-style.css"

const OrdersTab = () => {
  const [orders, setOrders] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let q = query(collection(db, "orders"))

    if (selectedStatus !== "all") {
      q = query(q, where("status", "==", selectedStatus))
    }

    if (startDate && endDate) {
      q = query(q, where("createdAt", ">=", startDate), where("createdAt", "<=", endDate))
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }))
      setOrders(ordersData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [selectedStatus, startDate, endDate])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
      })
      toast.success("Order status updated successfully!")
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update order status")
    }
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    confirmed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  }

  if (loading) {
    return (
      <section className="bg-white rounded-xl p-6 border border-orange-200 shadow-sm">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Loading orders...</span>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-xl p-6 border border-orange-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-semibold text-gray-900">Customer Orders</h2>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholderText="Select start date"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholderText="Select end date"
            />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{order.user.name}</h3>
                    <p className="text-sm text-gray-500">{order.user.email}</p>
                    <p className="text-xs text-gray-400">{order.createdAt?.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="font-semibold text-gray-900">৳{order.total}</span>
                  {expandedOrder === order.id ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>

              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Delivery Information</h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="text-gray-500">Address:</span> {order.user.address}
                            </p>
                            <p>
                              <span className="text-gray-500">Phone:</span> {order.user.phone}
                            </p>
                            <p>
                              <span className="text-gray-500">Location:</span> {order.deliveryLocation}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="text-gray-500">Subtotal:</span> ৳{order.subtotal}
                            </p>
                            <p>
                              <span className="text-gray-500">Delivery:</span> ৳{order.deliveryCharge}
                            </p>
                            <p className="font-medium">
                              <span className="text-gray-500">Total:</span> ৳{order.total}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-3 bg-white p-3 rounded-lg border">
                              <img
                                src={item.photoUrl || "/placeholder.svg"}
                                alt={item.productName}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.productName}</p>
                                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                  <span>Size: {item.size}</span>
                                  <span>Qty: {item.quantity}</span>
                                  <span>Price: ৳{item.price}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("addProduct")
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    productName: "",
    categories: [],
    size: "",
    regularPrice: "",
    productID: "",
    price: "",
    description: "",
    photo: null,
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 1 * 1024 * 1024) {
      toast.error("Photo must be under 1MB")
      return
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed (JPG, PNG, WebP)")
      return
    }
    setFormData({ ...formData, photo: file })
    toast.success("Image selected successfully")
  }

  const handleCategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value)
    setFormData({ ...formData, categories: selected })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

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
      toast.error("All fields are required")
      return
    }

    setSubmitting(true)

    try {
      // Upload image to Cloudinary
      const imageFormData = new FormData()
      imageFormData.append("file", formData.photo)
      imageFormData.append("upload_preset", "unify-bangladesh")

      toast.info("Uploading image...")
      const res = await axios.post("https://api.cloudinary.com/v1_1/djx4fqoay/image/upload", imageFormData)
      const imageUrl = res.data.secure_url

      const productData = {
        productName: formData.productName,
        categories: formData.categories,
        size: formData.size,
        regularPrice: Number.parseFloat(formData.regularPrice),
        productID: formData.productID,
        price: Number.parseFloat(formData.price),
        description: formData.description,
        photoUrl: imageUrl,
        createdAt: new Date(),
      }

      // Add to Firestore
      const docRef = doc(db, "products", formData.productID)
      await setDoc(docRef, productData)

      // Reset form
      setFormData({
        productName: "",
        categories: [],
        size: "",
        regularPrice: "",
        productID: "",
        price: "",
        description: "",
        photo: null,
      })

      // Reset file input
      const fileInput = document.getElementById("photo")
      if (fileInput) fileInput.value = ""

      toast.success("Product added successfully!")
    } catch (err) {
      toast.error(err.message || "Failed to add product. Please try again.")
      console.error("Error adding product:", err)
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading Admin Panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage your products and orders</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex">
            <button
              className={`flex-1 py-4 px-6 text-sm font-medium text-center transition-colors rounded-l-lg ${
                activeTab === "addProduct" ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("addProduct")}
            >
              <PlusCircle className="inline h-4 w-4 mr-2" />
              Add Product
            </button>
            <button
              className={`flex-1 py-4 px-6 text-sm font-medium text-center transition-colors rounded-r-lg ${
                activeTab === "orders" ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingCart className="inline h-4 w-4 mr-2" />
              Customer Orders
            </button>
          </div>
        </div>

        {/* Add Product Tab */}
        {activeTab === "addProduct" && (
          <section className="bg-white rounded-xl p-6 border border-orange-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <PlusCircle className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    id="productName"
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="productID" className="block text-sm font-medium text-gray-700 mb-2">
                    Product ID
                  </label>
                  <input
                    id="productID"
                    type="text"
                    name="productID"
                    value={formData.productID}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter unique product ID"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">
                  Categories (Hold Ctrl/Cmd to select multiple)
                </label>
                <select
                  id="categories"
                  multiple
                  name="categories"
                  value={formData.categories}
                  onChange={handleCategoryChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
                  required
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Size</option>
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="regularPrice" className="block text-sm font-medium text-gray-700 mb-2">
                    Regular Price (৳)
                  </label>
                  <input
                    id="regularPrice"
                    type="number"
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Sale Price (৳)
                  </label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows="4"
                  placeholder="Enter product description"
                  required
                />
              </div>

              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Photo (Max 1MB, JPG/PNG/WebP)
                </label>
                <div className="relative">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <Upload className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-6 rounded-lg font-medium text-sm transition-colors duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding Product...
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" />
                    Add Product
                  </>
                )}
              </button>
            </form>
          </section>
        )}

        {/* Customer Orders Tab */}
        {activeTab === "orders" && <OrdersTab />}
      </div>
    </div>
  )
}

export default Admin
