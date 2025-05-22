import { useState } from 'react';

const Newsletter = ({ title, subtitle, placeholder }) => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Subscribed with email:', email);
            setSubscribed(true);
            setEmail('');
        } catch (error) {
            console.error('Subscription failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-4">
            <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
                <p className="text-lg text-blue-100 mb-6">{subtitle}</p>

                {subscribed ? (
                    <div className="bg-white text-blue-600 inline-block px-6 py-3 rounded-lg font-medium">
                        Thank you for subscribing!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={placeholder}
                            required
                            className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                )}

                <p className="text-xs text-blue-200 mt-4">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </div>
    );
};

export default Newsletter;