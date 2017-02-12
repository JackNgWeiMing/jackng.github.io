// Author:	Jack Ng Wei Ming
// Date: 	5/2/2017
// Class:	DIT/FT/1A/22
var $currentLink;
var $previouslink;
var $tips = $('div.tips');
var $nav = $('nav');
var $navli=$('nav h2,nav li');
var $content=$('#content');
var $footer =$('footer');
var $hidden;
var $loading;
var $loadingIcon;
var $title = $('div.background h1')
var isFirst = true;
$(window).ready(function(){
	
	attachEvent();
	animateArrow();
	animateblockquote();

	
});


function random(){
	var number =Math.floor((Math.random()+1)*5000);
	return number;
}

function animateArrow(){
	$tips.find('a')
	.velocity({bottom:20, opacity:[0.5,1]},{duration:'slow',easing:'ease-in-out',loop:true});
	console.log('mocing arrow');
}
// function scrolltomain(){
	// $('div.tips a').on('click',function(e){
		// e.preventDefault();
		// var id = $(this).attr('href');
		// var position = $(id).offset().top;
		// $('body , html').animate({scrollTop:(position-70)},2000);
	// })
// }

function animateblockquote(){
	var $characters=$("blockquote:first")
	.blast({delimiter:"word"}).css('opacity',0);
	
	$characters.each(function(){
		$(this).velocity('transition.fadeIn',{duration:random(),delay:500});
	})
}

// function animatenav(){
	
	// $('nav ul li a, #main a').click(function(e){
		// e.preventDefault();
		// $previous=$currentLink;
		// $currentLink=$(this);
		// loadContent();
	// })
// }

function requestionPage(){
	
	var href=$currentLink.attr('href');
	var js=$currentLink.data('js');
	var htmlPath='..\\'+href+' #main';
	var jsPath='.\\js\\'+js;
		$('#content').load(htmlPath,function(){
			$.getScript(jsPath,function(){
				setTimeout(initialization);
			})
			$title.text($currentLink.text());
		});
		
		$hidden=$('hidden');
}

function loadContent(){
	if(isFirst){
		$('body').prepend('<div class="loadingWrapper" ><div class="loading"></div>');
		isFirst=false;
	}
	$loadingIcon = $('.loading')
	$loading =$('.loadingWrapper')
	$loading.css({
		'width':window.innerWidth,
		'height':window.innerHeight
	});

		
	$('header').velocity('scroll',{duration:3000,offset:0,easing:'ease-in-out'});
	if(window.innerWidth>800){
		$tips.velocity({opacity:[0,1]},{duration:2000});
	}
	$navli.each(function(){
		
		$(this).velocity('transition.slideLeftBigOut',{display:'none',duration:(Math.floor(Math.random()*1000+1000))})
		
	});
	
	var loadingSequence=[
		{e:$loading,p:'transition.fadeIn'		,o:{display:'block',duration:3000,sequenceQueue:false}},
		{e:$loadingIcon,p:{rotateZ:360	}		,o:{duration:3000,easing:'ease-out-in',loop:true,sequenceQueue:false}},
		{e:$title ,p:{opacity:[0,1]}			,o:{display:'inline-block',duration:1500,easing:'ease-out-in',sequenceQueue:false}},
		{e:$content,p:'transition.slideLeftBigOut',o:{display:'none',duration:2000,complete:requestionPage,sequenceQueue:false}},
		{e:$footer ,p:'transition.slideLeftBigOut',o:{display:'none',duration:2000,sequenceQueue:false}}
	]
	
	$.Velocity.RunSequence(loadingSequence);
	
}	

function initialization(){
		
		
		var loadingSequence=[
			{e:$loading,p:'transition.fadeOut'		,o:{display:'none',duration:3000,sequenceQueue:false}},
			{e:$title  ,p:{opacity:[1,0]}		     ,o:{duration:3000,sequenceQueue:false}},
			{e:$content,p:'transition.slideLeftBigIn',o:{display:'inline-block',duration:3000,delay:1000,sequenceQueue:false}},
			{e:$footer ,p:'transition.slideLeftBigIn',o:{display:'inline-block',duration:3000,sequenceQueue:false}}
		];
		
		
		$navli.each(function(){
			if(!($(this).find('a').is($currentLink)))
			$(this).velocity('transition.slideLeftBigIn',{display:'inline-block',duration:(Math.floor(Math.random()*1000+1000))});
		
		});
		
		if(window.innerWidth>800){
			
			$tips.velocity({opacity:[1,0]},{duraiton:5000,delay:1000,easing:'ease-out-in'});

		}
		
		$.Velocity.RunSequence(loadingSequence);

		
		
}

function revealHidden(){
$hidden.click(function(){
	$(this.toggleClass('hidden'))
})
}

function attachEvent(){
	
	$('nav ul li a').click(function(e){

		e.preventDefault();
		$previous=$currentLink;
		$currentLink=$(this);
		$(this).siblings('.triangle').remove(); 
		loadContent();
	})
	
	$(' #firstentry').click(function(e){
		e.preventDefault();
		$('#present').trigger('click');
	});
	
	$('div.tips a').on('click',function(e){
		e.preventDefault();
		var id = $(this).attr('href');
		var position = $(id).offset().top;
		$('body ').animate({scrollTop:(position-70)},2000);
	})
}