//------------------------------------------------------------------
// Michaela Olausson HT 2016
//------------------------------------------------------------------
//
// Game Class
//
//------------------------------------------------------------------
function Game() {
	//------------------------------------------------------------------
	//
	// PUBLIC PROPERTIES
	//
	//------------------------------------------------------------------
	//------------------------------------------------------------------
	// ID. instance id. passed from Main.
	//------------------------------------------------------------------
	this.id = null;
	//------------------------------------------------------------------
	//
	// CLASS GLOBALS
	//
	//------------------------------------------------------------------
	//------------------------------------------------------------------
	// Buttons
	//------------------------------------------------------------------
	this.addDieBtn = null; 	// add one die
	this.removeDieBtn = null; 	// remove one die
	this.rollBtn = null; 	// roll all dice
	this.endBtn = null;		// end game
	//------------------------------------------------------------------
	// Div Elements
	//------------------------------------------------------------------
	this.body = null;
	this.bgDiv = null;
	this.menuDiv = null;
	this.toolDiv = null;
	this.diceDiv = null;
	this.sumDiv = null; // div containing dice sum.
	//------------------------------------------------------------------
	// Dice related variables
	//------------------------------------------------------------------
	this.diceArr = null; // list of active dice objects
	this.diceSum = 0; // sum of all dice values
	var obj = this; // reference to instance
	//------------------------------------------------------------------
	// Inits creation of the game interface
	//------------------------------------------------------------------
	this.init = function() {
		this.diceArr = [];
		this.body = document.getElementsByTagName("body")[0];
		this.createInterface();
		this.updateCounter(obj.diceSum);
	},
	//------------------------------------------------------------------
	// Creates game interface
	//------------------------------------------------------------------
	this.createInterface = function() {
	// background 
		this.bgDiv = NewElem.create("div", ("bgDiv" + this.id), "bgDiv");
		this.body.appendChild(this.bgDiv);
	// dice area 
		this.diceDiv = NewElem.create("div", "diceDiv","diceDiv");
		this.bgDiv.appendChild(this.diceDiv);
	// menu div
		this.menuDiv = NewElem.create("div", "menuDiv", "menuDiv");
		this.bgDiv.appendChild(this.menuDiv);
	// tool div
		this.toolDiv = NewElem.create("div", "toolDiv", "toolDiv");
		this.bgDiv.appendChild(this.toolDiv);
	// add one die
		this.addDieBtn = NewElem.create("img", "addDie", "menuBtn", "pics/dice/add.png", "add one die");
		this.toolDiv.appendChild(this.addDieBtn);
	// remove one die
		this.removeDieBtn = NewElem.create("img", "removeDie", "menuBtn", "pics/dice/remove.png", "remove one die");
		this.toolDiv.appendChild(this.removeDieBtn);
	// roll the dice
		this.rollBtn = NewElem.create("img", "rollBtn", "menuBtn", "pics/letsroll.png", "roll all dice");
		this.toolDiv.appendChild(this.rollBtn);
	// end obj button
		this.endBtn = NewElem.create("img", "endBtn", "endBtn", "pics/close.png", "close game");
		this.menuDiv.appendChild(this.endBtn);
	// sum element
		this.sumDiv = NewElem.create("div", "sumDiv");
		this.bgDiv.appendChild(this.sumDiv);
	// date objekt used for z-index
		var d = new Date();
		var zInd = Math.floor(d.getTime()/1000);
		this.bgDiv.style.zIndex = zInd;
		//------------------------------------------------------------------
		// Game listeners
		//------------------------------------------------------------------
		Events.addListener(obj.addDieBtn, "click", obj.addDie);
		Events.addListener(obj.removeDieBtn, "click", obj.removeDie);
		Events.addListener(obj.rollBtn, "click", obj.rerollAll);
		Events.addListener(obj.endBtn, "click", obj.destroyGame);
		Events.addListener(obj.endBtn, "click", function() { Main.destroyGame(obj.id); });
	},
	//------------------------------------------------------------------
	// add one die if total dice count is below 20
	//------------------------------------------------------------------
	this.addDie = function() {
		obj.playSound();
		// can only fit 20 dice in the diceDiv
		if (obj.diceArr.length != 20) {
			var die = new Die;
				obj.diceArr.push(die);
				die.init();
				obj.diceDiv.appendChild(die.dieImg);
				// functionality for reroll of single die.
				Events.addListener(die.dieImg, "click", function() {
					obj.updateSum();
					obj.playSound();
				});
			obj.updateSum();
		} 
	},
	//------------------------------------------------------------------
	// remove one die // object last of array
	//------------------------------------------------------------------
	this.removeDie = function() {
		obj.playSound();
		var lastDie;
		if (obj.diceArr.length > 0) {
			lastDie = obj.diceArr[obj.diceArr.length -1];
			obj.diceArr.pop();
			obj.diceDiv.removeChild(lastDie.dieImg);
			lastDie = null;
			obj.updateSum();
		}
	},
	//------------------------------------------------------------------
	// all dice gets a new value
	//------------------------------------------------------------------
	this.rerollAll = function() {
		obj.playSound();
		for (var i = 0; i < obj.diceArr.length; i++) {
			obj.diceArr[i].rollDie();
		}
		obj.updateSum();
	},
	//------------------------------------------------------------------
	// update the sum of all dice in the diceDiv
	//------------------------------------------------------------------
	this.updateSum = function() {
		this.diceSum = 0;
		for (var i = 0; i < obj.diceArr.length; i++) {
			obj.diceSum += obj.diceArr[i].dieValue;
		}
		//obj.sumDiv.innerHTML = obj.diceSum;
		obj.updateCounter(obj.diceSum);
	},
	//------------------------------------------------------------------
	// img size 42px x 62px
	//------------------------------------------------------------------
	this.updateCounter = function(sum) {
		var dig1, dig2, dig3; // img-elems
		var digElems; // array
		var digits; // when the sum is greater than 9 it will be split into indidual digits.
		var y = 69; // digit height
		digElems = [];
		
		if (dig1 == undefined) { 

			dig1 = NewElem.create("img", "dig1", "digit", "pics/sum-digits.png");
			dig2 = NewElem.create("img", "dig2", "digit", "pics/sum-digits.png");
			dig3 = NewElem.create("img", "dig3", "digit", "pics/sum-digits.png");
			digElems.push(dig1, dig2, dig3);

			for (var i = 0; i < digElems.length; i++) {
				obj.sumDiv.appendChild(digElems[i]);
			}
		}
	//------------------------------------------------------------------
	// change digits. 
	//------------------------------------------------------------------
		if (sum != 0) {
			
			digits = [];
			digits = sum.toString();
			digits = digits.split("");
	
			if (digits.length == 1) {
						dig3.style.top = ( -digits[0] * y ) + "px";
			}
			if (digits.length == 2) {
						dig2.style.top = ( -digits[0] * y ) + "px";
						dig3.style.top = ( -digits[1] * y ) + "px";	
			}
			if (digits.length == 3) {
						digElems[0].style.top = ( -digits[0] * y ) + "px";
						digElems[1].style.top = ( -digits[1] * y ) + "px";
						digElems[2].style.top = ( -digits[2] * y ) + "px";
			}
		}	
	},
	//------------------------------------------------------------------
	// 	play sound when menu button is pushed // may find different sounds for each
	//------------------------------------------------------------------
	this.playSound = function() {
		// last click wont sound
		if (obj.diceArr.length < 20) {

		var audio = NewElem.create("audio", "btnSound", "btnSound", "sound/add.wav");
			audio.autoplay = true;
			audio.volume = 0.1;
			obj.body.appendChild(audio);
		}
	},
	//------------------------------------------------------------------
	// empties DOM of the game interface, object is removed in Main.destroyGame
	//------------------------------------------------------------------
	this.destroyGame = function() {
		obj.body.removeChild(obj.bgDiv);	
	}
}
