const BASE_URL = "https://v6.exchangerate-api.com/v6/ac3d55a914a0c385d31e6cb6/latest";
const countryList = {
    AED: "AE", AFN: "AF", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", BGN: "BG",
    BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", BWP: "BW", BZD: "BZ", CAD: "CA", CDF: "CD", CHF: "CH", CLP: "CL",
    CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CZK: "CZ", DJF: "DJ", DKK: "DK", DOP: "DO", DZD: "DZ", EGP: "EG", ETB: "ET", EUR: "FR",
    FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GHS: "GH", GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", 
    IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KRW: "KR", KWD: "KW", 
    KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN",
    MOP: "MO", MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", NGN: "NG", NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM", 
    PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD",
    SEK: "SE", SGD: "SG", SLL: "SL", SOS: "SO", SRD: "SR", STN: "ST", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR",
    TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", VES: "VE", VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA", ZMW: "ZM"
};


const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const btn = document.querySelector("#converter");
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#enterVal");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const fromCurrency = fromCurr.value;
    const toCurrency = toCurr.value;
    const URL = `${BASE_URL}/${fromCurrency}`;

    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        let data = await response.json();
        let rate = data.conversion_rates[toCurrency]; // Adjusted to match API response structure
        if (!rate) {
            throw new Error("Conversion rate not available.");
        }

        let convertedAmount = amtVal * rate;
        document.querySelector("#convertedValue").value = convertedAmount.toFixed(2);
        document.querySelector(".msg").innerText = `${amtVal} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error('Error:', error.message);
        document.querySelector(".msg").innerText = "Conversion failed. Please check your input.";
    }
});

const info = document.getElementById("infoo");
var status = "notClicked"; // Ensure status matches condition
info.addEventListener("mouseover", () => {
    if (status === "notClicked") {
        document.getElementById("prices").style.display = "flex"; // Display flex
        let datuu = Date();
        datuu = datuu.substr(0, 15);
        document.getElementById("actualDate").innerHTML = datuu;
        status = "Clicked"; // Update status after the first click
    } else {
        document.getElementById("prices").style.display = "none";
        status = "notClicked"; // Reset the status
    }
});

document.getElementById("prices").addEventListener("click", ()=> {
    document.getElementById("prices").style.display = "none";
})


// const info = document.getElementById("infoo");
// var status = "notClicked"; // Ensure status matches condition
// info.addEventListener("click", () => {
//     if (status === "notClicked") {
//         document.getElementById("prices").style.display = "block";
//         document.getElementById("actualDate").style.display = "block";
//         let datuu = Date();
//         datuu = datuu.substr(0, 15);
//         document.getElementById("actualDate").innerHTML = datuu;
//         status = "Clicked"; // Update status after the first click
//     } else {
//         document.getElementById("prices").style.display = "none";
//         document.getElementById("actualDate").style.display = "none";
//         status = "notClicked"; // Reset the status
//     }
// });





// If the date is in ISO string format, the date part can be seperated using

// '2022-06-01T00:00:00'.split('T')[0]