$(document).ready(function () {
    $('.sidenav').sidenav();
    
    $('.pushpin').pushpin({
        top: $('.pushpin').offset().top-5,
    });
    /*$('.pushpin').each(function() {
        var $this = $(this);
        var $target = $('#' + $(this).attr('data-target'));
        $this.pushpin({
        top: $target.offset().top-5,
        //bottom: $target.offset().top + $target.outerHeight() - $this.height()
        offset:5
        });
    });*/

    $('.scrollspy').scrollSpy({scrollOffset: $('.scrollspy').scrollOffset=0});

    wow = new WOW({
        animateClass: 'animated',
        offset: 100
    });
    wow.init();
});
