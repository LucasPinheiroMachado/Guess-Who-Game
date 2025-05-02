import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import './GameSelect.css';

import Cards from '../../components/card/Card';

// Importação das imagens
import player01 from '../../assets/img/01.webp';
import player02 from '../../assets/img/02.webp';
import player03 from '../../assets/img/03.webp';
import player04 from '../../assets/img/04.webp';
import player05 from '../../assets/img/05.webp';
import player06 from '../../assets/img/06.webp';
import player07 from '../../assets/img/07.webp';
import player08 from '../../assets/img/08.webp';
import player09 from '../../assets/img/09.webp';
import player10 from '../../assets/img/10.webp';
import player11 from '../../assets/img/11.webp';
import player12 from '../../assets/img/12.webp';
import player13 from '../../assets/img/13.webp';
import player14 from '../../assets/img/14.webp';
import player15 from '../../assets/img/15.webp';
import player16 from '../../assets/img/16.webp';
import player17 from '../../assets/img/17.webp';
import player18 from '../../assets/img/18.webp';
import player19 from '../../assets/img/19.webp';
import player20 from '../../assets/img/20.webp';
import player21 from '../../assets/img/21.webp';

const players: string[] = [
  player01, player02, player03, player04, player05,
  player06, player07, player08, player09, player10,
  player11, player12, player13, player14, player15,
  player16, player17, player18, player19, player20,
  player21
];

const playersName: string[] = [
  'Caio', 'Sophia', 'Jonas', 'Ricardo',
  'Sérgio', 'Ana', 'Jonathan', 'Victoria',
  'Lucas', 'Julia', 'William', 'Michel',
  'Cesar', 'Laura', 'Sônia', 'Yara', 'João',
  'Cassia', 'Isabela', 'Carlos', 'Mauricio'
];

const GameSelect = (): ReactElement => {
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number | null>(null);

  const handlePlayerSelect = (index: number) => {
    setSelectedPlayerIndex(index);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });  
  };

  return (
    <div className='game-container'>
      <div className='select-character'>
        <h1>Selecione seu <span className='break-line'></span> personagem:</h1>
        {selectedPlayerIndex !== null && (
          <div className='selected-player-info'>
            <div className='selected-player-content'>
              <img 
                src={players[selectedPlayerIndex]} 
                alt={`Player ${selectedPlayerIndex + 1}`} 
                className='selected-player-image'
              />
              <div className='selected-player-details'>
                <h2>Você selecionou: <span>{playersName[selectedPlayerIndex]}</span></h2>
                <Link to='/jogar' state={{players: players, playersName: playersName, selectedPlayerIndex: selectedPlayerIndex}} className='btn-play'>Confirmar</Link>
              </div>
            </div>
          </div>
        )}
        <div className='characters-container'>
          <Cards 
            players={players} 
            playersName={playersName}
            onCardClick={handlePlayerSelect}
            selectedPlayerIndex={selectedPlayerIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default GameSelect;