import { useContext } from "react";
import Landing from "./components/landing/Landing";
import Main from "./components/main/Main";
import { GameContext } from "./context/GameContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/main.css";

function App() {

  const {gameStart} = useContext(GameContext)

  return (
    <div className="app">
      {
        gameStart ? <Main /> : <Landing />
      }
      
    </div>
  );
}

export default App;
