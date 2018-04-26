var gameObject = gameObject || {};

gameObject.audio = {};

gameObject.audio.volumeM = 0.8;
gameObject.audio.volumeS = 0.8;
gameObject.audio.ready = 0;
// window.AudioContext = window.AudioContext||window.webkitAudioContext;
// gameObject.audio.context = new AudioContext();

gameObject.audio.track_1 = new Howl({
	src: ['sound/track_1.mp3'],
	autoplay: false,
	loop: true,
	volume: gameObject.audio.volumeM,
	onload: function() {
		gameObject.audio.ready++;
		gameObject.audio.init();

	}
});

gameObject.audio.track_2 = new Howl({
	src: ['sound/track_2.mp3'],
	autoplay: false,
	loop: true,
	volume: 0,
	onload: function() {
		gameObject.audio.ready++;
		gameObject.audio.init();
	}
});

gameObject.audio.track_3 = new Howl({
	src: ['sound/track_3.mp3'],
	autoplay: false,
	loop: true,
	volume: 0,
	onload: function() {
		gameObject.audio.ready++;
		gameObject.audio.init();
	}
});

gameObject.audio.track_4 = new Howl({
	src: ['sound/track_4.mp3'],
	autoplay: false,
	loop: true,
	volume: 0,
	onload: function() {
		gameObject.audio.ready++;
		gameObject.audio.init();
	}
});

gameObject.audio.track_5 = new Howl({
	src: ['sound/track_5.mp3'],
	autoplay: false,
	loop: true,
	volume: 0,
	onload: function() {
		gameObject.audio.ready++;
		gameObject.audio.init();
	}
});

gameObject.audio.track_6 = new Howl({
	src: ['sound/track_6.mp3'],
	autoplay: false,
	loop: true,
	volume: 0,
	onload: function() {
		gameObject.audio.ready++;
		gameObject.audio.init();
	}
});

gameObject.audio.track_7 = new Howl({
	src: ['sound/track_7.mp3'],
	autoplay: false,
	loop: true,
	volume: 0,
	onload: function() {
		gameObject.audio.ready++;
		gameObject.audio.init();
	}
});

gameObject.audio.track_8 = new Howl({
	src: ['sound/track_8.mp3'],
	autoplay: false,
	loop: true,
	volume: 0,
	onload: function() {
		gameObject.audio.ready++;
		gameObject.audio.init();
	}
});

gameObject.audio.track_9 = new Howl({
	src: ['sound/track_9.mp3'],
	autoplay: false,
	loop: true,
	volume: 0,
	onload: function() {
		gameObject.audio.ready++;
		gameObject.audio.init();
	}
});

gameObject.audio.arp = new Howl({
	src: ['sound/arp.mp3'],
	autoplay: false,
	loop: false,
	volume: gameObject.volumeS,
});

gameObject.audio.chord = new Howl({
	src: ['sound/chord.mp3'],
	autoplay: false,
	loop: false,
	volume: gameObject.volumeS,
});

gameObject.audio.high = new Howl({
	src: ['sound/high.mp3'],
	autoplay: false,
	loop: false,
	volume: gameObject.volumeS,
});

gameObject.audio.low = new Howl({
	src: ['sound/low.mp3'],
	autoplay: false,
	loop: false,
	volume: gameObject.volumeS,
});

gameObject.audio.perc = new Howl({
	src: ['sound/perc.mp3'],
	autoplay: false,
	loop: false,
	volume: gameObject.volumeS,
});

gameObject.audio.rep = new Howl({
	src: ['sound/rep.mp3'],
	autoplay: false,
	loop: false,
	volume: gameObject.volumeS,
});

gameObject.audio.shoot = new Howl({
	src: ['sound/shoot.mp3'],
	autoplay: false,
	loop: false,
	volume: gameObject.volumeS,
});

gameObject.audio.jump = new Howl({
	src: ['sound/jump.mp3'],
	autoplay: false,
	loop: false,
	volume: gameObject.volumeS,
});

gameObject.audio.dash = new Howl({
	src: ['sound/dash.mp3'],
	autoplay: false,
	loop: false,
	volume: gameObject.volumeS,
});


