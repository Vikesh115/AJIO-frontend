import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../product/ProductCard';
import { fetchWishlist } from '../../store/wishlistSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const WishlistPage = () => {
    const { items, status, error } = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <div className="container mx-auto py-8 text-center">
                <LoadingSpinner />
                <p className="mt-2">Loading your wishlist...</p>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="container mx-auto py-8 text-center">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button 
                    onClick={() => dispatch(fetchWishlist())}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto py-24 md:py-52 text-center">
                <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
                <Link
                    to="/dashboard"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-16 px-4">
            <h1 className="text-2xl font-bold mb-6">Your Wishlist ({items.length})</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
