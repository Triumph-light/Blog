"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var h=function(){function e(z){return{type:z,style:"keyword"}}for(var n=e("operator"),t={type:"atom",style:"atom"},i={type:"punctuation",style:null},c={type:"axis_specifier",style:"qualifier"},a={",":i},g=["after","all","allowing","ancestor","ancestor-or-self","any","array","as","ascending","at","attribute","base-uri","before","boundary-space","by","case","cast","castable","catch","child","collation","comment","construction","contains","content","context","copy","copy-namespaces","count","decimal-format","declare","default","delete","descendant","descendant-or-self","descending","diacritics","different","distance","document","document-node","element","else","empty","empty-sequence","encoding","end","entire","every","exactly","except","external","first","following","following-sibling","for","from","ftand","ftnot","ft-option","ftor","function","fuzzy","greatest","group","if","import","in","inherit","insensitive","insert","instance","intersect","into","invoke","is","item","language","last","lax","least","let","levels","lowercase","map","modify","module","most","namespace","next","no","node","nodes","no-inherit","no-preserve","not","occurs","of","only","option","order","ordered","ordering","paragraph","paragraphs","parent","phrase","preceding","preceding-sibling","preserve","previous","processing-instruction","relationship","rename","replace","return","revalidation","same","satisfies","schema","schema-attribute","schema-element","score","self","sensitive","sentence","sentences","sequence","skip","sliding","some","stable","start","stemming","stop","strict","strip","switch","text","then","thesaurus","times","to","transform","treat","try","tumbling","type","typeswitch","union","unordered","update","updating","uppercase","using","validate","value","variable","version","weight","when","where","wildcards","window","with","without","word","words","xquery"],r=0,o=g.length;r<o;r++)a[g[r]]=e(g[r]);for(var d=["xs:anyAtomicType","xs:anySimpleType","xs:anyType","xs:anyURI","xs:base64Binary","xs:boolean","xs:byte","xs:date","xs:dateTime","xs:dateTimeStamp","xs:dayTimeDuration","xs:decimal","xs:double","xs:duration","xs:ENTITIES","xs:ENTITY","xs:float","xs:gDay","xs:gMonth","xs:gMonthDay","xs:gYear","xs:gYearMonth","xs:hexBinary","xs:ID","xs:IDREF","xs:IDREFS","xs:int","xs:integer","xs:item","xs:java","xs:language","xs:long","xs:Name","xs:NCName","xs:negativeInteger","xs:NMTOKEN","xs:NMTOKENS","xs:nonNegativeInteger","xs:nonPositiveInteger","xs:normalizedString","xs:NOTATION","xs:numeric","xs:positiveInteger","xs:precisionDecimal","xs:QName","xs:short","xs:string","xs:time","xs:token","xs:unsignedByte","xs:unsignedInt","xs:unsignedLong","xs:unsignedShort","xs:untyped","xs:untypedAtomic","xs:yearMonthDuration"],r=0,o=d.length;r<o;r++)a[d[r]]=t;for(var f=["eq","ne","lt","le","gt","ge",":=","=",">",">=","<","<=",".","|","?","and","or","div","idiv","mod","*","/","+","-"],r=0,o=f.length;r<o;r++)a[f[r]]=n;for(var m=["self::","attribute::","child::","descendant::","descendant-or-self::","parent::","ancestor::","ancestor-or-self::","following::","preceding::","following-sibling::","preceding-sibling::"],r=0,o=m.length;r<o;r++)a[m[r]]=c;return a}();function p(e,n,t){return n.tokenize=t,t(e,n)}function u(e,n){var t=e.next(),i=!1,c=_(e);if(t=="<"){if(e.match("!--",!0))return p(e,n,T);if(e.match("![CDATA",!1))return n.tokenize=N,"tag";if(e.match("?",!1))return p(e,n,E);var a=e.eat("/");e.eatSpace();for(var g="",r;r=e.eat(/[^\s\u00a0=<>\"\'\/?]/);)g+=r;return p(e,n,S(g,a))}else{if(t=="{")return s(n,{type:"codeblock"}),null;if(t=="}")return l(n),null;if(b(n))return t==">"?"tag":t=="/"&&e.eat(">")?(l(n),"tag"):"variable";if(/\d/.test(t))return e.match(/^\d*(?:\.\d*)?(?:E[+\-]?\d+)?/),"atom";if(t==="("&&e.eat(":"))return s(n,{type:"comment"}),p(e,n,w);if(!c&&(t==='"'||t==="'"))return p(e,n,v(t));if(t==="$")return p(e,n,I);if(t===":"&&e.eat("="))return"keyword";if(t==="(")return s(n,{type:"paren"}),null;if(t===")")return l(n),null;if(t==="[")return s(n,{type:"bracket"}),null;if(t==="]")return l(n),null;var o=h.propertyIsEnumerable(t)&&h[t];if(c&&t==='"')for(;e.next()!=='"';);if(c&&t==="'")for(;e.next()!=="'";);o||e.eatWhile(/[\w\$_-]/);var d=e.eat(":");!e.eat(":")&&d&&e.eatWhile(/[\w\$_-]/),e.match(/^[ \t]*\(/,!1)&&(i=!0);var f=e.current();return o=h.propertyIsEnumerable(f)&&h[f],i&&!o&&(o={type:"function_call",style:"def"}),A(n)?(l(n),"variable"):((f=="element"||f=="attribute"||o.type=="axis_specifier")&&s(n,{type:"xmlconstructor"}),o?o.style:"variable")}}function w(e,n){for(var t=!1,i=!1,c=0,a;a=e.next();){if(a==")"&&t)if(c>0)c--;else{l(n);break}else a==":"&&i&&c++;t=a==":",i=a=="("}return"comment"}function v(e,n){return function(t,i){var c;if(D(i)&&t.current()==e)return l(i),n&&(i.tokenize=n),"string";if(s(i,{type:"string",name:e,tokenize:v(e,n)}),t.match("{",!1)&&x(i))return i.tokenize=u,"string";for(;c=t.next();)if(c==e){l(i),n&&(i.tokenize=n);break}else if(t.match("{",!1)&&x(i))return i.tokenize=u,"string";return"string"}}function I(e,n){var t=/[\w\$_-]/;if(e.eat('"')){for(;e.next()!=='"';);e.eat(":")}else e.eatWhile(t),e.match(":=",!1)||e.eat(":");return e.eatWhile(t),n.tokenize=u,"variable"}function S(e,n){return function(t,i){if(t.eatSpace(),n&&t.eat(">"))return l(i),i.tokenize=u,"tag";if(t.eat("/")||s(i,{type:"tag",name:e,tokenize:u}),t.eat(">"))i.tokenize=u;else return i.tokenize=k,"tag";return"tag"}}function k(e,n){var t=e.next();return t=="/"&&e.eat(">")?(x(n)&&l(n),b(n)&&l(n),"tag"):t==">"?(x(n)&&l(n),"tag"):t=="="?null:t=='"'||t=="'"?p(e,n,v(t,k)):(x(n)||s(n,{type:"attribute",tokenize:k}),e.eat(/[a-zA-Z_:]/),e.eatWhile(/[-a-zA-Z0-9_:.]/),e.eatSpace(),(e.match(">",!1)||e.match("/",!1))&&(l(n),n.tokenize=u),"attribute")}function T(e,n){for(var t;t=e.next();)if(t=="-"&&e.match("->",!0))return n.tokenize=u,"comment"}function N(e,n){for(var t;t=e.next();)if(t=="]"&&e.match("]",!0))return n.tokenize=u,"comment"}function E(e,n){for(var t;t=e.next();)if(t=="?"&&e.match(">",!0))return n.tokenize=u,"processingInstruction"}function b(e){return y(e,"tag")}function x(e){return y(e,"attribute")}function A(e){return y(e,"xmlconstructor")}function D(e){return y(e,"string")}function _(e){return e.current()==='"'?e.match(/^[^\"]+\"\:/,!1):e.current()==="'"?e.match(/^[^\"]+\'\:/,!1):!1}function y(e,n){return e.stack.length&&e.stack[e.stack.length-1].type==n}function s(e,n){e.stack.push(n)}function l(e){e.stack.pop();var n=e.stack.length&&e.stack[e.stack.length-1].tokenize;e.tokenize=n||u}const C={name:"xquery",startState:function(){return{tokenize:u,cc:[],stack:[]}},token:function(e,n){if(e.eatSpace())return null;var t=n.tokenize(e,n);return t},languageData:{commentTokens:{block:{open:"(:",close:":)"}}}};exports.xQuery=C;
