import React, { createContext, useState } from 'react'

const GameContext = createContext()

const GameContextProvider = ({ children }) => {

    const [gameStart, setGameStart] = useState(false)
    const [pokemon1, setPokemon1] = useState({})
    const [pokemon2, setPokemon2] = useState({})
    const [winsNumber, setWinsNumber] = useState({num: 0, pokemon: ""})

  return (
    <GameContext.Provider value={{gameStart, setGameStart, pokemon1, setPokemon1, pokemon2, setPokemon2, winsNumber, setWinsNumber}}>
        { children }
    </GameContext.Provider>
  )
}

export {GameContext, GameContextProvider}