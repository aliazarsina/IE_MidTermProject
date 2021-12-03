let predectedResult = null
let predectedGender = null
let userEnteredName = null

// تابع سابمیت: این تابع پس از زدن دکمه سابمیت در صفحه وب فراخوانی می‌شود و صحت ورودی و اقدامات اولیه مثل ارسال درخواست را انجام می‌دهد

function submit() {
    // در این شرط بررسی می‌شود که ورودی کاربر ورودی درستی باشد (تنها حروف کوجک و یا بزرگ)
    if (!/^[a-z][a-z\s]*$/g.test(document.getElementById("input-name-id").value)) {
        alert("Invalid characters");
    }
    else {
    // در صورت صحت ورودی، مقدار کادر ورودی خوانده می‌شود، سپس آدرسی که قرار است به آن درخواست ارسال شود ساخته می‌شود    
    userEnteredName = document.getElementById("input-name-id").value
    let url = "https://api.genderize.io/?name=" + userEnteredName
    console.log(url)
    // در اینجا درخواست ارسال می شود و اطلاعات دریافت شده پردازش می‌شوند و در قسمت‌های مختلف کد قرار میگیرند
    fetch(url).then((resp)=>resp.json()).then((data)=>(
    document.getElementById("ps-result-id").innerText = data["gender"].charAt(0).toUpperCase() + data["gender"].slice(1) + " " + data["probability"]*100 + "%",
    document.getElementById("ps-resultbar-fill-id").style.width = 300 * data["probability"].toString() + "px" ,
    predectedResult = data["gender"].charAt(0).toUpperCase() + data["gender"].slice(1),
    console.log(data)))

    // این قسمت زمانی که کاربر همراه با نام ورودی، جنسیت را نیز حدس بزند فعال شده و جنسیتی که کاربر وارد میکند را برای خود ذخیره میکند
    if (document.getElementById("option-1").checked == true )
        predectedGender = "Male"
    else if (document.getElementById("option-2").checked == true)
        predectedGender = "Female"
    
    // این قسمت در صورتی که نام ورودی کاربر از قبل توسط او ذخیره شده باشد، فعال شده و نام از قبل ذخیره شده را (چه توسط خود کاربر و چه توسط رابط) نمایش خواهد داد
    if (localStorage.getItem(userEnteredName) != null) 
        document.getElementById("hs-result-id").innerText = ".: " + localStorage.getItem(userEnteredName) + " :."        
    else 
        document.getElementById("hs-result-id").innerText = ".: Nothing :."

    clear();
    }
}

// این تابع زمانی که کاربر بخواهد جنسیت پیشبینی شده توسط خودرا برای یک نام خاص ذخیره نمایدفراخوانی خواهد شد 
function savePredectedResultMe() {
    // در این دو شرط ابتدایی چک میشود که کاربر نام یا جنسیت را وارد کرده باشد (بدون انتخاب نام و جنسیت سیو کردن معنایی نخواهد داشت)
    if (userEnteredName != null) {
        if (predectedGender != null) {
            // در این قسمت نامی که کاربر وارد کرده بود به همراه جنسیتی که خودش برای آن اسم تعیین کرده
            // در حافظه داخلی ذخیره شده و در قسمت مربوطه در سایت نمایش داده می‌شود
            localStorage.setItem(userEnteredName,predectedGender)
            document.getElementById("hs-result-id").innerText = "Saved !"
            document.getElementById("hs-result-id").innerText = ".: " + predectedGender +" :."
        } else
            alert("Error, Predect A Gender First !")
    } else {
        alert("Error, Enter A Name First !")
    }

    // در این قسمت دو گیزنه مربوط به جنسیت در کادر چپ هر دو خاموش می‌شوند تا کاربربتواند نام و جنسیت جدیدی را مشخص نماید
    // (دلیل خاموش شدن این می باشد که شاید کاربر برای نام جدیدی پیشبینی نداشته باشد)
    document.getElementById("option-1").checked = false;
    document.getElementById("option-2").checked = false;
    predectedGender = null
}

// این تابع زمانی که کاربر بخواهد جنسیت پیشبینی شده توسط سیستم را برای یک نام خاص ذخیره نماید فراخوانی خواهد شد
function savePredectedResultAPI() {
    // در این دو شرط ابتدایی چک میشود که کاربر نام وارد کرده باشد و توسط سیستم جنسیتی برای آن پیشبینی شده باشد
    if (userEnteredName != null) {
        if (predectedResult != null) {
        //در این قسمت نامی که کاربر وارد کرده به همراه جنسیتی که سیستم برای آن پیش بینی کرده است، برای آن اسم ذخیره میشود 
        // و این اسم در قسمت مربوطه در سایت نمایش داده خوهد شد
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

// این تابع زمانی که کاربر دکمه پاک کرده را فشار دهد فراخوانی می شود
function clearLocalStorage() {
    // این تابع اسم وارد شده توسط کاربر را که قبلا در تابع سابمیت گرفته شده  بود را از حافظه داخلی پاک می نماید
    localStorage.removeItem(userEnteredName)
    document.getElementById("hs-result-id").innerText = "Deleted !"
    document.getElementById("hs-result-id").innerText = ".: Nothing :."
    document.getElementById("option-1").checked = false;
    document.getElementById("option-2").checked = false;
}

// function clear() {
//     if (document.getElementById("input-name-id").value != null)
//         document.getElementById("input-name-id").value = null
// }


// در این قسمت دکمه های مختلف را به تابع های مربوط به آنها وصل مینماییم
document.getElementById("submit-button-id").addEventListener("click", submit)
// document.getElementById("input-name-id").addEventListener("click", clear)
document.getElementById("save-button-me-id").addEventListener("click", savePredectedResultMe)
document.getElementById("save-button-api-id").addEventListener("click", savePredectedResultAPI)
document.getElementById("clear-button-id").addEventListener("click", clearLocalStorage)