
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './MyContext.jsx'
import { TasksProvider } from './TasksContext.jsx'


createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <TasksProvider>
      <App/>
    </TasksProvider>
    
  </AuthProvider>

   
)
