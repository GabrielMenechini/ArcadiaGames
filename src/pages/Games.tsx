import axios from "axios";
import { useState } from "react";

const Games = () => {
    
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);
    const [game, setGame] = useState()
    const searchGame = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get(`http://localhost:3000/games/${inputText}`);
            setGame(data)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };   
    

    if (loading) {
        return <div>Carregando...</div>;
        
    }

    return (
        <div>

            <input 
                placeholder="Digite o nome do jogo" 
                value={inputText} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)} 
            />
            <button onClick={searchGame}>Buscar</button>
            <p>Nome: {game?.name}</p>
            <p>Preço:{game?.price}</p>
        
        </div>
    );
}

export default Games;