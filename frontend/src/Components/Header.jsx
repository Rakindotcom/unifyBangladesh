import { useState } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  "Makeup", "Skin Care", "Hair Care", "Mom & Baby", "Daily Essential",
  "Lingerie", "Fragrance", "Accessories", "Men's Care", "Face Mask"
];

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-md relative z-50">
      {/* Mobile Search Mode */}
      {isSearchActive && (
        <div className="md:hidden max-w-full mx-auto px-4 py-3 flex items-center justify-between bg-white shadow-md">
          <button
            onClick={handleSearchToggle}
            className="text-gray-500 w-6 h-6 cursor-pointer"
          >
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
      <div className={`max-w-7xl mx-auto px-4 py-3 flex items-center justify-between ${isSearchActive ? 'hidden md:flex' : 'flex'}`}>
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/unifylogo.png" alt="SkinPlus Logo" className="h-10 w-auto" />
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
          <div className="relative">
            <ShoppingCart className="text-[#800000] w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#800000] text-white text-xs font-semibold rounded-full px-1.5">0</span>
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
                    to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
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

      {/* Desktop Bottom Nav */}
      <div className="hidden md:block bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center text-white justify-between font-medium">
          <div
            className="flex items-center cursor-pointer hover:text-amber-300 space-x-1 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition"
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
                  className="px-3 py-1.5 rounded-lg hover:text-amber-300 hover:bg-white/10 transition"
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
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white via-rose-50 to-pink-100 shadow-2xl p-5 transition-transform duration-300 z-50 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
                to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                className="flex items-center px-3 py-2 rounded-lg border border-gray-200 shadow-sm text-gray-800 hover:bg-[#ffe4e6] hover:text-[#800000] transition"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="w-2.5 h-2.5 bg-[#800000] rounded-full mr-2"></span>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Dim Background for Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;