const carousel = new Carousel(
    {
        containerID: '#carousel',
        slideID: '.slide',
        interval: 1500,
        isPlaying: false,
        direction: 'backward'
    }
);
carousel.init();
