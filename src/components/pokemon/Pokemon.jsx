import React, { useEffect } from "react"
import { ProgressBar } from "react-bootstrap"


const Pokemon = ({ pokemon, pokemonHP, setPokemonHP, loseHP, dmgNum, attackAnimation, winsNumber }) => {
    const a = pokemon.stats && pokemon.stats.slice(0, 3)
    const b = pokemon.stats && pokemon.stats.slice(5, 6)
    const statsToDisplay = pokemon.stats && [...a, ...b]


    useEffect(() => {
        setPokemonHP((pokemonHP - loseHP).toFixed(2))
        if(pokemonHP <= 0) {
            setPokemonHP(0)
        }
    }, [loseHP])

    const getPokemonPercentage = () => {
        const maxHP = pokemon.stats && pokemon.stats[0].base_stat
         return Math.round(pokemonHP / maxHP * 100)
    }

  return (
    <div className='main-pokemon'>
        <div>
            { dmgNum.pokemon === 1 && <p className="pokemon1-dmg">{dmgNum.dmg}</p> }
            { dmgNum.pokemon === 2 && <p className="pokemon2-dmg">{dmgNum.dmg}</p> }
            
            <p className={ getPokemonPercentage() < 50 && getPokemonPercentage() >= 30 ? "pokemon-hp-percent pokemon-hp-percent-danger" : getPokemonPercentage() < 30 ? "pokemon-hp-percent pokemon-hp-percent-low" : "pokemon-hp-percent"}>{pokemon && getPokemonPercentage()}%</p>
            <ProgressBar className={getPokemonPercentage() < 50 && getPokemonPercentage() >= 30 ? "progress-wrap-danger mb-2" : getPokemonPercentage() < 30 ? "progress-wrap-low mb-2" : "progress-wrap mb-2"} now={pokemonHP} max={pokemon.stats && pokemon.stats[0].base_stat} />
        </div>
        <h3 className="pokemon-name">{pokemon.name} <span>{winsNumber.num > 0 && winsNumber.num}</span> </h3>
        <img src={pokemon.sprites && pokemon.sprites.front_default} alt="pokemon" className={attackAnimation.pokemon === 1 ? "pokemon1-attack-img pokemon-img" : attackAnimation.pokemon === 2 ? "pokemon2-attack-img pokemon-img" : "pokemon-img"} />
        <div className="pokemon-stats">
            <h3>Stats</h3>
            <div className="pokemon-stats__wrapper">
                {
                    pokemon.stats && statsToDisplay.map((stat, i) => {
                        return (
                            <h4 key={i} className="pokemon-stats__text">{stat.stat.name}: {stat.base_stat}</h4>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Pokemon