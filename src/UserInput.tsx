import "./UserInput.css";

function LevelInput({
  game,
  skillNames,
  skillObj,
}: {
  game: string;
  skillNames: string[] | null;
  skillObj: { id: number; value: number }[];
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        {skillObj.map((skill: any, index: number) => (
          <tr key={skill.id}>
            <td>
              <img
                src={`./images/${game.replace(/\s/g, "_").toLowerCase()}/skill${
                  index + 1
                }.png`}
                alt={
                  skillNames
                    ? `${skillNames[index]} Sprite`
                    : `Skill ${index + 1} Sprite`
                }
              />
              <label htmlFor={`skill${index + 1}`}>
                {skillNames ? skillNames[index] : `Skill ${index + 1}`}
              </label>
            </td>
            <td>
              <input
                id={`skill${index + 1}`}
                type="number"
                defaultValue={skill.value}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function UserInput({
  game,
  skillNames,
  skills,
}: {
  game: string;
  skillNames: string[] | null;
  skills: number[];
}) {
  // used to correctly sync the skill values with the input fields
  const skillObj = skills.map((skill: number, i: number) => ({
    id: i,
    value: skill,
  }));
  return (
    <div className="UserInput">
      <h1>User Input</h1>
      <LevelInput game={game} skillNames={skillNames} skillObj={skillObj} />
    </div>
  );
}
