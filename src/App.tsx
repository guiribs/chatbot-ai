import HomePage from './pages/HomePage'
import N8NChatbot from './components/N8NChatbot'
import { getApiUrl } from './config/api'
import './App.css'

function App() {
  return (
    <>
      <HomePage />
      <N8NChatbot 
        apiUrl={getApiUrl()}
        title="ChatWise.ai"
      />
    </>
  )
}

export default App