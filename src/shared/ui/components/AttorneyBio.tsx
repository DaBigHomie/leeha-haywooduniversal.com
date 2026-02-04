import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Shield } from 'lucide-react';
import type { AttorneyBio as AttorneyBioType } from '../../types/config';

interface AttorneyBioProps {
  attorney: AttorneyBioType;
  variant?: 'full' | 'compact';
}

export function AttorneyBio({ attorney, variant = 'full' }: AttorneyBioProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={attorney.photo}
              alt={attorney.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{attorney.name}</h3>
            <p className="text-lg text-blue-600 mb-4">{attorney.title}</p>
            <p className="text-gray-700 mb-4">{attorney.approach}</p>
            <div className="flex flex-wrap gap-2">
              {attorney.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Meet Your Attorney
          </h2>
          <p className="text-lg text-gray-600">
            Experience, dedication, and results you can trust
          </p>
        </motion.div>
      </div>

      {/* Main Bio Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="grid md:grid-cols-5 gap-0">
          {/* Photo Section */}
          <div className="md:col-span-2 relative">
            <div className="aspect-[3/4] md:h-full">
              <img
                src={attorney.photo}
                alt={attorney.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <Shield size={32} className="text-blue-600" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">Years of Experience</p>
                  <p className="text-2xl font-bold text-blue-600">{attorney.experience}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:col-span-3 p-8 md:p-12">
            <div className="space-y-6">
              {/* Name & Title */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {attorney.name}
                </h3>
                <p className="text-xl text-blue-600 font-semibold">{attorney.title}</p>
              </div>

              {/* Approach */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <Briefcase size={20} className="mr-2 text-blue-600" />
                  Our Approach
                </h4>
                <p className="text-gray-700 leading-relaxed">{attorney.approach}</p>
              </div>

              {/* Credentials */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <GraduationCap size={20} className="mr-2 text-blue-600" />
                  Credentials & Bar Admissions
                </h4>
                <ul className="space-y-2">
                  {attorney.credentials.map((credential, index) => (
                    <li key={index} className="flex items-start">
                      <Award size={16} className="mr-2 mt-1 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  Areas of Practice
                </h4>
                <div className="flex flex-wrap gap-2">
                  {attorney.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust Signals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
            <Award size={32} className="text-white" />
          </div>
          <h5 className="font-bold text-gray-900 mb-2">Board Certified</h5>
          <p className="text-sm text-gray-600">Recognized expert in the field</p>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
            <Shield size={32} className="text-white" />
          </div>
          <h5 className="font-bold text-gray-900 mb-2">Client-Focused</h5>
          <p className="text-sm text-gray-600">Your goals are our priority</p>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
            <Briefcase size={32} className="text-white" />
          </div>
          <h5 className="font-bold text-gray-900 mb-2">Proven Results</h5>
          <p className="text-sm text-gray-600">Track record of success</p>
        </div>
      </motion.div>
    </div>
  );
}
