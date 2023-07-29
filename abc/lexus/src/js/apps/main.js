(function (win, $) {
// Gnb
    hoverShowGnb = function (){
        $('.gnb_btn').hover(function(){
            $('.gnb_btn').removeClass('is_active')
            $(this).closest(".gnb_list").addClass("is_hover")
            $(this).addClass('is_active')
            // show gbn sub
            $('.gnb-sub_inner').addClass('is_show')
            $('.gnb-sub').addClass('is_active')
            showMenuGnb()
            $('body').addClass('not_scroll')
        },function(){
            mouseOverCloseAreaGnb()
        })
    }
    showMenuGnb = function (){
        $('.gnb_btn').each(function(index){
            if($(this).hasClass('is_active')){
                $(".gnb-sub_menu").eq(index).addClass('is_show')
            }
            else{
                $(".gnb-sub_menu").eq(index).removeClass('is_show')
            }
        })
    }
    mouseOverCloseAreaGnb = function (){
        $('.gnb-sub').mouseleave(function(){
            $(this).removeClass('is_active')
            $('.gnb_list').removeClass('is_hover')
            $('.gnb_btn').removeClass('is_active')
            $('.gnb-sub_inner').removeClass('is_show')
            $('.gnb-sub_item').removeClass('is_show')
            $('.gnb-dept_item').removeClass('is_show')
            $('body').removeClass('not_scroll')
        })
    }
    closeAreaGnb = function(){
        $(document).on('click',function(e){
            if(!($(e.target).hasClass('gnb-sub_link')) && ($('.gnb-sub').hasClass('is_active'))){
                $('.gnb-sub').removeClass('is_active');
                $('.gnb-sub_inner').removeClass('is_show');
                $('.gnb-sub_item').removeClass('is_show')
                $('.gnb-dept_item').removeClass('is_show')
                $('body').removeClass('not_scroll')
            }
        })
        
    }
    
    handleHover = function(){
        $('.gnb-sub_item').hover(function(){
            $('.gnb-sub_item').removeClass('is_show')
            $(this).addClass('is_show')
        })
        $('.gnb-dept_item').hover(function(){
            $('.gnb-dept_item').removeClass('is_show')
            $(this).addClass('is_show')
        })
    }
// carousel-section
    selectHolderBtn = function(){
        $('.title-holder_btn').on('click',function(){
            $('.title-holder_btn').removeClass('is_active')
            $(this).addClass('is_active')
            carSlider[$(this).parent(".title-holder_item").index()].swiper.slideTo(0);
            $('.carousel-car').removeClass('is_active');
            $('.carousel-car').eq($(this).parent(".title-holder_item").index()).addClass('is_active');
            initColor()
            carSlider[$('.title-holder_btn').length-1].swiper.slideTo(0);
        })
    }
    var carSlider = $(".carousel-car_slider")
    var title = $('.carousel-car_title_item')
    var linkCarousel = $('.link_list')
    initColor = function(){
        $('.models-visual_title-holder').removeClass('txt_white')
        $('.carousel-car_title_item .txt_white').removeClass('is_show')
        $('.swiper-pagination').removeClass('txt_white')
    }
    showTitleCarousel = function(){
            title.removeClass('is_show')
            carActive =$('.carousel-car').find('.carousel-car_item')
            $('.models-visual_title-holder').removeClass('txt_white')
            $('.swiper-pagination').removeClass('txt_white')
            $('.link_list').removeClass('is_show')
            for(let i = 0 ; i < carActive.length ; i++){
                if($(carActive[i]).hasClass('swiper-slide-active')){
                    $(title[i]).addClass('is_show')
                    $(linkCarousel[i]).addClass('is_show')
                }
                // change text color when change background
                if ($(title[i]).hasClass('txt_white') && $(title[i]).hasClass('is_show')){
                    $('.models-visual_title-holder').addClass('txt_white')
                    $('.swiper-pagination').addClass('txt_white')
                }
        }
    }
// Stories section
    viewMoreBtn = $('.stories_btn')
    loadMoreEl = $('.stories_load-more')
    lastStoriesItem = $('.stories_item:last-child')
    console.log(lastStoriesItem)
    clickShowViewMore = function(){
        viewMoreBtn.on('click',function(){
            lastStoriesItem.css('display','block')
            loadMoreEl.addClass('is_show')
        })
    }
// hide/show video layer 
var layer = $('.layer')
var layerVideo = $('.layer_video')
var btnLinkVideo = $('.film-brand_link')
var btnCloseVideo = $('.btn_close-video')
showHideVideo = function(){
    btnLinkVideo.on('click',function(){
        layer.addClass('is_show')
        layerVideo.addClass('is_open')
        $('.iframe-video').attr('src','https://www.youtube.com/embed/lTmMs-EJGxM?autoplay=1')
    })
    btnCloseVideo.on('click',function(){
        layer.removeClass('is_show')
        layerVideo.removeClass('is_open')
        $('.iframe-video').attr('src','')
    })
}
// gnb mobie 
var btnNavMobile = $('.header_open-nav-mo')
var areaGnbMobile = $('.gnb_area-mo')
var btnShowItemMobile = $('.gnb_menu_item-mo')
toggleBtnNavMobile = function(){
    btnNavMobile.on('click',function(){
        btnNavMobile.toggleClass('is_show')
        areaGnbMobile.toggleClass('is_show')
        $('body').toggleClass('not_scroll')
    })
}
showAndHideAreaMobile = function(){
    btnShowItemMobile.on('click',function(){
        $(this).children('.gnb_menu_btn-mo').toggleClass('change')
        $(this).children('.gnb_menu-sub_list-mo').slideToggle(200,"linear").toggleClass('is_active')
    })
}
initWhenresize = function(){
    if($(window).outerWidth() > 1024){
        $('.header_open-nav-mo,.gnb_area-mo').removeClass('is_show')
        $('.gnb_menu-sub_list-mo').removeClass('is_active')
        $('body').removeClass('not_scroll')
        $('.footer').removeClass('is_mobile');
        $('.footer_menu_item-sub').css('display','block')
    }
    else{
        $('.footer').addClass('is_mobile');
        $('.footer_menu_item-sub').css('display','none')
        $('.footer_title').removeClass('change')
    }
}
// footer-mobile
showHideFooterList = function (){
    $('.footer_menu_item').on('click',function(){
        if($(window).outerWidth() < 1024){
            $(this).children('.footer_title').toggleClass('change')
            $(this).children('.footer_menu_item-sub').slideToggle(200,"linear").toggleClass('is_active')
        }
    })
}

// swiper
    new Swiper('.key-visual', {
        slidesPerView: 1,
        direction: 'horizontal',
        centeredSlides: true,
        loop: true,
        autoplay:{
            delay: 2000,
        },
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
        
    });
    new Swiper('.offersSwiper', {
        slidesPerView: 1,
        direction: 'horizontal',
        slidesPerView: "auto",
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    var initCarouselCarSlider = function(){
        for(let i=0; i < carSlider.length; i++){
            var $el = carSlider[i]
            pagination = `.swiper-pagination-${i}`
                SwiperCarouselCar = new Swiper($el, {
                    slidesPerView: "auto",
                    slideToClickedSlide:true,
                    centeredSlides: true,
                    speed: 300,
                    pagination: {
                        el: pagination,
                        type: "fraction",
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    observer: true,
                    observeParents:true,
                    on:{
                        slideChangeTransitionStart:function(){
                            showTitleCarousel()
                        }
                    }
                });
            }
                }
    $(win).on('load', function () {
        hoverShowGnb()
        selectHolderBtn()
        initCarouselCarSlider()
        closeAreaGnb()
        clickShowViewMore()
        showHideVideo()
        toggleBtnNavMobile()
        showAndHideAreaMobile()
        showHideFooterList()
        handleHover()
    });
    $(win).on('resize', function () {
        initWhenresize();
    });
    
    

})(window, window.jQuery);