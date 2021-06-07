$(document).ready(function(){
	$('.carousel_inner').slick({
		//dots: true,
		speed: 1200,
		//adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 2000,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
		responsive: [
		{
			breakpoint: 992,
			settings: {
				dots: true,
				arrows:false,
			}
		}
		]
	});

	$('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_activ)', function() {
		$(this)
		.addClass('catalog_tab_activ').siblings().removeClass('catalog_tab_activ')
		.closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
	});

	/*$('.catalog-item_link').each(function(i){
		$(this).on('click', function(e){
			e.preventDefault();
			$('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
			$('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active')
		})
	})

	$('.catalog-item_back').each(function(i){
		$(this).on('click', function(e){
			e.preventDefault();
			$('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
			$('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active')
		})
	})*/
	function toggleSlide(item) {
		$(item).each(function(i){
		$(this).on('click', function(e){
			e.preventDefault();
			$('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
			$('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active')
			})
		});
	};
	toggleSlide('.catalog-item_link');
	toggleSlide('.catalog-item_back');

	//Modal window

	$('[data-modal=consultation]').on('click', function(){
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal_close').on('click',function(){
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});
	//Выводит на экран пульсометры
	/*$('.button_mini').on('click', function(){
		$('.overlay, #order').fadeIn('slow');
	});*/
	//Выводит на экран пульсометры с их названием
	$('.button_mini').each(function(i){
		$(this).on('click', function(){
			$('#order .modal_description').text($('.catalog-item_subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	}); 

	//Работа с плагином для формы

	function validateForms(form){
		$(form).validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			phone: "required",
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: {
				required: "Пожалуйста введите свое имя",
				minlength: jQuery.validator.format("Введите {0} символа!")	
			},
			phone: "Пожалуйста введите свой номер",
			email: {
				required: "Пожалуйста введите свою почту",
				email: "Неправельно введен адрес"
			}
		}

	});	
	};	
	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');

	/*Для телефона*/
	$('input[name=phone]').mask("+7 (999) 999-99-99");

	//Отправка сообщеия на почту
	$('form').submit(function(e){
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function(){
			$(this).find("input").val("");

			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow')

			$('form').trigger('reset');
		});
		return false;
	});

	//Smooth scroll and pageup 
	//отображение и скрытие
	$(window).scroll(function(){
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	//плавный скролл
	 $("a[href=#up]").click(function(){
                var _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });
	//задержка в анимации
	new WOW().init();

});
