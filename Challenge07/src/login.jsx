// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [contra,setContra] =useState("")
  const navigate = useNavigate();


  const handleLogin = async() => {
    try{
      await signInWithEmailAndPassword(auth,email,contra)
      navigate("/dashboard")
    }catch(error){
      alert(error.message)
    }
  
  };

  return (
      <div>
        <h2>Login</h2>

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

        <button onClick={handleLogin}>
          Ingresar
        </button>
         <p style={{ textAlign: "center", marginTop: "15px" }}>
        ¿No tienes una cuenta?{" "}
        <Link 
          to="/registro" 
          style={{ color: "#007bff"}}> Regístrate aquí
        </Link>
      </p>
      </div>
    
  );
}

export default Login;