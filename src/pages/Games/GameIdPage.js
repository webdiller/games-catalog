import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchGames } from "../../store/slices/gamesSlice";
import { useSelector, useDispatch } from 'react-redux'

export default function GameIdPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { games } = useSelector(state => state.gamesSlice);
  const dispatch = useDispatch();
  const [currentGame, currentGameSet] = useState(null);

  useEffect(() => {
    if (games.length === 0) {
      dispatch(fetchGames());
    }
  }, [games, dispatch]);

  useEffect(() => {
    if (games.length > 0) {
      const findedGame = games.find(game => {
        return location.pathname.startsWith(`/${game.id}`);
      });
      currentGameSet(findedGame)
    }
  }, [games, location])

  return (
    <div className="game">
      <div className="game__wrapper">
        <button onClick={() => navigate('/')} className="ui-btn game__back">На главную</button>
        {currentGame ? (
          <h1 className="game__title">{currentGame.title}</h1>
        ) : (
          <div>{currentGame?.title || "Данной игры не найдено"}</div>
        )}
      </div>
    </div>
  )
}
