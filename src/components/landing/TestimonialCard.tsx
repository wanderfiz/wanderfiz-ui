import React from 'react'
import GlassCard from '../ui/GlassCard'

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  rating,
  avatar
}) => {
  return (
    <GlassCard className="p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        {/* Star Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="relative flex-grow">
        <svg className="absolute -top-2 -left-2 w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="relative text-gray-700 italic pl-6">
          {content}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center mt-6 pt-4 border-t border-gray-200/50">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF561D]/20 to-[#0ea5e9]/20 flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-lg font-semibold text-gray-600">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>
        <div className="ml-3">
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
    </GlassCard>
  )
}

export default TestimonialCard