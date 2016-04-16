var red = [255, 0, 0, 1];
var blue = [0, 0, 255, 1];

console.log("Testing data interpreter");
var reader = new MickyMorse();
reader.interpretData(new MMData(blue, blue, blue, blue, blue));
console.log((reader.signals.length === 0) === true);
reader.interpretData(new MMData(red));
console.log(reader.signals.equals([true]) === true);
reader.interpretData(new MMData(blue, blue, blue, red));
console.log(reader.signals.equals([true, false, false, false, true]) === true);

console.log("Testing signals interpreter");
var reader = new MickyMorse();
reader.signals = [true, true, false, false, true, true, true];
reader.interpretSignals();
console.log(reader.fragments.equals([[1, 2], [0, 2], [1, 3]]) === true);

console.log("Testing fragments interpreter");
var reader = new MickyMorse();
reader.fragments = [[1, 1], [0, 1], [1, 3], [0, 3], [1, 3], [0, 1], [1, 1], [0, 1], [1, 1], [0, 1], [1, 1]];
reader.interpretFragments();
console.log(reader.elements.equals(["DOT", "IES", "DASH", "ICS", "DASH", "IES", "DOT", "IES", "DOT", "IES", "DOT"]) === true);

console.log("Testing elements interpreter");
var reader = new MickyMorse();
reader.elements = ["DOT", "IES", "DASH", "ICS", "DASH", "IES", "DOT", "IES", "DOT", "IES", "DOT"];
reader.interpretElements();
console.log(reader.xml === "<c><e>DOT</e><e>DASH</e></c><c><e>DASH</e><e>DOT</e><e>DOT</e><e>DOT</e></c>");

console.log("Testing XML interpreter");
var reader = new MickyMorse();
reader.xml = "<c><e>DOT</e><e>DASH</e></c><c><e>DASH</e><e>DOT</e><e>DOT</e><e>DOT</e></c>";
reader.interpretXml();
console.log((reader.morseChars.equals(['._', '_...'])) === true);

console.log("Testing Morse Character interpreter");
var reader = new MickyMorse();
reader.morseChars = ['._', '_...'];
reader.interpretMorseChars();
console.log((reader.output === "ab") === true);

// Test that any morse character after the end character is ignored
var reader = new MickyMorse();
reader.morseChars = ['._', '_...', '_._.', '..._._', '._._._'];
reader.interpretMorseChars();
console.log((reader.output === "abc") === true);

console.log("Testing the feed and poop methods");
var reader = new MickyMorse();
var transmitter = new MickyMorseTransmitter(reader);
transmitter.char('a');
console.log((reader.poop() === "a") === true);

var reader = new MickyMorse();
var transmitter = new MickyMorseTransmitter(reader);
transmitter.char('b');
transmitter.char('r');
transmitter.char('e');
transmitter.char('n');
transmitter.char('d');
transmitter.char('o');
transmitter.char('n');
transmitter.iws();
transmitter.char('m');
transmitter.char('c');
transmitter.char('b');
transmitter.char('a');
transmitter.char('i');
transmitter.char('n');
transmitter.end();
transmitter.char('f');
transmitter.char('u');
transmitter.char('c');
transmitter.char('k');
console.log((reader.poop() === "brendon mcbain") === true);

console.log("Test that feed can be chained");
var reader = new MickyMorse();
reader.feed(new MMData(blue))
	.feed(new MMData(red))
	.feed(new MMData(blue))
	.feed(new MMData(red))
	.feed(new MMData(red))
	.feed(new MMData(red))
	.feed(new MMData(blue))
	.feed(new MMData(blue))
	.feed(new MMData(blue));
console.log((reader.poop() === "a") === true);

console.log("Testing that alternative ways work");
var reader = new MickyMorse(new MMData(red, blue, red, red, red));
console.log((reader == "a") === true);
