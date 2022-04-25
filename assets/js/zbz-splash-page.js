/*
 zbz-splash-page.js v1.1.0
 Copyright (c)2014 Sergey Serafimovich
*/

(function ( $ ) {

	"use strict";
 
    $.fn.zbzSplashPage = function( options ) {
    
        var settings = $.extend({
        	vertSelector: "[data-role=zbz-flying]",
        	mutedColor: [100,100,100,1],
        	strokeColor: [200,200,200,0.2],
        	strokeDashArray: "10000",
        	connectionType: "chain",
        	strokeWidth: 1,
        	
        }, options );

		
		var svg = $('<svg height="100%" width="100%" stroke-dasharray="'+ settings.strokeDashArray +'" style="stroke: rgba('+settings.strokeColor[0] +','+settings.strokeColor[1] +','+settings.strokeColor[2] +','+settings.strokeColor[3] +'); stroke-width: '+settings.strokeWidth+'; z-index: 0; position: absolute;" id="connectCircles"></svg>');
		$(".zbz-slide").first().before(svg);
		var svgns = "http://www.w3.org/2000/svg";
		
		var $circles = $(this).find(settings.vertSelector);
		var $slides = $(this).find(".zbz-slide");
		var lines = [];
		var lines2 = [];
		
		var slide = $(this).parents(".zbz-slide").first();
		var width = $(window).width();
		var height = $(window).height();
		
		var navigation = [];
		var slideConstants = {};
		
		var dont = false;
		
		// var skrollr = skrollrInit();
		
		var skrollrOptions = {
				easing: {
					inAndOut: function(p) {
						return (p*p)/(p*p+(1-p)*(1-p));
					},
					inAndOutScroll: function(p) {
						return (p*p)/(p*p+(1-p)*(1-p));
					},
					in: function(p) {
						return Math.min(1.1*Math.pow(p, 3), 1);
					},
					out: function(p) {
						return Math.min(1.1*(Math.pow((p - 1), 3) + 1), 1);
					} 
				}
			};
			
		var skr = skrollr.init(skrollrOptions);
		
		var navCurActive = null;


		/* Effects for appear and disappear */
		
		var effects = {
			slideInUp: {
				from: "transform[out]: translateY(" + height +"px); opacity[out]: 0",
				to: "transform[in]: translateY(" + 0 +"px); opacity[in]: 1",
			},
			slideOutUp: {
				from: "transform[in]: translateY(" + 0 +"px); opacity[in]: 1",
				to: "transform[out]: translateY(-" + height +"px); opacity[out]: 0;",
			},
			slideInDown: {
				from: "transform[out]: translateY(-" + height +"px); opacity[out]: 0",
				to: "transform[in]: translateY(" + 0 +"px); opacity[in]: 1",
			},
			slideOutDown: {
				from: "transform[in]: translateY(" + 0 +"px); opacity[in]: 1",
				to: "transform[out]: translateY(" + height +"px); opacity[out]: 0;",
			},
			slideInLeft: {
				from: "transform[out]: translateX(" + width +"px); opacity[out]: 0",
				to: "transform[in]: translateX(" + 0 +"px); opacity[in]: 1",
			},
			slideOutLeft: {
				from: "transform[in]: translateX(" + 0 +"px); opacity[in]: 1",
				to: "transform[out]: translateX(-" + width +"px); opacity[out]: 0;",
			},
			slideInRight: {
				from: "transform[out]: translateX(-" + width +"px); opacity[out]: 0",
				to: "transform[in]: translateX(" + 0 +"px); opacity[in]: 1",
			},
			slideOutRight: {
				from: "transform[in]: translateX(" + 0 +"px); opacity[in]: 1",
				to: "transform[out]: translateX(" + width +"px); opacity[out]: 0;",
			},
			scrollIn: {
				from: "transform: translateY(" + height +"px);",
				to: "transform: translateY(" + 0 +"px);",
			},
			scrollOut: {
				from: "transform: translateY(" + 0 +"px);",
				to: "transform: translateY(-" + height +"px);",
			},
			fadeIn: {
				from: "opacity[out]: 0",
				to: "opacity[in]: 1",
			},
			fadeOut: {
				from: "opacity[in]: 1",
				to: "opacity[out]: 0",
			},
		};
		
		
		/* Process the slides */
		
		
		function prepareSlides() {
			// Run through all slides
			for(var i = 0; i < $slides.length; i++) {
			
				var slide = $slides[i];
				
				var di = i*2;
				
				// Find elements with appear and dissapear animations
				var appear = $(slide).find("[data-appear]");
				var disappear = $(slide).find("[data-disappear]");
				
				// High and low points of visibility
				var low = (di)*100;
				var high = 0;
				
				// Apply appear animations
				appear.each(function(){
					var effect = $(this).data("appear");
					var delay = ($(this).data("delay")) ? $(this).data("delay") : 0;
					
					// var delay = ($(this).data("delay")) ? $(this).data("delay") : 0;
					this.setAttribute("data-" + ((di-1)*100+delay) + "p", effects[effect].from);
					this.setAttribute("data-" + ((di)*100+delay) + "p", effects[effect].to);
					// Get lowest point of visibility
					low = Math.min(((di-1)*100+delay), low);
				});
				
				// Apply disappear animations
				disappear.each(function(){
					var effect = $(this).data("disappear");
					var delay = ($(this).data("delay")) ? $(this).data("delay") : 0;
					
					// var delay = ($(this).data("delay")) ? $(this).data("delay") : 0;
					this.setAttribute("data-" + ((di)*101+delay) + "p", effects[effect].from);
					this.setAttribute("data-" + ((di+1)*100+delay) + "p", effects[effect].to);
					
					// Get highest point of visibility
					high = Math.max((di+1)*100+delay, high);
				});
				
				// If lowest point is not in a start then make slide hidden before it
				if (low > 0) {
					slide.setAttribute("data-" + (low-1) + "p", "visibility: hidden;");
					slide.setAttribute("data-" + (low) + "p", "visibility: visible;");
				}
				
				// If 'high' value is set then make slide hidden after it
				if (high) {
					slide.setAttribute("data-" + (high) + "p", "visibility: visible;");
					slide.setAttribute("data-" + (high+1) + "p", "visibility: hidden;");
				}
	
				
				// Find circles inside the slide
				var inCircles = $(slide).find(settings.vertSelector);
				
				// Run through all cirles in document
				$circles.each(function(){
				
					$(this).css("visibility", "visible");
					$(this).css("position", "relative");
					
					// Get color of circle
					var color = $(this).css("background-color").split("(")[1].split(",");
					for (var j = 0; j<color.length; j++) {
						color[j] = parseInt(color[j]);
					}
					
					// Get start position
					var start = $(this).data("start-values");
					
					if(color.length == 3) color[3] = 1;
				
					// If data-points for circle does not exist then set an empty array
					if(typeof $(this).data('points') != 'object') $(this).data('points', []);
					
					$(this).data('offset', {left: $(this).offset().left+$(this).outerWidth()/2, top: $(this).offset().top+$(this).outerHeight()/2});
					
					// If circle is not inside the slide of current iteration
					if(!inCircles.filter($(this)).length) {
					
						if(i == 0 && start) {
							// Set random position
							$(this).data('points').push([start[0], start[1], Math.random()*0.1+0.05, settings.mutedColor]);
						} else {
							// Set random position
							$(this).data('points').push([Math.random()*90+5, Math.random()*90+5, Math.random()*0.1+0.05, settings.mutedColor]);
						}
						
					} else {
						// If it is inside then set position to 0,0
						// And set opacity of inner content to 1
						
						$(this).data('points').push([0, 0, 1, color]);
						
						
						if($(this).find(".zbz-inner").length) {
							$(this).find(".zbz-inner").get(0).setAttribute("data-" + ((di)*100-50) + "p", "opacity[out]: 0");
							$(this).find(".zbz-inner").get(0).setAttribute("data-" + ((di)*100) + "p", "opacity: 1");
							$(this).find(".zbz-inner").get(0).setAttribute("data-" + ((di)*100+50) + "p", "opacity[in]: 0");
						}
					}
					
					this.setAttribute("data-" + ((di)*100) + "p", "@data-animate[inAndOut]: " + (i*500));
					
				});
				
				// Get data-nav attribute
				if($(slide).data("nav")) {
					navigation.push({
						name: $(slide).data("nav"),
						scroll: di*height
					});
				}
				
				slideConstants['slide_'+(i+1)] = ((di)*100);
			}
		}

		/* Navigation */		
		function createNav() {
			var $nav = $("<div class='zbz-side-nav' />").prependTo("body");
			var $expand = $('<a href="" class="zbz-expand-nav"><i class="fa fa-bars"></i></a>').appendTo($nav);
			var $navul = $("<ul/>").appendTo($nav);
			
			for(var i = 0; i < navigation.length; i++) {
				var $li = $("<li/>");
				var $a = $("<a href=''/>");
				$a.append("<span>" + navigation[i].name + "</span>");
				$a.appendTo($li);
				$navul.append($li);
				
				$a.data("navIndex", i)
							
				$a.on("click", function(event) {
					event.preventDefault();
					
					// Get the navigation obj
					var idx = $(this).data("navIndex");
					var activeIdx = navCurActive.data("navIndex");
					if(!mobile) {
						if(Math.abs(idx-activeIdx) <= 1) {
				    		skr.animateTo(navigation[idx].scroll, { duration: Math.abs($(this).data("scroll")-skr.getScrollTop())/2 } );
			    		} else {
			    			$("<div class='global-curtain' />").hide().appendTo($("body")).fadeIn(500, function(){
					    		skr.setScrollTop(navigation[idx].scroll, true);
					    		updateNav();
					    		$(this).fadeOut(500, function(){
					    			$(this).remove();
					    		});
			    			});
			    		}
		    		} else {
						$("html, body").animate({scrollTop: $($slides[idx]).offset().top}, 500);
		    		}
				});
				
				navigation[i]['$el'] = $a;
				navigation[i]['low'] = (i > 0) ? (navigation[i].scroll - (navigation[i].scroll-navigation[i-1].scroll)/2) : 0;
				navigation[i]['high'] = (i < navigation.length - 1) ? (navigation[i].scroll + (navigation[i+1].scroll-navigation[i].scroll)/2) : 9999999999;
			}
			
			$expand.on("click", function(e){
				e.preventDefault();
				e.stopPropagation();
				$navul.toggleClass("expanded");
				$expand.toggleClass("active");
				
					$("body").one("click", function(e){
						e.preventDefault();
						$navul.removeClass("expanded");
						$expand.removeClass("active");
					});
			});
		}
		
		function updateNav() {
			var top = skr.getScrollTop();
			
    		for(var i = 0; i < navigation.length; i++) {
       			if(top >= navigation[i].low && top < navigation[i].high) {
    				if(navigation[i].$el != navCurActive) {
    					if(navCurActive) navCurActive.removeClass("active");
    					navigation[i].$el.addClass("active");
    					navCurActive = navigation[i].$el;
    				}
    				
    				break;
    			}
    		}
    	}
    	
    	prepareSlides();
    	createNav();
    	updateNav();
		
		
		// lines for circles
		$circles.each( function(){
			if(settings.connectionType == "mesh" || settings.connectionType == "chain") {
				var line = document.createElementNS(svgns, 'line');
				$(line).appendTo(svg);
				lines.push(line);
			}
			
			if (settings.connectionType == "mesh") {
				var line2 = document.createElementNS(svgns, 'line');
				$(line2).appendTo(svg);
				lines2.push(line2);
			}
		});
		
		precalculate();
		
		var mobile = false;
		
		if(width < 992) {
			skr.destroy();
			svg.hide();
			mobile = true;
		}
		
		$(window).on("resize", function(){
		
			width = $(window).width();
			height = $(window).height();

			dont = true;
			$circles.each( function(){
				$(this).css(Modernizr.prefixed('transform'), "none");
				
				var transform = $(this).css(Modernizr.prefixed('transform'));
				
				var offset = {
					left: Math.round($(this).offset().left + $(this).outerHeight()/2),
					top: Math.round($(this).offset().top - $(window).scrollTop() + $(this).outerHeight()/2)
				};
				
				$(this).data('offset', offset);
			});
			
			if(width >= 992) {			
				dont = false;
				
				skr = skrollr.init(skrollrOptions);
				svg.show();
	
				precalculate();
				
				if(mobile) {
					skr.on("render", skrollrRenderHandler);
				}
				
				mobile = false;
			} else {
				skr.destroy();
				svg.hide();
				mobile = true;
			}
		});
		
		
		function skrollrInit() {
			skr.init();
		}
		
		
		function precalculate() {
		

			$circles.each(function(){
				var points = $(this).data("points");
								
				// precalculate points
				var calcPoints = [];

				
				for(var i = 0; i < points.length; i++) {
					
					var scale = (typeof points[i][2] !== "undefined") ? points[i][2] : 1;
					var xc = parseCoordinate(points[i][0]),
						yc = parseCoordinate(points[i][1]);


					var offsetX = $(this).data("offset").left,
						offsetY = $(this).data("offset").top;


					var x = (xc.coord) ? width/100*parseFloat(xc.coord)-offsetX : 0,
						y = (yc.coord) ? height/100*parseFloat(yc.coord)-offsetY : 0;
						
					var cx, cy, cx2, cy2;

				
					if(i != 0) {
					
						// calculate the point coordinates based on previous one
											
						cx = (x + (x - calcPoints[i-1].cx2));
						cy = (y + (y - calcPoints[i-1].cy2));
						
						if(typeof points[i+1] !== 'undefined') {
							var xc1 = parseCoordinate(points[i+1][0]),
								yc1 = parseCoordinate(points[i+1][1]),
								x1 = width/100*parseFloat(xc1.coord)-offsetX,
								y1 = height/100*parseFloat(yc1.coord)-offsetY;
								
							cx2 = x1 + Math.random()*200-100;
							cy2 = y1 + Math.random()*200-100;
						} else {
							cx2 = x;
							cy2 = y;
						}
						
					} else {
					
						// create the first poin
						
						var xc1 = parseCoordinate(points[i+1][0]),
							yc1 = parseCoordinate(points[i+1][1]),
							x1 = width/100*parseFloat(xc1.coord) - offsetX,
							y1 = height/100*parseFloat(yc1.coord) - offsetY;
	
						cx = (x+(x1-x)/3+Math.random()*200-100);
						cy = (y+(y1-y)/3+Math.random()*200-100);
						cx2 = (x+(x1-x)/3*2+Math.random()*200-100);
						cy2 = (y+(y1-y)/3*2+Math.random()*200-100);
					}
	
				
					calcPoints.push({
						x: x,
						y: y,
						scale: scale,
						color: {r: points[i][3][0], g:points[i][3][1], b:points[i][3][2], a:points[i][3][3]},
						offsetX: offsetX,
						offsetY: offsetY,
						cx: cx,
						cy: cy,
						cx2: cx2,
						cy2: cy2,

					});
					
				}
				
				$(this).data("calcPoints", calcPoints);
				
			});
			
		}
		
		function parseCoordinate(point) {
			var anchor = (point+"").substr(0,1);
			var coord, direct;
			if(anchor == "r" || anchor == "b") {
				direct = -1;
				coord = parseFloat(point.substr(1));
			} else if (anchor == "l" || anchor == "t") {
				direct = 1;
				coord = parseFloat(point.substr(1));
			} else {
				coord = parseFloat(point);
				direct = 0;
			}
			return {coord: coord, anchor: direct};
		};

		var step = 500;
		
		skr.on("render", skrollrRenderHandler);
		
		function skrollrRenderHandler(data) {
		
			var linePoints = [];
			
			if(dont) return;
			
			// Update navigation state
			updateNav();
			
			
			// Run through each circle
			$circles.each(function(){
			
				var points = $(this).data("calcPoints");
				var progress = this.getAttribute("data-animate");
				
				var s = Math.floor(progress/step);
				var t = progress/step - Math.floor(progress/step);
				
				var x = points[points.length-1]["x"],
					y = points[points.length-1]["y"],
					scale = points[points.length-1]["scale"],
					offsetX = points[points.length-1].offsetX,
					offsetY = points[points.length-1].offsetY,
					color = points[points.length-1].color;
					
				if (s+1 < points.length) {
					var x0 = points[s].x,
						x1 = points[s+1].x,
						y0 = points[s].y,
						y1 = points[s+1].y,
						cx1 = points[s].cx,
						cy1 = points[s].cy,
						cx2 = points[s].cx2,
						cy2 = points[s].cy2,
						scale1 = points[s].scale,
						scale2 = points[s+1].scale,
						offsetX = points[s].offsetX,
						offsetY = points[s].offsetY,
						color1 = points[s].color,
						color2 = points[s+1].color
					;
					
					
					x = Math.pow((1-t),3)*x0 + 3*Math.pow((1-t),2)*t*cx1 + 3*(1-t)*Math.pow(t,2)*cx2 + Math.pow(t,3)*x1;
					y = Math.pow((1-t),3)*y0 + 3*Math.pow((1-t),2)*t*cy1 + 3*(1-t)*Math.pow(t,2)*cy2 + Math.pow(t,3)*y1;

					scale = scale1 + (scale2-scale1)*t;
					color = {
						r: Math.floor(color1.r + (color2.r - color1.r) * t),
						g: Math.floor(color1.g + (color2.g - color1.g) * t),
						b: Math.floor(color1.b + (color2.b - color1.b) * t),
						a: color1.a + (color2.a - color1.a) * t,
					}
					
				}
				
				// Apply styles to an object
				$(this).get(0).style.setProperty("background-color", "rgba("+ color.r +", " +  color.g + ", "+  color.b+", "+  color.a +")", "important");
				$(this).css(Modernizr.prefixed('transform'), "translate("+x+"px, "+y+"px) scale("+scale+","+scale+")");
				$(this).css("zIndex", Math.round(scale*100));
				
				// Add end point to array for line drawing
				linePoints.push([x+offsetX,y+offsetY]);
			});	

			for (var i = 0; i < lines.length; i++) {
				lines[i].setAttributeNS(null, "x1", linePoints[i][0]);
				lines[i].setAttributeNS(null, "y1", linePoints[i][1]);
				if(i != lines.length-1) {
					lines[i].setAttributeNS(null, "x2", linePoints[i+1][0]);
					lines[i].setAttributeNS(null, "y2", linePoints[i+1][1]);
				} else {
					lines[i].setAttributeNS(null, "x2", linePoints[0][0]);
					lines[i].setAttributeNS(null, "y2", linePoints[0][1]);
				}
			}
			
			for (var i = 0; i < lines2.length; i++) {
				lines2[i].setAttributeNS(null, "x1", linePoints[i][0]);
				lines2[i].setAttributeNS(null, "y1", linePoints[i][1]);
				
				if(i < lines2.length-2) {
					lines2[i].setAttributeNS(null, "x2", linePoints[i+2][0]);
					lines2[i].setAttributeNS(null, "y2", linePoints[i+2][1]);
				} else {
					lines2[i].setAttributeNS(null, "x2", linePoints[i-(lines2.length-2)][0]);
					lines2[i].setAttributeNS(null, "y2", linePoints[i-(lines2.length-2)][1]);
				}
			}
		}

				
		skr.refresh();
		
		return this;
 
    };
 
}( jQuery ));


