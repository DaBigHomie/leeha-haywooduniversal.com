import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Palette } from 'lucide-react';
import { siteVariants } from '../../config/variants.config';
import { baseConfig } from '../../config/base.config';
import type { SiteConfig } from '../../types/config';

interface VariantSwitcherProps {
  currentVariant: string;
  onVariantChange: (variantId: string) => void;
}

export function VariantSwitcher({ currentVariant, onVariantChange }: VariantSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const allVariants = [
    { id: 'base', name: baseConfig.name, businessType: baseConfig.businessType },
    ...Object.entries(siteVariants).map(([key, config]: [string, SiteConfig]) => ({
      id: key,
      name: config.name,
      businessType: config.businessType,
    })),
  ];

  const current = allVariants.find(v => v.id === currentVariant) || allVariants[0];

  return (
    <div className="fixed top-24 right-4 z-40">
      <div className="relative">
        {/* Trigger Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-lg rounded-lg px-4 py-3 flex items-center gap-2 hover:shadow-xl transition-shadow border border-gray-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Palette className="w-5 h-5 text-gray-600" />
          <div className="text-left">
            <div className="text-xs text-gray-500 font-medium">Switch Template</div>
            <div className="text-sm font-semibold text-gray-900">{current.name}</div>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />
              
              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-[70vh] overflow-y-auto z-50"
              >
                <div className="p-3 border-b border-gray-200 bg-gray-50 sticky top-0">
                  <h3 className="text-sm font-semibold text-gray-700">Choose a Template</h3>
                  <p className="text-xs text-gray-500 mt-1">20 business variations available</p>
                </div>
                
                <div className="p-2">
                  {allVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => {
                        onVariantChange(variant.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-colors mb-1 ${
                        variant.id === currentVariant
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-semibold text-sm ${
                            variant.id === currentVariant ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {variant.name}
                          </div>
                          <div className={`text-xs ${
                            variant.id === currentVariant ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {variant.businessType}
                          </div>
                        </div>
                        {variant.id === currentVariant && (
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="p-3 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                  <p className="text-xs text-gray-500 text-center">
                    Selection saved automatically
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
