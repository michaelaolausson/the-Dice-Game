//------------------------------------------------------------------
// Michaela Olausson HT 2016
//------------------------------------------------------------------
//
// Clock Class
//
//------------------------------------------------------------------
function Clock() {
	//------------------------------------------------------------------
	//
	// PUBLIC
	//
	//------------------------------------------------------------------
	this.clockDiv = null;
	this.menuDiv = null;
	this.closeClockBtn = null;
	//------------------------------------------------------------------
	//
	// CLASS GLOBALS
	//
	//------------------------------------------------------------------
	this.timeElem = null;
	this.digitRoot = null;
	this.clockDigits = null; // array of imgElems
	var obj = this;
	//------------------------------------------------------------------
	// init instance of clock. 
	//------------------------------------------------------------------
	this.init = function() {
		obj.digitRoot = "pics/clock_digits";
		this.createInterface();
	},
	//------------------------------------------------------------------
	// create DOM-elements for clock interface
	//------------------------------------------------------------------
	this.createInterface = function() {
		var dig1, dig2, dig3, dig4, dig5, dig6;
		var b1, b2;
		obj.clockDigits = [];
	//------------------------------------------------------------------
	// interface elements
	//------------------------------------------------------------------
		obj.clockDiv = NewElem.create("div", "clockDiv");
		obj.menuDiv = NewElem.create("div", "clockMenu", "menuDiv");
		obj.closeClockBtn = NewElem.create("img", "closeClockBtn", "closeClock", "pics/closeclock.png", "close clock");
		obj.timeElem = NewElem.create("span", "timeElem");
		obj.clockDiv.appendChild(obj.menuDiv);
		obj.menuDiv.appendChild(obj.closeClockBtn);
		obj.clockDiv.appendChild(obj.timeElem);
	//------------------------------------------------------------------
	// elements for digits
	//------------------------------------------------------------------
		dig1 = NewElem.create("img", "clockDig1", "clockDigit", "pics/clock_digits/clock-digits.png");
		dig2 = NewElem.create("img", "clockDig2", "clockDigit", "pics/clock_digits/clock-digits.png");
		dig3 = NewElem.create("img", "clockDig3", "clockDigit", "pics/clock_digits/clock-digits.png");
		dig4 = NewElem.create("img", "clockDig4", "clockDigit", "pics/clock_digits/clock-digits.png");
		dig5 = NewElem.create("img", "clockDig5", "clockDigit", "pics/clock_digits/clock-digits.png");
		dig6 = NewElem.create("img", "clockDig6", "clockDigit", "pics/clock_digits/clock-digits.png");
		b1 = NewElem.create("img", "b1", "clockDigit", "pics/clock_digits/between.png");
		b2 = NewElem.create("img", "b2", "clockDigit", "pics/clock_digits/between.png");

		obj.clockDigits.push(dig1, dig2, b1, dig3, dig4, b2, dig5, dig6);
	//------------------------------------------------------------------
	// place digits in time elem - exact position is controlled by css
	//------------------------------------------------------------------
		for (var i = 0; i < obj.clockDigits.length; i++) {
			obj.timeElem.appendChild(obj.clockDigits[i]);
		}
		setInterval(obj.updateTime, 500);
	},
	//------------------------------------------------------------------
	// get hours, minutes and seconds from Date object. 
	//------------------------------------------------------------------
	this.updateTime = function() {
		var d = new Date();
		var h = obj.addZero(d.getHours());
		var m = obj.addZero(d.getMinutes());
		var s = obj.addZero(d.getSeconds());

		obj.changeDigit(h, 0, 1);
		obj.changeDigit(m, 3, 4);
		obj.changeDigit(s, 6, 7);

	},
	//------------------------------------------------------------------
	// change digits
	//------------------------------------------------------------------
	this.changeDigit = function(t, i1, i2) {
		t = t.toString();
		t = t.split("");
		obj.clockDigits[i1].style.top = (-t[0] * 60) + "px";
		obj.clockDigits[i2].style.top = (-t[1]* 60) + "px";
	},
	//------------------------------------------------------------------
	//  adds a zero so time always is two digit. ex. 9 turns into 09. 
	//------------------------------------------------------------------
	this.addZero = function(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	} 
}