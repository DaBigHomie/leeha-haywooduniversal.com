import { useState } from 'react';
import { Play, Award, Clock, Users, Star, CheckCircle, Lock } from 'lucide-react';
import type { DigitalCourse } from '../../types/digital-products';

interface DigitalCourseCardProps extends DigitalCourse {
  onEnroll: () => void;
}

export function DigitalCourseCard({
  title,
  subtitle,
  price,
  originalPrice,
  thumbnail,
  previewVideoUrl,
  instructor,
  modules,
  includes,
  rating = 4.9,
  totalStudents = 1250,
  totalLessons,
  totalDuration,
  certificate = true,
  onEnroll
}: DigitalCourseCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
      {/* Left: Course Preview */}
      <div className="space-y-6">
        {/* Video/Image Preview */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
          {showPreview && previewVideoUrl ? (
            <video
              className="w-full aspect-video object-cover"
              controls
              autoPlay
              src={previewVideoUrl}
            />
          ) : (
            <>
              <img
                src={thumbnail}
                alt={title}
                className="w-full aspect-video object-cover"
              />
              {previewVideoUrl && (
                <button
                  onClick={() => setShowPreview(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors"
                >
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
                    <Play size={40} className="text-gray-900 ml-2" />
                  </div>
                </button>
              )}
            </>
          )}

          {/* Course Stats Overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
              Digital Course
            </span>
            {discount > 0 && (
              <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <Play size={24} className="text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{totalLessons}</p>
            <p className="text-sm text-gray-600">Lessons</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <Clock size={24} className="text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{totalDuration}</p>
            <p className="text-sm text-gray-600">Content</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <Users size={24} className="text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Students</p>
          </div>
        </div>

        {/* Instructor */}
        <div className="p-6 bg-white rounded-xl border-2 border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Your Instructor</p>
          <div className="flex items-center space-x-4">
            <img
              src={instructor.photo}
              alt={instructor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-gray-900 text-lg">{instructor.name}</p>
              <p className="text-sm text-gray-600">{instructor.credentials}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-900">{rating}</span>
                <span className="text-sm text-gray-500">instructor rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Course Details */}
      <div className="space-y-6">
        {/* Title & Price */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-lg text-gray-600 mb-4">{subtitle}</p>

          <div className="flex items-baseline space-x-3">
            <span className="text-5xl font-bold text-gray-900">${price}</span>
            {originalPrice && (
              <span className="text-2xl text-gray-500 line-through">${originalPrice}</span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            One-time payment • Lifetime access • 30-day money-back guarantee
          </p>
        </div>

        {/* What's Included */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
          <h3 className="font-bold text-gray-900 mb-4">This course includes:</h3>
          <div className="space-y-3">
            {includes.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <Icon size={20} className="text-blue-600" />
                  <span className="text-gray-700">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enroll Button */}
        <button
          onClick={onEnroll}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
        >
          Enroll Now - Start Learning
        </button>

        {/* Certificate Badge */}
        {certificate && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center space-x-3">
            <Award size={24} className="text-yellow-600" />
            <div>
              <p className="font-semibold text-gray-900">Certificate of Completion</p>
              <p className="text-sm text-gray-600">Share on LinkedIn & social media</p>
            </div>
          </div>
        )}

        {/* Course Curriculum */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Course Curriculum</h3>
          <div className="space-y-2">
            {modules.map((module) => (
              <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {module.isLocked ? (
                      <Lock size={20} className="text-gray-400" />
                    ) : (
                      <Play size={20} className="text-blue-600" />
                    )}
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{module.title}</p>
                      <p className="text-sm text-gray-600">
                        {module.lessons} lessons • {module.duration}
                      </p>
                    </div>
                  </div>
                  <span className={`
                    transition-transform
                    ${expandedModule === module.id ? 'rotate-180' : ''}
                  `}>
                    ▼
                  </span>
                </button>

                {expandedModule === module.id && (
                  <div className="p-4 pt-0 border-t border-gray-200">
                    <div className="space-y-2">
                      {[...Array(module.lessons)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle size={16} className="text-green-600" />
                          <span>Lesson {i + 1}: {module.title} Part {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
