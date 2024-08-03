// function gets the ranking of basic skills from the html of the webpage
// assigns each scale a float which emphasizes how many things to add to it (or something)
function getRankingOfBasicSkills() {
    let basicSkills = {};
    $(".skillMiscRank").each(function() {
        basicSkills[$(this).attr('id')]=$(this).val();
    });
    return basicSkills;
}

function getLevelsForBasicSkills() {
    return getNumberFromElement("miscSkillInput");
}

$("#respecButton").on("click", function() {
    let basicSkillsScale = getRankingOfBasicSkills();
    basicSkillsScale = convertLetterGradesToFloat(basicSkillsScale); 
})
