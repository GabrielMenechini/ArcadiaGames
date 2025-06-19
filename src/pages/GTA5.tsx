import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



const GTA5 = () => {
  const { name } = useParams(); 
  const [game, setGame] = useState<{ name: string; price: number; } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:3000/games/GTA5${name}`);
        setGame(data); 
      } catch (err) {
        console.error("Erro ao buscar jogo:", err);
        setError("Jogo não encontrado.");
      } finally {
        setLoading(false);
      }
      if (game) {
        return (
          <div>
            <h1>{game.name}</h1>
            <p>Price: ${game.price}</p>
          
          </div>
        );
      }
    
      return <div>Jogo não encontrado.</div>;
    };

    fetchGame();
  }, [name]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

};

export default GTA5;