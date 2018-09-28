//------------------------------------------------------------------
// Michaela Olausson HT 2016
//------------------------------------------------------------------
//------------------------------------------------------------------
// Changing z-index
//------------------------------------------------------------------
function ChangeZIndex(object) {
    this.elem = object;
    this.setZI = function(){
        var d = new Date();
        var zI = Math.floor(d.getTime()/1000);
        this.elem.style.zIndex = zI;    
	}
}
