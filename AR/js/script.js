let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

// funciones apra ventanas modas 

// Función para abrir la ventana modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "flex";
}

// Función para cerrar la ventana modal
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Cerrar la modal si se hace clic fuera de la ventana modal
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

//----------- SLIDER funcnionesss -------------

// Mantener el seguimiento del índice de la imagen activa para cada modal
let currentSlideIndex = {}; // Almacena el índice de la imagen activa por modal

// Inicializa el índice de la primera imagen y asegura que las imágenes estén correctamente configuradas
function initializeSlider(modal) {
    const images = modal.querySelectorAll('.slider-image'); // Selecciona las imágenes del slider
    const modalId = modal.id; // Obtiene el ID del modal

    // Inicializa el índice si no existe
    if (!currentSlideIndex[modalId]) {
        currentSlideIndex[modalId] = 0;
    }

    // Asegura que solo la imagen activa tenga la clase 'active'
    images.forEach((img, index) => {
        img.classList.toggle('active', index === currentSlideIndex[modalId]);
    });
}

// Cambia la imagen del slider en función de la dirección (anterior o siguiente)
function changeSlide(modal, direction) {
    const images = modal.querySelectorAll('.slider-image'); // Selecciona las imágenes del modal
    const modalId = modal.id; // Obtiene el ID del modal

    // Oculta la imagen activa actual
    images[currentSlideIndex[modalId]].classList.remove('active');

    // Calcula el nuevo índice de la imagen activa
    currentSlideIndex[modalId] += direction;

    // Controla los límites del índice para que sea cíclico (regresa al inicio o al final)
    if (currentSlideIndex[modalId] < 0) {
        currentSlideIndex[modalId] = images.length - 1;
    } else if (currentSlideIndex[modalId] >= images.length) {
        currentSlideIndex[modalId] = 0;
    }

    // Muestra la nueva imagen activa
    images[currentSlideIndex[modalId]].classList.add('active');
}

// Configura el slider para todos los modales al cargar la página
function setupAllModalSliders() {
    const modals = document.querySelectorAll('.modal'); // Selecciona todos los modales

    modals.forEach(modal => {
        const prevButton = modal.querySelector('.prev'); // Botón para retroceder
        const nextButton = modal.querySelector('.next'); // Botón para avanzar

        // Inicializa el slider para el modal actual
        initializeSlider(modal);

        // Event listeners para los botones de navegación
        prevButton.addEventListener('click', () => changeSlide(modal, -1));
        nextButton.addEventListener('click', () => changeSlide(modal, 1));
    });
}

// Asegura que los sliders estén configurados al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
    setupAllModalSliders(); // Configura los sliders para todas las ventanas modales
});
