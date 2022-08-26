const slides = document.querySelectorAll('.slide');
const pauseButton = document.querySelector('#pause');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

const SLIDES_COUNT = slides.length;
let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;

function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    slides[currentSlide].className = 'slide active';
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function pauseHandler() {
    isPlaying = false;
    pauseButton.textContent = 'Play';
    clearInterval(timerID);
}

function playHandler() {
    isPlaying = true;
    pauseButton.textContent = 'Pause';
    clearInterval(timerID);
}

function pause() {

    if (isPlaying){
        pauseHandler();
    }
    
    else {
        playHandler();
    }

}

function nextHandler() {
    pauseHandler();
    nextSlide();
}

function prevHandler() {
    pauseHandler();
    prevSlide();
}
pauseButton.addEventListener('click', pause);
previousButton.addEventListener('click', prevHandler);
nextButton.addEventListener('click',nextHandler);

timerID = setInterval(() => nextSlide(), interval);
