// Author:	Jack Ng Wei Ming
// Date: 	5/2/2017
// Class:	DIT/FT/1A/22

var $form = $('form');
var $question1 =$('#name');
var $question2 =$('input[name=gender]');	
var $question3 =$('input[name=dob]')
var $question4 =$('input[name*=life]');
var $question5 =$('#country');
var $question6 =$('#describe');
var numberCheck =0;
var isFirst=true;
(function(){
	
	 $('body').iCheck({
			checkboxClass: 'icheckbox_flat-blue',
			radioClass: 'iradio_flat-blue'
		  });
	
	$form.on('submit',validate);
	$question4.on('ifChanged',function(){
		if($(this).prop('checked')){
			numberCheck +=1;
		}else{
			numberCheck-=1;
		}
	})
})();


function validate(e){
	var isValid=true;
	if(isFirst){
		$question1.on('keyup',validateNameBox);
		$question2.on('ifChanged',validateGender);
		$question3.on('change',validateDOB);
		$question4.on('ifChanged',validateCheckBox);
		$question5.on('change',validateComboBox);
		$question6.on('keyup',validateTextBox);
		isFirst=false;
	}
	isValid=isValid && validateNameBox();
	isValid=validateGender()&& isValid;
	isValid=validateDOB() && isValid;
	isValid=validateCheckBox() && isValid;
	isValid=validateComboBox() && isValid;
	isValid=validateTextBox() && isValid;
	
	animate();
	
	if(isValid){
		$('nav a').first().trigger('click');
		alert($question1.val() +',Thank for your feedback.I am apprieciate it.')
	}
	
	return false;
	
		
}

function validateNameBox(){
	var isValid=false;
	var name = $question1.val();
	var message ='';
	if(isFirst){
		if(!/^[a-zA-Z ]+$/.test(name)){
			message='Only Alphabet is allow'
		}else{
			isValid=true;
		}
	}else{
		if(name==false||name==''){
			message='This field is mandantory '
		}else if(!/^[a-zA-Z ]+$/.test(name)){
			message='Only Alphabet is allow';
		}else{
			isValid=true;
		}
		$question1.siblings('div.message:first').text(message);
	}
	
	if(isValid){
		$question1.removeClass('error').addClass('correct');
	}else{
		$question1.removeClass('correct').addClass('error');
	}
	
	return isValid;
}

function validateGender(){
	var message=''
	var isValid=false;
	$question2.each(function(){
		if($(this).prop('checked')){
			isValid=true;
		}
	});
	if(isValid){
		$question2.removeClass('error').addClass('correct');
	}else{
		message='select your gender';
		$question2.removeClass('correct').addClass('error');
	}
	$('#gender').text(message);
	return isValid;
}


function validateDOB(){
	var message='';
	var isValid=false;
	if(Date.parse($question3.val())){
		var today= new Date();
		var dob = new Date($question3.val());
		if(dob>today){
			message='Invalid day of birth'
		}else{
			isValid=true;
		}
		
	}else{
		message='This field is mandantory';
	}

	$question3.next('div.message').text(message);
	if(isValid){
		$question3.removeClass('error').addClass('correct');
	}else{
		$question3.removeClass('correct').addClass('error');
	}
	return isValid;
}

function validateCheckBox(){
	var isValid=false;
	var message=''; 
	if(numberCheck==3){
		isValid=true;
	}
	else if(numberCheck>3){
		message='Select 3 things,Life is short.You can"t get more than 3 things';
	}else{
		message='Select 3 things.Life is short. Your dont want to waste your life.';
	}
	if(isValid){
		$question4.removeClass('error').addClass('correct');
	}else{
		$question4.removeClass('correct').addClass('error');
	}
	$('#life').text(message);
	return isValid;
}

function validateComboBox(){
	var message = '';
	var isValid=false;
	
	if($question5.prop('value')==='' ){
		message='This field is mandantory';
	}else{
		isValid=true;
	}
	
	if(isValid){
		$question5.removeClass('error').addClass('correct');
	}else{
		$question5.removeClass('correct').addClass('error');
	}
	
	$question5.next('div.message').text(message);
	return isValid;
}

function validateTextBox(){
	var message=''
	var isValid=false;;
	var value=$question6.prop('value');
	if(value){
	var words=value.replace(/^\s+|\s+$/g, "").split(' ');
	if(words.length==3){
		isValid=true;
	}
	else if(words.length!=3){
		message='Your life is definely worth than counting 3 words,but pls enter 3 words here';
	}
	}else{
		message='This field is mandantory';
	}
	
	if(isValid){
		$question6.removeClass('error').addClass('correct');
	}else{
		$question6.removeClass('correct').addClass('error');
	}
	
	$question6.next('div.message').text(message);
	return isValid;
}

function animate(){
	$Errors=$('.error').velocity({marginLeft:[2,0]},{duration:'fast',loop:5}).velocity('reverse');
	if($Errors.length!=0){
	$('body').animate({scrollTop:$Errors.first().offset().top - 100},1000);
	}
}