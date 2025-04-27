
// this list is not used, it serves to help keep track of tags requiring special attention
const randomtags = ["fn", "title", "statement", "reading-questions",
              "introduction", "output",
              "exercisegroup", "exercises", "mrow", "sidebyside",
              "worksheet" // is that a "division"?
];

// LaTeX, TeX, PreTeXt, [[what else?]]

const list_like = ["ol", "ul", "dl"];
const list_elements = ["li"];

const aside_like = ["aside", "historical", "biographical"];

const theorem_like = ["algorithm", "claim", "corollary", "fact", "identity", "lemma", "proposition", "theorem"];

// can definition be axiom_like?
const axiom_like = ["assumption", "axiom", "conjecture", "heuristic", "hypothesis", "principle"]

const remark_like = ["convention", "insight", "note", "observation", "remark", "warning"];

const example_like = ["example", "problem", "question"]

const definition_like = ["definition"]

const exercise_like = ["exercise"];

const proof_like = ["proof"];

const project_like = ["activity", "exploration", "investigation", "project"];

const display_math_tags = ["md", "mdn", "me", "men"];  // let's get rid of me and men

const hint_like = ["hint", "answer", "solution"];

const subpart_like = ["case", "task"];

const inlinetags = ["em", "term", "alert", "m", "q", "c"];
// also need to handle self-closing tags

const self_closing_inline_tags = ["idx", "latex", "tex", "pretext", "ie", "eg"];  //rethink this
const possibly_self_closing_inline_tags = ["url"];

const math_tags = ["m", ...display_math_tags];

let level_1_p_peers_containing_p = [ // peer of p cildren of (sub)sections
    ...aside_like, ...theorem_like, ...axiom_like, // ...list_like,  (this caused an infinite recursion)
    ...remark_like, ...example_like, ...definition_like, ...exercise_like,
    ...proof_like,
    ...project_like,
    ...hint_like,
    "blockquote", "sidebyside", "li",
    "paragraphs",
    "section"
];

const tags_containing_paragraphs = [...level_1_p_peers_containing_p, ...hint_like,
            ...subpart_like];

const display_environments = ["figure", "tabular", "listing"];
const display_subenvironments = ["image", "table", "program"];
const display_subsubenvironments = ["description", "alt"];  // is alt correct?

const other_level_1_p_peers = ["figure", "table", "tabular", "ol", "ul", "dl"];

const higher_level_tags = [ // these are inside a previously described tag, and may be subenvironments
    "caption"
];

const tags_needing_statements = [...theorem_like, ...axiom_like, ...exercise_like];

      // more precisely: can possibly contain just text
const tags_containing_text = ["text", "p",
    "fn", "em", "term", "alert", "q",
    "title", "li", "caption"];  // li can optionally contain a p or another list

                   // sit alone on a line with their content
const title_like_tags = ["title", "idx"];

const remapped_tags = [  // [latex_name, ptx_tag]
                         // could these be handled by a alias, like we did with quote -> blockquote?
    ["equation", "men"],
    ["align", "mdn"],
];

const subenvironments = {  // the tags which occun inside specific environments
   "listing": ["title","caption", "program"], // check
   "program": ["title","code"], // check
   "figure": ["title","caption","image"], // check
   "image": ["description"], // check
};

const objects_with_substructure = Object.keys(subenvironments);

//not used yet
const possibleattributes = ["source", "ref", "width", "label", "attributes"];

// start of major refactor: recognize that it takes multiple passes to
// parse into components, and this requires knowing which objects can occur
// inside of each other.

// The following lists are related by "can't be inside"

let level = [];

level.push(["paragraphs"]);
level.push(["sidebyside"]);
level.push([...project_like]);
level.push([...example_like, ...exercise_like]);
level.push([...theorem_like, ...axiom_like, ...remark_like, ...definition_like]);
level.push([...proof_like, ...hint_like]);
level.push([...subpart_like]);
level.push([...aside_like]);
level.push([...display_environments]);
level.push([...display_subenvironments]);
level.push([...display_subsubenvironments]);
level.push([...higher_level_tags]);
level.push([...list_like]);
level.push([...list_elements]);
level.push(["blockquote"]);
level.push(["equation"]);
// level[13] = [...display_math_tags];  // what about remapped_tags?

const attribute_like = [
    "extraneous math",
    "attributes",
    "title",
    "label"
]

// Tags can have many aliases
// (similar to, but less powerful, to the LaTeX `newcommand`)

let aliases = { // in the format "officialname": [list of synonyms].  Taken from SL3X
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
    "mdn" : ["equation"],
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
const toUnicode = {
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

