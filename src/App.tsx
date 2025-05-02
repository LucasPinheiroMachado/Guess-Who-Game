import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import GameSelect from './pages/gameSelect/GameSelect';
import Game from './pages/game/Game';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jogo" element={<GameSelect />} />
      <Route path="/jogar" element={<Game />} />
    </Routes>
  )
}

export default App
