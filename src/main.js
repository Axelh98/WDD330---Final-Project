

// IMPORT ALL THE COMPONENTS FUNCTIONS
import { renderSidebar } from "./components/sidebar.js";
import { renderConvertor } from "./components/conversor.js";
import { renderSmallDashboard} from "./components/dashboard.js";
import { renderCurrencies } from "./components/currencies.js";
import { renderCurrencyDetail } from "./components/currencyDetailView.js";


// IMPORT ENVIRONMENT VARIABLES
import dotenv from 'dotenv';


// ADD EVENT LISTENER TO DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("main-sidebar");
    const mainContainer = document.getElementById("main-content"); 

    if (sidebarContainer) {
        renderSidebar(sidebarContainer);
    } else {
        console.error("Error: Sidebar container not found in the DOM.");
    }

    
    const handleRouting = () => {
        const path = window.location.pathname; 

        mainContainer.innerHTML = ""; 
        
        
        switch (true) {
            case path === "/convertor":
                renderConvertor(mainContainer); // Cargar Convertor
                break;
            case path === "/dashboard":
                renderSmallDashboard(mainContainer); // Cargar Dashboard
                break;
            case path === "/currencies":
                renderCurrencies(mainContainer); // Cargar Currencies
                break;
            case path === "/":
                renderCurrencies(mainContainer); // Cargar Currencies
                break;
            case path.startsWith("/currencies/"):
                const currencyCode = path.split("/")[2];
                renderCurrencyDetail(mainContainer, currencyCode); // Cargar Currency Detail
                break;
            default:
                mainContainer.innerHTML = `<h1 class="text-center">404 - Page Not Found</h1>`;
        }
    };

    // Detecta cambios en la URL al navegar
    window.addEventListener("popstate", handleRouting);

    // Llama a handleRouting para renderizar la vista actual al inicio
    handleRouting();

    // Agregar los eventos de clic a los enlaces del sidebar
    const links = document.querySelectorAll("a[data-link]");
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); 
            const path = link.getAttribute("href");
            window.history.pushState(null, "", path); 
            handleRouting(); 
        });
    });
});