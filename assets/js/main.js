const slides = document.querySelectorAll('.slide');
const pauseButton = document.querySelector('#pause');

const SLIDES_COUNT = slides.length;
let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide + 1) % SLIDES_COUNT;
    slides[currentSlide].className = 'slide active';
}

function pause(){

    if (isPlaying){
        isPlaying = false;
        pauseButton.textContent = '>Play<';
        clearInterval(timerID);
    }
    
    else {
        isPlaying = true;
        pauseButton.textContent = 'Pause';
        timerID = setInterval(() => nextSlide(), interval);
    }

}

pauseButton.addEventListener('click', pause);

timerID = setInterval(() => nextSlide(), interval);
