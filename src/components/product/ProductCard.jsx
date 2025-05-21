import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import { useEffect, useState } from 'react';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { loadingProductId } = useSelector(state => state.cart)
    const { items: wishlistItems, loadingProductId: loadingWishlistProductId } = useSelector(state => state.wishlist);


    const isInReduxWishlist = wishlistItems.some(item => item.id === product.id);

    const [isInWishlist, setIsInWishlist] = useState(isInReduxWishlist);

    useEffect(() => {
        setIsInWishlist(isInReduxWishlist);
    }, [isInReduxWishlist]);

    const handleAddToCart = () => {
        dispatch(addToCart({ productId: product.id, quantity: 1 }));
    };

    const handleToggleWishlist = () => {
        setIsInWishlist(prev => !prev); 
        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product.id));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/product/${product.id}`} className="block">
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
            </Link>

            <div className="p-4">
                <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
                    <div className="flex items-center mb-2">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span key={product.id}>{product?.rating?.rate} ({product?.rating?.count})</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                    <p className="text-blue-600 font-bold text-xl">${product.price}</p>
                </Link>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-600 text-white rounded p-1 hover:bg-blue-700 flex items-center"
                        disabled={loadingProductId === product.id}
                    >
                        {loadingProductId === product.id ? (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        ) : (
                            <FaShoppingCart className="mr-1" />
                        )}
                        Add to Cart
                    </button>
                    <button
                        onClick={handleToggleWishlist}
                        className={`p-2 rounded ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                        disabled={loadingWishlistProductId === product.id}>
                        {loadingWishlistProductId === product.id ? (
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        ) : (
                            <FaHeart size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;