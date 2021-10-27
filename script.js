const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
subBtn = document.querySelectorAll("form button");
const amount = document.querySelector("form input");
const exchangeRateText = document.querySelector(".exchange-rate");
const exchangeIcon = document.querySelector("form .icon");
const apikey = "8cfb2305c0a565c5a6000d5e";

for (i=0; i<dropList.length; i++){
    for(countryCode in country_list){
        let selected;
        if(i == 0){
            selected = countryCode == "USD"? "selected" : "";
        }else if(i == 1){
            selected = countryCode == "INR"? "selected" : "";
        }
        let optionTag = `<option value="${countryCode}"${selected}>${countryCode}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

subBtn[0].addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate(){
    let amountVal = amount.value
    let url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurrency.value}`;
    fetch(url).then(response => (response.json())).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExrate = (amountVal*exchangeRate).toFixed(2);
        exchangeRateText.innerHTML = totalExrate;
    });    
}


exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})