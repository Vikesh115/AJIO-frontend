import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { selectFilteredProducts } from '../../store/productSlice';

const ProductList = () => {
    const filteredProducts = useSelector(selectFilteredProducts);
    const { status, error } = useSelector(state => state.products);

    if (status === 'loading') {
        return <div className="text-center py-24 md:py-52">Loading products...</div>;
    }

    if (status === 'failed') {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    if (filteredProducts.length === 0) {
        return <div className="text-center py-8">No products found</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;