const ce = {
  begin_tag: "",
  end_tag: "",
  // not sure we need the 'export'
  before_begin: "",
  after_begin: "",
  before_end: "",
  after_end: ""
}, q = {
  // start with the quirky ones
  text: ce,
  placeholder: ce
}, F = function(e) {
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
}, Ge = function(e) {
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
}, Ye = function(e) {
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
}, Ke = function(e) {
  return {
    begin_tag: "<" + e,
    end_tag: "</" + e + ">",
    before_begin: "",
    after_begin: ">",
    before_end: "",
    after_end: ""
  };
}, ne = function(e) {
  return { left: "<" + e + ">", right: "</" + e + ">", tag: e };
}, he = function(e) {
  return { left: "<" + e + " ", right: "</" + e + ">", tag: e };
}, ge = function(e) {
  return { left: "\\begin{" + e + "}", right: "\\end{" + e + "}", tag: e };
}, $e = function(e) {
  if (!Array.isArray(e))
    return e;
  let t = [];
  return e.forEach((n) => {
    t.push(he(n)), t.push(ne(n)), t.push(ge(n));
  }), t;
}, Je = [
  // [latex_name, ptx_tag]
  // could these be handled by an alias, like we did with quote -> blockquote?
  ["equation", "men"],
  ["equationstar", "me"],
  // preprocesssor does {abcd*} -> {abcdstar}
  ["align", "mdn"],
  ["alignstar", "md"]
], B = [
  { left: "$$", right: "$$", tag: "me" }
  //          {left:"\\[", right:"\\]", tag:"me"},   // preprocessor handles these; don't work: not sure why
];
Je.forEach((e) => {
  B.push(
    { left: "\\begin{" + e[0] + "}", right: "\\end{" + e[0] + "}", tag: e[1] }
  );
});
B.push({ left: "<md>", right: "</md>", tag: "md" });
B.push({ left: "<md ", right: "</md>", tag: "md" });
B.push({ left: "<me>", right: "</me>", tag: "me" });
B.push({ left: "<me ", right: "</me>", tag: "me" });
B.push({ left: "<mdn", right: "</mdn>", tag: "mdn" });
B.push({ left: "<men", right: "</men>", tag: "men" });
const ie = ["md", "mdn", "me", "men"];
ie.forEach((e) => {
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
[...ie];
const qe = ["reading-questions", "introduction", "conclusion", "objectives", "statement", "task", "worksheet", "page"], _e = ["ol", "ul", "dl"], et = ["li"], Ae = ["aside", "historical", "biographical"], de = ["algorithm", "claim", "corollary", "fact", "identity", "lemma", "proposition", "theorem"], fe = ["assumption", "axiom", "conjecture", "heuristic", "hypothesis", "principle"], Ee = ["convention", "insight", "note", "observation", "remark", "warning"], Te = ["example", "problem", "question"], Pe = ["definition"], oe = ["exercise"], Ne = ["proof"], Se = ["activity", "exploration", "investigation", "project"], ae = ["hint", "answer", "solution"], Oe = ["case", "task"], ye = ["em", "term", "alert", "m", "q", "c", "tag"];
let je = ["section", "subsection", "worksheet", "paragraphs", "backmatter"], Xe = [
  // peer of p cildren of (sub)sections
  ...Ae,
  ...de,
  ...fe,
  // ...list_like,  (this caused an infinite recursion)
  ...Ee,
  ...Te,
  ...Pe,
  ...oe,
  ...Ne,
  ...Se,
  ...ae,
  "blockquote",
  "sidebyside",
  "li"
];
const H = [
  ...je,
  ...Xe,
  ...ae,
  ...Oe,
  ...qe,
  "enumerate",
  "itemize",
  "introduction",
  "placeholder"
], Ze = ["figure", "table", "listing", "enumerate", "itemize"], Re = ["image", "tabular", "program"], Ie = ["latex-image", "prefigure", "description", "caption", "tikzpicture"], Ce = ["figure", "table", "tabular", "enumerate", "ol", "ul", "dl"], tt = [...de, ...fe, ...oe, "task"], rt = ["p", "figure", "ol", "ul", "dl"], R = [
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
], nt = ["title", "idx", "caption"], it = ["figure", "table"], Q = {
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
  ...Q.diagram
], ot = Object.keys(Q), z = [];
let Be = [...je, ...Xe], be = [...Be, ..._e];
be.push("p");
be.push("statement");
Be.forEach((e) => {
  z.push(he(e)), z.push(ne(e)), z.push(ge(e));
});
Ce.forEach((e) => {
  z.push(he(e)), z.push(ne(e)), z.push(ge(e));
});
let ee = Array.from(z, ({ tag: e }) => e);
ee = [...new Set(ee)];
be.forEach((e) => {
  q[e] = Ge(e);
});
Ce.forEach((e) => {
  q[e] = F(e);
});
qe.forEach((e) => {
  q[e] = F(e);
});
ze.forEach((e) => {
  q[e] = F(e);
});
[...Ze, ...Re, ...Ie].forEach((e) => {
  q[e] = F(e);
});
let D = [
  { left: "\\(", right: "\\)", tag: "m" }
  //          {left:"|", right:"|", tag:"placeholder"}  // just for testing
];
ye.forEach((e) => {
  D.push(ne(e));
});
ye.forEach((e) => {
  q[e] = Ke(e);
});
nt.forEach((e) => {
  q[e] = Ye(e);
});
q.ol = {
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
q.ul = {
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
q.p = F("p");
q.li = F("li");
const at = ["cases", "align", "system", "derivation", "linearsystem"], K = [
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
let x = [];
x.push(["section"]);
x.push(["subsection"]);
x.push(["worksheet"]);
x.push(["page"]);
x.push(["paragraphs", "objectives"]);
x.push(["sidebyside"]);
x.push([...Se]);
x.push([...Te, ...oe]);
x.push(["introduction", "conclusion"]);
x.push([...de, ...fe, ...Ee, ...Pe]);
x.push(["task"]);
x.push(["statement"]);
x.push([...Ne, ...ae]);
x.push([...Oe]);
x.push([...Ae]);
x.push([...Ze]);
x.push([...Re]);
x.push([...Ie]);
x.push(["prefigure"]);
x.push(["diagram"]);
x.push(Q.diagram);
x.push([..._e]);
x.push([...et]);
x.push(["blockquote"]);
x.push(["p"]);
x.push("displaymath");
x.push(["mrow"]);
const le = [
  ["extraneous math", ie],
  ["workspace", [...oe]],
  ["margins", ["worksheet", "sidebyside"]],
  ["margin", ["worksheet", "sidebyside"]],
  ["xmlattributes", "all"],
  ["title", "all"],
  ["label", "all"]
];
let lt = {
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
const st = {
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
}, ut = [
  ["cent", "¢"],
  ["dollar", "$"],
  ["pound", "£"],
  ["euro", "€"]
], ct = [
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
], pt = ["∑", "⋃", "⋂", "⨁", "⨂", "∐", "∏", "∮", "∭", "∬", "∫", "∰", "∯", "∮"], Fe = [
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
], De = ct.slice();
for (const e of Fe)
  De.push(e[0]);
console.debug("Do I see this?");
console.debug("greedyfunctions", De);
var mt = [
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
for (const e of Fe)
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
for (const e of mt)
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
for (const e of ut)
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
function ht(e) {
  return e.replace(/\s\s+/g, " ");
}
function Ue(e) {
  return /^[0-9\.,]+$/.test(e);
}
function gt(e) {
  return /^[a-zA-Z]+$/.test(e);
}
function ke(e) {
  return /^&[a-zA-Z]+;$/.test(e);
}
function dt(e) {
  return /^[0-9\.,].*[a-zA-Z]$/.test(e);
}
function ft(e) {
  return Ue(e) || e.length == 1 || e.trim() in d && d[e.trim()].type == "symbol";
}
function N(e, t) {
  if (dt(e)) {
    let r = e.replace(/[a-zA-Z]+$/, ""), i = e.replace(/^[0-9\.,]+/, "");
    console.debug("found mixed", e, "with parts", r, ",", i), r = N(r, t), i = N(i, t);
    let o = "";
    return t == "MathML" ? o = "<mo>&InvisibleTimes;</mo>" : t == "Speech" && (o = " times "), r + o + i;
  }
  let n = e;
  return console.debug("markAtomicItem of", n, "endans", ke(e)), t == "MathML" && (Ue(e) ? n = "<mn>" + n + "</mn>" : ke(e) ? n = "<mi>" + n + "</mi>" : gt(e) ? n = n.replace(/(.)/g, "<mi>$1</mi>") : pt.includes(e) ? n = "<mo>" + n + "</mo>" : e.includes("mtext") || n != "" && (n = "<unknown>" + n + "</unknown>", console.warn("unknown type", "X" + n + "X"))), n;
}
function yt(e) {
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
class $ {
  /*
    constructor(position, value, key = null, parent = null, conversiontarget) {
  */
  constructor(t, n, r = null, i = null, o = "unknown") {
    this.position = t, this.value = n, this.outputvalue = n, this.key = r, this.parent = i, this.conversiontarget = o, this.children = [], this.pair = [], this.noPriority = !1, this.exPriority = !1;
  }
  insert(t, n = t) {
    return this.children.push(new $(this.children.length, t, n, this, this.conversiontarget)), !0;
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
      let n = this.children[0].key, r, i, o = this.children.length, m = 0;
      for (; this.children[m].value != n; )
        m++;
      if (n == " ")
        this.children.length > 1 && this.children[1].value == n ? (n == " " && (n = "\\,"), r = this.children[0].value + n + this.children[2].value, console.debug("adding Oo to", this, "because of", this.children[0]), i = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, this.key && this.key != " " && d[this.key].type != "function" && !d[this.key].wrappedarguments && d[this.key].priority > 20 && (console.debug("maybe wrapping this.key", this.key, "for", i), this.conversiontarget == "MathML" ? i = "<mrow>" + i + "</mrow>" : this.conversiontarget == "Speech" && (console.debug("AddIng quantity", this), i = "quantityS " + i + " Sendquantity"))) : (i = this.children[1].outputvalue, r = this.children[1].value);
      else if (n == "")
        console.debug("  found an empty key", this), this.children.length > 1 && this.children[1].value == n ? (i = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, r = this.children[0].value + this.children[1].value + this.children[2].value) : (i = this.children[1].outputvalue, r = this.children[1].value);
      else {
        console.debug("about to use conversiontarget", this.conversiontarget);
        try {
          console.debug("               trying to extract using key", n, "position", m, "numberOfSiblings", o, "from", this, "with rule of", m + 1 + "," + o), this.conversiontarget == "MathML" ? (r = d[n].rule[m + 1 + "," + o], i = d[n].ruleML[m + 1 + "," + o], console.debug("               attempted       MathML conversion: ", r, "newOutputValue", i)) : this.conversiontarget == "Speech" ? (r = d[n].rule[m + 1 + "," + o], i = d[n].speech[m + 1 + "," + o]) : (r = d[n].rule[m + 1 + "," + o], i = d[n].rule[m + 1 + "," + o]);
        } catch {
          r = d[n].rule[m + 1 + "," + o], i = d[n].rule[m + 1 + "," + o], console.debug("                      MathML conversion failed on", r);
        }
        if (r.includes("#comma?") && (this.key && d[this.key].type == "operator" && d[this.key].priority < 0 ? r = r.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$1") : r = r.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$2")), r.includes("#{}")) {
          let u = !0, p = this;
          for (["^^", "__"].includes(p.key) && (u = !1); p.parent && isScriptPure(p.key); )
            p = p.parent, ["^^", "__"].includes(p.key) && (u = !1);
          u ? r = r.replace("#{}", "{}") : r = r.replace("#{}", "");
        }
        for (let u = 0; u < this.children.length; u++) {
          let p = this.children[u].value, g = this.children[u].outputvalue, a = p, h = g;
          r.includes("#@" + (u + 1)) && (a.length > 1 && (a = "{" + a + "}"), r = r.replace("#@" + (u + 1), a), i = i.replace("#@" + (u + 1), h)), t.includes("caseEnvironment") ? (r = r.replace("#&", "&"), i = i.replace("#&", "&")) : (r = r.replace("#&\\text{", "\\text{ "), r = r.replace("#&", ""), i = i.replace("#&\\text{", "\\text{ "), i = i.replace("#&", "")), r = r.replace("#" + (u + 1) + "@1", p[0]), r = r.replace("#" + (u + 1) + "@-1", p.substring(1)), r = r.replace("#" + (u + 1), p), i = i.replace("#" + (u + 1) + "@1", g[0]), i = i.replace("#" + (u + 1) + "@-1", g.substring(1)), i = i.replace("#" + (u + 1), g);
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
    if (this.pair && this.pair.length > 0 && (console.debug("this.pair[0]", this.pair[0]), this.pair[0] = vt(this.pair, this.conversiontarget), this.pair[0].length > 0)) {
      console.debug("this.pair[0]", this.pair[0]);
      for (let n of this.pair)
        if (this.value = n[0] + this.value + n[1], this.conversiontarget == "MathML") {
          if (console.debug("((((adding parentheses to", this.outputvalue, "of", this), this.outputvalue.length > 18 && (this.outputvalue = "<mrow>" + this.outputvalue + "</mrow>"), !this.key || this.key == " " || !d[this.key].delimitedarguments) {
            let r = this.outputvalue;
            n[0] != "" && (r = '<mo stretchy="false">' + n[0] + "</mo>" + r), n[1] != "" && (r = r + '<mo stretchy="false">' + n[1] + "</mo>"), this.outputvalue = r;
          }
        } else this.conversiontarget == "Speech" ? ft(this.outputvalue) || (console.debug("adding quantity", this), this.outputvalue = "quantityP " + this.outputvalue + " Pendquantity") : (!this.key || this.key == " " || !d[this.key].delimitedarguments) && (this.outputvalue = n[0] + this.outputvalue + n[1]);
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
class bt {
  constructor(t, n, r, i) {
    this.root = new $(t, n, r, null, i), console.debug("       Tree 0 conversiontarget", i);
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
        return i.children.push(new $(n, r, i, conversiontarget)), !0;
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
function vt(e, t) {
  let n = e[0];
  return console.debug("adjusting brackets", n), t == "LaTeX" && (n[0] == "{" && (n[0] = ["\\{"]), n[1] == "}" && (n[1] = ["\\}"])), n[0] == "⁅" && (n = []), n[0] == "❲" && (n[0] = [""]), n[1] == "❳" && (n[1] = [""]), n;
}
function Le(e) {
  return e === void 0 ? "undefined" : e === null ? "null" : e == "" ? "es" : e.replaceAll(" ", "␣");
}
function We(e, t) {
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
      r += We(e.children[i], t + "    ");
    return r;
  }
}
function J(e, t, n) {
  console.debug("starting M2TreeConvert  conversiontarget", n);
  let r = new bt(0, e, null, n), i = "", o = r.root, m = !0, u, p = [], g = {};
  for (console.debug("continuing M2TreeConvert  conversiontarget", n, "on", e); m; ) {
    let a = o.value;
    console.debug("fullStr", "X" + a + "X");
    let h = 0, l = 0, c = 0, s, f;
    for (; a.length > c; ) {
      let y = a[c], v = !1, P = !1;
      for (let b of [['"', '"']])
        if (y == b[0]) {
          console.debug("found a quote");
          let w = Me(a, c, b[0], b[1], [[b[0]]]);
          if (w != -1) {
            let k = [a.substring(0, c), a.substring(c + 1, w), a.substring(w + 1)];
            console.debug("children are", k), o.value = "";
            let E = new $(0, "\\ \\ \\text{" + k[1] + "}\\ \\ ", "justatest", null, n);
            if (console.debug("qNode was", E, "with children", E.children), E = W(k[0], E, n), console.debug("qNode is", E, "with children", E.children), console.debug("stackedTreeNode was", u), u = U(u, E, n), console.debug("stackedTreeNode is", u, "with children", u.children), p.length > 0) {
              u.key = p[0][0].children[0].key;
              let Z = p[0][0].children.pop();
              p[0][0].insertNode(u), p[0][0].insertNode(Z), p[0][1]--, p[0][1] == 0 && p.shift(), u = void 0;
            }
            a = a.substring(w + 1), c = 0, l = 0, s = void 0, f = void 0, v = !0;
          }
        }
      if (Lt(y)) {
        console.debug("apparently found a left of pair", y);
        let b = $t(a, c);
        if (b != -1) {
          let w = [a.substring(0, c), a.substring(c + 1, b), a.substring(b + 1)];
          o.value = "";
          let k = J(w[1].trim(), t, n)[0].root;
          if (k.pair.push([y, a[b]]), k = W(w[0], k, n), console.debug("just made pNode", k), u = U(u, k, n), console.debug("just made stackedTreeNode", u), p.length > 0) {
            u.key = p[0][0].children[0].key;
            let E = p[0][0].children.pop();
            p[0][0].insertNode(u), p[0][0].insertNode(E), p[0][1]--, p[0][1] == 0 && p.shift(), u = void 0;
          }
          a = a.substring(b + 1), c = 0, l = 0, s = void 0, f = void 0, v = !0;
        }
      }
      if (y == "<" && a[c + 1] != " ") {
        console.debug("looking for an angle pair");
        let b = qt(a, c);
        if (b != -1) {
          let w = [a.substring(0, c), a.substring(c + 1, b), a.substring(b + 1)];
          o.value = "";
          let k = J(w[1].trim(), t, n)[0].root;
          if (k.pair.push(["\\langle ", "\\rangle "]), k = W(w[0], k, n), u = U(u, k, n), p.length > 0) {
            u.key = p[0][0].children[0].key;
            let E = p[0][0].children.pop();
            p[0][0].insertNode(u), p[0][0].insertNode(E), p[0][1]--, p[0][1] == 0 && p.shift(), u = void 0;
          }
          a = a.substring(b + 1), c = 0, l = 0, s = void 0, f = void 0, v = !0, console.debug("keyType", f);
        }
      }
      console.debug("OUT j", l, "on", "X" + a + "X", "woith counter", c);
      for (let b = l; b <= c; b++) {
        if (console.debug("inner j", b, "on", "X" + a + "X", "counter", c), a[c + 1] && a[c].match(/[A-Za-z␣]/g) && a[c + 1].match(/[A-Za-z␣]/g)) {
          console.debug("  contuing because building up a word on", a[c], "and", a[c + 1], "so far", a.substring(b, c + 1));
          continue;
        }
        let w = a.substring(b, c + 1), k = kt(a, w, c, u);
        if (console.debug("subStr", w, "type", k), k) {
          s = w, h = b, f = k, P = !0, console.debug("A keyType", f, "with key", "X" + s + "X", "from subStr", w);
          break;
        }
        if (w == " " && (c >= 1 || o.parent && o.parent.children.length == 2 && o.position == 1 || u) && !Mt(_t(a, c))) {
          s = w, h = b, f = "space", P = !0, console.debug("B keyType", f);
          break;
        } else
          console.debug("     maybe breaking on multiword subStr", w);
      }
      if (P)
        break;
      v || (c++, y.match(/[\s\d]/g) && (l = c));
    }
    if (console.debug("is there a" + s + "key?"), s) {
      console.debug("yes, there is there a" + s + "key"), !d[s] && s != " " && s != "" && (s = ve.getItem(s)), console.debug("and now it is" + s + "key of", f, "keyType");
      let y, v, P, b;
      switch (f) {
        case "space":
        case "operator":
        //operators
        case "relation":
          if (y = [a.substring(0, h), s, a.substring(c + 1)], f == "relation" && t.includes("&beforeFirstRelation") && !g["&beforeFirstRelation"] && (g["&beforeFirstRelation"] = !0, y[2] = "&" + y[2]), v = new $(0, y[0], s, null, n), P = new $(0, y[1], s, null, n), b = new $(0, y[2], s, null, n), u && (u = xt(v.value, u, n), v = u, v.key = s, u = void 0), f == "space" && p.length > 0) {
            o.value = y[0], b.key = p[0][0].children[0].key, p[0][0].insertNode(b), o = p[0][0].children[p[0][0].children.length - 1], p[0][1]--, p[0][1] == 0 && p.shift();
            break;
          }
          let w = !0;
          (Ve(s) || He(s)) && (f != "space" && y[0].length == 0 || a[h - 1]) && a[c + 1] && a[h - 1] != " " && a[c + 1] != " " && (w = !1);
          let k = se(s), E = !1;
          f != "space" && d[s].script && (k -= 0.1, w && (E = !0, v.exPriority = !0, P.exPriority = !0, b.exPriority = !0), w || (w = !0), Et(o, s) && (w = !1));
          let Z = 0;
          if (o.exPriority && !E && (Z += 0.2), w && (o.noPriority || k + Z < se(o.key))) {
            let O = !1;
            for (o.value = v.value, o.children = v.children, o.pair = v.pair, o.exPriority = v.exPriority, o.noPriority = v.noPriority; o.parent; ) {
              let T = o.position;
              if (o = o.parent, Z = 0, !E) {
                for (let C of o.children)
                  if (C.exPriority) {
                    Z += 0.2;
                    break;
                  }
              }
              if (!o.children[0].noPriority && k + Z >= se(o.children[0].key)) {
                let C = o.children[T], j = new $(T, null, o.children[0].key, null, n);
                j.noPriority = o.children[T].noPriority, j.exPriority = o.children[T].exPriority, o.children[T] = j, j.parent = o, j.insertNode(C), C.key = s, C.noPriority = P.noPriority, C.exPriority = P.exPriority, j.insertNode(P), j.insertNode(b), o = j.children[2], O = !0;
                break;
              }
            }
            if (!O) {
              let T = new $(0, "", null, null, n);
              r.root.key = s, T.insertNode(r.root), T.insertNode(P), T.insertNode(b), r.root = T, o = r.root.children[2];
            }
          } else
            w || (v.noPriority = !0, P.noPriority = !0, b.noPriority = !0), o.value = "", o.insertNode(v), o.insertNode(P), o.insertNode(b), o = o.children[2];
          break;
        //break case
        case "function":
          y = [a.substring(0, h), s, a.substring(c + 1)], y[2][0] == " " && (y[2] = y[2].substring(1)), v = new $(0, y[0], s, null, n), P = new $(0, y[1], s, null, n), b = new $(0, y[2], s, null, n), u && (u = W(v.value, u, n), v = u, v.key = s, u = void 0);
          let L = new $();
          if (L.conversiontarget = n, L.value = "", L.insert(s, s), b.key = s, d[s].pairedArgument) {
            let O = Me(a, h, s, d[s].pairedArgument, d[s].family);
            if (O != -1) {
              let T = [a.substring(c + 1, O), a.substring(O + 1)], C = J(T[0].trim(), t, n)[0].root, j = new $(0, T[1], s, null, n);
              L.insertNode(C), L.insertNode(j);
            } else
              L.insertNode(b);
          } else
            L.insertNode(b);
          let I = o;
          o = L.children[L.children.length - 1], v.value.length > 0 && (L = wt(v, L)), L.value = "", I.parent ? (L.key = I.parent.children[I.position].key, L.position = I.position, L.parent = I.parent, I.parent.children[I.position] = L) : r.root = L, d[s] && d[s].extraArgument && p.push([L, d[s].extraArgument]);
          break;
        case "postfix":
        // such as "!" for factorial.
        case "symbol":
        //symbols
        case "letter":
          y = [a.substring(0, h), s, a.substring(c + 1)], console.debug("making a symbolNode with", y);
          let M = new $();
          if (M.conversiontarget = n, M.value = "", M.insert(s, s), M = W(y[0], M, n), u = U(u, M, n), console.debug("now have stackedTreeNode", u), p.length > 0) {
            u.key = p[0][0].children[0].key;
            let O = p[0][0].children.pop();
            p[0][0].insertNode(u), p[0][0].insertNode(O), p[0][1]--, p[0][1] == 0 && p.shift(), u = void 0;
          }
          o.value = y[2], console.debug("now have currentNode", o);
          break;
        case "multiline":
          y = [a.substring(0, h), s, a.substring(c + 1)];
          let xe = new $(0, y[0], null, null, n);
          u = U(u, xe, n), o.value = y[2], i = s, console.debug("----------- just set exParam = ", i);
          break;
        case "UNUSED":
          y = [a.substring(0, h), s, a.substring(c + 1)], o.value = y[2];
          break;
      }
    } else {
      if (u) {
        if (a.trim() != "") {
          console.debug("388 M2TreeConvert  conversiontarget", n);
          let v = new $();
          v.conversiontarget = n, u.key = "", v.insertNode(u), v.insert("", ""), v.insert(a, ""), u = v;
        }
        let y = o.position;
        u.position = y, u.key = o.key, o.parent ? (u.parent = o.parent, o.parent.children[y] = u) : r.root = u;
      }
      m = !1;
      break;
    }
  }
  return r.addParents(), console.debug("continuing", r.root.children[0], r.root.children[1]), r.combineSubSup(), console.debug("combineSubSup returned", r, "aa", r.root, "bb", r.root.children), r.adjustImpliedMultiplication(), console.debug("adjustImpliedMultiplication returned", r, "aa", r.root, "bb", r.root.children), console.debug(We(r.root, "")), [r, i, g];
}
function U(e, t, n) {
  if (e) {
    console.debug("stackNode M2TreeConvert  stackedTreeNode.conversiontarget", e.conversiontarget);
    let r = new $();
    r.conversiontarget = n, e.key = "", r.insertNode(e), r.insert("", ""), t.key = "", r.insertNode(t), e = r;
  } else
    e = t;
  return e;
}
function W(e, t, n) {
  if (e.trim() != "") {
    console.debug("combinePrev M2TreeConvert  ", e, "xx", t, "cc", n);
    let r = new $();
    r.conversiontarget = n, t.key = "", r.insert(e, ""), r.insert("", ""), r.insertNode(t), t = r, console.debug(" combinePrev pNode.conversiontarget", t);
  }
  return t;
}
function wt(e, t) {
  return console.debug("combinePrevNode preNode.conversiontarget", e.conversiontarget), e.insert("", ""), e.insertNode(t), e;
}
function xt(e, t, n) {
  if (e.trim() != "") {
    console.debug("combineAfter M2TreeConvert  conversiontarget", n);
    let r = new $();
    r.conversiontarget = n, t.key = "", r.insertNode(t), r.insert("", ""), r.insert(e, ""), t = r;
  }
  return t;
}
function kt(e, t, n, r) {
  let i = Y(t);
  if (i && !At(e, t, n))
    return i.mustHaveLeftArgument && n == 0 && !r ? void 0 : i.type;
}
function Y(e) {
  return d[e] ? d[e] : (e = ve.getItem(e), e == -1 ? void 0 : d[e]);
}
function Lt(e) {
  return ["(", "[", "{", "⁅", "❲"].includes(e);
}
function He(e) {
  let t = Y(e);
  return t && t.type == "operator";
}
function Mt(e) {
  for (let t = 1; t <= e.length; t++) {
    let n = e.substring(0, t);
    if (He(n) || Ve(n))
      return !0;
  }
  return !1;
}
function Ve(e) {
  let t = Y(e);
  return t && t.type == "relation";
}
function se(e) {
  let t = Y(e);
  switch (e) {
    case " ":
    case "":
      return 19;
    default:
      return t ? t.priority : 999;
  }
}
function $t(e, t) {
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
function qt(e, t) {
  if (!["<"].includes(e[t] || [" "].includes(e[t + 1])))
    throw new Error("No" + lp + " at index " + t);
  let n = 1;
  for (let r = t + 1; r < e.length; r++)
    if (e[r] == "<" && e[r + 1] != " " && n++, e[r] == ">" && e[r - 1] != " " && --n == 0)
      return r;
  return -1;
}
function Me(e, t, n, r, i) {
  if (e.substring(t, t + n.length) != n)
    throw new Error("No " + n + " at index " + t + " of " + e);
  let o = 1;
  for (let m = t + 1; m < e.length; m++) {
    if (e.substring(m, m + r.length) == r && --o == 0)
      return m;
    for (let u of i)
      e.substring(m, m + u.length) == u && e[m - 1].match(/[\s\d]/g) && o++;
  }
  return -1;
}
function _t(e, t) {
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
function At(e, t, n) {
  for (let r = n + 1; r < e.length && !e[r].match(/[\s\d]/g); r++)
    if (t += e[r], Y(t))
      return !0;
  return !1;
}
function Et(e, t) {
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
function Tt(e, t) {
  return console.debug("combineTree2Latex", e, "params", t, "with output", e.root.outputvalue), e.root.combine(t), console.debug("AGAIN combineTree2Latex", e, "params", t, "with output", e.root.outputvalue), e.root.outputvalue;
}
function Pt(e, t, n, r) {
  e = e.replace(/(&|\\amp)/g, "🎯");
  for (let g of ve.getAllMultiLine()) {
    let a = e.indexOf(g.slice(0, -1) + "(");
    for (; a != -1; ) {
      let h = Ot(e, a + g.length - 1, "(", ")");
      if (h != -1) {
        let l = [e.substring(0, a), e.substring(a + g.length, h), e.substring(h + 1)];
        newMiddleStr = g + `
 `, d[g].emptyLineBeforeIndent ? (newMiddleStr += l[1].replaceAll(";", `

 `), newMiddleStr += `
`) : newMiddleStr += l[1].replaceAll(";", `
 `), e = l[0] + newMiddleStr + l[2], a = e.indexOf(g.slice(0, -1) + "(");
      } else
        continue;
    }
  }
  e = e.replaceAll("\\,", ""), e = e.replaceAll("\\:", ""), e = e.replaceAll("\\;", ""), e = e.replaceAll("\\!", ""), e = e.replace(/([a-zA-Z])\\/g, "$1 "), e = e.replaceAll("\\", "");
  let i = e.split(`
`), o = "", m = [], u = "";
  for (; i.length > 0; ) {
    var p = [];
    if (m[0] && d[m[0]].params && (p = d[m[0]].params), console.debug("  ++  ++  ++  ++  ++  ++  ++  ++  ++  ++ "), console.debug("top of loop  ", i), console.debug("params = ", p), i[0].trim() == "" && !p.includes("system") && !p.includes("derivation") && !p.includes("align")) {
      console.info("skipping empty string"), i.shift();
      continue;
    }
    if (p.length > 0 && p.includes("caseEnvironment")) {
      let c = i[0], s = c.split(/(if|when|unless|otherwise)/g);
      s.length != 3 ? console.error("invalid cases line", c) : (c = "casesline(" + s[0] + ")(" + s[1] + ")(" + s[2] + ")", i[0] = c), console.debug("thisLinePieces", s);
    } else if (p.length > 0 && (p.includes("system") || p.includes("derivation"))) {
      let c = i[0];
      for (; i.length > 1 && i[1].trim() != ""; )
        c += i[1], i.splice(1, 1);
      let s = c.split(/(<=|>=|:=|<|>|=|~|≈|approx|asymp).*?/);
      if (s.length > 3) {
        let f = "";
        for (; s.length >= 3; )
          f = s.pop() + f;
        s[2] = f;
      }
      s.length != 3 ? console.warn("invalid system/derivation/align line", c, "with pieces", s) : (s[0].trim() == "" ? c = "derivationline(" + s[1].trim() + ")(" + s[2].trim() + ")" : c = "systemline(" + s[0].trim() + ")(" + s[1].trim() + ")(" + s[2].trim() + ")", i[0] = c);
    } else if (p.length > 0 && p.includes("align")) {
      let c = i[0];
      for (; i.length > 1 && i[1].trim() != ""; )
        c += i[1], i.splice(1, 1);
      let s = c.split(/(🎯).*?/);
      if (s[1] == "🎯" && (s[1] = ""), s.length > 3) {
        let f = "";
        for (; s.length >= 3; )
          f = s.pop() + f;
        s[2] = f;
      } else s.length == 3 ? (c = "alignline(" + s[0].trim() + ")(" + s[1].trim() + ")(" + s[2].trim() + ")", i[0] = c) : i[0] = "";
    }
    let g = J(i[0].trim(), p, r);
    console.debug("temp");
    let a = g[0], h = g[1], l = Tt(a, p);
    p.length && p.includes("caseEnvironment") ? r == "Speech" : p.length && (p.includes("system") || p.includes("derivation") || p.includes("align")) && (p.includes("system") || p.includes("derivation") || p.includes("align"), r == "Speech"), i.length > 0 && h.length == 0 && (m.length > 0 && (!d[m[0]].absorbEmptyLine || i[0].trim().length > 0) ? d[m[0]].absorbEmptyLine && i.length > 1 && i[1].trim().length > 0 || i.length == 2 && i[1].trim().length == 0 || i.length == 1 || (d[m[0]].changeLineTurn ? l += d[m[0]].changeLineTurn + `
` : l += "") : i.length > 1 && (d[m[0]] && d[m[0]].absorbEmptyLine && i[0].trim().length == 0 || (l += `
`))), u = i[0], i.shift(), d[h] && (d[h].seperateOut && (l += n), d[h].noBeginEnd ? l += d[h].note + "{" : h == "cases:" ? l += "\\begin{" + d[h].note + `}
` : l += `
<` + d[h].note + `>
`, m.push(h)), m.length > 0 && i[0] && i[0][0] != " " && (!d[m[0]].emptyLineBeforeIndent || u.trim().length == 0) && (d[m[0]].noBeginEnd ? l += "}" : l += "AA\\end{" + d[m[0]].note + "}", d[m[0]].lineBreak && (l += `
`), d[m[0]].seperateOut && (l += t), m.shift()), o += l;
  }
  for (; m.length > 0; )
    d[m[0]].noBeginEnd ? o += "}" : p.length && p.includes("caseEnvironment") ? o += "\\end{" + d[m[0]].note + `}
` : o += "</" + d[m[0]].note + `>
`, d[m[0]].seperateOut && (o += t), m.shift();
  return ht(o);
}
class Nt {
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
let ve = new Nt();
function St(e, t) {
  e = e.replace(/(&|\\amp)/g, "🎯"), e = e.replace(/REtuRn/g, `
`);
  let n = Pt(e, "LBRACK", "RBRACK", t);
  return n = yt(n), n;
}
function Ot(e, t, n, r) {
  if (e.substring(t, t + n.length) != n)
    throw new Error("No" + n + " at index " + t);
  for (let i = t + 1; i < e.length; i++)
    switch (e.substring(i, i + r.length)) {
      case r:
        return i;
    }
  return -1;
}
const S = function(...e) {
  typeof window < "u" && window.alert ? window.alert(...e) : console.log("alert", ...e);
};
let pe = "STart";
pe = "";
const me = function(e) {
  if (typeof e == "string")
    return e;
  if (!Array.isArray(e)) {
    let r = "";
    const i = e.tag;
    let o = q[i];
    return o || (o = F(i)), r += o.before_begin + o.begin_tag + pe, "xmlattributes" in e && e.xmlattributes && (r += " " + e.xmlattributes.trim()), "id" in e && e.id && (r += ' xml:id="' + G(e.id) + '"'), Object.keys(e).forEach((p) => {
      ["tag", "content", "title", "xmlattributes", "id"].includes(p) || (r += " " + p + '="' + e.el + '"');
    }), r += o.after_begin, "title" in e && e.title && (r += `
<title>` + e.title + `</title>
`), r + me(e.content) + o.before_end + o.end_tag + o.after_end;
  }
  const t = e;
  let n = "";
  return t.forEach((r, i) => {
    let o = "";
    if (typeof r == "string") {
      r.match(/^\s*$/) || (o += "<TEXT>" + r + "</TEXT>", console.log("just added error of", r));
      return;
    }
    let m = "", u = "";
    const p = r.tag;
    let g = q[p];
    typeof g > "u" && (g = ce), u += g.before_begin + g.begin_tag + pe, "xmlattributes" in r && r.xmlattributes && (u += " " + r.xmlattributes.trim()), "id" in r && r.id && (u += ' xml:id="' + G(r.id) + '"'), Object.keys(r).forEach((f) => {
      !["tag", "content", "title", "xmlattributes", "id"].includes(f) && !f.startsWith("_") && (u += " " + f + '="' + r[f] + '"');
    }), u += g.after_begin, "title" in r && r.title && !rt.includes(p) && (m += `
<title>` + r.title + `</title>
`);
    let h = r.content, l = me(h);
    ["c", "code", "tabular"].includes(p) && (l = jt(l));
    let c = "";
    ["m", "md", "me", "mdn", "men"].includes(p) && (l.match(/^.*(\.|,|;)\s*$/s) && (l = l.replace(/\s*$/, ""), c = l.slice(-1), l = l.slice(0, -1)), l.match(/(\\|{)/) ? l = Xt(l) : (l = St(l, "LaTeX"), l = l.replace(/&/g, " \\amp "))), m = m + l;
    let s = g.before_end + g.end_tag + c + g.after_end;
    m.match(/^\s*<mdn>.*<\/mdn>\s*$/s) ? o = m : o = u + m + s, m.match(/^\s*<p>\s*<\/p>\s*$/) && (console.log("empty p"), m = ""), o = o.replace(/(\/)(me|md|men|mdn)>\s+(\.|,|;|:)/g, "$1$2>$3"), n += o;
  }), n;
}, G = function(e) {
  let t = e;
  return t = t.replace(/[^a-zA-Z0-9\-_ ]/g, "_"), t;
}, jt = function(e) {
  let t = e;
  return t = t.replace(/&/g, "&amp;"), t = t.replace(/</g, "&lt;"), t = t.replace(/>/g, "&gt;"), t;
}, Xt = function(e) {
  let t = e;
  return t = t.replace(/&/g, "\\amp "), t = t.replace(/</g, "\\lt "), t = t.replace(/>/g, "\\gt "), t;
}, Zt = function(e, t, n) {
  let r = n, i = 0;
  const o = e.length;
  for (; r < t.length; ) {
    const m = t[r];
    if (i <= 0 && t.slice(r, r + o) === e)
      return r;
    m === "\\" ? r++ : m === "{" ? i++ : m === "}" && i--, r++;
  }
  return -1;
}, te = function(e, t = 0, n = "{", r = "}") {
  let i = e.trimStart();
  if (!i)
    return console.log("empty string sent to first_bracketed_string()"), ["", ""];
  let o = "", m = "", u = "";
  if (t == 0 && i[0] != n)
    return ["", i];
  for (t == 0 ? (u = n, t = 1, i = i.substring(1)) : u = ""; t > 0 && i; )
    m = i.substring(0, 1), m == n && o != "\\" ? t += 1 : m == r && o != "\\" && (t -= 1), u += m, o == "\\" && m == "\\" ? o = `
` : o = m, i = i.substring(1);
  return t == 0 ? [u, i] : (console.log("no matching bracket %s in %s XX", n, i), ["", u.substring(1)]);
}, Rt = function(e) {
  return e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}, It = /^\\AAAAAAAbegin{/, V = function(e, t, n) {
  if (typeof e == "string")
    return Qe(e);
  if (!Array.isArray(e)) {
    let o = { ...e };
    return o.content = V(o.content, t, n), o;
  }
  let r = [], i = "";
  return e.forEach((o, m) => {
    if (n.includes(o.tag))
      i && (r.push({ tag: "p", content: i }), i = ""), H.includes(o.tag) && typeof o.content == "string" ? (o.content = we(o.content, z), o.content = V(o.content, t, n)) : H.includes(o.tag) && (o.content = V(o.content, t, n)), r.push(o);
    else if (o.tag == "text")
      o.content.split(/\n\s*\n{1,}/).forEach((p) => {
        const g = i + p;
        if (g) {
          const a = { tag: "p", content: g };
          r.push(a);
        }
        i = "";
      });
    else if (typeof o.content == "string" && H.includes(o.tag)) {
      let u = [];
      o.content.split(/\n\s*\n{1,}/).forEach((g) => {
        const a = g.trim();
        a && u.push({ tag: "p", content: a });
      }), o.content = u, r.push(o);
    } else
      r.push(o);
  }), r;
}, Qe = function(e) {
  let t = [], n = "";
  const r = e.split(/\n\s*\n{1,}/);
  return console.log("found ", r.length, " pieces, which are:", r), r.forEach((i) => {
    const o = n + i;
    if (o) {
      console.log("made this_new_text", o);
      const m = { tag: "p", content: o };
      t.push(m);
    }
    n = "";
  }), t;
}, we = function(e, t) {
  typeof e != "string" && S("expected string in splitTextAtDelimiters", e);
  var n = e;
  let r;
  const i = [], o = new RegExp(
    "(" + t.map((m) => Rt(m.left)).join("|") + ")"
  );
  for (; r = n.search(o), r !== -1; ) {
    r > 0 && (i.push({
      tag: "text",
      content: n.slice(0, r)
    }), n = n.slice(r));
    const m = t.findIndex((g) => n.startsWith(g.left));
    if (r = Zt(t[m].right, n, t[m].left.length), r === -1)
      break;
    const u = n.slice(0, r + t[m].right.length), p = It.test(u) ? u : n.slice(t[m].left.length, r);
    i.push({
      //        type: "math",
      tag: t[m].tag,
      content: p
      //       rawData,
    }), n = n.slice(r + t[m].right.length);
  }
  return n.match(/^\s*$/) || i.push({
    tag: "text",
    content: n
  }), i;
}, Ct = function(e) {
  typeof e != "string" && S("expected a string, but got:", e);
  let t = e;
  return t = t.replace(/(^|\s|~)\$([^\$\n]+)\$(\s|$|[.,!?;:\-<]|th\b|st\b|nd\b)/mg, "$1<m>$2</m>$3"), t = t.replace(/(^|\s)_([^_\n]+)_(\s|$|[.,!?;:])/mg, "$1<term>$2</term>$3"), t = t.replace(/(^|\s)\*\*([^*\n]+)\*\*(\s|$|[.,!?;:])/mg, "$1<alert>$2</alert>$3"), t = t.replace(/(^|\s)\*([^*\n]+)\*(\s|$|[.,!?;:])/mg, "$1<em>$2</em>$3"), t = t.replace(/(^|\s)``([^'"`\n]+)''(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)``([^'"`\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)`([^'"`\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)"([^"\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|\s)'([^'\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), t = t.replace(/(^|[^`a-zA-Z0-9])`([^`\n]+)`($|[^`a-zA-A0-9])/mg, "$1<c>$2</c>$3"), t;
}, ue = function(e, t, n) {
  return st[t + n];
}, zt = function(e) {
  typeof e != "string" && S("expected a string, but got:", e);
  let t = e;
  t = t.replace(/<!--.*?-->/g, "");
  for (let [n, r] of Object.entries(lt)) {
    let i = n;
    r.forEach((o) => {
      let m = o;
      t = t.replace("<" + m + ">", "<" + i + ">"), t = t.replace("<" + m + " ", "<" + i + " "), t = t.replace("</" + m + ">", "</" + i + ">"), t = t.replace("\\begin{" + m + "}", "\\begin{" + i + "}"), t = t.replace("\\end{" + m + "}", "\\end{" + i + "}"), t = t.replace("\\" + m + "{", "\\" + i + "{");
    });
  }
  return ye.forEach((n) => {
    var r = new RegExp("\\\\" + n + "{([^{}]+)}", "g");
    t = t.replace(r, "<" + n + ">$1</" + n + ">");
  }), t;
}, X = function(e, t, n, r, i = "all", o = "all", m = "") {
  let u = [];
  typeof t == "string" ? t == "displaymath" ? u = B : t == "spacelike" ? u = "spacelike" : S("unknown taglist " + t) : typeof t[0] == "string" ? u = $e(t) : u = t;
  let p = [];
  if (Array.isArray(e))
    return e.forEach((g, a) => {
      if (n > r && g.tag != "text")
        p.push(g);
      else {
        let h;
        i == "all" || i.includes(g.tag) ? h = X(g, t, n + 1, r, i, o, g.tag) : h = g, Array.isArray(h) ? h.forEach((l) => {
          p.push(l);
        }) : p.push(h);
      }
    }), p;
  if (typeof e == "string") {
    if (n > r + 2)
      return e;
    if (u === "spacelike")
      return o == "all" || o.includes(m) ? Ct(e) : e;
    let g = e;
    return u === "makeparagraphs" ? (o == "all" || o.includes(m)) && (g = Qe(g)) : (o == "all" || o.includes(m)) && (g = we(g, u)), g;
  } else {
    typeof e != "object" && S("wrong category for ", e);
    let g = { ...e };
    if (n > r && g.tag != "text")
      return g;
    let a = g.content;
    return (i == "all" || o.includes(g.tag)) && (a = X(a, t, n + 1, r, i, o, g.tag)), g.tag == "text" && typeof a == "string" ? g.content = a : g.tag != "text" ? a.length == 1 && a[0].tag == "text" ? g.content = a[0].content : g.content = a : g = a, g;
  }
}, _ = function(e, t, n = 0, r = 0, i = "all", o = "", m = "", u = "section") {
  let p = [];
  if (Array.isArray(e))
    e.forEach((a, h) => {
      let l;
      typeof a == "object" ? l = _({ ...a }, t, n + 1, r, i, a.tag, o) : l = _(a, t, n + 1, r, i, o, m), p.push(l);
    });
  else if (typeof e == "object") {
    if (t == "oneline environments" && e.tag == "p" && typeof e.content == "string") {
      if (e.content.match(/^\s*([A-Za-z]+):/)) {
        let l = e.content.split(":", 1)[0].toLowerCase();
        if (l = l.trim(), !at.includes(l)) {
          const c = e.content.replace(/^\s*[^:]*:\s*/, "");
          e.tag = l, e.content = c;
        }
      }
    } else if (t == "extract li" && e.tag == "p" && typeof e.content == "string") {
      if (e.content.match(/^\s*\\item\s/)) {
        const h = "li", l = e.content.replace(/^\s*\\item\s*/, "");
        e.tag = h, e.content = l;
      } else if (e.content.match(/^\s*\-+\s/)) {
        const h = "li", l = e.content.replace(/^\s*\-+\s*/, "");
        e.tag = h, e.content = l, e._parenttag = "ul";
      } else if (e.content.match(/^\s*\++\s/)) {
        const h = "li", l = e.content.replace(/^\s*\++\s*/, "");
        e.tag = h, e.content = l, e._parenttag = "ol";
      } else if (e.content.match(/^\s*\(*[0-9]+\.*\)*\s/)) {
        const h = "li", l = e.content.replace(/^\s*\(*[0-9]+\.*\)*\s*/, "");
        e.tag = h, e.content = l, e._parenttag = "ol";
      }
    } else if (t == "xmlattributes" && typeof e.content == "string") {
      var g = new RegExp("^\\s*(" + K.join("|") + ")[^<>+]*>", "s");
      if (g.test(e.content) || e.content.match(/^\s*[^\n<>+]*>/))
        if (e.content.match(/^\s*>/))
          e.content = e.content.replace(/^\s*>/, "");
        else {
          let h = e.content.split(">", 1)[0];
          e.content = e.content.replace(/^\s*[^<>]*>/s, ""), "xmlattributes" in e ? e.xmlattributes += h : e.xmlattributes = h;
        }
    } else if (t == "attributes" && typeof e.content == "string") {
      const h = e.content.split(/(\n\s*\n{1,})/);
      if (h.length > 1) {
        let l = "";
        var g = new RegExp("^(" + K.join("|") + ")");
        h.forEach((s) => {
          let f = s.trim();
          if (g.test(f)) {
            let y = f.split(":", 1)[0], v = f.split(":", 2)[1].trim();
            e[y] = v;
          } else
            l += s;
        }), e.content = l;
      }
    } else if (t == "title" && !ze.includes(e.tag) && typeof e.content == "string") {
      if (e.content.match(/^\s*\[/) || e.content.match(/^\s*<title>/))
        if (e.content.match(/^\s*\[/)) {
          let h = e.content.split("]", 1)[0];
          h = h.replace(/\s*\[/, ""), e.title = h, e.content = e.content.replace(/^\s*\[[^\[\]]*\]/, "");
        } else {
          let h = e.content.split("</title>", 1)[0];
          h = h.replace(/\s*<title>/, ""), e.title = h, e.content = e.content.replace(/^\s*<title>.*?<\/title>/, "");
        }
    } else if (t == "label" && typeof e.content == "string") {
      if (e.content.match(/^\s*(\\*)label{[^{}]*}/)) {
        let h = e.content.replace(/^\s*(\\*)label{([^{}]*)}.*/s, "$2");
        h = G(h), e.id = h, e.content = e.content.replace(/^\s*(\\*)label{([^{}]*)}\s*/, "");
      }
    } else if (t == "images" && typeof e.content == "string")
      e.content.match(/\\includegraphics/) && (e.content = e.content.replace(
        /\\includegraphics\[[^\[\]]*\]\s*{\s*([^{}]*)\s*}/,
        '<image source="$1" width="50%"/>'
      ), e.content = e.content.replace(
        /\\includegraphics\s*{\s*([^{}]*)\s*}/,
        '<image source="$1" width="50%"/>'
      )), e.content.match(/\\caption/) && (e.content = e.content.replace(/\\(caption)\s*({.*)/sg, function(h, l, c) {
        let s = te(c), f = s[0].slice(1, -1).trim();
        return f = f.replace(/\\(text)*(rm|sf|it|bf|sl)*\s*/, ""), "<" + l + ">" + f + "</" + l + `>
` + s[1];
      }));
    else if (t == "statements" && i.includes(o)) {
      let h = [], l = {};
      if (typeof e.content == "string")
        h = [{ tag: "text", content: e.content }], l = { tag: "statement", content: h }, e.content = [l];
      else {
        let c = !1;
        if (e.content.forEach((s) => {
          s.tag == "statement" && (c = !0);
        }), !c) {
          let s = "", f = 0;
          for (f = 0; f < e.content.length && (s = e.content[f], !ae.includes(s.tag)); ++f)
            h.push(s);
          l = { tag: "statement", content: h };
          let y = e.content.slice(f);
          y.unshift(l), e.content = y;
        }
      }
    } else if (t == "prefigure" && i.includes(e.tag)) {
      !("xmlns" in e) && !("xmlattributes" in e && e.xmlattributes.includes("xmlns")) && (e.xmlns = "https://prefigure.org");
      let h = [], l = {};
      if (typeof e.content == "string") {
        const c = e.content;
        if (h = c, l = { tag: "diagram", content: h }, "dimensions" in e && (l.dimensions = e.dimensions, delete e.dimensions), "margins" in e && (l.margins = e.margins, delete e.margins), e.content = [l], "bbox" in e) {
          let s = { tag: "coordinates", bbox: e.bbox, content: c };
          delete e.bbox, l.content = [s];
        }
      }
      if (m != "image") {
        let c = { ...e };
        c.content = [...e.content], e = { tag: "image", content: [c] }, "width" in c && (e.width = c.width, delete c.width);
      }
    } else if (t == "blockquotes" && i.includes(e.tag) && typeof e.content == "string") {
      if (e.content.match(/^\s*\+\+\+sTaRTbQ>/)) {
        let h = e.content.replace(/^\s*\+\+\+sTaRTbQ>/, "");
        h = h.replace(/\n\s*>/g, `
`);
        let l = h.split(/\n\s*\n{1,}/), c = [];
        l.forEach((s, f) => {
          c.push({ tag: "p", content: s });
        }), e.content = c, e.tag = "blockquote";
      }
    } else if (t == "substructure" && i.includes(e.tag) && typeof e.content == "string") {
      const h = Q[e.tag], l = $e(h), c = we(e.content, l);
      e.content = [...c];
    } else if (t == "clean up substructure" && i.includes(e.tag) && Array.isArray(e.content)) {
      const h = e.tag;
      let l = [];
      e.content.forEach((c) => {
        Q[h].includes(c.tag) ? l.push(c) : K.includes(c.tag) ? e[c.tag] = c.content : c.tag == "text" && c.content.match(/^\s*$/) && "attributes" in c ? "attributes" in e ? e.attributes += c.attributes : e.attributes = c.attributes : c.tag == "text" && c.content.match(/^\s*$/) || (console.log("problem content", c), S("problem content: see console.log"));
      }), e.content = [...l];
    } else if (t == "extraneous math" && i.includes(e.tag) && typeof e.content == "string")
      e.content = e.content.replace(/^\s*\+\+\+saMePaR/, "");
    else if (t == "gather li" && i.includes(e.tag) && typeof e.content == "object") {
      let h = [], l = "", c = 0, s = !1, f = [], y = {};
      for (c = 0; c < e.content.length; ++c)
        l = e.content[c], !s && l.tag != "li" ? h.push(l) : !s && l.tag == "li" ? (s = !0, f = [l], y.tag = l._parenttag) : s && l.tag == "li" ? f.push(l) : s && l.tag != "li" && (y.content = [...f], h.push({ ...y }), s = !1, y = {}, f = [], h.push(l));
      s && (y.content = f, h.push({ ...y })), s = !1, f = [], y = {}, e.content = h;
    } else if (t == "absorb math" && (i.includes(e.tag) || e.tag == u) && typeof e.content == "object") {
      let h = [], l = "", c = 0;
      for (c = 0; c < e.content.length; ++c) {
        l = e.content[c];
        const s = h.length;
        ie.includes(l.tag) ? s == 0 ? h.push({ ...l }) : h[s - 1].tag != "p" ? h.push({ ...l }) : typeof h[s - 1].content == "string" ? (h[s - 1].content = [{ tag: "text", content: h[s - 1].content }], h[s - 1].content.push({ ...l })) : h[s - 1].content.push({ ...l }) : l.tag == "p" ? typeof l.content == "string" && l.content.match(/\s*\+\+\+saMePaR/) ? (l.content = l.content.replace(/\s*\+\+\+saMePaR\s*/, ""), h[s - 1].content.push({ tag: "text", content: l.content })) : typeof l.content == "string" ? h.push({ ...l }) : l.content.length > 0 && l.content[0].tag == "text" && typeof l.content[0].content == "string" && l.content[0].content.match(/\s*\+\+\+saMePaR/) ? (l.content[0].content = l.content[0].content.replace(/\s*\+\+\+saMePaR\s*/, ""), l.content.forEach((f) => {
          h[s - 1].content.push(f);
        })) : l.content.length > 0 && h.push({ ...l }) : h.push({ ...l });
      }
      e.content = [...h];
    }
    let a = { ...e };
    return a.content = _(a.content, t, n + 1, r, i, a.tag, o), a;
  } else {
    if (typeof e != "string" && (console.log("what is it", e), S("non-object non-string: ", e)), t == "do_nothing")
      return e + "X";
    if (t == "fonts" && i.includes(o)) {
      let a = "";
      return a = e.replace(/\\('|"|\^|`|~|-|c|H|u|v) ([a-zA-Z])/mg, ue), a = e.replace(/\\('|"|\^|`|~|-)([a-zA-Z])/mg, ue), a = a.replace(/\\('|"|\^|`|~|-|c|H|u|v){([a-zA-Z])}/mg, ue), a;
    } else if (t == "texlike" && i.includes(o)) {
      let a = "";
      return a = e.replace(/([^-])\-\-([^-])/mg, "$1<mdash/>$2"), a = a.replace(/\bLaTeX\b/mg, "<latex/>"), a = a.replace(/\bTeX\b/mg, "<tex/>"), a = a.replace(/\bPreTeXt\b/mg, "<pretext/>"), a = a.replace(/([^\\])~/mg, "$1<nbsp/>"), a = a.replace(/\(\\(ref|eqref|cite){([^{}]+)}\)/g, function(h, l, c) {
        return '<xref ref="' + c.replace(/, */g, " ") + '"/>';
      }), a = a.replace(/\\(ref|eqref|cite){([^{}]+)}/g, function(h, l, c) {
        return c = c.replace(/, */g, " "), c = G(c), '<xref ref="' + c + '"/>';
      }), a = a.replace(/\\(caption){([^{}]+)}/sg, "<$1>$2</$1>"), a = a.replace(/\\(caption)\s*({.*)/sg, function(h, l, c) {
        let s = te(c);
        return console.log("caption_plus[0]", s[0]), "<" + l + ">" + s[0] + "</" + l + `>
` + c;
      }), a = a.replace(/\\(q|term|em|m|c|fn){([^{}]+)}/g, "<$1>$2</$1>"), a = a.replace(/\\(url|href){([^{}]+)}({|\[)([^{}\[\]]+)(\]|})/g, function(h, l, c, s, f) {
        return '<url href="' + c + '">' + f + "</url>";
      }), a = a.replace(/\\(url|href){([^{}]+)}([^{]|$)/g, function(h, l, c) {
        return '<url href="' + c + '"/>';
      }), a;
    } else
      return e;
  }
  return p;
}, Bt = function(e) {
  let t = e.replace(/ +(\n|$)/g, `
`);
  t = zt(t), t = t.replace(new RegExp("{([a-z]{3,})\\*", "d"), "$1star"), it.forEach((m) => {
    const u = new RegExp(
      "(\\\\begin{" + m + "})(.*?)(\\\\end{" + m + "})",
      "sg"
    );
    t = t.replace(u, function(p, g, a, h) {
      if (a.match(/\\label\s*{/)) {
        const l = a.replace(/^(.*?)(\s*\\label{[^{}]*}\s*)(.*)$/s, "$2"), c = a.replace(/^(.*?)(\\label{[^{}]*}\s*)(.*)$/s, "$1$3");
        return g + l + c + h;
      } else
        return g + a + h;
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
  let i = r.replace(/(<diagram)(.*?)(<\/diagram>)/sg, function(m, u, p, g) {
    const a = p.replace(/(<|<\/)definition(>)/g, "$1predefinition$2");
    return u + a + g;
  });
  const o = new RegExp("([^\\n])(\\n *(" + K.join("|") + ") *:)", "g");
  return i = i.replace(o, `$1
$2`), i;
}, Ft = function(e) {
  let t = e;
  if (t.match(/document(style|class)/)) {
    t = t.replace(/%.*/g, "");
    let n = t.replace(/\\begin{document}.*$/s, "");
    A.preamble = n, A.documentclass = "article";
    let r = t.replace(/^.*\\begin{document}(.*)\\end{document}.*/s, "$1"), i = r.replace(/\\maketitle.*$/s, "");
    if (A.metadata = i, i.match(/\\title\s*/)) {
      let u = i.replace(/^.*\\title\s*/s, "");
      if (u.startsWith("[")) {
        let p = u.replace(/^\[(.*?)\]\s*{(.*?)}.*$/s, "$1");
        A.shorttitle = p;
        let g = u.replace(/^\[(.*?)\]\s*{(.*?)}.*$/s, "$2");
        A.title = g;
      } else if (u.startsWith("{")) {
        let p = u.replace(/^{(.*?)}.*$/s, "$1");
        A.title = p;
      } else
        S("had trouble extracting title");
    } else
      S("Did not find title");
    let o = r.replace(/^.*\\maketitle/s, "");
    const m = o.split("\\begin{thebibliography}");
    return m.length == 2 && (o = m[0], A.biblio = m[1]), o;
  }
  return console.log("this_text", t), S("did not extract structure"), e;
}, Dt = function(e) {
  let t = e;
  return t = t.replace(/(^|\n)# +([A-Z].*)\n/, "$1\\section{$2}"), t = t.replace(/(^|\n)## +([A-Z].*)\n/, "$1\\subsection{$2}"), t = t.replace(/(^|\n)### +([A-Z].*)\n/, "$1\\paragraphs{$2}"), t = re(t, "section"), t = re(t, "subsection"), t;
}, re = function(e, t, n = 0, r = 1) {
  if (n > r)
    return e;
  if (Array.isArray(e)) {
    let i = [...e];
    return i.forEach((o) => {
      const m = re(o.content, t, n + 1, r);
      typeof m == "string" || (o.content = [...re(m, t, n + 1, r)]);
    }), i;
  } else {
    let i = e;
    const o = new RegExp("\\\\(" + t + ")", "g");
    let m = i.split(o);
    if (m.length == 1)
      return m[0];
    let u = [], p = {}, g = !0, a = !1, h = "";
    return m.forEach((l, c) => {
      let s = l.trim();
      if (g) {
        if (!s)
          return;
        l != t ? c == 0 ? (p.tag = "introduction", p.content = l, u.push({ ...p }), p = {}) : S("did not find " + t + ":" + l + "X") : (p.tag = t, g = !1, a = !0);
      } else if (a && (s = l.trim(), s.startsWith("{"))) {
        let [f, y] = te(s);
        p.title = f.slice(1, -1), y.match(/^\s*\\label/) && (y = y.replace(/^\s*\\label\s*/, ""), [h, y] = te(y), h = h.slice(1, -1), h && (p.id = G(h))), p.content = y.trim(), a = !1, g = !0, u.push({ ...p }), p = {};
      }
    }), Object.keys(p).length && S("some content was not saved"), u;
  }
};
let A = {};
function Wt(e, t = "placeholder") {
  let n = Bt(e), r = Ft(n), i = Dt(r), o = { tag: t, content: i };
  "documentclass" in A && A.documentclass && (o.tag = A.documentclass), "title" in A && A.title ? o.title = A.title : "shorttitle" in A && A.shorttitle && (o.title = A.shorttitle);
  let m = { ...o };
  const u = 17;
  for (let M = 0; M < u; ++M)
    x.forEach((O) => {
      m = X(m, O, 0, M), le.forEach((T) => {
        m = _(m, T[0], 0, M, T[1]);
      });
    });
  let p = { ...m };
  p = V(p, "all", ee);
  let g = { ...p };
  g = _(g, "oneline environments", 0, 0, "all"), g = _(g, "attributes", 0, 0, "all"), le.forEach((M) => {
    g = _(g, M[0], 0, 0, M[1]);
  }), g = V(g, "all", ee), g = _(g, "blockquotes", 0, 0, ["p"]), g = _(g, "images", 0, 0, "all");
  let a = { ...g };
  a = _(a, "extract li", 0, 0, "all"), le.forEach((M) => {
    a = _(a, M[0], 0, 0, M[1]);
  }), a = _(a, "clean up substructure", 0, 0, ot);
  const h = X(a, D, 0, u + 1, "all", R), l = X(h, "spacelike", 0, u + 1, "all", R), c = X(l, D, 0, u + 1, "all", R), s = X(c, D, 0, u + 1, "all", R), f = _(s, "fonts", 0, 0, R), y = _(f, "texlike", 0, 0, R);
  let v = X(y, "spacelike", 0, u + 1, "all", R);
  v = X(v, D, 0, u + 1, "all", R), v = X(v, D, 0, u + 1, "all", R);
  const b = _(v, "extract li", 0, 0, ["p"]), w = _(b, "gather li", 0, 0, H), k = _(w, "absorb math", 0, 0, H, "", "", t);
  let Z = _(k, "statements", 0, 0, tt), L = _(Z, "prefigure", 0, 0, ["prefigure"]);
  if ("biblio" in A) {
    let M = { tag: "backmatter" };
    M.content = `
<references xml:id="bibliography">
<title>Bibliography</title>
`, M.content += Ut(A.biblio), M.content += `
</references>
`, L.content.push(M);
  }
  return console.log("tmp5", L), me(L);
}
function Ut(e) {
  let t = e.trim();
  return t = t.replace(/{[^{}]+}/, ""), t = t.replace(/\s*\\(begin|end){thebibliography}\s*/, ""), t = t.replace(/\s*\\bibitem\s*{([^{}]+)}\s*/g, `</biblio>

<biblio type="raw" xml:id="$1">`), t = t.replace(/(.*?)<\/biblio>/, ""), t += `</biblio>
`, t;
}
export {
  Wt as FlexTeXtConvert
};
