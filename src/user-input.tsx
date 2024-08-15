type weapon = {
  requirements: number[];
  scaling: number[] | string[];
  damages: {
    [key : string]: number;
  };
};

export type userInput = {
  skills: number[];
  basicSkillScaling: number[] | string[];
  weapon: weapon;
};

export default function getDefaultUserInput(game: string): userInput {
  switch (game) {
    case "Dark Souls 1":
      return {
        skills: [10, 10, 10, 10, 10, 10, 10, 10],
        basicSkillScaling: ["F", "F", "F", "F"],
        weapon: {
          requirements: [10, 10, 10, 10],
          scaling: ["F", "F", "F", "F"],
          damages: { physical: 0, magical: 0, fire: 0, lightning: 0 },
        },
      };
    case "Dark Souls 2":
      return {
        skills: [10, 10, 10, 10, 10, 10, 10, 10, 10],
        basicSkillScaling: ["F", "F", "F", "F"],
        weapon: {
          requirements: [0, 0, 0, 0],
          scaling: [0, 0, 0, 0],
          damages: { physical: 0, magical: 0, fire: 0, lightning: 0 },
        },
      };
    case "Dark Souls 3":
      return {
        skills: [10, 10, 10, 10, 10, 10, 10, 10, 10],
        basicSkillScaling: ["F", "F", "F", "F", "F"],
        weapon: {
          requirements: [0, 0, 0, 0],
          scaling: [0, 0, 0, 0],
          damages: { physical: 0, magical: 0, fire: 0, lightning: 0 },
        },
      };
    case "Elden Ring":
      return {
        skills: [10, 10, 10, 10, 10, 10, 10, 10],
        basicSkillScaling: ["F", "F", "F"],
        weapon: {
          requirements: [10, 10, 10, 10, 10],
          scaling: [0, 0, 0, 0, 0],
          damages: { physical: 0, magical: 0, fire: 0, lightning: 0 },
        },
      };
    default:
      return {
        skills: [10, 10, 10, 10, 10, 10, 10, 10],
        basicSkillScaling: ["F", "F", "F", "F"],
        weapon: {
          requirements: [0, 0, 0, 0],
          scaling: [0, 0, 0, 0],
          damages: { physical: 0, magical: 0, fire: 0, lightning: 0 },
        },
      };
  }
}
