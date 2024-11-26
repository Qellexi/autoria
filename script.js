function toggleVinBlock(tab) {
        const vinBlock = document.getElementById('vin-block');
        const searchButtons = document.querySelector('.search-buttons');
        
        // Якщо обрано "Всі" або "Вживані", показуємо блок
        if (tab === 'all' || tab === 'used') {
            vinBlock.classList.remove('hidden');
            searchButtons.style.marginTop = '76px'; // Встановлюємо стандартний відступ
        } else {
            // В інших випадках приховуємо блок
            vinBlock.classList.add('hidden');
            searchButtons.style.marginTop = '130px'; // Збільшуємо відступ
        }

        // Оновлюємо активний клас для вкладок
        document.querySelectorAll('.tab').forEach(tabElement => tabElement.classList.remove('active'));
        document.querySelector(`.tab[onclick="toggleVinBlock('${tab}')"]`).classList.add('active');
    }
document.querySelector('.listen-button').addEventListener('click', () => {
    alert('Розпочато голосовий пошук');
});
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    // Оновлення активного слайду
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
    slides[index].classList.add('active');

    // Оновлення активної точки
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Ініціалізація слайдера
showSlide(currentSlide);
