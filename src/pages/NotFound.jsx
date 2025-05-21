import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <div className="flex justify-center">
                    <div className="bg-red-100 p-4 rounded-full">
                        <svg
                            className="h-12 w-12 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </div>
                <h1 className="mt-6 text-3xl font-extrabold text-gray-900">404 - Page Not Found</h1>
                <p className="mt-4 text-gray-600">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="mt-8 space-y-4">
                    <Link
                        to="/"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <FaHome className="mr-2" />
                        Go to Homepage
                    </Link>
                    <Link
                        to="/dashboard"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                        <FaSearch className="mr-2" />
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;