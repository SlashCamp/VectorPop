var gameObject = gameObject || {};
gameObject.npc = {};

///////////////
//START SHARD//
///////////////

gameObject.npc.shard = function (setting) {
	this.protection = setting.protection || 0,
	this.x = setting.x || gameObject.deathX + ((Math.random() - 0.5) * gameObject.size * 2);
	this.y = setting.y || gameObject.deathY + ((Math.random() - 0.5) * gameObject.size * 2);
	this.size = setting.size || Math.random() * 10;
	this.rotation = setting.rotation || Math.floor(Math.random() * 180);
	this.spinFactor = setting.spinFactor || Math.random() + 1;
	this.vx = setting.vx || gameObject.character.vx * (Math.random() / 4 + 0.25);
	this.vy = setting.vy || gameObject.character.vy * (Math.random() / 4 + 0.25);
	this.live = setting.live || true;
	this.color = setting.color || setting.c || gameObject.utils.getColor({random: false, red: 240, green: 117, blue: 15, floor: 0});
};

gameObject.npc.shard.prototype.draw = function () {
	if(this.live == true){
		gameObject.long.save();
		gameObject.long.beginPath();
		gameObject.long.strokeStyle = "rgb(120, 120, 120)";
		gameObject.long.strokeStyle = "rgb(120, 120, 120)";
		gameObject.long.moveTo(this.x, this.y);
		gameObject.long.lineTo(Math.sin(Math.radians(this.rotation * this.spinFactor)) * this.size + this.x, Math.cos(Math.radians(this.rotation * this.spinFactor)) * this.size + this.y);
		gameObject.long.stroke();
		gameObject.long.restore();
	}
};

gameObject.npc.shard.prototype.update = function () {
	if(this.live == true){
		this.rotation++;
		this.vy = this.vy + 0.2;
		this.x += this.vx * gameObject.globalVelocity;
		this.y += this.vy * gameObject.globalVelocity;
		if (this.x < 0 || this.x > gameObject.canvas.width){this.vx = -this.vx;}
		if (this.y < 0 || this.y > gameObject.canvas.height){this.vy = -this.vy * 0.8;}
	}
};

///////////////
//START DUMMY//
///////////////

gameObject.npc.dummy = function (setting) {
	this.protection = setting.protection || setting.protection || 0,
	this.x = setting.x || gameObject.utils.getX(gameObject.centerX);
	this.y = setting.y || gameObject.utils.getY(1);
	this.size = setting.size || 5;
	this.speed = setting.speed || 4;
	var dx = gameObject.character.x - this.x;
	var dy = gameObject.character.y - this.y;
	var angle = Math.atan2(dy, dx);
	this.vx = setting.vx == undefined ? gameObject.utils.getV(setting.seekingIf, Math.cos(angle) * this.speed) : setting.vx;
	this.vy = setting.vy || gameObject.utils.getV(setting.seekingIf, Math.sin(angle) * this.speed);
	this.live = setting.live || true;
	this.dead = setting.dead || false;
	this.alpha = setting.alpha || 100;
	this.color = setting.color || setting.c || gameObject.utils.getColor({random: false, red: 240, green: 117, blue: 15, floor: 0});
};

gameObject.npc.dummy.prototype.draw = function () {
	if(this.live == true){
		gameObject.ctx.save();
		gameObject.ctx.beginPath();
		gameObject.ctx.strokeStyle = "rgba(120, 120, 120," + this.alpha / 100 + ")";
		gameObject.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		gameObject.ctx.stroke();
		gameObject.ctx.restore();

		gameObject.soft.save();
		gameObject.soft.fillStyle = this.color;
		gameObject.soft.fillRect(this.x - 1, this.y - 1, 2, 2);
		gameObject.soft.restore();
	}
};

gameObject.npc.dummy.prototype.update = function () {
	if(this.live == true){
		if(this.protection > 0){
			this.protection--;
		}
		this.x += this.vx * gameObject.globalVelocity;
		this.y += this.vy * gameObject.globalVelocity;
		if(!gameObject.hit && this.dead == false){
			if(gameObject.character.vulnerable && gameObject.utils.collisionDetection(this, gameObject.character)){
				gameObject.deathX = gameObject.character.x;
				gameObject.deathY = gameObject.character.y;
				gameObject.hit = true;
			}
		}
		if(gameObject.hit == false && this.dead == false && gameObject.utils.overheadDetection(this, gameObject.character) && this.protection == 0){
			this.dead = true;
			gameObject.scoreHandler(10);
			gameObject.audio.high.play();
		}
		if(this.dead){
			this.alpha -= 10;
			this.size = this.size / 2;
		}
		if(this.alpha < 0){
			this.live = false;
		}
		if (this.x < 0 || this.x > gameObject.canvas.width - this.size){this.vx = -this.vx;}
		if (this.y < 0 || this.y > gameObject.canvas.height){this.vy = -this.vy;}
	}
};

