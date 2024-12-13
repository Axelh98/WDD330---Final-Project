import { getSupportedCurrencies, getCurrencyRate } from "../js/currencyApi.js";

export function renderCurrencies(container) {
    console.log("Rendering Currencies...");
    container.innerHTML = `
        <div class="p-4 sm:ml-64">
            <h1 class="text-2xl font-bold text-center mb-4">Supported Currencies</h1>
            <div id="currencies-list" class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                <!-- Aquí se cargarán las monedas -->
            </div>
        </div>
    `;

    // Obtener monedas soportadas y mostrarlas
    populateCurrenciesList();
}

async function populateCurrenciesList() {
    const currenciesList = document.getElementById("currencies-list");

    try {
        const currencies = await getSupportedCurrencies();
        
        currencies.forEach(([currencyCode, currencyName]) => {
            const button = document.createElement("button");
            button.classList.add("currency-btn", "p-4", "border", "rounded", "bg-blue-500", "text-white", "flex", "flex-col", "items-center", "justify-center");
            button.innerHTML = `
                <div class="font-bold">${currencyCode}</div>
                <div class="text-sm">${currencyName}</div>
            `;
            button.addEventListener("click", () => {
                // Navegar a la vista dinámica para esa moneda
                window.location.href = `/currencies/${currencyCode}`;
            });
            currenciesList.appendChild(button);
        });
    } catch (error) {
        console.error("Error fetching currencies:", error);
    }
}
