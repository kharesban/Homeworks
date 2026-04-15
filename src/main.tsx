import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './Components/MyContext'


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
      <App />
  </AuthProvider>
)