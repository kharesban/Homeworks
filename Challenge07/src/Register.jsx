// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [contra,setContra] =useState("")
  const navigate = useNavigate();


  const handleRegister = async() => {
    try{
      await createUserWithEmailAndPassword(auth,email,contra)
      navigate("/Login")
    }catch(error){
      alert(error.message)
    }
  
  };

  return (
      <div>
        <h2>Registro novo usuarinho</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contraseña"
          value={contra}
          onChange={(e) => setContra(e.target.value)}
        />

        <button onClick={handleRegister}>
          Crear Sesion
        </button>
      </div>
    
  );
}

export default Register;