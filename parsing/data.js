
// this list is not used, it serves to help keep track of tags requiring special attention
const randomtags = ["fn", "title", "statement", "reading-questions",
              "introduction", "output",
              "exercisegroup", "exercises", "mrow", "sidebyside",
              "worksheet" // is that a "division"?
];

// LaTeX, TeX, PreTeXt, [[what else?]]

const list_like = ["ol", "ul", "dl"];

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

const tags_containing_paragraphs = [...level_1_p_peers_containing_p, ...hint_like, ...subpart_like];

const other_level_1_p_peers = ["figure", "image", "table", "tabular", "ol", "ul", "dl"];

//  

const tags_needing_statements = [...theorem_like, ...axiom_like, ...exercise_like];

      // more precisely: can possibly contain just text
const tags_containing_text = ["text", "p",
    "fn", "em", "term", "alert", "q",
    "title", "li"];  // li can optionally contain a p or another list

                   // sit alone on a line with their content
const title_like_tags = ["title", "idx"];

const remapped_tags = [  // [latex_name, ptx_tag]
                         // could these be handled by a alias, like we did with quote -> blockquote?
    ["equation", "men"],
    ["align", "mdn"],
];

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

