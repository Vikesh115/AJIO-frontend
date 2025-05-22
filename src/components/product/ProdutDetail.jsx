import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../store/productSlice';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import LoadingSpinner from '../common/LoadingSpinner'

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, status, error } = useSelector(state => state.products);
    // const { items: wishlistItems } = useSelector(state => state.wishlist);
    const product = products[0];
    // const isInWishlist = wishlistItems.some(item => item.id === product?.id);
    const { items: wishlistItems, loadingProductId: loadingWishlistProductId } = useSelector(state => state.wishlist);
    const token = localStorage.getItem('token');

    const isInReduxWishlist = wishlistItems.some(item => item.id === product.id);

    const [isInWishlist, setIsInWishlist] = useState(isInReduxWishlist);

    useEffect(() => {
        setIsInWishlist(isInReduxWishlist);
    }, [isInReduxWishlist]);
    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [id, dispatch]);

    if (status === 'loading') {
        return (
            <div className=" mx-auto py-24 text-center">
                <LoadingSpinner size="md" color="blue" />
                Loading ProductDetail...
            </div>
        );
    }

    if (status === 'failed') {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    if (!product) {
        return <div className="text-center py-8">Product not found</div>;
    }

    // const handleAddToCart = () => {
    //     dispatch(addToCart({ productId: product.id, quantity: 1 }));
    // };
    const handleAddToCart = () => {
        if (token) {
            dispatch(addToCart({ productId: product.id, quantity: 1 }));
        } else {
            const existingCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
            const index = existingCart.findIndex(item => item.product.id === product.id);

            if (index > -1) {
                existingCart[index].quantity += 1;
            } else {
                existingCart.push({ product, quantity: 1 });
            }

            localStorage.setItem('guest_cart', JSON.stringify(existingCart));
            dispatch({ type: 'cart/setGuestCart', payload: existingCart });
        }
    };

    // const handleAddToWishlist = () => {
    //     if (!isInWishlist) {
    //         dispatch(addToWishlist(product.id));
    //     }
    // };
    const handleToggleWishlist = () => {
        setIsInWishlist(prev => !prev);

        if (token) {
            if (isInWishlist) {
                dispatch(removeFromWishlist(product.id));
            } else {
                dispatch(addToWishlist(product.id));
            }
        } else {
            const existingWishlist = JSON.parse(localStorage.getItem('guest_wishlist') || '[]');
            const isAlreadyInWishlist = existingWishlist.some(item => item.id === product.id);

            let updatedWishlist;
            if (isAlreadyInWishlist) {
                updatedWishlist = existingWishlist.filter(item => item.id !== product.id);
            } else {
                updatedWishlist = [...existingWishlist, product];
            }

            localStorage.setItem('guest_wishlist', JSON.stringify(updatedWishlist));
            dispatch({ type: 'wishlist/setGuestWishlist', payload: updatedWishlist });
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-100">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-96 object-contain"
                        />
                    </div>
                    <div className="md:w-1/2 p-8">
                        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                        <div className="flex items-center mb-4">
                            <div className="flex items-center mr-4">
                                <FaStar className="text-yellow-400 mr-1" />
                                <span>{product.rating.rate} ({product.rating.count} reviews)</span>
                            </div>
                            <span className="text-gray-600">{product.category}</span>
                        </div>
                        <p className="text-3xl font-bold text-blue-600 mb-6">${product.price}</p>
                        <p className="text-gray-700 mb-8">{product.description}</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
                            >
                                <FaShoppingCart className="mr-2" />
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
                            {/* <button
                                onClick={handleAddToWishlist}
                                className={`px-4 py-3 rounded-lg border flex items-center ${isInWishlist ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'}`}
                                disabled={isInWishlist}
                            >
                                <FaHeart className="mr-2" />
                                {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;