import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { setSearchTerm } from '../../store/productSlice';
import SearchBar from './SearchBar';

const Header = () => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [localWishlistCount, setLocalWishlistCount] = useState(0);
    const [localCartCount, setLocalCartCount] = useState(0);

    const { items: cartItems } = useSelector(state => state.cart);
    const { items: wishlistItems } = useSelector(state => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    // Sync local counts with Redux state
    useEffect(() => {
        setLocalWishlistCount(wishlistItems.length);
        setLocalCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    }, [wishlistItems, cartItems]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setShowUserModal(false);
        navigate('/');
    };

    const handleSearch = (term) => {
        dispatch(setSearchTerm(term));
        navigate('/dashboard');
    };

    return (
        <header className="bg-gray-800 text-white p-4 shadow-lg sticky top-0 z-40">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link
                    to="/"
                    className="text-2xl font-bold mb-4 md:mb-0 hover:text-blue-300 transition-colors"
                    onClick={() => dispatch(setSearchTerm(''))}
                >
                    AJIO
                </Link>

                <SearchBar onSearch={handleSearch} />

                <nav className="flex items-center space-x-6 mt-4 md:mt-0">
                    <Link
                        to="/dashboard"
                        className="hover:text-blue-300 transition-colors"
                        onClick={() => dispatch(setSearchTerm(''))}
                    >
                        Products
                    </Link>

                    <Link
                        to="/cart"
                        className="relative hover:text-blue-300 transition-colors"
                        aria-label={`Cart (${localCartCount} items)`}
                    >
                        <FaShoppingCart size={20} />
                        {localCartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                                {localCartCount}
                            </span>
                        )}
                    </Link>

                    <Link
                        to="/wishlist"
                        className="relative hover:text-blue-300 transition-colors"
                        aria-label={`Wishlist (${localWishlistCount} items)`}
                    >
                        <FaHeart size={20} />
                        {localWishlistCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                {localWishlistCount}
                            </span>
                        )}
                    </Link>

                    <div className="relative">
                        {/* Mobile view - simple logout text button (below md breakpoint) */}
                        <div className="md:hidden">
                            <button
                                onClick={handleLogout}
                                className="hover:text-blue-300 focus:outline-none transition-colors flex items-center"
                                aria-label="Logout"
                            >
                                <FaSignOutAlt size={18} className="mr-1" />
                                <span className="text-sm">Logout</span>
                            </button>
                        </div>

                        {/* Desktop view - user icon with dropdown modal (md breakpoint and above) */}
                        {/* <div
                            className="hidden md:block"
                            onMouseEnter={() => setShowUserModal(true)}
                            onMouseLeave={() => setShowUserModal(false)}
                            onClick={() => setShowUserModal(!showUserModal)}
                        >
                            <button
                                className="hover:text-blue-300 focus:outline-none transition-colors"
                                aria-label="User menu"
                            >
                                <FaUser size={20} />
                            </button>

                            {showUserModal && (
                                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 divide-y divide-gray-100">
                                    <div className="px-4 py-2 text-sm text-gray-700">
                                        {localStorage.getItem('email') || 'User'}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <FaSignOutAlt className="mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div> */}

                        <div
                            className="hidden md:block"
                            onMouseEnter={() => setShowUserModal(true)}
                            onMouseLeave={() => setShowUserModal(false)}
                            onClick={() => setShowUserModal(!showUserModal)}
                        >
                            <button
                                className="hover:text-blue-300 focus:outline-none transition-colors"
                                aria-label="User menu"
                            >
                                <FaUser size={20} />
                            </button>

                            {showUserModal && (
                                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 divide-y divide-gray-100">
                                    {token ? (
                                        <>
                                            <div className="px-4 py-2 text-sm text-gray-700">
                                                {localStorage.getItem('email') || 'User'}
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            >
                                                <FaSignOutAlt className="mr-2" />
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                                onClick={() => setShowUserModal(false)}
                                            >
                                                <FaSignInAlt className="mr-2" />
                                                Sign In
                                            </Link>
                                            <Link
                                                to="/register"
                                                className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                                onClick={() => setShowUserModal(false)}
                                            >
                                                <FaUserPlus className="mr-2" />
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;