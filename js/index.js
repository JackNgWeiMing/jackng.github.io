var $maincontent =$('#firstentry');

$maincontent.click(function(e){

		e.preventDefault();
		$previous=$currentLink;
		$currentLink=$(this);
		$(this).siblings('.triangle').remove(); 
		loadContent();
	});

