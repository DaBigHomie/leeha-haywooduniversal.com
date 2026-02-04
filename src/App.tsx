import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './shared/ui/components/Header';
import { Footer } from './shared/ui/components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { DigitalProductsPage } from './pages/DigitalProductsPage';
import { MembershipPage } from './pages/MembershipPage';
import { CoursesPage } from './pages/CoursesPage';
import { LegalGuidesPage } from './pages/LegalGuidesPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { VariantSwitcher } from './shared/ui/components/VariantSwitcher';
import { baseConfig } from './shared/config/base.config';
import { siteVariants } from './shared/config/variants.config';

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
      
      <Footer 
        businessName={config.content.footer.businessName}
        tagline={config.content.footer.tagline}
        socialLinks={config.content.footer.socialLinks}
        legalLinks={config.content.footer.legalLinks}
      />
    </div>
  );
}

export default App;
