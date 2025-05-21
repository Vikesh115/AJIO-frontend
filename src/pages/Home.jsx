import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to AJIO</h1>
                    <p className="text-xl text-gray-600 mb-8">Discover amazing products at great prices</p>
                    <Link
                        to="/dashboard"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Shop Now
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Home;