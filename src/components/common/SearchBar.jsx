import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full md:w-1/3">
            <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-full focus:bg-amber-50 focus:outline-none focus:text-black text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-3 text-black focus:text-black">
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchBar;