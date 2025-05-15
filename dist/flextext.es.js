const we = ["reading-questions", "introduction", "conclusion", "objectives", "statement", "task", "worksheet", "page"], ke = ["ol", "ul", "dl", "code", "mrow"], He = ["li"], xe = ["aside", "historical", "biographical"], ae = ["algorithm", "claim", "corollary", "fact", "identity", "lemma", "proposition", "theorem"], le = ["assumption", "axiom", "conjecture", "heuristic", "hypothesis", "principle"], Le = ["convention", "insight", "note", "observation", "remark", "warning"], Me = ["example", "problem", "question"], $e = ["definition"], J = ["exercise"], qe = ["proof"], Ae = ["activity", "exploration", "investigation", "project"], ee = ["md", "mdn", "me", "men", "smen"], te = ["hint", "answer", "solution"], _e = ["case", "task"], Ee = ["em", "term", "alert", "m", "sm", "q", "c", "tag"];
[...ee];
let Te = ["section", "subsection", "worksheet", "paragraphs"], Ne = [
  // peer of p cildren of (sub)sections
  ...xe,
  ...ae,
  ...le,
  // ...list_like,  (this caused an infinite recursion)
  ...Le,
  ...Me,
  ...$e,
  ...J,
  ...qe,
  ...Ae,
  ...te,
  "blockquote",
  "sidebyside",
  "li"
];
const U = [
  ...Te,
  ...Ne,
  ...te,
  ..._e,
  ...we
], Pe = ["figure", "table", "listing"], Oe = ["image", "tabular", "program"], Se = ["latex-image", "prefigure", "description", "caption"], je = ["figure", "table", "tabular", "ol", "ul", "dl"], Ve = [...ae, ...le, ...J, "task"], I = [
  "text",
  "p",
  "fn",
  "em",
  "term",
  "alert",
  "q",
  "title",
  "li",
  "caption"
], Ge = [
  // [latex_name, ptx_tag]
  // could these be handled by a alias, like we did with quote -> blockquote?
  ["equation", "men"],
  ["align", "mdn"]
], G = {
  // the tags which occun inside specific environments
  listing: ["caption", "program"],
  // check
  figure: ["caption", "image"],
  // check
  // missing: tabular > table
  program: ["code"],
  // check
  image: ["latex-image", "description", "prefigure"],
  // check
  prefigure: ["diagram"],
  // check
  diagram: ["predefinition", "coordinates", "annotations"]
  // check
}, Qe = ["exercisegroup", "exercises", "prefigure", "diagram", ...G.diagram], We = Object.keys(G), W = [
  "source",
  "ref",
  "width",
  "margins",
  "label",
  "xmlattributes",
  "bbox",
  "dimensions",
  "destination",
  "text",
  "xml:id",
  "xmlns"
];
let k = [];
k.push(["section"]);
k.push(["subsection"]);
k.push(["worksheet"]);
k.push(["page"]);
k.push(["paragraphs", "objectives"]);
k.push(["sidebyside"]);
k.push([...Ae]);
k.push([...Me, ...J]);
k.push(["introduction", "conclusion"]);
k.push([...ae, ...le, ...Le, ...$e]);
k.push(["task"]);
k.push(["statement"]);
k.push([...qe, ...te]);
k.push([..._e]);
k.push([...xe]);
k.push([...Pe]);
k.push([...Oe]);
k.push([...Se]);
k.push(["prefigure"]);
k.push(["diagram"]);
k.push(G.diagram);
k.push([...ke]);
k.push([...He]);
k.push(["blockquote"]);
k.push(["p"]);
k.push("displaymath");
k.push(["mrow"]);
const de = [
  ["extraneous math", ee],
  ["workspace", [...J]],
  ["margins", ["worksheet", "sidebyside"]],
  ["margin", ["worksheet", "sidebyside"]],
  ["xmlattributes", "all"],
  ["title", "all"],
  ["label", "all"]
];
let Ye = {
  // in the format "officialname": [list of synonyms].  Taken from SL3X
  abstract: ["abs", "abstr"],
  acknowledgement: ["ack"],
  assumption: ["assu", "ass"],
  axiom: ["axm"],
  blockquote: ["quote"],
  claim: ["cla"],
  conjecture: ["con", "conj", "conjec"],
  convention: ["conv"],
  corollary: ["cor", "corr", "coro", "corol", "corss"],
  definition: ["def", "defn", "dfn", "defi", "defin", "de"],
  ol: ["enum", "enuma", "enumerit"],
  example: ["exam", "exa", "eg", "exmp", "expl", "exm"],
  exercise: ["exer", "exers"],
  fn: ["footnote"],
  hypothesis: ["hyp"],
  lemma: ["lem", "lma", "lemm"],
  notation: ["no", "nota", "ntn", "nt", "notn", "notat"],
  observation: ["obs"],
  proof: ["pf", "prf", "demo"],
  proposition: ["prop", "pro", "prp", "props"],
  question: ["qu", "ques", "quest", "qsn"],
  remark: ["rem", "rmk", "rema", "bem", "subrem", "rems", "rmks"],
  theorem: ["thm", "theo", "theor", "thmss"],
  verbatim: ["verb"],
  warning: ["warn", "wrn"]
};
const Ke = {
  "'a": "á",
  "`a": "à",
  '"a': "ä",
  "^a": "â",
  "~a": "ã",
  "-a": "ā",
  "'A": "Á",
  "`A": "À",
  '"A': "Ä",
  "^A": "Â",
  "~A": "Ã",
  cc: "ç",
  cC: "Ç",
  "'e": "é",
  "`e": "è",
  '"e': "ë",
  "^e": "ê",
  "-e": "ē",
  "'E": "É",
  "`E": "È",
  '"E': "Ë",
  "^E": "Ê",
  "-E": "Ē",
  "-g": "ḡ",
  ug: "ğ",
  vg: "ǧ",
  "-G": "Ḡ",
  uG: "Ğ",
  vG: "Ǧ",
  "'i": "í",
  "`i": "ì",
  '"i': "ï",
  "^i": "î",
  "-i": "ī",
  "'I": "Í",
  "`I": "Ì",
  '"I': "Ï",
  "^I": "Î",
  "-I": "Ī",
  "~n": "ñ",
  "~N": "Ñ",
  "'o": "ó",
  "`o": "ò",
  '"o': "ö",
  "^o": "ô",
  "-o": "ō",
  "~o": "õ",
  Ho: "ő",
  "'O": "Ó",
  "`O": "Ò",
  '"O': "Ö",
  "^O": "Ô",
  "-O": "Ō",
  "~O": "Õ",
  HO: "Ő",
  "'u": "ú",
  "`u": "ù",
  '"u': "ü",
  "^u": "û",
  "'U": "Ú",
  "`U": "Ù",
  '"U': "Ü",
  "^U": "Û"
};
var g = {
  "+": {
    comment: [
      "¼Ó"
    ],
    alternative: [
      "plus",
      "¼Ó"
    ],
    type: "operator",
    priority: 10,
    rule: {
      "2,3": "#1 + #3"
    },
    ruleML: {
      "2,3": "#1<mo>+</mo>#3"
    },
    speech: {
      "2,3": "#1 plus #3"
    }
  },
  "-": {
    comment: [
      "¼õ"
    ],
    alternative: [
      "minus",
      "subtracts",
      "¼õ"
    ],
    type: "operator",
    priority: 10,
    mustHaveLeftArgument: !0,
    rule: {
      "2,3": "#1 - #3"
    },
    ruleML: {
      "2,3": "#1<mo>-</mo>#3"
    },
    speech: {
      "2,3": "#1 minus #3"
    }
  },
  "∘": {
    comment: [],
    alternative: [
      "of",
      "circ"
    ],
    type: "operator",
    priority: 10,
    mustHaveLeftArgument: !0,
    rule: {
      "2,3": "#1 \\circ #3"
    },
    ruleML: {
      "2,3": '#1<mo intent="of">∘</mo>#3'
    },
    speech: {
      "2,3": "#1 of #3"
    }
  },
  "⭐": {
    comment: [],
    alternative: [],
    type: "operator",
    priority: 20,
    rule: {
      "2,3": "#1 * #3"
    },
    ruleML: {
      "2,3": "#1<mo>∗</mo>#3"
    },
    speech: {
      "2,3": "#1 star #3"
    }
  },
  "😑": {
    // used for "negative", as distinct from subtraction
    comment: [],
    alternative: [],
    type: "function",
    priority: 91,
    rule: {
      "1,2": "{-#2}"
    },
    ruleML: {
      //      "1,2": "<mo>-</mo>#2"
      "1,2": "<mrow><mo>-</mo>#2</mrow>"
    },
    speech: {
      "1,2": " quantityN negative #2 Nendquantity "
    }
  },
  "⚡": {
    // funciton application
    comment: [],
    alternative: [],
    type: "operator",
    priority: 20,
    rule: {
      "2,3": "#1 #3"
    },
    ruleML: {
      "2,3": "#1<mo>&ApplyFunction;</mo>#3"
    },
    speech: {
      "2,3": "#1 of #3"
    }
  },
  "*": {
    comment: [
      "³Ë"
    ],
    alternative: [
      "multiply",
      "³Ë"
    ],
    type: "operator",
    priority: 20,
    rule: {
      "2,3": "#1 #3"
    },
    ruleML: {
      "2,3": "#1<mo>&InvisibleTimes;</mo>#3"
    },
    speech: {
      "2,3": "#1 times #3"
    }
  },
  "/": {
    comment: [
      "³ý, ³ýÒÔ"
    ],
    alternative: [
      "over",
      "divide",
      "³ý",
      "³ýÒÔ"
    ],
    type: "operator",
    wrappedarguments: !0,
    priority: 20,
    rule: {
      "2,3": "\\frac{#1}{#3}"
    },
    offpair: {
      "2,3": [1, 3]
    },
    ruleML: {
      "2,3": "<mfrac><mrow>#1</mrow><mrow>#3</mrow></mfrac>"
    },
    speech: {
      "2,3": "fraction #1 denominator #3 enddenominator"
    }
  },
  "//": {
    alternative: [],
    type: "operator",
    priority: 20,
    //    "offpair": {
    //      "2,3": [ 1, 3 ]
    //    },
    rule: {
      "2,3": "#1 / #3"
    },
    speech: {
      "2,3": " inline fraction #1 over #3 endfraction "
    },
    ruleML: {
      "2,3": "#1<mo>/</mo>#3"
    }
  },
  "=": {
    comment: [
      "µÈÓÚ"
    ],
    alternative: [
      "equal",
      "µÈÓÚ"
    ],
    type: "relation",
    priority: 0,
    //    "offpair": {
    //      "2,3": [ 1, 3 ]
    //    },
    rule: {
      "2,3": "#1 = #3"
    },
    ruleML: {
      "2,3": "#1<mo>=</mo>#3"
    },
    speech: {
      "2,3": "#1 equals #3"
    }
  },
  "🎯": {
    comment: [],
    alternative: [],
    type: "relation",
    priority: 0,
    //    "offpair": {
    //      "2,3": [ 1, 3 ]
    //    },
    rule: {
      "2,3": "#1  #3"
    },
    ruleML: {
      "2,3": "#1 #3"
    },
    speech: {
      "2,3": "#1 #3"
    }
  },
  ">=": {
    comment: [
      "´óÓÚµÈÓÚ"
    ],
    alternative: [
      "⦊=",
      "ge",
      "geq",
      "´óÓÚµÈÓÚ"
    ],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\geq #3"
    },
    ruleML: {
      "2,3": "#1<mo>≥</mo>#3"
    },
    speech: {
      "2,3": "#1 greater than or equal to #3"
    }
  },
  "<=": {
    comment: [
      "Ð¡ÓÚµÈÓÚ"
    ],
    alternative: [
      "⦉=",
      "le",
      "leq",
      "Ð¡ÓÚµÈÓÚ"
    ],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\leq #3"
    },
    ruleML: {
      "2,3": "#1<mo>≤</mo>#3"
    },
    speech: {
      "2,3": "#1 less than or equal to #3"
    }
  },
  "^": {
    comment: [
      "µ½",
      "ÖÕÖ¹Öµ",
      "´Î·½",
      "ÉÏ±ê"
    ],
    alternative: [
      "µ½",
      "ÖÕÖ¹Öµ",
      "´Î·½",
      "ÉÏ±ê"
    ],
    type: "operator",
    priority: 30,
    script: !0,
    rule: {
      // go back and compare this to markBrackets called from if (newValue.includes("#@"+(i+1))){ in tree.js
      //     "2,3": "#1^#@3"
      "2,3": "#1^{#@3}"
    },
    offpair: {
      "2,3": [3]
    },
    ruleML: {
      "2,3": "<msup><mrow>#1</mrow><mrow>#@3</mrow></msup>"
      //   "2,3": "<msup>#1<mrow>#@3</mrow></msup>"
    },
    speech: {
      "2,3": " quantityV #1 Vendquantity to the quantityE #@3 Eendquantity "
      //   "2,3": " #1 to the quantityE #@3 Eendquantity "
    }
  },
  "▲": {
    comment: [],
    alternative: [],
    type: "operator",
    priority: 30,
    script: !0,
    rule: {
      "2,3": "#1^{#@3}"
    },
    offpair: {
      "2,3": [3]
    },
    ruleML: {
      "2,3": "<msup><mrow>#1</mrow><mrow>#@3</mrow></msup>"
    },
    speech: {
      "2,3": " quantityV #1 Vendquantity derivative quantityE #@3 Eendquantity "
    }
  },
  _: {
    comment: [
      "´Ó",
      "³õÊ¼Öµ",
      "ÏÂ±ê"
    ],
    alternative: [
      "´Ó",
      "³õÊ¼Öµ",
      "ÏÂ±ê"
    ],
    type: "operator",
    priority: 30,
    script: !0,
    rule: {
      "2,3": "#1_{#@3}"
    },
    offpair: {
      "2,3": [
        3
      ]
    },
    ruleML: {
      "2,3": "<msub><mrow>#1</mrow><mrow>#@3</mrow></msub>"
    },
    speech: {
      "2,3": " quantityX #1 Xendquantity sub quantityY #@3 Yendquantity "
    }
  },
  subsup: {
    comment: [],
    alternative: [],
    type: "operator",
    priority: 30,
    script: !0,
    rule: {
      "2,4": "#1_{#@3}^{#@4}"
    },
    offpair: {
      "2,4": [3, 4]
      // subsup is 2nd out of 4, and the 3rd and 4th have implied grouping
    },
    ruleML: {
      "2,4": "<msubsup><mrow>#1</mrow><mrow>#@3</mrow><mrow>#@4</mrow></msubsup>"
    },
    speech: {
      "2,4": " quantityX #1 Xendquantity sub quantityY #@3 Yendquantity to the quantityZ #@4 Zendquantity"
    }
  },
  "^^": {
    alternative: [],
    type: "operator",
    priority: 30,
    script: !0,
    rule: {
      "2,3": "#{}^#@3 #1"
    },
    offpair: {
      "2,3": [
        3
      ]
    }
  },
  __: {
    alternative: [],
    type: "operator",
    priority: 30,
    script: !0,
    rule: {
      "2,3": "#{}_#@3 #1"
    },
    offpair: {
      "2,3": [
        3
      ]
    }
  },
  "<": {
    comment: [
      "Ð¡ÓÚ"
    ],
    alternative: [
      "⦉",
      "less than",
      "Ð¡ÓÚ"
    ],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\lt #3"
    },
    ruleML: {
      "2,3": "#1<mo>&lt;</mo>#3"
    },
    speech: {
      "2,3": "  #1 less than #3 "
    }
  },
  ">": {
    comment: [
      "´óÓÚ"
    ],
    alternative: [
      "⦊",
      "greater than",
      "´óÓÚ"
    ],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\gt #3"
    },
    ruleML: {
      "2,3": "#1<mo>&gt;</mo>#3"
    },
    speech: {
      "2,3": "  #1 greater than #3 "
    }
  },
  "\n": {
    alternative: [
      //     ""
    ],
    type: "relation",
    priority: -10,
    rule: {
      "2,3": `#1 
 #3`
    }
  },
  ",": {
    alternative: [
      //      ""
    ],
    type: "operator",
    priority: -10,
    rule: {
      "2,3": "#1,#3"
    },
    ruleML: {
      "2,3": "#1<mo>,</mo>#3"
    },
    speech: {
      "2,3": "#1 comma #3"
    }
  },
  "?": {
    alternative: [
      //      ""
    ],
    type: "symbol",
    priority: 10,
    rule: {
      "2,3": "#1,#3"
    },
    ruleML: {
      "2,3": "#1<mo>,</mo>#3"
    },
    speech: {
      "2,3": "#1 comma #3"
    }
  },
  ";": {
    alternative: [
      //      ""
    ],
    type: "operator",
    priority: -10,
    rule: {
      "2,3": "#1;#3"
    }
  },
  "|": {
    alternative: [
      //      ""
    ],
    type: "operator",
    priority: -10,
    rule: {
      "2,3": "#1 \\mid #3"
    },
    speech: {
      "2,3": "#1 divides #3"
    },
    ruleML: {
      "2,3": '#1<mo intent="divides">|</mo>#3'
    }
  },
  "+-": {
    comment: [
      "Õý¸º",
      "¼Ó¼õ"
    ],
    alternative: [
      "plusminus",
      "pm",
      "¼Ó¼õ",
      "Õý¸º"
    ],
    type: "operator",
    priority: 10,
    rule: {
      "2,3": "#1 \\pm #3"
    },
    ruleML: {
      "2,3": "#1<mo>±</mo>#3"
    },
    speech: {
      "2,3": "#1 plus-minus #3"
    }
  },
  "-+": {
    comment: [],
    alternative: [
      "minusplus",
      "mp"
    ],
    type: "operator",
    priority: 10,
    rule: {
      "2,3": "#1 \\mp #3"
    },
    ruleML: {
      "2,3": "#1<mo>∓</mo>#3"
    },
    speech: {
      "2,3": "#1 minus-plus #3"
    }
  },
  del: {
    comment: [
      "Æ«Î¢·Ö"
    ],
    alternative: [
      "partial",
      "Æ«Î¢·Ö"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\partial"
    }
  },
  grad: {
    alternative: [
      "nabla"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\nabla"
    }
  },
  "O/": {
    alternative: [
      "emptyset"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\emptyset"
    },
    speech: {
      "1,1": " empty set "
    },
    ruleML: {
      "1,1": "<mi>∅</mi>"
    }
  },
  infty: {
    comment: [
      "ÎÞÇî´ó"
    ],
    alternative: [
      "infinity",
      "oo",
      "ÎÞÇî´ó"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\infty"
    },
    speech: {
      "1,1": " infinity "
    },
    ruleML: {
      "1,1": "<mi>∞</mi>"
    }
  },
  "✂️": {
    comment: [],
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": ""
    },
    speech: {
      "1,1": ""
    },
    ruleML: {
      "1,1": ""
    }
  },
  aleph: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\aleph"
    },
    speech: {
      "1,1": " aleph "
    },
    ruleML: {
      "1,1": "<mi>א</mi>"
    }
  },
  backslash: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\backslash "
    },
    speech: {
      "1,1": " backslash "
    },
    ruleML: {
      "1,1": "<mi>\\</mi>"
    }
  },
  "'": {
    comment: [
      "ËùÒÔ"
    ],
    alternative: [
      "prime"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "'"
    },
    speech: {
      "1,1": " prime "
    },
    ruleML: {
      "1,1": "<mo>&#x2032;</mo>"
    }
  },
  ":.": {
    comment: [
      "ËùÒÔ"
    ],
    alternative: [
      "therefore",
      "thus",
      "hence",
      "ËùÒÔ"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\therefore"
    }
  },
  ":'": {
    comment: [
      "ÒòÎª"
    ],
    alternative: [
      "because",
      "since",
      "ÒòÎª"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\because"
    }
  },
  "...": {
    comment: [
      "Ê¡ÂÔºÅ"
    ],
    alternative: [
      "Ê¡ÂÔºÅ"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "#comma?[\\ldots&\\cdots]"
    }
  },
  ldots: {
    comment: [
      "µÍÊ¡ÂÔºÅ"
    ],
    alternative: [
      "µÍÊ¡ÂÔºÅ"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\ldots"
    }
  },
  cdots: {
    comment: [
      "ÖÐÊ¡ÂÔºÅ",
      "ÖÐÐÄÊ¡ÂÔºÅ"
    ],
    alternative: [
      "ÖÐÊ¡ÂÔºÅ",
      "ÖÐÐÄÊ¡ÂÔºÅ"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\cdots"
    }
  },
  vdots: {
    comment: [
      "ÊúÊ¡ÂÔºÅ"
    ],
    alternative: [
      "ÊúÊ¡ÂÔºÅ"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\vdots"
    }
  },
  ddots: {
    comment: [
      "Ð±Ê¡ÂÔºÅ"
    ],
    alternative: [
      "Ð±Ê¡ÂÔºÅ"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\ddots"
    }
  },
  frown: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\frown"
    }
  },
  diamond: {
    comment: [
      "ÁâÐÎ"
    ],
    alternative: [
      "ÁâÐÎ"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\diamond"
    }
  },
  square: {
    comment: [
      "·½ÐÎ",
      "Õý·½ÐÎ"
    ],
    alternative: [
      "·½ÐÎ",
      "Õý·½ÐÎ"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\square"
    }
  },
  CC: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\mathbb{C}"
    },
    speech: {
      "1,1": " C "
    },
    ruleML: {
      "1,1": "<mi>ℂ</mi>"
    }
  },
  NN: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\mathbb{N}"
    },
    speech: {
      "1,1": " N "
    },
    ruleML: {
      "1,1": "<mi>ℕ</mi>"
    }
  },
  QQ: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\mathbb{Q}"
    },
    speech: {
      "1,1": " Q "
    },
    ruleML: {
      "1,1": "<mi>ℚ</mi>"
    }
  },
  RR: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\mathbb{R}"
    },
    speech: {
      "1,1": " R "
    },
    ruleML: {
      "1,1": "<mi>ℝ</mi>"
    }
  },
  ZZ: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\mathbb{Z}"
    },
    speech: {
      "1,1": " Z "
    },
    ruleML: {
      "1,1": "<mi>ℤ</mi>"
    }
  },
  sqrt: {
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\sqrt{#2}"
    },
    speech: {
      "1,2": " square root of quantityZ #2 Zendquantity "
    },
    ruleML: {
      "1,2": "<msqrt><mrow>#2</mrow></msqrt>"
    }
  },
  lim: {
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\lim_{#2}"
    },
    speech: {
      "1,2": " limit of #2 endlimit "
    },
    ruleML: {
      "1,2": "<munder><mo>lim</mo><mrow>#2</mrow></munder>"
    }
  },
  quote: {
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\text{ #2 }"
    },
    speech: {
      "1,2": " #2 "
    },
    ruleML: {
      "1,2": '<mspace width="0.5em"></mspace><mtext>#2</mtext><mspace width="0.5em"></mspace>'
    }
  },
  gcd: {
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\gcd(#2)"
    },
    speech: {
      "1,2": " gcd of quantityZ #2 Zendquantity "
    },
    ruleML: {
      "1,2": "<mi>gcd</mi><mo>&ApplyFunction;</mo>(#2)"
    }
  },
  cardinality: {
    comment: [
      "»ùÊý"
    ],
    alternative: [
      "card",
      "»ùÊý"
    ],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "|#2|"
    },
    speech: {
      "1,2": " cardinality of quantityB #2 Bendquantity "
    },
    ruleML: {
      "1,2": '<mrow intent="cardinality($b)"><mo>|</mo><wrap arg="b">#2</wrap><mo>|</mo></mrow>'
    }
  },
  abs: {
    comment: [
      "¾ø¶ÔÖµ"
    ],
    alternative: [
      "absolute",
      "¾ø¶ÔÖµ"
    ],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "|#2|"
    },
    speech: {
      "1,2": " absolute value of quantityB #2 Bendquantity "
    },
    ruleML: {
      "1,2": '<mrow intent="absolute-value($absb)"><mo>|</mo><mrow arg="absb">#2</mrow><mo>|</mo></mrow>'
    }
  },
  norm: {
    comment: [],
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "|#2|"
    },
    speech: {
      "1,2": " norm of quantityB #2 Bendquantity "
    },
    ruleML: {
      "1,2": '<mrow intent="norm($normb)"><mo>|</mo><mrow arg="normb">#2</mrow><mo>|</mo></mrow>'
    }
  },
  det: {
    comment: [
      "¾ø¶ÔÖµ"
    ],
    alternative: [
      "determinant"
    ],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "|#2|"
    },
    speech: {
      "1,2": " determinant of #2 "
    },
    ruleML: {
      "1,2": '<mrow intent="determinant($detb)"><mo>|</mo><wrap arg="detb">#2</wrap><mo>|</mo></mrow>'
    }
  },
  order: {
    // for a group or group element
    comment: [
      "¾ø¶ÔÖµ"
    ],
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "|#2|"
    },
    speech: {
      "1,2": " order of #2 "
    },
    ruleML: {
      "1,2": '<mrow intent="order($orderb)"><mo>|</mo><wrap arg="orderb">#2</wrap><mo>|</mo></mrow>'
    }
  },
  span: {
    comment: [],
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\langle #2\\rangle"
    },
    speech: {
      "1,2": " span of #2 "
    },
    ruleML: {
      "1,2": '<mrow intent="span($c)"><mo>⟨</mo><mrow arg="c">#2</mrow><mo>⟩</mo></mrow>'
    }
  },
  vector: {
    comment: [],
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\langle #2\\rangle"
    },
    speech: {
      "1,2": "coordinate vector #2 endvector"
    },
    ruleML: {
      "1,2": '<mrow intent="coordinate-vector($c)"><mo>⟨</mo><mrow arg="c">#2</mrow><mo>⟩</mo></mrow>'
    }
  },
  anglebrackets: {
    comment: [],
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\langle #2\\rangle"
    },
    speech: {
      "1,2": " anglebrackets #2 endanglebrackets "
    },
    ruleML: {
      "1,2": '<mrow intent="angle-brackets($c)"><mo>⟨</mo><mrow arg="c">#2</mrow><mo>⟩</mo></mrow>'
    }
  },
  setof: {
    comment: [],
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\{#2\\}"
    },
    speech: {
      "1,2": "set #2 endset "
    },
    ruleML: {
      "1,2": '<mrow intent="set($d)"><mo>{</mo><mrow arg="d">#2</mrow><mo>}</mo></mrow>'
    }
  },
  floor: {
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\lfloor #2 \\rfloor"
    },
    speech: {
      "1,2": "floor of #2 endfloor"
    },
    ruleML: {
      "1,2": '<mrow intent="floor($e)"><mo>⌊</mo><mrow arg="e">#2</mrow><mo>⌋</mo></mrow>'
    }
  },
  ceiling: {
    alternative: [
      "ceil"
    ],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\lceiling #2 \\rceiling"
    }
  },
  bigO: {
    alternative: [],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "O#2"
    },
    speech: {
      "1,2": "big-Oh of #2"
    },
    ruleML: {
      "1,2": '<mi intent="bigO">O</mi><mo>&ApplyFunction;</mo>#2'
    }
  },
  log: {
    alternative: [],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "\\log #2"
    },
    speech: {
      "1,2": "log of #2"
    },
    ruleML: {
      "1,2": "<mi>log</mi><mo>&ApplyFunction;</mo>#2"
    }
  },
  llog: {
    alternative: [],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "\\log_2 #2"
    },
    speech: {
      "1,2": "log log of #2"
    },
    ruleML: {
      "1,2": '<msub><mi>log</mi><mn intent=":index">2</mn></msub><mo>&ApplyFunction;</mo>#2'
    }
  },
  lllog: {
    alternative: [],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "\\log_3 #2"
    },
    speech: {
      "1,2": "log log log of #2"
    },
    ruleML: {
      "1,2": '<msub><mi>log</mi><mn intent=":index">3</mn></msub><mo>&ApplyFunction;</mo>#2'
    }
  },
  baselog: {
    alternative: [],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "\\log"
    },
    speech: {
      "1,2": "log "
    },
    ruleML: {
      "1,2": "log"
    }
  },
  ln: {
    alternative: [
      "ln"
    ],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "\\ln #2"
    },
    speech: {
      "1,2": "natural log of #2"
    },
    ruleML: {
      "1,2": "<mi>ln</mi><mo>&ApplyFunction;</mo>#2"
    }
  },
  baseln: {
    alternative: [],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "\\ln"
    },
    speech: {
      "1,2": "natural log "
    },
    ruleML: {
      "1,2": "ln"
    }
  },
  /*
    "sin": {   // ??? delete this and cos because handled as a category
      "alternative": [
        "sine"
      ],
      "type": "function",
      "priority": 15,
      "rule": {
        "1,2": "\\sin #2"
      },
      "speech": {
        "1,2": "sine #2"
      },
      "ruleML": {
        "1,2": "<mi>sin</mi><mo>&ApplyFunction;</mo>#2"
      }
    },
    "cos": {
      "alternative": [
        "cosine"
      ],
      "type": "function",
      "priority": 15,
      "rule": {
        "1,2": "\\cos #2"
      }
    },
  */
  root: {
    alternative: [],
    type: "function",
    priority: 55,
    extraArgument: 1,
    offpair: {
      "1,3": [
        2,
        3
      ]
    },
    rule: {
      "1,3": "\\sqrt[#2]{#3}",
      "1,2": "\\sqrt{#2}"
    }
  },
  frac: {
    alternative: [],
    type: "function",
    priority: 20,
    extraArgument: 1,
    offpair: {
      "1,3": [2, 3]
    },
    rule: {
      "1,3": "\\frac{#2}{#3}",
      "1,2": "\\frac{#2@1}{#2@-1}"
    }
  },
  summm: {
    comment: [
      "×ÜºÍ",
      "ÇóºÍ"
    ],
    alternative: [
      "summation",
      "×ÜºÍ",
      "ÇóºÍ"
    ],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\sum{#2}"
    }
  },
  fundef: {
    // as in   f : a -> b
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,4": [1, 2, 3, 4]
    },
    extraArgument: 2,
    rule: {
      "1,4": "#2\\,:\\, #3 	o #4"
    },
    speech: {
      "1,4": "function #2 from #3 to #4 "
    },
    ruleML: {
      "1,4": "<mrow>#2<mo>:</mo>#3<mo>→</mo>#4</mrow>"
    }
  },
  congruentmod: {
    // as in   a \equiv b (mod c)
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,4": [1, 2, 3, 4]
    },
    extraArgument: 2,
    rule: {
      "1,4": "#2\\equiv #3 \\pmod  #4"
    },
    speech: {
      "1,4": "#2 congruent to #3 modulo #4 "
    },
    ruleML: {
      "1,4": '<mrow>#2<mo>≡</mo>#3<mspace width="0.5em"></mspace><mo>(</mo><mi>mod</mi><mspace width="0.25em"></mspace>#4<mo>)</mo></mrow>'
    }
  },
  notcongruentmod: {
    // as in   a \equiv b (mod c)
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,4": [1, 2, 3, 4]
    },
    extraArgument: 2,
    rule: {
      "1,4": "#2\\not\\equiv #3 \\pmod  #4"
    },
    speech: {
      "1,4": "#2 not congruent to #3 modulo #4 "
    },
    ruleML: {
      "1,4": '<mrow>#2<mo>≢</mo>#3<mspace width="0.5em"></mspace><mo>(</mo><mi>mod</mi><mspace width="0.25em"></mspace>#4<mo>)</mo></mrow>'
    }
  },
  wrapper: {
    // a trick to group quantities without adding parentheses
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [2]
    },
    rule: {
      "1,2": " #2 "
    },
    speech: {
      "1,2": "#2"
    },
    ruleML: {
      "1,2": "#2"
    }
  },
  opwrap: {
    // a large operator, like sum_n  , which acts like a function
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [2],
      //     "1,3": [ 2, 3 ]
      "1,3": [2]
    },
    //    "extraArgument": 1,
    rule: {
      "1,2": " #2 ",
      "1,3": " #2{#3}"
    },
    speech: {
      "1,2": "#2",
      "1,3": "#2 #3 "
    },
    ruleML: {
      "1,2": "#2",
      "1,3": "#2<mrow>#3</mrow>"
    }
  },
  limsop: {
    // large operators with lower ad upper limits, such as \sum and \prod, but not integrals
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,3": [2, 3],
      // lower limit
      "1,4": [1, 2, 3, 4],
      //lower and upper lim
      "1,5": [1, 2, 3, 4, 5]
      // op, lower lim, upper lim, summand ???
    },
    extraArgument: 2,
    rule: {
      "1,4": "#2_{#3}^{#4}"
    },
    speech: {
      "1,4": " #2 from #3 to #4 "
    },
    ruleML: {
      "1,4": "<munderover>#2<mrow>#3</mrow><mrow>#4</mrow></munderover>"
    }
  },
  llimop: {
    // large operators with limits, such as \sum and \prod, but not integrals
    // lower lim only
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,3": [2, 3]
      // lower limit
      // experiment      "1,4": [ 2, 3, 4 ]  // lower limit and argument
    },
    extraArgument: 1,
    rule: {
      "1,3": "#2_{#3}"
      // experiment      "1,4": "#2_{#3} #4"
    },
    speech: {
      "1,3": " #2 over #3 "
      // experiment     "1,4": " #2 over #3 of #4 "
    },
    ruleML: {
      "1,3": "<munder>#2<mrow>#3</mrow></munder>"
      // experiment      "1,4": "<munder><mo>#2</mo><mrow>#3</mrow></munder>#4"
    }
  },
  functionpower: {
    // like f^2 as in log^2(x), which literally means log(x)^2,
    // but that is not how people write it
    // currently messed up wrt number of arguments: not all of the below can happen
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      //      "1,2": [ 2 ],
      //      "1,3": [ 2, 3 ],
      "1,4": [2, 3]
    },
    extraArgument: 2,
    rule: {
      //      "1,2": "#1^{#2}",
      //      "1,3": "#2^{#3}",
      "1,4": "#2^{#3}#4"
      // experiment      "1,4": "#2_{#3} #4"
    },
    speech: {
      //      "1,2": " #1 power #2 ",
      //      "1,3": " #2 power #3 ",
      "1,4": " #2 power #3 of quantityF #4 Fendquantity "
      // experiment     "1,4": " #2 over #3 of #4 "
    },
    ruleML: {
      //      "1,2": "<msup><mi>#1</mi><mrow>#2</mrow></msup>",
      //      "1,3": "<msup><mi>#2</mi><mrow>#3</mrow></msup>",
      // the <mi>#2</mi> looks wrong, but the output is correct.  Maybe from the "base" version of the function?
      "1,4": "<msup><mi>#2</mi><mrow>#3</mrow></msup><mo>&ApplyFunction;</mo>#4"
      //  "1,4": "<msup><mi>#2</mi><mrow>#3</mrow></msup><mo>&ApplyFunction;</mo><mrow>#4</mrow>",
    }
  },
  functionsubscript: {
    // like J_0(x) or log_2(x)  (actually, only for special functions)
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,4": [2, 3]
    },
    extraArgument: 2,
    rule: {
      "1,4": "#2_{#3}#4"
      // experiment      "1,4": "#2_{#3} #4"
    },
    speech: {
      "1,4": " #2 sub #3 of quantityF #4 Fendquantity "
    },
    ruleML: {
      "1,4": "<msub><mi>#2</mi><mrow>#3</mrow></msub><mo>&ApplyFunction;</mo>#4"
      //     "1,4": "<msub><mi>#2</mi><mrow>#3</mrow></msub><mo>&ApplyFunction;</mo><mrow>#4</mrow>",
    }
  },
  bigop: {
    // large operators with no limits, such as \sum and \prod, but not integrals
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [2]
    },
    rule: {
      "1,2": " #2 "
    },
    speech: {
      "1,2": " #2 "
    },
    ruleML: {
      "1,2": "#2"
      // how to say it is big?
    }
  },
  intlims: {
    // various integrals
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,6": [2, 3, 4, 5, 6]
      // op, lower lim, upper lim, "summand"
    },
    extraArgument: 4,
    rule: {
      "1,6": "#2_{#3}^{#4} #5 \\,d#6"
    },
    speech: {
      "1,6": " #2 from #3 to #4 of #5 d#6 "
    },
    ruleML: {
      "1,6": '<mrow><munderover>#2<mrow>#3</mrow><mrow>#4</mrow></munderover>#5<mspace width="0.167em"></mspace><mo>&dd;</mo>#6</mrow>'
    }
  },
  intlimsweight: {
    // various integrals
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,7": [2, 3, 4, 5, 6, 7]
      // op, lower lim, upper lim, "summand"
    },
    extraArgument: 5,
    rule: {
      "1,7": "#2_{#3}^{#4} #5 \\,\\frac{d#6}{#7}"
    },
    speech: {
      "1,7": " #2 from #3 to #4 of #5 d#6 over #7 "
    },
    ruleML: {
      "1,7": '<mrow><munderover>#2<mrow>#3</mrow><mrow>#4</mrow></munderover>#5<mspace width="0.167em"></mspace><mfrac><mrow><mo>&dd;</mo>#6</mrow><mrow>#7</mrow></mfrac></mrow>'
    }
  },
  intllimweight: {
    // various integrals
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,6": [2, 3, 4, 5, 6]
      // op, lower lim, upper lim, "summand"
    },
    extraArgument: 4,
    rule: {
      "1,6": "#2_{#3} #4 \\,\\frac{d#5}{#6}"
    },
    speech: {
      "1,6": " #2 over #3 of #4 d#5 over #6 "
    },
    ruleML: {
      "1,6": '<mrow><munder>#2<mrow>#3</mrow></munder>#4<mspace width="0.167em"></mspace><mfrac><mrow><mo>&dd;</mo>#5</mrow><mrow>#6</mrow></mfrac></mrow>'
    }
  },
  intllim: {
    // various integrals
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,5": [2, 3, 4, 5]
      // op, lower lim, "integrand",  var
    },
    extraArgument: 3,
    rule: {
      "1,5": "#2_{#3} #4 \\,d#5"
    },
    speech: {
      "1,5": " #2 over #3 of #4 d#5 "
    },
    ruleML: {
      "1,5": '<mrow><munder>#2<mrow>#3</mrow></munder>#4<mspace width="0.167em"></mspace><mo>&dd;</mo>#5</</mrow>'
    }
  },
  int: {
    alternative: [
      "integral"
    ],
    type: "function",
    priority: 55,
    family: [
      "int",
      "oint"
    ],
    pairedArgument: "d",
    rule: {
      "1,2": "\\int #2",
      "1,3": "\\int #2 \\,d#3",
      "1,5": "\\int_{#2}^{3} #4 \\,d#5"
    },
    speech: {
      "1,2": "integral  #2",
      "1,3": "integral  #2 d#3",
      "1,5": "integral from #2 to #3 of #4 d#5"
    },
    ruleML: {
      "1,2": "<mo>∫</mo>#2",
      "1,3": '<mo>∫</mo>#2<mspace width="0.167em"></mspace><mo>&dd;</mo>#3'
    }
  },
  oint: {
    alternative: [],
    type: "function",
    priority: 55,
    family: [
      "int",
      "oint"
    ],
    pairedArgument: "d",
    rule: {
      "1,3": "\\oint #2 \\,d#3",
      "1,2": "\\oint #2"
    }
  },
  cup: {
    alternative: [
      "union"
    ],
    type: "operator",
    priority: 10,
    rule: {
      "2,3": "#1 \\cup #3"
    },
    speech: {
      "2,3": " #1 union #3"
    },
    ruleML: {
      "2,3": "#1<mo>∪</mo>#3"
    }
  },
  cap: {
    alternative: [
      "intersect",
      "intersection"
    ],
    type: "operator",
    priority: 10,
    rule: {
      "2,3": "#1 \\cap #3"
    },
    speech: {
      "2,3": " #1 intersect #3"
    },
    ruleML: {
      "2,3": "#1<mo>∩</mo>#3"
    }
  },
  in: {
    alternative: ["element"],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\in #3"
    },
    speech: {
      "2,3": "#1 in #3"
    },
    ruleML: {
      "2,3": "#1<mo>&#x2208;</mo>#3"
    }
  },
  notin: {
    alternative: ["!in"],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\notin #3"
    },
    speech: {
      "2,3": "#1 not in #3"
    },
    ruleML: {
      "2,3": "#1<mo>∉</mo>#3"
    }
  },
  subset: {
    alternative: ["subset"],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\subset #3"
    },
    speech: {
      "2,3": "#1 subset #3"
    },
    ruleML: {
      "2,3": "#1<mo>⊂</mo>#3"
    }
  },
  neq: {
    alternative: ["!="],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\not= #3"
    },
    speech: {
      "2,3": "#1 not equals #3"
    },
    ruleML: {
      "2,3": "#1<mo>≠</mo>#3"
    }
  },
  and: {
    alternative: [],
    type: "operator",
    priority: 10,
    rule: {
      "2,3": "#1 \\land #3"
    }
  },
  or: {
    alternative: [],
    type: "operator",
    priority: 10,
    rule: {
      "2,3": "#1 \\lor #3"
    }
  },
  forall: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\forall"
    }
  },
  exist: {
    alternative: [
      "exists"
    ],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\exists"
    },
    speech: {
      "1,1": " there exists "
    },
    ruleML: {
      "1,1": "<mi>∃</mi>"
    }
  },
  not: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\neg"
    }
  },
  perp: {
    //  need something separate for V^perp
    alternative: [
      "perpendicular",
      "bot"
    ],
    type: "operator",
    priority: 25,
    rule: {
      "2,3": "#1 \\perp #3"
    },
    speech: {
      "2,3": "#1 perpendicular to #3"
    },
    ruleML: {
      "2,3": '<mrow>#1<mo intent="perpendicular">⊥</mo>#3</mrow>'
    }
  },
  dot: {
    alternative: [],
    type: "operator",
    priority: 25,
    rule: {
      "2,3": "#1 \\cdot #3"
    },
    speech: {
      "2,3": "#1 dot #3"
    },
    ruleML: {
      "2,3": '<mrow>#1<mo intent="dot-product">⋅</mo>#3</mrow>'
    }
  },
  product: {
    // partial conflict with \prod_p L_p(s^{-s})
    alternative: [],
    type: "operator",
    priority: 25,
    rule: {
      "2,3": "#1 \\times #3"
    },
    speech: {
      "2,3": " #1 product #3 "
    },
    ruleML: {
      "2,3": '<mrow>#1<mo intent="direct-product">×</mo>#3</mrow>'
    }
  },
  times: {
    alternative: ["×"],
    type: "operator",
    priority: 25,
    rule: {
      "2,3": "#1 \\times #3"
    },
    speech: {
      "2,3": "#1 times #3"
    },
    ruleML: {
      "2,3": '<mrow>#1<mo intent="times">×</mo>#3</mrow>'
    }
  },
  by: {
    alternative: [],
    type: "operator",
    priority: 25,
    rule: {
      "2,3": "#1 \\times #3"
    },
    speech: {
      "2,3": "#1 by #3"
    },
    ruleML: {
      "2,3": '<mrow>#1<mo intent="dimension-product">×</mo>#3</mrow>'
    }
  },
  cross: {
    alternative: [],
    type: "operator",
    priority: 20,
    rule: {
      "2,3": "#1 \\times #3"
    },
    speech: {
      "2,3": " #1 cross #3 "
    },
    ruleML: {
      "2,3": '<mrow>#1</mrow><mo intent="cross-product">×</mo><mrow>#3</mrow>'
    }
  },
  oointerval: {
    alternative: [],
    type: "operator",
    delimitedarguments: !0,
    // omit the temporary () around the input arguments
    priority: 20,
    // experiment, so we get mrows for complicated arguments
    rule: {
      "2,3": "(#1, #3)"
    },
    speech: {
      "2,3": " open interval from #1 to #3 endinterval "
    },
    ruleML: {
      "2,3": '<mrow intent="open-interval($f, $g)"><mo>(</mo><wrap arg="f">#1</wrap><mo>,</mo><wrap arg="g">#3</wrap><mo>)</mo></mrow>'
    }
  },
  innergcd: {
    alternative: [],
    type: "operator",
    delimitedarguments: !0,
    // omit the temporary () around the input arguments
    priority: 20,
    // experiment, so we get mrows for complicated arguments
    rule: {
      "2,3": "(#1, #3)"
    },
    speech: {
      "2,3": " gcd of #1 comma #3 endgcd "
    },
    ruleML: {
      "2,3": '<mrow intent="gcd($f, $g)"><mo>(</mo><wrap arg="f">#1</wrap><mo>,</mo><wrap arg="g">#3</wrap><mo>)</mo></mrow>'
    }
  },
  cartesianpoint: {
    alternative: [],
    type: "operator",
    delimitedarguments: !0,
    // omit the temporary () around the input arguments
    priority: 20,
    rule: {
      "2,3": "(#1, #3)"
    },
    speech: {
      "2,3": " point with coordinates #1 comma #3 endpoint "
    },
    ruleML: {
      "2,3": '<mrow intent="coordinate($f, $g)"><mo>(</mo><wrap arg="f">#1</wrap><mo>,</mo><wrap arg="g">#3</wrap><mo>)</mo></mrow>'
    }
  },
  innerproduct: {
    alternative: [],
    type: "operator",
    delimitedarguments: !0,
    // omit the temporary () around the input arguments
    priority: 20,
    rule: {
      "2,3": "\\langle #1, #3\\rangle "
    },
    speech: {
      "2,3": " inner product of #1 and #3 endinnerproduct "
    },
    ruleML: {
      "2,3": '<mrow intent="inner-product($f, $g)"><mo>⟨</mo><wrap arg="f">#1</wrap><mo>,</mo><wrap arg="g">#3</wrap><mo>⟩</mo></mrow>'
    }
  },
  twovector: {
    alternative: [],
    type: "operator",
    delimitedarguments: !0,
    // omit the temporary () around the input arguments
    priority: 20,
    rule: {
      "2,3": "\\langle #1, #3\\rangle "
    },
    speech: {
      "2,3": " vector #1 comma #3 endvector "
    },
    ruleML: {
      "2,3": '<mrow intent="vector($va, $vb)"><mo>⟨</mo><wrap arg="va">#1</wrap><mo>,</mo><wrap arg="vb">#3</wrap><mo>⟩</mo></mrow>'
    }
  },
  grouppresentation: {
    alternative: [],
    type: "operator",
    delimitedarguments: !0,
    // omit the temporary () around the input arguments
    priority: 20,
    rule: {
      "2,3": "\\langle #1\\ |\\  #3\\rangle "
    },
    speech: {
      "2,3": " group generated by #1 with relations #3 endrelations "
    },
    ruleML: {
      "2,3": '<mrow intent="group-presentation($gpa, $gpb)"><mo>⟨</mo><wrap arg="gpb">#1</wrap><mo stretchy="true">|</mo><wrap arg="gpb">#3</wrap><mo>⟩</mo></mrow>'
    }
  },
  setbuilder: {
    alternative: [],
    type: "operator",
    delimitedarguments: !0,
    // omit the temporary () around the input arguments
    priority: 20,
    rule: {
      "2,3": "\\{ #1\\ |\\  #3\\} "
    },
    speech: {
      "2,3": " set of #1 such that #3 endset "
    },
    ruleML: {
      "2,3": '<mrow intent="set-such-that($sba, $sbb)"><mo>{</mo><mrow arg="sba">#1</mrow><mo>|</mo><mrow arg="sbb">#3</mrow><mo>}</mo></mrow>'
    }
  },
  braket: {
    alternative: [],
    type: "operator",
    delimitedarguments: !0,
    // omit the temporary () around the input arguments
    priority: 20,
    rule: {
      "2,3": "\\langle #1 |  #3\\rangle "
    },
    speech: {
      "2,3": " bra-ket of #1 and #3 endbra-ket "
    },
    ruleML: {
      "2,3": '<mrow intent="bra-ket($bka, $bkb)"><mo>⟨</mo><wrap arg="bka">#1</wrap><mo>|</mo><wrap arg="bkb">#3</wrap><mo>⟩</mo></mrow>'
    }
  },
  isom: {
    alternative: [
      "isomorphic"
    ],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\cong #3"
    },
    speech: {
      "2,3": " #1 isomorphic to #3  "
    },
    ruleML: {
      "2,3": "#1<mo>≅</mo>#3"
    }
  },
  to: {
    alternative: ["->", "rightarrow"],
    // -> and similar below are intercepted by the preprocessor
    type: "operator",
    priority: 20,
    rule: {
      "2,3": "#1 \\to #3"
    },
    speech: {
      "2,3": " #1 to #3  "
    },
    ruleML: {
      "2,3": "#1<mo>→</mo>#3"
    }
  },
  longrightarrow: {
    alternative: ["-->"],
    type: "operator",
    priority: 20,
    rule: {
      "2,3": "#1 \\longrightarrow #3"
    },
    speech: {
      "2,3": " #1 long-to #3  "
    },
    ruleML: {
      "2,3": "#1<mo>⟶</mo>#3"
    }
  },
  from: {
    alternative: ["<-", "leftarrow"],
    type: "operator",
    priority: 20,
    rule: {
      "2,3": "#1 \\leftarrow #3"
    },
    speech: {
      "2,3": " #1 from #3  "
    },
    ruleML: {
      "2,3": "#1<mo>←</mo>#3"
    }
  },
  longleftarrow: {
    alternative: ["<--"],
    type: "operator",
    priority: 20,
    rule: {
      "2,3": "#1 \\longleftarrow #3"
    },
    speech: {
      "2,3": " #1 long-from #3  "
    },
    ruleML: {
      "2,3": "#1<mo>⟵</mo>#3"
    }
  },
  mapsto: {
    alternative: [],
    type: "operator",
    priority: 20,
    rule: {
      "2,3": "#1 \\mapsto #3"
    },
    speech: {
      "2,3": " #1 maps to #3  "
    },
    ruleML: {
      "2,3": "#1<mo>↦</mo>#3"
    }
  },
  "~": {
    alternative: ["asymp", "asymptotic"],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\sim #3"
    },
    speech: {
      "2,3": " #1 asymptotic to #3  "
    },
    ruleML: {
      "2,3": '#1<mo intent="asymptotic">~</mo>#3'
    }
  },
  "≈": {
    alternative: ["approx", "approximate", "approximately"],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\approx #3"
    },
    speech: {
      "2,3": " #1 approximately equal to #3  "
    },
    ruleML: {
      "2,3": '#1<mo intent="approximately">≈</mo>#3'
    }
  },
  cong: {
    alternative: ["congruent"],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\equiv #3"
    },
    speech: {
      "2,3": " #1 congruent to #3  "
    },
    ruleML: {
      "2,3": '#1<mo intent="congruent">≡</mo>#3'
    }
  },
  "!cong": {
    alternative: ["!congruent"],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\not\\equiv #3"
    },
    speech: {
      "2,3": " #1 not congruent to #3  "
    },
    ruleML: {
      "2,3": '#1<mo intent="not-congruent">≢</mo>#3'
    }
  },
  equiv: {
    alternative: ["equivalent"],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\equiv #3"
    },
    speech: {
      "2,3": " #1 equivalent to #3  "
    },
    ruleML: {
      "2,3": '#1<mo intent="equivalent">≡</mo>#3'
    }
  },
  identical: {
    alternative: [],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\equiv #3"
    },
    speech: {
      "2,3": " #1 identical to #3  "
    },
    ruleML: {
      "2,3": '#1<mo intent="identical">≡</mo>#3'
    }
  },
  ":=": {
    alternative: ["coloneq", "coloneqq"],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\coloneqq #3"
    },
    speech: {
      "2,3": " #1 defined as #3  "
    },
    ruleML: {
      "2,3": '#1<mo intent="defined-as">≔</mo>#3'
    }
  },
  ":": {
    alternative: ["colon"],
    type: "relation",
    priority: 0,
    rule: {
      "2,3": "#1 \\colon #3"
    },
    speech: {
      "2,3": " #1 colon #3  "
    },
    ruleML: {
      "2,3": "#1<mo>:</mo>#3"
    }
  },
  "cases:": {
    alternative: [],
    type: "multiline",
    lineBreak: !0,
    params: [
      "caseEnvironment"
    ],
    note: "cases",
    MathMLnote: "cases"
  },
  casesline: {
    // as in    x+1 if x < 8
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,4": [1, 2, 3, 4]
    },
    extraArgument: 2,
    rule: {
      "1,4": "#2 & \\text{ #3 } #4"
    },
    speech: {
      "1,4": "#2 #3 #4 "
    },
    ruleML: {
      "1,4": `<mtr><mtd>#2</mtd><mtd style="text-align: left"><mspace width="1em"></mspace><mtext>#3</mtext><mspace width="0.5em"></mspace>#4</mtd></mtr>
`
    }
  },
  "system:": {
    alternative: [],
    type: "multiline",
    params: [
      "system",
      "&beforeFirstRelation"
    ],
    //    "seperateOut": true,  // don;t know what this did (but it put closing math delimiters in the wrong place)
    absorbEmptyLine: !0,
    emptyLineBeforeIndent: !0,
    note: "mdn",
    speechnote: "system",
    MathMLnote: "system"
  },
  "align:": {
    alternative: [],
    type: "multiline",
    params: [
      //     "system",
      "align",
      "&atMarker"
      // needs to not be &beforeFirstRelation
    ],
    //    "seperateOut": true,  // don;t know what this did (but it put closing math delimiters in the wrong place)
    absorbEmptyLine: !0,
    emptyLineBeforeIndent: !0,
    //    "note": "align",
    note: "mdn",
    speechnote: "align",
    MathMLnote: "align"
  },
  "derivation:": {
    alternative: [],
    type: "multiline",
    params: [
      "derivation",
      // should be "derivation", but that is broken at the moment
      "&beforeFirstRelation"
    ],
    //    "seperateOut": true,  // don;t know what this did (but it put closing math delimiters in the wrong place)
    absorbEmptyLine: !0,
    emptyLineBeforeIndent: !0,
    note: "mdn",
    speechnote: "derivation",
    MathMLnote: "derivation"
  },
  systemline: {
    // as in   y^2 <= x^3 + a x + b
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,4": [1, 2, 3, 4]
    },
    extraArgument: 2,
    rule: {
      //   "1,4": "#2  #3 \\ampXX  #4"
      "1,4": `<mrow>#2  #3   #4</mrow>
`
      // should have \\amp, but that is supplied elsewhere
    },
    speech: {
      "1,4": "#2 #3 #4 "
    },
    ruleML: {
      "1,4": `<mtr><mtd style="text-align: right">#2</mtd><mtd>#3</mtd><mtd style="text-align: left">#4</mtd></mtr>
`
    }
  },
  alignline: {
    // as in   y^2 <= x^3 + a x + b
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,4": [1, 2, 3, 4]
    },
    extraArgument: 2,
    rule: {
      "1,4": `<mrow>#2  #3 \\amp  #4</mrow>
`
      // should have \\amp, but that is supplied elsewhere
    },
    speech: {
      "1,4": "#2 #3 #4 "
    },
    ruleML: {
      "1,4": `<mtr><mtd style="text-align: right">#2</mtd><mtd>#3</mtd><mtd style="text-align: left">#4</mtd></mtr>
`
    }
  },
  derivationline: {
    // as in   <= x^3 + a x + b
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,3": [1, 2, 3]
    },
    extraArgument: 1,
    rule: {
      //    "1,3": " #2 \\amp  #3"
      "1,3": `<mrow> #2  #3</mrow>
`
      // should have \\amp, but that is supplied elsewhere
    },
    speech: {
      "1,3": "#2 #3 "
    },
    ruleML: {
      "1,3": `<mtr><mtd></mtd><mtd>#2</mtd><mtd style="text-align: left">#3</mtd></mtr>
`
    }
  },
  "linearsystem:": {
    // not actually implemented yet
    alternative: [],
    type: "multiline",
    seperateOut: !0,
    absorbEmptyLine: !0,
    emptyLineBeforeIndent: !0,
    noBeginEnd: !0,
    changeLineTurn: ",",
    note: "\\systeme"
  },
  //  "ge": {
  //    "alternative": [
  //      ">="
  //    ],
  //    "type": "relation",
  //    "priority": 0,
  //    "rule": {
  //      "2,3": "#1 \\ge #3"
  //    }
  //  },
  //  "le": {
  //    "alternative": [
  //      "<="
  //    ],
  //    "type": "relation",
  //    "priority": 0,
  //    "rule": {
  //      "2,3": "#1 \\le #3"
  //    }
  //  },
  hat: {
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\hat{#2}"
    }
  },
  overline: {
    alternative: ["bar"],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\overline{#2}"
    },
    speech: {
      "1,2": " #2 bar "
    },
    ruleML: {
      "1,2": '<mover>#2<mo accent="true">―</mo></mover>'
    }
  },
  conj: {
    alternative: ["conjugate"],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\overline{#2}"
    },
    speech: {
      "1,2": " #2 conjugate "
    },
    ruleML: {
      "1,2": '<mover intent="conjugate($x)"><mrow arg="x">#2</mrow><mo accent="true">-</mo></mover>'
    }
  },
  vec: {
    alternative: ["conjugate"],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\overline{#2}"
    },
    speech: {
      "1,2": " vector quantityV #2 Vendquantity "
    },
    ruleML: {
      //   "1,2": "<mover intent=\"vector($x)\"><mrow arg=\"x\">#2</mrow><mo accent=\"true\">→</mo></mover>"
      //   "1,2": "<mover intent=\"vector($x)\"><mrow arg=\"x\">#2</mrow><mo>→</mo></mover>"
      "1,2": '<mrow intent="vector($va)"><wrap mathvariant="bold" arg="va">#2</wrap></mrow>'
    }
  },
  underline: {
    alternative: [],
    type: "function",
    priority: 55,
    offpair: {
      "1,2": [
        2
      ]
    },
    rule: {
      "1,2": "\\underline{#2}"
    }
  },
  if: {
    // currently "if" and "otherwise" only work in the case environment,
    // which supplies all the surrounding tags
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "if"
    },
    speech: {
      "1,1": " if "
    },
    ruleML: {
      //   "1,1": "<mtd><mtext>if</mtext></mtd>"
      "1,1": "if"
    }
  },
  otherwise: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "otherwise"
    },
    speech: {
      "1,1": " otherwise "
    },
    ruleML: {
      //     "1,1": "<mtd><mtext>otherwise</mtext></mtd>"
      "1,1": "otherwise"
    }
  },
  when: {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "#&\\text{when }"
    }
  },
  "!": {
    alternative: [],
    type: "postfix",
    priority: -1,
    rule: {
      "1,1": "!"
    },
    speech: {
      "1,1": " factorial "
    },
    ruleML: {
      "1,1": "<mo>!</mo>"
    }
  }
}, Je = [
  ["cent", "¢"],
  ["dollar", "$"],
  ["pound", "£"],
  ["euro", "€"]
], et = [
  "log",
  "llog",
  "lllog",
  "ln",
  "lg",
  "vec",
  "hat",
  "bar",
  "abs",
  "det",
  "order",
  "card",
  "len",
  "length",
  "norm",
  "floor",
  "ceil",
  "ceiling"
], tt = ["∑", "⋃", "⋂", "⨁", "⨂", "∐", "∏", "∮", "∭", "∬", "∫", "∰", "∯", "∮"], Xe = [
  ["sin", "sine"],
  ["cos", "cosine"],
  ["tan", "tangent"],
  ["cot", "cotgent"],
  ["sec", "secant"],
  ["csc", "cosecant"],
  ["arcsin", "arcsine"],
  ["arccos", "arccosine"],
  ["arctan", "arctangent"],
  ["arccot", "arccotgent"],
  ["arcsec", "arcsecant"],
  ["arccsc", "arccosecant"],
  ["sinh", "sinch"],
  ["cosh", "cosh"],
  ["tanh", "tanch"]
], Ze = et.slice();
for (const e of Xe)
  Ze.push(e[0]);
