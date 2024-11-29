// Масив автомобілів
const cars = [
    {
        id: 1,
        type: "used", // Тип: вживане, нове, під пригон
        vehicleType: "легкові", // Тип транспорту
        brand: "Toyota", // Марка
        model: "Corolla", // Модель
        year: 2015, // Рік випуску
        price: 10000, // Ціна в $
        region: "Київ", // Регіон
        fuelType: "бензин", // Тип палива
        driveType: "передній", // Тип приводу
        engineVolume: 1.6, // Об'єм двигуна (л)
        mileage: 150000, // Пробіг (км)
        gearbox: "ручна / механіка", // КПП
        customsCleared: true, // Розмитнене авто
        condition: "повністю непошкоджене", // Стан
        description: "Двигун 1.6 бензин, гарний стан, новий акумулятор", // Опис
        vin: "KN2FAJ2A0MB001179", // VIN-код
        plateNumber: "AX 6487 KO", // Номерний знак
        image: "https://via.placeholder.com/120x80?text=Toyota+Corolla", // Зображення
        dateAdded: "2024-11-19", // Дата додавання
    },
    {
        id: 2,
        type: "new",
        vehicleType: "легкові",
        brand: "Honda",
        model: "Civic",
        year: 2023,
        price: 25000,
        region: "Одеса",
        fuelType: "гібрид (HEV)",
        driveType: "повний",
        engineVolume: 2.0,
        mileage: 0,
        gearbox: "автомат",
        customsCleared: true,
        condition: "повністю непошкоджене",
        description: "Гібрид HEV, новий автомобіль без пробігу",
        vin: "KN2FAJ2A0MB001189",
        plateNumber: "BB 1234 HH",
        image: "https://via.placeholder.com/120x80?text=Honda+Civic",
        dateAdded: "2024-11-18",
    },
    {
        id: 3,
        type: "import",
        vehicleType: "позашляховики",
        brand: "BMW",
        model: "X5",
        year: 2020,
        price: 50000,
        region: "Львів",
        fuelType: "дизель",
        driveType: "задній",
        engineVolume: 3.0,
        mileage: 80000,
        gearbox: "автомат",
        customsCleared: false,
        condition: "професійно відремонтовані пошкодження",
        description: "Автомобіль з Європи, дизель, в гарному стані",
        vin: "WBAKS6C57MC000123",
        plateNumber: "Немає",
        image: "https://via.placeholder.com/120x80?text=BMW+X5",
        dateAdded: "2024-11-17",
    },
    {
        id: 4,
        type: "used",
        vehicleType: "позашляховики",
        brand: "Toyota",
        model: "RAV4",
        year: 2018,
        price: 22000,
        region: "Харків",
        fuelType: "бензин",
        driveType: "передній",
        engineVolume: 2.5,
        mileage: 60000,
        gearbox: "варіатор",
        customsCleared: true,
        condition: "не відремонтовані пошкодження",
        description: "Має дрібні пошкодження кузова, гарний технічний стан",
        vin: "JTMBFREV4KD123456",
        plateNumber: "AX 5678 OP",
        image: "https://via.placeholder.com/120x80?text=Toyota+RAV4",
        dateAdded: "2024-11-16",
    },
];


// Отримання параметрів пошуку з URL
const params = new URLSearchParams(window.location.search);

// Зчитуємо критерії пошуку з URL
const searchCriteria = {
    type: params.get("type") || "all",
    vehicleType: params.get("vehicleType") !== "any" ? params.get("vehicleType") : null,
    brand: params.get("brand") || null,
    model: params.get("model") || null,
    region: params.get("region") || null,
    year: params.get("year") ? parseInt(params.get("year")) : null,
    priceFrom: params.get("priceFrom") ? parseInt(params.get("priceFrom")) : null,
    priceTo: params.get("priceTo") ? parseInt(params.get("priceTo")) : null,
};

