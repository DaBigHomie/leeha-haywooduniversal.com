import type { SiteConfig } from '../shared/types/config';

interface ServicesPageProps {
  config: SiteConfig;
}

export function ServicesPage({ config }: ServicesPageProps) {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-display text-center mb-8">Our Services</h1>
      <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
        {config.content.hero.subtitle}
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {config.content.services.map((service, index) => (
          <div key={index} className="group">
            <div className="overflow-hidden rounded-lg mb-6">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-3xl font-display mb-3" style={{ color: config.theme.primaryColor }}>
              {service.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ServicesPage;
