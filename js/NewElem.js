//------------------------------------------------------------------
// Michaela Olausson HT 2016
//------------------------------------------------------------------
//  
//	NewElem Static Class
//  
//------------------------------------------------------------------
var NewElem = {
	//------------------------------------------------------------------
	// create new element. return new element,
	//------------------------------------------------------------------
	create: function(elem, id, className, src, alt) {
		var newElem = document.createElement(elem);
	// possible improvement. if arg.length < 1 add id. and so on.
			newElem.id = id;
			newElem.className = className || null;
			newElem.src = src || null; 
			newElem.alt = alt || null;
		return newElem;
	},
	//------------------------------------------------------------------
	// remove element from DOM
	//------------------------------------------------------------------
	destroy: function(parent, child) {
		parent.removeChild(child);
	} 
}