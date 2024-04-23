const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let rate;


//Adding Choices to Select
function AddChoices(id) {
    for (let option in countryList) {
        const x = document.getElementById(id);
        const choice = document.createElement("option");
        choice.text = option
        if (id === "from" && option === "USD") {
            choice.selected = "selected"
        }
        if (id === "to" && option === "INR") {
            choice.selected = "selected"
        }
        x.add(choice);
    }
}
document.querySelectorAll("select").forEach(select => {
    AddChoices(select.id)
})



//Updating The Flag
function UpdateFlag(x) {
    let e = document.getElementById(x)
    var text = e.options[e.selectedIndex].text;
    document.querySelector(`.${x} img`).src = `https://flagsapi.com/${countryList[text]}/flat/64.png`
}
document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", () => {
        UpdateFlag(select.id)
        GetExchange()
    })
})



//API Call And Getting Exchange Rate
function getCurrency(x) {
    return (document.getElementById(x).options[document.getElementById(x).selectedIndex].text).toLowerCase()
}
async function GetExchange() {
    let response = await fetch(`${BaseURL}/${getCurrency("from")}.json`)
    let data = await response.json()
    rate = Number(data[getCurrency("from")][getCurrency("to")])
}



//Displaying Vakue on Screen
function display() {
    let amount = document.getElementById("amount").value
    let displayField = document.querySelector(".conversion-value")
    if (amount === "") {
        displayField.innerHTML = "Enter Some Value"
    } else {
        amount = Number(amount)
        if (amount < 0) {
            displayField.innerHTML = "Enter Positive Value"
        }
        else {
            displayField.innerHTML = `${amount} ${(getCurrency("from")).toUpperCase()} is ${(amount * rate).toFixed(2)} ${(getCurrency("to")).toUpperCase()}`
        }
    }
}
document.querySelector(".button button").addEventListener("click",display)



GetExchange()
display()