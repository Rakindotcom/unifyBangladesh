import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Make sure the path is correct for your Firebase config
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import toastify CSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to sign in the user
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully!", {
        position: "top-center",
        autoClose: 5000, // Toast stays for 5 seconds
      });
      window.location.href = "/profile"; // Redirect after successful login
    } catch (error) {
      toast.error("Login failed: " + error.message, {
        position: "bottom-center",
        autoClose: 5000, // Toast stays for 5 seconds
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-100 to-amber-50">
      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl px-8 py-10 w-full max-w-md border border-[#f5c2c7]">
        <h2 className="text-3xl font-extrabold text-[#800000] text-center mb-8 tracking-tight">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="pl-4 pr-4 py-3 w-full rounded-full border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-[#800000] focus:outline-none placeholder:text-gray-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="pl-4 pr-4 py-3 w-full rounded-full border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-[#800000] focus:outline-none placeholder:text-gray-500 transition"
              required
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="w-full bg-[#800000] hover:bg-[#660000] text-white py-3 rounded-full font-semibold text-lg tracking-wide transition duration-300 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>

          <p className="mt-6 text-sm text-center text-gray-700">
            New user{" "}
            <a href="/register" className="text-[#800000] font-semibold hover:underline transition">
              Register Here
            </a>
          </p>
        </form>

        {/* Include ToastContainer for toasts */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;