var MMData = function () {
	data = new Array();
	if (arguments) {
		for (z = 0; z < arguments.length; z++) {
			var rd_tally, bl_tally, red;
	        rd_tally = 0;
	        bl_tally = 0;

	        // check if color is red or blue
	        for (var i = 0; i < arguments[z].length; i += 4) {
	            if (arguments[z][i] <= 255 && arguments[z][i] > 127 && arguments[z][i + 2] < 127) {
	                rd_tally++; // red
	            } else if (arguments[z][i + 2] <= 255 && arguments[z][i + 2] > 127 && arguments[z][i] < 127) {
	                bl_tally++; // blue
	            }
	        }

	        if (rd_tally > bl_tally) {
	            data.push(true);
	        } else if (bl_tally > rd_tally) {
	            data.push(false);
	        }
		}
	}
	return data;
}