$(function() {
	// header nav scroll
	$("nav ul li a").click(function () {
		var menu_num = $("nav ul li a").index(this),
        	menu_position = $(".toScroll").eq(menu_num).offset().top;
        if(menu_num == 0) {
        	$("html,body").animate({ scrollTop: 0 },800);
        } else {
        	$("html,body").animate({ scrollTop: menu_position },800);
		}
    });
	// top scroll
	$(".toTop a").click(function () {
        $("html,body").animate({ scrollTop: 0 },800);
    });
    // toScroll position
    var window_height = $(window).height(),
    	toScroll_position = [];
    $(".toScroll").each(function () {
    	var target_position = $(this).offset().top;
    	toScroll_position.push(target_position-window_height);
    });
	// scroll event
	$(window).scroll(function () {
		// live scroll
		var scrollTop = $(window).scrollTop();
		// skill
		if(scrollTop > toScroll_position[1]) {
			skill_bar();
		}
		// works
		if(scrollTop > toScroll_position[3]) {
			
		}
	});
	// skill bar
	var toExecutableOnce = function(f){
    	var called = false, result = undefined;
    	return function(){
        	if(!called){
            	result = f.apply(this, arguments);
            	called = true;
        	}   
        	return result;
    	};  
	};
	var skill_bar = toExecutableOnce(function () {
    	$(".skill_bar_w").each(function () {
    		var self = this,
    			percentage = $(this).data("percentage"),
    			parent = $(this).parents(".skill_box");
			$({ Counter: 0 }).animate({ Counter: percentage }, {
				duration: 5000,
				easing: "swing",
				step: function (now) {
					var num = Math.floor(now);
					$(self).css("width", num + "%");
					parent.find(".skill_bar_num").text(num);
				}
			});
		});
	});
});