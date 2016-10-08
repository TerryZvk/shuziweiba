$(function(){
			var container = $('#banner-container');
            var list = $('#slider');
            var buttons = $('#buttons span');
            var prev = $('#prev');
            var next = $('#next');
            var index = 1;
            var len = 5;
            var interval = 3000;
            var timer;


            function animate (offset) {
                var left = parseInt(list.css('left')) + offset;
                if (offset>0) {
                    offset = '+=' + offset;
                }
                else {
                    offset = '-=' + Math.abs(offset);
                }
                list.animate({'left': offset}, 600, function () {
                    if(left > -200){
                        list.css('left', -1200 * len);
                    }
                    if(left < (-1200 * len)) {
                        list.css('left', -1200);
                    }
                });
            }

            function showButton() {
                buttons.eq(index-1).addClass('on').siblings().removeClass('on');
            }

            function play() {
                timer = setTimeout(function () {
                    next.trigger('click');
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }

            next.bind('click', function () {
                if (list.is(':animated')) {
                    return false;
                }
                if (index == 5) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-1200);
                showButton();
            });

            prev.bind('click', function () {
                if (list.is(':animated')) {
                    return false;
                }
                if (index == 1) {
                    index = 5;
                }
                else {
                    index -= 1;
                }
                animate(1200);
                showButton();
            });

            buttons.each(function () {
                 $(this).bind('click', function () {
                     if (list.is(':animated') || $(this).attr('class')=='on') {
                         return;
                     }
                     var myIndex = parseInt($(this).attr('index'));
                     var offset = -1200 * (myIndex - index);

                     animate(offset);
                     index = myIndex;
                     showButton();
                 })
            });

            container.hover(stop, play);

            play();
            //banner部分代码结束

            //滚动条Bug:搜狗浏览器滚动时有明显掉帧现象
            //滚动到首尾尽头时可采用箭头消失方法阻止再滚动 
            $("#left").bind('click',function(){
            	 if ($(".imgbox").is(':animated')) {
                    return false;
                }
                var left=parseInt($(".imgbox").css("left"));
                var newleft=left+980+"px";
            	$(".imgbox").animate({"left":newleft},600);
            	if(parseInt(newleft)===0){
            		$(this).css("display","none");
            	}
            	$("#right").css("display","block");
            })

            $("#right").bind('click',function(){
            	 if ($(".imgbox").is(':animated')) {
                    return false;
                }
            	var left=parseInt($(".imgbox").css("left"));
            	var newleft=(left-980)+"px";
            	$(".imgbox").animate({"left":newleft},600);
            	if(parseInt(newleft)===-3920){
            		$(this).css("display","none");
            	}
            	$("#left").css("display","block");
            })

          
})