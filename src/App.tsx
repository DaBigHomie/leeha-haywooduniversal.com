import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './shared/ui/components/Header';
import { Footer } from './shared/ui/components/Footer';
import { ConciergeChatbot } from './shared/ui/components/ConciergeChatbot';
import { LoadingSpinner } from './shared/ui/components/LoadingSpinner';
import { VariantSwitcher } from './shared/ui/components/VariantSwitcher';
import { baseConfig } from './shared/config/base.config';
import { siteVariants } from './shared/config/variants.config';

// Lazy load page components for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DigitalProductsPage = lazy(() => import('./pages/DigitalProductsPage'));
const MembershipPage = lazy(() => import('./pages/MembershipPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const LegalGuidesPage = lazy(() => import('./pages/LegalGuidesPage'));
const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));

function App() {
  // Load variant from localStorage or default to baseConfig
  const savedVariant = localStorage.getItem('selectedVariant');
  const initialConfig = savedVariant && siteVariants[savedVariant as keyof typeof siteVariants] 
    ? siteVariants[savedVariant as keyof typeof siteVariants]
    : baseConfig;
  
  const [config, setConfig] = useState(initialConfig);

  const handleVariantChange = (variantId: string) => {
    if (variantId === 'base') {
      setConfig(baseConfig);
      localStorage.setItem('selectedVariant', 'base');
    } else {
      const variant = siteVariants[variantId as keyof typeof siteVariants];
      if (variant) {
        setConfig(variant);
        localStorage.setItem('selectedVariant', variantId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header 
        logo={config.navigation.logo}
        items={config.navigation.items}
        accountMenu={config.navigation.accountMenu}
        primaryColor={config.theme.primaryColor}
      />
      
      {/* Variant Switcher - floating in top right */}
      <VariantSwitcher 
        currentVariant={config.id}
        onVariantChange={handleVariantChange}
      />
      
<<<<<<< HEAD
      {/* Lazy loaded routes with loading spinner */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage config={config} />} />
          <Route path="/services" element={<ServicesPage config={config} />} />
          <Route path="/gallery" element={<GalleryPage config={config} />} />
          <Route path="/contact" element={<ContactPage config={config} />} />
          {/* Fallback route for any other paths */}
          <Route path="*" element={<HomePage config={config} />} />
        </Routes>
      </Suspense>
=======
      <Routes>
        <Route path="/" element={<HomePage config={config} />} />
        <Route path="/services" element={<ServicesPage config={config} />} />
        <Route path="/gallery" element={<GalleryPage config={config} />} />
        <Route path="/contact" element={<ContactPage config={config} />} />
        <Route path="/digital-products" element={<DigitalProductsPage config={config} />} />
        <Route path="/membership" element={<MembershipPage config={config} />} />
        <Route path="/courses" element={<CoursesPage config={config} />} />
        <Route path="/legal-guides" element={<LegalGuidesPage config={config} />} />
        <Route path="/templates" element={<TemplatesPage config={config} />} />
        {/* Fallback route for any other paths */}
        <Route path="*" element={<HomePage config={config} />} />
      </Routes>
>>>>>>> origin/main
      
      <Footer 
        businessName={config.content.footer.businessName}
        tagline={config.content.footer.tagline}
        socialLinks={config.content.footer.socialLinks}
        legalLinks={config.content.footer.legalLinks}
      />
      
      {/* Concierge Chatbot - available on all pages */}
      <ConciergeChatbot />
    </div>
  );
}

export default App;
