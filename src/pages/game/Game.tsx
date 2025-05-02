import { ReactElement, useState, useEffect } from 'react';
import './Game.css';
import { useLocation, Link } from 'react-router-dom';
import Cards from '../../components/card/Card';

interface LocationState {
  players: string[];
  playersName: string[];
  selectedPlayerIndex: number;
}  

const Game = (): ReactElement => {
  const location = useLocation();
  const { players, playersName, selectedPlayerIndex } = location.state as LocationState;
  const [botPlayerIndex, setBotPlayerIndex] = useState<number>(() => Math.floor(Math.random() * 21));
  const [discardPlayerSelected, setDiscardPlayerSelected] = useState<number | null>(null);
  const [botPlayer, setBotPlayer] = useState<HTMLDivElement | null>(null);
  const [gameInit, setGameInit] = useState<boolean>(false);
  const [questionPlayer, setQuestionPlayer] = useState<boolean>(false);
  const [questionPlayerType, setQuestionPlayerType] = useState<string | null>(null);
  const [resultQuestionPlayer, setResultQuestionPlayer] = useState<boolean | null>(null);
  const [phraseQuestionPlayer, setPhraseQuestionPlayer] = useState<string>('');
  const [pointsBot, setPointsBot] = useState<number>(21);
  const [endGameForPlayer, setEndGameForPlayer] = useState<number>(0);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [endGameMessage, setEndGameMessage] = useState<string>('');

  // Character characteristics

  const characterCharacteristics: Array<Array<string | null | Array<string | null>>> = [
    ['Masculino', 'Azul', 'Adulto', 'Careca', null, ['Brinco']],
    ['Feminino', 'Verde', 'Adulto', 'Ruivo', null, ['Tiara']],
    ['Masculino', 'Castanho', 'Criança', 'Castanho', null, [null]],
    ['Masculino', 'Ambar', 'Adulto', 'Castanho', 'Bigode', [null]],
    ['Masculino', 'Castanho', 'Criança', 'Castanho', null, ['Óculos']],
    ['Feminino', 'Verde', 'Adulto', 'Preto', null, ['Fone']],
    ['Masculino', 'Castanho', 'Adulto', 'Castanho', null, ['Óculos', 'Toca']],
    ['Feminino', 'Castanho', 'Adulto', 'Castanho', null, ['Óculos', 'Brinco']],
    ['Masculino', 'Azul', 'Adulto', 'Loiro', null, [null]],
    ['Feminino', 'Roxo', 'Adulto', 'Roxo', null, [null]],
    ['Masculino', 'Castanho', 'Adulto', 'Castanho', 'Barba', ['Óculos']],
    ['Masculino', 'Castanho', 'Adulto', 'Preto', 'Barba', ['Boné', 'Brinco']],
    ['Masculino', 'Azul', 'Idoso', 'Branco', null, ['Boné']],
    ['Feminino', 'Castanho', 'Criança', 'Castanho', null, ['Laço de Cabelo']],
    ['Feminino', 'Castanho', 'Idoso', 'Branco', null, ['Óculos', 'Brinco']],
    ['Feminino', 'Ambar', 'Adulto', 'Preto', null, ['Brinco']],
    ['Masculino', 'Verde', 'Criança', 'Loiro', null, [null]],
    ['Feminino', 'Castanho', 'Adulto', 'Preto', null, ['Brinco']],
    ['Feminino', 'Rosa', 'Adulto', 'Branco', null, [null]],
    ['Masculino', 'Verde', 'Adulto', 'Preto', null, [null]],
    ['Masculino', 'Azul', 'Idoso', 'Careca', 'Barba', [null]]
  ]

  // Questions

  const [eyes, setEyes] = useState<string[]>(['Azul', 'Verde', 'Ambar', 'Castanho', 'Roxo', 'Rosa']);
  const [sex, setSex] = useState<string[]>(['Masculino', 'Feminino']);
  const [age, setAge] = useState<string[]>(['Criança', 'Adulto', 'Idoso']);
  const [hair, setHair] = useState<string[]>(['Branco', 'Loiro', 'Preto', 'Castanho', 'Ruivo', 'Roxo', 'Careca']);
  const [face, setFace] = useState<string[]>(['Barba', 'Bigode']);
  const [accessories, setAccessories] = useState<string[]>(['Brinco', 'Óculos', 'Boné', 'Toca', 'Fone', 'Laço de Cabelo', 'Tiara']);


  useEffect(() => {
    setBotPlayer(document.querySelector(`.character[data-index="${botPlayerIndex}"]`) as HTMLDivElement);
  }, []);

  useEffect(() => {
    if (discardPlayerSelected !== null) {
      const discardPlayer: HTMLDivElement = document.querySelector(`.character[data-index="${discardPlayerSelected}"]`) as HTMLDivElement;
      if (discardPlayer?.classList.contains('discarded')) {
        discardPlayer.classList.remove('discarded');
        setDiscardPlayerSelected(null);
        setEndGameForPlayer(endGameForPlayer - 1);
      }
      else if (discardPlayer instanceof HTMLElement) {
        discardPlayer.classList.add('discarded');
        setDiscardPlayerSelected(null);
        setEndGameForPlayer(endGameForPlayer + 1);
      }
    }
    const player = document.querySelector(`.character[data-index="${selectedPlayerIndex}"]`)
    console.log(player)
  }, [discardPlayerSelected]);

  useEffect(() => {
    if(endGameForPlayer >= 20){
      const allPlayersInGame: Array<HTMLDivElement> = Array.from(document.querySelectorAll(".character")) as HTMLDivElement[];
      let finalPlayer: HTMLDivElement | null = null;

      allPlayersInGame.forEach(player => {
        if(!player.classList.contains('discarded')) {
          finalPlayer = player;
        }
      });

      if(finalPlayer == botPlayer){
        const botName: string | null | undefined = document.querySelector(`#playerName${botPlayerIndex}`)?.textContent;
        setEndGameMessage(`Você venceu o bot era: ${botName}`);
        setEndGame(true);
      }
      else {
        const botName: string | null | undefined = document.querySelector(`#playerName${botPlayerIndex}`)?.textContent;
        setEndGameMessage(`Você perdeu o bot era: ${botName}`);
        setEndGame(true);
      }
    }
    if(pointsBot == 1) {
      const playerName: string | null | undefined = document.querySelector(`#playerName${selectedPlayerIndex}`)?.textContent;
      setEndGameMessage(`Você perdeu o Bot advinhou que você era: ${playerName}`);
      setEndGame(true);
      setBotPlayerIndex(() => Math.floor(Math.random() * 21));
    }
  }, [endGameForPlayer, pointsBot])

  const handleInit = () => {
    setGameInit(true);
    setQuestionPlayer(true);
  }

  const handlePlayerSelect = (index: number) => {
    if(gameInit) {
    setDiscardPlayerSelected(index);
    }
  };

  const handleSelectQuestion = (type: string) => {
    setQuestionPlayerType(type);
  }

  const handleBackQuestion = () => {
    if(questionPlayerType){
      setQuestionPlayerType(null);
    } else {
      setQuestionPlayer(false);
    }
  }

  const handleCheckQuestion = (type: string, question: string) => {
    let indexTypeQuestion: number | null = null;
  
    switch (type) {
      case 'sexo':
        setSex(prevSex => prevSex.filter(item => item !== question));
        indexTypeQuestion = 0;
        break;
      case 'olho':
        setEyes(prevEyes => prevEyes.filter(item => item !== question));
        indexTypeQuestion = 1;
        break;
      case 'idade':
        setAge(prevAge => prevAge.filter(item => item !== question));
        indexTypeQuestion = 2;
        break;
      case 'cabelo':
        setHair(prevHair => prevHair.filter(item => item !== question));
        indexTypeQuestion = 3;
        break;
      case 'rosto':
        setFace(prevFace => prevFace.filter(item => item !== question));
        indexTypeQuestion = 4;
        break;
      case 'acessorio':
          setAccessories(prevAccessories => prevAccessories.filter(item => item !== question));
          indexTypeQuestion = 5;
          if (indexTypeQuestion !== null) {
              const value = characterCharacteristics[botPlayerIndex][indexTypeQuestion];
              
              if (Array.isArray(value)) {
                  const found = value.some(element => element === question);
                  return found;
              }
              
              return false;
          }
          break;
      default:
        break;
    }
  
    if (indexTypeQuestion !== null) {
      const value = characterCharacteristics[botPlayerIndex][indexTypeQuestion];
      if (value === question) {
        return true;
      } else {
        return false;
      }
    }
  };
  
  const handleMakeQuestion = (questionType: string, question: string) => {
    const yes = handleCheckQuestion(questionType, question);

    if(yes){
      setPhraseQuestionPlayer(`O personagem tem ${questionType} ${question}`);
      if(questionType == 'rosto' || questionType == 'acessorio') {
        setPhraseQuestionPlayer(`O personagem tem ${question}`);
      }
      if(questionType == 'idade' || question == 'Careca') {
        setPhraseQuestionPlayer(`O personagem é ${question}`);
      }
      setResultQuestionPlayer(true);
    } else {
      setPhraseQuestionPlayer(`O personagem não tem ${questionType} ${question}`);
      if(questionType == 'rosto' || questionType == 'acessorio') {
        setPhraseQuestionPlayer(`O personagem não tem ${question}`);
      }
      if(questionType == 'idade' || question == 'Careca') {
        setPhraseQuestionPlayer(`O personagem não é ${question}`);
      }
      setResultQuestionPlayer(false);
    }
  }

  const handleOkQuestion = () => {
    setQuestionPlayerType(null);
    setQuestionPlayer(false);
    setResultQuestionPlayer(null);
    setPhraseQuestionPlayer('');
    setPointsBot(prev => {
      const newPoints = prev - (Math.floor(Math.random() * 6) + 1);
      return newPoints < 1 ? 1 : newPoints;
    });    
  }
  

  return (
    <div className='game-container'>
        <div className='game-manager'>
          <div className='buttons-game'>
            <button id='btn-init' onClick={handleInit}>{!gameInit ? 'Iniciar' : 'Perguntar'}</button>
            <button id='btn-back'> <Link to='/jogo' id='link-back'>Voltar</Link> </button>
          </div>
          <div className='oponent-stats'>
            {gameInit ? <h2 className='oponent-stats-text'>O oponente está <span className='break-line'></span> entre: {pointsBot}</h2> : <h2 className='oponent-stats-text'>O oponente está <span className='break-line'></span> aguardando</h2>}
          </div>
        </div>
        <div className='characters-container'>
          <Cards 
            players={players} 
            playersName={playersName}
            onCardClick={handlePlayerSelect}
            selectedPlayerIndex={selectedPlayerIndex}
          />
        </div>
          {questionPlayer ? 
          <div className='questions'>
            <div className='question'>
            {resultQuestionPlayer == null ? <h1>Faça uma pergunta:</h1> : <h1>A resposta é:</h1>}
            <div className='buttons-question'>

              {!questionPlayerType ?
              <>
                <button onClick={() => handleSelectQuestion('sexo')}>Sexo</button>
                <button onClick={() => handleSelectQuestion('olho')}>Olho</button>
                <button onClick={() => handleSelectQuestion('idade')}>Idade</button>
                <button onClick={() => handleSelectQuestion('cabelo')}>Cabelo</button>
                <button onClick={() => handleSelectQuestion('rosto')}>Rosto</button>
                <button onClick={() => handleSelectQuestion('acessorio')}>Acessorio</button>
              </>
              :
                null
              }

              {questionPlayerType && resultQuestionPlayer == null ?
              <>
                {questionPlayerType === 'sexo' && sex.map((option, index) => (
                  <button key={index} onClick={() => handleMakeQuestion(questionPlayerType, option)}>{option}</button>
                ))}
                {questionPlayerType === 'olho' && eyes.map((option, index) => (
                  <button key={index} onClick={() => handleMakeQuestion(questionPlayerType, option)}>{option}</button>
                ))}
                {questionPlayerType === 'idade' && age.map((option, index) => (
                  <button key={index} onClick={() => handleMakeQuestion(questionPlayerType, option)}>{option}</button>
                ))}
                {questionPlayerType === 'cabelo' && hair.map((option, index) => (
                  <button key={index} onClick={() => handleMakeQuestion(questionPlayerType, option)}>{option}</button>
                ))}
                {questionPlayerType === 'rosto' && face.map((option, index) => (
                  <button key={index} onClick={() => handleMakeQuestion(questionPlayerType, option)}>{option}</button>
                ))}
                {questionPlayerType === 'acessorio' && accessories.map((option, index) => (
                  <button key={index} onClick={() => handleMakeQuestion(questionPlayerType, option)}>{option}</button>
                ))}
              </>
              :
                null
              }

              {resultQuestionPlayer != null ? 
                <>
                <div className='resultQuestion'>
                  <p>{phraseQuestionPlayer}</p>
                  <button onClick={handleOkQuestion}>Ok</button>
                </div>
                </>
                :
                null
              }
              </div>
              {resultQuestionPlayer == null ? <><button onClick={handleBackQuestion} className='btn-question-back'>Voltar</button></> : null}
            </div>
          </div>
          :
          null
          }
          {endGame ? 
            <div className='endGame'>
              <div className='endGameContainer'>
                <h1>{endGameMessage}</h1>
                <Link to='/jogo' className='btn-start'>Jogar novamente</Link>
              </div>
            </div>
            :
            null
          }
    </div>
  )
}

export default Game