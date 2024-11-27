// Масив автомобілів
const cars = [
    {
        id: 1,
        type: "used",
        vehicleType: "легкові",
        brand: "Toyota",
        model: "Corolla",
        year: 2015,
        price: 10000,
        region: "Київ",
        image: "https://via.placeholder.com/120x80?text=Toyota+Corolla",
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
        image: "https://via.placeholder.com/120x80?text=Honda+Civic",
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
        image: "https://via.placeholder.com/120x80?text=BMW+X5",
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
        image: "https://via.placeholder.com/120x80?text=Toyota+RAV4",
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
function displayResults(results, criteria) {
    const resultsContainer = document.getElementById("results-container");

    // Очищуємо контейнер
    resultsContainer.innerHTML = "";

    // Відображення критеріїв пошуку
    resultsContainer.innerHTML = `
        <h4>Пошук за критеріями:</h4>
        <ul>
            <li>Тип: ${criteria.type || "Не вказано"}</li>
            <li>Тип транспорту: ${criteria.vehicleType || "Не вказано"}</li>
            <li>Марка: ${criteria.brand || "Не вказано"}</li>
            <li>Модель: ${criteria.model || "Не вказано"}</li>
            <li>Регіон: ${criteria.region || "Не вказано"}</li>
            <li>Рік: ${criteria.year || "Не вказано"}</li>
            <li>Ціна: від ${criteria.priceFrom || "Не вказано"} до ${criteria.priceTo || "Не вказано"}</li>
        </ul>
    `;

    if (results.length === 0) {
        resultsContainer.innerHTML += "<p>Нічого не знайдено за вашими критеріями.</p>";
    } else {
        results.forEach(car => {
            const carElement = document.createElement("div");
            carElement.classList.add("result-item");
            carElement.innerHTML = `
                <img src="${car.image}" alt="${car.brand} ${car.model}">
                <div class="details">
                    <h4>${car.brand} ${car.model}</h4>
                    <p>Рік: ${car.year}</p>
                    <p>Ціна: ${car.price}$</p>
                    <p>Регіон: ${car.region}</p>
                </div>
            `;
            resultsContainer.appendChild(carElement);
        });
    }
}

// Відображаємо результати
displayResults(results, searchCriteria);

