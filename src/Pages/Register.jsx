import { useState } from 'react';
import { Phone, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const bdPhoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;

    if (!bdPhoneRegex.test(phone)) {
      alert('Please enter a valid Bangladeshi phone number');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log({ name, phone, password });
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-rose-50 via-pink-100 to-amber-50 flex items-center justify-center px-4 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#800000]/20 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-300/30 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 z-0" />

      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl px-8 py-10 w-full max-w-md border border-[#f5c2c7]">
        <h2 className="text-3xl font-extrabold text-[#800000] text-center mb-8 tracking-tight">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <User className="absolute top-3.5 left-4 w-5 h-5 text-[#800000]" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="pl-12 pr-4 py-3 w-full rounded-full border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-[#800000] focus:outline-none placeholder:text-gray-500 transition"
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute top-3.5 left-4 w-5 h-5 text-[#800000]" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="pl-12 pr-4 py-3 w-full rounded-full border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-[#800000] focus:outline-none placeholder:text-gray-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3.5 left-4 w-5 h-5 text-[#800000]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="pl-12 pr-4 py-3 w-full rounded-full border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-[#800000] focus:outline-none placeholder:text-gray-500 transition"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute top-3.5 left-4 w-5 h-5 text-[#800000]" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="pl-12 pr-4 py-3 w-full rounded-full border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-[#800000] focus:outline-none placeholder:text-gray-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#800000] hover:bg-[#660000] text-white py-3 rounded-full font-semibold text-lg tracking-wide transition duration-300 shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-[#800000] font-semibold hover:underline transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;