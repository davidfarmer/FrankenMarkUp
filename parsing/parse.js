/*
The js file for the test interface.

2022.09.27 created

2022.10.17 add global call
2022.10.25 add MathJax support
*/

"use strict";
let sourceTextArea = document.getElementById("sourceTextArea");
let echosourceTextArea = document.getElementById("echosourceTextArea");
let mathmlTextArea = document.getElementById("mathmlTextArea");
let pretextTextArea = document.getElementById("pretextTextArea");
let speechTextArea = document.getElementById("speechTextArea");
let mathJaxArea = document.getElementById("MathJaxArea");

// let translateTable = new TranslateTable();

/*
var dictionary;    
fetch("dictionary.json").then(
        function(u){ return u.json();}
      ).then(
        function(json){
          dictionary = json;
        }
      )
      */

var theSpaceMathInML;

var thisEnvironment = "";  // bad idea, not used

const paragraph_peer_delimiters = [
          {left:"\\begin{equation}", right:"\\end{equation}", tag:"md"},
          {left:"$$", right:"$$", tag:"md"},
          {left:"<figure>", right:"</figure>", tag:"figure"},
          {left:"<blockquote>", right:"</blockquote>", tag:"blockquote"},
      ];

let paragraph_peers = Array.from(paragraph_peer_delimiters, ({ tag }) => tag);
paragraph_peers = [...new Set(paragraph_peers)];   //remove duplicates

console.log("paragraph_peers", paragraph_peers);

const ordinary_inline_delimiters = [
          {left:"<q>", right:"</q>", tag:"q"},
          {left:"|", right:"|", tag:"placeholder"},
      ];

const more_ordinary_inline_delimiters = [
          {left:"\\(", right:"\\)", tag:"m"},
          {left:"<q>", right:"</q>", tag:"q"},
          {left:"|", right:"|", tag:"placeholder"},
      ];

const spacey_inline_delimiters = [
          {left:"$", right:"$", tag:"m"},
          {left:"_", right:"_", tag:"term"},
          {left:"`", right:"`", tag:"c"},
          {left:"'", right:"'", tag:"q"},
          {left:'"', right:'"', tag:"q"},
          {left:"*", right:"*", tag:"em"},
          {left:"**", right:"**", tag:"alert"},
      ];

const do_nothing_markup = {begin_tag: "", end_tag: "",
         before_begin: "", after_begin: "",
         before_end: "", after_end: ""};

const outputtags = {
    "p": {begin_tag: "<p>", end_tag: "</p>",
         before_begin: "\n", after_begin: "\n",
         before_end: "\n", after_end: "\n"},
    "text" : do_nothing_markup,
    "placeholder" : do_nothing_markup,
    "m": {begin_tag: "<m>", end_tag: "</m>",
         before_begin: "", after_begin: "",
         before_end: "", after_end: ""},
    "md": {begin_tag: "<md>", end_tag: "</md>",
         before_begin: "\n", after_begin: "\n",
         before_end: "\n", after_end: "\n"},
    "blockquote": {begin_tag: "<blockquote>", end_tag: "</blockquote>",
         before_begin: "\n", after_begin: "\n",
         before_end: "\n", after_end: "\n"},
    "q": {begin_tag: "<q>", end_tag: "</q>",
         before_begin: "", after_begin: "",
         before_end: "", after_end: ""},
    };

const strip_surrounding_lines = ["p", "blockquote", "md", "m"];

const inline_tags = ["m", "q", "em", "term", "alert"];

if (sourceTextArea.addEventListener) {
  sourceTextArea.addEventListener('input', function() {
/*
*/

      var tmp = splitTextAtDelimiters(sourceTextArea.value, paragraph_peer_delimiters);

      console.log("tmp",tmp);

      var tmp1 = splitIntoParagraphs(tmp);

      console.log("tmp1",tmp1);

      var tmp1p = reassemblePreTeXt(tmp1);

      console.log("tmp1p",tmp1p);

      const tmp2 = splitAtDelimiters(tmp1, more_ordinary_inline_delimiters, ['p', 'q', 'blockquote']);

      console.log("tmp2:",tmp2); 

console.log("    x  xxxxxx xxxx x x x x xx  x x x  x x x x x x  x x x x x  x");

      const tmp3 = splitAtDelimiters(tmp2, more_ordinary_inline_delimiters, ['p', 'q', 'blockquote']);

      console.log("tmp2 again",tmp2); 
      console.log("tmp3:",tmp3); 
      console.log(tmp3 == tmp2); 

      const tmp3p = reassemblePreTeXt(tmp3);
      console.log("tmp3 again:",tmp3);

      console.log("tmp3p:",tmp3p);

/*
      const tmp2 = tmp.map(node => {

        if (node.tag === 'text') {

          var thiscontentparsed = splitAtDelimiters(node.content,  ordinary_inline_delimiters);
          console.log("thiscontentparsed", thiscontentparsed);

          if (thiscontentparsed.length > 1) { 
            console.log("found sub-content");
            return { ...node, content: splitAtDelimiters(node.content,  ordinary_inline_delimiters)};
          } else {
            return node;
         }

        } else {
          return node;
        }

       });
*/

/*
      if(echosourceTextArea) {
          echosourceTextArea.value = convert(sourceTextArea.value, "LaTeX");
      }

      if(speechTextArea) {
          speechTextArea.innerHTML = '" ' + convert(sourceTextArea.value, "Speech") + ' "';
      }

      if(mathmlTextArea ||  mathmlDisplayArea) {
          theSpaceMathInML = convert(sourceTextArea.value, "MathML");

          if(mathmlTextArea) { mathmlTextArea.value = theSpaceMathInML }
          if(mathmlDisplayArea) { mathmlDisplayArea.innerHTML = theSpaceMathInML }
      }
*/

/*
      mathJaxArea.innerHTML = convert(echosourceTextArea.value, "LaTeX2MathJax");
      MathJax.Hub.Queue(["Typeset",MathJax.Hub,"MathJaxArea"]);
*/
  }, false);
}
/* is this part ever used? */
/*
 else if (sourceTextArea.attachEvent) {
  error
  sourceTextArea.attachEvent('onpropertychange', function() {
      echosourceTextArea.value = convert(sourceTextArea.value, "LaTeX");
      mathmlTextArea.value = convert(sourceTextArea.value, "LaTeX");
      speechTextArea.value = '"' + convert(sourceTextArea.value, "LaTeX") + '"';
      pretextTextArea.value = convert(sourceTextArea.value, "LaTeX");
      mathJaxArea.innerHTML = convert(echosourceTextArea.value, "LaTeX2MathJax");
      MathJax.Hub.Queue(["Typeset",MathJax.Hub,"MathJaxArea"]);
  });
}
*/
