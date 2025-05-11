/*
The js file for the test interface.

2022.09.27 created

2022.10.17 add global call
2022.10.25 add MathJax support
*/
//import '../spacemath.css'
import {
    remapped_math_tags,
    structural_components,
    level_1_p_peers_containing_p,
    other_level_1_p_peers,
    list_like,
    inlinetags,
    randomtags_containing_p,
    containers,
    display_environments,
    display_subenvironments,
    display_subsubenvironments,
    possibleattributes,
    objects_with_substructure,
    display_math_tags,
    level,
    attribute_like,
    tags_containing_text,
    tags_containing_paragraphs,
    tags_needing_statements,
} from './data.js'
import {splitIntoParagraphs, preprocessAliases, splitAtDelimiters, extract_lists } from './mysplitAtDelimiters.js'
import {reassemblePreTeXt} from './reassemble.js'



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
    return {left:"<" + delim + " ", right:"</" + delim + ">", tag:delim}
}
const LaTeXDelimiterOf = function(delim) {
    return {left:"\\begin{" + delim + "}", right:"\\end{" + delim + "}", tag:delim}
}
export const delimitersFromList = function(lis) {
    if (!Array.isArray(lis)) { return lis }
    let delim_lis = [];
    lis.forEach( (el) => {
        delim_lis.push( PreTeXtDelimiterOfAttributes(el) );
        delim_lis.push( PreTeXtDelimiterOf(el) );
        delim_lis.push( LaTeXDelimiterOf(el) );
    });
    return delim_lis
}

export const PTXdisplayoutput = function(tag) {
    return  { begin_tag: "<" + tag + "",
                       end_tag: "</" + tag + ">",
        before_begin: "\n", after_begin: ">\n",
        before_end: "\n", after_end: "\n"}
}
export const PTXinlineoutput = function(tag) {
    return  { begin_tag: "<" + tag + "",
                       end_tag: "</" + tag + ">",
        before_begin: "", after_begin: ">",
        before_end: "", after_end: ""}
}

export const display_math_delimiters = [
//          {left:"<p>", right:"</p>", tag:"p"},  // for compatibility with PreTeXt!
          {left:"$$", right:"$$", tag:"smen"},
          {left:"\\[", right:"\\]", tag:"smen"},   // these don;t work: not sure why
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

export const paragraph_peer_delimiters = [];

// remapped_tags.forEach( (el) => {
//     paragraph_peer_delimiters.push(
//         {left:"\\begin{" + el[0] + "}", right:"\\end{" + el[0] + "}", tag:el[1]}
//     );
// });


let paragraph_peer_ptx_and_latex_text = [...structural_components, ...level_1_p_peers_containing_p];
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
    paragraph_peer_delimiters.push( PreTeXtDelimiterOf(el) );
    paragraph_peer_delimiters.push( LaTeXDelimiterOf(el) );
});
other_level_1_p_peers.forEach( (el) => {
    paragraph_peer_delimiters.push( PreTeXtDelimiterOfAttributes(el) );
    paragraph_peer_delimiters.push( PreTeXtDelimiterOf(el) );
    paragraph_peer_delimiters.push( LaTeXDelimiterOf(el) );
});

let paragraph_peers = Array.from(paragraph_peer_delimiters, ({ tag }) => tag);
paragraph_peers = [...new Set(paragraph_peers)];   //remove duplicates

// console.log("paragraph_peers", paragraph_peers);

let asymmetric_inline_delimiters = [
          {left:"\\(", right:"\\)", tag:"sm"},
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

export const debugging_output_markup = {begin_tag: "BEGINTAG", end_tag: "ENDTAG",
         before_begin: "BB", after_begin: "AB",
         before_end: "BE", after_end: "AE"};

export const outputtags = {  // start with the quirky ones
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
    outputtags[el] = PTXdisplayoutput(el)
    });
other_level_1_p_peers.forEach( (el) => {
    outputtags[el] = PTXdisplayoutput(el)
    });
randomtags_containing_p.forEach( (el) => {
    outputtags[el] = PTXdisplayoutput(el)
    });
containers.forEach( (el) => {
    outputtags[el] = PTXdisplayoutput(el)
    });
