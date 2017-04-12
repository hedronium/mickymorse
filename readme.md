## Micky Morse
Micky Morse is a binary -> morse code -> text interpreter.

Binary data is, by default, provided through a [color based transmitter](http://eng1003.eng.monash.edu/apps/morsetransmitter). However, it is possible (indeed MickyMorse is designed to) to read binary data from sound, radiowaves, etc.

Data which is in binary form is converted to morse code. The morse code is later interpreted and converted to text, e.g. "Hello World".

## Usage
###### Constructor

```javascript
var red = [255, 0, 0, 1]; // Color -> red -> 1
var blue = [0, 0, 255, 1]; // Color -> blue -> 0
var reader = MickyMorse(new MMData(red, blue, red, red, red)); // Returns 'a'
```

###### Feed and Poop

```javascript
var red = [255, 0, 0, 1]; // Color "red" which is equivalent to 1.
var blue = [0, 0, 255, 1]; // Color "blue" which is equivalent to 0.
var reader = MickyMorse();
reader.feed(new MMData(red))
	.feed(new MMData(blue, red, red, red)); // 'feed' injects data into the reader and can be chained as well
reader.poop(); // Returns 'a'
```

## MMData
MMData (Micky Morse Data) is an object representing the binary data. It is  passed onto Micky Morse Reader for interpretation.

It can take communicative methods like color, sound, radiowaves, etc and interprets them as binary.

###### Example

```javascript
var red = [255, 0, 0, 1]; // Color -> red -> 1
var blue = [0, 0, 255, 1]; // Color -> blue -> 0
new MMData(red, blue, red, red, red); // The constructor accepts unlimited arguments, each representing a piece of data.
```

## Morse Code Basics
Morse code is composed of dots and dashes. Sequence of dots and dashes make up characters. For example, 'a' is represened by a dot followed by a dash, "._".

Here's the __morse codes -> text__ map shipped by default:

```javascript
this.codeMap = {
    "._": "a",
    "_...": "b",
    "_._.": "c",
    "_..": "d",
    ".": "e",
    ".._.": "f",
    "__.": "g",
    "....": "h",
    "..": "i",
    ".___": "j",
    "_._": "k",
    "._..": "l",
    "__": "m",
    "_.": "n",
    "___": "o",
    ".__.": "p",
    "__._": "q",
    "._.": "r",
    "...": "s",
    "_": "t",
    ".._": "u",
    "..._": "v",
    ".__": "w",
    "_.._": "x",
    "_.__": "y",
    "__..": "z",
    "_____": "0",
    ".____": "1",
    ".____": "2",
    "...__": "3",
    "...._": "4",
    ".....": "5",
    "_....": "6",
    "__...": "7",
    "___..": "8",
    "____.": "9",
    "_.__.": "[",
    "_.__._": "]",
    "_.._.": "/",
    "..._.._": "$",
    ".____.": "'",
    "_.._.": "/",
    "._._.": "+",
    "___...": ":",
    "._._._": ".",
    "__..__": ",",
    "..__..": "?",
    "_...._": "-",
    ".__._.": "@",
    "_..._": "=",
    "..__._": "_",
    "_._.__": "!",
    "._._": "<br />",
    "_..._": "<br /><br />",
    "..._._": "end"
};
```