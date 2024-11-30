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
function handleVoiceSearch(query) {
    console.log('Розпізнаний текст:', query);

    // Правила: транслітерація, велика літера, видалення точки
    const processedQuery = formatSearchQuery(query);
    console.log('Оброблений текст для пошуку:', processedQuery);

    // Розділяємо текст для формування критеріїв
    const [brand, model, region] = processedQuery.split(' ');

    const searchCriteria = {
        vehicleType: 'any',
        brand: brand || '',
        model: model || '',
        region: region || '',
    };

    // Формуємо параметри для URL
    const params = new URLSearchParams(searchCriteria).toString();

    // Перехід на сторінку результатів із параметрами
    window.location.href = `result_search.html?${params}`;
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

    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert('Ваш браузер не підтримує голосове розпізнавання.');
        return;
    }

    // Ініціалізація розпізнавання мови
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'uk-UA'; // Встановлюємо українську мову
    recognition.interimResults = false;

    const soundWave = document.querySelector('.sound-wave');
    const listeningText = document.querySelector('.listening-text');

    // Показуємо індикатори "Прослуховуємо"
    soundWave.classList.remove('hidden');
    listeningText.classList.remove('hidden');
    listeningText.textContent = 'Прослуховуємо...';
    soundWave.style.opacity = '1';
    listeningText.style.opacity = '1';

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();

        // Змінюємо текст на "Обробляємо запит..."
        listeningText.textContent = 'Обробляємо запит...';

        // Використовуємо примусову затримку для оновлення тексту
        setTimeout(() => {
            handleVoiceSearch(transcript);
        }, 1000); // Невелика затримка для відображення тексту
    };

    recognition.onerror = (event) => {
        listeningText.textContent = 'Помилка. Спробуйте знову.';
        setTimeout(() => {
            soundWave.classList.add('hidden');
            listeningText.classList.add('hidden');
        }, 2000);
    };

    recognition.onend = () => {
        // Приховуємо індикатори, якщо розпізнавання завершилось без результату
        if (listeningText.textContent === 'Прослуховуємо...') {
            listeningText.textContent = 'Завершено без результату.';
            setTimeout(() => {
                soundWave.classList.add('hidden');
                listeningText.classList.add('hidden');
            }, 2000);
        }
    };
});


function formatSearchQuery(query) {
    const map = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
        'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z',
        'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k',
        'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
        'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
        'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
        'ь': '', 'ю': 'yu', 'я': 'ya', ' ': ' ', '.': ''
    };

    // Таблиця виключень (слова, які транслітеруються по-особливому)
    const exceptions = {
        'королла': 'Corolla',
        'тойота': 'Toyota',
        'київ': 'Kyiv',
        'львів': 'Lviv'
    };

    // Розділяємо запит на слова
    const words = query.split(' ');

    // Перевіряємо кожне слово
    const formattedWords = words.map(word => {
        const lowerWord = word.toLowerCase();

        // Якщо є виключення, повертаємо спеціальне значення
        if (exceptions[lowerWord]) {
            return exceptions[lowerWord];
        }

        // Інакше транслітеруємо та форматумо за загальними правилами
        const transliterated = lowerWord
            .split('')
            .map(char => map[char] || char)
            .join('');

        return transliterated.charAt(0).toUpperCase() + transliterated.slice(1).replace(/\.$/, '');
    });

    return formattedWords.join(' ');
}




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
        const vehicleType = document.querySelector("select[name='vehicleType']").value || "any";
        const brand = document.querySelector("input[name='brand']").value.trim() || "";
        const model = document.querySelector("input[name='model']").value.trim() || "";
        const region = document.querySelector("input[name='region']").value.trim() || "";
        const year = document.querySelector("input[name='year']").value.trim() || "";
        const priceFrom = document.querySelector("input[name='priceFrom']").value.trim() || "";
        const priceTo = document.querySelector("input[name='priceTo']").value.trim() || "";

        // Формуємо критерії пошуку
        const searchCriteria = {
            type: activeTab,
            vehicleType,
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


