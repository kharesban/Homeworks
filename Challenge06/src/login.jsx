// src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./MyContext";

function Login() {
  const [user, setUser] = useState("");
  const [contra,setContra] =useState("")
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    const fakeUser = {
      user: user,
      contra:contra
    };


    if(user==="admin" && contra === "123"){
        login(fakeUser)
        navigate("/dashboard");
    }else{
      alert("Email o contraseña incorrecta.")
      return
    }
  
  };

  return (
      <div>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={user}
          onChange={(e) => setUser(e.target.value)}
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
      </div>
    
  );
}

export default Login;