import { getSupportedCurrencies, getCurrencyRate } from "../js/currencyApi.js";
import { groupCurrenciesByContinent } from "../js/countriesApi.js";

export function renderSmallDashboard(container) {
    groupCurrenciesByContinent()
    console.log("Rendering Small Dashboard...");

    container.innerHTML = `
        <div class="p-4">
            <h1 class="text-2xl font-bold text-center mb-4">Currency Dashboard</h1>
            <div id="dashboard-summary" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="card">
                    <h3 class="text-lg font-bold">Total Supported Currencies</h3>
                    <p id="total-currencies">Loading...</p>
                </div>
                <div class="card">
                    <h3 class="text-lg font-bold">Highest and Lowest Rates (USD)</h3>
                    <p id="highest-lowest-rates">Loading...</p>
                </div>
            </div>
            <div id="dashboard-top-currencies" class="mt-6">
                <h3 class="text-lg font-bold text-center">Top 5 Strongest Currencies</h3>
                <ul id="top-strongest" class="list-disc ml-6"></ul>
            </div>
            <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                <div id="column-chart"></div>
            </div>
        </div>
    `;

    // Carga los datos del dashboard
    populateDashboardData();
}

async function populateDashboardData() {
    try {
        const supportedCurrencies = await getSupportedCurrencies();
        const totalCurrenciesElement = document.getElementById("total-currencies");
        const highestLowestRatesElement = document.getElementById("highest-lowest-rates");
        const topStrongestElement = document.getElementById("top-strongest");

        
        totalCurrenciesElement.textContent = supportedCurrencies.length;

        const rates = await getCurrencyRate("USD");

        const sortedRates = Object.entries(rates).sort((a, b) => b[1] - a[1]);
        const highest = sortedRates[0];
        const lowest = sortedRates[sortedRates.length - 1];

        highestLowestRatesElement.textContent = `Highest: ${highest[0]} (${highest[1]}), Lowest: ${lowest[0]} (${lowest[1]})`;

        const topStrongest = sortedRates.slice(0, 5);
        topStrongestElement.innerHTML = topStrongest
            .map(([currency, rate]) => `<li>${currency}: ${rate}</li>`)
            .join("");

    } catch (error) {
        console.error("Error loading dashboard data:", error);
        document.getElementById("dashboard-summary").textContent = "Failed to load dashboard data.";
    }
}
