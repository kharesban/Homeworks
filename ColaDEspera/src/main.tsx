import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AgregarPersonas from './VerCola.tsx'
import Queues from './QuequeP.tsx'

const Icola = new Queues();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <AgregarPersonas cola={Icola}/>
  </StrictMode>,
)
