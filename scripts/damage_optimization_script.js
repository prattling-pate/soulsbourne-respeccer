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
        if (softCapLocations[i] <= skillPoints && skillPoints < softCapLocations[i+1]) return 0.5**(i+1)
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
        if (damageRatings[i] > damageRatings[maxI] || skillPoints[maxI] >= 99) maxI = i;
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
            levels -= requirementI - defaultSkills[i];
        }
    }
    if (levels < 0) throw new Error("Build is not feasible!");
    while (levels > 0) {
        let skill = getGreatestChangeSkill(weapon, floats, x);
        x[skill]++;
        levels--;
    }
    return x;
}

function getValueListFromDivClass(className, asNumber) {
    let list = [];
    $("." + className).each(function() {
        if (asNumber) list.push(Number($(this).val()));
        else list.push($(this).val());
    })
    return list;
}

function getNumberFromElement(elementId) {
    const number = Number($("#" + elementId).val());
    if (isNaN(number)) throw new Error("Please enter a valid number.");
    return number;
}

function getDefaultSkills() {
    const defaultSkills = getValueListFromDivClass("initialStats.damage", asNumber=true); 
    return defaultSkills;
}

function getLevels() {
    const levels = getNumberFromElement("damageSkillInput");
    return levels;
}

function getGrades(gradeType) {
    let grades = [];
    if (gradeType === "float") {
        grades = getValueListFromDivClass("grades", asNumber=true);
    }
    else {
        grades = getValueListFromDivClass("grades", asNumber=false);
    }
    return grades;
}

function getWeapon() {
    const weapon = {
        grades : getGrades($("#scaleType").val()),
        requirements : getValueListFromDivClass("requirements", asNumber=true),
        physicalDamage : getNumberFromElement("physicalDamage"),
        magicDamage : getNumberFromElement("magicDamage")
    };
    return weapon;
}

function setOutputSkills(solution) {
    $(".output.damage").each(function() {
        $(this).val(solution.shift());
    })
}

$("#respecButton").on("click", function() {
    try {
        let defaultSkills = getDefaultSkills();
        let levels = getLevels();
        let weapon = getWeapon();
        const float = $("#scaleType").val() === "float";
        var solution = maximiseDamage(weapon, defaultSkills, levels, float);
    }
    catch (error) {
        alert(error.message);
        return;
    }
    setOutputSkills(solution);
})