// Фільтруємо результати
const results = cars.filter(car => {
    return (
        (searchCriteria.type === "all" || car.type === searchCriteria.type) &&
        (!searchCriteria.vehicleType || car.vehicleType.toLowerCase() === searchCriteria.vehicleType.toLowerCase()) &&
        (!searchCriteria.brand || car.brand.toLowerCase().includes(searchCriteria.brand.toLowerCase())) &&
        (!searchCriteria.model || car.model.toLowerCase().includes(searchCriteria.model.toLowerCase())) &&
        (!searchCriteria.region || car.region.toLowerCase().includes(searchCriteria.region.toLowerCase())) &&
        (!searchCriteria.year || car.year === searchCriteria.year) &&
        (!searchCriteria.priceFrom || car.price >= searchCriteria.priceFrom) &&
        (!searchCriteria.priceTo || car.price <= searchCriteria.priceTo)
    );
});
function displayResults(results) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = ""; // Очищуємо контейнер перед виведенням

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>Результати не знайдено.</p>";
        console.log("Жодного авто не знайдено за цими критеріями.");
        return;
    }

    results.forEach((car, index) => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");

        resultItem.innerHTML = `
            <div class="result-item-content">
                <div class="result-image">
                    <img src="${car.image}" alt="${car.brand} ${car.model}">
                </div>
                <div class="result-details">
                    <h4>${car.brand} ${car.model} ${car.year}</h4>
                    <div class="price">
                        <strong>${car.price.toLocaleString()} $</strong> 
                        <span>${(car.price * 42).toLocaleString()} грн</span>
                    </div>
                    <ul class="details-list">
                        <li>${car.mileage.toLocaleString()} тис. км</li>
                        <li>${car.region}</li>
                        <li>${car.fuelType}, ${car.engineVolume} л.</li>
                        <li>${car.gearbox || "Не вказано"}</li>
                    </ul>
                    <div class="identifiers">
                        <span>${car.plateNumber}</span>
                        <span>${car.vin}</span>
                    </div>
                    ${car.customsCleared ? `<span class="customs-label">Розмитнено</span>` : ""}
                    <p>${car.description || ""}</p>
                    <div class="date-added">${new Date(car.dateAdded).toLocaleDateString()}</div>
                </div>
            </div>
        `;

        resultsContainer.appendChild(resultItem);

        if (index < results.length - 1) {
            const divider = document.createElement("hr");
            divider.classList.add("divider");
            resultsContainer.appendChild(divider);
        }
    });
}


// Відображаємо результати
displayResults(cars);

// Масив для динамічного відображення фільтрів
let searchFilters = Object.entries(searchCriteria)
    .filter(([key, value]) => value && value !== "all" && value !== "any")
    .map(([key, value]) => ({ name: `${capitalizeFirstLetter(key)}: ${value}`, key, value }));

// Відображення фільтрів
function renderFilters() {
    const filterContainer = document.getElementById("filter-tags");
    filterContainer.innerHTML = ""; // Очищаємо попередні фільтри

    searchFilters.forEach((filter, index) => {
        const tag = document.createElement("div");
        tag.classList.add("filter-tag");
        tag.innerHTML = `
            ${filter.name} 
            <span class="remove-filter" onclick="removeFilter(${index})">✖</span>
        `;
        filterContainer.appendChild(tag);
    });
}

// Видалення фільтру
function removeFilter(index) {
    const filterToRemove = searchFilters[index];
    delete searchCriteria[filterToRemove.key]; // Видаляємо критерій з об'єкта
    searchFilters.splice(index, 1); // Видаляємо з локального масиву
    renderFilters();
    updateResults(); // Перезапуск фільтрації
}

// Перезапуск результатів пошуку
function updateResults() {
    const updatedResults = cars.filter(car => {
        return (
            (!searchCriteria.type || searchCriteria.type === "all" || car.type === searchCriteria.type) &&
            (!searchCriteria.vehicleType || car.vehicleType.toLowerCase() === searchCriteria.vehicleType.toLowerCase()) &&
            (!searchCriteria.brand || car.brand.toLowerCase().includes(searchCriteria.brand.toLowerCase())) &&
            (!searchCriteria.model || car.model.toLowerCase().includes(searchCriteria.model.toLowerCase())) &&
            (!searchCriteria.region || car.region.toLowerCase().includes(searchCriteria.region.toLowerCase())) &&
            (!searchCriteria.year || car.year === searchCriteria.year) &&
            (!searchCriteria.priceFrom || car.price >= searchCriteria.priceFrom) &&
            (!searchCriteria.priceTo || car.price <= searchCriteria.priceTo)
        );
    });
    displayResults(updatedResults, searchCriteria);
}

