var leftHeld = false;
var rightHeld = false;
var topHeld = false;
var bottomHeld = false;

var MIN_VELOCITY = -128;
var MAX_VELOCITY = 127;

var velocity;

function sendEvent(){
	var url = "http://hacknile.student.iastate.edu/controls/controls.php";
	var horizontal = "none";
	
	if(topHeld){
		velocity = parseInt($("#velocityslider").val());
	}else if(bottomHeld){
		velocity = -1 * (parseInt($("#velocityslider").val()) + 1);
	}
	
	if(leftHeld){
		horizontal = "left";
	}else if(rightHeld){
		horizontal = "right";
	}
	
	$.post(url, {horizontal: horizontal, velocity: velocity}, function(data){
		console.log(data);
	});
}

function checkKeyDown(e) {

	e = e || window.event;

	if (e.keyCode == '37' || e.keyCode == '65') {
		//left
		e.preventDefault();
		if(!rightHeld){
			leftHeld = true;
			$("#leftarrow").addClass("arrow-depressed");
		}
	}
	else if (e.keyCode == '39' || e.keyCode == '68') {
		//right
		e.preventDefault();
		if(!leftHeld){
			rightHeld = true;
			$("#rightarrow").addClass("arrow-depressed");
		}
	}else if(e.keyCode == '38' || e.keyCode == '87'){
		//up
		e.preventDefault();
		if(!bottomHeld){
			topHeld = true;
			$("#uparrow").addClass("arrow-depressed");
		}
	}else if(e.keyCode == '40' || e.keyCode == '83'){
		//down
		e.preventDefault();
		if(!topHeld){
			bottomHeld = true;
			$("#downarrow").addClass("arrow-depressed");
		}
	}
}

function checkKeyUp(e){
	e = e || window.event;

	if (e.keyCode == '37' || e.keyCode == '65') {
		//left
		e.preventDefault();
		leftHeld = false;
		$("#leftarrow").removeClass("arrow-depressed");
	}
	else if (e.keyCode == '39' || e.keyCode == '68') {
		//right
		e.preventDefault();
		rightHeld = false;
		$("#rightarrow").removeClass("arrow-depressed");
	}else if(e.keyCode == '38' || e.keyCode == '87'){
		//up
		e.preventDefault();
		topHeld = false;
		$("#uparrow").removeClass("arrow-depressed");
	}else if(e.keyCode == '40' || e.keyCode == '83'){
		//down
		e.preventDefault();
		bottomHeld = false;
		$("#downarrow").removeClass("arrow-depressed");
	}
}

function sendLoop(){
	if(leftHeld || rightHeld || topHeld || bottomHeld){
		sendEvent();
	}
	setTimeout("sendLoop();", 300);
}

function updatePic(){
	document.getElementById("screenimage").src = "http://hacknile.student.iastate.edu/admin/cam_pic.php?time=" + new Date().getTime();
	setTimeout("updatePic();", 100);
}

function start(){
	sendLoop();
	updatePic();
}

window.onload = start;

document.onkeydown = checkKeyDown;
document.onkeyup = checkKeyUp;

$(document).ready(function(){
	$("#velocityslider").val("50");
	$("#velocitybox").text($("#velocityslider").val());
	$("#velocityslider").slider().on("slide", function(event){
		var val = $("#velocityslider").val();
		if(val){
			$("#velocitybox").text(val);
		}
	});
});
