(function (win, $) {
    var scrollChangeColor = function() {
        var ctPosition0 = $('#main').offset().top;
        var ctPosition1 = $('#register').offset().top;
        var ctPosition2 = $('#event').offset().top;
        var ctPosition3 = $('#rwby_quest').offset().top;
        var ctPosition4 = $('#coming').offset().top;
        var ctPosition5 = $('#war').offset().top;
        var ctHeight0 = $('#main').outerHeight();
        var ctHeight1 = $('#register').outerHeight();
        var ctHeight2 = $('#event').outerHeight();
        var ctHeight3 = $('#rwby_quest').outerHeight();
        var ctHeight4 = $('#coming').outerHeight();
        var ctHeight5 = $('#war').outerHeight();
        var initPositon = $(window).scrollTop();
            if (initPositon > ctPosition0 - $(win).outerHeight() / 2 && initPositon < ctPosition0 + ctHeight0 - $(win).outerHeight() / 2) {
                $('.gnb_list li').removeClass('is_active');
            }
            else if (initPositon > ctPosition1 - $(win).outerHeight() / 2 && initPositon < ctPosition1 + ctHeight1 - $(win).outerHeight() / 2) {
                $('.gnb_list li').removeClass('is_active');
                $('.gnb_list .regis').addClass('is_active');
            }
            else if (initPositon > ctPosition2 - $(win).outerHeight() / 2 && initPositon < ctPosition2 + ctHeight2 - $(win).outerHeight() / 2) {
                $('.gnb_list li').removeClass('is_active');
                $('.gnb_list .event').addClass('is_active');
            }
            else if (initPositon > ctPosition3 - $(win).outerHeight() / 2 && initPositon < ctPosition3 + ctHeight3 - $(win).outerHeight() / 2) {
                $('.gnb_list li').removeClass('is_active');
                $('.gnb_list .rwby').addClass('is_active');
            }
            else if (initPositon > ctPosition4 - $(win).outerHeight() / 2 && initPositon < ctPosition4 + ctHeight4 - $(win).outerHeight()/2) {
                $('.gnb_list li').removeClass('is_active');
                $('.gnb_list .coming').addClass('is_active');
            }
            else if (initPositon > ctPosition5 - $(win).outerHeight() / 2 && initPositon < ctPosition5 + ctHeight5 - $(win).outerHeight() / 2) {
                $('.gnb_list li').removeClass('is_active');
                $('.gnb_list .war').addClass('is_active');
            }
    };
    var gnbActive = function(){
        $(".gnb_list li").on("click", function(){
            $(this).addClass('is_active').siblings().removeClass('is_active');
        })
        };
    var applistShow = function(){
        var initPositon = $(window).scrollTop();
        var ctPosition1 = $('#register').offset().top;
        if(initPositon > ctPosition1 - $(win).outerHeight() / 2){
            $('.app_list').show();
        }
        else{
            $('.app_list').hide();
        }
    }
    var openVideo = function () {
        $(".main_section .btn_video_play,.video_wrap .btn_video_play").on("click", function () {
            $('body').addClass('not_scroll')
            $(".dimmed,.layer_video").addClass("is_open");
        });
    };
    var closeLayer = function () {
        $(".dimmed, .btn_close, .btn_close_gnb_mo, .pop_btn, .gnb_wrap, .btn_home").on("click", function () {
            $(".gnb_wrap, .dimmed, .layer_video, .layer_pop ,.layer_error").removeClass("is_open");
            $('body').removeClass('not_scroll')
        });
    };
    var openGnbMo = function() {
        $('header .btn_gnbopen').on('click', function() {
            $('body').addClass('not_scroll')
            $(".gnb_wrap").addClass("is_open")
        });
    };
    var scrollToTop = function() {
        $('a[href*="#main"]').on('click', function() {
            $('html,body').stop().animate({
                scrollTop: 0
            }, {
                duration: 700,
                'easing': 'easeInOutExpo'
            });
        });
    };
    var scrollDown = function() {
        $('.scroll_box a[href*="#"]').on('click', function(e) {
            $('html,body').stop().animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, {
                duration: 700,
                'easing': 'easeInOutExpo'
            });
            e.preventDefault();
        });
    };
    var scrollSection = function() {
        $('.gnb_link').on('click', function() {
            if($(window).width() < 1024){
                $(".gnb_wrap").removeClass("is_open");
                $(".dimmed, .layer_video").removeClass("is_open");
            }
            $('html,body').stop().animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, {
                duration: 700,
                'easing': 'easeInOutExpo'
            });
        });
    };
    var checkSize = function() {
        if ($(window).width() > 1024){
            $(".gnb_wrap").removeClass("is_open")
            $('body').removeClass('not_scroll')
        }
        else{
        }
    };
    var defaultMO = function(){
        if ($(window).width() < 1024) {
            if($(window).scrollTop() > 0){
                $(".header").addClass("is_active")
            }
            else{
                $(".header").removeClass("is_active")
            }
        }
    }
    var scrollCloudEventSection = function(){
        var initPositon = $(window).scrollTop();
        var ctPosition = $('#event').offset().top;
        var ctPosition2 = $('#rwby_quest').offset().top;
        var ctHeight = $('#event').outerHeight();
        if($(window).width() > 1023){
            if(initPositon > ctPosition && initPositon < ctPosition2){
                $('.img_cloud_pc').addClass('is_active')
                if(initPositon > ctPosition2 - ctHeight/2 - 11*ctHeight/100) {
                    $('.img_cloud_pc').removeClass('is_active')
                    $('.img_cloud_pc').addClass('is_stop')
                }
                else{
                    $('.img_cloud_pc').removeClass('is_stop')
                }
            }
            else{
                $('.img_cloud_pc').removeClass('is_active')
            }
        }
        else{
            if(initPositon > ctPosition && initPositon < ctPosition2){
                $('.img_cloud_pc').addClass('is_active')
                if(initPositon > ctPosition2 - ctHeight/2) {
                    console.log("c")
                    $('.img_cloud_pc').removeClass('is_active')
                    $('.img_cloud_pc').addClass('is_stop')
                }
                else{
                    $('.img_cloud_pc').removeClass('is_stop')
                }
            }
            else{
                $('.img_cloud_pc').removeClass('is_active')
            }
        }
    }
    var scrollBgWarSection = function(){
        var initPositon = $(window).scrollTop();
        var ctPosition = $('#war').offset().top;
        var ctPositionFooter = $('.footer').offset().top;
        if(initPositon > ctPosition && initPositon < ctPositionFooter){
            $('.bg_war').addClass('is_active')
            if(initPositon > ctPositionFooter - $(win).outerHeight() - 2.16*$(win).outerWidth()/100){
                $('.bg_war').removeClass('is_active')
                $('.bg_war').addClass('is_stop')
            }
            else{
                $('.bg_war').removeClass('is_stop')
            }
        }
        else{
            $('.bg_war').removeClass('is_active')
        }
    }
    $(win).on('resize', function() {
        checkSize();
        defaultMO();
        applistShow();
    });

    $(win).on("load", function () {
        applistShow();
        gnbActive();
        openVideo();
        closeLayer();
        scrollSection();
        scrollToTop();
        openGnbMo();
        defaultMO();
        scrollDown();
    });

    $(win).on("scroll", function () {
        scrollCloudEventSection();
        scrollBgWarSection();
        applistShow();
        defaultMO(); 
        scrollChangeColor();
    });
})(window, window.jQuery);
