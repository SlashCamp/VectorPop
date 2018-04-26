var gameObject = gameObject || {};

gameObject.dev = true;

gameObject.maxSpeed = 10;
gameObject.size = 20;
gameObject.f = 0.98;
gameObject.pull = 0.5;
gameObject.jumpForce = 20;
gameObject.jumpForceMin = 1;
gameObject.jumpForceMax = 20;
gameObject.isJumpDown = false;
gameObject.grounded = true;
gameObject.walled = false;
gameObject.keyActive = false;
gameObject.momentum = 0;
gameObject.dirLock = false;
gameObject.pressed = false;
gameObject.deathX;
gameObject.deathY;
gameObject.burst = false;
gameObject.spinner = 0;
gameObject.enableReset = false;
gameObject.rightDown = false;
gameObject.leftDown = false;
gameObject.centerX = window.innerWidth / 2;
gameObject.selectedLevel = 0;
gameObject.scoreMultiplier = 1;

gameObject.friction = 1;
gameObject.hit = false;

gameObject.init = false;

gameObject.score = 0;

gameObject.settings = {};

if(document.cookie){
	gameObject.settings.left = gameObject.utils.getCookie("left");
	gameObject.settings.right = gameObject.utils.getCookie("right");
	gameObject.settings.down = gameObject.utils.getCookie("down");
	gameObject.settings.up = gameObject.utils.getCookie("up");
}else{
	gameObject.settings.up = "38";
	gameObject.settings.down = "40";
	gameObject.settings.left = "37";
	gameObject.settings.right = "39";

}
if(!gameObject.utils.getCookie("firstRun")){
	document.cookie = "firstRun=" + true + "; expires=Thu, 18 Dec 2050 12:00:00 UTC";
}else{
	document.cookie = "firstRun=" + false + "; expires=Thu, 18 Dec 2050 12:00:00 UTC";
}


if(!gameObject.utils.getCookie("highScore")){
	document.cookie = "highScore=" + 0 + "; expires=Thu, 18 Dec 2050 12:00:00 UTC";
}

gameObject.scoreHandler = function(scr){
	gameObject.score += Math.floor(scr * gameObject.scoreMultiplier);

	if(!gameObject.grounded && !gameObject.walled){
		gameObject.scoreMultiplier = gameObject.scoreMultiplier * 10;
		gameObject.scoreMultiplier += 1;
		gameObject.scoreMultiplier = gameObject.scoreMultiplier / 10;
	}
};

gameObject.reset = function(){
	gameObject.audio.endLevel();

	gameObject.maxSpeed = 10;
	gameObject.size = 20;
	gameObject.f = 0.98;
	gameObject.pull = 0.5;
	gameObject.jumpForce = 20;
	gameObject.jumpForceMin = 1;
	gameObject.jumpForceMax = 20;
	gameObject.isJumpDown = false;
	gameObject.grounded = true;
	gameObject.walled = false;
	gameObject.keyActive = false;
	gameObject.momentum = 0;
	gameObject.dirLock = false;
	gameObject.pressed = false;
	gameObject.deathX;
	gameObject.deathY;
	gameObject.burst = false;
	gameObject.spinner = 0;
	gameObject.enableReset = false;
	gameObject.rightDown = false;
	gameObject.leftDown = false;
	gameObject.centerX = window.innerWidth / 2;

	gameObject.audio.endLevelTriggered = false;
	gameObject.audio.track_2_on = false;
	gameObject.audio.track_3_on = false;
	gameObject.audio.track_4_on = false;
	gameObject.audio.track_5_on = false;
	gameObject.audio.track_6_on = false;
	gameObject.audio.track_7_on = false;
	gameObject.audio.track_8_on = false;
	gameObject.audio.track_9_on = false;

	gameObject.pattern.reset();

	gameObject.dummies = [];
	gameObject.stalkers = [];
	gameObject.boomers = [];
	gameObject.dashers = [];
	gameObject.shards = [];
	gameObject.shooters = [];
	gameObject.orbiters = [];
	gameObject.globalVelocity = 1;
	gameObject.friction = 1;
	gameObject.hit = false;
	gameObject.score = 0,

	gameObject.character.vx = 0,
	gameObject.character.vy = 0,

	gameObject.character.x = gameObject.width / 2,
	gameObject.character.y = gameObject.height - gameObject.size / 2,
	gameObject.character.vulnerable = true;

	gameObject.ctx.save();
	gameObject.ctx.fillStyle = "rgba(235, 235, 235, 1)";
	gameObject.ctx.fillRect(0,0, gameObject.width, gameObject.height)
	gameObject.long.restore();

	gameObject.soft.save();
	gameObject.soft.clearRect(0,0, gameObject.width, gameObject.height)
	gameObject.long.restore();

	gameObject.long.save();
	gameObject.long.clearRect(0,0, gameObject.width, gameObject.height)
	gameObject.long.restore();
};

gameObject.settings.init = true;