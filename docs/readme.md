##Micky Morse
Micky Morse is a binary -> morse code -> text interpreter.
Data is provided through a color based transmitter by default but can be made to read data from sound, radiowaves, etc.

Data represents binary which is converted to morse code in the process and then finally text.

##Usage
######Constructor

```
var red = [255, 0, 0, 1]; // Color -> red -> 1
var blue = [0, 0, 255, 1]; // Color -> blue -> 0
var reader = MickyMorse(new MMData(red, blue, red, red, red)); // Returns 'a'
```

######Feed and Poop

```
var red = [255, 0, 0, 1]; // Color -> red -> 1
var blue = [0, 0, 255, 1]; // Color -> blue -> 0
var reader = MickyMorse();
reader.feed(new MMData(red));
	.feed(new MMData(blue, red, red, red)); // 'feed' injects data into the reader and can be chained as well
reader.poop(); // Returns 'a'
```

##MMData
MMData is an object holding the 'Micky Morse Data' which is usually passed onto Micky Morse Reader.

It basically represents 0s 1s.

######Example

```
var red = [255, 0, 0, 1]; // Color -> red -> 1
var blue = [0, 0, 255, 1]; // Color -> blue -> 0
new MMData(red, blue, red, red, red); // The constructor accepts unlimited arguments, each representing piece of data
```

##Morse Code Basics
Morse code is composed of dots and dashes. Sequence of dots and dashes make up characters. For example, 'a' is represened by a dot followed by a dash, "._".

Here's the __morse codes -> text__ map shipped by default:

```
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