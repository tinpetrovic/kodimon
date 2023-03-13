import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../context/GameContext'
import MainLogs from '../main-logs/MainLogs'
import MainMenu from '../main-menu/MainMenu'
import Pokemon from '../pokemon/Pokemon'
import { arrow } from '../../assets/index'
import Button from '../button/Button'

const Main = () => {
    const { pokemon1, setPokemon1, pokemon2, setPokemon2} = useContext(GameContext);
    const [pokemon1HP, setPokemon1HP] = useState("");
    const [pokemon2HP, setPokemon2HP] = useState("");
    const [pokemon1Speed, setPokemon1Speed] = useState("");
    const [pokemon2Speed, setPokemon2Speed] = useState("");
    const [turn1, setTurn1] = useState(0);
    const [logs, setLogs] = useState([]);
    const [attackInProgress, setAttackInProgress] = useState(false);
    const [lose1HP, setLose1HP] = useState(0);
    const [lose2HP, setLose2HP] = useState(0);
    const [win, setWin] = useState({win: false, pokemon: ""});
    const [dmgNum, setDmgNum] = useState({dmg: "", pokemon: ""});
    const [attackAnimation, setAttackAnimation] = useState({animation: false, pokemon: ""});

/*     const mockupPokemon1 = "mewtwo"
    const mockupPokemon2 = "magikarp" */

    const fetchPokemon1 = async () => {
        const rnd = Math.floor((Math.random() * 151) + 1);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${rnd}`);
        const data = await res.json();
        setPokemon1({...data, pokemon_1: true});
        setPokemon1HP(data.stats[0].base_stat);
        setPokemon1Speed(data.stats[5].base_stat);
    };

    const fetchPokemon2 = async () => {
        const rnd = Math.floor((Math.random() * 151) + 1);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${rnd}`);
        const data = await res.json();
        setPokemon2({...data, pokemon_2: true});
        setPokemon2HP(data.stats[0].base_stat);
        setPokemon2Speed(data.stats[5].base_stat);
    };

    const getTurn = () => {
        const rnd = Math.floor((Math.random() * 2) + 1);
        if(pokemon1Speed > pokemon2Speed) {
            setTurn1(1);
        } else if (pokemon1Speed < pokemon2Speed) {
            setTurn1(2);
        } else {
            if (rnd === 1) {
                setTurn1(1);
            } else {
                setTurn1(2);
            }
        }
    };


    useEffect(() => {
        let ignore = false

        if (!ignore) {
            fetchPokemon1();
            fetchPokemon2();
        }
       
        return () => {
            ignore = true
        }
    }, []);

    useEffect(() => {
        setTimeout(getTurn, 1500);
        return () => {
            clearInterval(getTurn);
            setTurn1(0)
        }
    }, [pokemon1Speed, pokemon2Speed, win.win]);

    useEffect(() => {
        setLose1HP(0);
        setLose2HP(0);
    }, [pokemon1HP, pokemon2HP]);

    useEffect(() => {
        checkWin()
    }, [lose1HP, lose2HP])

    const checkWin = () => {
        if(turn1 !== 0) {
                if (pokemon1HP <= 0) {
                    setWin({win: true, pokemon: pokemon2});
                 } else if (pokemon2HP <= 0) {
                    setWin({win: true, pokemon: pokemon1});
                }   
        }    
    };

    /* LOGIC */

    const handleGameLogic = () => {
        setDmgNum({dmg: "", pokemon: ""});
        setAttackInProgress(true);
        const pokemon1Name = pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1);
        const pokemon2Name = pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1);
        const pokemon1Attack = pokemon1.stats && pokemon1.stats[1].base_stat / 2;
        const pokemon2Attack = pokemon2.stats && pokemon2.stats[1].base_stat / 2;
        let pokemon1Defence = pokemon1.stats && pokemon1.stats[2].base_stat;
        if (pokemon1Defence >= 90) {
            pokemon1Defence = 90;
        };
        let pokemon2Defence = pokemon2.stats && pokemon2.stats[2].base_stat;
        if (pokemon2Defence >= 90) {
            pokemon2Defence = 90;
        };

        const rnd = Math.floor((Math.random() * 5) +1);
        if (turn1 === 1) {
            if (rnd !== 5) {
                let damage = 0;
                let defence = pokemon2Defence / 100;
                const attack = defence * pokemon1Attack;
                damage = parseFloat((pokemon1Attack - attack).toFixed(2))
                if(damage <= 0) {
                    damage = 0;
                };
                
                setAttackAnimation({animation: true, pokemon: 1});
                setTimeout(() => {
                    setLose2HP(damage);
                    setDmgNum({dmg: `${damage} dmg!`, pokemon: 2});
                    setLogs([...logs, `${pokemon1Name} attacked ${pokemon2Name} for ${damage} dmg`]);
                }, 1000);
                
            } else {
                setAttackAnimation({animation: true, pokemon: 1});
                setTimeout(() => {
                     setDmgNum({dmg: "miss!", pokemon: 2});
                     setLogs([...logs, `${pokemon1Name} missed ${pokemon2Name}`]);
                }, 1000);
                
            }
        } else if (turn1 === 2) {
            if (rnd !== 5) {
                let damage = 0;
                let defence = pokemon1Defence / 100;
                const attack = defence * pokemon2Attack;
                damage = parseFloat((pokemon2Attack - attack).toFixed(2));
                if(damage <= 0 ) {
                    damage = 0;
                };
                setAttackAnimation({animation: true, pokemon: 2});
                setTimeout(() => {
                    setLose1HP(damage);
                    setDmgNum({dmg: `${damage} dmg!`, pokemon: 1});
                    setLogs([...logs, `${pokemon2Name} attacked ${pokemon1Name} for ${damage} dmg`]);
                }, 1000);
               
            } else {
                setAttackAnimation({animation: true, pokemon: 2});
                setTimeout(() => {
                    setDmgNum({dmg: "miss!", pokemon: 1});
                    setLogs([...logs, `${pokemon2Name} missed ${pokemon1Name}`]);
                }, 1000); 
            }
        }
        if(turn1 === 1) {
            setTurn1(2);
        } else if (turn1 === 2) {
            setTurn1(1);
        }
        setTimeout(() => {
            setAttackAnimation({animation: false, pokemon: ""});
        }, 1000);
        setAttackInProgress(false);
    };

  return (
    <main className="main">
        <div className='main-menu-pokemon'>
            <Pokemon 
                pokemon={pokemon1} 
                pokemonHP={pokemon1HP}
                setPokemonHP={setPokemon1HP} 
                loseHP={lose1HP} 
                dmgNum={dmgNum.pokemon === 1 && dmgNum}
                attackAnimation={attackAnimation.pokemon === 1 && attackAnimation}
                win={win}
            />

            <div className='attack-wrap'>
                <img src={arrow} alt="arrow" className={attackAnimation.animation ? "hidden" : pokemon1.name && pokemon2.name && turn1 === 1 ? "arrow1" : pokemon1.name && pokemon2.name && turn1 === 2 ? "arrow2" : "arrow-img"}/>
                <Button click={handleGameLogic} disabled={attackInProgress || turn1 === 0 || attackAnimation.animation} >Attack</Button>
            </div>

            <Pokemon 
                pokemon={pokemon2} 
                pokemonHP={pokemon2HP}
                setPokemonHP={setPokemon2HP} 
                loseHP={lose2HP} 
                dmgNum={dmgNum.pokemon === 2 && dmgNum}
                attackAnimation={attackAnimation.pokemon === 2 && attackAnimation}
                win={win}
            />
        </div>

        <div className='main-menu-logs-wrap'>
           { 
            win.win ? 
            <div className="modal ">
                <h2 className='modal-text'>{win.pokemon.name} won!</h2>
                <div className='modal-menu'>
                    <MainMenu 
                        win={win}
                        setWin={setWin}
                        pokemon1={pokemon1} 
                        pokemon2={pokemon2} 
                        fetchPokemon1={fetchPokemon1}
                        fetchPokemon2={fetchPokemon2}
                        setLogs={setLogs}
                        setPokemon1HP={setPokemon1HP}
                        setPokemon2HP={setPokemon2HP}
                        setDmgNum={setDmgNum}
                        setTurn1={setTurn1}
                    />
                </div>
            </div> : 
            <MainMenu 
                win={win}
                setWin={setWin}
                pokemon1={pokemon1} 
                pokemon2={pokemon2} 
                fetchPokemon1={fetchPokemon1}
                fetchPokemon2={fetchPokemon2}
                setLogs={setLogs}
                setPokemon1HP={setPokemon1HP}
                setPokemon2HP={setPokemon2HP}
                setDmgNum={setDmgNum}
                setTurn1={setTurn1}
            />
           }
            <MainLogs position={win.win && "center"} logs={logs} />
        </div>
    </main>
  )
}

export default Main