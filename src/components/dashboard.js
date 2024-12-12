import { getSupportedCurrencies } from "../js/currencyApi.js";

export function renderDashboard(container) {

    console.log([lengthOfCurrencies().length]);
    console.log("Dashboard Rendering...");
    container.innerHTML = `
        <h1>Dashboard</h1>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <h3>Supported Currencies</h3>
                    <p>number of supported currencies: ${lengthOfCurrencies()}</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <h3>Currency Rates</h3>
                    <p>number of currency rates: ${getSupportedCurrencies().length}</p>
                </div>
            </div>
        </div>


    `;
}



async function lengthOfCurrencies() {
    const currencies = await getSupportedCurrencies();
    return currencies.length;
}