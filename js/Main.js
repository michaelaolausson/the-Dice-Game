//------------------------------------------------------------------
// Michaela Olausson HT 2016
//------------------------------------------------------------------
//  
//	Main Static 
//  
//------------------------------------------------------------------
var Main = {
	id: 0,
	gameArr: [],
	body: null,
	newGameBtn: null, 
	soundBtn: null,
	clockBtn: null,
	seal: null,
	talkBubble: null,
	soundtrack: null,
	//------------------------------------------------------------------
	//  Inits Main. Adds listeners and sets interval for image animation.
	//------------------------------------------------------------------
	init: function(){
		var interval; // interval for image animation
		Main.initBackground();
		// Listeners
		Events.addListener(Main.newGameBtn, "click", Main.openNewGame);
		Events.addListener(Main.soundBtn, "click", Main.ctrlSound);
		Events.addListener(Main.seal, "click", Main.tickleSeal);
		Events.addListener(Main.clockBtn, "click", Main.showClock);
		// Animation 
		interval = Math.floor((Math.random() * 10) * 1000);
		setInterval(Main.imgAnimation, interval);
	}, 
	//------------------------------------------------------------------
	//  Creates background for webbsite. 
	//  Uses class NewElem to shorten amount of code needed to be written for each new element.
	//------------------------------------------------------------------
	initBackground: function(){
		var startDiv;
		var sealContainer;
	
			Main.body = document.getElementsByTagName("body")[0];
			//------------------------------------------------------------------
			//  Header
			//------------------------------------------------------------------
			startDiv = NewElem.create("div", "startDiv");
			Main.body.appendChild(startDiv);

			Main.logo = NewElem.create("img", "logo", "logo", "pics/logo2.png", "roll the dice");
			startDiv.appendChild(Main.logo);
			//------------------------------------------------------------------
			//  Seal
			//------------------------------------------------------------------
			sealContainer = NewElem.create("div","sealContainer");
			Main.body.appendChild(sealContainer);

			Main.ice = NewElem.create("img", "ice", "ice", "pics/seal/ice.png", "ice");
			sealContainer.appendChild(Main.ice);

			Main.seal = NewElem.create("img", "seal", "seal", "pics/seal/1.png", "cute seal");
			sealContainer.appendChild(Main.seal);

			Main.talkBubble = NewElem.create("img", "talkBubble", "talkBubble", "pics/bubbles/1.png", "talk bubble");
			sealContainer.appendChild(Main.talkBubble);
			//------------------------------------------------------------------
			// Lower Toolbar
			//------------------------------------------------------------------
			Main.lowerToolbar = NewElem.create("div", "lowerToolbar");
			Main.body.appendChild(Main.lowerToolbar);

			Main.newGameBtn = NewElem.create("img", "newGameBtn", "newGameBtn", "pics/playinv.png", "start new game");
			Main.lowerToolbar.appendChild(Main.newGameBtn);

			Main.clockBtn = NewElem.create("img", "clockBtn", "clockBtn", "pics/clock.png", "show time");
			Main.lowerToolbar.appendChild(Main.clockBtn);

			Main.soundBtn = NewElem.create("img", "soundBtn", "soundBtn", "pics/sound.png", "control sound");
			Main.lowerToolbar.appendChild(Main.soundBtn);

			Main.soundtrack = NewElem.create("audio", "soundtrack", "soundCtrl", "sound/Rolemusic_-_05_-_She_Is_My_Best_Treasure.mp3");
			Main.soundtrack.loop = true;
			Main.soundtrack.autoplay = true;
			Main.soundtrack.volume = 0.1;
			
			Main.body.appendChild(Main.soundtrack);
	},
	//------------------------------------------------------------------
	//  creates new instance of Game. 
	//  adds listeners to buttons inside the game instance. 
	//------------------------------------------------------------------
	openNewGame: function(){
			var newGame = new Game;
			Main.id++;
			newGame.id = Main.id;
			newGame.init();
			Main.gameArr.push(newGame);
			var dnd = new DragAndDrop(newGame, newGame.bgDiv);
			var changeZI = new ChangeZIndex(newGame.bgDiv);

			Events.addListener(newGame.menuDiv, "mousedown", dnd.dragInit);
			Events.addListener(newGame.menuDiv, "mousedown", function() {
				changeZI.setZI();
			});
			
	},
	//------------------------------------------------------------------
	//  Generates random index in array. Used for image animation.
	//------------------------------------------------------------------
	randomArrIndex: function(array){
		var	i = Math.floor(Math.random() * array.length);
		return i;
	},
	//------------------------------------------------------------------
	//  Picks random img of seal. Creates animated effect.
	//------------------------------------------------------------------
	imgAnimation: function() {
		var sealArray = ["pics/seal/1.png", "pics/seal/2.png", "pics/seal/3.png", "pics/seal/4.png", "pics/seal/5.png", "pics/seal/6.png"];
		var bubbleArray = ["pics/bubbles/3.png", "pics/bubbles/4.png", "pics/bubbles/5.png", "pics/bubbles/6.png"];	
		var	sealUrl;
		var bubbleUrl;
		var i = Main.randomArrIndex(sealArray);
		var	j = Main.randomArrIndex(bubbleArray);
		var	sealUrl = sealArray[i];
		var bubbleUrl = bubbleArray[j];
		Main.seal.src = sealUrl;
		Main.talkBubble.src = bubbleUrl;
	},
	//------------------------------------------------------------------
	//  change talkBubble - specific Url
	//------------------------------------------------------------------
	tickleSeal: function() {
		Main.talkBubble.src = "pics/bubbles/2.png";
		var imgTimer = setInterval(Main.bubbleAnimation, 2000);
	},
	//------------------------------------------------------------------
	//  Control of sound. Background music. Connected to the soundBtn.
	//------------------------------------------------------------------
	ctrlSound: function() {
	
		if (Main.soundtrack.muted == true) {
			Main.soundtrack.muted = false;
			Main.soundBtn.src = "pics/sound.png"
		}
		else {
			Main.soundtrack.muted = true;
			Main.soundBtn.src = "pics/nosound.png";
		}
	},
	//------------------------------------------------------------------
	//  creates new instance of Clock. 
	//------------------------------------------------------------------
	showClock: function() {
		var clock = new Clock;
			clock.init();
		Events.removeListener(Main.clockBtn, "click", Main.showClock);
		Main.body.appendChild(clock.clockDiv);
		var dnd = new DragAndDrop(clock, clock.clockDiv);
		var changeZI = new ChangeZIndex(clock.clockDiv);
		// Listeners
		Events.addListener(clock.menuDiv, "mousedown", dnd.dragInit);
		Events.addListener(clock.menuDiv, "mousedown", function() {
				changeZI.setZI();
			});
		Events.addListener(clock.closeClockBtn, "click", function() {
			Main.destroyClock(clock);
		});
	},
	//------------------------------------------------------------------
	//  Destroy clock. Removing it from the DOM and emptying object.
	//------------------------------------------------------------------
	destroyClock: function(clock) {
		Main.body.removeChild(clock.clockDiv);
		clock = null;
		Events.addListener(Main.clockBtn, "click", Main.showClock);
	},
	//------------------------------------------------------------------
	//  Destroying game. Removing it from gameArr and emptying object.
	//------------------------------------------------------------------
	destroyGame: function(id) {
		for (var i = 0; i < Main.gameArr.length; i++) {
			if (id == Main.gameArr[i].id) {
				var gameToDel = Main.gameArr.splice(i,1);
				gameToDel = null;
				break;
			}
		}
	},
};
Events.addListener(window, "load", Main.init);