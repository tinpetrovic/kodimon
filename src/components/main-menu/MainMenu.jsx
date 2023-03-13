import React, { useContext } from 'react'
import { GameContext } from '../../context/GameContext'
import Button from '../button/Button'

const MainMenu = ({ win, setWin, pokemon1, pokemon2, fetchPokemon1, fetchPokemon2, setLogs, setPokemon1HP, setPokemon2HP, setDmgNum, setTurn1 }) => {

    const { setGameStart, setPokemon1, setPokemon2} = useContext(GameContext)

    const handleNewGame = () => {
      setWin({win: false, pokemon: ""});
      setLogs([]);
      setPokemon1({});
      setPokemon2({});
      setTurn1(0);
      setDmgNum({dmg: "", pokemon: ""});
      fetchPokemon1();
      fetchPokemon2();
    };

    const handleHome = () => {
      setWin({win: false, pokemon: ""});
      setDmgNum({dmg: "", pokemon: ""});
      setLogs([]);
      setPokemon1({});
      setPokemon2({});
      setTurn1(0);
      setGameStart(false);
    };

    const handleNewOponnent = () => {
      if(win.pokemon === pokemon1) {
        setPokemon1(pokemon1);
        setPokemon1HP(win.pokemon.stats[0].base_stat);
        setWin({win: false, pokemon: ""});
        setTurn1(0);
        setDmgNum({dmg: "", pokemon: ""});
        setPokemon2({});
        fetchPokemon2();
        
      } else if (win.pokemon === pokemon2) {
          setPokemon2(pokemon2);
          setPokemon2HP(win.pokemon.stats[0].base_stat);
          setWin({win: false, pokemon: ""});
          setTurn1(0);
          setDmgNum({dmg: "", pokemon: ""});
          setPokemon1({});
          fetchPokemon1();
          
      } else {
        return
      }
    };

  return (
    <div className='main-menu'>
        <h3>Menu</h3>
        <div className='main-menu-wrap'>
            <Button styles="main-menu-btn" click={handleHome}>Home</Button>
            <Button styles="main-menu-btn" click={handleNewGame}>New Game</Button>
            <Button styles="main-menu-btn" click={handleNewOponnent} disabled={!win.pokemon} >New Opponent</Button>
        </div>
    </div>
  )
}

export default MainMenu