
const reassemblePreTeXt = function(content) {

    if (typeof content == "string") { return content }

    if (!Array.isArray(content)) {
       let this_element_text = "";
       const this_tag = content.tag;
       let these_tags = outputtags[this_tag];
       this_element_text +=  these_tags.before_begin + these_tags.begin_tag;

       if ("attributes" in content && content.attributes) { this_element_text += " " + content.attributes.trim() }
       if ("label" in content && content.label) { this_element_text += " " + 'xml:id="' + content.label + '"'}
       this_element_text += these_tags.after_begin;

       if ("title" in content && content.title) { this_element_text += "<title>" + content.title + "</title>" + "\n" }

       const this_assembled_text = this_element_text + reassemblePreTeXt(content.content) +  these_tags.before_end + these_tags.end_tag + these_tags.after_end;

       return this_assembled_text
    }

    const  nodelist = content;  // should we check it is an array?

    let assembled_text = "";

    nodelist.forEach( (element, index) => {

      let this_element_text = "";
      const this_tag = element.tag;
//   console.log("assembling a ", this_tag, "from", element);
      let these_tags = outputtags[this_tag];
//  console.log("these_tags ", these_tags);
      // DANGER:  is this a bad idea, or is it okay because it
      // is reasonably to nave a plain text node (and not a node with "text" as its tag"

      this_element_text = this_element_text +
                these_tags.before_begin + these_tags.begin_tag 
      if ("attributes" in element && element.attributes) { this_element_text += " " + element.attributes.trim() }
      if ("label" in element && element.label) { this_element_text += " " + 'xml:id="' + element.label + '"'}
      this_element_text += these_tags.after_begin;

      if ("title" in element && element.title) { this_element_text += "<title>" + element.title + "</title>" + "\n" }

      let this_new_text = reassemblePreTeXt(element.content);
      if (this_tag != "text") {
                // what about a code block?
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
// console.log("math punctuation",this_new_text);
// console.log(" the match", this_new_text.replace("^.*(\.|,|;)$", "$1"));
            this_new_text = this_new_text.replace(/\s*$/,"");
            mathpunctuation = this_new_text.slice(-1);
// console.log("mathpunctuation", mathpunctuation);
            this_new_text = this_new_text.slice(0,-1)
         }
         this_new_text = convertMathSnippet(this_new_text, "LaTeX");
// console.log("this_new_text", this_new_text);
         this_new_text = sanitizeXMLstring(this_new_text)
      }
      this_element_text = this_element_text + this_new_text;
      this_element_text = this_element_text +
                these_tags.before_end + these_tags.end_tag + mathpunctuation + these_tags.after_end;

      if (this_element_text.match(/^\s*<p>\s*<\/p>\s*$/)) { this_element_text = "" }
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
