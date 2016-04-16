var MickyMorseTransmitter = function (reader) {
	this.reader = reader;
	this.red = [255, 0, 0, 1];
	this.blue = [0, 0, 255, 1];

	this.end = function () {
		this.dot();
		this.ies();
		this.dot();
		this.ies();
		this.dot();
		this.ies();
		this.dash();
		this.ies();
		this.dot();
		this.ies();
		this.dash();
		this.ics();
	};

	this.dot = function () {
		reader.feed(new MMData(this.red));
	};

	this.dash = function () {
		reader.feed(new MMData(this.red, this.red, this.red));
	};

	this.ies = function () {
		reader.feed(new MMData(this.blue));
	};

	this.ics = function () {
		reader.feed(new MMData(this.blue, this.blue, this.blue));
	};

	this.iws = function () {
		reader.feed(new MMData(this.blue, this.blue, this.blue, this.blue, this.blue, this.blue, this.blue));
	};

	this.char = function (char) {
		var morse_code = reader.codeMap.getKeyByValue(char);
		for (x = 0; x < morse_code.length; x++) {
			if (morse_code.substr(x, 1) === ".") {
				this.dot();
			}else if (morse_code.substr(x, 1) === "_") {
				this.dash();
			}
			if (x !== (morse_code.length - 1)) {
				this.ies();
			}
		}
		this.ics();
	};
}