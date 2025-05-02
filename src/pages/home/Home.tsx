import { ReactElement } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';


const Home = (): ReactElement => {
  return (
    <div className='home-container'>
        <h1>Quem sou eu?</h1>
        <Link to="/jogo" className='btn-start'>Jogar</Link>
    </div>
  )
}

export default Home