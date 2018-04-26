var gameObject = gameObject || {};
gameObject.level = gameObject.level || {};

//console.log(parseInt(gameObject.utils.getCookie("highScore")));

gameObject.level.gameOver = function(){
	if(gameObject.score > parseInt(gameObject.utils.getCookie("highScore"))){
		if(!gameObject.level.highScoreSet){
			document.cookie = "highScore=" + gameObject.score + "; expires=Thu, 18 Dec 2050 12:00:00 UTC";
			console.log(gameObject.score, parseInt(gameObject.utils.getCookie("highScore")));
			gameObject.level.highScoreSet = true;
		}
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "center";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("New high score: " + gameObject.score, gameObject.width / 2, gameObject.height / 2);
		gameObject.ctx.fillText("Press jump key to play again", gameObject.width / 2, gameObject.height / 2 + 25);
		gameObject.ctx.fillText("Press down key to return to main menu", gameObject.width / 2, gameObject.height / 2 + 50);
		gameObject.ctx.restore();
	}else{
		gameObject.level.highScoreSet = false;
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "center";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("High score: " + gameObject.utils.getCookie("highScore"), gameObject.width / 2, gameObject.height / 2 - 25);
		gameObject.ctx.fillText("Final score: " + gameObject.score, gameObject.width / 2, gameObject.height / 2);
		gameObject.ctx.fillText("Press jump key to play again", gameObject.width / 2, gameObject.height / 2 + 25);
		gameObject.ctx.fillText("Press down key to return to main menu", gameObject.width / 2, gameObject.height / 2 + 50);
		gameObject.ctx.restore();
	}
	gameObject.globalVelocity -= 0.01;
	gameObject.globalVelocity = Math.max(0.1, gameObject.globalVelocity);
};

gameObject.level.stageComplete = function(){
	gameObject.enableReset = true;
	gameObject.globalVelocity -= 0.01;
	gameObject.globalVelocity = Math.max(0.1, gameObject.globalVelocity);
	gameObject.ctx.save();
	gameObject.ctx.textAlign = "center";
	gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
	gameObject.ctx.fillText(gameObject.level.list[gameObject.selectedLevel].id + " complete!", gameObject.width / 2, gameObject.height / 2);
	gameObject.ctx.fillText("Press jump key to play again", gameObject.width / 2, gameObject.height / 2 + 25);
	gameObject.ctx.fillText("Press down key to return to main menu", gameObject.width / 2, gameObject.height / 2 + 50);
	gameObject.ctx.restore();

	gameObject.globalVelocity -= 0.01;
	gameObject.globalVelocity = Math.max(0.1, gameObject.globalVelocity);
};

gameObject.level.update = function(arr){
	for (var i = 0; i < arr.length; i++) {
		for (var j = arr[i].length - 1; j >= 0; j--) {
			arr[i][j].update();
			if(arr[i][j].live == false){
				arr[i].splice(j, 1);
			}else{
				arr[i][j].draw();
			}
		}
	}
};

gameObject.death = function(){
	for (var i = 0; i < 10; i++) {
		gameObject.shards.push(new gameObject.npc.shard({c:gameObject.character.color, seekingIf:false}));
	}
	setTimeout(function(){gameObject.enableReset = true;}, 500);
	gameObject.burst = true;
	gameObject.audio.arp.play();
};

