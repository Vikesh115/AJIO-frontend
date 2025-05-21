import { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const CategoriesSidebar = ({ categories, onSelectCategory, searchTerm }) => {
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
                className={`${isMobileSidebarOpen ? 'block' : 'hidden'} md:block bg-white p-4 rounded-lg shadow-md`}
            >
                <h2 className="font-bold text-lg mb-4 flex items-center">
                    <FaFilter className="mr-2" /> Categories
                </h2>

                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => onSelectCategory('all')}
                            className={`w-full text-left px-3 py-2 rounded ${!searchTerm ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                        >
                            All Products
                        </button>
                    </li>

                    {categories?.map((category) => (
                        <li key={category}>
                            <button
                                onClick={() => onSelectCategory(category)}
                                className={`w-full text-left px-3 py-2 rounded capitalize ${searchTerm === category ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoriesSidebar;