import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white py-12 px-6 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand & Tagline */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Unify Bangladesh</h2>
                    <p className="text-sm text-gray-300 mb-2 text-justify">
                        Specializing in the import and export of authentic cosmetics for men and women. Your trusted source for quality beauty products.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link to="/about" className="hover:underline">About Us</Link></li>
                        <li><Link to="/services" className="hover:underline">Our Services</Link></li>
                        <li><Link to="/team" className="hover:underline">Team</Link></li>
                        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>

                {/* Legal Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
                        <li><Link to="/refund" className="hover:underline">Refund Policy</Link></li>
                        <li><Link to="/shipping" className="hover:underline">Shipping Info</Link></li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <p className="text-sm text-gray-300 mb-2">
                        +880 1877 507742<br />
                        Available: 09:00 AM – 10:00 PM
                    </p>

                    <div className="flex gap-4 mt-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <FaFacebookF className="text-gray-300 hover:text-white" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <FaTwitter className="text-gray-300 hover:text-white" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <FaInstagram className="text-gray-300 hover:text-white" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                            <FaLinkedinIn className="text-gray-300 hover:text-white" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="text-center text-xs text-gray-400 mt-12">
                &copy; {new Date().getFullYear()} <span className='text-amber-100'> Unify Bangladesh</span>. All rights reserved.
                <p>
                    Developed By -{' '}
                    <a href="https://www.linkedin.com/in/rakinalshahriar/" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-white hover:text-[wheat]">
                        Rakin al Shahriar
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;