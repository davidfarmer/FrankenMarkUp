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

const text_like_tags = [  // contain just text
    "q", "em", "term", "alert",
    "p", "text", "blockquote", "title"
];

const inline_ptx_tags = [  //meaning: don't add space around them
    "m", "c", "q", "em", "term", "alert"
];

inline_ptx_tags.forEach( (el) => {
    asymmetric_inline_delimiters.push(
        {left:"<" + el + ">", right:"</" + el + ">", tag:el},
    )
});

/* current;y not used.  See recastSpacedDelimiters
const spacelike_inline_delimiters = [
          {left:"\$", right:"\$", tag:"m"},
          {left:"_", right:"_", tag:"term"},
          {left:"`", right:"`", tag:"c"},
          {left:"'", right:"'", tag:"q"},
          {left:'"', right:'"', tag:"q"},
          {left:"*", right:"*", tag:"em"},
          {left:"**", right:"**", tag:"alert"},
      ];
*/

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

      const tmp2 = splitAtDelimiters(tmp1, asymmetric_inline_delimiters, ['p', 'q', 'blockquote', 'text']);

      console.log("tmp2:",tmp2); 
      console.log("tmp2[1].content:",tmp2[1].content); 
      console.log("tmp2[1].content as String:",JSON.stringify(tmp2[1].content)); 

console.log("    x  xxxxxx xxxx x x x x xx  x x x  x x x x x x  x x x x x  x");

      const tmp3 = splitAtDelimiters(tmp2, "currently unused", ['p','q',  'text', 'blockquote'],"spacelike");
      console.log("tmp3:",tmp3);
      console.log("tmp3[1].content:",tmp3[1].content);
      console.log("tmp3[1].content as String:",JSON.stringify(tmp3[1].content));


console.log("    X  XXXXXX XXXX X X X X XX  X X X  X X X X X X  X X X X X  x");
      const tmp4 = splitAtDelimiters(tmp3, asymmetric_inline_delimiters, ['p', 'q', 'blockquote']);

      console.log("tmp2 again",tmp2); 
      console.log("tmp3:",tmp3); 

      const tmp4p = reassemblePreTeXt(tmp4);

//      console.log("tmp4p:",tmp4p);

      const tmp5 = extract_lists(tmp4, "fonts");
      console.log("tmp4 == tmp5", JSON.stringify(tmp4) == JSON.stringify(tmp5), "   ", JSON.stringify(tmp4) == JSON.stringify(tmp));

      console.log("tmp2 again",tmp2 );
      console.log("tmp4",tmp4 );
      console.log("tmp5",tmp5 );
      const tmp5p = reassemblePreTeXt(tmp5);
      console.log("tmp5p",tmp5p);
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


// move to a data file

const toUnicode = {
    "'a" : "á",
    "`a" : "à",
    '"a' : "ä",
    "^a" : "â",
    "~a" : "ã",
    "-a" : "ā",
    "'A" : "Á",
    "`A" : "À",
    '"A' : "Ä",
    "^A" : "Â",
    "~A" : "Ã",
    "cc" : "ç",
    "cC" : "Ç",
    "'e" : "é",
    "`e" : "è",
    '"e' : "ë",
    "^e" : "ê",
    "-e" : "ē",
    "'E" : "É",
    "`E" : "È",
    '"E' : "Ë",
    "^E" : "Ê",
    "-E" : "Ē",
    "-g" : "ḡ",
    "ug" : "ğ",
    "vg" : "ǧ",
    "-G" : "Ḡ",
    "uG" : "Ğ",
    "vG" : "Ǧ",
    "'i" : "í",
    "`i" : "ì",
    '"i' : "ï",
    "^i" : "î",
    "-i" : "ī",
    "'I" : "Í",
    "`I" : "Ì",
    '"I' : "Ï",
    "^I" : "Î",
    "-I" : "Ī",
    "~n" : "ñ",
    "~N" : "Ñ",
    "'o" : "ó",
    "`o" : "ò",
    '"o' : "ö",
    "^o" : "ô",
    "-o" : "ō",
    "~o" : "õ",
    "Ho" : "ő",
    "'O" : "Ó",
    "`O" : "Ò",
    '"O' : "Ö",
    "^O" : "Ô",
    "-O" : "Ō",
    "~O" : "Õ",
    "HO" : "ő",
    "'u" : "ú",
    "`u" : "ù",
    '"u' : "ü",
    "^u" : "û",
    "'U" : "Ú",
    "`U" : "Ù",
    '"U' : "Ü",
    "^U" : "Û",
}
