import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import type { FooterContent } from '../../types/config';

interface FooterProps {
  content: FooterContent;
  variant?: number;
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook,
  Twitter,
  LinkedIn: Linkedin,
};

export const Footer = ({ content }: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">{content.businessName}</h3>
            <p className="text-gray-400">{content.tagline}</p>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {content.socialLinks.map((link) => {
                const Icon = socialIcons[link.platform];
                return Icon ? (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label={link.platform}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ) : null;
              })}
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {content.legalLinks.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {content.businessName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
