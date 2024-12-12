export async function getSupportedCurrencies() {
    const apiKey = 'c4a36089298122a964a0409a';  
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
    const data = await response.json();

    console.log(data);
    
    if (data.result !== "success") {
        throw new Error("Error fetching supported currencies.");
    }

    return data.supported_codes;
}

export async function getCurrencyRate(currency) {
    const apiKey = 'c4a36089298122a964a0409a';
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`);
    const data = await response.json();

    if (data.result !== "success") {
        throw new Error("Error fetching currency rates.");
    }

    return data.conversion_rates;
}
