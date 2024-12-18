// Función para convertir monedas
async function convertCurrency(fromCurrency, toCurrency, amount) {
    const apiKey = 'c4a36089298122a964a0409a'
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

    try {
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error al obtener los datos de la API.");
        }

        const data = await response.json();

        // Validar respuesta de la API
        if (data.result !== "success") {
            throw new Error("No se pudo completar la conversión.");
        }

        // Calcular la cantidad convertida
        const conversionRate = data.conversion_rate;
        const convertedAmount = (amount * conversionRate).toFixed(2); 

        return {
            fromCurrency,
            toCurrency,
            amount,
            conversionRate,
            convertedAmount,
        };
    } catch (error) {
        console.error("Error:", error.message);
        return null; 
    }
}

export { convertCurrency };