function isPc() {
    return window.innerWidth >= 1024;
}
(function(win, $) {
    var spot = $('.main_section');
    var height = isPc() ? Math.max(window.innerHeight, spot.height(), 900) : Math.max(window.innerHeight, 1200);
    var commonCss = { 'margin-top': '-' + height + 'px' };
    var character = spot.find('.character').children().css(commonCss);
    var afterCss = { 'margin-top': 0 };

    var dropTargets = function(targets, interval, speed, boundClass) {
        if (!boundClass) {
            boundClass = 'jsBound01';
        }
        var length = targets.length;
        for (var i = length; i > 0; i--) {
            var idx = Math.floor(Math.random() * i);
            targets.eq(idx).delay((length - i) * interval).animate(afterCss, speed, 'easeOutBounce', function() {
                $(this).addClass(boundClass);
            });
            targets.splice(idx, 1);
        }
    };
    var timer = 1000;
    setTimeout(function() {
        dropTargets(character, 100, 1200);
    }, timer);

    var scrollAnimation = function() {
        $(window).on('scroll', function() {
            var ctPosition1 = $('#register').offset().top;
            var ctPosition2 = $('#event').offset().top;
            var ctPosition3 = $('#rwby_quest').offset().top;
            var ctPosition4 = $('#coming').offset().top;
            var ctPosition5 = $('#war').offset().top;
            var initPositon = $(window).scrollTop();
            if (initPositon > ctPosition1 - $(win).outerHeight() / 2) {
                TweenMax.staggerTo('.js-animation', 0.5, { opacity: 1, bottom: 0 }, 0.25);
            }
            if (initPositon > ctPosition2 - $(win).outerHeight() / 2) {
                TweenMax.staggerTo('.js-animation2', 0.5, { opacity: 1, bottom: 0 }, 0.15);
            }
            if (initPositon > ctPosition3 - $(win).outerHeight() / 2) {
                TweenMax.staggerTo('.js-animation3', 0.5, { opacity: 1, bottom: 0 }, 0.15);
            }
            if (initPositon > ctPosition4 - $(win).outerHeight() / 2) {
                TweenMax.staggerTo('.js-animation4', 1, { opacity: 1, bottom: 0 }, 0.5);
            }
            if (initPositon > ctPosition5 - $(win).outerHeight() / 2) {
                TweenMax.staggerTo('.js-animation5', 0.5, { opacity: 1, bottom: 0 }, 0.1);
            }
        }).scroll();
    };
    $(window).on('load', function() {
        scrollAnimation();
    });
})(window, window.jQuery);