////////////////
//START BOOMER//
////////////////

gameObject.npc.boomer = function (setting) {
	this.x = setting.x || gameObject.utils.getX(gameObject.centerX);
	this.y = setting.y || gameObject.utils.getY(1);
	this.size = setting.size || 20;
	this.numPieces = setting.numPieces || Math.ceil(Math.random() * 7) + 3;
	this.pieceRad = setting.pieceRad || (Math.PI * 2) / this.numPieces;
	this.split = setting.split || 1;
	this.alpha = setting.alpha || 100;
	var dx = (gameObject.character.x - gameObject.centerX) * 0.003;
	var dy = (gameObject.character.y - this.y) * 0.003;
	this.vx = setting.vx == undefined ? gameObject.utils.getV(!gameObject.hit, dx) : setting.vx;
	this.vy = setting.vy || gameObject.utils.getV(!gameObject.hit, dy);
	this.live = setting.live || true;
	this.dead = setting.dead || false;
	this.color = setting.color || "rgb(255, 0, 0)";
	this.stroke = setting.stroke || "rgb(120, 120, 120)";
	this.deathOffset = [];
	for (var i = 0; i < this.numPieces; i++) {
		this.deathOffset.push({vx: Math.cos(i * this.pieceRad) * 1, vy: Math.sin(i * this.pieceRad) * 1});
	}
};

gameObject.npc.boomer.prototype.draw = function () {
	if(this.live == true){
		if(this.dead == false){
			gameObject.ctx.save();
			gameObject.ctx.strokeStyle = "rgb(120, 120, 120)";
			gameObject.ctx.beginPath();
			gameObject.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			gameObject.ctx.stroke();
			gameObject.ctx.restore();

			gameObject.long.save();
			gameObject.long.fillStyle = this.color;
			gameObject.long.fillRect(this.x, this.y, 1, 1);
			gameObject.long.restore();
		}else{
			for (var i = 0; i < this.numPieces; i++) {
				gameObject.ctx.save();
				gameObject.ctx.strokeStyle = "rgba(120, 120, 120," + this.alpha / 100 +  ")";
				gameObject.ctx.beginPath();
				gameObject.ctx.arc(this.x + this.deathOffset[i].vx, this.y + this.deathOffset[i].vy, this.size, i * this.pieceRad - Math.radians(this.alpha), i * this.pieceRad + this.pieceRad - Math.radians(this.alpha));
				gameObject.ctx.stroke();
				gameObject.ctx.restore();
				this.deathOffset[i].vx += this.deathOffset[i].vx / this.split;
				this.deathOffset[i].vy += this.deathOffset[i].vy / this.split;
			}
			gameObject.soft.save();
			gameObject.soft.strokeStyle = "rgba(255, 0, 0," + this.alpha / 200 + ")";
			gameObject.soft.beginPath();
			gameObject.soft.arc(this.x, this.y, Math.min(this.size, this.split * 3), 0, Math.PI * 2);
			gameObject.soft.stroke();
			gameObject.soft.restore();
		}
	}
};

