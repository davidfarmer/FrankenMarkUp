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
//          {left:"<p>", right:"</p>", tag:"p"},  // for compatibility with PreTeXt!
          {left:"\\begin{equation}", right:"\\end{equation}", tag:"men"},
          {left:"$$", right:"$$", tag:"men"},
          {left:"\\[", right:"\\]", tag:"men"},
          {left:"<ol>", right:"</ol>", tag:"ol"},
          {left:"<ul>", right:"</ul>", tag:"ul"},
          {left:"\\begin{quote}", right:"\\end{quote}", tag:"blockquote"},
          {left:"<blockquote>", right:"</blockquote>", tag:"blockquote"},
];

const paragraph_peer_ptx_and_latex_text = [  // can only contain text and inline  markup
                                             // oops: what about lists and display math?
    "theorem", "proposition", "lemma", "corollary", "conjecture",
    "definition", "exploration", "exercise", 
    "hint", "answer", "solution", "aside",
    "principle", "claim", "remark", "note", "example", "proof"
];
const paragraph_peer_ptx_and_latex_other = [
    "figure", "li",
];

const display_math_tags = ["me", "md", "men", "mdn"];

// Note: no ">" in opening, because could have attributes,
// which are parsed later
paragraph_peer_ptx_and_latex_text.forEach( (el) => {
    paragraph_peer_delimiters.push(
        {left:"<" + el + "", right:"</" + el + ">", tag:el}
    );
    paragraph_peer_delimiters.push(
        {left:"\\begin{" + el + "}", right:"\\end{" + el + "}", tag:el}
    );
});
paragraph_peer_ptx_and_latex_other.forEach( (el) => {
    paragraph_peer_delimiters.push(
        {left:"<" + el + "", right:"</" + el + ">", tag:el}
    );
    paragraph_peer_delimiters.push(
        {left:"\\begin{" + el + "}", right:"\\end{" + el + "}", tag:el}
    );
});

let paragraph_peers = Array.from(paragraph_peer_delimiters, ({ tag }) => tag);
paragraph_peers = [...new Set(paragraph_peers)];   //remove duplicates

console.log("paragraph_peers", paragraph_peers);

let asymmetric_inline_delimiters = [
          {left:"\\(", right:"\\)", tag:"m"},
          {left:"|", right:"|", tag:"placeholder"}  // just for testing
];

// next is unused?
const tags_containing_paragraphs = ["text", "blockquote", "theorem", "definition", "exploration", "exercise", "proof", "lemma", "note", "hint"];

const tags_needing_statements = ["theorem", "definition", "exploration", "exercise", "lemma"];
const statement_peers = ["hint", "answer", "solution", "proof"];

const text_like_tags = [  // contain just text  (includes inline markup)
    "q", "em", "term", "alert", "li", // what if the content of an li is a p?
    "p", "text", "blockquote", "title"
];

const inline_ptx_tags = [  //meaning: don't add space around them
    "m", "c", "q", "em", "term", "alert"
];
// need to handle self-closing tags
// also -- for emdash, and abbreviations, i.e., e.g.

