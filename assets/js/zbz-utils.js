/*
 zbz-utils.js v1.0.0
 Copyright (c)2014 Sergey Serafimovich
*/


$().ready(function(){
	$("[data-role=zbz-equal-height]").zbzEqualHeight();
	$("[data-role=fotorama-fullscreen]").zbzFotoramaInFullscreen();
});

(function ( $ ) {

	"use strict";
	
    $.fn.zbzEqualHeight = function( options ) {
 		$(this).each(function(){
 			var $els = $(this).children("div,p,section");
 			var max = 0;
 			$els.each(function(){
 				var height = 0;
 				$(this).children().each(function(){
 					height += $(this).height();
 				});
 				if( height > max) {
 					max = height;
 				}
 			});

 			$els.height(max);
 			
 		});
 		
    };
 
}( jQuery ));


(function ( $ ) {

	"use strict";
	
    $.fn.zbzFotoramaInFullscreen = function( options ) {
 		$(this).each(function(){
			var $gallery = $('<div></div>').prependTo("body").fotorama({
				allowfullscreen: true,
				nav: 'thumbs'
			});
			
			$gallery.hide();

			var photos = $(this).data("photos");
			
			var fotorama = $gallery.data('fotorama');
			
			fotorama.load(photos);
			
			$gallery.on('fotorama:fullscreenexit', function(){
				  $(this).hide();
			});
 		
		    $(this).click(function(e){
				e.preventDefault();
				$gallery.show();
				fotorama.requestFullScreen();		
		    });
 		});
    };
}( jQuery ));


