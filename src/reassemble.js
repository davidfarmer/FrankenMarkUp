
import { outputtags, debugging_output_markup, PTXdisplayoutput } from "./parse-exports";
import { convertMathSnippet } from '../../Space_Math/src/main.js';

let debugtags = "STart";
debugtags = "";

export const reassemblePreTeXt = function(content) {

    if (typeof content == "string") { return content }

    if (!Array.isArray(content)) {
       let this_element_text = "";
       const this_tag = content.tag;
       let these_tags = outputtags[this_tag];
       if (!these_tags) { these_tags = PTXdisplayoutput(this_tag) }
       this_element_text +=  these_tags.before_begin + these_tags.begin_tag + debugtags;

       if ("xmlattributes" in content && content.xmlattributes) { this_element_text += " " + content.xmlattributes.trim() }
       if ("label" in content && content.label) { this_element_text += " " + 'xml:id="' + content.label + '"'}

// console.log("content", content);
       const possible_attributes = Object.keys(content);
       possible_attributes.forEach( (el) => {
           if (!["tag", "content", "title", "xmlattributes"].includes(el)) {
               this_element_text += " " + el + '="' + content.el + '"';
           }
       });

       this_element_text += these_tags.after_begin;

       if ("title" in content && content.title) { this_element_text += "<title>" + content.title + "</title>" + "\n" }

       const this_assembled_text = this_element_text + reassemblePreTeXt(content.content) +  these_tags.before_end + these_tags.end_tag + these_tags.after_end;

       return this_assembled_text
    }

    const  nodelist = content;  // should we check it is an array?

    let assembled_text = "";

    nodelist.forEach( (element, index) => {

     // problmatic case:  "floating" text.  By that we meet a string
     // which is has not been parsed.  Probably due to bad markup,
     // such as words after the answer to an exercise but before the
     // end of the exercise.

     // Current (temporary?) solution is to wrap those in "error" tags.
// console.log("elt is", typeof element);
      if (typeof element == "string") {
          // presumably an error, but if white space, silently ignore
          if (!element.match(/^\s*$/)) {
              assembled_text += "<TEXT>" + element + "</TEXT>";
              console.log("just added error of", element)
          }
          return  // i.e., go to next of nodelist
      }

      let this_element_text = "";
      const this_tag = element.tag;
//    console.log("assembling a ", this_tag, "from", element);
      let these_tags = outputtags[this_tag];
      if (typeof these_tags == "undefined") { these_tags = debugging_output_markup }

//  console.log("these_tags ", these_tags);

      this_element_text = this_element_text +
                these_tags.before_begin + these_tags.begin_tag + debugtags;
//  console.log(typeof element, "ccc", element);
      if ("xmlattributes" in element && element.xmlattributes) { this_element_text += " " + element.xmlattributes.trim() }
      if ("label" in element && element.label) { this_element_text += " " + 'xml:id="' + element.label + '"'}

if (element.tag == "prefigure") { console.log("element", element) }
      const possible_attributes = Object.keys(element);
           possible_attributes.forEach( (el) => {
           if (!["tag", "content", "title", "xmlattributes"].includes(el)) {
               this_element_text += " " + el + '="' + element[el] + '"';
           }
      });

      this_element_text += these_tags.after_begin;

      if ("title" in element && element.title) { this_element_text += "<title>" + element.title + "</title>" + "\n" }

      let this_new_text = reassemblePreTeXt(element.content);
      if (this_tag != "text") {
                // what about a code block?  do we mean verbatim?
          this_new_text = this_new_text.replace(/^[\r\n]+/, "");
          this_new_text = this_new_text.replace(/[\r\n]+$/, "")
      }
      if (["c","code"].includes(this_tag)) {
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
         this_new_text = convertMathSnippet(this_new_text, "LaTeX");
         this_new_text = sanitizeXMLstring(this_new_text)
      }
      this_element_text = this_element_text + this_new_text;
      this_element_text = this_element_text +
                these_tags.before_end + these_tags.end_tag + mathpunctuation + these_tags.after_end;

      if (this_element_text.match(/^\s*<p>\s*<\/p>\s*$/)) { console.log("empty p"); this_element_text = "" }
                                                  // should we have eleminated empty p earlier?

      assembled_text = assembled_text + this_element_text;

    });

    return assembled_text
}

const sanitizeXMLattributes = function(text) {

    let new_text = text;

    new_text = new_text.replace(/ /g, "-");
    new_text = new_text.replace(/[^a-zA-Z0-9\-]/g, "_");

    return new_text
}
const sanitizeXMLstring = function(text) {

    let new_text = text;

    new_text = new_text.replace(/&/g, "&amp;");
    new_text = new_text.replace(/</g, "&lt;");
    new_text = new_text.replace(/>/g, "&gt;");

    return new_text
}
