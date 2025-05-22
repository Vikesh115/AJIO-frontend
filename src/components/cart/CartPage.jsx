import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { selectCartTotal } from '../../store/cartSlice';
import { fetchCart } from '../../store/cartSlice';
import { useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const CartPage = () => {
    const { items, status, error } = useSelector(state => state.cart);
    const total = useSelector(selectCartTotal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <div className="container mx-auto py-8 text-center">
                <LoadingSpinner size={8} />
                <p className="mt-2">Loading your cart...</p>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="container mx-auto py-24 md:py-52 text-center">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button 
                    onClick={() => dispatch(fetchCart())}
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
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link
                    to="/dashboard"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-16 px-4">
            <h1 className="text-2xl font-bold mb-6">Your Cart ({items.length})</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                {items.map(item => (
                    <CartItem key={item.product.id} item={item} />
                ))}
                <div className="border-t pt-4 mt-4 flex justify-end">
                    <div className="text-right">
                        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 mt-4 transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;