$( document ).ready(function() {
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

    runCarousel();
});

function runCarousel() {
    $('.carousel').carousel('next');
    setTimeout(runCarousel, 5000);
}