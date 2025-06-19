import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Games.css";

const Games = () => {
  const [inputText, setInputText] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<{ id: number; name: string; price: number } | null>(null);
  const navigate = useNavigate(); 

 
  const searchGame = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/games?name=${inputText}`);
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
      <h1>Buscar Jogos</h1>
      <div className="search-bar">
        <input
          className="input-large"
          placeholder="Digite o nome do jogo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="button-large" onClick={searchGame}>
          Buscar
              </button>
              <button onClick={() => navigate("/home")}>Home</button>
      </div>

      {game ? (
        <div className="game-item">
          <p>Nome: {game.name}</p>
          <p>Preço: R$ {game.price.toFixed(2)}</p>
        </div>
      ) : (
        <p>Nenhum jogo encontrado. Faça uma busca.</p>
      )}
    </div>
  );
};

export default Games;