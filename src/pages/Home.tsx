import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Home.css"; 
import "../assets/gta5-cover.png"
import gta5Cover from "../assets/gta5-cover.png";


const Home = () => {
  const [inputText, setInputText] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<{ id: number; name: string; price: number } | null>(null);
  const navigate = useNavigate(); 

  
  const searchGame = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/games/${inputText}`);
      setGame(data); 

      
      navigate(`/games/${data.name}`);
    } catch (error) {
      console.error("Erro ao buscar jogo:", error);
      alert("Jogo não encontrado.");
      setGame(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {}
      <header className="header">
        <div className="search-bar">
          <input
            className="input-large"
            type="text"
            placeholder="Digite o nome do jogo"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="button-large" onClick={searchGame}>
            Buscar
                  </button>
                  <button onClick={() => navigate("/games")}>Games</button>
        </div>
      </header>

      {}
      <div className="content">
        <h1>Jogos em Destaque</h1>
        {game ? (
          <div className="game-item">
            <p>Nome: {game.name}</p>
            <p>Preço: R$ {game.price.toFixed(2)}</p>
          </div>
        ) : (
          <p>Faça uma busca para encontrar jogos.</p>
        )}
    {}
    <div className="game-cover" onClick={() => navigate("/games/GTA5")}>
    <img
  src={gta5Cover}
  alt="Capa do GTA 5"
  className="game-cover-image"
/>
        </div>

      </div>
    </div>
  );
};

export default Home;