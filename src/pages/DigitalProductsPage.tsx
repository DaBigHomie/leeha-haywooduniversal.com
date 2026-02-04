import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, FileText, GraduationCap, Users, ArrowRight } from 'lucide-react';
import type { SiteConfig } from '../shared/types/config';

interface DigitalProductsPageProps {
  config: SiteConfig;
}

export function DigitalProductsPage({ config }: DigitalProductsPageProps) {
  const hasDigitalProducts = config.digitalProducts;

  if (!hasDigitalProducts) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-gray-600">Digital products will be available soon.</p>
        </div>
      </div>
    );
  }

  const products = [
    {
      icon: Users,
      title: 'Inner Circle Membership',
      description: 'Join our exclusive community with monthly masterclasses, legal resources, and networking opportunities.',
      value: '$49-$197/mo',
      link: '/membership',
      color: 'from-yellow-400 to-orange-500',
      available: !!(config.digitalProducts && config.digitalProducts.membershipTiers?.length)
    },
    {
      icon: GraduationCap,
      title: 'Online Courses',
      description: 'Comprehensive video courses on legal topics. Learn at your own pace with expert instruction and lifetime access.',
      value: '$197-$497',
      link: '/courses',
      color: 'from-blue-600 to-purple-600',
      available: !!(config.digitalProducts && config.digitalProducts.courses?.length)
    },
    {
      icon: BookOpen,
      title: 'Legal Guides',
      description: 'Downloadable PDF guides on divorce, immigration, business law, and more. Written by experienced attorneys.',
      value: '$49 each',
      link: '/legal-guides',
      color: 'from-green-600 to-teal-600',
      available: !!(config.digitalProducts && config.digitalProducts.legalGuides?.length)
    },
    {
      icon: FileText,
      title: 'Document Templates',
      description: 'Professional legal templates you can customize. Contracts, agreements, and forms for various needs.',
      value: '$47-$197',
      link: '/templates',
      color: 'from-purple-600 to-pink-600',
      available: !!(config.digitalProducts && config.digitalProducts.documentTemplates?.length)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            >
              <GraduationCap size={20} />
              <span className="text-sm font-semibold">
                Empower Your Legal Knowledge
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Legal Education & Resources
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-blue-100"
            >
              Boss up your legal knowledge with courses, guides, and templates
              from experienced attorneys.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/membership"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                Join Inner Circle
              </Link>
              <Link
                to="/courses"
                className="px-8 py-4 bg-blue-700 text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-all border-2 border-white/30"
              >
                Browse Courses
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Path
            </h2>
            <p className="text-lg text-gray-600">
              Whether you're looking for ongoing support or one-time resources,
              we have options to fit your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    relative bg-white rounded-2xl shadow-xl overflow-hidden
                    ${!product.available ? 'opacity-60' : 'hover:shadow-2xl'}
                    transition-shadow
                  `}
                >
                  <div className={`h-2 bg-gradient-to-r ${product.color}`} />
                  
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon size={32} className="text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {product.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.value}
                      </span>
                      
                      {product.available ? (
                        <Link
                          to={product.link}
                          className={`
                            flex items-center space-x-2 px-6 py-3 
                            bg-gradient-to-r ${product.color}
                            text-white rounded-lg font-semibold
                            hover:opacity-90 transition-opacity
                          `}
                        >
                          <span>Explore</span>
                          <ArrowRight size={20} />
                        </Link>
                      ) : (
                        <span className="px-6 py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {!product.available && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                      Coming Soon
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose Our Digital Products?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Attorney-Created',
                  description: 'All content created and reviewed by licensed attorneys with years of experience.'
                },
                {
                  title: 'Practical & Actionable',
                  description: 'Real-world guidance you can apply immediately to your situation.'
                },
                {
                  title: 'Lifetime Access',
                  description: 'Buy once, access forever. Including all future updates and improvements.'
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
