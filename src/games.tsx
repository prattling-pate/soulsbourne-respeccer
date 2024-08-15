type skillNames = string[] | null;

type softCaps = number[][] | null | { standard: number[]; magical: number[] };

type game = {
  name: string;
  skillNames: skillNames;
  basicSkillsNames: skillNames;
  damageSkillsNames: skillNames;
  specialSkillNames: skillNames;
  basicSoftCaps: softCaps;
  damageSoftCaps: softCaps;
  specialSoftCaps: softCaps;
};

const darkSouls1: game = {
  name: "Dark Souls 1",
  skillNames: [
    "Vitality",
    "Attunement",
    "Endurance",
    "Strength",
    "Dexterity",
    "Resistance",
    "Intelligence",
    "Faith",
  ],
  basicSkillsNames: ["Vitality", "Attunement", "Endurance", "Resistance"],
  damageSkillsNames: ["Strength", "Dexterity", "Intelligence", "Faith"],
  specialSkillNames: null,
  damageSoftCaps: { standard: [1, 20, 40, 99], magical: [1, 30, 50, 99] },
  basicSoftCaps: [
    [1, 30, 50, 99],
    [1, 50, 99],
    [1, 40, 99],
    [1, 15, 30, 99],
  ],
  specialSoftCaps: null,
};

// fix the names and soft caps of each game later
const darkSouls2: game = {
  name: "Dark Souls 2",
  skillNames: [
    "Vigor",
    "Endurance",
    "Vitality",
    "Attunement",
    "Strength",
    "Dexterity",
    "Adaptability",
    "Intelligence",
    "Faith",
  ],
  basicSkillsNames: ["Vigor", "Endurance", "Vitality", "Attunement"],
  damageSkillsNames: ["Strength", "Dexterity", "Intelligence", "Faith"],
  specialSkillNames: ["Adaptability"],
  damageSoftCaps: { standard: [1, 20, 40, 99], magical: [1, 30, 50, 99] },
  basicSoftCaps: [[20, 50, 99]],
  specialSoftCaps: [[20, 50, 99]],
};

const darkSouls3: game = {
  name: "Dark Souls 3",
  skillNames: [
    "Vigor",
    "Attunement",
    "Endurance",
    "Vitality",
    "Strength",
    "Dexterity",
    "Intelligence",
    "Faith",
    "Luck",
  ],
  basicSkillsNames: ["Vigor", "Attunement", "Endurance", "Vitality"],
  damageSkillsNames: ["Strength", "Dexterity", "Intelligence", "Faith", "Luck"],
  specialSkillNames: null,
  damageSoftCaps: { standard: [1, 40, 60, 99], magical: [1, 40, 60, 99] },
  basicSoftCaps: [[27, 40, 99]],
  specialSoftCaps: null,
};

const eldenRing: game = {
  name: "Elden Ring",
  skillNames: [
    "Vigor",
    "Mind",
    "Endurance",
    "Strength",
    "Dexterity",
    "Intelligence",
    "Faith",
    "Arcane",
  ],
  basicSkillsNames: ["Vigor", "Mind", "Endurance"],
  damageSkillsNames: ["Strength", "Dexterity", "Intelligence", "Faith", "Arcane"],
  specialSkillNames: null,
  damageSoftCaps: { standard: [1, 40, 60, 99], magical: [1, 40, 60, 99] },
  basicSoftCaps: [[20, 40, 99]],
  specialSoftCaps: [[20, 40, 99]],
};

export default function getGame(gameName: string): game {
  switch (gameName) {
    case "Dark Souls 1":
      return darkSouls1;
    case "Dark Souls 2":
      return darkSouls2;
    case "Dark Souls 3":
      return darkSouls3;
    case "Elden Ring":
      return eldenRing;
    default:
      return darkSouls1;
  }
}
