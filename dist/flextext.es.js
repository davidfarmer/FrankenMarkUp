const me = {
  begin_tag: "",
  end_tag: "",
  // not sure we need the 'export'
  before_begin: "",
  after_begin: "",
  before_end: "",
  after_end: ""
}, q = {
  // start with the quirky ones
  text: me,
  placeholder: me
}, D = function(e) {
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
}, nt = function(e) {
  return {
    begin_tag: "<" + e,
    end_tag: "</" + e + ">",
    before_begin: `
`,
    after_begin: ">",
    before_end: "",
    after_end: `
`
  };
}, it = function(e) {
  return {
    begin_tag: "<" + e,
    end_tag: "</" + e + ">",
    before_begin: `
`,
    after_begin: "",
    before_end: "",
    after_end: `
`
  };
}, ot = function(e) {
  return {
    begin_tag: "<" + e,
    end_tag: "</" + e + ">",
    before_begin: "",
    after_begin: ">",
    before_end: "",
    after_end: ""
  };
}, ie = function(e) {
  return { left: "<" + e + ">", right: "</" + e + ">", tag: e };
}, de = function(e) {
  return { left: "<" + e + " ", right: "</" + e + ">", tag: e };
}, oe = function(e) {
  return { left: "\\begin{" + e + "}", right: "\\end{" + e + "}", tag: e };
}, Ae = function(e) {
  if (!Array.isArray(e))
    return e;
  let t = [];
  return e.forEach((n) => {
    t.push(de(n)), t.push(ie(n)), t.push(oe(n));
  }), t;
}, lt = [
  // [latex_name, ptx_tag]
  // could these be handled by an alias, like we did with quote -> blockquote?
  ["equation", "men"],
  ["equationstar", "me"],
  // preprocesssor does {abcd*} -> {abcdstar}
  ["align", "mdn"],
  ["alignstar", "md"]
], C = [
  { left: "$$", right: "$$", tag: "me" }
  //          {left:"\\[", right:"\\]", tag:"me"},   // preprocessor handles these; don't work: not sure why
];
lt.forEach((e) => {
  C.push(
    { left: "\\begin{" + e[0] + "}", right: "\\end{" + e[0] + "}", tag: e[1] }
  );
});
C.push(
  { left: "\\begin{sage}", right: "\\end{sage}", tag: "sage" }
);
C.push({ left: "<md>", right: "</md>", tag: "md" });
C.push({ left: "<md ", right: "</md>", tag: "md" });
C.push({ left: "<me>", right: "</me>", tag: "me" });
C.push({ left: "<me ", right: "</me>", tag: "me" });
C.push({ left: "<mdn", right: "</mdn>", tag: "mdn" });
C.push({ left: "<men", right: "</men>", tag: "men" });
const le = ["md", "mdn", "me", "men"];
le.forEach((e) => {
  q[e] = {
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
[...le];
const Ee = ["reading-questions", "introduction", "conclusion", "objectives", "statement", "task", "worksheet", "page"], Te = ["ol", "ul", "dl"], at = ["li"], Pe = ["aside", "historical", "biographical"], fe = ["algorithm", "claim", "corollary", "fact", "identity", "lemma", "proposition", "theorem"], ye = ["assumption", "axiom", "conjecture", "heuristic", "hypothesis", "principle"], Ne = ["convention", "insight", "note", "observation", "remark", "warning"], Se = ["example", "problem", "question"], je = ["definition"], ae = ["exercise"], Oe = ["proof"], Xe = ["activity", "exploration", "investigation", "project"], se = ["hint", "answer", "solution"], Ze = ["case", "task"], be = ["em", "term", "alert", "m", "q", "c", "tag"];
let Re = ["article", "chapter", "section", "subsection", "worksheet", "paragraphs", "backmatter"], Ie = [
  // peer of p cildren of (sub)sections
  ...Pe,
  ...fe,
  ...ye,
  // ...list_like,  (this caused an infinite recursion)
  ...Ne,
  ...Se,
  ...je,
  ...ae,
  ...Oe,
  ...Xe,
  ...se,
  "blockquote",
  "sidebyside",
  "li"
];
const Q = [
  ...Re,
  ...Ie,
  ...se,
  ...Ze,
  ...Ee,
  "enumerate",
  "itemize",
  "placeholder"
], Ce = ["figure", "table", "listing", "enumerate", "itemize"], ze = ["image", "tabular", "program"], Be = ["latex-image", "prefigure", "description", "caption", "tikzpicture"], Fe = ["figure", "table", "tabular", "ol", "ul", "dl"], st = [...fe, ...ye, ...ae, "task"], $e = ["p", "figure", "li", "ol", "ul", "dl", "enumerate", "itemize"], R = [
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
], ut = ["title", "idx", "caption"], ct = ["figure", "table"], K = {
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
}, De = [
  "exercisegroup",
  "exercises",
  "prefigure",
  "tikzpicture",
  "sage",
  "diagram",
  ...K.diagram
], pt = Object.keys(K), I = [];
let We = [...Re, ...Ie], ve = [...We, ...Te];
ve.push("p");
ve.push("statement");
We.forEach((e) => {
  I.push(de(e)), I.push(ie(e)), I.push(oe(e));
});
I.push(oe("sage"));
Fe.forEach((e) => {
  I.push(de(e)), I.push(ie(e)), I.push(oe(e));
});
let ne = Array.from(I, ({ tag: e }) => e);
ne = [...new Set(ne)];
ve.forEach((e) => {
  q[e] = nt(e);
});
Fe.forEach((e) => {
  q[e] = D(e);
});
Ee.forEach((e) => {
  q[e] = D(e);
});
De.forEach((e) => {
  q[e] = D(e);
});
[...Ce, ...ze, ...Be].forEach((e) => {
  q[e] = D(e);
});
let W = [
  { left: "\\(", right: "\\)", tag: "m" }
  //          {left:"|", right:"|", tag:"placeholder"}  // just for testing
];
be.forEach((e) => {
  W.push(ie(e));
});
be.forEach((e) => {
  q[e] = ot(e);
});
ut.forEach((e) => {
  q[e] = it(e);
});
q.ol = {
  begin_tag: `<p>
<ol`,
  end_tag: `</ol>
</p>`,
  before_begin: `
`,
  after_begin: `>
`,
  before_end: `
`,
  after_end: `
`
};
q.ul = {
  begin_tag: `<p>
<ul`,
  end_tag: `</ul>
</p>`,
  before_begin: `
`,
  after_begin: `>
`,
  before_end: `
`,
  after_end: `
`
};
q.enumerate = q.ol;
q.itemize = q.ul;
q.tikzpicture = {
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
q.image = {
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
q.description = {
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
q.p = D("p");
q.li = D("li");
const mt = ["cases", "align", "system", "derivation", "linearsystem"], te = [
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
  "xmlns",
  "language"
];
let k = [];
k.push(["section"]);
k.push(["subsection"]);
k.push(["worksheet"]);
k.push(["page"]);
k.push(["paragraphs", "objectives"]);
k.push(["sidebyside"]);
k.push([...Xe]);
k.push([...Se, ...ae]);
k.push(["introduction", "conclusion"]);
k.push([...fe, ...ye, ...Ne, ...je]);
k.push(["task"]);
k.push(["statement"]);
k.push([...Oe, ...se]);
k.push([...Ze]);
k.push([...Pe]);
k.push([...Ce]);
k.push([...ze]);
k.push([...Be]);
k.push(["prefigure"]);
k.push(["diagram"]);
k.push(K.diagram);
k.push([...Te]);
k.push([...at]);
k.push(["blockquote"]);
k.push(["p"]);
k.push("displaymath");
k.push(["mrow"]);
const ue = [
  ["extraneous math", le],
  ["workspace", [...ae]],
  ["margins", ["worksheet", "sidebyside"]],
  ["margin", ["worksheet", "sidebyside"]],
  ["xmlattributes", "all"],
  ["title", "all"],
  ["label", "all"]
], F = {
  "-": "ul",
  "+": "ol",
  "*": "ul",
  1: "ol"
};
let gt = {
  // in the format "officialname": [list of synonyms].  Taken from SL3X
  abstract: ["abs", "abstr"],
  acknowledgement: ["ack"],
  assumption: ["assu", "ass"],
  axiom: ["axm"],
  blockquote: ["quote", "center"],
  claim: ["cla"],
  conjecture: ["con", "conj", "conjec"],
  convention: ["conv"],
  corollary: ["cor", "corr", "coro", "corol", "corss"],
  definition: ["def", "defn", "dfn", "defi", "defin", "de"],
  enumerate: ["enum", "enuma", "enumerit"],
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
  //   "ul" : ["itemize"],
  verbatim: ["verb"],
  warning: ["warn", "wrn"]
};
const ht = {
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
var d = {
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
}, dt = [
  ["cent", "¢"],
  ["dollar", "$"],
  ["pound", "£"],
  ["euro", "€"]
], ft = [
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
], yt = ["∑", "⋃", "⋂", "⨁", "⨂", "∐", "∏", "∮", "∭", "∬", "∫", "∰", "∯", "∮"], He = [
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
], Ve = ft.slice();
for (const e of He)
  Ve.push(e[0]);
console.debug("Do I see this?");
console.debug("greedyfunctions", Ve);
var bt = [
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
for (const e of He)
  d[e[0]] = {
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
  }, d["base" + e[0]] = {
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
for (const e of bt)
  d[e[1]] = {
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
for (const e of dt)
  d[e[0]] = {
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
function vt(e) {
  return e.replace(/\s\s+/g, " ");
}
function Qe(e) {
  return /^[0-9\.,]+$/.test(e);
}
function wt(e) {
  return /^[a-zA-Z]+$/.test(e);
}
function Me(e) {
  return /^&[a-zA-Z]+;$/.test(e);
}
function xt(e) {
  return /^[0-9\.,].*[a-zA-Z]$/.test(e);
}
function kt(e) {
  return Qe(e) || e.length == 1 || e.trim() in d && d[e.trim()].type == "symbol";
}
function N(e, t) {
  if (xt(e)) {
    let r = e.replace(/[a-zA-Z]+$/, ""), i = e.replace(/^[0-9\.,]+/, "");
    console.debug("found mixed", e, "with parts", r, ",", i), r = N(r, t), i = N(i, t);
    let o = "";
    return t == "MathML" ? o = "<mo>&InvisibleTimes;</mo>" : t == "Speech" && (o = " times "), r + o + i;
  }
  let n = e;
  return console.debug("markAtomicItem of", n, "endans", Me(e)), t == "MathML" && (Qe(e) ? n = "<mn>" + n + "</mn>" : Me(e) ? n = "<mi>" + n + "</mi>" : wt(e) ? n = n.replace(/(.)/g, "<mi>$1</mi>") : yt.includes(e) ? n = "<mo>" + n + "</mo>" : e.includes("mtext") || n != "" && (n = "<unknown>" + n + "</unknown>", console.warn("unknown type", "X" + n + "X"))), n;
}
function $t(e) {
  let t = e;
  for (let n = 0; n <= 2; ++n)
    t = t.replace(/to the quantity([A-Z]?) +negative 1 +([A-Z]?)endquantity/g, "inverse"), t = t.replace(/to the quantity([A-Z]?) +2 +([A-Z]?)endquantity/g, "squared"), t = t.replace(/power +2 +/g, "squared "), t = t.replace(/(^| )quantity([A-Z]?) +([^ ]+) +([A-Z]?)endquantity/g, " $3 "), t = t.replace(/(^| )quantity([A-Z]?) +(negative +[^ ]+) +([A-Z]?)endquantity/g, " $3 "), t = t.replace(/<mrow ([^<>]+)><(mi|mo|mn)>([^<>]+)(<\/(mi|mo|mn)>)<\/mrow>/g, "<$2 $1>$3$4"), t = t.replace(/<mrow>(<([a-z]+)>)([^<>]+)(<\/$2>)<\/mrow>/g, "$1$3$4"), console.debug("now ans", t), t = t.replace(/<mrow>(<mi>)([^<>]+)(<\/mi>)<\/mrow>/g, "$1$2$3"), t = t.replace(/<mrow>(<mo>)([^<>]+)(<\/mo>)<\/mrow>/g, "$1$2$3"), t = t.replace(/<mrow>(<mn>)([^<>]+)(<\/mn>)<\/mrow>/g, "$1$2$3"), t = t.replace(/(<mrow[^<>]*>)<mrow>([^w]*)<\/mrow>(<\/mrow>)/g, "$1$2$3"), console.debug("removed layer", n, "to get", t);
  return t = t.replace(/quantity([A-Z]?)/g, "quantity"), t = t.replace(/([A-Z]?)endquantity([A-Z]?)/g, "endquantity"), t = t.replace(/(quantity *)quantity([^q]*)endquantity( *endquantity)/g, "$1$2$3"), t = t.replace(/(quantity *)quantity([^q]*)endquantity( *endquantity)/g, "$1$2$3"), t.endsWith("\\") && (t += " "), t;
}
String.prototype.myHash = function() {
  var e = 0, t, n;
  if (this.length === 0) return e;
  for (t = 0; t < this.length; t++)
    n = this.charCodeAt(t), e = (e << 5) - e + n, e |= 0;
  return e;
};
class _ {
  /*
    constructor(position, value, key = null, parent = null, conversiontarget) {
  */
  constructor(t, n, r = null, i = null, o = "unknown") {
    this.position = t, this.value = n, this.outputvalue = n, this.key = r, this.parent = i, this.conversiontarget = o, this.children = [], this.pair = [], this.noPriority = !1, this.exPriority = !1;
  }
  insert(t, n = t) {
    return this.children.push(new _(this.children.length, t, n, this, this.conversiontarget)), !0;
  }
  insertNode(t) {
    return t.parent = this, t.position = this.children.length, this.children.push(t), !0;
  }
  addLeafMarkup() {
    console.debug("   adding leaf markup with key, val, oval", this.key, "a,a", this.value, "b,b", this.outputvalue, "to", this), this.key == null ? this.outputvalue = N(this.value, this.conversiontarget) : this.key == " " ? this.position == 1 ? (console.info("assuming implied multiplication"), console.info("What is next to this space key? parent:", this.parent, "left sibling", this.parent.children[0], "left sibling value", this.parent.children[0].value, "right sibling", this.parent.children[2]), this.conversiontarget == "MathML" ? this.outputvalue = "<mo>&InvisibleTimes;</mo>" : this.conversiontarget == "Speech" && (this.outputvalue = " times ")) : this.outputvalue = N(this.value, this.conversiontarget) : this.key == "quote" ? this.position == 1 && (this.outputvalue = this.value) : this.key == "" ? (console.debug("item with empty key.  Is this function apply?", this), this.position == 1 ? (console.debug("What is nect to this enpty key? parent:", this.parent, "left sibling", this.parent.children[0], "right sibling", this.parent.children[2]), this.parent.children[2].pair.length > 0 && (this.conversiontarget == "MathML" ? this.outputvalue = "<mo>&ApplyFunction;</mo>" : this.conversiontarget == "Speech" && (this.outputvalue = " of "))) : this.position == 0 ? this.conversiontarget == "Speech" ? this.outputvalue = " " + N(this.value, this.conversiontarget) : this.outputvalue = N(this.value, this.conversiontarget) : this.outputvalue = N(this.value, this.conversiontarget)) : d[this.key].type == "operator" ? this.value != this.key ? this.outputvalue = N(this.value, this.conversiontarget) : this.outputvalue = N(this.value, this.conversiontarget) : this.key == "," ? (console.debug("found comma with parent", this.parent), this.position == 1 && (this.outputvalue = "COMMA")) : d[this.key].type == "symbol" ? console.debug("found a symbol") : d[this.key].type == "relation" ? (console.debug("found a relation"), this.value != this.key ? this.outputvalue = N(this.value, this.conversiontarget) : this.outputvalue = N(this.value, this.conversiontarget)) : d[this.key].type == "function" && (console.debug("found a function"), this.value != this.key ? (console.debug("marking the argument of a function", this.value, "within", this), this.outputvalue = N(this.value, this.conversiontarget)) : this.outputvalue = N(this.value, this.conversiontarget)), console.debug("   and now leaf is key, val, oval", this.key, ",", this.value, ",", this.outputvalue);
  }
  combine(t) {
    for (let n of this.children)
      n && n.combine(t);
    if (this.isLeaf) {
      try {
        console.debug("isLeaf with key", this.key, "pair", this.pair, "parent children", this.parent.children, "of length", this.parent.children.length, "what we want", this.parent.children[2].pair, "ee", this);
      } catch {
        console.debug("isLeaf with key", this.key, "pair", this.pair, "this", this);
      }
      console.debug("the root", this.treeRoot), this.value.length > 1 && (this.value = this.value.trim()), this.addLeafMarkup();
    } else {
      console.debug("not a Leaf", this.pair, this);
      let n = this.children[0].key, r, i, o = this.children.length, s = 0;
      for (; this.children[s].value != n; )
        s++;
      if (n == " ")
        this.children.length > 1 && this.children[1].value == n ? (n == " " && (n = "\\,"), r = this.children[0].value + n + this.children[2].value, console.debug("adding Oo to", this, "because of", this.children[0]), i = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, this.key && this.key != " " && d[this.key].type != "function" && !d[this.key].wrappedarguments && d[this.key].priority > 20 && (console.debug("maybe wrapping this.key", this.key, "for", i), this.conversiontarget == "MathML" ? i = "<mrow>" + i + "</mrow>" : this.conversiontarget == "Speech" && (console.debug("AddIng quantity", this), i = "quantityS " + i + " Sendquantity"))) : (i = this.children[1].outputvalue, r = this.children[1].value);
      else if (n == "")
        console.debug("  found an empty key", this), this.children.length > 1 && this.children[1].value == n ? (i = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, r = this.children[0].value + this.children[1].value + this.children[2].value) : (i = this.children[1].outputvalue, r = this.children[1].value);
      else {
        console.debug("about to use conversiontarget", this.conversiontarget);
        try {
          console.debug("               trying to extract using key", n, "position", s, "numberOfSiblings", o, "from", this, "with rule of", s + 1 + "," + o), this.conversiontarget == "MathML" ? (r = d[n].rule[s + 1 + "," + o], i = d[n].ruleML[s + 1 + "," + o], console.debug("               attempted       MathML conversion: ", r, "newOutputValue", i)) : this.conversiontarget == "Speech" ? (r = d[n].rule[s + 1 + "," + o], i = d[n].speech[s + 1 + "," + o]) : (r = d[n].rule[s + 1 + "," + o], i = d[n].rule[s + 1 + "," + o]);
        } catch {
          r = d[n].rule[s + 1 + "," + o], i = d[n].rule[s + 1 + "," + o], console.debug("                      MathML conversion failed on", r);
        }
        if (r.includes("#comma?") && (this.key && d[this.key].type == "operator" && d[this.key].priority < 0 ? r = r.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$1") : r = r.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$2")), r.includes("#{}")) {
          let a = !0, u = this;
          for (["^^", "__"].includes(u.key) && (a = !1); u.parent && isScriptPure(u.key); )
            u = u.parent, ["^^", "__"].includes(u.key) && (a = !1);
          a ? r = r.replace("#{}", "{}") : r = r.replace("#{}", "");
        }
        for (let a = 0; a < this.children.length; a++) {
          let u = this.children[a].value, h = this.children[a].outputvalue, g = u, p = h;
          r.includes("#@" + (a + 1)) && (g.length > 1 && (g = "{" + g + "}"), r = r.replace("#@" + (a + 1), g), i = i.replace("#@" + (a + 1), p)), t.includes("caseEnvironment") ? (r = r.replace("#&", "&"), i = i.replace("#&", "&")) : (r = r.replace("#&\\text{", "\\text{ "), r = r.replace("#&", ""), i = i.replace("#&\\text{", "\\text{ "), i = i.replace("#&", "")), r = r.replace("#" + (a + 1) + "@1", u[0]), r = r.replace("#" + (a + 1) + "@-1", u.substring(1)), r = r.replace("#" + (a + 1), u), i = i.replace("#" + (a + 1) + "@1", h[0]), i = i.replace("#" + (a + 1) + "@-1", h.substring(1)), i = i.replace("#" + (a + 1), h);
        }
      }
      this.value = r, this.outputvalue = i, this.children = [];
    }
    if (this.parent && d[this.key] && d[this.key].offpair) {
      let n = this.parent.children.length, r = 0;
      for (console.debug(n, "this.key", this.key, "this", this, "this.parent", this.parent); this.parent.children[r].value != this.key; )
        console.debug(r, "this.parent.children[position]", this.parent.children[r]), r++;
      console.debug("dictionary[this.key].offpair", d[this.key].offpair, "looking for", r + 1 + "," + n, "containing", this.position + 1, "in", d[this.key].offpair[r + 1 + "," + n]), d[this.key].offpair[r + 1 + "," + n] && d[this.key].offpair[r + 1 + "," + n].includes(this.position + 1) && this.pair.pop();
    }
    if (this.pair && this.pair.length > 0 && (console.debug("this.pair[0]", this.pair[0]), this.pair[0] = Lt(this.pair, this.conversiontarget), this.pair[0].length > 0)) {
      console.debug("this.pair[0]", this.pair[0]);
      for (let n of this.pair)
        if (this.value = n[0] + this.value + n[1], this.conversiontarget == "MathML") {
          if (console.debug("((((adding parentheses to", this.outputvalue, "of", this), this.outputvalue.length > 18 && (this.outputvalue = "<mrow>" + this.outputvalue + "</mrow>"), !this.key || this.key == " " || !d[this.key].delimitedarguments) {
            let r = this.outputvalue;
            n[0] != "" && (r = '<mo stretchy="false">' + n[0] + "</mo>" + r), n[1] != "" && (r = r + '<mo stretchy="false">' + n[1] + "</mo>"), this.outputvalue = r;
          }
        } else this.conversiontarget == "Speech" ? kt(this.outputvalue) || (console.debug("adding quantity", this), this.outputvalue = "quantityP " + this.outputvalue + " Pendquantity") : (!this.key || this.key == " " || !d[this.key].delimitedarguments) && (this.outputvalue = n[0] + this.outputvalue + n[1]);
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
class Mt {
  constructor(t, n, r, i) {
    this.root = new _(t, n, r, null, i), console.debug("       Tree 0 conversiontarget", i);
  }
  *preOrderTraversal(t = this.root) {
    if (yield t, t.children.length)
      for (let n of t.children)
        yield* this.preOrderTraversal(n);
  }
  *postOrderTraversal(t = this.root) {
    if (t.children.length)
      for (let n of t.children)
        yield* this.postOrderTraversal(n);
    yield t;
  }
  insert(t, n, r = n) {
    console.debug("       Tree 1 conversiontarget", this.conversiontarget);
    for (let i of this.preOrderTraversal())
      if (console.debug("trying Tree1 node", i), i.value === t)
        return i.children.push(new _(n, r, i, conversiontarget)), !0;
    return !1;
  }
  remove(t) {
    for (let n of this.preOrderTraversal()) {
      const r = n.children.filter((i) => i.value !== t);
      if (r.length !== n.children.length)
        return n.children = r, !0;
    }
    return !1;
  }
  find(t) {
    for (let n of this.preOrderTraversal())
      if (n.value === t) return n;
  }
  // refactor to combine this and the following, so the tree is only traversed once
  adjustImpliedMultiplication() {
    let t = ["lim", "quote", "dollar"], n = ["quote", "cent"];
    for (let r of this.preOrderTraversal())
      t.includes(r.value) && t.includes(r.key) && r.position == 0 && (console.debug("found a lim", r), console.debug("now looking at", r.parent, "and", r.parent.children[0], "and", r.parent.children[1]), r.parent.parent && r.parent.parent.children[1].key == " " && r.parent.parent.children[1].value == " " && (console.error("adding hello", r.parent.parent.children[1]), r.parent.parent.children[1].key = "✂️", console.error("now", r.parent.parent.children[1]))), n.includes(r.value) && n.includes(r.key) && r.position == 0 && (console.debug("found a quote", r), console.debug("now looking at parent", r.parent, "and itself", r.parent.children[0], "and parent parent", r.parent.parent), r.parent.parent && r.parent.parent.parent && r.parent.parent.parent.children[1].key == " " && r.parent.parent.parent.children[1].value == " " ? (console.error("adding goodbye", r.parent.parent.parent.children[1]), r.parent.parent.parent.children[1].key = "✂️", console.error("now", r.parent.parent.parent.children[1])) : r.parent && r.parent.parent && r.parent.parent.children[1].key == " " && r.parent.parent.children[1].value == " " && (console.error("adding goodbye", r.parent.parent.children[1]), r.parent.parent.children[1].key = "✂️", console.error("now", r.parent.parent.children[1])));
  }
  combineSubSup() {
    for (let t of this.preOrderTraversal())
      t.value === "" && t.key === "^" && t.position == 0 && (t.children.length > 1 && t.children[0].key == "_" ? (t.parent.children[2].key = "subsup", t.parent.children[2].position = 3, t.parent.children[1] = t.children[2], t.parent.children[1].key = "subsup", t.parent.children[1].position = 2, t.parent.children[1].parent = t.parent, t.parent.children.unshift(t.children[0]), t.parent.children[0].key = "subsup", t.parent.children[0].position = 0, t.parent.children[0].parent = t.parent, t.parent.children[1] = t.children[1], t.parent.children[1].key = "subsup", t.parent.children[1].value = "subsup", t.parent.children[1].position = 1, t.parent.children[1].parent = t.parent) : console.debug("no children"));
  }
  addParents() {
    for (let t of this.preOrderTraversal())
      for (const n of t.children)
        n.parent != t && (n.parent = t);
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
function Lt(e, t) {
  let n = e[0];
  return console.debug("adjusting brackets", n), t == "LaTeX" && (n[0] == "{" && (n[0] = ["\\{"]), n[1] == "}" && (n[1] = ["\\}"])), n[0] == "⁅" && (n = []), n[0] == "❲" && (n[0] = [""]), n[1] == "❳" && (n[1] = [""]), n;
}
function Le(e) {
  return e === void 0 ? "undefined" : e === null ? "null" : e == "" ? "es" : e.replaceAll(" ", "␣");
}
function Ge(e, t) {
  if (console.debug("printTree of", e), !e)
    return "";
  let n = t + "[" + Le(e.key) + "]   |" + Le(e.value) + "|";
  if (e.pair.length && (n += "    " + e.pair[0] + " " + e.pair.length), e.children.length == 0 ? n += "    leaf" : e.parent != null ? n += "       " + e.parent.children.length : n += "       nuLL", n += `
`, e.children.length == 0)
    return n;
  {
    e.children.length;
    let r = n;
    for (let i = 0; i < e.children.length; ++i)
      r += Ge(e.children[i], t + "    ");
    return r;
  }
}
function re(e, t, n) {
  console.debug("starting M2TreeConvert  conversiontarget", n);
  let r = new Mt(0, e, null, n), i = "", o = r.root, s = !0, a, u = [], h = {};
  for (console.debug("continuing M2TreeConvert  conversiontarget", n, "on", e); s; ) {
    let g = o.value;
    console.debug("fullStr", "X" + g + "X");
    let p = 0, l = 0, m = 0, c, y;
    for (; g.length > m; ) {
      let f = g[m], v = !1, P = !1;
      for (let b of [['"', '"']])
        if (f == b[0]) {
          console.debug("found a quote");
          let w = _e(g, m, b[0], b[1], [[b[0]]]);
          if (w != -1) {
            let x = [g.substring(0, m), g.substring(m + 1, w), g.substring(w + 1)];
            console.debug("children are", x), o.value = "";
            let E = new _(0, "\\ \\ \\text{" + x[1] + "}\\ \\ ", "justatest", null, n);
            if (console.debug("qNode was", E, "with children", E.children), E = V(x[0], E, n), console.debug("qNode is", E, "with children", E.children), console.debug("stackedTreeNode was", a), a = H(a, E, n), console.debug("stackedTreeNode is", a, "with children", a.children), u.length > 0) {
              a.key = u[0][0].children[0].key;
              let Z = u[0][0].children.pop();
              u[0][0].insertNode(a), u[0][0].insertNode(Z), u[0][1]--, u[0][1] == 0 && u.shift(), a = void 0;
            }
            g = g.substring(w + 1), m = 0, l = 0, c = void 0, y = void 0, v = !0;
          }
        }
      if (Et(f)) {
        console.debug("apparently found a left of pair", f);
        let b = Pt(g, m);
        if (b != -1) {
          let w = [g.substring(0, m), g.substring(m + 1, b), g.substring(b + 1)];
          o.value = "";
          let x = re(w[1].trim(), t, n)[0].root;
          if (x.pair.push([f, g[b]]), x = V(w[0], x, n), console.debug("just made pNode", x), a = H(a, x, n), console.debug("just made stackedTreeNode", a), u.length > 0) {
            a.key = u[0][0].children[0].key;
            let E = u[0][0].children.pop();
            u[0][0].insertNode(a), u[0][0].insertNode(E), u[0][1]--, u[0][1] == 0 && u.shift(), a = void 0;
          }
          g = g.substring(b + 1), m = 0, l = 0, c = void 0, y = void 0, v = !0;
        }
      }
      if (f == "<" && g[m + 1] != " ") {
        console.debug("looking for an angle pair");
        let b = Nt(g, m);
        if (b != -1) {
          let w = [g.substring(0, m), g.substring(m + 1, b), g.substring(b + 1)];
          o.value = "";
          let x = re(w[1].trim(), t, n)[0].root;
          if (x.pair.push(["\\langle ", "\\rangle "]), x = V(w[0], x, n), a = H(a, x, n), u.length > 0) {
            a.key = u[0][0].children[0].key;
            let E = u[0][0].children.pop();
            u[0][0].insertNode(a), u[0][0].insertNode(E), u[0][1]--, u[0][1] == 0 && u.shift(), a = void 0;
          }
          g = g.substring(b + 1), m = 0, l = 0, c = void 0, y = void 0, v = !0, console.debug("keyType", y);
        }
      }
      console.debug("OUT j", l, "on", "X" + g + "X", "woith counter", m);
      for (let b = l; b <= m; b++) {
        if (console.debug("inner j", b, "on", "X" + g + "X", "counter", m), g[m + 1] && g[m].match(/[A-Za-z␣]/g) && g[m + 1].match(/[A-Za-z␣]/g)) {
          console.debug("  contuing because building up a word on", g[m], "and", g[m + 1], "so far", g.substring(b, m + 1));
          continue;
        }
        let w = g.substring(b, m + 1), x = At(g, w, m, a);
        if (console.debug("subStr", w, "type", x), x) {
          c = w, p = b, y = x, P = !0, console.debug("A keyType", y, "with key", "X" + c + "X", "from subStr", w);
          break;
        }
        if (w == " " && (m >= 1 || o.parent && o.parent.children.length == 2 && o.position == 1 || a) && !Tt(St(g, m))) {
          c = w, p = b, y = "space", P = !0, console.debug("B keyType", y);
          break;
        } else
          console.debug("     maybe breaking on multiword subStr", w);
      }
      if (P)
        break;
      v || (m++, f.match(/[\s\d]/g) && (l = m));
    }
    if (console.debug("is there a" + c + "key?"), c) {
      console.debug("yes, there is there a" + c + "key"), !d[c] && c != " " && c != "" && (c = we.getItem(c)), console.debug("and now it is" + c + "key of", y, "keyType");
      let f, v, P, b;
      switch (y) {
        case "space":
        case "operator":
        //operators
        case "relation":
          if (f = [g.substring(0, p), c, g.substring(m + 1)], y == "relation" && t.includes("&beforeFirstRelation") && !h["&beforeFirstRelation"] && (h["&beforeFirstRelation"] = !0, f[2] = "&" + f[2]), v = new _(0, f[0], c, null, n), P = new _(0, f[1], c, null, n), b = new _(0, f[2], c, null, n), a && (a = qt(v.value, a, n), v = a, v.key = c, a = void 0), y == "space" && u.length > 0) {
            o.value = f[0], b.key = u[0][0].children[0].key, u[0][0].insertNode(b), o = u[0][0].children[u[0][0].children.length - 1], u[0][1]--, u[0][1] == 0 && u.shift();
            break;
          }
          let w = !0;
          (Ke(c) || Ye(c)) && (y != "space" && f[0].length == 0 || g[p - 1]) && g[m + 1] && g[p - 1] != " " && g[m + 1] != " " && (w = !1);
          let x = ce(c), E = !1;
          y != "space" && d[c].script && (x -= 0.1, w && (E = !0, v.exPriority = !0, P.exPriority = !0, b.exPriority = !0), w || (w = !0), Ot(o, c) && (w = !1));
          let Z = 0;
          if (o.exPriority && !E && (Z += 0.2), w && (o.noPriority || x + Z < ce(o.key))) {
            let S = !1;
            for (o.value = v.value, o.children = v.children, o.pair = v.pair, o.exPriority = v.exPriority, o.noPriority = v.noPriority; o.parent; ) {
              let T = o.position;
              if (o = o.parent, Z = 0, !E) {
                for (let B of o.children)
                  if (B.exPriority) {
                    Z += 0.2;
                    break;
                  }
              }
              if (!o.children[0].noPriority && x + Z >= ce(o.children[0].key)) {
                let B = o.children[T], j = new _(T, null, o.children[0].key, null, n);
                j.noPriority = o.children[T].noPriority, j.exPriority = o.children[T].exPriority, o.children[T] = j, j.parent = o, j.insertNode(B), B.key = c, B.noPriority = P.noPriority, B.exPriority = P.exPriority, j.insertNode(P), j.insertNode(b), o = j.children[2], S = !0;
                break;
              }
            }
            if (!S) {
              let T = new _(0, "", null, null, n);
              r.root.key = c, T.insertNode(r.root), T.insertNode(P), T.insertNode(b), r.root = T, o = r.root.children[2];
            }
          } else
            w || (v.noPriority = !0, P.noPriority = !0, b.noPriority = !0), o.value = "", o.insertNode(v), o.insertNode(P), o.insertNode(b), o = o.children[2];
          break;
        //break case
        case "function":
          f = [g.substring(0, p), c, g.substring(m + 1)], f[2][0] == " " && (f[2] = f[2].substring(1)), v = new _(0, f[0], c, null, n), P = new _(0, f[1], c, null, n), b = new _(0, f[2], c, null, n), a && (a = V(v.value, a, n), v = a, v.key = c, a = void 0);
          let $ = new _();
          if ($.conversiontarget = n, $.value = "", $.insert(c, c), b.key = c, d[c].pairedArgument) {
            let S = _e(g, p, c, d[c].pairedArgument, d[c].family);
            if (S != -1) {
              let T = [g.substring(m + 1, S), g.substring(S + 1)], B = re(T[0].trim(), t, n)[0].root, j = new _(0, T[1], c, null, n);
              $.insertNode(B), $.insertNode(j);
            } else
              $.insertNode(b);
          } else
            $.insertNode(b);
          let z = o;
          o = $.children[$.children.length - 1], v.value.length > 0 && ($ = _t(v, $)), $.value = "", z.parent ? ($.key = z.parent.children[z.position].key, $.position = z.position, $.parent = z.parent, z.parent.children[z.position] = $) : r.root = $, d[c] && d[c].extraArgument && u.push([$, d[c].extraArgument]);
          break;
        case "postfix":
        // such as "!" for factorial.
        case "symbol":
        //symbols
        case "letter":
          f = [g.substring(0, p), c, g.substring(m + 1)], console.debug("making a symbolNode with", f);
          let M = new _();
          if (M.conversiontarget = n, M.value = "", M.insert(c, c), M = V(f[0], M, n), a = H(a, M, n), console.debug("now have stackedTreeNode", a), u.length > 0) {
            a.key = u[0][0].children[0].key;
            let S = u[0][0].children.pop();
            u[0][0].insertNode(a), u[0][0].insertNode(S), u[0][1]--, u[0][1] == 0 && u.shift(), a = void 0;
          }
          o.value = f[2], console.debug("now have currentNode", o);
          break;
        case "multiline":
          f = [g.substring(0, p), c, g.substring(m + 1)];
          let ke = new _(0, f[0], null, null, n);
          a = H(a, ke, n), o.value = f[2], i = c, console.debug("----------- just set exParam = ", i);
          break;
        case "UNUSED":
          f = [g.substring(0, p), c, g.substring(m + 1)], o.value = f[2];
          break;
      }
    } else {
      if (a) {
        if (g.trim() != "") {
          console.debug("388 M2TreeConvert  conversiontarget", n);
          let v = new _();
          v.conversiontarget = n, a.key = "", v.insertNode(a), v.insert("", ""), v.insert(g, ""), a = v;
        }
        let f = o.position;
        a.position = f, a.key = o.key, o.parent ? (a.parent = o.parent, o.parent.children[f] = a) : r.root = a;
      }
      s = !1;
      break;
    }
  }
  return r.addParents(), console.debug("continuing", r.root.children[0], r.root.children[1]), r.combineSubSup(), console.debug("combineSubSup returned", r, "aa", r.root, "bb", r.root.children), r.adjustImpliedMultiplication(), console.debug("adjustImpliedMultiplication returned", r, "aa", r.root, "bb", r.root.children), console.debug(Ge(r.root, "")), [r, i, h];
}
function H(e, t, n) {
  if (e) {
    console.debug("stackNode M2TreeConvert  stackedTreeNode.conversiontarget", e.conversiontarget);
    let r = new _();
    r.conversiontarget = n, e.key = "", r.insertNode(e), r.insert("", ""), t.key = "", r.insertNode(t), e = r;
  } else
    e = t;
  return e;
}
function V(e, t, n) {
  if (e.trim() != "") {
    console.debug("combinePrev M2TreeConvert  ", e, "xx", t, "cc", n);
    let r = new _();
    r.conversiontarget = n, t.key = "", r.insert(e, ""), r.insert("", ""), r.insertNode(t), t = r, console.debug(" combinePrev pNode.conversiontarget", t);
  }
  return t;
}
function _t(e, t) {
  return console.debug("combinePrevNode preNode.conversiontarget", e.conversiontarget), e.insert("", ""), e.insertNode(t), e;
}
function qt(e, t, n) {
  if (e.trim() != "") {
    console.debug("combineAfter M2TreeConvert  conversiontarget", n);
    let r = new _();
    r.conversiontarget = n, t.key = "", r.insertNode(t), r.insert("", ""), r.insert(e, ""), t = r;
  }
  return t;
}
function At(e, t, n, r) {
  let i = ee(t);
  if (i && !jt(e, t, n))
    return i.mustHaveLeftArgument && n == 0 && !r ? void 0 : i.type;
}
function ee(e) {
  return d[e] ? d[e] : (e = we.getItem(e), e == -1 ? void 0 : d[e]);
}
function Et(e) {
  return ["(", "[", "{", "⁅", "❲"].includes(e);
}
function Ye(e) {
  let t = ee(e);
  return t && t.type == "operator";
}
function Tt(e) {
  for (let t = 1; t <= e.length; t++) {
    let n = e.substring(0, t);
    if (Ye(n) || Ke(n))
      return !0;
  }
  return !1;
}
function Ke(e) {
  let t = ee(e);
  return t && t.type == "relation";
}
function ce(e) {
  let t = ee(e);
  switch (e) {
    case " ":
    case "":
      return 19;
    default:
      return t ? t.priority : 999;
  }
}
function Pt(e, t) {
  if (!["(", "[", "{", "⁅", "❲"].includes(e[t]))
    throw new Error("No" + lp + " at index " + t);
  let n = 1;
  for (let r = t + 1; r < e.length; r++)
    switch (e[r]) {
      case "(":
      case "[":
      case "{":
      case "⁅":
      case "❲":
        n++;
        break;
      case ")":
      case "]":
      case "}":
      case "⁆":
      case "❳":
        if (--n == 0)
          return r;
        break;
    }
  return -1;
}
function Nt(e, t) {
  if (!["<"].includes(e[t] || [" "].includes(e[t + 1])))
    throw new Error("No" + lp + " at index " + t);
  let n = 1;
  for (let r = t + 1; r < e.length; r++)
    if (e[r] == "<" && e[r + 1] != " " && n++, e[r] == ">" && e[r - 1] != " " && --n == 0)
      return r;
  return -1;
}
function _e(e, t, n, r, i) {
  if (e.substring(t, t + n.length) != n)
    throw new Error("No " + n + " at index " + t + " of " + e);
  let o = 1;
  for (let s = t + 1; s < e.length; s++) {
    if (e.substring(s, s + r.length) == r && --o == 0)
      return s;
    for (let a of i)
      e.substring(s, s + a.length) == a && e[s - 1].match(/[\s\d]/g) && o++;
  }
  return -1;
}
function St(e, t) {
  let n = "";
  for (let r = t + 1; r < e.length; r++)
    switch (e[r]) {
      case `
`:
      case " ":
        break;
      default:
        n += e[r];
    }
  return n;
}
function jt(e, t, n) {
  for (let r = n + 1; r < e.length && !e[r].match(/[\s\d]/g); r++)
    if (t += e[r], ee(t))
      return !0;
  return !1;
}
function Ot(e, t) {
  if (console.debug("checkScriptSimilarity", e), e.pair.length > 0 || e.parent && e.parent.exPriority)
    return !1;
  let n = e;
  for (; n.parent && (n = n.parent, !(n.pair.length > 0 || e.parent && e.parent.exPriority)); )
    if (n.key == t)
      return !0;
  for (n = e.parent; n && n.children[0] && (n = n.children[0], !(n.pair.length > 0 || e.parent && e.parent.exPriority)); )
    if (n.key == t)
      return !0;
  return !1;
}
function Xt(e, t) {
  return console.debug("combineTree2Latex", e, "params", t, "with output", e.root.outputvalue), e.root.combine(t), console.debug("AGAIN combineTree2Latex", e, "params", t, "with output", e.root.outputvalue), e.root.outputvalue;
}
function Zt(e, t, n, r) {
  e = e.replace(/(&|\\amp)/g, "🎯");
  for (let h of we.getAllMultiLine()) {
    let g = e.indexOf(h.slice(0, -1) + "(");
    for (; g != -1; ) {
      let p = Ct(e, g + h.length - 1, "(", ")");
      if (p != -1) {
        let l = [e.substring(0, g), e.substring(g + h.length, p), e.substring(p + 1)];
        newMiddleStr = h + `
 `, d[h].emptyLineBeforeIndent ? (newMiddleStr += l[1].replaceAll(";", `

 `), newMiddleStr += `
`) : newMiddleStr += l[1].replaceAll(";", `
 `), e = l[0] + newMiddleStr + l[2], g = e.indexOf(h.slice(0, -1) + "(");
      } else
        continue;
    }
  }
  e = e.replaceAll("\\,", ""), e = e.replaceAll("\\:", ""), e = e.replaceAll("\\;", ""), e = e.replaceAll("\\!", ""), e = e.replace(/([a-zA-Z])\\/g, "$1 "), e = e.replaceAll("\\", "");
  let i = e.split(`
`), o = "", s = [], a = "";
  for (; i.length > 0; ) {
    var u = [];
    if (s[0] && d[s[0]].params && (u = d[s[0]].params), console.debug("  ++  ++  ++  ++  ++  ++  ++  ++  ++  ++ "), console.debug("top of loop  ", i), console.debug("params = ", u), i[0].trim() == "" && !u.includes("system") && !u.includes("derivation") && !u.includes("align")) {
      console.info("skipping empty string"), i.shift();
      continue;
    }
    if (u.length > 0 && u.includes("caseEnvironment")) {
      let m = i[0], c = m.split(/(if|when|unless|otherwise)/g);
      c.length != 3 ? console.error("invalid cases line", m) : (m = "casesline(" + c[0] + ")(" + c[1] + ")(" + c[2] + ")", i[0] = m), console.debug("thisLinePieces", c);
    } else if (u.length > 0 && (u.includes("system") || u.includes("derivation"))) {
      let m = i[0];
      for (; i.length > 1 && i[1].trim() != ""; )
        m += i[1], i.splice(1, 1);
      let c = m.split(/(<=|>=|:=|<|>|=|~|≈|approx|asymp).*?/);
      if (c.length > 3) {
        let y = "";
        for (; c.length >= 3; )
          y = c.pop() + y;
        c[2] = y;
      }
      c.length != 3 ? console.warn("invalid system/derivation/align line", m, "with pieces", c) : (c[0].trim() == "" ? m = "derivationline(" + c[1].trim() + ")(" + c[2].trim() + ")" : m = "systemline(" + c[0].trim() + ")(" + c[1].trim() + ")(" + c[2].trim() + ")", i[0] = m);
    } else if (u.length > 0 && u.includes("align")) {
      let m = i[0];
      for (; i.length > 1 && i[1].trim() != ""; )
        m += i[1], i.splice(1, 1);
      let c = m.split(/(🎯).*?/);
      if (c[1] == "🎯" && (c[1] = ""), c.length > 3) {
        let y = "";
        for (; c.length >= 3; )
          y = c.pop() + y;
        c[2] = y;
      } else c.length == 3 ? (m = "alignline(" + c[0].trim() + ")(" + c[1].trim() + ")(" + c[2].trim() + ")", i[0] = m) : i[0] = "";
    }
    let h = re(i[0].trim(), u, r);
    console.debug("temp");
    let g = h[0], p = h[1], l = Xt(g, u);
    u.length && u.includes("caseEnvironment") ? r == "Speech" : u.length && (u.includes("system") || u.includes("derivation") || u.includes("align")) && (u.includes("system") || u.includes("derivation") || u.includes("align"), r == "Speech"), i.length > 0 && p.length == 0 && (s.length > 0 && (!d[s[0]].absorbEmptyLine || i[0].trim().length > 0) ? d[s[0]].absorbEmptyLine && i.length > 1 && i[1].trim().length > 0 || i.length == 2 && i[1].trim().length == 0 || i.length == 1 || (d[s[0]].changeLineTurn ? l += d[s[0]].changeLineTurn + `
` : l += "") : i.length > 1 && (d[s[0]] && d[s[0]].absorbEmptyLine && i[0].trim().length == 0 || (l += `
`))), a = i[0], i.shift(), d[p] && (d[p].seperateOut && (l += n), d[p].noBeginEnd ? l += d[p].note + "{" : p == "cases:" ? l += "\\begin{" + d[p].note + `}
` : l += `
<` + d[p].note + `>
`, s.push(p)), s.length > 0 && i[0] && i[0][0] != " " && (!d[s[0]].emptyLineBeforeIndent || a.trim().length == 0) && (d[s[0]].noBeginEnd ? l += "}" : l += "AA\\end{" + d[s[0]].note + "}", d[s[0]].lineBreak && (l += `
`), d[s[0]].seperateOut && (l += t), s.shift()), o += l;
  }
  for (; s.length > 0; )
    d[s[0]].noBeginEnd ? o += "}" : u.length && u.includes("caseEnvironment") ? o += "\\end{" + d[s[0]].note + `}
` : o += "</" + d[s[0]].note + `>
`, d[s[0]].seperateOut && (o += t), s.shift();
  return vt(o);
}
class Rt {
  constructor() {
    this.cache = [], this.cacheSize = 500, this.nonCache = [], this.nonCacheSize = 500, this.multilineList = [];
  }
  getAllMultiLine() {
    if (this.multilineList.length == 0)
      for (let t of Object.keys(d))
        d[t].type == "multiline" && this.multilineList.push(t);
    return this.multilineList;
  }
  getItem(t) {
    if (t == " " || t == "")
      return -1;
    for (let n = this.cache.length - 1; n >= 0; n--)
      if (this.cache[n][0] === t)
        return this.cache[n][1];
    if (this.nonCache.includes(t))
      return -1;
    for (let n of Object.keys(d)) {
      let r = d[n].alternative;
      if (r) {
        for (let i of r)
          if (i == t)
            return this.cache.push([t, n]), this.cache.length > this.cacheSize && this.cache.shift(), n;
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
let we = new Rt();
function It(e, t) {
  e = e.replace(/(&|\\amp)/g, "🎯"), e = e.replace(/REtuRn/g, `
`);
  let n = Zt(e, "LBRACK", "RBRACK", t);
  return n = $t(n), n;
}
function Ct(e, t, n, r) {
  if (e.substring(t, t + n.length) != n)
    throw new Error("No" + n + " at index " + t);
  for (let i = t + 1; i < e.length; i++)
    switch (e.substring(i, i + r.length)) {
      case r:
        return i;
    }
  return -1;
}
const X = function(...e) {
  typeof window < "u" && window.alert ? window.alert(...e) : console.log("alert", ...e);
};
let ge = "STart";
ge = "";
const he = function(e) {
  if (typeof e == "string")
    return e;
  if (!Array.isArray(e)) {
    let r = "";
    console.log("content", e);
    const i = e.tag;
    let o = q[i];
    return o || (o = D(i)), r += o.before_begin + o.begin_tag + ge, "xmlattributes" in e && e.xmlattributes && (r += " " + e.xmlattributes.trim()), "id" in e && e.id && (r += ' xml:id="' + U(e.id) + '"'), Object.keys(e).forEach((u) => {
      ["tag", "content", "title", "xmlattributes", "id"].includes(u) || (r += " " + u + '="' + e.el + '"');
    }), r += o.after_begin, "title" in e && e.title && (r += `
<title>` + qe(e.title) + `</title>
`), r + he(e.content) + o.before_end + o.end_tag + o.after_end;
  }
  const t = e;
  let n = "";
  return t.forEach((r, i) => {
    let o = "";
    if (typeof r == "string") {
      r.match(/^\s*$/) || (o += "<TEXT>" + r + "</TEXT>", console.log("just added error of", r));
      return;
    }
    let s = "", a = "";
    const u = r.tag;
    let h = q[u];
    typeof h > "u" && (h = me), a += h.before_begin + h.begin_tag + ge, "xmlattributes" in r && r.xmlattributes && (a += " " + r.xmlattributes.trim()), "id" in r && r.id && (a += ' xml:id="' + U(r.id) + '"'), Object.keys(r).forEach((y) => {
      !["tag", "content", "title", "xmlattributes", "id"].includes(y) && !y.startsWith("_") && (a += " " + y + '="' + r[y] + '"');
    }), "title" in r && r.title && !$e.includes(u) ? s += `
<title>` + qe(r.title) + `</title>
` : "title" in r && r.title && $e.includes(u) && ["ol", "ul", "enumerate", "itemize"].includes(u) && (a += " " + r.title), a += h.after_begin;
    let p = r.content, l = he(p);
    ["c", "code", "tabular"].includes(u) && (l = Ue(l));
    let m = "";
    ["m", "md", "me", "mdn", "men"].includes(u) && (l.match(/^.*(\.|,|;)\s*$/s) && (l = l.replace(/\s*$/, ""), m = l.slice(-1), l = l.slice(0, -1)), l.match(/(\\|{)/) ? l = zt(l) : (l = It(l, "LaTeX"), l = l.replace(/&/g, " \\amp "))), s = s + l;
    let c = h.before_end + h.end_tag + m + h.after_end;
    s.match(/^\s*<mdn>.*<\/mdn>\s*$/s) ? o = s : o = a + s + c, s.match(/^\s*<p>\s*<\/p>\s*$/) && (console.log("empty p"), s = ""), o = o.replace(/(\/)(me|md|men|mdn)>\s+(\.|,|;|:)/g, "$1$2>$3"), n += o;
  }), n;
}, U = function(e) {
  let t = e;
  return t = t.replace(/[^a-zA-Z0-9\-_ ]/g, "_"), t;
}, Ue = function(e) {
  let t = e;
  return t = t.replace(/&/g, "&amp;"), t = t.replace(/</g, "&lt;"), t = t.replace(/>/g, "&gt;"), t;
}, zt = function(e) {
  let t = e;
  return t = t.replace(/&/g, "\\amp "), t = t.replace(/</g, "\\lt "), t = t.replace(/>/g, "\\gt "), t;
}, Bt = function(e, t, n) {
  let r = n, i = 0;
  const o = e.length;
  for (; r < t.length; ) {
    const s = t[r];
    if (i <= 0 && t.slice(r, r + o) === e)
      return r;
    s === "\\" ? r++ : s === "{" ? i++ : s === "}" && i--, r++;
  }
  return -1;
}, J = function(e, t = 0, n = "{", r = "}") {
  let i = e.trimStart();
  if (!i)
    return console.log("empty string sent to first_bracketed_string()"), ["", ""];
  let o = "", s = "", a = "";
  if (t == 0 && i[0] != n)
    return ["", i];
  for (t == 0 ? (a = n, t = 1, i = i.substring(1)) : a = ""; t > 0 && i; )
    s = i.substring(0, 1), s == n && o != "\\" ? t += 1 : s == r && o != "\\" && (t -= 1), a += s, o == "\\" && s == "\\" ? o = `
` : o = s, i = i.substring(1);
  return t == 0 ? [a, i] : (console.log("no matching bracket %s in %s XX", n, i), ["", a.substring(1)]);
}, Ft = function(e) {
  return e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}, Dt = /^\\AAAAAAAbegin{/, G = function(e, t, n) {
  if (typeof e == "string")
    return Je(e);
  if (!Array.isArray(e)) {
    let o = { ...e };
    return o.content = G(o.content, t, n), o;
  }
  let r = [], i = "";
  return e.forEach((o, s) => {
    if (n.includes(o.tag))
      i && (r.push({ tag: "p", content: i }), i = ""), Q.includes(o.tag) && typeof o.content == "string" ? (o.content = xe(o.content, I), o.content = G(o.content, t, n)) : Q.includes(o.tag) && (o.content = G(o.content, t, n)), r.push(o);
    else if (o.tag == "text")
      o.content.split(/\n\s*\n{1,}/).forEach((u) => {
        const h = i + u;
        if (h) {
          const g = { tag: "p", content: h };
          r.push(g);
        }
        i = "";
      });
    else if (typeof o.content == "string" && Q.includes(o.tag)) {
      let a = [];
      o.content.split(/\n\s*\n{1,}/).forEach((h) => {
        const g = h.trim();
        g && a.push({ tag: "p", content: g });
      }), o.content = a, r.push(o);
    } else
      r.push(o);
  }), r;
}, Je = function(e) {
  let t = [], n = "";
  return e.split(/\n\s*\n{1,}/).forEach((i) => {
    const o = n + i;
    if (o) {
      const s = { tag: "p", content: o };
      t.push(s);
    }
    n = "";
  }), t;
}, xe = function(e, t) {
  typeof e != "string" && X("expected string in splitTextAtDelimiters", e);
  var n = e;
  let r;
  const i = [], o = new RegExp(
    "(" + t.map((s) => Ft(s.left)).join("|") + ")"
  );
  for (; r = n.search(o), r !== -1; ) {
    r > 0 && (i.push({
      tag: "text",
      content: n.slice(0, r)
    }), n = n.slice(r));
    const s = t.findIndex((h) => n.startsWith(h.left));
    if (r = Bt(t[s].right, n, t[s].left.length), r === -1)
      break;
    const a = n.slice(0, r + t[s].right.length), u = Dt.test(a) ? a : n.slice(t[s].left.length, r);
    i.push({
      //        type: "math",
      tag: t[s].tag,
      content: u
      //       rawData,
    }), n = n.slice(r + t[s].right.length);
  }
  return n.match(/^\s*$/) || i.push({
    tag: "text",
    content: n
  }), i;
}, et = function(e) {
  typeof e != "string" && X("expected a string, but got:", e);
  let t = e;
  return t = t.replace(/(^|\s|~)\$([^\$\n]+)\$(\s|$|[.,!?;:\-<]|th\b|st\b|nd\b)/mg, "$1<m>$2</m>$3"), t = t.replace(/(^|\s)_([^_\n]+)_(\s|$|[.,!?;:])/mg, "$1<term>$2</term>$3"), t = t.replace(/(^|\s)\*\*([^*\n]+)\*\*(\s|$|[.,!?;:])/mg, "$1<alert>$2</alert>$3"), t = t.replace(/(^|\s)\*([^*\n]+)\*(\s|$|[.,!?;:])/mg, "$1<em>$2</em>$3"), t = t.replace(/(^|\s)``([^'"`\n]+)''(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)``([^'"`\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)`([^'"`\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)"([^"\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)'([^'\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|[^`a-zA-Z0-9])`([^`\n]+)`($|[^`a-zA-A0-9])/mg, "$1<c>$2</c>$3"), t;
}, tt = function(e) {
  let t = "";
  return t = e.replace(/([^-])\-\-([^-])/mg, "$1<mdash/>$2"), t = t.replace(/\bLaTeX\b/mg, "<latex/>"), t = t.replace(/\bTeX\b/mg, "<tex/>"), t = t.replace(/\bPreTeXt\b/mg, "<pretext/>"), t = t.replace(/([^\\])~/mg, "$1<nbsp/>"), t = t.replace(/\(\\(ref|eqref|cite){([^{}]+)}\)/g, function(n, r, i) {
    return '<xref ref="' + i.replace(/, */g, " ") + '"/>';
  }), t = t.replace(/\\(ref|eqref|cite){([^{}]+)}/g, function(n, r, i) {
    return i = i.replace(/, */g, " "), i = U(i), '<xref ref="' + i + '"/>';
  }), t = t.replace(/\\(caption){([^{}]+)}/sg, "<$1>$2</$1>"), t = t.replace(/\\(caption)\s*({.*)/sg, function(n, r, i) {
    let o = J(i);
    return "<" + r + ">" + o[0] + "</" + r + `>
` + i;
  }), t = t.replace(/\\(q|term|em|m|c|fn){([^{}]+)}/g, "<$1>$2</$1>"), t = t.replace(/\\(url|href){([^{}]+)}({|\[)([^{}\[\]]+)(\]|})/g, function(n, r, i, o, s) {
    return '<url href="' + i + '">' + s + "</url>";
  }), t = t.replace(/\\(url|href){([^{}]+)}([^{]|$)/g, function(n, r, i) {
    return '<url href="' + i + '"/>';
  }), t;
}, rt = function(e) {
  let t = "";
  return t = e.replace(/\\('|"|\^|`|~|-|c|H|u|v) ([a-zA-Z])/mg, pe), t = t.replace(/\\('|"|\^|`|~|-)([a-zA-Z])/mg, pe), t = t.replace(/\\('|"|\^|`|~|-|c|H|u|v){([a-zA-Z])}/mg, pe), t;
}, pe = function(e, t, n) {
  return ht[t + n];
}, qe = function(e) {
  let t = e;
  return t = et(t), t = tt(t), t = rt(t), t;
}, Wt = function(e) {
  typeof e != "string" && X("expected a string, but got:", e);
  let t = e;
  t = t.replace(/<!--.*?-->/g, "");
  for (let [n, r] of Object.entries(gt)) {
    let i = n;
    r.forEach((o) => {
      let s = o;
      t = t.replace("<" + s + ">", "<" + i + ">"), t = t.replace("<" + s + " ", "<" + i + " "), t = t.replace("</" + s + ">", "</" + i + ">"), t = t.replace("\\begin{" + s + "}", "\\begin{" + i + "}"), t = t.replace("\\end{" + s + "}", "\\end{" + i + "}"), t = t.replace("\\" + s + "{", "\\" + i + "{");
    });
  }
  return be.forEach((n) => {
    var r = new RegExp("\\\\" + n + "{([^{}]+)}", "g");
    t = t.replace(r, "<" + n + ">$1</" + n + ">");
  }), t;
}, O = function(e, t, n, r, i = "all", o = "all", s = "") {
  let a = [];
  typeof t == "string" ? t == "displaymath" ? a = C : t == "spacelike" ? a = "spacelike" : X("unknown taglist " + t) : typeof t[0] == "string" ? a = Ae(t) : a = t;
  let u = [];
  if (Array.isArray(e))
    return e.forEach((h, g) => {
      if (n > r && h.tag != "text")
        u.push(h);
      else {
        let p;
        i == "all" || i.includes(h.tag) ? p = O(h, t, n + 1, r, i, o, h.tag) : p = h, Array.isArray(p) ? p.forEach((l) => {
          u.push(l);
        }) : u.push(p);
      }
    }), u;
  if (typeof e == "string") {
    if (n > r + 2)
      return e;
    if (a === "spacelike")
      return o == "all" || o.includes(s) ? et(e) : e;
    let h = e;
    return a === "makeparagraphs" ? (o == "all" || o.includes(s)) && (h = Je(h)) : (o == "all" || o.includes(s)) && (h = xe(h, a)), h;
  } else {
    let h = { ...e };
    if (n > r && h.tag != "text")
      return h;
    let g = h.content;
    return (i == "all" || o.includes(h.tag)) && (g = O(g, t, n + 1, r, i, o, h.tag)), h.tag == "text" && typeof g == "string" ? h.content = g : h.tag != "text" ? g.length == 1 && g[0].tag == "text" ? h.content = g[0].content : h.content = g : h = g, h;
  }
}, L = function(e, t, n = 0, r = 0, i = "all", o = "", s = "", a = "section") {
  let u = [];
  if (Array.isArray(e))
    e.forEach((g, p) => {
      let l;
      typeof g == "object" ? l = L({ ...g }, t, n + 1, r, i, g.tag, o) : l = L(g, t, n + 1, r, i, o, s), u.push(l);
    });
  else if (typeof e == "object") {
    if (t == "oneline environments" && e.tag == "p" && typeof e.content == "string") {
      if (e.content.match(/^\s*([A-Za-z]+):/)) {
        let l = e.content.split(":", 1)[0].toLowerCase();
        if (l = l.trim(), !mt.includes(l)) {
          const m = e.content.replace(/^\s*[^:]*:\s*/, "");
          e.tag = l, e.content = m;
        }
      }
    } else if (t == "extract li" && e.tag == "p" && typeof e.content == "string") {
      if (e.content.match(/^\s*\\item\s/)) {
        const p = "li", l = e.content.replace(/^\s*\\item\s*/, "");
        e.tag = p, e.content = l;
      } else if (e.content.match(/^\s*\\item\[[^\[\]]*\]\s*/)) {
        const p = "li", l = e.content.replace(/^\s*\\item\[[^\[\]]*\]\s*/, "");
        e.tag = p, e.content = l;
      } else if (e.content.match(/^\s*(\-|\*)+\s/)) {
        const p = "li", l = e.content.replace(/^\s*(\-|\*)+\s*/, "");
        e.tag = p, e.content = l, e._parenttag = "ul";
      } else if (e.content.match(/^\s*\++\s/)) {
        const p = "li", l = e.content.replace(/^\s*\++\s*/, "");
        e.tag = p, e.content = l, e._parenttag = "ol";
      } else if (e.content.match(/^\s*\(*[0-9]+\.*\)*\s/)) {
        const p = "li", l = e.content.replace(/^\s*\(*[0-9]+\.*\)*\s*/, "");
        e.tag = p, e.content = l, e._parenttag = "ol";
      }
    } else if (t == "xmlattributes" && typeof e.content == "string") {
      var h = new RegExp("^\\s*(" + te.join("|") + ")[^<>+]*>", "s");
      if (h.test(e.content) || e.content.match(/^\s*[^\n<>+%\`]*>/))
        if (e.content.match(/^\s*>/))
          e.content = e.content.replace(/^\s*>/, "");
        else {
          let p = e.content.split(">", 1)[0];
          e.content = e.content.replace(/^\s*[^<>%]*>/s, ""), "xmlattributes" in e ? e.xmlattributes += p : e.xmlattributes = p;
        }
    } else if (t == "attributes" && typeof e.content == "string") {
      const p = e.content.split(/(\n\s*\n{1,})/);
      if (p.length > 1) {
        let l = "";
        var h = new RegExp("^(" + te.join("|") + ")");
        p.forEach((c) => {
          let y = c.trim();
          if (h.test(y)) {
            let f = y.split(":", 1)[0], v = y.split(":", 2)[1].trim();
            e[f] = v;
          } else
            l += c;
        }), e.content = l;
      }
    } else if (t == "title" && !De.includes(e.tag) && typeof e.content == "string") {
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
        p = U(p), e.id = p, e.content = e.content.replace(/^\s*(\\*)label{([^{}]*)}\s*/, "");
      }
    } else if (t == "images" && typeof e.content == "string")
      e.content.match(/\\includegraphics/) && (e.content = e.content.replace(
        /\\includegraphics\[[^\[\]]*\]\s*{\s*([^{}]*)\s*}/,
        '<image source="$1" width="50%"/>'
      ), e.content = e.content.replace(
        /\\includegraphics\s*{\s*([^{}]*)\s*}/,
        '<image source="$1" width="50%"/>'
      )), e.content.match(/\\caption/) && (e.content = e.content.replace(/\\(caption)\s*({.*)/sg, function(p, l, m) {
        let c = J(m), y = c[0].slice(1, -1).trim();
        return y = y.replace(/\\(text)*(rm|sf|it|bf|sl)*\s*/, ""), "<" + l + ">" + y + "</" + l + `>
` + c[1];
      }));
    else if (t == "statements" && i.includes(o)) {
      let p = [], l = {};
      if (typeof e.content == "string")
        p = [{ tag: "text", content: e.content }], l = { tag: "statement", content: p }, e.content = [l];
      else {
        let m = !1;
        if (e.content.forEach((c) => {
          c.tag == "statement" && (m = !0);
        }), !m) {
          let c = "", y = 0;
          for (y = 0; y < e.content.length && (c = e.content[y], !se.includes(c.tag)); ++y)
            p.push(c);
          l = { tag: "statement", content: p };
          let f = e.content.slice(y);
          f.unshift(l), e.content = f;
        }
      }
    } else if (t == "prefigure" && i.includes(e.tag)) {
      !("xmlns" in e) && !("xmlattributes" in e && e.xmlattributes.includes("xmlns")) && (e.xmlns = "https://prefigure.org");
      let p = [], l = {};
      if (typeof e.content == "string") {
        const m = e.content;
        if (p = m, l = { tag: "diagram", content: p }, "dimensions" in e && (l.dimensions = e.dimensions, delete e.dimensions), "margins" in e && (l.margins = e.margins, delete e.margins), e.content = [l], "bbox" in e) {
          let c = { tag: "coordinates", bbox: e.bbox, content: m };
          delete e.bbox, l.content = [c];
        }
      }
      if (s != "image") {
        let m = { ...e };
        m.content = [...e.content], e = { tag: "image", content: [m] }, "width" in m && (e.width = m.width, delete m.width);
      }
    } else if (t == "sage" && i.includes(e.tag)) {
      let p = e.content.trim(), l = "";
      if (p.match(/\s*{/)) {
        let m = J(p);
        l = m[0].slice(1, -1), p = m[1];
      }
      l && (e.language = l), e.content = `<input>
` + Ue(p) + `
</input>`;
    } else if (t == "blockquotes" && i.includes(e.tag) && typeof e.content == "string") {
      if (e.content.match(/^\s*\+\+\+sTaRTbQ>/)) {
        let p = e.content.replace(/^\s*\+\+\+sTaRTbQ>/, "");
        p = p.replace(/\n\s*>/g, `
`);
        let l = p.split(/\n\s*\n{1,}/), m = [];
        l.forEach((c, y) => {
          m.push({ tag: "p", content: c });
        }), e.content = m, e.tag = "blockquote";
      }
    } else if (t == "substructure" && i.includes(e.tag) && typeof e.content == "string") {
      const p = K[e.tag], l = Ae(p), m = xe(e.content, l);
      e.content = [...m];
    } else if (t == "clean up substructure" && i.includes(e.tag) && Array.isArray(e.content)) {
      const p = e.tag;
      let l = [];
      e.content.forEach((m) => {
        K[p].includes(m.tag) ? l.push(m) : te.includes(m.tag) ? e[m.tag] = m.content : m.tag == "text" && m.content.match(/^\s*$/) && "attributes" in m ? "attributes" in e ? e.attributes += m.attributes : e.attributes = m.attributes : m.tag == "text" && m.content.match(/^\s*$/) || (console.log("problem content", m), X("problem content: see console.log"));
      }), e.content = [...l];
    } else if (t == "extraneous math" && i.includes(e.tag) && typeof e.content == "string")
      e.content = e.content.replace(/^\s*\+\+\+saMePaR/, "");
    else if (t == "gather li" && i.includes(e.tag) && typeof e.content == "object") {
      let p = [], l = "", m = 0, c = !1, y = [], f = {};
      for (m = 0; m < e.content.length; ++m)
        l = e.content[m], !c && l.tag != "li" ? p.push(l) : !c && l.tag == "li" ? (c = !0, y = [l], f.tag = l._parenttag) : c && l.tag == "li" ? y.push(l) : c && l.tag != "li" && (f.content = [...y], p.push({ ...f }), c = !1, f = {}, y = [], p.push(l));
      c && (f.content = y, p.push({ ...f })), c = !1, y = [], f = {}, e.content = p;
    } else if (t == "split li" && i.includes(e.tag) && typeof e.content == "object")
      e = Gt(e);
    else if (t == "absorb math" && (i.includes(e.tag) || e.tag == a) && typeof e.content == "object") {
      let p = [], l = "", m = 0;
      for (m = 0; m < e.content.length; ++m) {
        l = e.content[m];
        const c = p.length;
        le.includes(l.tag) ? c == 0 ? p.push({ ...l }) : p[c - 1].tag != "p" ? p.push({ ...l }) : typeof p[c - 1].content == "string" ? (p[c - 1].content = [{ tag: "text", content: p[c - 1].content }], p[c - 1].content.push({ ...l })) : p[c - 1].content.push({ ...l }) : l.tag == "p" ? typeof l.content == "string" && l.content.match(/\s*\+\+\+saMePaR/) ? (l.content = l.content.replace(/\s*\+\+\+saMePaR\s*/, ""), p[c - 1].content.push({ tag: "text", content: l.content })) : typeof l.content == "string" ? p.push({ ...l }) : l.content.length > 0 && l.content[0].tag == "text" && typeof l.content[0].content == "string" && l.content[0].content.match(/\s*\+\+\+saMePaR/) ? (l.content[0].content = l.content[0].content.replace(/\s*\+\+\+saMePaR\s*/, ""), l.content.forEach((y) => {
          p[c - 1].content.push(y);
        })) : l.content.length > 0 && p.push({ ...l }) : p.push({ ...l });
      }
      e.content = [...p];
    }
    let g = { ...e };
    return g.content = L(g.content, t, n + 1, r, i, g.tag, o), g;
  } else
    return t == "do_nothing" ? e + "X" : t == "fonts" && i.includes(o) ? rt(e) : t == "texlike" && i.includes(o) ? tt(e) : e;
  return u;
}, Ht = function(e) {
  let t = e.replace(/ +(\n|$)/g, `
`);
  t = Wt(t), t = t.replace(new RegExp("{([a-z]{3,})\\*", "d"), "$1star"), ct.forEach((s) => {
    const a = new RegExp(
      "(\\\\begin{" + s + "})(.*?)(\\\\end{" + s + "})",
      "sg"
    );
    t = t.replace(a, function(u, h, g, p) {
      if (g.match(/\\label\s*{/)) {
        const l = g.replace(/^(.*?)(\s*\\label{[^{}]*}\s*)(.*)$/s, "$2"), m = g.replace(/^(.*?)(\\label{[^{}]*}\s*)(.*)$/s, "$1$3");
        return h + l + m + p;
      } else
        return h + g + p;
    });
  });
  let r = t.replace(/([^\s])\\label({|\[|\()/g, `$1
\\label$2`).replace(/\n\s*\n\s*>/g, `

+++sTaRTbQ>`);
  r = r.replace(/\n\\\[([^\[\]]+)\\\]\n/sg, `
\\begin{equationstar}$1\\end{equationstar}
`), r = r.replace(/(\$\$|\\end{equation}|\\end{align}|\\end{equationstar}|\\end{alignstar}) *\n([^\s])/g, `$1
+++saMePaR$2`), r = r.replace(/(\/me>|\/md>|\/men>|\/mdn>) *\n *([^\n<])/g, `$1
+++saMePaR$2`), r = r.replace(/<p>\s*(<ol>|<ul>|<dl>)/g, "$1"), r = r.replace(/(<\/ol>|<\/ul>|<\/dl>)\s*<\/p>/g, "$1"), r = r.replace(/\s*?\n+\s*?\\item\s+/g, `

\\item `);
  let i = r.replace(/(<diagram)(.*?)(<\/diagram>)/sg, function(s, a, u, h) {
    const g = u.replace(/(<|<\/)definition(>)/g, "$1predefinition$2");
    return a + g + h;
  });
  const o = new RegExp("([^\\n])(\\n *(" + te.join("|") + ") *:)", "g");
  return i = i.replace(o, `$1
$2`), i;
}, Vt = function(e) {
  let t = e;
  if (t.match(/document(style|class)/)) {
    let n = t.replace(/\\begin{document}.*$/s, "");
    A.preamble = n, A.documentclass = "article";
    let r = t.replace(/^.*\\begin{document}(.*)\\end{document}.*/s, "$1"), i = r.replace(/\\maketitle.*$/s, "");
    if (A.metadata = i, i.match(/\\title\s*/)) {
      let a = i.replace(/^.*\\title\s*/s, "");
      if (a.startsWith("[")) {
        let u = a.replace(/^\[(.*?)\]\s*{(.*?)}.*$/s, "$1");
        A.shorttitle = u;
        let h = a.replace(/^\[(.*?)\]\s*{(.*?)}.*$/s, "$2");
        A.title = h;
      } else if (a.startsWith("{")) {
        let u = a.replace(/^{(.*?)}.*$/s, "$1");
        A.title = u;
      } else
        X("had trouble extracting title");
    } else
      X("Did not find title");
    let o = r.replace(/^.*\\maketitle/s, "");
    const s = o.split("\\begin{thebibliography}");
    return s.length == 2 && (o = s[0], A.biblio = s[1]), o;
  }
  return e;
}, Qt = function(e) {
  let t = e;
  return t = t.replace(/(^|\n)# +([A-Z][^\n]*)\n/g, "$1\\section{$2}"), t = t.replace(/(^|\n)## +([A-Z].*)\n/g, "$1\\subsection{$2}"), t = t.replace(/(^|\n)### +([A-Z].*)\n/g, "$1\\paragraphs{$2}"), t = t.replace(/^ *-{2,} *\n/, `
`), t = t.replace(/\n *\n *-{2,} *\n *\n/g, `

`), t = t.replace(/\n *\n *\!\[\]\(([^()]+)\){([^{}]+)} *\n *\n/g, `

\\includegraphics[$2]{$1}

`), t = t.replace(/\[([^\[\]]*)\]\((http[^()]+)\)/g, "\\url{$2}{$1}"), t = t.replace(/\n *\n *```/g, `

\\begin{sage}
`), t = t.replace(/\n```({r)/g, `

\\begin{sage}
$1`), t = t.replace(/``` *\n *\n/g, `\\end{sage}

`), t = Y(t, "section"), t = Y(t, "subsection"), t = Y(t, "paragraphs"), t;
}, Y = function(e, t, n = 0, r = 2) {
  if (n > r)
    return e;
  if (Array.isArray(e)) {
    let i = [...e];
    return i.forEach((o) => {
      const s = Y(o.content, t, n + 1, r);
      typeof s == "string" || (o.content = [...Y(s, t, n + 1, r)]);
    }), i;
  } else {
    let i = e;
    const o = new RegExp("\\\\(" + t + ")", "g");
    let s = i.split(o);
    if (s.length == 1)
      return s[0];
    let a = [], u = {}, h = !0, g = !1, p = "";
    return s.forEach((l, m) => {
      let c = l.trim();
      if (h) {
        if (!c)
          return;
        l != t ? m == 0 ? (u.tag = "introduction", u.content = l, a.push({ ...u }), u = {}) : X("did not find " + t + ":" + l + "X") : (u.tag = t, h = !1, g = !0);
      } else if (g && (c = l.trim(), c.startsWith("{"))) {
        let [y, f] = J(c);
        u.title = y.slice(1, -1), f.match(/^\s*\\label/) && (f = f.replace(/^\s*\\label\s*/, ""), [p, f] = J(f), p = p.slice(1, -1), p && (u.id = U(p))), u.content = f.trim(), g = !1, h = !0, a.push({ ...u }), u = {};
      }
    }), Object.keys(u).length && X("some content was not saved"), a;
  }
};
let A = {};
function Kt(e, t = "placeholder") {
  let n = Ht(e), r = Vt(n), i = Qt(r), o = { tag: t, content: i };
  "documentclass" in A && A.documentclass ? o.tag = A.documentclass : o.tag = "article", "title" in A && A.title ? o.title = A.title : "shorttitle" in A && A.shorttitle && (o.title = A.shorttitle);
  let s = { ...o };
  const a = 17;
  for (let M = 0; M < a; ++M)
    k.forEach((S) => {
      s = O(s, S, 0, M), ue.forEach((T) => {
        s = L(s, T[0], 0, M, T[1]);
      });
    });
  let u = { ...s };
  u = G(u, "all", ne);
  let h = { ...u };
  h = L(h, "oneline environments", 0, 0, "all"), h = L(h, "attributes", 0, 0, "all"), ue.forEach((M) => {
    h = L(h, M[0], 0, 0, M[1]);
  }), h = G(h, "all", ne), h = L(h, "blockquotes", 0, 0, ["p"]), h = L(h, "images", 0, 0, "all");
  let g = { ...h };
  g = L(g, "extract li", 0, 0, "all"), ue.forEach((M) => {
    g = L(g, M[0], 0, 0, M[1]);
  }), g = L(g, "clean up substructure", 0, 0, pt);
  const l = L(g, "extract li", 0, 0, ["p"]);
  let m = L(l, "gather li", 0, 0, Q);
  m = L(m, "split li", 0, 0, ["ol", "ul"]);
  const c = L(m, "absorb math", 0, 0, Q, "", "", t), y = O(c, W, 0, a + 1, "all", R), f = O(y, "spacelike", 0, a + 1, "all", R), v = O(f, W, 0, a + 1, "all", R), P = O(v, W, 0, a + 1, "all", R), b = L(P, "fonts", 0, 0, R), w = L(b, "texlike", 0, 0, R);
  let x = O(w, "spacelike", 0, a + 1, "all", R);
  x = O(x, W, 0, a + 1, "all", R), x = O(x, W, 0, a + 1, "all", R);
  let Z = L(x, "statements", 0, 0, st), $ = L(Z, "prefigure", 0, 0, ["prefigure"]);
  if ($ = L($, "sage", 0, 0, ["sage"]), "biblio" in A) {
    let M = { tag: "backmatter" };
    M.content = `
<references xml:id="bibliography">
<title>Bibliography</title>
`, M.content += Yt(A.biblio), M.content += `
</references>
`, $.content.push(M);
  }
  return console.log("tmp5", $), he($);
}
function Gt(e, t = 0, n = [], r = "") {
  if (e.content.length > 1)
    return e;
  let i = e.content[0], o = e.content[0].content;
  if (o.match(/\n *(\-|\+|\*|[0-9])/)) {
    let s = o.split(/\n *(\-|\+|\*|[0-9]\.*)/);
    for (s < 3 && X("malformed list items", o), e.content[0].content = s.shift(); s.length > 0; ) {
      let a = s.shift();
      a.match(/^[0-9]/) && (a = "1");
      const u = s.shift().trim();
      if (F[a] == i._parenttag) {
        let h = { tag: "li", _parenttag: F[a], content: u };
        e.content.push(h);
      } else {
        let h = { tag: F[a], content: [] };
        for (h.content.push({ tag: "li", content: u, _parenttag: F[a] }); s.length > 0 && F[s[0]] == F[a]; ) {
          let m = s.shift();
          m.match(/^[0-9]/) && (m = "1");
          const c = s.shift();
          h.content.push({ tag: "li", content: c, _parenttag: F[m] });
        }
        let g = e.content.pop(), l = [{ tag: "p", content: g.content }];
        g.content = l, g.content.push(h), e.content.push(g);
      }
    }
  } else
    return console.log("will not be splitting:", o), e;
  return e;
}
function Yt(e) {
  let t = e.trim();
  return t = t.replace(/{[^{}]+}/, ""), t = t.replace(/\s*\\(begin|end){thebibliography}\s*/, ""), t = t.replace(/\s*\\bibitem\s*{([^{}]+)}\s*/g, `</biblio>

<biblio type="raw" xml:id="$1">`), t = t.replace(/(.*?)<\/biblio>/, ""), t += `</biblio>
`, t;
}
export {
  Kt as FlexTeXtConvert
};
