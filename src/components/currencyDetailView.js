import { getCurrencyRate } from "../js/currencyApi.js";

console.log("Currency Detail View Rendering...");

export function renderCurrencyDetail(container, currencyCode) {
  container.innerHTML = `
        <div class="p-4 sm:ml-64">
            <h1 class="text-2xl font-bold text-center mb-4">Currency: ${currencyCode}</h1>
            <div id="currency-rate" class="text-center"></div>
        </div>
    `;

  // Obtener y mostrar las tasas de cambio de la moneda seleccionada
  loadCurrencyRates(currencyCode);
}

async function loadCurrencyRates(currencyCode) {
  const currencyRate = document.getElementById("currency-rate");

  try {
    const rates = await getCurrencyRate(currencyCode);

    currencyRate.innerHTML = `
            <h3 class="text-lg">Exchange Rates:</h3>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Currency Code</th>
                            <th scope="col" class="px-6 py-3">Exchange Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(rates)
                          .map(
                            ([currency, rate]) => `
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        ${currency}
                                    </th>
                                    <td class="px-6 py-4">
                                        ${rate}
                                    </td>
                                </tr>`
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>
        `;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    currencyRate.textContent = "Failed to load exchange rates.";
  }
}
