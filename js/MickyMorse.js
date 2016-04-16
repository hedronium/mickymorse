var MickyMorse = function (data) {
    // Initialize properties
    this.signals = new Array();         // Signals are just 0s and 1s...essentially binary version of the morse code
    this.fragments = new Array();       // Fragments are stacks of 0s and 1s...e.g. a fragment holding 10 zeros
    this.elements = new Array();        // Elements are just dots, dashes, IES, ICS, IWS
    this.xml = "";                      // XML data where elements are structured using characters and morse code elements
    this.morseChars = new Array();      // Array of morse codes each representing each item...maybe a space, just another a-z character or even html line break...check this.codeMap for entire list
    this.output = "";                   // Output is essentially the interpreted text version of morse code
    this.codeMap = {                    // Code Map is just the morse code -> text table
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

    // Read data (can be anything like colors representing 0s and 1s, sound, micromaves, etc...in this case, this function deals with color transitions red <> blue)
    this.interpretData = function (data) {
        for (count = 0; count < data.length; count++) {
            if (data[count] == true) {
                this.signals.push(true);
            } else if (data[count] == false) {
                // Log down zeros only if the signal's list is not empty
                if (this.signals.length >= 1) {
                    this.signals.push(false);
                }
            }
        }
    };

    // Process the logged signals and stack them up into fragments
    this.interpretSignals = function () {
        this.fragments = new Array();
        if (this.signals.length >= 1) {
            var on_buffer = 0;
            var off_buffer = 0;

            // Loop through signals
            for (x = 0; x < this.signals.length; x++) {
                if (this.signals[x] === true) {
                    on_buffer++;
                    if (off_buffer >= 1) {
                        this.fragments.push([0, off_buffer]);
                        off_buffer = 0;
                    }
                } else {
                    off_buffer++;
                    if (on_buffer >= 1) {
                        this.fragments.push([1, on_buffer]);
                        on_buffer = 0;
                    }
                }
            }

            // Log down fragments if there's anything left on the on/off buffer
            if (off_buffer >= 1 || on_buffer >= 1) {
                this.fragments.push((off_buffer >= 1) ? [0, off_buffer] : [1, on_buffer]);
            }
        }
    };

    // DOT, DASH, IES, ICS and IWS are all read as 'elements'. Do not get confused with Morse Code Elements.
    // Here, fragments are processed and interpreted into elements
    this.interpretFragments = function () {
        this.elements = new Array();
        if (this.fragments.length >= 1) {
            // Loop through fragments
            for (x = 0; x < this.fragments.length; x++) {
                if (this.fragments[x][0] === 1) { // ON fragment
                    if (this.fragments[x][1] >= 1 && this.fragments[x][1] <= 2) { // DOT
                        this.elements.push("DOT");
                    }else if (this.fragments[x][1] >= 3) { // DASH
                        this.elements.push("DASH");
                    }
                } else if (this.fragments[x][0] === 0) { // OFF fragment
                    if (this.fragments[x][1] >= 1 && this.fragments[x][1] <= 2) { // IES
                        this.elements.push("IES");
                    }else if (this.fragments[x][1] >= 3 && this.fragments[x][1] <= 6) { // ICS
                        this.elements.push("ICS");
                    }else if (this.fragments[x][1] >= 7) { // IWS
                        this.elements.push("IWS");
                    }
                }
            }
        }
    };

    // Process elements into XML...e.g. "<c><e>._</e><e>_...</e></c>"
    this.interpretElements = function () {
        this.xml = "";
        var character_buffer = "";
        var mc_element_buffer = ""; // Morse Code elements are basically just dots and dashes

        if (this.elements.length >= 1) {
            // Loop through elements
            for (x = 0; x < this.elements.length; x++) {
                if (this.elements[x] === "DOT" || this.elements[x] === "DASH") {
                    mc_element_buffer += this.elements[x];
                }else if (this.elements[x] === "IES") {
                    character_buffer += "<e>" + mc_element_buffer + "</e>";
                    mc_element_buffer = "";
                }else if (this.elements[x] === "ICS" || this.elements[x] === "IWS") {
                    if (mc_element_buffer !== "") {
                        character_buffer += "<e>" + mc_element_buffer + "</e>";
                    }
                    this.xml += "<c>" + character_buffer + "</c>";
                    mc_element_buffer = "";
                    character_buffer = "";

                    if (this.elements[x] === "IWS") {
                        this.xml += "|";
                    }
                }
            }

            if (mc_element_buffer !== "") {
                character_buffer += "<e>" + mc_element_buffer + "</e>";
            }

            if (character_buffer !== "") {
                this.xml += "<c>" + character_buffer + "</c>";
            }
        }
    };

    // Process XML and just make an ordinary array of morse code characters
    this.interpretXml = function () {
        this.morseChars = this.xml;
        this.morseChars = this.morseChars.replace(new RegExp(/<e>DOT<\/e>/g), ".")
            .replace(new RegExp(/<e>DASH<\/e>/g), "_")
            .replace(new RegExp(/<e>DOT<\/e>/g), ".")
            .replace(new RegExp(/<c>/g), "")
            .replace(new RegExp(/<\/c>/g), "\n")
            .replace(new RegExp(/\|/g), "\n");
        this.morseChars = this.morseChars.substr(0, this.morseChars.length-1)
            .split("\n");
    };

    // Process morse code characters into the stuff we wanna see :)
    this.interpretMorseChars = function () {
        this.output = "";
        if (this.morseChars.length >= 1) {
            for (x = 0; x < this.morseChars.length; x++) {
                if (this.morseChars[x] === "..._._") {
                    this.end();
                    break;
                }
                if (this.morseChars[x] === "") {
                    this.output += " ";
                    continue;
                }
                this.output += this.codeMap[this.morseChars[x]];
            }
        }
    };

    // End this badboy!
    this.end = function () {
        // WRITE CODE FOR HANDLING END OF TRANSMISSION HERE
    };

    this.feed = function () {
        this.interpretData(arguments[0]);
        return this;
    };

    this.poop = function () {
        this.interpretSignals();
        this.interpretFragments();
        this.interpretElements();
        this.interpretXml();
        this.interpretMorseChars();
        return this.output;
    };

    // Handle arguments
    if (arguments[0]) {
        this.feed(arguments[0]);
        return new String(this.poop());
    }
};