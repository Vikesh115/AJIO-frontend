import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedCategories from '../components/FeaturedCategories';
import PromoBanner from '../components/PromoBanner';
import Testimonials from '../components/Testimonials';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <HeroSection
                title="Welcome to AJIO"
                subtitle="Discover amazing products at great prices"
                ctaText="Shop Now"
                ctaLink="/dashboard"
                backgroundImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            />

            <FeaturedCategories
                categories={[
                    {
                        id: 1,
                        name: "Men's Fashion",
                        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                        link: "/"
                    },
                    {
                        id: 2,
                        name: "Women's Fashion",
                        image: "https://images.pexels.com/photos/3119215/pexels-photo-3119215.jpeg?auto=compress&cs=tinysrgb&w=600",
                        link: "/"
                    },
                    {
                        id: 3,
                        name: "Electronics",
                        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                        link: "/"
                    },
                    {
                        id: 4,
                        name: "Home & Living",
                        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                        link: "/"
                    },
                ]}
            />

            <PromoBanner
                title="Summer Sale - Up to 50% Off"
                subtitle="Limited time offer on selected items"
                ctaText="Shop Sale"
                ctaLink="/"
            />

            <Testimonials
                testimonials={[
                    {
                        id: 1,
                        quote: "Great quality products and fast delivery!",
                        author: "Keshav Sharma",
                        rating: 5
                    },
                    {
                        id: 2,
                        quote: "Love the variety and customer service.",
                        author: "Sanjay Patel",
                        rating: 4
                    }
                ]}
            />
        </div>
    );
};

export default Home;