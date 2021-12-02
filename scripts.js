let predectedResult = null
let predectedGender = null
let userEnteredName = null

function submit() {
    userEnteredName = document.getElementById("input-name-id").value
    let url = "https://api.genderize.io/?name=" + userEnteredName
    console.log(url)
    fetch(url).then((resp)=>resp.json()).then((data)=>(
    document.getElementById("ps-result-id").innerText = data["gender"].charAt(0).toUpperCase() + data["gender"].slice(1) + " " + data["probability"]*100 + "%",
    document.getElementById("ps-resultbar-fill-id").style.width = 300 * data["probability"].toString() + "px" ,
    predectedResult = data["gender"].charAt(0).toUpperCase() + data["gender"].slice(1),
    console.log(data)))
    
    if (document.getElementById("option-1").checked == true )
        predectedGender = "Male"
    else if (document.getElementById("option-2").checked == true)
        predectedGender = "Female"
    
    if (localStorage.getItem(userEnteredName) != null) 
        document.getElementById("hs-result-id").innerText = ".: " + localStorage.getItem(userEnteredName) + " :."        
    else 
        document.getElementById("hs-result-id").innerText = ".: Nothing :."

    clear();
}

function savePredectedResultMe() {
    if (userEnteredName != null) {
        if (predectedGender != null) {
            localStorage.setItem(userEnteredName,predectedGender)
            document.getElementById("hs-result-id").innerText = "Saved !"
            document.getElementById("hs-result-id").innerText = ".: " + predectedGender +" :."
        } else
            alert("Error, Predect A Gender First !")
    } else {
        alert("Error, Enter A Name First !")
    }

    document.getElementById("option-1").checked = false;
    document.getElementById("option-2").checked = false;
    predectedGender = null
}

function savePredectedResultAPI() {
    if (userEnteredName != null) {
        if (predectedResult != null) {
        localStorage.setItem(userEnteredName,predectedResult)
        document.getElementById("hs-result-id").innerText = "Saved !"
        document.getElementById("hs-result-id").innerText = ".: " + predectedResult +" :."
        } else 
            alert("Error, Submit A Name First !")
    } else
        alert("Error, Enter A Name First !")

    document.getElementById("option-1").checked = false;
    document.getElementById("option-2").checked = false;
    predectedResult = null;
}

function clearLocalStorage() {
    localStorage.removeItem(userEnteredName)
    document.getElementById("hs-result-id").innerText = "Deleted !"
    document.getElementById("hs-result-id").innerText = ".: Nothing :."
    document.getElementById("option-1").checked = false;
    document.getElementById("option-2").checked = false;
}

function clear() {
    if (document.getElementById("input-name-id").value != null)
        document.getElementById("input-name-id").value = null
}

document.getElementById("submit-button-id").addEventListener("click", submit)
// document.getElementById("input-name-id").addEventListener("click", clear)
document.getElementById("save-button-me-id").addEventListener("click", savePredectedResultMe)
document.getElementById("save-button-api-id").addEventListener("click", savePredectedResultAPI)
document.getElementById("clear-button-id").addEventListener("click", clearLocalStorage)