// This event listener is used to show/hide the grades or floats input fields based on the selected scale type
document.getElementById("scaleType").addEventListener("change", function() {
    let scaleType = document.getElementById("scaleType").value;
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
