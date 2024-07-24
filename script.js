/**
    * Function which returns the gradient of the piece-wise function
    * encoding "soft caps" on skills provided (skillPoints)on the soft 
    * cap splits provided (softCapLocations).
    * @param {Number[]} skillPoints  
    * @param {Number[]} softCapLocations     
*/
function getSoftCapGradient(skillPoints, softCapLocations) {
    if (skillPoints >= 99) return 0;
    for (let i=0; i < softCapLocations.length - 1; i++) {
        if (softCapLocations[i] <= skillPoints < softCapLocations[i+1]) return 0.5**(i+1)
    }
}

/**
    * Function which translates the user inputted scaling grades into
    * workable float values.
    * @param {String[]} grades
*/
function convertLetterGradesToFloat(grades) {
    let gradesToFloats = {"S": 1.7, "A": 1.195, "B": 0.87, "C": 0.62, "D": 0.37, "E": 0.125, "F": 0};
    for (let i=0; i < grades.length; i++) {
        grades[i] = gradesToFloats[grades[i]];
    }
    return grades;
}

/**
    * Returns the index of the skill with the greatest partial 
    * derivative of the damage output function.
    * @param {Object} weapon 
    * @param {Boolean} floats 
    * @param {Array[Number] skillPoints 
*/
function getGreatestChangeSkill(weapon, floats, skillPoints) {
    let damageRatings = [...weapon.grades];
    if (!floats) damageRatings = convertLetterGradesToFloat(damageRatings)
    let maxI = 0;
    for (let i=0; i < damageRatings.length; i++) {
        if (i<2) {
            damageRatings[i] *= getSoftCapGradient(skillPoints[i],
                [1, 10, 20, 40, 99]) * weapon.physicalDamage;
        }
        else {
            damageRatings[i] *= getSoftCapGradient(skillPoints[i],
                [1, 10, 30, 50, 99]) * weapon.magicDamage;
        }
        if (damageRatings[i] > damageRatings[maxI]) maxI = i;
    }
    return maxI;
}

/**
    * Returns the vector of skills which optimal damage.
    * @param {Object} weapon
    * @param {Number} levels 
    * @param {Array[Number]} defaultSkills 
    * @param {boolean} [floats=false] 
*/
function maximiseDamage(weapon, defaultSkills, levels, floats=false) {
    let x = [...defaultSkills];
    for (let i=0; i < x.length; i++) {
        let requirementI = weapon.requirements[i];
        if (requirementI > x[i]) {
            x[i] = requirementI;
            levels -= x[i];
        }
        if (levels < 0) throw new Error("Build is not feasible!");
        while (levels > 0) {
            let skill = getGreatestChangeSkill(weapon, floats, x);
            x[skill]++;
            levels--;
        }
    }
    return x;
}

function getDefaultSkills() {
    const defaultSkills = [parseInt(document.getElementById("skillOne").value),
        parseInt(document.getElementById("skillTwo").value),
        parseInt(document.getElementById("skillThree").value),
        parseInt(document.getElementById("skillFour").value)];
    return defaultSkills;
}

function getLevels() {
    const levels = parseInt(document.getElementById("levelInput").value);
    return levels;
}

function getWeapon() {
    const weapon = {
        grades : [document.getElementById("skillOneGrade").value,
            document.getElementById("skillTwoGrade").value,
            document.getElementById("skillThreeGrade").value,
            document.getElementById("skillFourGrade").value],
        requirements : [parseInt(document.getElementById("skillOneRequirement").value),
            parseInt(document.getElementById("skillTwoRequirement").value),
            parseInt(document.getElementById("skillThreeRequirement").value),
            parseInt(document.getElementById("skillFourRequirement").value)],
        physicalDamage : parseInt(document.getElementById("physicalDamage").value),
        magicDamage : parseInt(document.getElementById("magicDamage").value)
    };
    return weapon;
}

function setOutputSkills(solution) {
    document.getElementById("skillOneOutput").value = solution[0];
    document.getElementById("skillTwoOutput").value = solution[1];
    document.getElementById("skillThreeOutput").value = solution[2];
    document.getElementById("skillFourOutput").value = solution[3];
}

document.getElementById("respecButton").onclick = () => {
    let defaultSkills = getDefaultSkills();
    let levels = getLevels();
    let weapon = getWeapon();
    const solution = maximiseDamage(weapon, defaultSkills, levels);
    setOutputSkills(solution);
}
