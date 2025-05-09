const _e = ["reading-questions", "introduction", "statement", "task", "worksheet", "page"], qe = ["ol", "ul", "dl"], We = ["li"], Ae = ["aside", "historical", "biographical"], pe = ["algorithm", "claim", "corollary", "fact", "identity", "lemma", "proposition", "theorem"], ue = ["assumption", "axiom", "conjecture", "heuristic", "hypothesis", "principle"], Ee = ["convention", "insight", "note", "observation", "remark", "warning"], Te = ["example", "problem", "question"], Se = ["definition"], K = ["exercise"], Ne = ["proof"], Pe = ["activity", "exploration", "investigation", "project"], J = ["md", "mdn", "me", "men"], ee = ["hint", "answer", "solution"], Re = ["case", "task"], Be = ["em", "term", "alert", "m", "q", "c", "tag"];
[...J];
let Xe = [
  // peer of p cildren of (sub)sections
  ...Ae,
  ...pe,
  ...ue,
  // ...list_like,  (this caused an infinite recursion)
  ...Ee,
  ...Te,
  ...Se,
  ...K,
  ...Ne,
  ...Pe,
  ...ee,
  "blockquote",
  "sidebyside",
  "li",
  "paragraphs",
  "section"
];
const U = [
  ...Xe,
  ...ee,
  ...Re,
  ..._e
], Ge = ["figure", "tabular", "listing"], Ue = ["image", "table", "program"], Ye = ["latex-image", "prefigure", "description", "alt"], ze = ["figure", "table", "tabular", "ol", "ul", "dl"], Ke = [...pe, ...ue, ...K, "task"], z = [
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
], Je = [
  // [latex_name, ptx_tag]
  // could these be handled by a alias, like we did with quote -> blockquote?
  ["equation", "men"],
  ["align", "mdn"]
], Oe = {
  // the tags which occun inside specific environments
  diagram: ["predefinition", "coordinates", "annotations"]
  // check
}, et = ["exercisegroup", "exercises", "prefigure", "diagram", ...Oe.diagram], tt = [
  "source",
  "ref",
  "width",
  "margins",
  "label",
  "attributes",
  "bbox",
  "dimensions",
  "destination",
  "text"
];
let x = [];
x.push(["worksheet"]);
x.push(["page"]);
x.push(["paragraphs"]);
x.push(["sidebyside"]);
x.push([...Pe]);
x.push([...Te, ...K]);
x.push(["introduction", "conclusion"]);
x.push([...pe, ...ue, ...Ee, ...Se]);
x.push(["task"]);
x.push(["statement"]);
x.push([...Ne, ...ee]);
x.push([...Re]);
x.push([...Ae]);
x.push([...Ge]);
x.push([...Ue]);
x.push([...Ye]);
x.push(["prefigure"]);
x.push(["diagram"]);
x.push(Oe.diagram);
x.push([...qe]);
x.push([...We]);
x.push(["blockquote"]);
x.push("displaymath");
x.push(["p"]);
const fe = [
  ["extraneous math", J],
  ["workspace", [...K]],
  ["margins", ["worksheet", "sidebyside"]],
  ["margin", ["worksheet", "sidebyside"]],
  ["attributes", "all"],
  ["title", "all"],
  ["label", "all"]
];
let rt = {
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
const nt = function(t, e, r) {
  let n = r, o = 0;
  const i = t.length;
  for (; n < e.length; ) {
    const u = e[n];
    if (o <= 0 && e.slice(n, n + i) === t)
      return n;
    u === "\\" ? n++ : u === "{" ? o++ : u === "}" && o--, n++;
  }
  return -1;
}, ot = function(t) {
  return t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}, it = /^\\AAAAAAAbegin{/, V = function(t, e, r) {
  if (typeof t == "string")
    return Ie(t);
  if (!Array.isArray(t)) {
    let i = { ...t };
    return i.content = V(i.content, e, r), i;
  }
  let n = [], o = "";
  return t.forEach((i, u) => {
    r.includes(i.tag) ? (o && (n.push({ tag: "p", content: o }), o = ""), U.includes(i.tag) && typeof i.content == "string" ? (i.content = ce(i.content, j), i.content = V(i.content, e, r)) : U.includes(i.tag) && (i.content = V(i.content, e, r)), n.push(i)) : i.tag == "text" ? i.content.split(/\n{2,}/).forEach((l) => {
      const s = o + l;
      if (s) {
        const a = { tag: "p", content: s };
        n.push(a);
      }
      o = "";
    }) : n.push(i);
  }), n;
}, Ie = function(t) {
  let e = [], r = "";
  const n = t.split(/\n{2,}/);
  return console.log("found ", n.length, " pieces, which are:", n), n.forEach((o) => {
    const i = r + o;
    if (i) {
      console.log("made this_new_text", i);
      const u = { tag: "p", content: i };
      e.push(u);
    }
    r = "";
  }), e;
}, ce = function(t, e) {
  typeof t != "string" && alert("expected string in splitTextAtDelimiters", t);
  var r = t;
  let n;
  const o = [], i = new RegExp(
    "(" + e.map((u) => ot(u.left)).join("|") + ")"
  );
  for (; n = r.search(i), n !== -1; ) {
    n > 0 && (o.push({
      tag: "text",
      content: r.slice(0, n)
    }), r = r.slice(n));
    const u = e.findIndex((s) => r.startsWith(s.left));
    if (n = nt(e[u].right, r, e[u].left.length), n === -1)
      break;
    const p = r.slice(0, n + e[u].right.length), l = it.test(p) ? p : r.slice(e[u].left.length, n);
    o.push({
      //        type: "math",
      tag: e[u].tag,
      content: l
      //       rawData,
    }), r = r.slice(n + e[u].right.length);
  }
  return r.match(/^\s*$/) || o.push({
    tag: "text",
    content: r
  }), o;
}, at = function(t) {
  typeof t != "string" && alert("expected a string, but got:", t);
  let e = t;
  return e = e.replace(/(^|\s|~)\$([^\$\n]+)\$(\s|$|[.,!?;:\-])/mg, "$1<m>$2</m>$3"), e = e.replace(/(^|\s)_([^_\n]+)_(\s|$|[.,!?;:])/mg, "$1<term>$2</term>$3"), e = e.replace(/(^|\s)\*\*([^*\n]+)\*\*(\s|$|[.,!?;:])/mg, "$1<alert>$2</alert>$3"), e = e.replace(/(^|\s)\*([^*\n]+)\*(\s|$|[.,!?;:])/mg, "$1<em>$2</em>$3"), e = e.replace(/(^|\s)``([^'"`\n]+)''(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), e = e.replace(/(^|\s)``([^'"`\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), e = e.replace(/(^|\s)`([^'"`\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), e = e.replace(/(^|\s)"([^"\n]+)"(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), e = e.replace(/(^|\s)'([^'\n]+)'(\s|$|[.,!?;:])/mg, "$1<q>$2</q>$3"), e = e.replace(/(^|[^`a-zA-Z0-9])`([^`\n]+)`($|[^`a-zA-A0-9])/mg, "$1<c>$2</c>$3"), e;
}, ye = function(t, e, r) {
  return toUnicode[e + r];
}, lt = function(t) {
  typeof t != "string" && alert("expected a string, but got:", t);
  let e = t;
  e = e.replace(/<!--.*?-->/g, "");
  for (let [r, n] of Object.entries(rt)) {
    let o = r;
    n.forEach((i) => {
      let u = i;
      e = e.replace("<" + u + ">", "<" + o + ">"), e = e.replace("<" + u + " ", "<" + o + " "), e = e.replace("</" + u + ">", "</" + o + ">"), e = e.replace("\\begin{" + u + "}", "\\begin{" + o + "}"), e = e.replace("\\end{" + u + "}", "\\end{" + o + "}"), e = e.replace("\\" + u + "{", "\\" + o + "{");
    });
  }
  return e;
}, B = function(t, e, r, n, o = "all", i = "all", u = "") {
  let p = [];
  typeof e == "string" ? e == "displaymath" ? p = Z : e == "spacelike" ? p = "spacelike" : alert("unknown taglist " + e) : typeof e[0] == "string" ? p = Ve(e) : p = e;
  let l = [];
  if (Array.isArray(t))
    return t.forEach((s, a) => {
      if (r > n && s.tag != "text")
        l.push(s);
      else {
        let g;
        o == "all" || o.includes(s.tag) ? g = B(s, e, r + 1, n, o, i, s.tag) : g = s, Array.isArray(g) ? g.forEach((d) => {
          l.push(d);
        }) : l.push(g);
      }
    }), l;
  if (typeof t == "string") {
    if (r > n + 2)
      return t;
    if (p === "spacelike")
      return i == "all" || i.includes(u) ? at(t) : t;
    let s = t;
    return p === "makeparagraphs" ? (i == "all" || i.includes(u)) && (s = Ie(s)) : (i == "all" || i.includes(u)) && (s = ce(s, p)), s;
  } else {
    typeof t != "object" && alert("wrong category for ", t);
    let s = { ...t };
    if (r > n && s.tag != "text")
      return s;
    let a = s.content;
    return (o == "all" || i.includes(s.tag)) && (a = B(a, e, r + 1, n, o, i, s.tag)), s.tag == "text" && typeof a == "string" ? s.content = a : s.tag != "text" ? a.length == 1 && a[0].tag == "text" ? s.content = a[0].content : s.content = a : s = a, s;
  }
}, E = function(t, e, r = 0, n = 0, o = "all", i = "", u = "section") {
  let p = [];
  if (Array.isArray(t))
    t.forEach((l, s) => {
      let a;
      typeof l == "object" ? a = E({ ...l }, e, r + 1, n, o, l.tag) : a = E(l, e, r + 1, n, o, i), p.push(a);
    });
  else if (typeof t == "object") {
    if (e == "oneline environments" && typeof t.content == "string") {
      if (t.content.match(/^\s*([A-Za-z]+):/)) {
        const a = t.content.split(":", 1)[0].toLowerCase(), g = t.content.replace(/^\s*[^:]*:\s*/, "");
        tt.includes(a) || (t.tag = a, t.content = g);
      }
    } else if (e == "extract li" && t.tag == "p" && typeof t.content == "string") {
      if (t.content.match(/^\s*\-+\s/)) {
        const s = "li", a = t.content.replace(/^\s*\-+\s*/, "");
        t.tag = s, t.content = a, t.parenttag = "ul";
      } else if (t.content.match(/^\s*\++\s/)) {
        const s = "li", a = t.content.replace(/^\s*\++\s*/, "");
        t.tag = s, t.content = a, t.parenttag = "ol";
      } else if (t.content.match(/^\s*\(*[0-9]+\.*\)*\s/)) {
        const s = "li", a = t.content.replace(/^\s*\(*[0-9]+\.*\)*\s*/, "");
        t.tag = s, t.content = a, t.parenttag = "ol";
      }
    } else if (e == "attributes" && typeof t.content == "string") {
      if (t.content.match(/^\s*[^\n<>+]*>/))
        if (t.content.match(/^\s*>/))
          t.content = t.content.replace(/^\s*>/, "");
        else {
          let s = t.content.split(">", 1)[0];
          t.content = t.content.replace(/^\s*[^\n<>+]*>/, ""), "attributes" in t ? t.attributes += s : t.attributes = s;
        }
    } else if (e == "title" && typeof t.content == "string") {
      if (t.content.match(/^\s*\[/) || t.content.match(/^\s*<title>/))
        if (t.content.match(/^\s*\[/)) {
          let s = t.content.split("]", 1)[0];
          s = s.replace(/\s*\[/, ""), t.title = s, t.content = t.content.replace(/^\s*\[[^\[\]]*\]/, "");
        } else {
          let s = t.content.split("</title>", 1)[0];
          s = s.replace(/\s*<title>/, ""), t.title = s, t.content = t.content.replace(/^\s*<title>.*?<\/title>/, "");
        }
    } else if (e == "label" && typeof t.content == "string") {
      if (t.content.match(/^\s*(\\*)label{[^{}]*}/)) {
        let s = t.content.replace(/^\s*(\\*)label{([^{}]*)}.*/s, "$2");
        s = sanitizeXMLattributes(s), t.label = s, t.content = t.content.replace(/^\s*(\\*)label{([^{}]*)}\s*/, "");
      }
    } else if (e == "statements" && o.includes(i)) {
      let s = [], a = {};
      if (typeof t.content == "string")
        s = [{ tag: "text", content: t.content }], a = { tag: "statement", content: s }, t.content = [a];
      else {
        let g = !1;
        if (t.content.forEach((d) => {
          d.tag == "statement" && (g = !0);
        }), !g) {
          let d = "", h = 0;
          for (h = 0; h < t.content.length && (d = t.content[h], !ee.includes(d.tag)); ++h)
            s.push(d);
          a = { tag: "statement", content: s };
          let c = t.content.slice(h);
          c.unshift(a), t.content = c;
        }
      }
    } else if (e != "statements") {
      if (e == "blockquotes" && o.includes(t.tag) && typeof t.content == "string") {
        if (t.content.match(/^\s*\+\+\+sTaRTbQ>/)) {
          let s = t.content.replace(/^\s*\+\+\+sTaRTbQ>/, "");
          s = s.replace(/\n\s*>/g, `
`);
          let a = s.split(/\n{2,}/), g = [];
          a.forEach((d, h) => {
            g.push({ tag: "p", content: d });
          }), t.content = g, t.tag = "blockquote";
        }
      } else if (e == "substructure" && o.includes(t.tag) && typeof t.content == "string") {
        const s = subenvironments[t.tag], a = Ve(s), g = ce(t.content, a);
        t.content = [...g];
      } else if (e == "clean up substructure" && o.includes(t.tag) && Array.isArray(t.content)) {
        const s = t.tag;
        new_content = [], t.content.forEach((a) => {
          subenvironments[s].includes(a.tag) ? new_content.push(a) : a.tag == "text" && a.content.match(/^\s*$/) && "attributes" in a ? "attributes" in t ? t.attributes += a.attributes : t.attributes = a.attributes : a.tag == "text" && a.content.match(/^\s*$/) || (console.log("problem content", a), alert("problem content: see console.log"));
        }), t.content = [...new_content];
      } else if (e == "extraneous math" && o.includes(t.tag) && typeof t.content == "string")
        t.content = t.content.replace(/^\s*\+\+\+saMePaR/, "");
      else if (e == "gather li" && o.includes(t.tag) && typeof t.content == "object") {
        let s = [], a = "", g = 0, d = !1, h = [], c = {};
        for (g = 0; g < t.content.length; ++g)
          a = t.content[g], !d && a.tag != "li" ? s.push(a) : !d && a.tag == "li" ? (d = !0, h = [a], c.tag = a.parenttag) : d && a.tag == "li" ? h.push(a) : d && a.tag != "li" && (c.content = [...h], s.push({ ...c }), d = !1, c = {}, h = [], s.push(a));
        d && (c.content = h, s.push({ ...c })), d = !1, h = [], c = {}, t.content = s;
      } else if (e == "absorb math" && (o.includes(t.tag) || t.tag == u) && typeof t.content == "object") {
        let s = [], a = "", g = 0;
        for (g = 0; g < t.content.length; ++g) {
          a = t.content[g];
          const d = s.length;
          J.includes(a.tag) ? d == 0 ? s.push({ ...a }) : s[d - 1].tag != "p" ? s.push({ ...a }) : typeof s[d - 1].content == "string" ? (s[d - 1].content = [{ tag: "text", content: s[d - 1].content }], s[d - 1].content.push({ ...a })) : s[d - 1].content.push({ ...a }) : a.tag == "p" ? typeof a.content == "string" && a.content.match(/\s*\+\+\+saMePaR/) ? (a.content = a.content.replace(/\s*\+\+\+saMePaR\s*/, ""), s[d - 1].content.push({ tag: "text", content: a.content })) : typeof a.content == "string" ? s.push({ ...a }) : a.content.length > 0 && a.content[0].tag == "text" && typeof a.content[0].content == "string" && a.content[0].content.match(/\s*\+\+\+saMePaR/) ? (a.content[0].content = a.content[0].content.replace(/\s*\+\+\+saMePaR\s*/, ""), a.content.forEach((h) => {
            s[d - 1].content.push(h);
          })) : a.content.length > 0 && s.push({ ...a }) : s.push({ ...a });
        }
        t.content = [...s];
      }
    }
    let l = { ...t };
    return l.content = E(l.content, e, r + 1, n, o, l.tag), l;
  } else {
    if (typeof t != "string" && (console.log("what is it", t), alert("non-object non-string: ", t)), e == "do_nothing")
      return t + "X";
    if (e == "fonts" && o.includes(i)) {
      let l = "";
      return l = t.replace(/\\('|"|\^|`|~|-|c|H|u|v) ?([a-zA-Z])/mg, ye), l = l.replace(/\\('|"|\^|`|~|-|c|H|u|v){([a-zA-Z])}/mg, ye), l;
    } else if (e == "texlike" && o.includes(i)) {
      let l = "";
      return l = t.replace(/([^-])\-\-([^-])/mg, "$1<mdash/>$2"), l = l.replace(/\bLaTeX\b/mg, "<latex/>"), l = l.replace(/\bTeX\b/mg, "<tex/>"), l = l.replace(/\bPreTeXt\b/mg, "<pretext/>"), l = l.replace(/([^\\])~/mg, "$1<nbsp/>"), l = l.replace(/\(\\(ref|eqref|cite){([^{}]+)}\)/g, function(s, a, g) {
        return '<xref ref="' + sanitizeXMLattributes(g) + '"/>';
      }), l = l.replace(/\\(ref|eqref|cite){([^{}]+)}/g, function(s, a, g) {
        return '<xref ref="' + sanitizeXMLattributes(g) + '"/>';
      }), l = l.replace(/\\(q|term|em|emph|m|c|fn){([^{}]+)}/g, "<$1>$2</$1>"), l = l.replace(/\\(url|href){([^{}]+)}({|\[)([^{}\[\]]+)(\]|})/g, function(s, a, g, d, h) {
        return '<url href="' + g + '">' + h + "</url>";
      }), l = l.replace(/\\(url|href){([^{}]+)}([^{]|$)/g, function(s, a, g) {
        return '<url href="' + g + '"/>';
      }), l;
    } else
      return t;
  }
  return p;
};
var m = {
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
    note: "align",
    speechnote: "system",
    MathMLnote: "system"
  },
  "derivation:": {
    alternative: [],
    type: "multiline",
    params: [
      "system",
      "&beforeFirstRelation"
    ],
    //    "seperateOut": true,  // don;t know what this did (but it put closing math delimiters in the wrong place)
    absorbEmptyLine: !0,
    emptyLineBeforeIndent: !0,
    note: "align",
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
      "1,4": "#2  #3 &  #4"
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
      "1,3": " #2 &  #3"
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
}, st = {
  iiint: "∭",
  iint: "∬",
  int: "∫",
  oiiint: "∰",
  oiint: "∯",
  oint: "∮"
}, pt = {
  sum: "∑",
  union: "⋃",
  intersection: "⋂",
  oplus: "⨁",
  otimes: "⨂",
  coprod: "∐",
  prod: "∏"
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
], mt = ["∑", "⋃", "⋂", "⨁", "⨂", "∐", "∏", "∮", "∭", "∬", "∫", "∰", "∯", "∮"], je = [
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
], Q = ct.slice();
for (const t of je)
  Q.push(t[0]);
console.debug("greedyfunctions", Q);
var gt = [
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
for (const t of je)
  m[t[0]] = {
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
  }, m["base" + t[0]] = {
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
for (const t of gt)
  m[t[1]] = {
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
for (const t of ut)
  m[t[0]] = {
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
var dt = {
  text: {
    LaTeX: ["", ""],
    MathML: ["", ""],
    Speech: ["", ""],
    PTX: ["", ""]
  },
  m: {
    LaTeX: ["\\(", "\\)"],
    MathML: ["<math>", "</math>"],
    Speech: ["<em>", "</em>"],
    PTX: ["<m>", "</m>"]
  },
  md: {
    LaTeX: ["\\[", "\\]"],
    MathML: ['<math display="block">', "</math>"],
    Speech: ["<em>", "</em>"],
    PTX: ["<md>", "</md>"]
  }
};
function ht(t) {
  return t.replace(/\s\s+/g, " ");
}
function Ze(t) {
  return /^[0-9\.,]+$/.test(t);
}
function ft(t) {
  return /^[a-zA-Z]+$/.test(t);
}
function be(t) {
  return /^&[a-zA-Z]+;$/.test(t);
}
function yt(t) {
  return /^[0-9\.,].*[a-zA-Z]$/.test(t);
}
function bt(t) {
  return Ze(t) || t.length == 1 || t.trim() in m && m[t.trim()].type == "symbol";
}
function S(t, e) {
  if (yt(t)) {
    let n = t.replace(/[a-zA-Z]+$/, ""), o = t.replace(/^[0-9\.,]+/, "");
    console.debug("found mixed", t, "with parts", n, ",", o), n = S(n, e), o = S(o, e);
    let i = "";
    return e == "MathML" ? i = "<mo>&InvisibleTimes;</mo>" : e == "Speech" && (i = " times "), n + i + o;
  }
  let r = t;
  return console.debug("markAtomicItem of", r, "endans", be(t)), e == "MathML" && (Ze(t) ? r = "<mn>" + r + "</mn>" : be(t) ? r = "<mi>" + r + "</mi>" : ft(t) ? r = r.replace(/(.)/g, "<mi>$1</mi>") : mt.includes(t) ? r = "<mo>" + r + "</mo>" : t.includes("mtext") || r != "" && (r = "<unknown>" + r + "</unknown>", console.warn("unknown type", "X" + r + "X"))), r;
}
function vt(t) {
  let e = t;
  console.debug("   starting to simplify Answer", e);
  for (let r = 0; r <= 2; ++r)
    e = e.replace(/to the quantity([A-Z]?) +negative 1 +([A-Z]?)endquantity/g, "inverse"), e = e.replace(/to the quantity([A-Z]?) +2 +([A-Z]?)endquantity/g, "squared"), e = e.replace(/power +2 +/g, "squared "), e = e.replace(/(^| )quantity([A-Z]?) +([^ ]+) +([A-Z]?)endquantity/g, " $3 "), e = e.replace(/(^| )quantity([A-Z]?) +(negative +[^ ]+) +([A-Z]?)endquantity/g, " $3 "), e = e.replace(/<mrow ([^<>]+)><(mi|mo|mn)>([^<>]+)(<\/(mi|mo|mn)>)<\/mrow>/g, "<$2 $1>$3$4"), e = e.replace(/<mrow>(<([a-z]+)>)([^<>]+)(<\/$2>)<\/mrow>/g, "$1$3$4"), console.debug("now ans", e), e = e.replace(/<mrow>(<mi>)([^<>]+)(<\/mi>)<\/mrow>/g, "$1$2$3"), e = e.replace(/<mrow>(<mo>)([^<>]+)(<\/mo>)<\/mrow>/g, "$1$2$3"), e = e.replace(/<mrow>(<mn>)([^<>]+)(<\/mn>)<\/mrow>/g, "$1$2$3"), e = e.replace(/(<mrow[^<>]*>)<mrow>([^w]*)<\/mrow>(<\/mrow>)/g, "$1$2$3"), console.debug("removed layer", r, "to get", e);
  return e = e.replace(/quantity([A-Z]?)/g, "quantity"), e = e.replace(/([A-Z]?)endquantity([A-Z]?)/g, "endquantity"), e = e.replace(/(quantity *)quantity([^q]*)endquantity( *endquantity)/g, "$1$2$3"), e = e.replace(/(quantity *)quantity([^q]*)endquantity( *endquantity)/g, "$1$2$3"), e.endsWith("\\") && (e += " "), e;
}
function wt(t) {
  let e = t;
  return e = $t(e), e = kt(e), console.debug("after preprocessarithmetic", e), e = Lt(e), e = Mt(e), console.debug("before other", e), e = Tt(e), console.debug("after other", e), e;
}
function $t(t) {
  let e = t;
  return e = e.replace(/(\s|\$|^)"(\S[^"]+)"(\s|\$|$)/g, xt), e;
}
function xt(t, e, r, n, o, i) {
  return e + "quote(␣" + r.replaceAll(" ", "␣") + "␣)" + n;
}
function kt(t) {
  let e = t;
  e = e.replace(/-->/g, "longrightarrow"), e = e.replace(/->/g, "to"), e = e.replace(/<--/g, "longleftarrow"), e = e.replace(/<-/g, "from"), e = e.replace(/(\$| |\(|\^|_)[\-\−]([^ +])/g, "$1😑$2"), e = e.replace(/(^|\$|\(|\[|\{) *[\-\−]/, "$1😑"), e = e.replace(/([^ \(\)\[\]\{\}\$]*[+\-][^ \(\)\[\]\{\}\$]*[^ \)\]}\/])(\/\/)/g, "($1)//"), e = e.replace(/\/\/([^ \(\[{\/][^ \(\)\[\]\{\}\$]*[+\-][^ \(\)\[\]\{\}\$]*)/g, "//($1)"), e = e.replace(/([^ \(\)\[\]\{\}\$]*[^ \)\]}\/])(\/)/g, "❲$1❳/"), e = e.replace(/\/([^ \(\[{\/][^ \)\]\}\n\$]*)/g, "/❲$1❳"), console.debug("after preprocess fractions", "A" + e + "B");
  for (const i of Q) {
    var r = "(^|[ \\(\\[\\{])" + i + " ([^ \\(\\)\\[\\]\\{\\}]+)", n = r + "($|[ \\(\\)\\[\\]\\{\\}])", o = new RegExp(n, "g");
    e = e.replace(o, "$1" + i + "⁅$2⁆$3");
  }
  return console.debug("after wrapping greedy arguments", "A" + e + "B"), e = _t(e), console.debug("before operators", e), e = qt(e), e = Et(e), console.debug("after operators", e), e = e.replace(/([0-9a-zA-Z])(\+|-|\+-|-\+)([0-9a-zA-Z])/g, "$1 $2 $3"), e = e.replace(/ \* /g, " ⭐ "), console.debug("before sub and sup grouping", e), e = e.replace(/\^([^ ❲❳\/\(\[{][^ \"❲❳\/\(\)\[\]\{\}\$]*)/, "^❲$1❳"), console.debug("after exponents once ", e), e = e.replace(/\^([^ ❲❳\/\(\[{][^ \"❲❳\/\(\)\[\]\{\}\$]*)/, "^❲$1❳"), console.debug("after exponents twice", e), e = e.replace(/_([^ ❲❳\/\(\[{\$][^ \"❲❳\/\^\(\)\[\]\{\}\$]*)/, "_❲$1❳"), e = e.replace(/_([^ ❲❳\/\(\[{\$][^ \"❲❳\/\^\(\)\[\]\{\}\$]*)/, "_❲$1❳"), console.debug("after subscript twice", e), e = At(e), e = e.replace(/([0-9])([a-zA-Z])/g, "$1 $2"), console.debug("after implied number letter multiplication", e), e = e.replace(/([0-9])([\(\[\{])/g, "$1 $2"), e = e.replace(/(_[\(❲][^❲❳\(\)]+)[\)❳]\(/g, "$1) ⚡ ("), e = e.replace(/([\^▲][\(❲][^❲❳\(\)]+)[\)❳]\(/g, "$1) ⚡ ("), e = e.replace(/(_[\(❲][^❲❳\(\)]+)[\)❳]\(/g, "$1) ⚡ ("), e = e.replace(/([\^▲][\(❲][^❲❳\(\)]+)[\)❳]\(/g, "$1) ⚡ ("), e = e.replace(/(_\(\([^❲❳\(\)]+)\)\)\(/g, "$1)) ⚡ ("), e = e.replace(/(\^\(\([^❲❳\(\)]+)\)\)\(/g, "$1)) ⚡ ("), e;
}
function Lt(t) {
  let e = t;
  return e = e.replace(/(\$| )\(([^,()]+)\, +([^,()]+)\)/g, "$1($2) oointerval ($3)"), e = e.replace(/(\$| )gcd\( *([^,()]+)\, *([^,()]+) *\)/g, "$1($2) innergcd ($3)"), e = e.replace(/(\$| )\( ([^,()]+)\, *([^,()]+) \)/g, "$1($2) gcd ($3)"), e = e.replace(/(\$| )\(([^ ][^,()]*)\,([^ ][^,()]*)\)/g, "$1($2) cartesianpoint ($3)"), e;
}
function Mt(t) {
  let e = t;
  return e = e.replace(/(^| )< ([^<>|]+) >/g, "$1span($2)"), console.debug("did we find span?", e), e = e.replace(/(^| )<([^<>|]+) \| ([^<>|]+)>/g, "$1($2) grouppresentation ($3)"), e = e.replace(/(^| |\(){([^{}|]+) \| ([^{}|]+)}/g, "$1($2) setbuilder ($3)"), e = e.replace(/(^| ){([^{}]+)}/g, "$1setof($2)"), e = e.replace(/(^| )<([^,<>|]+)\|([^,<>|]+)>/g, "$1($2) braket ($3)"), e = e.replace(/(^| )<([^,<>]+)\, ([^,<>]+)>/g, "$1($2) twovector ($3)"), console.debug("looking for vector", e), e = e.replace(/(^| )<([^ ,<>][^,<>]*)\, ([^<>]+)>/g, "$1vector($2, $3)"), console.debug("did we find vector?", e), e = e.replace(/(^| |\n)<([^ ][^,<>]*)\,([^ ][^<>]*)>/g, "$1($2) innerproduct ($3)"), e = e.replace(/(^| )<([^<>]+)>/g, "$1anglebrackets($2)"), e;
}
function _t(t) {
  let e = t;
  return e = e.replace(/([^\^\(\[\{❲])(\'+)/g, "$1▲❲$2❳"), e = e.replace(/(lim(|inf|sup))_([\(\[\{❲])/g, "$1$3"), e = e.replace(/(lim(|inf|sup))_([^ \(\[\{❲][^ ]+)/g, "$1($3)"), e;
}
function qt(t) {
  let e = t;
  for (let [p, l] of Object.entries(st))
    if (e.includes(p)) {
      p = "\\\\?" + p;
      var r = `(^| |
)` + p + "\\_\\(([^()]+)\\)\\^\\(([^()]+)\\) ?(.*?)", n = r + ` d([a-z]+)( |
|$)`, o = r + ` ❲d([a-z]+)❳/❲([^❲❳]+)❳( |
|$)`;
      console.debug("regExStr", n), console.debug("regExStrWeight", o);
      var i = new RegExp(o, "g");
      e = e.replace(i, "$1wrapper(intlimsweight(" + l + ")($2)($3)($4)($5)($6))$7");
      var u = new RegExp(n, "g");
      e = e.replace(u, "$1wrapper(intlims(" + l + ")($2)($3)($4)($5))$6"), r = `(^| |
)` + p + "\\_([^ ]+?)\\^([^ ]+) (.*?)", n = r + ` d([a-z]+)( |
|$)`, o = r + ` ❲d([a-z]+)❳/❲([^❲❳]+)❳( |
|$)`, console.debug("regExStr", n), console.debug("regExStrWeight", o), i = new RegExp(o, "g"), e = e.replace(i, "$1wrapper(intlimsweight(" + l + ")($2)($3)($4)($5)($6))$7"), u = new RegExp(n, "g"), e = e.replace(u, "$1wrapper(intlims(" + l + ")($2)($3)($4)($5))$6"), r = `(^| |
)` + p + "\\_\\(\\(([^()]+?)\\)\\) (.*?)", n = r + " d([a-z]+)( |\\$)", o = r + " ❲d([a-z]+)❳/❲([^ $]+)❳( |$)", i = new RegExp(o, "g"), e = e.replace(i, "$1wrapper(intllimweight(" + l + ")(($2))($3)($4)($5))$6"), u = new RegExp(n, "g"), e = e.replace(u, "$1wrapper(intllim(" + l + ")(($2))($3)($4))$5"), r = "(^| )" + p + "\\_\\(([^()]+?)\\) (.*?)", n = r + " d([a-z]+)( |\\$)", o = r + " ❲d([a-z]+)❳/❲([^ $]+)❳( |$)", i = new RegExp(o, "g"), e = e.replace(i, "$1wrapper(intllimweight(" + l + ")($2)($3)($4)($5))$6"), u = new RegExp(n, "g"), e = e.replace(u, "$1wrapper(intllim(" + l + ")($2)($3)($4))$5"), r = `(^| |
)` + p + "\\_([^ ]+?) (.*?)", n = r + " d([a-z]+)( |\\$)", o = r + " ❲d([a-z]+)❳/❲([^ $]+)❳( |$)", i = new RegExp(o, "g"), e = e.replace(i, "$1wrapper(intllimweight(" + l + ")($2)($3)($4)($5))$6"), u = new RegExp(n, "g"), console.debug("final regExStr", n), e = e.replace(u, "$1wrapper(intllim(" + l + ")($2)($3)($4))$5");
    }
  return console.debug("did we find integral?", e), e;
}
function At(t) {
  let e = t;
  console.debug("looking for powers of known functions");
  for (let i of Q) {
    var r = "(^|[ \\(\\[\\{])" + ("\\\\?" + i) + "\\^❲([^❲❳]*)❳", n = r + " *([\\(\\[\\{][^\\(\\)\\[\\]\\{\\}]+[\\)\\]\\}])", o = new RegExp(n, "g");
    e = e.replace(o, "$1wrapper❲functionpower(base" + i + ")($2)$3❳"), n = r + " ([^ \\$\\(\\)\\[\\]\\{\\}]+)", o = new RegExp(n, "g"), e = e.replace(o, "$1wrapper❲functionpower(base" + i + ")($2)wrapper❲$3❳❳");
  }
  console.debug("processed powers of functions", e);
  for (let i of Q) {
    var r = "(^|[\\$ \\(\\[\\{])" + ("\\\\?" + i) + "\\_❲([^❲❳]*)❳", n = r + " *([\\(\\[\\{][^\\(\\)\\[\\]\\{\\}]+[\\)\\]\\}])", o = new RegExp(n, "g");
    e = e.replace(o, "$1wrapper❲functionsubscript(base" + i + ")($2)$3❳"), n = r + " ([^ \\$\\(\\)\\[\\]\\{\\}]+)", o = new RegExp(n, "g"), e = e.replace(o, "$1wrapper❲functionsubscript(base" + i + ")($2)wrapper❲$3❳❳");
  }
  return e;
}
function Et(t) {
  let e = t;
  for (let [o, i] of Object.entries(pt))
    if (e.includes(o)) {
      o = "\\\\?" + o;
      var r = "(^| )" + o + "\\_[\\[\\(\\{]([^ ]+)[\\]\\)\\}]\\^[\\[\\(\\{]([^ ]+)[\\]\\)\\}]", n = new RegExp(r, "g");
      e = e.replace(n, "$1opwrap(limsop(" + i + ")($2)($3))⚡");
      var r = "(^|\\$| )" + o + "\\_[\\[\\(\\{]([^ ]+)[\\]\\)\\}]\\^([^ ]+)", n = new RegExp(r, "g");
      e = e.replace(n, "$1opwrap(limsop(" + i + ")($2)($3))⚡"), r = "(\\b)" + o + "\\_([^ ]+)\\^([^ ]+)", console.debug("regExStr", r), n = new RegExp(r, "g"), e = e.replace(n, "$1opwrap(limsop(" + i + ")($2)($3))⚡"), r = "(^|\\$| )" + o + "\\_[\\[\\(\\{]([^ ]+)[\\]\\)\\}]", console.debug("regExStr", r), n = new RegExp(r, "g"), e = e.replace(n, "$1opwrap(llimop(" + i + ")($2))⚡"), r = "(^|\\$| )" + o + "\\_([^ ]+)", console.debug("regExStr for llimop", r), n = new RegExp(r, "g"), e = e.replace(n, "$1opwrap(llimop(" + i + ")($2))⚡"), r = "(^|\\$| )" + o + "( |\\$)", console.debug("regExStr", r), n = new RegExp(r, "g"), e = e.replace(n, "$1opwrap(bigop(" + i + "))$2⚡");
    }
  return e;
}
function Tt(t) {
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
function St(t) {
  let e = t;
  return e = e.replace(/</g, "⦉"), e = e.replace(/>/g, "⦊"), e;
}
function Nt(t) {
  let e = t;
  return e = e.replace(/⦉/g, "<"), e = e.replace(/⦊/g, ">"), e;
}
function Pt(t) {
  let e = t;
  return e = e.replace(/\$\$\s*([^\$]+)\s*\$\$/g, '<md sourcetag="dd">$1</md>'), e = e.replace(/\\\[/g, '<md sourcetag="sb">'), e = e.replace(/\\\]/g, "</md>"), e = e.replace(/(^|\s|-)\$([^\$\f\r\n]+)\$(\s|\.|,|;|:|\?|!|$)/g, '$1<m sourcetag="d">$2</m>$3'), e = e.replace(/(^|\s|-)\$([^\$\f\r\n]+)\$(\s|\.|,|;|:|\?|!|-|$)/g, '$1<m sourcetag="d">$2</m>$3'), e = e.replace(/\\\(/g, '<m sourcetag="sp">'), e = e.replace(/\\\)/g, "</m>"), e;
}
String.prototype.myHash = function() {
  var t = 0, e, r;
  if (this.length === 0) return t;
  for (e = 0; e < this.length; e++)
    r = this.charCodeAt(e), t = (t << 5) - t + r, t |= 0;
  return t;
};
function Rt(t) {
  let e;
  t = "<bbbb>" + t + "</bbbb>", typeof t == "string" ? e = new DOMParser().parseFromString(t, "text/xml") : e = t, console.debug("xml", e), console.debug("xml.nodeName", e.nodeName, "xml.nodeType", e.nodeType), e.nodeValue, e.nodeType == 9 && (e = e.documentElement);
  let r = [];
  for (const n of e.childNodes) {
    let o = [];
    n.nodeName == "#text" ? (o.push("text"), o.push(""), o.push(n.nodeValue)) : (o.push(n.nodeName), o.push(n.attributes), o.push(n.innerHTML)), o.push(o[2].myHash()), r.push(o);
  }
  return r;
}
function Bt(t) {
  let e = t;
  e = Pt(e), console.debug("str with tags", e);
  let r = Rt(e);
  return console.debug("this_node_content", r), r;
}
function Xt(t, e, r = "MathML") {
  let n = "";
  for (const o of t) {
    let i = dt[o[0]];
    console.debug("element", o), console.debug("componentdict", e), console.debug(r, "tags", i);
    const u = o[3] + "," + r;
    console.debug("contentkey", u);
    let p = e[u][2];
    n += i[r][0] + p + i[r][1];
  }
  return n;
}
function zt(t, e) {
  let r = t.trim();
  return r = r.replace(/␣/g, " "), e == "Speech" ? (r = r.replace(/(^| |\n)\$([^$]+)\$( |\.|\,|:|;|\?|\!|\n|$)/g, "$1&nbsp;&nbsp;<em>$2</em>&nbsp;&nbsp;$3"), r = r.replace(/(^| |\n)\$([^$]+)\$( |\.|\,|:|;|\?|\!|\n|$)/g, "$1&nbsp;&nbsp;<em>$2</em>&nbsp;&nbsp;$3"), r = r.replace(/(^| |\n)\$([^$]+)\$( |\.|\,|:|;|\?|\!|\n|$)/g, "$1&nbsp;&nbsp;<em>$2</em>&nbsp;&nbsp;$3"), r = r.replace(/\$\$(.+?)\$\$/sg, `
<em>$1</em>
`), r = r.replace(/\\,/g, " "), r = r.replace(/∏/g, "product"), r = r.replace(/∑/g, "sum")) : e == "MathML" && (r = r.replace(/\$\$(.+?)\$\$/sg, `
<math display="block">$1</math>
`), r = r.replace(/(^| |\n)\$\$(.+?)\$\$( |\.|\,|:|;|\?|\!|\n|$)/g, `
<math display="block">$2</math>$3
`), r = r.replace(/(^| |\n)\$(.+?)\$( |\.|\,|:|;|\?|\!|\n|$)/g, `
<math>$2</math>$3
`), r = r.replace(/\\,/g, ""), r = r.replace(/<wrap([^>]+)>(<m[a-z]+[^<>]*)(>[^<>]*<\/m[a-z]+>)<\/wrap>/g, "$2$1$3"), r = r.replace(/<wrap /g, "<mrow "), r = r.replace(/<\/wrap>/g, "</mrow>")), r;
}
class Ot {
  constructor() {
    this.cache = [], this.cacheSize = 500, this.nonCache = [], this.nonCacheSize = 500, this.multilineList = [];
  }
  getAllMultiLine() {
    if (this.multilineList.length == 0)
      for (let e of Object.keys(m))
        m[e].type == "multiline" && this.multilineList.push(e);
    return this.multilineList;
  }
  getItem(e) {
    if (e == " " || e == "")
      return -1;
    for (let r = this.cache.length - 1; r >= 0; r--)
      if (this.cache[r][0] === e)
        return this.cache[r][1];
    if (this.nonCache.includes(e))
      return -1;
    for (let r of Object.keys(m)) {
      let n = m[r].alternative;
      if (n) {
        for (let o of n)
          if (o == e)
            return this.cache.push([e, r]), this.cache.length > this.cacheSize && this.cache.shift(), r;
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
let F = document.getElementById("sourceTextArea"), ve = document.getElementById("echosourceTextArea"), te = document.getElementById("mathmlTextArea");
document.getElementById("pretextTextArea");
let we = document.getElementById("speechTextArea");
document.getElementById("MathJaxArea");
let re = document.getElementById("mathmlDisplayArea"), me = new Ot();
var ne;
F.addEventListener && F.addEventListener("input", function() {
  ve && (ve.value = ie(F.value, "LaTeX")), we && (we.innerHTML = '" ' + ie(F.value, "Speech") + ' "'), (te || re) && (ne = ie(F.value, "MathML"), te && (te.value = ne), re && (re.innerHTML = ne));
}, !1);
class k {
  /*
    constructor(position, value, key = null, parent = null, conversiontarget) {
  */
  constructor(e, r, n = null, o = null, i = "unknown") {
    this.position = e, this.value = r, this.outputvalue = r, this.key = n, this.parent = o, this.conversiontarget = i, this.children = [], this.pair = [], this.noPriority = !1, this.exPriority = !1;
  }
  insert(e, r = e) {
    return this.children.push(new k(this.children.length, e, r, this, this.conversiontarget)), !0;
  }
  insertNode(e) {
    return e.parent = this, e.position = this.children.length, this.children.push(e), !0;
  }
  addLeafMarkup() {
    console.debug("   adding leaf markup with key, val, oval", this.key, "a,a", this.value, "b,b", this.outputvalue, "to", this), this.key == null ? this.outputvalue = S(this.value, this.conversiontarget) : this.key == " " ? this.position == 1 ? (console.info("assuming implied multiplication"), console.info("What is next to this space key? parent:", this.parent, "left sibling", this.parent.children[0], "left sibling value", this.parent.children[0].value, "right sibling", this.parent.children[2]), this.conversiontarget == "MathML" ? this.outputvalue = "<mo>&InvisibleTimes;</mo>" : this.conversiontarget == "Speech" && (this.outputvalue = " times ")) : this.outputvalue = S(this.value, this.conversiontarget) : this.key == "quote" ? this.position == 1 && (this.outputvalue = this.value) : this.key == "" ? (console.debug("item with empty key.  Is this function apply?", this), this.position == 1 ? (console.debug("What is nect to this enpty key? parent:", this.parent, "left sibling", this.parent.children[0], "right sibling", this.parent.children[2]), this.parent.children[2].pair.length > 0 && (this.conversiontarget == "MathML" ? this.outputvalue = "<mo>&ApplyFunction;</mo>" : this.conversiontarget == "Speech" && (this.outputvalue = " of "))) : this.position == 0 ? this.conversiontarget == "Speech" ? this.outputvalue = " " + S(this.value, this.conversiontarget) : this.outputvalue = S(this.value, this.conversiontarget) : this.outputvalue = S(this.value, this.conversiontarget)) : m[this.key].type == "operator" ? this.value != this.key ? this.outputvalue = S(this.value, this.conversiontarget) : this.outputvalue = S(this.value, this.conversiontarget) : this.key == "," ? (console.debug("found comma with parent", this.parent), this.position == 1 && (this.outputvalue = "COMMA")) : m[this.key].type == "symbol" ? console.debug("found a symbol") : m[this.key].type == "relation" ? (console.debug("found a relation"), this.value != this.key ? this.outputvalue = S(this.value, this.conversiontarget) : this.outputvalue = S(this.value, this.conversiontarget)) : m[this.key].type == "function" && (console.debug("found a function"), this.value != this.key ? (console.debug("marking the argument of a function", this.value, "within", this), this.outputvalue = S(this.value, this.conversiontarget)) : this.outputvalue = S(this.value, this.conversiontarget)), console.debug("   and now leaf is key, val, oval", this.key, ",", this.value, ",", this.outputvalue);
  }
  combine(e) {
    for (let r of this.children)
      r && r.combine(e);
    if (this.isLeaf) {
      try {
        console.debug("isLeaf with key", this.key, "pair", this.pair, "parent children", this.parent.children, "of length", this.parent.children.length, "what we want", this.parent.children[2].pair, "ee", this);
      } catch {
        console.debug("isLeaf with key", this.key, "pair", this.pair, "this", this);
      }
      console.debug("the root", this.treeRoot), this.value.length > 1 && (this.value = this.value.trim()), this.addLeafMarkup();
    } else {
      console.debug("not a Leaf", this.pair, this);
      let r = this.children[0].key, n, o, i = this.children.length, u = 0;
      for (; this.children[u].value != r; )
        u++;
      if (r == " ")
        this.children.length > 1 && this.children[1].value == r ? (r == " " && (r = "\\,"), n = this.children[0].value + r + this.children[2].value, console.debug("adding Oo to", this, "because of", this.children[0]), o = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, this.key && this.key != " " && m[this.key].type != "function" && !m[this.key].wrappedarguments && m[this.key].priority > 20 && (console.debug("maybe wrapping this.key", this.key, "for", o), this.conversiontarget == "MathML" ? o = "<mrow>" + o + "</mrow>" : this.conversiontarget == "Speech" && (console.debug("AddIng quantity", this), o = "quantityS " + o + " Sendquantity"))) : (o = this.children[1].outputvalue, n = this.children[1].value);
      else if (r == "")
        console.debug("  found an empty key", this), this.children.length > 1 && this.children[1].value == r ? (o = this.children[0].outputvalue + this.children[1].outputvalue + this.children[2].outputvalue, n = this.children[0].value + this.children[1].value + this.children[2].value) : (o = this.children[1].outputvalue, n = this.children[1].value);
      else {
        console.debug("about to use conversiontarget", this.conversiontarget);
        try {
          console.debug("               trying to extract using key", r, "position", u, "numberOfSiblings", i, "from", this, "with rule of", u + 1 + "," + i), this.conversiontarget == "MathML" ? (n = m[r].rule[u + 1 + "," + i], o = m[r].ruleML[u + 1 + "," + i], console.debug("               attempted       MathML conversion: ", n, "newOutputValue", o)) : this.conversiontarget == "Speech" ? (n = m[r].rule[u + 1 + "," + i], o = m[r].speech[u + 1 + "," + i]) : (n = m[r].rule[u + 1 + "," + i], o = m[r].rule[u + 1 + "," + i]);
        } catch {
          n = m[r].rule[u + 1 + "," + i], o = m[r].rule[u + 1 + "," + i], console.debug("                      MathML conversion failed on", n);
        }
        if (n.includes("#comma?") && (this.key && m[this.key].type == "operator" && m[this.key].priority < 0 ? n = n.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$1") : n = n.replace(/#comma\?\[(\S*)\&(\S*)\]$/, "$2")), n.includes("#{}")) {
          let p = !0, l = this;
          for (["^^", "__"].includes(l.key) && (p = !1); l.parent && isScriptPure(l.key); )
            l = l.parent, ["^^", "__"].includes(l.key) && (p = !1);
          p ? n = n.replace("#{}", "{}") : n = n.replace("#{}", "");
        }
        for (let p = 0; p < this.children.length; p++) {
          let l = this.children[p].value, s = this.children[p].outputvalue, a = l, g = s;
          n.includes("#@" + (p + 1)) && (a.length > 1 && (a = "{" + a + "}"), n = n.replace("#@" + (p + 1), a), o = o.replace("#@" + (p + 1), g)), e.includes("caseEnvironment") ? (n = n.replace("#&", "&"), o = o.replace("#&", "&")) : (n = n.replace("#&\\text{", "\\text{ "), n = n.replace("#&", ""), o = o.replace("#&\\text{", "\\text{ "), o = o.replace("#&", "")), n = n.replace("#" + (p + 1) + "@1", l[0]), n = n.replace("#" + (p + 1) + "@-1", l.substring(1)), n = n.replace("#" + (p + 1), l), o = o.replace("#" + (p + 1) + "@1", s[0]), o = o.replace("#" + (p + 1) + "@-1", s.substring(1)), o = o.replace("#" + (p + 1), s);
        }
      }
      this.value = n, this.outputvalue = o, this.children = [];
    }
    if (this.parent && m[this.key] && m[this.key].offpair) {
      let r = this.parent.children.length, n = 0;
      for (console.debug(r, "this.key", this.key, "this", this, "this.parent", this.parent); this.parent.children[n].value != this.key; )
        console.debug(n, "this.parent.children[position]", this.parent.children[n]), n++;
      console.debug("dictionary[this.key].offpair", m[this.key].offpair, "looking for", n + 1 + "," + r, "containing", this.position + 1, "in", m[this.key].offpair[n + 1 + "," + r]), m[this.key].offpair[n + 1 + "," + r] && m[this.key].offpair[n + 1 + "," + r].includes(this.position + 1) && this.pair.pop();
    }
    if (this.pair && this.pair.length > 0 && (console.debug("this.pair[0]", this.pair[0]), this.pair[0] = jt(this.pair, this.conversiontarget), this.pair[0].length > 0)) {
      console.debug("this.pair[0]", this.pair[0]);
      for (let r of this.pair)
        if (this.value = r[0] + this.value + r[1], this.conversiontarget == "MathML") {
          if (console.debug("((((adding parentheses to", this.outputvalue, "of", this), this.outputvalue.length > 18 && (this.outputvalue = "<mrow>" + this.outputvalue + "</mrow>"), !this.key || this.key == " " || !m[this.key].delimitedarguments) {
            let n = this.outputvalue;
            r[0] != "" && (n = '<mo stretchy="false">' + r[0] + "</mo>" + n), r[1] != "" && (n = n + '<mo stretchy="false">' + r[1] + "</mo>"), this.outputvalue = n;
          }
        } else this.conversiontarget == "Speech" ? bt(this.outputvalue) || (console.debug("adding quantity", this), this.outputvalue = "quantityP " + this.outputvalue + " Pendquantity") : (!this.key || this.key == " " || !m[this.key].delimitedarguments) && (this.outputvalue = r[0] + this.outputvalue + r[1]);
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
class It {
  constructor(e, r, n, o) {
    this.root = new k(e, r, n, null, o), console.debug("       Tree 0 conversiontarget", o);
  }
  *preOrderTraversal(e = this.root) {
    if (yield e, e.children.length)
      for (let r of e.children)
        yield* this.preOrderTraversal(r);
  }
  *postOrderTraversal(e = this.root) {
    if (e.children.length)
      for (let r of e.children)
        yield* this.postOrderTraversal(r);
    yield e;
  }
  insert(e, r, n = r) {
    console.debug("       Tree 1 conversiontarget", this.conversiontarget);
    for (let o of this.preOrderTraversal())
      if (console.debug("trying Tree1 node", o), o.value === e)
        return o.children.push(new k(r, n, o, conversiontarget)), !0;
    return !1;
  }
  remove(e) {
    for (let r of this.preOrderTraversal()) {
      const n = r.children.filter((o) => o.value !== e);
      if (n.length !== r.children.length)
        return r.children = n, !0;
    }
    return !1;
  }
  find(e) {
    for (let r of this.preOrderTraversal())
      if (r.value === e) return r;
  }
  // refactor to combine this and the following, so the tree is only traversed once
  adjustImpliedMultiplication() {
    let e = ["lim", "quote", "dollar"], r = ["quote", "cent"];
    for (let n of this.preOrderTraversal())
      e.includes(n.value) && e.includes(n.key) && n.position == 0 && (console.debug("found a lim", n), console.debug("now looking at", n.parent, "and", n.parent.children[0], "and", n.parent.children[1]), n.parent.parent && n.parent.parent.children[1].key == " " && n.parent.parent.children[1].value == " " && (console.error("adding hello", n.parent.parent.children[1]), n.parent.parent.children[1].key = "✂️", console.error("now", n.parent.parent.children[1]))), r.includes(n.value) && r.includes(n.key) && n.position == 0 && (console.debug("found a quote", n), console.debug("now looking at parent", n.parent, "and itself", n.parent.children[0], "and parent parent", n.parent.parent), n.parent.parent && n.parent.parent.parent && n.parent.parent.parent.children[1].key == " " && n.parent.parent.parent.children[1].value == " " ? (console.error("adding goodbye", n.parent.parent.parent.children[1]), n.parent.parent.parent.children[1].key = "✂️", console.error("now", n.parent.parent.parent.children[1])) : n.parent && n.parent.parent && n.parent.parent.children[1].key == " " && n.parent.parent.children[1].value == " " && (console.error("adding goodbye", n.parent.parent.children[1]), n.parent.parent.children[1].key = "✂️", console.error("now", n.parent.parent.children[1])));
  }
  combineSubSup() {
    for (let e of this.preOrderTraversal())
      e.value === "" && e.key === "^" && e.position == 0 && (e.children.length > 1 && e.children[0].key == "_" ? (e.parent.children[2].key = "subsup", e.parent.children[2].position = 3, e.parent.children[1] = e.children[2], e.parent.children[1].key = "subsup", e.parent.children[1].position = 2, e.parent.children[1].parent = e.parent, e.parent.children.unshift(e.children[0]), e.parent.children[0].key = "subsup", e.parent.children[0].position = 0, e.parent.children[0].parent = e.parent, e.parent.children[1] = e.children[1], e.parent.children[1].key = "subsup", e.parent.children[1].value = "subsup", e.parent.children[1].position = 1, e.parent.children[1].parent = e.parent) : console.debug("no children"));
  }
  addParents() {
    for (let e of this.preOrderTraversal())
      for (const r of e.children)
        r.parent != e && (r.parent = e);
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
function jt(t, e) {
  let r = t[0];
  return console.debug("adjusting brackets", r), e == "LaTeX" && (r[0] == "{" && (r[0] = ["\\{"]), r[1] == "}" && (r[1] = ["\\}"])), r[0] == "⁅" && (r = []), r[0] == "❲" && (r[0] = [""]), r[1] == "❳" && (r[1] = [""]), r;
}
function $e(t) {
  return t === void 0 ? "undefined" : t === null ? "null" : t == "" ? "es" : t.replaceAll(" ", "␣");
}
function Ce(t, e) {
  if (console.debug("printTree of", t), !t)
    return "";
  let r = e + "[" + $e(t.key) + "]   |" + $e(t.value) + "|";
  if (t.pair.length && (r += "    " + t.pair[0] + " " + t.pair.length), t.children.length == 0 ? r += "    leaf" : t.parent != null ? r += "       " + t.parent.children.length : r += "       nuLL", r += `
`, t.children.length == 0)
    return r;
  {
    t.children.length;
    let n = r;
    for (let o = 0; o < t.children.length; ++o)
      n += Ce(t.children[o], e + "    ");
    return n;
  }
}
function G(t, e, r) {
  console.debug("starting M2TreeConvert  conversiontarget", r);
  let n = new It(0, t, null, r), o = "", i = n.root, u = !0, p, l = [], s = {};
  for (console.debug("continuing M2TreeConvert  conversiontarget", r, "on", t); u; ) {
    let a = i.value;
    console.debug("fullStr", "X" + a + "X");
    let g = 0, d = 0, h = 0, c, b;
    for (; a.length > h; ) {
      let y = a[h], v = !1, _ = !1;
      for (let f of [['"', '"']])
        if (y == f[0]) {
          console.debug("found a quote");
          let w = xe(a, h, f[0], f[1], [[f[0]]]);
          if (w != -1) {
            let $ = [a.substring(0, h), a.substring(h + 1, w), a.substring(w + 1)];
            console.debug("children are", $), i.value = "";
            let M = new k(0, "\\ \\ \\text{" + $[1] + "}\\ \\ ", "justatest", null, r);
            if (r == "MathML" ? M = new k(0, '<mspace width="0.8em"/></mspace><mtext>' + $[1] + '</mtext><mspace width="0.8em"/></mspace>', "quote", null, r) : r == "Speech" && (M = new k(0, "␣text " + $[1] + " endtext␣", null, null, r)), console.debug("qNode was", M, "with children", M.children), M = H($[0], M, r), console.debug("qNode is", M, "with children", M.children), console.debug("stackedTreeNode was", p), p = D(p, M, r), console.debug("stackedTreeNode is", p, "with children", p.children), l.length > 0) {
              p.key = l[0][0].children[0].key;
              let X = l[0][0].children.pop();
              l[0][0].insertNode(p), l[0][0].insertNode(X), l[0][1]--, l[0][1] == 0 && l.shift(), p = void 0;
            }
            a = a.substring(w + 1), h = 0, d = 0, c = void 0, b = void 0, v = !0;
          }
        }
      if (Dt(y)) {
        console.debug("apparently found a left of pair", y);
        let f = Vt(a, h);
        if (f != -1) {
          let w = [a.substring(0, h), a.substring(h + 1, f), a.substring(f + 1)];
          i.value = "";
          let $ = G(w[1].trim(), e, r)[0].root;
          if ($.pair.push([y, a[f]]), $ = H(w[0], $, r), console.debug("just made pNode", $), p = D(p, $, r), console.debug("just made stackedTreeNode", p), l.length > 0) {
            p.key = l[0][0].children[0].key;
            let M = l[0][0].children.pop();
            l[0][0].insertNode(p), l[0][0].insertNode(M), l[0][1]--, l[0][1] == 0 && l.shift(), p = void 0;
          }
          a = a.substring(f + 1), h = 0, d = 0, c = void 0, b = void 0, v = !0;
        }
      }
      if (y == "<" && a[h + 1] != " ") {
        console.debug("looking for an angle pair");
        let f = Qt(a, h);
        if (f != -1) {
          let w = [a.substring(0, h), a.substring(h + 1, f), a.substring(f + 1)];
          i.value = "";
          let $ = G(w[1].trim(), e, r)[0].root;
          if ($.pair.push(["\\langle ", "\\rangle "]), $ = H(w[0], $, r), p = D(p, $, r), l.length > 0) {
            p.key = l[0][0].children[0].key;
            let M = l[0][0].children.pop();
            l[0][0].insertNode(p), l[0][0].insertNode(M), l[0][1]--, l[0][1] == 0 && l.shift(), p = void 0;
          }
          a = a.substring(f + 1), h = 0, d = 0, c = void 0, b = void 0, v = !0, console.debug("keyType", b);
        }
      }
      console.debug("OUT j", d, "on", "X" + a + "X", "woith counter", h);
      for (let f = d; f <= h; f++) {
        if (console.debug("inner j", f, "on", "X" + a + "X", "counter", h), a[h + 1] && a[h].match(/[A-Za-z␣]/g) && a[h + 1].match(/[A-Za-z␣]/g)) {
          console.debug("  contuing because building up a word on", a[h], "and", a[h + 1], "so far", a.substring(f, h + 1));
          continue;
        }
        let w = a.substring(f, h + 1), $ = Ft(a, w, h, p);
        if (console.debug("subStr", w, "type", $), $) {
          c = w, g = f, b = $, _ = !0, console.debug("A keyType", b, "with key", "X" + c + "X", "from subStr", w);
          break;
        }
        if (w == " " && (h >= 1 || i.parent && i.parent.children.length == 2 && i.position == 1 || p) && !Ht(Wt(a, h))) {
          c = w, g = f, b = "space", _ = !0, console.debug("B keyType", b);
          break;
        } else
          console.debug("     maybe breaking on multiword subStr", w);
      }
      if (_)
        break;
      v || (h++, y.match(/[\s\d]/g) && (d = h));
    }
    if (console.debug("is there a" + c + "key?"), c) {
      console.debug("yes, there is there a" + c + "key"), !m[c] && c != " " && c != "" && (c = me.getItem(c)), console.debug("and now it is" + c + "key of", b, "keyType");
      let y, v, _, f;
      switch (b) {
        case "space":
        case "operator":
        //operators
        case "relation":
          if (y = [a.substring(0, g), c, a.substring(h + 1)], !1 & b == "relation" && e.includes("&beforeFirstRelation") && !s["&beforeFirstRelation"] && (s["&beforeFirstRelation"] = !0, y[2] = "&" + y[2]), v = new k(0, y[0], c, null, r), _ = new k(0, y[1], c, null, r), f = new k(0, y[2], c, null, r), p && (p = Ct(v.value, p, r), v = p, v.key = c, p = void 0), b == "space" && l.length > 0) {
            i.value = y[0], f.key = l[0][0].children[0].key, l[0][0].insertNode(f), i = l[0][0].children[l[0][0].children.length - 1], l[0][1]--, l[0][1] == 0 && l.shift();
            break;
          }
          let w = !0;
          (De(c) || Fe(c)) && (b != "space" && y[0].length == 0 || a[g - 1]) && a[h + 1] && a[g - 1] != " " && a[h + 1] != " " && (w = !1);
          let $ = oe(c), M = !1;
          b != "space" && m[c].script && ($ -= 0.1, w && (M = !0, v.exPriority = !0, _.exPriority = !0, f.exPriority = !0), w || (w = !0), Ut(i, c) && (w = !1));
          let X = 0;
          if (i.exPriority && !M && (X += 0.2), w && (i.noPriority || $ + X < oe(i.key))) {
            let T = !1;
            for (i.value = v.value, i.children = v.children, i.pair = v.pair, i.exPriority = v.exPriority, i.noPriority = v.noPriority; i.parent; ) {
              let A = i.position;
              if (i = i.parent, X = 0, !M) {
                for (let P of i.children)
                  if (P.exPriority) {
                    X += 0.2;
                    break;
                  }
              }
              if (!i.children[0].noPriority && $ + X >= oe(i.children[0].key)) {
                let P = i.children[A], R = new k(A, null, i.children[0].key, null, r);
                R.noPriority = i.children[A].noPriority, R.exPriority = i.children[A].exPriority, i.children[A] = R, R.parent = i, R.insertNode(P), P.key = c, P.noPriority = _.noPriority, P.exPriority = _.exPriority, R.insertNode(_), R.insertNode(f), i = R.children[2], T = !0;
                break;
              }
            }
            if (!T) {
              let A = new k(0, "", null, null, r);
              n.root.key = c, A.insertNode(n.root), A.insertNode(_), A.insertNode(f), n.root = A, i = n.root.children[2];
            }
          } else
            w || (v.noPriority = !0, _.noPriority = !0, f.noPriority = !0), i.value = "", i.insertNode(v), i.insertNode(_), i.insertNode(f), i = i.children[2];
          break;
        //break case
        case "function":
          y = [a.substring(0, g), c, a.substring(h + 1)], y[2][0] == " " && (y[2] = y[2].substring(1)), v = new k(0, y[0], c, null, r), _ = new k(0, y[1], c, null, r), f = new k(0, y[2], c, null, r), p && (p = H(v.value, p, r), v = p, v.key = c, p = void 0);
          let L = new k();
          if (L.conversiontarget = r, L.value = "", L.insert(c, c), f.key = c, m[c].pairedArgument) {
            let T = xe(a, g, c, m[c].pairedArgument, m[c].family);
            if (T != -1) {
              let A = [a.substring(h + 1, T), a.substring(T + 1)], P = G(A[0].trim(), e, r)[0].root, R = new k(0, A[1], c, null, r);
              L.insertNode(P), L.insertNode(R);
            } else
              L.insertNode(f);
          } else
            L.insertNode(f);
          let O = i;
          i = L.children[L.children.length - 1], v.value.length > 0 && (L = Zt(v, L)), L.value = "", O.parent ? (L.key = O.parent.children[O.position].key, L.position = O.position, L.parent = O.parent, O.parent.children[O.position] = L) : n.root = L, m[c] && m[c].extraArgument && l.push([L, m[c].extraArgument]);
          break;
        case "postfix":
        // such as "!" for factorial.
        case "symbol":
        //symbols
        case "letter":
          y = [a.substring(0, g), c, a.substring(h + 1)], console.debug("making a symbolNode with", y);
          let q = new k();
          if (q.conversiontarget = r, q.value = "", q.insert(c, c), q = H(y[0], q, r), p = D(p, q, r), console.debug("now have stackedTreeNode", p), l.length > 0) {
            p.key = l[0][0].children[0].key;
            let T = l[0][0].children.pop();
            l[0][0].insertNode(p), l[0][0].insertNode(T), l[0][1]--, l[0][1] == 0 && l.shift(), p = void 0;
          }
          i.value = y[2], console.debug("now have currentNode", i);
          break;
        case "multiline":
          y = [a.substring(0, g), c, a.substring(h + 1)];
          let C = new k(0, y[0], null, null, r);
          p = D(p, C, r), i.value = y[2], o = c, console.debug("----------- just set exParam = ", o);
          break;
        case "UNUSED":
          y = [a.substring(0, g), c, a.substring(h + 1)], i.value = y[2];
          break;
      }
    } else {
      if (p) {
        if (a.trim() != "") {
          console.debug("388 M2TreeConvert  conversiontarget", r);
          let v = new k();
          v.conversiontarget = r, p.key = "", v.insertNode(p), v.insert("", ""), v.insert(a, ""), p = v;
        }
        let y = i.position;
        p.position = y, p.key = i.key, i.parent ? (p.parent = i.parent, i.parent.children[y] = p) : n.root = p;
      }
      u = !1;
      break;
    }
  }
  return n.addParents(), console.debug("continuing", n.root.children[0], n.root.children[1]), n.combineSubSup(), console.debug("combineSubSup returned", n, "aa", n.root, "bb", n.root.children), n.adjustImpliedMultiplication(), console.debug("adjustImpliedMultiplication returned", n, "aa", n.root, "bb", n.root.children), console.debug(Ce(n.root, "")), [n, o, s];
}
function D(t, e, r) {
  if (t) {
    console.debug("stackNode M2TreeConvert  stackedTreeNode.conversiontarget", t.conversiontarget);
    let n = new k();
    n.conversiontarget = r, t.key = "", n.insertNode(t), n.insert("", ""), e.key = "", n.insertNode(e), t = n;
  } else
    t = e;
  return t;
}
function H(t, e, r) {
  if (t.trim() != "") {
    console.debug("combinePrev M2TreeConvert  ", t, "xx", e, "cc", r);
    let n = new k();
    n.conversiontarget = r, e.key = "", n.insert(t, ""), n.insert("", ""), n.insertNode(e), e = n, console.debug(" combinePrev pNode.conversiontarget", e);
  }
  return e;
}
function Zt(t, e) {
  return console.debug("combinePrevNode preNode.conversiontarget", t.conversiontarget), t.insert("", ""), t.insertNode(e), t;
}
function Ct(t, e, r) {
  if (t.trim() != "") {
    console.debug("combineAfter M2TreeConvert  conversiontarget", r);
    let n = new k();
    n.conversiontarget = r, e.key = "", n.insertNode(e), n.insert("", ""), n.insert(t, ""), e = n;
  }
  return e;
}
function Ft(t, e, r, n) {
  let o = W(e);
  if (o && !Gt(t, e, r))
    return o.mustHaveLeftArgument && r == 0 && !n ? void 0 : o.type;
}
function W(t) {
  return m[t] ? m[t] : (t = me.getItem(t), t == -1 ? void 0 : m[t]);
}
function Dt(t) {
  return ["(", "[", "{", "⁅", "❲"].includes(t);
}
function Fe(t) {
  let e = W(t);
  return e && e.type == "operator";
}
function Ht(t) {
  for (let e = 1; e <= t.length; e++) {
    let r = t.substring(0, e);
    if (Fe(r) || De(r))
      return !0;
  }
  return !1;
}
function De(t) {
  let e = W(t);
  return e && e.type == "relation";
}
function oe(t) {
  let e = W(t);
  switch (t) {
    case " ":
    case "":
      return 19;
    default:
      return e ? e.priority : 999;
  }
}
function Vt(t, e) {
  if (!["(", "[", "{", "⁅", "❲"].includes(t[e]))
    throw new Error("No" + lp + " at index " + e);
  let r = 1;
  for (let n = e + 1; n < t.length; n++)
    switch (t[n]) {
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
function Qt(t, e) {
  if (!["<"].includes(t[e] || [" "].includes(t[e + 1])))
    throw new Error("No" + lp + " at index " + e);
  let r = 1;
  for (let n = e + 1; n < t.length; n++)
    if (t[n] == "<" && t[n + 1] != " " && r++, t[n] == ">" && t[n - 1] != " " && --r == 0)
      return n;
  return -1;
}
function xe(t, e, r, n, o) {
  if (t.substring(e, e + r.length) != r)
    throw new Error("No " + r + " at index " + e + " of " + t);
  let i = 1;
  for (let u = e + 1; u < t.length; u++) {
    if (t.substring(u, u + n.length) == n && --i == 0)
      return u;
    for (let p of o)
      t.substring(u, u + p.length) == p && t[u - 1].match(/[\s\d]/g) && i++;
  }
  return -1;
}
function Wt(t, e) {
  let r = "";
  for (let n = e + 1; n < t.length; n++)
    switch (t[n]) {
      case `
`:
      case " ":
        break;
      default:
        r += t[n];
    }
  return r;
}
function Gt(t, e, r) {
  for (let n = r + 1; n < t.length && !t[n].match(/[\s\d]/g); n++)
    if (e += t[n], W(e))
      return !0;
  return !1;
}
function Ut(t, e) {
  if (console.debug("checkScriptSimilarity", t), t.pair.length > 0 || t.parent && t.parent.exPriority)
    return !1;
  let r = t;
  for (; r.parent && (r = r.parent, !(r.pair.length > 0 || t.parent && t.parent.exPriority)); )
    if (r.key == e)
      return !0;
  for (r = t.parent; r && r.children[0] && (r = r.children[0], !(r.pair.length > 0 || t.parent && t.parent.exPriority)); )
    if (r.key == e)
      return !0;
  return !1;
}
function Yt(t, e) {
  return console.debug("combineTree2Latex", t, "params", e, "with output", t.root.outputvalue), t.root.combine(e), console.debug("AGAIN combineTree2Latex", t, "params", e, "with output", t.root.outputvalue), t.root.outputvalue;
}
function Kt(t, e, r, n) {
  console.debug("M2LConvert(str,lp,rp, conversiontarget)", t, e, r, n);
  for (let s of me.getAllMultiLine()) {
    let a = t.indexOf(s.slice(0, -1) + "(");
    for (; a != -1; ) {
      let g = er(t, a + s.length - 1, "(", ")");
      if (g != -1) {
        let d = [t.substring(0, a), t.substring(a + s.length, g), t.substring(g + 1)];
        newMiddleStr = s + `
 `, m[s].emptyLineBeforeIndent ? (newMiddleStr += d[1].replaceAll(";", `

 `), newMiddleStr += `
`) : newMiddleStr += d[1].replaceAll(";", `
 `), t = d[0] + newMiddleStr + d[2], a = t.indexOf(s.slice(0, -1) + "(");
      } else
        continue;
    }
  }
  t = t.replaceAll("\\,", ""), t = t.replaceAll("\\:", ""), t = t.replaceAll("\\;", ""), t = t.replaceAll("\\!", ""), t = t.replace(/([a-zA-Z])\\/g, "$1 "), t = t.replaceAll("\\", "");
  let o = t.split(`
`), i = "", u = [], p = "";
  for (; o.length > 0; ) {
    var l = [];
    if (u[0] && m[u[0]].params && (l = m[u[0]].params), console.debug("  ++  ++  ++  ++  ++  ++  ++  ++  ++  ++ "), console.debug("top of loop  ", o), console.debug("params = ", l), o[0].trim() == "" && !l.includes("system") && !l.includes("derivation")) {
      console.info("skipping empty string"), o.shift();
      continue;
    }
    if (l.length > 0 && l.includes("caseEnvironment")) {
      let c = o[0], b = c.split(/(if|when|unless|otherwise)/g);
      b.length != 3 ? console.error("invalid cases line", c) : (c = "casesline(" + b[0] + ")(" + b[1] + ")(" + b[2] + ")", o[0] = c), console.debug("thisLinePieces", b);
    } else if (l.length > 0 && (l.includes("system") || l.includes("derivation"))) {
      let c = o[0];
      for (; o.length > 1 && o[1].trim() != ""; )
        c += o[1], o.splice(1, 1);
      let b = c.split(/(<=|>=|:=|<|>|=|~|≈|approx|asymp).*?/);
      if (b.length > 3) {
        let y = "";
        for (; b.length >= 3; )
          y = b.pop() + y;
        b[2] = y;
      }
      b.length != 3 ? console.error("invalid system/derivation line", c, "with pieces", b) : (b[0].trim() == "" ? c = "derivationline(" + b[1].trim() + ")(" + b[2].trim() + ")" : c = "systemline(" + b[0].trim() + ")(" + b[1].trim() + ")(" + b[2].trim() + ")", o[0] = c), console.debug("thisLine", c, "thisLinePieces", b);
    }
    let s = G(o[0].trim(), l, n);
    console.debug("temp");
    let a = s[0], g = s[1], d = Yt(a, l), h = "";
    l.length && l.includes("caseEnvironment") ? (h = "cases", n == "MathML" || n == "Speech" && (d = " case " + d)) : l.length && (l.includes("system") || l.includes("derivation")) && (l.includes("system") ? h = "system" : l.includes("derivation") && (h = "derivation"), n == "MathML" || n == "Speech" && (d = " line " + d)), o.length > 0 && g.length == 0 && (u.length > 0 && (!m[u[0]].absorbEmptyLine || o[0].trim().length > 0) ? m[u[0]].absorbEmptyLine && o.length > 1 && o[1].trim().length > 0 || o.length == 2 && o[1].trim().length == 0 || o.length == 1 || (m[u[0]].changeLineTurn ? d += m[u[0]].changeLineTurn + `
` : n == "MathML" || (n == "Speech" ? (h == "cases" && (d += ` end_case
`), (h == "system" || h == "derivation") && (d += ` end_line
`)) : d += `\\\\
`)) : o.length > 1 && (m[u[0]] && m[u[0]].absorbEmptyLine && o[0].trim().length == 0 || (d += `
`))), p = o[0], o.shift(), console.debug("============ exParam", g), m[g] && (m[g].seperateOut && (d += r), m[g].noBeginEnd ? d += m[g].note + "{" : n == "MathML" ? (g == "cases:" && (d += '<mrow intent="$table"><mo>{</mo>'), d += '<mtable arg="table" intent=":' + m[g].MathMLnote + `">
`) : n == "Speech" ? d += " begin-" + m[g].speechnote + " " : d += "\\begin{" + m[g].note + "}", u.push(g)), u.length > 0 && o[0] && o[0][0] != " " && (!m[u[0]].emptyLineBeforeIndent || p.trim().length == 0) && (m[u[0]].noBeginEnd ? d += "}" : d += "AA\\end{" + m[u[0]].note + "}", m[u[0]].lineBreak && (d += `
`), m[u[0]].seperateOut && (d += e), u.shift()), i += d;
  }
  for (; u.length > 0; )
    m[u[0]].noBeginEnd ? i += "}" : n == "MathML" ? (i += "</mtable><!-- " + m[u[0]].MathMLnote + ` -->
`, l.length && l.includes("caseEnvironment") && (i += "</mrow>")) : n == "Speech" ? (m[u[0]].note == "cases" && (i += "end_case "), m[u[0]].note == "align" && (i += "end_line "), i += "end-" + m[u[0]].speechnote) : i += "\\end{" + m[u[0]].note + "}", m[u[0]].seperateOut && (i += e), u.shift();
  return console.debug("latexStr", i), ht(i);
}
function ie(t, e) {
  console.debug("converting to target", e);
  let r = St(t), n = Bt(r);
  console.debug("str_separated", n);
  let o = Jt(n, e);
  console.debug("firsttest", o);
  let i = Xt(n, o, e);
  return console.debug("answer_processed", i), console.debug("convertedComponent", o), console.debug(" "), console.debug("*************************************************************"), console.debug(" "), i = zt(i, e), i;
}
function Jt(t, e) {
  let r = {};
  for (const n of t) {
    const o = n[0], i = n[3] + "," + e;
    if (o == "text")
      r[i] = [n[0], n[1], n[2]];
    else if (!(i in r))
      if (o == "m" || o == "md") {
        let u = n[2];
        u = Nt(u), u = wt(u), r[i] = [n[0], n[1], He(u, e)];
      } else
        console.error("unknown piece_type", n);
  }
  return r;
}
function He(t, e) {
  console.debug("starting convertMathSnippet", e, "on", t);
  let r = Kt(t, "LBRACK", "RBRACK", e);
  return r = vt(r), r;
}
function er(t, e, r, n) {
  if (t.substring(e, e + r.length) != r)
    throw new Error("No" + r + " at index " + e);
  for (let o = e + 1; o < t.length; o++)
    switch (t.substring(o, o + n.length)) {
      case n:
        return o;
    }
  return -1;
}
let le = "STart";
le = "";
const se = function(t) {
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t)) {
    let n = "";
    const o = t.tag;
    let i = N[o];
    return i || (i = PTXdisplayoutput(o)), n += i.before_begin + i.begin_tag + le, "attributes" in t && t.attributes && (n += " " + t.attributes.trim()), "label" in t && t.label && (n += ' xml:id="' + t.label + '"'), n += i.after_begin, "title" in t && t.title && (n += "<title>" + t.title + `</title>
`), n + se(t.content) + i.before_end + i.end_tag + i.after_end;
  }
  const e = t;
  let r = "";
  return e.forEach((n, o) => {
    if (typeof n == "string") {
      n.match(/^\s*$/) || (r += "<TEXT>" + n + "</TEXT>", console.log("just added error of", n));
      return;
    }
    let i = "";
    const u = n.tag;
    let p = N[u];
    typeof p > "u" && (p = rr), i = i + p.before_begin + p.begin_tag + le, "attributes" in n && n.attributes && (i += " " + n.attributes.trim()), "label" in n && n.label && (i += ' xml:id="' + n.label + '"'), i += p.after_begin, "title" in n && n.title && (i += "<title>" + n.title + `</title>
`);
    let l = se(n.content);
    u != "text" && (l = l.replace(/^[\r\n]+/, ""), l = l.replace(/[\r\n]+$/, "")), ["c", "code"].includes(u) && (l = ke(l));
    let s = "";
    ["m", "md", "me", "mdn", "men"].includes(u) && (l.match(/^.*(\.|,|;)\s*$/s) && (l = l.replace(/\s*$/, ""), s = l.slice(-1), l = l.slice(0, -1)), l = He(l, "LaTeX"), l = ke(l)), i = i + l, i = i + p.before_end + p.end_tag + s + p.after_end, i.match(/^\s*<p>\s*<\/p>\s*$/) && (console.log("empty p"), i = ""), r = r + i;
  }), r;
}, ke = function(t) {
  let e = t;
  return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e;
};
let ae = document.getElementById("sourceTextArea"), Le = document.getElementById("echosourceTextArea");
document.getElementById("mathmlTextArea");
document.getElementById("pretextTextArea");
document.getElementById("speechTextArea");
document.getElementById("MathJaxArea");
const tr = function(t) {
  return { left: "<" + t + ">", right: "</" + t + ">", tag: t };
}, ge = function(t) {
  return { left: "<" + t, right: "</" + t + ">", tag: t };
}, de = function(t) {
  return { left: "\\begin{" + t + "}", right: "\\end{" + t + "}", tag: t };
}, Ve = function(t) {
  if (!Array.isArray(t))
    return t;
  let e = [];
  return t.forEach((r) => {
    e.push(ge(r)), e.push(de(r));
  }), e;
}, Z = [
  //          {left:"<p>", right:"</p>", tag:"p"},  // for compatibility with PreTeXt!
  { left: "$$", right: "$$", tag: "men" },
  { left: "\\[", right: "\\]", tag: "men" }
];
Je.forEach((t) => {
  Z.push(
    { left: "\\begin{" + t[0] + "}", right: "\\end{" + t[0] + "}", tag: t[1] }
  );
});
Z.push({ left: "<md>", right: "</md>", tag: "md" });
Z.push({ left: "<me>", right: "</me>", tag: "me" });
Z.push({ left: "<mdn", right: "</mdn>", tag: "mdn" });
Z.push({ left: "<men", right: "</men>", tag: "men" });
const j = [];
let Qe = [...Xe], he = [...Qe, ...qe];
he.push("p");
he.push("statement");
Qe.forEach((t) => {
  j.push(ge(t)), j.push(de(t));
});
ze.forEach((t) => {
  j.push(ge(t)), j.push(de(t));
});
let Y = Array.from(j, ({ tag: t }) => t);
Y = [...new Set(Y)];
let I = [
  { left: "\\(", right: "\\)", tag: "m" }
  //          {left:"|", right:"|", tag:"placeholder"}  // just for testing
];
Be.forEach((t) => {
  I.push(tr(t));
});
const Me = {
  begin_tag: "",
  end_tag: "",
  before_begin: "",
  after_begin: "",
  before_end: "",
  after_end: ""
}, rr = {
  begin_tag: "BEGINTAG",
  end_tag: "ENDTAG",
  before_begin: "BB",
  after_begin: "AB",
  before_end: "BE",
  after_end: "AE"
}, N = {
  // start with the quirky ones
  text: Me,
  placeholder: Me,
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
Be.forEach((t) => {
  N[t] = {
    begin_tag: "<" + t + ">",
    end_tag: "</" + t + ">",
    before_begin: "",
    after_begin: "",
    before_end: "",
    after_end: ""
  };
});
he.forEach((t) => {
  N[t] = {
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
});
ze.forEach((t) => {
  N[t] = {
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
});
_e.forEach((t) => {
  N[t] = {
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
});
et.forEach((t) => {
  N[t] = {
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
J.forEach((t) => {
  N[t] = {
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
N.image = {
  begin_tag: "<img",
  end_tag: "</img>",
  // img or image?  should not be a special case?
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
function nr(t, e = "stuff") {
  let r = lt(t), n = "";
  r.match(/^\s*<title>/) ? (n = r.replace(/^\s*<title>(.*?)<\/title>.*/s, "$1"), r = r.replace(/^\s*<title>(.*?)<\/title>/, "")) : r.match(/^\s*\[/) && (n = r.replace(/^\s*\[([^\[\]]*)\].*/s, "$1"), r = r.replace(/^\s*\[([^\[\]]*)\]/, ""));
  let i = r.replace(/([^\s])\\label({|\[|\()/g, `$1
\\label$2`).replace(/\n\n\s*>/g, `

+++sTaRTbQ>`);
  i = i.replace(/(\$\$|\\end{equation}|<\/men>|\\end{align}|\\\]) *\n([^\n])/g, `$1
+++saMePaR$2`);
  let u = i.replace(/(<diagram)(.*?)(<\/diagram>)/sg, function(q, C, T, A) {
    const P = T.replace(/(<|<\/)definition(>)/g, "$1predefinition$2");
    return C + P + A;
  }), p = { tag: e, content: u };
  n && (p.title = n);
  let l = { ...p };
  const s = 12;
  for (let q = 0; q < s; ++q)
    x.forEach((C) => {
      l = B(l, C, 0, q), fe.forEach((T) => {
        l = E(l, T[0], 0, q, T[1]);
      });
    });
  let a = { ...l };
  a = V(a, "all", Y);
  let g = { ...a };
  g = E(g, "oneline environments", 0, 0, "all"), fe.forEach((q) => {
    g = E(g, q[0], 0, 0, q[1]);
  }), g = V(g, "all", Y), g = E(g, "blockquotes", 0, 0, ["p"]);
  let d = { ...g };
  d = E(d, "extract li", 0, 0, "all");
  const h = B(d, I, 0, s + 1, "all", z), c = B(h, "spacelike", 0, s + 1, "all", z), b = B(c, I, 0, s + 1, "all", z), y = B(b, I, 0, s + 1, "all", z), v = E(y, "fonts", 0, 0, z), _ = E(v, "texlike", 0, 0, z);
  let f = B(_, "spacelike", 0, s + 1, "all", z);
  f = B(f, I, 0, s + 1, "all", z), f = B(f, I, 0, s + 1, "all", z);
  const $ = E(f, "extract li", 0, 0, ["p"]), M = E($, "gather li", 0, 0, U), X = E(M, "absorb math", 0, 0, U, "", e);
  let L = E(X, "statements", 0, 0, Ke);
  return console.log("tmp5", L), se(L);
}
ae.addEventListener && ae.addEventListener("input", function() {
  const t = ae.value;
  let e = nr(t, "placeholder");
  Le && (Le.innerText = e);
}, !1);
export {
  nr as FlexTeXtConvert
};