[...display_environments, ...display_subenvironments, ...display_subsubenvironments].forEach( (el) => {
    outputtags[el] = PTXdisplayoutput(el)
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

// spacemath
outputtags["sm"] = PTXinlineoutput("m");
outputtags["smen"] = PTXdisplayoutput("men");

outputtags["image"] = {begin_tag: "<image", end_tag: "</image>",  // should not be a special case?
         before_begin: "", after_begin: ">\n", 
         before_end: "\n", after_end: "\n"};
outputtags["description"] = {begin_tag: "<description>", end_tag: "</description>",  // img or image?  should not be a special case?
         before_begin: "\n", after_begin: "",
         before_end: "", after_end: "\n"};

// console.log("in parse.js");

export function fmToPTX(originaltext, wrapper="placeholder"){

//    console.log("fmToPTX", originaltext);
    let originaltextX = preprocessAliases(originaltext);

// console.log("originaltextX", originaltextX);

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
      let originaltextA = originaltextX.replace(/([^\s])\\label({|\[|\()/g,"$1\n\\label$2");   // }
   // have to preprovess blockquote because (of how we handle attributes) the starting > looks
   // like the end of an opening tag.
      let originaltextB = originaltextA.replace(/\n\s*\n\s*>/g, "\n\n+++sTaRTbQ>");  // preprocess blockquote
      originaltextB = originaltextB.replace(/(\$\$|\\end{equation}|<\/men>|\\end{align}|\\\]) *\n([^\n])/g, "$1\n+++saMePaR$2");  // should take "equation" and "align" from a list

      let originaltextC = originaltextB.replace(/(<diagram)(.*?)(<\/diagram>)/sg, function(x,y,z,w) {
                                  const hiddenz = z.replace(/(<|<\/)definition(>)/g, "$1predefinition$2");
                                  return y + hiddenz + w
                              });
      let findattributes = new RegExp("([^\\n])(\\n *(" + possibleattributes.join("|") + ") *:)", "g");
      originaltextC = originaltextC.replace(findattributes, "$1\n$2");

// end of preprocessor



// console.log("originaltextC", originaltextC);
      // wrap everything in a section
      let tmp1together = {tag: wrapper, content: originaltextC}
      if (document_title) { tmp1together["title"] = document_title }


      let new1 = {...tmp1together};

      const firstdepth = 15;
      for (let depth = 0; depth < firstdepth; ++depth) {
          let trimmed_levels = level.slice(depth);      // need to actually trim them!
          trimmed_levels.forEach( (lev) => {
              new1 = splitAtDelimiters(new1, lev, 0, depth)
              attribute_like.forEach( (attr) => { new1 = extract_lists(new1, attr[0], 0, depth, attr[1]) } );

          } );
      }
//  console.log("preprocessed text 2", new1);
// alert("preprocessed text 2");

      let new7 = {...new1}
// console.log("about to process new7", new7);
// alert("7");
      new7 = splitIntoParagraphs(new7, "all", paragraph_peers);
//   console.log("processed text 7", new7);
//        alert("pause 2");
      let new8 = {...new7}
      new8 = extract_lists(new8, "oneline environments", 0,0, "all");
      new8 = extract_lists(new8, "attributes", 0,0, "all");
//  console.log("processed text 8", new8);
//       alert("pause 3");

      attribute_like.forEach( (attr) => { new8 = extract_lists(new8, attr[0], 0, 0, attr[1]) } );
// console.log("processed text 8b", new8);
//      alert("pause 3");
  // next is maybe overkill, but things like statements contain p's
      new8 = splitIntoParagraphs(new8, "all", paragraph_peers);

      new8 = extract_lists(new8, "blockquotes", 0,0,["p"]);  // meaning: Markdown style

      let new9 = {...new8};

      // why do we extract lists before oneline environments?
      new9 = extract_lists(new9, "extract li", 0,0, "all");   // "all" is wrong, but later code assumes "p"

////////////////////      var tmp1secondsplitPfig = extract_lists(tmp1secondsplitP, "substructure", objects_with_substructure);
//
////////////      var tmp1secondsplitPfigclean = extract_lists(tmp1finalsplit, "clean up substructure", objects_with_substructure);
//  console.log("about to clean up substructure", new9);
//       alert("pause 3");
  // next is maybe overkill, but things like statements contain p's
      new9 = extract_lists(new9, "clean up substructure", 0,0,objects_with_substructure);

      const tmp2 = splitAtDelimiters(new9, asymmetric_inline_delimiters, 0,firstdepth+1, "all", tags_containing_text);

      const tmp3 = splitAtDelimiters(tmp2, "spacelike", 0,firstdepth+1, "all", tags_containing_text);

      //have to do this twice, because of nesting
      const tmp4x = splitAtDelimiters(tmp3, asymmetric_inline_delimiters,0,firstdepth+1, "all", tags_containing_text);
      const tmp4 = splitAtDelimiters(tmp4x, asymmetric_inline_delimiters, 0,firstdepth+1,"all", tags_containing_text);

      const tmp5x = extract_lists(tmp4, "fonts", 0,0,tags_containing_text);
      const tmp5y = extract_lists(tmp5x, "texlike", 0,0,tags_containing_text);

      let tmp5z = splitAtDelimiters(tmp5y, "spacelike", 0,firstdepth+1, "all", tags_containing_text);

      tmp5z = splitAtDelimiters(tmp5z, asymmetric_inline_delimiters,0,firstdepth+1, "all", tags_containing_text);
      tmp5z = splitAtDelimiters(tmp5z, asymmetric_inline_delimiters, 0,firstdepth+1,"all", tags_containing_text);



      const tmp5t = tmp5z;
      const tmp5w = extract_lists(tmp5t, "extract li",0,0, ["p"]);
      const tmp5v = extract_lists(tmp5w, "gather li",0,0, tags_containing_paragraphs);
//  console.log("tmp5v", tmp5v);
//  alert("tmp5v");
      const tmp5u = extract_lists(tmp5v, "absorb math",0,0, tags_containing_paragraphs, "", "", wrapper);
// console.log("tmp5u", tmp5u);
//  alert("tmp5u");
      let tmp5s = extract_lists(tmp5u, "statements",0,0, tags_needing_statements);  // statemetns now part of level
      let tmp5 = extract_lists(tmp5s, "prefigure",0,0, ["prefigure"]);  // statemetns now part of level
 //     let tmp5 = tmp5u;

// console.log("tmp5u == tmp5", JSON.stringify(tmp5u) == JSON.stringify(tmp5));

//       console.log("tmp2 again",tmp2 );
//       console.log("tmp4",tmp4 );
      console.log("tmp5",tmp5 );
      const tmp5p = reassemblePreTeXt(tmp5);

      return tmp5p
};


