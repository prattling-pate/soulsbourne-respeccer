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

function assignBasicSkills(defaultSkillPoints, basicSkillsScale, levels) {
    let solution = [...defaultSkillPoints];
    const total = sum(basicSkillsScale);
    for (let i=0; i<solution.length; i++) {
        solution[i] += Math.round(basicSkillsScale[i] / total * levels);
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
