/*
The js file for the test interface.

2022.09.27 created

2022.10.17 add global call
2022.10.25 add MathJax support
*/
import '../spacemath.css'
import {fmToPTX} from './parse.js'

"use strict";
let sourceTextArea = document.getElementById("sourceTextArea");
let echosourceTextArea = document.getElementById("echosourceTextArea");
//let mathmlTextArea = document.getElementById("mathmlTextArea");
//let pretextTextArea = document.getElementById("pretextTextArea");
//let speechTextArea = document.getElementById("speechTextArea");
//let mathJaxArea = document.getElementById("MathJaxArea");

//let translateTable = new TranslateTable();



if (sourceTextArea.addEventListener) {
    sourceTextArea.addEventListener('input', function() {

        const originaltext = sourceTextArea.value;

        let newtext = fmToPTX(originaltext);

        if(echosourceTextArea) {
            echosourceTextArea.innerText = newtext
        }
    }, false);
};

