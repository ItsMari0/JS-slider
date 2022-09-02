function Carousel(containerID = '#carousel', slideID = '.slide') {
    this.container = document.querySelector(containerID);
    this.slides = this.container.querySelectorAll(slideID);
    //this.indicatorsContainer = this.container.querySelector('#indicators-container');   
    
}

Carousel.prototype = {
    _initProps() {
        this.SLIDES_COUNT = this.slides.length;
        this.FA_PAUSE = '<i class="fa fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="fa fa-play-circle"></i>';
        this.CODE_LEFT_ARROW = 'ArrowLeft';
        this.CODE_RIGHT_ARROW = 'ArrowRight';
        this.CODE_SPACE = 'Space';
    
        this.currentSlide = 0;
        this.isPlaying = true;
        this.timerID = null;
        this.interval = 2000;
        this.swipeStartX = null;
        this.swipeStopX = null;
    },
    _initIndicators() {   
    /**
     * <div id="indicators-container" class="indicators">
      <div class="indicator active" data-slide-to="0"></div>
      <div class="indicator" data-slide-to="1"></div>
      <div class="indicator" data-slide-to="2"></div>
      <div class="indicator" data-slide-to="3"></div>
      <div class="indicator" data-slide-to="4"></div>
    </div>
     */
       const indicators = document.createElement('div');
       indicators.setAttribute('id', 'indicators-container');
       indicators.setAttribute('class', 'indicators');
        for (let i = 0; i < this.SLIDES_COUNT; i++) {
            const indicator = document.createElement('div');
            indicator.setAttribute('class', 'indicator');
            indicator.setAttribute('data-slide-to', i);
            if (i === 0) {
              indicator.classList.add('active');  
            }
            indicators.append(indicator);
        }
       this.container.append(indicators);
       this.indicatorsContainer = this.container.querySelector('.indicators');
       this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
    },
    _initControls() {
    /*<div id="controls-container" class="controls">
      <span id="pause-btn" class="control control-pause"><i class="fa fa-pause-circle"></i></span>
      <span id="prev-btn" class="control control-prev"><i class="fa fa-angle-left"></i></span>
      <span id="next-btn" class="control control-next"><i class="fa fa-angle-right"></i></span>
    </div> */
        const controls = document.createElement('div');
        controls.setAttribute('class','controls');
        const PAUSE = '<span id="pause-btn" class="control control-pause"><i class="fa fa-pause-circle"></i></span>';
        const PREV = '<span id="prev-btn" class="control control-prev"><i class="fa fa-angle-left"></i></span>';
        const NEXT = '<span id="next-btn" class="control control-next"><i class="fa fa-angle-right"></i></span>';
        controls.innerHTML = PAUSE + PREV + NEXT;
        this.container.append(controls);
        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
        this.nextButton = this.container.querySelector('#next-btn');
    },
    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextButton.addEventListener('click', this.next.bind(this));
        this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
        document.addEventListener('keydown', this._pressKey.bind(this)); 
    },
     _goToNth(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    },    
    _goToNext() {
        this._goToNth(this.currentSlide + 1);
    },    
    _goToPrev() {
        this._goToNth(this.currentSlide - 1);
    },    
    _pause() {
        this.isPlaying = false;
        this.pauseBtn.innerHTML = this.FA_PLAY;
        clearInterval(this.timerID);
    },    
    _play() {
        this.isPlaying = true;
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this._tick();
    },
    _indicate(e) {
        const target = e.target;
        if (target.classList.contains('indicator')) {
                this._pause();
                //console.log(target.getAttribute('data-slide-to'));
                this._goToNth(+target.getAttribute('data-slide-to'));
        }
    },        
    _pressKey(e) {
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    },    
    _tick() {
        this.timerID = setInterval(this._goToNext.bind(this), this.interval);
    },    
    pausePlay() {        
        this.isPlaying ? this._pause() : this._play();
    },        
    next() {
        this._pause();
        this._goToNext();
    },        
    prev() {
        this._pause();
        this._goToPrev();
    },
    init: function() {
        this._initProps();
        this._initIndicators();
        this._initControls();
        this._initListeners();
        this._tick();
    },
};
Carousel.prototype.construct = Carousel;
