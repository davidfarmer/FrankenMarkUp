
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
import {preprocess, splitIntoParagraphs, splitAtDelimiters, extract_lists } from './mysplitAtDelimiters.js'
import {reassemblePreTeXt} from './reassemble.js'

// console.log("in parse.js");

export function fmToPTX(originaltext, wrapper="placeholder"){  // called by index.js

    let originaltextC = preprocess(originaltext);

console.log("outputtags", outputtags);
//  console.log("originaltextC", originaltextC);
      // wrap everything in a section
      let tmp1together = {tag: wrapper, content: originaltextC}
//      if (document_title) { tmp1together["title"] = document_title }


      let new1 = {...tmp1together};

      const firstdepth =  15;
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

      let new9 = {...new8};

// console.log("new9", new9);
// alert("new9")
      // why do we extract lists before oneline environments?
      new9 = extract_lists(new9, "extract li", 0,0, "all");   // "all" is wrong, but later code assumes "p"
// console.log("new9b", new9);
// alert("new9b")

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

      const tmp5x = extract_lists(tmp4, "fonts", 0,0,tags_containing_text);
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
      let tmp5r = extract_lists(tmp5s, "images",0,0, "all"); 
      let tmp5 = extract_lists(tmp5r, "prefigure",0,0, ["prefigure"]); 
 //     let tmp5 = tmp5u;

// console.log("tmp5u == tmp5", JSON.stringify(tmp5u) == JSON.stringify(tmp5));

//       console.log("tmp2 again",tmp2 );
//       console.log("tmp4",tmp4 );
      console.log("tmp5",tmp5 );
      const tmp5p = reassemblePreTeXt(tmp5);

      return tmp5p
};


