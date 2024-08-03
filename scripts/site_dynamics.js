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
    const totalLevels = getNumberFromElement("levelInput");
    const damagingSkillsPercentage = Math.round(getNumberFromElement("levelInputRange"));
    const damagingSkillsPoints = Math.round(totalLevels * damagingSkillsPercentage / 100);
    const nonDamagingSkillsPoints = totalLevels - damagingSkillsPoints;
    $("#damageSkillInput").val(damagingSkillsPoints.toString());
    $("#miscSkillInput").val(nonDamagingSkillsPoints.toString());
}

const updateSplit = function() {
    const damagingSkillsPoints = getNumberFromElement("damageSkillInput");
    const nonDamagingSkillsPoints = getNumberFromElement("miscSkillInput");
    const totalLevels = damagingSkillsPoints + nonDamagingSkillsPoints;
    const damagingSkillsPercentage = Math.round(damagingSkillsPoints * 100 / totalLevels);
    $("#levelInput").val(totalLevels.toString());
    $("#levelInputRange").val(damagingSkillsPercentage.toString());
    $("#levelInputNumber").val(damagingSkillsPercentage.toString());
}

// calculate the split levels on the fly
$("#levelInput").on("change", updateLevels)
$("#levelInputRange").on("input", updateLevels)
$("#levelInputNumber").on("change", updateLevels)
$("#damageSkillInput").on("change", updateSplit)
$("#miscSkillInput").on("change", updateSplit)


// hide/show the basic skill ranking based on toggle checkbox
$("#toggleBasicRespec").on("change", function() {
    if ($("#toggleBasicRespec").prop("checked")) {
        $(".basicSkills").show();
    }
    else {
        $(".basicSkills").hide();
    }
})

$("#toggleInstructions").on("change", function() {
    if ($("#toggleInstructions").prop("checked")) {
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
    $("#levelInput").attr("max", maxLevel);
})
