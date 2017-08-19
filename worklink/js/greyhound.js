$(document).ready(function() {

	//---------------------------定义全局变量---------------------------

	var bgp1 = new Array(),//头图背景小元素位置
		bgp2 = new Array(),//介绍页背景小元素位置
		bgp3 = new Array(),//主菜页背景小元素位置
		bgp4 = new Array(),//沙拉页背景小元素位置
		bgp5 = new Array(),//面包页背景小元素位置
		bgp6 = new Array();//饮品页背景小元素位置
	var positions = [bgp1,bgp2,bgp3,bgp4,bgp5,bgp6];
	var elements=['.jieShao .bg img','.zhuCai .bg img','.shaLa .bg img','.tianDian .bg img','.yinPing .bg img'];
	var fenYe=['#zhuCaiFenYe','#shaLaFenYe','#mianBaofenYe','#yinPinFenYe'];

	
	var x,//获取鼠标屏幕x坐标
		y,//获取鼠标屏幕y坐标
		zhuTimeout,//主菜
		shaTimeout,//沙拉
		FF = false,//主页滑上效果
		winWidth,//窗口宽度
		winHeight,//窗口高度
		scrolltop;//网页scroll值
	
	

	


	//------------------------------------------首页效果-------------------------------------------
	//获取屏幕宽高
	winWidth = $(window).width();
	winHeight = $(window).height();

	//定义鼠标坐标
	$(window).mousemove(function(eve) {
		x = eve.pageX;
		y = eve.pageY;
	});

	//头图自定义尺寸调用
	$(window).resize(function() {
		topSize();
		fenYeSize();
	});
	
	topSize();
	fenYeSize();
	
	
	//页面加载后 首页物品小幅移动
	
	setTimeout(function() {
		$('.picOnload').removeClass('picOnload').attr('id', 'top');
	}, 1000)
	
	setTimeout(function() {
		$('#top s').css({'transition': '0','-webkit-transition': '0'});
	}, 1500)

	//存储首页元素原始位置并调用鼠标移动效果
	setTimeout(function() {
		dingWei('#top s',0,30);
	}, 2000)

	//--------------------------------------主页效果定义--------------------------------------------
	// menu点击效果定义
	$('.daoHang a').click(function(event){
		event.preventDefault();
		$('body').animate({scrollTop:$(this.hash).offset().top},1000)
	})

	//存储各模块背景图位置并调用位移函数
	dingWei(elements[0],1,10);
	dingWei(elements[1],2,10);
	dingWei(elements[2],3,10);
	dingWei(elements[3],4,10);
	dingWei(elements[4],5,10);

	//背景元素先移出画面
	$('.left').css('left','-500px');
	$('.right').css('left','1500px');
	
	//主页元素滑入效果定义
	huaRu(0,1,scrolltop);
	huaRu(1,2,scrolltop);
	huaRu(2,3,scrolltop);
	huaRu(3,4,scrolltop);
	huaRu(4,5,scrolltop);


	$(window).on('scroll',fenYeTop);

	$(window).scroll(function() {
		scrolltop = $(window).scrollTop();
		var b = $(window).height();
		
		console.log(scrolltop);

		huaRu(0,1,scrolltop);
		huaRu(1,2,scrolltop);
		huaRu(2,3,scrolltop);
		huaRu(3,4,scrolltop);
		huaRu(4,5,scrolltop);
		
		//首页占据空间
		if (scrolltop == 0) {
			$('#topFrame').css('position', 'relative');
			$('#dinnerFrame').finish().animate({'top': b}, 1000);
			$('#menuFrame').css('position', 'absolute');
			FF = true;
		}
		//首页不占空间
		if (scrolltop>10&&scrolltop<=600) {
			$('#topFrame').css('position', 'absolute');
			$('#dinnerFrame').css({'position': 'absolute'}).finish().animate({'top': 100},1000,function(){
				$('#menuFrame').css({'position': 'fixed','top':'0px'})
			});
		}
		//主菜单悬浮
		if(scrolltop>600){
			$('#menuFrame').css({'position': 'fixed','top': '0'});
			$('#dinnerFrame').css({'position': 'absolute'})
			FF = true;
		}
	})


	//-----------------主菜滚动定义-----------------
	$('#zhuCai .zhu1 li').eq(0).css('opacity',1);
	$('#zhuCai .zhu1 li').mouseenter(function(){
		var self=this;
		var xu = $(this).index();
		var text= $('.zhu3 li').eq(xu).attr('title');
		zhuTimeout=setTimeout(function(){
						$('.zhu1 li').css('opacity',0);
						$(self).find('s:nth-child(2)').css({'width':'0px'});
						$(self).css('opacity',1)
								.find('s:nth-child(1)')
								.css('width','0px').stop()
								.animate({'width':'45px'},300,function(){
										$(self).find('s:nth-child(2)').stop().animate({'width':'120px'},200);
									})
						$('#jiBie').removeClass().addClass(text);						
						$('.jian').removeClass();
						$('.curr').addClass('jian').removeClass('curr');
						$('.zhu3 li').eq(xu).removeClass().addClass('curr');
					},300)
	}).mouseleave(function(){
		clearTimeout(zhuTimeout);	
	})



	//-----------------主菜分页定义-----------------

	$('#zhuCaiFenYe .zhu1 li').click(function(event){
		var index=$(this).index();
		$('#zhuCaiFenYe .zhu1 li').css('opacity',0);
		$(this).css({'opacity':1}).find('s:nth-child(1)').css('opacity',0).end()
									.find('s:nth-child(2)').css({'width':'0px'}).animate({'width':120},200);
		$('.entreeRight li').css({'display':'none'}).eq(index).css({'display':'block'});
	})

	//-------------------沙拉滚动定义--------------------
	$('.sha1 li').eq(0).css('opacity',1);
	
	$('.sha1 li').mouseenter(function(){
		var self=this;
		var xu = $(this).index();
		var xuc = $('.curra').index();
		shaTimeout=setTimeout(function(){
						if(xuc!=xu){
							$('.sha1 li').css('opacity',0);
							$(self).css('opacity',1).css({'width':'0px'}).stop()
							.animate({'width':'330px'},200,'easeInQuint');
							$('.curra').stop().animate({'left':-1000,'top':700},500,function(){
								$('.sha2 li').removeClass().eq(xu).addClass('curra').animate({'left':0,'top':350},1000,'easeInOutCubic');
							})
						}
					},600)
	}).mouseleave(function(){
		clearTimeout(shaTimeout);	
	})

	//-----------------沙拉分页定义-----------------

	$('.saladRight li').click(function(){
		var index = $(this).index();
		$('.saladRight li').removeClass();
		$(this).addClass('saladSelected');
		$('.saladLeft li').removeClass().eq(index).fadeIn().addClass('saladSelected');
	})

	//----------------------------------------------面包效果定义--------------------------------------
	setInterval(function(){
			$('.tian2 li:nth-child(1)').css('opacity',0);
			$('.tian2 li:nth-child(2)').css('opacity',1);
			$('.tian2 li:nth-child(3)').css('opacity',0);	
		setTimeout(function(){
			$('.tian2 li:nth-child(1)').animate({'opacity':1},500);
			$('.tian2 li:nth-child(2)').css('opacity',0);
			$('.tian2 li:nth-child(3)').css('opacity',1);
		},2000)
	},3000)

	//-----------------沙拉分页定义-----------------
	$('#mianBaofenYe .up').click(function(){
		var a = $('.breadContent li.selected').index()-1;
		if(a==-1){
			a=5;
		}
		$('.breadContent li.selected').stop().animate({'opacity':0},500,function(){
			$('.breadContent li.selected').removeClass();
			$('.breadContent li').eq(a).stop().animate({'opacity':1},500).addClass('selected');
		});	
	})

	$('#mianBaofenYe .down').click(function(){
		var a = $('.breadContent li.selected').index()+1;
		if(a==6){
			a=0;
		}
		$('.breadContent li.selected').stop().animate({'opacity':0},500,function(){
			$('.breadContent li.selected').removeClass();
			$('.breadContent li').eq(a).stop().animate({'opacity':1},500).addClass('selected');
		});	
	})
	//-----------------------------------------------饮品hover定义--------------------------------------
	
	
	$('.yin li a').hover(function(){
		$(this).parent().css({'background-positionY':'-='+654+'px','background-positionX':'-='+1+'px'})	
	},function(){
		$(this).parent().css({'background-positionY':'+='+654+'px','background-positionX':'+='+1+'px'})
	})


	//----------------------------------------------环境点击定义--------------------------------------
	up('.bj',820);
	up('.xg',500);
	up('.sh',-700);
	
	var huan=[];

	$('#huanJing li').each(function(){
		var b= parseFloat($(this).css('left'));
		huan.push(b);
	})

	function up(obj,z){
		$(obj).click(function(){
			var a=$(this).hasClass('currh');
			var c=$(this).index();
			var b=huan[c];
			var self=this;
			
			if(!a){
				if($(this).hasClass('bj')){
					$('.currh').addClass('erh')
					$('.bj').removeClass('yih');
				}else{
					$('.bj').addClass('yih');
					$('.huanJing li').removeClass('erh');
				}

				$('.huanJing li').removeClass('currh');
				$(this).animate({'left':b+z},500).delay(500).queue(function(next){
					$(self).addClass('currh');
					next();
				}).animate({'left':b},200);	
			}		
		})
	}




	//分页滑入定义

	fenYeMoveIn('#zhuCai .zhu1 li',0);
	fenYeMoveOut(0);
	fenYeMoveIn('.sha1 li',1);
	fenYeMoveOut(1);
	fenYeMoveIn('.bread',2);
	fenYeMoveOut(2);
	fenYeMoveIn('.drink',3);
	fenYeMoveOut(3);




	//--------------------------------------原始函数定义区--------------------------------------------

	//首面自定义大小函数
	function topSize() {
		var a = $(window).width();
		var b = $(window).height();
		var c = b / a;
		var d = 1400 * b / 800;
		var l = -(d - a) / 2;
		$('#topFrame').css({'width': a + 'px', 'height': b + 'px'});
		if (a > 1210) {
			if (c > 0.6) {
				$('.picOnload').css({'width': d + 'px',  'height': b + 'px',  'left': l + 'px'});
			}
		}
		if (a <= 1210) {
			$('body').css('width', '1210px');
			$('#topFrame').css({'width': '1210px','height': '702px'});
		}
	}

	//分页大小效果定义
	function fenYeSize(){
		var youCe={'left':winWidth,'height':winHeight};
		var zuoCe={'left':-winWidth,'height':winHeight};
		
		$(fenYe[0]).css(youCe);
		$(fenYe[1]).css(zuoCe);
		$(fenYe[2]).css(youCe);
		$(fenYe[3]).css(zuoCe);
	}

	function fenYeTop(){
		var top={'top':scrolltop}
		for(i=0;i<4;i++){
			$(fenYe[i]).css(top);
		}
	}
		
	
	//存储背景图片位置函数定义
	function dingWei(obj,a,b){
		var wei = positions[a];
		$(obj).each(function(index){
			$(this).attr('title',index);
			var l = $(this).css('left');
			var t = $(this).css('top');
			var o = [l, t]
			wei.push(o)
		})
		elecmentMove(obj,wei,b);
	}

	//背景元素移动函数定义		
	function elecmentMove(obj,wei,a) {
		$(obj).mouseenter(function(e) {
			var s = $(this).index(), //获取元素索引
				objLeft = parseFloat(wei[s][0]),//获取元素原始left值
				objTop = parseFloat(wei[s][1]),//获取元素原始top值
				objWidth = $(this).width()/2,//获取元素宽度的一半
				objHeight = $(this).height()/2,//获取元素高度的一半
				objx = $(this).offset().left,//获取元素的屏幕left坐标
				objy = $(this).offset().top,//获取元素的屏幕top坐标
				x1 = objx + objWidth,
				y1 = objy + objHeight;
			if (x<x1 && y<y1) {
				$(this).stop().animate({'left': objLeft + a + 'px','top': objTop + a + 'px'}, 200)
			}
			if (x>x1 && y<y1) {
				$(this).stop().animate({'left': objLeft - a + 'px','top': objTop + a + 'px'}, 200)
			}
			if (x<x1 && y>y1) {
				$(this).stop().animate({'left': objLeft + a + 'px','top': objTop - a + 'px'}, 200)
			}
			if (x>x1 && y>y1) {
				$(this).stop().animate({'left': objLeft - a + 'px','top': objTop - a + 'px'}, 200)
			}
		}).mouseleave(function() {
			var s = $(this).index();
			$(this).stop().animate({'left':wei[s][0], 'top': wei[s][1]});
		})
	}

	//子页滑入效果

	function fenYeMoveIn(obj,num){
		var family=fenYe[num];
		var idName=$(family).attr('id');
		
		$(obj).click(function(){
			var index=$(this).index();
			$('.bg').addClass('hide');
			$(window).off('scroll',fenYeTop);
			if(num%2==0){
				
				$('#dinnerFrame').animate({'left':-winWidth},1500);
				$('#topFrame').animate({'left':-winWidth},1500);
				
				$(family).removeClass().addClass('xian')
						.css({'left':winWidth,'top':'0'})
						.animate({'left':0},1500);

				
				if(idName=='zhuCaiFenYe'){		
					$(family).find('.zhu1 li').eq(index).css('opacity',1)
							.find('s:nth-child(1)').css('opacity',0).end()
							.find('s:nth-child(2)').css({'width':0}).animate({'width':120},200);
					$('.entreeRight li').css({'display':'none'}).eq(index).css({'display':'block'});
				}

			}
			if(num%2==1){
				$('#dinnerFrame').animate({'left':winWidth},1500);
				$('#topFrame').animate({'left':winWidth},1500);

				$(family).removeClass().addClass('xian')
						.css({'left':-winWidth,'top':'0'})
						.animate({'left':0},1500);
			}		
		})
	}

	//子页右滑出效果
	function fenYeMoveOut(num){
		
		var obj=fenYe[num];

		$(obj).find('.back').click(function(){
			$('#topFrame').animate({'left':0},1500);
			$('#dinnerFrame').animate({'left':0},1500);

			if(num%2==0){
				$(obj).animate({'left':winWidth},1500,function(){
					$('.bg').removeClass('hide');
					$(obj).removeClass().addClass('chu');
				})
			}
			if(num%2==1){
				$(obj).animate({'left':-winWidth},1500,function(){
					$('.bg').removeClass('hide');
					$(obj).removeClass().addClass('chu');
				})
			}
			$(window).on('scroll',fenYeTop);	
		})
	}


	//背景元素左右划入定义函数
	function huaRu(a,b,c){
		var object= elements[a],
			weizhi=positions[b];
		$(object).each(function(){
			
			shang = $(this).offset().top;
			s = $(this).attr('title');
			l = parseFloat(weizhi[s][0]);
			var a=$(this).parents('.content').index();
			
			if(c<shang-400&&a>1){
				if($(this).hasClass('left')){
					$(this).stop().animate({'left':-500},500);
				}else{
					$(this).stop().animate({'left':1500},500);
				}	
			}
			if(c>shang-700&&c<shang+300){
				$(this).stop().animate({'left':l},500);	
			}
			if(c>shang+400){
				if($(this).hasClass('left')){
					$(this).stop().animate({'left':-500},500);
				}else{
					$(this).stop().animate({'left':1500},500);
				}	
			}
		})	
	}
	
	//拖拽函数定义
	function drag(o, e) {
		var a = $(window).width();
		var b = $(window).height();
		var e = window.event || e;
		var x = e.offsetX;
		var y = e.offsetY;
		var z = e.target;
		document.onmousemove = function(e) {
			var e = window.event || e;
			o.style.left = e.pageX - x + 'px';
			o.style.top = e.pageY - y + 'px';
		}
		document.onmouseup = function(e) {
			var c = parseFloat(o.style.left) / a * 100;
			var d = parseFloat(o.style.top) / 880 * 100;
			document.onmousemove = null;
			o.style.fliter = o.style.opacity = "1";
			console.log(o.style.top, o.style.left, d, c, z)
		}
	}

})






//top拖拽调用
	/*$('.bg img').mousedown(function(e){
		e.preventDefault();
		drag(this,e)
	})*/



	//布局用宽高定
	/*var a=$(window).width();
	var b=$(window).height();
	$('#topFrame').css({'width':a+'px','height':b+'px'});
	$('.picOnload').css({'width':a+'px','height':a*0.58+'px'});*/
