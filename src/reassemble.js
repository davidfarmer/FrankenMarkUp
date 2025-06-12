
import { PTXblockoutput, PTXinlineoutput} from "./data";
import { do_nothing_markup, debugging_output_markup, verbatim_tags, outputtags, tags_without_titles } from "./data";
import { convertTextInPlace } from './mysplitAtDelimiters';
import { convertMathSnippet } from 'space_math';
// import { convertMathSnippet } from '../../Space_Math/src/main';
import { alert } from "./utils";

let debugtags = "STart";
 debugtags = "";

export const reassemblePreTeXt = function(content) {

// console.log("math",convertMathSnippet("x", "LaTeX") );

//console.log("reassemblePreTeXt of", content);
if (Array.isArray(content)) {
// console.log("first content", content[0].content, "III", content[0].content.replace(/\n/,"AAAA"));
}

    if (typeof content == "string") { return content }

    if (!Array.isArray(content)) {
       let this_element_text = "";
console.log("content", content);
       const this_tag = content.tag;
       let these_tags = outputtags[this_tag];

   // spacemath
//       if (this_tag == "sm") { these_tags = PTXinlineoutput("m") }
//       else if (this_tag == "smen") { these_tags = PTXinlineoutput("men") }

       if (!these_tags) { these_tags = PTXblockoutput(this_tag) }
       this_element_text +=  these_tags.before_begin + these_tags.begin_tag + debugtags;

       if ("xmlattributes" in content && content.xmlattributes) { this_element_text += " " + content.xmlattributes.trim() }
       if ("id" in content && content.id) { this_element_text += " " + 'xml:id="' + sanitizeXMLattributes(content.id) + '"'}

// console.log("content", content);
       const possible_attributes = Object.keys(content);
       possible_attributes.forEach( (el) => {
           if (!["tag", "content", "title", "xmlattributes", "id"].includes(el)) {
               this_element_text += " " + el + '="' + content.el + '"';
           }
       });

       this_element_text += these_tags.after_begin;

       if ("title" in content && content.title) { this_element_text += "\n<title>" + convertTextInPlace(content.title) + "</title>" + "\n" }

//console.log("reprocessing", content.content);
       const this_assembled_text = this_element_text + reassemblePreTeXt(content.content) +  these_tags.before_end + these_tags.end_tag + these_tags.after_end;
//console.log("got back", this_assembled_text);

       return this_assembled_text
    }

    const  nodelist = content;  // should we check it is an array?

    let assembled_text = "";

    nodelist.forEach( (element, index) => {

      let this_node_text = "";

     // problmatic case:  "floating" text.  By that we meet a string
     // which is has not been parsed.  Probably due to bad markup,
     // such as words after the answer to an exercise but before the
     // end of the exercise.

     // Current (temporary?) solution is to wrap those in "error" tags.
// console.log("elt is", typeof element);
      if (typeof element == "string") {
          // presumably an error, but if white space, silently ignore
          if (!element.match(/^\s*$/)) {
        //      assembled_text += "<TEXT>" + element + "</TEXT>";
              this_node_text += "<TEXT>" + element + "</TEXT>";
              console.log("just added error of", element)
          }
          return  // i.e., go to next of nodelist
      }

      let this_element_text = "";
      let this_element_opening_tag = "";
      const this_tag = element.tag;
// if ((this_tag && this_tag.startsWith("e"))) {
//     console.log("assembling a ", this_tag, "from", element);
// }
      let these_tags = outputtags[this_tag];
      if (typeof these_tags == "undefined") {
          these_tags = do_nothing_markup
     //     these_tags = debugging_output_markup
      }

//  console.log("these_tags ", these_tags);

      this_element_opening_tag += these_tags.before_begin + these_tags.begin_tag + debugtags;
//  console.log(typeof element, "ccc", element);
      if ("xmlattributes" in element && element.xmlattributes) { this_element_opening_tag += " " + element.xmlattributes.trim() }
      if ("id" in element && element.id) { this_element_opening_tag += " " + 'xml:id="' + sanitizeXMLattributes(element.id) + '"'}

// if (element.tag == "prefigure") { console.log("element", element) }
      const possible_attributes = Object.keys(element);
           possible_attributes.forEach( (el) => {
           if (!["tag", "content", "title", "xmlattributes", "id", "text"].includes(el) && !el.startsWith("_")) {
               this_element_opening_tag += " " + el + '="' + element[el] + '"';
           }
      });

      if ("title" in element && element.title && !tags_without_titles.includes(this_tag)) {
          this_element_text += "\n<title>" + convertTextInPlace(element.title) + "</title>" + "\n"
      } else if ("title" in element && element.title && tags_without_titles.includes(this_tag)) {
          if (["ol", "ul", "enumerate", "itemize"].includes(this_tag)) {
              this_element_opening_tag += " " + element.title
          }
      }

      this_element_opening_tag += these_tags.after_begin;


      let this_content = element.content;
// console.log("this_content element.content", "|"+this_content+"|", typeof this_content );

      if (typeof this_content == "string" ) // && !verbatim_tags.includes(this_tag) )
        {
             // why is this here?
        }
      let this_new_text = reassemblePreTeXt(this_content);
    // this is a bad hack for how figures are processed
      if ("text" in element) { this_new_text = reassemblePreTeXt(element.text) + this_new_text }

//  console.log("this_new_text", "|"+this_new_text+"|");
  //    if (this_tag != "text") {   // }
//  console.log(this_tag, !verbatim_tags.includes(this_tag), "oo", this_new_text);
      if (false && !verbatim_tags.includes(this_tag) ) {
                // what about a code block?  do we mean verbatim?
          this_new_text = this_new_text.replace(/^[\r\n]+/, "");
          this_new_text = this_new_text.replace(/[\r\n]+$/, "")
      }
// console.log("this_new_text again", "|"+this_new_text+"|");
      if (["c","code", "tabular"].includes(this_tag)) {
          this_new_text = sanitizeXMLstring(this_new_text)
      }
      let mathpunctuation = "";
      if (["m","md","me","mdn","men"].includes(this_tag)) {
    //     this_new_text = sanitizeXMLstring(this_new_text);
         if (this_new_text.match(/^.*(\.|,|;)\s*$/s)) {
            this_new_text = this_new_text.replace(/\s*$/,"");
            mathpunctuation = this_new_text.slice(-1);
            this_new_text = this_new_text.slice(0,-1)
         }
         if ( !this_new_text.match(/(\\|{)/)) {    // }
// console.log("about to convert:", this_new_text);
          //   this_new_text = convertMathSnippet(this_new_text.replace(/\n/g, "REtuRn"), "LaTeX");
             this_new_text = convertMathSnippet(this_new_text, "LaTeX");
             this_new_text = this_new_text.replace(/&/g, " \\amp ");
// console.log("after converting:", this_new_text);
         } else {
               this_new_text = sanitizeXMLmathstring(this_new_text)
         }
      }
      this_element_text = this_element_text + this_new_text;
      let after_tag = these_tags.before_end + these_tags.end_tag + mathpunctuation + these_tags.after_end;
 //     this_element_text = this_element_text +
 //               these_tags.before_end + these_tags.end_tag + mathpunctuation + these_tags.after_end;
 //     this_element_text = this_element_text + after_tag;


 //     assembled_text = assembled_text + this_element_text;
      if (this_element_text.match(/^\s*<mdn>.*<\/mdn>\s*$/s)) {
          // use those tags, not the wrapping tags
          this_node_text = this_element_text
          // to do:  save the attributes
      } else {
          this_node_text = this_element_opening_tag + this_element_text + after_tag;
      }
      if (this_element_text.match(/^\s*<p>\s*<\/p>\s*$/)) { console.log("empty p"); this_element_text = "" }
                                                  // should we have eleminated empty p earlier?

      //  no space before final punctuation
      this_node_text = this_node_text.replace(/(\/)(me|md|men|mdn)>\s+(\.|,|;|:)/g, "$1$2>$3");

      assembled_text += this_node_text;

    });

 //   assembled_text = assembled_text.replace(/(\/)(me|md|men|mdn)>\s+(\.|,|;|:)/g, "$1$2>$3");

    return assembled_text
}

export const sanitizeXMLattributes = function(text) {

    let new_text = text;

//    new_text = new_text.replace(/ /g, "-");
    new_text = new_text.replace(/[^a-zA-Z0-9\-_ ]/g, "_");

    return new_text
}
export const sanitizeXMLstring = function(text) {

    let new_text = text;

    new_text = new_text.replace(/&([^a])/g, "&amp;$1");
    new_text = new_text.replace(/</g, "&lt;");
    new_text = new_text.replace(/>/g, "&gt;");

    return new_text
}

const sanitizeXMLmathstring = function(text) {

    let new_text = text;

    new_text = new_text.replace(/&/g, "\\amp ");
    new_text = new_text.replace(/</g, "\\lt ");
    new_text = new_text.replace(/>/g, "\\gt ");

    return new_text
}

