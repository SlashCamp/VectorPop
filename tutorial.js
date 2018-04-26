var gameObject = gameObject || {};
gameObject.level = gameObject.level || {};
//the tutorial is in it's own js file to not clutter up the level.js list
gameObject.level.tutorial = function(){
	if(gameObject.score == 0){
		gameObject.score++;
		gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_1;
		gameObject.level.tutorial.script.nextTime = 1000;
		gameObject.level.tutorial.currentInstruction = "";
		gameObject.level.tutorial.currentInstruction2 = "";
		gameObject.level.tutorial.spawnRate = 1;
		gameObject.level.tutorial.jumps = 0;
		gameObject.level.tutorial.checkMoment = false;
		gameObject.level.tutorial.checkJumping = false;
		gameObject.level.tutorial.checkJumping3 = false;
		gameObject.level.tutorial.script();
	}
	gameObject.spinner += 1;
	if(gameObject.spinner >= 90){gameObject.spinner = 0;}

	if(!gameObject.hit){
		if(Math.random() > gameObject.level.tutorial.spawnRate){
			gameObject.dummies.push(new gameObject.npc.dummy({seekingIf:!gameObject.hit, x:gameObject.centerX, y:1}));
			gameObject.level.tutorial.spawnRate += 0.01;
		}
	}

	if(gameObject.level.tutorial.checkMoment){
		if (gameObject.character.vx > 1){
			gameObject.level.tutorial.movement1 = true;
		}
		if (gameObject.character.vx < -1){
			gameObject.level.tutorial.movement2 = true;
		}
		if(gameObject.level.tutorial.movement1 && gameObject.level.tutorial.movement2){
			gameObject.level.tutorial.checkMoment = false;
			gameObject.level.tutorial.script.nextTime = 1500;
			gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_2_1;
			gameObject.level.tutorial.script();
		}
	}
	if(gameObject.level.tutorial.checkJumping){
		if(gameObject.character.vy < -10){
			gameObject.level.tutorial.checkJumping = false;
			gameObject.level.tutorial.script.nextTime = 2000;
			gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_5;
			gameObject.level.tutorial.script();
		}
	}

	if(gameObject.level.tutorial.checkJumping2){

		if(gameObject.character.vy == -20){
			gameObject.level.tutorial.jumps++;
			console.log(gameObject.level.tutorial.jumps);
			if(gameObject.level.tutorial.jumps == 3){
				console.log(gameObject.level.tutorial.jumps, "!!!!");
				gameObject.level.tutorial.currentInstruction2 = "One more time for good meassure.";
			}else{
				gameObject.level.tutorial.currentInstruction2 = "Just " + (4 - gameObject.level.tutorial.jumps) + " more times.";
			}
			if(gameObject.level.tutorial.jumps == 4){
				gameObject.level.tutorial.currentInstruction2 = "";
				gameObject.level.tutorial.checkJumping2 = false;
				gameObject.level.tutorial.script.nextTime = 1000;
				gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_7;
				gameObject.level.tutorial.script();
			}
		}
	}

	if(gameObject.level.tutorial.checkJumping3){
		if(gameObject.grounded == true && gameObject.walled == true){
			gameObject.level.tutorial.fullyGrounded = true;
		}
		if(gameObject.level.tutorial.fullyGrounded){
			if(gameObject.grounded == false && gameObject.walled == true){
				gameObject.level.tutorial.walled = true;
			}
		}
		if(gameObject.level.tutorial.walled){
			gameObject.level.tutorial.checkJumping3 = false;
			gameObject.level.tutorial.script.nextTime = 1000;
			gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_8;
			gameObject.level.tutorial.script();
		}
	}

	if(gameObject.score > 100){
		gameObject.level.tutorial.script.nextTime = 1000;
		gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_10;
		gameObject.level.tutorial.script();
	}

	gameObject.ctx.fillStyle = "rgba(235,235,235, 1)";
	gameObject.ctx.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.soft.fillStyle = "rgba(255,255,255, 0.5)";
	gameObject.soft.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	gameObject.long.fillStyle = "rgba(255,255,255, 0.2)";
	gameObject.long.fillRect(0, 0, gameObject.canvas.width, gameObject.canvas.height);

	for (var i = 0; i < gameObject.dummies.length; i++) {
		gameObject.dummies[i].update();
		gameObject.dummies[i].draw();
	}
	for (var l = 0; l < gameObject.boomers.length; l++) {
		gameObject.boomers[l].update();
		gameObject.boomers[l].draw();
	}
	for (var j = 0; j < gameObject.stalkers.length; j++) {
		gameObject.stalkers[j].update();
		gameObject.stalkers[j].draw();
	}

	gameObject.character.update();

	if(gameObject.hit && !gameObject.burst){
		gameObject.death();
	}else if(!gameObject.hit){
		gameObject.character.draw();
	}



	gameObject.ctx.save();
	gameObject.ctx.textAlign = "center";
	gameObject.ctx.fillStyle = "rgba(120, 120, 120, 1)";
	gameObject.ctx.fillText(gameObject.level.tutorial.currentInstruction, gameObject.character.x - gameObject.character.vx * 2, gameObject.character.y - gameObject.size * 4);
	gameObject.ctx.fillText(gameObject.level.tutorial.currentInstruction2, gameObject.character.x - gameObject.character.vx * 2, gameObject.character.y - gameObject.size * 2.5);
	gameObject.ctx.restore();

	gameObject.ctx.globalCompositeOperation = "multiply";
	gameObject.ctx.drawImage(gameObject.canvas_soft, 0, 0);
	gameObject.ctx.drawImage(gameObject.canvas_long, 0, 0);
	gameObject.ctx.globalCompositeOperation = "source-over";
};

