import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '../types';

const LanguageRedirect: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];

        // Determine target language (default to EN)
        const targetLang = browserLang === 'ja' ? 'ja' : 'en';

        // Redirect to the language-specific root
        navigate(`/${targetLang}`, { replace: true });
    }, [navigate]);

    return null;
};

export default LanguageRedirect;
