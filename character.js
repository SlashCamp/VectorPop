var gameObject = gameObject || {};

gameObject.character = {
		x: gameObject.width / 2,
		y: gameObject.height - gameObject.size / 2,
		size: gameObject.size,
		vx: 0,
		vy: 0,
		acc: 10,
		vulnerable: true,
		color: "rgb(150,150,150)"
	};

	gameObject.character.draw = function () {
		gameObject.ctx.strokeStyle = "rgb(113,199,236)";
		gameObject.ctx.lineWidth = 2;
		var jumpToCharge = gameObject.jumpForce.map(gameObject.jumpForceMax, gameObject.jumpForceMin, 0, this.size / 2);
		gameObject.ctx.beginPath();
		gameObject.ctx.moveTo(this.x - this.size / 2, this.y - this.size / 2);
		gameObject.ctx.lineTo(this.x - jumpToCharge + this.vx / 2, this.y - jumpToCharge);
		gameObject.ctx.stroke();

		gameObject.ctx.beginPath();
		gameObject.ctx.moveTo(this.x + this.size / 2, this.y - this.size / 2);
		gameObject.ctx.lineTo(this.x + jumpToCharge + this.vx / 2, this.y - jumpToCharge);
		gameObject.ctx.stroke();

		gameObject.ctx.beginPath();
		gameObject.ctx.moveTo(this.x + this.size / 2, this.y + this.size / 2);
		gameObject.ctx.lineTo(this.x + jumpToCharge + this.vx / 2, this.y + jumpToCharge);
		gameObject.ctx.stroke();

		gameObject.ctx.beginPath();
		gameObject.ctx.moveTo(this.x - this.size / 2, this.y + this.size / 2);
		gameObject.ctx.lineTo(this.x - jumpToCharge + this.vx / 2, this.y + jumpToCharge);
		gameObject.ctx.stroke();

		gameObject.ctx.lineWidth = 3;
		gameObject.ctx.strokeStyle = gameObject.character.color;
		gameObject.ctx.strokeRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
		gameObject.ctx.lineWidth = 1;
	};

	gameObject.character.update = function () {
		if(gameObject.hit){return;}
		if((gameObject.grounded || gameObject.walled)){
			gameObject.jumpForce = Math.min(gameObject.jumpForce += 2, gameObject.jumpForceMax);
		}

		this.vx += gameObject.momentum / this.acc;

		if(!gameObject.grounded){
			this.vy = this.vy + gameObject.pull;
		}
		if(!gameObject.isJumpDown && (!gameObject.walled && !gameObject.grounded)){
			// on realease of jump key in air
			this.vy++;
		}
		if(!gameObject.pressed && gameObject.grounded){
			this.vx = this.vx * 0.5;
		}

		//START COMBO

		if(gameObject.grounded || gameObject.walled){
			gameObject.scoreMultiplier = 1;
			gameObject.comboActive = false;
		}
		if(gameObject.scoreMultiplier > 1.1){
			gameObject.comboActive = true;
		}
		if(gameObject.comboActive){
			gameObject.ctx.save();
			gameObject.ctx.fillStyle = "rgba(80,80,80, 1)";
			gameObject.ctx.fillText("x" + gameObject.scoreMultiplier, gameObject.character.x, gameObject.character.y + 40);
			gameObject.ctx.restore();
		}

		//END COMBO

		this.vx = Math.max(-gameObject.maxSpeed, Math.min(this.vx, gameObject.maxSpeed)) * gameObject.f;
		this.x += this.vx;
		this.y += this.vy;
		if (this.x < 0 + this.size / 2 || this.x > gameObject.canvas.width - this.size / 2){this.vx = -(this.vx / 1.5);}
		if (this.y < 0 + this.size / 2){this.vy = 0;}
		if (this.y > gameObject.canvas.height - this.size / 2){this.vy = 0; gameObject.grounded = true;}
		if (this.x > gameObject.canvas.width - this.size / 2){this.x = gameObject.canvas.width - this.size / 2; gameObject.walled = true;}
		else if (this.x < 0 + this.size / 2){this.x = 0 + this.size / 2; gameObject.walled = true;}
		if (this.y > gameObject.canvas.height - this.size / 2){this.y = gameObject.canvas.height - this.size / 2;}
		if (this.y < 0 + this.size / 2){this.y = this.size / 2;}
	};