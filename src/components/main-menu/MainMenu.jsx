import React, { useContext } from 'react'
import { GameContext } from '../../context/GameContext'
import Button from '../button/Button'

const MainMenu = ({ win, setWin, pokemon1, pokemon2, fetchPokemon1, fetchPokemon2, setLogs, setPokemon1HP, setPokemon2HP, setDmgNum }) => {

    const { setGameStart, setPokemon1, setPokemon2, winsNumber, setWinsNumber } = useContext(GameContext)

    const handleNewGame = () => {
      setWin({win: false, pokemon: ""})
      setLogs([])
      setPokemon1({})
      setPokemon2({})
      setDmgNum({dmg: "", pokemon: ""})
      fetchPokemon1()
      fetchPokemon2()
      setWinsNumber({num: 0, pokemon: ""})
    }

    const handleHome = () => {
      setWin({win: false, pokemon: ""})
      setDmgNum({dmg: "", pokemon: ""})
      setLogs([])
      setPokemon1({})
      setPokemon2({})
      setGameStart(false)
      setWinsNumber({num: 0, pokemon: ""})
    }

    const handleNewOponnent = () => {
      if(win.pokemon === pokemon1) {
        setPokemon1(pokemon1)
        setPokemon1HP(win.pokemon.stats[0].base_stat)
        setWin({win: false, pokemon: ""})
        setDmgNum({dmg: "", pokemon: ""})
        setLogs([])
        setPokemon2({})
        fetchPokemon2()
        setWinsNumber({num: winsNumber.num + 1, pokemon: 1})
      } else if (win.pokemon === pokemon2) {
          setPokemon2(pokemon2)
          setPokemon2HP(win.pokemon.stats[0].base_stat)
          setWin({win: false, pokemon: ""})
          setDmgNum({dmg: "", pokemon: ""})
          setLogs([])
          setPokemon1({})
          fetchPokemon1()
          setWinsNumber({num: winsNumber.num + 1, pokemon: 2})
      } else {
        return
      }
    }

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