inline_ptx_tags.forEach( (el) => {
    asymmetric_inline_delimiters.push(
        {left:"<" + el + ">", right:"</" + el + ">", tag:el}
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

const alone_on_line_tags = ["p", "ol", "ul", "me", "men", "md", "mdn", "blockquote", "statement"];

// need to handle attributes on output tags
alone_on_line_tags.forEach( (el) => {
    outputtags[el] = { begin_tag: "<" + el + "", end_tag: "</" + el + ">",
    before_begin: "\n", after_begin: ">\n",
    before_end: "\n", after_end: "\n"}
    });
paragraph_peer_ptx_and_latex_text.forEach( (el) => {
    outputtags[el] = { begin_tag: "<" + el + "",
                       end_tag: "</" + el + ">",
    before_begin: "\n", after_begin: ">\n",
    before_end: "\n", after_end: "\n"}
    });
paragraph_peer_ptx_and_latex_other.forEach( (el) => {
    outputtags[el] = { begin_tag: "<" + el + "",
                       end_tag: "</" + el + ">",
    before_begin: "\n", after_begin: ">\n",
    before_end: "\n", after_end: "\n"}
    });

// some special cases
outputtags["ol"] = {begin_tag: "<p>\n<ol>", end_tag: "</ol>\n</p>",
         before_begin: "\n", after_begin: "\n",
         before_end: "\n", after_end: "\n"};
outputtags["ul"] = {begin_tag: "<p>\n<ul>", end_tag: "</ul>\n</p>",
         before_begin: "\n", after_begin: "\n",
         before_end: "\n", after_end: "\n"};

outputtags["men"] = {begin_tag: "<men", end_tag: "</men>",
         before_begin: "", after_begin: ">\n", // because probably source has the \n
         before_end: "\n", after_end: "\n"};


if (sourceTextArea.addEventListener) {
  sourceTextArea.addEventListener('input', function() {

      var tmpfirstsplit = splitTextAtDelimiters(sourceTextArea.value, paragraph_peer_delimiters);

      console.log("tmpfirstsplit",tmpfirstsplit);

      let tmpfirstsplitATT = extract_lists(tmpfirstsplit, "attributes", "all");
      let tmpfirstsplitTITLE = extract_lists(tmpfirstsplitATT, "title", "all");
      let tmpfirstsplitLABEL = extract_lists(tmpfirstsplitTITLE, "label", "all");

console.log("tmpfirstsplitLABEL", tmpfirstsplitLABEL);
//alert("labels");

      var tmp1firstsplitP = splitIntoParagraphs(tmpfirstsplitLABEL, "all", paragraph_peers);
 //     var tmp1firstsplitP = splitAtDelimiters(tmpfirstsplit, "makeparagraphs", ["text", "theorem", "blockquote"], "", ["text", "theorem", "blockquote"]);
//      var tmp1firstsplitP = splitAtDelimiters(tmpfirstsplit, "makeparagraphs", ["text"], "", ["text", "theorem", "blockquote"]);

      console.log("tmp1firstsplitP",tmp1firstsplitP);
      console.log("tmp1[2].content",tmp1firstsplitP[2].content);

// alert("first split P");

      var tmp1secondsplit = splitAtDelimiters(tmp1firstsplitP, paragraph_peer_delimiters, "all", "", paragraph_peers);
//      var tmp1secondsplit = splitAtDelimiters(tmp1firstsplitP, paragraph_peers);

      console.log("tmp1secondsplit",tmp1secondsplit);
      console.log("tmp1secondsplit expanded",JSON.stringify(tmp1secondsplit));

      let tmp1secondsplitATT = extract_lists(tmp1secondsplit, "attributes", "all");
      let tmp1secondsplitTITLE = extract_lists(tmp1secondsplitATT, "title", "all");
      let tmp1secondsplitLABEL = extract_lists(tmp1secondsplitTITLE, "label", "all");

      let tmp1secondsplitLI = extract_lists(tmp1secondsplitLABEL, "extract li", ["p"]);

      const tmp1secondsplitENV = extract_lists(tmp1secondsplitLI, "oneline environments", ["p"]);

 console.log("tmp1secondsplitENV", tmp1secondsplitENV);

//alert("look at oneline");
//  maybe need another process text step here?

// alert("second split");
//      var tmp1secondsplitP = splitAtDelimiters(tmp1secondsplit, "makeparagraphs", "all", "", tags_containing_paragraphs);
//      var tmp1secondsplitP = splitAtDelimiters(tmp1secondsplit, "makeparagraphs", tags_containing_paragraphs, "", tags_containing_paragraphs);
      var tmp1secondsplitP = splitIntoParagraphs(tmp1secondsplitENV, "all", paragraph_peers);

      console.log("tmp1secondsplitP",tmp1secondsplitP);
      console.log("tmp1secondsplitP[2].content",tmp1secondsplitP[2].content);

      const tmp2 = splitAtDelimiters(tmp1secondsplitP, asymmetric_inline_delimiters, "all", "", text_like_tags);

      console.log("tmp2:",tmp2);
      console.log("tmp2[1].content:",tmp2[1].content);
      console.log("tmp2[1].content as String:",JSON.stringify(tmp2[1].content));

console.log("    x  xxxxxx xxxx x x x x xx  x x x  x x x x x x  x x x x x  x");

      const tmp3 = splitAtDelimiters(tmp2, "spacelike", "all", "", text_like_tags);
      console.log("tmp3:",tmp3);
      console.log("tmp3[1].content:",tmp3[1].content);
      console.log("tmp3[1].content as String:",JSON.stringify(tmp3[1].content));


console.log("    X  XXXXXX XXXX X X X X XX  X X X  X X X X X X  X X X X X  x");
      const tmp4 = splitAtDelimiters(tmp3, asymmetric_inline_delimiters, "all", "", text_like_tags);

 //     const tmp4p = reassemblePreTeXt(tmp4);

//      console.log("tmp4p:",tmp4p);

      const tmp5x = extract_lists(tmp4, "fonts", text_like_tags);
      const tmp5y = extract_lists(tmp5x, "texlike", text_like_tags);
      const tmp5z = splitAtDelimiters(tmp5y, "spacelike", "all", "", text_like_tags);

//      const tmp5z = extract_lists(tmp5yy, "oneline environments", ["p"]);
      const tmp5w = extract_lists(tmp5z, "extract li", ["p"]);
      const tmp5v = extract_lists(tmp5w, "gather li", tags_containing_paragraphs);
      const tmp5u = extract_lists(tmp5v, "absorb math", tags_containing_paragraphs);
      const tmp5 = extract_lists(tmp5u, "statements", tags_needing_statements);

      console.log("tmp2 again",tmp2 );
      console.log("tmp4",tmp4 );
      console.log("tmp5",tmp5 );
      const tmp5p = reassemblePreTeXt(tmp5);
//      console.log("tmp5p",tmp5p);
//      console.log("t4mp2 3",JSON.stringify(tmp2) == JSON.stringify(tmp3));

      if(echosourceTextArea) {
          echosourceTextArea.innerText = tmp5p
      }
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
    "HO" : "Ő",
    "'u" : "ú",
    "`u" : "ù",
    '"u' : "ü",
    "^u" : "û",
    "'U" : "Ú",
    "`U" : "Ù",
    '"U' : "Ü",
    "^U" : "Û",
}
