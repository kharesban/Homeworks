import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./MyContext";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [contra, setContra] = useState<string>("");
  const navigate = useNavigate();
 const { login } = useContext(AuthContext) as any;

  const handleLogin = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, contra);
        login({email})
        navigate("/menu");
    } catch (error: any) {
        alert(error.message);
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
        type="password"
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
          style={{ color: "#007bff" }}> Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

export default Login;