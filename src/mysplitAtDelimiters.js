/* eslint no-constant-condition:0 */

import { aliases, display_math_tags, possibleattributes, tags_containing_paragraphs, hint_like } from "./data";
import { delimitersFromList, paragraph_peer_delimiters  } from "./parse-exports";
import { display_math_delimiters } from "./parse-exports";

const findEndOfMath = function(delimiter, text, startIndex) {
    // Adapted from
    // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
    let index = startIndex;
    let braceLevel = 0;

    const delimLength = delimiter.length;

    while (index < text.length) {
        const character = text[index];

        if (braceLevel <= 0 &&
            text.slice(index, index + delimLength) === delimiter) {
            return index;
        } else if (character === "\\") {
            index++;
        } else if (character === "{") {
            braceLevel++;
        } else if (character === "}") {
            braceLevel--;
        }

        index++;
    }

    return -1;
};

const escapeRegex = function(string) {
    return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
};

const amsRegex = /^\\AAAAAAAbegin{/;

var parsecount = 0;

export const splitIntoParagraphs = function(nodelist, nodestoparse, peernodes) {

    if (typeof nodelist == "string") {return splitTextIntoParagraphs(nodelist) }

    if (!Array.isArray(nodelist)) {
        let newnodelist = {...nodelist}
        newnodelist.content = splitIntoParagraphs(newnodelist.content, nodestoparse, peernodes);
        return newnodelist
    }

    let newnodelist = [];

    let current_new_text = "";

    nodelist.forEach( (element, index) => {

// console.log("readt to parse", element);

      // if we have a content node which is a paragraph peer,
      // end and save the current paragraph (if nonempty),
      // and save the new content node
      if (peernodes.includes(element.tag)) {
          if (current_new_text) {
            newnodelist.push({tag: "p", content: current_new_text});
            current_new_text = "";
          }
          // if element needs to be parsed
          if (tags_containing_paragraphs.includes(element.tag) && typeof element.content == "string") {
              element.content = splitTextAtDelimiters(element.content, paragraph_peer_delimiters);
              element.content = splitIntoParagraphs(element.content, nodestoparse, peernodes)
          } else if (tags_containing_paragraphs.includes(element.tag)) {
// ????
              element.content = splitIntoParagraphs(element.content, nodestoparse, peernodes)
          }
          newnodelist.push(element);
      } else if (element.tag == "text") {

          const this_text = element.content.split(/\n{2,}/);
// console.log("found ", this_text.length, " pieces, which are:", this_text);
          this_text.forEach( (element) => {
              const this_new_text = current_new_text + element;
              if (this_new_text) {  // skip empty paragraphs
// console.log("made this_new_text", this_new_text);
                const this_new_paragraph = {tag:"p", content: this_new_text};
                newnodelist.push(this_new_paragraph)
              }
              current_new_text = ""
          })

      } else { newnodelist.push(element) }
    });
    return newnodelist
}

const splitTextIntoParagraphs = function(text) {
      // check that it was given a string?

    let newnodelist = [];

    let current_new_text = "";

    const this_text = text.split(/\n{2,}/);
console.log("found ", this_text.length, " pieces, which are:", this_text);
    this_text.forEach( (element) => {
        const this_new_text = current_new_text + element;
        if (this_new_text) {  // skip empty paragraphs
console.log("made this_new_text", this_new_text);
          const this_new_paragraph = {tag:"p", content: this_new_text};
          newnodelist.push(this_new_paragraph)
        }
        current_new_text = ""
    })

    return newnodelist
}

const splitTextAtDelimiters = function(this_content, delimiters) {  // based on Katex

    if (typeof this_content != "string") { alert("expected string in splitTextAtDelimiters", this_content) }
    var text = this_content;
    let index;
    const data = [];

//  console.log("delimiters", delimiters);

    const regexLeft = new RegExp(
        "(" + delimiters.map((x) => escapeRegex(x.left)).join("|") + ")"
    );

    while (true) {
        index = text.search(regexLeft);
        if (index === -1) {
            break;
        }
        if (index > 0) {
            data.push({
                tag: "text",
                content: text.slice(0, index),
            });
            text = text.slice(index); // now text starts with delimiter
        }
        //  so this always succeeds:
        const i = delimiters.findIndex((delim) => text.startsWith(delim.left));
        index = findEndOfMath(delimiters[i].right, text, delimiters[i].left.length);
        if (index === -1) {
            break;
        }
        const rawData = text.slice(0, index + delimiters[i].right.length);
        const mathcontent = amsRegex.test(rawData)
            ? rawData
            : text.slice(delimiters[i].left.length, index);
        data.push({
    //        type: "math",
            tag: delimiters[i].tag,
            content: mathcontent,
     //       rawData,
        });
        text = text.slice(index + delimiters[i].right.length);
    }

//    if (text !== "") {    // are there times we want to save whitespace text nodes?
    if (!text.match(/^\s*$/)) {
        data.push({
            tag: "text",
            content: text,
        });
    }

//     console.log("leaving splitTextAtDelimiters", data, "   ", data.length);

//    if (data.length == 1 && data[0].tag == 'text') { return text }
//    else { return data }
    return data
};

const recastSpacedDelimiters = function(this_content) {

    if (typeof this_content != "string") { alert("expected a string, but got:", this_content) }
    let the_text = this_content;


// need to do this properly, from spacelike_inline_delimiters
// example:   {left:"_", right:"_", tag:"term"},
//        const regexp =
    the_text = the_text.replace(/(^|\s|~)\$([^\$\n]+)\$(\s|$|[.,!?;:\-])/mg, "$1<m>$2</m>$3");
    the_text = the_text.replace(/(^|\s)_([^_\n]+)_(\s|$|[.,!?;:])/mg, "$1<term>$2</term>$3");
    the_text = the_text.replace(/(^|\s)\*\*([^*\n]+)\*\*(\s|$|[.,!?;:])/mg, "$1<alert>$2</alert>$3");
    the_text = the_text.replace(/(^|\s)\*([^*\n]+)\*(\s|$|[.,!?;:])/mg, "$1<em>$2</em>$3");
    the_text = the_text.replace(/(^|\s)``([^'"`\n]+)''(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3");
    the_text = the_text.replace(/(^|\s)``([^'"`\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3");
    the_text = the_text.replace(/(^|\s)`([^'"`\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3");
    the_text = the_text.replace(/(^|\s)"([^"\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3");
    the_text = the_text.replace(/(^|\s)'([^'\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3");
//    the_text = the_text.replace(/(^|\s)`([^`\n]+)`(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3");
    the_text = the_text.replace(/(^|[^`a-zA-Z0-9])`([^`\n]+)`($|[^`a-zA-A0-9])/mg, "$1<c>$2</c>$3");
// `  because the editor is confused by backticks
    return the_text
}

const accentedASCII = function(fullstring, accent, letter) {

    return toUnicode[accent + letter]
}

export const preprocessAliases = function(this_content) {

    if (typeof this_content != "string") { alert("expected a string, but got:", this_content) }
    let the_text = this_content;

    the_text = the_text.replace(/<!--.*?-->/g,"");

    for (let [key, value] of Object.entries(aliases)) {
      let trueName = key;
// console.log("a key=trueName", key);
      value.forEach( (element) => {
          let unofficialName = element;
          the_text = the_text.replace("<" + unofficialName + ">", "<" + trueName + ">");
          the_text = the_text.replace("<" + unofficialName + " ", "<" + trueName + " ");
          the_text = the_text.replace("</" + unofficialName + ">", "</" + trueName + ">");
          the_text = the_text.replace("\\begin{" + unofficialName + "}", "\\begin{" + trueName + "}");
          the_text = the_text.replace("\\end{" + unofficialName + "}", "\\end{" + trueName + "}");
          the_text = the_text.replace("\\" + unofficialName + "{", "\\" + trueName + "{");
      });
    }

    return the_text
}


export const splitAtDelimiters = function(parse_me, taglist, thisdepth, maxdepth, toenter="all", toprocess="all", parent_tag="" ) {

    let delimiters = [];
    if (typeof taglist == "string") {
        if (taglist == "displaymath") { delimiters = display_math_delimiters }
        else if (taglist == "spacelike") { delimiters = "spacelike" }    // do nothing, because this is handled later
        else { alert("unknown taglist " + taglist) }
    } else if (typeof taglist[0] == "string") {
        delimiters = delimitersFromList(taglist)
    } else {
        delimiters = taglist
    }
// if(taglist == "p") {
// console.log(thisdepth, " ", maxdepth, " type of parse_me", typeof parse_me, "tag search", delimiters, "from taglist", taglist);
// }

    // splitting a text node means replacing it by a list of nodes
    // splitting a non-text node (which is represented by a list)
    // means replacing its content by a list of nodes


    let newnodelist = [];

    if (Array.isArray(parse_me)) {
//console.log("found an array, of length", parse_me.length);

        parse_me.forEach( (element, index) => {

// console.log(index, "  ", typeof element, " ", element.tag);

           if (thisdepth > maxdepth && element.tag != "text") {
              newnodelist.push(element)
           } else {

// console.log("parsing", index, "  ", typeof element, "   ", element);

//console.log("readt to parse", element);

// console.log("from:", element);
              let this_element_parsed;
              if (toenter == "all" || toenter.includes(element.tag)) {
                  this_element_parsed = splitAtDelimiters(element, taglist, thisdepth+1, maxdepth, toenter, toprocess, element.tag)
              } else { this_element_parsed = element }
// console.log("to:", this_element_parsed);

//              newnodelist.push(this_element_parsed)
              if(Array.isArray(this_element_parsed)) {
                  this_element_parsed.forEach( (element) => { newnodelist.push(element) } );
              } else { newnodelist.push(this_element_parsed) }
            }
         });

        return newnodelist

    } else if (typeof parse_me == 'string') {

// console.log("prodeccins a string with parent_tag", parent_tag, "at depth", thisdepth, "of", maxdepth, "eith", delimiters);

        if (thisdepth > maxdepth + 2) { return parse_me }   // why +2 ?

        if (delimiters === 'spacelike') {
            if (toprocess=="all" || toprocess.includes(parent_tag)) { return recastSpacedDelimiters(parse_me) }
            else { return parse_me }
        }

        let new_content = parse_me;  // why rename it?

        if (delimiters === 'makeparagraphs') {
            if (toprocess=="all" || toprocess.includes(parent_tag)) {
                new_content = splitTextIntoParagraphs(new_content)
            } else {
                //  pass
            }
        } else {
            if (toprocess=="all" || toprocess.includes(parent_tag)) {
                new_content = splitTextAtDelimiters(new_content, delimiters)
            } else {
                //  pass
            }
        }

        return new_content

    } else {  // parse_me must be an object, but check

       if (typeof parse_me != "object") { alert("wrong category for ", parse_me) }

       let current_object = {...parse_me}

// console.log("dealing with", current_object, "of depth", thisdepth, "with max", maxdepth,toprocess, thisdepth > maxdepth, delimiters);
       if (thisdepth > maxdepth && current_object.tag != "text") { return current_object }

       let new_content = current_object.content;

       if (toenter == "all" || toprocess.includes(current_object.tag)) {
// console.log("making new_content");
           new_content = splitAtDelimiters(new_content, taglist, thisdepth+1, maxdepth, toenter, toprocess, current_object.tag)
       }
// console.log("now new_content", new_content);
       if (current_object.tag == "text" && typeof new_content == "string") { current_object.content = new_content }
       else if (current_object.tag != "text") {
          if (new_content.length == 1 && new_content[0].tag == "text") {
            current_object.content = new_content[0].content
          } else {
            current_object.content = new_content
          }
       } else {
          current_object = new_content
       }

// console.log("then current_object is", current_object);
       return current_object

    }

    alert("should be unreachable: unrecognized category for ", parse_me)
}

export const extract_lists = function(this_content, action, thisdepth=0, maxdepth=0, tags_to_process="all", parent_tag = "", root_tag="section") {

    let newnodelist = [];

    let current_new_text = "";

// console.log("extract_lists of ", action, "this_content");
    if (Array.isArray(this_content)) {
//  console.log("found an array, length", [...this_content]);

        this_content.forEach( (element, index) => {

          let this_node;
          if (typeof element == "object") {
//  console.log("going to extract", element);
              this_node = extract_lists({...element}, action, thisdepth+1, maxdepth, tags_to_process, element.tag);
          }
          else {
              this_node = extract_lists(element, action, thisdepth+1, maxdepth, tags_to_process, parent_tag);
          }

          newnodelist.push(this_node)

        })

    } else if (typeof this_content == "object") {

          // need to rethink how to handle the case where the oneline is an attribute.
          if (action == "oneline environments" && this_content.tag == "p" // &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

            if (this_content.content.match(/^\s*([A-Za-z]+):/)) {    // originally required :\s
                let split_content = this_content.content.split(":", 1);
                let new_tag = split_content[0].toLowerCase();
                new_tag = new_tag.trim();
                const new_content = this_content.content.replace(/^\s*[^:]*:\s*/,"");
                  // it might be a oneline environment, or it might be an attribute
                  // clean that up later with substructure
console.log("found oneline: X" + new_tag + "Y");
console.log("this_content.content was",this_content.content);
console.log("and new_content is",new_content);
//                if (possibleattributes.includes(new_tag)) {  // it is an attribute, of the *parent*
//                } else {

                this_content.tag = new_tag;
                this_content.content = new_content;
//                }
            }

          } else if (action == "extract li"  && this_content.tag == "p" // &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

            if (this_content.content.match(/^\s*\-+\s/)) {
                const new_tag = "li";
                const new_content = this_content.content.replace(/^\s*\-+\s*/,"");

                this_content.tag = new_tag;
                this_content.content = new_content;
                this_content.parenttag = "ul"
            } else if (this_content.content.match(/^\s*\++\s/)) {
                const new_tag = "li";
                const new_content = this_content.content.replace(/^\s*\++\s*/,"");

                this_content.tag = new_tag;
                this_content.content = new_content;
                this_content.parenttag = "ol"
            } else if (this_content.content.match(/^\s*\(*[0-9]+\.*\)*\s/)) {
                //looking for 1 or 1. or 1) or (1) or (1.)
                const new_tag = "li";
                const new_content = this_content.content.replace(/^\s*\(*[0-9]+\.*\)*\s*/,"");

                this_content.tag = new_tag;
                this_content.content = new_content;
                this_content.parenttag = "ol"
            }

          } else if (action == "xmlattributes" // &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

            var regex = new RegExp("^\\s*(" + possibleattributes.join("|") + ")[^<>]*>", "s");
            if (regex.test(this_content.content) || this_content.content.match(/^\s*[^\n<>+]*>/)) {
   console.log("maybe found an xmlattribute", this_content.content);
                if (this_content.content.match(/^\s*>/)) { //no actual attribute
                  this_content.content = this_content.content.replace(/^\s*>/, "")
                } else {
                  let this_attribute = this_content.content.split(">", 1)[0];

//  console.log("this attribute", this_attribute);
           //       this_content.content = this_content.content.replace(/^\s*[^\n<>+]*>/, "")
                  this_content.content = this_content.content.replace(/^\s*[^<>]*>/s, "")
// console.log("now this_content.content",this_content.content);
                  if ("xmlattributes" in this_content) {
                    this_content.xmlattributes += this_attribute
                  } else {
                    this_content.xmlattributes = this_attribute
                  }
                }
              }
            } else if (action == "attributes" // &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

            const this_text = this_content.content.split(/\n{2,}/);

            if (this_text.length > 1) {
              let new_content = "";
              var regex = new RegExp("^(" + possibleattributes.join("|") + ")");

              this_text.forEach( (txt) => { 
                let this_txt = txt.trim();
                if (regex.test(this_txt)) {
console.log("found an attribute", this_txt);
console.log("split1", this_txt.split(":", 1));
console.log("split2", this_txt.split(":", 2));
                    let this_attribute = this_txt.split(":", 1)[0];
                    let this_attribute_value = this_txt.split(":", 2)[1].trim();
                    this_content[this_attribute] = this_attribute_value
                } else {
                   new_content += txt
                } 
              });

              this_content.content = new_content
            }

          } else if (action == "title" // &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

            if (this_content.content.match(/^\s*\[/) ||
                 this_content.content.match(/^\s*<title>/)) {
//  console.log("maybe found a title", this_content.content);
                if (this_content.content.match(/^\s*\[/)) { //LaTeX style
                  let this_title = this_content.content.split("]", 1)[0];
                  this_title = this_title.replace(/\s*\[/,"");
                  this_content.title = this_title
                  this_content.content = this_content.content.replace(/^\s*\[[^\[\]]*\]/,"");
// console.log("added a title to ", this_content);
                } else {
                  let this_title = this_content.content.split("</title>", 1)[0];
                  this_title = this_title.replace(/\s*<title>/,"");
                  this_content.title = this_title;
                  this_content.content = this_content.content.replace(/^\s*<title>.*?<\/title>/,"");
                }
            }

          } else if (action == "label" // &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

            if (this_content.content.match(/^\s*(\\*)label{[^{}]*}/)) {
//  console.log("maybe found a label", this_content.content);
                  let this_label = this_content.content.replace(/^\s*(\\*)label{([^{}]*)}.*/s, "$2");
//console.log("found a label:", this_label);
                  this_label = sanitizeXMLattributes(this_label);
                  this_content.label = this_label;
                  this_content.content = this_content.content.replace(/^\s*(\\*)label{([^{}]*)}\s*/, "")
            }

          } else if (action == "statements"  // &&  tags_to_process.includes(this_content.tag)
                      && tags_to_process.includes(parent_tag) ) {

// console.log("inserting statements on ", this_content, "with content", {...this_content.content});

            let this_statement_content = [];
            let this_statement = {};

            if (typeof this_content.content == "string") {  // unlabeled statement and no hint/answer/etc
              this_statement_content = [{tag: "text", content: this_content.content}]
              this_statement = {tag: "statement", content: this_statement_content}
              this_content.content = [this_statement]
            } else {  // first check if ther explicitly is a statement

              let foundstatement = false;
              this_content.content.forEach( (el) => { if (el.tag == "statement") { foundstatement = true } });

              if (!foundstatement) {
                let element = "";
                let index = 0;
                for (index = 0; index < this_content.content.length; ++index) {
                    element = this_content.content[index]
                    if (hint_like.includes(element.tag)) {
                      break
                    } else {
                      this_statement_content.push(element)
                    }
                }

                this_statement = {tag: "statement", content: this_statement_content}
                let remaining_pieces = this_content.content.slice(index);
                remaining_pieces.unshift(this_statement);
                this_content.content = remaining_pieces
              }
            }

} else if (action == "statements") {
// console.log("not processing", this_content, "with parent", parent_tag, "with content", this_content.content);

// laft over from debugging, should delete

          } else if (action == "blockquotes"  &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {  // also must handle case of array

            if (this_content.content.match(/^\s*\+\+\+sTaRTbQ>/)) {
              let new_content_text = this_content.content.replace(/^\s*\+\+\+sTaRTbQ>/, "");
              new_content_text = new_content_text.replace(/\n\s*>/g, "\n");
      // need to handle the case that there are multiple paragraphs
              let new_content_separated = new_content_text.split(/\n{2,}/);
              let new_content_list = [];
              new_content_separated.forEach( (element, index) => {
                  new_content_list.push({tag: "p", content: element});
              });
              this_content.content = new_content_list;
              this_content.tag = "blockquote";
            }

          } else if (action == "substructure"  &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

// console.log("found substructure of", this_content.tag, "with", this_content.content);
              const subtags = subenvironments[this_content.tag];
// console.log("looking for:", subtags);
              const subtags_as_delims = delimitersFromList(subtags);
// console.log("looking for:", subtags_as_delims);
              const this_environment_split = splitTextAtDelimiters(this_content.content, subtags_as_delims);
// console.log("found", this_environment_split);
              this_content.content = [...this_environment_split];

          } else if (action == "clean up substructure"  &&  tags_to_process.includes(this_content.tag)
                      && Array.isArray(this_content.content)) {

             const this_tag = this_content.tag;

             new_content = [];
             this_content.content.forEach( (el) => {
                if ( subenvironments[this_tag].includes(el.tag)) {
                    new_content.push(el)
                } else if (possibleattributes.includes(el.tag)) {
                    this_content[el.tag] = el.content;
                } else {
// console.log("looking for an attribute", el);
                    if (el.tag == "text" && el.content.match(/^\s*$/) && "attributes" in el) {
                      if ("attributes" in this_content) { this_content.attributes += el.attributes }
                      else { this_content.attributes = el.attributes }
                    } else if (el.tag == "text" && el.content.match(/^\s*$/)) {
                      // pass
                    } else { console.log("problem content", el); alert("problem content: see console.log") }
                }
    });
              this_content.content = [...new_content]

          } else if (action == "extraneous math"  &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

       //  because $$ are both begin and end tags, markers were mistakenly also put
       // at the start of $$ math.  So remove them
// console.log("this_content.content AA", this_content.content);
              this_content.content = this_content.content.replace(/^\s*\+\+\+saMePaR/, "");
// console.log("this_content.content BB", this_content.content);

          } else if (action == "gather li"  &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "object" ) {  // actually, must be an array

            let this_statement_content = [];

            let element = "";
            let index = 0;
            let found_list = false;
            let new_list_content = [];
            let new_list_object = {};
            for (index = 0; index < this_content.content.length; ++index) {
                element = this_content.content[index]

                if (!found_list && element.tag != "li") {
                  this_statement_content.push(element)
                } else if (!found_list && element.tag == "li") {
                  found_list = true;
                  new_list_content = [element];
                  new_list_object.tag = element.parenttag;
//console.log("started a new list", new_list_content);
                } else if (found_list && element.tag == "li") {
                  new_list_content.push(element)
                } else if (found_list && element.tag != "li") {
                  new_list_object.content = [...new_list_content];
                  this_statement_content.push({...new_list_object});
                  found_list = false;
                  new_list_object = {};
                  new_list_content = [];
                  this_statement_content.push(element);
                }
            }

            if (found_list) { //this means the environment ended with at list, which has not been saved
              new_list_object.content = new_list_content;
              this_statement_content.push({...new_list_object})
            }

            found_list = false;
            new_list_content = [];
            new_list_object = {};

            this_content.content = this_statement_content

          } else if (action == "absorb math"  && ( tags_to_process.includes(this_content.tag) || this_content.tag == root_tag )
                      && typeof this_content.content == "object" ) {  // actually, must be an array

  // these cases can be consolidated, but it took me a while to figure out
  // what to do and I have not gone back to refactor


 // console.log("this_content.content", [...this_content.content]);
            let this_new_content = [];

            let element = "";
            let index = 0;
            for (index = 0; index < this_content.content.length; ++index) {
                element = this_content.content[index]
// console.log("element", element);
                const items_so_far = this_new_content.length;
                if (display_math_tags.includes(element.tag)) {
         // display math should not start a paragraph, so connect to previous p, if it exists
                  if (items_so_far == 0) {
         // should not happen, but just in case
                    this_new_content.push({...element})
                  } else if(this_new_content[items_so_far - 1].tag != "p") {   // again, should not happen
                    this_new_content.push({...element})
                  } else {  //last was a p, so put the display math on the end
                    if (typeof this_new_content[items_so_far - 1].content == "string") {
         //tricky case, because we need to make ti a list so we can append to it
                      this_new_content[items_so_far - 1].content = [{tag: "text", content: this_new_content[items_so_far - 1].content}];
                      this_new_content[items_so_far - 1].content.push({...element})
                    } else {
                      this_new_content[items_so_far - 1].content.push({...element})
                    }
                  }
                } else if (element.tag == "p") {
         // either connect to previous element, or not
// console.log("element", element.tag, "with", element.content);
                  if (typeof element.content == "string" && element.content.match(/\s*\+\+\+saMePaR/)) {
         // connect to previous p
                    element.content = element.content.replace(/\s*\+\+\+saMePaR\s*/,"");
// console.log("               about to push", element.content);
               //     this_new_content[items_so_far - 1].content.push(element.content)
                    this_new_content[items_so_far - 1].content.push({tag: "text", content: element.content})
                  } else if (typeof element.content == "string") {
         // simple p, not connected
// console.log("is this the wrong case?", element);
                    this_new_content.push({...element})
// console.log("now this_new_content", this_new_content);
// alert("pause");
                  } else if (element.content.length > 0 && element.content[0].tag == "text"
                                && typeof element.content[0].content == "string"
                                && element.content[0].content.match(/\s*\+\+\+saMePaR/)) {
         // also connect to previous p, but we have multiple items to connect
                    element.content[0].content = element.content[0].content.replace(/\s*\+\+\+saMePaR\s*/,"");
// console.log("               now element.content[0].content is", element.content[0].content);
                    element.content.forEach( (el) => { this_new_content[items_so_far - 1].content.push(el) });
                  } else if (element.content.length > 0) {
         // not connected
                    this_new_content.push({...element})
                  } else {
                       // empty list, so throw it away
                  }
                } else {  // some other element, so just save it
                    this_new_content.push({...element})
                }
            }

            this_content.content = [...this_new_content]

          }    // last of many special transformations

// console.log("past the special trans", action, "xx", this_content);

          let this_node = {...this_content};
// console.log("now re-extracting", this_node.content);
          this_node.content = extract_lists(this_node.content, action, thisdepth+1, maxdepth, tags_to_process, this_node.tag);

          return this_node

    } else {

      if (typeof this_content != "string") { console.log("what is it", this_content);  alert("non-object non-string: ", this_content) }

//console.log("this_tag", this_tag, tags_to_process.includes(this_tag));
      if (action == "do_nothing") { return this_content + "X"}
      else if (action == "fonts" && tags_to_process.includes(parent_tag)) {  // note: this_content already known
                                                                          // to be a string
        let new_text = "";
        new_text = this_content.replace(/\\('|"|\^|`|~|-|c|H|u|v) ?([a-zA-Z])/mg, accentedASCII);
        new_text = new_text.replace(/\\('|"|\^|`|~|-|c|H|u|v){([a-zA-Z])}/mg, accentedASCII);
// console.log("found genuine text:", this_content, "which is now",new_text);
        return new_text
      } else if (action == "texlike" && tags_to_process.includes(parent_tag)) {  // note: this_content already known
                                                                          // to be a string
        let new_text = "";
        new_text = this_content.replace(/([^-])\-\-([^-])/mg, "$1<mdash/>$2");
        new_text = new_text.replace(/\bLaTeX\b/mg, "<latex/>");
        new_text = new_text.replace(/\bTeX\b/mg, "<tex/>");
        new_text = new_text.replace(/\bPreTeXt\b/mg, "<pretext/>");
        new_text = new_text.replace(/([^\\])~/mg, "$1<nbsp/>");
            // for those who write (\ref{...}) instead of \eqref{...}
        new_text = new_text.replace(/\(\\(ref|eqref|cite){([^{}]+)}\)/g, function(x,y,z) {
                                  return '<xref ref="' + sanitizeXMLattributes(z) + '"/>'
                              });
        new_text = new_text.replace(/\\(ref|eqref|cite){([^{}]+)}/g, function(x,y,z) {
                                  return '<xref ref="' + sanitizeXMLattributes(z) + '"/>'
                              });
   //     new_text = new_text.replace(/\\fn{([^{}]+)}/g, "<fn>$1</fn>");
        new_text = new_text.replace(/\\(q|term|em|emph|m|c|fn){([^{}]+)}/g, "<$1>$2</$1>");
        new_text = new_text.replace(/\\(url|href){([^{}]+)}({|\[)([^{}\[\]]+)(\]|})/g, function(x,y,z,p,w) {
                                  return '<url href="' + z + '">' + w + '</url>'
                              });
        new_text = new_text.replace(/\\(url|href){([^{}]+)}([^{]|$)/g, function(x,y,z) {
                                  return '<url href="' + z + '"/>'
                              });
// console.log("found genuine text:", this_content, "which is now",new_text);
        return new_text

      } else { return this_content }
    }

    return newnodelist

}