gameObject.npc.boomer.prototype.update = function () {
	if(this.live == true){
		this.x += this.vx * gameObject.globalVelocity;
		this.y += this.vy * gameObject.globalVelocity;
		if(!gameObject.hit){
			if(gameObject.character.vulnerable && this.dead == false && gameObject.utils.collisionDetection(this, gameObject.character)){
				gameObject.deathX = gameObject.character.x;
				gameObject.deathY = gameObject.character.y;
				gameObject.hit = true;
			}
		}
		if(gameObject.hit == false && !this.dead && gameObject.utils.overheadDetection(this, gameObject.character)){
			this.dead = true;
			gameObject.scoreHandler(100);
			gameObject.audio.low.play();
		}
		if(this.dead){
			this.split++;
			this.alpha -= 3;
		}
		if(this.split > 30){
			this.live = false;
		}
		if (this.dead == false && (this.x < 0 + this.size / 2 || this.x > gameObject.canvas.width - this.size / 2)){
			for (var k = 0; k < 10; k++) {
				gameObject.dummies.push(new gameObject.npc.dummy({c:this.color, seekingIf:false, x:this.x, y:this.y, protection: 0}));
			}
			this.dead = true;
			this.deathOffset = [];
			for (var l = 0; l < this.numPieces; l++) {
				this.deathOffset.push({vx: Math.cos(l * this.pieceRad) * 0.5, vy: Math.sin(l * this.pieceRad) * 0.5});
			}
		}
		if (this.dead == false && (this.y < 0 || this.y > gameObject.canvas.height - this.size / 2)){
			for (var j = 0; j < 10; j++) {
				gameObject.dummies.push(new gameObject.npc.dummy({c:this.color, seekingIf:false, x:this.x, y:this.y, protection: 0}));
			}
			this.dead = true;
			this.deathOffset = [];
			for (var q = 0; q < this.numPieces; q++) {
				this.deathOffset.push({vx: Math.cos(q * this.pieceRad) * 0.5, vy: Math.sin(q * this.pieceRad) * 0.5});
			}
		}
	}
};

/////////////////
//START STALKER//
/////////////////

gameObject.npc.stalker = function(setting){
	this.x = setting.x || gameObject.utils.getX(gameObject.centerX);
	this.y = setting.y || gameObject.utils.getY(1);
	this.size = setting.size || 10;
	this.speed = setting.speed || 5;
	this.live = setting.live || true;
	this.dead = setting.dead || false;
	this.count = setting.count || 0;
	this.spin = setting.spin || 0;
	this.color = setting.color || gameObject.utils.getColor({random: false, red: 255, green: 20, blue: 0, a:0.3});
};

gameObject.npc.stalker.prototype.draw = function () {
	if(this.live == true){
		//	console.log(this);
		if(!this.dead){
			gameObject.soft.save();
			gameObject.soft.strokeStyle = "rgb(120, 120, 120)";
			gameObject.soft.beginPath();
			gameObject.soft.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
			gameObject.soft.stroke();
			gameObject.soft.restore();
		}

		gameObject.long.save();
		gameObject.long.strokeStyle = this.color;
		gameObject.long.beginPath();
		gameObject.long.lineWidth = 2;
		gameObject.long.arc(this.x, this.y, Math.sin(Math.radians(this.spin)) * this.size, 0, Math.PI * 2);
		gameObject.long.stroke();
		gameObject.long.lineWidth = 1;
		gameObject.long.restore();
	}
};

gameObject.npc.stalker.prototype.update = function () {
	if(this.live == true){
		this.spin++;
		if (this.spin > 90){this.spin = 0;}
		var dx = gameObject.character.x - this.x;
		var dy = gameObject.character.y - this.y;
		var angle = Math.atan2(dy, dx);
		if(!this.dead && !gameObject.hit){
			this.vx = Math.cos(angle) * this.speed;
			this.vy = Math.sin(angle) * this.speed;
			this.x += this.vx * gameObject.globalVelocity;
			this.y += this.vy * gameObject.globalVelocity;
		}else{
			this.xv = this.xv / 1.1;
			this.xy = this.xy / 1.1;
			this.x -= dy / 100 + this.vx * gameObject.globalVelocity;
			this.y += dx / 100 + this.vy * gameObject.globalVelocity;
		}
		if(!gameObject.hit){
			if(gameObject.character.vulnerable && !this.dead && gameObject.utils.collisionDetection(this, gameObject.character)){
				gameObject.deathX = gameObject.character.x;
				gameObject.deathY = gameObject.character.y;
				gameObject.hit = true;
			}
		}
		if(gameObject.hit == false && !this.dead && gameObject.utils.overheadDetection(this, gameObject.character)){
			this.dead = true;
			gameObject.scoreHandler(100);
			gameObject.audio.rep.play();
		}
		if(this.dead){
			this.count++;
		}
		if(this.count > 15){
			this.live = false;
		}
	}
};

////////////////
//START DASHER//
////////////////
gameObject.npc.dasher = function (setting) {
	this.x = setting.x || gameObject.utils.getX(gameObject.centerX);
	this.y = setting.y || gameObject.utils.getY(1);
	this.size = setting.size || 15;
	this.life = setting.life || 15;
	this.speed = setting.speed || 1;
	this.live = setting.live || true;
	this.dead = setting.dead || false;
	this.dx = setting.dx || gameObject.character.x - this.x;
	this.dy = setting.dy || gameObject.character.y - this.y;
	this.angle = setting.angle || Math.atan2(this.dy, this.dx);
	this.color = setting.color || gameObject.utils.getColor({random: false, red: 255, green: 20, blue: 100, a:0.3});
};

