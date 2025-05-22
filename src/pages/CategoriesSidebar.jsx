import { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const CategoriesSidebar = ({ categories, onSelectCategory, selectedCategory }) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div>
            {/* Mobile sidebar toggle button */}
            <button
                className="md:hidden mb-4 flex items-center text-blue-600"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
                {isMobileSidebarOpen ? (
                    <>
                        <FaTimes className="mr-2" /> Close Filters
                    </>
                ) : (
                    <>
                        <FaFilter className="mr-2" /> Filter Categories
                    </>
                )}
            </button>

            {/* Sidebar content */}
            <div
                className={`${isMobileSidebarOpen ? 'block' : 'hidden'} md:block bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto`}
            >
                <h2 className="font-bold text-lg mb-4 flex items-center">
                    <FaFilter className="mr-2" /> Categories
                </h2>

                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => onSelectCategory('all')}
                            aria-pressed={selectedCategory === 'all'}
                            className={`w-full text-left px-3 py-2 rounded transition-colors duration-150
                                ${selectedCategory === 'all'
                                    ? 'bg-blue-100 text-blue-800 font-semibold'
                                    : 'hover:bg-gray-100 text-gray-900'}
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        >
                            All Products
                        </button>
                    </li>

                    {categories?.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                            <li key={category}>
                                <button
                                    onClick={() => onSelectCategory(category)}
                                    aria-pressed={isActive}
                                    className={`w-full text-left px-3 py-2 rounded capitalize transition-colors duration-150
                                        ${isActive
                                            ? 'bg-blue-100 text-blue-800 font-semibold'
                                            : 'hover:bg-gray-100 text-gray-900'}
                                        focus:outline-none focus:ring-2 focus:ring-blue-800`}
                                >
                                    {category}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default CategoriesSidebar;
