// Función para convertir monedas
async function convertCurrency(fromCurrency, toCurrency, amount) {
    const apiKey = 'c4a36089298122a964a0409a'
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

    try {
        // Llamada a la API
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
        const convertedAmount = (amount * conversionRate).toFixed(2); // Redondear a dos decimales

        return {
            fromCurrency,
            toCurrency,
            amount,
            conversionRate,
            convertedAmount,
        };
    } catch (error) {
        console.error("Error:", error.message);
        return null; // O maneja el error según sea necesario
    }
}

// Ejemplo de uso
(async () => {
    const result = await convertCurrency("USD", "ARS", 1);
    if (result) {
        console.log(
            `${result.amount} ${result.fromCurrency} equivale a ${result.convertedAmount} ${result.toCurrency} (Tasa de cambio: ${result.conversionRate})`
        );
    } else {
        console.log("No se pudo realizar la conversión.");
    }
})();

export { convertCurrency };