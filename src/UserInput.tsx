import "./UserInput.css";
import { VBlock, HBlock } from "./utility/blocks";
import { userInput } from "./user-input";

function LevelInput({
  game,
  skillNames,
  skillObj,
  userInput,
  setUserInput,
}: {
  game: string;
  skillNames: string[] | null;
  skillObj: { id: number; value: number }[];
  userInput: userInput;
  setUserInput: any;
}) {
  const header = <h2>Level Input</h2>;
  const levelTable = (
    <table>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        {skillObj.map((skill: any) => (
          <tr key={skill.id}>
            <td>
              <img
                src={`./images/${game.replace(/\s/g, "_").toLowerCase()}/skill${
                  skill.id + 1
                }.png`}
                alt={
                  skillNames
                    ? `${skillNames[skill.id]} Sprite`
                    : `Skill ${skill.id + 1} Sprite`
                }
              />
              <label htmlFor={`skill${skill.id + 1}`}>
                {skillNames ? skillNames[skill.id] : `Skill ${skill.id + 1}`}
              </label>
            </td>
            <td>
              <input
                id={`skill${skill.id + 1}`}
                type="number"
                defaultValue={skill.value}
                onChange={(e) => {
                  const newUserInput = { ...userInput };
                  newUserInput.skills[skill.id] = parseInt(e.target.value);
                  setUserInput(newUserInput);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return (
    <div className="LevelInput">
      <VBlock children={[header, levelTable]} />
    </div>
  );
}

function WeaponInput({
  userInput,
  setUserInput,
  damageSkillsNames,
	game
}: {
  userInput: userInput;
  setUserInput: any;
  damageSkillsNames: string[] | null;
	game: string;
}) {
  const requirementScalingObjects = userInput.weapon.requirements.map(
    (requirement: number, i: number) => ({
      id: i,
      value: requirement,
      scaling: userInput.weapon.scaling[i],
    })
  );
  const header = <h2>Weapon Input</h2>;
  const getScalingJSX = (scaling: number | string, i: number) => {
    if (typeof scaling === "number") {
      return (
        <input
          type="number"
          defaultValue={scaling}
          onChange={(e) => {
            const newUserInput = { ...userInput };
            newUserInput.weapon.scaling[i] = parseInt(e.target.value);
            setUserInput(newUserInput);
          }}
        />
      );
    } else {
      return (
        <select
          defaultValue={scaling}
          onChange={(e) => {
            const newUserInput = { ...userInput };
            newUserInput.weapon.scaling[i] = e.target.value;
            setUserInput(newUserInput);
          }}
        >
          <option value="F">-</option>
          <option value="S">S</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
      );
    }
  };
  const requirementScalingTable = (
    <table>
      <thead>
        <tr>
          <th>Requirement</th>
          <th>Scaling</th>
        </tr>
      </thead>
      <tbody>
        {requirementScalingObjects.map(
          (requirement: {
            id: number;
            value: number;
            scaling: number | string;
          }) => (
            <tr key={requirement.id}>
              <td>
								<img
                src={`./images/${game.replace(/\s/g, "_").toLowerCase()}/skill${
                  requirement.id + 1
                }.png`}
                alt={
                  damageSkillsNames
                    ? `${damageSkillsNames[requirement.id]} Sprite`
                    : `Skill ${requirement.id + 1} Sprite`
                } />
                <label htmlFor={`Skill ${requirement.id + 1}`}>
                  {damageSkillsNames
                    ? damageSkillsNames[requirement.id]
                    : `Skill ${requirement.id + 1}`}
                </label>
              </td>
              <td>
                <input
                  type="number"
                  id={`Skill ${requirement.id + 1}`}
                  defaultValue={requirement.value}
                  onChange={(e) => {
                    const newUserInput = { ...userInput };
                    newUserInput.weapon.requirements[requirement.id] = parseInt(
                      e.target.value
                    );
                    setUserInput(newUserInput);
                  }}
                />
              </td>
              <td>{getScalingJSX(requirement.scaling, requirement.id)}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
  const damageTable = (
    <table>
      <thead>
        <tr>
          <th>Damage</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(userInput.weapon.damages).map(
          ([damageType, damageValue]) => (
            <tr key={damageType}>
              <td>{damageType[0].toLocaleUpperCase() + damageType.slice(1)}</td>
              <td>
                <input
                  type="number"
                  defaultValue={damageValue}
                  onChange={(e) => {
                    const newUserInput = { ...userInput };
                    newUserInput.weapon.damages[damageType] = parseInt(
                      e.target.value
                    );
                    setUserInput(newUserInput);
                  }}
                />
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
  return (
    <VBlock
      children={[
        header,
        <HBlock children={[requirementScalingTable, damageTable]} />,
      ]}
    />
  );
}

function BasicSkillInput({
  userInput,
  setUserInput,
  basicSkillsNames,
	game
}: {
  userInput: userInput;
  setUserInput: any;
  basicSkillsNames: string[] | null;
	game: string;
}) {
  const header = <h2>Basic Skill Input</h2>;
  const basicSkillScalingObjects = userInput.basicSkillScaling.map(
    (scaling: number | string, i: number) => ({
      id: i,
      value: scaling,
    })
  );
  const basicSkillTable = (
    <table>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Scaling</th>
        </tr>
      </thead>
      <tbody>
        {basicSkillScalingObjects.map(
          (scaling: { id: number; value: string | number }, i: number) => (
            <tr key={scaling.id}>
              <td>
								<img
                src={`./images/${game.replace(/\s/g, "_").toLowerCase()}/skill${
                  scaling.id + 1
                }.png`}
                alt={
                  basicSkillsNames
                    ? `${basicSkillsNames[scaling.id]} Sprite`
                    : `Skill ${scaling.id + 1} Sprite`
                }
              />
                <label htmlFor={`basicSkill${i + 1}`}>
                  {basicSkillsNames
                    ? basicSkillsNames[scaling.id]
                    : `Skill ${i + 1}`}
                </label>
              </td>
              <td>
                <select
                  defaultValue={scaling.value}
                  id={`basicSkill${i + 1}`}
                  onChange={(e) => {
                    const newUserInput = { ...userInput };
                    newUserInput.basicSkillScaling[i] = e.target.value;
                    setUserInput(newUserInput);
                  }}
                >
                  <option value="F">-</option>
                  <option value="S">S</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
  return (
    <VBlock children={[header, <HBlock children={[basicSkillTable]} />]} />
  );
}

export default function UserInput({
  game,
  skillNames,
  userInput,
  setUserInput,
  basicSkillsNames,
  damageSkillsNames,
}: {
  game: string;
  skillNames: string[] | null;
  userInput: userInput;
  setUserInput: any;
  basicSkillsNames: string[] | null;
  damageSkillsNames: string[] | null;
}) {
  const skillObj = userInput.skills.map((skill: number, i: number) => ({
    id: i,
    value: skill,
  }));
  const levelInput = (
    <LevelInput
      game={game}
      skillNames={skillNames}
      skillObj={skillObj}
      userInput={userInput}
      setUserInput={setUserInput}
    />
  );
  const weaponInput = (
    <WeaponInput
      userInput={userInput}
      setUserInput={setUserInput}
      damageSkillsNames={damageSkillsNames}
			game={game}
    />
  );
  const basicSkillInput = (
    <BasicSkillInput
      userInput={userInput}
      setUserInput={setUserInput}
      basicSkillsNames={basicSkillsNames}
			game={game}
    />
  );
  return (
    <div className="UserInput">
      <h1>User Input</h1>
      <HBlock children={[levelInput, weaponInput, basicSkillInput]} />
    </div>
  );
}
