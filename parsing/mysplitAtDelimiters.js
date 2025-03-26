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

const splitIntoParagraphs = function(nodelist) {

    let newnodelist = [];

    let current_new_text = "";

    nodelist.forEach( (element, index) => {

console.log("parsing", index);

console.log("readt to parse", element);

      // if we have a content node which is a paragraph peer,
      // end and save the current paragraph (if nonempty),
      // and save the new content node
      if (paragraph_peers.includes(element.tag)) {
          if (current_new_text) {
            newnodelist.push({tag: "p", content: current_new_text});
            current_new_text = "";
          }
          newnodelist.push(element);
      } else if (element.tag != "text") {
          alert("Error: non-block element while parsing paragraphs", element)
      } else {

          const this_text = element.content.split(/\n{2,}/);
console.log("found ", this_text.length, " pieces, which are:", this_text);
          this_text.forEach( (element) => {
              const this_new_text = current_new_text.concat(element);
              if (this_new_text) {  // skip empty paragraphs
                const this_new_paragraph = {tag:"p", content: this_new_text};
                newnodelist.push(this_new_paragraph)
              }
              current_new_text = ""
          })

      }
    });
    return newnodelist
}

const splitAtDelimiters = function(parse_me, delimiters, targetnodes = ['p']) {

    // splitting a text node means replacing it by a list of nodes
    // splitting a non-text node (which is represented by a list)
    // means replacing its content by a list of nodes

    parsecount += 1;
    console.log("parsecount", parsecount);

    let newnodelist = [];

    if (Array.isArray(parse_me)) {
console.log("found an array, of length", parse_me.length);

        parse_me.forEach( (element, index) => {

console.log("parsing", index);

console.log("readt to parse", element);

          const this_element_parsed = splitAtDelimiters(element, delimiters, targetnodes);

          if (false && Array.isArray(this_element_parsed)) {
            newnodelist.push(...this_element_parsed)
          } else {
console.log("    CAN THIS HAPPEN?", typeof this_element_parsed, "XX", this_element_parsed);
            newnodelist.push(this_element_parsed)
          }
        });

        return newnodelist

    } else {

console.log("about to split: ", parse_me, " using ", delimiters);

        if (typeof parse_me == 'string') {
           const new_content = splitTextAtDelimiters(parse_me, delimiters);
           if (new_content.length == 1 && new_content[0].tag == 'text') {
               return new_content[0].content
           } else { return new_content }
           return splitTextAtDelimiters(parse_me, delimiters);
        } else if (parse_me.tag == 'text' || parse_me.tag == 'p') {
      ///  wrong     parse_me.content = splitTextAtDelimiters(parse_me.content, delimiters);
           parse_me.content = splitAtDelimiters(parse_me.content, delimiters);
       //    return splitTextAtDelimiters(parse_me.content, delimiters);
           return parse_me;
        } else if (targetnodes.includes(parse_me.tag)) {
           const new_content = splitTextAtDelimiters(parse_me.content, delimiters);
           var new_node = parse_me;
           if (new_content.length == 1 && new_content[0].tag == 'text') {
               new_node.content = new_content[0].content
           } else {
               new_node.content = new_content
           }
           return new_node
        } else { return parse_me }
    }

    alert("shoudl be unreachable")

}

const splitTextAtDelimiters = function(this_content, delimiters, spacelike=false) {

    var text = this_content;
    let index;
    const data = [];

    const regexLeft = new RegExp(
        "(" + delimiters.map((x) => escapeRegex(x.left)).join("|") + ")"
    );

console.log("regexLeft",regexLeft);

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
        // ... so this always succeeds:
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
            rawData,
        });
        text = text.slice(index + delimiters[i].right.length);
    }

    if (text !== "") {
        data.push({
            tag: "text",
            content: text,
        });
    }

    console.log("leaving splitAtDelimiters", data, "   ", data.length);

//    if (data.length == 1 && data[0].tag == 'text') { return text }
//    else { return data }
    return data
};

// export default splitAtDelimiters;
