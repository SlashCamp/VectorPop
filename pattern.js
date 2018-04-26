var gameObject = gameObject || {};

gameObject.pattern = {};
gameObject.pattern.cnt = 0;
gameObject.pattern.inc = 0;

gameObject.pattern.handler = function(arr){
	if(arr.length == 0){return;}
	arr[0].pattern(arr[0].limit, arr[0].delay, arr);
};

gameObject.pattern.limitCheck = function(limit, delay, list){
	if (gameObject.pattern.cnt > delay + limit){
		list.shift();
		gameObject.pattern.cnt = 0;
		gameObject.pattern.inc = 0;
		return;
	}
};

gameObject.pattern.reset = function(){
	gameObject.pattern.cnt = 0;
	gameObject.pattern.list1 = [
		{pattern: gameObject.pattern.randomShower, limit:300, delay: 300},
		{pattern: gameObject.pattern.cross, limit:105, delay: 60},
		{pattern: gameObject.pattern.leftRightSpray, limit:105, delay: 0},
		{pattern: gameObject.pattern.rightLeftSpray, limit:105, delay: 120},
		{pattern: gameObject.pattern.rightLeftCascade, limit:105, delay: 0},
		{pattern: gameObject.pattern.leftRightCascade, limit:105, delay: 240},
		{pattern: gameObject.pattern.cross, limit:105, delay: 60},
		{pattern: gameObject.pattern.leftRightSpray, limit:105, delay: 0},
		{pattern: gameObject.pattern.rightLeftSpray, limit:105, delay: 120},
	];

	gameObject.pattern.list2 = [
		{pattern: gameObject.pattern.randomShower, limit:100, delay: 0},
		{pattern: gameObject.pattern.advBoomerShower, limit:200, delay: 30},
		{pattern: gameObject.pattern.cross, limit:105, delay: 60},
		{pattern: gameObject.pattern.advStalkerSpawn, limit:60, delay: 0},
		{pattern: gameObject.pattern.rightLeftCascade, limit:105, delay: 0},
		{pattern: gameObject.pattern.leftRightCascade, limit:105, delay: 0},
		{pattern: gameObject.pattern.advStalkerSpawn, limit:80, delay: 0},
		{pattern: gameObject.pattern.rightLeftSpray, limit:105, delay: 0},
		{pattern: gameObject.pattern.advStalkerSpawn, limit:40, delay: 0},
		{pattern: gameObject.pattern.rightLeftCascade, limit:105, delay: 0},
	];

	gameObject.pattern.list3 = [
		{pattern: gameObject.pattern.rightLeftSpray, limit:180, delay: 0},
		{pattern: gameObject.pattern.leftRightSpray, limit:180, delay: 60},
		{pattern: gameObject.pattern.advBoomerShower, limit:200, delay: 90},
		{pattern: gameObject.pattern.rightLeftCascade, limit:80, delay: 60},
		{pattern: gameObject.pattern.advStalkerSpawn, limit:30, delay: 0},
		{pattern: gameObject.pattern.leftRightCascade, limit:105, delay: 0},
		{pattern: gameObject.pattern.advStalkerSpawn, limit:50, delay: 60},
		{pattern: gameObject.pattern.rightLeftSpray, limit:105, delay: 30},
		{pattern: gameObject.pattern.advStalkerSpawn, limit:50, delay: 0},
		{pattern: gameObject.pattern.leftRightSpray, limit:105, delay: 60},
		{pattern: gameObject.pattern.advStalkerSpawn, limit:50, delay: 120},
		{pattern: gameObject.pattern.advBoomerShower, limit:200, delay: 30},
		{pattern: gameObject.pattern.cross, limit:150, delay: 0},
	];

	gameObject.pattern.list4 = [
		{pattern: gameObject.pattern.cross, limit:250, delay: 0},
		{pattern: gameObject.pattern.advDasherSpawn, limit:70, delay: 180},
		{pattern: gameObject.pattern.rightLeftSpray, limit:180, delay: 0},
		{pattern: gameObject.pattern.leftRightSpray, limit:180, delay: 60},
		{pattern: gameObject.pattern.advStalkerSpawn, limit:61, delay: 0},
		{pattern: gameObject.pattern.advBoomerCascadeLR, limit:100, delay: 0},
		{pattern: gameObject.pattern.advBoomerCascadeRL, limit:100, delay: 0},
		{pattern: gameObject.pattern.advStalkerSpawn, limit:61, delay: 0},
		{pattern: gameObject.pattern.advDasherSpawn, limit:101, delay: 180},
		{pattern: gameObject.pattern.rightLeftSpray, limit:105, delay: 30},
		{pattern: gameObject.pattern.leftRightSpray, limit:105, delay: 60},
		{pattern: gameObject.pattern.cross, limit:250, delay: 0},

	];


	gameObject.pattern.dev = [
		{pattern: gameObject.pattern.infShower, limit:100, delay: 0},
	];
};