gameObject.npc.dasher.prototype.draw = function () {
	if(this.live == true){
		if(!this.dead){
			gameObject.soft.save();
			gameObject.soft.strokeStyle = "rgb(120, 120, 120)";
			gameObject.soft.beginPath();
			gameObject.soft.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
			gameObject.soft.stroke();
			gameObject.soft.restore();
		}

		gameObject.long.save();
		gameObject.long.strokeStyle = this.color;
		gameObject.long.beginPath();
		gameObject.long.lineWidth = 2;
		gameObject.long.arc(this.x, this.y, this.size - this.speed, 0, Math.PI * 2);
		gameObject.long.stroke();
		gameObject.long.lineWidth = 1;
		gameObject.long.restore();
	}
};

gameObject.npc.dasher.prototype.update = function () {
	if(this.live == true){
		if(!this.dead && !gameObject.hit){
			this.dx = gameObject.character.x - this.x;
			this.dy = gameObject.character.y - this.y;
			this.angle = Math.atan2(this.dy, this.dx);
		}
		if(Math.random() > 0.98 || this.dead){
			this.speed = 12;
			if(!this.dead){gameObject.audio.dash.play();}

		}else{
			this.speed = this.speed * 0.95;
		}
		this.vx = Math.cos(this.angle + (Math.random() - 0.5)) * this.speed;
		this.vy = Math.sin(this.angle + (Math.random() - 0.5)) * this.speed;
		this.x += this.vx * gameObject.globalVelocity;
		this.y += this.vy * gameObject.globalVelocity;

		if(this.dead == true){
			this.life--;
		}

		if(this.life < 0){
			this.live = false;
		}

		if(!gameObject.hit){
			if(gameObject.character.vulnerable && this.dead == false && gameObject.utils.collisionDetection(this, gameObject.character)){
				gameObject.deathX = gameObject.character.x;
				gameObject.deathY = gameObject.character.y;
				gameObject.hit = true;
			}
		}
		if(this.dead == false && !gameObject.hit && gameObject.utils.overheadDetection(this, gameObject.character)){
			this.dead = true;
			this.angle = Math.random() * Math.PI * 2;
			gameObject.scoreHandler(100);
			gameObject.audio.perc.play();
		}
		if(gameObject.hit && !this.angleSet){
			this.angleSet = true;
			this.angle = Math.random() * Math.PI * 2;
		}
	}
};

/////////////////
//START SHOOTER//
/////////////////

gameObject.npc.shooter = function (setting) {
	this.x = setting.x || gameObject.utils.getX(gameObject.centerX);
	this.y = setting.y || gameObject.utils.getY(1);
	this.size = setting.size || 20;
	this.speed = setting.speed || 5;
	this.shot = setting.shot || 180;
	this.arm = setting.arm || 10;
	this.charge = setting.charge || 0;
	this.angle = setting.angle || 0;
	this.spin = setting.spin || 0;
	this.count = setting.count || 0;
	this.dead = setting.dead || false;
	this.live = setting.live || true;
	this.color = setting.color || gameObject.utils.getColor({random: false, red: 255, green: 100, blue: 0, a:0.3});
};

