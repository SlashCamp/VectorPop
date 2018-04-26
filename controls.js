var gameObject = gameObject || {};

gameObject.checkKey = function(e){
	e = e || window.event;
	var currentEvent = e.type;
	if(gameObject.enableReset && currentEvent == "keyup" && e.keyCode == gameObject.settings.up){
		gameObject.reset();
		gameObject.enableReset = false;
	}
	if(gameObject.enableReset && currentEvent == "keyup" && e.keyCode == gameObject.settings.down){
		gameObject.level.endLevel();
	}
	if (e.keyCode == gameObject.settings.up) {
		if(currentEvent == "keydown" && gameObject.keyActive == false){
			gameObject.keyActive = true;
			gameObject.isJumpDown = true;
			gameObject.jumpForce = Math.min(gameObject.jumpForce, gameObject.jumpForceMax);
			gameObject.character.vy = -gameObject.jumpForce;
			gameObject.grounded = false;
			gameObject.walled = false;
			gameObject.jumpForce = gameObject.jumpForceMin;
			gameObject.audio.jump.play();

		}else if(currentEvent == "keyup"){
			gameObject.keyActive = false;
			gameObject.isJumpDown = false;
		}
	}
/*			else if (e.keyCode == gameObject.settings.down){
}*/

	if (e.keyCode == gameObject.settings.left) {
		if(currentEvent == "keydown"){
			gameObject.momentum = -20;
			gameObject.leftDown = true;
			gameObject.pressed = true;
		}else if(currentEvent == "keyup"){
			if (!gameObject.rightDown) {
				gameObject.pressed = false;
				gameObject.momentum = 0;
			}else if(gameObject.rightDown){
				gameObject.momentum = 20;
			}
			gameObject.leftDown = false;
		}
	}

	if (e.keyCode == gameObject.settings.right) {
		if(currentEvent == "keydown"){
			gameObject.momentum = 20;
			gameObject.rightDown = true;
			gameObject.pressed = true;
		}else if(currentEvent == "keyup"){
			if (!gameObject.leftDown) {
				gameObject.pressed = false;
				gameObject.momentum = 0;
			}else if(gameObject.leftDown){
				gameObject.momentum = -20;
			}
			gameObject.rightDown = false;
		}
	}
};