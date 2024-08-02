// This event listener is used to show/hide the grades or floats input fields based on the selected scale type
document.getElementById("scaleType").addEventListener("change", function() {
    const scaleType = document.getElementById("scaleType").value;
    if (scaleType === "grades") {
        $(".grades").show();
        $(".floats").hide();
    }
    else {
        $(".grades").hide();
        $(".floats").show();
    }
})

// These event listeners form a two-way binding between the range and number input fields for the level input
document.getElementById("levelInputRange").addEventListener("input", function() {
    document.getElementById("levelInputNumber").value = document.getElementById("levelInputRange").value;
})

document.getElementById("levelInputNumber").addEventListener("input", function() {
    document.getElementById("levelInputRange").value = document.getElementById("levelInputNumber").value;
})

// ensure that level split range and number inputs are in the range (0 <= x <= 100)
document.getElementById("levelInputNumber").addEventListener("change", function() {
    if (document.getElementById("levelInputNumber").value < 0) {
        document.getElementById("levelInputNumber").value = 0;
    }
    if (document.getElementById("levelInputNumber").value > 100) {
        document.getElementById("levelInputNumber").value = 100;
    }
})

const updateLevels = function() {
    const totalLevels = parseInt(document.getElementById("levelInput").value);
    const damagingSkillsPercentage = Math.round(parseFloat(document.getElementById("levelInputRange").value));
    const damagingSkillsPoints = Math.round(totalLevels * damagingSkillsPercentage / 100);
    const nonDamagingSkillsPoints = totalLevels - damagingSkillsPoints;
    document.getElementById("damageSkillInput").value = damagingSkillsPoints.toString();
    document.getElementById("miscSkillInput").value = nonDamagingSkillsPoints.toString();
}

const updateSplit = function() {
    const damagingSkillsPoints = parseInt(document.getElementById("damageSkillInput").value);
    const nonDamagingSkillsPoints = parseInt(document.getElementById("miscSkillInput").value);
    const totalLevels = damagingSkillsPoints + nonDamagingSkillsPoints;
    const damagingSkillsPercentage = Math.round(damagingSkillsPoints * 100 / totalLevels);
    document.getElementById("levelInput").value = totalLevels.toString();
    document.getElementById("levelInputRange").value = damagingSkillsPercentage.toString();
    document.getElementById("levelInputNumber").value = damagingSkillsPercentage.toString();
}

// calculate the split levels on the fly
document.getElementById("levelInput").addEventListener("input", updateLevels)
document.getElementById("levelInputRange").addEventListener("input", updateLevels)
document.getElementById("levelInputNumber").addEventListener("input", updateLevels)
document.getElementById("damageSkillInput").addEventListener("input", updateSplit)
document.getElementById("miscSkillInput").addEventListener("input", updateSplit)
