import { ReactElement } from 'react';
import './Card.css';

type CardProps = {
  players: string[];
  playersName: string[];
  onCardClick: (index: number) => void;
  selectedPlayerIndex: number | null;
};

const Cards = ({ 
  players, 
  playersName, 
  onCardClick,
  selectedPlayerIndex 
}: CardProps): ReactElement => {
  return (
    <div className='card-container'>
      {players.map((player: string, index: number): ReactElement => (
        <div 
          key={index} 
          className={`character ${selectedPlayerIndex === index ? 'selected' : ''}`}
          data-index={index}
        >
          <button onClick={() => onCardClick(index)}>
            <img src={player} alt={`Player ${index + 1}`} />
            <div className='text-card'>
              <p id={`playerName${index}`}>{playersName[index]}</p>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cards;