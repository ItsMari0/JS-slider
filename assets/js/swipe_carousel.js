
function SwipeCarousel() {
    Carousel.apply(this,arguments)
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;
SwipeCarousel.prototype.initListeners = function() {
    Carousel.prototype.initListeners.apply(this);
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeStop.bind(this));
}

SwipeCarousel.prototype._swipeStart = function(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
}
SwipeCarousel.prototype._swipeStop = function(e) { 
    this.swipeStopX = e.changedTouches[0].pageX;
    if (this.swipeStartX - this.swipeStopX < 100) this.prev();
    if (this.swipeStartX - this.swipeStopX > 100) this.next();
}