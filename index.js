function toggleVisibility(id) {
    var elm = document.getElementById(id);
    if (elm.style.display === "none") {
        elm.style.display = "block";
    } else {
        elm.style.display = "none";
    }
}