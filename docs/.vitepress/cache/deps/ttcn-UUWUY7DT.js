import "./chunk-TXPGJST7.js";

// node_modules/@codemirror/legacy-modes/mode/ttcn.js
function words(str) {
  var obj = {}, words2 = str.split(" ");
  for (var i = 0; i < words2.length; ++i)
    obj[words2[i]] = true;
  return obj;
}
var parserConfig = {
  name: "ttcn",
  keywords: words("activate address alive all alt altstep and and4b any break case component const continue control deactivate display do else encode enumerated except exception execute extends extension external for from function goto group if import in infinity inout interleave label language length log match message mixed mod modifies module modulepar mtc noblock not not4b nowait of on optional or or4b out override param pattern port procedure record recursive rem repeat return runs select self sender set signature system template testcase to type union value valueof var variant while with xor xor4b"),
  builtin: words("bit2hex bit2int bit2oct bit2str char2int char2oct encvalue decomp decvalue float2int float2str hex2bit hex2int hex2oct hex2str int2bit int2char int2float int2hex int2oct int2str int2unichar isbound ischosen ispresent isvalue lengthof log2str oct2bit oct2char oct2hex oct2int oct2str regexp replace rnd sizeof str2bit str2float str2hex str2int str2oct substr unichar2int unichar2char enum2int"),
  types: words("anytype bitstring boolean char charstring default float hexstring integer objid octetstring universal verdicttype timer"),
  timerOps: words("read running start stop timeout"),
  portOps: words("call catch check clear getcall getreply halt raise receive reply send trigger"),
  configOps: words("create connect disconnect done kill killed map unmap"),
  verdictOps: words("getverdict setverdict"),
  sutOps: words("action"),
  functionOps: words("apply derefers refers"),
  verdictConsts: words("error fail inconc none pass"),
  booleanConsts: words("true false"),
  otherConsts: words("null NULL omit"),
  visibilityModifiers: words("private public friend"),
  templateMatch: words("complement ifpresent subset superset permutation"),
  multiLineStrings: true
};
var wordList = [];
function add(obj) {
  if (obj) {
    for (var prop in obj)
      if (obj.hasOwnProperty(prop))
        wordList.push(prop);
  }
}
add(parserConfig.keywords);
add(parserConfig.builtin);
add(parserConfig.timerOps);
add(parserConfig.portOps);
var keywords = parserConfig.keywords || {};
var builtin = parserConfig.builtin || {};
var timerOps = parserConfig.timerOps || {};
var portOps = parserConfig.portOps || {};
var configOps = parserConfig.configOps || {};
var verdictOps = parserConfig.verdictOps || {};
var sutOps = parserConfig.sutOps || {};
var functionOps = parserConfig.functionOps || {};
var verdictConsts = parserConfig.verdictConsts || {};
var booleanConsts = parserConfig.booleanConsts || {};
var otherConsts = parserConfig.otherConsts || {};
var types = parserConfig.types || {};
var visibilityModifiers = parserConfig.visibilityModifiers || {};
var templateMatch = parserConfig.templateMatch || {};
var multiLineStrings = parserConfig.multiLineStrings;
var indentStatements = parserConfig.indentStatements !== false;
var isOperatorChar = /[+\-*&@=<>!\/]/;
var curPunc;
function tokenBase(stream, state) {
  var ch = stream.next();
  if (ch == '"' || ch == "'") {
    state.tokenize = tokenString(ch);
    return state.tokenize(stream, state);
  }
  if (/[\[\]{}\(\),;\\:\?\.]/.test(ch)) {
    curPunc = ch;
    return "punctuation";
  }
  if (ch == "#") {
    stream.skipToEnd();
    return "atom";
  }
  if (ch == "%") {
    stream.eatWhile(/\b/);
    return "atom";
  }
  if (/\d/.test(ch)) {
    stream.eatWhile(/[\w\.]/);
    return "number";
  }
  if (ch == "/") {
    if (stream.eat("*")) {
      state.tokenize = tokenComment;
      return tokenComment(stream, state);
    }
    if (stream.eat("/")) {
      stream.skipToEnd();
      return "comment";
    }
  }
  if (isOperatorChar.test(ch)) {
    if (ch == "@") {
      if (stream.match("try") || stream.match("catch") || stream.match("lazy")) {
        return "keyword";
      }
    }
    stream.eatWhile(isOperatorChar);
    return "operator";
  }
  stream.eatWhile(/[\w\$_\xa1-\uffff]/);
  var cur = stream.current();
  if (keywords.propertyIsEnumerable(cur))
    return "keyword";
  if (builtin.propertyIsEnumerable(cur))
    return "builtin";
  if (timerOps.propertyIsEnumerable(cur))
    return "def";
  if (configOps.propertyIsEnumerable(cur))
    return "def";
  if (verdictOps.propertyIsEnumerable(cur))
    return "def";
  if (portOps.propertyIsEnumerable(cur))
    return "def";
  if (sutOps.propertyIsEnumerable(cur))
    return "def";
  if (functionOps.propertyIsEnumerable(cur))
    return "def";
  if (verdictConsts.propertyIsEnumerable(cur))
    return "string";
  if (booleanConsts.propertyIsEnumerable(cur))
    return "string";
  if (otherConsts.propertyIsEnumerable(cur))
    return "string";
  if (types.propertyIsEnumerable(cur))
    return "typeName.standard";
  if (visibilityModifiers.propertyIsEnumerable(cur))
    return "modifier";
  if (templateMatch.propertyIsEnumerable(cur))
    return "atom";
  return "variable";
}
function tokenString(quote) {
  return function(stream, state) {
    var escaped = false, next, end = false;
    while ((next = stream.next()) != null) {
      if (next == quote && !escaped) {
        var afterQuote = stream.peek();
        if (afterQuote) {
          afterQuote = afterQuote.toLowerCase();
          if (afterQuote == "b" || afterQuote == "h" || afterQuote == "o")
            stream.next();
        }
        end = true;
        break;
      }
      escaped = !escaped && next == "\\";
    }
    if (end || !(escaped || multiLineStrings))
      state.tokenize = null;
    return "string";
  };
}
function tokenComment(stream, state) {
  var maybeEnd = false, ch;
  while (ch = stream.next()) {
    if (ch == "/" && maybeEnd) {
      state.tokenize = null;
      break;
    }
    maybeEnd = ch == "*";
  }
  return "comment";
}
function Context(indented, column, type, align, prev) {
  this.indented = indented;
  this.column = column;
  this.type = type;
  this.align = align;
  this.prev = prev;
}
function pushContext(state, col, type) {
  var indent = state.indented;
  if (state.context && state.context.type == "statement")
    indent = state.context.indented;
  return state.context = new Context(indent, col, type, null, state.context);
}
function popContext(state) {
  var t = state.context.type;
  if (t == ")" || t == "]" || t == "}")
    state.indented = state.context.indented;
  return state.context = state.context.prev;
}
var ttcn = {
  name: "ttcn",
  startState: function() {
    return {
      tokenize: null,
      context: new Context(0, 0, "top", false),
      indented: 0,
      startOfLine: true
    };
  },
  token: function(stream, state) {
    var ctx = state.context;
    if (stream.sol()) {
      if (ctx.align == null)
        ctx.align = false;
      state.indented = stream.indentation();
      state.startOfLine = true;
    }
    if (stream.eatSpace())
      return null;
    curPunc = null;
    var style = (state.tokenize || tokenBase)(stream, state);
    if (style == "comment")
      return style;
    if (ctx.align == null)
      ctx.align = true;
    if ((curPunc == ";" || curPunc == ":" || curPunc == ",") && ctx.type == "statement") {
      popContext(state);
    } else if (curPunc == "{")
      pushContext(state, stream.column(), "}");
    else if (curPunc == "[")
      pushContext(state, stream.column(), "]");
    else if (curPunc == "(")
      pushContext(state, stream.column(), ")");
    else if (curPunc == "}") {
      while (ctx.type == "statement")
        ctx = popContext(state);
      if (ctx.type == "}")
        ctx = popContext(state);
      while (ctx.type == "statement")
        ctx = popContext(state);
    } else if (curPunc == ctx.type)
      popContext(state);
    else if (indentStatements && ((ctx.type == "}" || ctx.type == "top") && curPunc != ";" || ctx.type == "statement" && curPunc == "newstatement"))
      pushContext(state, stream.column(), "statement");
    state.startOfLine = false;
    return style;
  },
  languageData: {
    indentOnInput: /^\s*[{}]$/,
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    autocomplete: wordList
  }
};
export {
  ttcn
};
//# sourceMappingURL=ttcn-UUWUY7DT.js.map
