import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Newsletter Section (already exists but moved here for better structure) */}
            <Newsletter
                title="Stay Updated"
                subtitle="Subscribe for exclusive offers and updates"
                placeholder="Your email address"
            />

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* About Company */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">About AJIO</h3>
                        <p className="mb-4">Your premier destination for fashion and lifestyle products.</p>
                        <div className="flex space-x-4">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <a
                                    key={social}
                                    href={`https://${social}.com/ajio`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="sr-only">{social}</span>
                                    <i className={`fab fa-${social} text-xl`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Shop', path: '/dashboard' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Contact', path: '/contact' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            {[
                                'FAQs',
                                'Shipping Policy',
                                'Return Policy',
                                'Payment Options',
                                'Size Guide'
                            ].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <address className="not-italic">
                            <p className="mb-2">123 Fashion Street</p>
                            <p className="mb-2">Mumbai, India 400001</p>
                            <p className="mb-2">Email: support@ajio.com</p>
                            <p>Phone: +91 1234567890</p>
                        </address>
                    </div>
                </div>

                {/* Copyright and Payment Methods */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p>© {new Date().getFullYear()} AJIO. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {['visa', 'mastercard', 'paypal', 'apple-pay'].map((method) => (
                            <i
                                key={method}
                                className={`fab fa-${method} text-2xl text-gray-400`}
                                aria-label={method}
                            ></i>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;