console.debug("Do I see this?");
console.debug("greedyfunctions", Ze);
var rt = [
  ["α", "alpha"],
  ["β", "beta"],
  ["γ", "gamma"],
  ["δ", "delta"],
  ["ε", "varepsilon"],
  ["ϵ", "epsilon"],
  ["ζ", "zeta"],
  ["η", "eta"],
  ["θ", "theta"],
  ["ι", "iota"],
  ["κ", "kappa"],
  ["λ", "lambda"],
  ["μ", "mu"],
  ["ν", "nu"],
  ["ξ", "xi"],
  ["ο", "omicron"],
  ["π", "pi"],
  ["ρ", "rho"],
  ["σ", "sigma"],
  ["τ", "tau"],
  ["υ", "upsilon"],
  ["ϕ", "phi"],
  ["φ", "varphi"],
  ["χ", "chi"],
  ["ψ", "psi"],
  ["ω", "omega"],
  ["Α", "Alpha"],
  ["Β", "Beta"],
  ["Γ", "Gamma"],
  ["Δ", "Delta"],
  ["Ε", "Epsilon"],
  ["Ζ", "Zeta"],
  ["Η", "Eta"],
  ["Θ", "Theta"],
  ["Ι", "Iota"],
  ["Κ", "Kappa"],
  ["Λ", "Lambda"],
  ["Μ", "Mu"],
  ["Ν", "Nu"],
  ["Ξ", "Xi"],
  ["Ο", "Omicron"],
  ["Π", "Pi"],
  ["Ρ", "Rho"],
  ["Σ", "Sigma"],
  ["Τ", "Tau"],
  ["Υ", "Upsilon"],
  ["Φ", "Phi"],
  ["Χ", "Chi"],
  ["Ψ", "Psi"],
  ["Ω", "Omega"]
];
for (const e of Xe)
  g[e[0]] = {
    alternative: [],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "\\" + e[0] + " #2"
    },
    speech: {
      //    "1,2": letterpair[1] + " quantityT #2 Tendquantity "
      "1,2": e[1] + " #2 "
    },
    ruleML: {
      //    "1,2": "<mi>" + letterpair[0] + "</mi><mo>&ApplyFunction;</mo><mrow>#2</mrow>"
      "1,2": "<mi>" + e[0] + "</mi><mo>&ApplyFunction;</mo>#2"
    }
  }, g["base" + e[0]] = {
    alternative: [],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "\\" + e[0]
    },
    speech: {
      "1,2": e[1] + " "
    },
    ruleML: {
      "1,2": e[0]
    }
  };
