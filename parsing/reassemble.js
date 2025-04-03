
const reassemblePreTeXt = function(content) {

    if (typeof content == "string") { return content }

    const  nodelist = content;  // should we check it is an array?

    let assembled_text = "";

    nodelist.forEach( (element, index) => {

      let this_element_text = "";
      const this_tag = element.tag;
//  console.log("assembling a ", this_tag, "from", element);
      const these_tags = outputtags[this_tag];
//  console.log("these_tags ", these_tags);

      this_element_text = this_element_text +
                these_tags.before_begin + these_tags.begin_tag 
      if (element.attributes) { this_element_text += " " + element.attributes.trim() }
      if (element.label) { this_element_text += " " + 'xml:id="' + element.label + '"'}
      this_element_text += these_tags.after_begin;

      if (element.title) { this_element_text += "<title>" + element.title + "</title>" + "\n" }

//      this_element_text = this_element_text.concat(element.content);
      let this_new_text = reassemblePreTeXt(element.content);
//      if (true || alone_on_line_tags.includes(this_tag) || inline_ptx_tags.includes(this_tag)) {  // any use case for only one end?
      if (this_tag != "text") {
                // what about a code block?
          this_new_text = this_new_text.replace(/^[\r\n]+/, "");
          this_new_text = this_new_text.replace(/[\r\n]+$/, "")
      }
      let mathpunctuation = "";
      if (["md","me","mdn","men"].includes(this_tag)) {
         if (this_new_text.match(/^.*(\.|,|;)\s*$/s)) {
console.log("math punctuation",this_new_text);
console.log(" the match", this_new_text.replace("^.*(\.|,|;)$", "$1"));
            this_new_text = this_new_text.replace(/\s*$/,"");
            mathpunctuation = this_new_text.slice(-1);
console.log("mathpunctuation", mathpunctuation);
            this_new_text = this_new_text.slice(0,-1)
         }
      }
//      this_element_text = this_element_text.concat(reassemblePreTeXt(element.content));
      this_element_text = this_element_text + this_new_text;
      this_element_text = this_element_text +
                these_tags.before_end + these_tags.end_tag + mathpunctuation + these_tags.after_end;

      assembled_text = assembled_text + this_element_text;

    });

    return assembled_text
}

const sanitizeXMLattributes = function(text) {

    let new_text = text;

    new_text = new_text.replace(/:/, "+");
    new_text = new_text.replace(/ /, "-");
    new_text = new_text.replace(/[^a-zA-Z0-9]\-+/, "_");

    return new_text
}
