import { Hero } from '../shared/ui/components/Hero';
import { Gallery } from '../shared/ui/components/Gallery';
import { EmailSignup } from '../shared/ui/components/EmailSignup';
import { AtlantaEventsCalendar } from '../shared/ui/components/AtlantaEventsCalendar';
import { CommunityPartnerships } from '../shared/ui/components/CommunityPartnerships';
import { ReferralProgram } from '../shared/ui/components/ReferralProgram';
import { LocalPresence } from '../shared/ui/components/LocalPresence';
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

      {/* Atlanta Local Advantage Sections */}
      {config.atlantaLocal && (
        <>
          {config.atlantaLocal.events && config.atlantaLocal.events.length > 0 && (
            <section className="container mx-auto px-4 py-16">
              <AtlantaEventsCalendar events={config.atlantaLocal.events} />
            </section>
          )}

          {config.atlantaLocal.partnerships && config.atlantaLocal.partnerships.length > 0 && (
            <section className="container mx-auto px-4 py-16 bg-gray-50">
              <CommunityPartnerships partnerships={config.atlantaLocal.partnerships} />
            </section>
          )}

          {config.atlantaLocal.referralTiers && config.atlantaLocal.referralTiers.length > 0 && (
            <section className="container mx-auto px-4 py-16">
              <ReferralProgram 
                referralCode={config.atlantaLocal.userReferralCode || 'ATLANTA2026'}
                referralLink={`${typeof window !== 'undefined' ? window.location.origin : ''}/ref/${config.atlantaLocal.userReferralCode || 'ATLANTA2026'}`}
                currentReferrals={config.atlantaLocal.userReferralCount || 0}
                tiers={config.atlantaLocal.referralTiers}
                onShare={(platform) => {
                  // TODO: Implement analytics tracking
                  // trackEvent('referral_shared', { platform, referralCode: config.atlantaLocal?.userReferralCode });
                  const code = config.atlantaLocal?.userReferralCode || 'ATLANTA2026';
                  const link = `${typeof window !== 'undefined' ? window.location.origin : ''}/ref/${code}`;
                  if (platform === 'facebook') {
                    window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`);
                  } else if (platform === 'twitter') {
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=Check out this amazing service!`);
                  }
                }}
              />
            </section>
          )}

          {config.atlantaLocal.localPresence && (
            <section className="container mx-auto px-4 py-16 bg-gray-50">
              <LocalPresence localPresence={config.atlantaLocal.localPresence} />
            </section>
          )}
        </>
      )}

      <EmailSignup 
        title={config.content.emailSignup.title}
        subtitle={config.content.emailSignup.subtitle}
        placeholder={config.content.emailSignup.placeholder}
        buttonText={config.content.emailSignup.buttonText}
      />
    </main>
  );
}
