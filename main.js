var gameObject = gameObject || {};
gameObject.main = function(){
	gameObject.width = window.innerWidth;
	gameObject.height = window.innerHeight;

	gameObject.canvas = document.getElementById("canvas");
	gameObject.canvas_hud = document.getElementById("canvas_hud");
	gameObject.canvas_soft = document.getElementById("canvas_soft");
	gameObject.canvas_long = document.getElementById("canvas_long");

	gameObject.canvas.width = gameObject.width;
	gameObject.canvas.height = gameObject.height;
	gameObject.canvas_hud.width = gameObject.width;
	gameObject.canvas_hud.height = gameObject.height;
	gameObject.canvas_long.width = gameObject.width;
	gameObject.canvas_long.height = gameObject.height;
	gameObject.canvas_soft.width = gameObject.width;
	gameObject.canvas_soft.height = gameObject.height;

	gameObject.ctx = gameObject.canvas.getContext("2d");
	gameObject.hud = gameObject.canvas_hud.getContext("2d");
	gameObject.soft = gameObject.canvas_soft.getContext("2d");
	gameObject.long = gameObject.canvas_long.getContext("2d");

	gameObject.hud.font = "20px Inconsolata";
	gameObject.hud.fillStyle = "rgba(120, 120, 120, 1)";
	gameObject.hud.textAlign = "center";
	gameObject.hud.fillText("♩", gameObject.width - 20, 30);

	gameObject.startScreen = function(){
		if(!gameObject.init){
			gameObject.ctx.font = "20px Inconsolata";
			gameObject.ctx.fillStyle = "rgba(235, 235, 235, 1)";
			gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
			gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
			gameObject.ctx.textAlign = "center";
	//		console.log(gameObject.utils.getCookie("firstRun"));
			if(gameObject.utils.getCookie("firstRun") === "true"){
				gameObject.ctx.fillText("Welcome to Vector Pop", gameObject.width / 2, gameObject.height / 2);
				gameObject.ctx.fillText("Please configure your controls by ", gameObject.width / 2, gameObject.height / 2 + 25);
				gameObject.ctx.fillText("clicking 'Set controls' below", gameObject.width / 2, gameObject.height / 2 + 50);
				gameObject.ctx.fillText("", gameObject.width / 2 - 115, gameObject.height / 2 + 50);
				gameObject.ctx.fillText("Press jump key to play", gameObject.width / 2, gameObject.height / 2 + 100);
				gameObject.ctx.fillText(gameObject.level.list[gameObject.selectedLevel].id, gameObject.width / 2, gameObject.height / 2 + 125);
			}else{
				gameObject.ctx.fillText("Vector Pop beta 1.3", gameObject.width / 2, gameObject.height / 2);
				gameObject.ctx.fillText("Switch levels with left and right keys", gameObject.width / 2, gameObject.height / 2 + 25);
				gameObject.ctx.fillText("", gameObject.width / 2 - 115, gameObject.height / 2 + 50);
				gameObject.ctx.fillText("Press jump key to start", gameObject.width / 2, gameObject.height / 2 + 75);
				gameObject.ctx.fillText(gameObject.level.list[gameObject.selectedLevel].id, gameObject.width / 2, gameObject.height / 2 + 100);
			}
			gameObject.ctx.fillText("Set controls", gameObject.width / 2, gameObject.height - 100);
			gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
			gameObject.ctx.fillText("⇧", gameObject.width / 2, gameObject.height - 70);
			gameObject.ctx.fillText("⇦ ⇨", gameObject.width / 2, gameObject.height - 50);


			document.onkeyup = gameObject.setLevel;

			gameObject.canvas.addEventListener('click', gameObject.checkChangeKeyArea);
		}
	};

	gameObject.checkChangeKeyArea = function(event) {
		if (gameObject.score == 0 && event.clientX > gameObject.width / 2 - 100 && event.clientX < gameObject.width + 100 && event.clientY > gameObject.height - 140 && event.clientY < gameObject.height){
	//		console.log("changing keys");
			gameObject.setControlLeft();
		}

		if (event.clientX > gameObject.width - 50 && event.clientX < gameObject.width && event.clientY > 0 && event.clientY < 50){
	//		console.log("changing keys");
			gameObject.setVolumeM();
		}
	};

	gameObject.setVolumeM = function(){
		if (!gameObject.audio.muted){
	//		console.log("muteM");
			gameObject.audio.muted = true;
			Howler.mute(true);
			gameObject.hud.clearRect(0, 0, gameObject.width, gameObject.height);
			gameObject.hud.save();
			gameObject.hud.fillStyle = "rgba(120, 120, 120, 1)";
			gameObject.hud.fillText("x", gameObject.width - 20, 30);
			gameObject.hud.restore();
	//		gameObject.audio.volumeM = 0;
		}else{
	//		console.log("unmuteM");
			Howler.mute(false);
			gameObject.audio.muted = false;
	//		gameObject.audio.volumeM = 0.8;
			gameObject.hud.clearRect(0, 0, gameObject.width, gameObject.height);
			gameObject.hud.save();
			gameObject.hud.fillStyle = "rgba(120, 120, 120, 1)";
			gameObject.hud.fillText("♩", gameObject.width - 20, 30);
			gameObject.hud.restore();
		}
	};

	gameObject.setControlLeft = function(){
		gameObject.canvas.removeEventListener('click', gameObject.checkChangeKeyArea);
		gameObject.ctx.fillStyle = "rgba(235, 235, 235, 1)";
		gameObject.ctx.fillRect(0, 0, gameObject.width, gameObject.height);
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("Bind left movement key ⇦", gameObject.width / 2, gameObject.height / 2);
		document.onkeyup = function(e){
			gameObject.settings.left = e.keyCode;
			document.cookie = "left=" + e.keyCode + "; expires=Thu, 18 Dec 2050 12:00:00 UTC";
			gameObject.setControlUp();
		};
	};

	gameObject.setControlUp = function(){
		gameObject.ctx.fillStyle = "rgba(235, 235, 235, 1)";
		gameObject.ctx.fillRect(0, 0, gameObject.width, gameObject.height);
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("Bind jump movement key ⇧", gameObject.width / 2, gameObject.height / 2);
		document.onkeyup = function(e){
			gameObject.settings.up = e.keyCode;
			document.cookie = "up=" + e.keyCode + "; expires=Thu, 18 Dec 2050 12:00:00 UTC";
			gameObject.setControlRight();
		};
	};

	gameObject.setControlRight = function(){
		gameObject.ctx.fillStyle = "rgba(235, 235, 235, 1)";
		gameObject.ctx.fillRect(0, 0, gameObject.width, gameObject.height);
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("Bind right movement key ⇨", gameObject.width / 2, gameObject.height / 2);
		document.onkeyup = function(e){
			gameObject.settings.right = e.keyCode;
			document.cookie = "right=" + e.keyCode + "; expires=Thu, 18 Dec 2050 12:00:00 UTC";
			gameObject.setControlDown();
		};
	};

	gameObject.setControlDown = function(){
		gameObject.ctx.fillStyle = "rgba(235, 235, 235, 1)";
		gameObject.ctx.fillRect(0, 0, gameObject.width, gameObject.height);
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("Bind down key", gameObject.width / 2, gameObject.height / 2);
		document.onkeyup = function(e){
			gameObject.settings.down = e.keyCode;
			document.cookie = "down=" + e.keyCode + "; expires=Thu, 18 Dec 2050 12:00:00 UTC";
			gameObject.startScreen();
		};
	};

	gameObject.setLevel = function(e){
		e = e || window.event;
		if (e.keyCode == gameObject.settings.left) {
			if(gameObject.selectedLevel > 0){
				gameObject.selectedLevel--;
				gameObject.drawLevel = gameObject.level.list[gameObject.selectedLevel];
	//			console.log(gameObject.selectedLevel);
			}
		}
		if (e.keyCode == gameObject.settings.right) {
			if(gameObject.selectedLevel < gameObject.level.list.length - 1){
				gameObject.selectedLevel++;
	//			console.log(gameObject.selectedLevel);
				gameObject.drawLevel = gameObject.level.list[gameObject.selectedLevel];
			}
		}

		if (e.keyCode == gameObject.settings.up) {
			gameObject.reset();
			gameObject.enableReset = false;
			TweenMax.ticker.addEventListener("tick", gameObject.drawLevel);
			gameObject.init = true;
			document.onkeydown = gameObject.checkKey;
			document.onkeyup = gameObject.checkKey;
			return;
		}
		gameObject.startScreen();
	};

	if(gameObject.dev){
		gameObject.setVolumeM();
		gameObject.devTicker = 0;
		gameObject.canvas.addEventListener('click', gameObject.checkChangeKeyArea);
		gameObject.ctx.font = "20px Inconsolata";
		gameObject.ctx.textAlign = "center";
		gameObject.reset();
		gameObject.enableReset = false;
		TweenMax.ticker.addEventListener("tick", gameObject.level.dev);
		gameObject.init = true;
		document.onkeydown = gameObject.checkKey;
		document.onkeyup = gameObject.checkKey;
		return;
	}
	gameObject.startScreen();
};