//Sandbox
//STARTS HERE
gameObject.level.sandbox = function(){
	gameObject.spinner += 1;
	if(gameObject.spinner >= 90){gameObject.spinner = 0;}

	if(!gameObject.hit){
		if(Math.random() > 0.94){
			gameObject.dummies.push(new gameObject.npc.dummy({seekingIf:!gameObject.hit, x:gameObject.centerX, y:1}));
		}
		if(Math.random() > 0.994){
			gameObject.stalkers.push(new gameObject.npc.stalker({}));
		}
		if(Math.random() > 0.995){
			gameObject.boomers.push(new gameObject.npc.boomer({}));
		}
		if(Math.random() > 0.995){
			gameObject.dashers.push(new gameObject.npc.dasher({}));
		}
		if(Math.random() > 0.998){
			gameObject.shooters.push(new gameObject.npc.shooter({}));
		}
	}

	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.level.update([gameObject.dummies, gameObject.stalkers, gameObject.shooters, gameObject.dashers, gameObject.boomers, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
		gameObject.score++;
	}

	if(gameObject.hit){
		gameObject.level.gameOver();

	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("Score: " + gameObject.score, 0, 20);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};

gameObject.level.sandbox.id = "Arcade";

//All Stalkers
//STARTS HERE
gameObject.level.devModeStalkers = function(){
	gameObject.spinner += 1;
	if(gameObject.spinner >= 90){gameObject.spinner = 0;}

	if(!gameObject.hit){
		if(Math.random() > 0.94){
			gameObject.stalkers.push(new gameObject.npc.stalker({}));
		}
	}

	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.level.update([gameObject.stalkers, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
		gameObject.score++;
	}

	if(gameObject.hit){
		gameObject.level.gameOver();

	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("Score: " + gameObject.score, 0, 20);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};

gameObject.level.devModeStalkers.id = "dev mode stalkers";


//All boomers
//STARTS HERE
gameObject.level.devModeBoomers = function(){
	gameObject.spinner += 1;
	if(gameObject.spinner >= 90){gameObject.spinner = 0;}

	if(!gameObject.hit){
		if(Math.random() > 0.97){
			gameObject.boomers.push(new gameObject.npc.boomer({}));
		}
	}

	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.level.update([gameObject.boomers, gameObject.dummies, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
		gameObject.score++;
	}

	if(gameObject.hit){
		gameObject.level.gameOver();

	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("Score: " + gameObject.score, 0, 20);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};

gameObject.level.devModeBoomers.id = "dev mode boomers";

//All Dashers
//STARTS HERE
gameObject.level.devModeDashers = function(){
	gameObject.spinner += 1;
	if(gameObject.spinner >= 90){gameObject.spinner = 0;}

	if(!gameObject.hit){
		if(Math.random() > 0.94){
			gameObject.dashers.push(new gameObject.npc.dasher({}));
		}
	}

	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.level.update([gameObject.dashers, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
		gameObject.score++;
	}

	if(gameObject.hit){
		gameObject.level.gameOver();

	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("Score: " + gameObject.score, 0, 20);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};

gameObject.level.devModeDashers.id = "dev mode dashers";

//All shooters
//STARTS HERE
gameObject.level.devModeShooters = function(){
	gameObject.spinner += 1;
	if(gameObject.spinner >= 90){gameObject.spinner = 0;}

	if(!gameObject.hit){
		if(Math.random() > 0.99){
			gameObject.shooters.push(new gameObject.npc.shooter({}));
		}
	}

	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.level.update([gameObject.shooters, gameObject.dummies, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
		gameObject.score++;
	}

	if(gameObject.hit){
		gameObject.level.gameOver();

	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("Score: " + gameObject.score, 0, 20);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};

gameObject.level.devModeShooters.id = "dev mode shooters";

//All orbiters
//STARTS HERE
gameObject.level.devModeOrbiters = function(){
	gameObject.spinner += 1;
	if(gameObject.spinner >= 90){gameObject.spinner = 0;}

	if(!gameObject.hit){
		if(Math.random() > 0.99){
			gameObject.orbiters.push(new gameObject.npc.orbiter({}));
		}
	}

	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.level.update([gameObject.orbiters, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
		gameObject.score++;
	}

	if(gameObject.hit){
		gameObject.level.gameOver();

	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("Score: " + gameObject.score, 0, 20);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};

gameObject.level.devModeOrbiters.id = "dev mode orbiters";

//STAGE PLAY STARTS HERE

gameObject.level.stage_1 = function(){
	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	if(!gameObject.hit){
		gameObject.pattern.handler(gameObject.pattern.list1);
		if(gameObject.pattern.list1.length == 0 && gameObject.dummies.length == 0){
			gameObject.level.stageComplete();
		}
	}

	gameObject.level.update([gameObject.dummies, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
		gameObject.score++;
	}

	if(gameObject.hit){
		gameObject.level.gameOver();
	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText(gameObject.level.stage_1.id, 0, 20);
		gameObject.ctx.fillText("Nodes left " + gameObject.dummies.length, 0, 40);
		gameObject.ctx.fillText("Waves left " + gameObject.pattern.list1.length, 0, 60);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};

gameObject.level.stage_1.id = "Stage Level 1";

gameObject.level.stage_2 = function(){
	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	if(!gameObject.hit){
		gameObject.pattern.handler(gameObject.pattern.list2);
		if(gameObject.pattern.list2.length == 0 && gameObject.dummies.length == 0){
			gameObject.level.stageComplete();
		}
	}

	gameObject.level.update([gameObject.dummies, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
		gameObject.score++;
	}

	if(gameObject.hit){
		gameObject.level.gameOver();
	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText(gameObject.level.stage_2.id, 0, 20);
		gameObject.ctx.fillText("Nodes left " + gameObject.dummies.length, 0, 40);
		gameObject.ctx.fillText("Waves left " + gameObject.pattern.list2.length, 0, 60);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};

gameObject.level.stage_2.id = "Stage Level 2";


gameObject.level.stage_3 = function(){
	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	if(!gameObject.hit){
		gameObject.pattern.handler(gameObject.pattern.list3);
		if(gameObject.pattern.list3.length == 0 && gameObject.dummies.length == 0){
			gameObject.level.stageComplete();
		}
	}

	gameObject.level.update([gameObject.dummies, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
		gameObject.score++;
	}

	if(gameObject.hit){
		gameObject.level.gameOver();
	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText(gameObject.level.stage_3.id, 0, 20);
		gameObject.ctx.fillText("Nodes left " + gameObject.dummies.length, 0, 40);
		gameObject.ctx.fillText("Waves left " + gameObject.pattern.list3.length, 0, 60);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};

gameObject.level.stage_3.id = "Stage Level 3";

gameObject.level.stage_4 = function(){
	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	if(!gameObject.hit){
		gameObject.pattern.handler(gameObject.pattern.list4);
		if(gameObject.pattern.list4.length == 0 && gameObject.dummies.length == 0){
			gameObject.level.stageComplete();
		}
	}

	gameObject.level.update([gameObject.dummies, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
		gameObject.score++;
	}

	if(gameObject.hit){
		gameObject.level.gameOver();
	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText(gameObject.level.stage_4.id, 0, 20);
		gameObject.ctx.fillText("Nodes left " + gameObject.dummies.length, 0, 40);
		gameObject.ctx.fillText("Waves left " + gameObject.pattern.list4.length, 0, 60);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};

gameObject.level.stage_4.id = "Stage Level 4";

if(gameObject.utils.getCookie("firstRun") === "true"){
	gameObject.level.list = [
		gameObject.level.tutorial,
		gameObject.level.stage_1,
		gameObject.level.stage_2,
		gameObject.level.stage_3,
		gameObject.level.stage_4,
		gameObject.level.sandbox,
	];
}else{
	gameObject.level.list = [
		gameObject.level.stage_1,
		gameObject.level.stage_2,
		gameObject.level.stage_3,
		gameObject.level.stage_4,
		gameObject.level.sandbox,
		gameObject.level.tutorial
	];
}

if (gameObject.dev){
	gameObject.level.list = [
		gameObject.level.stage_1,
		gameObject.level.stage_2,
		gameObject.level.stage_3,
		gameObject.level.stage_4,
		gameObject.level.sandbox,
		gameObject.level.devModeStalkers,
		gameObject.level.devModeBoomers,
		gameObject.level.devModeDashers,
		gameObject.level.devModeShooters,
		gameObject.level.devModeOrbiters,
		gameObject.level.tutorial
	];
}

gameObject.level.endLevel = function(){
	TweenMax.ticker.removeEventListener("tick", gameObject.drawLevel);
	gameObject.init = false;
	gameObject.startScreen();
	gameObject.level.highScoreSet = false;
	gameObject.audio.endLevel();
	return;
};

gameObject.drawLevel = gameObject.level.list[gameObject.selectedLevel];

//DEV
gameObject.level.dev = function(){
	gameObject.character.vulnerable = false;
//	gameObject.score = 10000;
	gameObject.devTicker--;
	if(gameObject.devTicker < 0){
		gameObject.devTicker = 60;
	}

	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);
	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	if(!gameObject.hit){
		if(gameObject.devTicker == 0){
	//		gameObject.dummies.push(new gameObject.npc.shooter({x: gameObject.width / 2, y: gameObject.height / 2, dead: true}));
		}
		gameObject.pattern.handler(gameObject.pattern.dev);
		if(gameObject.pattern.dev.length == 0 && gameObject.dummies.length == 0){
			gameObject.level.stageComplete();
		}
	}

	gameObject.level.update([gameObject.dummies, gameObject.shards]);

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
	}

	if(gameObject.hit){
		gameObject.level.gameOver();
	}else{
		gameObject.ctx.save();
		gameObject.ctx.textAlign = "left";
		gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
		gameObject.ctx.fillText("DEBUG MODE " + gameObject.devTicker, 0, 20);
		gameObject.ctx.fillText("Nodes left " + gameObject.dummies.length, 0, 40);
		gameObject.ctx.fillText("Waves left " + gameObject.pattern.dev.length, 0, 60);
		gameObject.ctx.fillText("Grounded " + gameObject.grounded, 0, 80);
		gameObject.ctx.fillText("Score " + gameObject.score, 0, 100);
		gameObject.ctx.restore();
	}
	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";

	gameObject.audio.soundHandler();
};