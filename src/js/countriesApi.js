import { getSupportedCurrencies } from "../js/currencyApi.js";

// Función para obtener el continente según la moneda
async function fetchCountryByCurrency(currency) {
    const response = await fetch(`https://restcountries.com/v3.1/currency/${currency}`);
    const data = await response.json();
    if (data.status === 404 || !Array.isArray(data)) {
        return "Unknown"; // Si no se encuentra, marcar como "Desconocido"
    }
    return data[0]?.region || "Unknown"; // Devolver el continente
}

// Función para agrupar monedas por continente
export async function groupCurrenciesByContinent() {
    try {
        const currencies = await getSupportedCurrencies(); // Obtener todas las monedas soportadas
        const continentMap = {};

        // Recorrer las monedas y agruparlas por continente
        for (const [currencyCode, currencyName] of currencies) {
            const continent = await fetchCountryByCurrency(currencyCode);
            if (!continentMap[continent]) {
                continentMap[continent] = [];
            }
            continentMap[continent].push({ code: currencyCode, name: currencyName });
        }

        console.log("Currencies grouped by continent:", continentMap);
        return continentMap; // Retorna el mapa de continentes y monedas

    } catch (error) {
        console.error("Error grouping currencies by continent:", error);
        return {};
    }
}
