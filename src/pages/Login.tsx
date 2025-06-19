import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "../components/Login.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });

     
      alert(response.data.message);

      
      localStorage.setItem("authToken", response.data.token);


      login(response.data.token);
      navigate("/home");
    } catch (error: unknown) {
      
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data?.error || "Erro ao fazer login");
      } else {
        alert("Erro ao fazer login");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDAÇÃO EMAIL E SENHA
    if (!email.endsWith("@hotmail.com") &&
        !email.endsWith("@gmail.com")) {
      alert("O email deve ser um endereço de email válido.");
      return;
    }
 


    handleLogin(email, password);
  };

  return (
    
     <div>
      {}
      <img src={logo} alt="Logo Arcadia Games" className="logo-image" />
      <div className="title"></div>
      <form onSubmit={handleSubmit}>
        <input
          className="input input-large"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="input input-large"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
        />
        <p><button className="button-large" type="submit">
          Entrar
        </button></p>

        <p><button className="button-large" type="button" onClick={() => navigate("/users")}>
          Cadastrar
        </button></p>

      </form>
    </div>
  );
};

export default Login;