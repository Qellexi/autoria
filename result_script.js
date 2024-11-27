// Масив машин для пошуку
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

// Зчитування параметрів з URL
const urlParams = new URLSearchParams(window.location.search);
const criteria = {
    type: urlParams.get("type"),
    vehicleType: urlParams.get("vehicleType"),
    brand: urlParams.get("brand"),
    model: urlParams.get("model"),
    region: urlParams.get("region"),
    year: urlParams.get("year") ? parseInt(urlParams.get("year")) : null,
    priceFrom: urlParams.get("priceFrom") ? parseInt(urlParams.get("priceFrom")) : null,
    priceTo: urlParams.get("priceTo") ? parseInt(urlParams.get("priceTo")) : null,
};

// Фільтрація результатів
const filteredCars = cars.filter(car => {
    return (
        (!criteria.type || criteria.type === "all" || car.type === criteria.type) &&
        (!criteria.vehicleType || car.vehicleType.toLowerCase() === criteria.vehicleType.toLowerCase()) &&
        (!criteria.brand || car.brand.toLowerCase().includes(criteria.brand.toLowerCase())) &&
        (!criteria.model || car.model.toLowerCase().includes(criteria.model.toLowerCase())) &&
        (!criteria.region || car.region.toLowerCase().includes(criteria.region.toLowerCase())) &&
        (!criteria.year || car.year === criteria.year) &&
        (!criteria.priceFrom || car.price >= criteria.priceFrom) &&
        (!criteria.priceTo || car.price <= criteria.priceTo)
    );
});

// Відображення результатів
function displayResults(results, criteria) {
    const resultsContainer = document.getElementById("results-container");

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

displayResults(filteredCars, criteria);
