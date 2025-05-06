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

const PreTeXtDelimiterOf = function(delim) {
    return {left:"<" + delim + ">", right:"</" + delim + ">", tag:delim}
}
const PreTeXtDelimiterOfAttributes = function(delim) {
    return {left:"<" + delim + "", right:"</" + delim + ">", tag:delim}
}
const LaTeXDelimiterOf = function(delim) {
    return {left:"\\begin{" + delim + "}", right:"\\end{" + delim + "}", tag:delim}
}
const delimitersFromList = function(lis) {
    if (!Array.isArray(lis)) { return lis }
    let delim_lis = [];
    lis.forEach( (el) => {
        delim_lis.push( PreTeXtDelimiterOfAttributes(el) );
        delim_lis.push( LaTeXDelimiterOf(el) );
    });
    return delim_lis
}

const display_math_delimiters = [
//          {left:"<p>", right:"</p>", tag:"p"},  // for compatibility with PreTeXt!
          {left:"$$", right:"$$", tag:"men"},
          {left:"\\[", right:"\\]", tag:"men"},
]; 
remapped_math_tags.forEach( (el) => {
    display_math_delimiters.push(
        {left:"\\begin{" + el[0] + "}", right:"\\end{" + el[0] + "}", tag:el[1]}
    );
}); 
display_math_delimiters.push({left: "<md>", right: "</md>", tag: "md"});
display_math_delimiters.push({left: "<me>", right: "</me>", tag: "me"});
display_math_delimiters.push({left: "<mdn", right: "</mdn>", tag: "mdn"});
display_math_delimiters.push({left: "<men", right: "</men>", tag: "men"});

const paragraph_peer_delimiters = [];

// remapped_tags.forEach( (el) => {
//     paragraph_peer_delimiters.push(
//         {left:"\\begin{" + el[0] + "}", right:"\\end{" + el[0] + "}", tag:el[1]}
//     );
// });


let paragraph_peer_ptx_and_latex_text = [...level_1_p_peers_containing_p];
let paragraph_peer_ptx_and_latex_text_output = [...paragraph_peer_ptx_and_latex_text, ...list_like];
// plus some tags we don't expect people to type (go back and rethink this)
paragraph_peer_ptx_and_latex_text_output.push("p");
paragraph_peer_ptx_and_latex_text_output.push("statement");


// const paragraph_peer_ptx_and_latex_other = [
//     "figure"
// ];

// Note: no ">" in opening, because could have attributes,
// which are parsed later
paragraph_peer_ptx_and_latex_text.forEach( (el) => {
    paragraph_peer_delimiters.push( PreTeXtDelimiterOfAttributes(el) );
    paragraph_peer_delimiters.push( LaTeXDelimiterOf(el) );
});
other_level_1_p_peers.forEach( (el) => {
    paragraph_peer_delimiters.push( PreTeXtDelimiterOfAttributes(el) );
    paragraph_peer_delimiters.push( LaTeXDelimiterOf(el) );
});

let paragraph_peers = Array.from(paragraph_peer_delimiters, ({ tag }) => tag);
paragraph_peers = [...new Set(paragraph_peers)];   //remove duplicates

// console.log("paragraph_peers", paragraph_peers);

let asymmetric_inline_delimiters = [
          {left:"\\(", right:"\\)", tag:"m"},
//          {left:"|", right:"|", tag:"placeholder"}  // just for testing
];

// need to handle self-closing tags
// also -- for emdash, and abbreviations, i.e., e.g.

