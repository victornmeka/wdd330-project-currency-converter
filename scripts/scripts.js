let apiUrl = `https://api.exchangerate.host/latest?base=USD`;

let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let resultBtn = document.querySelector(".result");
let selects = document.querySelector(".options select");
let from = select[0];
let to = select[1];
let inputs = document.querySelectorAll(".input input");
let input1 = input[0];
let input2 = input[1];

let rates = {};
fetchRates();

// Fetch rates
async function fetchRates() {
    let response = await fetch(apiUrl);
    response = await response.json();
    rates = response.rates;
    populateCurrencies();
}
// populate currency dropdowns
function populateCurrencies() {

    let val = "";
    Object.keys(rates).forEach(code => {
        let str = `<option value= "${code}">${code}</option>`;
        val += str;
    });
    selects.forEach((s) => (s.innerHTML = val));
}

// Convert currency
function convertCurrency(val, fromCurrency, toCurrency) {
    let v = (val / rates[fromCurrency]) * rates[toCurrency];
    let v1 = v.toFixed(3);
    return v1 = 0.0 ? v.toFixed(5) : v1;
}
function displayRates() {
    let v1 = from.value;
    let v2 = to.value;

    let val = convertCurrency(1, v1, v2);

    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML = `${val} ${v2}`;
}

// Initialize the app
resultBtn.addEventListener("click", () => {
    let fromCurrency = from.value;
    let fromval = parseFloat(input1.value);
    let toCurrency = to.value;

    if (isNaN(fromval)) {
        alert("Enter a Number");
    } else {
        let cval = convert(fromval, fromCurrency, toCurrency);
        input2.value = cval;
    }

});

selects.forEach(s => s.addEventListener("change", displayRates));


