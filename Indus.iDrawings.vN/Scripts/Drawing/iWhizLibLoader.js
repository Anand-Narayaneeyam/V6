var LibLoader = 
{
    tlib : null,
	loadLib : function (cb) {
		try
		{
		    var that = this;
			//var href = window.location.href.split('/');  
			//var path = "/" + href[3] + "/Scripts/Drawing/teigha-lib.js.mem"
			//var option = {
			//	urlMemFile: path,
			//	TOTAL_MEMORY: 20971520
			//};

		    if (!this.tlib) {
		        this.tlib = getTeighaLibInst();
		        if (cb && typeof (cb) == 'function')
		            this.tlib.addOnPostRun(function () {
		                cb(that.tlib);
		            });
		    }
		    else
		        cb(this.tlib);
		    
		    //return this.tlib;
		}
		catch(e)
		{
			setTimeout(function () {
			    that.loadLib(cb);
			}, 500);
		}
    }
};