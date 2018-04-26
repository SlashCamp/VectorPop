var gameObject = gameObject || {};

gameObject.utils = {};

gameObject.utils.getColor = function(obj){
	var red = obj.red, grn = obj.green, blu = obj.blue, a;
	if (!obj.floor){obj.floor = 0;}
	if (!obj.a){a = 1;}else{a = obj.a;}
	if(obj.random){
		red = 0, grn = 0, blu = 0;
		red = Math.min(255, Math.floor(Math.random() * obj.red + obj.floor));
		grn = Math.min(255, Math.floor(Math.random() * obj.green + obj.floor));
		blu = Math.min(255, Math.floor(Math.random() * obj.blue + obj.floor));
	}
	return "rgba(" + red + "," + grn + ","  + blu + "," + a + ")";
};

gameObject.utils.getCookie = function(name){
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
};

// Converts from degrees to radians.
Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
};

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
	return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

gameObject.utils.sinSpin = function(){
	return Math.sin(Math.radians(gameObject.spinner));
};

gameObject.utils.collisionDetection = function(obj, target){
	if(gameObject.hit){return false;}
	var radObj = obj.size / 2;
	var radTar = target.size / 2;
	var dy = target.y - obj.y;
	var dx = target.x - obj.x;
	var d = Math.sqrt(dx * dx + dy * dy);
	if(radObj + radTar > d){
		return true;
	}else{
		return false;
	}
};

gameObject.utils.overheadDetection = function(obj, target){
	var radObj = obj.size / 2;
	var radTar = target.size / 2;
	var dx = Math.abs(target.x - obj.x);
	if(obj.y > target.y + (target.size / 2) && (radObj + radTar) > dx){
		return true;
	}else{
		return false;
	}
};

gameObject.utils.getX = function(x){
	if(x){return x;}else{return gameObject.deathX;}
};
gameObject.utils.getY = function(y){
	if(y){return y;}else{return gameObject.deathY;}
};
gameObject.utils.getV = function(h, d){
	if(!h){return Math.random() * 6 - 3;}else{return d;}
};

gameObject.utils.init = true;