gameObject.level.tutorial.script = function(){
	setTimeout(gameObject.level.tutorial.script.nextLine, gameObject.level.tutorial.script.nextTime);
};

gameObject.level.tutorial.script.line_1 = function(){
	gameObject.level.tutorial.currentInstruction = "Hello and welcome to the tutorial!";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_1_1;
	gameObject.level.tutorial.script.nextTime = 3000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_1_1 = function(){
	gameObject.level.tutorial.currentInstruction = "We're about to learn basic controls and gameplay.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_2;
	gameObject.level.tutorial.script.nextTime = 5000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_2 = function(){
	gameObject.level.tutorial.currentInstruction = "First, try to move a bit from left to right with";
	gameObject.level.tutorial.currentInstruction2 = "the controls you set in the beginning.";
	gameObject.level.tutorial.checkMoment = true;
};

gameObject.level.tutorial.script.line_2_1 = function(){
	gameObject.level.tutorial.currentInstruction = "Great! Looks like your moevement keys are working.";
	gameObject.level.tutorial.currentInstruction2 = "";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_3;
	gameObject.level.tutorial.script.nextTime = 4000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_3 = function(){
	gameObject.level.tutorial.currentInstruction = "Let's move on to vertical movement.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_4;
	gameObject.level.tutorial.script.nextTime = 4000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_4 = function(){
	gameObject.level.tutorial.currentInstruction = "Try to jump with the jump key you've set up.";
	gameObject.level.tutorial.checkJumping = true;
};

gameObject.level.tutorial.script.line_5 = function(){
	gameObject.level.tutorial.currentInstruction = "Perfect! You will be doing a lot of that in the future,";
	gameObject.level.tutorial.currentInstruction2 = "study the physics of movement thoroughly.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_5_1;
	gameObject.level.tutorial.script.nextTime = 5000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_5_1 = function(){
	gameObject.level.tutorial.currentInstruction = "There is more to jumping than ";
	gameObject.level.tutorial.currentInstruction2 = "going up or down however.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_5_2;
	gameObject.level.tutorial.script.nextTime = 1000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_5_2 = function(){
	gameObject.level.tutorial.currentInstruction = "There is more to jumping than ";
	gameObject.level.tutorial.currentInstruction2 = " going up or down however..";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_5_3;
	gameObject.level.tutorial.script.nextTime = 1000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_5_3 = function(){
	gameObject.level.tutorial.currentInstruction = "There is more to jumping than ";
	gameObject.level.tutorial.currentInstruction2 = "  going up or down however...";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_6;
	gameObject.level.tutorial.script.nextTime = 2500;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_6 = function(){
	gameObject.level.tutorial.currentInstruction = "You can for instance release the jump key";
	gameObject.level.tutorial.currentInstruction2 = "mid air to cancel the jump.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_6_1;
	gameObject.level.tutorial.script.nextTime = 6000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_6_1 = function(){
	gameObject.level.tutorial.currentInstruction = "You can also tap the jump key mid air to ";
	gameObject.level.tutorial.currentInstruction2 = "get a small burst or upward momentum.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_6_2;
	gameObject.level.tutorial.script.nextTime = 5000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_6_2 = function(){
	gameObject.level.tutorial.currentInstruction = "Try this out a few times to get a feel for it.";
	gameObject.level.tutorial.currentInstruction2 = "";
	gameObject.level.tutorial.checkJumping2 = true;
};

gameObject.level.tutorial.script.line_7 = function(){
	gameObject.level.tutorial.currentInstruction = "Interesting isn't it.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_7_1;
	gameObject.level.tutorial.script.nextTime = 2500;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_7_1 = function(){
	gameObject.level.tutorial.currentInstruction = "There is one more aspect to vertical movement.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_7_2;
	gameObject.level.tutorial.script.nextTime = 1000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_7_2 = function(){
	gameObject.level.tutorial.currentInstruction = " There is one more aspect to vertical movement..";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_7_3;
	gameObject.level.tutorial.script.nextTime = 1000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_7_3 = function(){
	gameObject.level.tutorial.currentInstruction = "  There is one more aspect to vertical movement...";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_7_4;
	gameObject.level.tutorial.script.nextTime = 2000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_7_4 = function(){
	gameObject.level.tutorial.currentInstruction = "Wall jumping!";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_7_5;
	gameObject.level.tutorial.script.nextTime = 3000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_7_5 = function(){
	gameObject.level.tutorial.currentInstruction = "Whenever you're rubbing up against a wall you can jump";
	gameObject.level.tutorial.currentInstruction2 = "as if you are grounded. Try it out!";
	gameObject.level.tutorial.checkJumping3 = true;
};

gameObject.level.tutorial.script.line_8 = function(){
	gameObject.level.tutorial.currentInstruction = "Look at that, you just did a wall jump.";
	gameObject.level.tutorial.currentInstruction2 = "";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_8_1;
	gameObject.level.tutorial.script.nextTime = 3000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_8_1 = function(){
	gameObject.level.tutorial.currentInstruction = "By now you should have noticed the";
	gameObject.level.tutorial.currentInstruction2 = "blue cross in the middle of you.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_8_2;
	gameObject.level.tutorial.script.nextTime = 3000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_8_2 = function(){
	gameObject.level.tutorial.currentInstruction = "When the cross is fully drawn your";
	gameObject.level.tutorial.currentInstruction2 = "jumping power is fully charged.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_8_3;
	gameObject.level.tutorial.script.nextTime = 4000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_8_3 = function(){
	gameObject.level.tutorial.currentInstruction = "Jumping several times in a row";
	gameObject.level.tutorial.currentInstruction2 = "will exhaust your jumping power.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_9;
	gameObject.level.tutorial.script.nextTime = 4000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_9 = function(){
	gameObject.level.tutorial.currentInstruction = "Now we're going to put your skills to the test.";
	gameObject.level.tutorial.currentInstruction2 = "";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_9_1;
	gameObject.level.tutorial.script.nextTime = 4000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_9_1 = function(){
	gameObject.level.tutorial.currentInstruction = "A few enemies will come at you shortly.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_9_2;
	gameObject.level.tutorial.script.nextTime = 4000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_9_2 = function(){
	gameObject.level.tutorial.currentInstruction = "All enemies will die if you jump over them,";
	gameObject.level.tutorial.currentInstruction2 = "how far over doesn't matter.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_9_3;
	gameObject.level.tutorial.script.nextTime = 5000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_9_3 = function(){
	gameObject.level.tutorial.currentInstruction = "Most enemies will charge at your latest position.";
	gameObject.level.tutorial.currentInstruction2 = "But these will not hurt you so don't worry.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.tutorial.script.line_9_4;
	gameObject.level.tutorial.script.nextTime = 5000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.script.line_9_4 = function(){
	gameObject.level.tutorial.currentInstruction = "";
	gameObject.level.tutorial.currentInstruction2 = "";
	gameObject.character.vulnerable = false;
	gameObject.level.tutorial.spawnRate = 0.9;
};

gameObject.level.tutorial.script.line_10 = function(){
	gameObject.level.tutorial.currentInstruction = "Congratulations! You have completed the tutorial.";
	gameObject.level.tutorial.currentInstruction2 = "You will be returned to the start screen shortly.";
	gameObject.level.tutorial.script.nextLine = gameObject.level.endLevel;
	gameObject.level.tutorial.script.nextTime = 5000;
	gameObject.level.tutorial.script();
};

gameObject.level.tutorial.id = "tutorial";