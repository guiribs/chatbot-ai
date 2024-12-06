import N8NChatbot from './components/N8NChatbot'
import { getApiUrl } from './config/api'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-center">Chatbot Demo</h1>
      </header>
      
      <N8NChatbot 
        apiUrl={getApiUrl()}
        title="Chatbot Demo"
      />
    </div>
  )
}

export default App