inlinetags.forEach( (el) => {
    asymmetric_inline_delimiters.push(  PreTeXtDelimiterOf(el) )
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

const debugging_output_markup = {begin_tag: "BT", end_tag: "ET",
         before_begin: "BB", after_begin: "AB",
         before_end: "BE", after_end: "AE"};

const outputtags = {  // start with the quirky ones
    "text" : do_nothing_markup,
    "placeholder" : do_nothing_markup,
    "title": {begin_tag: "<title>", end_tag: "</title>",
         before_begin: "\n", after_begin: "",
         before_end: "", after_end: "\n"},
    };

inlinetags.forEach( (el) => {
    outputtags[el] = { begin_tag: "<" + el + ">", end_tag: "</" + el + ">",
    before_begin: "", after_begin: "",
    before_end: "", after_end: ""}
    });

paragraph_peer_ptx_and_latex_text_output.forEach( (el) => {
    outputtags[el] = { begin_tag: "<" + el + "",
                       end_tag: "</" + el + ">",
    before_begin: "\n", after_begin: ">\n",
    before_end: "\n", after_end: "\n"}
    });
other_level_1_p_peers.forEach( (el) => {
    outputtags[el] = { begin_tag: "<" + el + "",
                       end_tag: "</" + el + ">",
    before_begin: "\n", after_begin: ">\n",
    before_end: "\n", after_end: "\n"}
    });
higher_level_tags.forEach( (el) => {
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

display_math_tags.forEach( (el) => {
    outputtags[el] = {begin_tag: "\n<" + el, end_tag: "</" + el + ">",
         before_begin: "", after_begin: ">\n", // because probably source has the \n
         before_end: "\n", after_end: "\n"};
});

outputtags["image"] = {begin_tag: "<img", end_tag: "</img>",  // img or image?  should not be a special case?
         before_begin: "", after_begin: ">\n", 
         before_end: "\n", after_end: "\n"};
outputtags["description"] = {begin_tag: "<description>", end_tag: "</description>",  // img or image?  should not be a special case?
         before_begin: "\n", after_begin: "", 
         before_end: "", after_end: "\n"};

if (sourceTextArea.addEventListener) {
  sourceTextArea.addEventListener('input', function() {

      const originaltext = sourceTextArea.value;

      let originaltextX = preprocessAliases(originaltext);

// console.log("originaltextX", originaltextX);
// console.log("display_math_delimiters", display_math_delimiters);

     // extract title, label, attributes of parent section (currently only title implemented)

      let document_title = "";
      if (originaltextX.match(/^\s*<title>/)) {
          document_title = originaltextX.replace(/^\s*<title>(.*?)<\/title>.*/s,"$1");
          originaltextX = originaltextX.replace(/^\s*<title>(.*?)<\/title>/,"");
      } else if (originaltextX.match(/^\s*\[/)) {
          document_title = originaltextX.replace(/^\s*\[([^\[\]]*)\].*/s,"$1");
          originaltextX = originaltextX.replace(/^\s*\[([^\[\]]*)\]/,"");
      }
   // put latex-style labels on a new line
      let originaltextA = originaltextX.replace(/([^\s])\\label({|\[|\()/g,"$1\n\\label$2");
   // have to preprovess blockquote because (of how we handle attributes) the starting > looks
   // like the end of an opening tag.
      let originaltextB = originaltextA.replace(/\n\n\s*>/g, "\n\n+++sTaRTbQ>");  // preprocess blockquote
      originaltextB = originaltextB.replace(/(\$\$|\\end{equation}|<\/men>|\\end{align}|\\\]) *\n([^\n])/g, "$1\n+++saMePaR$2");  // should take "equation" and "align" from a list

      // wrap everything in a section
      let tmp1together = {tag: "section", content: originaltextB}
      if (document_title) { tmp1together["title"] = document_title }


      let new1 = {...tmp1together};

      const firstdepth = 10;
      for (let depth = 0; depth < firstdepth; ++depth) {
          level.forEach( (lev) => {
              new1 = NEWsplitAtDelimiters(new1, lev, 0, depth)
              attribute_like.forEach( (attr) => { new1 = NEWextract_lists(new1, attr[0], 0, depth, attr[1]) } );
          } );
      }
// console.log("preprocessed text 2", new1);

      let new7 = {...new1}
      new7 = splitIntoParagraphs(new7, "all", paragraph_peers);
// console.log("processed text 7", new7);
//      alert("pause 2");
      let new8 = {...new7}
      new8 = NEWextract_lists(new8, "oneline environments", 0,0, "all");

      attribute_like.forEach( (attr) => { new8 = NEWextract_lists(new8, attr, 0, "unused") } );
  // next is maybe overkill, but things like statements contain p's
      new8 = splitIntoParagraphs(new8, "all", paragraph_peers);

      new8 = NEWextract_lists(new8, "blockquotes", 0,0,["p"]);  // meaning: Markdown style
//      new8 = NEWextract_lists(new8, "extraneous math",0,0, display_math_tags);

// console.log("processed text 8", new8);
//      alert("pause 2.1");

//      var tmp1firstsplitP = splitIntoParagraphs(tmpfirstsplitLABEL, "all", paragraph_peers);

//       console.log("tmp1firstsplitP",tmp1firstsplitP);

// alert("first split P");

//      var tmp1secondsplit = splitAtDelimiters(tmp1firstsplitP, paragraph_peer_delimiters, "all", "", paragraph_peers);

//       console.log("tmp1secondsplit",tmp1secondsplit);
//       console.log("tmp1secondsplit expanded",JSON.stringify(tmp1secondsplit));

//      let tmp1together = {tag: "section", content: tmp1secondsplit}
//      if (document_title) { tmp1together["title"] = document_title }



 let new9 = {...new8};

      // why do we extract lists before oneline environments?
      new9 = NEWextract_lists(new9, "extract li", 0,0, "new");
// console.log("tmp9", new9);
// alert("just did extract li");


//      var tmp1secondsplitP = splitIntoParagraphs(tmp1secondsplitENV, "all", paragraph_peers);
//
//  console.log("tmp1secondsplitP", tmp1secondsplitP);
//
//alert("pre");
////////////////////      var tmp1secondsplitPfig = extract_lists(tmp1secondsplitP, "substructure", objects_with_substructure);
//
////////////      var tmp1secondsplitPfigclean = extract_lists(tmp1finalsplit, "clean up substructure", objects_with_substructure);

 //      console.log("tmp1secondsplitPfig",tmp1secondsplitPfigclean);

//       console.log("tmp1finalsplit",tmp1secondsplitPfigclean);
//alert("tmp1secondsplitPfig");

      const tmp2 = NEWsplitAtDelimiters(new9, asymmetric_inline_delimiters, 0,10, "all", tags_containing_text);
//  console.log("tmp2", tmp2);
//  alert("just did asymmetric_inline_delimiters");

//       console.log("tmp2:",tmp2);

// console.log("    x  xxxxxx xxxx x x x x xx  x x x  x x x x x x  x x x x x  x");

      const tmp3 = NEWsplitAtDelimiters(tmp2, "spacelike", 0,10, "all", tags_containing_text);
//       console.log("tmp3:",tmp3);
//  console.log("tmp3", tmp3);
//  alert("just did spacelike");


// console.log("    X  XXXXXX XXXX X X X X XX  X X X  X X X X X X  X X X X X  x");

      //have to do this twice, because of nesting
      const tmp4x = NEWsplitAtDelimiters(tmp3, asymmetric_inline_delimiters,0,10, "all", tags_containing_text);
      const tmp4 = NEWsplitAtDelimiters(tmp4x, asymmetric_inline_delimiters, 0,10,"all", tags_containing_text);

 //     const tmp4p = reassemblePreTeXt(tmp4);

//      console.log("tmp4p:",tmp4p);

      const tmp5x = NEWextract_lists(tmp4, "fonts", 0,0,tags_containing_text);
      const tmp5y = NEWextract_lists(tmp5x, "texlike", 0,0,tags_containing_text);
// console.log("                      AAAAAAAAAA tmp5y", tmp5y);
      let tmp5z = NEWsplitAtDelimiters(tmp5y, "spacelike", 0,10, "all", tags_containing_text);
      tmp5z = NEWsplitAtDelimiters(tmp5z, asymmetric_inline_delimiters,0,10, "all", tags_containing_text);
// console.log("tmp5z", tmp5z);
// alert("just re-did asymmetric_inline_delimiters");
      tmp5z = NEWsplitAtDelimiters(tmp5z, asymmetric_inline_delimiters, 0,10,"all", tags_containing_text);
// console.log("tmp5z", tmp5z);
// alert("just re-re-did asymmetric_inline_delimiters");

      const tmp5t = tmp5z;
      const tmp5w = NEWextract_lists(tmp5t, "extract li",0,0, ["p"]);
      const tmp5v = NEWextract_lists(tmp5w, "gather li",0,0, tags_containing_paragraphs);
//  console.log("tmp5v", tmp5v);
//  alert("tmp5v");
      const tmp5u = NEWextract_lists(tmp5v, "absorb math",0,0, tags_containing_paragraphs);
// console.log("tmp5u", tmp5u);
//  alert("tmp5u");
      let tmp5 = NEWextract_lists(tmp5u, "statements",0,0, tags_needing_statements);
// console.log("tmp5u == tmp5", JSON.stringify(tmp5u) == JSON.stringify(tmp5));

//       console.log("tmp2 again",tmp2 );
//       console.log("tmp4",tmp4 );
      console.log("tmp5",tmp5 );
      const tmp5p = reassemblePreTeXt(tmp5);

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

