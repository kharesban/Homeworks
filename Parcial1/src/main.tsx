import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MostrarPacientes } from './VerPacientes.tsx'
import { LinkedList } from './linkedList.tsx'
import { DoubleLinkedList } from './DobleLListH.tsx'
import { ListCircuMed } from './ListCircularMed.tsx'
import { VerMedicos } from './VerMedicos.tsx'
import { CircularDoubleListComite } from './DobleCircular.tsx'
import { VerComite } from './VerComite.tsx'

const ListaPacientes = new LinkedList();
const Historial = new DoubleLinkedList();
const LMedicos = new ListCircuMed();
const LCAdmin = new CircularDoubleListComite();

ListaPacientes.append({nombre: "John Alexander Galvis", id: 1});
ListaPacientes.append({nombre: "Juan Jose Hurtado", id: 2});
ListaPacientes.append({nombre: "Alejandro Molina", id: 3});
ListaPacientes.append({nombre: "Esteban Torres Yela", id: 4}); 

LMedicos.append({nombre:"Dra.Karla"})
LMedicos.append({nombre:"Dr.Michel"})
LMedicos.append({nombre:"Dra.Diana"})
LMedicos.append({nombre:"Dr.Oscar"})
LMedicos.append({nombre:"Dr.Berto"})

LCAdmin.append({nombre:"Oswaldo"})
LCAdmin.append({nombre:"Elmer"})
LCAdmin.append({nombre:"Daiver"})
LCAdmin.append({nombre:"Jhon"})





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    < MostrarPacientes losPacientes={ListaPacientes} historial={Historial} />
    <VerMedicos medicos={LMedicos}/>
    <VerComite comite={LCAdmin}/>
  </StrictMode>,
)
