import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Admin from './pages/Admin';
import LanguageRedirect from './components/LanguageRedirect';
import { Language } from './types';
import { DataProvider } from './context/DataContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper to validate language and provide layout
const LanguageLayout: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();

  // Validate language parameter
  const isValidLang = lang === 'en' || lang === 'ja';

  if (!isValidLang) {
    return <Navigate to="/en" replace />;
  }

  const currentLang = lang === 'ja' ? Language.JA : Language.EN;

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-red font-sans selection:bg-amber-500/30">
      <Navbar lang={currentLang} />
      <main className="flex-grow">
        <Outlet context={{ lang: currentLang }} />
      </main>
      <Footer lang={currentLang} />
    </div>
  );
};

// Page wrapper to inject language prop
const PageWrapper: React.FC<{ Component: React.FC<{ lang: Language }> }> = ({ Component }) => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang === 'ja' ? Language.JA : Language.EN;
  return <Component lang={currentLang} />;
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Direct route redirects for better UX */}
          <Route path="/menu" element={<Navigate to="/en/menu" replace />} />
          <Route path="/about" element={<Navigate to="/en/about" replace />} />
          <Route path="/reviews" element={<Navigate to="/en/reviews" replace />} />
          <Route path="/contact" element={<Navigate to="/en/contact" replace />} />
          <Route path="/gallery" element={<Navigate to="/en/gallery" replace />} />
          <Route path="/crm" element={<Navigate to="/admin" replace />} />

          {/* Root redirect */}
          <Route path="/" element={<LanguageRedirect />} />

          {/* Language Routes */}
          <Route path="/:lang" element={<LanguageLayout />}>
            <Route index element={<PageWrapper Component={Home} />} />
            <Route path="menu" element={<PageWrapper Component={Menu} />} />
            <Route path="about" element={<PageWrapper Component={About} />} />
            <Route path="reviews" element={<PageWrapper Component={Reviews} />} />
            <Route path="contact" element={<PageWrapper Component={Contact} />} />
            <Route path="gallery" element={<PageWrapper Component={Gallery} />} />
          </Route>

          {/* Admin Routes (Keep separate from language prefix for now, or include if needed) */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<Admin />} />

          {/* Catch all - redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;