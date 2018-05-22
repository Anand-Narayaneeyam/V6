
function hideLoadingPulse() {
    var loading_indicator = document.getElementById('loading-indicator');
    loading_indicator.style.display = "none";
}

function setSymbolDropdownToInit() {
    document.getElementById("2938").selectedIndex = 0;
    document.getElementById('txtSymbolText').disabled = false;
}
