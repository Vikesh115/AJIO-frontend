import { Link } from 'react-router-dom';

const PromoBanner = ({ title, subtitle, ctaText, ctaLink }) => {
    return (
        <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-2">{title}</h2>
                <p className="text-xl mb-6">{subtitle}</p>
                <Link
                    to={ctaLink}
                    className="inline-block bg-white text-blue-600 font-medium py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300"
                >
                    {ctaText}
                </Link>
            </div>
        </section>
    );
};

export default PromoBanner;