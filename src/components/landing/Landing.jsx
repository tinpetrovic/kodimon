import React, { useContext } from 'react'
import { logo, kodi } from "../../assets/index"
import { GameContext } from '../../context/GameContext'
import Button from '../button/Button'

const Landing = () => {

  const { setGameStart } = useContext(GameContext);

  return (
    <div className='landing-cont'>
      <div className='logo-container'>
        <img src={logo} alt="kodimon logo text" />
        <img src={kodi} alt="kodimon logo" className='logo-img' />
      </div>
      <Button click={() => setGameStart(true)}>New Game</Button>
    </div>
  )
}

export default Landing