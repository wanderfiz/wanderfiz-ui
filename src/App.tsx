import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import { logger } from './utils/logger'

function App() {
  logger.info('App component rendered')

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Additional routes will be added here */}
      </Routes>
    </Layout>
  )
}

export default App
