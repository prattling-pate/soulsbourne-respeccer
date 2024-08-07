// This event listener is used to show/hide the grades or floats input fields based on the selected scale type
$("#scaleType").on("change", function() {
    const scaleType = $("#scaleType").val();
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
$("#levelInputRange").on("input", function() {
    $("#levelInputDamageNumber").val($("#levelInputRange").val());
    $("#levelInputBasicNumber").val((100 - Number($("#levelInputRange").val())).toString());
})

$("#levelInputDamageNumber").on("change", function() {
    $("#levelInputRange").val($("#levelInputNumber").val());
})

$("#levelInput").on("change", function() {
    const element = $("#levelInput");
    if (element.val() < element.attr('min')) {
        element.val(element.min);
    }
    if (element.val() > element.attr('max')) {
        element.val(element.attr('max'));
    }
})

// ensure that level split range and number inputs are in the range (0 <= x <= 100)
$("#levelInputNumber").on("change", function() {
    const element = $("#levelInputNumber");
    if (element.val() < element.attr('min')) {
        element.val() = element.attr('min');
    }
    if (element.val() > element.attr('max')) {
        element.val() = element.attr('max');
    }
})

const updateLevels = function() {
    if ($(this).attr('id') === "levelInputDamageNumber") {
        const temp = 100 - Number($(this).val());
        $("#levelInputRange").val(temp.toString());
        $("#levelInputBasicNumber").val($(this).val());
    }
    else if ($(this).attr('id') === "levelInputBasicNumber") {
        $("#levelInputRange").val($(this).val());
        $("#levelInputDamageNumber").val($(this).val());
    }
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
    $("#levelInputDamageNumber").val(damagingSkillsPercentage.toString());
    $("#levelInputBasicNumber").val((100 - damagingSkillsPercentage).toString());
}

// calculate the split levels on the fly
$("#levelInput").on("change", updateLevels)
$("#levelInputRange").on("input", updateLevels)
$("#levelInputDamageNumber").on("change", updateLevels);
$("#levelInputBasicNumber").on("change", updateLevels);
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

// update the maximum val() for level input based on the initial stats of the player
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
