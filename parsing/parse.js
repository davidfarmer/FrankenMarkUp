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

const paragraph_peer_delimiters = [
//          {left:"<p>", right:"</p>", tag:"p"},  // for compatibility with PreTeXt!
          {left:"$$", right:"$$", tag:"men"},
          {left:"\\[", right:"\\]", tag:"men"},
];
remapped_tags.forEach( (el) => {
    paragraph_peer_delimiters.push(
        {left:"\\begin{" + el[0] + "}", right:"\\end{" + el[0] + "}", tag:el[1]}
    );
});


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

/*
const alone_on_line_tags = ["p", "ol", "ul", "me", "men", "md", "mdn", "blockquote", "statement"];

// need to handle attributes on output tags
alone_on_line_tags.forEach( (el) => {
    outputtags[el] = { begin_tag: "<" + el + "", end_tag: "</" + el + ">",
    before_begin: "\n", after_begin: ">\n",
    before_end: "\n", after_end: "\n"}
    });
*/
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

outputtags["men"] = {begin_tag: "<men", end_tag: "</men>",
         before_begin: "", after_begin: ">\n", // because probably source has the \n
         before_end: "\n", after_end: "\n"};

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

console.log("originaltextX", originaltextX);
alert("aliases")
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
      originaltextB = originaltextB.replace(/(\$\$|\\end{equation}|\\end{align}|\\\]) *\n([^\n])/g, "$1\n+++saMePaR$2");  // should take "equation" and "align" from a list

      // wrap everything in a section
      let tmp1together = {tag: "section", content: originaltextB}
      if (document_title) { tmp1together["title"] = document_title }


      let new1 = NEWsplitAtDelimiters(tmp1together, level[0], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[1], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[2], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[3], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[4], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[5], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[6], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[7], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[8], 0, 0);
console.log("did level[8]");
console.log(new1);
      new1 = NEWsplitAtDelimiters(new1, level[9], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[10], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[11], 0, 0);
      new1 = NEWsplitAtDelimiters(new1, level[12], 0, 0);
 console.log("preprocessed text", new1);

      let new2 = NEWsplitAtDelimiters(new1, level[0], 0, 1); 

 console.log("processed text 2", new2);
//      alert("pause 1.5");
      attribute_like.forEach( (attr) => { new2 = NEWextract_lists(new2, attr, 0, 0) } );
 console.log("re processed text 2", new2);
//      alert("pause 1.6");

      for (let i=1; i<=13; ++i) {
          new2 = NEWsplitAtDelimiters(new2, level[i], 0, 1);
      }
 console.log("preprocessed text 2", new2);
 //     alert("pause 2");

      let new3 = NEWsplitAtDelimiters(new2, level[0], 0, 2);
      new3 = NEWsplitAtDelimiters(new3, level[1], 0, 2);
      new3 = NEWsplitAtDelimiters(new3, level[2], 0, 2);
console.log("new3", {...new3});
 //     alert("pause 2.5");
      new3 = NEWsplitAtDelimiters(new3, level[3], 0, 2);
console.log("new3", {...new3});
  //    alert("pause 2.6");
      for (let i=3; i<=13; ++i) {
          new3 = NEWsplitAtDelimiters(new3, level[i], 0, 2);
      }
      attribute_like.forEach( (attr) => { new3 = NEWextract_lists(new3, attr, 0, 2) } );

console.log("new3", {...new3});
 //     alert("pause 3");

      let new4 = {...new3};

      level.forEach( (lev) => { new4 = NEWsplitAtDelimiters(new4, lev, 0, 3) } );

      attribute_like.forEach( (attr) => { new4 = NEWextract_lists(new4, attr, 0, 3) } );
 console.log("processed text 4", new4);
 //     alert("pause 4");

      let new5 = {...new4};
      
      level.forEach( (lev) => { new5 = NEWsplitAtDelimiters(new5, lev, 0, 4) } );
      attribute_like.forEach( (attr) => { new5 = NEWextract_lists(new5, attr, 0, 4) } );
 
 console.log("processed text 5", new5);
  //    alert("pause 5");

      let new6 = {...new5};

      level.forEach( (lev) => { new6 = NEWsplitAtDelimiters(new6, lev, 0, 5) } );
      attribute_like.forEach( (attr) => { new6 = NEWextract_lists(new6, attr, 0, 5) } );

 console.log("processed text 6", new6);
 //     alert("pause 6");

      let new7 = {...new6};

      level.forEach( (lev) => { new7 = NEWsplitAtDelimiters(new7, lev, 0, 6) } );
      attribute_like.forEach( (attr) => { new7 = NEWextract_lists(new7, attr, 0, 6) } );
      level.forEach( (lev) => { new7 = NEWsplitAtDelimiters(new7, lev, 0, 7) } );
      attribute_like.forEach( (attr) => { new7 = NEWextract_lists(new7, attr, 0, 7) } );

 console.log("processed text 7", new7);
  //    alert("pause 7");

      level.forEach( (lev) => { new7 = NEWsplitAtDelimiters(new7, lev, 0, 8) } );
      attribute_like.forEach( (attr) => { new7 = NEWextract_lists(new7, attr, 0, 8) } );

 console.log("processed text 7", new7);
 //     alert("pause 8");

      level.forEach( (lev) => { new7 = NEWsplitAtDelimiters(new7, lev, 0, 8) } );
      attribute_like.forEach( (attr) => { new7 = NEWextract_lists(new7, attr, 0, 8) } );

 console.log("processed text 7", new7);
  //    alert("pause 9");

      let new8 = {...new7};

      new8 = splitIntoParagraphs(new8, "all", paragraph_peers);
 console.log("processed text 8", new8);
  //    alert("pause 10");
