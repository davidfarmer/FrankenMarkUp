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

const paragraph_peer_delimiters = [
          {left:"\\begin{equation}", right:"\\end{equation}", tag:"md"},
          {left:"$$", right:"$$", tag:"md"},
          {left:"\\[", right:"\\]", tag:"md"},
          {left:"<ol>", right:"</ol>", tag:"ol"},
          {left:"<ul>", right:"</ul>", tag:"ul"},
          {left:"<figure>", right:"</figure>", tag:"figure"},
          {left:"<blockquote>", right:"</blockquote>", tag:"blockquote"},
      ];

let paragraph_peers = Array.from(paragraph_peer_delimiters, ({ tag }) => tag);
paragraph_peers = [...new Set(paragraph_peers)];   //remove duplicates

console.log("paragraph_peers", paragraph_peers);

let asymmetric_inline_delimiters = [
          {left:"\\(", right:"\\)", tag:"m"},
          {left:"|", right:"|", tag:"placeholder"}  // just for testing
      ];

const  inline_ptx_tags = [  //meaning: don't add space around them
    "m", "c", "q", "em", "term", "alert"
    ];

inline_ptx_tags.forEach( (el) => {
    asymmetric_inline_delimiters.push(
        {left:"<" + el + ">", right:"</" + el + ">", tag:el},
    )
});

const spacelike_inline_delimiters = [
          {left:"\$", right:"\$", tag:"m"},
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

const outputtags = {  // start with the quirky ones
    "text" : do_nothing_markup,
    "placeholder" : do_nothing_markup,
    "title": {begin_tag: "<title>", end_tag: "</title>",
         before_begin: "\n", after_begin: "",
         before_end: "", after_end: "\n"},
    };

inline_ptx_tags.forEach( (el) => {
    outputtags[el] = { begin_tag: "<" + el + ">", end_tag: "</" + el + ">",
    before_begin: "", after_begin: "",
    before_end: "", after_end: ""}
    });

const alone_on_line_tags = ["p", "ol", "ul", "me", "men", "md", "mdn", "blockquote"];

alone_on_line_tags.forEach( (el) => {
    outputtags[el] = { begin_tag: "<" + el + ">", end_tag: "</" + el + ">",
    before_begin: "\n", after_begin: "\n",
    before_end: "\n", after_end: "\n"}
    });

if (sourceTextArea.addEventListener) {
  sourceTextArea.addEventListener('input', function() {

      var tmp = splitTextAtDelimiters(sourceTextArea.value, paragraph_peer_delimiters);

      console.log("tmp",tmp);

      var tmp1 = splitIntoParagraphs(tmp);

      console.log("tmp1",tmp1);
      console.log("tmp1[0].content",tmp1[0].content);

//      var tmp1p = reassemblePreTeXt(tmp1);
//
//      console.log("       XXXXXXXXXXXXXXXXXXXXXXXX    tmp1p",tmp1p);

      const tmp2 = splitAtDelimiters(tmp1, asymmetric_inline_delimiters, ['p', 'q', 'blockquote']);

      console.log("tmp2:",tmp2); 
      console.log("tmp2[0].content:",tmp2[0].content); 

console.log("    x  xxxxxx xxxx x x x x xx  x x x  x x x x x x  x x x x x  x");

      const tmp3 = splitAtDelimiters(tmp2, "currently unused", ['p','q',  'text', 'blockquote'],"spacelike");
      const tmp4 = splitAtDelimiters(tmp3, asymmetric_inline_delimiters, ['p', 'q', 'blockquote']);

      console.log("tmp2 again",tmp2); 
      console.log("tmp3:",tmp3); 

      const tmp4p = reassemblePreTeXt(tmp4);
      console.log("tmp4",tmp4);

      console.log("tmp4p:",tmp4p);

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
