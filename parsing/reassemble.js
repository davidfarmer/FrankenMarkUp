
const reassemblePreTeXt = function(content) {

    if (typeof content == "string") { return content }

    const  nodelist = content;  // should we check it is an array?

    let assembled_text = "";

    nodelist.forEach( (element, index) => {

      let this_element_text = "";
      const this_tag = element.tag;
console.log("assembling a ", this_tag);
      const these_tags = outputtags[this_tag];

      this_element_text = this_element_text.concat(
                these_tags.before_begin, these_tags.begin_tag, these_tags.after_begin);
//      this_element_text = this_element_text.concat(element.content); 
      let this_new_text = reassemblePreTeXt(element.content);
      if (strip_surrounding_lines.includes(this_tag)) {  // any use case for only one end?
          this_new_text = this_new_text.replace(/^[\r\n]+/, "");
          this_new_text = this_new_text.replace(/[\r\n]+$/, "")
      }
//      this_element_text = this_element_text.concat(reassemblePreTeXt(element.content)); 
      this_element_text = this_element_text.concat(this_new_text); 
      this_element_text = this_element_text.concat(
                these_tags.before_end, these_tags.end_tag, these_tags.after_end);

      assembled_text = assembled_text.concat(this_element_text);

    });

    return assembled_text
}

