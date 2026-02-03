import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, Calendar } from 'lucide-react';

interface HeaderProps {
  logo: string;
  items: Array<{ text: string; href: string; children?: Array<{ text: string; href: string }> }>;
  accountMenu: Array<{ text: string; href: string }>;
  primaryColor: string;
}

export const Header = ({ logo, items, accountMenu, primaryColor }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-display font-bold" style={{ color: primaryColor }}>
              {logo}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {items.map((item) => (
              <div
                key={item.text}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.text)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`transition-colors duration-200 font-medium ${
                    location.pathname === item.href
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.text}
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.text && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.text}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {child.text}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Account Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {accountMenu.map((item) => {
              const Icon = item.text === 'Bookings' ? Calendar : User;
              return (
                <Link
                  key={item.text}
                  to={item.href}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.text}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t"
          >
            {items.map((item) => (
              <div key={item.text} className="py-2">
                <Link
                  to={item.href}
                  className={`block px-4 py-2 transition-colors ${
                    location.pathname === item.href
                      ? 'bg-gray-100 text-gray-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.text}
                </Link>
                {item.children && (
                  <div className="pl-6 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.text}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t mt-4 pt-4 space-y-2">
              {accountMenu.map((item) => (
                <Link
                  key={item.text}
                  to={item.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};
