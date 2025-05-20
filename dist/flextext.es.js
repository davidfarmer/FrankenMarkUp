const oe = {
  begin_tag: "",
  end_tag: "",
  // not sure we need the 'export'
  before_begin: "",
  after_begin: "",
  before_end: "",
  after_end: ""
}, A = {
  // start with the quirky ones
  text: oe,
  placeholder: oe,
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
}, Z = function(e) {
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
}, ee = function(e) {
  return { left: "<" + e + ">", right: "</" + e + ">", tag: e };
}, se = function(e) {
  return { left: "<" + e + " ", right: "</" + e + ">", tag: e };
}, ue = function(e) {
  return { left: "\\begin{" + e + "}", right: "\\end{" + e + "}", tag: e };
}, we = function(e) {
  if (!Array.isArray(e))
    return e;
  let t = [];
  return e.forEach((i) => {
    t.push(se(i)), t.push(ee(i)), t.push(ue(i));
  }), t;
}, Ve = [
  // [latex_name, ptx_tag]
  // could these be handled by an alias, like we did with quote -> blockquote?
  ["equation", "men"],
  ["equationstar", "me"],
  // preprocesssor does {abcd*} -> {abcdstar}
  ["align", "mdn"],
  ["alignstar", "md"]
], B = [
  //          {left:"<p>", right:"</p>", tag:"p"},  // for compatibility with PreTeXt!
  { left: "$$", right: "$$", tag: "me" }
  //          {left:"\\[", right:"\\]", tag:"me"},   // preprocessor handles these; don't work: not sure why
];
Ve.forEach((e) => {
  B.push(
    { left: "\\begin{" + e[0] + "}", right: "\\end{" + e[0] + "}", tag: e[1] }
  );
});
B.push({ left: "<md>", right: "</md>", tag: "md" });
B.push({ left: "<me>", right: "</me>", tag: "me" });
B.push({ left: "<mdn", right: "</mdn>", tag: "mdn" });
B.push({ left: "<men", right: "</men>", tag: "men" });
const te = ["md", "mdn", "me", "men"];
te.forEach((e) => {
  A[e] = {
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
[...te];
const ke = ["reading-questions", "introduction", "conclusion", "objectives", "statement", "task", "worksheet", "page"], xe = ["ol", "ul", "dl"], We = ["li"], Le = ["aside", "historical", "biographical"], pe = ["algorithm", "claim", "corollary", "fact", "identity", "lemma", "proposition", "theorem"], ce = ["assumption", "axiom", "conjecture", "heuristic", "hypothesis", "principle"], Me = ["convention", "insight", "note", "observation", "remark", "warning"], $e = ["example", "problem", "question"], qe = ["definition"], re = ["exercise"], Ae = ["proof"], _e = ["activity", "exploration", "investigation", "project"], ie = ["hint", "answer", "solution"], Pe = ["case", "task"], Te = ["em", "term", "alert", "m", "q", "c", "tag"];
let Ee = ["section", "subsection", "worksheet", "paragraphs"], Ne = [
  // peer of p cildren of (sub)sections
  ...Le,
  ...pe,
  ...ce,
  // ...list_like,  (this caused an infinite recursion)
  ...Me,
  ...$e,
  ...qe,
  ...re,
  ...Ae,
  ..._e,
  ...ie,
  "blockquote",
  "sidebyside",
  "li"
];
const D = [
  ...Ee,
  ...Ne,
  ...ie,
  ...Pe,
  ...ke,
  "enumerate",
  "itemize",
  "placeholder"
], Se = ["figure", "table", "listing", "enumerate", "itemize"], Oe = ["image", "tabular", "program"], je = ["latex-image", "prefigure", "description", "caption", "tikzpicture"], Re = ["figure", "table", "tabular", "enumerate", "ol", "ul", "dl"], Ue = [...pe, ...ce, ...re, "task"], S = [
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
], U = {
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
}, ze = [
  "exercisegroup",
  "exercises",
  "prefigure",
  "tikzpicture",
  "diagram",
  ...U.diagram
], He = Object.keys(U), I = [];
let Ce = [...Ee, ...Ne], me = [...Ce, ...xe];
me.push("p");
me.push("statement");
Ce.forEach((e) => {
  I.push(se(e)), I.push(ee(e)), I.push(ue(e));
});
Re.forEach((e) => {
  I.push(se(e)), I.push(ee(e)), I.push(ue(e));
});
let J = Array.from(I, ({ tag: e }) => e);
J = [...new Set(J)];
me.forEach((e) => {
  A[e] = Z(e);
});
Re.forEach((e) => {
  A[e] = Z(e);
});
ke.forEach((e) => {
  A[e] = Z(e);
});
ze.forEach((e) => {
  A[e] = Z(e);
});
[...Se, ...Oe, ...je].forEach((e) => {
  A[e] = Z(e);
});
let X = [
  { left: "\\(", right: "\\)", tag: "m" }
  //          {left:"|", right:"|", tag:"placeholder"}  // just for testing
];
Te.forEach((e) => {
  X.push(ee(e));
});
Te.forEach((e) => {
  A[e] = {
    begin_tag: "<" + e + ">",
    end_tag: "</" + e + ">",
    before_begin: "",
    after_begin: "",
    before_end: "",
    after_end: ""
  };
});
A.ol = {
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
A.ul = {
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
A.enumerate = A.ol;
A.itemize = A.ul;
A.tikzpicture = {
  begin_tag: `<image>
<latex-image>
\\begin{tikzpicture}`,
  end_tag: `\\end{tikzpicture}
</latex-image>
</image>`,
  before_begin: `
`,
  after_begin: `
`,
  before_end: `
`,
  after_end: `
`
};
A.image = {
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
A.description = {
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
const Ke = ["cases", "align", "system", "derivation", "linearsystem"], G = [
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
k.push([..._e]);
k.push([...$e, ...re]);
k.push(["introduction", "conclusion"]);
k.push([...pe, ...ce, ...Me, ...qe]);
k.push(["task"]);
k.push(["statement"]);
k.push([...Ae, ...ie]);
k.push([...Pe]);
k.push([...Le]);
k.push([...Se]);
k.push([...Oe]);
k.push([...je]);
k.push(["prefigure"]);
k.push(["diagram"]);
k.push(U.diagram);
k.push([...xe]);
k.push([...We]);
k.push(["blockquote"]);
k.push(["p"]);
k.push("displaymath");
k.push(["mrow"]);
const de = [
  ["extraneous math", te],
  ["workspace", [...re]],
  ["margins", ["worksheet", "sidebyside"]],
  ["margin", ["worksheet", "sidebyside"]],
  ["xmlattributes", "all"],
  ["title", "all"],
  ["label", "all"]
];
let Ge = {
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
  em: ["emph"],
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
const Ye = {
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
var h = {
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
  of: {
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
      "1,4": `#2 & \\text{ #3 } #4\\\\
`
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
], tt = ["∑", "⋃", "⋂", "⨁", "⨂", "∐", "∏", "∮", "∭", "∬", "∫", "∰", "∯", "∮"], Ie = [
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
], Xe = et.slice();
for (const e of Ie)
  Xe.push(e[0]);
console.debug("Do I see this?");
console.debug("greedyfunctions", Xe);
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
for (const e of Ie)
  h[e[0]] = {
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
  }, h["base" + e[0]] = {
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
  h[e[1]] = {
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
  h[e[0]] = {
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
function it(e) {
  return e.replace(/\s\s+/g, " ");
}
function Ze(e) {
  return /^[0-9\.,]+$/.test(e);
}
function nt(e) {
  return /^[a-zA-Z]+$/.test(e);
}
function ge(e) {
  return /^&[a-zA-Z]+;$/.test(e);
}
function ot(e) {
  return /^[0-9\.,].*[a-zA-Z]$/.test(e);
}
function lt(e) {
  return Ze(e) || e.length == 1 || e.trim() in h && h[e.trim()].type == "symbol";
}
function T(e, t) {
  if (ot(e)) {
    let r = e.replace(/[a-zA-Z]+$/, ""), n = e.replace(/^[0-9\.,]+/, "");
    console.debug("found mixed", e, "with parts", r, ",", n), r = T(r, t), n = T(n, t);
    let o = "";
    return t == "MathML" ? o = "<mo>&InvisibleTimes;</mo>" : t == "Speech" && (o = " times "), r + o + n;
  }
  let i = e;
  return console.debug("markAtomicItem of", i, "endans", ge(e)), t == "MathML" && (Ze(e) ? i = "<mn>" + i + "</mn>" : ge(e) ? i = "<mi>" + i + "</mi>" : nt(e) ? i = i.replace(/(.)/g, "<mi>$1</mi>") : tt.includes(e) ? i = "<mo>" + i + "</mo>" : e.includes("mtext") || i != "" && (i = "<unknown>" + i + "</unknown>", console.warn("unknown type", "X" + i + "X"))), i;
}
function at(e) {
  let t = e;
  for (let i = 0; i <= 2; ++i)
    t = t.replace(/to the quantity([A-Z]?) +negative 1 +([A-Z]?)endquantity/g, "inverse"), t = t.replace(/to the quantity([A-Z]?) +2 +([A-Z]?)endquantity/g, "squared"), t = t.replace(/power +2 +/g, "squared "), t = t.replace(/(^| )quantity([A-Z]?) +([^ ]+) +([A-Z]?)endquantity/g, " $3 "), t = t.replace(/(^| )quantity([A-Z]?) +(negative +[^ ]+) +([A-Z]?)endquantity/g, " $3 "), t = t.replace(/<mrow ([^<>]+)><(mi|mo|mn)>([^<>]+)(<\/(mi|mo|mn)>)<\/mrow>/g, "<$2 $1>$3$4"), t = t.replace(/<mrow>(<([a-z]+)>)([^<>]+)(<\/$2>)<\/mrow>/g, "$1$3$4"), console.debug("now ans", t), t = t.replace(/<mrow>(<mi>)([^<>]+)(<\/mi>)<\/mrow>/g, "$1$2$3"), t = t.replace(/<mrow>(<mo>)([^<>]+)(<\/mo>)<\/mrow>/g, "$1$2$3"), t = t.replace(/<mrow>(<mn>)([^<>]+)(<\/mn>)<\/mrow>/g, "$1$2$3"), t = t.replace(/(<mrow[^<>]*>)<mrow>([^w]*)<\/mrow>(<\/mrow>)/g, "$1$2$3"), console.debug("removed layer", i, "to get", t);
  return t = t.replace(/quantity([A-Z]?)/g, "quantity"), t = t.replace(/([A-Z]?)endquantity([A-Z]?)/g, "endquantity"), t = t.replace(/(quantity *)quantity([^q]*)endquantity( *endquantity)/g, "$1$2$3"), t = t.replace(/(quantity *)quantity([^q]*)endquantity( *endquantity)/g, "$1$2$3"), t.endsWith("\\") && (t += " "), t;
}
String.prototype.myHash = function() {
  var e = 0, t, i;
  if (this.length === 0) return e;
  for (t = 0; t < this.length; t++)
    i = this.charCodeAt(t), e = (e << 5) - e + i, e |= 0;
  return e;
};
class M {
  /*
    constructor(position, value, key = null, parent = null, conversiontarget) {
  */
  constructor(t, i, r = null, n = null, o = "unknown") {
    this.position = t, this.value = i, this.outputvalue = i, this.key = r, this.parent = n, this.conversiontarget = o, this.children = [], this.pair = [], this.noPriority = !1, this.exPriority = !1;
  }
  insert(t, i = t) {
    return this.children.push(new M(this.children.length, t, i, this, this.conversiontarget)), !0;
  }
  insertNode(t) {
    return t.parent = this, t.position = this.children.length, this.children.push(t), !0;
  }
  addLeafMarkup() {
    console.debug("   adding leaf markup with key, val, oval", this.key, "a,a", this.value, "b,b", this.outputvalue, "to", this), this.key == null ? this.outputvalue = T(this.value, this.conversiontarget) : this.key == " " ? this.position == 1 ? (console.info("assuming implied multiplication"), console.info("What is next to this space key? parent:", this.parent, "left sibling", this.parent.children[0], "left sibling value", this.parent.children[0].value, "right sibling", this.parent.children[2]), this.conversiontarget == "MathML" ? this.outputvalue = "<mo>&InvisibleTimes;</mo>" : this.conversiontarget == "Speech" && (this.outputvalue = " times ")) : this.outputvalue = T(this.value, this.conversiontarget) : this.key == "quote" ? this.position == 1 && (this.outputvalue = this.value) : this.key == "" ? (console.debug("item with empty key.  Is this function apply?", this), this.position == 1 ? (console.debug("What is nect to this enpty key? parent:", this.parent, "left sibling", this.parent.children[0], "right sibling", this.parent.children[2]), this.parent.children[2].pair.length > 0 && (this.conversiontarget == "MathML" ? this.outputvalue = "<mo>&ApplyFunction;</mo>" : this.conversiontarget == "Speech" && (this.outputvalue = " of "))) : this.position == 0 ? this.conversiontarget == "Speech" ? this.outputvalue = " " + T(this.value, this.conversiontarget) : this.outputvalue = T(this.value, this.conversiontarget) : this.outputvalue = T(this.value, this.conversiontarget)) : h[this.key].type == "operator" ? this.value != this.key ? this.outputvalue = T(this.value, this.conversiontarget) : this.outputvalue = T(this.value, this.conversiontarget) : this.key == "," ? (console.debug("found comma with parent", this.parent), this.position == 1 && (this.outputvalue = "COMMA")) : h[this.key].type == "symbol" ? console.debug("found a symbol") : h[this.key].type == "relation" ? (console.debug("found a relation"), this.value != this.key ? this.outputvalue = T(this.value, this.conversiontarget) : this.outputvalue = T(this.value, this.conversiontarget)) : h[this.key].type == "function" && (console.debug("found a function"), this.value != this.key ? (console.debug("marking the argument of a function", this.value, "within", this), this.outputvalue = T(this.value, this.conversiontarget)) : this.outputvalue = T(this.value, this.conversiontarget)), console.debug("   and now leaf is key, val, oval", this.key, ",", this.value, ",", this.outputvalue);
  }
  combine(t) {
    for (let i of this.children)
      i && i.combine(t);
    if (this.isLeaf) {
      try {
        console.debug("isLeaf with key", this.key, "pair", this.pair, "parent children", this.parent.children, "of length", this.parent.children.length, "what we want", this.parent.children[2].pair, "ee", this);
      } catch {
        console.debug("isLeaf with key", this.key, "pair", this.pair, "this", this);
      }
      console.debug("the root", this.treeRoot), this.value.length > 1 && (this.value = this.value.trim()), this.addLeafMarkup();
    } else {
      console.debug("not a Leaf", this.pair, this);
      let i = this.children[0].key, r, n, o = this.children.length, f = 0;
      for (; this.children[f].value != i; )
        f++;
      if (i == " ")
        this.children.length > 1 && this.children[1].value == i ? (i == " " && (i = "\\,"), r = this.children[0].value + i + this.children[2].value, console.debug("adding Oo to", this, "because of", this.children[0]), n = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, this.key && this.key != " " && h[this.key].type != "function" && !h[this.key].wrappedarguments && h[this.key].priority > 20 && (console.debug("maybe wrapping this.key", this.key, "for", n), this.conversiontarget == "MathML" ? n = "<mrow>" + n + "</mrow>" : this.conversiontarget == "Speech" && (console.debug("AddIng quantity", this), n = "quantityS " + n + " Sendquantity"))) : (n = this.children[1].outputvalue, r = this.children[1].value);
      else if (i == "")
        console.debug("  found an empty key", this), this.children.length > 1 && this.children[1].value == i ? (n = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, r = this.children[0].value + this.children[1].value + this.children[2].value) : (n = this.children[1].outputvalue, r = this.children[1].value);
      else {
        console.debug("about to use conversiontarget", this.conversiontarget);
        try {
          console.debug("               trying to extract using key", i, "position", f, "numberOfSiblings", o, "from", this, "with rule of", f + 1 + "," + o), this.conversiontarget == "MathML" ? (r = h[i].rule[f + 1 + "," + o], n = h[i].ruleML[f + 1 + "," + o], console.debug("               attempted       MathML conversion: ", r, "newOutputValue", n)) : this.conversiontarget == "Speech" ? (r = h[i].rule[f + 1 + "," + o], n = h[i].speech[f + 1 + "," + o]) : (r = h[i].rule[f + 1 + "," + o], n = h[i].rule[f + 1 + "," + o]);
        } catch {
          r = h[i].rule[f + 1 + "," + o], n = h[i].rule[f + 1 + "," + o], console.debug("                      MathML conversion failed on", r);
        }
        if (r.includes("#comma?") && (this.key && h[this.key].type == "operator" && h[this.key].priority < 0 ? r = r.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$1") : r = r.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$2")), r.includes("#{}")) {
          let u = !0, m = this;
          for (["^^", "__"].includes(m.key) && (u = !1); m.parent && isScriptPure(m.key); )
            m = m.parent, ["^^", "__"].includes(m.key) && (u = !1);
          u ? r = r.replace("#{}", "{}") : r = r.replace("#{}", "");
        }
        for (let u = 0; u < this.children.length; u++) {
          let m = this.children[u].value, d = this.children[u].outputvalue, l = m, a = d;
          r.includes("#@" + (u + 1)) && (l.length > 1 && (l = "{" + l + "}"), r = r.replace("#@" + (u + 1), l), n = n.replace("#@" + (u + 1), a)), t.includes("caseEnvironment") ? (r = r.replace("#&", "&"), n = n.replace("#&", "&")) : (r = r.replace("#&\\text{", "\\text{ "), r = r.replace("#&", ""), n = n.replace("#&\\text{", "\\text{ "), n = n.replace("#&", "")), r = r.replace("#" + (u + 1) + "@1", m[0]), r = r.replace("#" + (u + 1) + "@-1", m.substring(1)), r = r.replace("#" + (u + 1), m), n = n.replace("#" + (u + 1) + "@1", d[0]), n = n.replace("#" + (u + 1) + "@-1", d.substring(1)), n = n.replace("#" + (u + 1), d);
        }
      }
      this.value = r, this.outputvalue = n, this.children = [];
    }
    if (this.parent && h[this.key] && h[this.key].offpair) {
      let i = this.parent.children.length, r = 0;
      for (console.debug(i, "this.key", this.key, "this", this, "this.parent", this.parent); this.parent.children[r].value != this.key; )
        console.debug(r, "this.parent.children[position]", this.parent.children[r]), r++;
      console.debug("dictionary[this.key].offpair", h[this.key].offpair, "looking for", r + 1 + "," + i, "containing", this.position + 1, "in", h[this.key].offpair[r + 1 + "," + i]), h[this.key].offpair[r + 1 + "," + i] && h[this.key].offpair[r + 1 + "," + i].includes(this.position + 1) && this.pair.pop();
    }
    if (this.pair && this.pair.length > 0 && (console.debug("this.pair[0]", this.pair[0]), this.pair[0] = ut(this.pair, this.conversiontarget), this.pair[0].length > 0)) {
      console.debug("this.pair[0]", this.pair[0]);
      for (let i of this.pair)
        if (this.value = i[0] + this.value + i[1], this.conversiontarget == "MathML") {
          if (console.debug("((((adding parentheses to", this.outputvalue, "of", this), this.outputvalue.length > 18 && (this.outputvalue = "<mrow>" + this.outputvalue + "</mrow>"), !this.key || this.key == " " || !h[this.key].delimitedarguments) {
            let r = this.outputvalue;
            i[0] != "" && (r = '<mo stretchy="false">' + i[0] + "</mo>" + r), i[1] != "" && (r = r + '<mo stretchy="false">' + i[1] + "</mo>"), this.outputvalue = r;
          }
        } else this.conversiontarget == "Speech" ? lt(this.outputvalue) || (console.debug("adding quantity", this), this.outputvalue = "quantityP " + this.outputvalue + " Pendquantity") : (!this.key || this.key == " " || !h[this.key].delimitedarguments) && (this.outputvalue = i[0] + this.outputvalue + i[1]);
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
  constructor(t, i, r, n) {
    this.root = new M(t, i, r, null, n), console.debug("       Tree 0 conversiontarget", n);
  }
  *preOrderTraversal(t = this.root) {
    if (yield t, t.children.length)
      for (let i of t.children)
        yield* this.preOrderTraversal(i);
  }
  *postOrderTraversal(t = this.root) {
    if (t.children.length)
      for (let i of t.children)
        yield* this.postOrderTraversal(i);
    yield t;
  }
  insert(t, i, r = i) {
    console.debug("       Tree 1 conversiontarget", this.conversiontarget);
    for (let n of this.preOrderTraversal())
      if (console.debug("trying Tree1 node", n), n.value === t)
        return n.children.push(new M(i, r, n, conversiontarget)), !0;
    return !1;
  }
  remove(t) {
    for (let i of this.preOrderTraversal()) {
      const r = i.children.filter((n) => n.value !== t);
      if (r.length !== i.children.length)
        return i.children = r, !0;
    }
    return !1;
  }
  find(t) {
    for (let i of this.preOrderTraversal())
      if (i.value === t) return i;
  }
  // refactor to combine this and the following, so the tree is only traversed once
  adjustImpliedMultiplication() {
    let t = ["lim", "quote", "dollar"], i = ["quote", "cent"];
    for (let r of this.preOrderTraversal())
      t.includes(r.value) && t.includes(r.key) && r.position == 0 && (console.debug("found a lim", r), console.debug("now looking at", r.parent, "and", r.parent.children[0], "and", r.parent.children[1]), r.parent.parent && r.parent.parent.children[1].key == " " && r.parent.parent.children[1].value == " " && (console.error("adding hello", r.parent.parent.children[1]), r.parent.parent.children[1].key = "✂️", console.error("now", r.parent.parent.children[1]))), i.includes(r.value) && i.includes(r.key) && r.position == 0 && (console.debug("found a quote", r), console.debug("now looking at parent", r.parent, "and itself", r.parent.children[0], "and parent parent", r.parent.parent), r.parent.parent && r.parent.parent.parent && r.parent.parent.parent.children[1].key == " " && r.parent.parent.parent.children[1].value == " " ? (console.error("adding goodbye", r.parent.parent.parent.children[1]), r.parent.parent.parent.children[1].key = "✂️", console.error("now", r.parent.parent.parent.children[1])) : r.parent && r.parent.parent && r.parent.parent.children[1].key == " " && r.parent.parent.children[1].value == " " && (console.error("adding goodbye", r.parent.parent.children[1]), r.parent.parent.children[1].key = "✂️", console.error("now", r.parent.parent.children[1])));
  }
  combineSubSup() {
    for (let t of this.preOrderTraversal())
      t.value === "" && t.key === "^" && t.position == 0 && (t.children.length > 1 && t.children[0].key == "_" ? (t.parent.children[2].key = "subsup", t.parent.children[2].position = 3, t.parent.children[1] = t.children[2], t.parent.children[1].key = "subsup", t.parent.children[1].position = 2, t.parent.children[1].parent = t.parent, t.parent.children.unshift(t.children[0]), t.parent.children[0].key = "subsup", t.parent.children[0].position = 0, t.parent.children[0].parent = t.parent, t.parent.children[1] = t.children[1], t.parent.children[1].key = "subsup", t.parent.children[1].value = "subsup", t.parent.children[1].position = 1, t.parent.children[1].parent = t.parent) : console.debug("no children"));
  }
  addParents() {
    for (let t of this.preOrderTraversal())
      for (const i of t.children)
        i.parent != t && (i.parent = t);
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
  let i = e[0];
  return console.debug("adjusting brackets", i), t == "LaTeX" && (i[0] == "{" && (i[0] = ["\\{"]), i[1] == "}" && (i[1] = ["\\}"])), i[0] == "⁅" && (i = []), i[0] == "❲" && (i[0] = [""]), i[1] == "❳" && (i[1] = [""]), i;
}
function ye(e) {
  return e === void 0 ? "undefined" : e === null ? "null" : e == "" ? "es" : e.replaceAll(" ", "␣");
}
function Be(e, t) {
  if (console.debug("printTree of", e), !e)
    return "";
  let i = t + "[" + ye(e.key) + "]   |" + ye(e.value) + "|";
  if (e.pair.length && (i += "    " + e.pair[0] + " " + e.pair.length), e.children.length == 0 ? i += "    leaf" : e.parent != null ? i += "       " + e.parent.children.length : i += "       nuLL", i += `
`, e.children.length == 0)
    return i;
  {
    e.children.length;
    let r = i;
    for (let n = 0; n < e.children.length; ++n)
      r += Be(e.children[n], t + "    ");
    return r;
  }
}
function Y(e, t, i) {
  console.debug("starting M2TreeConvert  conversiontarget", i);
  let r = new st(0, e, null, i), n = "", o = r.root, f = !0, u, m = [], d = {};
  for (console.debug("continuing M2TreeConvert  conversiontarget", i, "on", e); f; ) {
    let l = o.value;
    console.debug("fullStr", "X" + l + "X");
    let a = 0, c = 0, p = 0, s, g;
    for (; l.length > p; ) {
      let y = l[p], v = !1, _ = !1;
      for (let b of [['"', '"']])
        if (y == b[0]) {
          console.debug("found a quote");
          let w = be(l, p, b[0], b[1], [[b[0]]]);
          if (w != -1) {
            let L = [l.substring(0, p), l.substring(p + 1, w), l.substring(w + 1)];
            console.debug("children are", L), o.value = "";
            let $ = new M(0, "\\ \\ \\text{" + L[1] + "}\\ \\ ", "justatest", null, i);
            if (console.debug("qNode was", $, "with children", $.children), $ = Q(L[0], $, i), console.debug("qNode is", $, "with children", $.children), console.debug("stackedTreeNode was", u), u = F(u, $, i), console.debug("stackedTreeNode is", u, "with children", u.children), m.length > 0) {
              u.key = m[0][0].children[0].key;
              let O = m[0][0].children.pop();
              m[0][0].insertNode(u), m[0][0].insertNode(O), m[0][1]--, m[0][1] == 0 && m.shift(), u = void 0;
            }
            l = l.substring(w + 1), p = 0, c = 0, s = void 0, g = void 0, v = !0;
          }
        }
      if (ft(y)) {
        console.debug("apparently found a left of pair", y);
        let b = dt(l, p);
        if (b != -1) {
          let w = [l.substring(0, p), l.substring(p + 1, b), l.substring(b + 1)];
          o.value = "";
          let L = Y(w[1].trim(), t, i)[0].root;
          if (L.pair.push([y, l[b]]), L = Q(w[0], L, i), console.debug("just made pNode", L), u = F(u, L, i), console.debug("just made stackedTreeNode", u), m.length > 0) {
            u.key = m[0][0].children[0].key;
            let $ = m[0][0].children.pop();
            m[0][0].insertNode(u), m[0][0].insertNode($), m[0][1]--, m[0][1] == 0 && m.shift(), u = void 0;
          }
          l = l.substring(b + 1), p = 0, c = 0, s = void 0, g = void 0, v = !0;
        }
      }
      if (y == "<" && l[p + 1] != " ") {
        console.debug("looking for an angle pair");
        let b = gt(l, p);
        if (b != -1) {
          let w = [l.substring(0, p), l.substring(p + 1, b), l.substring(b + 1)];
          o.value = "";
          let L = Y(w[1].trim(), t, i)[0].root;
          if (L.pair.push(["\\langle ", "\\rangle "]), L = Q(w[0], L, i), u = F(u, L, i), m.length > 0) {
            u.key = m[0][0].children[0].key;
            let $ = m[0][0].children.pop();
            m[0][0].insertNode(u), m[0][0].insertNode($), m[0][1]--, m[0][1] == 0 && m.shift(), u = void 0;
          }
          l = l.substring(b + 1), p = 0, c = 0, s = void 0, g = void 0, v = !0, console.debug("keyType", g);
        }
      }
      console.debug("OUT j", c, "on", "X" + l + "X", "woith counter", p);
      for (let b = c; b <= p; b++) {
        if (console.debug("inner j", b, "on", "X" + l + "X", "counter", p), l[p + 1] && l[p].match(/[A-Za-z␣]/g) && l[p + 1].match(/[A-Za-z␣]/g)) {
          console.debug("  contuing because building up a word on", l[p], "and", l[p + 1], "so far", l.substring(b, p + 1));
          continue;
        }
        let w = l.substring(b, p + 1), L = mt(l, w, p, u);
        if (console.debug("subStr", w, "type", L), L) {
          s = w, a = b, g = L, _ = !0, console.debug("A keyType", g, "with key", "X" + s + "X", "from subStr", w);
          break;
        }
        if (w == " " && (p >= 1 || o.parent && o.parent.children.length == 2 && o.position == 1 || u) && !ht(yt(l, p))) {
          s = w, a = b, g = "space", _ = !0, console.debug("B keyType", g);
          break;
        } else
          console.debug("     maybe breaking on multiword subStr", w);
      }
      if (_)
        break;
      v || (p++, y.match(/[\s\d]/g) && (c = p));
    }
    if (console.debug("is there a" + s + "key?"), s) {
      console.debug("yes, there is there a" + s + "key"), !h[s] && s != " " && s != "" && (s = fe.getItem(s)), console.debug("and now it is" + s + "key of", g, "keyType");
      let y, v, _, b;
      switch (g) {
        case "space":
        case "operator":
        //operators
        case "relation":
          if (y = [l.substring(0, a), s, l.substring(p + 1)], g == "relation" && t.includes("&beforeFirstRelation") && !d["&beforeFirstRelation"] && (d["&beforeFirstRelation"] = !0, y[2] = "&" + y[2]), v = new M(0, y[0], s, null, i), _ = new M(0, y[1], s, null, i), b = new M(0, y[2], s, null, i), u && (u = ct(v.value, u, i), v = u, v.key = s, u = void 0), g == "space" && m.length > 0) {
            o.value = y[0], b.key = m[0][0].children[0].key, m[0][0].insertNode(b), o = m[0][0].children[m[0][0].children.length - 1], m[0][1]--, m[0][1] == 0 && m.shift();
            break;
          }
          let w = !0;
          (Qe(s) || Fe(s)) && (g != "space" && y[0].length == 0 || l[a - 1]) && l[p + 1] && l[a - 1] != " " && l[p + 1] != " " && (w = !1);
          let L = ne(s), $ = !1;
          g != "space" && h[s].script && (L -= 0.1, w && ($ = !0, v.exPriority = !0, _.exPriority = !0, b.exPriority = !0), w || (w = !0), vt(o, s) && (w = !1));
          let O = 0;
          if (o.exPriority && !$ && (O += 0.2), w && (o.noPriority || L + O < ne(o.key))) {
            let z = !1;
            for (o.value = v.value, o.children = v.children, o.pair = v.pair, o.exPriority = v.exPriority, o.noPriority = v.noPriority; o.parent; ) {
              let P = o.position;
              if (o = o.parent, O = 0, !$) {
                for (let C of o.children)
                  if (C.exPriority) {
                    O += 0.2;
                    break;
                  }
              }
              if (!o.children[0].noPriority && L + O >= ne(o.children[0].key)) {
                let C = o.children[P], E = new M(P, null, o.children[0].key, null, i);
                E.noPriority = o.children[P].noPriority, E.exPriority = o.children[P].exPriority, o.children[P] = E, E.parent = o, E.insertNode(C), C.key = s, C.noPriority = _.noPriority, C.exPriority = _.exPriority, E.insertNode(_), E.insertNode(b), o = E.children[2], z = !0;
                break;
              }
            }
            if (!z) {
              let P = new M(0, "", null, null, i);
              r.root.key = s, P.insertNode(r.root), P.insertNode(_), P.insertNode(b), r.root = P, o = r.root.children[2];
            }
          } else
            w || (v.noPriority = !0, _.noPriority = !0, b.noPriority = !0), o.value = "", o.insertNode(v), o.insertNode(_), o.insertNode(b), o = o.children[2];
          break;
        //break case
        case "function":
          y = [l.substring(0, a), s, l.substring(p + 1)], y[2][0] == " " && (y[2] = y[2].substring(1)), v = new M(0, y[0], s, null, i), _ = new M(0, y[1], s, null, i), b = new M(0, y[2], s, null, i), u && (u = Q(v.value, u, i), v = u, v.key = s, u = void 0);
          let x = new M();
          if (x.conversiontarget = i, x.value = "", x.insert(s, s), b.key = s, h[s].pairedArgument) {
            let z = be(l, a, s, h[s].pairedArgument, h[s].family);
            if (z != -1) {
              let P = [l.substring(p + 1, z), l.substring(z + 1)], C = Y(P[0].trim(), t, i)[0].root, E = new M(0, P[1], s, null, i);
              x.insertNode(C), x.insertNode(E);
            } else
              x.insertNode(b);
          } else
            x.insertNode(b);
          let j = o;
          o = x.children[x.children.length - 1], v.value.length > 0 && (x = pt(v, x)), x.value = "", j.parent ? (x.key = j.parent.children[j.position].key, x.position = j.position, x.parent = j.parent, j.parent.children[j.position] = x) : r.root = x, h[s] && h[s].extraArgument && m.push([x, h[s].extraArgument]);
          break;
        case "postfix":
        // such as "!" for factorial.
        case "symbol":
        //symbols
        case "letter":
          y = [l.substring(0, a), s, l.substring(p + 1)], console.debug("making a symbolNode with", y);
          let R = new M();
          if (R.conversiontarget = i, R.value = "", R.insert(s, s), R = Q(y[0], R, i), u = F(u, R, i), console.debug("now have stackedTreeNode", u), m.length > 0) {
            u.key = m[0][0].children[0].key;
            let z = m[0][0].children.pop();
            m[0][0].insertNode(u), m[0][0].insertNode(z), m[0][1]--, m[0][1] == 0 && m.shift(), u = void 0;
          }
          o.value = y[2], console.debug("now have currentNode", o);
          break;
        case "multiline":
          y = [l.substring(0, a), s, l.substring(p + 1)];
          let K = new M(0, y[0], null, null, i);
          u = F(u, K, i), o.value = y[2], n = s, console.debug("----------- just set exParam = ", n);
          break;
        case "UNUSED":
          y = [l.substring(0, a), s, l.substring(p + 1)], o.value = y[2];
          break;
      }
    } else {
      if (u) {
        if (l.trim() != "") {
          console.debug("388 M2TreeConvert  conversiontarget", i);
          let v = new M();
          v.conversiontarget = i, u.key = "", v.insertNode(u), v.insert("", ""), v.insert(l, ""), u = v;
        }
        let y = o.position;
        u.position = y, u.key = o.key, o.parent ? (u.parent = o.parent, o.parent.children[y] = u) : r.root = u;
      }
      f = !1;
      break;
    }
  }
  return r.addParents(), console.debug("continuing", r.root.children[0], r.root.children[1]), r.combineSubSup(), console.debug("combineSubSup returned", r, "aa", r.root, "bb", r.root.children), r.adjustImpliedMultiplication(), console.debug("adjustImpliedMultiplication returned", r, "aa", r.root, "bb", r.root.children), console.debug(Be(r.root, "")), [r, n, d];
}
function F(e, t, i) {
  if (e) {
    console.debug("stackNode M2TreeConvert  stackedTreeNode.conversiontarget", e.conversiontarget);
    let r = new M();
    r.conversiontarget = i, e.key = "", r.insertNode(e), r.insert("", ""), t.key = "", r.insertNode(t), e = r;
  } else
    e = t;
  return e;
}
function Q(e, t, i) {
  if (e.trim() != "") {
    console.debug("combinePrev M2TreeConvert  ", e, "xx", t, "cc", i);
    let r = new M();
    r.conversiontarget = i, t.key = "", r.insert(e, ""), r.insert("", ""), r.insertNode(t), t = r, console.debug(" combinePrev pNode.conversiontarget", t);
  }
  return t;
}
function pt(e, t) {
  return console.debug("combinePrevNode preNode.conversiontarget", e.conversiontarget), e.insert("", ""), e.insertNode(t), e;
}
function ct(e, t, i) {
  if (e.trim() != "") {
    console.debug("combineAfter M2TreeConvert  conversiontarget", i);
    let r = new M();
    r.conversiontarget = i, t.key = "", r.insertNode(t), r.insert("", ""), r.insert(e, ""), t = r;
  }
  return t;
}
function mt(e, t, i, r) {
  let n = H(t);
  if (n && !bt(e, t, i))
    return n.mustHaveLeftArgument && i == 0 && !r ? void 0 : n.type;
}
function H(e) {
  return h[e] ? h[e] : (e = fe.getItem(e), e == -1 ? void 0 : h[e]);
}
function ft(e) {
  return ["(", "[", "{", "⁅", "❲"].includes(e);
}
function Fe(e) {
  let t = H(e);
  return t && t.type == "operator";
}
function ht(e) {
  for (let t = 1; t <= e.length; t++) {
    let i = e.substring(0, t);
    if (Fe(i) || Qe(i))
      return !0;
  }
  return !1;
}
function Qe(e) {
  let t = H(e);
  return t && t.type == "relation";
}
function ne(e) {
  let t = H(e);
  switch (e) {
    case " ":
    case "":
      return 19;
    default:
      return t ? t.priority : 999;
  }
}
function dt(e, t) {
  if (!["(", "[", "{", "⁅", "❲"].includes(e[t]))
    throw new Error("No" + lp + " at index " + t);
  let i = 1;
  for (let r = t + 1; r < e.length; r++)
    switch (e[r]) {
      case "(":
      case "[":
      case "{":
      case "⁅":
      case "❲":
        i++;
        break;
      case ")":
      case "]":
      case "}":
      case "⁆":
      case "❳":
        if (--i == 0)
          return r;
        break;
    }
  return -1;
}
function gt(e, t) {
  if (!["<"].includes(e[t] || [" "].includes(e[t + 1])))
    throw new Error("No" + lp + " at index " + t);
  let i = 1;
  for (let r = t + 1; r < e.length; r++)
    if (e[r] == "<" && e[r + 1] != " " && i++, e[r] == ">" && e[r - 1] != " " && --i == 0)
      return r;
  return -1;
}
function be(e, t, i, r, n) {
  if (e.substring(t, t + i.length) != i)
    throw new Error("No " + i + " at index " + t + " of " + e);
  let o = 1;
  for (let f = t + 1; f < e.length; f++) {
    if (e.substring(f, f + r.length) == r && --o == 0)
      return f;
    for (let u of n)
      e.substring(f, f + u.length) == u && e[f - 1].match(/[\s\d]/g) && o++;
  }
  return -1;
}
function yt(e, t) {
  let i = "";
  for (let r = t + 1; r < e.length; r++)
    switch (e[r]) {
      case `
`:
      case " ":
        break;
      default:
        i += e[r];
    }
  return i;
}
function bt(e, t, i) {
  for (let r = i + 1; r < e.length && !e[r].match(/[\s\d]/g); r++)
    if (t += e[r], H(t))
      return !0;
  return !1;
}
function vt(e, t) {
  if (console.debug("checkScriptSimilarity", e), e.pair.length > 0 || e.parent && e.parent.exPriority)
    return !1;
  let i = e;
  for (; i.parent && (i = i.parent, !(i.pair.length > 0 || e.parent && e.parent.exPriority)); )
    if (i.key == t)
      return !0;
  for (i = e.parent; i && i.children[0] && (i = i.children[0], !(i.pair.length > 0 || e.parent && e.parent.exPriority)); )
    if (i.key == t)
      return !0;
  return !1;
}
function wt(e, t) {
  return console.debug("combineTree2Latex", e, "params", t, "with output", e.root.outputvalue), e.root.combine(t), console.debug("AGAIN combineTree2Latex", e, "params", t, "with output", e.root.outputvalue), e.root.outputvalue;
}
function kt(e, t, i, r) {
  e = e.replace(/(&|\\amp)/g, "🎯");
  for (let d of fe.getAllMultiLine()) {
    let l = e.indexOf(d.slice(0, -1) + "(");
    for (; l != -1; ) {
      let a = Mt(e, l + d.length - 1, "(", ")");
      if (a != -1) {
        let c = [e.substring(0, l), e.substring(l + d.length, a), e.substring(a + 1)];
        newMiddleStr = d + `
 `, h[d].emptyLineBeforeIndent ? (newMiddleStr += c[1].replaceAll(";", `

 `), newMiddleStr += `
`) : newMiddleStr += c[1].replaceAll(";", `
 `), e = c[0] + newMiddleStr + c[2], l = e.indexOf(d.slice(0, -1) + "(");
      } else
        continue;
    }
  }
  e = e.replaceAll("\\,", ""), e = e.replaceAll("\\:", ""), e = e.replaceAll("\\;", ""), e = e.replaceAll("\\!", ""), e = e.replace(/([a-zA-Z])\\/g, "$1 "), e = e.replaceAll("\\", "");
  let n = e.split(`
`), o = "", f = [], u = "";
  for (; n.length > 0; ) {
    var m = [];
    if (f[0] && h[f[0]].params && (m = h[f[0]].params), console.debug("  ++  ++  ++  ++  ++  ++  ++  ++  ++  ++ "), console.debug("top of loop  ", n), console.debug("params = ", m), n[0].trim() == "" && !m.includes("system") && !m.includes("derivation") && !m.includes("align")) {
      console.info("skipping empty string"), n.shift();
      continue;
    }
    if (m.length > 0 && m.includes("caseEnvironment")) {
      let p = n[0], s = p.split(/(if|when|unless|otherwise)/g);
      s.length != 3 ? console.error("invalid cases line", p) : (p = "casesline(" + s[0] + ")(" + s[1] + ")(" + s[2] + ")", n[0] = p), console.debug("thisLinePieces", s);
    } else if (m.length > 0 && (m.includes("system") || m.includes("derivation"))) {
      let p = n[0];
      for (; n.length > 1 && n[1].trim() != ""; )
        p += n[1], n.splice(1, 1);
      let s = p.split(/(<=|>=|:=|<|>|=|~|≈|approx|asymp).*?/);
      if (s.length > 3) {
        let g = "";
        for (; s.length >= 3; )
          g = s.pop() + g;
        s[2] = g;
      }
      s.length != 3 ? console.warn("invalid system/derivation/align line", p, "with pieces", s) : (s[0].trim() == "" ? p = "derivationline(" + s[1].trim() + ")(" + s[2].trim() + ")" : p = "systemline(" + s[0].trim() + ")(" + s[1].trim() + ")(" + s[2].trim() + ")", n[0] = p);
    } else if (m.length > 0 && m.includes("align")) {
      let p = n[0];
      for (; n.length > 1 && n[1].trim() != ""; )
        p += n[1], n.splice(1, 1);
      let s = p.split(/(🎯).*?/);
      if (s[1] == "🎯" && (s[1] = ""), s.length > 3) {
        let g = "";
        for (; s.length >= 3; )
          g = s.pop() + g;
        s[2] = g;
      } else s.length == 3 ? (p = "alignline(" + s[0].trim() + ")(" + s[1].trim() + ")(" + s[2].trim() + ")", n[0] = p) : n[0] = "";
    }
    let d = Y(n[0].trim(), m, r);
    console.debug("temp");
    let l = d[0], a = d[1], c = wt(l, m);
    m.length && m.includes("caseEnvironment") || m.length && (m.includes("system") || m.includes("derivation") || m.includes("align")) && (m.includes("system") || m.includes("derivation") || m.includes("align")), n.length > 0 && a.length == 0 && (f.length > 0 && (!h[f[0]].absorbEmptyLine || n[0].trim().length > 0) ? h[f[0]].absorbEmptyLine && n.length > 1 && n[1].trim().length > 0 || n.length == 2 && n[1].trim().length == 0 || n.length == 1 || (h[f[0]].changeLineTurn ? c += h[f[0]].changeLineTurn + `
` : c += "") : n.length > 1 && (h[f[0]] && h[f[0]].absorbEmptyLine && n[0].trim().length == 0 || (c += `
`))), u = n[0], n.shift(), h[a] && (h[a].seperateOut && (c += i), h[a].noBeginEnd ? c += h[a].note + "{" : a == "cases:" ? c += "\\begin{" + h[a].note + `}
` : c += `
<` + h[a].note + `>
`, f.push(a)), f.length > 0 && n[0] && n[0][0] != " " && (!h[f[0]].emptyLineBeforeIndent || u.trim().length == 0) && (h[f[0]].noBeginEnd ? c += "}" : c += "AA\\end{" + h[f[0]].note + "}", h[f[0]].lineBreak && (c += `
`), h[f[0]].seperateOut && (c += t), f.shift()), o += c;
  }
  for (; f.length > 0; )
    h[f[0]].noBeginEnd ? o += "}" : m.length && m.includes("caseEnvironment") ? o += "\\end{" + h[f[0]].note + `}
` : o += "</" + h[f[0]].note + `>
`, h[f[0]].seperateOut && (o += t), f.shift();
  return it(o);
}
class xt {
  constructor() {
    this.cache = [], this.cacheSize = 500, this.nonCache = [], this.nonCacheSize = 500, this.multilineList = [];
  }
  getAllMultiLine() {
    if (this.multilineList.length == 0)
      for (let t of Object.keys(h))
        h[t].type == "multiline" && this.multilineList.push(t);
    return this.multilineList;
  }
  getItem(t) {
    if (t == " " || t == "")
      return -1;
    for (let i = this.cache.length - 1; i >= 0; i--)
      if (this.cache[i][0] === t)
        return this.cache[i][1];
    if (this.nonCache.includes(t))
      return -1;
    for (let i of Object.keys(h)) {
      let r = h[i].alternative;
      if (r) {
        for (let n of r)
          if (n == t)
            return this.cache.push([t, i]), this.cache.length > this.cacheSize && this.cache.shift(), i;
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
let fe = new xt();
function Lt(e, t) {
  e = e.replace(/(&|\\amp)/g, "🎯"), e = e.replace(/REtuRn/g, `
`);
  let i = kt(e, "LBRACK", "RBRACK", t);
  return i = at(i), i;
}
function Mt(e, t, i, r) {
  if (e.substring(t, t + i.length) != i)
    throw new Error("No" + i + " at index " + t);
  for (let n = t + 1; n < e.length; n++)
    switch (e.substring(n, n + r.length)) {
      case r:
        return n;
    }
  return -1;
}
let le = "STart";
le = "";
const ae = function(e) {
  if (typeof e == "string")
    return e;
  if (!Array.isArray(e)) {
    let r = "";
    const n = e.tag;
    let o = A[n];
    return o || (o = Z(n)), r += o.before_begin + o.begin_tag + le, "xmlattributes" in e && e.xmlattributes && (r += " " + e.xmlattributes.trim()), "id" in e && e.id && (r += ' xml:id="' + V(e.id) + '"'), Object.keys(e).forEach((m) => {
      ["tag", "content", "title", "xmlattributes", "id"].includes(m) || (r += " " + m + '="' + e.el + '"');
    }), r += o.after_begin, "title" in e && e.title && (r += "<title>" + e.title + `</title>
`), r + ae(e.content) + o.before_end + o.end_tag + o.after_end;
  }
  const t = e;
  let i = "";
  return t.forEach((r, n) => {
    let o = "";
    if (typeof r == "string") {
      r.match(/^\s*$/) || (o += "<TEXT>" + r + "</TEXT>", console.log("just added error of", r));
      return;
    }
    let f = "", u = "";
    const m = r.tag;
    let d = A[m];
    typeof d > "u" && (d = oe), u += d.before_begin + d.begin_tag + le, "xmlattributes" in r && r.xmlattributes && (u += " " + r.xmlattributes.trim()), "id" in r && r.id && (u += ' xml:id="' + V(r.id) + '"'), Object.keys(r).forEach((s) => {
      !["tag", "content", "title", "xmlattributes", "id"].includes(s) && !s.startsWith("_") && (u += " " + s + '="' + r[s] + '"');
    }), u += d.after_begin, "title" in r && r.title && (f += "<title>" + r.title + `</title>
`);
    let a = ae(r.content);
    ["c", "code"].includes(m) && (a = $t(a));
    let c = "";
    ["m", "md", "me", "mdn", "men"].includes(m) && (a.match(/^.*(\.|,|;)\s*$/s) && (a = a.replace(/\s*$/, ""), c = a.slice(-1), a = a.slice(0, -1)), a.match(/\\/) ? a = qt(a) : (a = Lt(a, "LaTeX"), a = a.replace(/&/g, " \\amp "))), f = f + a;
    let p = d.before_end + d.end_tag + c + d.after_end;
    f.match(/^\s*<mdn>.*<\/mdn>\s*$/s) ? o = f : o = u + f + p, f.match(/^\s*<p>\s*<\/p>\s*$/) && (console.log("empty p"), f = ""), o = o.replace(/(\/)(me|md|men|mdn)>\s+(\.|,|;|:)/g, "$1$2>$3"), i += o;
  }), i;
}, V = function(e) {
  let t = e;
  return t = t.replace(/ /g, "-"), t = t.replace(/[^a-zA-Z0-9\-]/g, "_"), t;
}, $t = function(e) {
  let t = e;
  return t = t.replace(/&/g, "&amp;"), t = t.replace(/</g, "&lt;"), t = t.replace(/>/g, "&gt;"), t;
}, qt = function(e) {
  let t = e;
  return t = t.replace(/&/g, "\\amp "), t = t.replace(/</g, "\\lt "), t = t.replace(/>/g, "\\gt "), t;
}, At = function(e, t, i) {
  let r = i, n = 0;
  const o = e.length;
  for (; r < t.length; ) {
    const f = t[r];
    if (n <= 0 && t.slice(r, r + o) === e)
      return r;
    f === "\\" ? r++ : f === "{" ? n++ : f === "}" && n--, r++;
  }
  return -1;
}, _t = function(e) {
  return e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}, Pt = /^\\AAAAAAAbegin{/, W = function(e, t, i) {
  if (typeof e == "string")
    return De(e);
  if (!Array.isArray(e)) {
    let o = { ...e };
    return o.content = W(o.content, t, i), o;
  }
  let r = [], n = "";
  return e.forEach((o, f) => {
    if (i.includes(o.tag))
      n && (r.push({ tag: "p", content: n }), n = ""), D.includes(o.tag) && typeof o.content == "string" ? (o.content = he(o.content, I), o.content = W(o.content, t, i)) : D.includes(o.tag) && (o.content = W(o.content, t, i)), r.push(o);
    else if (o.tag == "text")
      o.content.split(/\n\s*\n{1,}/).forEach((m) => {
        const d = n + m;
        if (d) {
          const l = { tag: "p", content: d };
          r.push(l);
        }
        n = "";
      });
    else if (typeof o.content == "string" && D.includes(o.tag)) {
      let u = [];
      o.content.split(/\n\s*\n{1,}/).forEach((d) => {
        const l = d.trim();
        l && u.push({ tag: "p", content: l });
      }), o.content = u, r.push(o);
    } else
      r.push(o);
  }), r;
}, De = function(e) {
  let t = [], i = "";
  const r = e.split(/\n\s*\n{1,}/);
  return console.log("found ", r.length, " pieces, which are:", r), r.forEach((n) => {
    const o = i + n;
    if (o) {
      console.log("made this_new_text", o);
      const f = { tag: "p", content: o };
      t.push(f);
    }
    i = "";
  }), t;
}, he = function(e, t) {
  typeof e != "string" && alert("expected string in splitTextAtDelimiters", e);
  var i = e;
  let r;
  const n = [], o = new RegExp(
    "(" + t.map((f) => _t(f.left)).join("|") + ")"
  );
  for (; r = i.search(o), r !== -1; ) {
    r > 0 && (n.push({
      tag: "text",
      content: i.slice(0, r)
    }), i = i.slice(r));
    const f = t.findIndex((d) => i.startsWith(d.left));
    if (r = At(t[f].right, i, t[f].left.length), r === -1)
      break;
    const u = i.slice(0, r + t[f].right.length), m = Pt.test(u) ? u : i.slice(t[f].left.length, r);
    n.push({
      //        type: "math",
      tag: t[f].tag,
      content: m
      //       rawData,
    }), i = i.slice(r + t[f].right.length);
  }
  return i.match(/^\s*$/) || n.push({
    tag: "text",
    content: i
  }), n;
}, Tt = function(e) {
  typeof e != "string" && alert("expected a string, but got:", e);
  let t = e;
  return t = t.replace(/(^|\s|~)\$([^\$\n]+)\$(\s|$|[.,!?;:\-])/mg, "$1<m>$2</m>$3"), t = t.replace(/(^|\s)_([^_\n]+)_(\s|$|[.,!?;:])/mg, "$1<term>$2</term>$3"), t = t.replace(/(^|\s)\*\*([^*\n]+)\*\*(\s|$|[.,!?;:])/mg, "$1<alert>$2</alert>$3"), t = t.replace(/(^|\s)\*([^*\n]+)\*(\s|$|[.,!?;:])/mg, "$1<em>$2</em>$3"), t = t.replace(/(^|\s)``([^'"`\n]+)''(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)``([^'"`\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)`([^'"`\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)"([^"\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)'([^'\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|[^`a-zA-Z0-9])`([^`\n]+)`($|[^`a-zA-A0-9])/mg, "$1<c>$2</c>$3"), t;
}, ve = function(e, t, i) {
  return Ye[t + i];
}, Et = function(e) {
  typeof e != "string" && alert("expected a string, but got:", e);
  let t = e;
  t = t.replace(/<!--.*?-->/g, "");
  for (let [i, r] of Object.entries(Ge)) {
    let n = i;
    r.forEach((o) => {
      let f = o;
      t = t.replace("<" + f + ">", "<" + n + ">"), t = t.replace("<" + f + " ", "<" + n + " "), t = t.replace("</" + f + ">", "</" + n + ">"), t = t.replace("\\begin{" + f + "}", "\\begin{" + n + "}"), t = t.replace("\\end{" + f + "}", "\\end{" + n + "}"), t = t.replace("\\" + f + "{", "\\" + n + "{");
    });
  }
  return t;
}, N = function(e, t, i, r, n = "all", o = "all", f = "") {
  let u = [];
  typeof t == "string" ? t == "displaymath" ? u = B : t == "spacelike" ? u = "spacelike" : alert("unknown taglist " + t) : typeof t[0] == "string" ? u = we(t) : u = t;
  let m = [];
  if (Array.isArray(e))
    return e.forEach((d, l) => {
      if (i > r && d.tag != "text")
        m.push(d);
      else {
        let a;
        n == "all" || n.includes(d.tag) ? a = N(d, t, i + 1, r, n, o, d.tag) : a = d, Array.isArray(a) ? a.forEach((c) => {
          m.push(c);
        }) : m.push(a);
      }
    }), m;
  if (typeof e == "string") {
    if (i > r + 2)
      return e;
    if (u === "spacelike")
      return o == "all" || o.includes(f) ? Tt(e) : e;
    let d = e;
    return u === "makeparagraphs" ? (o == "all" || o.includes(f)) && (d = De(d)) : (o == "all" || o.includes(f)) && (d = he(d, u)), d;
  } else {
    typeof e != "object" && alert("wrong category for ", e);
    let d = { ...e };
    if (i > r && d.tag != "text")
      return d;
    let l = d.content;
    return (n == "all" || o.includes(d.tag)) && (l = N(l, t, i + 1, r, n, o, d.tag)), d.tag == "text" && typeof l == "string" ? d.content = l : d.tag != "text" ? l.length == 1 && l[0].tag == "text" ? d.content = l[0].content : d.content = l : d = l, d;
  }
}, q = function(e, t, i = 0, r = 0, n = "all", o = "", f = "", u = "section") {
  let m = [];
  if (Array.isArray(e))
    e.forEach((l, a) => {
      let c;
      typeof l == "object" ? c = q({ ...l }, t, i + 1, r, n, l.tag, o) : c = q(l, t, i + 1, r, n, o, f), m.push(c);
    });
  else if (typeof e == "object") {
    if (t == "oneline environments" && e.tag == "p" && typeof e.content == "string") {
      if (e.content.match(/^\s*([A-Za-z]+):/)) {
        let c = e.content.split(":", 1)[0].toLowerCase();
        if (c = c.trim(), !Ke.includes(c)) {
          const p = e.content.replace(/^\s*[^:]*:\s*/, "");
          e.tag = c, e.content = p;
        }
      }
    } else if (t == "extract li" && e.tag == "p" && typeof e.content == "string") {
      if (e.content.match(/^\s*\\item\s/)) {
        const a = "li", c = e.content.replace(/^\s*\\item\s*/, "");
        e.tag = a, e.content = c;
      } else if (e.content.match(/^\s*\-+\s/)) {
        const a = "li", c = e.content.replace(/^\s*\-+\s*/, "");
        e.tag = a, e.content = c, e._parenttag = "ul";
      } else if (e.content.match(/^\s*\++\s/)) {
        const a = "li", c = e.content.replace(/^\s*\++\s*/, "");
        e.tag = a, e.content = c, e._parenttag = "ol";
      } else if (e.content.match(/^\s*\(*[0-9]+\.*\)*\s/)) {
        const a = "li", c = e.content.replace(/^\s*\(*[0-9]+\.*\)*\s*/, "");
        e.tag = a, e.content = c, e._parenttag = "ol";
      }
    } else if (t == "xmlattributes" && typeof e.content == "string") {
      var d = new RegExp("^\\s*(" + G.join("|") + ")[^<>+]*>", "s");
      if (d.test(e.content) || e.content.match(/^\s*[^\n<>+]*>/))
        if (e.content.match(/^\s*>/))
          e.content = e.content.replace(/^\s*>/, "");
        else {
          let a = e.content.split(">", 1)[0];
          e.content = e.content.replace(/^\s*[^<>]*>/s, ""), "xmlattributes" in e ? e.xmlattributes += a : e.xmlattributes = a;
        }
    } else if (t == "attributes" && typeof e.content == "string") {
      const a = e.content.split(/(\n\s*\n{1,})/);
      if (a.length > 1) {
        let c = "";
        var d = new RegExp("^(" + G.join("|") + ")");
        a.forEach((s) => {
          let g = s.trim();
          if (d.test(g)) {
            let y = g.split(":", 1)[0], v = g.split(":", 2)[1].trim();
            e[y] = v;
          } else
            c += s;
        }), e.content = c;
      }
    } else if (t == "title" && !ze.includes(e.tag) && typeof e.content == "string") {
      if (e.content.match(/^\s*\[/) || e.content.match(/^\s*<title>/))
        if (e.content.match(/^\s*\[/)) {
          let a = e.content.split("]", 1)[0];
          a = a.replace(/\s*\[/, ""), e.title = a, e.content = e.content.replace(/^\s*\[[^\[\]]*\]/, "");
        } else {
          let a = e.content.split("</title>", 1)[0];
          a = a.replace(/\s*<title>/, ""), e.title = a, e.content = e.content.replace(/^\s*<title>.*?<\/title>/, "");
        }
    } else if (t == "label" && typeof e.content == "string") {
      if (e.content.match(/^\s*(\\*)label{[^{}]*}/)) {
        let a = e.content.replace(/^\s*(\\*)label{([^{}]*)}.*/s, "$2");
        a = V(a), e.id = a, e.content = e.content.replace(/^\s*(\\*)label{([^{}]*)}\s*/, "");
      }
    } else if (t == "images" && typeof e.content == "string")
      e.content.match(/\\includegraphics/) && (console.log("images", e), e.content = e.content.replace(
        /\\includegraphics\[[^\[\]]*\]\s*{\s*([^{}]*)\s*}/,
        '<image source="$1" width="50%"/>'
      ), e.content = e.content.replace(
        /\\includegraphics\s*{\s*([^{}]*)\s*}/,
        '<image source="$1" width="50%"/>'
      ));
    else if (t == "statements" && n.includes(o)) {
      let a = [], c = {};
      if (typeof e.content == "string")
        a = [{ tag: "text", content: e.content }], c = { tag: "statement", content: a }, e.content = [c];
      else {
        let p = !1;
        if (e.content.forEach((s) => {
          s.tag == "statement" && (p = !0);
        }), !p) {
          let s = "", g = 0;
          for (g = 0; g < e.content.length && (s = e.content[g], !ie.includes(s.tag)); ++g)
            a.push(s);
          c = { tag: "statement", content: a };
          let y = e.content.slice(g);
          y.unshift(c), e.content = y;
        }
      }
    } else if (t == "prefigure" && n.includes(e.tag)) {
      !("xmlns" in e) && !("xmlattributes" in e && e.xmlattributes.includes("xmlns")) && (e.xmlns = "https://prefigure.org");
      let a = [], c = {};
      if (typeof e.content == "string") {
        const p = e.content;
        if (a = p, c = { tag: "diagram", content: a }, "dimensions" in e && (c.dimensions = e.dimensions, delete e.dimensions), "margins" in e && (c.margins = e.margins, delete e.margins), e.content = [c], "bbox" in e) {
          let s = { tag: "coordinates", bbox: e.bbox, content: p };
          delete e.bbox, c.content = [s];
        }
      }
      if (f != "image") {
        let p = { ...e };
        p.content = [...e.content], e = { tag: "image", content: [p] }, "width" in p && (e.width = p.width, delete p.width);
      }
    } else if (t == "blockquotes" && n.includes(e.tag) && typeof e.content == "string") {
      if (e.content.match(/^\s*\+\+\+sTaRTbQ>/)) {
        let a = e.content.replace(/^\s*\+\+\+sTaRTbQ>/, "");
        a = a.replace(/\n\s*>/g, `
`);
        let c = a.split(/\n\s*\n{1,}/), p = [];
        c.forEach((s, g) => {
          p.push({ tag: "p", content: s });
        }), e.content = p, e.tag = "blockquote";
      }
    } else if (t == "substructure" && n.includes(e.tag) && typeof e.content == "string") {
      const a = U[e.tag], c = we(a), p = he(e.content, c);
      e.content = [...p];
    } else if (t == "clean up substructure" && n.includes(e.tag) && Array.isArray(e.content)) {
      const a = e.tag;
      let c = [];
      e.content.forEach((p) => {
        U[a].includes(p.tag) ? c.push(p) : G.includes(p.tag) ? e[p.tag] = p.content : p.tag == "text" && p.content.match(/^\s*$/) && "attributes" in p ? "attributes" in e ? e.attributes += p.attributes : e.attributes = p.attributes : p.tag == "text" && p.content.match(/^\s*$/) || (console.log("problem content", p), alert("problem content: see console.log"));
      }), e.content = [...c];
    } else if (t == "extraneous math" && n.includes(e.tag) && typeof e.content == "string")
      e.content = e.content.replace(/^\s*\+\+\+saMePaR/, "");
    else if (t == "gather li" && n.includes(e.tag) && typeof e.content == "object") {
      let a = [], c = "", p = 0, s = !1, g = [], y = {};
      for (p = 0; p < e.content.length; ++p)
        c = e.content[p], !s && c.tag != "li" ? a.push(c) : !s && c.tag == "li" ? (s = !0, g = [c], y.tag = c._parenttag) : s && c.tag == "li" ? g.push(c) : s && c.tag != "li" && (y.content = [...g], a.push({ ...y }), s = !1, y = {}, g = [], a.push(c));
      s && (y.content = g, a.push({ ...y })), s = !1, g = [], y = {}, e.content = a;
    } else if (t == "absorb math" && (n.includes(e.tag) || e.tag == u) && typeof e.content == "object") {
      let a = [], c = "", p = 0;
      for (p = 0; p < e.content.length; ++p) {
        c = e.content[p];
        const s = a.length;
        te.includes(c.tag) ? s == 0 ? a.push({ ...c }) : a[s - 1].tag != "p" ? a.push({ ...c }) : typeof a[s - 1].content == "string" ? (a[s - 1].content = [{ tag: "text", content: a[s - 1].content }], a[s - 1].content.push({ ...c })) : a[s - 1].content.push({ ...c }) : c.tag == "p" ? typeof c.content == "string" && c.content.match(/\s*\+\+\+saMePaR/) ? (c.content = c.content.replace(/\s*\+\+\+saMePaR\s*/, ""), a[s - 1].content.push({ tag: "text", content: c.content })) : typeof c.content == "string" ? a.push({ ...c }) : c.content.length > 0 && c.content[0].tag == "text" && typeof c.content[0].content == "string" && c.content[0].content.match(/\s*\+\+\+saMePaR/) ? (c.content[0].content = c.content[0].content.replace(/\s*\+\+\+saMePaR\s*/, ""), c.content.forEach((g) => {
          a[s - 1].content.push(g);
        })) : c.content.length > 0 && a.push({ ...c }) : a.push({ ...c });
      }
      e.content = [...a];
    }
    let l = { ...e };
    return l.content = q(l.content, t, i + 1, r, n, l.tag, o), l;
  } else {
    if (typeof e != "string" && (console.log("what is it", e), alert("non-object non-string: ", e)), t == "do_nothing")
      return e + "X";
    if (t == "fonts" && n.includes(o)) {
      let l = "";
      return l = e.replace(/\\('|"|\^|`|~|-|c|H|u|v) ?([a-zA-Z])/mg, ve), l = l.replace(/\\('|"|\^|`|~|-|c|H|u|v){([a-zA-Z])}/mg, ve), l;
    } else if (t == "texlike" && n.includes(o)) {
      let l = "";
      return l = e.replace(/([^-])\-\-([^-])/mg, "$1<mdash/>$2"), l = l.replace(/\bLaTeX\b/mg, "<latex/>"), l = l.replace(/\bTeX\b/mg, "<tex/>"), l = l.replace(/\bPreTeXt\b/mg, "<pretext/>"), l = l.replace(/([^\\])~/mg, "$1<nbsp/>"), l = l.replace(/\(\\(ref|eqref|cite){([^{}]+)}\)/g, function(a, c, p) {
        return '<xref ref="' + V(p) + '"/>';
      }), l = l.replace(/\\(ref|eqref|cite){([^{}]+)}/g, function(a, c, p) {
        return '<xref ref="' + V(p) + '"/>';
      }), l = l.replace(/\\(q|term|em|m|c|fn){([^{}]+)}/g, "<$1>$2</$1>"), l = l.replace(/\\(url|href){([^{}]+)}({|\[)([^{}\[\]]+)(\]|})/g, function(a, c, p, s, g) {
        return '<url href="' + p + '">' + g + "</url>";
      }), l = l.replace(/\\(url|href){([^{}]+)}([^{]|$)/g, function(a, c, p) {
        return '<url href="' + p + '"/>';
      }), l;
    } else
      return e;
  }
  return m;
}, Nt = function(e) {
  let t = Et(e);
  t = t.replace(new RegExp("{([a-z]{2,})\\*", "d"), "$1star");
  let r = t.replace(/([^\s])\\label({|\[|\()/g, `$1
\\label$2`).replace(/\n\s*\n\s*>/g, `

+++sTaRTbQ>`);
  r = r.replace(/\n\\\[([^\[\]]+)\\\]\n/sg, `
\\begin{equationstar}$1\\end{equationstar}
`), r = r.replace(/(\$\$|\\end{equation}|\\end{align}|\\end{equationstar}|\\end{alignstar}) *\n([^\s])/g, `$1
+++saMePaR$2`), r = r.replace(/(\/me>|\/md>|\/men>|\/mdn>) *\n *([^\n<])/g, `$1
+++saMePaR$2`), r = r.replace(/<p>\s*(<ol>|<ul>|<dl>)/g, "$1"), r = r.replace(/(<\/ol>|<\/ul>|<\/dl>)\s*<\/p>/g, "$1"), r = r.replace(/\s*?\n+\s*?\\item\s+/g, `

\\item `);
  let n = r.replace(/(<diagram)(.*?)(<\/diagram>)/sg, function(f, u, m, d) {
    const l = m.replace(/(<|<\/)definition(>)/g, "$1predefinition$2");
    return u + l + d;
  });
  const o = new RegExp("([^\\n])(\\n *(" + G.join("|") + ") *:)", "g");
  return n = n.replace(o, `$1
$2`), n;
};
function St(e, t = "placeholder") {
  let i = Nt(e), n = { ...{ tag: t, content: i } };
  const o = 15;
  for (let x = 0; x < o; ++x)
    k.forEach((R) => {
      n = N(n, R, 0, x), de.forEach((K) => {
        n = q(n, K[0], 0, x, K[1]);
      });
    });
  let f = { ...n };
  f = W(f, "all", J);
  let u = { ...f };
  u = q(u, "oneline environments", 0, 0, "all"), u = q(u, "attributes", 0, 0, "all"), de.forEach((x) => {
    u = q(u, x[0], 0, 0, x[1]);
  }), u = W(u, "all", J), u = q(u, "blockquotes", 0, 0, ["p"]);
  let m = { ...u };
  m = q(m, "extract li", 0, 0, "all"), m = q(m, "clean up substructure", 0, 0, He);
  const d = N(m, X, 0, o + 1, "all", S), l = N(d, "spacelike", 0, o + 1, "all", S), a = N(l, X, 0, o + 1, "all", S), c = N(a, X, 0, o + 1, "all", S), p = q(c, "fonts", 0, 0, S), s = q(p, "texlike", 0, 0, S);
  let g = N(s, "spacelike", 0, o + 1, "all", S);
  g = N(g, X, 0, o + 1, "all", S), g = N(g, X, 0, o + 1, "all", S);
  const v = q(g, "extract li", 0, 0, ["p"]), _ = q(v, "gather li", 0, 0, D), b = q(_, "absorb math", 0, 0, D, "", "", t);
  let w = q(b, "statements", 0, 0, Ue), L = q(w, "images", 0, 0, "all"), $ = q(L, "prefigure", 0, 0, ["prefigure"]);
  return console.log("tmp5", $), ae($);
}
export {
  St as FlexTeXtConvert
};
