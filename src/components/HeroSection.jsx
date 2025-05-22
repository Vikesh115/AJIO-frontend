import { Link } from 'react-router-dom';

const HeroSection = ({ title, subtitle, ctaText, ctaLink, backgroundImage }) => {
    return (
        <section
            className="relative bg-gray-900 text-white py-20 md:py-32"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">{title}</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">{subtitle}</p>
                <Link
                    to={ctaLink}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
                >
                    {ctaText}
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;