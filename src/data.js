
// this list is not used, it serves to help keep track of tags requiring special attention
export const randomtags = ["fn", "title",
              "output",
              "mrow"];

export const randomtags_containing_p = ["reading-questions", "introduction", "conclusion", "objectives", "statement", "task", "worksheet","page"];
                      // exercisegroup should be in a different category

//  const containers = ["exercisegroup", "exercises", "prefigure", "diagram", ...subenvironments["diagram"] ];  // only contain tags, not p

// LaTeX, TeX, PreTeXt, [[what else?]]

export const list_like = ["ol", "ul", "dl", "code"];   // should be pure_containers ?
export const list_elements = ["li"];

export const aside_like = ["aside", "historical", "biographical"];

export const theorem_like = ["algorithm", "claim", "corollary", "fact", "identity", "lemma", "proposition", "theorem"];

// can definition be axiom_like?
export const axiom_like = ["assumption", "axiom", "conjecture", "heuristic", "hypothesis", "principle"]

export const remark_like = ["convention", "insight", "note", "observation", "remark", "warning"];

export const example_like = ["example", "problem", "question"]

export const definition_like = ["definition"]

export const exercise_like = ["exercise"];

export const proof_like = ["proof"];

export const project_like = ["activity", "exploration", "investigation", "project"];

export const display_math_tags = ["md", "mdn", "me", "men","smen"];  // let's get rid of me and men

export const hint_like = ["hint", "answer", "solution"];

export const subpart_like = ["case", "task"];

export const inlinetags = ["em", "term", "alert", "m", "sm", "q", "c", "tag"];
// also need to handle self-closing tags

export const self_closing_inline_tags = ["idx", "latex", "tex", "pretext", "ie", "eg"];  //rethink this
export const possibly_self_closing_inline_tags = ["url"];

export const math_tags = ["m", "sm", ...display_math_tags];

export let structural_components = ["section", "subsection", "worksheet", "paragraphs"];

export let level_1_p_peers_containing_p = [ // peer of p cildren of (sub)sections
    ...aside_like, ...theorem_like, ...axiom_like, // ...list_like,  (this caused an infinite recursion)
    ...remark_like, ...example_like, ...definition_like, ...exercise_like,
    ...proof_like,
    ...project_like,
    ...hint_like,
    "blockquote", "sidebyside", "li",
];

export const tags_containing_paragraphs = [...structural_components, ...level_1_p_peers_containing_p, ...hint_like,
            ...subpart_like, ...randomtags_containing_p];

export const display_environments = ["figure", "table", "listing"];
export const display_subenvironments = ["image", "tabular", "program"];
export const display_subsubenvironments = ["latex-image", "prefigure", "description", "caption"];

export const other_level_1_p_peers = ["figure", "table", "tabular", "ol", "ul", "dl"];


export const tags_needing_statements = [...theorem_like, ...axiom_like, ...exercise_like, "task"];

      // more precisely: can possibly contain just text
export const tags_containing_text = ["text", "p",
    "fn", "em", "term", "alert", "q",
    "title", "li", "caption"];  // li can optionally contain a p or another list

                   // sit alone on a line with their content
export const title_like_tags = ["title", "idx"];

export const remapped_math_tags = [  // [latex_name, ptx_tag]
                         // could these be handled by a alias, like we did with quote -> blockquote?
    ["equation", "men"],
    ["align", "mdn"],
];

export const subenvironments = {  // the tags which occun inside specific environments
   "listing": ["caption", "program"], // check
   "figure": ["caption","image"], // check
// missing: tabular > table
   "program": ["code"], // check
   "image": ["latex-image", "description", "prefigure"], // check
   "prefigure": ["diagram"], // check
   "diagram": ["predefinition", "coordinates", "annotations"], // check
};

export const containers = ["exercisegroup", "exercises", "prefigure", "diagram", ...subenvironments["diagram"] ];

export const objects_with_substructure = Object.keys(subenvironments);

//not used yet
export const possibleattributes = ["source", "ref", "width", "margins", "label", "xmlattributes",
                           "bbox", "dimensions", "destination", "text", "xml:id", "xmlns"];

// start of major refactor: recognize that it takes multiple passes to
// parse into components, and this requires knowing which objects can occur
// inside of each other.

// The following lists are related by "can't be inside"

export let level = [];

