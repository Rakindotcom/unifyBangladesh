import { Link, useNavigate } from "react-router-dom"
import { Shield, Lock, ArrowLeft, Home, LogIn, Mail } from "lucide-react"

const NotAuthorized = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Lock Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4 relative">
            <div className="absolute inset-0 bg-red-200 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 bg-red-100 rounded-full animate-pulse"></div>
            <Lock className="w-16 h-16 text-red-500 z-10 animate-bounce" />
          </div>
        </div>

        {/* Status Code */}
        <div className="mb-6">
          <div className="text-6xl font-black text-red-200 select-none mb-2">403</div>
          <div className="absolute inset-0 text-6xl font-black text-red-500 animate-pulse opacity-80"></div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🚫 Access Denied</h1>
          <p className="text-gray-600 mb-2">Oops! You don't have permission to access this page.</p>
          <p className="text-gray-500 text-sm">This area is restricted to authorized users only.</p>
        </div>

        {/* Warning Box */}
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-red-500" />
            <span className="font-semibold text-red-700">Protected Area</span>
          </div>
          <p className="text-sm text-red-600">You need proper authorization to view this content.</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/login"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 group"
          >
            <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Sign In to Continue
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate(-1)}
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <Link
              to="/"
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-white/50 rounded-xl border border-orange-200">
          <p className="text-sm text-gray-600 mb-3">Need access? Contact us:</p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:admin@yoursite.com"
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              admin@yoursite.com
            </a>
          </div>
        </div>

        {/* Floating Security Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-red-300 rounded-full animate-bounce opacity-60"></div>
        <div
          className="absolute top-32 right-16 w-3 h-3 bg-orange-400 rounded-full animate-bounce opacity-40"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-5 h-5 bg-red-200 rounded-full animate-bounce opacity-50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 right-10 w-2 h-2 bg-orange-500 rounded-full animate-bounce opacity-30"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Security Badge */}
        <div className="absolute top-4 right-4 bg-red-100 p-2 rounded-full">
          <Shield className="w-6 h-6 text-red-500" />
        </div>
      </div>
    </div>
  )
}

export default NotAuthorized
