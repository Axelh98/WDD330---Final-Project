import { convertCurrency } from "../js/conversorApi.js";

export function renderConvertor(container) {
    console.log("Convertor Rendering...");
    container.innerHTML = `
        <div class="p-4 sm:ml-64">
            <h1 class="text-2xl font-bold text-center mb-4">Currency Converter</h1>
            <div>
                <label class="block text-sm font-medium">Amount:</label>
                <input id="amount" type="number" class="w-full p-2 border rounded mb-4" placeholder="Enter amount">
            </div>
            <div>
                <label class="block text-sm font-medium">From Currency:</label>
                <select id="from-currency" class="w-full p-2 border rounded mb-4"></select>
            </div>
            <div>
                <label class="block text-sm font-medium">To Currency:</label>
                <select id="to-currency" class="w-full p-2 border rounded mb-4"></select>
            </div>
            <button id="convert-btn" class="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
                Convert
            </button>
            <div id="result" class="mt-4 text-center"></div>
        </div>
    `;

    // Llenar los selectores de monedas
    populateCurrencyDropdowns();

    // Configurar evento para el botón Convert
    document.getElementById("convert-btn").addEventListener("click", async () => {
        const amount = parseFloat(document.getElementById("amount").value);
        const fromCurrency = document.getElementById("from-currency").value;
        const toCurrency = document.getElementById("to-currency").value;
        const resultDiv = document.getElementById("result");

        // Validar entradas
        if (!amount || amount <= 0) {
            resultDiv.textContent = "Please enter a valid amount.";
            return;
        }

        if (!fromCurrency || !toCurrency) {
            resultDiv.textContent = "Please select both currencies.";
            return;
        }

        // Llamar a la lógica de conversión
        const result = await convertCurrency(fromCurrency, toCurrency, amount);
        if (result) {
            resultDiv.innerHTML = `
                <p>${result.amount} ${result.fromCurrency} = ${result.convertedAmount} ${result.toCurrency}</p>
                <p>Exchange Rate: ${result.conversionRate}</p>
            `;
        } else {
            resultDiv.textContent = "Error during currency conversion. Please try again.";
        }
    });
}

// Función para llenar los selectores de monedas
async function populateCurrencyDropdowns() {
    const dropdowns = [
        document.getElementById("from-currency"),
        document.getElementById("to-currency"),
    ];

    try {
        const apiKey = 'c4a36089298122a964a0409a'; // Ajusta según tu entorno
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
        const data = await response.json();

        if (data.result !== "success") {
            throw new Error("Failed to fetch currency list.");
        }

        const currencies = Object.keys(data.conversion_rates);

        dropdowns.forEach((dropdown) => {
            currencies.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency;
                
                // Crear el texto con la bandera y el nombre de la moneda
                option.innerHTML = `${getCurrencyFlag(currency)} ${currency}`;
                
                dropdown.appendChild(option);
            });
        });
    } catch (error) {
        console.error("Error fetching currency data:", error.message);
    }
}

// Función para obtener el nombre de la moneda (o nombre común)
function getCurrencyName(currency) {
    // Aquí puedes agregar más nombres de monedas según sea necesario
    const currencyNames = {
        USD: 'USD Dollar',
        EUR: 'Euro',
        GBP: 'Pound Sterling',
        JPY: 'Japanese Yen',
        // ... (agregar más monedas)
    };
    return currencyNames[currency] || currency;
}

// Función para obtener la bandera correspondiente a la moneda
function getCurrencyFlag(currency) {
    // Mapea las monedas a las banderas correspondientes
    const currencyFlags = {
        USD: 'us', // USD -> US
        EUR: 'eu', // EUR -> EU
        GBP: 'gb', // GBP -> GB
        JPY: 'jp', // JPY -> JP
        // Agrega más monedas y países según sea necesario
    };

    const flagCode = currencyFlags[currency.toUpperCase()] || currency.toLowerCase(); // Si no hay un código de bandera, usa el código de la moneda
    return `<span class="flag-icon flag-icon-${flagCode}"></span>`;
}