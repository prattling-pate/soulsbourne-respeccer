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
document.getElementById("levelInputRange").addEventListener("change", function() {
    document.getElementById("levelInputNumber").value = document.getElementById("levelInputRange").value;
})

document.getElementById("levelInputNumber").addEventListener("change", function() {
    document.getElementById("levelInputRange").value = document.getElementById("levelInputNumber").value;
})

document.getElementById("levelInput").addEventListener("change", function() {
    const element = document.getElementById("levelInput");
    if (element.value < element.min) {
        element.value = element.min;
    }
    if (element.value > element.max) {
        element.value = element.max;
    }
})

// ensure that level split range and number inputs are in the range (0 <= x <= 100)
document.getElementById("levelInputNumber").addEventListener("change", function() {
    const element = document.getElementById("levelInputNumber");
    if (element.value < element.min) {
        element.value = element.min;
    }
    if (element.value > element.max) {
        element.value = element.max;
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
document.getElementById("levelInput").addEventListener("change", updateLevels)
document.getElementById("levelInputRange").addEventListener("change", updateLevels)
document.getElementById("levelInputNumber").addEventListener("change", updateLevels)
document.getElementById("damageSkillInput").addEventListener("change", updateSplit)
document.getElementById("miscSkillInput").addEventListener("change", updateSplit)


// hide/show the basic skill ranking based on toggle checkbox
document.getElementById("toggleBasicRespec").addEventListener("change", function() {
    if (document.getElementById("toggleBasicRespec").checked) {
        $(".basicSkills").show();
    }
    else {
        $(".basicSkills").hide();
    }
})

document.getElementById("toggleInstructions").addEventListener("change", function() {
    if (document.getElementById("toggleInstructions").checked) {
        $(".instructions").show();
    }
    else {
        $(".instructions").hide();
    }
})

// update the maximum value for level input based on the initial stats of the player
$(".initialStats").on("change", function() {
    let sum = 0;
    $('input.initialStats').each(function() {
        const maxValue = $(this).val();
        if (maxValue) {
            sum += parseInt(maxValue);
        }
    });
    const maxLevel = 99*8 - sum;
    document.getElementById("levelInput").max = maxLevel;
})
