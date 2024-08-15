import { useState } from "react";
import "./App.css";
import getGame from "./games";
import Settings from "./Settings";
import getDefaultUserInput from "./user-input";
import UserInput from "./UserInput";

function App() {
  const [currentGame, setCurrentGame] = useState(getGame("Dark Souls 1"));
  const [userInput, setUserInput] = useState(
    getDefaultUserInput(currentGame.name)
  );
  return (
    <div className="App">
      <h1>{`Soulsbourne Respeccer - ${currentGame.name}`}</h1>
      <UserInput
        game={currentGame.name}
        skillNames={currentGame.skillNames}
        userInput={userInput}
        setUserInput={setUserInput}
        basicSkillsNames={currentGame.basicSkillsNames}
        damageSkillsNames={currentGame.damageSkillsNames}
      />
      <Settings setGameSelected={setCurrentGame} setUserInput={setUserInput}/>
    </div>
  );
}

export default App;
