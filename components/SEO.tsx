import React, { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords = "Cafe Maemi, Indian Cuisine, Nepalese Cuisine, Maebashi, Curry, Naan, Lunch",
    image = "/images/og-image.jpg",
    url = "https://cafemaemi.com"
}) => {
    const siteTitle = "Cafe Maemi | Authentic Indian & Nepalese Cuisine in Maebashi";

    useEffect(() => {
        // Update Title
        document.title = `${title} | Cafe Maemi`;

        // Helper to update meta tags
        const updateMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const updateOgMeta = (property: string, content: string) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Update Meta Tags
        updateMeta('description', description);
        updateMeta('keywords', keywords);

        // Open Graph
        updateOgMeta('og:type', 'website');
        updateOgMeta('og:url', url);
        updateOgMeta('og:title', title);
        updateOgMeta('og:description', description);
        updateOgMeta('og:image', image);

        // Twitter
        updateOgMeta('twitter:card', 'summary_large_image');
        updateOgMeta('twitter:url', url);
        updateOgMeta('twitter:title', title);
        updateOgMeta('twitter:description', description);
        updateOgMeta('twitter:image', image);

    }, [title, description, keywords, image, url]);

    return null;
};

export default SEO;
