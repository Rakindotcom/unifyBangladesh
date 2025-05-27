import { useState, useEffect } from "react"
import { ShoppingCart, Search, Menu, X, Plus, Minus, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

const categories = [
  "Makeup",
  "Skin Care",
  "Hair Care",
  "Mom & Baby",
  "Daily Essential",
  "Lingerie",
  "Fragrance",
  "Accessories",
  "Men's Care",
  "Face Mask",
]

// // Example cart items
// const exampleCartItems = [
//   {
//     id: 1,
//     name: "Vitamin C Serum",
//     brand: "SkinPlus",
//     price: 1250,
//     quantity: 2,
//     image: "/placeholder.svg?height=60&width=60",
//   },
//   {
//     id: 2,
//     name: "Moisturizing Cream",
//     brand: "GlowCare",
//     price: 850,
//     quantity: 1,
//     image: "/placeholder.svg?height=60&width=60",
//   },
//   {
//     id: 3,
//     name: "Face Wash Gel",
//     brand: "PureSkin",
//     price: 450,
//     quantity: 3,
//     image: "/placeholder.svg?height=60&width=60",
//   },
// ]

let reloadCartLocal;
export { reloadCartLocal };

const Header = ( ) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      return savedCart ? JSON.parse(savedCart) : []
    }
    return []
  })
  const [deliveryLocation, setDeliveryLocation] = useState("inside")

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive)
    if (isSearchActive) {
      setSearchQuery("")
    }
  }

  // Sync cart with localStorage when cart opens
  useEffect(() => {
    if (cartOpen) {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) setCartItems(JSON.parse(savedCart))
    }
  }, [cartOpen])

  const updateQuantity = (id, newQuantity) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0)
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const removeItem = (id) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  reloadCartLocal = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCartItems(JSON.parse(savedCart))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryCharge = deliveryLocation === "inside" ? 70 : 120
  const total = subtotal + deliveryCharge
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)


  return (
    <header className="bg-white shadow-md relative z-50">
      {/* Mobile Search Mode */}
      {isSearchActive && (
        <div className="md:hidden max-w-full mx-auto px-4 py-3 flex items-center justify-between bg-white shadow-md">
          <button onClick={handleSearchToggle} className="text-gray-500 w-6 h-6 cursor-pointer">
            <X className="w-6 h-6" />
          </button>
          <div className="flex-1 mx-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search For Products, Brands and Categories"
              className="w-full pl-9 pr-3 py-1.5 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
            />
          </div>
        </div>
      )}

      {/* Default Header */}
      <div
        className={`max-w-7xl mx-auto px-4 py-3 flex items-center justify-between ${isSearchActive ? "hidden md:flex" : "flex"}`}
      >
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/unifylogo.png" alt="SkinPlus Logo" className="h-13 mb-2 w-auto" />
        </Link>

        {/* Search Icon for Mobile */}
        <div className="md:hidden ml-auto mr-3">
          <button onClick={() => setIsSearchActive(true)}>
            <Search className="text-gray-500 w-6 h-6" />
          </button>
        </div>

        {/* Search Bar for Desktop */}
        <div className="hidden md:block flex-1 mx-6 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search For Products, Brands and Categories"
            className="w-full pl-9 pr-3 py-1.5 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="text-[#800000] w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#800000] text-white text-xs font-semibold rounded-full px-1.5">
              {totalItems}
            </span>
          </div>

          <Link to="/login">
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-[#800000] rounded-full hover:bg-[#660000] transition">
              Login
            </button>
          </Link>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 w-64 h-full bg-white shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#800000]">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-3">
              {["Home", "Brands", "Blog"].map((item, i) => (
                <li key={i}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="block px-3 py-2 rounded-lg border border-gray-200 shadow-sm hover:bg-[#fef3f2] hover:text-[#800000] transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li className="pt-4 font-semibold text-[#800000]">Categories</li>
              {categories.map((cat, i) => (
                <li key={i}>
                  <Link
                    to={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                    className="block px-3 py-2 rounded-lg border border-gray-200 shadow-sm hover:bg-[#fef3f2] hover:text-[#800000] transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 w-96 h-full bg-white shadow-lg flex flex-col">
            {/* Cart Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-orange-400 to-orange-500 text-white">
              <h2 className="text-lg font-semibold">Shopping Cart ({totalItems})</h2>
              <button onClick={() => setCartOpen(false)}>
                <X className="w-5 h-5 hover:text-gray-200" />
              </button>
            </div>

            {/* Delivery Location Selector */}
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">Delivery Location</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeliveryLocation("inside")}
                  className={`px-3 py-1.5 text-xs rounded-full border transition ${deliveryLocation === "inside"
                      ? "bg-orange-400 text-white border-orange-400"
                      : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
                    }`}
                >
                  Inside Dhaka (৳70)
                </button>
                <button
                  onClick={() => setDeliveryLocation("outside")}
                  className={`px-3 py-1.5 text-xs rounded-full border transition ${deliveryLocation === "outside"
                      ? "bg-orange-400 text-white border-orange-400"
                      : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
                    }`}
                >
                  Outside Dhaka (৳120)
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 border rounded-lg bg-gray-50">
                      <img
                        src={item.photoUrl || "/placeholder.svg"}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-800">{item.productName}</h4>
                        <p className="text-xs text-gray-500">{item.size}</p>
                        <p className="text-sm font-semibold text-orange-500">৳{item.price}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <div className="border-t bg-gray-50 p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge:</span>
                    <span>৳{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base border-t pt-2">
                    <span>Total:</span>
                    <span className="text-orange-500">৳{total}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-orange-400 text-white py-3 rounded-lg font-medium hover:bg-orange-500 transition">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Bottom Nav */}
      <div className="hidden md:block bg-orange-400">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center text-white justify-between font-medium">
          <div
            className="flex items-center cursor-pointer hover:text-[maroon] space-x-1 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
            <span>Categories</span>
          </div>

          <ul className="flex space-x-4">
            {["Home", "Brands", "Blog"].map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-lg hover:text-[maroon] hover:bg-white/10 transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white via-rose-50 to-pink-100 shadow-2xl p-5 transition-transform duration-300 z-50 overflow-y-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#800000]">Categories</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-gray-700 hover:text-red-600" />
          </button>
        </div>

        <ul className="space-y-3">
          {categories.map((cat, idx) => (
            <li key={idx}>
              <Link
                to={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                className="flex items-center px-3 py-2 rounded-lg border border-orange-500 shadow-sm text-gray-800 hover:bg-[#ffe4e6] hover:text-[#800000] transition"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full mr-2"></span>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Dim Background for Sidebar */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSidebarOpen(false)}></div>}
    </header>
  )
}

export default Header
