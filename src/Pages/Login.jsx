import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetErrors, setResetErrors] = useState({});
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  // Login form validation
  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors before logging in.", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      navigate("/profile");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  // Toggle show password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Forgot password form validation
  const validateResetForm = () => {
    const newErrors = {};
    if (!resetEmail) {
      newErrors.resetEmail = "Email is required";
    } else if (!EMAIL_REGEX.test(resetEmail)) {
      newErrors.resetEmail = "Enter a valid email address";
    }
    setResetErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateResetForm()) {
      toast.error("Please enter a valid email address.", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent! Check your inbox.", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      setShowForgotPassword(false);
      setResetEmail("");
      setResetErrors({});
    } catch (error) {
      toast.error(`Failed to send reset email: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
      <div className="relative bg-gray-800 rounded-xl p-8 w-full max-w-sm sm:max-w-md border border-orange-500/30 shadow-lg shadow-orange-500/10">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-400 text-center mb-6">
          Welcome Back
        </h2>

        {!showForgotPassword ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Email Address <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: "" });
                  }}
                  placeholder="name@example.com"
                  className={`pl-10 pr-4 py-2 w-full rounded-md border bg-gray-700 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  }`}
                  required
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                Password <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: "" });
                  }}
                  placeholder="Enter your password"
                  className={`pl-10 pr-12 py-2 w-full rounded-md border bg-gray-700 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                    errors.password ? "border-red-500" : "border-gray-600"
                  }`}
                  required
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-orange-400 hover:text-orange-300 transition-colors duration-200"
                aria-label="Forgot password"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold text-base tracking-wide transition-colors duration-200 shadow-md hover:shadow-orange-500/50 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                      ></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {/* Register Link */}
            <p className="mt-4 text-sm text-center text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-orange-400 font-semibold hover:text-orange-300 transition-colors duration-200"
              >
                Register Here
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            {/* Forgot Password Email */}
            <div>
              <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-200 mb-1">
                Email Address <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                <input
                  type="email"
                  name="resetEmail"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                    setResetErrors({ ...resetErrors, resetEmail: "" });
                  }}
                  placeholder="name@example.com"
                  className={`pl-10 pr-4 py-2 w-full rounded-md border bg-gray-700 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                    resetErrors.resetEmail ? "border-red-500" : "border-gray-600"
                  }`}
                  required
                  aria-describedby={resetErrors.resetEmail ? "resetEmail-error" : undefined}
                />
              </div>
              {resetErrors.resetEmail && (
                <p id="resetEmail-error" className="text-red-500 text-xs mt-1">{resetErrors.resetEmail}</p>
              )}
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={resetLoading}
                className={`flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold text-base tracking-wide transition-colors duration-200 shadow-md hover:shadow-orange-500/50 ${
                  resetLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {resetLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Email"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail("");
                  setResetErrors({});
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-md font-semibold text-base tracking-wide transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;