gameObject.npc.shooter.prototype.draw = function () {
	if(!this.dead){
		gameObject.ctx.save();
		gameObject.ctx.strokeStyle = "rgb(120, 120, 120)";
		gameObject.ctx.beginPath();
		gameObject.ctx.beginPath();
		gameObject.ctx.arc(this.x, this.y, this.size / 2, Math.radians(this.shot * 2) - Math.PI / 2, Math.radians(this.shot * 2));
		gameObject.ctx.stroke();

		gameObject.ctx.beginPath();
		gameObject.ctx.arc(this.x, this.y, this.size / 2, Math.radians(this.shot * 2) - Math.PI / 2 + Math.PI, Math.radians(this.shot * 2) + Math.PI);
		gameObject.ctx.stroke();
		gameObject.ctx.restore();

		gameObject.long.save();
		gameObject.long.strokeStyle = this.color;
		gameObject.long.beginPath();
		gameObject.long.lineWidth = 2;
		gameObject.long.arc(this.x, this.y, Math.max(this.charge / 10, 1), 0, Math.PI * 2);
		gameObject.long.stroke();
		gameObject.long.lineWidth = 1;
		gameObject.long.restore();
	}else{
		gameObject.ctx.save();
		gameObject.ctx.strokeStyle = "rgb(120, 120, 120)";
		gameObject.ctx.beginPath();
		gameObject.ctx.beginPath();
		gameObject.ctx.arc(this.x + this.count * 2, this.y + this.count * 2, this.size / 2, Math.radians(this.shot * 2) - Math.PI / 2, Math.radians(this.shot * 2));
		gameObject.ctx.stroke();

		gameObject.ctx.beginPath();
		gameObject.ctx.arc(this.x - this.count * 2, this.y + this.count * 2, this.size / 2, Math.radians(this.shot * 2) - Math.PI / 2 + Math.PI, Math.radians(this.shot * 2) + Math.PI);
		gameObject.ctx.stroke();
		gameObject.ctx.restore();

		gameObject.long.save();
		gameObject.long.strokeStyle = this.color;
		gameObject.long.beginPath();
		gameObject.long.lineWidth = 2;
		gameObject.long.arc(this.x, this.y, Math.max(this.count / 2, 1), 0, Math.PI * 2);
		gameObject.long.stroke();
		gameObject.long.lineWidth = 1;
		gameObject.long.restore();
	}
};

gameObject.npc.shooter.prototype.update = function () {
	this.shot--;
	if(this.live == true){
		this.charge++;
		if (this.shot < 50){
			this.arm--;
			this.charge = 0;
			if(this.arm == 0 && !gameObject.hit && !this.dead){
				gameObject.dummies.push(new gameObject.npc.dummy({x:this.x, y:this.y, seekingIf: !gameObject.hit, c:this.color}));
				this.arm = 10;
				gameObject.audio.shoot.play();
			}
		}

		if (this.shot < 0 && this && !gameObject.hit){
			this.shot = 180;
		}
		var dx = gameObject.character.x - this.x;
		var dy = gameObject.character.y - this.y;
		this.angle = Math.atan2(dy, dx);
		this.vx = Math.cos(this.angle) * this.speed;
		this.vy = Math.sin(this.angle) * this.speed * 0.5;
		this.x += this.vx * gameObject.globalVelocity;
		this.y += this.vy * gameObject.globalVelocity;
		if(!gameObject.hit){
			if(gameObject.character.vulnerable && !this.dead && gameObject.utils.collisionDetection(this, gameObject.character)){
				gameObject.deathX = gameObject.character.x;
				gameObject.deathY = gameObject.character.y;
				gameObject.hit = true;
			}
		}
		if(gameObject.hit == false && gameObject.utils.overheadDetection(this, gameObject.character)){
			gameObject.scoreHandler(100);
			gameObject.audio.chord.play();
			this.dead = true;
		}

		if(this.dead){
			this.count++;
		}

		if(this.count > 15){
			this.live = false;
		}
	}
};

/////////////////
//START ORBITER//
/////////////////

gameObject.npc.orbiter = function (px, py) {

	this.x = px || gameObject.utils.getX(gameObject.centerX);
	this.y = py || gameObject.utils.getY(1);
	this.size = 10;
	this.speed = 5;
	this.live = true;
	this.color = gameObject.utils.getColor({random: false, red: 255, green: 20, blue: 0, a:0.3});
};
gameObject.npc.orbiter.prototype.draw = function () {
	if(this.live == true){
		//	console.log(this);
		gameObject.soft.save();
		gameObject.soft.strokeStyle = "rgb(120, 120, 120)";
		gameObject.soft.beginPath();
		gameObject.soft.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
		gameObject.soft.stroke();
		gameObject.soft.restore();

		gameObject.long.save();
		gameObject.long.strokeStyle = this.color;
		gameObject.long.beginPath();
		gameObject.long.lineWidth = 2;
		gameObject.long.arc(this.x, this.y, (gameObject.utils.sinSpin()) * this.size, 0, Math.PI * 2);
		gameObject.long.stroke();
		gameObject.long.lineWidth = 1;
		gameObject.long.restore();
	}
};

gameObject.npc.orbiter.prototype.update = function () {
	if(this.live == true && !gameObject.hit){
		var dx = gameObject.character.x - this.x;
		var dy = gameObject.character.y - this.y;
		var angle = Math.atan2(dy, dx);
		this.vx = Math.sin(angle) * this.speed;
		this.vy = Math.cos(angle) * this.speed;
		this.x -= dy / 100 * gameObject.globalVelocity;
		this.y += dx / 100 * gameObject.globalVelocity;
	}
};