level.push(["section"]);
level.push(["subsection"]);
level.push(["worksheet"]);
level.push(["page"]);
level.push(["paragraphs", "objectives"]);
level.push(["sidebyside"]);
level.push([...project_like]);
level.push([...example_like, ...exercise_like]);
level.push(["introduction", "conclusion"]);
level.push([...theorem_like, ...axiom_like, ...remark_like, ...definition_like]);
level.push(["task"]);
level.push(["statement"]);
level.push([...proof_like, ...hint_like]);
level.push([...subpart_like]);
level.push([...aside_like]);
level.push([...display_environments]);
level.push([...display_subenvironments]);
level.push([...display_subsubenvironments]);
level.push(["prefigure"]);
level.push(["diagram"]);
level.push(subenvironments["diagram"]);
level.push([...list_like]);
level.push([...list_elements]);
level.push(["blockquote"]);
level.push("displaymath");
level.push(["p"]);

export const attribute_like = [
    ["extraneous math", display_math_tags],
    ["workspace", [...exercise_like]],
    ["margins", ["worksheet", "sidebyside"]],
    ["margin", ["worksheet", "sidebyside"]],
    ["xmlattributes", "all"],
    ["title", "all"],
    ["label", "all"],
]

// Tags can have many aliases
// (similar to, but less powerful, to the LaTeX `newcommand`)

export let aliases = { // in the format "officialname": [list of synonyms].  Taken from SL3X
    "abstract" : ["abs","abstr"],
    "acknowledgement" : ["ack"],
    "assumption" : ["assu","ass"],
    "axiom" : ["axm"],
    "blockquote" : ["quote"],
    "claim" : ["cla"],
    "conjecture" : ["con","conj","conjec"],
    "convention" : ["conv"],
    "corollary" : ["cor","corr","coro","corol","corss"],
    "definition" : ["def","defn","dfn","defi","defin","de"],
    "ol" : ["enum","enuma","enumerit"],
    "example" : ["exam","exa","eg","exmp","expl","exm"],
    "exercise" : ["exer", "exers"],
    "fn" : ["footnote"],
    "hypothesis" : ["hyp"],
    "lemma" : ["lem","lma","lemm"],
    "notation" : ["no","nota","ntn","nt","notn","notat"],
    "observation" : ["obs"],
    "proof" : ["pf","prf","demo"],
    "proposition" : ["prop","pro","prp","props"],
    "question" : ["qu","ques","quest","qsn"],
    "remark" : ["rem","rmk","rema","bem","subrem","rems","rmks"],
    "theorem" : ["thm","theo","theor","thmss"],
    "verbatim" : ["verb"],
    "warning" : ["warn", "wrn"]
}


// the TeX \'{x} maps to 'x which becomes the key below
export const toUnicode = {
    "'a" : "á",
    "`a" : "à",
    '"a' : "ä",
    "^a" : "â",
    "~a" : "ã",
    "-a" : "ā",
    "'A" : "Á",
    "`A" : "À",
    '"A' : "Ä",
    "^A" : "Â",
    "~A" : "Ã",
    "cc" : "ç",
    "cC" : "Ç",
    "'e" : "é",
    "`e" : "è",
    '"e' : "ë",
    "^e" : "ê",
    "-e" : "ē",
    "'E" : "É",
    "`E" : "È",
    '"E' : "Ë",
    "^E" : "Ê",
    "-E" : "Ē",
    "-g" : "ḡ",
    "ug" : "ğ",
    "vg" : "ǧ",
    "-G" : "Ḡ",
    "uG" : "Ğ",
    "vG" : "Ǧ",
    "'i" : "í",
    "`i" : "ì",
    '"i' : "ï",
    "^i" : "î",
    "-i" : "ī",
    "'I" : "Í",
    "`I" : "Ì",
    '"I' : "Ï",
    "^I" : "Î",
    "-I" : "Ī",
    "~n" : "ñ",
    "~N" : "Ñ",
    "'o" : "ó",
    "`o" : "ò",
    '"o' : "ö",
    "^o" : "ô",
    "-o" : "ō",
    "~o" : "õ",
    "Ho" : "ő",
    "'O" : "Ó",
    "`O" : "Ò",
    '"O' : "Ö",
    "^O" : "Ô",
    "-O" : "Ō",
    "~O" : "Õ",
    "HO" : "Ő",
    "'u" : "ú",
    "`u" : "ù",
    '"u' : "ü",
    "^u" : "û",
    "'U" : "Ú",
    "`U" : "Ù",
    '"U' : "Ü",
    "^U" : "Û",
}

