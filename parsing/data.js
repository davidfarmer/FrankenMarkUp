
// this list is not used, it serves to help keep track of tags requiring special attention
const randomtags = ["fn", "title", "statement", "reading-questions",
              "figure", "image", "introduction", "output", "blockquote",
              "definition", "exercisegroup", "exercises", "mrow", "sidebyside",
              "worksheet", "case", "task",
              "table", "idx", "url"];

// LaTeX, TeX, PreTeXt, [[what else?]]

const list_like = ["ol", "ul", "dl"];

const aside_like = ["aside", "historical", "biographical"];

const theorem_like = ["algorithm", "claim", "corollary", "fact", "identity", "lemma", "proposition", "theorem"];

// can definition be axiom_like?
const axiom_like = ["assumption", "axiom", "conjecture", "heuristic", "hypothesis", "principle"]

const remark_like = ["convention", "insight", "note", "observation", "remark", "warning"];

const example_like = ["example", "problem", "question"]

const definition_like = ["definition", "axiom"]

const hint_like = ["hint", "answer", "solution"];

const project_like = ["activity", "exploration", "investigation", "project"]

const exercise_like = ["exercise"];

const inlinetags = ["em", "term", "alert", "m", "q", "c"];

const display_math_tags = ["md", "mdn", "me", "men"];  // let's get rid of me and men

const math_tags = ["m", [...display_math_tags]];

//  

const tags_needing_statements = [...theorem_like, ...axiom_like, ...exercise_like];

      // more precisely: can possibly contain just text
const tags_containing_text = ["text", "p",
    "fn", "em", "term", "alert", "q",
    "title", "li"];  // li can optionally contain a p or another list

                   // sit alone on a line with their content
const title_like_tags = ["title", "idx"];


// Tags can have many synonyms
// (similar to, but less powerful, to the LaTeX `newcommand`

let synonyms = [ // in the format ["newname", "officialname"]
    ["footnote", "fn"],
    ["thm", "theorem"]
];
