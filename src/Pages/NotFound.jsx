import { Link } from "react-router-dom"
import { Home, ArrowLeft, Search, RefreshCw } from "lucide-react"
import "../CSS/not-found-styles.css"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-8xl font-black text-orange-200 select-none">404</div>
          <div className="absolute inset-0 text-8xl font-black text-orange-500 animate-pulse">404</div>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-16 h-16 text-orange-400" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
          <p className="text-gray-600 mb-2">
            The page you're looking for seems to have wandered off into the digital wilderness.
          </p>
          <p className="text-gray-500 text-sm">Don't worry, it happens to the best of us!</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Go Back Home
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.history.back()}
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <button
              onClick={() => window.location.reload()}
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-white/50 rounded-xl border border-orange-200">
          <p className="text-sm text-gray-600 mb-2">Need help? Try these:</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <Link to="/" className="text-orange-500 hover:text-orange-600 transition-colors">
              Homepage
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/products" className="text-orange-500 hover:text-orange-600 transition-colors">
              Products
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/contact" className="text-orange-500 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-orange-300 rounded-full animate-bounce opacity-60"></div>
        <div
          className="absolute top-32 right-16 w-3 h-3 bg-orange-400 rounded-full animate-bounce opacity-40"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-5 h-5 bg-orange-200 rounded-full animate-bounce opacity-50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 right-10 w-2 h-2 bg-orange-500 rounded-full animate-bounce opacity-30"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>
    </div>
  )
}

export default NotFound
