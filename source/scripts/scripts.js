$(document).ready(function () {


    $('.main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        dots: false,
        asNavFor: '.nav-slider',

    });

    $('.nav-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        arrows: true,
        dots: false,
        centerMode: true,
        centerPadding: '0px',
        focusOnSelect: true,
        asNavFor: '.main-slider',
        prevArrow: '.sale-item-slider-prev',
        nextArrow: '.sale-item-slider-next',

    });

// Горизонтальный слайдер

    $('.sale-item-image-horiz-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        asNavFor: '.nav-slider-horiz',
    });

    $('.nav-slider-horiz').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '0px',
        dots: false,
        focusOnSelect: true,
        asNavFor: '.sale-item-image-horiz-slider',
        prevArrow: '.sale-item-slider-horiz-prev',
        nextArrow: '.sale-item-slider-horiz-next',
    });

    //
    //
    //
    //


    $('.feedback-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: '.feedback-slider-prev',
        nextArrow: '.feedback-slider-next',
        responsive: [
            {
                breakpoint: 890,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '0px',
                }
            }

        ]

    });

    $(function () {
        $(".faq-accordion").accordion({
            heightStyle: 'content',
            icons: {
                "header": "ui-accordion-header-icon",
                "activeHeader": "ui-accordion-header-active-icon",
                "collapsedHeader": "ui-accordion-header-icon"
            },
        });
    });


    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = e.target.getAttribute('href').substr(1);

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }


// Это таймер с библиотекой moment.js :

    // let targetTime = moment().add(26, 'hours').add(55, 'minutes').add(30, 'seconds');
    //
    // setInterval(updateTimer, 1000);
    // function updateTimer() {
    //     let currentTime = moment();
    //
    //     let duration = moment.duration(targetTime.diff(currentTime));
    //
    //     if (duration.asSeconds() <= 0) {
    //         clearInterval();
    //         return;
    //     }
    //
    //     let hours = duration.hours();
    //     let minutes = duration.minutes();
    //     let seconds = duration.seconds();
    //
    //     $('#hours').text(hours);
    //     $('#minutes').text(minutes);
    //     $('#seconds').text(seconds);
    // }


//Обычный таймер :

    let hours = 26;
    let minutes = 55;
    let seconds = 30;

    let timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
            return;
        }

        seconds--;

        if (seconds < 0) {
            minutes--;
            seconds = 59;
        }

        if (minutes < 0) {
            hours--;
            minutes = 59;
        }

        $('#hours').text(hours);
        $('#minutes').text(minutes);
        $('#seconds').text(seconds);
    }


// Клик по хедеру в списке продуктов

    const lists = $('#header .products-header-navigation');

    lists.on('click', function () {

        lists.removeClass('active');

        $(this).addClass('active');

        if ($('#all').hasClass('active')) {

            $('.product-item').removeClass('hidden');
        } else {
            $('.product-item').addClass('hidden');

            if ($('#rare').hasClass('active')) {
                $('.rare').removeClass('hidden');

            }
            if ($('#new').hasClass('active')) {

                $('.new').removeClass('hidden');

            }
            if ($('#sale').hasClass('active')) {

                $('.sale-product').removeClass('hidden');
            }
        }
    });


// Вызов попап

    const popup = $('.pop-up');
    const popupForm = $('.pop-up-item-form');
    const success = $('.success');

    $('.buyButton').click(() => {

        popup.css('display', 'flex');

    });

    $('#popupClose').click(() => {
        $('#inputName').val('');
        $('#inputPhone').val('');
        popup.css('display', 'none');
        popupForm.css('display', 'block');
        success.css('display', 'none');

    });


// Валидация формы


    $('#orderButton').click(() => {

        const name = $('#inputName');
        const phone = $('#inputPhone');

        let validName, validPhone;

        function validate(input, error) {
            if (!input.val()) {
                error.css('display', 'block');
                input.css('border-color', 'darkred');
                return false;
            } else {
                error.css('display', 'none');
                input.css('border-color', 'black');
                return true;
            }
        }

        validName = validate(name, $('#nameError'));
        validPhone = validate(phone, $('#phoneError'));


        if (validName && validPhone) {

            $.ajax({
                url: 'https://testologia.site/checkout',
                method: 'POST',
                data: {
                    name: name.val(),
                    phone: phone.val(),
                },

                success: function (data) {
                    console.log(data);

                    if (data.success === 1) {
                        popupForm.css('display', 'none');
                        success.css('display', 'block');
                    }
                    if (data.success === 0) {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                    }
                }
            });
        }
    })

// Кнопка homebutton

    window.addEventListener('scroll', function () {
        const button = document.querySelector('.home-button');
        let scrollPosition = window.scrollY;

        if (scrollPosition >= 1800) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });


});


















