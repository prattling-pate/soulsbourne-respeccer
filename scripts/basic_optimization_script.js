// function gets the ranking of basic skills from the html of the webpage
// assigns each scale a float which emphasizes how many things to add to it (or something)
function getRankingOfBasicSkills() {
    let basicSkills = [];
    $(".skillMiscRank").each(function() {
        basicSkills.push($(this).val());
    });
    return basicSkills;
}

function getLevelsForBasicSkills() {
    return getNumberFromElement("miscSkillInput");
}

function sum(list) {
    return list.reduce((a, b) => a + b, 0);
}

function getGreatestChangeBasicSkill(basicSkillsScale, solution) {
    let maxI = 0;
    let basicSkillRating = [...basicSkillsScale];
    // matrix of soft caps is used as each basic skills' soft cap
    // is different
    const softCaps = [[1,30,50,99], [1,50,99],[1,40,99],[1,15,30,99]];
    for (let i=0; i < basicSkillsScale.length; i++) {
        basicSkillRating[i] *= getSoftCapGradient(solution[i], softCaps[i]);
        if (basicSkillRating[i] > basicSkillRating[maxI] || solution[maxI] >= 99) maxI = i;
    }
    return maxI;
}

function assignBasicSkills(defaultSkillPoints, basicSkillsScale, levels) {
    let solution = [...defaultSkillPoints];
    while (levels > 0) {
        const skill = getGreatestChangeBasicSkill(basicSkillsScale, solution)
        solution[skill]++;
        levels--;
    }
    return solution;
}

function outputBasicSkills(solution) {
    $(".output.misc").each(function() {
        $(this).val(solution.shift());
    });
}

function getBasicDefaultSkillPoints() {
    return getValueListFromDivClass("initialStats.misc", asNumber=true);
}

$("#respecButton").on("click", function() {
    let basicSkillsScale = getRankingOfBasicSkills();
    basicSkillsScale = convertLetterGradesToFloat(basicSkillsScale); 
    const levels = getLevelsForBasicSkills();
    const defaultSkillPoints = getBasicDefaultSkillPoints();
    const solution = assignBasicSkills(defaultSkillPoints, basicSkillsScale, levels);
    outputBasicSkills(solution);
})
