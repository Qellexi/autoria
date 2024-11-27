function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("active");
}

// Закриття меню при кліку поза межами
document.addEventListener("click", function (event) {
    const menu = document.getElementById("dropdown-menu");
    const profileContainer = document.querySelector(".profile-container");
    if (!profileContainer.contains(event.target)) {
        menu.classList.remove("active");
    }
});


function toggleVinBlock(tab) {
    const vinBlock = document.getElementById('vin-block');
    const searchButtons = document.querySelector('.search-buttons');

    // Якщо обрано "Всі" або "Вживані", показуємо блок
    if (tab === 'all' || tab === 'used') {
        vinBlock.classList.remove('hidden');
        searchButtons.style.marginTop = '96px'; // Встановлюємо стандартний відступ
    } else {
        // В інших випадках приховуємо блок
        vinBlock.classList.add('hidden');
        searchButtons.style.marginTop = '160px'; // Збільшуємо відступ
    }

    // Оновлюємо активний клас для вкладок
    document.querySelectorAll('.tab').forEach(tabElement => tabElement.classList.remove('active'));
    document.querySelector(`.tab[onclick="toggleVinBlock('${tab}')"]`).classList.add('active');
}

document.querySelector('.listen-button').addEventListener('click', () => {
    const microphone = document.querySelector('.microphone');
    const soundCircles = document.querySelectorAll('.sound-circle');

    // Зменшення мікрофона
    microphone.classList.add('shrink');

    // Анімація хвиль - пропадають в центр
    soundCircles.forEach(circle => {
        circle.classList.add('shrink');
    });

    // Додаткові елементи (хвилі та текст)
    const soundWave = document.querySelector('.sound-wave');
    const listeningText = document.querySelector('.listening-text');

    soundWave.classList.remove('hidden');
    listeningText.classList.remove('hidden');
    soundWave.style.opacity = '1';
    listeningText.style.opacity = '1';
});



// Функція пошуку
function handleSearch() {
    const resultsContainer = document.getElementById("results-container");
    if (!resultsContainer) {
        console.error("Контейнер результатів не знайдено!");
        return;
    }

    // Очищення контейнера перед додаванням нових результатів
    resultsContainer.innerHTML = "";

    // Додавання фейкових даних (замінити на реальні дані пошуку)
    const mockResult = document.createElement("div");
    mockResult.classList.add("result-item");
    mockResult.innerHTML = `
        <img src="https://via.placeholder.com/120x80" alt="Результат">
        <div class="details">
            <h4>Приклад автомобіля</h4>
            <p>Рік: 2022</p>
            <p>Ціна: 20,000$</p>
            <p>Регіон: Київ</p>
        </div>
    `;
    resultsContainer.appendChild(mockResult);
}

let currentSlide = 0;

function initializeSlider() {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (!slides.length || !dots.length) {
        console.error("Слайди або точки слайдера не знайдені!");
        return;
    }

    // Показати перший слайд
    showSlide(currentSlide);

    // Додавання подій до кнопок
    const prevButton = document.querySelector(".slider-button.prev");
    const nextButton = document.querySelector(".slider-button.next");

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    // Додавання подій до точок
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add("active");
        } else {
            slide.classList.remove("active");
        }
    });

    // Оновлення активних точок
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    initializeSlider();
});

document.addEventListener("DOMContentLoaded", () => {
    let activeTab = "all";

    // Встановлення активної вкладки
    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            activeTab = tab.getAttribute("onclick").match(/'(\w+)'/)[1];
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
        });
    });

    document.querySelector(".search-button").addEventListener("click", () => {
        const activeTab = document.querySelector(".tab.active").getAttribute("onclick").match(/'(\w+)'/)[1];
        // Збираємо значення з усіх полів
        const vehicleType = document.querySelector("select[name='vehicleType']").value || null;
        const brand = document.querySelector("input[name='brand']").value.trim() || null;
        const model = document.querySelector("input[name='model']").value.trim() || null;
        const region = document.querySelector("input[name='region']").value.trim() || null;
        const year = document.querySelector("input[name='year']").value.trim() || null;
        const priceFrom = document.querySelector("input[name='priceFrom']").value.trim() || null;
        const priceTo = document.querySelector("input[name='priceTo']").value.trim() || null;

        // Формуємо критерії пошуку
        const searchCriteria = {
            type: activeTab,
            vehicleType: vehicleType === "any" ? null : vehicleType,
            brand,
            model,
            region,
            year,
            priceFrom,
            priceTo,
        };

        // Формуємо параметри для URL
        const params = new URLSearchParams(searchCriteria).toString();

        // Перехід на сторінку результатів із параметрами
        window.location.href = `result_search.html?${params}`;
    });
});


