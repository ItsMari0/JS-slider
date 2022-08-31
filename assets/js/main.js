(function (){
    const container = document.querySelector('#carousel');
    const slides = document.querySelectorAll('.slide');
    const indicatorsContainer = container.querySelector('#indicators-container')
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    const pauseBtn = container.querySelector('#pause-btn');
    const prevBtn = container.querySelector('#prev-btn');
    const nextButton = container.querySelector('#next-btn');
    
    const SLIDES_COUNT = slides.length;
    const FA_PAUSE = '<i class="fa fa-pause-circle"></i>';
    const FA_PLAY = '<i class="fa fa-play-circle"></i>';
    const CODE_LEFT_ARROW = 'ArrowLeft';
    const CODE_RIGHT_ARROW = 'ArrowRight';
    const CODE_SPACE_ARROW = 'Space';
    
    let currentSlide = 0;
    let isPlaying = true;
    let timerID = null;
    let interval = 2000;
    let swipeStartX = null;
    let swipeStopX = null;
    
    function goToNth(n) {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
    }
    
    const goToNext = () => goToNth(currentSlide + 1);
    const goToPrev = () => goToNth(currentSlide - 1);
    
    function pause() {
        isPlaying = false;
        pauseBtn.innerHTML = FA_PLAY;
        clearInterval(timerID);
    }
    
    function play() {
        isPlaying = true;
        pauseBtn.innerHTML = FA_PAUSE;
        timerID = setInterval(() => goToNext(), interval);
    }
    
    const pausePlay = () => isPlaying ? pause() : play();
    
    function next() {
        pause();
        goToNext();
    }
    
    function prev() {
        pause();
        goToPrev();
    }
    
    function indicate(e) {
        const target = e.target;
        if (target.classList.contains('indicator')) {
            pause();
            //console.log(target.getAttribute('data-slide-to'));
            goToNth(+target.getAttribute('data-slide-to'));
        }
    }
    
    function pressKey(e) {
        if (e.code === CODE_RIGHT_ARROW) next();
        if (e.code === CODE_LEFT_ARROW) prev();
        if (e.code === CODE_SPACE_ARROW) pausePlay();
    }
    
    function swipeStart(e) {
        swipeStartX = e.changedTouches[0].pageX;
    }
    
    function swipeStop(e) { 
        swipeStopX = e.changedTouches[0].pageX;
        if (swipeStartX - swipeStopX < 100) prev();
        if (swipeStartX - swipeStopX > 100) next();
    
    }
    
    function initListeners() {
        pauseBtn.addEventListener('click', pausePlay);
        prevBtn.addEventListener('click', prev);
        nextButton.addEventListener('click', next);
    
        indicatorsContainer.addEventListener('click', indicate);
        document.addEventListener('keydown', pressKey);
        container.addEventListener('touchstart', swipeStart);
        container.addEventListener('touchend',swipeStop);
    }
   
    function init() {
        timerID = setInterval(() => goToNext(), interval);
        initListeners();
    }
    init();
})();
