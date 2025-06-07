
import {
    outputtags,
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
    paragraph_peers,
    attribute_like,
    asymmetric_inline_delimiters,
    tags_containing_text,
    tags_containing_paragraphs,
    tags_needing_statements,
} from './data.js'
import {preprocess, setCoarseStructure, extractStructure, splitIntoParagraphs, splitAtDelimiters, extract_lists } from './mysplitAtDelimiters.js'
import {reassemblePreTeXt} from './reassemble.js'
import { alert } from './utils.js';

// console.log("in parse.js");

export let document_metadata = {};

export function fmToPTX(originaltext, wrapper="placeholder"){  // called by index.js

    let originaltextA = preprocess(originaltext);
// console.log("originaltextA", originaltextA);
// alert("originaltextA");

// names of these functions are confusing
    let originaltextB = extractStructure(originaltextA);

    let originaltextC = setCoarseStructure(originaltextB);

//console.log("outputtags", outputtags);
  console.log("originaltextC", originaltextC);
      // wrap everything in a section
      let tmp1together = {tag: wrapper, content: originaltextC}

      if ("documentclass" in document_metadata && document_metadata["documentclass"]) {
          tmp1together["tag"] = document_metadata["documentclass"]
      } else { tmp1together["tag"] = "article" }  // ? wrapper ?

      if ("title" in document_metadata && document_metadata["title"]) {
          tmp1together["title"] = document_metadata["title"]
      } else if ("shorttitle" in document_metadata && document_metadata["shorttitle"]) {
          tmp1together["title"] = document_metadata["shorttitle"]
      }


      let new1 = {...tmp1together};

//console.log("starting iteration on new1", new1);
//alert("new1");
      const firstdepth =  17;
      for (let depth = 0; depth < firstdepth; ++depth) {
          let trimmed_levels = level    //  currently not trimming level.slice(depth);      // need to actually trim them!
          trimmed_levels.forEach( (lev) => {
              new1 = splitAtDelimiters(new1, lev, 0, depth)
              attribute_like.forEach( (attr) => { new1 = extract_lists(new1, attr[0], 0, depth, attr[1]) } );

          } );
      }
//   console.log("preprocessed text 2", new1);
//  alert("preprocessed text 2");

      let new7 = {...new1}
// console.log("about to process new7", new7);
// alert("7");
      new7 = splitIntoParagraphs(new7, "all", paragraph_peers);
//    console.log("processed text 7", new7);
//         alert("pause 2");
      let new8 = {...new7}
      new8 = extract_lists(new8, "oneline environments", 0,0, "all");
//  console.log("new8", new8);
//  alert("new8")
      new8 = extract_lists(new8, "attributes", 0,0, "all");
//  console.log("new8a", new8);
//  alert("new8a")
//  console.log("processed text 8", new8);
//       alert("pause 3");

      attribute_like.forEach( (attr) => { new8 = extract_lists(new8, attr[0], 0, 0, attr[1]) } );
// console.log("processed text 8b", new8);
//      alert("pause 3");
  // next is maybe overkill, but things like statements contain p's
      new8 = splitIntoParagraphs(new8, "all", paragraph_peers);

      new8 = extract_lists(new8, "blockquotes", 0,0,["p"]);  // meaning: Markdown style

      new8 = extract_lists(new8, "images",0,0, "all"); 

      let new9 = {...new8};

// console.log("new9", new9);
// alert("new9")
      // why do we extract lists before oneline environments?
      new9 = extract_lists(new9, "extract li", 0,0, "all");   // "all" is wrong, but later code assumes "p"
// console.log("new9b", new9);
// alert("new9b")

      attribute_like.forEach( (attr) => { new9 = extract_lists(new9, attr[0], 0, 0, attr[1]) } );
////////////////////      var tmp1secondsplitPfig = extract_lists(tmp1secondsplitP, "substructure", objects_with_substructure);

//  console.log("about to clean up substructure", new9);
//       alert("pause 3");
  // next is maybe overkill, but things like statements contain p's
      new9 = extract_lists(new9, "clean up substructure", 0,0,objects_with_substructure);

      const tmp2 = splitAtDelimiters(new9, asymmetric_inline_delimiters, 0,firstdepth+1, "all", tags_containing_text);

      const tmp3 = splitAtDelimiters(tmp2, "spacelike", 0,firstdepth+1, "all", tags_containing_text);

      //have to do this twice, because of nesting
      const tmp4x = splitAtDelimiters(tmp3, asymmetric_inline_delimiters,0,firstdepth+1, "all", tags_containing_text);
      const tmp4 = splitAtDelimiters(tmp4x, asymmetric_inline_delimiters, 0,firstdepth+1,"all", tags_containing_text);

//  console.log("tmp4", tmp4);
//  alert("tmp4");
      const tmp5x = extract_lists(tmp4, "fonts", 0,0,tags_containing_text);
//  console.log("tmp5x", tmp5x);
//  alert("tmp5x");
      const tmp5y = extract_lists(tmp5x, "texlike", 0,0,tags_containing_text);

      let tmp5z = splitAtDelimiters(tmp5y, "spacelike", 0,firstdepth+1, "all", tags_containing_text);

      tmp5z = splitAtDelimiters(tmp5z, asymmetric_inline_delimiters,0,firstdepth+1, "all", tags_containing_text);
      tmp5z = splitAtDelimiters(tmp5z, asymmetric_inline_delimiters, 0,firstdepth+1,"all", tags_containing_text);



      const tmp5t = tmp5z;
      const tmp5w = extract_lists(tmp5t, "extract li",0,0, ["p"]);
//  console.log("tmp5w", tmp5w);
//  alert("tmp5w");
      const tmp5v = extract_lists(tmp5w, "gather li",0,0, tags_containing_paragraphs);
//  console.log("tmp5v", tmp5v);
//  alert("tmp5v");
      const tmp5u = extract_lists(tmp5v, "absorb math",0,0, tags_containing_paragraphs, "", "", wrapper);
// console.log("tmp5u", tmp5u);
//  alert("tmp5u");
      let tmp5s = extract_lists(tmp5u, "statements",0,0, tags_needing_statements);  // statemetns now part of level
//  console.log("tmp5s", tmp5s);
//   alert("tmp5s");
//      let tmp5r = extract_lists(tmp5s, "images",0,0, "all"); 
      let tmp5r = tmp5s; 
      let tmp5 = extract_lists(tmp5r, "prefigure",0,0, ["prefigure"]); 
      tmp5 = extract_lists(tmp5, "sage",0,0, ["sage"]); 
 //     let tmp5 = tmp5u;

      if ("biblio" in document_metadata) {
          let the_biblio = {tag: "backmatter"};
          the_biblio.content = '\n<references xml:id="bibliography">\n<title>Bibliography</title>\n';
          the_biblio.content += processBiblio(document_metadata["biblio"]);
          the_biblio.content += "\n</references>\n";
          tmp5.content.push(the_biblio)
      }


//       console.log("tmp2 again",tmp2 );
//       console.log("tmp4",tmp4 );
      console.log("tmp5",tmp5 );
// alert("the end");
      const tmp5p = reassemblePreTeXt(tmp5);

      return tmp5p
};

////////////// 

function processBiblio(latexbib) {

   let thetext = latexbib.trim();

   thetext = thetext.replace(/{[^{}]+}/, "");
   thetext = thetext.replace(/\s*\\(begin|end){thebibliography}\s*/, "");

  // quick and dirty: go back and split it up and reprocess separately
   thetext = thetext.replace(/\s*\\bibitem\s*{([^{}]+)}\s*/g, '</biblio>\n\n<biblio type="raw" xml:id="$1">');
   thetext = thetext.replace(/(.*?)<\/biblio>/, "");
   thetext += "</biblio>\n";

   return thetext

}

////////////// 

// not used yet
function processTable(tab) {

   let thetext = tab;

   thetext = thetext.replace(/&([^a-zA-Z])/, "&amp;");

   return thetext

}


