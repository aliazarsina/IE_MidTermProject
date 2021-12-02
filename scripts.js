function submit() {
    let url = "https://api.genderize.io/?name=" + document.getElementById("input-name-id").value;
    console.log(url);
    let resp;
    fetch(url).then(response => response.json()).then(data => console.log(data));
}

function clear() {
    if (document.getElementById("input-name-id").value != null)
        document.getElementById("input-name-id").value = null;
}

document.getElementById("submit-button-id").addEventListener("click", submit);
document.getElementById("input-name-id").addEventListener("click", clear);