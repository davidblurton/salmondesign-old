$.fn.clicktoggle = function(a, b) {
    return this.each(function() {
        var clicked = false;

        $(this).bind("click", function() {
            if (clicked) {
                clicked = false;
                return b.apply(this, arguments);
            }

            clicked = true;
            return a.apply(this, arguments);
        });
    });
};

$(document).ready(function() {
    $('.photo-thumbnail .photo-content-temp').each(function() {
        var image = $(this).find('img[alt="featured"], img:first-of-type');
        var image_src = $(image).attr('src');
        var thumbnail = $(image).closest('.photo-thumbnail');
        var load_spinner = $(thumbnail).children('.photo-thumbnail-loading-progress');
        var post_content = $(thumbnail).children('.photo-content-temp');
        
        var temp_image = new Image();
        temp_image.src = image_src;
        temp_image.onload = function() {
            $(load_spinner).remove();
            $(post_content).remove();
            $(thumbnail).css({'opacity': 0, 'background-image': 'url(' + image_src + ')'}).animate({ opacity: 1 }, { duration: 500 });
        };
    });

	$('.photo-thumbnail').hover(
		function() {
			$(this).children('.photo-thumbnail-overlay').fadeIn(300);
		},
		function() {
			$(this).children('.photo-thumbnail-overlay').hide();
		}
	);

	$('.photo-full-caption img').each(function() {
		var imageSrc = $(this).attr('src');
		$(this).wrap('<a href="' + imageSrc + '" rel="darkbox"></a>');
	});

    $('.fotorama').fotorama({
        nav: 'thumbs',
        allowfullscreen: true,
        keyboard: true
    });

	$('a[rel=darkbox]').darkbox();

	$(window).scroll(function() {
    	if ($(this).scrollTop() > 20) {
        	$('.header').css('border-bottom', '1px solid #ccc');
     	}
     	else {
     		$('.header').css('border-bottom', 'none');
     	}	     
   	});

   	$('.photo-comments-expander').clicktoggle(
   		function() {
    		$('.photo-comments-container').show();    
   		},
   		function() {
			$('.photo-comments-container').hide();
   		}
   	);
});