gameObject.audio.init =  function(){
	if (gameObject.audio.ready < 9) {return;}
	gameObject.audio.track_1.play();
	gameObject.audio.track_2.play();
	gameObject.audio.track_3.play();
	gameObject.audio.track_4.play();
	gameObject.audio.track_5.play();
	gameObject.audio.track_6.play();
	gameObject.audio.track_7.play();
	gameObject.audio.track_8.play();
	gameObject.audio.track_9.play();
};

gameObject.audio.soundHandler = function(){
	if(gameObject.hit){return;}
	if(gameObject.score > 50 && !gameObject.audio.track_2_on){
		gameObject.audio.track_2.fade(gameObject.audio.track_2.volume(), gameObject.audio.volumeM, 1000);
		gameObject.audio.track_2_on = true;
	}
	if(gameObject.score > 1000 && !gameObject.audio.track_3_on){
		gameObject.audio.track_3.fade(gameObject.audio.track_3.volume(), gameObject.audio.volumeM, 500);
		gameObject.audio.track_3_on = true;
	}
	if(gameObject.score > 2000 && !gameObject.audio.track_4_on){
		gameObject.audio.track_4.fade(gameObject.audio.track_4.volume(), gameObject.audio.volumeM, 500);
		gameObject.audio.track_4_on = true;
	}
	if(gameObject.score > 3000 && !gameObject.audio.track_5_on){
		gameObject.audio.track_5.fade(gameObject.audio.track_5.volume(), gameObject.audio.volumeM, 500);
		gameObject.audio.track_5_on = true;
	}
	if(gameObject.score > 4000 && !gameObject.audio.track_6_on){
		gameObject.audio.track_6.fade(gameObject.audio.track_6.volume(), gameObject.audio.volumeM, 500);
		gameObject.audio.track_6_on = true;
	}
	if(gameObject.score > 5000 && !gameObject.audio.track_7_on){
		gameObject.audio.track_7.fade(gameObject.audio.track_7.volume(), gameObject.audio.volumeM, 500);
		gameObject.audio.track_7_on = true;
	}
	if(gameObject.score > 6000 && !gameObject.audio.track_8_on){
		gameObject.audio.track_8.fade(gameObject.audio.track_8.volume(), gameObject.audio.volumeM, 500);
		gameObject.audio.track_8_on = true;
	}
	if(gameObject.score > 7000 && !gameObject.audio.track_9_on){
		gameObject.audio.track_9.fade(gameObject.audio.track_9.volume(), gameObject.audio.volumeM, 500);
		gameObject.audio.track_9_on = true;
	}
};

gameObject.audio.endLevel = function(){
	if(!gameObject.audio.endLevelTriggered){
		gameObject.audio.endLevelTriggered = true;
		gameObject.audio.track_2.fade(gameObject.audio.track_2.volume(), 0, 10000);
		gameObject.audio.track_3.fade(gameObject.audio.track_3.volume(), 0, 1000);
		gameObject.audio.track_4.fade(gameObject.audio.track_4.volume(), 0, 1000);
		gameObject.audio.track_5.fade(gameObject.audio.track_5.volume(), 0, 1000);
		gameObject.audio.track_6.fade(gameObject.audio.track_6.volume(), 0, 1000);
		gameObject.audio.track_7.fade(gameObject.audio.track_7.volume(), 0, 1000);
		gameObject.audio.track_8.fade(gameObject.audio.track_8.volume(), 0, 1000);
		gameObject.audio.track_9.fade(gameObject.audio.track_9.volume(), 0, 1000);

		gameObject.audio.track_2_on = false;
		gameObject.audio.track_3_on = false;
		gameObject.audio.track_4_on = false;
		gameObject.audio.track_5_on = false;
		gameObject.audio.track_6_on = false;
		gameObject.audio.track_7_on = false;
		gameObject.audio.track_8_on = false;
		gameObject.audio.track_9_on = false;
	}
};
/*
"track_1.mp3"
"track_2.mp3"
"track_3.mp3"
"track_4.mp3"
"track_5.mp3"
"track_6.mp3"
"track_7.mp3"
"track_8.mp3"
"track_9.mp3"*/