gameObject.pattern.testPattern = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 5 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.dummy({x:gameObject.pattern.cnt.map(0, limit, 10, gameObject.width - 10), y:1, vx:0, vy:5}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

gameObject.pattern.leftRightCascade = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 5 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.dummy({x:gameObject.pattern.cnt.map(0, limit, 10, gameObject.width - 10), y:1, vx:0, vy:5}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

gameObject.pattern.rightLeftCascade = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 5 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.dummy({x:gameObject.pattern.cnt.map(0, limit, gameObject.width - 10, 10), y:1, vx:0, vy:5}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

gameObject.pattern.leftRightSpray = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 8 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.dummy({x:gameObject.width / 2, y:1, vx:gameObject.pattern.cnt.map(0, limit, -6, 6), vy:5}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

gameObject.pattern.rightLeftSpray = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 8 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.dummy({x:gameObject.width / 2, y:1, vx:gameObject.pattern.cnt.map(0, limit, 6, -6), vy:5}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

gameObject.pattern.cross = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 10 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.dummy({x:gameObject.pattern.cnt.map(0, limit, 10, gameObject.width - 10), y:1, vx:0, vy:5}));
		gameObject.dummies.push(new gameObject.npc.dummy({x:gameObject.pattern.cnt.map(0, limit, gameObject.width - 10, 10), y:1, vx:0, vy:5}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

gameObject.pattern.randomShower = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 10 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.dummy({x:Math.random() * gameObject.width, y:1, vx:0, vy:5}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

gameObject.pattern.infShower = function(limit, delay, list){
	if(gameObject.pattern.cnt == 0){
		list.push({pattern: gameObject.pattern.infShower, limit:100, delay: 0});
	}
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 10 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.dummy({x:Math.random() * gameObject.width, y:1, vx:0, vy:5}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

//Pyramids are stupid and this game is better off without them.


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
A D V A N C E D   P A T T E R N S
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

gameObject.pattern.advBoomerShower = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 14 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.boomer({x:100 + (Math.random() * (gameObject.width-200)), y:1, vx:0, vy:3}));
	}
	if(gameObject.pattern.cnt % 7 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.dummy({x:100 + (Math.random() * (gameObject.width-200)), y:1, vx:0, vy:4}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};


gameObject.pattern.advStalkerSpawn = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 20 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.stalker({x:gameObject.width / 2, y:1}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

gameObject.pattern.advDasherSpawn = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 20 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.dasher({x:gameObject.width / 2, y:1}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

gameObject.pattern.advBoomerCascadeLR = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 25 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.boomer({x:gameObject.pattern.cnt.map(0, limit, 10, gameObject.width - 10), y:1, vx:0, vy:3}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};

gameObject.pattern.advBoomerCascadeRL = function(limit, delay, list){
	gameObject.pattern.cnt++;
	if(gameObject.pattern.cnt % 25 == 0 && gameObject.pattern.cnt < limit){
		gameObject.dummies.push(new gameObject.npc.boomer({x:gameObject.pattern.cnt.map(0, limit, gameObject.width - 10, 10), y:1, vx:0, vy:3}));
	}
	gameObject.pattern.limitCheck(limit, delay, list);
};