// Уточнення пошуку
function refineSearch() {
    alert("Відкрити форму уточнення пошуку"); // Замініть на відповідний функціонал
}

// Допоміжна функція для форматування назв
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Початкове відображення фільтрів і результатів
document.addEventListener("DOMContentLoaded", () => {
    renderFilters();
    displayResults(results, searchCriteria);
});

document.getElementById('advanced-search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const advancedSearchParams = Object.fromEntries(formData.entries());

    // Оновлення результатів пошуку
    console.log('Розширені критерії пошуку:', advancedSearchParams);
    // Додайте логіку для оновлення результатів пошуку
});

function performSearch() {
    const conditionMap = {
        "any": "any",
        "professionally-repaired": "професійно відремонтовані пошкодження",
        "full-intact": "повністю непошкоджене",
        "not-repaired": "не відремонтовані пошкодження",
        "not-running": "не на ходу / на запчастини"
    };
    const transmissionMap = {
        "any": "any",
        "manual": "ручна / механіка",
        "automatic": "автомат",
        "tiptronic": "тіптронік",
        "robot": "робот",
        "variator": "варіатор"
    };
    const driveTypeMap = {
        "any": "any",
        "front": "передній",
        "rear": "задній",
        "all-wheel": "повний"
    };

    const vehicleType = document.getElementById("vehicleType").value.toLowerCase();
    const brand = document.getElementById("brand").value.trim().toLowerCase();
    const model = document.getElementById("model").value.trim().toLowerCase();
    const region = document.getElementById("region").value.trim().toLowerCase();
    const yearFrom = parseInt(document.getElementById("yearFrom").value) || 0;
    const yearTo = parseInt(document.getElementById("yearTo").value) || 9999;
    const priceFrom = parseInt(document.getElementById("priceFrom").value) || 0;
    const priceTo = parseInt(document.getElementById("priceTo").value) || Infinity;
    const fuelType = document.getElementById("fuel-type").value.toLowerCase();
    const driveType = driveTypeMap[document.getElementById("drive-type").value.toLowerCase()] || "any";
    const engineVolumeFrom = parseFloat(document.getElementById("engineVolumeFrom")?.value) || 0;
    const engineVolumeTo = parseFloat(document.getElementById("engineVolumeTo")?.value) || Infinity;
    const customsCleared = document.getElementById("customs-cleared")?.checked || false;
    const vinSearch = document.getElementById("vin-search")?.value.trim().toLowerCase();
    const transmission = transmissionMap[document.getElementById("transmission").value.toLowerCase()] || "any";
    const condition = conditionMap[document.getElementById("condition-select").value.toLowerCase()] || "any";

    console.log("Введені значення форми:", {
        vehicleType, brand, model, region, yearFrom, yearTo,
        priceFrom, priceTo, fuelType, driveType,
        engineVolumeFrom, engineVolumeTo, customsCleared,
        vinSearch, transmission, condition
    });

    const filteredCars = cars.filter(car => {
        const match = (
            (vehicleType === "any" || car.vehicleType.toLowerCase() === vehicleType) &&
            (!brand || car.brand.toLowerCase().includes(brand)) &&
            (!model || car.model.toLowerCase().includes(model)) &&
            (!region || car.region.toLowerCase().includes(region)) &&
            (car.year >= yearFrom && car.year <= yearTo) &&
            (car.price >= priceFrom && car.price <= priceTo) &&
            (fuelType === "any" || car.fuelType.toLowerCase() === fuelType) &&
            (driveType === "any" || car.driveType.toLowerCase() === driveType) &&
            (car.engineVolume >= engineVolumeFrom && car.engineVolume <= engineVolumeTo) &&
            (!customsCleared || car.customsCleared === customsCleared) &&
            (!vinSearch || car.vin.toLowerCase().includes(vinSearch)) &&
            (transmission === "any" || car.gearbox.toLowerCase().includes(transmission)) &&
            (condition === "any" || car.condition.toLowerCase().includes(condition))
        );

        console.log(`Перевіряємо авто:`, car);
        console.log(`Відповідає умовам: ${match}`);

        return match;
    });

    displayResults(filteredCars);
    console.log("Фільтровані авто:", filteredCars);
}




