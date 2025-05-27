"use client"

import { useState, useEffect } from "react"
import { Mail, Bell, Rocket, Star, Heart, Zap, ArrowRight, CheckCircle } from "lucide-react"

const ComingSoon = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set launch date (30 days from now)
  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 30)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-orange-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-32 right-16 w-3 h-3 bg-orange-400 rounded-full animate-bounce opacity-40 animation-delay-500"></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-orange-200 rounded-full animate-bounce opacity-50 animation-delay-1000"></div>
        <div className="absolute bottom-32 right-10 w-2 h-2 bg-orange-500 rounded-full animate-bounce opacity-30 animation-delay-1500"></div>

        {/* Large Background Circles */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-100 to-orange-200 rounded-full opacity-30 animate-pulse animation-delay-1000"></div>

        {/* Animated Stars */}
        <div className="absolute top-1/4 left-1/4 animate-ping">
          <Star className="w-6 h-6 text-orange-400 opacity-60" />
        </div>
        <div className="absolute top-3/4 right-1/4 animate-ping animation-delay-2000">
          <Zap className="w-5 h-5 text-orange-500 opacity-50" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-6 animate-pulse">
              <Rocket className="w-10 h-10 text-white animate-bounce" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
              Coming Soon
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-2">Something Amazing is on the Way!</p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We're working hard to bring you an incredible experience. Get ready for something that will revolutionize
              the way you shop for beauty and wellness products.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12 animate-fade-in-up animation-delay-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Launch Countdown</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2 animate-pulse">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-gray-600 text-sm uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Subscription */}
          <div className="mb-12 animate-fade-in-up animation-delay-1000">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border-2 border-orange-100">
              <div className="flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-orange-500 mr-2 animate-bounce" />
                <h3 className="text-xl font-semibold text-gray-800">Get Notified</h3>
              </div>
              <p className="text-gray-600 mb-6">Be the first to know when we launch!</p>

              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    Notify Me
                    <ArrowRight className="w-4 h-4 animate-bounce" />
                  </button>
                </form>
              ) : (
                <div className="text-center animate-fade-in">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3 animate-bounce" />
                  <h4 className="text-lg font-semibold text-green-600 mb-2">Thank You!</h4>
                  <p className="text-gray-600">We'll notify you as soon as we launch.</p>
                </div>
              )}
            </div>
          </div>

          {/* Features Preview */}
          <div className="mb-12 animate-fade-in-up animation-delay-1500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">What to Expect</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: "🛍️",
                  title: "Premium Products",
                  description: "Curated selection of the finest beauty and wellness products",
                },
                {
                  icon: "🚚",
                  title: "Fast Delivery",
                  description: "Quick and reliable delivery right to your doorstep",
                },
                {
                  icon: "💎",
                  title: "Exclusive Deals",
                  description: "Special offers and discounts for our valued customers",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-orange-50 hover:border-orange-200"
                >
                  <div className="text-4xl mb-4 animate-bounce animation-delay-500">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 animate-fade-in-up animation-delay-2000">
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Development Progress</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full animate-pulse"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="animate-fade-in-up animation-delay-2500">
            <p className="text-gray-600 mb-4">Follow us for updates</p>
            <div className="flex justify-center space-x-4">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social, index) => (
                <button
                  key={social}
                  className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-orange-100 hover:border-orange-300 flex items-center justify-center group"
                >
                  <Heart className="w-5 h-5 text-orange-500 group-hover:animate-pulse" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 fill-orange-500 opacity-10">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-2500 {
          animation-delay: 2.5s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default ComingSoon
