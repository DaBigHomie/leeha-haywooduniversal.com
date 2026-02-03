import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: string;
}

export const Hero = ({ title, subtitle, ctaText, backgroundImage }: HeroProps) => {
  const variant = 1;
  // Different layout variations based on variant number
  const getVariantStyles = () => {
    switch (variant % 5) {
      case 1:
        return 'text-center justify-center items-center';
      case 2:
        return 'text-left justify-start items-start';
      case 3:
        return 'text-right justify-end items-end';
      case 4:
        return 'text-center justify-end items-center';
      default:
        return 'text-center justify-center items-center';
    }
  };

  return (
    <section className="relative h-[600px] lg:h-[700px] flex overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col ${getVariantStyles()}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            {subtitle}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
          >
            {ctaText}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
