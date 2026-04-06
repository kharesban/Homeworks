import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";  
import Login from "./login";
import Menu from "./dashboard";
import Stack from "./Challenge4/listado";
import AgregarLibros from "./Challenge4/verLibros";
import AgregarPersonas from "./Challenge5/VerCola";
import Queues from "./Challenge5/QuequeP";
import Register from "./Register";
const Icola = new Queues();


function cargarMocks(pila) {
    const librosMock = [
        {
            nombre: "El principito",
            isbn: 9788478887194,
            autor: "Antoine de Saint-Exupéry",
            editorial: "Salamandra"
        },
        {
            nombre: "1984",
            isbn: 9780451524935,
            autor: "George Orwell",
            editorial: "Secker & Warburg"
        },
        {
            nombre: "Don Quijote de la Mancha",
            isbn: 9788420412146,
            autor: "Miguel de Cervantes",
            editorial: "Alfaguara"
        }
    ];

    librosMock.forEach(libro => {
        pila.push(libro);
    });

    pila.print();
}
    
const pila = new Stack();
cargarMocks(pila);



function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register/>}/>

        {/* Rutas Privadas */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/Challenge04" 
          element={
            <PrivateRoute>
              <AgregarLibros pilas={pila} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/Challenge05" 
          element={
            <PrivateRoute>
              <AgregarPersonas cola={Icola } />
            </PrivateRoute>
          } 
        />


      </Routes>
      
    </Router>
  );
}

export default App;