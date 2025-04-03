/* eslint no-constant-condition:0 */
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

const splitIntoParagraphs = function(nodelist, nodestoparse, peernodes) {

    if (typeof nodelist == "string") {return splitTextIntoParagraphs(nodelist) }

    let newnodelist = [];

    let current_new_text = "";

    nodelist.forEach( (element, index) => {

console.log("parsing", index);

console.log("readt to parse", element);

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

const splitAtDelimiters = function(parse_me, delimiters, toenter="all", donotenter="", processiftext="") {

    // splitting a text node means replacing it by a list of nodes
    // splitting a non-text node (which is represented by a list)
    // means replacing its content by a list of nodes

    parsecount += 1;
//    console.log("parsecount", parsecount, "   spaceline:", spacelike);

    let newnodelist = [];

    if (Array.isArray(parse_me)) {
console.log("found an array, of length", parse_me.length);

        parse_me.forEach( (element, index) => {

console.log("parsing", index);

console.log("readt to parse", element);

console.log("from:", element);
          const this_element_parsed = splitAtDelimiters(element, delimiters, toenter, donotenter, processiftext);
console.log("to:", this_element_parsed);

//          if (false && Array.isArray(this_element_parsed)) {
 //           newnodelist.push(...this_element_parsed)
//          } else {
//console.log("    CAN THIS HAPPEN?", typeof this_element_parsed, "XX", this_element_parsed);
//console.log("    content:", this_element_parsed.content);
            newnodelist.push(this_element_parsed)
//          }
        });

        return newnodelist

    } else if (typeof parse_me == 'string') {
       let new_content = parse_me;
console.log("found a string to ", delimiters);
       if (delimiters === 'spacelike') { new_content = recastSpacedDelimiters(new_content) }
       else if (delimiters === 'makeparagraphs') { new_content = splitTextIntoParagraphs(new_content) }
       else { new_content = splitTextAtDelimiters(new_content, delimiters) }

       if (new_content.length == 1 && new_content[0].tag == 'text') {
           return new_content[0].content
       } else {
           return new_content
       }

    } else {  // parse_me must be an object, but check

       if (typeof parse_me != "object") { alert("wrong category for ", parse_me) }

       if(Array.isArray(parse_me.content) && !donotenter.includes(parse_me.tag)
                 && (toenter === "all" || toenter.includes(parse_me.tag) ) ) {
           let new_content = [...parse_me.content];
           new_content = splitAtDelimiters(new_content, delimiters, toenter, donotenter, processiftext);
           parse_me.content = new_content
       } else {  // content is string, but check

           if (typeof parse_me.content != "string") { alert("expected a string: ", parse_me.content) }

           if (processiftext.includes(parse_me.tag)) {
               const new_content = splitAtDelimiters(parse_me.content, delimiters);
//               if (delimiters == 'makeparagraphs' && parse_me.tag == "text") {
//                   parse_me = new_content
//               } else {
                   parse_me.content = new_content
//               }
           }
       }
       return parse_me

    }

/*

       if (parse_me.tag == 'text') { // || parse_me.tag == 'p') {
       let new_content = {...parse_me};  // should copy object?
       new_content.content = splitAtDelimiters(new_content.content, delimiters, toenter, donotenter, processiftext);
       return new_content;
       } else if (processiftext.includes(parse_me.tag)) {  // note: not text or p, so probably wrong parsing,
                                                          // or could be blockquote, theorem, etc
console.log("found a target node", parse_me.tag);
       let new_node = {...parse_me};  // should copy object?
       new_content = splitAtDelimiters(new_node.content, delimiters, toenter, donotenter, processiftext);
//       if (false && new_content.length == 1 && new_content[0].tag == 'text') {
//           new_node.content = new_content[0].content
//       } else {
           new_node.content = new_content
//       }
       return new_node
       } else { return parse_me }
    }
*/

    alert("should be unreachable: unrecognized category for ", parse_me)

}

const splitTextAtDelimiters = function(this_content, delimiters) {

    if (typeof this_content != "string") { alert("expected string in splitTextAtDelimiters", this_content) }
    var text = this_content;
    let index;
    const data = [];

console.log(delimiters);
    const regexLeft = new RegExp(
        "(" + delimiters.map((x) => escapeRegex(x.left)).join("|") + ")"
    );

console.log("regexLeft",regexLeft);

    while (true) {
//console.log("text", text);
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
            attributes: "",
            id: "",
     //       rawData,
        });
        text = text.slice(index + delimiters[i].right.length);
    }

    if (text !== "") {
        data.push({
            tag: "text",
            content: text,
            attributes: "",
            id: "",
        });
    }

    console.log("leaving splitAtDelimiters", data, "   ", data.length);

//    if (data.length == 1 && data[0].tag == 'text') { return text }
//    else { return data }
    return data
};

const recastSpacedDelimiters = function(this_content) {

    if (typeof this_content != "string") { alert("expected a string, but got:", this_content) }
    let the_text = this_content;

console.log("Loooooooooooooooooooooooooooooooooooking at", the_text);

//    delimiters.forEach( (element, index) => {
// need to do this properly, from spacelike_inline_delimiters
// example:   {left:"_", right:"_", tag:"term"},
//        const regexp =
    the_text = the_text.replace(/(^|\s|~)\$([^\$\n]+)\$(\s|$|[.,!?;:])/mg, "$1<m>$2</m>$3");
    the_text = the_text.replace(/(^|\s)_([^_\n]+)_(\s|$|[.,!?;:])/mg, "$1<term>$2</term>$3");
    the_text = the_text.replace(/(^|\s)\*\*([^*\n]+)\*\*(\s|$|[.,!?;:])/mg, "$1<alert>$2</alert>$3");
    the_text = the_text.replace(/(^|\s)\*([^*\n]+)\*(\s|$|[.,!?;:])/mg, "$1<em>$2</em>$3");
    the_text = the_text.replace(/(^|\s)"([^"\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3");
    the_text = the_text.replace(/(^|\s)'([^'\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3");
    the_text = the_text.replace(/(^|\s)`([^`\n]+)`(\s|$|[.,!?;:])/mg, "$1<c>$2</c>$3");

    return the_text
}

const accentedASCII = function(fullstring, accent, letter) {

    return toUnicode[accent + letter]
}

const extract_lists = function(this_content, action="do_nothing", tags_to_process=[""], this_tag = "") {

    let newnodelist = [];

    let current_new_text = "";

    if (Array.isArray(this_content)) {
console.log("found an array, length", this_content.length);

        this_content.forEach( (element, index) => {

          let this_node;
          if (typeof element == "object") { this_node = {...element} }
          else { this_node = element}
          if (action == "do_nothing") { this_node = extract_lists(this_node, action, tags_to_process) }
          else { this_node = extract_lists(this_node, action, tags_to_process) }

          newnodelist.push(this_node)

        })

    } else if (typeof this_content == "object") {

          if (action == "oneline environments" &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

            if (this_content.content.match(/^\s*([A-Za-z]+):\s/)) {
                let split_content = this_content.content.split(":", 1);
                const new_tag = split_content[0].toLowerCase();
                const new_content = this_content.content.replace(/^\s*[^:]*:\s*/,"");

                this_content.tag = new_tag;
                this_content.content = new_content;
            }

          } else if (action == "extract li" &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

            if (this_content.content.match(/^\s*\-+\s/)) {
                const new_tag = "li";
                const new_content = this_content.content.replace(/^\s*-+\s*/,"");

                this_content.tag = new_tag;
                this_content.content = new_content;
            }

          } else if (action == "attributes" // &&  tags_to_process.includes(this_content.tag)
                      && typeof this_content.content == "string" ) {

            if (this_content.content.match(/^\s*[^\n<>]*>/)) {
 // console.log("maybe found an attribute", this_content.content);
                if (this_content.content.match(/^\s*>/)) { //no actual attribute
                  this_content.content = this_content.content.replace(/^\s*>/, "")
                } else {
                  let this_attribute = this_content.content.split(">", 1)[0];
                  this_content.content = this_content.content.replace(/^\s*[^\n<>]*>/, "")
                  this_content.attributes += this_attribute;  // could there already be attributes?
                }
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

            if (this_content.content.match(/^\s*\\label{/)) {
  console.log("maybe found a label", this_content.content);
                  let this_label = this_content.content.replace(/^\s*\\label{([^{}]*)}.*/s, "$1");
console.log("found a label:", this_label);
                  this_label = sanitizeForXML(this_label);
                  this_content.label = this_label;
                  this_content.content = this_content.content.replace(/^\s*\\label{([^{}]*)}/, "")
            }

          } 


          let this_node = {...this_content};
          if (action == "do_nothing") { this_node.content = extract_lists(this_node.content, action, tags_to_process, this_node.tag) }
          else { this_node.content = extract_lists(this_node.content, action, tags_to_process, this_node.tag) }

          return this_node

    } else {

      if (typeof this_content != "string") { alert("non-object non-string: ", this_content) }

//console.log("this_tag", this_tag, tags_to_process.includes(this_tag));
      if (action == "do_nothing") { return this_content + "X"}
      else if (action == "fonts" && tags_to_process.includes(this_tag)) {  // note: this_content already known
                                                                          // to be a string
        let new_text = "";
        new_text = this_content.replace(/\\('|"|\^|`|~|-|c|H|u|v) ?([a-zA-Z])/mg, accentedASCII);
        new_text = new_text.replace(/\\('|"|\^|`|~|-|c|H|u|v){([a-zA-Z])}/mg, accentedASCII);
console.log("found genuine text:", this_content, "which is now",new_text);
        return new_text
      } else if (action == "texlike" && tags_to_process.includes(this_tag)) {  // note: this_content already known
                                                                          // to be a string
        let new_text = "";
        new_text = this_content.replace(/--/mg, "<mdash/>");
        new_text = new_text.replace(/([^\\])~/mg, "$1<nbsp/>");
console.log("found genuine text:", this_content, "which is now",new_text);
        return new_text
      
      } else { return this_content }
    }

    return newnodelist

}
