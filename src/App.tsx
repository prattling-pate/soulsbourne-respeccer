import { useState } from "react";
import "./App.css";
import getGame from "./games";
import Settings from "./Settings";
import getDefaultUserInput from "./user-input";
import UserInput from "./UserInput";

function App() {
  const [currentGame, setCurrentGame] = useState(getGame("Dark Souls 1"));
  const userInput = getDefaultUserInput(currentGame.name);
  return (
    <div className="App">
      <h1>{`Soulsbourne Respeccer - ${currentGame.name}`}</h1>
      <UserInput game={currentGame.name} skillNames={currentGame.skillNames} skills={userInput.skills}/>
      <Settings setGameSelected={setCurrentGame} />
    </div>
  );
}

export default App;
