import getGame from "./games";
import getDefaultUserInput from "./user-input";

export default function Settings({ setGameSelected , setUserInput}: any) {
  return (
    <div className="Settings">
      <h2>Settings</h2>
      <label htmlFor="gameSelect">Game:</label>
      <select
        onChange={(e: any) => {setGameSelected(getGame(e.target.value))
            setUserInput(getDefaultUserInput(e.target.value));
        }}
        id="gameSelect"
      >
        <option>Dark Souls 1</option>
        <option>Dark Souls 2</option>
        <option>Dark Souls 3</option>
        <option>Elden Ring</option>
      </select>
    </div>
  );
}
