const fe = {
  begin_tag: "",
  end_tag: "",
  // not sure we need the 'export'
  before_begin: "",
  after_begin: "",
  before_end: "",
  after_end: ""
}, L = {
  // start with the quirky ones
  text: fe,
  placeholder: fe
}, D = function(t) {
  return {
    begin_tag: "<" + t,
    end_tag: "</" + t + ">",
    before_begin: `
`,
    after_begin: `>
`,
    before_end: `
`,
    after_end: `
`
  };
}, nt = function(t) {
  return {
    begin_tag: "<" + t,
    end_tag: "</" + t + ">",
    before_begin: `
`,
    after_begin: ">",
    before_end: "",
    after_end: `
`
  };
}, it = function(t) {
  return {
    begin_tag: "<" + t + ">",
    end_tag: "</" + t + ">",
    before_begin: `
`,
    after_begin: "",
    before_end: "",
    after_end: `
`
  };
}, ot = function(t) {
  return {
    begin_tag: "<" + t,
    end_tag: "</" + t + ">",
    before_begin: "",
    after_begin: ">",
    before_end: "",
    after_end: ""
  };
}, se = function(t) {
  return { left: "<" + t + ">", right: "</" + t + ">", tag: t };
}, ye = function(t) {
  return { left: "<" + t + " ", right: "</" + t + ">", tag: t };
}, ce = function(t) {
  return { left: "\\begin{" + t + "}", right: "\\end{" + t + "}", tag: t };
}, Ee = function(t) {
  if (!Array.isArray(t))
    return t;
  let e = [];
  return t.forEach((n) => {
    e.push(ye(n)), e.push(se(n)), e.push(ce(n));
  }), e;
}, at = [
  // [latex_name, ptx_tag]
  // could these be handled by an alias, like we did with quote -> blockquote?
  ["equation", "men"],
  ["equationstar", "me"],
  // preprocesssor does {abcd*} -> {abcdstar}
  ["align", "mdn"],
  ["alignstar", "md"]
], I = [
  { left: "$$", right: "$$", tag: "me" }
  //          {left:"\\[", right:"\\]", tag:"me"},   // preprocessor handles these; don't work: not sure why
];
at.forEach((t) => {
  I.push(
    { left: "\\begin{" + t[0] + "}", right: "\\end{" + t[0] + "}", tag: t[1] }
  );
});
I.push(
  { left: "\\begin{sage}", right: "\\end{sage}", tag: "sage" }
);
I.push({ left: "<md>", right: "</md>", tag: "md" });
I.push({ left: "<md ", right: "</md>", tag: "md" });
I.push({ left: "<me>", right: "</me>", tag: "me" });
I.push({ left: "<me ", right: "</me>", tag: "me" });
I.push({ left: "<mdn", right: "</mdn>", tag: "mdn" });
I.push({ left: "<men", right: "</men>", tag: "men" });
const J = ["md", "mdn", "me", "men"];
J.forEach((t) => {
  L[t] = {
    begin_tag: `
<` + t,
    end_tag: "</" + t + ">",
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
[...J];
const Te = ["reading-questions", "introduction", "conclusion", "objectives", "statement", "task", "worksheet", "page", "abstract"], Pe = ["ol", "ul", "dl"], lt = ["li"], Se = ["aside", "historical", "biographical"], be = ["algorithm", "claim", "corollary", "fact", "identity", "lemma", "proposition", "theorem"], ve = ["assumption", "axiom", "conjecture", "heuristic", "hypothesis", "principle"], Ne = ["convention", "insight", "note", "observation", "remark", "warning"], Re = ["example", "problem", "question"], je = ["definition"], pe = ["exercise"], Oe = ["proof"], Ze = ["activity", "exploration", "investigation", "project"], ue = ["hint", "answer", "solution"], ze = ["case", "task"], we = ["em", "term", "alert", "m", "q", "c", "comment"];
let Xe = ["article", "chapter", "section", "subsection", "introduction", "worksheet", "paragraphs", "backmatter", "abstract"], Ie = [
  // peer of p cildren of (sub)sections
  ...Se,
  ...be,
  ...ve,
  // ...list_like,  (this caused an infinite recursion)
  ...Ne,
  ...Re,
  ...je,
  ...pe,
  ...Oe,
  ...Ze,
  ...ue,
  "blockquote",
  "sidebyside",
  "li"
];
const G = [
  ...Xe,
  ...Ie,
  ...ue,
  ...ze,
  ...Te,
  "enumerate",
  "itemize",
  // "ol", "ul",
  "placeholder"
], Ce = ["figure", "table", "listing", "enumerate", "itemize"], Be = ["image", "tabular", "program"], Fe = ["latex-image", "prefigure", "description", "caption", "tikzpicture"], De = ["figure", "table", "tabular", "ol", "ul", "dl"], st = [...be, ...ve, ...pe, "task"], _e = ["p", "figure", "li", "ol", "ul", "dl", "enumerate", "itemize"], z = [
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
], ct = ["title", "idx", "caption"], pt = ["figure", "table"], U = {
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
}, We = [
  "exercisegroup",
  "exercises",
  "prefigure",
  "tikzpicture",
  "sage",
  "references",
  "comment",
  "diagram",
  ...U.diagram
], ut = Object.keys(U), X = [];
let He = [...Xe, ...Ie], $e = [...He, ...Pe];
$e.push("p");
$e.push("statement");
He.forEach((t) => {
  X.push(ye(t)), X.push(se(t)), X.push(ce(t));
});
X.push(ce("sage"));
De.forEach((t) => {
  X.push(ye(t)), X.push(se(t)), X.push(ce(t));
});
let le = Array.from(X, ({ tag: t }) => t);
le = [...new Set(le)];
$e.forEach((t) => {
  L[t] = nt(t);
});
De.forEach((t) => {
  L[t] = D(t);
});
Te.forEach((t) => {
  L[t] = D(t);
});
We.forEach((t) => {
  L[t] = D(t);
});
[...Ce, ...Be, ...Fe].forEach((t) => {
  L[t] = D(t);
});
let W = [
  { left: "\\(", right: "\\)", tag: "m" }
  //          {left:"|", right:"|", tag:"placeholder"}  // just for testing
];
we.forEach((t) => {
  W.push(se(t));
});
we.forEach((t) => {
  L[t] = ot(t);
});
ct.forEach((t) => {
  L[t] = it(t);
});
L.ol = {
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
L.ul = {
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
L.enumerate = L.ol;
L.itemize = L.ul;
L.tikzpicture = {
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
L.image = {
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
L.description = {
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
L.comment = {
  begin_tag: "<--",
  end_tag: "-->",
  // should not be a special case?
  before_begin: "",
  after_begin: "",
  before_end: "",
  after_end: ""
};
L.p = D("p");
L.li = D("li");
const mt = ["cases", "align", "system", "derivation", "linearsystem"], ie = [
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
let v = [];
v.push(["pretext"]);
v.push(["article"]);
v.push(["chapter"]);
v.push(["section"]);
v.push(["subsection"]);
v.push(["abstract"]);
v.push(["worksheet"]);
v.push(["backmatter"]);
v.push(["references"]);
v.push(["page"]);
v.push(["paragraphs", "objectives"]);
v.push(["sidebyside"]);
v.push([...Ze]);
v.push([...Re, ...pe]);
v.push(["introduction", "conclusion"]);
v.push([...be, ...ve, ...Ne, ...je]);
v.push(["task"]);
v.push(["statement"]);
v.push([...Oe, ...ue]);
v.push([...ze]);
v.push([...Se]);
v.push([...Ce]);
v.push([...Be]);
v.push([...Fe]);
v.push(["prefigure"]);
v.push(["diagram"]);
v.push(U.diagram);
v.push([...Pe]);
v.push([...lt]);
v.push(["blockquote"]);
v.push(["p"]);
v.push("displaymath");
v.push(["mrow"]);
const me = [
  ["extraneous math", J],
  ["workspace", [...pe]],
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
const dt = {
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
var f = {
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
}, ft = {
  iiint: "∭",
  iint: "∬",
  int: "∫",
  oiiint: "∰",
  oiint: "∯",
  oint: "∮"
}, ht = {
  sum: "∑",
  union: "⋃",
  intersection: "⋂",
  oplus: "⨁",
  otimes: "⨂",
  coprod: "∐",
  prod: "∏"
}, yt = [
  ["cent", "¢"],
  ["dollar", "$"],
  ["pound", "£"],
  ["euro", "€"]
], bt = [
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
], vt = ["∑", "⋃", "⋂", "⨁", "⨂", "∐", "∏", "∮", "∭", "∬", "∫", "∰", "∯", "∮"], Ve = [
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
], ee = bt.slice();
for (const t of Ve)
  ee.push(t[0]);
console.debug("Do I see this?");
console.debug("greedyfunctions", ee);
var wt = [
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
for (const t of Ve)
  f[t[0]] = {
    alternative: [],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "\\" + t[0] + " #2"
    },
    speech: {
      //    "1,2": letterpair[1] + " quantityT #2 Tendquantity "
      "1,2": t[1] + " #2 "
    },
    ruleML: {
      //    "1,2": "<mi>" + letterpair[0] + "</mi><mo>&ApplyFunction;</mo><mrow>#2</mrow>"
      "1,2": "<mi>" + t[0] + "</mi><mo>&ApplyFunction;</mo>#2"
    }
  }, f["base" + t[0]] = {
    alternative: [],
    type: "function",
    priority: 15,
    rule: {
      "1,2": "\\" + t[0]
    },
    speech: {
      "1,2": t[1] + " "
    },
    ruleML: {
      "1,2": t[0]
    }
  };
for (const t of wt)
  f[t[1]] = {
    alternative: [],
    //    "type": "symbol",
    type: "letter",
    priority: -1,
    rule: {
      "1,1": "\\" + t[1]
    },
    speech: {
      "1,1": " " + t[1] + " "
    },
    ruleML: {
      "1,1": "<mi>" + t[0] + "</mi>"
    }
  };
for (const t of yt)
  f[t[0]] = {
    alternative: [],
    type: "symbol",
    priority: -1,
    rule: {
      "1,1": "\\" + t[0]
    },
    speech: {
      "1,1": " " + t[0] + " "
    },
    ruleML: {
      "1,1": "<mi>" + t[1] + "</mi>"
    }
  };
console.debug("End of dictionary.js");
function $t(t) {
  return t.replace(/\s\s+/g, " ");
}
function Qe(t) {
  return /^[0-9\.,]+$/.test(t);
}
function xt(t) {
  return /^[a-zA-Z]+$/.test(t);
}
function Le(t) {
  return /^&[a-zA-Z]+;$/.test(t);
}
function kt(t) {
  return /^[0-9\.,].*[a-zA-Z]$/.test(t);
}
function Mt(t) {
  return Qe(t) || t.length == 1 || t.trim() in f && f[t.trim()].type == "symbol";
}
function S(t, e) {
  if (kt(t)) {
    let r = t.replace(/[a-zA-Z]+$/, ""), i = t.replace(/^[0-9\.,]+/, "");
    console.debug("found mixed", t, "with parts", r, ",", i), r = S(r, e), i = S(i, e);
    let o = "";
    return e == "MathML" ? o = "<mo>&InvisibleTimes;</mo>" : e == "Speech" && (o = " times "), r + o + i;
  }
  let n = t;
  return console.debug("markAtomicItem of", n, "endans", Le(t)), e == "MathML" && (Qe(t) ? n = "<mn>" + n + "</mn>" : Le(t) ? n = "<mi>" + n + "</mi>" : xt(t) ? n = n.replace(/(.)/g, "<mi>$1</mi>") : vt.includes(t) ? n = "<mo>" + n + "</mo>" : t.includes("mtext") || n != "" && (n = "<unknown>" + n + "</unknown>", console.warn("unknown type", "X" + n + "X"))), n;
}
function _t(t) {
  let e = t;
  for (let n = 0; n <= 2; ++n)
    e = e.replace(/to the quantity([A-Z]?) +negative 1 +([A-Z]?)endquantity/g, "inverse"), e = e.replace(/to the quantity([A-Z]?) +2 +([A-Z]?)endquantity/g, "squared"), e = e.replace(/power +2 +/g, "squared "), e = e.replace(/(^| )quantity([A-Z]?) +([^ ]+) +([A-Z]?)endquantity/g, " $3 "), e = e.replace(/(^| )quantity([A-Z]?) +(negative +[^ ]+) +([A-Z]?)endquantity/g, " $3 "), e = e.replace(/<mrow ([^<>]+)><(mi|mo|mn)>([^<>]+)(<\/(mi|mo|mn)>)<\/mrow>/g, "<$2 $1>$3$4"), e = e.replace(/<mrow>(<([a-z]+)>)([^<>]+)(<\/$2>)<\/mrow>/g, "$1$3$4"), console.debug("now ans", e), e = e.replace(/<mrow>(<mi>)([^<>]+)(<\/mi>)<\/mrow>/g, "$1$2$3"), e = e.replace(/<mrow>(<mo>)([^<>]+)(<\/mo>)<\/mrow>/g, "$1$2$3"), e = e.replace(/<mrow>(<mn>)([^<>]+)(<\/mn>)<\/mrow>/g, "$1$2$3"), e = e.replace(/(<mrow[^<>]*>)<mrow>([^w]*)<\/mrow>(<\/mrow>)/g, "$1$2$3"), console.debug("removed layer", n, "to get", e);
  return e = e.replace(/quantity([A-Z]?)/g, "quantity"), e = e.replace(/([A-Z]?)endquantity([A-Z]?)/g, "endquantity"), e = e.replace(/(quantity *)quantity([^q]*)endquantity( *endquantity)/g, "$1$2$3"), e = e.replace(/(quantity *)quantity([^q]*)endquantity( *endquantity)/g, "$1$2$3"), e.endsWith("\\") && (e += " "), e;
}
function Lt(t) {
  let e = t;
  return e = qt(e), e = Et(e), console.debug("after mathpreprocessarithmetic", e), e = Tt(e), e = Pt(e), console.debug("before other", e), e = Ot(e), console.debug("after other", e), e;
}
function qt(t) {
  let e = t;
  return e = e.replace(/(\s|\$|^)"(\S[^"]+)"(\s|\$|$)/g, At), e;
}
function At(t, e, n, r, i, o) {
  return e + "quote(␣" + n.replaceAll(" ", "␣") + "␣)" + r;
}
function Et(t) {
  let e = t;
  e = e.replace(/-->/g, "longrightarrow"), e = e.replace(/->/g, "to"), e = e.replace(/<--/g, "longleftarrow"), e = e.replace(/<-/g, "from"), e = e.replace(/(\$| |\(|\^|_)[\-\−]([^ +])/g, "$1😑$2"), e = e.replace(/(^|\$|\(|\[|\{) *[\-\−]/, "$1😑"), e = e.replace(/([^ \(\)\[\]\{\}\$]*[+\-][^ \(\)\[\]\{\}\$]*[^ \)\]}\/])(\/\/)/g, "($1)//"), e = e.replace(/\/\/([^ \(\[{\/][^ \(\)\[\]\{\}\$]*[+\-][^ \(\)\[\]\{\}\$]*)/g, "//($1)"), e = e.replace(/([^ \(\)\[\]\{\}\$]*[^ \)\]}\/])(\/)/g, "❲$1❳/"), e = e.replace(/\/([^ \(\[{\/][^ \)\]\}\n\$]*)/g, "/❲$1❳"), console.debug("after mathpreprocess fractions", "A" + e + "B");
  for (const o of ee) {
    var n = "(^|[ \\(\\[\\{])" + o + " ([^ \\(\\)\\[\\]\\{\\}]+)", r = n + "($|[ \\(\\)\\[\\]\\{\\}])", i = new RegExp(r, "g");
    e = e.replace(i, "$1" + o + "⁅$2⁆$3");
  }
  return console.debug("after wrapping greedy arguments", "A" + e + "B"), e = St(e), console.debug("before operators", e), e = Nt(e), e = jt(e), console.debug("after operators", e), e = e.replace(/([0-9a-zA-Z])(\+|-|\+-|-\+)([0-9a-zA-Z])/g, "$1 $2 $3"), e = e.replace(/ \* /g, " ⭐ "), console.debug("before sub and sup grouping", e), e = e.replace(/\^([^ ❲❳\/\(\[{][^ \"❲❳\/\(\)\[\]\{\}\$]*)/, "^❲$1❳"), console.debug("after exponents once ", e), e = e.replace(/\^([^ ❲❳\/\(\[{][^ \"❲❳\/\(\)\[\]\{\}\$]*)/, "^❲$1❳"), console.debug("after exponents twice", e), e = e.replace(/_([^ ❲❳\/\(\[{\$][^ \"❲❳\/\^\(\)\[\]\{\}\$]*)/, "_❲$1❳"), e = e.replace(/_([^ ❲❳\/\(\[{\$][^ \"❲❳\/\^\(\)\[\]\{\}\$]*)/, "_❲$1❳"), console.debug("after subscript twice", e), e = Rt(e), e = e.replace(/([0-9])([a-zA-Z])/g, "$1 $2"), console.debug("after implied number letter multiplication", e), e = e.replace(/([0-9])([\(\[\{])/g, "$1 $2"), e = e.replace(/(_[\(❲][^❲❳\(\)]+)[\)❳]\(/g, "$1) ⚡ ("), e = e.replace(/([\^▲][\(❲][^❲❳\(\)]+)[\)❳]\(/g, "$1) ⚡ ("), e = e.replace(/(_[\(❲][^❲❳\(\)]+)[\)❳]\(/g, "$1) ⚡ ("), e = e.replace(/([\^▲][\(❲][^❲❳\(\)]+)[\)❳]\(/g, "$1) ⚡ ("), e = e.replace(/(_\(\([^❲❳\(\)]+)\)\)\(/g, "$1)) ⚡ ("), e = e.replace(/(\^\(\([^❲❳\(\)]+)\)\)\(/g, "$1)) ⚡ ("), e;
}
function Tt(t) {
  let e = t;
  return e = e.replace(/(\$| )\(([^,()]+)\, +([^,()]+)\)/g, "$1($2) oointerval ($3)"), e = e.replace(/(\$| )gcd\( *([^,()]+)\, *([^,()]+) *\)/g, "$1($2) innergcd ($3)"), e = e.replace(/(\$| )\( ([^,()]+)\, *([^,()]+) \)/g, "$1($2) gcd ($3)"), e = e.replace(/(\$| )\(([^ ][^,()]*)\,([^ ][^,()]*)\)/g, "$1($2) cartesianpoint ($3)"), e;
}
function Pt(t) {
  let e = t;
  return e = e.replace(/(^| )< ([^<>|]+) >/g, "$1span($2)"), console.debug("did we find span?", e), e = e.replace(/(^| )<([^<>|]+) \| ([^<>|]+)>/g, "$1($2) grouppresentation ($3)"), e = e.replace(/(^| |\(){([^{}|]+) \| ([^{}|]+)}/g, "$1($2) setbuilder ($3)"), e = e.replace(/(^| ){([^{}]+)}/g, "$1setof($2)"), e = e.replace(/(^| )<([^,<>|]+)\|([^,<>|]+)>/g, "$1($2) braket ($3)"), e = e.replace(/(^| )<([^,<>]+)\, ([^,<>]+)>/g, "$1($2) twovector ($3)"), console.debug("looking for vector", e), e = e.replace(/(^| )<([^ ,<>][^,<>]*)\, ([^<>]+)>/g, "$1vector($2, $3)"), console.debug("did we find vector?", e), e = e.replace(/(^| |\n)<([^ ][^,<>]*)\,([^ ][^<>]*)>/g, "$1($2) innerproduct ($3)"), e = e.replace(/(^| )<([^<>]+)>/g, "$1anglebrackets($2)"), e;
}
function St(t) {
  let e = t;
  return e = e.replace(/([^\^\(\[\{❲])(\'+)/g, "$1▲❲$2❳"), e = e.replace(/(lim(|inf|sup))_([\(\[\{❲])/g, "$1$3"), e = e.replace(/(lim(|inf|sup))_([^ \(\[\{❲][^ ]+)/g, "$1($3)"), e;
}
function Nt(t) {
  let e = t;
  for (let [l, s] of Object.entries(ft))
    if (e.includes(l)) {
      l = "\\\\?" + l;
      var n = `(^| |
)` + l + "\\_\\(([^()]+)\\)\\^\\(([^()]+)\\) ?(.*?)", r = n + ` d([a-z]+)( |
|$)`, i = n + ` ❲d([a-z]+)❳/❲([^❲❳]+)❳( |
|$)`;
      console.debug("regExStr", r), console.debug("regExStrWeight", i);
      var o = new RegExp(i, "g");
      e = e.replace(o, "$1wrapper(intlimsweight(" + s + ")($2)($3)($4)($5)($6))$7");
      var c = new RegExp(r, "g");
      e = e.replace(c, "$1wrapper(intlims(" + s + ")($2)($3)($4)($5))$6"), n = `(^| |
)` + l + "\\_([^ ]+?)\\^([^ ]+) (.*?)", r = n + ` d([a-z]+)( |
|$)`, i = n + ` ❲d([a-z]+)❳/❲([^❲❳]+)❳( |
|$)`, console.debug("regExStr", r), console.debug("regExStrWeight", i), o = new RegExp(i, "g"), e = e.replace(o, "$1wrapper(intlimsweight(" + s + ")($2)($3)($4)($5)($6))$7"), c = new RegExp(r, "g"), e = e.replace(c, "$1wrapper(intlims(" + s + ")($2)($3)($4)($5))$6"), n = `(^| |
)` + l + "\\_\\(\\(([^()]+?)\\)\\) (.*?)", r = n + " d([a-z]+)( |\\$)", i = n + " ❲d([a-z]+)❳/❲([^ $]+)❳( |$)", o = new RegExp(i, "g"), e = e.replace(o, "$1wrapper(intllimweight(" + s + ")(($2))($3)($4)($5))$6"), c = new RegExp(r, "g"), e = e.replace(c, "$1wrapper(intllim(" + s + ")(($2))($3)($4))$5"), n = "(^| )" + l + "\\_\\(([^()]+?)\\) (.*?)", r = n + " d([a-z]+)( |\\$)", i = n + " ❲d([a-z]+)❳/❲([^ $]+)❳( |$)", o = new RegExp(i, "g"), e = e.replace(o, "$1wrapper(intllimweight(" + s + ")($2)($3)($4)($5))$6"), c = new RegExp(r, "g"), e = e.replace(c, "$1wrapper(intllim(" + s + ")($2)($3)($4))$5"), n = `(^| |
)` + l + "\\_([^ ]+?) (.*?)", r = n + " d([a-z]+)( |\\$)", i = n + " ❲d([a-z]+)❳/❲([^ $]+)❳( |$)", o = new RegExp(i, "g"), e = e.replace(o, "$1wrapper(intllimweight(" + s + ")($2)($3)($4)($5))$6"), c = new RegExp(r, "g"), console.debug("final regExStr", r), e = e.replace(c, "$1wrapper(intllim(" + s + ")($2)($3)($4))$5");
    }
  return console.debug("did we find integral?", e), e;
}
function Rt(t) {
  let e = t;
  console.debug("looking for powers of known functions");
  for (let o of ee) {
    var n = "(^|[ \\(\\[\\{])" + ("\\\\?" + o) + "\\^❲([^❲❳]*)❳", r = n + " *([\\(\\[\\{][^\\(\\)\\[\\]\\{\\}]+[\\)\\]\\}])", i = new RegExp(r, "g");
    e = e.replace(i, "$1wrapper❲functionpower(base" + o + ")($2)$3❳"), r = n + " ([^ \\$\\(\\)\\[\\]\\{\\}]+)", i = new RegExp(r, "g"), e = e.replace(i, "$1wrapper❲functionpower(base" + o + ")($2)wrapper❲$3❳❳");
  }
  console.debug("processed powers of functions", e);
  for (let o of ee) {
    var n = "(^|[\\$ \\(\\[\\{])" + ("\\\\?" + o) + "\\_❲([^❲❳]*)❳", r = n + " *([\\(\\[\\{][^\\(\\)\\[\\]\\{\\}]+[\\)\\]\\}])", i = new RegExp(r, "g");
    e = e.replace(i, "$1wrapper❲functionsubscript(base" + o + ")($2)$3❳"), r = n + " ([^ \\$\\(\\)\\[\\]\\{\\}]+)", i = new RegExp(r, "g"), e = e.replace(i, "$1wrapper❲functionsubscript(base" + o + ")($2)wrapper❲$3❳❳");
  }
  return e;
}
function jt(t) {
  let e = t;
  for (let [i, o] of Object.entries(ht))
    if (e.includes(i)) {
      i = "\\\\?" + i;
      var n = "(^| )" + i + "\\_[\\[\\(\\{]([^ ]+)[\\]\\)\\}]\\^[\\[\\(\\{]([^ ]+)[\\]\\)\\}]", r = new RegExp(n, "g");
      e = e.replace(r, "$1opwrap(limsop(" + o + ")($2)($3))⚡");
      var n = "(^|\\$| )" + i + "\\_[\\[\\(\\{]([^ ]+)[\\]\\)\\}]\\^([^ ]+)", r = new RegExp(n, "g");
      e = e.replace(r, "$1opwrap(limsop(" + o + ")($2)($3))⚡"), n = "(\\b)" + i + "\\_([^ ]+)\\^([^ ]+)", console.debug("regExStr", n), r = new RegExp(n, "g"), e = e.replace(r, "$1opwrap(limsop(" + o + ")($2)($3))⚡"), n = "(^|\\$| )" + i + "\\_[\\[\\(\\{]([^ ]+)[\\]\\)\\}]", console.debug("regExStr", n), r = new RegExp(n, "g"), e = e.replace(r, "$1opwrap(llimop(" + o + ")($2))⚡"), n = "(^|\\$| )" + i + "\\_([^ ]+)", console.debug("regExStr for llimop", n), r = new RegExp(n, "g"), e = e.replace(r, "$1opwrap(llimop(" + o + ")($2))⚡"), n = "(^|\\$| )" + i + "( |\\$)", console.debug("regExStr", n), r = new RegExp(n, "g"), e = e.replace(r, "$1opwrap(bigop(" + o + "))$2⚡");
    }
  return e;
}
function Ot(t) {
  let e = t;
  return e = e.replace(
    /([^ \$\(\)\[\]\{\}]+):([^ ]+) to ([^ \$\(\)\[\]\{\}]+)/g,
    "fundef($1)($2)($3)"
  ), e = e.replace(
    /([^\$\|]+) cong(ruent)* ([^\$]+) mod ([^\$\{\}]+)/g,
    // note: assumes an isolated equation
    // or maybe a condition in set builder
    "congruentmod($1)($3)($4)"
  ), e = e.replace(
    /([^\$\|]+) !cong(ruent)* ([^\$]+) mod ([^\$\{\}]+)/g,
    "notcongruentmod($1)($3)($4)"
  ), e;
}
String.prototype.myHash = function() {
  var t = 0, e, n;
  if (this.length === 0) return t;
  for (e = 0; e < this.length; e++)
    n = this.charCodeAt(e), t = (t << 5) - t + n, t |= 0;
  return t;
};
class q {
  /*
    constructor(position, value, key = null, parent = null, conversiontarget) {
  */
  constructor(e, n, r = null, i = null, o = "unknown") {
    this.position = e, this.value = n, this.outputvalue = n, this.key = r, this.parent = i, this.conversiontarget = o, this.children = [], this.pair = [], this.noPriority = !1, this.exPriority = !1;
  }
  insert(e, n = e) {
    return this.children.push(new q(this.children.length, e, n, this, this.conversiontarget)), !0;
  }
  insertNode(e) {
    return e.parent = this, e.position = this.children.length, this.children.push(e), !0;
  }
  addLeafMarkup() {
    console.debug("   adding leaf markup with key, val, oval", this.key, "a,a", this.value, "b,b", this.outputvalue, "to", this), this.key == null ? this.outputvalue = S(this.value, this.conversiontarget) : this.key == " " ? this.position == 1 ? (console.info("assuming implied multiplication"), console.info("What is next to this space key? parent:", this.parent, "left sibling", this.parent.children[0], "left sibling value", this.parent.children[0].value, "right sibling", this.parent.children[2]), this.conversiontarget == "MathML" ? this.outputvalue = "<mo>&InvisibleTimes;</mo>" : this.conversiontarget == "Speech" && (this.outputvalue = " times ")) : this.outputvalue = S(this.value, this.conversiontarget) : this.key == "quote" ? this.position == 1 && (this.outputvalue = this.value) : this.key == "" ? (console.debug("item with empty key.  Is this function apply?", this), this.position == 1 ? (console.debug("What is nect to this enpty key? parent:", this.parent, "left sibling", this.parent.children[0], "right sibling", this.parent.children[2]), this.parent.children[2].pair.length > 0 && (this.conversiontarget == "MathML" ? this.outputvalue = "<mo>&ApplyFunction;</mo>" : this.conversiontarget == "Speech" && (this.outputvalue = " of "))) : this.position == 0 ? this.conversiontarget == "Speech" ? this.outputvalue = " " + S(this.value, this.conversiontarget) : this.outputvalue = S(this.value, this.conversiontarget) : this.outputvalue = S(this.value, this.conversiontarget)) : f[this.key].type == "operator" ? this.value != this.key ? this.outputvalue = S(this.value, this.conversiontarget) : this.outputvalue = S(this.value, this.conversiontarget) : this.key == "," ? (console.debug("found comma with parent", this.parent), this.position == 1 && (this.outputvalue = "COMMA")) : f[this.key].type == "symbol" ? console.debug("found a symbol") : f[this.key].type == "relation" ? (console.debug("found a relation"), this.value != this.key ? this.outputvalue = S(this.value, this.conversiontarget) : this.outputvalue = S(this.value, this.conversiontarget)) : f[this.key].type == "function" && (console.debug("found a function"), this.value != this.key ? (console.debug("marking the argument of a function", this.value, "within", this), this.outputvalue = S(this.value, this.conversiontarget)) : this.outputvalue = S(this.value, this.conversiontarget)), console.debug("   and now leaf is key, val, oval", this.key, ",", this.value, ",", this.outputvalue);
  }
  combine(e) {
    for (let n of this.children)
      n && n.combine(e);
    if (this.isLeaf) {
      try {
        console.debug("isLeaf with key", this.key, "pair", this.pair, "parent children", this.parent.children, "of length", this.parent.children.length, "what we want", this.parent.children[2].pair, "ee", this);
      } catch {
        console.debug("isLeaf with key", this.key, "pair", this.pair, "this", this);
      }
      console.debug("the root", this.treeRoot), this.value.length > 1 && (this.value = this.value.trim()), this.addLeafMarkup();
    } else {
      console.debug("not a Leaf", this.pair, this);
      let n = this.children[0].key, r, i, o = this.children.length, c = 0;
      for (; this.children[c].value != n; )
        c++;
      if (n == " ")
        this.children.length > 1 && this.children[1].value == n ? (n == " " && (n = "\\,"), r = this.children[0].value + n + this.children[2].value, console.debug("adding Oo to", this, "because of", this.children[0]), i = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, this.key && this.key != " " && f[this.key].type != "function" && !f[this.key].wrappedarguments && f[this.key].priority > 20 && (console.debug("maybe wrapping this.key", this.key, "for", i), this.conversiontarget == "MathML" ? i = "<mrow>" + i + "</mrow>" : this.conversiontarget == "Speech" && (console.debug("AddIng quantity", this), i = "quantityS " + i + " Sendquantity"))) : (i = this.children[1].outputvalue, r = this.children[1].value);
      else if (n == "")
        console.debug("  found an empty key", this), this.children.length > 1 && this.children[1].value == n ? (i = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, r = this.children[0].value + this.children[1].value + this.children[2].value) : (i = this.children[1].outputvalue, r = this.children[1].value);
      else {
        console.debug("about to use conversiontarget", this.conversiontarget);
        try {
          console.debug("               trying to extract using key", n, "position", c, "numberOfSiblings", o, "from", this, "with rule of", c + 1 + "," + o), this.conversiontarget == "MathML" ? (r = f[n].rule[c + 1 + "," + o], i = f[n].ruleML[c + 1 + "," + o], console.debug("               attempted       MathML conversion: ", r, "newOutputValue", i)) : this.conversiontarget == "Speech" ? (r = f[n].rule[c + 1 + "," + o], i = f[n].speech[c + 1 + "," + o]) : (r = f[n].rule[c + 1 + "," + o], i = f[n].rule[c + 1 + "," + o]);
        } catch {
          r = f[n].rule[c + 1 + "," + o], i = f[n].rule[c + 1 + "," + o], console.debug("                      MathML conversion failed on", r);
        }
        if (r.includes("#comma?") && (this.key && f[this.key].type == "operator" && f[this.key].priority < 0 ? r = r.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$1") : r = r.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$2")), r.includes("#{}")) {
          let l = !0, s = this;
          for (["^^", "__"].includes(s.key) && (l = !1); s.parent && isScriptPure(s.key); )
            s = s.parent, ["^^", "__"].includes(s.key) && (l = !1);
          l ? r = r.replace("#{}", "{}") : r = r.replace("#{}", "");
        }
        for (let l = 0; l < this.children.length; l++) {
          let s = this.children[l].value, d = this.children[l].outputvalue, g = s, p = d;
          r.includes("#@" + (l + 1)) && (g.length > 1 && (g = "{" + g + "}"), r = r.replace("#@" + (l + 1), g), i = i.replace("#@" + (l + 1), p)), e.includes("caseEnvironment") ? (r = r.replace("#&", "&"), i = i.replace("#&", "&")) : (r = r.replace("#&\\text{", "\\text{ "), r = r.replace("#&", ""), i = i.replace("#&\\text{", "\\text{ "), i = i.replace("#&", "")), r = r.replace("#" + (l + 1) + "@1", s[0]), r = r.replace("#" + (l + 1) + "@-1", s.substring(1)), r = r.replace("#" + (l + 1), s), i = i.replace("#" + (l + 1) + "@1", d[0]), i = i.replace("#" + (l + 1) + "@-1", d.substring(1)), i = i.replace("#" + (l + 1), d);
        }
      }
      this.value = r, this.outputvalue = i, this.children = [];
    }
    if (this.parent && f[this.key] && f[this.key].offpair) {
      let n = this.parent.children.length, r = 0;
      for (console.debug(n, "this.key", this.key, "this", this, "this.parent", this.parent); this.parent.children[r].value != this.key; )
        console.debug(r, "this.parent.children[position]", this.parent.children[r]), r++;
      console.debug("dictionary[this.key].offpair", f[this.key].offpair, "looking for", r + 1 + "," + n, "containing", this.position + 1, "in", f[this.key].offpair[r + 1 + "," + n]), f[this.key].offpair[r + 1 + "," + n] && f[this.key].offpair[r + 1 + "," + n].includes(this.position + 1) && this.pair.pop();
    }
    if (this.pair && this.pair.length > 0 && (console.debug("this.pair[0]", this.pair[0]), this.pair[0] = zt(this.pair, this.conversiontarget), this.pair[0].length > 0)) {
      console.debug("this.pair[0]", this.pair[0]);
      for (let n of this.pair)
        if (this.value = n[0] + this.value + n[1], this.conversiontarget == "MathML") {
          if (console.debug("((((adding parentheses to", this.outputvalue, "of", this), this.outputvalue.length > 18 && (this.outputvalue = "<mrow>" + this.outputvalue + "</mrow>"), !this.key || this.key == " " || !f[this.key].delimitedarguments) {
            let r = this.outputvalue;
            n[0] != "" && (r = '<mo stretchy="false">' + n[0] + "</mo>" + r), n[1] != "" && (r = r + '<mo stretchy="false">' + n[1] + "</mo>"), this.outputvalue = r;
          }
        } else this.conversiontarget == "Speech" ? Mt(this.outputvalue) || (console.debug("adding quantity", this), this.outputvalue = "quantityP " + this.outputvalue + " Pendquantity") : (!this.key || this.key == " " || !f[this.key].delimitedarguments) && (this.outputvalue = n[0] + this.outputvalue + n[1]);
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
class Zt {
  constructor(e, n, r, i) {
    this.root = new q(e, n, r, null, i), console.debug("       Tree 0 conversiontarget", i);
  }
  *preOrderTraversal(e = this.root) {
    if (yield e, e.children.length)
      for (let n of e.children)
        yield* this.preOrderTraversal(n);
  }
  *postOrderTraversal(e = this.root) {
    if (e.children.length)
      for (let n of e.children)
        yield* this.postOrderTraversal(n);
    yield e;
  }
  insert(e, n, r = n) {
    console.debug("       Tree 1 conversiontarget", this.conversiontarget);
    for (let i of this.preOrderTraversal())
      if (console.debug("trying Tree1 node", i), i.value === e)
        return i.children.push(new q(n, r, i, conversiontarget)), !0;
    return !1;
  }
  remove(e) {
    for (let n of this.preOrderTraversal()) {
      const r = n.children.filter((i) => i.value !== e);
      if (r.length !== n.children.length)
        return n.children = r, !0;
    }
    return !1;
  }
  find(e) {
    for (let n of this.preOrderTraversal())
      if (n.value === e) return n;
  }
  // refactor to combine this and the following, so the tree is only traversed once
  adjustImpliedMultiplication() {
    let e = ["lim", "quote", "dollar"], n = ["quote", "cent"];
    for (let r of this.preOrderTraversal())
      e.includes(r.value) && e.includes(r.key) && r.position == 0 && (console.debug("found a lim", r), console.debug("now looking at", r.parent, "and", r.parent.children[0], "and", r.parent.children[1]), r.parent.parent && r.parent.parent.children[1].key == " " && r.parent.parent.children[1].value == " " && (console.error("adding hello", r.parent.parent.children[1]), r.parent.parent.children[1].key = "✂️", console.error("now", r.parent.parent.children[1]))), n.includes(r.value) && n.includes(r.key) && r.position == 0 && (console.debug("found a quote", r), console.debug("now looking at parent", r.parent, "and itself", r.parent.children[0], "and parent parent", r.parent.parent), r.parent.parent && r.parent.parent.parent && r.parent.parent.parent.children[1].key == " " && r.parent.parent.parent.children[1].value == " " ? (console.error("adding goodbye", r.parent.parent.parent.children[1]), r.parent.parent.parent.children[1].key = "✂️", console.error("now", r.parent.parent.parent.children[1])) : r.parent && r.parent.parent && r.parent.parent.children[1].key == " " && r.parent.parent.children[1].value == " " && (console.error("adding goodbye", r.parent.parent.children[1]), r.parent.parent.children[1].key = "✂️", console.error("now", r.parent.parent.children[1])));
  }
  combineSubSup() {
    for (let e of this.preOrderTraversal())
      e.value === "" && e.key === "^" && e.position == 0 && (e.children.length > 1 && e.children[0].key == "_" ? (e.parent.children[2].key = "subsup", e.parent.children[2].position = 3, e.parent.children[1] = e.children[2], e.parent.children[1].key = "subsup", e.parent.children[1].position = 2, e.parent.children[1].parent = e.parent, e.parent.children.unshift(e.children[0]), e.parent.children[0].key = "subsup", e.parent.children[0].position = 0, e.parent.children[0].parent = e.parent, e.parent.children[1] = e.children[1], e.parent.children[1].key = "subsup", e.parent.children[1].value = "subsup", e.parent.children[1].position = 1, e.parent.children[1].parent = e.parent) : console.debug("no children"));
  }
  addParents() {
    for (let e of this.preOrderTraversal())
      for (const n of e.children)
        n.parent != e && (n.parent = e);
  }
  // this is not used, because it was too complicated so instead we
  // preprocess and distinguish between different types of integrals,
  // based on limits and weight
  combineInt() {
    for (let e of this.preOrderTraversal())
      e.value == "integr" && e.key == "integr" && e.position == 0 && (console.debug("found int in position", e.position, "and siblings with values and keys"), console.debug("1", e.parent.children[1].key, e.parent.children[1].value), e.parent.children[1].value == "" && e.parent.children[1].key == "integr" && e.parent.children[1].pair.length == 1 && (console.debug("maybe found an int with limits"), e.parent.children[1].children[0].key == "," && e.parent.children[1].children[0].value == "" && (console.debug("looking more promising"), (e.parent.children[1].children[1].key != "," || e.parent.children[1].children[2].key != ",") && console.debug("error with integral subsup structure"), console.debug("int structure looks good"))));
  }
  // this is not used, because instead we went with wrapper(...)
  unWrapCertainParentheses() {
    for (let e of this.preOrderTraversal())
      e.value == "" && e.pair.length == 1 && e.children.length > 0 && (console.debug("found wrapping parentheses", e.position, "and children with values and keys"), console.debug("0", e.children[0].key, e.children[0].value), (e.children[0].value == "limop" && e.children[0].key == "limop" || e.children[0].value == "intllim" && e.children[0].key == "intllim" || e.children[0].value == "intllimweight" && e.children[0].key == "intllimweight" || e.children[0].value == "intlimsweight" && e.children[0].key == "intlimsweight" || e.children[0].value == "intlims" && e.children[0].key == "intlims") && (console.debug("maybe found paraens to eliminate"), e.pair.pop()));
  }
}
function zt(t, e) {
  let n = t[0];
  return console.debug("adjusting brackets", n), e == "LaTeX" && (n[0] == "{" && (n[0] = ["\\{"]), n[1] == "}" && (n[1] = ["\\}"])), n[0] == "⁅" && (n = []), n[0] == "❲" && (n[0] = [""]), n[1] == "❳" && (n[1] = [""]), n;
}
function qe(t) {
  return t === void 0 ? "undefined" : t === null ? "null" : t == "" ? "es" : t.replaceAll(" ", "␣");
}
function Ge(t, e) {
  if (console.debug("printTree of", t), !t)
    return "";
  let n = e + "[" + qe(t.key) + "]   |" + qe(t.value) + "|";
  if (t.pair.length && (n += "    " + t.pair[0] + " " + t.pair.length), t.children.length == 0 ? n += "    leaf" : t.parent != null ? n += "       " + t.parent.children.length : n += "       nuLL", n += `
`, t.children.length == 0)
    return n;
  {
    t.children.length;
    let r = n;
    for (let i = 0; i < t.children.length; ++i)
      r += Ge(t.children[i], e + "    ");
    return r;
  }
}
function oe(t, e, n) {
  console.debug("starting M2TreeConvert  conversiontarget", n);
  let r = new Zt(0, t, null, n), i = "", o = r.root, c = !0, l, s = [], d = {};
  for (console.debug("continuing M2TreeConvert  conversiontarget", n, "on", t); c; ) {
    let g = o.value;
    console.debug("fullStr", "X" + g + "X");
    let p = 0, a = 0, m = 0, u, y;
    for (; g.length > m; ) {
      let h = g[m], w = !1, P = !1;
      for (let b of [['"', '"']])
        if (h == b[0]) {
          console.debug("found a quote");
          let $ = Ae(g, m, b[0], b[1], [[b[0]]]);
          if ($ != -1) {
            let x = [g.substring(0, m), g.substring(m + 1, $), g.substring($ + 1)];
            console.debug("children are", x), o.value = "";
            let E = new q(0, "\\ \\ \\text{" + x[1] + "}\\ \\ ", "justatest", null, n);
            if (console.debug("qNode was", E, "with children", E.children), E = Q(x[0], E, n), console.debug("qNode is", E, "with children", E.children), console.debug("stackedTreeNode was", l), l = V(l, E, n), console.debug("stackedTreeNode is", l, "with children", l.children), s.length > 0) {
              l.key = s[0][0].children[0].key;
              let Z = s[0][0].children.pop();
              s[0][0].insertNode(l), s[0][0].insertNode(Z), s[0][1]--, s[0][1] == 0 && s.shift(), l = void 0;
            }
            g = g.substring($ + 1), m = 0, a = 0, u = void 0, y = void 0, w = !0;
          }
        }
      if (Bt(h)) {
        console.debug("apparently found a left of pair", h);
        let b = Dt(g, m);
        if (b != -1) {
          let $ = [g.substring(0, m), g.substring(m + 1, b), g.substring(b + 1)];
          o.value = "";
          let x = oe($[1].trim(), e, n)[0].root;
          if (x.pair.push([h, g[b]]), x = Q($[0], x, n), console.debug("just made pNode", x), l = V(l, x, n), console.debug("just made stackedTreeNode", l), s.length > 0) {
            l.key = s[0][0].children[0].key;
            let E = s[0][0].children.pop();
            s[0][0].insertNode(l), s[0][0].insertNode(E), s[0][1]--, s[0][1] == 0 && s.shift(), l = void 0;
          }
          g = g.substring(b + 1), m = 0, a = 0, u = void 0, y = void 0, w = !0;
        }
      }
      if (h == "<" && g[m + 1] != " ") {
        console.debug("looking for an angle pair");
        let b = Wt(g, m);
        if (b != -1) {
          let $ = [g.substring(0, m), g.substring(m + 1, b), g.substring(b + 1)];
          o.value = "";
          let x = oe($[1].trim(), e, n)[0].root;
          if (x.pair.push(["\\langle ", "\\rangle "]), x = Q($[0], x, n), l = V(l, x, n), s.length > 0) {
            l.key = s[0][0].children[0].key;
            let E = s[0][0].children.pop();
            s[0][0].insertNode(l), s[0][0].insertNode(E), s[0][1]--, s[0][1] == 0 && s.shift(), l = void 0;
          }
          g = g.substring(b + 1), m = 0, a = 0, u = void 0, y = void 0, w = !0, console.debug("keyType", y);
        }
      }
      console.debug("OUT j", a, "on", "X" + g + "X", "woith counter", m);
      for (let b = a; b <= m; b++) {
        if (console.debug("inner j", b, "on", "X" + g + "X", "counter", m), g[m + 1] && g[m].match(/[A-Za-z␣]/g) && g[m + 1].match(/[A-Za-z␣]/g)) {
          console.debug("  contuing because building up a word on", g[m], "and", g[m + 1], "so far", g.substring(b, m + 1));
          continue;
        }
        let $ = g.substring(b, m + 1), x = Ct(g, $, m, l);
        if (console.debug("subStr", $, "type", x), x) {
          u = $, p = b, y = x, P = !0, console.debug("A keyType", y, "with key", "X" + u + "X", "from subStr", $);
          break;
        }
        if ($ == " " && (m >= 1 || o.parent && o.parent.children.length == 2 && o.position == 1 || l) && !Ft(Ht(g, m))) {
          u = $, p = b, y = "space", P = !0, console.debug("B keyType", y);
          break;
        } else
          console.debug("     maybe breaking on multiword subStr", $);
      }
      if (P)
        break;
      w || (m++, h.match(/[\s\d]/g) && (a = m));
    }
    if (console.debug("is there a" + u + "key?"), u) {
      console.debug("yes, there is there a" + u + "key"), !f[u] && u != " " && u != "" && (u = xe.getItem(u)), console.debug("and now it is" + u + "key of", y, "keyType");
      let h, w, P, b;
      switch (y) {
        case "space":
        case "operator":
        //operators
        case "relation":
          if (h = [g.substring(0, p), u, g.substring(m + 1)], y == "relation" && e.includes("&beforeFirstRelation") && !d["&beforeFirstRelation"] && (d["&beforeFirstRelation"] = !0, h[2] = "&" + h[2]), w = new q(0, h[0], u, null, n), P = new q(0, h[1], u, null, n), b = new q(0, h[2], u, null, n), l && (l = It(w.value, l, n), w = l, w.key = u, l = void 0), y == "space" && s.length > 0) {
            o.value = h[0], b.key = s[0][0].children[0].key, s[0][0].insertNode(b), o = s[0][0].children[s[0][0].children.length - 1], s[0][1]--, s[0][1] == 0 && s.shift();
            break;
          }
          let $ = !0;
          (Ke(u) || Ye(u)) && (y != "space" && h[0].length == 0 || g[p - 1]) && g[m + 1] && g[p - 1] != " " && g[m + 1] != " " && ($ = !1);
          let x = ge(u), E = !1;
          y != "space" && f[u].script && (x -= 0.1, $ && (E = !0, w.exPriority = !0, P.exPriority = !0, b.exPriority = !0), $ || ($ = !0), Qt(o, u) && ($ = !1));
          let Z = 0;
          if (o.exPriority && !E && (Z += 0.2), $ && (o.noPriority || x + Z < ge(o.key))) {
            let R = !1;
            for (o.value = w.value, o.children = w.children, o.pair = w.pair, o.exPriority = w.exPriority, o.noPriority = w.noPriority; o.parent; ) {
              let T = o.position;
              if (o = o.parent, Z = 0, !E) {
                for (let B of o.children)
                  if (B.exPriority) {
                    Z += 0.2;
                    break;
                  }
              }
              if (!o.children[0].noPriority && x + Z >= ge(o.children[0].key)) {
                let B = o.children[T], j = new q(T, null, o.children[0].key, null, n);
                j.noPriority = o.children[T].noPriority, j.exPriority = o.children[T].exPriority, o.children[T] = j, j.parent = o, j.insertNode(B), B.key = u, B.noPriority = P.noPriority, B.exPriority = P.exPriority, j.insertNode(P), j.insertNode(b), o = j.children[2], R = !0;
                break;
              }
            }
            if (!R) {
              let T = new q(0, "", null, null, n);
              r.root.key = u, T.insertNode(r.root), T.insertNode(P), T.insertNode(b), r.root = T, o = r.root.children[2];
            }
          } else
            $ || (w.noPriority = !0, P.noPriority = !0, b.noPriority = !0), o.value = "", o.insertNode(w), o.insertNode(P), o.insertNode(b), o = o.children[2];
          break;
        //break case
        case "function":
          h = [g.substring(0, p), u, g.substring(m + 1)], h[2][0] == " " && (h[2] = h[2].substring(1)), w = new q(0, h[0], u, null, n), P = new q(0, h[1], u, null, n), b = new q(0, h[2], u, null, n), l && (l = Q(w.value, l, n), w = l, w.key = u, l = void 0);
          let k = new q();
          if (k.conversiontarget = n, k.value = "", k.insert(u, u), b.key = u, f[u].pairedArgument) {
            let R = Ae(g, p, u, f[u].pairedArgument, f[u].family);
            if (R != -1) {
              let T = [g.substring(m + 1, R), g.substring(R + 1)], B = oe(T[0].trim(), e, n)[0].root, j = new q(0, T[1], u, null, n);
              k.insertNode(B), k.insertNode(j);
            } else
              k.insertNode(b);
          } else
            k.insertNode(b);
          let C = o;
          o = k.children[k.children.length - 1], w.value.length > 0 && (k = Xt(w, k)), k.value = "", C.parent ? (k.key = C.parent.children[C.position].key, k.position = C.position, k.parent = C.parent, C.parent.children[C.position] = k) : r.root = k, f[u] && f[u].extraArgument && s.push([k, f[u].extraArgument]);
          break;
        case "postfix":
        // such as "!" for factorial.
        case "symbol":
        //symbols
        case "letter":
          h = [g.substring(0, p), u, g.substring(m + 1)], console.debug("making a symbolNode with", h);
          let M = new q();
          if (M.conversiontarget = n, M.value = "", M.insert(u, u), M = Q(h[0], M, n), l = V(l, M, n), console.debug("now have stackedTreeNode", l), s.length > 0) {
            l.key = s[0][0].children[0].key;
            let R = s[0][0].children.pop();
            s[0][0].insertNode(l), s[0][0].insertNode(R), s[0][1]--, s[0][1] == 0 && s.shift(), l = void 0;
          }
          o.value = h[2], console.debug("now have currentNode", o);
          break;
        case "multiline":
          h = [g.substring(0, p), u, g.substring(m + 1)];
          let Me = new q(0, h[0], null, null, n);
          l = V(l, Me, n), o.value = h[2], i = u, console.debug("----------- just set exParam = ", i);
          break;
        case "UNUSED":
          h = [g.substring(0, p), u, g.substring(m + 1)], o.value = h[2];
          break;
      }
    } else {
      if (l) {
        if (g.trim() != "") {
          console.debug("388 M2TreeConvert  conversiontarget", n);
          let w = new q();
          w.conversiontarget = n, l.key = "", w.insertNode(l), w.insert("", ""), w.insert(g, ""), l = w;
        }
        let h = o.position;
        l.position = h, l.key = o.key, o.parent ? (l.parent = o.parent, o.parent.children[h] = l) : r.root = l;
      }
      c = !1;
      break;
    }
  }
  return r.addParents(), console.debug("continuing", r.root.children[0], r.root.children[1]), r.combineSubSup(), console.debug("combineSubSup returned", r, "aa", r.root, "bb", r.root.children), r.adjustImpliedMultiplication(), console.debug("adjustImpliedMultiplication returned", r, "aa", r.root, "bb", r.root.children), console.debug(Ge(r.root, "")), [r, i, d];
}
function V(t, e, n) {
  if (t) {
    console.debug("stackNode M2TreeConvert  stackedTreeNode.conversiontarget", t.conversiontarget);
    let r = new q();
    r.conversiontarget = n, t.key = "", r.insertNode(t), r.insert("", ""), e.key = "", r.insertNode(e), t = r;
  } else
    t = e;
  return t;
}
function Q(t, e, n) {
  if (t.trim() != "") {
    console.debug("combinePrev M2TreeConvert  ", t, "xx", e, "cc", n);
    let r = new q();
    r.conversiontarget = n, e.key = "", r.insert(t, ""), r.insert("", ""), r.insertNode(e), e = r, console.debug(" combinePrev pNode.conversiontarget", e);
  }
  return e;
}
function Xt(t, e) {
  return console.debug("combinePrevNode preNode.conversiontarget", t.conversiontarget), t.insert("", ""), t.insertNode(e), t;
}
function It(t, e, n) {
  if (t.trim() != "") {
    console.debug("combineAfter M2TreeConvert  conversiontarget", n);
    let r = new q();
    r.conversiontarget = n, e.key = "", r.insertNode(e), r.insert("", ""), r.insert(t, ""), e = r;
  }
  return e;
}
function Ct(t, e, n, r) {
  let i = ne(e);
  if (i && !Vt(t, e, n))
    return i.mustHaveLeftArgument && n == 0 && !r ? void 0 : i.type;
}
function ne(t) {
  return f[t] ? f[t] : (t = xe.getItem(t), t == -1 ? void 0 : f[t]);
}
function Bt(t) {
  return ["(", "[", "{", "⁅", "❲"].includes(t);
}
function Ye(t) {
  let e = ne(t);
  return e && e.type == "operator";
}
function Ft(t) {
  for (let e = 1; e <= t.length; e++) {
    let n = t.substring(0, e);
    if (Ye(n) || Ke(n))
      return !0;
  }
  return !1;
}
function Ke(t) {
  let e = ne(t);
  return e && e.type == "relation";
}
function ge(t) {
  let e = ne(t);
  switch (t) {
    case " ":
    case "":
      return 19;
    default:
      return e ? e.priority : 999;
  }
}
function Dt(t, e) {
  if (!["(", "[", "{", "⁅", "❲"].includes(t[e]))
    throw new Error("No" + lp + " at index " + e);
  let n = 1;
  for (let r = e + 1; r < t.length; r++)
    switch (t[r]) {
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
function Wt(t, e) {
  if (!["<"].includes(t[e] || [" "].includes(t[e + 1])))
    throw new Error("No" + lp + " at index " + e);
  let n = 1;
  for (let r = e + 1; r < t.length; r++)
    if (t[r] == "<" && t[r + 1] != " " && n++, t[r] == ">" && t[r - 1] != " " && --n == 0)
      return r;
  return -1;
}
function Ae(t, e, n, r, i) {
  if (t.substring(e, e + n.length) != n)
    throw new Error("No " + n + " at index " + e + " of " + t);
  let o = 1;
  for (let c = e + 1; c < t.length; c++) {
    if (t.substring(c, c + r.length) == r && --o == 0)
      return c;
    for (let l of i)
      t.substring(c, c + l.length) == l && t[c - 1].match(/[\s\d]/g) && o++;
  }
  return -1;
}
function Ht(t, e) {
  let n = "";
  for (let r = e + 1; r < t.length; r++)
    switch (t[r]) {
      case `
`:
      case " ":
        break;
      default:
        n += t[r];
    }
  return n;
}
function Vt(t, e, n) {
  for (let r = n + 1; r < t.length && !t[r].match(/[\s\d]/g); r++)
    if (e += t[r], ne(e))
      return !0;
  return !1;
}
function Qt(t, e) {
  if (console.debug("checkScriptSimilarity", t), t.pair.length > 0 || t.parent && t.parent.exPriority)
    return !1;
  let n = t;
  for (; n.parent && (n = n.parent, !(n.pair.length > 0 || t.parent && t.parent.exPriority)); )
    if (n.key == e)
      return !0;
  for (n = t.parent; n && n.children[0] && (n = n.children[0], !(n.pair.length > 0 || t.parent && t.parent.exPriority)); )
    if (n.key == e)
      return !0;
  return !1;
}
function Gt(t, e) {
  return console.debug("combineTree2Latex", t, "params", e, "with output", t.root.outputvalue), t.root.combine(e), console.debug("AGAIN combineTree2Latex", t, "params", e, "with output", t.root.outputvalue), t.root.outputvalue;
}
function Yt(t, e, n, r) {
  t = t.replace(/(&|\\amp)/g, "🎯");
  for (let d of xe.getAllMultiLine()) {
    let g = t.indexOf(d.slice(0, -1) + "(");
    for (; g != -1; ) {
      let p = Ut(t, g + d.length - 1, "(", ")");
      if (p != -1) {
        let a = [t.substring(0, g), t.substring(g + d.length, p), t.substring(p + 1)];
        newMiddleStr = d + `
 `, f[d].emptyLineBeforeIndent ? (newMiddleStr += a[1].replaceAll(";", `

 `), newMiddleStr += `
`) : newMiddleStr += a[1].replaceAll(";", `
 `), t = a[0] + newMiddleStr + a[2], g = t.indexOf(d.slice(0, -1) + "(");
      } else
        continue;
    }
  }
  t = t.replaceAll("\\,", ""), t = t.replaceAll("\\:", ""), t = t.replaceAll("\\;", ""), t = t.replaceAll("\\!", ""), t = t.replace(/([a-zA-Z])\\/g, "$1 "), t = t.replaceAll("\\", "");
  let i = t.split(`
`), o = "", c = [], l = "";
  for (; i.length > 0; ) {
    var s = [];
    if (c[0] && f[c[0]].params && (s = f[c[0]].params), console.debug("  ++  ++  ++  ++  ++  ++  ++  ++  ++  ++ "), console.debug("top of loop  ", i), console.debug("params = ", s), i[0].trim() == "" && !s.includes("system") && !s.includes("derivation") && !s.includes("align")) {
      console.info("skipping empty string"), i.shift();
      continue;
    }
    if (s.length > 0 && s.includes("caseEnvironment")) {
      let m = i[0], u = m.split(/(if|when|unless|otherwise)/g);
      u.length != 3 ? console.error("invalid cases line", m) : (m = "casesline(" + u[0] + ")(" + u[1] + ")(" + u[2] + ")", i[0] = m), console.debug("thisLinePieces", u);
    } else if (s.length > 0 && (s.includes("system") || s.includes("derivation"))) {
      let m = i[0];
      for (; i.length > 1 && i[1].trim() != ""; )
        m += i[1], i.splice(1, 1);
      let u = m.split(/(<=|>=|:=|<|>|=|~|≈|approx|asymp).*?/);
      if (u.length > 3) {
        let y = "";
        for (; u.length >= 3; )
          y = u.pop() + y;
        u[2] = y;
      }
      u.length != 3 ? console.warn("invalid system/derivation/align line", m, "with pieces", u) : (u[0].trim() == "" ? m = "derivationline(" + u[1].trim() + ")(" + u[2].trim() + ")" : m = "systemline(" + u[0].trim() + ")(" + u[1].trim() + ")(" + u[2].trim() + ")", i[0] = m);
    } else if (s.length > 0 && s.includes("align")) {
      let m = i[0];
      for (; i.length > 1 && i[1].trim() != ""; )
        m += i[1], i.splice(1, 1);
      let u = m.split(/(🎯).*?/);
      if (u[1] == "🎯" && (u[1] = ""), u.length > 3) {
        let y = "";
        for (; u.length >= 3; )
          y = u.pop() + y;
        u[2] = y;
      } else u.length == 3 ? (m = "alignline(" + u[0].trim() + ")(" + u[1].trim() + ")(" + u[2].trim() + ")", i[0] = m) : i[0] = "";
    }
    let d = oe(i[0].trim(), s, r);
    console.debug("temp");
    let g = d[0], p = d[1], a = Gt(g, s);
    s.length && s.includes("caseEnvironment") ? r == "Speech" : s.length && (s.includes("system") || s.includes("derivation") || s.includes("align")) && (s.includes("system") || s.includes("derivation") || s.includes("align"), r == "Speech"), i.length > 0 && p.length == 0 && (c.length > 0 && (!f[c[0]].absorbEmptyLine || i[0].trim().length > 0) ? f[c[0]].absorbEmptyLine && i.length > 1 && i[1].trim().length > 0 || i.length == 2 && i[1].trim().length == 0 || i.length == 1 || (f[c[0]].changeLineTurn ? a += f[c[0]].changeLineTurn + `
` : a += "") : i.length > 1 && (f[c[0]] && f[c[0]].absorbEmptyLine && i[0].trim().length == 0 || (a += `
`))), l = i[0], i.shift(), f[p] && (f[p].seperateOut && (a += n), f[p].noBeginEnd ? a += f[p].note + "{" : p == "cases:" ? a += "\\begin{" + f[p].note + `}
` : a += `
<` + f[p].note + `>
`, c.push(p)), c.length > 0 && i[0] && i[0][0] != " " && (!f[c[0]].emptyLineBeforeIndent || l.trim().length == 0) && (f[c[0]].noBeginEnd ? a += "}" : a += "AA\\end{" + f[c[0]].note + "}", f[c[0]].lineBreak && (a += `
`), f[c[0]].seperateOut && (a += e), c.shift()), o += a;
  }
  for (; c.length > 0; )
    f[c[0]].noBeginEnd ? o += "}" : s.length && s.includes("caseEnvironment") ? o += "\\end{" + f[c[0]].note + `}
` : o += "</" + f[c[0]].note + `>
`, f[c[0]].seperateOut && (o += e), c.shift();
  return $t(o);
}
class Kt {
  constructor() {
    this.cache = [], this.cacheSize = 500, this.nonCache = [], this.nonCacheSize = 500, this.multilineList = [];
  }
  getAllMultiLine() {
    if (this.multilineList.length == 0)
      for (let e of Object.keys(f))
        f[e].type == "multiline" && this.multilineList.push(e);
    return this.multilineList;
  }
  getItem(e) {
    if (e == " " || e == "")
      return -1;
    for (let n = this.cache.length - 1; n >= 0; n--)
      if (this.cache[n][0] === e)
        return this.cache[n][1];
    if (this.nonCache.includes(e))
      return -1;
    for (let n of Object.keys(f)) {
      let r = f[n].alternative;
      if (r) {
        for (let i of r)
          if (i == e)
            return this.cache.push([e, n]), this.cache.length > this.cacheSize && this.cache.shift(), n;
      }
    }
    return this.nonCache.push(e), this.nonCache.length > this.nonCacheSize && this.nonCache.shift(), -1;
  }
  getLength() {
    return this.cache.length;
  }
  getSize() {
    return this.cacheSize;
  }
}
let xe = new Kt();
function Jt(t, e) {
  t = t.replace(/(&|\\amp)/g, "🎯"), t = t.replace(/REtuRn/g, `
`);
  let n = Lt(t);
  return n = Yt(n, "LBRACK", "RBRACK", e), n = _t(n), n;
}
function Ut(t, e, n, r) {
  if (t.substring(e, e + n.length) != n)
    throw new Error("No" + n + " at index " + e);
  for (let i = e + 1; i < t.length; i++)
    switch (t.substring(i, i + r.length)) {
      case r:
        return i;
    }
  return -1;
}
const O = function(...t) {
  typeof window < "u" && window.alert ? window.alert(...t) : console.log("alert", ...t);
};
let he = "STart";
he = "";
const ae = function(t) {
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t)) {
    let r = "";
    console.log("content", t);
    const i = t.tag;
    let o = L[i];
    return o || (o = D(i)), r += o.before_begin + o.begin_tag + he, "xmlattributes" in t && t.xmlattributes && (r += " " + t.xmlattributes.trim()), "id" in t && t.id && (r += ' xml:id="' + H(t.id) + '"'), Object.keys(t).forEach((s) => {
      ["tag", "content", "title", "xmlattributes", "id"].includes(s) || (r += " " + s + '="' + t.el + '"');
    }), r += o.after_begin, "title" in t && t.title && (r += `
<title>` + re(t.title) + `</title>
`), r + ae(t.content) + o.before_end + o.end_tag + o.after_end;
  }
  const e = t;
  let n = "";
  return e.forEach((r, i) => {
    let o = "";
    if (typeof r == "string") {
      r.match(/^\s*$/) || (o += "<TEXT>" + r + "</TEXT>", console.log("just added error of", r));
      return;
    }
    let c = "", l = "";
    const s = r.tag;
    let d = L[s];
    typeof d > "u" && (d = fe), l += d.before_begin + d.begin_tag + he, "xmlattributes" in r && r.xmlattributes && (l += " " + r.xmlattributes.trim()), "id" in r && r.id && (l += ' xml:id="' + H(r.id) + '"'), Object.keys(r).forEach((y) => {
      !["tag", "content", "title", "xmlattributes", "id", "text"].includes(y) && !y.startsWith("_") && (l += " " + y + '="' + r[y] + '"');
    }), "title" in r && r.title && !_e.includes(s) ? c += `
<title>` + re(r.title) + `</title>
` : "title" in r && r.title && _e.includes(s) && ["ol", "ul", "enumerate", "itemize"].includes(s) && (l += " " + r.title), l += d.after_begin;
    let p = r.content, a = ae(p);
    "text" in r && (a = ae(r.text) + a), ["c", "code", "tabular"].includes(s) && (a = Je(a));
    let m = "";
    ["m", "md", "me", "mdn", "men"].includes(s) && (a.match(/^.*(\.|,|;)\s*$/s) && (a = a.replace(/\s*$/, ""), m = a.slice(-1), a = a.slice(0, -1)), a.match(/(\\|{)/) ? a = er(a) : (a = Jt(a, "LaTeX"), a = a.replace(/&/g, " \\amp "))), c = c + a;
    let u = d.before_end + d.end_tag + m + d.after_end;
    c.match(/^\s*<mdn>.*<\/mdn>\s*$/s) ? o = c : o = l + c + u, c.match(/^\s*<p>\s*<\/p>\s*$/) && (console.log("empty p"), c = ""), o = o.replace(/(\/)(me|md|men|mdn)>\s+(\.|,|;|:)/g, "$1$2>$3"), n += o;
  }), n.replace(/^\s*<p>\s*(<\?[^<>]*\?>)\s*<\/p>\s*/, `$1

`);
}, H = function(t) {
  let e = t;
  return e = e.replace(/[^a-zA-Z0-9\-_ ]/g, "_"), e;
}, Je = function(t) {
  let e = t;
  return e = e.replace(/&([^a])/g, "&amp;$1"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e;
}, er = function(t) {
  let e = t;
  return e = e.replace(/&/g, "\\amp "), e = e.replace(/</g, "\\lt "), e = e.replace(/>/g, "\\gt "), e;
}, tr = function(t, e, n) {
  let r = n, i = 0;
  const o = t.length;
  for (; r < e.length; ) {
    const c = e[r];
    if (i <= 0 && e.slice(r, r + o) === t)
      return r;
    c === "\\" ? r++ : c === "{" ? i++ : c === "}" && i--, r++;
  }
  return -1;
}, te = function(t, e = 0, n = "{", r = "}") {
  let i = t.trimStart();
  if (!i)
    return console.log("empty string sent to first_bracketed_string()"), ["", ""];
  let o = "", c = "", l = "";
  if (e == 0 && i[0] != n)
    return ["", i];
  for (e == 0 ? (l = n, e = 1, i = i.substring(1)) : l = ""; e > 0 && i; )
    c = i.substring(0, 1), c == n && o != "\\" ? e += 1 : c == r && o != "\\" && (e -= 1), l += c, o == "\\" && c == "\\" ? o = `
` : o = c, i = i.substring(1);
  return e == 0 ? [l, i] : (console.log("no matching bracket %s in %s XX", n, i), ["", l.substring(1)]);
}, rr = function(t) {
  return t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}, nr = /^\\AAAAAAAbegin{/, Y = function(t, e, n) {
  if (typeof t == "string")
    return Ue(t);
  if (!Array.isArray(t)) {
    let o = { ...t };
    return o.content = Y(o.content, e, n), o;
  }
  let r = [], i = "";
  return t.forEach((o, c) => {
    if (n.includes(o.tag))
      i && (r.push({ tag: "p", content: i }), i = ""), G.includes(o.tag) && typeof o.content == "string" ? (o.content = ke(o.content, X), o.content = Y(o.content, e, n)) : G.includes(o.tag) && (o.content = Y(o.content, e, n)), r.push(o);
    else if (o.tag == "text")
      o.content.split(/\n\s*\n{1,}/).forEach((s) => {
        const d = i + s;
        if (d) {
          const g = { tag: "p", content: d };
          r.push(g);
        }
        i = "";
      });
    else if (typeof o.content == "string" && G.includes(o.tag)) {
      let l = [];
      o.content.split(/\n\s*\n{1,}/).forEach((d) => {
        const g = d.trim();
        g && l.push({ tag: "p", content: g });
      }), o.content = l, r.push(o);
    } else
      r.push(o);
  }), r;
}, Ue = function(t) {
  let e = [], n = "";
  return t.split(/\n\s*\n{1,}/).forEach((i) => {
    const o = n + i;
    if (o) {
      const c = { tag: "p", content: o };
      e.push(c);
    }
    n = "";
  }), e;
}, ke = function(t, e) {
  typeof t != "string" && O("expected string in splitTextAtDelimiters", t);
  var n = t;
  let r;
  const i = [], o = new RegExp(
    "(" + e.map((c) => rr(c.left)).join("|") + ")"
  );
  for (; r = n.search(o), r !== -1; ) {
    r > 0 && (i.push({
      tag: "text",
      content: n.slice(0, r)
    }), n = n.slice(r));
    const c = e.findIndex((d) => n.startsWith(d.left));
    if (r = tr(e[c].right, n, e[c].left.length), r === -1)
      break;
    const l = n.slice(0, r + e[c].right.length), s = nr.test(l) ? l : n.slice(e[c].left.length, r);
    i.push({
      //        type: "math",
      tag: e[c].tag,
      content: s
      //       rawData,
    }), n = n.slice(r + e[c].right.length);
  }
  return n.match(/^\s*$/) || i.push({
    tag: "text",
    content: n
  }), i;
}, et = function(t) {
  typeof t != "string" && O("expected a string, but got:", t);
  let e = t;
  return e = e.replace(/(^|\s|~)\$([^\$\n]+)\$(\s|$|[.,!?;:\-<\}]|\)|th\b|st\b|nd\b)/mg, "$1<m>$2</m>$3"), e = e.replace(/(^|\s)_([^_\n]+)_(\s|$|[.,!?;:])/mg, "$1<term>$2</term>$3"), e = e.replace(/(^|\s)\*\*([^*\n]+)\*\*(\s|$|[.,!?;:])/mg, "$1<alert>$2</alert>$3"), e = e.replace(/(^|\s)\*([^*\n]+)\*(\s|$|[.,!?;:])/mg, "$1<em>$2</em>$3"), e = e.replace(/(^|\s)``([^'"`\n]+)''(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), e = e.replace(/(^|\s)``([^'"`\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), e = e.replace(/(^|\s)`([^'"`\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), e = e.replace(/(^|\s)"([^"\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), e = e.replace(/(^|\s)'([^'\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), e = e.replace(/(^|[^`a-zA-Z0-9])`([^`\n]+)`($|[^`a-zA-A0-9])/mg, "$1<c>$2</c>$3"), e;
}, tt = function(t) {
  let e = "";
  return e = t.replace(/([^-])\-\-([^-])/mg, "$1<mdash/>$2"), e = e.replace(/{\\em +/g, "\\em{"), e = e.replace(/{\\bf +/g, "\\textbf{"), e = e.replace(/{\\it +/g, "\\textit{"), e = e.replace(/{\\sc +/g, "\\sc{"), e = e.replace(/\bLaTeX\b/mg, "<latex/>"), e = e.replace(/\bTeX\b/mg, "<tex/>"), e = e.replace(/\bPreTeXt\b/mg, "<pretext/>"), e = e.replace(/([^\\])~/mg, "$1<nbsp/>"), e = e.replace(/\(\\(ref|eqref|cite){([^{}]+)}\)/g, function(n, r, i) {
    return i = i.replace(/, */g, " "), i = H(i), '<xref ref="' + i + '"/>';
  }), e = e.replace(/\\(ref|eqref|cite){([^{}]+)}/g, function(n, r, i) {
    return i = i.replace(/, */g, " "), i = H(i), '<xref ref="' + i + '"/>';
  }), e = e.replace(/\\(caption){([^{}]+)}/sg, "<$1>$2</$1>"), e = e.replace(/\\(caption)\s*({.*)/sg, function(n, r, i) {
    let o = te(i);
    return "<" + r + ">" + re(o[0]) + "</" + r + `>
` + i;
  }), e = e.replace(/\\(q|term|em|m|c|fn){([^{}]+)}/g, "<$1>$2</$1>"), e = e.replace(/\\(url|href){([^{}]+)}({|\[)([^{}\[\]]+)(\]|})/g, function(n, r, i, o, c) {
    return '<url href="' + i + '">' + c + "</url>";
  }), e = e.replace(/\\(url|href){([^{}]+)}([^{]|$)/g, function(n, r, i) {
    return '<url href="' + i + '"/>';
  }), e;
}, rt = function(t) {
  let e = "";
  return e = t.replace(/\\('|"|\^|`|~|-|c|H|u|v) ([a-zA-Z])/mg, de), e = e.replace(/\\('|"|\^|`|~|-)([a-zA-Z])/mg, de), e = e.replace(/\\('|"|\^|`|~|-|c|H|u|v){([a-zA-Z])}/mg, de), e;
}, de = function(t, e, n) {
  return dt[e + n];
}, re = function(t) {
  let e = t;
  return e = et(e), e = tt(e), e = rt(e), e;
}, ir = function(t) {
  typeof t != "string" && O("expected a string, but got:", t);
  let e = t;
  e = e.replace(/<!--.*?-->/g, "");
  for (let [n, r] of Object.entries(gt)) {
    let i = n;
    r.forEach((o) => {
      let c = o;
      e = e.replace("<" + c + ">", "<" + i + ">"), e = e.replace("<" + c + " ", "<" + i + " "), e = e.replace("</" + c + ">", "</" + i + ">"), e = e.replace("\\begin{" + c + "}", "\\begin{" + i + "}"), e = e.replace("\\end{" + c + "}", "\\end{" + i + "}"), e = e.replace("\\" + c + "{", "\\" + i + "{");
    });
  }
  return we.forEach((n) => {
    var r = new RegExp("\\\\" + n + "{([^{}]+)}", "g");
    e = e.replace(r, "<" + n + ">$1</" + n + ">");
  }), e;
}, N = function(t, e, n, r, i = "all", o = "all", c = "") {
  let l = [];
  typeof e == "string" ? e == "displaymath" ? l = I : e == "spacelike" ? l = "spacelike" : O("unknown taglist " + e) : typeof e[0] == "string" ? l = Ee(e) : l = e;
  let s = [];
  if (Array.isArray(t))
    return t.forEach((d, g) => {
      if (n > r && d.tag != "text")
        s.push(d);
      else {
        let p;
        i == "all" || i.includes(d.tag) ? p = N(d, e, n + 1, r, i, o, d.tag) : p = d, Array.isArray(p) ? p.forEach((a) => {
          s.push(a);
        }) : s.push(p);
      }
    }), s;
  if (typeof t == "string") {
    if (n > r + 2)
      return t;
    if (l === "spacelike")
      return o == "all" || o.includes(c) ? et(t) : t;
    let d = t;
    return l === "makeparagraphs" ? (o == "all" || o.includes(c)) && (d = Ue(d)) : (o == "all" || o.includes(c)) && (d = ke(d, l)), d;
  } else {
    let d = { ...t };
    if (n > r && d.tag != "text")
      return d;
    let g = d.content;
    return (i == "all" || o.includes(d.tag)) && (g = N(g, e, n + 1, r, i, o, d.tag)), d.tag == "text" && typeof g == "string" ? d.content = g : d.tag != "text" ? g.length == 1 && g[0].tag == "text" ? d.content = g[0].content : d.content = g : d = g, d;
  }
}, _ = function(t, e, n = 0, r = 0, i = "all", o = "", c = "", l = "section") {
  let s = [];
  if (Array.isArray(t))
    t.forEach((g, p) => {
      let a;
      typeof g == "object" ? a = _({ ...g }, e, n + 1, r, i, g.tag, o) : a = _(g, e, n + 1, r, i, o, c), s.push(a);
    });
  else if (typeof t == "object") {
    if (e == "oneline environments" && t.tag == "p" && typeof t.content == "string") {
      if (t.content.match(/^\s*([A-Za-z]+):/)) {
        let a = t.content.split(":", 1)[0].toLowerCase();
        if (a = a.trim(), !mt.includes(a)) {
          const m = t.content.replace(/^\s*[^:]*:\s*/, "");
          t.tag = a, t.content = m;
        }
      }
    } else if (e == "extract li" && (t.tag == "p" || t.tag == "enumerate" || t.tag == "itemize") && typeof t.content == "string") {
      if (t.content.match(/^\s*\\item\s/)) {
        const p = "li", a = t.content.replace(/^\s*\\item\s*/, "");
        t.tag = p, t.content = a;
      } else if (t.content.match(/^\s*\\item\[[^\[\]]*\]\s*/)) {
        const p = "li", a = t.content.replace(/^\s*\\item\[[^\[\]]*\]\s*/, "");
        t.tag = p, t.content = a;
      } else if (t.content.match(/^\s*(\-|\*)+\s/)) {
        const p = "li", a = t.content.replace(/^\s*(\-|\*)+\s*/, "");
        t.tag = p, t.content = a, t._parenttag = "ul";
      } else if (t.content.match(/^\s*\++\s/)) {
        const p = "li", a = t.content.replace(/^\s*\++\s*/, "");
        t.tag = p, t.content = a, t._parenttag = "ol";
      } else if (t.content.match(/^\s*\(*[0-9]+\.*\)*\s/)) {
        const p = "li", a = t.content.replace(/^\s*\(*[0-9]+\.*\)*\s*/, "");
        t.tag = p, t.content = a, t._parenttag = "ol";
      }
    } else if (e == "xmlattributes" && typeof t.content == "string") {
      var d = new RegExp("^\\s*(" + ie.join("|") + ")[^<>+]*>", "s");
      if (d.test(t.content) || t.content.match(/^\s*[^\n<>+%\`\\$()]*>/))
        if (t.content.match(/^\s*>/))
          t.content = t.content.replace(/^\s*>/, "");
        else {
          let p = t.content.split(">", 1)[0];
          t.content = t.content.replace(/^\s*[^<>%]*?>/s, ""), "xmlattributes" in t ? t.xmlattributes += p : t.xmlattributes = p;
        }
    } else if (e == "attributes" && typeof t.content == "string") {
      const p = t.content.split(/(\n\s*\n{1,})/);
      if (p.length > 1) {
        let a = "";
        var d = new RegExp("^(" + ie.join("|") + ")");
        p.forEach((u) => {
          let y = u.trim();
          if (d.test(y)) {
            let h = y.split(":", 1)[0], w = y.split(":", 2)[1].trim();
            t[h] = w;
          } else
            a += u;
        }), t.content = a;
      }
    } else if (e == "title" && !We.includes(t.tag) && typeof t.content == "string") {
      if (t.content.match(/^\s*\[/) || t.content.match(/^\s*<title>/))
        if (t.content.match(/^\s*\[/)) {
          let p = t.content.split("]", 1)[0];
          p = p.replace(/\s*\[/, ""), t.title = p, t.content = t.content.replace(/^\s*\[[^\[\]]*\]/, "");
        } else {
          let p = t.content.split("</title>", 1)[0];
          p = p.replace(/\s*<title>/, ""), t.title = p, t.content = t.content.replace(/^\s*<title>.*?<\/title>/, "");
        }
    } else if (e == "label" && typeof t.content == "string") {
      if (t.content.match(/^\s*(\\*)label{[^{}]*}/)) {
        let p = t.content.replace(/^\s*(\\*)label{([^{}]*)}.*/s, "$2");
        p = H(p), t.id = p, t.content = t.content.replace(/^\s*(\\*)label{([^{}]*)}\s*/, "");
      }
    } else if (e == "images" && typeof t.content == "string")
      t.content.match(/\\includegraphics/) && (t.content = t.content.replace(
        /\\includegraphics\[[^\[\]]*\]\s*{\s*([^{}]*)\s*}/,
        '<image source="$1" width="50%"/>'
      ), t.content = t.content.replace(
        /\\includegraphics\s*{\s*([^{}]*)\s*}/,
        '<image source="$1" width="50%"/>'
      )), t.content.match(/\\caption/) && (t.content = t.content.replace(/\\(caption)\s*({.*)/sg, function(p, a, m) {
        let u = te(m), y = u[0].slice(1, -1).trim();
        return y = y.replace(/\\(text)*(rm|sf|it|bf|sl)*\s*/, ""), "<" + a + ">" + re(y) + "</" + a + `>
` + u[1];
      }));
    else if (e == "statements" && i.includes(o)) {
      let p = [], a = {};
      if (typeof t.content == "string")
        p = [{ tag: "text", content: t.content }], a = { tag: "statement", content: p }, t.content = [a];
      else {
        let m = !1;
        if (t.content.forEach((u) => {
          u.tag == "statement" && (m = !0);
        }), !m) {
          let u = "", y = 0;
          for (y = 0; y < t.content.length && (u = t.content[y], !ue.includes(u.tag)); ++y)
            p.push(u);
          a = { tag: "statement", content: p };
          let h = t.content.slice(y);
          h.unshift(a), t.content = h;
        }
      }
    } else if (e == "prefigure" && i.includes(t.tag)) {
      !("xmlns" in t) && !("xmlattributes" in t && t.xmlattributes.includes("xmlns")) && (t.xmlns = "https://prefigure.org");
      let p = [], a = {};
      if (typeof t.content == "string") {
        const m = t.content;
        if (p = m, a = { tag: "diagram", content: p }, "dimensions" in t && (a.dimensions = t.dimensions, delete t.dimensions), "margins" in t && (a.margins = t.margins, delete t.margins), t.content = [a], "bbox" in t) {
          let u = { tag: "coordinates", bbox: t.bbox, content: m };
          delete t.bbox, a.content = [u];
        }
      }
      if (c != "image") {
        let m = { ...t };
        m.content = [...t.content], t = { tag: "image", content: [m] }, "width" in m && (t.width = m.width, delete m.width);
      }
    } else if (e == "sage" && i.includes(t.tag)) {
      let p = t.content.trim(), a = "";
      if (p.match(/\s*{/)) {
        let m = te(p);
        a = m[0].slice(1, -1), p = m[1];
      }
      a && (t.language = a), t.content = `<input>
` + Je(p) + `
</input>`;
    } else if (e == "blockquotes" && i.includes(t.tag) && typeof t.content == "string") {
      if (t.content.match(/^\s*\+\+\+sTaRTbQ>/)) {
        let p = t.content.replace(/^\s*\+\+\+sTaRTbQ>/, "");
        p = p.replace(/\n\s*>/g, `
`);
        let a = p.split(/\n\s*\n{1,}/), m = [];
        a.forEach((u, y) => {
          m.push({ tag: "p", content: u });
        }), t.content = m, t.tag = "blockquote";
      }
    } else if (e == "substructure" && i.includes(t.tag) && typeof t.content == "string") {
      const p = U[t.tag], a = Ee(p), m = ke(t.content, a);
      t.content = [...m];
    } else if (e == "clean up substructure" && i.includes(t.tag) && Array.isArray(t.content)) {
      const p = t.tag;
      let a = [];
      t.content.forEach((m) => {
        U[p].includes(m.tag) ? a.push(m) : ie.includes(m.tag) ? t[m.tag] = m.content : m.tag == "text" && m.content.match(/^\s*$/) && "attributes" in m ? "attributes" in t ? t.attributes += m.attributes : t.attributes = m.attributes : m.tag == "text" && m.content.match(/^\s*$/) || (console.log("problem content", m), O("problem content: see console.log"));
      }), t.content = [...a];
    } else if (e == "extraneous math" && i.includes(t.tag) && typeof t.content == "string")
      t.content = t.content.replace(/^\s*\+\+\+saMePaR/, "");
    else if (e == "gather li" && i.includes(t.tag) && typeof t.content == "object") {
      let p = [], a = "", m = 0, u = !1, y = [], h = {};
      for (m = 0; m < t.content.length; ++m)
        a = t.content[m], !u && a.tag != "li" ? p.push(a) : !u && a.tag == "li" ? (u = !0, y = [a], h.tag = a._parenttag) : u && a.tag == "li" ? y.push(a) : u && a.tag != "li" && (h.content = [...y], p.push({ ...h }), u = !1, h = {}, y = [], p.push(a));
      u && (h.content = y, p.push({ ...h })), u = !1, y = [], h = {}, t.content = p;
    } else if (e == "split li" && i.includes(t.tag) && typeof t.content == "object")
      t = sr(t);
    else if (e == "absorb math" && (i.includes(t.tag) || t.tag == l) && typeof t.content == "object") {
      let p = [], a = "", m = 0;
      for (m = 0; m < t.content.length; ++m) {
        a = t.content[m];
        const u = p.length;
        J.includes(a.tag) ? u == 0 ? (console.log("it happened 1", a), p.push({ ...a })) : p[u - 1].tag != "p" ? (console.log("it happened 2", a), p.push({ ...a })) : typeof p[u - 1].content == "string" ? (p[u - 1].content = [{ tag: "text", content: p[u - 1].content }], p[u - 1].content.push({ ...a })) : p[u - 1].content.push({ ...a }) : a.tag == "p" ? typeof a.content == "string" && a.content.match(/\s*\+\+\+saMePaR/) ? (a.content = a.content.replace(/\s*\+\+\+saMePaR\s*/, ""), console.log("               about to push-", a.content, "-as", u, "(m1) on", p), console.log("specifically item", u - 1, "which is", p[u - 1]), p[u - 1].content.push({ tag: "text", content: a.content })) : typeof a.content == "string" ? p.push({ ...a }) : a.content.length > 0 && a.content[0].tag == "text" && typeof a.content[0].content == "string" && a.content[0].content.match(/\s*\+\+\+saMePaR/) ? (a.content[0].content = a.content[0].content.replace(/\s*\+\+\+saMePaR\s*/, ""), a.content.forEach((y) => {
          p[u - 1].content.push(y);
        })) : a.content.length > 0 && p.push({ ...a }) : a.tag == "text" ? a.content = a.content.replace(/\s*\+\+\+saMePaR\s*/, "") : p.push({ ...a });
      }
      t.content = [...p];
    } else e == "absorb math" && t.tag == "text" ? t.content = t.content.replace(/\s*\+\+\+saMePaR\s*/, "") : e == "ppp" && (t.tag == "p" || t.tag == "li") && (typeof t.content == "string" ? (t.content = t.content.replace(/^( *\n)*/, ""), t.content = t.content.replace(/( *\n)*$/, "")) : t.content.forEach((p) => {
      (p.tag == "text" || J.includes(p.tag)) && (p.content = p.content.replace(/^( *\n)*/, ""), p.content = p.content.replace(/( *\n)*$/, ""));
    }));
    let g = { ...t };
    return g.content = _(g.content, e, n + 1, r, i, g.tag, o), g;
  } else
    return e == "do_nothing" ? t + "X" : e == "fonts" && i.includes(o) ? rt(t) : e == "texlike" && i.includes(o) ? tt(t) : t;
  return s;
}, or = function(t) {
  let e = t;
  e = e.replace(/\\smallskip/g, `
`), e = e.replace(/\\medskip/g, `
`), e = e.replace(/\[resume\]/g, `
`), e = e.replace(/ +(\n|$)/g, `
`), e = ir(e), e = e.replace(/<--/g, "\\begin{comment}"), e = e.replace(/-->/g, "\\end{comment}"), e = e.replace(/{([a-z]{3,})\*/g, "{$1star"), e = e.replace(/section\*/g, "section"), pt.forEach((c) => {
    const l = new RegExp(
      "(\\\\begin{" + c + "})(.*?)(\\\\end{" + c + "})",
      "sg"
    );
    e = e.replace(l, function(s, d, g, p) {
      if (g.match(/\\label\s*{/)) {
        const a = g.replace(/^(.*?)(\s*\\label{[^{}]*}\s*)(.*)$/s, "$2"), m = g.replace(/^(.*?)(\\label{[^{}]*}\s*)(.*)$/s, "$1$3");
        return d + a + m + p;
      } else
        return d + g + p;
    });
  });
  let r = e.replace(/([^\s])\\label({|\[|\()/g, `$1
\\label$2`).replace(/\n\s*\n\s*>/g, `

+++sTaRTbQ>`);
  r = r.replace(/\n *\\\[([^\[\]]+)\\\] *\n/sg, `
\\begin{equationstar}$1\\end{equationstar}
`), r = r.replace(/(\$\$|\\end{equation}|\\end{align}|\\end{equationstar}|\\end{alignstar}) *\n([^\s])/g, `$1
+++saMePaR$2`), r = r.replace(/(\/me>|\/md>|\/men>|\/mdn>) *\n *([^\n<])/g, `$1
+++saMePaR$2`), r = r.replace(/<p>\s*(<ol>|<ul>|<dl>)/g, "$1"), r = r.replace(/(<\/ol>|<\/ul>|<\/dl>)\s*<\/p>/g, "$1"), r = r.replace(/\s*?\n+\s*?\\item\s+/g, `

\\item `);
  let i = r.replace(/(<diagram)(.*?)(<\/diagram>)/sg, function(c, l, s, d) {
    const g = s.replace(/(<|<\/)definition(>)/g, "$1predefinition$2");
    return l + g + d;
  });
  const o = new RegExp("([^\\n])(\\n *(" + ie.join("|") + ") *:)", "g");
  return i = i.replace(o, `$1
$2`), i;
}, ar = function(t) {
  let e = t;
  if (e.match(/document(style|class)/)) {
    let n = e.replace(/\\begin{document}.*$/s, "");
    A.preamble = n, A.documentclass = "article";
    let r = e.replace(/^.*\\begin{document}(.*)\\end{document}.*/s, "$1"), i = r.replace(/\\maketitle.*$/s, "");
    if (A.metadata = i, i.match(/\\title\s*/)) {
      let l = i.replace(/^.*\\title\s*/s, "");
      if (l.startsWith("[")) {
        let s = l.replace(/^\[(.*?)\]\s*{(.*?)}.*$/s, "$1");
        A.shorttitle = s;
        let d = l.replace(/^\[(.*?)\]\s*{(.*?)}.*$/s, "$2");
        A.title = d;
      } else if (l.startsWith("{")) {
        let s = l.replace(/^{(.*?)}.*$/s, "$1");
        A.title = s;
      } else
        O("had trouble extracting title");
    } else
      O("Did not find title");
    let o = r.replace(/^.*\\maketitle/s, "");
    const c = o.split("\\begin{thebibliography}");
    return c.length == 2 && (o = c[0], A.biblio = c[1]), o;
  }
  return t;
}, lr = function(t) {
  let e = t;
  return e = e.replace(/(^|\n)# +([A-Z][^\n]*)\n/g, "$1\\section{$2}"), e = e.replace(/(^|\n)## +([A-Z].*)\n/g, "$1\\subsection{$2}"), e = e.replace(/(^|\n)### +([A-Z].*)\n/g, "$1\\paragraphs{$2}"), e = e.replace(/^ *-{2,} *\n/, `
`), e = e.replace(/\n *\n *-{2,} *\n *\n/g, `

`), e = e.replace(/\n *\n *\!\[\]\(([^()]+)\){([^{}]+)} *\n *\n/g, `

\\includegraphics[$2]{$1}

`), e = e.replace(/\[([^\[\]]*)\]\((http[^()]+)\)/g, "\\url{$2}{$1}"), e = e.replace(/\n *\n *```/g, `

\\begin{sage}
`), e = e.replace(/\n```({r)/g, `

\\begin{sage}
$1`), e = e.replace(/``` *\n *\n/g, `\\end{sage}

`), e = K(e, "section"), e = K(e, "subsection"), e = K(e, "paragraphs"), e;
}, K = function(t, e, n = 0, r = 2) {
  if (n > r)
    return t;
  if (Array.isArray(t)) {
    let i = [...t];
    return i.forEach((o) => {
      const c = K(o.content, e, n + 1, r);
      typeof c == "string" || (o.content = [...K(c, e, n + 1, r)]);
    }), i;
  } else {
    let i = t;
    const o = new RegExp("\\\\(" + e + ")", "g");
    let c = i.split(o);
    if (c.length == 1)
      return c[0];
    let l = [], s = {}, d = !0, g = !1, p = "";
    return c.forEach((a, m) => {
      let u = a.trim();
      if (d) {
        if (!u)
          return;
        a != e ? m == 0 ? (s.tag = "introduction", s.content = a, l.push({ ...s }), s = {}) : O("did not find " + e + ":" + a + "X") : (s.tag = e, d = !1, g = !0);
      } else if (g && (u = a.trim(), u.startsWith("{"))) {
        let [y, h] = te(u);
        s.title = y.slice(1, -1), h.match(/^\s*\\label/) && (h = h.replace(/^\s*\\label\s*/, ""), [p, h] = te(h), p = p.slice(1, -1), p && (s.id = H(p))), s.content = h.trim(), g = !1, d = !0, l.push({ ...s }), s = {};
      }
    }), Object.keys(s).length && (console.log("current_section", s), O("some content was not saved")), l;
  }
};
let A = {};
function pr(t, e = "placeholder") {
  let n = or(t), r = ar(n), i = lr(r), o = { tag: e, content: i };
  "documentclass" in A && A.documentclass ? o.tag = A.documentclass : o.tag = e, "title" in A && A.title ? o.title = A.title : "shorttitle" in A && A.shorttitle && (o.title = A.shorttitle);
  let c = { ...o };
  const l = 20;
  for (let M = 0; M < l; ++M)
    v.forEach((R) => {
      c = N(c, R, 0, M), me.forEach((T) => {
        c = _(c, T[0], 0, M, T[1]);
      });
    });
  let s = { ...c };
  s = N(s, ["comment"], 0, 10), s = Y(s, "all", le), console.log("processed text 7", s);
  let d = { ...s };
  d = _(d, "oneline environments", 0, 0, "all"), d = _(d, "attributes", 0, 0, "all"), me.forEach((M) => {
    d = _(d, M[0], 0, 0, M[1]);
  }), d = Y(d, "all", le), d = _(d, "blockquotes", 0, 0, ["p"]), d = _(d, "images", 0, 0, "all");
  let g = { ...d };
  g = _(g, "extract li", 0, 0, "all"), me.forEach((M) => {
    g = _(g, M[0], 0, 0, M[1]);
  }), g = _(g, "clean up substructure", 0, 0, ut);
  const a = _(g, "extract li", 0, 0, ["p"]);
  let m = _(a, "gather li", 0, 0, G);
  m = _(m, "split li", 0, 0, ["ol", "ul"]);
  const u = _(m, "absorb math", 0, 0, G, "", "", e), y = N(u, W, 0, l + 1, "all", z), h = N(y, "spacelike", 0, l + 1, "all", z), w = N(h, W, 0, l + 1, "all", z), P = N(w, W, 0, l + 1, "all", z), b = _(P, "fonts", 0, 0, z), $ = _(b, "texlike", 0, 0, z);
  let x = N($, "spacelike", 0, l + 1, "all", z);
  x = N(x, W, 0, l + 1, "all", z), x = N(x, W, 0, l + 1, "all", z);
  let Z = _(x, "statements", 0, 0, st), k = _(Z, "prefigure", 0, 0, ["prefigure"]);
  if (k = _(k, "sage", 0, 0, ["sage"]), k = _(k, "ppp", 0, 0, []), "biblio" in A) {
    let M = { tag: "backmatter" };
    M.content = `
<references xml:id="bibliography">
<title>Bibliography</title>
`, M.content += cr(A.biblio), M.content += `
</references>
`, k.content.push(M);
  }
  return console.log("tmp5", k), ae(k);
}
function sr(t, e = 0, n = [], r = "") {
  if (t.content.length > 1)
    return t;
  let i = t.content[0];
  console.log("theLI", i);
  let o = t.content[0].content;
  if (console.log("theLIcontent", o, "X"), typeof o == "string" && o.match(/\n *(\-|\+|\*|[0-9])/)) {
    let c = o.split(/\n *(\-|\+|\*|[0-9]\.*)/);
    for (c < 3 && O("malformed list items", o), t.content[0].content = c.shift(); c.length > 0; ) {
      let l = c.shift();
      l.match(/^[0-9]/) && (l = "1");
      const s = c.shift().trim();
      if (F[l] == i._parenttag) {
        let d = { tag: "li", _parenttag: F[l], content: s };
        t.content.push(d);
      } else {
        let d = { tag: F[l], content: [] };
        for (d.content.push({ tag: "li", content: s, _parenttag: F[l] }); c.length > 0 && F[c[0]] == F[l]; ) {
          let m = c.shift();
          m.match(/^[0-9]/) && (m = "1");
          const u = c.shift();
          d.content.push({ tag: "li", content: u, _parenttag: F[m] });
        }
        let g = t.content.pop(), a = [{ tag: "p", content: g.content }];
        g.content = a, g.content.push(d), t.content.push(g);
      }
    }
  } else
    return console.log("will not be splitting:", o), t;
  return t;
}
function cr(t) {
  let e = t.trim();
  return e = e.replace(/{[^{}]+}/, ""), e = e.replace(/\s*\\(begin|end){thebibliography}\s*/, ""), e = e.replace(/%.*/g, ""), e = re(e), e = e.replace(/&([^m])/, "&amp;$1"), e = e.replace(/\s*\\bibitem\s*{([^{}]+)}\s*/g, `</biblio>

<biblio type="raw" xml:id="$1">`), e = e.replace(/(.*?)<\/biblio>/, ""), e += `</biblio>
`, e;
}
export {
  pr as FlexTeXtConvert
};
