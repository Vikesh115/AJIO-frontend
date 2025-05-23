import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProducts,
    fetchCategories,
    setSearchTerm,
    fetchProductsByCategory,
    setSelectedCategory
} from '../store/productSlice';
import ProductList from '../components/product/ProductList';
import CategoriesSidebar from './CategoriesSidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
    const dispatch = useDispatch();
        const { status, error, categories, searchTerm, selectedCategory } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategorySelect = (category) => {
        dispatch(setSelectedCategory(category));
        dispatch(setSearchTerm(''));

        if (category === 'all') {
            dispatch(fetchProducts());
        } else {
            dispatch(fetchProductsByCategory(category));
        }
    };


    if (status === 'loading') {
        return (
            <div className=" mx-auto py-24 text-center">
                <LoadingSpinner size="md" color="blue" />
                Loading Dashboard...
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="container mx-auto py-12 text-center">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button
                    onClick={() => {
                        dispatch(fetchProducts());
                        dispatch(fetchCategories());
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar - Sticky on larger screens */}
                <aside className="w-full md:w-1/4 md:sticky md:top-4 md:h-[calc(100vh-2rem)] md:overflow-y-auto">
                    <CategoriesSidebar
                        categories={categories}
                        onSelectCategory={handleCategorySelect}
                        selectedCategory={selectedCategory}
                    />
                </aside>

                {/* Main Content Area */}
                <main className="w-full md:w-[3/4]">
                    <header className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            {searchTerm ? (
                                <>
                                    Search Results for <span className="text-blue-600">"{searchTerm}"</span>
                                </>
                            ) : (
                                'All Products'
                            )}
                        </h1>
                        {searchTerm && (
                            <p className="text-gray-600 mt-2">
                                Showing all matching products
                            </p>
                        )}
                    </header>

                    <ProductList />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
