// DOM Elements
const dropList = document.querySelectorAll("form select"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button");

// Populate currency dropdowns and set initial selected values
for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
        // Ternary operator to set "selected" attribute based on conditions
        let selected = i == 0 ? (currency_code == "USD" ? "selected" : "") : (currency_code == "NGN" ? "selected" : "");
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    // Event listener for dropdown change
    dropList[i].addEventListener("change", (e) => {
        loadFlag(e.target);
    });
}

// Function to load flag based on selected currency
function loadFlag(element) {
    for (let code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            // Set flag image source based on the country code
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

// Event listener for page load
window.addEventListener("load", () => {
    getExchangeRate();
});

// Event listener for button click
getButton.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

// Event listener for exchange icon click
const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
    // Swap values between fromCurrency and toCurrency
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    // Load flags for updated currencies
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    // Get exchange rate for updated currencies
    getExchangeRate();
});

// Function to get exchange rate
function getExchangeRate() {
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;

    // Check and set default value if amount is empty or zero
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    // Display loading message
    exchangeRateTxt.innerText = "Getting exchange rate...";

    // Fetch exchange rate from API
    let url = `https://v6.exchangerate-api.com/v6/da5c443237235705ee021c08/latest/${fromCurrency.value}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExRate = (amountVal * exchangeRate).toFixed(2);
            // Display the result
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
        })
        .catch(() => {
            // Display an error message if something goes wrong
            exchangeRateTxt.innerText = "Something went wrong";
        });
}