for (const e of rt)
  g[e[1]] = {
    alternative: [],
    //    "type": "symbol",
    type: "letter",
    priority: -1,
    rule: {
      "1,1": "\\" + e[1]
    },
    speech: {
      "1,1": " " + e[1] + " "
    },
    ruleML: {
      "1,1": "<mi>" + e[0] + "</mi>"
    }
  };
for (const e of Je)
  g[e[0]] = {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\" + e[0]
    },
    speech: {
      "1,1": " " + e[0] + " "
    },
    ruleML: {
      "1,1": "<mi>" + e[1] + "</mi>"
    }
  };
console.debug("End of dictionary.js");
function nt(e) {
  return e.replace(/\s\s+/g, " ");
}
function Ie(e) {
  return /^[0-9\.,]+$/.test(e);
}
function it(e) {
  return /^[a-zA-Z]+$/.test(e);
}
function ge(e) {
  return /^&[a-zA-Z]+;$/.test(e);
}
function ot(e) {
  return /^[0-9\.,].*[a-zA-Z]$/.test(e);
}
function at(e) {
  return Ie(e) || e.length == 1 || e.trim() in g && g[e.trim()].type == "symbol";
}
function P(e, t) {
  if (ot(e)) {
    let n = e.replace(/[a-zA-Z]+$/, ""), o = e.replace(/^[0-9\.,]+/, "");
    console.debug("found mixed", e, "with parts", n, ",", o), n = P(n, t), o = P(o, t);
    let i = "";
    return t == "MathML" ? i = "<mo>&InvisibleTimes;</mo>" : t == "Speech" && (i = " times "), n + i + o;
  }
  let r = e;
  return console.debug("markAtomicItem of", r, "endans", ge(e)), t == "MathML" && (Ie(e) ? r = "<mn>" + r + "</mn>" : ge(e) ? r = "<mi>" + r + "</mi>" : it(e) ? r = r.replace(/(.)/g, "<mi>$1</mi>") : tt.includes(e) ? r = "<mo>" + r + "</mo>" : e.includes("mtext") || r != "" && (r = "<unknown>" + r + "</unknown>", console.warn("unknown type", "X" + r + "X"))), r;
}
function lt(e) {
  let t = e;
  for (let r = 0; r <= 2; ++r)
    t = t.replace(/to the quantity([A-Z]?) +negative 1 +([A-Z]?)endquantity/g, "inverse"), t = t.replace(/to the quantity([A-Z]?) +2 +([A-Z]?)endquantity/g, "squared"), t = t.replace(/power +2 +/g, "squared "), t = t.replace(/(^| )quantity([A-Z]?) +([^ ]+) +([A-Z]?)endquantity/g, " $3 "), t = t.replace(/(^| )quantity([A-Z]?) +(negative +[^ ]+) +([A-Z]?)endquantity/g, " $3 "), t = t.replace(/<mrow ([^<>]+)><(mi|mo|mn)>([^<>]+)(<\/(mi|mo|mn)>)<\/mrow>/g, "<$2 $1>$3$4"), t = t.replace(/<mrow>(<([a-z]+)>)([^<>]+)(<\/$2>)<\/mrow>/g, "$1$3$4"), console.debug("now ans", t), t = t.replace(/<mrow>(<mi>)([^<>]+)(<\/mi>)<\/mrow>/g, "$1$2$3"), t = t.replace(/<mrow>(<mo>)([^<>]+)(<\/mo>)<\/mrow>/g, "$1$2$3"), t = t.replace(/<mrow>(<mn>)([^<>]+)(<\/mn>)<\/mrow>/g, "$1$2$3"), t = t.replace(/(<mrow[^<>]*>)<mrow>([^w]*)<\/mrow>(<\/mrow>)/g, "$1$2$3"), console.debug("removed layer", r, "to get", t);
  return t = t.replace(/quantity([A-Z]?)/g, "quantity"), t = t.replace(/([A-Z]?)endquantity([A-Z]?)/g, "endquantity"), t = t.replace(/(quantity *)quantity([^q]*)endquantity( *endquantity)/g, "$1$2$3"), t = t.replace(/(quantity *)quantity([^q]*)endquantity( *endquantity)/g, "$1$2$3"), t.endsWith("\\") && (t += " "), t;
}
String.prototype.myHash = function() {
  var e = 0, t, r;
  if (this.length === 0) return e;
  for (t = 0; t < this.length; t++)
    r = this.charCodeAt(t), e = (e << 5) - e + r, e |= 0;
  return e;
};
class L {
  /*
    constructor(position, value, key = null, parent = null, conversiontarget) {
  */
  constructor(t, r, n = null, o = null, i = "unknown") {
    this.position = t, this.value = r, this.outputvalue = r, this.key = n, this.parent = o, this.conversiontarget = i, this.children = [], this.pair = [], this.noPriority = !1, this.exPriority = !1;
  }
  insert(t, r = t) {
    return this.children.push(new L(this.children.length, t, r, this, this.conversiontarget)), !0;
  }
  insertNode(t) {
    return t.parent = this, t.position = this.children.length, this.children.push(t), !0;
  }
  addLeafMarkup() {
    console.debug("   adding leaf markup with key, val, oval", this.key, "a,a", this.value, "b,b", this.outputvalue, "to", this), this.key == null ? this.outputvalue = P(this.value, this.conversiontarget) : this.key == " " ? this.position == 1 ? (console.info("assuming implied multiplication"), console.info("What is next to this space key? parent:", this.parent, "left sibling", this.parent.children[0], "left sibling value", this.parent.children[0].value, "right sibling", this.parent.children[2]), this.conversiontarget == "MathML" ? this.outputvalue = "<mo>&InvisibleTimes;</mo>" : this.conversiontarget == "Speech" && (this.outputvalue = " times ")) : this.outputvalue = P(this.value, this.conversiontarget) : this.key == "quote" ? this.position == 1 && (this.outputvalue = this.value) : this.key == "" ? (console.debug("item with empty key.  Is this function apply?", this), this.position == 1 ? (console.debug("What is nect to this enpty key? parent:", this.parent, "left sibling", this.parent.children[0], "right sibling", this.parent.children[2]), this.parent.children[2].pair.length > 0 && (this.conversiontarget == "MathML" ? this.outputvalue = "<mo>&ApplyFunction;</mo>" : this.conversiontarget == "Speech" && (this.outputvalue = " of "))) : this.position == 0 ? this.conversiontarget == "Speech" ? this.outputvalue = " " + P(this.value, this.conversiontarget) : this.outputvalue = P(this.value, this.conversiontarget) : this.outputvalue = P(this.value, this.conversiontarget)) : g[this.key].type == "operator" ? this.value != this.key ? this.outputvalue = P(this.value, this.conversiontarget) : this.outputvalue = P(this.value, this.conversiontarget) : this.key == "," ? (console.debug("found comma with parent", this.parent), this.position == 1 && (this.outputvalue = "COMMA")) : g[this.key].type == "symbol" ? console.debug("found a symbol") : g[this.key].type == "relation" ? (console.debug("found a relation"), this.value != this.key ? this.outputvalue = P(this.value, this.conversiontarget) : this.outputvalue = P(this.value, this.conversiontarget)) : g[this.key].type == "function" && (console.debug("found a function"), this.value != this.key ? (console.debug("marking the argument of a function", this.value, "within", this), this.outputvalue = P(this.value, this.conversiontarget)) : this.outputvalue = P(this.value, this.conversiontarget)), console.debug("   and now leaf is key, val, oval", this.key, ",", this.value, ",", this.outputvalue);
  }
  combine(t) {
    for (let r of this.children)
      r && r.combine(t);
    if (this.isLeaf) {
      try {
        console.debug("isLeaf with key", this.key, "pair", this.pair, "parent children", this.parent.children, "of length", this.parent.children.length, "what we want", this.parent.children[2].pair, "ee", this);
      } catch {
        console.debug("isLeaf with key", this.key, "pair", this.pair, "this", this);
      }
      console.debug("the root", this.treeRoot), this.value.length > 1 && (this.value = this.value.trim()), this.addLeafMarkup();
    } else {
      console.debug("not a Leaf", this.pair, this);
      let r = this.children[0].key, n, o, i = this.children.length, h = 0;
      for (; this.children[h].value != r; )
        h++;
      if (r == " ")
        this.children.length > 1 && this.children[1].value == r ? (r == " " && (r = "\\,"), n = this.children[0].value + r + this.children[2].value, console.debug("adding Oo to", this, "because of", this.children[0]), o = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, this.key && this.key != " " && g[this.key].type != "function" && !g[this.key].wrappedarguments && g[this.key].priority > 20 && (console.debug("maybe wrapping this.key", this.key, "for", o), this.conversiontarget == "MathML" ? o = "<mrow>" + o + "</mrow>" : this.conversiontarget == "Speech" && (console.debug("AddIng quantity", this), o = "quantityS " + o + " Sendquantity"))) : (o = this.children[1].outputvalue, n = this.children[1].value);
      else if (r == "")
        console.debug("  found an empty key", this), this.children.length > 1 && this.children[1].value == r ? (o = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, n = this.children[0].value + this.children[1].value + this.children[2].value) : (o = this.children[1].outputvalue, n = this.children[1].value);
      else {
        console.debug("about to use conversiontarget", this.conversiontarget);
        try {
          console.debug("               trying to extract using key", r, "position", h, "numberOfSiblings", i, "from", this, "with rule of", h + 1 + "," + i), this.conversiontarget == "MathML" ? (n = g[r].rule[h + 1 + "," + i], o = g[r].ruleML[h + 1 + "," + i], console.debug("               attempted       MathML conversion: ", n, "newOutputValue", o)) : this.conversiontarget == "Speech" ? (n = g[r].rule[h + 1 + "," + i], o = g[r].speech[h + 1 + "," + i]) : (n = g[r].rule[h + 1 + "," + i], o = g[r].rule[h + 1 + "," + i]);
        } catch {
          n = g[r].rule[h + 1 + "," + i], o = g[r].rule[h + 1 + "," + i], console.debug("                      MathML conversion failed on", n);
        }
        if (n.includes("#comma?") && (this.key && g[this.key].type == "operator" && g[this.key].priority < 0 ? n = n.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$1") : n = n.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$2")), n.includes("#{}")) {
          let c = !0, m = this;
          for (["^^", "__"].includes(m.key) && (c = !1); m.parent && isScriptPure(m.key); )
            m = m.parent, ["^^", "__"].includes(m.key) && (c = !1);
          c ? n = n.replace("#{}", "{}") : n = n.replace("#{}", "");
        }
        for (let c = 0; c < this.children.length; c++) {
          let m = this.children[c].value, d = this.children[c].outputvalue, a = m, p = d;
          n.includes("#@" + (c + 1)) && (a.length > 1 && (a = "{" + a + "}"), n = n.replace("#@" + (c + 1), a), o = o.replace("#@" + (c + 1), p)), t.includes("caseEnvironment") ? (n = n.replace("#&", "&"), o = o.replace("#&", "&")) : (n = n.replace("#&\\text{", "\\text{ "), n = n.replace("#&", ""), o = o.replace("#&\\text{", "\\text{ "), o = o.replace("#&", "")), n = n.replace("#" + (c + 1) + "@1", m[0]), n = n.replace("#" + (c + 1) + "@-1", m.substring(1)), n = n.replace("#" + (c + 1), m), o = o.replace("#" + (c + 1) + "@1", d[0]), o = o.replace("#" + (c + 1) + "@-1", d.substring(1)), o = o.replace("#" + (c + 1), d);
        }
      }
      this.value = n, this.outputvalue = o, this.children = [];
    }
    if (this.parent && g[this.key] && g[this.key].offpair) {
      let r = this.parent.children.length, n = 0;
      for (console.debug(r, "this.key", this.key, "this", this, "this.parent", this.parent); this.parent.children[n].value != this.key; )
        console.debug(n, "this.parent.children[position]", this.parent.children[n]), n++;
      console.debug("dictionary[this.key].offpair", g[this.key].offpair, "looking for", n + 1 + "," + r, "containing", this.position + 1, "in", g[this.key].offpair[n + 1 + "," + r]), g[this.key].offpair[n + 1 + "," + r] && g[this.key].offpair[n + 1 + "," + r].includes(this.position + 1) && this.pair.pop();
    }
    if (this.pair && this.pair.length > 0 && (console.debug("this.pair[0]", this.pair[0]), this.pair[0] = ut(this.pair, this.conversiontarget), this.pair[0].length > 0)) {
      console.debug("this.pair[0]", this.pair[0]);
      for (let r of this.pair)
        if (this.value = r[0] + this.value + r[1], this.conversiontarget == "MathML") {
          if (console.debug("((((adding parentheses to", this.outputvalue, "of", this), this.outputvalue.length > 18 && (this.outputvalue = "<mrow>" + this.outputvalue + "</mrow>"), !this.key || this.key == " " || !g[this.key].delimitedarguments) {
            let n = this.outputvalue;
            r[0] != "" && (n = '<mo stretchy="false">' + r[0] + "</mo>" + n), r[1] != "" && (n = n + '<mo stretchy="false">' + r[1] + "</mo>"), this.outputvalue = n;
          }
        } else this.conversiontarget == "Speech" ? at(this.outputvalue) || (console.debug("adding quantity", this), this.outputvalue = "quantityP " + this.outputvalue + " Pendquantity") : (!this.key || this.key == " " || !g[this.key].delimitedarguments) && (this.outputvalue = r[0] + this.outputvalue + r[1]);
      this.pair = [];
    }
  }
  get isLeaf() {
    return this.children.length === 0;
  }
  get hasChildren() {
    return !this.isLeaf;
  }
  get treeRoot() {
    return this.parent == null ? this : this.parent.treeRoot;
  }
}
class st {
  constructor(t, r, n, o) {
    this.root = new L(t, r, n, null, o), console.debug("       Tree 0 conversiontarget", o);
  }
  *preOrderTraversal(t = this.root) {
    if (yield t, t.children.length)
      for (let r of t.children)
        yield* this.preOrderTraversal(r);
  }
  *postOrderTraversal(t = this.root) {
    if (t.children.length)
      for (let r of t.children)
        yield* this.postOrderTraversal(r);
    yield t;
  }
  insert(t, r, n = r) {
    console.debug("       Tree 1 conversiontarget", this.conversiontarget);
    for (let o of this.preOrderTraversal())
      if (console.debug("trying Tree1 node", o), o.value === t)
        return o.children.push(new L(r, n, o, conversiontarget)), !0;
    return !1;
  }
  remove(t) {
    for (let r of this.preOrderTraversal()) {
      const n = r.children.filter((o) => o.value !== t);
      if (n.length !== r.children.length)
        return r.children = n, !0;
    }
    return !1;
  }
  find(t) {
    for (let r of this.preOrderTraversal())
      if (r.value === t) return r;
  }
  // refactor to combine this and the following, so the tree is only traversed once
  adjustImpliedMultiplication() {
    let t = ["lim", "quote", "dollar"], r = ["quote", "cent"];
    for (let n of this.preOrderTraversal())
      t.includes(n.value) && t.includes(n.key) && n.position == 0 && (console.debug("found a lim", n), console.debug("now looking at", n.parent, "and", n.parent.children[0], "and", n.parent.children[1]), n.parent.parent && n.parent.parent.children[1].key == " " && n.parent.parent.children[1].value == " " && (console.error("adding hello", n.parent.parent.children[1]), n.parent.parent.children[1].key = "✂️", console.error("now", n.parent.parent.children[1]))), r.includes(n.value) && r.includes(n.key) && n.position == 0 && (console.debug("found a quote", n), console.debug("now looking at parent", n.parent, "and itself", n.parent.children[0], "and parent parent", n.parent.parent), n.parent.parent && n.parent.parent.parent && n.parent.parent.parent.children[1].key == " " && n.parent.parent.parent.children[1].value == " " ? (console.error("adding goodbye", n.parent.parent.parent.children[1]), n.parent.parent.parent.children[1].key = "✂️", console.error("now", n.parent.parent.parent.children[1])) : n.parent && n.parent.parent && n.parent.parent.children[1].key == " " && n.parent.parent.children[1].value == " " && (console.error("adding goodbye", n.parent.parent.children[1]), n.parent.parent.children[1].key = "✂️", console.error("now", n.parent.parent.children[1])));
  }
  combineSubSup() {
    for (let t of this.preOrderTraversal())
      t.value === "" && t.key === "^" && t.position == 0 && (t.children.length > 1 && t.children[0].key == "_" ? (t.parent.children[2].key = "subsup", t.parent.children[2].position = 3, t.parent.children[1] = t.children[2], t.parent.children[1].key = "subsup", t.parent.children[1].position = 2, t.parent.children[1].parent = t.parent, t.parent.children.unshift(t.children[0]), t.parent.children[0].key = "subsup", t.parent.children[0].position = 0, t.parent.children[0].parent = t.parent, t.parent.children[1] = t.children[1], t.parent.children[1].key = "subsup", t.parent.children[1].value = "subsup", t.parent.children[1].position = 1, t.parent.children[1].parent = t.parent) : console.debug("no children"));
  }
  addParents() {
    for (let t of this.preOrderTraversal())
      for (const r of t.children)
        r.parent != t && (r.parent = t);
  }
  // this is not used, because it was too complicated so instead we
  // preprocess and distinguish between different types of integrals,
  // based on limits and weight
  combineInt() {
    for (let t of this.preOrderTraversal())
      t.value == "integr" && t.key == "integr" && t.position == 0 && (console.debug("found int in position", t.position, "and siblings with values and keys"), console.debug("1", t.parent.children[1].key, t.parent.children[1].value), t.parent.children[1].value == "" && t.parent.children[1].key == "integr" && t.parent.children[1].pair.length == 1 && (console.debug("maybe found an int with limits"), t.parent.children[1].children[0].key == "," && t.parent.children[1].children[0].value == "" && (console.debug("looking more promising"), (t.parent.children[1].children[1].key != "," || t.parent.children[1].children[2].key != ",") && console.debug("error with integral subsup structure"), console.debug("int structure looks good"))));
  }
  // this is not used, because instead we went with wrapper(...)
  unWrapCertainParentheses() {
    for (let t of this.preOrderTraversal())
      t.value == "" && t.pair.length == 1 && t.children.length > 0 && (console.debug("found wrapping parentheses", t.position, "and children with values and keys"), console.debug("0", t.children[0].key, t.children[0].value), (t.children[0].value == "limop" && t.children[0].key == "limop" || t.children[0].value == "intllim" && t.children[0].key == "intllim" || t.children[0].value == "intllimweight" && t.children[0].key == "intllimweight" || t.children[0].value == "intlimsweight" && t.children[0].key == "intlimsweight" || t.children[0].value == "intlims" && t.children[0].key == "intlims") && (console.debug("maybe found paraens to eliminate"), t.pair.pop()));
  }
}
function ut(e, t) {
  let r = e[0];
  return console.debug("adjusting brackets", r), t == "LaTeX" && (r[0] == "{" && (r[0] = ["\\{"]), r[1] == "}" && (r[1] = ["\\}"])), r[0] == "⁅" && (r = []), r[0] == "❲" && (r[0] = [""]), r[1] == "❳" && (r[1] = [""]), r;
}
function fe(e) {
  return e === void 0 ? "undefined" : e === null ? "null" : e == "" ? "es" : e.replaceAll(" ", "␣");
}
function Re(e, t) {
  if (console.debug("printTree of", e), !e)
    return "";
  let r = t + "[" + fe(e.key) + "]   |" + fe(e.value) + "|";
  if (e.pair.length && (r += "    " + e.pair[0] + " " + e.pair.length), e.children.length == 0 ? r += "    leaf" : e.parent != null ? r += "       " + e.parent.children.length : r += "       nuLL", r += `
`, e.children.length == 0)
    return r;
  {
    e.children.length;
    let n = r;
    for (let o = 0; o < e.children.length; ++o)
      n += Re(e.children[o], t + "    ");
    return n;
  }
}
function Y(e, t, r) {
  console.debug("starting M2TreeConvert  conversiontarget", r);
  let n = new st(0, e, null, r), o = "", i = n.root, h = !0, c, m = [], d = {};
  for (console.debug("continuing M2TreeConvert  conversiontarget", r, "on", e); h; ) {
    let a = i.value;
    console.debug("fullStr", "X" + a + "X");
    let p = 0, l = 0, u = 0, s, y;
    for (; a.length > u; ) {
      let f = a[u], v = !1, E = !1;
      for (let b of [['"', '"']])
        if (f == b[0]) {
          console.debug("found a quote");
          let w = ye(a, u, b[0], b[1], [[b[0]]]);
          if (w != -1) {
            let x = [a.substring(0, u), a.substring(u + 1, w), a.substring(w + 1)];
            console.debug("children are", x), i.value = "";
            let $ = new L(0, "\\ \\ \\text{" + x[1] + "}\\ \\ ", "justatest", null, r);
            if (console.debug("qNode was", $, "with children", $.children), $ = D(x[0], $, r), console.debug("qNode is", $, "with children", $.children), console.debug("stackedTreeNode was", c), c = F(c, $, r), console.debug("stackedTreeNode is", c, "with children", c.children), m.length > 0) {
              c.key = m[0][0].children[0].key;
              let j = m[0][0].children.pop();
              m[0][0].insertNode(c), m[0][0].insertNode(j), m[0][1]--, m[0][1] == 0 && m.shift(), c = void 0;
            }
            a = a.substring(w + 1), u = 0, l = 0, s = void 0, y = void 0, v = !0;
          }
        }
      if (ht(f)) {
        console.debug("apparently found a left of pair", f);
        let b = gt(a, u);
        if (b != -1) {
          let w = [a.substring(0, u), a.substring(u + 1, b), a.substring(b + 1)];
          i.value = "";
          let x = Y(w[1].trim(), t, r)[0].root;
          if (x.pair.push([f, a[b]]), x = D(w[0], x, r), console.debug("just made pNode", x), c = F(c, x, r), console.debug("just made stackedTreeNode", c), m.length > 0) {
            c.key = m[0][0].children[0].key;
            let $ = m[0][0].children.pop();
            m[0][0].insertNode(c), m[0][0].insertNode($), m[0][1]--, m[0][1] == 0 && m.shift(), c = void 0;
          }
          a = a.substring(b + 1), u = 0, l = 0, s = void 0, y = void 0, v = !0;
        }
      }
      if (f == "<" && a[u + 1] != " ") {
        console.debug("looking for an angle pair");
        let b = ft(a, u);
        if (b != -1) {
          let w = [a.substring(0, u), a.substring(u + 1, b), a.substring(b + 1)];
          i.value = "";
          let x = Y(w[1].trim(), t, r)[0].root;
          if (x.pair.push(["\\langle ", "\\rangle "]), x = D(w[0], x, r), c = F(c, x, r), m.length > 0) {
            c.key = m[0][0].children[0].key;
            let $ = m[0][0].children.pop();
            m[0][0].insertNode(c), m[0][0].insertNode($), m[0][1]--, m[0][1] == 0 && m.shift(), c = void 0;
          }
          a = a.substring(b + 1), u = 0, l = 0, s = void 0, y = void 0, v = !0, console.debug("keyType", y);
        }
      }
      console.debug("OUT j", l, "on", "X" + a + "X", "woith counter", u);
      for (let b = l; b <= u; b++) {
        if (console.debug("inner j", b, "on", "X" + a + "X", "counter", u), a[u + 1] && a[u].match(/[A-Za-z␣]/g) && a[u + 1].match(/[A-Za-z␣]/g)) {
          console.debug("  contuing because building up a word on", a[u], "and", a[u + 1], "so far", a.substring(b, u + 1));
          continue;
        }
        let w = a.substring(b, u + 1), x = mt(a, w, u, c);
        if (console.debug("subStr", w, "type", x), x) {
          s = w, p = b, y = x, E = !0, console.debug("A keyType", y, "with key", "X" + s + "X", "from subStr", w);
          break;
        }
        if (w == " " && (u >= 1 || i.parent && i.parent.children.length == 2 && i.position == 1 || c) && !dt(yt(a, u))) {
          s = w, p = b, y = "space", E = !0, console.debug("B keyType", y);
          break;
        } else
          console.debug("     maybe breaking on multiword subStr", w);
      }
      if (E)
        break;
      v || (u++, f.match(/[\s\d]/g) && (l = u));
    }
    if (console.debug("is there a" + s + "key?"), s) {
      console.debug("yes, there is there a" + s + "key"), !g[s] && s != " " && s != "" && (s = se.getItem(s)), console.debug("and now it is" + s + "key of", y, "keyType");
      let f, v, E, b;
      switch (y) {
        case "space":
        case "operator":
        //operators
        case "relation":
          if (f = [a.substring(0, p), s, a.substring(u + 1)], y == "relation" && t.includes("&beforeFirstRelation") && !d["&beforeFirstRelation"] && (d["&beforeFirstRelation"] = !0, f[2] = "&" + f[2]), v = new L(0, f[0], s, null, r), E = new L(0, f[1], s, null, r), b = new L(0, f[2], s, null, r), c && (c = ct(v.value, c, r), v = c, v.key = s, c = void 0), y == "space" && m.length > 0) {
            i.value = f[0], b.key = m[0][0].children[0].key, m[0][0].insertNode(b), i = m[0][0].children[m[0][0].children.length - 1], m[0][1]--, m[0][1] == 0 && m.shift();
            break;
          }
          let w = !0;
          (Be(s) || Ce(s)) && (y != "space" && f[0].length == 0 || a[p - 1]) && a[u + 1] && a[p - 1] != " " && a[u + 1] != " " && (w = !1);
          let x = ne(s), $ = !1;
          y != "space" && g[s].script && (x -= 0.1, w && ($ = !0, v.exPriority = !0, E.exPriority = !0, b.exPriority = !0), w || (w = !0), vt(i, s) && (w = !1));
          let j = 0;
          if (i.exPriority && !$ && (j += 0.2), w && (i.noPriority || x + j < ne(i.key))) {
            let q = !1;
            for (i.value = v.value, i.children = v.children, i.pair = v.pair, i.exPriority = v.exPriority, i.noPriority = v.noPriority; i.parent; ) {
              let _ = i.position;
              if (i = i.parent, j = 0, !$) {
                for (let O of i.children)
                  if (O.exPriority) {
                    j += 0.2;
                    break;
                  }
              }
              if (!i.children[0].noPriority && x + j >= ne(i.children[0].key)) {
                let O = i.children[_], T = new L(_, null, i.children[0].key, null, r);
                T.noPriority = i.children[_].noPriority, T.exPriority = i.children[_].exPriority, i.children[_] = T, T.parent = i, T.insertNode(O), O.key = s, O.noPriority = E.noPriority, O.exPriority = E.exPriority, T.insertNode(E), T.insertNode(b), i = T.children[2], q = !0;
                break;
              }
            }
            if (!q) {
              let _ = new L(0, "", null, null, r);
              n.root.key = s, _.insertNode(n.root), _.insertNode(E), _.insertNode(b), n.root = _, i = n.root.children[2];
            }
          } else
            w || (v.noPriority = !0, E.noPriority = !0, b.noPriority = !0), i.value = "", i.insertNode(v), i.insertNode(E), i.insertNode(b), i = i.children[2];
          break;
        //break case
        case "function":
          f = [a.substring(0, p), s, a.substring(u + 1)], f[2][0] == " " && (f[2] = f[2].substring(1)), v = new L(0, f[0], s, null, r), E = new L(0, f[1], s, null, r), b = new L(0, f[2], s, null, r), c && (c = D(v.value, c, r), v = c, v.key = s, c = void 0);
          let M = new L();
          if (M.conversiontarget = r, M.value = "", M.insert(s, s), b.key = s, g[s].pairedArgument) {
            let q = ye(a, p, s, g[s].pairedArgument, g[s].family);
            if (q != -1) {
              let _ = [a.substring(u + 1, q), a.substring(q + 1)], O = Y(_[0].trim(), t, r)[0].root, T = new L(0, _[1], s, null, r);
              M.insertNode(O), M.insertNode(T);
            } else
              M.insertNode(b);
          } else
            M.insertNode(b);
          let X = i;
          i = M.children[M.children.length - 1], v.value.length > 0 && (M = pt(v, M)), M.value = "", X.parent ? (M.key = X.parent.children[X.position].key, M.position = X.position, M.parent = X.parent, X.parent.children[X.position] = M) : n.root = M, g[s] && g[s].extraArgument && m.push([M, g[s].extraArgument]);
          break;
        case "postfix":
        // such as "!" for factorial.
        case "symbol":
        //symbols
        case "letter":
          f = [a.substring(0, p), s, a.substring(u + 1)], console.debug("making a symbolNode with", f);
          let Z = new L();
          if (Z.conversiontarget = r, Z.value = "", Z.insert(s, s), Z = D(f[0], Z, r), c = F(c, Z, r), console.debug("now have stackedTreeNode", c), m.length > 0) {
            c.key = m[0][0].children[0].key;
            let q = m[0][0].children.pop();
            m[0][0].insertNode(c), m[0][0].insertNode(q), m[0][1]--, m[0][1] == 0 && m.shift(), c = void 0;
          }
          i.value = f[2], console.debug("now have currentNode", i);
          break;
        case "multiline":
          f = [a.substring(0, p), s, a.substring(u + 1)];
          let he = new L(0, f[0], null, null, r);
          c = F(c, he, r), i.value = f[2], o = s, console.debug("----------- just set exParam = ", o);
          break;
        case "UNUSED":
          f = [a.substring(0, p), s, a.substring(u + 1)], i.value = f[2];
          break;
      }
    } else {
      if (c) {
        if (a.trim() != "") {
          console.debug("388 M2TreeConvert  conversiontarget", r);
          let v = new L();
          v.conversiontarget = r, c.key = "", v.insertNode(c), v.insert("", ""), v.insert(a, ""), c = v;
        }
        let f = i.position;
        c.position = f, c.key = i.key, i.parent ? (c.parent = i.parent, i.parent.children[f] = c) : n.root = c;
      }
      h = !1;
      break;
    }
  }
  return n.addParents(), console.debug("continuing", n.root.children[0], n.root.children[1]), n.combineSubSup(), console.debug("combineSubSup returned", n, "aa", n.root, "bb", n.root.children), n.adjustImpliedMultiplication(), console.debug("adjustImpliedMultiplication returned", n, "aa", n.root, "bb", n.root.children), console.debug(Re(n.root, "")), [n, o, d];
}
function F(e, t, r) {
  if (e) {
    console.debug("stackNode M2TreeConvert  stackedTreeNode.conversiontarget", e.conversiontarget);
    let n = new L();
    n.conversiontarget = r, e.key = "", n.insertNode(e), n.insert("", ""), t.key = "", n.insertNode(t), e = n;
  } else
    e = t;
  return e;
}
function D(e, t, r) {
  if (e.trim() != "") {
    console.debug("combinePrev M2TreeConvert  ", e, "xx", t, "cc", r);
    let n = new L();
    n.conversiontarget = r, t.key = "", n.insert(e, ""), n.insert("", ""), n.insertNode(t), t = n, console.debug(" combinePrev pNode.conversiontarget", t);
  }
  return t;
}
function pt(e, t) {
  return console.debug("combinePrevNode preNode.conversiontarget", e.conversiontarget), e.insert("", ""), e.insertNode(t), e;
}
function ct(e, t, r) {
  if (e.trim() != "") {
    console.debug("combineAfter M2TreeConvert  conversiontarget", r);
    let n = new L();
    n.conversiontarget = r, t.key = "", n.insertNode(t), n.insert("", ""), n.insert(e, ""), t = n;
  }
  return t;
}
function mt(e, t, r, n) {
  let o = Q(t);
  if (o && !bt(e, t, r))
    return o.mustHaveLeftArgument && r == 0 && !n ? void 0 : o.type;
}
function Q(e) {
  return g[e] ? g[e] : (e = se.getItem(e), e == -1 ? void 0 : g[e]);
}
function ht(e) {
  return ["(", "[", "{", "⁅", "❲"].includes(e);
}
function Ce(e) {
  let t = Q(e);
  return t && t.type == "operator";
}
function dt(e) {
  for (let t = 1; t <= e.length; t++) {
    let r = e.substring(0, t);
    if (Ce(r) || Be(r))
      return !0;
  }
  return !1;
}
function Be(e) {
  let t = Q(e);
  return t && t.type == "relation";
}
function ne(e) {
  let t = Q(e);
  switch (e) {
    case " ":
    case "":
      return 19;
    default:
      return t ? t.priority : 999;
  }
}
function gt(e, t) {
  if (!["(", "[", "{", "⁅", "❲"].includes(e[t]))
    throw new Error("No" + lp + " at index " + t);
  let r = 1;
  for (let n = t + 1; n < e.length; n++)
    switch (e[n]) {
      case "(":
      case "[":
      case "{":
      case "⁅":
      case "❲":
        r++;
        break;
      case ")":
      case "]":
      case "}":
      case "⁆":
      case "❳":
        if (--r == 0)
          return n;
        break;
    }
  return -1;
}
function ft(e, t) {
  if (!["<"].includes(e[t] || [" "].includes(e[t + 1])))
    throw new Error("No" + lp + " at index " + t);
  let r = 1;
  for (let n = t + 1; n < e.length; n++)
    if (e[n] == "<" && e[n + 1] != " " && r++, e[n] == ">" && e[n - 1] != " " && --r == 0)
      return n;
  return -1;
}
function ye(e, t, r, n, o) {
  if (e.substring(t, t + r.length) != r)
    throw new Error("No " + r + " at index " + t + " of " + e);
  let i = 1;
  for (let h = t + 1; h < e.length; h++) {
    if (e.substring(h, h + n.length) == n && --i == 0)
      return h;
    for (let c of o)
      e.substring(h, h + c.length) == c && e[h - 1].match(/[\s\d]/g) && i++;
  }
  return -1;
}
function yt(e, t) {
  let r = "";
  for (let n = t + 1; n < e.length; n++)
    switch (e[n]) {
      case `
`:
      case " ":
        break;
      default:
        r += e[n];
    }
  return r;
}
function bt(e, t, r) {
  for (let n = r + 1; n < e.length && !e[n].match(/[\s\d]/g); n++)
    if (t += e[n], Q(t))
      return !0;
  return !1;
}
function vt(e, t) {
  if (console.debug("checkScriptSimilarity", e), e.pair.length > 0 || e.parent && e.parent.exPriority)
    return !1;
  let r = e;
  for (; r.parent && (r = r.parent, !(r.pair.length > 0 || e.parent && e.parent.exPriority)); )
    if (r.key == t)
      return !0;
  for (r = e.parent; r && r.children[0] && (r = r.children[0], !(r.pair.length > 0 || e.parent && e.parent.exPriority)); )
    if (r.key == t)
      return !0;
  return !1;
}
function wt(e, t) {
  return console.debug("combineTree2Latex", e, "params", t, "with output", e.root.outputvalue), e.root.combine(t), console.debug("AGAIN combineTree2Latex", e, "params", t, "with output", e.root.outputvalue), e.root.outputvalue;
}
function kt(e, t, r, n) {
  e = e.replace(/(&|\\amp)/g, "🎯");
  for (let d of se.getAllMultiLine()) {
    let a = e.indexOf(d.slice(0, -1) + "(");
    for (; a != -1; ) {
      let p = Mt(e, a + d.length - 1, "(", ")");
      if (p != -1) {
        let l = [e.substring(0, a), e.substring(a + d.length, p), e.substring(p + 1)];
        newMiddleStr = d + `
 `, g[d].emptyLineBeforeIndent ? (newMiddleStr += l[1].replaceAll(";", `

 `), newMiddleStr += `
`) : newMiddleStr += l[1].replaceAll(";", `
 `), e = l[0] + newMiddleStr + l[2], a = e.indexOf(d.slice(0, -1) + "(");
      } else
        continue;
    }
  }
  e = e.replaceAll("\\,", ""), e = e.replaceAll("\\:", ""), e = e.replaceAll("\\;", ""), e = e.replaceAll("\\!", ""), e = e.replace(/([a-zA-Z])\\/g, "$1 "), e = e.replaceAll("\\", "");
  let o = e.split(`
`), i = "", h = [], c = "";
  for (; o.length > 0; ) {
    var m = [];
    if (h[0] && g[h[0]].params && (m = g[h[0]].params), console.debug("  ++  ++  ++  ++  ++  ++  ++  ++  ++  ++ "), console.debug("top of loop  ", o), console.debug("params = ", m), o[0].trim() == "" && !m.includes("system") && !m.includes("derivation") && !m.includes("align")) {
      console.info("skipping empty string"), o.shift();
      continue;
    }
    if (m.length > 0 && m.includes("caseEnvironment")) {
      let u = o[0], s = u.split(/(if|when|unless|otherwise)/g);
      s.length != 3 ? console.error("invalid cases line", u) : (u = "casesline(" + s[0] + ")(" + s[1] + ")(" + s[2] + ")", o[0] = u), console.debug("thisLinePieces", s);
    } else if (m.length > 0 && (m.includes("system") || m.includes("derivation"))) {
      let u = o[0];
      for (; o.length > 1 && o[1].trim() != ""; )
        u += o[1], o.splice(1, 1);
      let s = u.split(/(<=|>=|:=|<|>|=|~|≈|approx|asymp).*?/);
      if (s.length > 3) {
        let y = "";
        for (; s.length >= 3; )
          y = s.pop() + y;
        s[2] = y;
      }
      s.length != 3 ? console.warn("invalid system/derivation/align line", u, "with pieces", s) : (s[0].trim() == "" ? u = "derivationline(" + s[1].trim() + ")(" + s[2].trim() + ")" : u = "systemline(" + s[0].trim() + ")(" + s[1].trim() + ")(" + s[2].trim() + ")", o[0] = u);
    } else if (m.length > 0 && m.includes("align")) {
      let u = o[0];
      for (; o.length > 1 && o[1].trim() != ""; )
        u += o[1], o.splice(1, 1);
      let s = u.split(/(🎯).*?/);
      if (s[1] == "🎯" && (s[1] = ""), s.length > 3) {
        let y = "";
        for (; s.length >= 3; )
          y = s.pop() + y;
        s[2] = y;
      } else s.length == 3 ? (u = "alignline(" + s[0].trim() + ")(" + s[1].trim() + ")(" + s[2].trim() + ")", o[0] = u) : o[0] = "";
    }
    let d = Y(o[0].trim(), m, n);
    console.debug("temp");
    let a = d[0], p = d[1], l = wt(a, m);
    m.length && m.includes("caseEnvironment") ? n == "Speech" : m.length && (m.includes("system") || m.includes("derivation") || m.includes("align")) && (m.includes("system") || m.includes("derivation") || m.includes("align"), n == "Speech"), o.length > 0 && p.length == 0 && (h.length > 0 && (!g[h[0]].absorbEmptyLine || o[0].trim().length > 0) ? g[h[0]].absorbEmptyLine && o.length > 1 && o[1].trim().length > 0 || o.length == 2 && o[1].trim().length == 0 || o.length == 1 || (g[h[0]].changeLineTurn ? l += g[h[0]].changeLineTurn + `
` : l += "") : o.length > 1 && (g[h[0]] && g[h[0]].absorbEmptyLine && o[0].trim().length == 0 || (l += `
`))), c = o[0], o.shift(), g[p] && (g[p].seperateOut && (l += r), g[p].noBeginEnd ? l += g[p].note + "{" : l += `
<` + g[p].note + `>
`, h.push(p)), h.length > 0 && o[0] && o[0][0] != " " && (!g[h[0]].emptyLineBeforeIndent || c.trim().length == 0) && (g[h[0]].noBeginEnd ? l += "}" : l += "AA\\end{" + g[h[0]].note + "}", g[h[0]].lineBreak && (l += `
`), g[h[0]].seperateOut && (l += t), h.shift()), i += l;
  }
  for (; h.length > 0; )
    g[h[0]].noBeginEnd ? i += "}" : i += "</" + g[h[0]].note + `>
`, g[h[0]].seperateOut && (i += t), h.shift();
  return nt(i);
}
class xt {
  constructor() {
    this.cache = [], this.cacheSize = 500, this.nonCache = [], this.nonCacheSize = 500, this.multilineList = [];
  }
  getAllMultiLine() {
    if (this.multilineList.length == 0)
      for (let t of Object.keys(g))
        g[t].type == "multiline" && this.multilineList.push(t);
    return this.multilineList;
  }
  getItem(t) {
    if (t == " " || t == "")
      return -1;
    for (let r = this.cache.length - 1; r >= 0; r--)
      if (this.cache[r][0] === t)
        return this.cache[r][1];
    if (this.nonCache.includes(t))
      return -1;
    for (let r of Object.keys(g)) {
      let n = g[r].alternative;
      if (n) {
        for (let o of n)
          if (o == t)
            return this.cache.push([t, r]), this.cache.length > this.cacheSize && this.cache.shift(), r;
      }
    }
    return this.nonCache.push(t), this.nonCache.length > this.nonCacheSize && this.nonCache.shift(), -1;
  }
  getLength() {
    return this.cache.length;
  }
  getSize() {
    return this.cacheSize;
  }
}
let se = new xt();
function Lt(e, t) {
  e = e.replace(/(&|\\amp)/g, "🎯"), console.debug("starting convertMathSnippet", t, "on", e);
  let r = kt(e, "LBRACK", "RBRACK", t);
  return r = lt(r), r;
}
function Mt(e, t, r, n) {
  if (e.substring(t, t + r.length) != r)
    throw new Error("No" + r + " at index " + t);
  for (let o = t + 1; o < e.length; o++)
    switch (e.substring(o, o + n.length)) {
      case n:
        return o;
    }
  return -1;
}
let ie = "STart";
ie = "";
const oe = function(e) {
  if (typeof e == "string")
    return e;
  if (!Array.isArray(e)) {
    let n = "";
    const o = e.tag;
    let i = N[o];
    return i || (i = C(o)), n += i.before_begin + i.begin_tag + ie, "xmlattributes" in e && e.xmlattributes && (n += " " + e.xmlattributes.trim()), "id" in e && e.id && (n += ' xml:id="' + H(e.id) + '"'), Object.keys(e).forEach((m) => {
      ["tag", "content", "title", "xmlattributes", "id"].includes(m) || (n += " " + m + '="' + e.el + '"');
    }), n += i.after_begin, "title" in e && e.title && (n += "<title>" + e.title + `</title>
`), n + oe(e.content) + i.before_end + i.end_tag + i.after_end;
  }
  const t = e;
  let r = "";
  return t.forEach((n, o) => {
    if (typeof n == "string") {
      n.match(/^\s*$/) || (r += "<TEXT>" + n + "</TEXT>", console.log("just added error of", n));
      return;
    }
    let i = "";
    const h = n.tag;
    let c = N[h];
    typeof c > "u" && (c = Ot), i = i + c.before_begin + c.begin_tag + ie, "xmlattributes" in n && n.xmlattributes && (i += " " + n.xmlattributes.trim()), "id" in n && n.id && (i += ' xml:id="' + H(n.id) + '"'), Object.keys(n).forEach((l) => {
      !["tag", "content", "title", "xmlattributes", "id"].includes(l) && !l.startsWith("_") && (i += " " + l + '="' + n[l] + '"');
    }), i += c.after_begin, "title" in n && n.title && (i += "<title>" + n.title + `</title>
`);
    let d = oe(n.content);
    h != "text" && (d = d.replace(/^[\r\n]+/, ""), d = d.replace(/[\r\n]+$/, "")), ["c", "code"].includes(h) && (d = $t(d));
    let a = "";
    ["m", "md", "me", "mdn", "men", "sm", "smen"].includes(h) && (d.match(/^.*(\.|,|;)\s*$/s) && (d = d.replace(/\s*$/, ""), a = d.slice(-1), d = d.slice(0, -1)), ["sm", "smen"].includes(h) && (d = Lt(d, "LaTeX")), d = qt(d)), i = i + d;
    let p = c.before_end + c.end_tag + a + c.after_end;
    i = i + p, i.match(/^\s*<p>\s*<\/p>\s*$/) && (console.log("empty p"), i = ""), r = r + i;
  }), r = r.replace(/(\/)(me|md|men|mdn)>\s+(\.|,|;|:)/g, "$1$2>$3"), r;
}, H = function(e) {
  let t = e;
  return t = t.replace(/ /g, "-"), t = t.replace(/[^a-zA-Z0-9\-]/g, "_"), t;
}, $t = function(e) {
  let t = e;
  return t = t.replace(/&/g, "&amp;"), t = t.replace(/</g, "&lt;"), t = t.replace(/>/g, "&gt;"), t;
}, qt = function(e) {
  let t = e;
  return t = t.replace(/&/g, "\\amp "), t = t.replace(/</g, "\\lt "), t = t.replace(/>/g, "\\gt "), t;
}, At = function(e, t, r) {
  let n = r, o = 0;
  const i = e.length;
  for (; n < t.length; ) {
    const h = t[n];
    if (o <= 0 && t.slice(n, n + i) === e)
      return n;
    h === "\\" ? n++ : h === "{" ? o++ : h === "}" && o--, n++;
  }
  return -1;
}, _t = function(e) {
  return e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}, Et = /^\\AAAAAAAbegin{/, V = function(e, t, r) {
  if (typeof e == "string")
    return ze(e);
  if (!Array.isArray(e)) {
    let i = { ...e };
    return i.content = V(i.content, t, r), i;
  }
  let n = [], o = "";
  return e.forEach((i, h) => {
    if (r.includes(i.tag))
      o && (n.push({ tag: "p", content: o }), o = ""), U.includes(i.tag) && typeof i.content == "string" ? (i.content = ue(i.content, R), i.content = V(i.content, t, r)) : U.includes(i.tag) && (i.content = V(i.content, t, r)), n.push(i);
    else if (i.tag == "text")
      i.content.split(/\n\s*\n{1,}/).forEach((m) => {
        const d = o + m;
        if (d) {
          const a = { tag: "p", content: d };
          n.push(a);
        }
        o = "";
      });
    else if (typeof i.content == "string" && U.includes(i.tag)) {
      let c = [];
      i.content.split(/\n\s*\n{1,}/).forEach((d) => {
        const a = d.trim();
        a && c.push({ tag: "p", content: a });
      }), i.content = c, n.push(i);
    } else
      n.push(i);
  }), n;
}, ze = function(e) {
  let t = [], r = "";
  const n = e.split(/\n\s*\n{1,}/);
  return console.log("found ", n.length, " pieces, which are:", n), n.forEach((o) => {
    const i = r + o;
    if (i) {
      console.log("made this_new_text", i);
      const h = { tag: "p", content: i };
      t.push(h);
    }
    r = "";
  }), t;
}, ue = function(e, t) {
  typeof e != "string" && alert("expected string in splitTextAtDelimiters", e);
  var r = e;
  let n;
  const o = [], i = new RegExp(
    "(" + t.map((h) => _t(h.left)).join("|") + ")"
  );
  for (; n = r.search(i), n !== -1; ) {
    n > 0 && (o.push({
      tag: "text",
      content: r.slice(0, n)
    }), r = r.slice(n));
    const h = t.findIndex((d) => r.startsWith(d.left));
    if (n = At(t[h].right, r, t[h].left.length), n === -1)
      break;
    const c = r.slice(0, n + t[h].right.length), m = Et.test(c) ? c : r.slice(t[h].left.length, n);
    o.push({
      //        type: "math",
      tag: t[h].tag,
      content: m
      //       rawData,
    }), r = r.slice(n + t[h].right.length);
  }
  return r.match(/^\s*$/) || o.push({
    tag: "text",
    content: r
  }), o;
}, Tt = function(e) {
  typeof e != "string" && alert("expected a string, but got:", e);
  let t = e;
  return t = t.replace(/(^|\s|~)\$([^\$\n]+)\$(\s|$|[.,!?;:\-])/mg, "$1<sm>$2</sm>$3"), t = t.replace(/(^|\s)_([^_\n]+)_(\s|$|[.,!?;:])/mg, "$1<term>$2</term>$3"), t = t.replace(/(^|\s)\*\*([^*\n]+)\*\*(\s|$|[.,!?;:])/mg, "$1<alert>$2</alert>$3"), t = t.replace(/(^|\s)\*([^*\n]+)\*(\s|$|[.,!?;:])/mg, "$1<em>$2</em>$3"), t = t.replace(/(^|\s)``([^'"`\n]+)''(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)``([^'"`\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)`([^'"`\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)"([^"\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)'([^'\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|[^`a-zA-Z0-9])`([^`\n]+)`($|[^`a-zA-A0-9])/mg, "$1<c>$2</c>$3"), t;
}, be = function(e, t, r) {
  return Ke[t + r];
}, Nt = function(e) {
  typeof e != "string" && alert("expected a string, but got:", e);
  let t = e;
  t = t.replace(/<!--.*?-->/g, "");
  for (let [r, n] of Object.entries(Ye)) {
    let o = r;
    n.forEach((i) => {
      let h = i;
      t = t.replace("<" + h + ">", "<" + o + ">"), t = t.replace("<" + h + " ", "<" + o + " "), t = t.replace("</" + h + ">", "</" + o + ">"), t = t.replace("\\begin{" + h + "}", "\\begin{" + o + "}"), t = t.replace("\\end{" + h + "}", "\\end{" + o + "}"), t = t.replace("\\" + h + "{", "\\" + o + "{");
    });
  }
  return t;
}, S = function(e, t, r, n, o = "all", i = "all", h = "") {
  let c = [];
  typeof t == "string" ? t == "displaymath" ? c = z : t == "spacelike" ? c = "spacelike" : alert("unknown taglist " + t) : typeof t[0] == "string" ? c = Fe(t) : c = t;
  let m = [];
  if (Array.isArray(e))
    return e.forEach((d, a) => {
      if (r > n && d.tag != "text")
        m.push(d);
      else {
        let p;
        o == "all" || o.includes(d.tag) ? p = S(d, t, r + 1, n, o, i, d.tag) : p = d, Array.isArray(p) ? p.forEach((l) => {
          m.push(l);
        }) : m.push(p);
      }
    }), m;
  if (typeof e == "string") {
    if (r > n + 2)
      return e;
    if (c === "spacelike")
      return i == "all" || i.includes(h) ? Tt(e) : e;
    let d = e;
    return c === "makeparagraphs" ? (i == "all" || i.includes(h)) && (d = ze(d)) : (i == "all" || i.includes(h)) && (d = ue(d, c)), d;
  } else {
    typeof e != "object" && alert("wrong category for ", e);
    let d = { ...e };
    if (r > n && d.tag != "text")
      return d;
    let a = d.content;
    return (o == "all" || i.includes(d.tag)) && (a = S(a, t, r + 1, n, o, i, d.tag)), d.tag == "text" && typeof a == "string" ? d.content = a : d.tag != "text" ? a.length == 1 && a[0].tag == "text" ? d.content = a[0].content : d.content = a : d = a, d;
  }
}, A = function(e, t, r = 0, n = 0, o = "all", i = "", h = "", c = "section") {
  let m = [];
  if (Array.isArray(e))
    e.forEach((a, p) => {
      let l;
      typeof a == "object" ? l = A({ ...a }, t, r + 1, n, o, a.tag, i) : l = A(a, t, r + 1, n, o, i, h), m.push(l);
    });
  else if (typeof e == "object") {
    if (t == "oneline environments" && e.tag == "p" && typeof e.content == "string") {
      if (e.content.match(/^\s*([A-Za-z]+):/)) {
        let l = e.content.split(":", 1)[0].toLowerCase();
        l = l.trim();
        const u = e.content.replace(/^\s*[^:]*:\s*/, "");
        e.tag = l, e.content = u;
      }
    } else if (t == "extract li" && e.tag == "p" && typeof e.content == "string") {
      if (e.content.match(/^\s*\-+\s/)) {
        const p = "li", l = e.content.replace(/^\s*\-+\s*/, "");
        e.tag = p, e.content = l, e._parenttag = "ul";
      } else if (e.content.match(/^\s*\++\s/)) {
        const p = "li", l = e.content.replace(/^\s*\++\s*/, "");
        e.tag = p, e.content = l, e._parenttag = "ol";
      } else if (e.content.match(/^\s*\(*[0-9]+\.*\)*\s/)) {
        const p = "li", l = e.content.replace(/^\s*\(*[0-9]+\.*\)*\s*/, "");
        e.tag = p, e.content = l, e._parenttag = "ol";
      }
    } else if (t == "xmlattributes" && typeof e.content == "string") {
      var d = new RegExp("^\\s*(" + W.join("|") + ")[^<>+]*>", "s");
      if (d.test(e.content) || e.content.match(/^\s*[^\n<>+]*>/))
        if (e.content.match(/^\s*>/))
          e.content = e.content.replace(/^\s*>/, "");
        else {
          let p = e.content.split(">", 1)[0];
          e.content = e.content.replace(/^\s*[^<>]*>/s, ""), "xmlattributes" in e ? e.xmlattributes += p : e.xmlattributes = p;
        }
    } else if (t == "attributes" && typeof e.content == "string") {
      const p = e.content.split(/\n\s*\n{1,}/);
      if (p.length > 1) {
        let l = "";
        var d = new RegExp("^(" + W.join("|") + ")");
        p.forEach((s) => {
          let y = s.trim();
          if (d.test(y)) {
            let f = y.split(":", 1)[0], v = y.split(":", 2)[1].trim();
            e[f] = v;
          } else
            l += s;
        }), e.content = l;
      }
    } else if (t == "title" && typeof e.content == "string") {
      if (e.content.match(/^\s*\[/) || e.content.match(/^\s*<title>/))
        if (e.content.match(/^\s*\[/)) {
          let p = e.content.split("]", 1)[0];
          p = p.replace(/\s*\[/, ""), e.title = p, e.content = e.content.replace(/^\s*\[[^\[\]]*\]/, "");
        } else {
          let p = e.content.split("</title>", 1)[0];
          p = p.replace(/\s*<title>/, ""), e.title = p, e.content = e.content.replace(/^\s*<title>.*?<\/title>/, "");
        }
    } else if (t == "label" && typeof e.content == "string") {
      if (e.content.match(/^\s*(\\*)label{[^{}]*}/)) {
        let p = e.content.replace(/^\s*(\\*)label{([^{}]*)}.*/s, "$2");
        p = H(p), e.id = p, e.content = e.content.replace(/^\s*(\\*)label{([^{}]*)}\s*/, "");
      }
    } else if (t == "statements" && o.includes(i)) {
      let p = [], l = {};
      if (typeof e.content == "string")
        p = [{ tag: "text", content: e.content }], l = { tag: "statement", content: p }, e.content = [l];
      else {
        let u = !1;
        if (e.content.forEach((s) => {
          s.tag == "statement" && (u = !0);
        }), !u) {
          let s = "", y = 0;
          for (y = 0; y < e.content.length && (s = e.content[y], !te.includes(s.tag)); ++y)
            p.push(s);
          l = { tag: "statement", content: p };
          let f = e.content.slice(y);
          f.unshift(l), e.content = f;
        }
      }
    } else if (t == "prefigure" && o.includes(e.tag)) {
      !("xmlns" in e) && !("xmlattributes" in e && e.xmlattributes.includes("xmlns")) && (e.xmlns = "https://prefigure.org");
      let p = [], l = {};
      if (typeof e.content == "string") {
        const u = e.content;
        if (p = u, l = { tag: "diagram", content: p }, "dimensions" in e && (l.dimensions = e.dimensions, delete e.dimensions), "margins" in e && (l.margins = e.margins, delete e.margins), e.content = [l], "bbox" in e) {
          let s = { tag: "coordinates", bbox: e.bbox, content: u };
          delete e.bbox, l.content = [s];
        }
      }
      if (h != "image") {
        let u = { ...e };
        u.content = [...e.content], e = { tag: "image", content: [u] }, "width" in u && (e.width = u.width, delete u.width);
      }
    } else if (t == "blockquotes" && o.includes(e.tag) && typeof e.content == "string") {
      if (e.content.match(/^\s*\+\+\+sTaRTbQ>/)) {
        let p = e.content.replace(/^\s*\+\+\+sTaRTbQ>/, "");
        p = p.replace(/\n\s*>/g, `
`);
        let l = p.split(/\n\s*\n{1,}/), u = [];
        l.forEach((s, y) => {
          u.push({ tag: "p", content: s });
        }), e.content = u, e.tag = "blockquote";
      }
    } else if (t == "substructure" && o.includes(e.tag) && typeof e.content == "string") {
      const p = G[e.tag], l = Fe(p), u = ue(e.content, l);
      e.content = [...u];
    } else if (t == "clean up substructure" && o.includes(e.tag) && Array.isArray(e.content)) {
      const p = e.tag;
      let l = [];
      e.content.forEach((u) => {
        G[p].includes(u.tag) ? l.push(u) : W.includes(u.tag) ? e[u.tag] = u.content : u.tag == "text" && u.content.match(/^\s*$/) && "attributes" in u ? "attributes" in e ? e.attributes += u.attributes : e.attributes = u.attributes : u.tag == "text" && u.content.match(/^\s*$/) || (console.log("problem content", u), alert("problem content: see console.log"));
      }), e.content = [...l];
    } else if (t == "extraneous math" && o.includes(e.tag) && typeof e.content == "string")
      e.content = e.content.replace(/^\s*\+\+\+saMePaR/, "");
    else if (t == "gather li" && o.includes(e.tag) && typeof e.content == "object") {
      let p = [], l = "", u = 0, s = !1, y = [], f = {};
      for (u = 0; u < e.content.length; ++u)
        l = e.content[u], !s && l.tag != "li" ? p.push(l) : !s && l.tag == "li" ? (s = !0, y = [l], f.tag = l._parenttag) : s && l.tag == "li" ? y.push(l) : s && l.tag != "li" && (f.content = [...y], p.push({ ...f }), s = !1, f = {}, y = [], p.push(l));
      s && (f.content = y, p.push({ ...f })), s = !1, y = [], f = {}, e.content = p;
    } else if (t == "absorb math" && (o.includes(e.tag) || e.tag == c) && typeof e.content == "object") {
      let p = [], l = "", u = 0;
      for (u = 0; u < e.content.length; ++u) {
        l = e.content[u];
        const s = p.length;
        ee.includes(l.tag) ? s == 0 ? p.push({ ...l }) : p[s - 1].tag != "p" ? p.push({ ...l }) : typeof p[s - 1].content == "string" ? (p[s - 1].content = [{ tag: "text", content: p[s - 1].content }], p[s - 1].content.push({ ...l })) : p[s - 1].content.push({ ...l }) : l.tag == "p" ? typeof l.content == "string" && l.content.match(/\s*\+\+\+saMePaR/) ? (l.content = l.content.replace(/\s*\+\+\+saMePaR\s*/, ""), p[s - 1].content.push({ tag: "text", content: l.content })) : typeof l.content == "string" ? p.push({ ...l }) : l.content.length > 0 && l.content[0].tag == "text" && typeof l.content[0].content == "string" && l.content[0].content.match(/\s*\+\+\+saMePaR/) ? (l.content[0].content = l.content[0].content.replace(/\s*\+\+\+saMePaR\s*/, ""), l.content.forEach((y) => {
          p[s - 1].content.push(y);
        })) : l.content.length > 0 && p.push({ ...l }) : p.push({ ...l });
      }
      e.content = [...p];
    }
    let a = { ...e };
    return a.content = A(a.content, t, r + 1, n, o, a.tag, i), a;
  } else {
    if (typeof e != "string" && (console.log("what is it", e), alert("non-object non-string: ", e)), t == "do_nothing")
      return e + "X";
    if (t == "fonts" && o.includes(i)) {
      let a = "";
      return a = e.replace(/\\('|"|\^|`|~|-|c|H|u|v) ?([a-zA-Z])/mg, be), a = a.replace(/\\('|"|\^|`|~|-|c|H|u|v){([a-zA-Z])}/mg, be), a;
    } else if (t == "texlike" && o.includes(i)) {
      let a = "";
      return a = e.replace(/([^-])\-\-([^-])/mg, "$1<mdash/>$2"), a = a.replace(/\bLaTeX\b/mg, "<latex/>"), a = a.replace(/\bTeX\b/mg, "<tex/>"), a = a.replace(/\bPreTeXt\b/mg, "<pretext/>"), a = a.replace(/([^\\])~/mg, "$1<nbsp/>"), a = a.replace(/\(\\(ref|eqref|cite){([^{}]+)}\)/g, function(p, l, u) {
        return '<xref ref="' + H(u) + '"/>';
      }), a = a.replace(/\\(ref|eqref|cite){([^{}]+)}/g, function(p, l, u) {
        return '<xref ref="' + H(u) + '"/>';
      }), a = a.replace(/\\(q|term|em|emph|m|c|fn){([^{}]+)}/g, "<$1>$2</$1>"), a = a.replace(/\\(url|href){([^{}]+)}({|\[)([^{}\[\]]+)(\]|})/g, function(p, l, u, s, y) {
        return '<url href="' + u + '">' + y + "</url>";
      }), a = a.replace(/\\(url|href){([^{}]+)}([^{]|$)/g, function(p, l, u) {
        return '<url href="' + u + '"/>';
      }), a;
    } else
      return e;
  }
  return m;
}, re = function(e) {
  return { left: "<" + e + ">", right: "</" + e + ">", tag: e };
}, pe = function(e) {
  return { left: "<" + e + " ", right: "</" + e + ">", tag: e };
}, ce = function(e) {
  return { left: "\\begin{" + e + "}", right: "\\end{" + e + "}", tag: e };
}, Fe = function(e) {
  if (!Array.isArray(e))
    return e;
  let t = [];
  return e.forEach((r) => {
    t.push(pe(r)), t.push(re(r)), t.push(ce(r));
  }), t;
}, C = function(e) {
  return {
    begin_tag: "<" + e,
    end_tag: "</" + e + ">",
    before_begin: `
`,
    after_begin: `>
`,
    before_end: `
`,
    after_end: `
`
  };
}, Pt = function(e) {
  return {
    begin_tag: "<" + e,
    end_tag: "</" + e + ">",
    before_begin: "",
    after_begin: ">",
    before_end: "",
    after_end: ""
  };
}, z = [
  //          {left:"<p>", right:"</p>", tag:"p"},  // for compatibility with PreTeXt!
  { left: "$$", right: "$$", tag: "smen" },
  { left: "\\[", right: "\\]", tag: "smen" }
  // these don;t work: not sure why
];
Ge.forEach((e) => {
  z.push(
    { left: "\\begin{" + e[0] + "}", right: "\\end{" + e[0] + "}", tag: e[1] }
  );
});
z.push({ left: "<md>", right: "</md>", tag: "md" });
z.push({ left: "<me>", right: "</me>", tag: "me" });
z.push({ left: "<mdn", right: "</mdn>", tag: "mdn" });
z.push({ left: "<men", right: "</men>", tag: "men" });
const R = [];
let De = [...Te, ...Ne], me = [...De, ...ke];
me.push("p");
me.push("statement");
De.forEach((e) => {
  R.push(pe(e)), R.push(re(e)), R.push(ce(e));
});
je.forEach((e) => {
  R.push(pe(e)), R.push(re(e)), R.push(ce(e));
});
let K = Array.from(R, ({ tag: e }) => e);
K = [...new Set(K)];
let B = [
  { left: "\\(", right: "\\)", tag: "sm" }
  //          {left:"|", right:"|", tag:"placeholder"}  // just for testing
];
Ee.forEach((e) => {
  B.push(re(e));
});
const ve = {
  begin_tag: "",
  end_tag: "",
  before_begin: "",
  after_begin: "",
  before_end: "",
  after_end: ""
}, Ot = {
  begin_tag: "BEGINTAG",
  end_tag: "ENDTAG",
  before_begin: "BB",
  after_begin: "AB",
  before_end: "BE",
  after_end: "AE"
}, N = {
  // start with the quirky ones
  text: ve,
  placeholder: ve,
  title: {
    begin_tag: "<title>",
    end_tag: "</title>",
    before_begin: `
`,
    after_begin: "",
    before_end: "",
    after_end: `
`
  }
};
Ee.forEach((e) => {
  N[e] = {
    begin_tag: "<" + e + ">",
    end_tag: "</" + e + ">",
    before_begin: "",
    after_begin: "",
    before_end: "",
    after_end: ""
  };
});
me.forEach((e) => {
  N[e] = C(e);
});
je.forEach((e) => {
  N[e] = C(e);
});
we.forEach((e) => {
  N[e] = C(e);
});
Qe.forEach((e) => {
  N[e] = C(e);
});
[...Pe, ...Oe, ...Se].forEach((e) => {
  N[e] = C(e);
});
N.ol = {
  begin_tag: `<p>
<ol>`,
  end_tag: `</ol>
</p>`,
  before_begin: `
`,
  after_begin: `
`,
  before_end: `
`,
  after_end: `
`
};
N.ul = {
  begin_tag: `<p>
<ul>`,
  end_tag: `</ul>
</p>`,
  before_begin: `
`,
  after_begin: `
`,
  before_end: `
`,
  after_end: `
`
};
ee.forEach((e) => {
  N[e] = {
    begin_tag: `
<` + e,
    end_tag: "</" + e + ">",
    before_begin: "",
    after_begin: `>
`,
    // because probably source has the \n
    before_end: `
`,
    after_end: `
`
  };
});
N.sm = Pt("m");
N.smen = C("men");
N.image = {
  begin_tag: "<image",
  end_tag: "</image>",
  // should not be a special case?
  before_begin: "",
  after_begin: `>
`,
  before_end: `
`,
  after_end: `
`
};
N.description = {
  begin_tag: "<description>",
  end_tag: "</description>",
  // img or image?  should not be a special case?
  before_begin: `
`,
  after_begin: "",
  before_end: "",
  after_end: `
`
};
function St(e, t = "placeholder") {
  let r = Nt(e), n = "";
  r.match(/^\s*<title>/) ? (n = r.replace(/^\s*<title>(.*?)<\/title>.*/s, "$1"), r = r.replace(/^\s*<title>(.*?)<\/title>/, "")) : r.match(/^\s*\[/) && (n = r.replace(/^\s*\[([^\[\]]*)\].*/s, "$1"), r = r.replace(/^\s*\[([^\[\]]*)\]/, ""));
  let i = r.replace(/([^\s])\\label({|\[|\()/g, `$1
\\label$2`).replace(/\n\s*\n\s*>/g, `

+++sTaRTbQ>`);
  i = i.replace(/(\$\$|\\end{equation}|\\end{align}|\\\]) *\n([^\n])/g, `$1
+++saMePaR$2`), i = i.replace(/(\/me>|\/md>|\/men>|\/mdn>) *\n *([^\n<])/g, `$1
+++saMePaR$2`), i = i.replace(/<p>\s*(<ol>|<ul>|<dl>)/g, "$1"), i = i.replace(/(<\/ol>|<\/ul>|<\/dl>)\s*<\/p>/g, "$1");
  let h = i.replace(/(<diagram)(.*?)(<\/diagram>)/sg, function(q, _, O, T) {
    const Ue = O.replace(/(<|<\/)definition(>)/g, "$1predefinition$2");
    return _ + Ue + T;
  }), c = new RegExp("([^\\n])(\\n *(" + W.join("|") + ") *:)", "g");
  h = h.replace(c, `$1
$2`), console.log("originaltextC", h);
  let m = { tag: t, content: h };
  n && (m.title = n);
  let d = { ...m };
  const a = 15;
  for (let q = 0; q < a; ++q)
    k.forEach((O) => {
      d = S(d, O, 0, q), de.forEach((T) => {
        d = A(d, T[0], 0, q, T[1]);
      });
    });
  let p = { ...d };
  p = V(p, "all", K);
  let l = { ...p };
  l = A(l, "oneline environments", 0, 0, "all"), l = A(l, "attributes", 0, 0, "all"), de.forEach((q) => {
    l = A(l, q[0], 0, 0, q[1]);
  }), l = V(l, "all", K), l = A(l, "blockquotes", 0, 0, ["p"]);
  let u = { ...l };
  u = A(u, "extract li", 0, 0, "all"), u = A(u, "clean up substructure", 0, 0, We);
  const s = S(u, B, 0, a + 1, "all", I), y = S(s, "spacelike", 0, a + 1, "all", I), f = S(y, B, 0, a + 1, "all", I), v = S(f, B, 0, a + 1, "all", I), E = A(v, "fonts", 0, 0, I), b = A(E, "texlike", 0, 0, I);
  let w = S(b, "spacelike", 0, a + 1, "all", I);
  w = S(w, B, 0, a + 1, "all", I), w = S(w, B, 0, a + 1, "all", I);
  const $ = A(w, "extract li", 0, 0, ["p"]), j = A($, "gather li", 0, 0, U), M = A(j, "absorb math", 0, 0, U, "", "", t);
  let X = A(M, "statements", 0, 0, Ve), Z = A(X, "prefigure", 0, 0, ["prefigure"]);
  return console.log("tmp5", Z), oe(Z);
}
export {
  St as FlexTeXtConvert
};
