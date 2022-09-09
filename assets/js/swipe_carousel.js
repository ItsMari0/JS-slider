
class SwipeCarousel extends Carousel {
    _initListeners = function() {
        super._initListeners();
        this.container.addEventListener('touchstart', this._swipeStart.bind(this));
        this.container.addEventListener('touchend', this._swipeStop.bind(this));
    }
    _swipeStart(e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    }
    _swipeStop(e) { 
        this.swipeStopX = e.changedTouches[0].pageX;
        if (this.swipeStartX - this.swipeStopX < 100) this.prev();
        if (this.swipeStartX - this.swipeStopX > 100) this.next();
    }
}
/*
function SwipeCarousel() {
    Carousel.apply(this,arguments)
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;*/

