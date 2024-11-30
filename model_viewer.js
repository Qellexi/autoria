document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("model-container");

    // Перевіряємо, чи існує контейнер
    if (!container) {
        console.error("Елемент #model-container не знайдено!");
        return;
    }

    // Налаштування сцени, камери та рендера
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee); // Додаємо фон

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Додаємо освітлення
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 5);
    scene.add(light);

    // Додаємо контрол для обертання та масштабування
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 50;

    // Завантажуємо модель
    const loader = new THREE.GLTFLoader();
    loader.load(
        "result.gltf",
        function (gltf) {
            console.log("Модель завантажена:", gltf);
            const model = gltf.scene;
            scene.add(model);

            // Центруємо модель
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());

            model.position.x += model.position.x - center.x;
            model.position.y += model.position.y - center.y;
            model.position.z += model.position.z - center.z;

            camera.position.copy(center);
            camera.position.z += size * 2;
            camera.lookAt(center);
        },
        undefined,
        function (error) {
            console.error("Помилка завантаження моделі:", error);
        }
    );

    // Адаптація до зміни розмірів вікна
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Рендер сцени
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
});
