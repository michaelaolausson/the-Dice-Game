//------------------------------------------------------------------
// Michaela Olausson HT 2016
//------------------------------------------------------------------
//------------------------------------------------------------------
//
// DragAndDrop Class
// 
//------------------------------------------------------------------
function DragAndDrop(object, movingElem) {
	//------------------------------------------------------------------
	// Class globals
	//------------------------------------------------------------------
	this.movingElem = movingElem;
	this.posInElem = {};
	//------------------------------------------------------------------
	// reference to self - the object
	//------------------------------------------------------------------
	var obj = this;
	//------------------------------------------------------------------
	// inits drag and drop functionality. 
	//------------------------------------------------------------------
	this.dragInit = function(event) { 
		var mousePos;
			obj.movingElem.style.cursor = "move"; 
			mousePos = {
				x: event.clientX,
				y: event.clientY
			}
			obj.posInElem = {
				x: mousePos.x - obj.movingElem.offsetLeft,
				y: mousePos.y - obj.movingElem.offsetTop
			};
			Events.removeListener(obj.movingElem, "mousedown", obj.dragInit);
			Events.addListener(window, "mousemove", obj.dragAround);
	},
	//------------------------------------------------------------------
	// Element is now draggable
	//------------------------------------------------------------------
	this.dragAround = function(event) {
		var offset;
		Events.addListener(window, "mouseup", obj.dragStop);
		if (event.button == 0) { 
			movingElem.style.cursor = "move"; 
			offset = {
				x: event.clientX - obj.posInElem.x,
				y: event.clientY - obj.posInElem.y
			};
			//------------------------------------------------------------------
			// Keeps element from being dragged outside the browser window (top, left). 
			//------------------------------------------------------------------
			if (offset.x > 0)  {
				movingElem.style.left = offset.x + "px";
			}
			if (offset.y > 0) {
				movingElem.style.top = offset.y + "px";
			}
			else {
				Events.removeListener(window, "mousemove", obj.dragAround);
			}
		}
		else {
			obj.dragStop();
		}
	},
	//------------------------------------------------------------------
	// Removes draggable functionality.
	//------------------------------------------------------------------
	this.dragStop = function() {
			movingElem.style.cursor = "auto"; 
			Events.removeListener(window, "mousemove", obj.dragAround);
	}
}