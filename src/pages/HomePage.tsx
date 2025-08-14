import React from 'react'
import { logger } from '../utils/logger'

const HomePage: React.FC = () => {
  logger.debug('HomePage component rendered')

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to Wanderfiz
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Your AI-powered trip planning companion
      </p>
      
      {/* Placeholder for future components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Plan Trips</h3>
          <p className="text-gray-600">Create amazing travel itineraries</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>
          <p className="text-gray-600">Get personalized suggestions</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Share Experiences</h3>
          <p className="text-gray-600">Connect with fellow travelers</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
