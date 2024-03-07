import {
  html
} from "./chunk-MWC7FZFU.js";
import "./chunk-6PNGQ5O3.js";
import "./chunk-AFVQXQHV.js";
import "./chunk-FDH4KVEE.js";
import {
  EditorSelection,
  EditorView,
  ExternalTokenizer,
  LRLanguage,
  LRParser,
  LanguageSupport,
  delimitedIndent,
  foldNodeProp,
  indentNodeProp,
  parseMixed,
  styleTags,
  syntaxTree,
  tags
} from "./chunk-WEKEDQ3Y.js";
import "./chunk-TXPGJST7.js";

// node_modules/@codemirror/lang-liquid/dist/index.js
var interpolationStart = 1;
var tagStart = 2;
var endTagStart = 3;
var text = 180;
var endrawTagStart = 4;
var rawText = 181;
var endcommentTagStart = 5;
var commentText = 182;
function wordChar(code) {
  return code >= 65 && code <= 90 || code >= 97 && code <= 122;
}
var base = new ExternalTokenizer((input) => {
  let start = input.pos;
  for (; ; ) {
    let { next } = input;
    if (next < 0)
      break;
    if (next == 123) {
      let after = input.peek(1);
      if (after == 123) {
        if (input.pos > start)
          break;
        input.acceptToken(interpolationStart, 2);
        return;
      } else if (after == 37) {
        if (input.pos > start)
          break;
        let scan = 2, size = 2;
        for (; ; ) {
          let next2 = input.peek(scan);
          if (next2 == 32 || next2 == 10) {
            ++scan;
          } else if (next2 == 35) {
            ++scan;
            for (; ; ) {
              let comment2 = input.peek(scan);
              if (comment2 < 0 || comment2 == 10)
                break;
              scan++;
            }
          } else if (next2 == 45 && size == 2) {
            size = ++scan;
          } else {
            let end = next2 == 101 && input.peek(scan + 1) == 110 && input.peek(scan + 2) == 100;
            input.acceptToken(end ? endTagStart : tagStart, size);
            return;
          }
        }
      }
    }
    input.advance();
    if (next == 10)
      break;
  }
  if (input.pos > start)
    input.acceptToken(text);
});
function rawTokenizer(endTag, text2, tagStart2) {
  return new ExternalTokenizer((input) => {
    let start = input.pos;
    for (; ; ) {
      let { next } = input;
      if (next == 123 && input.peek(1) == 37) {
        let scan = 2;
        for (; ; scan++) {
          let ch = input.peek(scan);
          if (ch != 32 && ch != 10)
            break;
        }
        let word = "";
        for (; ; scan++) {
          let next2 = input.peek(scan);
          if (!wordChar(next2))
            break;
          word += String.fromCharCode(next2);
        }
        if (word == endTag) {
          if (input.pos > start)
            break;
          input.acceptToken(tagStart2, 2);
          break;
        }
      } else if (next < 0) {
        break;
      }
      input.advance();
      if (next == 10)
        break;
    }
    if (input.pos > start)
      input.acceptToken(text2);
  });
}
var comment = rawTokenizer("endcomment", commentText, endcommentTagStart);
var raw = rawTokenizer("endraw", rawText, endrawTagStart);
var spec_identifier = { __proto__: null, contains: 32, or: 36, and: 36, true: 50, false: 50, empty: 52, forloop: 54, tablerowloop: 56, continue: 58, in: 128, with: 194, for: 196, as: 198, if: 234, endif: 238, unless: 244, endunless: 248, elsif: 252, else: 256, case: 262, endcase: 266, when: 270, endfor: 278, tablerow: 284, endtablerow: 288, break: 292, cycle: 298, echo: 302, render: 306, include: 312, assign: 316, capture: 322, endcapture: 326, increment: 330, decrement: 334 };
var spec_TagName = { __proto__: null, if: 82, endif: 86, elsif: 90, else: 94, unless: 100, endunless: 104, case: 110, endcase: 114, when: 118, for: 126, endfor: 136, tablerow: 142, endtablerow: 146, break: 150, continue: 154, cycle: 158, comment: 164, endcomment: 170, raw: 176, endraw: 182, echo: 186, render: 190, include: 202, assign: 206, capture: 212, endcapture: 216, increment: 220, decrement: 224, liquid: 228 };
var parser = LRParser.deserialize({
  version: 14,
  states: "GYQYOPOOOOOP'#F{'#F{OeOXO'#CdOsQWO'#CfO!bQ`O'#DQO#{OPO'#DTO$ZOPO'#D^O$iOPO'#DcO$wOPO'#DkO%VOPO'#DsO%eOSO'#EOO%jOQO'#EUO%oOPO'#EhOOOP'#G`'#G`OOOP'#G]'#G]OOOP'#Fz'#FzQYOPOOOOOP-E9y-E9yOOQO'#Cg'#CgO&`QpO,59QO&gQpO'#G^OsQWO'#CsOOQO'#G^'#G^OOOP,59l,59lO)PQWO,59lOsQWO,59pOsQWO,59tO)WQWO,59vOsQWO,59yOsQWO,5:OOsQWO,5:SO!]QWO,5:WO!]QWO,5:`O)]QWO,5:dO)bQWO,5:fO)gQWO,5:hO)lQWO,5:kO)qQWO,5:qOsQWO,5:vOsQWO,5:xOsQWO,5;OOsQWO,5;QOsQWO,5;TOsQWO,5;XOsQWO,5;ZO+QQWO,5;]O+XOPO'#CdOOOP,59o,59oO#{OPO,59oO+gQ`O'#DWOOOP,59x,59xO$ZOPO,59xO+lQ`O'#DaOOOP,59},59}O$iOPO,59}O+qQ`O'#DfOOOP,5:V,5:VO$wOPO,5:VO+vQ`O'#DqOOOP,5:_,5:_O%VOPO,5:_O+{Q`O'#DvOOOS'#GQ'#GQO,QOSO'#ERO,YOSO,5:jOOOQ'#GR'#GRO,_OQO'#EXO,gOQO,5:pOOOP,5;S,5;SO%oOPO,5;SO,lQ`O'#EkOOOP-E9x-E9xO,qQ!bO,59SOsQWO,59VOsQWO,59VO,vQWO'#C|OOQO'#F|'#F|O,{QWO1G.lOOOP1G.l1G.lOsQWO,59VOsQWO,59ZO-TQpO,59_O-fQpO1G/WOOOP1G/W1G/WO-wQpO1G/[O.YQpO1G/`OOOP1G/b1G/bO.kQpO1G/eO.|QpO1G/jO/pQpO1G/nO/wQWO1G/rO/|QWO1G/zOOOP1G0O1G0OOOOP1G0Q1G0QO0RQWO1G0SOOOS1G0V1G0VOOOQ1G0]1G0]O0^QpO1G0bO0eQpO1G0dO1PQpO1G0jO1bQpO1G0lO1sQpO1G0oO2UQpO1G0sO2gQpO1G0uO2xQWO'#EsO3PQWO'#ExO3WQWO'#FRO3_QWO'#FYO3fQWO'#F^O3mQWO'#FqOOQO'#Ga'#GaOOQO'#GT'#GTO3tQWO1G0wOsQWO'#EtOsQWO'#EyOsQWO'#E}OOQO'#FP'#FPOsQWO'#FSOsQWO'#FWO!]QWO'#FZO!]QWO'#F_OOQO'#Fc'#FcOOQO'#Fe'#FeO3{QWO'#FfOsQWO'#FhOsQWO'#FjOsQWO'#FmOsQWO'#FoOsQWO'#FrOsQWO'#FvOsQWO'#FxOOOP1G0w1G0wOOOP1G/Z1G/ZO4QQWO,59rOOOP1G/d1G/dO4VQWO,59{OOOP1G/i1G/iO4[QWO,5:QOOOP1G/q1G/qO4aQWO,5:]OOOP1G/y1G/yO4fQWO,5:bOOOS-E:O-E:OOOOP1G0U1G0UO4kQ`O'#ESOOOQ-E:P-E:POOOP1G0[1G0[O4pQ`O'#EYOOOP1G0n1G0nO4uQWO,5;VOOQO1G.n1G.nOOQO1G.q1G.qO7ZQpO1G.qOOQO'#DO'#DOO7eQWO,59hOOQO-E9z-E9zOOOP7+$W7+$WO9_QpO1G.qO9iQpO1G.uOsQWO1G.yOOOP7+$r7+$rOOOP7+$v7+$vOOOP7+$z7+$zOOOP7+%P7+%POOOP7+%U7+%UOsQWO'#F}O<OQWO7+%YOOOP7+%Y7+%YOsQWO7+%^OsQWO7+%fO<WQWO'#GPO<]QWO7+%nOOOP7+%n7+%nO<eQWO7+%nO<jQWO7+%|OOOP7+%|7+%|O!]QWO'#E`OOQO'#GS'#GSO<rQWO7+&OOsQWO'#E`OOOP7+&O7+&OOOOP7+&U7+&UOOOP7+&W7+&WOOOP7+&Z7+&ZOOOP7+&_7+&_OOOP7+&a7+&aOOQO,5;_,5;_O2xQWO,5;_OOQO'#Ev'#EvOOQO,5;d,5;dO3PQWO,5;dOOQO'#E{'#E{OOQO,5;m,5;mO3WQWO,5;mOOQO'#FU'#FUOOQO,5;t,5;tO3_QWO,5;tOOQO'#F['#F[OOQO,5;x,5;xO3fQWO,5;xOOQO'#Fa'#FaOOQO,5<],5<]O3mQWO,5<]OOQO'#Ft'#FtOOQO-E:R-E:ROOOP7+&c7+&cO=QQpO,5;`O>kQpO,5;eO@UQpO,5;iOBRQpO,5;nOClQpO,5;rOE_QWO,5;uOEdQWO,5;yOEiQWO,5<QOG`QpO,5<SOIRQpO,5<UOKRQpO,5<XOMOQpO,5<ZON{QpO,5<^O!!fQpO,5<bO!$cQpO,5<dOOOP1G/^1G/^OOOP1G/g1G/gOOOP1G/l1G/lOOOP1G/w1G/wOOOP1G/|1G/|O!&`QWO,5:nO!&eQWO,5:tOOOP1G0q1G0qOsQWO1G/SO!&jQpO7+$eO!&{QpO,5<iOOQO-E9{-E9{OOOP<<Ht<<HtO!)^QpO<<HxO!)eQpO<<IQOOQO,5<k,5<kOOQO-E9}-E9}OOOP<<IY<<IYO!)lQWO<<IYOOOP<<Ih<<IhO!)tQWO,5:zOOQO-E:Q-E:QOOOP<<Ij<<IjO!)yQpO,5:zOOQO1G0y1G0yOOQO1G1O1G1OOOQO1G1X1G1XOOQO1G1`1G1`OOQO1G1d1G1dOOQO1G1w1G1wO!*hQWO1G1^OsQWO1G1aOsQWO1G1eO!,[QWO1G1lO!.OQWO1G1lO!.TQWO1G1nO!]QWO'#FlOOQO'#GU'#GUO!/wQWO1G1pOOOP1G0Y1G0YOOOP1G0`1G0`O!1kQpO7+$nOOQO<<HP<<HPOOQO'#Dp'#DpO!3nQWO'#DoOOQO'#GO'#GOO!5XQWOAN>dOOOPAN>dAN>dO!5aQWOAN>lOOOPAN>lAN>lO!5iQWOAN>tOOOPAN>tAN>tOsQWO1G0fO!]QWO1G0fO!5qQpO7+&{O!7QQpO7+'PO!8aQWO7+'WO!:TQWO,5<WOOQO-E:S-E:SOsQWO,5:ZOOQO-E9|-E9|OOOPG24OG24OOOOPG24WG24WOOOPG24`G24`O!:YQpO7+&QOOQO7+&Q7+&QO!:tQWO<<JgO!<UQWO<<JkO!=fQWO<<JrOsQWO1G1rO!?YQpO1G/uO!@|QpO7+'^",
  stateData: "!B|~O%OOSUOS~OPROQSO$zPO~O$zPOPWXQWX$yWX~OfeOifOjfOkfOlfOmfOnfOofO%RbO~OuhOvgOyiO}jO!PkO!SlO!XmO!]nO!aoO!ipO!mqO!orO!qsO!ttO!zuO#PvO#RwO#XxO#ZyO#^zO#b{O#d|O#f}O~OPROQSOR!RO$zPO~OPROQSOR!UO$zPO~OPROQSOR!XO$zPO~OPROQSOR![O$zPO~OPROQSOR!_O$zPO~O$|!`O~O${!cO~OPROQSOR!hO$zPO~O]!jO`!qOa!kOb!lOq!mO~OX!pO~P%}Od!rOX%QX]%QX`%QXa%QXb%QXq%QXh%QXv%QX!^%QX#T%QX#U%QXm%QX#i%QX#k%QX#n%QX#r%QX#t%QX#w%QX#{%QX$S%QX$W%QX$Z%QX$]%QX$_%QX$b%QX$d%QX$g%QX$k%QX$m%QX#p%QX#y%QX$i%QXe%QX%R%QX#V%QX$P%QX$U%QX~Ov!uO~PsOv!xO~Ov#OO~Ov#PO~On#QO~Ov#RO~Ov#SO~Om#nO#U#kO#i#eO#n#fO#r#gO#t#hO#w#iO#{#jO$S#lO$W#mO$Z#oO$]#pO$_#qO$b#rO$d#sO$g#tO$k#uO$m#vO~Ov#wO~P)vO$zPOPWXQWXRWX~O{#yO~O!U#{O~O!Z#}O~O!f$PO~O!k$RO~O$|!`OT!uX~OT$UO~O${!cOS!{X~OS$XO~O#`$ZO~O^$[O~O%R$_O~OX$bOq!mO~O]!jO`!qOa!kOb!lOh$eO~O]!jO`!qOa!kOb!lOv$fO~O]!jO`!qOa!kOb!lOv$gO~O]!jO`!qOa!kOb!lOv$hO~O]!jO`!qOa!kOb!lOv$iO~O]!jO`!qOa!kOb!lOv$jO~O]!jO`!qOa!kOb!lO!^$kO~Ov$mO~P/_O!b$nO~O!b$oO~Os$sOv$rO!^$pO~Ov$uO~P%}O]!jO`!qOa!kOb!lOv$zO!^$vO#T$yO#U$yO~O]!jO`!qOa!kOb!lOv${O~O]!jO`!qOa!kOb!lOv$|O~O]!jO`!qOa!kOb!lOv$}O~O]!jO`!qOa!kOb!lOv%OO~O]!jO`!qOa!kOb!lOv%PO~O#k%SO~P)vO#p%VO~P)vO#y%YO~P)vO$P%]O~P)vO$U%`O~P)vO$i%cO~P)vOv%eO~P)vOn%mO~Ov%uO~Ov%vO~Ov%wO~Ov%xO~Ov%yO~O!w%zO~O!}%{O~Ov%|O~Oa!kOX_i]_iq_ih_iv_i!^_i#T_i#U_im_i#i_i#k_i#n_i#r_i#t_i#w_i#{_i$S_i$W_i$Z_i$]_i$__i$b_i$d_i$g_i$k_i$m_i#p_i#y_i$i_ie_i%R_i#V_i$P_i$U_i~O`!qOb!lO~P4zOs%}OXpaqpavpampa#Upa#ipa#npa#rpa#tpa#wpa#{pa$Spa$Wpa$Zpa$]pa$_pa$bpa$dpa$gpa$kpa$mpa#kpa#ppa#ypa$Ppa$Upa$ipa~O`_ib_i~P4zO`!qOa!kOb!lOXci]ciqcihcivci!^ci#Tci#Ucimci#ici#kci#nci#rci#tci#wci#{ci$Sci$Wci$Zci$]ci$_ci$bci$dci$gci$kci$mci#pci#yci$icieci%Rci#Vci$Pci$Uci~Ov&RO!^$kO~On&UO~Ov&WO!^$pO~On&XO~Oq!mOv&YO~Ov&]O!^$vO#T$yO#U$yO~O]!jO`!qOa!kOb!lOm#ha#U#ha#i#ha#k#ha#n#ha#r#ha#t#ha#w#ha#{#ha$S#ha$W#ha$Z#ha$]#ha$_#ha$b#ha$d#ha$g#ha$k#ha$m#ha~O]!jO`!qOa!kOb!lOm#ma#U#ma#i#ma#n#ma#p#ma#r#ma#t#ma#w#ma#{#ma$S#ma$W#ma$Z#ma$]#ma$_#ma$b#ma$d#ma$g#ma$k#ma$m#ma~O]!jO`!qOa!kOb!lOm#qav#qa#U#qa#i#qa#n#qa#r#qa#t#qa#w#qa#{#qa$S#qa$W#qa$Z#qa$]#qa$_#qa$b#qa$d#qa$g#qa$k#qa$m#qa#k#qa#p#qa#y#qa$P#qa$U#qa$i#qa~O]!jO`!qOa!kOb!lOm#va#U#va#i#va#n#va#r#va#t#va#w#va#y#va#{#va$S#va$W#va$Z#va$]#va$_#va$b#va$d#va$g#va$k#va$m#va~Om#zav#za#U#za#i#za#n#za#r#za#t#za#w#za#{#za$S#za$W#za$Z#za$]#za$_#za$b#za$d#za$g#za$k#za$m#za#k#za#p#za#y#za$P#za$U#za$i#za~P/_O!b&fO~O!b&gO~Os&iO!^$pOm$Yav$Ya#U$Ya#i$Ya#n$Ya#r$Ya#t$Ya#w$Ya#{$Ya$S$Ya$W$Ya$Z$Ya$]$Ya$_$Ya$b$Ya$d$Ya$g$Ya$k$Ya$m$Ya#k$Ya#p$Ya#y$Ya$P$Ya$U$Ya$i$Ya~Om$[av$[a#U$[a#i$[a#n$[a#r$[a#t$[a#w$[a#{$[a$S$[a$W$[a$Z$[a$]$[a$_$[a$b$[a$d$[a$g$[a$k$[a$m$[a#k$[a#p$[a#y$[a$P$[a$U$[a$i$[a~P%}O]!jO`!qOa!kOb!lO!^&kOm$^av$^a#U$^a#i$^a#n$^a#r$^a#t$^a#w$^a#{$^a$S$^a$W$^a$Z$^a$]$^a$_$^a$b$^a$d$^a$g$^a$k$^a$m$^a#k$^a#p$^a#y$^a$P$^a$U$^a$i$^a~O]!jO`!qOa!kOb!lOm$aav$aa#U$aa#i$aa#n$aa#r$aa#t$aa#w$aa#{$aa$S$aa$W$aa$Z$aa$]$aa$_$aa$b$aa$d$aa$g$aa$k$aa$m$aa#k$aa#p$aa#y$aa$P$aa$U$aa$i$aa~O]!jO`!qOa!kOb!lOm$cav$ca#U$ca#i$ca#n$ca#r$ca#t$ca#w$ca#{$ca$S$ca$W$ca$Z$ca$]$ca$_$ca$b$ca$d$ca$g$ca$k$ca$m$ca#k$ca#p$ca#y$ca$P$ca$U$ca$i$ca~O]!jO`!qOa!kOb!lOm$fa#U$fa#i$fa#n$fa#r$fa#t$fa#w$fa#{$fa$S$fa$W$fa$Z$fa$]$fa$_$fa$b$fa$d$fa$g$fa$i$fa$k$fa$m$fa~O]!jO`!qOa!kOb!lOm$jav$ja#U$ja#i$ja#n$ja#r$ja#t$ja#w$ja#{$ja$S$ja$W$ja$Z$ja$]$ja$_$ja$b$ja$d$ja$g$ja$k$ja$m$ja#k$ja#p$ja#y$ja$P$ja$U$ja$i$ja~O]!jO`!qOa!kOb!lOm$lav$la#U$la#i$la#n$la#r$la#t$la#w$la#{$la$S$la$W$la$Z$la$]$la$_$la$b$la$d$la$g$la$k$la$m$la#k$la#p$la#y$la$P$la$U$la$i$la~Ov&nO~Ov&oO~O]!jO`!qOa!kOb!lOe&qO~O]!jO`!qOa!kOb!lOv$qa!^$qam$qa#U$qa#i$qa#n$qa#r$qa#t$qa#w$qa#{$qa$S$qa$W$qa$Z$qa$]$qa$_$qa$b$qa$d$qa$g$qa$k$qa$m$qa#k$qa#p$qa#y$qa$P$qa$U$qa$i$qa~O]!jO`!qOa!kOb!lO%R&rO~Ov&vO~P!({Ov&xO~P!({Ov&zO!^$pO~Os&{O~O]!jO`!qOa!kOb!lO#V&|Ov#Sa!^#Sa#T#Sa#U#Sa~O!^$kOm#ziv#zi#U#zi#i#zi#n#zi#r#zi#t#zi#w#zi#{#zi$S#zi$W#zi$Z#zi$]#zi$_#zi$b#zi$d#zi$g#zi$k#zi$m#zi#k#zi#p#zi#y#zi$P#zi$U#zi$i#zi~O!^$pOm$Yiv$Yi#U$Yi#i$Yi#n$Yi#r$Yi#t$Yi#w$Yi#{$Yi$S$Yi$W$Yi$Z$Yi$]$Yi$_$Yi$b$Yi$d$Yi$g$Yi$k$Yi$m$Yi#k$Yi#p$Yi#y$Yi$P$Yi$U$Yi$i$Yi~On'PO~Oq!mOm$[iv$[i#U$[i#i$[i#n$[i#r$[i#t$[i#w$[i#{$[i$S$[i$W$[i$Z$[i$]$[i$_$[i$b$[i$d$[i$g$[i$k$[i$m$[i#k$[i#p$[i#y$[i$P$[i$U$[i$i$[i~O!^&kOm$^iv$^i#U$^i#i$^i#n$^i#r$^i#t$^i#w$^i#{$^i$S$^i$W$^i$Z$^i$]$^i$_$^i$b$^i$d$^i$g$^i$k$^i$m$^i#k$^i#p$^i#y$^i$P$^i$U$^i$i$^i~O]!jO`!qOa!kOb!lOXpqqpqvpqmpq#Upq#ipq#npq#rpq#tpq#wpq#{pq$Spq$Wpq$Zpq$]pq$_pq$bpq$dpq$gpq$kpq$mpq#kpq#ppq#ypq$Ppq$Upq$ipq~Os'SOv!cX%R!cXm!cX#U!cX#i!cX#n!cX#r!cX#t!cX#w!cX#{!cX$P!cX$S!cX$W!cX$Z!cX$]!cX$_!cX$b!cX$d!cX$g!cX$k!cX$m!cX$U!cX~Ov'UO%R&rO~Ov'VO%R&rO~Ov'WO!^$pO~Om#}q#U#}q#i#}q#n#}q#r#}q#t#}q#w#}q#{#}q$P#}q$S#}q$W#}q$Z#}q$]#}q$_#}q$b#}q$d#}q$g#}q$k#}q$m#}q~P!({Om$Rq#U$Rq#i$Rq#n$Rq#r$Rq#t$Rq#w$Rq#{$Rq$S$Rq$U$Rq$W$Rq$Z$Rq$]$Rq$_$Rq$b$Rq$d$Rq$g$Rq$k$Rq$m$Rq~P!({O!^$pOm$Yqv$Yq#U$Yq#i$Yq#n$Yq#r$Yq#t$Yq#w$Yq#{$Yq$S$Yq$W$Yq$Z$Yq$]$Yq$_$Yq$b$Yq$d$Yq$g$Yq$k$Yq$m$Yq#k$Yq#p$Yq#y$Yq$P$Yq$U$Yq$i$Yq~Os'^O~O]!jO`!qOa!kOb!lOv#Sq!^#Sq#T#Sq#U#Sq~O%R&rOm#}y#U#}y#i#}y#n#}y#r#}y#t#}y#w#}y#{#}y$P#}y$S#}y$W#}y$Z#}y$]#}y$_#}y$b#}y$d#}y$g#}y$k#}y$m#}y~O%R&rOm$Ry#U$Ry#i$Ry#n$Ry#r$Ry#t$Ry#w$Ry#{$Ry$S$Ry$U$Ry$W$Ry$Z$Ry$]$Ry$_$Ry$b$Ry$d$Ry$g$Ry$k$Ry$m$Ry~O!^$pOm$Yyv$Yy#U$Yy#i$Yy#n$Yy#r$Yy#t$Yy#w$Yy#{$Yy$S$Yy$W$Yy$Z$Yy$]$Yy$_$Yy$b$Yy$d$Yy$g$Yy$k$Yy$m$Yy#k$Yy#p$Yy#y$Yy$P$Yy$U$Yy$i$Yy~O]!jO`!qOa!kOb!lOv!ci%R!cim!ci#U!ci#i!ci#n!ci#r!ci#t!ci#w!ci#{!ci$P!ci$S!ci$W!ci$Z!ci$]!ci$_!ci$b!ci$d!ci$g!ci$k!ci$m!ci$U!ci~O]!jO`!qOa!kOb!lOm$`qv$`q!^$`q#U$`q#i$`q#n$`q#r$`q#t$`q#w$`q#{$`q$S$`q$W$`q$Z$`q$]$`q$_$`q$b$`q$d$`q$g$`q$k$`q$m$`q#k$`q#p$`q#y$`q$P$`q$U$`q$i$`q~O",
  goto: "7V%UPPPPPPPP%VP%V%g&zPP&zPPP&zPPP&zPPPPPPPP'xP(QP(TPP(T(eP(uP(TP(TP(T({P)]P(T)cP)sP(TPP(T)yPP*Z*e*oP(T*uP+VP(TP(TP(TP(T+]P+m+pP(T+sP,T,WP(TP(TP,ZPPP(TP(TP(T,_P,oP(TP(TP(TP,u-VP-gP,u-mP-}P,uP,uP,u.TP.eP,uP,u.k.{P,u/RP/cP,uP,u,uP,uP,uP/i,uP,uP,u/mP/}P,uP,uP0T0s1Z1i1s2V2i2o2u2{3kPPPPPP3q4RP%V6um^OTUVWX[`!Q!T!W!Z!^!g!vdRehijlmnvwxyz{|!k!l!q!r#e#f#g#i#j#p#q#r#s#t#u#v$e$k$n$o$y%}&f&g&{'S'^Q!|oQ!}pQ%k#kQ%l#lQ&Z$vQ'Q&kR'Y&|!wfRehijlmnvwxyz{|!k!l!q!r#e#f#g#i#j#p#q#r#s#t#u#v$e$k$n$o$y%}&f&g&{'S'^]!nc!o#T$t%n&jR$`!mm]OTUVWX[`!Q!T!W!Z!^!gmTOTUVWX[`!Q!T!W!Z!^!gQ!PTR#x!QmUOTUVWX[`!Q!T!W!Z!^!gQ!SUR#z!TmVOTUVWX[`!Q!T!W!Z!^!gQ!VVR#|!WmWOTUVWX[`!Q!T!W!Z!^!ga&t&S&T&u&w&}'O'Z'[a&s&S&T&u&w&}'O'Z'[Q!YWR$O!ZmXOTUVWX[`!Q!T!W!Z!^!gQ!]XR$Q!^mYOTUVWX[`!Q!T!W!Z!^!gR!bYR$T!bmZOTUVWX[`!Q!T!W!Z!^!gR!eZR$W!eT$w#U$xm[OTUVWX[`!Q!T!W!Z!^!gQ!f[R$Y!gm#b}#[#]#^#_#`#a#d%R%U%X%[%_%bm#[}#[#]#^#_#`#a#d%R%U%X%[%_%bQ%Q#[R&_%Rm#]}#[#]#^#_#`#a#d%R%U%X%[%_%bQ%T#]R&`%Um#^}#[#]#^#_#`#a#d%R%U%X%[%_%bQ%W#^R&a%Xm#_}#[#]#^#_#`#a#d%R%U%X%[%_%bQ%Z#_R&b%[m#`}#[#]#^#_#`#a#d%R%U%X%[%_%bQ%^#`R&c%_T&l%o&mm#a}#[#]#^#_#`#a#d%R%U%X%[%_%bQ%a#aR&d%bQ`OQ!QTQ!TUQ!WVQ!ZWQ!^XQ!g[_!i`!Q!T!W!Z!^!gSQO`SaQ!Oi!OTUVWX[!Q!T!W!Z!^!gQ!ocU$a!o$t&jQ$t#TR&j%nQ$l!{S&Q$l&eR&e%jQ&u&SQ&w&TW'T&u&w'Z'[Q'Z&}R'['OQ$q#QW&V$q&h&y']Q&h%mQ&y&XR']'PQ!aYR$S!aQ!dZR$V!dQ$x#UR&[$xQ#d}Q%R#[Q%U#]Q%X#^Q%[#_Q%_#`Q%b#a_%d#d%R%U%X%[%_%bQ&m%oR'R&mm_OTUVWX[`!Q!T!W!Z!^!gQcRQ!seQ!thQ!viQ!wjQ!ylQ!zmQ!{nQ#TvQ#UwQ#VxQ#WyQ#XzQ#Y{Q#Z|Q$]!kQ$^!lQ$c!qQ$d!rQ%f#eQ%g#fQ%h#gQ%i#iQ%j#jQ%n#pQ%o#qQ%p#rQ%q#sQ%r#tQ%s#uQ%t#vQ&O$eQ&P$kQ&S$nQ&T$oQ&^$yQ&p%}Q&}&fQ'O&gQ'X&{Q'_'SR'`'^m#c}#[#]#^#_#`#a#d%R%U%X%[%_%b",
  nodeNames: "⚠ {{ {% {% {% {% InlineComment Template Text }} Interpolation VariableName MemberExpression . PropertyName BinaryExpression contains CompareOp LogicOp AssignmentExpression AssignOp ) ( RangeExpression .. BooleanLiteral empty forloop tablerowloop continue StringLiteral NumberLiteral Filter | FilterName : Tag TagName %} IfDirective Tag if EndTag endif Tag elsif Tag else UnlessDirective Tag unless EndTag endunless CaseDirective Tag case EndTag endcase Tag when , ForDirective Tag for in Parameter ParameterName EndTag endfor TableDirective Tag tablerow EndTag endtablerow Tag break Tag continue Tag cycle Comment Tag comment CommentText EndTag endcomment RawDirective Tag raw RawText EndTag endraw Tag echo Tag render RenderParameter with for as Tag include Tag assign CaptureDirective Tag capture EndTag endcapture Tag increment Tag decrement Tag liquid IfDirective Tag if EndTag endif UnlessDirective Tag unless EndTag endunless Tag elsif Tag else CaseDirective Tag case EndTag endcase Tag when ForDirective Tag EndTag endfor TableDirective Tag tablerow EndTag endtablerow Tag break Tag Tag cycle Tag echo Tag render RenderParameter Tag include Tag assign CaptureDirective Tag capture EndTag endcapture Tag increment Tag decrement",
  maxTerm: 189,
  nodeProps: [
    ["closedBy", 1, "}}", -4, 2, 3, 4, 5, "%}", 22, ")"],
    ["openedBy", 9, "{{", 21, "(", 38, "{%"],
    ["group", -12, 11, 12, 15, 19, 23, 25, 26, 27, 28, 29, 30, 31, "Expression"]
  ],
  skippedNodes: [0, 6],
  repeatNodeCount: 11,
  tokenData: ")l~RlXY!yYZ!y]^!ypq!yqr#[rs#gst$Xuv$pwx${xy%hyz%m{|%r|}'^}!O'c!O!P'o!Q![&{![!](P!^!_(U!_!`(^!`!a(U!c!}(f#R#S(f#T#o(f#p#q)[#q#r)a%W;'S(f;'S;:j)U<%lO(f~#OS%O~XY!yYZ!y]^!ypq!y~#_P!_!`#b~#gOa~~#jUOY#gZr#grs#|s;'S#g;'S;=`$R<%lO#g~$ROn~~$UP;=`<%l#g~$^SU~OY$XZ;'S$X;'S;=`$j<%lO$X~$mP;=`<%l$X~$sP#q#r$v~${Ov~~%OUOY${Zw${wx#|x;'S${;'S;=`%b<%lO${~%eP;=`<%l${~%mOf~~%rOe~P%uQ!O!P%{!Q![&{P&OP!Q![&RP&WRoP!Q![&R!g!h&a#X#Y&aP&dR{|&m}!O&m!Q![&sP&pP!Q![&sP&xPoP!Q![&sP'QSoP!O!P%{!Q![&{!g!h&a#X#Y&a~'cO!^~~'fRuv$p!O!P%{!Q![&{~'tQ]S!O!P'z!Q![&R~(POh~~(UOs~~(ZPa~!_!`#b~(cPd~!_!`#b_(oV^WuQ%RT!Q![(f!c!}(f#R#S(f#T#o(f%W;'S(f;'S;:j)U<%lO(f_)XP;=`<%l(f~)aOq~~)dP#q#r)g~)lOX~",
  tokenizers: [base, raw, comment, 0, 1, 2, 3],
  topRules: { "Template": [0, 7] },
  specialized: [{ term: 187, get: (value) => spec_identifier[value] || -1 }, { term: 37, get: (value) => spec_TagName[value] || -1 }],
  tokenPrec: 0
});
function completions(words, type) {
  return words.split(" ").map((label) => ({ label, type }));
}
var Filters = completions("abs append at_least at_most capitalize ceil compact concat date default divided_by downcase escape escape_once first floor join last lstrip map minus modulo newline_to_br plus prepend remove remove_first replace replace_first reverse round rstrip size slice sort sort_natural split strip strip_html strip_newlines sum times truncate truncatewords uniq upcase url_decode url_encode where", "function");
var Tags = completions("cycle comment endcomment raw endraw echo increment decrement liquid if elsif else endif unless endunless case endcase for endfor tablerow endtablerow break continue assign capture endcapture render include", "keyword");
var Expressions = completions("empty forloop tablerowloop in with as contains", "keyword");
var forloop = completions("first index index0 last length rindex", "property");
var tablerowloop = completions("col col0 col_first col_last first index index0 last length rindex rindex0 row", "property");
function findContext(context) {
  var _a;
  let { state, pos } = context;
  let node = syntaxTree(state).resolveInner(pos, -1).enterUnfinishedNodesBefore(pos);
  let before = ((_a = node.childBefore(pos)) === null || _a === void 0 ? void 0 : _a.name) || node.name;
  if (node.name == "FilterName")
    return { type: "filter", node };
  if (context.explicit && before == "|")
    return { type: "filter" };
  if (node.name == "TagName")
    return { type: "tag", node };
  if (context.explicit && before == "{%")
    return { type: "tag" };
  if (node.name == "PropertyName" && node.parent.name == "MemberExpression")
    return { type: "property", node, target: node.parent };
  if (node.name == "." && node.parent.name == "MemberExpression")
    return { type: "property", target: node.parent };
  if (node.name == "MemberExpression" && before == ".")
    return { type: "property", target: node };
  if (node.name == "VariableName")
    return { type: "expression", from: node.from };
  let word = context.matchBefore(/[\w\u00c0-\uffff]+$/);
  if (word)
    return { type: "expression", from: word.from };
  if (context.explicit && node.name != "CommentText" && node.name != "StringLiteral" && node.name != "NumberLiteral" && node.name != "InlineComment")
    return { type: "expression" };
  return null;
}
function resolveProperties(state, node, context, properties) {
  let path = [];
  for (; ; ) {
    let obj = node.getChild("Expression");
    if (!obj)
      return [];
    if (obj.name == "forloop") {
      return path.length ? [] : forloop;
    } else if (obj.name == "tablerowloop") {
      return path.length ? [] : tablerowloop;
    } else if (obj.name == "VariableName") {
      path.unshift(state.sliceDoc(obj.from, obj.to));
      break;
    } else if (obj.name == "MemberExpression") {
      let name = obj.getChild("PropertyName");
      if (name)
        path.unshift(state.sliceDoc(name.from, name.to));
      node = obj;
    } else {
      return [];
    }
  }
  return properties ? properties(path, state, context) : [];
}
function liquidCompletionSource(config = {}) {
  let filters = config.filters ? config.filters.concat(Filters) : Filters;
  let tags2 = config.tags ? config.tags.concat(Tags) : Tags;
  let exprs = config.variables ? config.variables.concat(Expressions) : Expressions;
  let { properties } = config;
  return (context) => {
    var _a;
    let cx = findContext(context);
    if (!cx)
      return null;
    let from = (_a = cx.from) !== null && _a !== void 0 ? _a : cx.node ? cx.node.from : context.pos;
    let options;
    if (cx.type == "filter")
      options = filters;
    else if (cx.type == "tag")
      options = tags2;
    else if (cx.type == "expression")
      options = exprs;
    else
      options = resolveProperties(context.state, cx.target, context, properties);
    return options.length ? { options, from, validFor: /^[\w\u00c0-\uffff]*$/ } : null;
  };
}
var closePercentBrace = EditorView.inputHandler.of((view, from, to, text2) => {
  if (text2 != "%" || from != to || view.state.doc.sliceString(from - 1, to + 1) != "{}")
    return false;
  view.dispatch(view.state.changeByRange((range) => ({
    changes: { from: range.from, to: range.to, insert: "%%" },
    range: EditorSelection.cursor(range.from + 1)
  })), {
    scrollIntoView: true,
    userEvent: "input.type"
  });
  return true;
});
function directiveIndent(except) {
  return (context) => {
    let back = except.test(context.textAfter);
    return context.lineIndent(context.node.from) + (back ? 0 : context.unit);
  };
}
var tagLanguage = LRLanguage.define({
  name: "liquid",
  parser: parser.configure({
    props: [
      styleTags({
        "cycle comment endcomment raw endraw echo increment decrement liquid in with as": tags.keyword,
        "empty forloop tablerowloop": tags.atom,
        "if elsif else endif unless endunless case endcase for endfor tablerow endtablerow break continue": tags.controlKeyword,
        "assign capture endcapture": tags.definitionKeyword,
        "contains": tags.operatorKeyword,
        "render include": tags.moduleKeyword,
        VariableName: tags.variableName,
        TagName: tags.tagName,
        FilterName: tags.function(tags.variableName),
        PropertyName: tags.propertyName,
        CompareOp: tags.compareOperator,
        AssignOp: tags.definitionOperator,
        LogicOp: tags.logicOperator,
        NumberLiteral: tags.number,
        StringLiteral: tags.string,
        BooleanLiteral: tags.bool,
        InlineComment: tags.lineComment,
        CommentText: tags.blockComment,
        "{% %} {{ }}": tags.brace,
        "( )": tags.paren,
        ".": tags.derefOperator,
        ", .. : |": tags.punctuation
      }),
      indentNodeProp.add({
        Tag: delimitedIndent({ closing: "%}" }),
        "UnlessDirective ForDirective TablerowDirective CaptureDirective": directiveIndent(/^\s*(\{%-?\s*)?end\w/),
        IfDirective: directiveIndent(/^\s*(\{%-?\s*)?(endif|else|elsif)\b/),
        CaseDirective: directiveIndent(/^\s*(\{%-?\s*)?(endcase|when)\b/)
      }),
      foldNodeProp.add({
        "UnlessDirective ForDirective TablerowDirective CaptureDirective IfDirective CaseDirective RawDirective Comment"(tree) {
          let first = tree.firstChild, last = tree.lastChild;
          if (!first || first.name != "Tag")
            return null;
          return { from: first.to, to: last.name == "EndTag" ? last.from : tree.to };
        }
      })
    ]
  }),
  languageData: {
    commentTokens: { line: "#" },
    indentOnInput: /^\s*{%-?\s*(?:end|elsif|else|when|)$/
  }
});
var baseHTML = html();
function makeLiquid(base2) {
  return tagLanguage.configure({
    wrap: parseMixed((node) => node.type.isTop ? {
      parser: base2.parser,
      overlay: (n) => n.name == "Text" || n.name == "RawText"
    } : null)
  }, "liquid");
}
var liquidLanguage = makeLiquid(baseHTML.language);
function liquid(config = {}) {
  let base2 = config.base || baseHTML;
  let lang = base2.language == baseHTML.language ? liquidLanguage : makeLiquid(base2.language);
  return new LanguageSupport(lang, [
    base2.support,
    lang.data.of({ autocomplete: liquidCompletionSource(config) }),
    base2.language.data.of({ closeBrackets: { brackets: ["{"] } }),
    closePercentBrace
  ]);
}
export {
  closePercentBrace,
  liquid,
  liquidCompletionSource,
  liquidLanguage
};
//# sourceMappingURL=dist-4OOAEGGM.js.map
