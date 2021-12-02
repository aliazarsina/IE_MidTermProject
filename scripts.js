function submit() {
    let url = "https://api.genderize.io/?name=" + document.getElementById("input-name-id").value;
    console.log(url);
    fetch(url).then((resp)=>resp.json()).then((data)=>(
    document.getElementById("ps-result-id").innerText = data["gender"].charAt(0).toUpperCase() + data["gender"].slice(1) + " " + data["probability"]*100 + "%",
    document.getElementById("ps-resultbar-fill-id").style.width = 300 * data["probability"].toString() + "px" ,
    console.log(data)
    ));
}

function clear() {
    if (document.getElementById("input-name-id").value != null)
        document.getElementById("input-name-id").value = null;
}

document.getElementById("submit-button-id").addEventListener("click", submit);
document.getElementById("input-name-id").addEventListener("click", clear);