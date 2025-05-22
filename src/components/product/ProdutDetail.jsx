import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../store/productSlice';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist } from '../../store/wishlistSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, status, error } = useSelector(state => state.products);
    const { items: wishlistItems } = useSelector(state => state.wishlist);
    const product = products[0];
    const isInWishlist = wishlistItems.some(item => item.id === product?.id);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [id, dispatch]);

    if (status === 'loading') {
        return <div className="text-center py-6">Loading product details...</div>;
    }

    if (status === 'failed') {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    if (!product) {
        return <div className="text-center py-8">Product not found</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ productId: product.id, quantity: 1 }));
    };

    const handleAddToWishlist = () => {
        if (!isInWishlist) {
            dispatch(addToWishlist(product.id));
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
                                onClick={handleAddToWishlist}
                                className={`px-4 py-3 rounded-lg border flex items-center ${isInWishlist ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'}`}
                                disabled={isInWishlist}
                            >
                                <FaHeart className="mr-2" />
                                {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;