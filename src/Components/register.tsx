import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [contra, setContra] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, contra);
      navigate("/Login");
    } catch (error: any) {
      alert(error.message);
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
        type="password"
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