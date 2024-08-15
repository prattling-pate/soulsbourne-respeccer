type skillNames = string[] | null;

type softCaps = number[][] | null | {standard : number[], magical : number[]};

type game = {
    name : string,
    basicSkillsName : skillNames,
    damageSkillsName : skillNames,
    specialSkillNames : skillNames,
    basicSoftCaps : softCaps,
    damageSoftCaps : softCaps,
    specialSoftCaps : softCaps
};

const darkSouls1 : game = {
    name : "Dark Souls 1",
    basicSkillsName : ['Vitality', 'Attunement', 'Endurance', 'Resistance'],
    damageSkillsName : ['Strength', 'Dexterity', 'Intelligence', 'Faith'],
    specialSkillNames : null,
    damageSoftCaps : {standard: [1, 20, 40, 99], magical : [1, 30, 50, 99]},
    basicSoftCaps : [[]],
    specialSoftCaps : null 
};

// fix the names and soft caps of each game later
const darkSouls2 : game = {
    name : "Dark Souls 2",
    basicSkillsName : ['Vigor', 'Endurance', 'Vitality', 'Attunement'],
    damageSkillsName : ['Strength', 'Dexterity', 'Intelligence', 'Faith'],
    specialSkillNames : ['Adaptability'],
    damageSoftCaps : {standard: [1, 20, 40, 99], magical : [1, 30, 50, 99]},
    basicSoftCaps : [[20, 50, 99]],
    specialSoftCaps : [[20, 50, 99]]
};

const darkSouls3 : game = {
    name : "Dark Souls 3",
    basicSkillsName : ['Vigor', 'Attunement', 'Endurance', 'Vitality'],
    damageSkillsName : ['Strength', 'Dexterity', 'Intelligence', 'Faith', 'Luck'],
    specialSkillNames : null,
    damageSoftCaps : {standard: [1, 40, 60, 99], magical : [1, 40, 60, 99]},
    basicSoftCaps : [[27, 40, 99]],
    specialSoftCaps : null
};

const eldenRing : game = {
    name : "Elden Ring",
    basicSkillsName : ['Vigor', 'Willpower', 'Endurance', 'Strength', 'Dexterity'],
    damageSkillsName : ['Intelligence', 'Faith'],
    specialSkillNames : ['Spirit'],
    damageSoftCaps : {standard: [1, 40, 60, 99], magical : [1, 40, 60, 99]},
    basicSoftCaps : [[20, 40, 99]],
    specialSoftCaps : [[20, 40, 99]]
};

export function getGame(gameName : string) : game {
    switch(gameName) {
        case 'Dark Souls 1':
            return darkSouls1;
        case 'Dark Souls 2':
            return darkSouls2;
        case 'Dark Souls 3':
            return darkSouls3;
        case 'Elden Ring':
            return eldenRing;
        default:
            return darkSouls1;
    }
}