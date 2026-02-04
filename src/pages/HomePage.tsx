import { Hero } from '../shared/ui/components/Hero';
import { Gallery } from '../shared/ui/components/Gallery';
import { EmailSignup } from '../shared/ui/components/EmailSignup';
import { TrustSignals } from '../shared/ui/components/TrustSignals';
import { SocialProof } from '../shared/ui/components/SocialProof';
import type { SiteConfig } from '../shared/types/config';

interface HomePageProps {
  config: SiteConfig;
}

export function HomePage({ config }: HomePageProps) {
  return (
    <main>
      <Hero 
        title={config.content.hero.title}
        subtitle={config.content.hero.subtitle}
        ctaText={config.content.hero.ctaText}
        backgroundImage={config.content.hero.backgroundImage}
      />
      
      {/* Trust Signals Section */}
      {config.conversionTriggers?.showTrustSignals && (
        <TrustSignals variant="law" />
      )}
      
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-display text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {config.content.services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-display mb-3">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Gallery 
        title={config.content.gallery.title}
        images={config.content.gallery.images}
      />
      <EmailSignup 
        title={config.content.emailSignup.title}
        subtitle={config.content.emailSignup.subtitle}
        placeholder={config.content.emailSignup.placeholder}
        buttonText={config.content.emailSignup.buttonText}
      />
      
      {/* Social Proof Notification Feed */}
      {config.conversionTriggers?.showSocialProof && (
        <SocialProof />
      )}
    </main>
  );
}
