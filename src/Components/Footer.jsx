import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-20 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-orange-400 mb-4">Unify Bangladesh</h2>
          <p className="text-sm text-gray-300 mb-2 text-justify">
            Specializing in the import and export of authentic cosmetics for men and women. Your trusted source for quality beauty products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-4">Quick Links</h3>
          <nav aria-label="Quick links">
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/mission" className="hover:text-orange-300 transition-colors duration-200">
                  Mission and Vision
                </a>
              </li>
              <li>
                <a href="/story" className="hover:text-orange-300 transition-colors duration-200">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-orange-300 transition-colors duration-200">
                  Team Information
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:text-orange-300 transition-colors duration-200">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-orange-300 transition-colors duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Legal Info */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-4">Legal</h3>
          <nav aria-label="Legal links">
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/refund" className="hover:text-orange-300 transition-colors duration-200">
                  Refund & Return Policy
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-orange-300 transition-colors duration-200">
                  Privacy and Confidentiality
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-orange-300 transition-colors duration-200">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-orange-300 transition-colors duration-200">
                  Shipping & Delivery
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-4">Contact Us</h3>
          <p className="text-sm text-gray-300 mb-2">
            +880 1877 507742<br />
            Available: 09:00 AM – 10:00 PM
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit our Facebook page"
              className="text-orange-400 hover:text-orange-300 transition-colors duration-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit our Twitter page"
              className="text-orange-400 hover:text-orange-300 transition-colors duration-200"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit our Instagram page"
              className="text-orange-400 hover:text-orange-300 transition-colors duration-200"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit our LinkedIn page"
              className="text-orange-400 hover:text-orange-300 transition-colors duration-200"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-gray-400 mt-12">
        © {new Date().getFullYear()} <span className="text-orange-400">Unify Bangladesh</span>. All rights reserved.
        <p>
          Developed By -{" "}
          <a
            href="https://www.linkedin.com/in/rakinalshahriar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200"
          >
            Rakin al Shahriar
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;