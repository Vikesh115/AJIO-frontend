import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../store/cartSlice';
import { FaTrash } from 'react-icons/fa';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            dispatch(updateCartItemQuantity({ productId: item.product.id, quantity: newQuantity }));
        }
    };

    const handleRemove = () => {
        dispatch(removeFromCart(item.product.id));
    };

    return (
        <div className="flex flex-col sm:flex-row border-b py-4">
            <div className="sm:w-1/4 mb-4 sm:mb-0">
                <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-24 h-24 object-contain"
                />
            </div>
            <div className="sm:w-1/2 sm:px-4">
                <h3 className="font-semibold">{item.product.title}</h3>
                <p className="text-gray-600">${item.product.price}</p>
            </div>
            <div className="sm:w-1/4 flex items-center justify-between sm:justify-end">
                <div className="flex items-center">
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                        className="w-16 border rounded px-2 py-1 mr-2"
                    />
                    <button
                        onClick={handleRemove}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FaTrash />
                    </button>
                </div>
                <div className="ml-4 font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default CartItem;