// console.log("preprocessed text", originaltextB);
 //     var tmpfirstsplit = splitTextAtDelimiters(originaltextB, paragraph_peer_delimiters);

//       console.log("tmpfirstsplit",tmpfirstsplit);
//alert("pause 3");

//      let tmpfirstsplitMATH = extract_lists(tmpfirstsplit, "extraneous math", display_math_tags);
// alert("tmpfirstsplitMATH");
//      let tmpfirstsplitATT = extract_lists(tmpfirstsplitMATH, "attributes", "all");
//      let tmpfirstsplitTITLE = extract_lists(tmpfirstsplitATT, "title", "all");
//      let tmpfirstsplitLABEL = extract_lists(tmpfirstsplitTITLE, "label", "all");

// console.log("tmpfirstsplitLABEL", tmpfirstsplitLABEL);
//alert("labels")

//      var tmp1firstsplitP = splitIntoParagraphs(tmpfirstsplitLABEL, "all", paragraph_peers);

//       console.log("tmp1firstsplitP",tmp1firstsplitP);

// alert("first split P");

//      var tmp1secondsplit = splitAtDelimiters(tmp1firstsplitP, paragraph_peer_delimiters, "all", "", paragraph_peers);

//       console.log("tmp1secondsplit",tmp1secondsplit);
//       console.log("tmp1secondsplit expanded",JSON.stringify(tmp1secondsplit));

//      let tmp1together = {tag: "section", content: tmp1secondsplit}
//      if (document_title) { tmp1together["title"] = document_title }

//      let tmp1secondsplitMATH = extract_lists(tmp1secondsplit, "extraneous math", display_math_tags);
   //   let tmp1secondsplitMATH = extract_lists(tmp1secondsplit, "extraneous math", display_math_tags);
// console.log("tmp1secondsplitMATH", tmpfirstsplitMATH);

//      let tmp1secondsplitATT = extract_lists(tmp1secondsplitMATH, "attributes", "all");
//      let tmp1secondsplitTITLE = extract_lists(tmp1secondsplitATT, "title", "all");
//      let tmp1secondsplitLABEL = extract_lists(tmp1secondsplitTITLE, "label", "all");

 let new9 = {...new8};

      new9 = NEWextract_lists(new9, "extract li", 0,0);

      new9 = NEWextract_lists(new9, "oneline environments", 0,0);
 console.log("processed text 9", new9);
      alert("pause 11");

//      var tmp1secondsplitP = splitIntoParagraphs(tmp1secondsplitENV, "all", paragraph_peers);
//
//  console.log("tmp1secondsplitP", tmp1secondsplitP);
//
//alert("pre");
////////////////////      var tmp1secondsplitPfig = extract_lists(tmp1secondsplitP, "substructure", objects_with_substructure);
//     let tmp1finalsplit = extract_lists(tmp1secondsplitPfig, "attributes", "all");
//
////////////      var tmp1secondsplitPfigclean = extract_lists(tmp1finalsplit, "clean up substructure", objects_with_substructure);

 //      console.log("tmp1secondsplitPfig",tmp1secondsplitPfigclean);

//       console.log("tmp1finalsplit",tmp1secondsplitPfigclean);
//alert("tmp1secondsplitPfig");

//      const tmp2 = splitAtDelimiters(tmp1secondsplitPfigclean, asymmetric_inline_delimiters, "all", "", tags_containing_text);
      const tmp2 = splitAtDelimiters(new9, asymmetric_inline_delimiters, "all", "", tags_containing_text);

//       console.log("tmp2:",tmp2);

// console.log("    x  xxxxxx xxxx x x x x xx  x x x  x x x x x x  x x x x x  x");

      const tmp3 = splitAtDelimiters(tmp2, "spacelike", "all", "", tags_containing_text);
//       console.log("tmp3:",tmp3);


// console.log("    X  XXXXXX XXXX X X X X XX  X X X  X X X X X X  X X X X X  x");

      //have to do this twice, because of nesting
      const tmp4x = splitAtDelimiters(tmp3, asymmetric_inline_delimiters, "all", "", tags_containing_text);
      const tmp4 = splitAtDelimiters(tmp4x, asymmetric_inline_delimiters, "all", "", tags_containing_text);

 //     const tmp4p = reassemblePreTeXt(tmp4);

//      console.log("tmp4p:",tmp4p);

      const tmp5x = extract_lists(tmp4, "fonts", tags_containing_text);
      const tmp5y = extract_lists(tmp5x, "texlike", tags_containing_text);
      const tmp5z = splitAtDelimiters(tmp5y, "spacelike", "all", "", tags_containing_text);

      const tmp5t = extract_lists(tmp5z, "blockquotes", ["p"]);  // meaning: Markdown style
      const tmp5w = extract_lists(tmp5t, "extract li", ["p"]);
      const tmp5v = extract_lists(tmp5w, "gather li", tags_containing_paragraphs);
// console.log("tmp5v", tmp5v);
      const tmp5u = extract_lists(tmp5v, "absorb math", tags_containing_paragraphs);
// console.log("tmp5u", tmp5u);
      const tmp5 = extract_lists(tmp5u, "statements", tags_needing_statements);
// console.log("tmp5u == tmp5", JSON.stringify(tmp5u) == JSON.stringify(tmp5));

//       console.log("tmp2 again",tmp2 );
//       console.log("tmp4",tmp4 );
      console.log("tmp5",tmp5 );
      const tmp5p = reassemblePreTeXt(tmp5);
      console.log("tmp5p",tmp5p);
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

