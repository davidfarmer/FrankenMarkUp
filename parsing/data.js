
// this list is not used, it serves to help keep track of tags requiring special attention
const randomtags = ["fn", "footnote", "title", "statement", "reading-questions",
              "figure", "image", "introduction", "output", "blockquote",
              "definition", "exercisegroup", "exercises", "mrow", "sidebyside",
              "worksheet", "case", "task",
              "table"];

// LaTeX, TeX, PreTeXt, [[what else?]]

const list-like = ["ol", "ul", "dl];

const aside-like = ["aside", "historical", "biographical"];

const theorem-like = ["algorithm", "claim", "corollary", "fact", "identity", "lemma", "proposition", "theorem"];

// can definition be axiom-like?
const axiom-like = ["assumption", "axiom", "conjecture", "heuristic", "hypothesis", "principle"]

const remark-like = ["convention", "insight", "note", "observation", "remark", "warning"];

const example-like = ["example", "problem", "question"]

const definition-like = ["definition", "axiom"]

const hint-like = ["hint", "answer", "solution"];

const project-like = ["activity", "exploration", "investigation", "project"]

const exercise-like = ["exercise"];

const inlinetags = ["em", "term", "alert", "m", "q", "c"];

//  

const tags_needing_statements = [...theorem-like, ...axiom-like, ...exercise-like];

const tags_containing_text = ["text", "p", "fn", "em", "term", "q"];
