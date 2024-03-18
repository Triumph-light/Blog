"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function f(e){return{type:e,style:"keyword"}}var C=f("keyword a"),W=f("keyword b"),g=f("keyword c"),J=f("operator"),z={type:"atom",style:"atom"},y={type:"attribute",style:"attribute"},c=f("typedef"),B={if:C,while:C,else:W,do:W,try:W,return:g,break:g,continue:g,new:g,throw:g,var:f("var"),inline:y,static:y,using:f("import"),public:y,private:y,cast:f("cast"),import:f("import"),macro:f("macro"),function:f("function"),catch:f("catch"),untyped:f("untyped"),callback:f("cb"),for:f("for"),switch:f("switch"),case:f("case"),default:f("default"),in:J,never:f("property_access"),trace:f("trace"),class:c,abstract:c,enum:c,interface:c,typedef:c,extends:c,implements:c,dynamic:c,true:z,false:z,null:z},E=/[+\-*&%=<>!?|]/;function I(e,r,n){return r.tokenize=n,n(e,r)}function H(e,r){for(var n=!1,i;(i=e.next())!=null;){if(i==r&&!n)return!0;n=!n&&i=="\\"}}var c,L;function p(e,r,n){return c=e,L=n,r}function A(e,r){var n=e.next();if(n=='"'||n=="'")return I(e,r,K(n));if(/[\[\]{}\(\),;\:\.]/.test(n))return p(n);if(n=="0"&&e.eat(/x/i))return e.eatWhile(/[\da-f]/i),p("number","number");if(/\d/.test(n)||n=="-"&&e.eat(/\d/))return e.match(/^\d*(?:\.\d*(?!\.))?(?:[eE][+\-]?\d+)?/),p("number","number");if(r.reAllowed&&n=="~"&&e.eat(/\//))return H(e,"/"),e.eatWhile(/[gimsu]/),p("regexp","string.special");if(n=="/")return e.eat("*")?I(e,r,Q):e.eat("/")?(e.skipToEnd(),p("comment","comment")):(e.eatWhile(E),p("operator",null,e.current()));if(n=="#")return e.skipToEnd(),p("conditional","meta");if(n=="@")return e.eat(/:/),e.eatWhile(/[\w_]/),p("metadata","meta");if(E.test(n))return e.eatWhile(E),p("operator",null,e.current());var i;if(/[A-Z]/.test(n))return e.eatWhile(/[\w_<>]/),i=e.current(),p("type","type",i);e.eatWhile(/[\w_]/);var i=e.current(),u=B.propertyIsEnumerable(i)&&B[i];return u&&r.kwAllowed?p(u.type,u.style,i):p("variable","variable",i)}function K(e){return function(r,n){return H(r,e)&&(n.tokenize=A),p("string","string")}}function Q(e,r){for(var n=!1,i;i=e.next();){if(i=="/"&&n){r.tokenize=A;break}n=i=="*"}return p("comment","comment")}var N={atom:!0,number:!0,variable:!0,string:!0,regexp:!0};function $(e,r,n,i,u,s){this.indented=e,this.column=r,this.type=n,this.prev=u,this.info=s,i!=null&&(this.align=i)}function R(e,r){for(var n=e.localVars;n;n=n.next)if(n.name==r)return!0}function X(e,r,n,i,u){var s=e.cc;for(a.state=e,a.stream=u,a.marked=null,a.cc=s,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;){var k=s.length?s.pop():b;if(k(n,i)){for(;s.length&&s[s.length-1].lex;)s.pop()();return a.marked?a.marked:n=="variable"&&R(e,i)?"variableName.local":n=="variable"&&Y(e,i)?"variableName.special":r}}}function Y(e,r){if(/[a-z]/.test(r.charAt(0)))return!1;for(var n=e.importedtypes.length,i=0;i<n;i++)if(e.importedtypes[i]==r)return!0}function F(e){for(var r=a.state,n=r.importedtypes;n;n=n.next)if(n.name==e)return;r.importedtypes={name:e,next:r.importedtypes}}var a={state:null,column:null,marked:null,cc:null};function x(){for(var e=arguments.length-1;e>=0;e--)a.cc.push(arguments[e])}function t(){return x.apply(null,arguments),!0}function j(e,r){for(var n=r;n;n=n.next)if(n.name==e)return!0;return!1}function V(e){var r=a.state;if(r.context){if(a.marked="def",j(e,r.localVars))return;r.localVars={name:e,next:r.localVars}}else if(r.globalVars){if(j(e,r.globalVars))return;r.globalVars={name:e,next:r.globalVars}}}var ee={name:"this",next:null};function D(){a.state.context||(a.state.localVars=ee),a.state.context={prev:a.state.context,vars:a.state.localVars}}function S(){a.state.localVars=a.state.context.vars,a.state.context=a.state.context.prev}S.lex=!0;function l(e,r){var n=function(){var i=a.state;i.lexical=new $(i.indented,a.stream.column(),e,null,i.lexical,r)};return n.lex=!0,n}function o(){var e=a.state;e.lexical.prev&&(e.lexical.type==")"&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}o.lex=!0;function d(e){function r(n){return n==e?t():e==";"?x():t(r)}return r}function b(e){return e=="@"?t(P):e=="var"?t(l("vardef"),_,d(";"),o):e=="keyword a"?t(l("form"),h,b,o):e=="keyword b"?t(l("form"),b,o):e=="{"?t(l("}"),D,Z,o,S):e==";"?t():e=="attribute"?t(M):e=="function"?t(w):e=="for"?t(l("form"),d("("),l(")"),ae,d(")"),o,b,o):e=="variable"?t(l("stat"),te):e=="switch"?t(l("form"),h,l("}","switch"),d("{"),Z,o,o):e=="case"?t(h,d(":")):e=="default"?t(d(":")):e=="catch"?t(l("form"),D,d("("),G,d(")"),b,o,S):e=="import"?t(U,d(";")):e=="typedef"?t(ne):x(l("stat"),h,d(";"),o)}function h(e){return N.hasOwnProperty(e)||e=="type"?t(v):e=="function"?t(w):e=="keyword c"?t(O):e=="("?t(l(")"),O,d(")"),o,v):e=="operator"?t(h):e=="["?t(l("]"),m(O,"]"),o,v):e=="{"?t(l("}"),m(ue,"}"),o,v):t()}function O(e){return e.match(/[;\}\)\],]/)?x():x(h)}function v(e,r){if(e=="operator"&&/\+\+|--/.test(r))return t(v);if(e=="operator"||e==":")return t(h);if(e!=";"){if(e=="(")return t(l(")"),m(h,")"),o,v);if(e==".")return t(ie,v);if(e=="[")return t(l("]"),h,d("]"),o,v)}}function M(e){if(e=="attribute")return t(M);if(e=="function")return t(w);if(e=="var")return t(_)}function P(e){if(e==":"||e=="variable")return t(P);if(e=="(")return t(l(")"),m(re,")"),o,b)}function re(e){if(e=="variable")return t()}function U(e,r){if(e=="variable"&&/[A-Z]/.test(r.charAt(0)))return F(r),t();if(e=="variable"||e=="property"||e=="."||r=="*")return t(U)}function ne(e,r){if(e=="variable"&&/[A-Z]/.test(r.charAt(0)))return F(r),t();if(e=="type"&&/[A-Z]/.test(r.charAt(0)))return t()}function te(e){return e==":"?t(o,b):x(v,d(";"),o)}function ie(e){if(e=="variable")return a.marked="property",t()}function ue(e){if(e=="variable"&&(a.marked="property"),N.hasOwnProperty(e))return t(d(":"),h)}function m(e,r){function n(i){return i==","?t(e,n):i==r?t():t(d(r))}return function(i){return i==r?t():x(e,n)}}function Z(e){return e=="}"?t():x(b,Z)}function _(e,r){return e=="variable"?(V(r),t(T,q)):t()}function q(e,r){if(r=="=")return t(h,q);if(e==",")return t(_)}function ae(e,r){return e=="variable"?(V(r),t(oe,h)):x()}function oe(e,r){if(r=="in")return t()}function w(e,r){if(e=="variable"||e=="type")return V(r),t(w);if(r=="new")return t(w);if(e=="(")return t(l(")"),D,m(G,")"),o,T,b,S)}function T(e){if(e==":")return t(fe)}function fe(e){if(e=="type"||e=="variable")return t();if(e=="{")return t(l("}"),m(le,"}"),o)}function le(e){if(e=="variable")return t(T)}function G(e,r){if(e=="variable")return V(r),t(T)}const ce={name:"haxe",startState:function(e){var r=["Int","Float","String","Void","Std","Bool","Dynamic","Array"],n={tokenize:A,reAllowed:!0,kwAllowed:!0,cc:[],lexical:new $(-e,0,"block",!1),importedtypes:r,context:null,indented:0};return n},token:function(e,r){if(e.sol()&&(r.lexical.hasOwnProperty("align")||(r.lexical.align=!1),r.indented=e.indentation()),e.eatSpace())return null;var n=r.tokenize(e,r);return c=="comment"?n:(r.reAllowed=!!(c=="operator"||c=="keyword c"||c.match(/^[\[{}\(,;:]$/)),r.kwAllowed=c!=".",X(r,n,c,L,e))},indent:function(e,r,n){if(e.tokenize!=A)return 0;var i=r&&r.charAt(0),u=e.lexical;u.type=="stat"&&i=="}"&&(u=u.prev);var s=u.type,k=i==s;return s=="vardef"?u.indented+4:s=="form"&&i=="{"?u.indented:s=="stat"||s=="form"?u.indented+n.unit:u.info=="switch"&&!k?u.indented+(/^(?:case|default)\b/.test(r)?n.unit:2*n.unit):u.align?u.column+(k?0:1):u.indented+(k?0:n.unit)},languageData:{indentOnInput:/^\s*[{}]$/,commentTokens:{line:"//",block:{open:"/*",close:"*/"}}}},se={name:"hxml",startState:function(){return{define:!1,inString:!1}},token:function(e,r){var u=e.peek(),n=e.sol();if(u=="#")return e.skipToEnd(),"comment";if(n&&u=="-"){var i="variable-2";return e.eat(/-/),e.peek()=="-"&&(e.eat(/-/),i="keyword a"),e.peek()=="D"&&(e.eat(/[D]/),i="keyword c",r.define=!0),e.eatWhile(/[A-Z]/i),i}var u=e.peek();return r.inString==!1&&u=="'"&&(r.inString=!0,e.next()),r.inString==!0?(e.skipTo("'")||e.skipToEnd(),e.peek()=="'"&&(e.next(),r.inString=!1),"string"):(e.next(),null)},languageData:{commentTokens:{line:"#"}}};exports.haxe=ce;exports.hxml=se;
