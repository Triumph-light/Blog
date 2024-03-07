import {
  markdown
} from "./chunk-EVSSNKB5.js";
import "./chunk-MWC7FZFU.js";
import "./chunk-6PNGQ5O3.js";
import {
  Fragment,
  Teleport,
  cloneVNode,
  computed,
  createVNode,
  defineComponent,
  h,
  inject,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  shallowRef,
  toRef,
  watch
} from "./chunk-CKQ4TNQ3.js";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap
} from "./chunk-AFVQXQHV.js";
import "./chunk-FDH4KVEE.js";
import {
  Annotation,
  ChangeDesc,
  ChangeSet,
  CharCategory,
  Compartment,
  Decoration,
  Direction,
  EditorSelection,
  EditorState,
  EditorView,
  Facet,
  GutterMarker,
  HighlightStyle,
  IndentContext,
  LanguageDescription,
  LanguageSupport,
  NodeProp,
  Prec,
  RangeSet,
  RangeSetBuilder,
  StateEffect,
  StateField,
  StreamLanguage,
  Text,
  Transaction,
  ViewPlugin,
  WidgetType,
  bracketMatching,
  codePointAt,
  codePointSize,
  combineConfig,
  countColumn,
  crosshairCursor,
  defaultHighlightStyle,
  drawSelection,
  dropCursor,
  findClusterBreak,
  foldGutter,
  foldKeymap,
  fromCodePoint,
  getIndentUnit,
  getIndentation,
  getPanel,
  gutter,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  hoverTooltip,
  indentOnInput,
  indentString,
  indentUnit,
  keymap,
  lineNumbers,
  logException,
  matchBrackets,
  placeholder,
  rectangularSelection,
  runScopeHandlers,
  showPanel,
  showTooltip,
  syntaxHighlighting,
  syntaxTree,
  tags
} from "./chunk-WEKEDQ3Y.js";
import {
  __commonJS,
  __export,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper,
  __publicField,
  __toESM
} from "./chunk-TXPGJST7.js";

// node_modules/toggle-selection/index.js
var require_toggle_selection = __commonJS({
  "node_modules/toggle-selection/index.js"(exports, module) {
    module.exports = function() {
      var selection2 = document.getSelection();
      if (!selection2.rangeCount) {
        return function() {
        };
      }
      var active = document.activeElement;
      var ranges = [];
      for (var i2 = 0; i2 < selection2.rangeCount; i2++) {
        ranges.push(selection2.getRangeAt(i2));
      }
      switch (active.tagName.toUpperCase()) {
        case "INPUT":
        case "TEXTAREA":
          active.blur();
          break;
        default:
          active = null;
          break;
      }
      selection2.removeAllRanges();
      return function() {
        selection2.type === "Caret" && selection2.removeAllRanges();
        if (!selection2.rangeCount) {
          ranges.forEach(function(range) {
            selection2.addRange(range);
          });
        }
        active && active.focus();
      };
    };
  }
});

// node_modules/copy-to-clipboard/index.js
var require_copy_to_clipboard = __commonJS({
  "node_modules/copy-to-clipboard/index.js"(exports, module) {
    "use strict";
    var deselectCurrent = require_toggle_selection();
    var clipboardToIE11Formatting = {
      "text/plain": "Text",
      "text/html": "Url",
      "default": "Text"
    };
    var defaultMessage = "Copy to clipboard: #{key}, Enter";
    function format2(message) {
      var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
      return message.replace(/#{\s*key\s*}/g, copyKey);
    }
    function copy2(text2, options) {
      var debug, message, reselectPrevious, range, selection2, mark, success = false;
      if (!options) {
        options = {};
      }
      debug = options.debug || false;
      try {
        reselectPrevious = deselectCurrent();
        range = document.createRange();
        selection2 = document.getSelection();
        mark = document.createElement("span");
        mark.textContent = text2;
        mark.ariaHidden = "true";
        mark.style.all = "unset";
        mark.style.position = "fixed";
        mark.style.top = 0;
        mark.style.clip = "rect(0, 0, 0, 0)";
        mark.style.whiteSpace = "pre";
        mark.style.webkitUserSelect = "text";
        mark.style.MozUserSelect = "text";
        mark.style.msUserSelect = "text";
        mark.style.userSelect = "text";
        mark.addEventListener("copy", function(e2) {
          e2.stopPropagation();
          if (options.format) {
            e2.preventDefault();
            if (typeof e2.clipboardData === "undefined") {
              debug && console.warn("unable to use e.clipboardData");
              debug && console.warn("trying IE specific stuff");
              window.clipboardData.clearData();
              var format3 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
              window.clipboardData.setData(format3, text2);
            } else {
              e2.clipboardData.clearData();
              e2.clipboardData.setData(options.format, text2);
            }
          }
          if (options.onCopy) {
            e2.preventDefault();
            options.onCopy(e2.clipboardData);
          }
        });
        document.body.appendChild(mark);
        range.selectNodeContents(mark);
        selection2.addRange(range);
        var successful = document.execCommand("copy");
        if (!successful) {
          throw new Error("copy command was unsuccessful");
        }
        success = true;
      } catch (err) {
        debug && console.error("unable to copy using execCommand: ", err);
        debug && console.warn("trying IE specific stuff");
        try {
          window.clipboardData.setData(options.format || "text", text2);
          options.onCopy && options.onCopy(window.clipboardData);
          success = true;
        } catch (err2) {
          debug && console.error("unable to copy using clipboardData: ", err2);
          debug && console.error("falling back to prompt");
          message = format2("message" in options ? options.message : defaultMessage);
          window.prompt(message, text2);
        }
      } finally {
        if (selection2) {
          if (typeof selection2.removeRange == "function") {
            selection2.removeRange(range);
          } else {
            selection2.removeAllRanges();
          }
        }
        if (mark) {
          document.body.removeChild(mark);
        }
        reselectPrevious();
      }
      return success;
    }
    module.exports = copy2;
  }
});

// node_modules/markdown-it-task-lists/index.js
var require_markdown_it_task_lists = __commonJS({
  "node_modules/markdown-it-task-lists/index.js"(exports, module) {
    var disableCheckboxes = true;
    var useLabelWrapper = false;
    var useLabelAfter = false;
    module.exports = function(md, options) {
      if (options) {
        disableCheckboxes = !options.enabled;
        useLabelWrapper = !!options.label;
        useLabelAfter = !!options.labelAfter;
      }
      md.core.ruler.after("inline", "github-task-lists", function(state) {
        var tokens = state.tokens;
        for (var i2 = 2; i2 < tokens.length; i2++) {
          if (isTodoItem(tokens, i2)) {
            todoify(tokens[i2], state.Token);
            attrSet2(tokens[i2 - 2], "class", "task-list-item" + (!disableCheckboxes ? " enabled" : ""));
            attrSet2(tokens[parentToken(tokens, i2 - 2)], "class", "contains-task-list");
          }
        }
      });
    };
    function attrSet2(token, name, value) {
      var index = token.attrIndex(name);
      var attr = [name, value];
      if (index < 0) {
        token.attrPush(attr);
      } else {
        token.attrs[index] = attr;
      }
    }
    function parentToken(tokens, index) {
      var targetLevel = tokens[index].level - 1;
      for (var i2 = index - 1; i2 >= 0; i2--) {
        if (tokens[i2].level === targetLevel) {
          return i2;
        }
      }
      return -1;
    }
    function isTodoItem(tokens, index) {
      return isInline(tokens[index]) && isParagraph(tokens[index - 1]) && isListItem(tokens[index - 2]) && startsWithTodoMarkdown(tokens[index]);
    }
    function todoify(token, TokenConstructor) {
      token.children.unshift(makeCheckbox(token, TokenConstructor));
      token.children[1].content = token.children[1].content.slice(3);
      token.content = token.content.slice(3);
      if (useLabelWrapper) {
        if (useLabelAfter) {
          token.children.pop();
          var id = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
          token.children[0].content = token.children[0].content.slice(0, -1) + ' id="' + id + '">';
          token.children.push(afterLabel(token.content, id, TokenConstructor));
        } else {
          token.children.unshift(beginLabel(TokenConstructor));
          token.children.push(endLabel(TokenConstructor));
        }
      }
    }
    function makeCheckbox(token, TokenConstructor) {
      var checkbox = new TokenConstructor("html_inline", "", 0);
      var disabledAttr = disableCheckboxes ? ' disabled="" ' : "";
      if (token.content.indexOf("[ ] ") === 0) {
        checkbox.content = '<input class="task-list-item-checkbox"' + disabledAttr + 'type="checkbox">';
      } else if (token.content.indexOf("[x] ") === 0 || token.content.indexOf("[X] ") === 0) {
        checkbox.content = '<input class="task-list-item-checkbox" checked=""' + disabledAttr + 'type="checkbox">';
      }
      return checkbox;
    }
    function beginLabel(TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = "<label>";
      return token;
    }
    function endLabel(TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = "</label>";
      return token;
    }
    function afterLabel(content, id, TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = '<label class="task-list-item-label" for="' + id + '">' + content + "</label>";
      token.attrs = [{ for: id }];
      return token;
    }
    function isInline(token) {
      return token.type === "inline";
    }
    function isParagraph(token) {
      return token.type === "paragraph_open";
    }
    function isListItem(token) {
      return token.type === "list_item_open";
    }
    function startsWithTodoMarkdown(token) {
      return token.content.indexOf("[ ] ") === 0 || token.content.indexOf("[x] ") === 0 || token.content.indexOf("[X] ") === 0;
    }
  }
});

// node_modules/cssfilter/lib/default.js
var require_default = __commonJS({
  "node_modules/cssfilter/lib/default.js"(exports) {
    function getDefaultWhiteList() {
      var whiteList = {};
      whiteList["align-content"] = false;
      whiteList["align-items"] = false;
      whiteList["align-self"] = false;
      whiteList["alignment-adjust"] = false;
      whiteList["alignment-baseline"] = false;
      whiteList["all"] = false;
      whiteList["anchor-point"] = false;
      whiteList["animation"] = false;
      whiteList["animation-delay"] = false;
      whiteList["animation-direction"] = false;
      whiteList["animation-duration"] = false;
      whiteList["animation-fill-mode"] = false;
      whiteList["animation-iteration-count"] = false;
      whiteList["animation-name"] = false;
      whiteList["animation-play-state"] = false;
      whiteList["animation-timing-function"] = false;
      whiteList["azimuth"] = false;
      whiteList["backface-visibility"] = false;
      whiteList["background"] = true;
      whiteList["background-attachment"] = true;
      whiteList["background-clip"] = true;
      whiteList["background-color"] = true;
      whiteList["background-image"] = true;
      whiteList["background-origin"] = true;
      whiteList["background-position"] = true;
      whiteList["background-repeat"] = true;
      whiteList["background-size"] = true;
      whiteList["baseline-shift"] = false;
      whiteList["binding"] = false;
      whiteList["bleed"] = false;
      whiteList["bookmark-label"] = false;
      whiteList["bookmark-level"] = false;
      whiteList["bookmark-state"] = false;
      whiteList["border"] = true;
      whiteList["border-bottom"] = true;
      whiteList["border-bottom-color"] = true;
      whiteList["border-bottom-left-radius"] = true;
      whiteList["border-bottom-right-radius"] = true;
      whiteList["border-bottom-style"] = true;
      whiteList["border-bottom-width"] = true;
      whiteList["border-collapse"] = true;
      whiteList["border-color"] = true;
      whiteList["border-image"] = true;
      whiteList["border-image-outset"] = true;
      whiteList["border-image-repeat"] = true;
      whiteList["border-image-slice"] = true;
      whiteList["border-image-source"] = true;
      whiteList["border-image-width"] = true;
      whiteList["border-left"] = true;
      whiteList["border-left-color"] = true;
      whiteList["border-left-style"] = true;
      whiteList["border-left-width"] = true;
      whiteList["border-radius"] = true;
      whiteList["border-right"] = true;
      whiteList["border-right-color"] = true;
      whiteList["border-right-style"] = true;
      whiteList["border-right-width"] = true;
      whiteList["border-spacing"] = true;
      whiteList["border-style"] = true;
      whiteList["border-top"] = true;
      whiteList["border-top-color"] = true;
      whiteList["border-top-left-radius"] = true;
      whiteList["border-top-right-radius"] = true;
      whiteList["border-top-style"] = true;
      whiteList["border-top-width"] = true;
      whiteList["border-width"] = true;
      whiteList["bottom"] = false;
      whiteList["box-decoration-break"] = true;
      whiteList["box-shadow"] = true;
      whiteList["box-sizing"] = true;
      whiteList["box-snap"] = true;
      whiteList["box-suppress"] = true;
      whiteList["break-after"] = true;
      whiteList["break-before"] = true;
      whiteList["break-inside"] = true;
      whiteList["caption-side"] = false;
      whiteList["chains"] = false;
      whiteList["clear"] = true;
      whiteList["clip"] = false;
      whiteList["clip-path"] = false;
      whiteList["clip-rule"] = false;
      whiteList["color"] = true;
      whiteList["color-interpolation-filters"] = true;
      whiteList["column-count"] = false;
      whiteList["column-fill"] = false;
      whiteList["column-gap"] = false;
      whiteList["column-rule"] = false;
      whiteList["column-rule-color"] = false;
      whiteList["column-rule-style"] = false;
      whiteList["column-rule-width"] = false;
      whiteList["column-span"] = false;
      whiteList["column-width"] = false;
      whiteList["columns"] = false;
      whiteList["contain"] = false;
      whiteList["content"] = false;
      whiteList["counter-increment"] = false;
      whiteList["counter-reset"] = false;
      whiteList["counter-set"] = false;
      whiteList["crop"] = false;
      whiteList["cue"] = false;
      whiteList["cue-after"] = false;
      whiteList["cue-before"] = false;
      whiteList["cursor"] = false;
      whiteList["direction"] = false;
      whiteList["display"] = true;
      whiteList["display-inside"] = true;
      whiteList["display-list"] = true;
      whiteList["display-outside"] = true;
      whiteList["dominant-baseline"] = false;
      whiteList["elevation"] = false;
      whiteList["empty-cells"] = false;
      whiteList["filter"] = false;
      whiteList["flex"] = false;
      whiteList["flex-basis"] = false;
      whiteList["flex-direction"] = false;
      whiteList["flex-flow"] = false;
      whiteList["flex-grow"] = false;
      whiteList["flex-shrink"] = false;
      whiteList["flex-wrap"] = false;
      whiteList["float"] = false;
      whiteList["float-offset"] = false;
      whiteList["flood-color"] = false;
      whiteList["flood-opacity"] = false;
      whiteList["flow-from"] = false;
      whiteList["flow-into"] = false;
      whiteList["font"] = true;
      whiteList["font-family"] = true;
      whiteList["font-feature-settings"] = true;
      whiteList["font-kerning"] = true;
      whiteList["font-language-override"] = true;
      whiteList["font-size"] = true;
      whiteList["font-size-adjust"] = true;
      whiteList["font-stretch"] = true;
      whiteList["font-style"] = true;
      whiteList["font-synthesis"] = true;
      whiteList["font-variant"] = true;
      whiteList["font-variant-alternates"] = true;
      whiteList["font-variant-caps"] = true;
      whiteList["font-variant-east-asian"] = true;
      whiteList["font-variant-ligatures"] = true;
      whiteList["font-variant-numeric"] = true;
      whiteList["font-variant-position"] = true;
      whiteList["font-weight"] = true;
      whiteList["grid"] = false;
      whiteList["grid-area"] = false;
      whiteList["grid-auto-columns"] = false;
      whiteList["grid-auto-flow"] = false;
      whiteList["grid-auto-rows"] = false;
      whiteList["grid-column"] = false;
      whiteList["grid-column-end"] = false;
      whiteList["grid-column-start"] = false;
      whiteList["grid-row"] = false;
      whiteList["grid-row-end"] = false;
      whiteList["grid-row-start"] = false;
      whiteList["grid-template"] = false;
      whiteList["grid-template-areas"] = false;
      whiteList["grid-template-columns"] = false;
      whiteList["grid-template-rows"] = false;
      whiteList["hanging-punctuation"] = false;
      whiteList["height"] = true;
      whiteList["hyphens"] = false;
      whiteList["icon"] = false;
      whiteList["image-orientation"] = false;
      whiteList["image-resolution"] = false;
      whiteList["ime-mode"] = false;
      whiteList["initial-letters"] = false;
      whiteList["inline-box-align"] = false;
      whiteList["justify-content"] = false;
      whiteList["justify-items"] = false;
      whiteList["justify-self"] = false;
      whiteList["left"] = false;
      whiteList["letter-spacing"] = true;
      whiteList["lighting-color"] = true;
      whiteList["line-box-contain"] = false;
      whiteList["line-break"] = false;
      whiteList["line-grid"] = false;
      whiteList["line-height"] = false;
      whiteList["line-snap"] = false;
      whiteList["line-stacking"] = false;
      whiteList["line-stacking-ruby"] = false;
      whiteList["line-stacking-shift"] = false;
      whiteList["line-stacking-strategy"] = false;
      whiteList["list-style"] = true;
      whiteList["list-style-image"] = true;
      whiteList["list-style-position"] = true;
      whiteList["list-style-type"] = true;
      whiteList["margin"] = true;
      whiteList["margin-bottom"] = true;
      whiteList["margin-left"] = true;
      whiteList["margin-right"] = true;
      whiteList["margin-top"] = true;
      whiteList["marker-offset"] = false;
      whiteList["marker-side"] = false;
      whiteList["marks"] = false;
      whiteList["mask"] = false;
      whiteList["mask-box"] = false;
      whiteList["mask-box-outset"] = false;
      whiteList["mask-box-repeat"] = false;
      whiteList["mask-box-slice"] = false;
      whiteList["mask-box-source"] = false;
      whiteList["mask-box-width"] = false;
      whiteList["mask-clip"] = false;
      whiteList["mask-image"] = false;
      whiteList["mask-origin"] = false;
      whiteList["mask-position"] = false;
      whiteList["mask-repeat"] = false;
      whiteList["mask-size"] = false;
      whiteList["mask-source-type"] = false;
      whiteList["mask-type"] = false;
      whiteList["max-height"] = true;
      whiteList["max-lines"] = false;
      whiteList["max-width"] = true;
      whiteList["min-height"] = true;
      whiteList["min-width"] = true;
      whiteList["move-to"] = false;
      whiteList["nav-down"] = false;
      whiteList["nav-index"] = false;
      whiteList["nav-left"] = false;
      whiteList["nav-right"] = false;
      whiteList["nav-up"] = false;
      whiteList["object-fit"] = false;
      whiteList["object-position"] = false;
      whiteList["opacity"] = false;
      whiteList["order"] = false;
      whiteList["orphans"] = false;
      whiteList["outline"] = false;
      whiteList["outline-color"] = false;
      whiteList["outline-offset"] = false;
      whiteList["outline-style"] = false;
      whiteList["outline-width"] = false;
      whiteList["overflow"] = false;
      whiteList["overflow-wrap"] = false;
      whiteList["overflow-x"] = false;
      whiteList["overflow-y"] = false;
      whiteList["padding"] = true;
      whiteList["padding-bottom"] = true;
      whiteList["padding-left"] = true;
      whiteList["padding-right"] = true;
      whiteList["padding-top"] = true;
      whiteList["page"] = false;
      whiteList["page-break-after"] = false;
      whiteList["page-break-before"] = false;
      whiteList["page-break-inside"] = false;
      whiteList["page-policy"] = false;
      whiteList["pause"] = false;
      whiteList["pause-after"] = false;
      whiteList["pause-before"] = false;
      whiteList["perspective"] = false;
      whiteList["perspective-origin"] = false;
      whiteList["pitch"] = false;
      whiteList["pitch-range"] = false;
      whiteList["play-during"] = false;
      whiteList["position"] = false;
      whiteList["presentation-level"] = false;
      whiteList["quotes"] = false;
      whiteList["region-fragment"] = false;
      whiteList["resize"] = false;
      whiteList["rest"] = false;
      whiteList["rest-after"] = false;
      whiteList["rest-before"] = false;
      whiteList["richness"] = false;
      whiteList["right"] = false;
      whiteList["rotation"] = false;
      whiteList["rotation-point"] = false;
      whiteList["ruby-align"] = false;
      whiteList["ruby-merge"] = false;
      whiteList["ruby-position"] = false;
      whiteList["shape-image-threshold"] = false;
      whiteList["shape-outside"] = false;
      whiteList["shape-margin"] = false;
      whiteList["size"] = false;
      whiteList["speak"] = false;
      whiteList["speak-as"] = false;
      whiteList["speak-header"] = false;
      whiteList["speak-numeral"] = false;
      whiteList["speak-punctuation"] = false;
      whiteList["speech-rate"] = false;
      whiteList["stress"] = false;
      whiteList["string-set"] = false;
      whiteList["tab-size"] = false;
      whiteList["table-layout"] = false;
      whiteList["text-align"] = true;
      whiteList["text-align-last"] = true;
      whiteList["text-combine-upright"] = true;
      whiteList["text-decoration"] = true;
      whiteList["text-decoration-color"] = true;
      whiteList["text-decoration-line"] = true;
      whiteList["text-decoration-skip"] = true;
      whiteList["text-decoration-style"] = true;
      whiteList["text-emphasis"] = true;
      whiteList["text-emphasis-color"] = true;
      whiteList["text-emphasis-position"] = true;
      whiteList["text-emphasis-style"] = true;
      whiteList["text-height"] = true;
      whiteList["text-indent"] = true;
      whiteList["text-justify"] = true;
      whiteList["text-orientation"] = true;
      whiteList["text-overflow"] = true;
      whiteList["text-shadow"] = true;
      whiteList["text-space-collapse"] = true;
      whiteList["text-transform"] = true;
      whiteList["text-underline-position"] = true;
      whiteList["text-wrap"] = true;
      whiteList["top"] = false;
      whiteList["transform"] = false;
      whiteList["transform-origin"] = false;
      whiteList["transform-style"] = false;
      whiteList["transition"] = false;
      whiteList["transition-delay"] = false;
      whiteList["transition-duration"] = false;
      whiteList["transition-property"] = false;
      whiteList["transition-timing-function"] = false;
      whiteList["unicode-bidi"] = false;
      whiteList["vertical-align"] = false;
      whiteList["visibility"] = false;
      whiteList["voice-balance"] = false;
      whiteList["voice-duration"] = false;
      whiteList["voice-family"] = false;
      whiteList["voice-pitch"] = false;
      whiteList["voice-range"] = false;
      whiteList["voice-rate"] = false;
      whiteList["voice-stress"] = false;
      whiteList["voice-volume"] = false;
      whiteList["volume"] = false;
      whiteList["white-space"] = false;
      whiteList["widows"] = false;
      whiteList["width"] = true;
      whiteList["will-change"] = false;
      whiteList["word-break"] = true;
      whiteList["word-spacing"] = true;
      whiteList["word-wrap"] = true;
      whiteList["wrap-flow"] = false;
      whiteList["wrap-through"] = false;
      whiteList["writing-mode"] = false;
      whiteList["z-index"] = false;
      return whiteList;
    }
    function onAttr(name, value, options) {
    }
    function onIgnoreAttr(name, value, options) {
    }
    var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;
    function safeAttrValue(name, value) {
      if (REGEXP_URL_JAVASCRIPT.test(value))
        return "";
      return value;
    }
    exports.whiteList = getDefaultWhiteList();
    exports.getDefaultWhiteList = getDefaultWhiteList;
    exports.onAttr = onAttr;
    exports.onIgnoreAttr = onIgnoreAttr;
    exports.safeAttrValue = safeAttrValue;
  }
});

// node_modules/cssfilter/lib/util.js
var require_util = __commonJS({
  "node_modules/cssfilter/lib/util.js"(exports, module) {
    module.exports = {
      indexOf: function(arr, item) {
        var i2, j;
        if (Array.prototype.indexOf) {
          return arr.indexOf(item);
        }
        for (i2 = 0, j = arr.length; i2 < j; i2++) {
          if (arr[i2] === item) {
            return i2;
          }
        }
        return -1;
      },
      forEach: function(arr, fn, scope) {
        var i2, j;
        if (Array.prototype.forEach) {
          return arr.forEach(fn, scope);
        }
        for (i2 = 0, j = arr.length; i2 < j; i2++) {
          fn.call(scope, arr[i2], i2, arr);
        }
      },
      trim: function(str) {
        if (String.prototype.trim) {
          return str.trim();
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
      },
      trimRight: function(str) {
        if (String.prototype.trimRight) {
          return str.trimRight();
        }
        return str.replace(/(\s*$)/g, "");
      }
    };
  }
});

// node_modules/cssfilter/lib/parser.js
var require_parser = __commonJS({
  "node_modules/cssfilter/lib/parser.js"(exports, module) {
    var _ = require_util();
    function parseStyle(css2, onAttr) {
      css2 = _.trimRight(css2);
      if (css2[css2.length - 1] !== ";")
        css2 += ";";
      var cssLength = css2.length;
      var isParenthesisOpen = false;
      var lastPos = 0;
      var i2 = 0;
      var retCSS = "";
      function addNewAttr() {
        if (!isParenthesisOpen) {
          var source = _.trim(css2.slice(lastPos, i2));
          var j2 = source.indexOf(":");
          if (j2 !== -1) {
            var name = _.trim(source.slice(0, j2));
            var value = _.trim(source.slice(j2 + 1));
            if (name) {
              var ret = onAttr(lastPos, retCSS.length, name, value, source);
              if (ret)
                retCSS += ret + "; ";
            }
          }
        }
        lastPos = i2 + 1;
      }
      for (; i2 < cssLength; i2++) {
        var c = css2[i2];
        if (c === "/" && css2[i2 + 1] === "*") {
          var j = css2.indexOf("*/", i2 + 2);
          if (j === -1)
            break;
          i2 = j + 1;
          lastPos = i2 + 1;
          isParenthesisOpen = false;
        } else if (c === "(") {
          isParenthesisOpen = true;
        } else if (c === ")") {
          isParenthesisOpen = false;
        } else if (c === ";") {
          if (isParenthesisOpen) {
          } else {
            addNewAttr();
          }
        } else if (c === "\n") {
          addNewAttr();
        }
      }
      return _.trim(retCSS);
    }
    module.exports = parseStyle;
  }
});

// node_modules/cssfilter/lib/css.js
var require_css = __commonJS({
  "node_modules/cssfilter/lib/css.js"(exports, module) {
    var DEFAULT = require_default();
    var parseStyle = require_parser();
    var _ = require_util();
    function isNull(obj) {
      return obj === void 0 || obj === null;
    }
    function shallowCopyObject(obj) {
      var ret = {};
      for (var i2 in obj) {
        ret[i2] = obj[i2];
      }
      return ret;
    }
    function FilterCSS(options) {
      options = shallowCopyObject(options || {});
      options.whiteList = options.whiteList || DEFAULT.whiteList;
      options.onAttr = options.onAttr || DEFAULT.onAttr;
      options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
      options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
      this.options = options;
    }
    FilterCSS.prototype.process = function(css2) {
      css2 = css2 || "";
      css2 = css2.toString();
      if (!css2)
        return "";
      var me = this;
      var options = me.options;
      var whiteList = options.whiteList;
      var onAttr = options.onAttr;
      var onIgnoreAttr = options.onIgnoreAttr;
      var safeAttrValue = options.safeAttrValue;
      var retCSS = parseStyle(css2, function(sourcePosition, position, name, value, source) {
        var check = whiteList[name];
        var isWhite = false;
        if (check === true)
          isWhite = check;
        else if (typeof check === "function")
          isWhite = check(value);
        else if (check instanceof RegExp)
          isWhite = check.test(value);
        if (isWhite !== true)
          isWhite = false;
        value = safeAttrValue(name, value);
        if (!value)
          return;
        var opts = {
          position,
          sourcePosition,
          source,
          isWhite
        };
        if (isWhite) {
          var ret = onAttr(name, value, opts);
          if (isNull(ret)) {
            return name + ":" + value;
          } else {
            return ret;
          }
        } else {
          var ret = onIgnoreAttr(name, value, opts);
          if (!isNull(ret)) {
            return ret;
          }
        }
      });
      return retCSS;
    };
    module.exports = FilterCSS;
  }
});

// node_modules/cssfilter/lib/index.js
var require_lib = __commonJS({
  "node_modules/cssfilter/lib/index.js"(exports, module) {
    var DEFAULT = require_default();
    var FilterCSS = require_css();
    function filterCSS(html, options) {
      var xss = new FilterCSS(options);
      return xss.process(html);
    }
    exports = module.exports = filterCSS;
    exports.FilterCSS = FilterCSS;
    for (i2 in DEFAULT)
      exports[i2] = DEFAULT[i2];
    var i2;
    if (typeof window !== "undefined") {
      window.filterCSS = module.exports;
    }
  }
});

// node_modules/xss/lib/util.js
var require_util2 = __commonJS({
  "node_modules/xss/lib/util.js"(exports, module) {
    module.exports = {
      indexOf: function(arr, item) {
        var i2, j;
        if (Array.prototype.indexOf) {
          return arr.indexOf(item);
        }
        for (i2 = 0, j = arr.length; i2 < j; i2++) {
          if (arr[i2] === item) {
            return i2;
          }
        }
        return -1;
      },
      forEach: function(arr, fn, scope) {
        var i2, j;
        if (Array.prototype.forEach) {
          return arr.forEach(fn, scope);
        }
        for (i2 = 0, j = arr.length; i2 < j; i2++) {
          fn.call(scope, arr[i2], i2, arr);
        }
      },
      trim: function(str) {
        if (String.prototype.trim) {
          return str.trim();
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
      },
      spaceIndex: function(str) {
        var reg = /\s|\n|\t/;
        var match2 = reg.exec(str);
        return match2 ? match2.index : -1;
      }
    };
  }
});

// node_modules/xss/lib/default.js
var require_default2 = __commonJS({
  "node_modules/xss/lib/default.js"(exports) {
    var FilterCSS = require_lib().FilterCSS;
    var getDefaultCSSWhiteList = require_lib().getDefaultWhiteList;
    var _ = require_util2();
    function getDefaultWhiteList() {
      return {
        a: ["target", "href", "title"],
        abbr: ["title"],
        address: [],
        area: ["shape", "coords", "href", "alt"],
        article: [],
        aside: [],
        audio: [
          "autoplay",
          "controls",
          "crossorigin",
          "loop",
          "muted",
          "preload",
          "src"
        ],
        b: [],
        bdi: ["dir"],
        bdo: ["dir"],
        big: [],
        blockquote: ["cite"],
        br: [],
        caption: [],
        center: [],
        cite: [],
        code: [],
        col: ["align", "valign", "span", "width"],
        colgroup: ["align", "valign", "span", "width"],
        dd: [],
        del: ["datetime"],
        details: ["open"],
        div: [],
        dl: [],
        dt: [],
        em: [],
        figcaption: [],
        figure: [],
        font: ["color", "size", "face"],
        footer: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        header: [],
        hr: [],
        i: [],
        img: ["src", "alt", "title", "width", "height", "loading"],
        ins: ["datetime"],
        kbd: [],
        li: [],
        mark: [],
        nav: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        section: [],
        small: [],
        span: [],
        sub: [],
        summary: [],
        sup: [],
        strong: [],
        strike: [],
        table: ["width", "border", "align", "valign"],
        tbody: ["align", "valign"],
        td: ["width", "rowspan", "colspan", "align", "valign"],
        tfoot: ["align", "valign"],
        th: ["width", "rowspan", "colspan", "align", "valign"],
        thead: ["align", "valign"],
        tr: ["rowspan", "align", "valign"],
        tt: [],
        u: [],
        ul: [],
        video: [
          "autoplay",
          "controls",
          "crossorigin",
          "loop",
          "muted",
          "playsinline",
          "poster",
          "preload",
          "src",
          "height",
          "width"
        ]
      };
    }
    var defaultCSSFilter = new FilterCSS();
    function onTag(tag, html, options) {
    }
    function onIgnoreTag(tag, html, options) {
    }
    function onTagAttr(tag, name, value) {
    }
    function onIgnoreTagAttr(tag, name, value) {
    }
    function escapeHtml2(html) {
      return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
    }
    function safeAttrValue(tag, name, value, cssFilter) {
      value = friendlyAttrValue(value);
      if (name === "href" || name === "src") {
        value = _.trim(value);
        if (value === "#")
          return "#";
        if (!(value.substr(0, 7) === "http://" || value.substr(0, 8) === "https://" || value.substr(0, 7) === "mailto:" || value.substr(0, 4) === "tel:" || value.substr(0, 11) === "data:image/" || value.substr(0, 6) === "ftp://" || value.substr(0, 2) === "./" || value.substr(0, 3) === "../" || value[0] === "#" || value[0] === "/")) {
          return "";
        }
      } else if (name === "background") {
        REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
        if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
          return "";
        }
      } else if (name === "style") {
        REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
        if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
          return "";
        }
        REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
        if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
          REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
          if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
            return "";
          }
        }
        if (cssFilter !== false) {
          cssFilter = cssFilter || defaultCSSFilter;
          value = cssFilter.process(value);
        }
      }
      value = escapeAttrValue(value);
      return value;
    }
    var REGEXP_LT = /</g;
    var REGEXP_GT = />/g;
    var REGEXP_QUOTE = /"/g;
    var REGEXP_QUOTE_2 = /&quot;/g;
    var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
    var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
    var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
    var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi;
    var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
    var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;
    function escapeQuote(str) {
      return str.replace(REGEXP_QUOTE, "&quot;");
    }
    function unescapeQuote(str) {
      return str.replace(REGEXP_QUOTE_2, '"');
    }
    function escapeHtmlEntities(str) {
      return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str2, code2) {
        return code2[0] === "x" || code2[0] === "X" ? String.fromCharCode(parseInt(code2.substr(1), 16)) : String.fromCharCode(parseInt(code2, 10));
      });
    }
    function escapeDangerHtml5Entities(str) {
      return str.replace(REGEXP_ATTR_VALUE_COLON, ":").replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
    }
    function clearNonPrintableCharacter(str) {
      var str2 = "";
      for (var i2 = 0, len = str.length; i2 < len; i2++) {
        str2 += str.charCodeAt(i2) < 32 ? " " : str.charAt(i2);
      }
      return _.trim(str2);
    }
    function friendlyAttrValue(str) {
      str = unescapeQuote(str);
      str = escapeHtmlEntities(str);
      str = escapeDangerHtml5Entities(str);
      str = clearNonPrintableCharacter(str);
      return str;
    }
    function escapeAttrValue(str) {
      str = escapeQuote(str);
      str = escapeHtml2(str);
      return str;
    }
    function onIgnoreTagStripAll() {
      return "";
    }
    function StripTagBody(tags2, next) {
      if (typeof next !== "function") {
        next = function() {
        };
      }
      var isRemoveAllTag = !Array.isArray(tags2);
      function isRemoveTag(tag) {
        if (isRemoveAllTag)
          return true;
        return _.indexOf(tags2, tag) !== -1;
      }
      var removeList = [];
      var posStart = false;
      return {
        onIgnoreTag: function(tag, html, options) {
          if (isRemoveTag(tag)) {
            if (options.isClosing) {
              var ret = "[/removed]";
              var end = options.position + ret.length;
              removeList.push([
                posStart !== false ? posStart : options.position,
                end
              ]);
              posStart = false;
              return ret;
            } else {
              if (!posStart) {
                posStart = options.position;
              }
              return "[removed]";
            }
          } else {
            return next(tag, html, options);
          }
        },
        remove: function(html) {
          var rethtml = "";
          var lastPos = 0;
          _.forEach(removeList, function(pos) {
            rethtml += html.slice(lastPos, pos[0]);
            lastPos = pos[1];
          });
          rethtml += html.slice(lastPos);
          return rethtml;
        }
      };
    }
    function stripCommentTag(html) {
      var retHtml = "";
      var lastPos = 0;
      while (lastPos < html.length) {
        var i2 = html.indexOf("<!--", lastPos);
        if (i2 === -1) {
          retHtml += html.slice(lastPos);
          break;
        }
        retHtml += html.slice(lastPos, i2);
        var j = html.indexOf("-->", i2);
        if (j === -1) {
          break;
        }
        lastPos = j + 3;
      }
      return retHtml;
    }
    function stripBlankChar(html) {
      var chars = html.split("");
      chars = chars.filter(function(char) {
        var c = char.charCodeAt(0);
        if (c === 127)
          return false;
        if (c <= 31) {
          if (c === 10 || c === 13)
            return true;
          return false;
        }
        return true;
      });
      return chars.join("");
    }
    exports.whiteList = getDefaultWhiteList();
    exports.getDefaultWhiteList = getDefaultWhiteList;
    exports.onTag = onTag;
    exports.onIgnoreTag = onIgnoreTag;
    exports.onTagAttr = onTagAttr;
    exports.onIgnoreTagAttr = onIgnoreTagAttr;
    exports.safeAttrValue = safeAttrValue;
    exports.escapeHtml = escapeHtml2;
    exports.escapeQuote = escapeQuote;
    exports.unescapeQuote = unescapeQuote;
    exports.escapeHtmlEntities = escapeHtmlEntities;
    exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
    exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
    exports.friendlyAttrValue = friendlyAttrValue;
    exports.escapeAttrValue = escapeAttrValue;
    exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
    exports.StripTagBody = StripTagBody;
    exports.stripCommentTag = stripCommentTag;
    exports.stripBlankChar = stripBlankChar;
    exports.attributeWrapSign = '"';
    exports.cssFilter = defaultCSSFilter;
    exports.getDefaultCSSWhiteList = getDefaultCSSWhiteList;
  }
});

// node_modules/xss/lib/parser.js
var require_parser2 = __commonJS({
  "node_modules/xss/lib/parser.js"(exports) {
    var _ = require_util2();
    function getTagName(html) {
      var i2 = _.spaceIndex(html);
      var tagName;
      if (i2 === -1) {
        tagName = html.slice(1, -1);
      } else {
        tagName = html.slice(1, i2 + 1);
      }
      tagName = _.trim(tagName).toLowerCase();
      if (tagName.slice(0, 1) === "/")
        tagName = tagName.slice(1);
      if (tagName.slice(-1) === "/")
        tagName = tagName.slice(0, -1);
      return tagName;
    }
    function isClosing(html) {
      return html.slice(0, 2) === "</";
    }
    function parseTag(html, onTag, escapeHtml2) {
      "use strict";
      var rethtml = "";
      var lastPos = 0;
      var tagStart = false;
      var quoteStart = false;
      var currentPos = 0;
      var len = html.length;
      var currentTagName = "";
      var currentHtml = "";
      chariterator:
        for (currentPos = 0; currentPos < len; currentPos++) {
          var c = html.charAt(currentPos);
          if (tagStart === false) {
            if (c === "<") {
              tagStart = currentPos;
              continue;
            }
          } else {
            if (quoteStart === false) {
              if (c === "<") {
                rethtml += escapeHtml2(html.slice(lastPos, currentPos));
                tagStart = currentPos;
                lastPos = currentPos;
                continue;
              }
              if (c === ">" || currentPos === len - 1) {
                rethtml += escapeHtml2(html.slice(lastPos, tagStart));
                currentHtml = html.slice(tagStart, currentPos + 1);
                currentTagName = getTagName(currentHtml);
                rethtml += onTag(
                  tagStart,
                  rethtml.length,
                  currentTagName,
                  currentHtml,
                  isClosing(currentHtml)
                );
                lastPos = currentPos + 1;
                tagStart = false;
                continue;
              }
              if (c === '"' || c === "'") {
                var i2 = 1;
                var ic = html.charAt(currentPos - i2);
                while (ic.trim() === "" || ic === "=") {
                  if (ic === "=") {
                    quoteStart = c;
                    continue chariterator;
                  }
                  ic = html.charAt(currentPos - ++i2);
                }
              }
            } else {
              if (c === quoteStart) {
                quoteStart = false;
                continue;
              }
            }
          }
        }
      if (lastPos < len) {
        rethtml += escapeHtml2(html.substr(lastPos));
      }
      return rethtml;
    }
    var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9\\_:.-]/gim;
    function parseAttr(html, onAttr) {
      "use strict";
      var lastPos = 0;
      var lastMarkPos = 0;
      var retAttrs = [];
      var tmpName = false;
      var len = html.length;
      function addAttr(name, value) {
        name = _.trim(name);
        name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
        if (name.length < 1)
          return;
        var ret = onAttr(name, value || "");
        if (ret)
          retAttrs.push(ret);
      }
      for (var i2 = 0; i2 < len; i2++) {
        var c = html.charAt(i2);
        var v, j;
        if (tmpName === false && c === "=") {
          tmpName = html.slice(lastPos, i2);
          lastPos = i2 + 1;
          lastMarkPos = html.charAt(lastPos) === '"' || html.charAt(lastPos) === "'" ? lastPos : findNextQuotationMark(html, i2 + 1);
          continue;
        }
        if (tmpName !== false) {
          if (i2 === lastMarkPos) {
            j = html.indexOf(c, i2 + 1);
            if (j === -1) {
              break;
            } else {
              v = _.trim(html.slice(lastMarkPos + 1, j));
              addAttr(tmpName, v);
              tmpName = false;
              i2 = j;
              lastPos = i2 + 1;
              continue;
            }
          }
        }
        if (/\s|\n|\t/.test(c)) {
          html = html.replace(/\s|\n|\t/g, " ");
          if (tmpName === false) {
            j = findNextEqual(html, i2);
            if (j === -1) {
              v = _.trim(html.slice(lastPos, i2));
              addAttr(v);
              tmpName = false;
              lastPos = i2 + 1;
              continue;
            } else {
              i2 = j - 1;
              continue;
            }
          } else {
            j = findBeforeEqual(html, i2 - 1);
            if (j === -1) {
              v = _.trim(html.slice(lastPos, i2));
              v = stripQuoteWrap(v);
              addAttr(tmpName, v);
              tmpName = false;
              lastPos = i2 + 1;
              continue;
            } else {
              continue;
            }
          }
        }
      }
      if (lastPos < html.length) {
        if (tmpName === false) {
          addAttr(html.slice(lastPos));
        } else {
          addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))));
        }
      }
      return _.trim(retAttrs.join(" "));
    }
    function findNextEqual(str, i2) {
      for (; i2 < str.length; i2++) {
        var c = str[i2];
        if (c === " ")
          continue;
        if (c === "=")
          return i2;
        return -1;
      }
    }
    function findNextQuotationMark(str, i2) {
      for (; i2 < str.length; i2++) {
        var c = str[i2];
        if (c === " ")
          continue;
        if (c === "'" || c === '"')
          return i2;
        return -1;
      }
    }
    function findBeforeEqual(str, i2) {
      for (; i2 > 0; i2--) {
        var c = str[i2];
        if (c === " ")
          continue;
        if (c === "=")
          return i2;
        return -1;
      }
    }
    function isQuoteWrapString(text2) {
      if (text2[0] === '"' && text2[text2.length - 1] === '"' || text2[0] === "'" && text2[text2.length - 1] === "'") {
        return true;
      } else {
        return false;
      }
    }
    function stripQuoteWrap(text2) {
      if (isQuoteWrapString(text2)) {
        return text2.substr(1, text2.length - 2);
      } else {
        return text2;
      }
    }
    exports.parseTag = parseTag;
    exports.parseAttr = parseAttr;
  }
});

// node_modules/xss/lib/xss.js
var require_xss = __commonJS({
  "node_modules/xss/lib/xss.js"(exports, module) {
    var FilterCSS = require_lib().FilterCSS;
    var DEFAULT = require_default2();
    var parser = require_parser2();
    var parseTag = parser.parseTag;
    var parseAttr = parser.parseAttr;
    var _ = require_util2();
    function isNull(obj) {
      return obj === void 0 || obj === null;
    }
    function getAttrs(html) {
      var i2 = _.spaceIndex(html);
      if (i2 === -1) {
        return {
          html: "",
          closing: html[html.length - 2] === "/"
        };
      }
      html = _.trim(html.slice(i2 + 1, -1));
      var isClosing = html[html.length - 1] === "/";
      if (isClosing)
        html = _.trim(html.slice(0, -1));
      return {
        html,
        closing: isClosing
      };
    }
    function shallowCopyObject(obj) {
      var ret = {};
      for (var i2 in obj) {
        ret[i2] = obj[i2];
      }
      return ret;
    }
    function keysToLowerCase(obj) {
      var ret = {};
      for (var i2 in obj) {
        if (Array.isArray(obj[i2])) {
          ret[i2.toLowerCase()] = obj[i2].map(function(item) {
            return item.toLowerCase();
          });
        } else {
          ret[i2.toLowerCase()] = obj[i2];
        }
      }
      return ret;
    }
    function FilterXSS(options) {
      options = shallowCopyObject(options || {});
      if (options.stripIgnoreTag) {
        if (options.onIgnoreTag) {
          console.error(
            'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
          );
        }
        options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
      }
      if (options.whiteList || options.allowList) {
        options.whiteList = keysToLowerCase(options.whiteList || options.allowList);
      } else {
        options.whiteList = DEFAULT.whiteList;
      }
      this.attributeWrapSign = options.singleQuotedAttributeValue === true ? "'" : DEFAULT.attributeWrapSign;
      options.onTag = options.onTag || DEFAULT.onTag;
      options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
      options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
      options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
      options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
      options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
      this.options = options;
      if (options.css === false) {
        this.cssFilter = false;
      } else {
        options.css = options.css || {};
        this.cssFilter = new FilterCSS(options.css);
      }
    }
    FilterXSS.prototype.process = function(html) {
      html = html || "";
      html = html.toString();
      if (!html)
        return "";
      var me = this;
      var options = me.options;
      var whiteList = options.whiteList;
      var onTag = options.onTag;
      var onIgnoreTag = options.onIgnoreTag;
      var onTagAttr = options.onTagAttr;
      var onIgnoreTagAttr = options.onIgnoreTagAttr;
      var safeAttrValue = options.safeAttrValue;
      var escapeHtml2 = options.escapeHtml;
      var attributeWrapSign = me.attributeWrapSign;
      var cssFilter = me.cssFilter;
      if (options.stripBlankChar) {
        html = DEFAULT.stripBlankChar(html);
      }
      if (!options.allowCommentTag) {
        html = DEFAULT.stripCommentTag(html);
      }
      var stripIgnoreTagBody = false;
      if (options.stripIgnoreTagBody) {
        stripIgnoreTagBody = DEFAULT.StripTagBody(
          options.stripIgnoreTagBody,
          onIgnoreTag
        );
        onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
      }
      var retHtml = parseTag(
        html,
        function(sourcePosition, position, tag, html2, isClosing) {
          var info = {
            sourcePosition,
            position,
            isClosing,
            isWhite: Object.prototype.hasOwnProperty.call(whiteList, tag)
          };
          var ret = onTag(tag, html2, info);
          if (!isNull(ret))
            return ret;
          if (info.isWhite) {
            if (info.isClosing) {
              return "</" + tag + ">";
            }
            var attrs = getAttrs(html2);
            var whiteAttrList = whiteList[tag];
            var attrsHtml = parseAttr(attrs.html, function(name, value) {
              var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
              var ret2 = onTagAttr(tag, name, value, isWhiteAttr);
              if (!isNull(ret2))
                return ret2;
              if (isWhiteAttr) {
                value = safeAttrValue(tag, name, value, cssFilter);
                if (value) {
                  return name + "=" + attributeWrapSign + value + attributeWrapSign;
                } else {
                  return name;
                }
              } else {
                ret2 = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
                if (!isNull(ret2))
                  return ret2;
                return;
              }
            });
            html2 = "<" + tag;
            if (attrsHtml)
              html2 += " " + attrsHtml;
            if (attrs.closing)
              html2 += " /";
            html2 += ">";
            return html2;
          } else {
            ret = onIgnoreTag(tag, html2, info);
            if (!isNull(ret))
              return ret;
            return escapeHtml2(html2);
          }
        },
        escapeHtml2
      );
      if (stripIgnoreTagBody) {
        retHtml = stripIgnoreTagBody.remove(retHtml);
      }
      return retHtml;
    };
    module.exports = FilterXSS;
  }
});

// node_modules/xss/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/xss/lib/index.js"(exports, module) {
    var DEFAULT = require_default2();
    var parser = require_parser2();
    var FilterXSS = require_xss();
    function filterXSS(html, options) {
      var xss = new FilterXSS(options);
      return xss.process(html);
    }
    exports = module.exports = filterXSS;
    exports.filterXSS = filterXSS;
    exports.FilterXSS = FilterXSS;
    (function() {
      for (var i2 in DEFAULT) {
        exports[i2] = DEFAULT[i2];
      }
      for (var j in parser) {
        exports[j] = parser[j];
      }
    })();
    if (typeof window !== "undefined") {
      window.filterXSS = module.exports;
    }
    function isWorkerEnv() {
      return typeof self !== "undefined" && typeof DedicatedWorkerGlobalScope !== "undefined" && self instanceof DedicatedWorkerGlobalScope;
    }
    if (isWorkerEnv()) {
      self.filterXSS = module.exports;
    }
  }
});

// node_modules/markdown-it-xss/index.js
var require_markdown_it_xss = __commonJS({
  "node_modules/markdown-it-xss/index.js"(exports, module) {
    var jsxss = require_lib2();
    module.exports = function xssProtector(md, { xss } = {}) {
      const customXss = new jsxss.FilterXSS(typeof xss === "function" ? xss(jsxss) : xss);
      function filterContent(str) {
        str = customXss.process(str);
        return str;
      }
      function xssProtector2(state) {
        for (let i2 = 0; i2 < state.tokens.length; i2++) {
          let cur = state.tokens[i2];
          if (cur.type === "html_block") {
            cur.content = filterContent(cur.content);
          }
          if (cur.type === "inline") {
            let inlineTokens = cur.children;
            for (let ii = 0; ii < inlineTokens.length; ii++) {
              if (inlineTokens[ii].type === "html_inline") {
                inlineTokens[ii].content = filterContent(inlineTokens[ii].content);
              }
            }
          }
        }
      }
      md.core.ruler.after("linkify", "xss", xssProtector2);
    };
  }
});

// node_modules/md-editor-v3/lib/es/chunks/config.mjs
var prefix = "md-editor";
var iconfontSvgUrl = "https://at.alicdn.com/t/c/font_2605852_prouiefeic.js";
var iconfontClassUrl = "https://at.alicdn.com/t/c/font_2605852_prouiefeic.css";
var cdnBase = "https://cdnjs.cloudflare.com/ajax/libs";
var highlightUrl = `${cdnBase}/highlight.js/11.8.0/highlight.min.js`;
var prettierUrl = {
  main: `${cdnBase}/prettier/2.8.0/standalone.js`,
  markdown: `${cdnBase}/prettier/2.8.0/parser-markdown.js`
};
var cropperUrl = {
  css: `${cdnBase}/cropperjs/1.5.13/cropper.min.css`,
  js: `${cdnBase}/cropperjs/1.5.13/cropper.min.js`
};
var screenfullUrl = `${cdnBase}/screenfull.js/5.2.0/screenfull.min.js`;
var allToolbar = [
  "bold",
  "underline",
  "italic",
  "strikeThrough",
  "-",
  "title",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "task",
  "-",
  "codeRow",
  "code",
  "link",
  "image",
  "table",
  "mermaid",
  "katex",
  "-",
  "revoke",
  "next",
  "save",
  "=",
  "prettier",
  "pageFullscreen",
  "fullscreen",
  "preview",
  "htmlPreview",
  "catalog",
  "github"
];
var allFooter = ["markdownTotal", "=", "scrollSwitch"];
var staticTextDefault = {
  "zh-CN": {
    toolbarTips: {
      bold: "加粗",
      underline: "下划线",
      italic: "斜体",
      strikeThrough: "删除线",
      title: "标题",
      sub: "下标",
      sup: "上标",
      quote: "引用",
      unorderedList: "无序列表",
      orderedList: "有序列表",
      task: "任务列表",
      codeRow: "行内代码",
      code: "块级代码",
      link: "链接",
      image: "图片",
      table: "表格",
      mermaid: "mermaid图",
      katex: "katex公式",
      revoke: "后退",
      next: "前进",
      save: "保存",
      prettier: "美化",
      pageFullscreen: "浏览器全屏",
      fullscreen: "屏幕全屏",
      preview: "预览",
      htmlPreview: "html代码预览",
      catalog: "目录",
      github: "源码地址"
    },
    titleItem: {
      h1: "一级标题",
      h2: "二级标题",
      h3: "三级标题",
      h4: "四级标题",
      h5: "五级标题",
      h6: "六级标题"
    },
    imgTitleItem: {
      link: "添加链接",
      upload: "上传图片",
      clip2upload: "裁剪上传"
    },
    linkModalTips: {
      linkTitle: "添加链接",
      imageTitle: "添加图片",
      descLabel: "链接描述：",
      descLabelPlaceHolder: "请输入描述...",
      urlLabel: "链接地址：",
      urlLabelPlaceHolder: "请输入链接...",
      buttonOK: "确定"
    },
    clipModalTips: {
      title: "裁剪图片上传",
      buttonUpload: "上传"
    },
    copyCode: {
      text: "复制代码",
      successTips: "已复制！",
      failTips: "复制失败！"
    },
    mermaid: {
      flow: "流程图",
      sequence: "时序图",
      gantt: "甘特图",
      class: "类图",
      state: "状态图",
      pie: "饼图",
      relationship: "关系图",
      journey: "旅程图"
    },
    katex: {
      inline: "行内公式",
      block: "块级公式"
    },
    footer: {
      markdownTotal: "字数",
      scrollAuto: "同步滚动"
    }
  },
  "en-US": {
    toolbarTips: {
      bold: "bold",
      underline: "underline",
      italic: "italic",
      strikeThrough: "strikeThrough",
      title: "title",
      sub: "subscript",
      sup: "superscript",
      quote: "quote",
      unorderedList: "unordered list",
      orderedList: "ordered list",
      task: "task list",
      codeRow: "inline code",
      code: "block-level code",
      link: "link",
      image: "image",
      table: "table",
      mermaid: "mermaid",
      katex: "formula",
      revoke: "revoke",
      next: "undo revoke",
      save: "save",
      prettier: "prettier",
      pageFullscreen: "fullscreen in page",
      fullscreen: "fullscreen",
      preview: "preview",
      htmlPreview: "html preview",
      catalog: "catalog",
      github: "source code"
    },
    titleItem: {
      h1: "Lv1 Heading",
      h2: "Lv2 Heading",
      h3: "Lv3 Heading",
      h4: "Lv4 Heading",
      h5: "Lv5 Heading",
      h6: "Lv6 Heading"
    },
    imgTitleItem: {
      link: "Add Img Link",
      upload: "Upload Img",
      clip2upload: "Clip Upload"
    },
    linkModalTips: {
      linkTitle: "Add Link",
      imageTitle: "Add Image",
      descLabel: "Desc:",
      descLabelPlaceHolder: "Enter a description...",
      urlLabel: "Link:",
      urlLabelPlaceHolder: "Enter a link...",
      buttonOK: "OK"
    },
    clipModalTips: {
      title: "Crop Image",
      buttonUpload: "Upload"
    },
    copyCode: {
      text: "Copy",
      successTips: "Copied!",
      failTips: "Copy failed!"
    },
    mermaid: {
      flow: "flow",
      sequence: "sequence",
      gantt: "gantt",
      class: "class",
      state: "state",
      pie: "pie",
      relationship: "relationship",
      journey: "journey"
    },
    katex: {
      inline: "inline",
      block: "block"
    },
    footer: {
      markdownTotal: "Character Count",
      scrollAuto: "Scroll Auto"
    }
  }
};
var mermaidUrl = `${cdnBase}/mermaid/10.6.1/mermaid.esm.min.mjs`;
var katexUrl = {
  js: `${cdnBase}/KaTeX/0.16.9/katex.min.js`,
  css: `${cdnBase}/KaTeX/0.16.9/katex.min.css`
};
var codeCss = {
  a11y: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/a11y-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/a11y-dark.min.css`
  },
  atom: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/atom-one-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/atom-one-dark.min.css`
  },
  github: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/github.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/github-dark.min.css`
  },
  gradient: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/gradient-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/gradient-dark.min.css`
  },
  kimbie: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/kimbie-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/kimbie-dark.min.css`
  },
  paraiso: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/paraiso-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/paraiso-dark.min.css`
  },
  qtcreator: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/qtcreator-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/qtcreator-dark.min.css`
  },
  stackoverflow: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/stackoverflow-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/stackoverflow-dark.min.css`
  }
};
var configOption = {
  editorExtensions: {},
  editorConfig: {},
  codeMirrorExtensions: (_theme, innerExtensions) => innerExtensions,
  markdownItConfig: () => {
  },
  markdownItPlugins: (s) => s,
  iconfontType: "svg",
  mermaidConfig: (c) => c
};
var config = (option) => {
  if (option) {
    for (const key in option) {
      const optionItem = option[key];
      if (optionItem) {
        configOption[key] = optionItem;
      }
    }
  }
};
var MinInputBoxWidth = 170;

// node_modules/@vavt/util/lib/es/index.mjs
var x = (e2, n2 = 200) => {
  let t2 = 0;
  return (...o) => new Promise((r2) => {
    t2 && (clearTimeout(t2), r2("cancel")), t2 = window.setTimeout(() => {
      e2.apply(void 0, o), t2 = 0, r2("done");
    }, n2);
  });
};
var C = (e2, n2 = {
  _blank: true,
  nofollow: true
}) => {
  const t2 = document.createElement("a");
  t2.href = e2, n2._blank && (t2.target = "_blank"), n2.nofollow && (t2.rel = "noopener noreferrer"), t2.click();
};
var M = () => {
  let e2 = -1;
  return (t2, o, r2, c = 100) => {
    const s = () => {
      r2 && (typeof c == "number" ? setTimeout(r2, c) : r2());
    };
    e2 !== -1 && (cancelAnimationFrame(e2), s());
    let i2 = t2.scrollTop;
    const l = () => {
      e2 = -1;
      const u = o - i2;
      i2 = i2 + u / 5, Math.abs(u) < 1 ? (t2.scrollTo(0, o), s()) : (t2.scrollTo(0, i2), e2 = requestAnimationFrame(l));
    };
    e2 = requestAnimationFrame(l);
  };
};
var L = M();
var F = (e2, n2 = 200) => {
  let t2 = 0, o = null;
  return (...r2) => {
    const c = (s) => {
      t2 === 0 && (t2 = s), s - t2 >= n2 ? (e2.apply(void 0, o), o = null, t2 = 0) : window.requestAnimationFrame(c);
    };
    o === null && window.requestAnimationFrame(c), o = r2;
  };
};
var $ = (e2) => {
  const n2 = (t2) => {
    const { scrollHeight: o, scrollWidth: r2, offsetHeight: c, offsetWidth: s, scrollLeft: i2, scrollTop: l } = e2, u = t2.x, S = t2.y, p = (g) => {
      const f = l + S - g.y, m = i2 + u - g.x, y = o - c, A = r2 - s, d = {};
      m >= 0 && m <= A && (d.left = m), f >= 0 && f <= y && (d.top = f), e2.scroll(d);
    };
    document.addEventListener("mousemove", p);
    const v = () => {
      document.removeEventListener("mousemove", p), document.removeEventListener("mouseup", v);
    };
    document.addEventListener("mouseup", v);
  };
  return e2.addEventListener("mousedown", n2), () => {
    e2.removeEventListener("mousedown", n2);
  };
};
var k = () => `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;

// node_modules/md-editor-v3/lib/es/chunks/vue-tsx.mjs
var getSlot = ({
  instance,
  ctx,
  props: props7 = {}
}, name = "default") => {
  const targetSlot = (instance == null ? void 0 : instance.$slots[name]) || (ctx == null ? void 0 : ctx.slots[name]);
  return (targetSlot ? targetSlot(instance) : "") || props7[name];
};

// node_modules/md-editor-v3/lib/es/chunks/index2.mjs
var props$1 = {
  overlay: {
    type: [String, Object],
    default: ""
  },
  visible: {
    type: Boolean,
    default: false
  },
  onChange: {
    type: Function,
    default: () => {
    }
  },
  // 相对滚动的元素选择器
  relative: {
    type: String,
    default: "html"
  }
};
var Dropdown = defineComponent({
  props: props$1,
  setup(props22, ctx) {
    const HIDDEN_CLASS = `${prefix}-dropdown-hidden`;
    const ctl = reactive({
      overlayClass: [HIDDEN_CLASS],
      overlayStyle: {},
      triggerHover: false,
      overlayHover: false
    });
    const triggerRef = ref();
    const overlayRef = ref();
    const triggerHandler = () => {
      var _a4;
      ctl.triggerHover = true;
      const triggerEle = triggerRef.value;
      const overlayEle = overlayRef.value;
      if (!triggerEle || !overlayEle) {
        return;
      }
      const triggerInfo = triggerEle.getBoundingClientRect();
      const triggerTop = triggerEle.offsetTop;
      const triggerLeft = triggerEle.offsetLeft;
      const triggerHeight = triggerInfo.height;
      const triggerWidth = triggerInfo.width;
      const relativecrollLeft = ((_a4 = document.querySelector(props22.relative)) == null ? void 0 : _a4.scrollLeft) || 0;
      ctl.overlayStyle = {
        ...ctl.overlayStyle,
        top: triggerTop + triggerHeight + "px",
        left: triggerLeft - overlayEle.offsetWidth / 2 + triggerWidth / 2 - relativecrollLeft + "px"
      };
      props22.onChange(true);
    };
    const overlayHandler = () => {
      ctl.overlayHover = true;
    };
    watch(() => props22.visible, (newV) => {
      if (newV) {
        ctl.overlayClass = ctl.overlayClass.filter((classItem) => classItem !== HIDDEN_CLASS);
      } else {
        ctl.overlayClass.push(HIDDEN_CLASS);
      }
    });
    let hiddenTimer = -1;
    const leaveHidden = (e2) => {
      if (triggerRef.value === e2.target) {
        ctl.triggerHover = false;
      } else {
        ctl.overlayHover = false;
      }
      clearTimeout(hiddenTimer);
      hiddenTimer = window.setTimeout(() => {
        if (!ctl.overlayHover && !ctl.triggerHover) {
          props22.onChange(false);
        }
      }, 10);
    };
    onMounted(() => {
      triggerRef.value.addEventListener("mouseenter", triggerHandler);
      triggerRef.value.addEventListener("mouseleave", leaveHidden);
      overlayRef.value.addEventListener("mouseenter", overlayHandler);
      overlayRef.value.addEventListener("mouseleave", leaveHidden);
    });
    onBeforeUnmount(() => {
      triggerRef.value.removeEventListener("mouseenter", triggerHandler);
      triggerRef.value.removeEventListener("mouseleave", leaveHidden);
      overlayRef.value.removeEventListener("mouseenter", overlayHandler);
      overlayRef.value.removeEventListener("mouseleave", leaveHidden);
    });
    return () => {
      const slotDefault = getSlot({
        ctx
      });
      const slotOverlay = getSlot({
        props: props22,
        ctx
      }, "overlay");
      const trigger = cloneVNode(slotDefault instanceof Array ? slotDefault[0] : slotDefault, {
        ref: triggerRef
      });
      const overlay = createVNode("div", {
        "class": [`${prefix}-dropdown`, ctl.overlayClass],
        "style": ctl.overlayStyle,
        "ref": overlayRef
      }, [createVNode("div", {
        "class": `${prefix}-dropdown-overlay`
      }, [slotOverlay instanceof Array ? slotOverlay[0] : slotOverlay])]);
      return [trigger, overlay];
    };
  }
});
var props = {
  title: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object]
  },
  onChange: {
    type: Function
  },
  // 下拉框中的内容
  overlay: {
    type: [String, Object]
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  insert: {
    type: Function
  },
  language: {
    type: String
  },
  theme: {
    type: String
  },
  /**
   * ==结束
   */
  default: {
    type: [String, Object]
  }
};
var DropdownToolbar = defineComponent({
  name: "DropdownToolbar",
  props,
  emits: ["onChange"],
  setup(props22, ctx) {
    const editorId = inject("editorId");
    return () => {
      const Trigger = getSlot({
        props: props22,
        ctx
      }, "trigger");
      const Overlay = getSlot({
        props: props22,
        ctx
      }, "overlay");
      const Default = getSlot({
        props: props22,
        ctx
      });
      return createVNode(Dropdown, {
        "relative": `#${editorId}-toolbar-wrapper`,
        "visible": props22.visible,
        "onChange": (v) => {
          if (props22.onChange instanceof Function) {
            props22.onChange(v);
          } else {
            ctx.emit("onChange", v);
          }
        },
        "overlay": Overlay
      }, {
        default: () => [createVNode("div", {
          "class": `${prefix}-toolbar-item`,
          "title": props22.title || ""
        }, [Trigger, Default])]
      });
    };
  }
});
DropdownToolbar.install = (app) => {
  app.component(DropdownToolbar.name, DropdownToolbar);
  return app;
};

// node_modules/md-editor-v3/lib/es/chunks/index4.mjs
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField2 = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var Bus = class {
  constructor() {
    __publicField2(this, "pools", {});
  }
  // 移除事件监听
  remove(race, name, func) {
    const targetRace = this.pools[race];
    const events = targetRace && this.pools[race][name];
    if (events) {
      this.pools[race][name] = events.filter((item) => item !== func);
    }
  }
  // 清空全部事件，由于单一实例，多次注册会被共享内容
  clear(race) {
    this.pools[race] = {};
  }
  // 注册事件监听
  on(race, event) {
    if (!this.pools[race]) {
      this.pools[race] = {};
    }
    if (!this.pools[race][event.name]) {
      this.pools[race][event.name] = [];
    }
    this.pools[race][event.name].push(event.callback);
    return this.pools[race][event.name].includes(event.callback);
  }
  // 触发事件
  emit(race, name, ...params) {
    if (!this.pools[race]) {
      this.pools[race] = {};
    }
    const targetRace = this.pools[race];
    const events = targetRace[name];
    if (events) {
      events.forEach((item) => {
        try {
          item(...params);
        } catch (error2) {
          console.error(`${name} monitor event exception！`, error2);
        }
      });
    }
  }
};
var bus = new Bus();
var ON_SAVE = "onSave";
var CHANGE_CATALOG_VISIBLE = "changeCatalogVisible";
var CHANGE_FULL_SCREEN = "changeFullscreen";
var PAGE_FULL_SCREEN_CHANGED = "pageFullscreenChanged";
var FULL_SCREEN_CHANGED = "fullscreenChanged";
var PREVIEW_CHANGED = "previewChanged";
var HTML_PREVIEW_CHANGED = "htmlPreviewChanged";
var CATALOG_VISIBLE_CHANGED = "catalogVisibleChanged";
var BUILD_FINISHED = "buildFinished";
var ERROR_CATCHER = "errorCatcher";
var REPLACE = "replace";
var UPLOAD_IMAGE = "uploadImage";
var OPEN_MODALS = "openModals";
var CTRL_Z = "ctrlZ";
var CTRL_SHIFT_Z = "ctrlShiftZ";
var CATALOG_CHANGED = "catalogChanged";
var PUSH_CATALOG = "pushCatalog";
var RERENDER = "rerender";
var EVENT_LISTENER = "eventListener";
var base642File = (base64, fileName = "image.png") => {
  const arr = base64.split(",");
  const regResult = arr[0].match(/:(.*?);/);
  if (regResult) {
    const mime = regResult[1];
    const bstr = atob(arr[1]);
    let n2 = bstr.length;
    const u8arr = new Uint8Array(n2);
    while (n2--) {
      u8arr[n2] = bstr.charCodeAt(n2);
    }
    return new File([u8arr], fileName, { type: mime });
  }
  return null;
};
var generateCodeRowNumber = (code2) => {
  if (!code2) {
    return code2;
  }
  const list2 = code2.split("\n");
  const rowNumberList = ['<span rn-wrapper aria-hidden="true">'];
  list2.forEach(() => {
    rowNumberList.push("<span></span>");
  });
  rowNumberList.push("</span>");
  return `<span class="code-block">${code2}</span>${rowNumberList.join("")}`;
};
var getRelativeTop = (element, container) => {
  if (!element || !container) {
    return 0;
  }
  const eleRect = element == null ? void 0 : element.getBoundingClientRect();
  if (container === document.documentElement) {
    return eleRect.top - container.clientTop;
  }
  const conRect = container == null ? void 0 : container.getBoundingClientRect();
  return eleRect.top - conRect.top;
};
var getNextId = /* @__PURE__ */ (() => {
  let count = 0;
  return (prefix2) => {
    return prefix2 + ++count;
  };
})();

// node_modules/md-editor-v3/lib/es/chunks/dom.mjs
var keyMove = (trigger, moveHandler) => {
  const triggerMouseDown = (mdown) => {
    const parent = trigger.parentElement || document.body;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    const { clientWidth } = document.documentElement;
    const { clientHeight } = document.documentElement;
    const x2 = mdown.offsetX;
    const y = mdown.offsetY;
    const mouseMoveHandler = (e2) => {
      let tx = e2.x + document.body.scrollLeft - document.body.clientLeft - x2;
      let ty = e2.y + document.body.scrollTop - document.body.clientTop - y;
      tx = tx < 1 ? 1 : tx < clientWidth - width - 1 ? tx : clientWidth - width - 1;
      ty = ty < 1 ? 1 : ty < clientHeight - height - 1 ? ty : clientHeight - height - 1;
      if (moveHandler) {
        moveHandler(tx, ty);
      } else {
        parent.style.left = `${tx}px`;
        parent.style.top = `${ty}px`;
      }
    };
    document.addEventListener("mousemove", mouseMoveHandler);
    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
    document.addEventListener("mouseup", mouseUpHandler);
  };
  trigger.addEventListener("mousedown", triggerMouseDown);
  return () => {
    trigger.removeEventListener("mousedown", triggerMouseDown);
  };
};
var appendHandler = (ele, checkKey = "") => {
  const insertedEle = document.getElementById(ele.id);
  const onload_ = ele.onload;
  ele.onload = null;
  const onload = function(e2) {
    if (typeof onload_ === "function") {
      onload_.bind(this)(e2);
    }
    ele.removeEventListener("load", onload);
  };
  if (!insertedEle) {
    ele.addEventListener("load", onload);
    document.head.appendChild(ele);
  } else if (checkKey !== "") {
    insertedEle.addEventListener("load", onload);
    if (Reflect.get(window, checkKey)) {
      insertedEle.dispatchEvent(new Event("load"));
    }
  }
};
var updateHandler = x((id, attr, value) => {
  const ele = document.getElementById(id);
  if (ele) {
    ele.setAttribute(attr, value);
  }
}, 10);

// node_modules/md-editor-v3/lib/es/chunks/index3.mjs
var Icon$1 = defineComponent({
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup(props22) {
    return () => {
      return configOption.iconfontType === "svg" ? createVNode("svg", {
        "class": `${prefix}-icon`,
        "aria-hidden": "true"
      }, [createVNode("use", {
        "xlink:href": `#${prefix}-icon-${props22.name}`
      }, null)]) : createVNode("i", {
        "class": `${prefix}-iconfont ${prefix}-icon-${props22.name}`
      }, null);
    };
  }
});
var Icon = defineComponent({
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup(props22) {
    const customIcon = inject("customIcon");
    return () => {
      const item = customIcon.value[props22.name];
      if (typeof item === "object") {
        return typeof item.component === "object" ? h(item.component, item.props) : createVNode("span", {
          "innerHTML": item.component
        }, null);
      }
      return createVNode(Icon$1, {
        "name": props22.name
      }, null);
    };
  }
});
var props2 = {
  title: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: "auto"
  },
  height: {
    type: String,
    default: "auto"
  },
  onClose: {
    type: Function
  },
  showAdjust: {
    type: Boolean,
    default: false
  },
  isFullscreen: {
    type: Boolean,
    default: false
  },
  onAdjust: {
    type: Function,
    default: () => {
    }
  },
  class: {
    type: String
  },
  style: {
    type: Object,
    default: () => ({})
  }
};
var getNextIndex = /* @__PURE__ */ (() => {
  let startIndex = 2e4;
  return () => {
    return ++startIndex;
  };
})();
var MdModal = defineComponent({
  name: "MdModal",
  props: props2,
  emits: ["onClose"],
  setup(props22, ctx) {
    const themeRef = inject("theme");
    const modalVisible = ref(props22.visible);
    const modalClass = ref([`${prefix}-modal`]);
    const modalRef = ref();
    const modalHeaderRef = ref();
    const bodyRef = ref();
    const containerRef = shallowRef();
    let keyMoveClear = () => {
    };
    const state = reactive({
      maskStyle: {
        zIndex: -1
      },
      modalStyle: {
        zIndex: -1
      },
      initPos: {
        left: "0px",
        top: "0px"
      },
      historyPos: {
        left: "0px",
        top: "0px"
      }
    });
    const innerSize = computed(() => {
      if (props22.isFullscreen) {
        return {
          width: "100%",
          height: "100%"
        };
      } else {
        return {
          width: props22.width,
          height: props22.height
        };
      }
    });
    watch(() => props22.isFullscreen, (nVal) => {
      if (nVal) {
        keyMoveClear();
      } else {
        nextTick(() => {
          keyMoveClear = keyMove(modalHeaderRef.value, (left, top) => {
            state.initPos.left = left + "px";
            state.initPos.top = top + "px";
          });
        });
      }
    });
    watch(() => props22.visible, (nVal) => {
      if (nVal) {
        state.maskStyle.zIndex = getNextIndex();
        state.modalStyle.zIndex = getNextIndex();
        modalClass.value.push("zoom-in");
        modalVisible.value = nVal;
        nextTick(() => {
          const halfWidth = modalRef.value.offsetWidth / 2;
          const halfHeight = modalRef.value.offsetHeight / 2;
          const halfClientWidth = document.documentElement.clientWidth / 2;
          const halfClientHeight = document.documentElement.clientHeight / 2;
          state.initPos.left = halfClientWidth - halfWidth + "px";
          state.initPos.top = halfClientHeight - halfHeight + "px";
          if (!props22.isFullscreen) {
            keyMoveClear = keyMove(modalHeaderRef.value, (left, top) => {
              state.initPos.left = left + "px";
              state.initPos.top = top + "px";
            });
          }
        });
        setTimeout(() => {
          modalClass.value = modalClass.value.filter((item) => item !== "zoom-in");
        }, 140);
      } else {
        modalClass.value.push("zoom-out");
        keyMoveClear();
        setTimeout(() => {
          modalClass.value = modalClass.value.filter((item) => item !== "zoom-out");
          modalVisible.value = nVal;
        }, 130);
      }
    });
    onMounted(() => {
      bodyRef.value = document.body;
    });
    return () => {
      const slotDefault = getSlot({
        ctx
      });
      const slotTitle = getSlot({
        props: props22,
        ctx
      }, "title");
      return bodyRef.value ? createVNode(Teleport, {
        "to": bodyRef.value
      }, {
        default: () => [createVNode("div", {
          "ref": containerRef,
          "class": `${prefix}-modal-container`,
          "data-theme": themeRef.value
        }, [createVNode("div", {
          "class": props22.class,
          "style": {
            ...props22.style,
            display: modalVisible.value ? "block" : "none"
          }
        }, [createVNode("div", {
          "class": `${prefix}-modal-mask`,
          "style": state.maskStyle,
          "onClick": () => {
            if (props22.onClose) {
              props22.onClose();
            } else {
              ctx.emit("onClose");
            }
          }
        }, null), createVNode("div", {
          "class": modalClass.value,
          "style": {
            ...state.modalStyle,
            ...state.initPos,
            ...innerSize.value
          },
          "ref": modalRef
        }, [createVNode("div", {
          "class": `${prefix}-modal-header`,
          "ref": modalHeaderRef
        }, [slotTitle || ""]), createVNode("div", {
          "class": `${prefix}-modal-body`
        }, [slotDefault]), createVNode("div", {
          "class": `${prefix}-modal-func`
        }, [props22.showAdjust && createVNode("div", {
          "class": `${prefix}-modal-adjust`,
          "onClick": (e2) => {
            e2.stopPropagation();
            if (!props22.isFullscreen) {
              state.historyPos = state.initPos;
              state.initPos = {
                left: "0",
                top: "0"
              };
            } else {
              state.initPos = state.historyPos;
            }
            props22.onAdjust(!props22.isFullscreen);
          }
        }, [createVNode(Icon, {
          "name": props22.isFullscreen ? "suoxiao" : "fangda"
        }, null)]), createVNode("div", {
          "class": `${prefix}-modal-close`,
          "onClick": (e2) => {
            e2.stopPropagation();
            if (props22.onClose) {
              props22.onClose();
            } else {
              ctx.emit("onClose");
            }
          }
        }, [createVNode(Icon, {
          "name": "close"
        }, null)])])])])])]
      }) : "";
    };
  }
});
MdModal.install = (app) => {
  app.component(MdModal.name, MdModal);
  return app;
};

// node_modules/@codemirror/commands/dist/index.js
var toggleComment = (target) => {
  let { state } = target, line = state.doc.lineAt(state.selection.main.from), config3 = getConfig(target.state, line.from);
  return config3.line ? toggleLineComment(target) : config3.block ? toggleBlockCommentByLine(target) : false;
};
function command(f, option) {
  return ({ state, dispatch }) => {
    if (state.readOnly)
      return false;
    let tr = f(option, state);
    if (!tr)
      return false;
    dispatch(state.update(tr));
    return true;
  };
}
var toggleLineComment = command(
  changeLineComment,
  0
  /* CommentOption.Toggle */
);
var lineComment = command(
  changeLineComment,
  1
  /* CommentOption.Comment */
);
var lineUncomment = command(
  changeLineComment,
  2
  /* CommentOption.Uncomment */
);
var toggleBlockComment = command(
  changeBlockComment,
  0
  /* CommentOption.Toggle */
);
var blockComment = command(
  changeBlockComment,
  1
  /* CommentOption.Comment */
);
var blockUncomment = command(
  changeBlockComment,
  2
  /* CommentOption.Uncomment */
);
var toggleBlockCommentByLine = command(
  (o, s) => changeBlockComment(o, s, selectedLineRanges(s)),
  0
  /* CommentOption.Toggle */
);
function getConfig(state, pos) {
  let data = state.languageDataAt("commentTokens", pos);
  return data.length ? data[0] : {};
}
var SearchMargin = 50;
function findBlockComment(state, { open, close }, from, to) {
  let textBefore = state.sliceDoc(from - SearchMargin, from);
  let textAfter = state.sliceDoc(to, to + SearchMargin);
  let spaceBefore = /\s*$/.exec(textBefore)[0].length, spaceAfter = /^\s*/.exec(textAfter)[0].length;
  let beforeOff = textBefore.length - spaceBefore;
  if (textBefore.slice(beforeOff - open.length, beforeOff) == open && textAfter.slice(spaceAfter, spaceAfter + close.length) == close) {
    return {
      open: { pos: from - spaceBefore, margin: spaceBefore && 1 },
      close: { pos: to + spaceAfter, margin: spaceAfter && 1 }
    };
  }
  let startText, endText;
  if (to - from <= 2 * SearchMargin) {
    startText = endText = state.sliceDoc(from, to);
  } else {
    startText = state.sliceDoc(from, from + SearchMargin);
    endText = state.sliceDoc(to - SearchMargin, to);
  }
  let startSpace = /^\s*/.exec(startText)[0].length, endSpace = /\s*$/.exec(endText)[0].length;
  let endOff = endText.length - endSpace - close.length;
  if (startText.slice(startSpace, startSpace + open.length) == open && endText.slice(endOff, endOff + close.length) == close) {
    return {
      open: {
        pos: from + startSpace + open.length,
        margin: /\s/.test(startText.charAt(startSpace + open.length)) ? 1 : 0
      },
      close: {
        pos: to - endSpace - close.length,
        margin: /\s/.test(endText.charAt(endOff - 1)) ? 1 : 0
      }
    };
  }
  return null;
}
function selectedLineRanges(state) {
  let ranges = [];
  for (let r2 of state.selection.ranges) {
    let fromLine = state.doc.lineAt(r2.from);
    let toLine = r2.to <= fromLine.to ? fromLine : state.doc.lineAt(r2.to);
    let last = ranges.length - 1;
    if (last >= 0 && ranges[last].to > fromLine.from)
      ranges[last].to = toLine.to;
    else
      ranges.push({ from: fromLine.from + /^\s*/.exec(fromLine.text)[0].length, to: toLine.to });
  }
  return ranges;
}
function changeBlockComment(option, state, ranges = state.selection.ranges) {
  let tokens = ranges.map((r2) => getConfig(state, r2.from).block);
  if (!tokens.every((c) => c))
    return null;
  let comments = ranges.map((r2, i2) => findBlockComment(state, tokens[i2], r2.from, r2.to));
  if (option != 2 && !comments.every((c) => c)) {
    return { changes: state.changes(ranges.map((range, i2) => {
      if (comments[i2])
        return [];
      return [{ from: range.from, insert: tokens[i2].open + " " }, { from: range.to, insert: " " + tokens[i2].close }];
    })) };
  } else if (option != 1 && comments.some((c) => c)) {
    let changes = [];
    for (let i2 = 0, comment2; i2 < comments.length; i2++)
      if (comment2 = comments[i2]) {
        let token = tokens[i2], { open, close } = comment2;
        changes.push({ from: open.pos - token.open.length, to: open.pos + open.margin }, { from: close.pos - close.margin, to: close.pos + token.close.length });
      }
    return { changes };
  }
  return null;
}
function changeLineComment(option, state, ranges = state.selection.ranges) {
  let lines = [];
  let prevLine = -1;
  for (let { from, to } of ranges) {
    let startI = lines.length, minIndent = 1e9;
    let token = getConfig(state, from).line;
    if (!token)
      continue;
    for (let pos = from; pos <= to; ) {
      let line = state.doc.lineAt(pos);
      if (line.from > prevLine && (from == to || to > line.from)) {
        prevLine = line.from;
        let indent = /^\s*/.exec(line.text)[0].length;
        let empty2 = indent == line.length;
        let comment2 = line.text.slice(indent, indent + token.length) == token ? indent : -1;
        if (indent < line.text.length && indent < minIndent)
          minIndent = indent;
        lines.push({ line, comment: comment2, token, indent, empty: empty2, single: false });
      }
      pos = line.to + 1;
    }
    if (minIndent < 1e9) {
      for (let i2 = startI; i2 < lines.length; i2++)
        if (lines[i2].indent < lines[i2].line.text.length)
          lines[i2].indent = minIndent;
    }
    if (lines.length == startI + 1)
      lines[startI].single = true;
  }
  if (option != 2 && lines.some((l) => l.comment < 0 && (!l.empty || l.single))) {
    let changes = [];
    for (let { line, token, indent, empty: empty2, single } of lines)
      if (single || !empty2)
        changes.push({ from: line.from + indent, insert: token + " " });
    let changeSet = state.changes(changes);
    return { changes: changeSet, selection: state.selection.map(changeSet, 1) };
  } else if (option != 1 && lines.some((l) => l.comment >= 0)) {
    let changes = [];
    for (let { line, comment: comment2, token } of lines)
      if (comment2 >= 0) {
        let from = line.from + comment2, to = from + token.length;
        if (line.text[to - line.from] == " ")
          to++;
        changes.push({ from, to });
      }
    return { changes };
  }
  return null;
}
var fromHistory = Annotation.define();
var isolateHistory = Annotation.define();
var invertedEffects = Facet.define();
var historyConfig = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (_t, isAdjacent2) => isAdjacent2
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (a, b) => (tr, adj) => a(tr, adj) || b(tr, adj)
    });
  }
});
var historyField_ = StateField.define({
  create() {
    return HistoryState.empty;
  },
  update(state, tr) {
    let config3 = tr.state.facet(historyConfig);
    let fromHist = tr.annotation(fromHistory);
    if (fromHist) {
      let item = HistEvent.fromTransaction(tr, fromHist.selection), from = fromHist.side;
      let other = from == 0 ? state.undone : state.done;
      if (item)
        other = updateBranch(other, other.length, config3.minDepth, item);
      else
        other = addSelection(other, tr.startState.selection);
      return new HistoryState(from == 0 ? fromHist.rest : other, from == 0 ? other : fromHist.rest);
    }
    let isolate = tr.annotation(isolateHistory);
    if (isolate == "full" || isolate == "before")
      state = state.isolate();
    if (tr.annotation(Transaction.addToHistory) === false)
      return !tr.changes.empty ? state.addMapping(tr.changes.desc) : state;
    let event = HistEvent.fromTransaction(tr);
    let time = tr.annotation(Transaction.time), userEvent = tr.annotation(Transaction.userEvent);
    if (event)
      state = state.addChanges(event, time, userEvent, config3, tr);
    else if (tr.selection)
      state = state.addSelection(tr.startState.selection, time, userEvent, config3.newGroupDelay);
    if (isolate == "full" || isolate == "after")
      state = state.isolate();
    return state;
  },
  toJSON(value) {
    return { done: value.done.map((e2) => e2.toJSON()), undone: value.undone.map((e2) => e2.toJSON()) };
  },
  fromJSON(json) {
    return new HistoryState(json.done.map(HistEvent.fromJSON), json.undone.map(HistEvent.fromJSON));
  }
});
function history(config3 = {}) {
  return [
    historyField_,
    historyConfig.of(config3),
    EditorView.domEventHandlers({
      beforeinput(e2, view) {
        let command2 = e2.inputType == "historyUndo" ? undo : e2.inputType == "historyRedo" ? redo : null;
        if (!command2)
          return false;
        e2.preventDefault();
        return command2(view);
      }
    })
  ];
}
function cmd(side, selection2) {
  return function({ state, dispatch }) {
    if (!selection2 && state.readOnly)
      return false;
    let historyState = state.field(historyField_, false);
    if (!historyState)
      return false;
    let tr = historyState.pop(side, state, selection2);
    if (!tr)
      return false;
    dispatch(tr);
    return true;
  };
}
var undo = cmd(0, false);
var redo = cmd(1, false);
var undoSelection = cmd(0, true);
var redoSelection = cmd(1, true);
function depth(side) {
  return function(state) {
    let histState = state.field(historyField_, false);
    if (!histState)
      return 0;
    let branch = side == 0 ? histState.done : histState.undone;
    return branch.length - (branch.length && !branch[0].changes ? 1 : 0);
  };
}
var undoDepth = depth(
  0
  /* BranchName.Done */
);
var redoDepth = depth(
  1
  /* BranchName.Undone */
);
var HistEvent = class _HistEvent {
  constructor(changes, effects, mapped, startSelection, selectionsAfter) {
    this.changes = changes;
    this.effects = effects;
    this.mapped = mapped;
    this.startSelection = startSelection;
    this.selectionsAfter = selectionsAfter;
  }
  setSelAfter(after) {
    return new _HistEvent(this.changes, this.effects, this.mapped, this.startSelection, after);
  }
  toJSON() {
    var _a4, _b, _c;
    return {
      changes: (_a4 = this.changes) === null || _a4 === void 0 ? void 0 : _a4.toJSON(),
      mapped: (_b = this.mapped) === null || _b === void 0 ? void 0 : _b.toJSON(),
      startSelection: (_c = this.startSelection) === null || _c === void 0 ? void 0 : _c.toJSON(),
      selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
    };
  }
  static fromJSON(json) {
    return new _HistEvent(json.changes && ChangeSet.fromJSON(json.changes), [], json.mapped && ChangeDesc.fromJSON(json.mapped), json.startSelection && EditorSelection.fromJSON(json.startSelection), json.selectionsAfter.map(EditorSelection.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(tr, selection2) {
    let effects = none;
    for (let invert of tr.startState.facet(invertedEffects)) {
      let result = invert(tr);
      if (result.length)
        effects = effects.concat(result);
    }
    if (!effects.length && tr.changes.empty)
      return null;
    return new _HistEvent(tr.changes.invert(tr.startState.doc), effects, void 0, selection2 || tr.startState.selection, none);
  }
  static selection(selections) {
    return new _HistEvent(void 0, none, void 0, void 0, selections);
  }
};
function updateBranch(branch, to, maxLen, newEvent) {
  let start = to + 1 > maxLen + 20 ? to - maxLen - 1 : 0;
  let newBranch = branch.slice(start, to);
  newBranch.push(newEvent);
  return newBranch;
}
function isAdjacent(a, b) {
  let ranges = [], isAdjacent2 = false;
  a.iterChangedRanges((f, t2) => ranges.push(f, t2));
  b.iterChangedRanges((_f, _t, f, t2) => {
    for (let i2 = 0; i2 < ranges.length; ) {
      let from = ranges[i2++], to = ranges[i2++];
      if (t2 >= from && f <= to)
        isAdjacent2 = true;
    }
  });
  return isAdjacent2;
}
function eqSelectionShape(a, b) {
  return a.ranges.length == b.ranges.length && a.ranges.filter((r2, i2) => r2.empty != b.ranges[i2].empty).length === 0;
}
function conc(a, b) {
  return !a.length ? b : !b.length ? a : a.concat(b);
}
var none = [];
var MaxSelectionsPerEvent = 200;
function addSelection(branch, selection2) {
  if (!branch.length) {
    return [HistEvent.selection([selection2])];
  } else {
    let lastEvent = branch[branch.length - 1];
    let sels = lastEvent.selectionsAfter.slice(Math.max(0, lastEvent.selectionsAfter.length - MaxSelectionsPerEvent));
    if (sels.length && sels[sels.length - 1].eq(selection2))
      return branch;
    sels.push(selection2);
    return updateBranch(branch, branch.length - 1, 1e9, lastEvent.setSelAfter(sels));
  }
}
function popSelection(branch) {
  let last = branch[branch.length - 1];
  let newBranch = branch.slice();
  newBranch[branch.length - 1] = last.setSelAfter(last.selectionsAfter.slice(0, last.selectionsAfter.length - 1));
  return newBranch;
}
function addMappingToBranch(branch, mapping) {
  if (!branch.length)
    return branch;
  let length = branch.length, selections = none;
  while (length) {
    let event = mapEvent(branch[length - 1], mapping, selections);
    if (event.changes && !event.changes.empty || event.effects.length) {
      let result = branch.slice(0, length);
      result[length - 1] = event;
      return result;
    } else {
      mapping = event.mapped;
      length--;
      selections = event.selectionsAfter;
    }
  }
  return selections.length ? [HistEvent.selection(selections)] : none;
}
function mapEvent(event, mapping, extraSelections) {
  let selections = conc(event.selectionsAfter.length ? event.selectionsAfter.map((s) => s.map(mapping)) : none, extraSelections);
  if (!event.changes)
    return HistEvent.selection(selections);
  let mappedChanges = event.changes.map(mapping), before = mapping.mapDesc(event.changes, true);
  let fullMapping = event.mapped ? event.mapped.composeDesc(before) : before;
  return new HistEvent(mappedChanges, StateEffect.mapEffects(event.effects, mapping), fullMapping, event.startSelection.map(before), selections);
}
var joinableUserEvent = /^(input\.type|delete)($|\.)/;
var HistoryState = class _HistoryState {
  constructor(done, undone, prevTime = 0, prevUserEvent = void 0) {
    this.done = done;
    this.undone = undone;
    this.prevTime = prevTime;
    this.prevUserEvent = prevUserEvent;
  }
  isolate() {
    return this.prevTime ? new _HistoryState(this.done, this.undone) : this;
  }
  addChanges(event, time, userEvent, config3, tr) {
    let done = this.done, lastEvent = done[done.length - 1];
    if (lastEvent && lastEvent.changes && !lastEvent.changes.empty && event.changes && (!userEvent || joinableUserEvent.test(userEvent)) && (!lastEvent.selectionsAfter.length && time - this.prevTime < config3.newGroupDelay && config3.joinToEvent(tr, isAdjacent(lastEvent.changes, event.changes)) || // For compose (but not compose.start) events, always join with previous event
    userEvent == "input.type.compose")) {
      done = updateBranch(done, done.length - 1, config3.minDepth, new HistEvent(event.changes.compose(lastEvent.changes), conc(event.effects, lastEvent.effects), lastEvent.mapped, lastEvent.startSelection, none));
    } else {
      done = updateBranch(done, done.length, config3.minDepth, event);
    }
    return new _HistoryState(done, none, time, userEvent);
  }
  addSelection(selection2, time, userEvent, newGroupDelay) {
    let last = this.done.length ? this.done[this.done.length - 1].selectionsAfter : none;
    if (last.length > 0 && time - this.prevTime < newGroupDelay && userEvent == this.prevUserEvent && userEvent && /^select($|\.)/.test(userEvent) && eqSelectionShape(last[last.length - 1], selection2))
      return this;
    return new _HistoryState(addSelection(this.done, selection2), this.undone, time, userEvent);
  }
  addMapping(mapping) {
    return new _HistoryState(addMappingToBranch(this.done, mapping), addMappingToBranch(this.undone, mapping), this.prevTime, this.prevUserEvent);
  }
  pop(side, state, onlySelection) {
    let branch = side == 0 ? this.done : this.undone;
    if (branch.length == 0)
      return null;
    let event = branch[branch.length - 1], selection2 = event.selectionsAfter[0] || state.selection;
    if (onlySelection && event.selectionsAfter.length) {
      return state.update({
        selection: event.selectionsAfter[event.selectionsAfter.length - 1],
        annotations: fromHistory.of({ side, rest: popSelection(branch), selection: selection2 }),
        userEvent: side == 0 ? "select.undo" : "select.redo",
        scrollIntoView: true
      });
    } else if (!event.changes) {
      return null;
    } else {
      let rest = branch.length == 1 ? none : branch.slice(0, branch.length - 1);
      if (event.mapped)
        rest = addMappingToBranch(rest, event.mapped);
      return state.update({
        changes: event.changes,
        selection: event.startSelection,
        effects: event.effects,
        annotations: fromHistory.of({ side, rest, selection: selection2 }),
        filter: false,
        userEvent: side == 0 ? "undo" : "redo",
        scrollIntoView: true
      });
    }
  }
};
HistoryState.empty = new HistoryState(none, none);
var historyKeymap = [
  { key: "Mod-z", run: undo, preventDefault: true },
  { key: "Mod-y", mac: "Mod-Shift-z", run: redo, preventDefault: true },
  { linux: "Ctrl-Shift-z", run: redo, preventDefault: true },
  { key: "Mod-u", run: undoSelection, preventDefault: true },
  { key: "Alt-u", mac: "Mod-Shift-u", run: redoSelection, preventDefault: true }
];
function updateSel(sel, by) {
  return EditorSelection.create(sel.ranges.map(by), sel.mainIndex);
}
function setSel(state, selection2) {
  return state.update({ selection: selection2, scrollIntoView: true, userEvent: "select" });
}
function moveSel({ state, dispatch }, how) {
  let selection2 = updateSel(state.selection, how);
  if (selection2.eq(state.selection, true))
    return false;
  dispatch(setSel(state, selection2));
  return true;
}
function rangeEnd(range, forward) {
  return EditorSelection.cursor(forward ? range.to : range.from);
}
function cursorByChar(view, forward) {
  return moveSel(view, (range) => range.empty ? view.moveByChar(range, forward) : rangeEnd(range, forward));
}
function ltrAtCursor(view) {
  return view.textDirectionAt(view.state.selection.main.head) == Direction.LTR;
}
var cursorCharLeft = (view) => cursorByChar(view, !ltrAtCursor(view));
var cursorCharRight = (view) => cursorByChar(view, ltrAtCursor(view));
function cursorByGroup(view, forward) {
  return moveSel(view, (range) => range.empty ? view.moveByGroup(range, forward) : rangeEnd(range, forward));
}
var cursorGroupLeft = (view) => cursorByGroup(view, !ltrAtCursor(view));
var cursorGroupRight = (view) => cursorByGroup(view, ltrAtCursor(view));
var segmenter = typeof Intl != "undefined" && Intl.Segmenter ? new Intl.Segmenter(void 0, { granularity: "word" }) : null;
function interestingNode(state, node, bracketProp) {
  if (node.type.prop(bracketProp))
    return true;
  let len = node.to - node.from;
  return len && (len > 2 || /[^\s,.;:]/.test(state.sliceDoc(node.from, node.to))) || node.firstChild;
}
function moveBySyntax(state, start, forward) {
  let pos = syntaxTree(state).resolveInner(start.head);
  let bracketProp = forward ? NodeProp.closedBy : NodeProp.openedBy;
  for (let at = start.head; ; ) {
    let next = forward ? pos.childAfter(at) : pos.childBefore(at);
    if (!next)
      break;
    if (interestingNode(state, next, bracketProp))
      pos = next;
    else
      at = forward ? next.to : next.from;
  }
  let bracket = pos.type.prop(bracketProp), match2, newPos;
  if (bracket && (match2 = forward ? matchBrackets(state, pos.from, 1) : matchBrackets(state, pos.to, -1)) && match2.matched)
    newPos = forward ? match2.end.to : match2.end.from;
  else
    newPos = forward ? pos.to : pos.from;
  return EditorSelection.cursor(newPos, forward ? -1 : 1);
}
var cursorSyntaxLeft = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, !ltrAtCursor(view)));
var cursorSyntaxRight = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, ltrAtCursor(view)));
function cursorByLine(view, forward) {
  return moveSel(view, (range) => {
    if (!range.empty)
      return rangeEnd(range, forward);
    let moved = view.moveVertically(range, forward);
    return moved.head != range.head ? moved : view.moveToLineBoundary(range, forward);
  });
}
var cursorLineUp = (view) => cursorByLine(view, false);
var cursorLineDown = (view) => cursorByLine(view, true);
function pageInfo(view) {
  let selfScroll = view.scrollDOM.clientHeight < view.scrollDOM.scrollHeight - 2;
  let marginTop = 0, marginBottom = 0, height;
  if (selfScroll) {
    for (let source of view.state.facet(EditorView.scrollMargins)) {
      let margins = source(view);
      if (margins === null || margins === void 0 ? void 0 : margins.top)
        marginTop = Math.max(margins === null || margins === void 0 ? void 0 : margins.top, marginTop);
      if (margins === null || margins === void 0 ? void 0 : margins.bottom)
        marginBottom = Math.max(margins === null || margins === void 0 ? void 0 : margins.bottom, marginBottom);
    }
    height = view.scrollDOM.clientHeight - marginTop - marginBottom;
  } else {
    height = (view.dom.ownerDocument.defaultView || window).innerHeight;
  }
  return {
    marginTop,
    marginBottom,
    selfScroll,
    height: Math.max(view.defaultLineHeight, height - 5)
  };
}
function cursorByPage(view, forward) {
  let page = pageInfo(view);
  let { state } = view, selection2 = updateSel(state.selection, (range) => {
    return range.empty ? view.moveVertically(range, forward, page.height) : rangeEnd(range, forward);
  });
  if (selection2.eq(state.selection))
    return false;
  let effect;
  if (page.selfScroll) {
    let startPos = view.coordsAtPos(state.selection.main.head);
    let scrollRect = view.scrollDOM.getBoundingClientRect();
    let scrollTop = scrollRect.top + page.marginTop, scrollBottom = scrollRect.bottom - page.marginBottom;
    if (startPos && startPos.top > scrollTop && startPos.bottom < scrollBottom)
      effect = EditorView.scrollIntoView(selection2.main.head, { y: "start", yMargin: startPos.top - scrollTop });
  }
  view.dispatch(setSel(state, selection2), { effects: effect });
  return true;
}
var cursorPageUp = (view) => cursorByPage(view, false);
var cursorPageDown = (view) => cursorByPage(view, true);
function moveByLineBoundary(view, start, forward) {
  let line = view.lineBlockAt(start.head), moved = view.moveToLineBoundary(start, forward);
  if (moved.head == start.head && moved.head != (forward ? line.to : line.from))
    moved = view.moveToLineBoundary(start, forward, false);
  if (!forward && moved.head == line.from && line.length) {
    let space = /^\s*/.exec(view.state.sliceDoc(line.from, Math.min(line.from + 100, line.to)))[0].length;
    if (space && start.head != line.from + space)
      moved = EditorSelection.cursor(line.from + space);
  }
  return moved;
}
var cursorLineBoundaryForward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, true));
var cursorLineBoundaryBackward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, false));
var cursorLineBoundaryLeft = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, !ltrAtCursor(view)));
var cursorLineBoundaryRight = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, ltrAtCursor(view)));
var cursorLineStart = (view) => moveSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).from, 1));
var cursorLineEnd = (view) => moveSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).to, -1));
function toMatchingBracket(state, dispatch, extend) {
  let found = false, selection2 = updateSel(state.selection, (range) => {
    let matching = matchBrackets(state, range.head, -1) || matchBrackets(state, range.head, 1) || range.head > 0 && matchBrackets(state, range.head - 1, 1) || range.head < state.doc.length && matchBrackets(state, range.head + 1, -1);
    if (!matching || !matching.end)
      return range;
    found = true;
    let head = matching.start.from == range.head ? matching.end.to : matching.end.from;
    return extend ? EditorSelection.range(range.anchor, head) : EditorSelection.cursor(head);
  });
  if (!found)
    return false;
  dispatch(setSel(state, selection2));
  return true;
}
var cursorMatchingBracket = ({ state, dispatch }) => toMatchingBracket(state, dispatch, false);
function extendSel(view, how) {
  let selection2 = updateSel(view.state.selection, (range) => {
    let head = how(range);
    return EditorSelection.range(range.anchor, head.head, head.goalColumn, head.bidiLevel || void 0);
  });
  if (selection2.eq(view.state.selection))
    return false;
  view.dispatch(setSel(view.state, selection2));
  return true;
}
function selectByChar(view, forward) {
  return extendSel(view, (range) => view.moveByChar(range, forward));
}
var selectCharLeft = (view) => selectByChar(view, !ltrAtCursor(view));
var selectCharRight = (view) => selectByChar(view, ltrAtCursor(view));
function selectByGroup(view, forward) {
  return extendSel(view, (range) => view.moveByGroup(range, forward));
}
var selectGroupLeft = (view) => selectByGroup(view, !ltrAtCursor(view));
var selectGroupRight = (view) => selectByGroup(view, ltrAtCursor(view));
var selectSyntaxLeft = (view) => extendSel(view, (range) => moveBySyntax(view.state, range, !ltrAtCursor(view)));
var selectSyntaxRight = (view) => extendSel(view, (range) => moveBySyntax(view.state, range, ltrAtCursor(view)));
function selectByLine(view, forward) {
  return extendSel(view, (range) => view.moveVertically(range, forward));
}
var selectLineUp = (view) => selectByLine(view, false);
var selectLineDown = (view) => selectByLine(view, true);
function selectByPage(view, forward) {
  return extendSel(view, (range) => view.moveVertically(range, forward, pageInfo(view).height));
}
var selectPageUp = (view) => selectByPage(view, false);
var selectPageDown = (view) => selectByPage(view, true);
var selectLineBoundaryForward = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, true));
var selectLineBoundaryBackward = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, false));
var selectLineBoundaryLeft = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, !ltrAtCursor(view)));
var selectLineBoundaryRight = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, ltrAtCursor(view)));
var selectLineStart = (view) => extendSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).from));
var selectLineEnd = (view) => extendSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).to));
var cursorDocStart = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: 0 }));
  return true;
};
var cursorDocEnd = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.doc.length }));
  return true;
};
var selectDocStart = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.selection.main.anchor, head: 0 }));
  return true;
};
var selectDocEnd = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.selection.main.anchor, head: state.doc.length }));
  return true;
};
var selectAll = ({ state, dispatch }) => {
  dispatch(state.update({ selection: { anchor: 0, head: state.doc.length }, userEvent: "select" }));
  return true;
};
var selectLine = ({ state, dispatch }) => {
  let ranges = selectedLineBlocks(state).map(({ from, to }) => EditorSelection.range(from, Math.min(to + 1, state.doc.length)));
  dispatch(state.update({ selection: EditorSelection.create(ranges), userEvent: "select" }));
  return true;
};
var selectParentSyntax = ({ state, dispatch }) => {
  let selection2 = updateSel(state.selection, (range) => {
    var _a4;
    let stack = syntaxTree(state).resolveStack(range.from, 1);
    for (let cur = stack; cur; cur = cur.next) {
      let { node } = cur;
      if ((node.from < range.from && node.to >= range.to || node.to > range.to && node.from <= range.from) && ((_a4 = node.parent) === null || _a4 === void 0 ? void 0 : _a4.parent))
        return EditorSelection.range(node.to, node.from);
    }
    return range;
  });
  dispatch(setSel(state, selection2));
  return true;
};
var simplifySelection = ({ state, dispatch }) => {
  let cur = state.selection, selection2 = null;
  if (cur.ranges.length > 1)
    selection2 = EditorSelection.create([cur.main]);
  else if (!cur.main.empty)
    selection2 = EditorSelection.create([EditorSelection.cursor(cur.main.head)]);
  if (!selection2)
    return false;
  dispatch(setSel(state, selection2));
  return true;
};
function deleteBy(target, by) {
  if (target.state.readOnly)
    return false;
  let event = "delete.selection", { state } = target;
  let changes = state.changeByRange((range) => {
    let { from, to } = range;
    if (from == to) {
      let towards = by(range);
      if (towards < from) {
        event = "delete.backward";
        towards = skipAtomic(target, towards, false);
      } else if (towards > from) {
        event = "delete.forward";
        towards = skipAtomic(target, towards, true);
      }
      from = Math.min(from, towards);
      to = Math.max(to, towards);
    } else {
      from = skipAtomic(target, from, false);
      to = skipAtomic(target, to, true);
    }
    return from == to ? { range } : { changes: { from, to }, range: EditorSelection.cursor(from, from < range.head ? -1 : 1) };
  });
  if (changes.changes.empty)
    return false;
  target.dispatch(state.update(changes, {
    scrollIntoView: true,
    userEvent: event,
    effects: event == "delete.selection" ? EditorView.announce.of(state.phrase("Selection deleted")) : void 0
  }));
  return true;
}
function skipAtomic(target, pos, forward) {
  if (target instanceof EditorView)
    for (let ranges of target.state.facet(EditorView.atomicRanges).map((f) => f(target)))
      ranges.between(pos, pos, (from, to) => {
        if (from < pos && to > pos)
          pos = forward ? to : from;
      });
  return pos;
}
var deleteByChar = (target, forward) => deleteBy(target, (range) => {
  let pos = range.from, { state } = target, line = state.doc.lineAt(pos), before, targetPos;
  if (!forward && pos > line.from && pos < line.from + 200 && !/[^ \t]/.test(before = line.text.slice(0, pos - line.from))) {
    if (before[before.length - 1] == "	")
      return pos - 1;
    let col = countColumn(before, state.tabSize), drop = col % getIndentUnit(state) || getIndentUnit(state);
    for (let i2 = 0; i2 < drop && before[before.length - 1 - i2] == " "; i2++)
      pos--;
    targetPos = pos;
  } else {
    targetPos = findClusterBreak(line.text, pos - line.from, forward, forward) + line.from;
    if (targetPos == pos && line.number != (forward ? state.doc.lines : 1))
      targetPos += forward ? 1 : -1;
    else if (!forward && /[\ufe00-\ufe0f]/.test(line.text.slice(targetPos - line.from, pos - line.from)))
      targetPos = findClusterBreak(line.text, targetPos - line.from, false, false) + line.from;
  }
  return targetPos;
});
var deleteCharBackward = (view) => deleteByChar(view, false);
var deleteCharForward = (view) => deleteByChar(view, true);
var deleteByGroup = (target, forward) => deleteBy(target, (range) => {
  let pos = range.head, { state } = target, line = state.doc.lineAt(pos);
  let categorize = state.charCategorizer(pos);
  for (let cat = null; ; ) {
    if (pos == (forward ? line.to : line.from)) {
      if (pos == range.head && line.number != (forward ? state.doc.lines : 1))
        pos += forward ? 1 : -1;
      break;
    }
    let next = findClusterBreak(line.text, pos - line.from, forward) + line.from;
    let nextChar = line.text.slice(Math.min(pos, next) - line.from, Math.max(pos, next) - line.from);
    let nextCat = categorize(nextChar);
    if (cat != null && nextCat != cat)
      break;
    if (nextChar != " " || pos != range.head)
      cat = nextCat;
    pos = next;
  }
  return pos;
});
var deleteGroupBackward = (target) => deleteByGroup(target, false);
var deleteGroupForward = (target) => deleteByGroup(target, true);
var deleteToLineEnd = (view) => deleteBy(view, (range) => {
  let lineEnd = view.lineBlockAt(range.head).to;
  return range.head < lineEnd ? lineEnd : Math.min(view.state.doc.length, range.head + 1);
});
var deleteLineBoundaryBackward = (view) => deleteBy(view, (range) => {
  let lineStart = view.moveToLineBoundary(range, false).head;
  return range.head > lineStart ? lineStart : Math.max(0, range.head - 1);
});
var deleteLineBoundaryForward = (view) => deleteBy(view, (range) => {
  let lineStart = view.moveToLineBoundary(range, true).head;
  return range.head < lineStart ? lineStart : Math.min(view.state.doc.length, range.head + 1);
});
var splitLine = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let changes = state.changeByRange((range) => {
    return {
      changes: { from: range.from, to: range.to, insert: Text.of(["", ""]) },
      range: EditorSelection.cursor(range.from)
    };
  });
  dispatch(state.update(changes, { scrollIntoView: true, userEvent: "input" }));
  return true;
};
var transposeChars = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let changes = state.changeByRange((range) => {
    if (!range.empty || range.from == 0 || range.from == state.doc.length)
      return { range };
    let pos = range.from, line = state.doc.lineAt(pos);
    let from = pos == line.from ? pos - 1 : findClusterBreak(line.text, pos - line.from, false) + line.from;
    let to = pos == line.to ? pos + 1 : findClusterBreak(line.text, pos - line.from, true) + line.from;
    return {
      changes: { from, to, insert: state.doc.slice(pos, to).append(state.doc.slice(from, pos)) },
      range: EditorSelection.cursor(to)
    };
  });
  if (changes.changes.empty)
    return false;
  dispatch(state.update(changes, { scrollIntoView: true, userEvent: "move.character" }));
  return true;
};
function selectedLineBlocks(state) {
  let blocks = [], upto = -1;
  for (let range of state.selection.ranges) {
    let startLine = state.doc.lineAt(range.from), endLine = state.doc.lineAt(range.to);
    if (!range.empty && range.to == endLine.from)
      endLine = state.doc.lineAt(range.to - 1);
    if (upto >= startLine.number) {
      let prev = blocks[blocks.length - 1];
      prev.to = endLine.to;
      prev.ranges.push(range);
    } else {
      blocks.push({ from: startLine.from, to: endLine.to, ranges: [range] });
    }
    upto = endLine.number + 1;
  }
  return blocks;
}
function moveLine(state, dispatch, forward) {
  if (state.readOnly)
    return false;
  let changes = [], ranges = [];
  for (let block2 of selectedLineBlocks(state)) {
    if (forward ? block2.to == state.doc.length : block2.from == 0)
      continue;
    let nextLine = state.doc.lineAt(forward ? block2.to + 1 : block2.from - 1);
    let size = nextLine.length + 1;
    if (forward) {
      changes.push({ from: block2.to, to: nextLine.to }, { from: block2.from, insert: nextLine.text + state.lineBreak });
      for (let r2 of block2.ranges)
        ranges.push(EditorSelection.range(Math.min(state.doc.length, r2.anchor + size), Math.min(state.doc.length, r2.head + size)));
    } else {
      changes.push({ from: nextLine.from, to: block2.from }, { from: block2.to, insert: state.lineBreak + nextLine.text });
      for (let r2 of block2.ranges)
        ranges.push(EditorSelection.range(r2.anchor - size, r2.head - size));
    }
  }
  if (!changes.length)
    return false;
  dispatch(state.update({
    changes,
    scrollIntoView: true,
    selection: EditorSelection.create(ranges, state.selection.mainIndex),
    userEvent: "move.line"
  }));
  return true;
}
var moveLineUp = ({ state, dispatch }) => moveLine(state, dispatch, false);
var moveLineDown = ({ state, dispatch }) => moveLine(state, dispatch, true);
function copyLine(state, dispatch, forward) {
  if (state.readOnly)
    return false;
  let changes = [];
  for (let block2 of selectedLineBlocks(state)) {
    if (forward)
      changes.push({ from: block2.from, insert: state.doc.slice(block2.from, block2.to) + state.lineBreak });
    else
      changes.push({ from: block2.to, insert: state.lineBreak + state.doc.slice(block2.from, block2.to) });
  }
  dispatch(state.update({ changes, scrollIntoView: true, userEvent: "input.copyline" }));
  return true;
}
var copyLineUp = ({ state, dispatch }) => copyLine(state, dispatch, false);
var copyLineDown = ({ state, dispatch }) => copyLine(state, dispatch, true);
var deleteLine = (view) => {
  if (view.state.readOnly)
    return false;
  let { state } = view, changes = state.changes(selectedLineBlocks(state).map(({ from, to }) => {
    if (from > 0)
      from--;
    else if (to < state.doc.length)
      to++;
    return { from, to };
  }));
  let selection2 = updateSel(state.selection, (range) => view.moveVertically(range, true)).map(changes);
  view.dispatch({ changes, selection: selection2, scrollIntoView: true, userEvent: "delete.line" });
  return true;
};
function isBetweenBrackets(state, pos) {
  if (/\(\)|\[\]|\{\}/.test(state.sliceDoc(pos - 1, pos + 1)))
    return { from: pos, to: pos };
  let context = syntaxTree(state).resolveInner(pos);
  let before = context.childBefore(pos), after = context.childAfter(pos), closedBy;
  if (before && after && before.to <= pos && after.from >= pos && (closedBy = before.type.prop(NodeProp.closedBy)) && closedBy.indexOf(after.name) > -1 && state.doc.lineAt(before.to).from == state.doc.lineAt(after.from).from && !/\S/.test(state.sliceDoc(before.to, after.from)))
    return { from: before.to, to: after.from };
  return null;
}
var insertNewlineAndIndent = newlineAndIndent(false);
var insertBlankLine = newlineAndIndent(true);
function newlineAndIndent(atEof) {
  return ({ state, dispatch }) => {
    if (state.readOnly)
      return false;
    let changes = state.changeByRange((range) => {
      let { from, to } = range, line = state.doc.lineAt(from);
      let explode = !atEof && from == to && isBetweenBrackets(state, from);
      if (atEof)
        from = to = (to <= line.to ? line : state.doc.lineAt(to)).to;
      let cx = new IndentContext(state, { simulateBreak: from, simulateDoubleBreak: !!explode });
      let indent = getIndentation(cx, from);
      if (indent == null)
        indent = countColumn(/^\s*/.exec(state.doc.lineAt(from).text)[0], state.tabSize);
      while (to < line.to && /\s/.test(line.text[to - line.from]))
        to++;
      if (explode)
        ({ from, to } = explode);
      else if (from > line.from && from < line.from + 100 && !/\S/.test(line.text.slice(0, from)))
        from = line.from;
      let insert = ["", indentString(state, indent)];
      if (explode)
        insert.push(indentString(state, cx.lineIndent(line.from, -1)));
      return {
        changes: { from, to, insert: Text.of(insert) },
        range: EditorSelection.cursor(from + 1 + insert[1].length)
      };
    });
    dispatch(state.update(changes, { scrollIntoView: true, userEvent: "input" }));
    return true;
  };
}
function changeBySelectedLine(state, f) {
  let atLine = -1;
  return state.changeByRange((range) => {
    let changes = [];
    for (let pos = range.from; pos <= range.to; ) {
      let line = state.doc.lineAt(pos);
      if (line.number > atLine && (range.empty || range.to > line.from)) {
        f(line, changes, range);
        atLine = line.number;
      }
      pos = line.to + 1;
    }
    let changeSet = state.changes(changes);
    return {
      changes,
      range: EditorSelection.range(changeSet.mapPos(range.anchor, 1), changeSet.mapPos(range.head, 1))
    };
  });
}
var indentSelection = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let updated = /* @__PURE__ */ Object.create(null);
  let context = new IndentContext(state, { overrideIndentation: (start) => {
    let found = updated[start];
    return found == null ? -1 : found;
  } });
  let changes = changeBySelectedLine(state, (line, changes2, range) => {
    let indent = getIndentation(context, line.from);
    if (indent == null)
      return;
    if (!/\S/.test(line.text))
      indent = 0;
    let cur = /^\s*/.exec(line.text)[0];
    let norm = indentString(state, indent);
    if (cur != norm || range.from < line.from + cur.length) {
      updated[line.from] = indent;
      changes2.push({ from: line.from, to: line.from + cur.length, insert: norm });
    }
  });
  if (!changes.changes.empty)
    dispatch(state.update(changes, { userEvent: "indent" }));
  return true;
};
var indentMore = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
    changes.push({ from: line.from, insert: state.facet(indentUnit) });
  }), { userEvent: "input.indent" }));
  return true;
};
var indentLess = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
    let space = /^\s*/.exec(line.text)[0];
    if (!space)
      return;
    let col = countColumn(space, state.tabSize), keep = 0;
    let insert = indentString(state, Math.max(0, col - getIndentUnit(state)));
    while (keep < space.length && keep < insert.length && space.charCodeAt(keep) == insert.charCodeAt(keep))
      keep++;
    changes.push({ from: line.from + keep, to: line.from + space.length, insert: insert.slice(keep) });
  }), { userEvent: "delete.dedent" }));
  return true;
};
var emacsStyleKeymap = [
  { key: "Ctrl-b", run: cursorCharLeft, shift: selectCharLeft, preventDefault: true },
  { key: "Ctrl-f", run: cursorCharRight, shift: selectCharRight },
  { key: "Ctrl-p", run: cursorLineUp, shift: selectLineUp },
  { key: "Ctrl-n", run: cursorLineDown, shift: selectLineDown },
  { key: "Ctrl-a", run: cursorLineStart, shift: selectLineStart },
  { key: "Ctrl-e", run: cursorLineEnd, shift: selectLineEnd },
  { key: "Ctrl-d", run: deleteCharForward },
  { key: "Ctrl-h", run: deleteCharBackward },
  { key: "Ctrl-k", run: deleteToLineEnd },
  { key: "Ctrl-Alt-h", run: deleteGroupBackward },
  { key: "Ctrl-o", run: splitLine },
  { key: "Ctrl-t", run: transposeChars },
  { key: "Ctrl-v", run: cursorPageDown }
];
var standardKeymap = [
  { key: "ArrowLeft", run: cursorCharLeft, shift: selectCharLeft, preventDefault: true },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: cursorGroupLeft, shift: selectGroupLeft, preventDefault: true },
  { mac: "Cmd-ArrowLeft", run: cursorLineBoundaryLeft, shift: selectLineBoundaryLeft, preventDefault: true },
  { key: "ArrowRight", run: cursorCharRight, shift: selectCharRight, preventDefault: true },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: cursorGroupRight, shift: selectGroupRight, preventDefault: true },
  { mac: "Cmd-ArrowRight", run: cursorLineBoundaryRight, shift: selectLineBoundaryRight, preventDefault: true },
  { key: "ArrowUp", run: cursorLineUp, shift: selectLineUp, preventDefault: true },
  { mac: "Cmd-ArrowUp", run: cursorDocStart, shift: selectDocStart },
  { mac: "Ctrl-ArrowUp", run: cursorPageUp, shift: selectPageUp },
  { key: "ArrowDown", run: cursorLineDown, shift: selectLineDown, preventDefault: true },
  { mac: "Cmd-ArrowDown", run: cursorDocEnd, shift: selectDocEnd },
  { mac: "Ctrl-ArrowDown", run: cursorPageDown, shift: selectPageDown },
  { key: "PageUp", run: cursorPageUp, shift: selectPageUp },
  { key: "PageDown", run: cursorPageDown, shift: selectPageDown },
  { key: "Home", run: cursorLineBoundaryBackward, shift: selectLineBoundaryBackward, preventDefault: true },
  { key: "Mod-Home", run: cursorDocStart, shift: selectDocStart },
  { key: "End", run: cursorLineBoundaryForward, shift: selectLineBoundaryForward, preventDefault: true },
  { key: "Mod-End", run: cursorDocEnd, shift: selectDocEnd },
  { key: "Enter", run: insertNewlineAndIndent },
  { key: "Mod-a", run: selectAll },
  { key: "Backspace", run: deleteCharBackward, shift: deleteCharBackward },
  { key: "Delete", run: deleteCharForward },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: deleteGroupBackward },
  { key: "Mod-Delete", mac: "Alt-Delete", run: deleteGroupForward },
  { mac: "Mod-Backspace", run: deleteLineBoundaryBackward },
  { mac: "Mod-Delete", run: deleteLineBoundaryForward }
].concat(emacsStyleKeymap.map((b) => ({ mac: b.key, run: b.run, shift: b.shift })));
var defaultKeymap = [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: cursorSyntaxLeft, shift: selectSyntaxLeft },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: cursorSyntaxRight, shift: selectSyntaxRight },
  { key: "Alt-ArrowUp", run: moveLineUp },
  { key: "Shift-Alt-ArrowUp", run: copyLineUp },
  { key: "Alt-ArrowDown", run: moveLineDown },
  { key: "Shift-Alt-ArrowDown", run: copyLineDown },
  { key: "Escape", run: simplifySelection },
  { key: "Mod-Enter", run: insertBlankLine },
  { key: "Alt-l", mac: "Ctrl-l", run: selectLine },
  { key: "Mod-i", run: selectParentSyntax, preventDefault: true },
  { key: "Mod-[", run: indentLess },
  { key: "Mod-]", run: indentMore },
  { key: "Mod-Alt-\\", run: indentSelection },
  { key: "Shift-Mod-k", run: deleteLine },
  { key: "Shift-Mod-\\", run: cursorMatchingBracket },
  { key: "Mod-/", run: toggleComment },
  { key: "Alt-A", run: toggleBlockComment }
].concat(standardKeymap);
var indentWithTab = { key: "Tab", run: indentMore, shift: indentLess };

// node_modules/crelt/index.js
function crelt() {
  var elt = arguments[0];
  if (typeof elt == "string")
    elt = document.createElement(elt);
  var i2 = 1, next = arguments[1];
  if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
    for (var name in next)
      if (Object.prototype.hasOwnProperty.call(next, name)) {
        var value = next[name];
        if (typeof value == "string")
          elt.setAttribute(name, value);
        else if (value != null)
          elt[name] = value;
      }
    i2++;
  }
  for (; i2 < arguments.length; i2++)
    add(elt, arguments[i2]);
  return elt;
}
function add(elt, child) {
  if (typeof child == "string") {
    elt.appendChild(document.createTextNode(child));
  } else if (child == null) {
  } else if (child.nodeType != null) {
    elt.appendChild(child);
  } else if (Array.isArray(child)) {
    for (var i2 = 0; i2 < child.length; i2++)
      add(elt, child[i2]);
  } else {
    throw new RangeError("Unsupported child node: " + child);
  }
}

// node_modules/@codemirror/search/dist/index.js
var basicNormalize = typeof String.prototype.normalize == "function" ? (x2) => x2.normalize("NFKD") : (x2) => x2;
var SearchCursor = class {
  /**
  Create a text cursor. The query is the search string, `from` to
  `to` provides the region to search.
  
  When `normalize` is given, it will be called, on both the query
  string and the content it is matched against, before comparing.
  You can, for example, create a case-insensitive search by
  passing `s => s.toLowerCase()`.
  
  Text is always normalized with
  [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  (when supported).
  */
  constructor(text2, query, from = 0, to = text2.length, normalize3, test2) {
    this.test = test2;
    this.value = { from: 0, to: 0 };
    this.done = false;
    this.matches = [];
    this.buffer = "";
    this.bufferPos = 0;
    this.iter = text2.iterRange(from, to);
    this.bufferStart = from;
    this.normalize = normalize3 ? (x2) => normalize3(basicNormalize(x2)) : basicNormalize;
    this.query = this.normalize(query);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      this.bufferStart += this.buffer.length;
      this.iter.next();
      if (this.iter.done)
        return -1;
      this.bufferPos = 0;
      this.buffer = this.iter.value;
    }
    return codePointAt(this.buffer, this.bufferPos);
  }
  /**
  Look for the next match. Updates the iterator's
  [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
  [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
  at least once before using the cursor.
  */
  next() {
    while (this.matches.length)
      this.matches.pop();
    return this.nextOverlapping();
  }
  /**
  The `next` method will ignore matches that partially overlap a
  previous match. This method behaves like `next`, but includes
  such matches.
  */
  nextOverlapping() {
    for (; ; ) {
      let next = this.peek();
      if (next < 0) {
        this.done = true;
        return this;
      }
      let str = fromCodePoint(next), start = this.bufferStart + this.bufferPos;
      this.bufferPos += codePointSize(next);
      let norm = this.normalize(str);
      for (let i2 = 0, pos = start; ; i2++) {
        let code2 = norm.charCodeAt(i2);
        let match2 = this.match(code2, pos, this.bufferPos + this.bufferStart);
        if (i2 == norm.length - 1) {
          if (match2) {
            this.value = match2;
            return this;
          }
          break;
        }
        if (pos == start && i2 < str.length && str.charCodeAt(i2) == code2)
          pos++;
      }
    }
  }
  match(code2, pos, end) {
    let match2 = null;
    for (let i2 = 0; i2 < this.matches.length; i2 += 2) {
      let index = this.matches[i2], keep = false;
      if (this.query.charCodeAt(index) == code2) {
        if (index == this.query.length - 1) {
          match2 = { from: this.matches[i2 + 1], to: end };
        } else {
          this.matches[i2]++;
          keep = true;
        }
      }
      if (!keep) {
        this.matches.splice(i2, 2);
        i2 -= 2;
      }
    }
    if (this.query.charCodeAt(0) == code2) {
      if (this.query.length == 1)
        match2 = { from: pos, to: end };
      else
        this.matches.push(1, pos);
    }
    if (match2 && this.test && !this.test(match2.from, match2.to, this.buffer, this.bufferStart))
      match2 = null;
    return match2;
  }
};
if (typeof Symbol != "undefined")
  SearchCursor.prototype[Symbol.iterator] = function() {
    return this;
  };
var empty = { from: -1, to: -1, match: /.*/.exec("") };
var baseFlags = "gm" + (/x/.unicode == null ? "" : "u");
var RegExpCursor = class {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(text2, query, options, from = 0, to = text2.length) {
    this.text = text2;
    this.to = to;
    this.curLine = "";
    this.done = false;
    this.value = empty;
    if (/\\[sWDnr]|\n|\r|\[\^/.test(query))
      return new MultilineRegExpCursor(text2, query, options, from, to);
    this.re = new RegExp(query, baseFlags + ((options === null || options === void 0 ? void 0 : options.ignoreCase) ? "i" : ""));
    this.test = options === null || options === void 0 ? void 0 : options.test;
    this.iter = text2.iter();
    let startLine = text2.lineAt(from);
    this.curLineStart = startLine.from;
    this.matchPos = toCharEnd(text2, from);
    this.getLine(this.curLineStart);
  }
  getLine(skip) {
    this.iter.next(skip);
    if (this.iter.lineBreak) {
      this.curLine = "";
    } else {
      this.curLine = this.iter.value;
      if (this.curLineStart + this.curLine.length > this.to)
        this.curLine = this.curLine.slice(0, this.to - this.curLineStart);
      this.iter.next();
    }
  }
  nextLine() {
    this.curLineStart = this.curLineStart + this.curLine.length + 1;
    if (this.curLineStart > this.to)
      this.curLine = "";
    else
      this.getLine(0);
  }
  /**
  Move to the next match, if there is one.
  */
  next() {
    for (let off = this.matchPos - this.curLineStart; ; ) {
      this.re.lastIndex = off;
      let match2 = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (match2) {
        let from = this.curLineStart + match2.index, to = from + match2[0].length;
        this.matchPos = toCharEnd(this.text, to + (from == to ? 1 : 0));
        if (from == this.curLineStart + this.curLine.length)
          this.nextLine();
        if ((from < to || from > this.value.to) && (!this.test || this.test(from, to, match2))) {
          this.value = { from, to, match: match2 };
          return this;
        }
        off = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to) {
        this.nextLine();
        off = 0;
      } else {
        this.done = true;
        return this;
      }
    }
  }
};
var flattened = /* @__PURE__ */ new WeakMap();
var FlattenedDoc = class _FlattenedDoc {
  constructor(from, text2) {
    this.from = from;
    this.text = text2;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(doc, from, to) {
    let cached = flattened.get(doc);
    if (!cached || cached.from >= to || cached.to <= from) {
      let flat = new _FlattenedDoc(from, doc.sliceString(from, to));
      flattened.set(doc, flat);
      return flat;
    }
    if (cached.from == from && cached.to == to)
      return cached;
    let { text: text2, from: cachedFrom } = cached;
    if (cachedFrom > from) {
      text2 = doc.sliceString(from, cachedFrom) + text2;
      cachedFrom = from;
    }
    if (cached.to < to)
      text2 += doc.sliceString(cached.to, to);
    flattened.set(doc, new _FlattenedDoc(cachedFrom, text2));
    return new _FlattenedDoc(from, text2.slice(from - cachedFrom, to - cachedFrom));
  }
};
var MultilineRegExpCursor = class {
  constructor(text2, query, options, from, to) {
    this.text = text2;
    this.to = to;
    this.done = false;
    this.value = empty;
    this.matchPos = toCharEnd(text2, from);
    this.re = new RegExp(query, baseFlags + ((options === null || options === void 0 ? void 0 : options.ignoreCase) ? "i" : ""));
    this.test = options === null || options === void 0 ? void 0 : options.test;
    this.flat = FlattenedDoc.get(text2, from, this.chunkEnd(
      from + 5e3
      /* Chunk.Base */
    ));
  }
  chunkEnd(pos) {
    return pos >= this.to ? this.to : this.text.lineAt(pos).to;
  }
  next() {
    for (; ; ) {
      let off = this.re.lastIndex = this.matchPos - this.flat.from;
      let match2 = this.re.exec(this.flat.text);
      if (match2 && !match2[0] && match2.index == off) {
        this.re.lastIndex = off + 1;
        match2 = this.re.exec(this.flat.text);
      }
      if (match2) {
        let from = this.flat.from + match2.index, to = from + match2[0].length;
        if ((this.flat.to >= this.to || match2.index + match2[0].length <= this.flat.text.length - 10) && (!this.test || this.test(from, to, match2))) {
          this.value = { from, to, match: match2 };
          this.matchPos = toCharEnd(this.text, to + (from == to ? 1 : 0));
          return this;
        }
      }
      if (this.flat.to == this.to) {
        this.done = true;
        return this;
      }
      this.flat = FlattenedDoc.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
    }
  }
};
if (typeof Symbol != "undefined") {
  RegExpCursor.prototype[Symbol.iterator] = MultilineRegExpCursor.prototype[Symbol.iterator] = function() {
    return this;
  };
}
function validRegExp(source) {
  try {
    new RegExp(source, baseFlags);
    return true;
  } catch (_a4) {
    return false;
  }
}
function toCharEnd(text2, pos) {
  if (pos >= text2.length)
    return pos;
  let line = text2.lineAt(pos), next;
  while (pos < line.to && (next = line.text.charCodeAt(pos - line.from)) >= 56320 && next < 57344)
    pos++;
  return pos;
}
function createLineDialog(view) {
  let line = String(view.state.doc.lineAt(view.state.selection.main.head).number);
  let input = crelt("input", { class: "cm-textfield", name: "line", value: line });
  let dom = crelt("form", {
    class: "cm-gotoLine",
    onkeydown: (event) => {
      if (event.keyCode == 27) {
        event.preventDefault();
        view.dispatch({ effects: dialogEffect.of(false) });
        view.focus();
      } else if (event.keyCode == 13) {
        event.preventDefault();
        go();
      }
    },
    onsubmit: (event) => {
      event.preventDefault();
      go();
    }
  }, crelt("label", view.state.phrase("Go to line"), ": ", input), " ", crelt("button", { class: "cm-button", type: "submit" }, view.state.phrase("go")));
  function go() {
    let match2 = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(input.value);
    if (!match2)
      return;
    let { state } = view, startLine = state.doc.lineAt(state.selection.main.head);
    let [, sign, ln, cl, percent] = match2;
    let col = cl ? +cl.slice(1) : 0;
    let line2 = ln ? +ln : startLine.number;
    if (ln && percent) {
      let pc = line2 / 100;
      if (sign)
        pc = pc * (sign == "-" ? -1 : 1) + startLine.number / state.doc.lines;
      line2 = Math.round(state.doc.lines * pc);
    } else if (ln && sign) {
      line2 = line2 * (sign == "-" ? -1 : 1) + startLine.number;
    }
    let docLine = state.doc.line(Math.max(1, Math.min(state.doc.lines, line2)));
    let selection2 = EditorSelection.cursor(docLine.from + Math.max(0, Math.min(col, docLine.length)));
    view.dispatch({
      effects: [dialogEffect.of(false), EditorView.scrollIntoView(selection2.from, { y: "center" })],
      selection: selection2
    });
    view.focus();
  }
  return { dom };
}
var dialogEffect = StateEffect.define();
var dialogField = StateField.define({
  create() {
    return true;
  },
  update(value, tr) {
    for (let e2 of tr.effects)
      if (e2.is(dialogEffect))
        value = e2.value;
    return value;
  },
  provide: (f) => showPanel.from(f, (val) => val ? createLineDialog : null)
});
var gotoLine = (view) => {
  let panel = getPanel(view, createLineDialog);
  if (!panel) {
    let effects = [dialogEffect.of(true)];
    if (view.state.field(dialogField, false) == null)
      effects.push(StateEffect.appendConfig.of([dialogField, baseTheme$1]));
    view.dispatch({ effects });
    panel = getPanel(view, createLineDialog);
  }
  if (panel)
    panel.dom.querySelector("input").select();
  return true;
};
var baseTheme$1 = EditorView.baseTheme({
  ".cm-panel.cm-gotoLine": {
    padding: "2px 6px 4px",
    "& label": { fontSize: "80%" }
  }
});
var defaultHighlightOptions = {
  highlightWordAroundCursor: false,
  minSelectionLength: 1,
  maxMatches: 100,
  wholeWords: false
};
var highlightConfig = Facet.define({
  combine(options) {
    return combineConfig(options, defaultHighlightOptions, {
      highlightWordAroundCursor: (a, b) => a || b,
      minSelectionLength: Math.min,
      maxMatches: Math.min
    });
  }
});
function highlightSelectionMatches(options) {
  let ext = [defaultTheme, matchHighlighter];
  if (options)
    ext.push(highlightConfig.of(options));
  return ext;
}
var matchDeco = Decoration.mark({ class: "cm-selectionMatch" });
var mainMatchDeco = Decoration.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function insideWordBoundaries(check, state, from, to) {
  return (from == 0 || check(state.sliceDoc(from - 1, from)) != CharCategory.Word) && (to == state.doc.length || check(state.sliceDoc(to, to + 1)) != CharCategory.Word);
}
function insideWord(check, state, from, to) {
  return check(state.sliceDoc(from, from + 1)) == CharCategory.Word && check(state.sliceDoc(to - 1, to)) == CharCategory.Word;
}
var matchHighlighter = ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = this.getDeco(view);
  }
  update(update) {
    if (update.selectionSet || update.docChanged || update.viewportChanged)
      this.decorations = this.getDeco(update.view);
  }
  getDeco(view) {
    let conf = view.state.facet(highlightConfig);
    let { state } = view, sel = state.selection;
    if (sel.ranges.length > 1)
      return Decoration.none;
    let range = sel.main, query, check = null;
    if (range.empty) {
      if (!conf.highlightWordAroundCursor)
        return Decoration.none;
      let word = state.wordAt(range.head);
      if (!word)
        return Decoration.none;
      check = state.charCategorizer(range.head);
      query = state.sliceDoc(word.from, word.to);
    } else {
      let len = range.to - range.from;
      if (len < conf.minSelectionLength || len > 200)
        return Decoration.none;
      if (conf.wholeWords) {
        query = state.sliceDoc(range.from, range.to);
        check = state.charCategorizer(range.head);
        if (!(insideWordBoundaries(check, state, range.from, range.to) && insideWord(check, state, range.from, range.to)))
          return Decoration.none;
      } else {
        query = state.sliceDoc(range.from, range.to);
        if (!query)
          return Decoration.none;
      }
    }
    let deco = [];
    for (let part of view.visibleRanges) {
      let cursor2 = new SearchCursor(state.doc, query, part.from, part.to);
      while (!cursor2.next().done) {
        let { from, to } = cursor2.value;
        if (!check || insideWordBoundaries(check, state, from, to)) {
          if (range.empty && from <= range.from && to >= range.to)
            deco.push(mainMatchDeco.range(from, to));
          else if (from >= range.to || to <= range.from)
            deco.push(matchDeco.range(from, to));
          if (deco.length > conf.maxMatches)
            return Decoration.none;
        }
      }
    }
    return Decoration.set(deco);
  }
}, {
  decorations: (v) => v.decorations
});
var defaultTheme = EditorView.baseTheme({
  ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
  ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
});
var selectWord = ({ state, dispatch }) => {
  let { selection: selection2 } = state;
  let newSel = EditorSelection.create(selection2.ranges.map((range) => state.wordAt(range.head) || EditorSelection.cursor(range.head)), selection2.mainIndex);
  if (newSel.eq(selection2))
    return false;
  dispatch(state.update({ selection: newSel }));
  return true;
};
function findNextOccurrence(state, query) {
  let { main, ranges } = state.selection;
  let word = state.wordAt(main.head), fullWord = word && word.from == main.from && word.to == main.to;
  for (let cycled = false, cursor2 = new SearchCursor(state.doc, query, ranges[ranges.length - 1].to); ; ) {
    cursor2.next();
    if (cursor2.done) {
      if (cycled)
        return null;
      cursor2 = new SearchCursor(state.doc, query, 0, Math.max(0, ranges[ranges.length - 1].from - 1));
      cycled = true;
    } else {
      if (cycled && ranges.some((r2) => r2.from == cursor2.value.from))
        continue;
      if (fullWord) {
        let word2 = state.wordAt(cursor2.value.from);
        if (!word2 || word2.from != cursor2.value.from || word2.to != cursor2.value.to)
          continue;
      }
      return cursor2.value;
    }
  }
}
var selectNextOccurrence = ({ state, dispatch }) => {
  let { ranges } = state.selection;
  if (ranges.some((sel) => sel.from === sel.to))
    return selectWord({ state, dispatch });
  let searchedText = state.sliceDoc(ranges[0].from, ranges[0].to);
  if (state.selection.ranges.some((r2) => state.sliceDoc(r2.from, r2.to) != searchedText))
    return false;
  let range = findNextOccurrence(state, searchedText);
  if (!range)
    return false;
  dispatch(state.update({
    selection: state.selection.addRange(EditorSelection.range(range.from, range.to), false),
    effects: EditorView.scrollIntoView(range.to)
  }));
  return true;
};
var searchConfigFacet = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      top: false,
      caseSensitive: false,
      literal: false,
      regexp: false,
      wholeWord: false,
      createPanel: (view) => new SearchPanel(view),
      scrollToMatch: (range) => EditorView.scrollIntoView(range)
    });
  }
});
var SearchQuery = class {
  /**
  Create a query object.
  */
  constructor(config3) {
    this.search = config3.search;
    this.caseSensitive = !!config3.caseSensitive;
    this.literal = !!config3.literal;
    this.regexp = !!config3.regexp;
    this.replace = config3.replace || "";
    this.valid = !!this.search && (!this.regexp || validRegExp(this.search));
    this.unquoted = this.unquote(this.search);
    this.wholeWord = !!config3.wholeWord;
  }
  /**
  @internal
  */
  unquote(text2) {
    return this.literal ? text2 : text2.replace(/\\([nrt\\])/g, (_, ch) => ch == "n" ? "\n" : ch == "r" ? "\r" : ch == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(other) {
    return this.search == other.search && this.replace == other.replace && this.caseSensitive == other.caseSensitive && this.regexp == other.regexp && this.wholeWord == other.wholeWord;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new RegExpQuery(this) : new StringQuery(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given state.
  */
  getCursor(state, from = 0, to) {
    let st = state.doc ? state : EditorState.create({ doc: state });
    if (to == null)
      to = st.doc.length;
    return this.regexp ? regexpCursor(this, st, from, to) : stringCursor(this, st, from, to);
  }
};
var QueryType = class {
  constructor(spec) {
    this.spec = spec;
  }
};
function stringCursor(spec, state, from, to) {
  return new SearchCursor(state.doc, spec.unquoted, from, to, spec.caseSensitive ? void 0 : (x2) => x2.toLowerCase(), spec.wholeWord ? stringWordTest(state.doc, state.charCategorizer(state.selection.main.head)) : void 0);
}
function stringWordTest(doc, categorizer) {
  return (from, to, buf, bufPos) => {
    if (bufPos > from || bufPos + buf.length < to) {
      bufPos = Math.max(0, from - 2);
      buf = doc.sliceString(bufPos, Math.min(doc.length, to + 2));
    }
    return (categorizer(charBefore(buf, from - bufPos)) != CharCategory.Word || categorizer(charAfter(buf, from - bufPos)) != CharCategory.Word) && (categorizer(charAfter(buf, to - bufPos)) != CharCategory.Word || categorizer(charBefore(buf, to - bufPos)) != CharCategory.Word);
  };
}
var StringQuery = class extends QueryType {
  constructor(spec) {
    super(spec);
  }
  nextMatch(state, curFrom, curTo) {
    let cursor2 = stringCursor(this.spec, state, curTo, state.doc.length).nextOverlapping();
    if (cursor2.done)
      cursor2 = stringCursor(this.spec, state, 0, curFrom).nextOverlapping();
    return cursor2.done ? null : cursor2.value;
  }
  // Searching in reverse is, rather than implementing an inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(state, from, to) {
    for (let pos = to; ; ) {
      let start = Math.max(from, pos - 1e4 - this.spec.unquoted.length);
      let cursor2 = stringCursor(this.spec, state, start, pos), range = null;
      while (!cursor2.nextOverlapping().done)
        range = cursor2.value;
      if (range)
        return range;
      if (start == from)
        return null;
      pos -= 1e4;
    }
  }
  prevMatch(state, curFrom, curTo) {
    return this.prevMatchInRange(state, 0, curFrom) || this.prevMatchInRange(state, curTo, state.doc.length);
  }
  getReplacement(_result) {
    return this.spec.unquote(this.spec.replace);
  }
  matchAll(state, limit) {
    let cursor2 = stringCursor(this.spec, state, 0, state.doc.length), ranges = [];
    while (!cursor2.next().done) {
      if (ranges.length >= limit)
        return null;
      ranges.push(cursor2.value);
    }
    return ranges;
  }
  highlight(state, from, to, add3) {
    let cursor2 = stringCursor(this.spec, state, Math.max(0, from - this.spec.unquoted.length), Math.min(to + this.spec.unquoted.length, state.doc.length));
    while (!cursor2.next().done)
      add3(cursor2.value.from, cursor2.value.to);
  }
};
function regexpCursor(spec, state, from, to) {
  return new RegExpCursor(state.doc, spec.search, {
    ignoreCase: !spec.caseSensitive,
    test: spec.wholeWord ? regexpWordTest(state.charCategorizer(state.selection.main.head)) : void 0
  }, from, to);
}
function charBefore(str, index) {
  return str.slice(findClusterBreak(str, index, false), index);
}
function charAfter(str, index) {
  return str.slice(index, findClusterBreak(str, index));
}
function regexpWordTest(categorizer) {
  return (_from, _to, match2) => !match2[0].length || (categorizer(charBefore(match2.input, match2.index)) != CharCategory.Word || categorizer(charAfter(match2.input, match2.index)) != CharCategory.Word) && (categorizer(charAfter(match2.input, match2.index + match2[0].length)) != CharCategory.Word || categorizer(charBefore(match2.input, match2.index + match2[0].length)) != CharCategory.Word);
}
var RegExpQuery = class extends QueryType {
  nextMatch(state, curFrom, curTo) {
    let cursor2 = regexpCursor(this.spec, state, curTo, state.doc.length).next();
    if (cursor2.done)
      cursor2 = regexpCursor(this.spec, state, 0, curFrom).next();
    return cursor2.done ? null : cursor2.value;
  }
  prevMatchInRange(state, from, to) {
    for (let size = 1; ; size++) {
      let start = Math.max(
        from,
        to - size * 1e4
        /* FindPrev.ChunkSize */
      );
      let cursor2 = regexpCursor(this.spec, state, start, to), range = null;
      while (!cursor2.next().done)
        range = cursor2.value;
      if (range && (start == from || range.from > start + 10))
        return range;
      if (start == from)
        return null;
    }
  }
  prevMatch(state, curFrom, curTo) {
    return this.prevMatchInRange(state, 0, curFrom) || this.prevMatchInRange(state, curTo, state.doc.length);
  }
  getReplacement(result) {
    return this.spec.unquote(this.spec.replace).replace(/\$([$&\d+])/g, (m, i2) => i2 == "$" ? "$" : i2 == "&" ? result.match[0] : i2 != "0" && +i2 < result.match.length ? result.match[i2] : m);
  }
  matchAll(state, limit) {
    let cursor2 = regexpCursor(this.spec, state, 0, state.doc.length), ranges = [];
    while (!cursor2.next().done) {
      if (ranges.length >= limit)
        return null;
      ranges.push(cursor2.value);
    }
    return ranges;
  }
  highlight(state, from, to, add3) {
    let cursor2 = regexpCursor(this.spec, state, Math.max(
      0,
      from - 250
      /* RegExp.HighlightMargin */
    ), Math.min(to + 250, state.doc.length));
    while (!cursor2.next().done)
      add3(cursor2.value.from, cursor2.value.to);
  }
};
var setSearchQuery = StateEffect.define();
var togglePanel = StateEffect.define();
var searchState = StateField.define({
  create(state) {
    return new SearchState(defaultQuery(state).create(), null);
  },
  update(value, tr) {
    for (let effect of tr.effects) {
      if (effect.is(setSearchQuery))
        value = new SearchState(effect.value.create(), value.panel);
      else if (effect.is(togglePanel))
        value = new SearchState(value.query, effect.value ? createSearchPanel : null);
    }
    return value;
  },
  provide: (f) => showPanel.from(f, (val) => val.panel)
});
var SearchState = class {
  constructor(query, panel) {
    this.query = query;
    this.panel = panel;
  }
};
var matchMark = Decoration.mark({ class: "cm-searchMatch" });
var selectedMatchMark = Decoration.mark({ class: "cm-searchMatch cm-searchMatch-selected" });
var searchHighlighter = ViewPlugin.fromClass(class {
  constructor(view) {
    this.view = view;
    this.decorations = this.highlight(view.state.field(searchState));
  }
  update(update) {
    let state = update.state.field(searchState);
    if (state != update.startState.field(searchState) || update.docChanged || update.selectionSet || update.viewportChanged)
      this.decorations = this.highlight(state);
  }
  highlight({ query, panel }) {
    if (!panel || !query.spec.valid)
      return Decoration.none;
    let { view } = this;
    let builder = new RangeSetBuilder();
    for (let i2 = 0, ranges = view.visibleRanges, l = ranges.length; i2 < l; i2++) {
      let { from, to } = ranges[i2];
      while (i2 < l - 1 && to > ranges[i2 + 1].from - 2 * 250)
        to = ranges[++i2].to;
      query.highlight(view.state, from, to, (from2, to2) => {
        let selected = view.state.selection.ranges.some((r2) => r2.from == from2 && r2.to == to2);
        builder.add(from2, to2, selected ? selectedMatchMark : matchMark);
      });
    }
    return builder.finish();
  }
}, {
  decorations: (v) => v.decorations
});
function searchCommand(f) {
  return (view) => {
    let state = view.state.field(searchState, false);
    return state && state.query.spec.valid ? f(view, state) : openSearchPanel(view);
  };
}
var findNext = searchCommand((view, { query }) => {
  let { to } = view.state.selection.main;
  let next = query.nextMatch(view.state, to, to);
  if (!next)
    return false;
  let selection2 = EditorSelection.single(next.from, next.to);
  let config3 = view.state.facet(searchConfigFacet);
  view.dispatch({
    selection: selection2,
    effects: [announceMatch(view, next), config3.scrollToMatch(selection2.main, view)],
    userEvent: "select.search"
  });
  selectSearchInput(view);
  return true;
});
var findPrevious = searchCommand((view, { query }) => {
  let { state } = view, { from } = state.selection.main;
  let prev = query.prevMatch(state, from, from);
  if (!prev)
    return false;
  let selection2 = EditorSelection.single(prev.from, prev.to);
  let config3 = view.state.facet(searchConfigFacet);
  view.dispatch({
    selection: selection2,
    effects: [announceMatch(view, prev), config3.scrollToMatch(selection2.main, view)],
    userEvent: "select.search"
  });
  selectSearchInput(view);
  return true;
});
var selectMatches = searchCommand((view, { query }) => {
  let ranges = query.matchAll(view.state, 1e3);
  if (!ranges || !ranges.length)
    return false;
  view.dispatch({
    selection: EditorSelection.create(ranges.map((r2) => EditorSelection.range(r2.from, r2.to))),
    userEvent: "select.search.matches"
  });
  return true;
});
var selectSelectionMatches = ({ state, dispatch }) => {
  let sel = state.selection;
  if (sel.ranges.length > 1 || sel.main.empty)
    return false;
  let { from, to } = sel.main;
  let ranges = [], main = 0;
  for (let cur = new SearchCursor(state.doc, state.sliceDoc(from, to)); !cur.next().done; ) {
    if (ranges.length > 1e3)
      return false;
    if (cur.value.from == from)
      main = ranges.length;
    ranges.push(EditorSelection.range(cur.value.from, cur.value.to));
  }
  dispatch(state.update({
    selection: EditorSelection.create(ranges, main),
    userEvent: "select.search.matches"
  }));
  return true;
};
var replaceNext = searchCommand((view, { query }) => {
  let { state } = view, { from, to } = state.selection.main;
  if (state.readOnly)
    return false;
  let next = query.nextMatch(state, from, from);
  if (!next)
    return false;
  let changes = [], selection2, replacement;
  let effects = [];
  if (next.from == from && next.to == to) {
    replacement = state.toText(query.getReplacement(next));
    changes.push({ from: next.from, to: next.to, insert: replacement });
    next = query.nextMatch(state, next.from, next.to);
    effects.push(EditorView.announce.of(state.phrase("replaced match on line $", state.doc.lineAt(from).number) + "."));
  }
  if (next) {
    let off = changes.length == 0 || changes[0].from >= next.to ? 0 : next.to - next.from - replacement.length;
    selection2 = EditorSelection.single(next.from - off, next.to - off);
    effects.push(announceMatch(view, next));
    effects.push(state.facet(searchConfigFacet).scrollToMatch(selection2.main, view));
  }
  view.dispatch({
    changes,
    selection: selection2,
    effects,
    userEvent: "input.replace"
  });
  return true;
});
var replaceAll = searchCommand((view, { query }) => {
  if (view.state.readOnly)
    return false;
  let changes = query.matchAll(view.state, 1e9).map((match2) => {
    let { from, to } = match2;
    return { from, to, insert: query.getReplacement(match2) };
  });
  if (!changes.length)
    return false;
  let announceText = view.state.phrase("replaced $ matches", changes.length) + ".";
  view.dispatch({
    changes,
    effects: EditorView.announce.of(announceText),
    userEvent: "input.replace.all"
  });
  return true;
});
function createSearchPanel(view) {
  return view.state.facet(searchConfigFacet).createPanel(view);
}
function defaultQuery(state, fallback) {
  var _a4, _b, _c, _d, _e;
  let sel = state.selection.main;
  let selText = sel.empty || sel.to > sel.from + 100 ? "" : state.sliceDoc(sel.from, sel.to);
  if (fallback && !selText)
    return fallback;
  let config3 = state.facet(searchConfigFacet);
  return new SearchQuery({
    search: ((_a4 = fallback === null || fallback === void 0 ? void 0 : fallback.literal) !== null && _a4 !== void 0 ? _a4 : config3.literal) ? selText : selText.replace(/\n/g, "\\n"),
    caseSensitive: (_b = fallback === null || fallback === void 0 ? void 0 : fallback.caseSensitive) !== null && _b !== void 0 ? _b : config3.caseSensitive,
    literal: (_c = fallback === null || fallback === void 0 ? void 0 : fallback.literal) !== null && _c !== void 0 ? _c : config3.literal,
    regexp: (_d = fallback === null || fallback === void 0 ? void 0 : fallback.regexp) !== null && _d !== void 0 ? _d : config3.regexp,
    wholeWord: (_e = fallback === null || fallback === void 0 ? void 0 : fallback.wholeWord) !== null && _e !== void 0 ? _e : config3.wholeWord
  });
}
function getSearchInput(view) {
  let panel = getPanel(view, createSearchPanel);
  return panel && panel.dom.querySelector("[main-field]");
}
function selectSearchInput(view) {
  let input = getSearchInput(view);
  if (input && input == view.root.activeElement)
    input.select();
}
var openSearchPanel = (view) => {
  let state = view.state.field(searchState, false);
  if (state && state.panel) {
    let searchInput = getSearchInput(view);
    if (searchInput && searchInput != view.root.activeElement) {
      let query = defaultQuery(view.state, state.query.spec);
      if (query.valid)
        view.dispatch({ effects: setSearchQuery.of(query) });
      searchInput.focus();
      searchInput.select();
    }
  } else {
    view.dispatch({ effects: [
      togglePanel.of(true),
      state ? setSearchQuery.of(defaultQuery(view.state, state.query.spec)) : StateEffect.appendConfig.of(searchExtensions)
    ] });
  }
  return true;
};
var closeSearchPanel = (view) => {
  let state = view.state.field(searchState, false);
  if (!state || !state.panel)
    return false;
  let panel = getPanel(view, createSearchPanel);
  if (panel && panel.dom.contains(view.root.activeElement))
    view.focus();
  view.dispatch({ effects: togglePanel.of(false) });
  return true;
};
var searchKeymap = [
  { key: "Mod-f", run: openSearchPanel, scope: "editor search-panel" },
  { key: "F3", run: findNext, shift: findPrevious, scope: "editor search-panel", preventDefault: true },
  { key: "Mod-g", run: findNext, shift: findPrevious, scope: "editor search-panel", preventDefault: true },
  { key: "Escape", run: closeSearchPanel, scope: "editor search-panel" },
  { key: "Mod-Shift-l", run: selectSelectionMatches },
  { key: "Mod-Alt-g", run: gotoLine },
  { key: "Mod-d", run: selectNextOccurrence, preventDefault: true }
];
var SearchPanel = class {
  constructor(view) {
    this.view = view;
    let query = this.query = view.state.field(searchState).query.spec;
    this.commit = this.commit.bind(this);
    this.searchField = crelt("input", {
      value: query.search,
      placeholder: phrase(view, "Find"),
      "aria-label": phrase(view, "Find"),
      class: "cm-textfield",
      name: "search",
      form: "",
      "main-field": "true",
      onchange: this.commit,
      onkeyup: this.commit
    });
    this.replaceField = crelt("input", {
      value: query.replace,
      placeholder: phrase(view, "Replace"),
      "aria-label": phrase(view, "Replace"),
      class: "cm-textfield",
      name: "replace",
      form: "",
      onchange: this.commit,
      onkeyup: this.commit
    });
    this.caseField = crelt("input", {
      type: "checkbox",
      name: "case",
      form: "",
      checked: query.caseSensitive,
      onchange: this.commit
    });
    this.reField = crelt("input", {
      type: "checkbox",
      name: "re",
      form: "",
      checked: query.regexp,
      onchange: this.commit
    });
    this.wordField = crelt("input", {
      type: "checkbox",
      name: "word",
      form: "",
      checked: query.wholeWord,
      onchange: this.commit
    });
    function button(name, onclick, content) {
      return crelt("button", { class: "cm-button", name, onclick, type: "button" }, content);
    }
    this.dom = crelt("div", { onkeydown: (e2) => this.keydown(e2), class: "cm-search" }, [
      this.searchField,
      button("next", () => findNext(view), [phrase(view, "next")]),
      button("prev", () => findPrevious(view), [phrase(view, "previous")]),
      button("select", () => selectMatches(view), [phrase(view, "all")]),
      crelt("label", null, [this.caseField, phrase(view, "match case")]),
      crelt("label", null, [this.reField, phrase(view, "regexp")]),
      crelt("label", null, [this.wordField, phrase(view, "by word")]),
      ...view.state.readOnly ? [] : [
        crelt("br"),
        this.replaceField,
        button("replace", () => replaceNext(view), [phrase(view, "replace")]),
        button("replaceAll", () => replaceAll(view), [phrase(view, "replace all")])
      ],
      crelt("button", {
        name: "close",
        onclick: () => closeSearchPanel(view),
        "aria-label": phrase(view, "close"),
        type: "button"
      }, ["×"])
    ]);
  }
  commit() {
    let query = new SearchQuery({
      search: this.searchField.value,
      caseSensitive: this.caseField.checked,
      regexp: this.reField.checked,
      wholeWord: this.wordField.checked,
      replace: this.replaceField.value
    });
    if (!query.eq(this.query)) {
      this.query = query;
      this.view.dispatch({ effects: setSearchQuery.of(query) });
    }
  }
  keydown(e2) {
    if (runScopeHandlers(this.view, e2, "search-panel")) {
      e2.preventDefault();
    } else if (e2.keyCode == 13 && e2.target == this.searchField) {
      e2.preventDefault();
      (e2.shiftKey ? findPrevious : findNext)(this.view);
    } else if (e2.keyCode == 13 && e2.target == this.replaceField) {
      e2.preventDefault();
      replaceNext(this.view);
    }
  }
  update(update) {
    for (let tr of update.transactions)
      for (let effect of tr.effects) {
        if (effect.is(setSearchQuery) && !effect.value.eq(this.query))
          this.setQuery(effect.value);
      }
  }
  setQuery(query) {
    this.query = query;
    this.searchField.value = query.search;
    this.replaceField.value = query.replace;
    this.caseField.checked = query.caseSensitive;
    this.reField.checked = query.regexp;
    this.wordField.checked = query.wholeWord;
  }
  mount() {
    this.searchField.select();
  }
  get pos() {
    return 80;
  }
  get top() {
    return this.view.state.facet(searchConfigFacet).top;
  }
};
function phrase(view, phrase2) {
  return view.state.phrase(phrase2);
}
var AnnounceMargin = 30;
var Break = /[\s\.,:;?!]/;
function announceMatch(view, { from, to }) {
  let line = view.state.doc.lineAt(from), lineEnd = view.state.doc.lineAt(to).to;
  let start = Math.max(line.from, from - AnnounceMargin), end = Math.min(lineEnd, to + AnnounceMargin);
  let text2 = view.state.sliceDoc(start, end);
  if (start != line.from) {
    for (let i2 = 0; i2 < AnnounceMargin; i2++)
      if (!Break.test(text2[i2 + 1]) && Break.test(text2[i2])) {
        text2 = text2.slice(i2);
        break;
      }
  }
  if (end != lineEnd) {
    for (let i2 = text2.length - 1; i2 > text2.length - AnnounceMargin; i2--)
      if (!Break.test(text2[i2 - 1]) && Break.test(text2[i2])) {
        text2 = text2.slice(0, i2);
        break;
      }
  }
  return EditorView.announce.of(`${view.state.phrase("current match")}. ${text2} ${view.state.phrase("on line")} ${line.number}.`);
}
var baseTheme = EditorView.baseTheme({
  ".cm-panel.cm-search": {
    padding: "2px 6px 4px",
    position: "relative",
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "4px",
      backgroundColor: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    },
    "& input, & button, & label": {
      margin: ".2em .6em .2em 0"
    },
    "& input[type=checkbox]": {
      marginRight: ".2em"
    },
    "& label": {
      fontSize: "80%",
      whiteSpace: "pre"
    }
  },
  "&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
  "&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
  "&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
  "&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
});
var searchExtensions = [
  searchState,
  Prec.low(searchHighlighter),
  baseTheme
];

// node_modules/@codemirror/lint/dist/index.js
var SelectedDiagnostic = class {
  constructor(from, to, diagnostic) {
    this.from = from;
    this.to = to;
    this.diagnostic = diagnostic;
  }
};
var LintState = class _LintState {
  constructor(diagnostics, panel, selected) {
    this.diagnostics = diagnostics;
    this.panel = panel;
    this.selected = selected;
  }
  static init(diagnostics, panel, state) {
    let markedDiagnostics = diagnostics;
    let diagnosticFilter = state.facet(lintConfig).markerFilter;
    if (diagnosticFilter)
      markedDiagnostics = diagnosticFilter(markedDiagnostics, state);
    let ranges = Decoration.set(markedDiagnostics.map((d) => {
      return d.from == d.to || d.from == d.to - 1 && state.doc.lineAt(d.from).to == d.from ? Decoration.widget({
        widget: new DiagnosticWidget(d),
        diagnostic: d
      }).range(d.from) : Decoration.mark({
        attributes: { class: "cm-lintRange cm-lintRange-" + d.severity + (d.markClass ? " " + d.markClass : "") },
        diagnostic: d,
        inclusive: true
      }).range(d.from, d.to);
    }), true);
    return new _LintState(ranges, panel, findDiagnostic(ranges));
  }
};
function findDiagnostic(diagnostics, diagnostic = null, after = 0) {
  let found = null;
  diagnostics.between(after, 1e9, (from, to, { spec }) => {
    if (diagnostic && spec.diagnostic != diagnostic)
      return;
    found = new SelectedDiagnostic(from, to, spec.diagnostic);
    return false;
  });
  return found;
}
function hideTooltip(tr, tooltip) {
  let line = tr.startState.doc.lineAt(tooltip.pos);
  return !!(tr.effects.some((e2) => e2.is(setDiagnosticsEffect)) || tr.changes.touchesRange(line.from, line.to));
}
function maybeEnableLint(state, effects) {
  return state.field(lintState, false) ? effects : effects.concat(StateEffect.appendConfig.of(lintExtensions));
}
function setDiagnostics(state, diagnostics) {
  return {
    effects: maybeEnableLint(state, [setDiagnosticsEffect.of(diagnostics)])
  };
}
var setDiagnosticsEffect = StateEffect.define();
var togglePanel2 = StateEffect.define();
var movePanelSelection = StateEffect.define();
var lintState = StateField.define({
  create() {
    return new LintState(Decoration.none, null, null);
  },
  update(value, tr) {
    if (tr.docChanged) {
      let mapped = value.diagnostics.map(tr.changes), selected = null;
      if (value.selected) {
        let selPos = tr.changes.mapPos(value.selected.from, 1);
        selected = findDiagnostic(mapped, value.selected.diagnostic, selPos) || findDiagnostic(mapped, null, selPos);
      }
      value = new LintState(mapped, value.panel, selected);
    }
    for (let effect of tr.effects) {
      if (effect.is(setDiagnosticsEffect)) {
        value = LintState.init(effect.value, value.panel, tr.state);
      } else if (effect.is(togglePanel2)) {
        value = new LintState(value.diagnostics, effect.value ? LintPanel.open : null, value.selected);
      } else if (effect.is(movePanelSelection)) {
        value = new LintState(value.diagnostics, value.panel, effect.value);
      }
    }
    return value;
  },
  provide: (f) => [
    showPanel.from(f, (val) => val.panel),
    EditorView.decorations.from(f, (s) => s.diagnostics)
  ]
});
var activeMark = Decoration.mark({ class: "cm-lintRange cm-lintRange-active", inclusive: true });
function lintTooltip(view, pos, side) {
  let { diagnostics } = view.state.field(lintState);
  let found = [], stackStart = 2e8, stackEnd = 0;
  diagnostics.between(pos - (side < 0 ? 1 : 0), pos + (side > 0 ? 1 : 0), (from, to, { spec }) => {
    if (pos >= from && pos <= to && (from == to || (pos > from || side > 0) && (pos < to || side < 0))) {
      found.push(spec.diagnostic);
      stackStart = Math.min(from, stackStart);
      stackEnd = Math.max(to, stackEnd);
    }
  });
  let diagnosticFilter = view.state.facet(lintConfig).tooltipFilter;
  if (diagnosticFilter)
    found = diagnosticFilter(found, view.state);
  if (!found.length)
    return null;
  return {
    pos: stackStart,
    end: stackEnd,
    above: view.state.doc.lineAt(stackStart).to < stackEnd,
    create() {
      return { dom: diagnosticsTooltip(view, found) };
    }
  };
}
function diagnosticsTooltip(view, diagnostics) {
  return crelt("ul", { class: "cm-tooltip-lint" }, diagnostics.map((d) => renderDiagnostic(view, d, false)));
}
var openLintPanel = (view) => {
  let field = view.state.field(lintState, false);
  if (!field || !field.panel)
    view.dispatch({ effects: maybeEnableLint(view.state, [togglePanel2.of(true)]) });
  let panel = getPanel(view, LintPanel.open);
  if (panel)
    panel.dom.querySelector(".cm-panel-lint ul").focus();
  return true;
};
var closeLintPanel = (view) => {
  let field = view.state.field(lintState, false);
  if (!field || !field.panel)
    return false;
  view.dispatch({ effects: togglePanel2.of(false) });
  return true;
};
var nextDiagnostic = (view) => {
  let field = view.state.field(lintState, false);
  if (!field)
    return false;
  let sel = view.state.selection.main, next = field.diagnostics.iter(sel.to + 1);
  if (!next.value) {
    next = field.diagnostics.iter(0);
    if (!next.value || next.from == sel.from && next.to == sel.to)
      return false;
  }
  view.dispatch({ selection: { anchor: next.from, head: next.to }, scrollIntoView: true });
  return true;
};
var lintKeymap = [
  { key: "Mod-Shift-m", run: openLintPanel, preventDefault: true },
  { key: "F8", run: nextDiagnostic }
];
var lintPlugin = ViewPlugin.fromClass(class {
  constructor(view) {
    this.view = view;
    this.timeout = -1;
    this.set = true;
    let { delay } = view.state.facet(lintConfig);
    this.lintTime = Date.now() + delay;
    this.run = this.run.bind(this);
    this.timeout = setTimeout(this.run, delay);
  }
  run() {
    let now = Date.now();
    if (now < this.lintTime - 10) {
      this.timeout = setTimeout(this.run, this.lintTime - now);
    } else {
      this.set = false;
      let { state } = this.view, { sources } = state.facet(lintConfig);
      if (sources.length)
        Promise.all(sources.map((source) => Promise.resolve(source(this.view)))).then((annotations) => {
          let all = annotations.reduce((a, b) => a.concat(b));
          if (this.view.state.doc == state.doc)
            this.view.dispatch(setDiagnostics(this.view.state, all));
        }, (error2) => {
          logException(this.view.state, error2);
        });
    }
  }
  update(update) {
    let config3 = update.state.facet(lintConfig);
    if (update.docChanged || config3 != update.startState.facet(lintConfig) || config3.needsRefresh && config3.needsRefresh(update)) {
      this.lintTime = Date.now() + config3.delay;
      if (!this.set) {
        this.set = true;
        this.timeout = setTimeout(this.run, config3.delay);
      }
    }
  }
  force() {
    if (this.set) {
      this.lintTime = Date.now();
      this.run();
    }
  }
  destroy() {
    clearTimeout(this.timeout);
  }
});
var lintConfig = Facet.define({
  combine(input) {
    return Object.assign({ sources: input.map((i2) => i2.source).filter((x2) => x2 != null) }, combineConfig(input.map((i2) => i2.config), {
      delay: 750,
      markerFilter: null,
      tooltipFilter: null,
      needsRefresh: null
    }, {
      needsRefresh: (a, b) => !a ? b : !b ? a : (u) => a(u) || b(u)
    }));
  }
});
function assignKeys(actions) {
  let assigned = [];
  if (actions)
    actions:
      for (let { name } of actions) {
        for (let i2 = 0; i2 < name.length; i2++) {
          let ch = name[i2];
          if (/[a-zA-Z]/.test(ch) && !assigned.some((c) => c.toLowerCase() == ch.toLowerCase())) {
            assigned.push(ch);
            continue actions;
          }
        }
        assigned.push("");
      }
  return assigned;
}
function renderDiagnostic(view, diagnostic, inPanel) {
  var _a4;
  let keys = inPanel ? assignKeys(diagnostic.actions) : [];
  return crelt("li", { class: "cm-diagnostic cm-diagnostic-" + diagnostic.severity }, crelt("span", { class: "cm-diagnosticText" }, diagnostic.renderMessage ? diagnostic.renderMessage() : diagnostic.message), (_a4 = diagnostic.actions) === null || _a4 === void 0 ? void 0 : _a4.map((action, i2) => {
    let fired = false, click = (e2) => {
      e2.preventDefault();
      if (fired)
        return;
      fired = true;
      let found = findDiagnostic(view.state.field(lintState).diagnostics, diagnostic);
      if (found)
        action.apply(view, found.from, found.to);
    };
    let { name } = action, keyIndex = keys[i2] ? name.indexOf(keys[i2]) : -1;
    let nameElt = keyIndex < 0 ? name : [
      name.slice(0, keyIndex),
      crelt("u", name.slice(keyIndex, keyIndex + 1)),
      name.slice(keyIndex + 1)
    ];
    return crelt("button", {
      type: "button",
      class: "cm-diagnosticAction",
      onclick: click,
      onmousedown: click,
      "aria-label": ` Action: ${name}${keyIndex < 0 ? "" : ` (access key "${keys[i2]})"`}.`
    }, nameElt);
  }), diagnostic.source && crelt("div", { class: "cm-diagnosticSource" }, diagnostic.source));
}
var DiagnosticWidget = class extends WidgetType {
  constructor(diagnostic) {
    super();
    this.diagnostic = diagnostic;
  }
  eq(other) {
    return other.diagnostic == this.diagnostic;
  }
  toDOM() {
    return crelt("span", { class: "cm-lintPoint cm-lintPoint-" + this.diagnostic.severity });
  }
};
var PanelItem = class {
  constructor(view, diagnostic) {
    this.diagnostic = diagnostic;
    this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16);
    this.dom = renderDiagnostic(view, diagnostic, true);
    this.dom.id = this.id;
    this.dom.setAttribute("role", "option");
  }
};
var LintPanel = class _LintPanel {
  constructor(view) {
    this.view = view;
    this.items = [];
    let onkeydown = (event) => {
      if (event.keyCode == 27) {
        closeLintPanel(this.view);
        this.view.focus();
      } else if (event.keyCode == 38 || event.keyCode == 33) {
        this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
      } else if (event.keyCode == 40 || event.keyCode == 34) {
        this.moveSelection((this.selectedIndex + 1) % this.items.length);
      } else if (event.keyCode == 36) {
        this.moveSelection(0);
      } else if (event.keyCode == 35) {
        this.moveSelection(this.items.length - 1);
      } else if (event.keyCode == 13) {
        this.view.focus();
      } else if (event.keyCode >= 65 && event.keyCode <= 90 && this.selectedIndex >= 0) {
        let { diagnostic } = this.items[this.selectedIndex], keys = assignKeys(diagnostic.actions);
        for (let i2 = 0; i2 < keys.length; i2++)
          if (keys[i2].toUpperCase().charCodeAt(0) == event.keyCode) {
            let found = findDiagnostic(this.view.state.field(lintState).diagnostics, diagnostic);
            if (found)
              diagnostic.actions[i2].apply(view, found.from, found.to);
          }
      } else {
        return;
      }
      event.preventDefault();
    };
    let onclick = (event) => {
      for (let i2 = 0; i2 < this.items.length; i2++) {
        if (this.items[i2].dom.contains(event.target))
          this.moveSelection(i2);
      }
    };
    this.list = crelt("ul", {
      tabIndex: 0,
      role: "listbox",
      "aria-label": this.view.state.phrase("Diagnostics"),
      onkeydown,
      onclick
    });
    this.dom = crelt("div", { class: "cm-panel-lint" }, this.list, crelt("button", {
      type: "button",
      name: "close",
      "aria-label": this.view.state.phrase("close"),
      onclick: () => closeLintPanel(this.view)
    }, "×"));
    this.update();
  }
  get selectedIndex() {
    let selected = this.view.state.field(lintState).selected;
    if (!selected)
      return -1;
    for (let i2 = 0; i2 < this.items.length; i2++)
      if (this.items[i2].diagnostic == selected.diagnostic)
        return i2;
    return -1;
  }
  update() {
    let { diagnostics, selected } = this.view.state.field(lintState);
    let i2 = 0, needsSync = false, newSelectedItem = null;
    diagnostics.between(0, this.view.state.doc.length, (_start, _end, { spec }) => {
      let found = -1, item;
      for (let j = i2; j < this.items.length; j++)
        if (this.items[j].diagnostic == spec.diagnostic) {
          found = j;
          break;
        }
      if (found < 0) {
        item = new PanelItem(this.view, spec.diagnostic);
        this.items.splice(i2, 0, item);
        needsSync = true;
      } else {
        item = this.items[found];
        if (found > i2) {
          this.items.splice(i2, found - i2);
          needsSync = true;
        }
      }
      if (selected && item.diagnostic == selected.diagnostic) {
        if (!item.dom.hasAttribute("aria-selected")) {
          item.dom.setAttribute("aria-selected", "true");
          newSelectedItem = item;
        }
      } else if (item.dom.hasAttribute("aria-selected")) {
        item.dom.removeAttribute("aria-selected");
      }
      i2++;
    });
    while (i2 < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0)) {
      needsSync = true;
      this.items.pop();
    }
    if (this.items.length == 0) {
      this.items.push(new PanelItem(this.view, {
        from: -1,
        to: -1,
        severity: "info",
        message: this.view.state.phrase("No diagnostics")
      }));
      needsSync = true;
    }
    if (newSelectedItem) {
      this.list.setAttribute("aria-activedescendant", newSelectedItem.id);
      this.view.requestMeasure({
        key: this,
        read: () => ({ sel: newSelectedItem.dom.getBoundingClientRect(), panel: this.list.getBoundingClientRect() }),
        write: ({ sel, panel }) => {
          let scaleY = panel.height / this.list.offsetHeight;
          if (sel.top < panel.top)
            this.list.scrollTop -= (panel.top - sel.top) / scaleY;
          else if (sel.bottom > panel.bottom)
            this.list.scrollTop += (sel.bottom - panel.bottom) / scaleY;
        }
      });
    } else if (this.selectedIndex < 0) {
      this.list.removeAttribute("aria-activedescendant");
    }
    if (needsSync)
      this.sync();
  }
  sync() {
    let domPos = this.list.firstChild;
    function rm() {
      let prev = domPos;
      domPos = prev.nextSibling;
      prev.remove();
    }
    for (let item of this.items) {
      if (item.dom.parentNode == this.list) {
        while (domPos != item.dom)
          rm();
        domPos = item.dom.nextSibling;
      } else {
        this.list.insertBefore(item.dom, domPos);
      }
    }
    while (domPos)
      rm();
  }
  moveSelection(selectedIndex) {
    if (this.selectedIndex < 0)
      return;
    let field = this.view.state.field(lintState);
    let selection2 = findDiagnostic(field.diagnostics, this.items[selectedIndex].diagnostic);
    if (!selection2)
      return;
    this.view.dispatch({
      selection: { anchor: selection2.from, head: selection2.to },
      scrollIntoView: true,
      effects: movePanelSelection.of(selection2)
    });
  }
  static open(view) {
    return new _LintPanel(view);
  }
};
function svg(content, attrs = `viewBox="0 0 40 40"`) {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${attrs}>${encodeURIComponent(content)}</svg>')`;
}
function underline(color) {
  return svg(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${color}" fill="none" stroke-width=".7"/>`, `width="6" height="3"`);
}
var baseTheme2 = EditorView.baseTheme({
  ".cm-diagnostic": {
    padding: "3px 6px 3px 8px",
    marginLeft: "-1px",
    display: "block",
    whiteSpace: "pre-wrap"
  },
  ".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
  ".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
  ".cm-diagnostic-info": { borderLeft: "5px solid #999" },
  ".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
  ".cm-diagnosticAction": {
    font: "inherit",
    border: "none",
    padding: "2px 4px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "3px",
    marginLeft: "8px",
    cursor: "pointer"
  },
  ".cm-diagnosticSource": {
    fontSize: "70%",
    opacity: 0.7
  },
  ".cm-lintRange": {
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-x",
    paddingBottom: "0.7px"
  },
  ".cm-lintRange-error": { backgroundImage: underline("#d11") },
  ".cm-lintRange-warning": { backgroundImage: underline("orange") },
  ".cm-lintRange-info": { backgroundImage: underline("#999") },
  ".cm-lintRange-hint": { backgroundImage: underline("#66d") },
  ".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
  ".cm-tooltip-lint": {
    padding: 0,
    margin: 0
  },
  ".cm-lintPoint": {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "-2px",
      borderLeft: "3px solid transparent",
      borderRight: "3px solid transparent",
      borderBottom: "4px solid #d11"
    }
  },
  ".cm-lintPoint-warning": {
    "&:after": { borderBottomColor: "orange" }
  },
  ".cm-lintPoint-info": {
    "&:after": { borderBottomColor: "#999" }
  },
  ".cm-lintPoint-hint": {
    "&:after": { borderBottomColor: "#66d" }
  },
  ".cm-panel.cm-panel-lint": {
    position: "relative",
    "& ul": {
      maxHeight: "100px",
      overflowY: "auto",
      "& [aria-selected]": {
        backgroundColor: "#ddd",
        "& u": { textDecoration: "underline" }
      },
      "&:focus [aria-selected]": {
        background_fallback: "#bdf",
        backgroundColor: "Highlight",
        color_fallback: "white",
        color: "HighlightText"
      },
      "& u": { textDecoration: "none" },
      padding: 0,
      margin: 0
    },
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "2px",
      background: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    }
  }
});
function severityWeight(sev) {
  return sev == "error" ? 4 : sev == "warning" ? 3 : sev == "info" ? 2 : 1;
}
var LintGutterMarker = class extends GutterMarker {
  constructor(diagnostics) {
    super();
    this.diagnostics = diagnostics;
    this.severity = diagnostics.reduce((max, d) => severityWeight(max) < severityWeight(d.severity) ? d.severity : max, "hint");
  }
  toDOM(view) {
    let elt = document.createElement("div");
    elt.className = "cm-lint-marker cm-lint-marker-" + this.severity;
    let diagnostics = this.diagnostics;
    let diagnosticsFilter = view.state.facet(lintGutterConfig).tooltipFilter;
    if (diagnosticsFilter)
      diagnostics = diagnosticsFilter(diagnostics, view.state);
    if (diagnostics.length)
      elt.onmouseover = () => gutterMarkerMouseOver(view, elt, diagnostics);
    return elt;
  }
};
function trackHoverOn(view, marker) {
  let mousemove = (event) => {
    let rect = marker.getBoundingClientRect();
    if (event.clientX > rect.left - 10 && event.clientX < rect.right + 10 && event.clientY > rect.top - 10 && event.clientY < rect.bottom + 10)
      return;
    for (let target = event.target; target; target = target.parentNode) {
      if (target.nodeType == 1 && target.classList.contains("cm-tooltip-lint"))
        return;
    }
    window.removeEventListener("mousemove", mousemove);
    if (view.state.field(lintGutterTooltip))
      view.dispatch({ effects: setLintGutterTooltip.of(null) });
  };
  window.addEventListener("mousemove", mousemove);
}
function gutterMarkerMouseOver(view, marker, diagnostics) {
  function hovered() {
    let line = view.elementAtHeight(marker.getBoundingClientRect().top + 5 - view.documentTop);
    const linePos = view.coordsAtPos(line.from);
    if (linePos) {
      view.dispatch({ effects: setLintGutterTooltip.of({
        pos: line.from,
        above: false,
        create() {
          return {
            dom: diagnosticsTooltip(view, diagnostics),
            getCoords: () => marker.getBoundingClientRect()
          };
        }
      }) });
    }
    marker.onmouseout = marker.onmousemove = null;
    trackHoverOn(view, marker);
  }
  let { hoverTime } = view.state.facet(lintGutterConfig);
  let hoverTimeout = setTimeout(hovered, hoverTime);
  marker.onmouseout = () => {
    clearTimeout(hoverTimeout);
    marker.onmouseout = marker.onmousemove = null;
  };
  marker.onmousemove = () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(hovered, hoverTime);
  };
}
function markersForDiagnostics(doc, diagnostics) {
  let byLine = /* @__PURE__ */ Object.create(null);
  for (let diagnostic of diagnostics) {
    let line = doc.lineAt(diagnostic.from);
    (byLine[line.from] || (byLine[line.from] = [])).push(diagnostic);
  }
  let markers = [];
  for (let line in byLine) {
    markers.push(new LintGutterMarker(byLine[line]).range(+line));
  }
  return RangeSet.of(markers, true);
}
var lintGutterExtension = gutter({
  class: "cm-gutter-lint",
  markers: (view) => view.state.field(lintGutterMarkers)
});
var lintGutterMarkers = StateField.define({
  create() {
    return RangeSet.empty;
  },
  update(markers, tr) {
    markers = markers.map(tr.changes);
    let diagnosticFilter = tr.state.facet(lintGutterConfig).markerFilter;
    for (let effect of tr.effects) {
      if (effect.is(setDiagnosticsEffect)) {
        let diagnostics = effect.value;
        if (diagnosticFilter)
          diagnostics = diagnosticFilter(diagnostics || [], tr.state);
        markers = markersForDiagnostics(tr.state.doc, diagnostics.slice(0));
      }
    }
    return markers;
  }
});
var setLintGutterTooltip = StateEffect.define();
var lintGutterTooltip = StateField.define({
  create() {
    return null;
  },
  update(tooltip, tr) {
    if (tooltip && tr.docChanged)
      tooltip = hideTooltip(tr, tooltip) ? null : Object.assign(Object.assign({}, tooltip), { pos: tr.changes.mapPos(tooltip.pos) });
    return tr.effects.reduce((t2, e2) => e2.is(setLintGutterTooltip) ? e2.value : t2, tooltip);
  },
  provide: (field) => showTooltip.from(field)
});
var lintGutterTheme = EditorView.baseTheme({
  ".cm-gutter-lint": {
    width: "1.4em",
    "& .cm-gutterElement": {
      padding: ".2em"
    }
  },
  ".cm-lint-marker": {
    width: "1em",
    height: "1em"
  },
  ".cm-lint-marker-info": {
    content: svg(`<path fill="#aaf" stroke="#77e" stroke-width="6" stroke-linejoin="round" d="M5 5L35 5L35 35L5 35Z"/>`)
  },
  ".cm-lint-marker-warning": {
    content: svg(`<path fill="#fe8" stroke="#fd7" stroke-width="6" stroke-linejoin="round" d="M20 6L37 35L3 35Z"/>`)
  },
  ".cm-lint-marker-error": {
    content: svg(`<circle cx="20" cy="20" r="15" fill="#f87" stroke="#f43" stroke-width="6"/>`)
  }
});
var lintExtensions = [
  lintState,
  EditorView.decorations.compute([lintState], (state) => {
    let { selected, panel } = state.field(lintState);
    return !selected || !panel || selected.from == selected.to ? Decoration.none : Decoration.set([
      activeMark.range(selected.from, selected.to)
    ]);
  }),
  hoverTooltip(lintTooltip, { hideOn: hideTooltip }),
  baseTheme2
];
var lintGutterConfig = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      hoverTime: 300,
      markerFilter: null,
      tooltipFilter: null
    });
  }
});

// node_modules/codemirror/dist/index.js
var basicSetup = (() => [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap
  ])
])();
var minimalSetup = (() => [
  highlightSpecialChars(),
  history(),
  drawSelection(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap
  ])
])();

// node_modules/@codemirror/language-data/dist/index.js
function legacy(parser) {
  return new LanguageSupport(StreamLanguage.define(parser));
}
function sql(dialectName) {
  return import("./dist-72RME3FY.js").then((m) => m.sql({ dialect: m[dialectName] }));
}
var languages = [
  // New-style language modes
  LanguageDescription.of({
    name: "C",
    extensions: ["c", "h", "ino"],
    load() {
      return import("./dist-FU2RCBQ3.js").then((m) => m.cpp());
    }
  }),
  LanguageDescription.of({
    name: "C++",
    alias: ["cpp"],
    extensions: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"],
    load() {
      return import("./dist-FU2RCBQ3.js").then((m) => m.cpp());
    }
  }),
  LanguageDescription.of({
    name: "CQL",
    alias: ["cassandra"],
    extensions: ["cql"],
    load() {
      return sql("Cassandra");
    }
  }),
  LanguageDescription.of({
    name: "CSS",
    extensions: ["css"],
    load() {
      return import("./dist-D5CZ464Y.js").then((m) => m.css());
    }
  }),
  LanguageDescription.of({
    name: "HTML",
    alias: ["xhtml"],
    extensions: ["html", "htm", "handlebars", "hbs"],
    load() {
      return import("./dist-5VSBLPM6.js").then((m) => m.html());
    }
  }),
  LanguageDescription.of({
    name: "Java",
    extensions: ["java"],
    load() {
      return import("./dist-RVJIABKU.js").then((m) => m.java());
    }
  }),
  LanguageDescription.of({
    name: "JavaScript",
    alias: ["ecmascript", "js", "node"],
    extensions: ["js", "mjs", "cjs"],
    load() {
      return import("./dist-2FZYB4NY.js").then((m) => m.javascript());
    }
  }),
  LanguageDescription.of({
    name: "JSON",
    alias: ["json5"],
    extensions: ["json", "map"],
    load() {
      return import("./dist-LIZWOAQG.js").then((m) => m.json());
    }
  }),
  LanguageDescription.of({
    name: "JSX",
    extensions: ["jsx"],
    load() {
      return import("./dist-2FZYB4NY.js").then((m) => m.javascript({ jsx: true }));
    }
  }),
  LanguageDescription.of({
    name: "LESS",
    extensions: ["less"],
    load() {
      return import("./dist-HNRTT47B.js").then((m) => m.less());
    }
  }),
  LanguageDescription.of({
    name: "Liquid",
    extensions: ["liquid"],
    load() {
      return import("./dist-4OOAEGGM.js").then((m) => m.liquid());
    }
  }),
  LanguageDescription.of({
    name: "MariaDB SQL",
    load() {
      return sql("MariaSQL");
    }
  }),
  LanguageDescription.of({
    name: "Markdown",
    extensions: ["md", "markdown", "mkd"],
    load() {
      return import("./dist-3RQIAVI5.js").then((m) => m.markdown());
    }
  }),
  LanguageDescription.of({
    name: "MS SQL",
    load() {
      return sql("MSSQL");
    }
  }),
  LanguageDescription.of({
    name: "MySQL",
    load() {
      return sql("MySQL");
    }
  }),
  LanguageDescription.of({
    name: "PHP",
    extensions: ["php", "php3", "php4", "php5", "php7", "phtml"],
    load() {
      return import("./dist-YIU3MZNZ.js").then((m) => m.php());
    }
  }),
  LanguageDescription.of({
    name: "PLSQL",
    extensions: ["pls"],
    load() {
      return sql("PLSQL");
    }
  }),
  LanguageDescription.of({
    name: "PostgreSQL",
    load() {
      return sql("PostgreSQL");
    }
  }),
  LanguageDescription.of({
    name: "Python",
    extensions: ["BUILD", "bzl", "py", "pyw"],
    filename: /^(BUCK|BUILD)$/,
    load() {
      return import("./dist-VXDUD2UN.js").then((m) => m.python());
    }
  }),
  LanguageDescription.of({
    name: "Rust",
    extensions: ["rs"],
    load() {
      return import("./dist-ELVAZB2G.js").then((m) => m.rust());
    }
  }),
  LanguageDescription.of({
    name: "Sass",
    extensions: ["sass"],
    load() {
      return import("./dist-QOSB3SYU.js").then((m) => m.sass({ indented: true }));
    }
  }),
  LanguageDescription.of({
    name: "SCSS",
    extensions: ["scss"],
    load() {
      return import("./dist-QOSB3SYU.js").then((m) => m.sass());
    }
  }),
  LanguageDescription.of({
    name: "SQL",
    extensions: ["sql"],
    load() {
      return sql("StandardSQL");
    }
  }),
  LanguageDescription.of({
    name: "SQLite",
    load() {
      return sql("SQLite");
    }
  }),
  LanguageDescription.of({
    name: "TSX",
    extensions: ["tsx"],
    load() {
      return import("./dist-2FZYB4NY.js").then((m) => m.javascript({ jsx: true, typescript: true }));
    }
  }),
  LanguageDescription.of({
    name: "TypeScript",
    alias: ["ts"],
    extensions: ["ts", "mts", "cts"],
    load() {
      return import("./dist-2FZYB4NY.js").then((m) => m.javascript({ typescript: true }));
    }
  }),
  LanguageDescription.of({
    name: "WebAssembly",
    extensions: ["wat", "wast"],
    load() {
      return import("./dist-LUV3XXYG.js").then((m) => m.wast());
    }
  }),
  LanguageDescription.of({
    name: "XML",
    alias: ["rss", "wsdl", "xsd"],
    extensions: ["xml", "xsl", "xsd", "svg"],
    load() {
      return import("./dist-XGVTJBOD.js").then((m) => m.xml());
    }
  }),
  LanguageDescription.of({
    name: "YAML",
    alias: ["yml"],
    extensions: ["yaml", "yml"],
    load() {
      return import("./dist-UXRJY7DJ.js").then((m) => m.yaml());
    }
  }),
  // Legacy modes ported from CodeMirror 5
  LanguageDescription.of({
    name: "APL",
    extensions: ["dyalog", "apl"],
    load() {
      return import("./apl-PZB7C2LU.js").then((m) => legacy(m.apl));
    }
  }),
  LanguageDescription.of({
    name: "PGP",
    alias: ["asciiarmor"],
    extensions: ["asc", "pgp", "sig"],
    load() {
      return import("./asciiarmor-H6S7ASPW.js").then((m) => legacy(m.asciiArmor));
    }
  }),
  LanguageDescription.of({
    name: "ASN.1",
    extensions: ["asn", "asn1"],
    load() {
      return import("./asn1-D73JL4JI.js").then((m) => legacy(m.asn1({})));
    }
  }),
  LanguageDescription.of({
    name: "Asterisk",
    filename: /^extensions\.conf$/i,
    load() {
      return import("./asterisk-WCJZJBSW.js").then((m) => legacy(m.asterisk));
    }
  }),
  LanguageDescription.of({
    name: "Brainfuck",
    extensions: ["b", "bf"],
    load() {
      return import("./brainfuck-X3ZPDY2T.js").then((m) => legacy(m.brainfuck));
    }
  }),
  LanguageDescription.of({
    name: "Cobol",
    extensions: ["cob", "cpy"],
    load() {
      return import("./cobol-235CTBZY.js").then((m) => legacy(m.cobol));
    }
  }),
  LanguageDescription.of({
    name: "C#",
    alias: ["csharp", "cs"],
    extensions: ["cs"],
    load() {
      return import("./clike-LYZ6CYZ2.js").then((m) => legacy(m.csharp));
    }
  }),
  LanguageDescription.of({
    name: "Clojure",
    extensions: ["clj", "cljc", "cljx"],
    load() {
      return import("./clojure-O2ONIR4E.js").then((m) => legacy(m.clojure));
    }
  }),
  LanguageDescription.of({
    name: "ClojureScript",
    extensions: ["cljs"],
    load() {
      return import("./clojure-O2ONIR4E.js").then((m) => legacy(m.clojure));
    }
  }),
  LanguageDescription.of({
    name: "Closure Stylesheets (GSS)",
    extensions: ["gss"],
    load() {
      return import("./css-BVN4NIL6.js").then((m) => legacy(m.gss));
    }
  }),
  LanguageDescription.of({
    name: "CMake",
    extensions: ["cmake", "cmake.in"],
    filename: /^CMakeLists\.txt$/,
    load() {
      return import("./cmake-PFVSIBHK.js").then((m) => legacy(m.cmake));
    }
  }),
  LanguageDescription.of({
    name: "CoffeeScript",
    alias: ["coffee", "coffee-script"],
    extensions: ["coffee"],
    load() {
      return import("./coffeescript-6FT4ARST.js").then((m) => legacy(m.coffeeScript));
    }
  }),
  LanguageDescription.of({
    name: "Common Lisp",
    alias: ["lisp"],
    extensions: ["cl", "lisp", "el"],
    load() {
      return import("./commonlisp-AKVJVXU3.js").then((m) => legacy(m.commonLisp));
    }
  }),
  LanguageDescription.of({
    name: "Cypher",
    extensions: ["cyp", "cypher"],
    load() {
      return import("./cypher-LNSKLYQR.js").then((m) => legacy(m.cypher));
    }
  }),
  LanguageDescription.of({
    name: "Cython",
    extensions: ["pyx", "pxd", "pxi"],
    load() {
      return import("./python-7ZY2LCNN.js").then((m) => legacy(m.cython));
    }
  }),
  LanguageDescription.of({
    name: "Crystal",
    extensions: ["cr"],
    load() {
      return import("./crystal-DXCXO7MU.js").then((m) => legacy(m.crystal));
    }
  }),
  LanguageDescription.of({
    name: "D",
    extensions: ["d"],
    load() {
      return import("./d-UIBKD2MW.js").then((m) => legacy(m.d));
    }
  }),
  LanguageDescription.of({
    name: "Dart",
    extensions: ["dart"],
    load() {
      return import("./clike-LYZ6CYZ2.js").then((m) => legacy(m.dart));
    }
  }),
  LanguageDescription.of({
    name: "diff",
    extensions: ["diff", "patch"],
    load() {
      return import("./diff-T2PXOSCB.js").then((m) => legacy(m.diff));
    }
  }),
  LanguageDescription.of({
    name: "Dockerfile",
    filename: /^Dockerfile$/,
    load() {
      return import("./dockerfile-WZMG2VYT.js").then((m) => legacy(m.dockerFile));
    }
  }),
  LanguageDescription.of({
    name: "DTD",
    extensions: ["dtd"],
    load() {
      return import("./dtd-7OUCNYVP.js").then((m) => legacy(m.dtd));
    }
  }),
  LanguageDescription.of({
    name: "Dylan",
    extensions: ["dylan", "dyl", "intr"],
    load() {
      return import("./dylan-4R4IGNTN.js").then((m) => legacy(m.dylan));
    }
  }),
  LanguageDescription.of({
    name: "EBNF",
    load() {
      return import("./ebnf-RHRUNTDA.js").then((m) => legacy(m.ebnf));
    }
  }),
  LanguageDescription.of({
    name: "ECL",
    extensions: ["ecl"],
    load() {
      return import("./ecl-7LDVESF4.js").then((m) => legacy(m.ecl));
    }
  }),
  LanguageDescription.of({
    name: "edn",
    extensions: ["edn"],
    load() {
      return import("./clojure-O2ONIR4E.js").then((m) => legacy(m.clojure));
    }
  }),
  LanguageDescription.of({
    name: "Eiffel",
    extensions: ["e"],
    load() {
      return import("./eiffel-TVNBYX55.js").then((m) => legacy(m.eiffel));
    }
  }),
  LanguageDescription.of({
    name: "Elm",
    extensions: ["elm"],
    load() {
      return import("./elm-ZPQF4CHH.js").then((m) => legacy(m.elm));
    }
  }),
  LanguageDescription.of({
    name: "Erlang",
    extensions: ["erl"],
    load() {
      return import("./erlang-H2WKKQ3V.js").then((m) => legacy(m.erlang));
    }
  }),
  LanguageDescription.of({
    name: "Esper",
    load() {
      return import("./sql-FT6IXQPK.js").then((m) => legacy(m.esper));
    }
  }),
  LanguageDescription.of({
    name: "Factor",
    extensions: ["factor"],
    load() {
      return import("./factor-OO2PRIAV.js").then((m) => legacy(m.factor));
    }
  }),
  LanguageDescription.of({
    name: "FCL",
    load() {
      return import("./fcl-CSQ5UUXP.js").then((m) => legacy(m.fcl));
    }
  }),
  LanguageDescription.of({
    name: "Forth",
    extensions: ["forth", "fth", "4th"],
    load() {
      return import("./forth-6FQA67KN.js").then((m) => legacy(m.forth));
    }
  }),
  LanguageDescription.of({
    name: "Fortran",
    extensions: ["f", "for", "f77", "f90", "f95"],
    load() {
      return import("./fortran-HXONSKT4.js").then((m) => legacy(m.fortran));
    }
  }),
  LanguageDescription.of({
    name: "F#",
    alias: ["fsharp"],
    extensions: ["fs"],
    load() {
      return import("./mllike-LDVSMY4D.js").then((m) => legacy(m.fSharp));
    }
  }),
  LanguageDescription.of({
    name: "Gas",
    extensions: ["s"],
    load() {
      return import("./gas-FQPJQNBU.js").then((m) => legacy(m.gas));
    }
  }),
  LanguageDescription.of({
    name: "Gherkin",
    extensions: ["feature"],
    load() {
      return import("./gherkin-EKRQBHSR.js").then((m) => legacy(m.gherkin));
    }
  }),
  LanguageDescription.of({
    name: "Go",
    extensions: ["go"],
    load() {
      return import("./go-HAEHWQCC.js").then((m) => legacy(m.go));
    }
  }),
  LanguageDescription.of({
    name: "Groovy",
    extensions: ["groovy", "gradle"],
    filename: /^Jenkinsfile$/,
    load() {
      return import("./groovy-TWFNM3KQ.js").then((m) => legacy(m.groovy));
    }
  }),
  LanguageDescription.of({
    name: "Haskell",
    extensions: ["hs"],
    load() {
      return import("./haskell-XOWTPB7K.js").then((m) => legacy(m.haskell));
    }
  }),
  LanguageDescription.of({
    name: "Haxe",
    extensions: ["hx"],
    load() {
      return import("./haxe-U3QR5UXZ.js").then((m) => legacy(m.haxe));
    }
  }),
  LanguageDescription.of({
    name: "HXML",
    extensions: ["hxml"],
    load() {
      return import("./haxe-U3QR5UXZ.js").then((m) => legacy(m.hxml));
    }
  }),
  LanguageDescription.of({
    name: "HTTP",
    load() {
      return import("./http-QI2EJDEA.js").then((m) => legacy(m.http));
    }
  }),
  LanguageDescription.of({
    name: "IDL",
    extensions: ["pro"],
    load() {
      return import("./idl-Q7MKJSHY.js").then((m) => legacy(m.idl));
    }
  }),
  LanguageDescription.of({
    name: "JSON-LD",
    alias: ["jsonld"],
    extensions: ["jsonld"],
    load() {
      return import("./javascript-IZOVMQXW.js").then((m) => legacy(m.jsonld));
    }
  }),
  LanguageDescription.of({
    name: "Jinja2",
    extensions: ["j2", "jinja", "jinja2"],
    load() {
      return import("./jinja2-FM4NZXDI.js").then((m) => legacy(m.jinja2));
    }
  }),
  LanguageDescription.of({
    name: "Julia",
    extensions: ["jl"],
    load() {
      return import("./julia-727JC2CP.js").then((m) => legacy(m.julia));
    }
  }),
  LanguageDescription.of({
    name: "Kotlin",
    extensions: ["kt", "kts"],
    load() {
      return import("./clike-LYZ6CYZ2.js").then((m) => legacy(m.kotlin));
    }
  }),
  LanguageDescription.of({
    name: "LiveScript",
    alias: ["ls"],
    extensions: ["ls"],
    load() {
      return import("./livescript-BYYT3VVS.js").then((m) => legacy(m.liveScript));
    }
  }),
  LanguageDescription.of({
    name: "Lua",
    extensions: ["lua"],
    load() {
      return import("./lua-DAXKBXEU.js").then((m) => legacy(m.lua));
    }
  }),
  LanguageDescription.of({
    name: "mIRC",
    extensions: ["mrc"],
    load() {
      return import("./mirc-SKY4TRQZ.js").then((m) => legacy(m.mirc));
    }
  }),
  LanguageDescription.of({
    name: "Mathematica",
    extensions: ["m", "nb", "wl", "wls"],
    load() {
      return import("./mathematica-ACTBTEYY.js").then((m) => legacy(m.mathematica));
    }
  }),
  LanguageDescription.of({
    name: "Modelica",
    extensions: ["mo"],
    load() {
      return import("./modelica-YBLWZSUW.js").then((m) => legacy(m.modelica));
    }
  }),
  LanguageDescription.of({
    name: "MUMPS",
    extensions: ["mps"],
    load() {
      return import("./mumps-LODK7BAM.js").then((m) => legacy(m.mumps));
    }
  }),
  LanguageDescription.of({
    name: "Mbox",
    extensions: ["mbox"],
    load() {
      return import("./mbox-F7KVSLYT.js").then((m) => legacy(m.mbox));
    }
  }),
  LanguageDescription.of({
    name: "Nginx",
    filename: /nginx.*\.conf$/i,
    load() {
      return import("./nginx-WXKILE5H.js").then((m) => legacy(m.nginx));
    }
  }),
  LanguageDescription.of({
    name: "NSIS",
    extensions: ["nsh", "nsi"],
    load() {
      return import("./nsis-KILPY64U.js").then((m) => legacy(m.nsis));
    }
  }),
  LanguageDescription.of({
    name: "NTriples",
    extensions: ["nt", "nq"],
    load() {
      return import("./ntriples-KQLEJ6KS.js").then((m) => legacy(m.ntriples));
    }
  }),
  LanguageDescription.of({
    name: "Objective-C",
    alias: ["objective-c", "objc"],
    extensions: ["m"],
    load() {
      return import("./clike-LYZ6CYZ2.js").then((m) => legacy(m.objectiveC));
    }
  }),
  LanguageDescription.of({
    name: "Objective-C++",
    alias: ["objective-c++", "objc++"],
    extensions: ["mm"],
    load() {
      return import("./clike-LYZ6CYZ2.js").then((m) => legacy(m.objectiveCpp));
    }
  }),
  LanguageDescription.of({
    name: "OCaml",
    extensions: ["ml", "mli", "mll", "mly"],
    load() {
      return import("./mllike-LDVSMY4D.js").then((m) => legacy(m.oCaml));
    }
  }),
  LanguageDescription.of({
    name: "Octave",
    extensions: ["m"],
    load() {
      return import("./octave-DMJIYCLK.js").then((m) => legacy(m.octave));
    }
  }),
  LanguageDescription.of({
    name: "Oz",
    extensions: ["oz"],
    load() {
      return import("./oz-O7GGYVNL.js").then((m) => legacy(m.oz));
    }
  }),
  LanguageDescription.of({
    name: "Pascal",
    extensions: ["p", "pas"],
    load() {
      return import("./pascal-GC24TGKQ.js").then((m) => legacy(m.pascal));
    }
  }),
  LanguageDescription.of({
    name: "Perl",
    extensions: ["pl", "pm"],
    load() {
      return import("./perl-CJDS76AH.js").then((m) => legacy(m.perl));
    }
  }),
  LanguageDescription.of({
    name: "Pig",
    extensions: ["pig"],
    load() {
      return import("./pig-KBR3R743.js").then((m) => legacy(m.pig));
    }
  }),
  LanguageDescription.of({
    name: "PowerShell",
    extensions: ["ps1", "psd1", "psm1"],
    load() {
      return import("./powershell-ETXIN3IX.js").then((m) => legacy(m.powerShell));
    }
  }),
  LanguageDescription.of({
    name: "Properties files",
    alias: ["ini", "properties"],
    extensions: ["properties", "ini", "in"],
    load() {
      return import("./properties-QVI7TSWR.js").then((m) => legacy(m.properties));
    }
  }),
  LanguageDescription.of({
    name: "ProtoBuf",
    extensions: ["proto"],
    load() {
      return import("./protobuf-7LA2KSPN.js").then((m) => legacy(m.protobuf));
    }
  }),
  LanguageDescription.of({
    name: "Puppet",
    extensions: ["pp"],
    load() {
      return import("./puppet-7YLK6N7Z.js").then((m) => legacy(m.puppet));
    }
  }),
  LanguageDescription.of({
    name: "Q",
    extensions: ["q"],
    load() {
      return import("./q-QXUNDKZM.js").then((m) => legacy(m.q));
    }
  }),
  LanguageDescription.of({
    name: "R",
    alias: ["rscript"],
    extensions: ["r", "R"],
    load() {
      return import("./r-CYJXW72V.js").then((m) => legacy(m.r));
    }
  }),
  LanguageDescription.of({
    name: "RPM Changes",
    load() {
      return import("./rpm-SDRUG3VW.js").then((m) => legacy(m.rpmChanges));
    }
  }),
  LanguageDescription.of({
    name: "RPM Spec",
    extensions: ["spec"],
    load() {
      return import("./rpm-SDRUG3VW.js").then((m) => legacy(m.rpmSpec));
    }
  }),
  LanguageDescription.of({
    name: "Ruby",
    alias: ["jruby", "macruby", "rake", "rb", "rbx"],
    extensions: ["rb"],
    filename: /^(Gemfile|Rakefile)$/,
    load() {
      return import("./ruby-SJ26PSHY.js").then((m) => legacy(m.ruby));
    }
  }),
  LanguageDescription.of({
    name: "SAS",
    extensions: ["sas"],
    load() {
      return import("./sas-TYPNNT4M.js").then((m) => legacy(m.sas));
    }
  }),
  LanguageDescription.of({
    name: "Scala",
    extensions: ["scala"],
    load() {
      return import("./clike-LYZ6CYZ2.js").then((m) => legacy(m.scala));
    }
  }),
  LanguageDescription.of({
    name: "Scheme",
    extensions: ["scm", "ss"],
    load() {
      return import("./scheme-RBFKZJ5V.js").then((m) => legacy(m.scheme));
    }
  }),
  LanguageDescription.of({
    name: "Shell",
    alias: ["bash", "sh", "zsh"],
    extensions: ["sh", "ksh", "bash"],
    filename: /^PKGBUILD$/,
    load() {
      return import("./shell-NHIRRPCY.js").then((m) => legacy(m.shell));
    }
  }),
  LanguageDescription.of({
    name: "Sieve",
    extensions: ["siv", "sieve"],
    load() {
      return import("./sieve-FBUSMJ4P.js").then((m) => legacy(m.sieve));
    }
  }),
  LanguageDescription.of({
    name: "Smalltalk",
    extensions: ["st"],
    load() {
      return import("./smalltalk-MY7MFINM.js").then((m) => legacy(m.smalltalk));
    }
  }),
  LanguageDescription.of({
    name: "Solr",
    load() {
      return import("./solr-RYZB56JK.js").then((m) => legacy(m.solr));
    }
  }),
  LanguageDescription.of({
    name: "SML",
    extensions: ["sml", "sig", "fun", "smackspec"],
    load() {
      return import("./mllike-LDVSMY4D.js").then((m) => legacy(m.sml));
    }
  }),
  LanguageDescription.of({
    name: "SPARQL",
    alias: ["sparul"],
    extensions: ["rq", "sparql"],
    load() {
      return import("./sparql-LC6TUCXN.js").then((m) => legacy(m.sparql));
    }
  }),
  LanguageDescription.of({
    name: "Spreadsheet",
    alias: ["excel", "formula"],
    load() {
      return import("./spreadsheet-ZJJ6F5ZE.js").then((m) => legacy(m.spreadsheet));
    }
  }),
  LanguageDescription.of({
    name: "Squirrel",
    extensions: ["nut"],
    load() {
      return import("./clike-LYZ6CYZ2.js").then((m) => legacy(m.squirrel));
    }
  }),
  LanguageDescription.of({
    name: "Stylus",
    extensions: ["styl"],
    load() {
      return import("./stylus-NDFEOWDX.js").then((m) => legacy(m.stylus));
    }
  }),
  LanguageDescription.of({
    name: "Swift",
    extensions: ["swift"],
    load() {
      return import("./swift-KUFUQRXS.js").then((m) => legacy(m.swift));
    }
  }),
  LanguageDescription.of({
    name: "sTeX",
    load() {
      return import("./stex-DEGUFAJN.js").then((m) => legacy(m.stex));
    }
  }),
  LanguageDescription.of({
    name: "LaTeX",
    alias: ["tex"],
    extensions: ["text", "ltx", "tex"],
    load() {
      return import("./stex-DEGUFAJN.js").then((m) => legacy(m.stex));
    }
  }),
  LanguageDescription.of({
    name: "SystemVerilog",
    extensions: ["v", "sv", "svh"],
    load() {
      return import("./verilog-TPMKCM4I.js").then((m) => legacy(m.verilog));
    }
  }),
  LanguageDescription.of({
    name: "Tcl",
    extensions: ["tcl"],
    load() {
      return import("./tcl-VU4WLEJX.js").then((m) => legacy(m.tcl));
    }
  }),
  LanguageDescription.of({
    name: "Textile",
    extensions: ["textile"],
    load() {
      return import("./textile-O4M7ATRQ.js").then((m) => legacy(m.textile));
    }
  }),
  LanguageDescription.of({
    name: "TiddlyWiki",
    load() {
      return import("./tiddlywiki-AM75R5TX.js").then((m) => legacy(m.tiddlyWiki));
    }
  }),
  LanguageDescription.of({
    name: "Tiki wiki",
    load() {
      return import("./tiki-SSYGX7VI.js").then((m) => legacy(m.tiki));
    }
  }),
  LanguageDescription.of({
    name: "TOML",
    extensions: ["toml"],
    load() {
      return import("./toml-XS2OT74N.js").then((m) => legacy(m.toml));
    }
  }),
  LanguageDescription.of({
    name: "Troff",
    extensions: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    load() {
      return import("./troff-XNMVCQTY.js").then((m) => legacy(m.troff));
    }
  }),
  LanguageDescription.of({
    name: "TTCN",
    extensions: ["ttcn", "ttcn3", "ttcnpp"],
    load() {
      return import("./ttcn-UUWUY7DT.js").then((m) => legacy(m.ttcn));
    }
  }),
  LanguageDescription.of({
    name: "TTCN_CFG",
    extensions: ["cfg"],
    load() {
      return import("./ttcn-cfg-WFMKWQT2.js").then((m) => legacy(m.ttcnCfg));
    }
  }),
  LanguageDescription.of({
    name: "Turtle",
    extensions: ["ttl"],
    load() {
      return import("./turtle-UDOFP2XM.js").then((m) => legacy(m.turtle));
    }
  }),
  LanguageDescription.of({
    name: "Web IDL",
    extensions: ["webidl"],
    load() {
      return import("./webidl-MCQ5B2FX.js").then((m) => legacy(m.webIDL));
    }
  }),
  LanguageDescription.of({
    name: "VB.NET",
    extensions: ["vb"],
    load() {
      return import("./vb-MMI6MFAY.js").then((m) => legacy(m.vb));
    }
  }),
  LanguageDescription.of({
    name: "VBScript",
    extensions: ["vbs"],
    load() {
      return import("./vbscript-MYL3PPM2.js").then((m) => legacy(m.vbScript));
    }
  }),
  LanguageDescription.of({
    name: "Velocity",
    extensions: ["vtl"],
    load() {
      return import("./velocity-7GVGYTLQ.js").then((m) => legacy(m.velocity));
    }
  }),
  LanguageDescription.of({
    name: "Verilog",
    extensions: ["v"],
    load() {
      return import("./verilog-TPMKCM4I.js").then((m) => legacy(m.verilog));
    }
  }),
  LanguageDescription.of({
    name: "VHDL",
    extensions: ["vhd", "vhdl"],
    load() {
      return import("./vhdl-IKFVALNG.js").then((m) => legacy(m.vhdl));
    }
  }),
  LanguageDescription.of({
    name: "XQuery",
    extensions: ["xy", "xquery"],
    load() {
      return import("./xquery-GA47SJDV.js").then((m) => legacy(m.xQuery));
    }
  }),
  LanguageDescription.of({
    name: "Yacas",
    extensions: ["ys"],
    load() {
      return import("./yacas-DUCC3CAB.js").then((m) => legacy(m.yacas));
    }
  }),
  LanguageDescription.of({
    name: "Z80",
    extensions: ["z80"],
    load() {
      return import("./z80-AKOF5BJ4.js").then((m) => legacy(m.z80));
    }
  }),
  LanguageDescription.of({
    name: "MscGen",
    extensions: ["mscgen", "mscin", "msc"],
    load() {
      return import("./mscgen-U3LUFRYG.js").then((m) => legacy(m.mscgen));
    }
  }),
  LanguageDescription.of({
    name: "Xù",
    extensions: ["xu"],
    load() {
      return import("./mscgen-U3LUFRYG.js").then((m) => legacy(m.xu));
    }
  }),
  LanguageDescription.of({
    name: "MsGenny",
    extensions: ["msgenny"],
    load() {
      return import("./mscgen-U3LUFRYG.js").then((m) => legacy(m.msgenny));
    }
  }),
  LanguageDescription.of({
    name: "Vue",
    extensions: ["vue"],
    load() {
      return import("./dist-WSOHS3A6.js").then((m) => m.vue());
    }
  }),
  LanguageDescription.of({
    name: "Angular Template",
    load() {
      return import("./dist-SZZMZ3UQ.js").then((m) => m.angular());
    }
  })
];

// node_modules/medium-zoom/dist/medium-zoom.esm.js
var _extends = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var isSupported = function isSupported2(node) {
  return node.tagName === "IMG";
};
var isNodeList = function isNodeList2(selector) {
  return NodeList.prototype.isPrototypeOf(selector);
};
var isNode = function isNode2(selector) {
  return selector && selector.nodeType === 1;
};
var isSvg = function isSvg2(image2) {
  var source = image2.currentSrc || image2.src;
  return source.substr(-4).toLowerCase() === ".svg";
};
var getImagesFromSelector = function getImagesFromSelector2(selector) {
  try {
    if (Array.isArray(selector)) {
      return selector.filter(isSupported);
    }
    if (isNodeList(selector)) {
      return [].slice.call(selector).filter(isSupported);
    }
    if (isNode(selector)) {
      return [selector].filter(isSupported);
    }
    if (typeof selector === "string") {
      return [].slice.call(document.querySelectorAll(selector)).filter(isSupported);
    }
    return [];
  } catch (err) {
    throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
  }
};
var createOverlay = function createOverlay2(background2) {
  var overlay = document.createElement("div");
  overlay.classList.add("medium-zoom-overlay");
  overlay.style.background = background2;
  return overlay;
};
var cloneTarget = function cloneTarget2(template) {
  var _template$getBounding = template.getBoundingClientRect(), top = _template$getBounding.top, left = _template$getBounding.left, width = _template$getBounding.width, height = _template$getBounding.height;
  var clone = template.cloneNode();
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
  clone.removeAttribute("id");
  clone.style.position = "absolute";
  clone.style.top = top + scrollTop + "px";
  clone.style.left = left + scrollLeft + "px";
  clone.style.width = width + "px";
  clone.style.height = height + "px";
  clone.style.transform = "";
  return clone;
};
var createCustomEvent = function createCustomEvent2(type, params) {
  var eventParams = _extends({
    bubbles: false,
    cancelable: false,
    detail: void 0
  }, params);
  if (typeof window.CustomEvent === "function") {
    return new CustomEvent(type, eventParams);
  }
  var customEvent = document.createEvent("CustomEvent");
  customEvent.initCustomEvent(type, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
  return customEvent;
};
var mediumZoom = function mediumZoom2(selector) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var Promise2 = window.Promise || function Promise3(fn) {
    function noop() {
    }
    fn(noop, noop);
  };
  var _handleClick = function _handleClick2(event) {
    var target = event.target;
    if (target === overlay) {
      close();
      return;
    }
    if (images.indexOf(target) === -1) {
      return;
    }
    toggle({ target });
  };
  var _handleScroll = function _handleScroll2() {
    if (isAnimating || !active.original) {
      return;
    }
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (Math.abs(scrollTop - currentScroll) > zoomOptions.scrollOffset) {
      setTimeout(close, 150);
    }
  };
  var _handleKeyUp = function _handleKeyUp2(event) {
    var key = event.key || event.keyCode;
    if (key === "Escape" || key === "Esc" || key === 27) {
      close();
    }
  };
  var update = function update2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var newOptions = options2;
    if (options2.background) {
      overlay.style.background = options2.background;
    }
    if (options2.container && options2.container instanceof Object) {
      newOptions.container = _extends({}, zoomOptions.container, options2.container);
    }
    if (options2.template) {
      var template = isNode(options2.template) ? options2.template : document.querySelector(options2.template);
      newOptions.template = template;
    }
    zoomOptions = _extends({}, zoomOptions, newOptions);
    images.forEach(function(image2) {
      image2.dispatchEvent(createCustomEvent("medium-zoom:update", {
        detail: { zoom }
      }));
    });
    return zoom;
  };
  var clone = function clone2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return mediumZoom2(_extends({}, zoomOptions, options2));
  };
  var attach = function attach2() {
    for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) {
      selectors[_key] = arguments[_key];
    }
    var newImages = selectors.reduce(function(imagesAccumulator, currentSelector) {
      return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
    }, []);
    newImages.filter(function(newImage) {
      return images.indexOf(newImage) === -1;
    }).forEach(function(newImage) {
      images.push(newImage);
      newImage.classList.add("medium-zoom-image");
    });
    eventListeners.forEach(function(_ref) {
      var type = _ref.type, listener = _ref.listener, options2 = _ref.options;
      newImages.forEach(function(image2) {
        image2.addEventListener(type, listener, options2);
      });
    });
    return zoom;
  };
  var detach = function detach2() {
    for (var _len2 = arguments.length, selectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      selectors[_key2] = arguments[_key2];
    }
    if (active.zoomed) {
      close();
    }
    var imagesToDetach = selectors.length > 0 ? selectors.reduce(function(imagesAccumulator, currentSelector) {
      return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
    }, []) : images;
    imagesToDetach.forEach(function(image2) {
      image2.classList.remove("medium-zoom-image");
      image2.dispatchEvent(createCustomEvent("medium-zoom:detach", {
        detail: { zoom }
      }));
    });
    images = images.filter(function(image2) {
      return imagesToDetach.indexOf(image2) === -1;
    });
    return zoom;
  };
  var on = function on2(type, listener) {
    var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    images.forEach(function(image2) {
      image2.addEventListener("medium-zoom:" + type, listener, options2);
    });
    eventListeners.push({ type: "medium-zoom:" + type, listener, options: options2 });
    return zoom;
  };
  var off = function off2(type, listener) {
    var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    images.forEach(function(image2) {
      image2.removeEventListener("medium-zoom:" + type, listener, options2);
    });
    eventListeners = eventListeners.filter(function(eventListener) {
      return !(eventListener.type === "medium-zoom:" + type && eventListener.listener.toString() === listener.toString());
    });
    return zoom;
  };
  var open = function open2() {
    var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref2.target;
    var _animate = function _animate2() {
      var container = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      var viewportWidth = void 0;
      var viewportHeight = void 0;
      if (zoomOptions.container) {
        if (zoomOptions.container instanceof Object) {
          container = _extends({}, container, zoomOptions.container);
          viewportWidth = container.width - container.left - container.right - zoomOptions.margin * 2;
          viewportHeight = container.height - container.top - container.bottom - zoomOptions.margin * 2;
        } else {
          var zoomContainer = isNode(zoomOptions.container) ? zoomOptions.container : document.querySelector(zoomOptions.container);
          var _zoomContainer$getBou = zoomContainer.getBoundingClientRect(), _width = _zoomContainer$getBou.width, _height = _zoomContainer$getBou.height, _left = _zoomContainer$getBou.left, _top = _zoomContainer$getBou.top;
          container = _extends({}, container, {
            width: _width,
            height: _height,
            left: _left,
            top: _top
          });
        }
      }
      viewportWidth = viewportWidth || container.width - zoomOptions.margin * 2;
      viewportHeight = viewportHeight || container.height - zoomOptions.margin * 2;
      var zoomTarget = active.zoomedHd || active.original;
      var naturalWidth = isSvg(zoomTarget) ? viewportWidth : zoomTarget.naturalWidth || viewportWidth;
      var naturalHeight = isSvg(zoomTarget) ? viewportHeight : zoomTarget.naturalHeight || viewportHeight;
      var _zoomTarget$getBoundi = zoomTarget.getBoundingClientRect(), top = _zoomTarget$getBoundi.top, left = _zoomTarget$getBoundi.left, width = _zoomTarget$getBoundi.width, height = _zoomTarget$getBoundi.height;
      var scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width;
      var scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height;
      var scale = Math.min(scaleX, scaleY);
      var translateX = (-left + (viewportWidth - width) / 2 + zoomOptions.margin + container.left) / scale;
      var translateY = (-top + (viewportHeight - height) / 2 + zoomOptions.margin + container.top) / scale;
      var transform = "scale(" + scale + ") translate3d(" + translateX + "px, " + translateY + "px, 0)";
      active.zoomed.style.transform = transform;
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = transform;
      }
    };
    return new Promise2(function(resolve) {
      if (target && images.indexOf(target) === -1) {
        resolve(zoom);
        return;
      }
      var _handleOpenEnd = function _handleOpenEnd2() {
        isAnimating = false;
        active.zoomed.removeEventListener("transitionend", _handleOpenEnd2);
        active.original.dispatchEvent(createCustomEvent("medium-zoom:opened", {
          detail: { zoom }
        }));
        resolve(zoom);
      };
      if (active.zoomed) {
        resolve(zoom);
        return;
      }
      if (target) {
        active.original = target;
      } else if (images.length > 0) {
        var _images = images;
        active.original = _images[0];
      } else {
        resolve(zoom);
        return;
      }
      active.original.dispatchEvent(createCustomEvent("medium-zoom:open", {
        detail: { zoom }
      }));
      scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      isAnimating = true;
      active.zoomed = cloneTarget(active.original);
      document.body.appendChild(overlay);
      if (zoomOptions.template) {
        var template = isNode(zoomOptions.template) ? zoomOptions.template : document.querySelector(zoomOptions.template);
        active.template = document.createElement("div");
        active.template.appendChild(template.content.cloneNode(true));
        document.body.appendChild(active.template);
      }
      if (active.original.parentElement && active.original.parentElement.tagName === "PICTURE" && active.original.currentSrc) {
        active.zoomed.src = active.original.currentSrc;
      }
      document.body.appendChild(active.zoomed);
      window.requestAnimationFrame(function() {
        document.body.classList.add("medium-zoom--opened");
      });
      active.original.classList.add("medium-zoom-image--hidden");
      active.zoomed.classList.add("medium-zoom-image--opened");
      active.zoomed.addEventListener("click", close);
      active.zoomed.addEventListener("transitionend", _handleOpenEnd);
      if (active.original.getAttribute("data-zoom-src")) {
        active.zoomedHd = active.zoomed.cloneNode();
        active.zoomedHd.removeAttribute("srcset");
        active.zoomedHd.removeAttribute("sizes");
        active.zoomedHd.removeAttribute("loading");
        active.zoomedHd.src = active.zoomed.getAttribute("data-zoom-src");
        active.zoomedHd.onerror = function() {
          clearInterval(getZoomTargetSize);
          console.warn("Unable to reach the zoom image target " + active.zoomedHd.src);
          active.zoomedHd = null;
          _animate();
        };
        var getZoomTargetSize = setInterval(function() {
          if (active.zoomedHd.complete) {
            clearInterval(getZoomTargetSize);
            active.zoomedHd.classList.add("medium-zoom-image--opened");
            active.zoomedHd.addEventListener("click", close);
            document.body.appendChild(active.zoomedHd);
            _animate();
          }
        }, 10);
      } else if (active.original.hasAttribute("srcset")) {
        active.zoomedHd = active.zoomed.cloneNode();
        active.zoomedHd.removeAttribute("sizes");
        active.zoomedHd.removeAttribute("loading");
        var loadEventListener = active.zoomedHd.addEventListener("load", function() {
          active.zoomedHd.removeEventListener("load", loadEventListener);
          active.zoomedHd.classList.add("medium-zoom-image--opened");
          active.zoomedHd.addEventListener("click", close);
          document.body.appendChild(active.zoomedHd);
          _animate();
        });
      } else {
        _animate();
      }
    });
  };
  var close = function close2() {
    return new Promise2(function(resolve) {
      if (isAnimating || !active.original) {
        resolve(zoom);
        return;
      }
      var _handleCloseEnd = function _handleCloseEnd2() {
        active.original.classList.remove("medium-zoom-image--hidden");
        document.body.removeChild(active.zoomed);
        if (active.zoomedHd) {
          document.body.removeChild(active.zoomedHd);
        }
        document.body.removeChild(overlay);
        active.zoomed.classList.remove("medium-zoom-image--opened");
        if (active.template) {
          document.body.removeChild(active.template);
        }
        isAnimating = false;
        active.zoomed.removeEventListener("transitionend", _handleCloseEnd2);
        active.original.dispatchEvent(createCustomEvent("medium-zoom:closed", {
          detail: { zoom }
        }));
        active.original = null;
        active.zoomed = null;
        active.zoomedHd = null;
        active.template = null;
        resolve(zoom);
      };
      isAnimating = true;
      document.body.classList.remove("medium-zoom--opened");
      active.zoomed.style.transform = "";
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = "";
      }
      if (active.template) {
        active.template.style.transition = "opacity 150ms";
        active.template.style.opacity = 0;
      }
      active.original.dispatchEvent(createCustomEvent("medium-zoom:close", {
        detail: { zoom }
      }));
      active.zoomed.addEventListener("transitionend", _handleCloseEnd);
    });
  };
  var toggle = function toggle2() {
    var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref3.target;
    if (active.original) {
      return close();
    }
    return open({ target });
  };
  var getOptions = function getOptions2() {
    return zoomOptions;
  };
  var getImages = function getImages2() {
    return images;
  };
  var getZoomedImage = function getZoomedImage2() {
    return active.original;
  };
  var images = [];
  var eventListeners = [];
  var isAnimating = false;
  var scrollTop = 0;
  var zoomOptions = options;
  var active = {
    original: null,
    zoomed: null,
    zoomedHd: null,
    template: null
    // If the selector is omitted, it's replaced by the options
  };
  if (Object.prototype.toString.call(selector) === "[object Object]") {
    zoomOptions = selector;
  } else if (selector || typeof selector === "string") {
    attach(selector);
  }
  zoomOptions = _extends({
    margin: 0,
    background: "#fff",
    scrollOffset: 40,
    container: null,
    template: null
  }, zoomOptions);
  var overlay = createOverlay(zoomOptions.background);
  document.addEventListener("click", _handleClick);
  document.addEventListener("keyup", _handleKeyUp);
  document.addEventListener("scroll", _handleScroll);
  window.addEventListener("resize", close);
  var zoom = {
    open,
    close,
    toggle,
    update,
    clone,
    attach,
    detach,
    on,
    off,
    getOptions,
    getImages,
    getZoomedImage
  };
  return zoom;
};
function styleInject(css2, ref2) {
  if (ref2 === void 0)
    ref2 = {};
  var insertAt = ref2.insertAt;
  if (!css2 || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css2;
  } else {
    style.appendChild(document.createTextNode(css2));
  }
}
var css = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";
styleInject(css);
var medium_zoom_esm_default = mediumZoom;

// node_modules/md-editor-v3/lib/es/chunks/index.mjs
var import_copy_to_clipboard = __toESM(require_copy_to_clipboard(), 1);

// node_modules/markdown-it/lib/common/utils.mjs
var utils_exports = {};
__export(utils_exports, {
  arrayReplaceAt: () => arrayReplaceAt,
  assign: () => assign,
  escapeHtml: () => escapeHtml,
  escapeRE: () => escapeRE,
  fromCodePoint: () => fromCodePoint3,
  has: () => has,
  isMdAsciiPunct: () => isMdAsciiPunct,
  isPunctChar: () => isPunctChar,
  isSpace: () => isSpace,
  isString: () => isString,
  isValidEntityCode: () => isValidEntityCode,
  isWhiteSpace: () => isWhiteSpace,
  lib: () => lib,
  normalizeReference: () => normalizeReference,
  unescapeAll: () => unescapeAll,
  unescapeMd: () => unescapeMd
});

// node_modules/mdurl/index.mjs
var mdurl_exports = {};
__export(mdurl_exports, {
  decode: () => decode_default,
  encode: () => encode_default,
  format: () => format,
  parse: () => parse_default
});

// node_modules/mdurl/lib/decode.mjs
var decodeCache = {};
function getDecodeCache(exclude) {
  let cache = decodeCache[exclude];
  if (cache) {
    return cache;
  }
  cache = decodeCache[exclude] = [];
  for (let i2 = 0; i2 < 128; i2++) {
    const ch = String.fromCharCode(i2);
    cache.push(ch);
  }
  for (let i2 = 0; i2 < exclude.length; i2++) {
    const ch = exclude.charCodeAt(i2);
    cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
  }
  return cache;
}
function decode(string, exclude) {
  if (typeof exclude !== "string") {
    exclude = decode.defaultChars;
  }
  const cache = getDecodeCache(exclude);
  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
    let result = "";
    for (let i2 = 0, l = seq.length; i2 < l; i2 += 3) {
      const b1 = parseInt(seq.slice(i2 + 1, i2 + 3), 16);
      if (b1 < 128) {
        result += cache[b1];
        continue;
      }
      if ((b1 & 224) === 192 && i2 + 3 < l) {
        const b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
        if ((b2 & 192) === 128) {
          const chr = b1 << 6 & 1984 | b2 & 63;
          if (chr < 128) {
            result += "��";
          } else {
            result += String.fromCharCode(chr);
          }
          i2 += 3;
          continue;
        }
      }
      if ((b1 & 240) === 224 && i2 + 6 < l) {
        const b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
        const b3 = parseInt(seq.slice(i2 + 7, i2 + 9), 16);
        if ((b2 & 192) === 128 && (b3 & 192) === 128) {
          const chr = b1 << 12 & 61440 | b2 << 6 & 4032 | b3 & 63;
          if (chr < 2048 || chr >= 55296 && chr <= 57343) {
            result += "���";
          } else {
            result += String.fromCharCode(chr);
          }
          i2 += 6;
          continue;
        }
      }
      if ((b1 & 248) === 240 && i2 + 9 < l) {
        const b2 = parseInt(seq.slice(i2 + 4, i2 + 6), 16);
        const b3 = parseInt(seq.slice(i2 + 7, i2 + 9), 16);
        const b4 = parseInt(seq.slice(i2 + 10, i2 + 12), 16);
        if ((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
          let chr = b1 << 18 & 1835008 | b2 << 12 & 258048 | b3 << 6 & 4032 | b4 & 63;
          if (chr < 65536 || chr > 1114111) {
            result += "����";
          } else {
            chr -= 65536;
            result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
          }
          i2 += 9;
          continue;
        }
      }
      result += "�";
    }
    return result;
  });
}
decode.defaultChars = ";/?:@&=+$,#";
decode.componentChars = "";
var decode_default = decode;

// node_modules/mdurl/lib/encode.mjs
var encodeCache = {};
function getEncodeCache(exclude) {
  let cache = encodeCache[exclude];
  if (cache) {
    return cache;
  }
  cache = encodeCache[exclude] = [];
  for (let i2 = 0; i2 < 128; i2++) {
    const ch = String.fromCharCode(i2);
    if (/^[0-9a-z]$/i.test(ch)) {
      cache.push(ch);
    } else {
      cache.push("%" + ("0" + i2.toString(16).toUpperCase()).slice(-2));
    }
  }
  for (let i2 = 0; i2 < exclude.length; i2++) {
    cache[exclude.charCodeAt(i2)] = exclude[i2];
  }
  return cache;
}
function encode(string, exclude, keepEscaped) {
  if (typeof exclude !== "string") {
    keepEscaped = exclude;
    exclude = encode.defaultChars;
  }
  if (typeof keepEscaped === "undefined") {
    keepEscaped = true;
  }
  const cache = getEncodeCache(exclude);
  let result = "";
  for (let i2 = 0, l = string.length; i2 < l; i2++) {
    const code2 = string.charCodeAt(i2);
    if (keepEscaped && code2 === 37 && i2 + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i2 + 1, i2 + 3))) {
        result += string.slice(i2, i2 + 3);
        i2 += 2;
        continue;
      }
    }
    if (code2 < 128) {
      result += cache[code2];
      continue;
    }
    if (code2 >= 55296 && code2 <= 57343) {
      if (code2 >= 55296 && code2 <= 56319 && i2 + 1 < l) {
        const nextCode = string.charCodeAt(i2 + 1);
        if (nextCode >= 56320 && nextCode <= 57343) {
          result += encodeURIComponent(string[i2] + string[i2 + 1]);
          i2++;
          continue;
        }
      }
      result += "%EF%BF%BD";
      continue;
    }
    result += encodeURIComponent(string[i2]);
  }
  return result;
}
encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";
var encode_default = encode;

// node_modules/mdurl/lib/format.mjs
function format(url) {
  let result = "";
  result += url.protocol || "";
  result += url.slashes ? "//" : "";
  result += url.auth ? url.auth + "@" : "";
  if (url.hostname && url.hostname.indexOf(":") !== -1) {
    result += "[" + url.hostname + "]";
  } else {
    result += url.hostname || "";
  }
  result += url.port ? ":" + url.port : "";
  result += url.pathname || "";
  result += url.search || "";
  result += url.hash || "";
  return result;
}

// node_modules/mdurl/lib/parse.mjs
function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}
var protocolPattern = /^([a-z0-9.+-]+:)/i;
var portPattern = /:[0-9]*$/;
var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
var autoEscape = ["'"].concat(unwise);
var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
var hostEndingChars = ["/", "?", "#"];
var hostnameMaxLen = 255;
var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
var hostlessProtocol = {
  javascript: true,
  "javascript:": true
};
var slashedProtocol = {
  http: true,
  https: true,
  ftp: true,
  gopher: true,
  file: true,
  "http:": true,
  "https:": true,
  "ftp:": true,
  "gopher:": true,
  "file:": true
};
function urlParse(url, slashesDenoteHost) {
  if (url && url instanceof Url)
    return url;
  const u = new Url();
  u.parse(url, slashesDenoteHost);
  return u;
}
Url.prototype.parse = function(url, slashesDenoteHost) {
  let lowerProto, hec, slashes;
  let rest = url;
  rest = rest.trim();
  if (!slashesDenoteHost && url.split("#").length === 1) {
    const simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
      }
      return this;
    }
  }
  let proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  }
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === "//";
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }
  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    let hostEnd = -1;
    for (let i2 = 0; i2 < hostEndingChars.length; i2++) {
      hec = rest.indexOf(hostEndingChars[i2]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    let auth, atSign;
    if (hostEnd === -1) {
      atSign = rest.lastIndexOf("@");
    } else {
      atSign = rest.lastIndexOf("@", hostEnd);
    }
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    }
    hostEnd = -1;
    for (let i2 = 0; i2 < nonHostChars.length; i2++) {
      hec = rest.indexOf(nonHostChars[i2]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    if (hostEnd === -1) {
      hostEnd = rest.length;
    }
    if (rest[hostEnd - 1] === ":") {
      hostEnd--;
    }
    const host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);
    this.parseHost(host);
    this.hostname = this.hostname || "";
    const ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!ipv6Hostname) {
      const hostparts = this.hostname.split(/\./);
      for (let i2 = 0, l = hostparts.length; i2 < l; i2++) {
        const part = hostparts[i2];
        if (!part) {
          continue;
        }
        if (!part.match(hostnamePartPattern)) {
          let newpart = "";
          for (let j = 0, k2 = part.length; j < k2; j++) {
            if (part.charCodeAt(j) > 127) {
              newpart += "x";
            } else {
              newpart += part[j];
            }
          }
          if (!newpart.match(hostnamePartPattern)) {
            const validParts = hostparts.slice(0, i2);
            const notHost = hostparts.slice(i2 + 1);
            const bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = notHost.join(".") + rest;
            }
            this.hostname = validParts.join(".");
            break;
          }
        }
      }
    }
    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = "";
    }
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
    }
  }
  const hash = rest.indexOf("#");
  if (hash !== -1) {
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  const qm = rest.indexOf("?");
  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }
  if (rest) {
    this.pathname = rest;
  }
  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = "";
  }
  return this;
};
Url.prototype.parseHost = function(host) {
  let port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ":") {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) {
    this.hostname = host;
  }
};
var parse_default = urlParse;

// node_modules/uc.micro/index.mjs
var uc_exports = {};
__export(uc_exports, {
  Any: () => regex_default,
  Cc: () => regex_default2,
  Cf: () => regex_default3,
  P: () => regex_default4,
  S: () => regex_default5,
  Z: () => regex_default6
});

// node_modules/uc.micro/properties/Any/regex.mjs
var regex_default = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

// node_modules/uc.micro/categories/Cc/regex.mjs
var regex_default2 = /[\0-\x1F\x7F-\x9F]/;

// node_modules/uc.micro/categories/Cf/regex.mjs
var regex_default3 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

// node_modules/uc.micro/categories/P/regex.mjs
var regex_default4 = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

// node_modules/uc.micro/categories/S/regex.mjs
var regex_default5 = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;

// node_modules/uc.micro/categories/Z/regex.mjs
var regex_default6 = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

// node_modules/entities/lib/esm/generated/decode-data-html.js
var decode_data_html_default = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((c) => c.charCodeAt(0))
);

// node_modules/entities/lib/esm/generated/decode-data-xml.js
var decode_data_xml_default = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((c) => c.charCodeAt(0))
);

// node_modules/entities/lib/esm/decode_codepoint.js
var _a;
var decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint2 = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
);
function replaceCodePoint(codePoint) {
  var _a4;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a4 = decodeMap.get(codePoint)) !== null && _a4 !== void 0 ? _a4 : codePoint;
}

// node_modules/entities/lib/esm/decode.js
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
  CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
  CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
  CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code2) {
  return code2 >= CharCodes.ZERO && code2 <= CharCodes.NINE;
}
function isHexadecimalCharacter(code2) {
  return code2 >= CharCodes.UPPER_A && code2 <= CharCodes.UPPER_F || code2 >= CharCodes.LOWER_A && code2 <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code2) {
  return code2 >= CharCodes.UPPER_A && code2 <= CharCodes.UPPER_Z || code2 >= CharCodes.LOWER_A && code2 <= CharCodes.LOWER_Z || isNumber(code2);
}
function isEntityInAttributeInvalidEnd(code2) {
  return code2 === CharCodes.EQUALS || isAsciiAlphaNumeric(code2);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
var EntityDecoder = class {
  constructor(decodeTree, emitCodePoint, errors2) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors2;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(str, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (str.charCodeAt(offset) === CharCodes.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(str, offset + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(str, offset);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(str, offset);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(str, offset);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(str, offset);
      }
      case EntityDecoderState.NamedEntity: {
        return this.stateNamedEntity(str, offset);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(str, offset) {
    if (offset >= str.length) {
      return -1;
    }
    if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(str, offset + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(str, offset);
  }
  addToNumericResult(str, start, end, base2) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base2, digitCount) + parseInt(str.substr(start, digitCount), base2);
      this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber(char) || isHexadecimalCharacter(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 16);
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 10);
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a4;
    if (this.consumed <= expectedLength) {
      (_a4 = this.errors) === null || _a4 === void 0 ? void 0 : _a4.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(str, offset) {
    const { decodeTree } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset < str.length; offset++, this.excess++) {
      const char = str.charCodeAt(offset);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a4;
    const { result, decodeTree } = this;
    const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result, valueLength, this.consumed);
    (_a4 = this.errors) === null || _a4 === void 0 ? void 0 : _a4.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a4;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a4 = this.errors) === null || _a4 === void 0 ? void 0 : _a4.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState.EntityStart: {
        return 0;
      }
    }
  }
};
function getDecoder(decodeTree) {
  let ret = "";
  const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint2(str));
  return function decodeWithTrie(str, decodeMode) {
    let lastIndex = 0;
    let offset = 0;
    while ((offset = str.indexOf("&", offset)) >= 0) {
      ret += str.slice(lastIndex, offset);
      decoder.startEntity(decodeMode);
      const len = decoder.write(
        str,
        // Skip the "&"
        offset + 1
      );
      if (len < 0) {
        lastIndex = offset + decoder.end();
        break;
      }
      lastIndex = offset + len;
      offset = len === 0 ? lastIndex + 1 : lastIndex;
    }
    const result = ret + str.slice(lastIndex);
    ret = "";
    return result;
  };
}
function determineBranch(decodeTree, current, nodeIdx, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
  }
  let lo = nodeIdx;
  let hi = lo + branchCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midVal = decodeTree[mid];
    if (midVal < char) {
      lo = mid + 1;
    } else if (midVal > char) {
      hi = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}
var htmlDecoder = getDecoder(decode_data_html_default);
var xmlDecoder = getDecoder(decode_data_xml_default);
function decodeHTML(str, mode = DecodingMode.Legacy) {
  return htmlDecoder(str, mode);
}

// node_modules/entities/lib/esm/generated/encode-html.js
function restoreDiff(arr) {
  for (let i2 = 1; i2 < arr.length; i2++) {
    arr[i2][0] += arr[i2 - 1][0] + 1;
  }
  return arr;
}
var encode_html_default = new Map(restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));

// node_modules/entities/lib/esm/escape.js
var xmlCodeMap = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]);
var getCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (str, index) => str.codePointAt(index) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (c, index) => (c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index)
  )
);
function getEscaper(regex, map2) {
  return function escape3(data) {
    let match2;
    let lastIdx = 0;
    let result = "";
    while (match2 = regex.exec(data)) {
      if (lastIdx !== match2.index) {
        result += data.substring(lastIdx, match2.index);
      }
      result += map2.get(match2[0].charCodeAt(0));
      lastIdx = match2.index + 1;
    }
    return result + data.substring(lastIdx);
  };
}
var escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
var escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
]));
var escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
]));

// node_modules/entities/lib/esm/index.js
var EntityLevel;
(function(EntityLevel2) {
  EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
  EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
var EncodingMode;
(function(EncodingMode2) {
  EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
  EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
  EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
  EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
  EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));

// node_modules/markdown-it/lib/common/utils.mjs
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function isString(obj) {
  return _class(obj) === "[object String]";
}
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function has(object, key) {
  return _hasOwnProperty.call(object, key);
}
function assign(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function(source) {
    if (!source) {
      return;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be object");
    }
    Object.keys(source).forEach(function(key) {
      obj[key] = source[key];
    });
  });
  return obj;
}
function arrayReplaceAt(src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}
function isValidEntityCode(c) {
  if (c >= 55296 && c <= 57343) {
    return false;
  }
  if (c >= 64976 && c <= 65007) {
    return false;
  }
  if ((c & 65535) === 65535 || (c & 65535) === 65534) {
    return false;
  }
  if (c >= 0 && c <= 8) {
    return false;
  }
  if (c === 11) {
    return false;
  }
  if (c >= 14 && c <= 31) {
    return false;
  }
  if (c >= 127 && c <= 159) {
    return false;
  }
  if (c > 1114111) {
    return false;
  }
  return true;
}
function fromCodePoint3(c) {
  if (c > 65535) {
    c -= 65536;
    const surrogate1 = 55296 + (c >> 10);
    const surrogate2 = 56320 + (c & 1023);
    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}
var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
var ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + ENTITY_RE.source, "gi");
var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function replaceEntityPattern(match2, name) {
  if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
    const code2 = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    if (isValidEntityCode(code2)) {
      return fromCodePoint3(code2);
    }
    return match2;
  }
  const decoded = decodeHTML(match2);
  if (decoded !== match2) {
    return decoded;
  }
  return match2;
}
function unescapeMd(str) {
  if (str.indexOf("\\") < 0) {
    return str;
  }
  return str.replace(UNESCAPE_MD_RE, "$1");
}
function unescapeAll(str) {
  if (str.indexOf("\\") < 0 && str.indexOf("&") < 0) {
    return str;
  }
  return str.replace(UNESCAPE_ALL_RE, function(match2, escaped, entity2) {
    if (escaped) {
      return escaped;
    }
    return replaceEntityPattern(match2, entity2);
  });
}
var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_REPLACEMENTS = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}
function escapeHtml(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}
var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
function escapeRE(str) {
  return str.replace(REGEXP_ESCAPE_RE, "\\$&");
}
function isSpace(code2) {
  switch (code2) {
    case 9:
    case 32:
      return true;
  }
  return false;
}
function isWhiteSpace(code2) {
  if (code2 >= 8192 && code2 <= 8202) {
    return true;
  }
  switch (code2) {
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return true;
  }
  return false;
}
function isPunctChar(ch) {
  return regex_default4.test(ch);
}
function isMdAsciiPunct(ch) {
  switch (ch) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}
function normalizeReference(str) {
  str = str.trim().replace(/\s+/g, " ");
  if ("ẞ".toLowerCase() === "Ṿ") {
    str = str.replace(/ẞ/g, "ß");
  }
  return str.toLowerCase().toUpperCase();
}
var lib = { mdurl: mdurl_exports, ucmicro: uc_exports };

// node_modules/markdown-it/lib/helpers/index.mjs
var helpers_exports = {};
__export(helpers_exports, {
  parseLinkDestination: () => parseLinkDestination,
  parseLinkLabel: () => parseLinkLabel,
  parseLinkTitle: () => parseLinkTitle
});

// node_modules/markdown-it/lib/helpers/parse_link_label.mjs
function parseLinkLabel(state, start, disableNested) {
  let level, found, marker, prevPos;
  const max = state.posMax;
  const oldPos = state.pos;
  state.pos = start + 1;
  level = 1;
  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 93) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }
    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 91) {
      if (prevPos === state.pos - 1) {
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1;
      }
    }
  }
  let labelEnd = -1;
  if (found) {
    labelEnd = state.pos;
  }
  state.pos = oldPos;
  return labelEnd;
}

// node_modules/markdown-it/lib/helpers/parse_link_destination.mjs
function parseLinkDestination(str, start, max) {
  let code2;
  let pos = start;
  const result = {
    ok: false,
    pos: 0,
    lines: 0,
    str: ""
  };
  if (str.charCodeAt(pos) === 60) {
    pos++;
    while (pos < max) {
      code2 = str.charCodeAt(pos);
      if (code2 === 10) {
        return result;
      }
      if (code2 === 60) {
        return result;
      }
      if (code2 === 62) {
        result.pos = pos + 1;
        result.str = unescapeAll(str.slice(start + 1, pos));
        result.ok = true;
        return result;
      }
      if (code2 === 92 && pos + 1 < max) {
        pos += 2;
        continue;
      }
      pos++;
    }
    return result;
  }
  let level = 0;
  while (pos < max) {
    code2 = str.charCodeAt(pos);
    if (code2 === 32) {
      break;
    }
    if (code2 < 32 || code2 === 127) {
      break;
    }
    if (code2 === 92 && pos + 1 < max) {
      if (str.charCodeAt(pos + 1) === 32) {
        break;
      }
      pos += 2;
      continue;
    }
    if (code2 === 40) {
      level++;
      if (level > 32) {
        return result;
      }
    }
    if (code2 === 41) {
      if (level === 0) {
        break;
      }
      level--;
    }
    pos++;
  }
  if (start === pos) {
    return result;
  }
  if (level !== 0) {
    return result;
  }
  result.str = unescapeAll(str.slice(start, pos));
  result.pos = pos;
  result.ok = true;
  return result;
}

// node_modules/markdown-it/lib/helpers/parse_link_title.mjs
function parseLinkTitle(str, start, max) {
  let code2, marker;
  let lines = 0;
  let pos = start;
  const result = {
    ok: false,
    pos: 0,
    lines: 0,
    str: ""
  };
  if (pos >= max) {
    return result;
  }
  marker = str.charCodeAt(pos);
  if (marker !== 34 && marker !== 39 && marker !== 40) {
    return result;
  }
  pos++;
  if (marker === 40) {
    marker = 41;
  }
  while (pos < max) {
    code2 = str.charCodeAt(pos);
    if (code2 === marker) {
      result.pos = pos + 1;
      result.lines = lines;
      result.str = unescapeAll(str.slice(start + 1, pos));
      result.ok = true;
      return result;
    } else if (code2 === 40 && marker === 41) {
      return result;
    } else if (code2 === 10) {
      lines++;
    } else if (code2 === 92 && pos + 1 < max) {
      pos++;
      if (str.charCodeAt(pos) === 10) {
        lines++;
      }
    }
    pos++;
  }
  return result;
}

// node_modules/markdown-it/lib/renderer.mjs
var default_rules = {};
default_rules.code_inline = function(tokens, idx, options, env, slf) {
  const token = tokens[idx];
  return "<code" + slf.renderAttrs(token) + ">" + escapeHtml(token.content) + "</code>";
};
default_rules.code_block = function(tokens, idx, options, env, slf) {
  const token = tokens[idx];
  return "<pre" + slf.renderAttrs(token) + "><code>" + escapeHtml(tokens[idx].content) + "</code></pre>\n";
};
default_rules.fence = function(tokens, idx, options, env, slf) {
  const token = tokens[idx];
  const info = token.info ? unescapeAll(token.info).trim() : "";
  let langName = "";
  let langAttrs = "";
  if (info) {
    const arr = info.split(/(\s+)/g);
    langName = arr[0];
    langAttrs = arr.slice(2).join("");
  }
  let highlighted;
  if (options.highlight) {
    highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }
  if (highlighted.indexOf("<pre") === 0) {
    return highlighted + "\n";
  }
  if (info) {
    const i2 = token.attrIndex("class");
    const tmpAttrs = token.attrs ? token.attrs.slice() : [];
    if (i2 < 0) {
      tmpAttrs.push(["class", options.langPrefix + langName]);
    } else {
      tmpAttrs[i2] = tmpAttrs[i2].slice();
      tmpAttrs[i2][1] += " " + options.langPrefix + langName;
    }
    const tmpToken = {
      attrs: tmpAttrs
    };
    return `<pre><code${slf.renderAttrs(tmpToken)}>${highlighted}</code></pre>
`;
  }
  return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>
`;
};
default_rules.image = function(tokens, idx, options, env, slf) {
  const token = tokens[idx];
  token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(token.children, options, env);
  return slf.renderToken(tokens, idx, options);
};
default_rules.hardbreak = function(tokens, idx, options) {
  return options.xhtmlOut ? "<br />\n" : "<br>\n";
};
default_rules.softbreak = function(tokens, idx, options) {
  return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
};
default_rules.text = function(tokens, idx) {
  return escapeHtml(tokens[idx].content);
};
default_rules.html_block = function(tokens, idx) {
  return tokens[idx].content;
};
default_rules.html_inline = function(tokens, idx) {
  return tokens[idx].content;
};
function Renderer() {
  this.rules = assign({}, default_rules);
}
Renderer.prototype.renderAttrs = function renderAttrs(token) {
  let i2, l, result;
  if (!token.attrs) {
    return "";
  }
  result = "";
  for (i2 = 0, l = token.attrs.length; i2 < l; i2++) {
    result += " " + escapeHtml(token.attrs[i2][0]) + '="' + escapeHtml(token.attrs[i2][1]) + '"';
  }
  return result;
};
Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
  const token = tokens[idx];
  let result = "";
  if (token.hidden) {
    return "";
  }
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += "\n";
  }
  result += (token.nesting === -1 ? "</" : "<") + token.tag;
  result += this.renderAttrs(token);
  if (token.nesting === 0 && options.xhtmlOut) {
    result += " /";
  }
  let needLf = false;
  if (token.block) {
    needLf = true;
    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        const nextToken = tokens[idx + 1];
        if (nextToken.type === "inline" || nextToken.hidden) {
          needLf = false;
        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          needLf = false;
        }
      }
    }
  }
  result += needLf ? ">\n" : ">";
  return result;
};
Renderer.prototype.renderInline = function(tokens, options, env) {
  let result = "";
  const rules = this.rules;
  for (let i2 = 0, len = tokens.length; i2 < len; i2++) {
    const type = tokens[i2].type;
    if (typeof rules[type] !== "undefined") {
      result += rules[type](tokens, i2, options, env, this);
    } else {
      result += this.renderToken(tokens, i2, options);
    }
  }
  return result;
};
Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
  let result = "";
  for (let i2 = 0, len = tokens.length; i2 < len; i2++) {
    switch (tokens[i2].type) {
      case "text":
        result += tokens[i2].content;
        break;
      case "image":
        result += this.renderInlineAsText(tokens[i2].children, options, env);
        break;
      case "html_inline":
      case "html_block":
        result += tokens[i2].content;
        break;
      case "softbreak":
      case "hardbreak":
        result += "\n";
        break;
      default:
    }
  }
  return result;
};
Renderer.prototype.render = function(tokens, options, env) {
  let result = "";
  const rules = this.rules;
  for (let i2 = 0, len = tokens.length; i2 < len; i2++) {
    const type = tokens[i2].type;
    if (type === "inline") {
      result += this.renderInline(tokens[i2].children, options, env);
    } else if (typeof rules[type] !== "undefined") {
      result += rules[type](tokens, i2, options, env, this);
    } else {
      result += this.renderToken(tokens, i2, options, env);
    }
  }
  return result;
};
var renderer_default = Renderer;

// node_modules/markdown-it/lib/ruler.mjs
function Ruler() {
  this.__rules__ = [];
  this.__cache__ = null;
}
Ruler.prototype.__find__ = function(name) {
  for (let i2 = 0; i2 < this.__rules__.length; i2++) {
    if (this.__rules__[i2].name === name) {
      return i2;
    }
  }
  return -1;
};
Ruler.prototype.__compile__ = function() {
  const self2 = this;
  const chains = [""];
  self2.__rules__.forEach(function(rule) {
    if (!rule.enabled) {
      return;
    }
    rule.alt.forEach(function(altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });
  self2.__cache__ = {};
  chains.forEach(function(chain) {
    self2.__cache__[chain] = [];
    self2.__rules__.forEach(function(rule) {
      if (!rule.enabled) {
        return;
      }
      if (chain && rule.alt.indexOf(chain) < 0) {
        return;
      }
      self2.__cache__[chain].push(rule.fn);
    });
  });
};
Ruler.prototype.at = function(name, fn, options) {
  const index = this.__find__(name);
  const opt = options || {};
  if (index === -1) {
    throw new Error("Parser rule not found: " + name);
  }
  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};
Ruler.prototype.before = function(beforeName, ruleName, fn, options) {
  const index = this.__find__(beforeName);
  const opt = options || {};
  if (index === -1) {
    throw new Error("Parser rule not found: " + beforeName);
  }
  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });
  this.__cache__ = null;
};
Ruler.prototype.after = function(afterName, ruleName, fn, options) {
  const index = this.__find__(afterName);
  const opt = options || {};
  if (index === -1) {
    throw new Error("Parser rule not found: " + afterName);
  }
  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });
  this.__cache__ = null;
};
Ruler.prototype.push = function(ruleName, fn, options) {
  const opt = options || {};
  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });
  this.__cache__ = null;
};
Ruler.prototype.enable = function(list2, ignoreInvalid) {
  if (!Array.isArray(list2)) {
    list2 = [list2];
  }
  const result = [];
  list2.forEach(function(name) {
    const idx = this.__find__(name);
    if (idx < 0) {
      if (ignoreInvalid) {
        return;
      }
      throw new Error("Rules manager: invalid rule name " + name);
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);
  this.__cache__ = null;
  return result;
};
Ruler.prototype.enableOnly = function(list2, ignoreInvalid) {
  if (!Array.isArray(list2)) {
    list2 = [list2];
  }
  this.__rules__.forEach(function(rule) {
    rule.enabled = false;
  });
  this.enable(list2, ignoreInvalid);
};
Ruler.prototype.disable = function(list2, ignoreInvalid) {
  if (!Array.isArray(list2)) {
    list2 = [list2];
  }
  const result = [];
  list2.forEach(function(name) {
    const idx = this.__find__(name);
    if (idx < 0) {
      if (ignoreInvalid) {
        return;
      }
      throw new Error("Rules manager: invalid rule name " + name);
    }
    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);
  this.__cache__ = null;
  return result;
};
Ruler.prototype.getRules = function(chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }
  return this.__cache__[chainName] || [];
};
var ruler_default = Ruler;

// node_modules/markdown-it/lib/token.mjs
function Token(type, tag, nesting) {
  this.type = type;
  this.tag = tag;
  this.attrs = null;
  this.map = null;
  this.nesting = nesting;
  this.level = 0;
  this.children = null;
  this.content = "";
  this.markup = "";
  this.info = "";
  this.meta = null;
  this.block = false;
  this.hidden = false;
}
Token.prototype.attrIndex = function attrIndex(name) {
  if (!this.attrs) {
    return -1;
  }
  const attrs = this.attrs;
  for (let i2 = 0, len = attrs.length; i2 < len; i2++) {
    if (attrs[i2][0] === name) {
      return i2;
    }
  }
  return -1;
};
Token.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [attrData];
  }
};
Token.prototype.attrSet = function attrSet(name, value) {
  const idx = this.attrIndex(name);
  const attrData = [name, value];
  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};
Token.prototype.attrGet = function attrGet(name) {
  const idx = this.attrIndex(name);
  let value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value;
};
Token.prototype.attrJoin = function attrJoin(name, value) {
  const idx = this.attrIndex(name);
  if (idx < 0) {
    this.attrPush([name, value]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
  }
};
var token_default = Token;

// node_modules/markdown-it/lib/rules_core/state_core.mjs
function StateCore(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md;
}
StateCore.prototype.Token = token_default;
var state_core_default = StateCore;

// node_modules/markdown-it/lib/rules_core/normalize.mjs
var NEWLINES_RE = /\r\n?|\n/g;
var NULL_RE = /\0/g;
function normalize(state) {
  let str;
  str = state.src.replace(NEWLINES_RE, "\n");
  str = str.replace(NULL_RE, "�");
  state.src = str;
}

// node_modules/markdown-it/lib/rules_core/block.mjs
function block(state) {
  let token;
  if (state.inlineMode) {
    token = new state.Token("inline", "", 0);
    token.content = state.src;
    token.map = [0, 1];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
}

// node_modules/markdown-it/lib/rules_core/inline.mjs
function inline(state) {
  const tokens = state.tokens;
  for (let i2 = 0, l = tokens.length; i2 < l; i2++) {
    const tok = tokens[i2];
    if (tok.type === "inline") {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
}

// node_modules/markdown-it/lib/rules_core/linkify.mjs
function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}
function linkify(state) {
  const blockTokens = state.tokens;
  if (!state.md.options.linkify) {
    return;
  }
  for (let j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== "inline" || !state.md.linkify.pretest(blockTokens[j].content)) {
      continue;
    }
    let tokens = blockTokens[j].children;
    let htmlLinkLevel = 0;
    for (let i2 = tokens.length - 1; i2 >= 0; i2--) {
      const currentToken = tokens[i2];
      if (currentToken.type === "link_close") {
        i2--;
        while (tokens[i2].level !== currentToken.level && tokens[i2].type !== "link_open") {
          i2--;
        }
        continue;
      }
      if (currentToken.type === "html_inline") {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) {
        continue;
      }
      if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
        const text2 = currentToken.content;
        let links = state.md.linkify.match(text2);
        const nodes = [];
        let level = currentToken.level;
        let lastPos = 0;
        if (links.length > 0 && links[0].index === 0 && i2 > 0 && tokens[i2 - 1].type === "text_special") {
          links = links.slice(1);
        }
        for (let ln = 0; ln < links.length; ln++) {
          const url = links[ln].url;
          const fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) {
            continue;
          }
          let urlText = links[ln].text;
          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
          } else if (links[ln].schema === "mailto:" && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }
          const pos = links[ln].index;
          if (pos > lastPos) {
            const token = new state.Token("text", "", 0);
            token.content = text2.slice(lastPos, pos);
            token.level = level;
            nodes.push(token);
          }
          const token_o = new state.Token("link_open", "a", 1);
          token_o.attrs = [["href", fullUrl]];
          token_o.level = level++;
          token_o.markup = "linkify";
          token_o.info = "auto";
          nodes.push(token_o);
          const token_t = new state.Token("text", "", 0);
          token_t.content = urlText;
          token_t.level = level;
          nodes.push(token_t);
          const token_c = new state.Token("link_close", "a", -1);
          token_c.level = --level;
          token_c.markup = "linkify";
          token_c.info = "auto";
          nodes.push(token_c);
          lastPos = links[ln].lastIndex;
        }
        if (lastPos < text2.length) {
          const token = new state.Token("text", "", 0);
          token.content = text2.slice(lastPos);
          token.level = level;
          nodes.push(token);
        }
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i2, nodes);
      }
    }
  }
}

// node_modules/markdown-it/lib/rules_core/replacements.mjs
var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
var SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
var SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
var SCOPED_ABBR = {
  c: "©",
  r: "®",
  tm: "™"
};
function replaceFn(match2, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}
function replace_scoped(inlineTokens) {
  let inside_autolink = 0;
  for (let i2 = inlineTokens.length - 1; i2 >= 0; i2--) {
    const token = inlineTokens[i2];
    if (token.type === "text" && !inside_autolink) {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }
    if (token.type === "link_open" && token.info === "auto") {
      inside_autolink--;
    }
    if (token.type === "link_close" && token.info === "auto") {
      inside_autolink++;
    }
  }
}
function replace_rare(inlineTokens) {
  let inside_autolink = 0;
  for (let i2 = inlineTokens.length - 1; i2 >= 0; i2--) {
    const token = inlineTokens[i2];
    if (token.type === "text" && !inside_autolink) {
      if (RARE_RE.test(token.content)) {
        token.content = token.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–");
      }
    }
    if (token.type === "link_open" && token.info === "auto") {
      inside_autolink--;
    }
    if (token.type === "link_close" && token.info === "auto") {
      inside_autolink++;
    }
  }
}
function replace(state) {
  let blkIdx;
  if (!state.md.options.typographer) {
    return;
  }
  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== "inline") {
      continue;
    }
    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }
    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }
  }
}

// node_modules/markdown-it/lib/rules_core/smartquotes.mjs
var QUOTE_TEST_RE = /['"]/;
var QUOTE_RE = /['"]/g;
var APOSTROPHE = "’";
function replaceAt(str, index, ch) {
  return str.slice(0, index) + ch + str.slice(index + 1);
}
function process_inlines(tokens, state) {
  let j;
  const stack = [];
  for (let i2 = 0; i2 < tokens.length; i2++) {
    const token = tokens[i2];
    const thisLevel = tokens[i2].level;
    for (j = stack.length - 1; j >= 0; j--) {
      if (stack[j].level <= thisLevel) {
        break;
      }
    }
    stack.length = j + 1;
    if (token.type !== "text") {
      continue;
    }
    let text2 = token.content;
    let pos = 0;
    let max = text2.length;
    OUTER:
      while (pos < max) {
        QUOTE_RE.lastIndex = pos;
        const t2 = QUOTE_RE.exec(text2);
        if (!t2) {
          break;
        }
        let canOpen = true;
        let canClose = true;
        pos = t2.index + 1;
        const isSingle = t2[0] === "'";
        let lastChar = 32;
        if (t2.index - 1 >= 0) {
          lastChar = text2.charCodeAt(t2.index - 1);
        } else {
          for (j = i2 - 1; j >= 0; j--) {
            if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak")
              break;
            if (!tokens[j].content)
              continue;
            lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
            break;
          }
        }
        let nextChar = 32;
        if (pos < max) {
          nextChar = text2.charCodeAt(pos);
        } else {
          for (j = i2 + 1; j < tokens.length; j++) {
            if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak")
              break;
            if (!tokens[j].content)
              continue;
            nextChar = tokens[j].content.charCodeAt(0);
            break;
          }
        }
        const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
        const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
        const isLastWhiteSpace = isWhiteSpace(lastChar);
        const isNextWhiteSpace = isWhiteSpace(nextChar);
        if (isNextWhiteSpace) {
          canOpen = false;
        } else if (isNextPunctChar) {
          if (!(isLastWhiteSpace || isLastPunctChar)) {
            canOpen = false;
          }
        }
        if (isLastWhiteSpace) {
          canClose = false;
        } else if (isLastPunctChar) {
          if (!(isNextWhiteSpace || isNextPunctChar)) {
            canClose = false;
          }
        }
        if (nextChar === 34 && t2[0] === '"') {
          if (lastChar >= 48 && lastChar <= 57) {
            canClose = canOpen = false;
          }
        }
        if (canOpen && canClose) {
          canOpen = isLastPunctChar;
          canClose = isNextPunctChar;
        }
        if (!canOpen && !canClose) {
          if (isSingle) {
            token.content = replaceAt(token.content, t2.index, APOSTROPHE);
          }
          continue;
        }
        if (canClose) {
          for (j = stack.length - 1; j >= 0; j--) {
            let item = stack[j];
            if (stack[j].level < thisLevel) {
              break;
            }
            if (item.single === isSingle && stack[j].level === thisLevel) {
              item = stack[j];
              let openQuote;
              let closeQuote;
              if (isSingle) {
                openQuote = state.md.options.quotes[2];
                closeQuote = state.md.options.quotes[3];
              } else {
                openQuote = state.md.options.quotes[0];
                closeQuote = state.md.options.quotes[1];
              }
              token.content = replaceAt(token.content, t2.index, closeQuote);
              tokens[item.token].content = replaceAt(
                tokens[item.token].content,
                item.pos,
                openQuote
              );
              pos += closeQuote.length - 1;
              if (item.token === i2) {
                pos += openQuote.length - 1;
              }
              text2 = token.content;
              max = text2.length;
              stack.length = j;
              continue OUTER;
            }
          }
        }
        if (canOpen) {
          stack.push({
            token: i2,
            pos: t2.index,
            single: isSingle,
            level: thisLevel
          });
        } else if (canClose && isSingle) {
          token.content = replaceAt(token.content, t2.index, APOSTROPHE);
        }
      }
  }
}
function smartquotes(state) {
  if (!state.md.options.typographer) {
    return;
  }
  for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue;
    }
    process_inlines(state.tokens[blkIdx].children, state);
  }
}

// node_modules/markdown-it/lib/rules_core/text_join.mjs
function text_join(state) {
  let curr, last;
  const blockTokens = state.tokens;
  const l = blockTokens.length;
  for (let j = 0; j < l; j++) {
    if (blockTokens[j].type !== "inline")
      continue;
    const tokens = blockTokens[j].children;
    const max = tokens.length;
    for (curr = 0; curr < max; curr++) {
      if (tokens[curr].type === "text_special") {
        tokens[curr].type = "text";
      }
    }
    for (curr = last = 0; curr < max; curr++) {
      if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
        tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
      } else {
        if (curr !== last) {
          tokens[last] = tokens[curr];
        }
        last++;
      }
    }
    if (curr !== last) {
      tokens.length = last;
    }
  }
}

// node_modules/markdown-it/lib/parser_core.mjs
var _rules = [
  ["normalize", normalize],
  ["block", block],
  ["inline", inline],
  ["linkify", linkify],
  ["replacements", replace],
  ["smartquotes", smartquotes],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", text_join]
];
function Core() {
  this.ruler = new ruler_default();
  for (let i2 = 0; i2 < _rules.length; i2++) {
    this.ruler.push(_rules[i2][0], _rules[i2][1]);
  }
}
Core.prototype.process = function(state) {
  const rules = this.ruler.getRules("");
  for (let i2 = 0, l = rules.length; i2 < l; i2++) {
    rules[i2](state);
  }
};
Core.prototype.State = state_core_default;
var parser_core_default = Core;

// node_modules/markdown-it/lib/rules_block/state_block.mjs
function StateBlock(src, md, env, tokens) {
  this.src = src;
  this.md = md;
  this.env = env;
  this.tokens = tokens;
  this.bMarks = [];
  this.eMarks = [];
  this.tShift = [];
  this.sCount = [];
  this.bsCount = [];
  this.blkIndent = 0;
  this.line = 0;
  this.lineMax = 0;
  this.tight = false;
  this.ddIndent = -1;
  this.listIndent = -1;
  this.parentType = "root";
  this.level = 0;
  const s = this.src;
  for (let start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++) {
    const ch = s.charCodeAt(pos);
    if (!indent_found) {
      if (isSpace(ch)) {
        indent++;
        if (ch === 9) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue;
      } else {
        indent_found = true;
      }
    }
    if (ch === 10 || pos === len - 1) {
      if (ch !== 10) {
        pos++;
      }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);
      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);
  this.lineMax = this.bMarks.length - 1;
}
StateBlock.prototype.push = function(type, tag, nesting) {
  const token = new token_default(type, tag, nesting);
  token.block = true;
  if (nesting < 0)
    this.level--;
  token.level = this.level;
  if (nesting > 0)
    this.level++;
  this.tokens.push(token);
  return token;
};
StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};
StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (let max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  for (let max = this.src.length; pos < max; pos++) {
    const ch = this.src.charCodeAt(pos);
    if (!isSpace(ch)) {
      break;
    }
  }
  return pos;
};
StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
  if (pos <= min) {
    return pos;
  }
  while (pos > min) {
    if (!isSpace(this.src.charCodeAt(--pos))) {
      return pos + 1;
    }
  }
  return pos;
};
StateBlock.prototype.skipChars = function skipChars(pos, code2) {
  for (let max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code2) {
      break;
    }
  }
  return pos;
};
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code2, min) {
  if (pos <= min) {
    return pos;
  }
  while (pos > min) {
    if (code2 !== this.src.charCodeAt(--pos)) {
      return pos + 1;
    }
  }
  return pos;
};
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  if (begin >= end) {
    return "";
  }
  const queue = new Array(end - begin);
  for (let i2 = 0, line = begin; line < end; line++, i2++) {
    let lineIndent = 0;
    const lineStart = this.bMarks[line];
    let first = lineStart;
    let last;
    if (line + 1 < end || keepLastLF) {
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }
    while (first < last && lineIndent < indent) {
      const ch = this.src.charCodeAt(first);
      if (isSpace(ch)) {
        if (ch === 9) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        lineIndent++;
      } else {
        break;
      }
      first++;
    }
    if (lineIndent > indent) {
      queue[i2] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first, last);
    } else {
      queue[i2] = this.src.slice(first, last);
    }
  }
  return queue.join("");
};
StateBlock.prototype.Token = token_default;
var state_block_default = StateBlock;

// node_modules/markdown-it/lib/rules_block/table.mjs
function getLine(state, line) {
  const pos = state.bMarks[line] + state.tShift[line];
  const max = state.eMarks[line];
  return state.src.slice(pos, max);
}
function escapedSplit(str) {
  const result = [];
  const max = str.length;
  let pos = 0;
  let ch = str.charCodeAt(pos);
  let isEscaped = false;
  let lastPos = 0;
  let current = "";
  while (pos < max) {
    if (ch === 124) {
      if (!isEscaped) {
        result.push(current + str.substring(lastPos, pos));
        current = "";
        lastPos = pos + 1;
      } else {
        current += str.substring(lastPos, pos - 1);
        lastPos = pos;
      }
    }
    isEscaped = ch === 92;
    pos++;
    ch = str.charCodeAt(pos);
  }
  result.push(current + str.substring(lastPos));
  return result;
}
function table(state, startLine, endLine, silent) {
  if (startLine + 2 > endLine) {
    return false;
  }
  let nextLine = startLine + 1;
  if (state.sCount[nextLine] < state.blkIndent) {
    return false;
  }
  if (state.sCount[nextLine] - state.blkIndent >= 4) {
    return false;
  }
  let pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) {
    return false;
  }
  const firstCh = state.src.charCodeAt(pos++);
  if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) {
    return false;
  }
  if (pos >= state.eMarks[nextLine]) {
    return false;
  }
  const secondCh = state.src.charCodeAt(pos++);
  if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !isSpace(secondCh)) {
    return false;
  }
  if (firstCh === 45 && isSpace(secondCh)) {
    return false;
  }
  while (pos < state.eMarks[nextLine]) {
    const ch = state.src.charCodeAt(pos);
    if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace(ch)) {
      return false;
    }
    pos++;
  }
  let lineText = getLine(state, startLine + 1);
  let columns = lineText.split("|");
  const aligns = [];
  for (let i2 = 0; i2 < columns.length; i2++) {
    const t2 = columns[i2].trim();
    if (!t2) {
      if (i2 === 0 || i2 === columns.length - 1) {
        continue;
      } else {
        return false;
      }
    }
    if (!/^:?-+:?$/.test(t2)) {
      return false;
    }
    if (t2.charCodeAt(t2.length - 1) === 58) {
      aligns.push(t2.charCodeAt(0) === 58 ? "center" : "right");
    } else if (t2.charCodeAt(0) === 58) {
      aligns.push("left");
    } else {
      aligns.push("");
    }
  }
  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf("|") === -1) {
    return false;
  }
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  columns = escapedSplit(lineText);
  if (columns.length && columns[0] === "")
    columns.shift();
  if (columns.length && columns[columns.length - 1] === "")
    columns.pop();
  const columnCount = columns.length;
  if (columnCount === 0 || columnCount !== aligns.length) {
    return false;
  }
  if (silent) {
    return true;
  }
  const oldParentType = state.parentType;
  state.parentType = "table";
  const terminatorRules = state.md.block.ruler.getRules("blockquote");
  const token_to = state.push("table_open", "table", 1);
  const tableLines = [startLine, 0];
  token_to.map = tableLines;
  const token_tho = state.push("thead_open", "thead", 1);
  token_tho.map = [startLine, startLine + 1];
  const token_htro = state.push("tr_open", "tr", 1);
  token_htro.map = [startLine, startLine + 1];
  for (let i2 = 0; i2 < columns.length; i2++) {
    const token_ho = state.push("th_open", "th", 1);
    if (aligns[i2]) {
      token_ho.attrs = [["style", "text-align:" + aligns[i2]]];
    }
    const token_il = state.push("inline", "", 0);
    token_il.content = columns[i2].trim();
    token_il.children = [];
    state.push("th_close", "th", -1);
  }
  state.push("tr_close", "tr", -1);
  state.push("thead_close", "thead", -1);
  let tbodyLines;
  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    let terminate = false;
    for (let i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
      if (terminatorRules[i2](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
    lineText = getLine(state, nextLine).trim();
    if (!lineText) {
      break;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      break;
    }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === "")
      columns.shift();
    if (columns.length && columns[columns.length - 1] === "")
      columns.pop();
    if (nextLine === startLine + 2) {
      const token_tbo = state.push("tbody_open", "tbody", 1);
      token_tbo.map = tbodyLines = [startLine + 2, 0];
    }
    const token_tro = state.push("tr_open", "tr", 1);
    token_tro.map = [nextLine, nextLine + 1];
    for (let i2 = 0; i2 < columnCount; i2++) {
      const token_tdo = state.push("td_open", "td", 1);
      if (aligns[i2]) {
        token_tdo.attrs = [["style", "text-align:" + aligns[i2]]];
      }
      const token_il = state.push("inline", "", 0);
      token_il.content = columns[i2] ? columns[i2].trim() : "";
      token_il.children = [];
      state.push("td_close", "td", -1);
    }
    state.push("tr_close", "tr", -1);
  }
  if (tbodyLines) {
    state.push("tbody_close", "tbody", -1);
    tbodyLines[1] = nextLine;
  }
  state.push("table_close", "table", -1);
  tableLines[1] = nextLine;
  state.parentType = oldParentType;
  state.line = nextLine;
  return true;
}

// node_modules/markdown-it/lib/rules_block/code.mjs
function code(state, startLine, endLine) {
  if (state.sCount[startLine] - state.blkIndent < 4) {
    return false;
  }
  let nextLine = startLine + 1;
  let last = nextLine;
  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }
  state.line = last;
  const token = state.push("code_block", "code", 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + "\n";
  token.map = [startLine, state.line];
  return true;
}

// node_modules/markdown-it/lib/rules_block/fence.mjs
function fence(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (pos + 3 > max) {
    return false;
  }
  const marker = state.src.charCodeAt(pos);
  if (marker !== 126 && marker !== 96) {
    return false;
  }
  let mem = pos;
  pos = state.skipChars(pos, marker);
  let len = pos - mem;
  if (len < 3) {
    return false;
  }
  const markup = state.src.slice(mem, pos);
  const params = state.src.slice(pos, max);
  if (marker === 96) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false;
    }
  }
  if (silent) {
    return true;
  }
  let nextLine = startLine;
  let haveEndMarker = false;
  for (; ; ) {
    nextLine++;
    if (nextLine >= endLine) {
      break;
    }
    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];
    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    if (state.src.charCodeAt(pos) !== marker) {
      continue;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      continue;
    }
    pos = state.skipChars(pos, marker);
    if (pos - mem < len) {
      continue;
    }
    pos = state.skipSpaces(pos);
    if (pos < max) {
      continue;
    }
    haveEndMarker = true;
    break;
  }
  len = state.sCount[startLine];
  state.line = nextLine + (haveEndMarker ? 1 : 0);
  const token = state.push("fence", "code", 0);
  token.info = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup = markup;
  token.map = [startLine, state.line];
  return true;
}

// node_modules/markdown-it/lib/rules_block/blockquote.mjs
function blockquote(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  const oldLineMax = state.lineMax;
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (state.src.charCodeAt(pos) !== 62) {
    return false;
  }
  if (silent) {
    return true;
  }
  const oldBMarks = [];
  const oldBSCount = [];
  const oldSCount = [];
  const oldTShift = [];
  const terminatorRules = state.md.block.ruler.getRules("blockquote");
  const oldParentType = state.parentType;
  state.parentType = "blockquote";
  let lastLineEmpty = false;
  let nextLine;
  for (nextLine = startLine; nextLine < endLine; nextLine++) {
    const isOutdented = state.sCount[nextLine] < state.blkIndent;
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];
    if (pos >= max) {
      break;
    }
    if (state.src.charCodeAt(pos++) === 62 && !isOutdented) {
      let initial = state.sCount[nextLine] + 1;
      let spaceAfterMarker;
      let adjustTab;
      if (state.src.charCodeAt(pos) === 32) {
        pos++;
        initial++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 9) {
        spaceAfterMarker = true;
        if ((state.bsCount[nextLine] + initial) % 4 === 3) {
          pos++;
          initial++;
          adjustTab = false;
        } else {
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }
      let offset = initial;
      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;
      while (pos < max) {
        const ch = state.src.charCodeAt(pos);
        if (isSpace(ch)) {
          if (ch === 9) {
            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }
        pos++;
      }
      lastLineEmpty = pos >= max;
      oldBSCount.push(state.bsCount[nextLine]);
      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;
      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue;
    }
    if (lastLineEmpty) {
      break;
    }
    let terminate = false;
    for (let i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
      if (terminatorRules[i2](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      state.lineMax = nextLine;
      if (state.blkIndent !== 0) {
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] -= state.blkIndent;
      }
      break;
    }
    oldBMarks.push(state.bMarks[nextLine]);
    oldBSCount.push(state.bsCount[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]);
    state.sCount[nextLine] = -1;
  }
  const oldIndent = state.blkIndent;
  state.blkIndent = 0;
  const token_o = state.push("blockquote_open", "blockquote", 1);
  token_o.markup = ">";
  const lines = [startLine, 0];
  token_o.map = lines;
  state.md.block.tokenize(state, startLine, nextLine);
  const token_c = state.push("blockquote_close", "blockquote", -1);
  token_c.markup = ">";
  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line;
  for (let i2 = 0; i2 < oldTShift.length; i2++) {
    state.bMarks[i2 + startLine] = oldBMarks[i2];
    state.tShift[i2 + startLine] = oldTShift[i2];
    state.sCount[i2 + startLine] = oldSCount[i2];
    state.bsCount[i2 + startLine] = oldBSCount[i2];
  }
  state.blkIndent = oldIndent;
  return true;
}

// node_modules/markdown-it/lib/rules_block/hr.mjs
function hr(state, startLine, endLine, silent) {
  const max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  const marker = state.src.charCodeAt(pos++);
  if (marker !== 42 && marker !== 45 && marker !== 95) {
    return false;
  }
  let cnt = 1;
  while (pos < max) {
    const ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !isSpace(ch)) {
      return false;
    }
    if (ch === marker) {
      cnt++;
    }
  }
  if (cnt < 3) {
    return false;
  }
  if (silent) {
    return true;
  }
  state.line = startLine + 1;
  const token = state.push("hr", "hr", 0);
  token.map = [startLine, state.line];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
  return true;
}

// node_modules/markdown-it/lib/rules_block/list.mjs
function skipBulletListMarker(state, startLine) {
  const max = state.eMarks[startLine];
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  const marker = state.src.charCodeAt(pos++);
  if (marker !== 42 && marker !== 45 && marker !== 43) {
    return -1;
  }
  if (pos < max) {
    const ch = state.src.charCodeAt(pos);
    if (!isSpace(ch)) {
      return -1;
    }
  }
  return pos;
}
function skipOrderedListMarker(state, startLine) {
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  let pos = start;
  if (pos + 1 >= max) {
    return -1;
  }
  let ch = state.src.charCodeAt(pos++);
  if (ch < 48 || ch > 57) {
    return -1;
  }
  for (; ; ) {
    if (pos >= max) {
      return -1;
    }
    ch = state.src.charCodeAt(pos++);
    if (ch >= 48 && ch <= 57) {
      if (pos - start >= 10) {
        return -1;
      }
      continue;
    }
    if (ch === 41 || ch === 46) {
      break;
    }
    return -1;
  }
  if (pos < max) {
    ch = state.src.charCodeAt(pos);
    if (!isSpace(ch)) {
      return -1;
    }
  }
  return pos;
}
function markTightParagraphs(state, idx) {
  const level = state.level + 2;
  for (let i2 = idx + 2, l = state.tokens.length - 2; i2 < l; i2++) {
    if (state.tokens[i2].level === level && state.tokens[i2].type === "paragraph_open") {
      state.tokens[i2 + 2].hidden = true;
      state.tokens[i2].hidden = true;
      i2 += 2;
    }
  }
}
function list(state, startLine, endLine, silent) {
  let max, pos, start, token;
  let nextLine = startLine;
  let tight = true;
  if (state.sCount[nextLine] - state.blkIndent >= 4) {
    return false;
  }
  if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) {
    return false;
  }
  let isTerminatingParagraph = false;
  if (silent && state.parentType === "paragraph") {
    if (state.sCount[nextLine] >= state.blkIndent) {
      isTerminatingParagraph = true;
    }
  }
  let isOrdered;
  let markerValue;
  let posAfterMarker;
  if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
    isOrdered = true;
    start = state.bMarks[nextLine] + state.tShift[nextLine];
    markerValue = Number(state.src.slice(start, posAfterMarker - 1));
    if (isTerminatingParagraph && markerValue !== 1)
      return false;
  } else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) {
    isOrdered = false;
  } else {
    return false;
  }
  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine])
      return false;
  }
  if (silent) {
    return true;
  }
  const markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
  const listTokIdx = state.tokens.length;
  if (isOrdered) {
    token = state.push("ordered_list_open", "ol", 1);
    if (markerValue !== 1) {
      token.attrs = [["start", markerValue]];
    }
  } else {
    token = state.push("bullet_list_open", "ul", 1);
  }
  const listLines = [nextLine, 0];
  token.map = listLines;
  token.markup = String.fromCharCode(markerCharCode);
  let prevEmptyEnd = false;
  const terminatorRules = state.md.block.ruler.getRules("list");
  const oldParentType = state.parentType;
  state.parentType = "list";
  while (nextLine < endLine) {
    pos = posAfterMarker;
    max = state.eMarks[nextLine];
    const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
    let offset = initial;
    while (pos < max) {
      const ch = state.src.charCodeAt(pos);
      if (ch === 9) {
        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
      } else if (ch === 32) {
        offset++;
      } else {
        break;
      }
      pos++;
    }
    const contentStart = pos;
    let indentAfterMarker;
    if (contentStart >= max) {
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = offset - initial;
    }
    if (indentAfterMarker > 4) {
      indentAfterMarker = 1;
    }
    const indent = initial + indentAfterMarker;
    token = state.push("list_item_open", "li", 1);
    token.markup = String.fromCharCode(markerCharCode);
    const itemLines = [nextLine, 0];
    token.map = itemLines;
    if (isOrdered) {
      token.info = state.src.slice(start, posAfterMarker - 1);
    }
    const oldTight = state.tight;
    const oldTShift = state.tShift[nextLine];
    const oldSCount = state.sCount[nextLine];
    const oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;
    state.tight = true;
    state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
    state.sCount[nextLine] = offset;
    if (contentStart >= max && state.isEmpty(nextLine + 1)) {
      state.line = Math.min(state.line + 2, endLine);
    } else {
      state.md.block.tokenize(state, nextLine, endLine, true);
    }
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[nextLine] = oldTShift;
    state.sCount[nextLine] = oldSCount;
    state.tight = oldTight;
    token = state.push("list_item_close", "li", -1);
    token.markup = String.fromCharCode(markerCharCode);
    nextLine = state.line;
    itemLines[1] = nextLine;
    if (nextLine >= endLine) {
      break;
    }
    if (state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      break;
    }
    let terminate = false;
    for (let i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
      if (terminatorRules[i2](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) {
        break;
      }
      start = state.bMarks[nextLine] + state.tShift[nextLine];
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) {
        break;
      }
    }
    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
      break;
    }
  }
  if (isOrdered) {
    token = state.push("ordered_list_close", "ol", -1);
  } else {
    token = state.push("bullet_list_close", "ul", -1);
  }
  token.markup = String.fromCharCode(markerCharCode);
  listLines[1] = nextLine;
  state.line = nextLine;
  state.parentType = oldParentType;
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }
  return true;
}

// node_modules/markdown-it/lib/rules_block/reference.mjs
function reference(state, startLine, _endLine, silent) {
  let lines = 0;
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  let nextLine = startLine + 1;
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (state.src.charCodeAt(pos) !== 91) {
    return false;
  }
  while (++pos < max) {
    if (state.src.charCodeAt(pos) === 93 && state.src.charCodeAt(pos - 1) !== 92) {
      if (pos + 1 === max) {
        return false;
      }
      if (state.src.charCodeAt(pos + 1) !== 58) {
        return false;
      }
      break;
    }
  }
  const endLine = state.lineMax;
  const terminatorRules = state.md.block.ruler.getRules("reference");
  const oldParentType = state.parentType;
  state.parentType = "reference";
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      continue;
    }
    if (state.sCount[nextLine] < 0) {
      continue;
    }
    let terminate = false;
    for (let i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
      if (terminatorRules[i2](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
  }
  const str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  max = str.length;
  let labelEnd = -1;
  for (pos = 1; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 91) {
      return false;
    } else if (ch === 93) {
      labelEnd = pos;
      break;
    } else if (ch === 10) {
      lines++;
    } else if (ch === 92) {
      pos++;
      if (pos < max && str.charCodeAt(pos) === 10) {
        lines++;
      }
    }
  }
  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
    return false;
  }
  for (pos = labelEnd + 2; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 10) {
      lines++;
    } else if (isSpace(ch)) {
    } else {
      break;
    }
  }
  const destRes = state.md.helpers.parseLinkDestination(str, pos, max);
  if (!destRes.ok) {
    return false;
  }
  const href = state.md.normalizeLink(destRes.str);
  if (!state.md.validateLink(href)) {
    return false;
  }
  pos = destRes.pos;
  lines += destRes.lines;
  const destEndPos = pos;
  const destEndLineNo = lines;
  const start = pos;
  for (; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 10) {
      lines++;
    } else if (isSpace(ch)) {
    } else {
      break;
    }
  }
  const titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
  let title;
  if (pos < max && start !== pos && titleRes.ok) {
    title = titleRes.str;
    pos = titleRes.pos;
    lines += titleRes.lines;
  } else {
    title = "";
    pos = destEndPos;
    lines = destEndLineNo;
  }
  while (pos < max) {
    const ch = str.charCodeAt(pos);
    if (!isSpace(ch)) {
      break;
    }
    pos++;
  }
  if (pos < max && str.charCodeAt(pos) !== 10) {
    if (title) {
      title = "";
      pos = destEndPos;
      lines = destEndLineNo;
      while (pos < max) {
        const ch = str.charCodeAt(pos);
        if (!isSpace(ch)) {
          break;
        }
        pos++;
      }
    }
  }
  if (pos < max && str.charCodeAt(pos) !== 10) {
    return false;
  }
  const label = normalizeReference(str.slice(1, labelEnd));
  if (!label) {
    return false;
  }
  if (silent) {
    return true;
  }
  if (typeof state.env.references === "undefined") {
    state.env.references = {};
  }
  if (typeof state.env.references[label] === "undefined") {
    state.env.references[label] = { title, href };
  }
  state.parentType = oldParentType;
  state.line = startLine + lines + 1;
  return true;
}

// node_modules/markdown-it/lib/common/html_blocks.mjs
var html_blocks_default = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "source",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
];

// node_modules/markdown-it/lib/common/html_re.mjs
var attr_name = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
var unquoted = "[^\"'=<>`\\x00-\\x20]+";
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';
var attr_value = "(?:" + unquoted + "|" + single_quoted + "|" + double_quoted + ")";
var attribute = "(?:\\s+" + attr_name + "(?:\\s*=\\s*" + attr_value + ")?)";
var open_tag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
var close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
var comment = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
var processing = "<[?][\\s\\S]*?[?]>";
var declaration = "<![A-Z]+\\s+[^>]*>";
var cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
var HTML_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + "|" + comment + "|" + processing + "|" + declaration + "|" + cdata + ")");
var HTML_OPEN_CLOSE_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + ")");

// node_modules/markdown-it/lib/rules_block/html_block.mjs
var HTML_SEQUENCES = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true],
  [/^<!--/, /-->/, true],
  [/^<\?/, /\?>/, true],
  [/^<![A-Z]/, />/, true],
  [/^<!\[CDATA\[/, /\]\]>/, true],
  [new RegExp("^</?(" + html_blocks_default.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true],
  [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, false]
];
function html_block(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  if (!state.md.options.html) {
    return false;
  }
  if (state.src.charCodeAt(pos) !== 60) {
    return false;
  }
  let lineText = state.src.slice(pos, max);
  let i2 = 0;
  for (; i2 < HTML_SEQUENCES.length; i2++) {
    if (HTML_SEQUENCES[i2][0].test(lineText)) {
      break;
    }
  }
  if (i2 === HTML_SEQUENCES.length) {
    return false;
  }
  if (silent) {
    return HTML_SEQUENCES[i2][2];
  }
  let nextLine = startLine + 1;
  if (!HTML_SEQUENCES[i2][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);
      if (HTML_SEQUENCES[i2][1].test(lineText)) {
        if (lineText.length !== 0) {
          nextLine++;
        }
        break;
      }
    }
  }
  state.line = nextLine;
  const token = state.push("html_block", "", 0);
  token.map = [startLine, nextLine];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
  return true;
}

// node_modules/markdown-it/lib/rules_block/heading.mjs
function heading(state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  let ch = state.src.charCodeAt(pos);
  if (ch !== 35 || pos >= max) {
    return false;
  }
  let level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 35 && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }
  if (level > 6 || pos < max && !isSpace(ch)) {
    return false;
  }
  if (silent) {
    return true;
  }
  max = state.skipSpacesBack(max, pos);
  const tmp = state.skipCharsBack(max, 35, pos);
  if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }
  state.line = startLine + 1;
  const token_o = state.push("heading_open", "h" + String(level), 1);
  token_o.markup = "########".slice(0, level);
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = state.src.slice(pos, max).trim();
  token_i.map = [startLine, state.line];
  token_i.children = [];
  const token_c = state.push("heading_close", "h" + String(level), -1);
  token_c.markup = "########".slice(0, level);
  return true;
}

// node_modules/markdown-it/lib/rules_block/lheading.mjs
function lheading(state, startLine, endLine) {
  const terminatorRules = state.md.block.ruler.getRules("paragraph");
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  const oldParentType = state.parentType;
  state.parentType = "paragraph";
  let level = 0;
  let marker;
  let nextLine = startLine + 1;
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      continue;
    }
    if (state.sCount[nextLine] >= state.blkIndent) {
      let pos = state.bMarks[nextLine] + state.tShift[nextLine];
      const max = state.eMarks[nextLine];
      if (pos < max) {
        marker = state.src.charCodeAt(pos);
        if (marker === 45 || marker === 61) {
          pos = state.skipChars(pos, marker);
          pos = state.skipSpaces(pos);
          if (pos >= max) {
            level = marker === 61 ? 1 : 2;
            break;
          }
        }
      }
    }
    if (state.sCount[nextLine] < 0) {
      continue;
    }
    let terminate = false;
    for (let i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
      if (terminatorRules[i2](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
  }
  if (!level) {
    return false;
  }
  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  state.line = nextLine + 1;
  const token_o = state.push("heading_open", "h" + String(level), 1);
  token_o.markup = String.fromCharCode(marker);
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = content;
  token_i.map = [startLine, state.line - 1];
  token_i.children = [];
  const token_c = state.push("heading_close", "h" + String(level), -1);
  token_c.markup = String.fromCharCode(marker);
  state.parentType = oldParentType;
  return true;
}

// node_modules/markdown-it/lib/rules_block/paragraph.mjs
function paragraph(state, startLine, endLine) {
  const terminatorRules = state.md.block.ruler.getRules("paragraph");
  const oldParentType = state.parentType;
  let nextLine = startLine + 1;
  state.parentType = "paragraph";
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      continue;
    }
    if (state.sCount[nextLine] < 0) {
      continue;
    }
    let terminate = false;
    for (let i2 = 0, l = terminatorRules.length; i2 < l; i2++) {
      if (terminatorRules[i2](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }
  }
  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  state.line = nextLine;
  const token_o = state.push("paragraph_open", "p", 1);
  token_o.map = [startLine, state.line];
  const token_i = state.push("inline", "", 0);
  token_i.content = content;
  token_i.map = [startLine, state.line];
  token_i.children = [];
  state.push("paragraph_close", "p", -1);
  state.parentType = oldParentType;
  return true;
}

// node_modules/markdown-it/lib/parser_block.mjs
var _rules2 = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", table, ["paragraph", "reference"]],
  ["code", code],
  ["fence", fence, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", blockquote, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", hr, ["paragraph", "reference", "blockquote", "list"]],
  ["list", list, ["paragraph", "reference", "blockquote"]],
  ["reference", reference],
  ["html_block", html_block, ["paragraph", "reference", "blockquote"]],
  ["heading", heading, ["paragraph", "reference", "blockquote"]],
  ["lheading", lheading],
  ["paragraph", paragraph]
];
function ParserBlock() {
  this.ruler = new ruler_default();
  for (let i2 = 0; i2 < _rules2.length; i2++) {
    this.ruler.push(_rules2[i2][0], _rules2[i2][1], { alt: (_rules2[i2][2] || []).slice() });
  }
}
ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
  const rules = this.ruler.getRules("");
  const len = rules.length;
  const maxNesting = state.md.options.maxNesting;
  let line = startLine;
  let hasEmptyLines = false;
  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) {
      break;
    }
    if (state.sCount[line] < state.blkIndent) {
      break;
    }
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }
    const prevLine = state.line;
    let ok = false;
    for (let i2 = 0; i2 < len; i2++) {
      ok = rules[i2](state, line, endLine, false);
      if (ok) {
        if (prevLine >= state.line) {
          throw new Error("block rule didn't increment state.line");
        }
        break;
      }
    }
    if (!ok)
      throw new Error("none of the block rules matched");
    state.tight = !hasEmptyLines;
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }
    line = state.line;
    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};
ParserBlock.prototype.parse = function(src, md, env, outTokens) {
  if (!src) {
    return;
  }
  const state = new this.State(src, md, env, outTokens);
  this.tokenize(state, state.line, state.lineMax);
};
ParserBlock.prototype.State = state_block_default;
var parser_block_default = ParserBlock;

// node_modules/markdown-it/lib/rules_inline/state_inline.mjs
function StateInline(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;
  this.tokens_meta = Array(outTokens.length);
  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = "";
  this.pendingLevel = 0;
  this.cache = {};
  this.delimiters = [];
  this._prev_delimiters = [];
  this.backticks = {};
  this.backticksScanned = false;
  this.linkLevel = 0;
}
StateInline.prototype.pushPending = function() {
  const token = new token_default("text", "", 0);
  token.content = this.pending;
  token.level = this.pendingLevel;
  this.tokens.push(token);
  this.pending = "";
  return token;
};
StateInline.prototype.push = function(type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }
  const token = new token_default(type, tag, nesting);
  let token_meta = null;
  if (nesting < 0) {
    this.level--;
    this.delimiters = this._prev_delimiters.pop();
  }
  token.level = this.level;
  if (nesting > 0) {
    this.level++;
    this._prev_delimiters.push(this.delimiters);
    this.delimiters = [];
    token_meta = { delimiters: this.delimiters };
  }
  this.pendingLevel = this.level;
  this.tokens.push(token);
  this.tokens_meta.push(token_meta);
  return token;
};
StateInline.prototype.scanDelims = function(start, canSplitWord) {
  let can_open, can_close;
  let left_flanking = true;
  let right_flanking = true;
  const max = this.posMax;
  const marker = this.src.charCodeAt(start);
  const lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 32;
  let pos = start;
  while (pos < max && this.src.charCodeAt(pos) === marker) {
    pos++;
  }
  const count = pos - start;
  const nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
  const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
  const isLastWhiteSpace = isWhiteSpace(lastChar);
  const isNextWhiteSpace = isWhiteSpace(nextChar);
  if (isNextWhiteSpace) {
    left_flanking = false;
  } else if (isNextPunctChar) {
    if (!(isLastWhiteSpace || isLastPunctChar)) {
      left_flanking = false;
    }
  }
  if (isLastWhiteSpace) {
    right_flanking = false;
  } else if (isLastPunctChar) {
    if (!(isNextWhiteSpace || isNextPunctChar)) {
      right_flanking = false;
    }
  }
  if (!canSplitWord) {
    can_open = left_flanking && (!right_flanking || isLastPunctChar);
    can_close = right_flanking && (!left_flanking || isNextPunctChar);
  } else {
    can_open = left_flanking;
    can_close = right_flanking;
  }
  return { can_open, can_close, length: count };
};
StateInline.prototype.Token = token_default;
var state_inline_default = StateInline;

// node_modules/markdown-it/lib/rules_inline/text.mjs
function isTerminatorChar(ch) {
  switch (ch) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}
function text(state, silent) {
  let pos = state.pos;
  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }
  if (pos === state.pos) {
    return false;
  }
  if (!silent) {
    state.pending += state.src.slice(state.pos, pos);
  }
  state.pos = pos;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/linkify.mjs
var SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function linkify2(state, silent) {
  if (!state.md.options.linkify)
    return false;
  if (state.linkLevel > 0)
    return false;
  const pos = state.pos;
  const max = state.posMax;
  if (pos + 3 > max)
    return false;
  if (state.src.charCodeAt(pos) !== 58)
    return false;
  if (state.src.charCodeAt(pos + 1) !== 47)
    return false;
  if (state.src.charCodeAt(pos + 2) !== 47)
    return false;
  const match2 = state.pending.match(SCHEME_RE);
  if (!match2)
    return false;
  const proto = match2[1];
  const link2 = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
  if (!link2)
    return false;
  let url = link2.url;
  if (url.length <= proto.length)
    return false;
  url = url.replace(/\*+$/, "");
  const fullUrl = state.md.normalizeLink(url);
  if (!state.md.validateLink(fullUrl))
    return false;
  if (!silent) {
    state.pending = state.pending.slice(0, -proto.length);
    const token_o = state.push("link_open", "a", 1);
    token_o.attrs = [["href", fullUrl]];
    token_o.markup = "linkify";
    token_o.info = "auto";
    const token_t = state.push("text", "", 0);
    token_t.content = state.md.normalizeLinkText(url);
    const token_c = state.push("link_close", "a", -1);
    token_c.markup = "linkify";
    token_c.info = "auto";
  }
  state.pos += url.length - proto.length;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/newline.mjs
function newline(state, silent) {
  let pos = state.pos;
  if (state.src.charCodeAt(pos) !== 10) {
    return false;
  }
  const pmax = state.pending.length - 1;
  const max = state.posMax;
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
        let ws = pmax - 1;
        while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32)
          ws--;
        state.pending = state.pending.slice(0, ws);
        state.push("hardbreak", "br", 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push("softbreak", "br", 0);
      }
    } else {
      state.push("softbreak", "br", 0);
    }
  }
  pos++;
  while (pos < max && isSpace(state.src.charCodeAt(pos))) {
    pos++;
  }
  state.pos = pos;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/escape.mjs
var ESCAPED = [];
for (let i2 = 0; i2 < 256; i2++) {
  ESCAPED.push(0);
}
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
  ESCAPED[ch.charCodeAt(0)] = 1;
});
function escape2(state, silent) {
  let pos = state.pos;
  const max = state.posMax;
  if (state.src.charCodeAt(pos) !== 92)
    return false;
  pos++;
  if (pos >= max)
    return false;
  let ch1 = state.src.charCodeAt(pos);
  if (ch1 === 10) {
    if (!silent) {
      state.push("hardbreak", "br", 0);
    }
    pos++;
    while (pos < max) {
      ch1 = state.src.charCodeAt(pos);
      if (!isSpace(ch1))
        break;
      pos++;
    }
    state.pos = pos;
    return true;
  }
  let escapedStr = state.src[pos];
  if (ch1 >= 55296 && ch1 <= 56319 && pos + 1 < max) {
    const ch2 = state.src.charCodeAt(pos + 1);
    if (ch2 >= 56320 && ch2 <= 57343) {
      escapedStr += state.src[pos + 1];
      pos++;
    }
  }
  const origStr = "\\" + escapedStr;
  if (!silent) {
    const token = state.push("text_special", "", 0);
    if (ch1 < 256 && ESCAPED[ch1] !== 0) {
      token.content = escapedStr;
    } else {
      token.content = origStr;
    }
    token.markup = origStr;
    token.info = "escape";
  }
  state.pos = pos + 1;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/backticks.mjs
function backtick(state, silent) {
  let pos = state.pos;
  const ch = state.src.charCodeAt(pos);
  if (ch !== 96) {
    return false;
  }
  const start = pos;
  pos++;
  const max = state.posMax;
  while (pos < max && state.src.charCodeAt(pos) === 96) {
    pos++;
  }
  const marker = state.src.slice(start, pos);
  const openerLength = marker.length;
  if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
    if (!silent)
      state.pending += marker;
    state.pos += openerLength;
    return true;
  }
  let matchEnd = pos;
  let matchStart;
  while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
    matchEnd = matchStart + 1;
    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
      matchEnd++;
    }
    const closerLength = matchEnd - matchStart;
    if (closerLength === openerLength) {
      if (!silent) {
        const token = state.push("code_inline", "code", 0);
        token.markup = marker;
        token.content = state.src.slice(pos, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
      }
      state.pos = matchEnd;
      return true;
    }
    state.backticks[closerLength] = matchStart;
  }
  state.backticksScanned = true;
  if (!silent)
    state.pending += marker;
  state.pos += openerLength;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/strikethrough.mjs
function strikethrough_tokenize(state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);
  if (silent) {
    return false;
  }
  if (marker !== 126) {
    return false;
  }
  const scanned = state.scanDelims(state.pos, true);
  let len = scanned.length;
  const ch = String.fromCharCode(marker);
  if (len < 2) {
    return false;
  }
  let token;
  if (len % 2) {
    token = state.push("text", "", 0);
    token.content = ch;
    len--;
  }
  for (let i2 = 0; i2 < len; i2 += 2) {
    token = state.push("text", "", 0);
    token.content = ch + ch;
    state.delimiters.push({
      marker,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });
  }
  state.pos += scanned.length;
  return true;
}
function postProcess(state, delimiters) {
  let token;
  const loneMarkers = [];
  const max = delimiters.length;
  for (let i2 = 0; i2 < max; i2++) {
    const startDelim = delimiters[i2];
    if (startDelim.marker !== 126) {
      continue;
    }
    if (startDelim.end === -1) {
      continue;
    }
    const endDelim = delimiters[startDelim.end];
    token = state.tokens[startDelim.token];
    token.type = "s_open";
    token.tag = "s";
    token.nesting = 1;
    token.markup = "~~";
    token.content = "";
    token = state.tokens[endDelim.token];
    token.type = "s_close";
    token.tag = "s";
    token.nesting = -1;
    token.markup = "~~";
    token.content = "";
    if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") {
      loneMarkers.push(endDelim.token - 1);
    }
  }
  while (loneMarkers.length) {
    const i2 = loneMarkers.pop();
    let j = i2 + 1;
    while (j < state.tokens.length && state.tokens[j].type === "s_close") {
      j++;
    }
    j--;
    if (i2 !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i2];
      state.tokens[i2] = token;
    }
  }
}
function strikethrough_postProcess(state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;
  postProcess(state, state.delimiters);
  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
}
var strikethrough_default = {
  tokenize: strikethrough_tokenize,
  postProcess: strikethrough_postProcess
};

// node_modules/markdown-it/lib/rules_inline/emphasis.mjs
function emphasis_tokenize(state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);
  if (silent) {
    return false;
  }
  if (marker !== 95 && marker !== 42) {
    return false;
  }
  const scanned = state.scanDelims(state.pos, marker === 42);
  for (let i2 = 0; i2 < scanned.length; i2++) {
    const token = state.push("text", "", 0);
    token.content = String.fromCharCode(marker);
    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker,
      // Total length of these series of delimiters.
      //
      length: scanned.length,
      // A position of the token this delimiter corresponds to.
      //
      token: state.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: scanned.can_open,
      close: scanned.can_close
    });
  }
  state.pos += scanned.length;
  return true;
}
function postProcess2(state, delimiters) {
  const max = delimiters.length;
  for (let i2 = max - 1; i2 >= 0; i2--) {
    const startDelim = delimiters[i2];
    if (startDelim.marker !== 95 && startDelim.marker !== 42) {
      continue;
    }
    if (startDelim.end === -1) {
      continue;
    }
    const endDelim = delimiters[startDelim.end];
    const isStrong = i2 > 0 && delimiters[i2 - 1].end === startDelim.end + 1 && // check that first two markers match and adjacent
    delimiters[i2 - 1].marker === startDelim.marker && delimiters[i2 - 1].token === startDelim.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    delimiters[startDelim.end + 1].token === endDelim.token + 1;
    const ch = String.fromCharCode(startDelim.marker);
    const token_o = state.tokens[startDelim.token];
    token_o.type = isStrong ? "strong_open" : "em_open";
    token_o.tag = isStrong ? "strong" : "em";
    token_o.nesting = 1;
    token_o.markup = isStrong ? ch + ch : ch;
    token_o.content = "";
    const token_c = state.tokens[endDelim.token];
    token_c.type = isStrong ? "strong_close" : "em_close";
    token_c.tag = isStrong ? "strong" : "em";
    token_c.nesting = -1;
    token_c.markup = isStrong ? ch + ch : ch;
    token_c.content = "";
    if (isStrong) {
      state.tokens[delimiters[i2 - 1].token].content = "";
      state.tokens[delimiters[startDelim.end + 1].token].content = "";
      i2--;
    }
  }
}
function emphasis_post_process(state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;
  postProcess2(state, state.delimiters);
  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess2(state, tokens_meta[curr].delimiters);
    }
  }
}
var emphasis_default = {
  tokenize: emphasis_tokenize,
  postProcess: emphasis_post_process
};

// node_modules/markdown-it/lib/rules_inline/link.mjs
function link(state, silent) {
  let code2, label, res, ref2;
  let href = "";
  let title = "";
  let start = state.pos;
  let parseReference = true;
  if (state.src.charCodeAt(state.pos) !== 91) {
    return false;
  }
  const oldPos = state.pos;
  const max = state.posMax;
  const labelStart = state.pos + 1;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
  if (labelEnd < 0) {
    return false;
  }
  let pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 40) {
    parseReference = false;
    pos++;
    for (; pos < max; pos++) {
      code2 = state.src.charCodeAt(pos);
      if (!isSpace(code2) && code2 !== 10) {
        break;
      }
    }
    if (pos >= max) {
      return false;
    }
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = "";
      }
      start = pos;
      for (; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (!isSpace(code2) && code2 !== 10) {
          break;
        }
      }
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
      }
    }
    if (pos >= max || state.src.charCodeAt(pos) !== 41) {
      parseReference = true;
    }
    pos++;
  }
  if (parseReference) {
    if (typeof state.env.references === "undefined") {
      return false;
    }
    if (pos < max && state.src.charCodeAt(pos) === 91) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }
    if (!label) {
      label = state.src.slice(labelStart, labelEnd);
    }
    ref2 = state.env.references[normalizeReference(label)];
    if (!ref2) {
      state.pos = oldPos;
      return false;
    }
    href = ref2.href;
    title = ref2.title;
  }
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;
    const token_o = state.push("link_open", "a", 1);
    const attrs = [["href", href]];
    token_o.attrs = attrs;
    if (title) {
      attrs.push(["title", title]);
    }
    state.linkLevel++;
    state.md.inline.tokenize(state);
    state.linkLevel--;
    state.push("link_close", "a", -1);
  }
  state.pos = pos;
  state.posMax = max;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/image.mjs
function image(state, silent) {
  let code2, content, label, pos, ref2, res, title, start;
  let href = "";
  const oldPos = state.pos;
  const max = state.posMax;
  if (state.src.charCodeAt(state.pos) !== 33) {
    return false;
  }
  if (state.src.charCodeAt(state.pos + 1) !== 91) {
    return false;
  }
  const labelStart = state.pos + 2;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
  if (labelEnd < 0) {
    return false;
  }
  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 40) {
    pos++;
    for (; pos < max; pos++) {
      code2 = state.src.charCodeAt(pos);
      if (!isSpace(code2) && code2 !== 10) {
        break;
      }
    }
    if (pos >= max) {
      return false;
    }
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = "";
      }
    }
    start = pos;
    for (; pos < max; pos++) {
      code2 = state.src.charCodeAt(pos);
      if (!isSpace(code2) && code2 !== 10) {
        break;
      }
    }
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;
      for (; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (!isSpace(code2) && code2 !== 10) {
          break;
        }
      }
    } else {
      title = "";
    }
    if (pos >= max || state.src.charCodeAt(pos) !== 41) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    if (typeof state.env.references === "undefined") {
      return false;
    }
    if (pos < max && state.src.charCodeAt(pos) === 91) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }
    if (!label) {
      label = state.src.slice(labelStart, labelEnd);
    }
    ref2 = state.env.references[normalizeReference(label)];
    if (!ref2) {
      state.pos = oldPos;
      return false;
    }
    href = ref2.href;
    title = ref2.title;
  }
  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);
    const tokens = [];
    state.md.inline.parse(
      content,
      state.md,
      state.env,
      tokens
    );
    const token = state.push("image", "img", 0);
    const attrs = [["src", href], ["alt", ""]];
    token.attrs = attrs;
    token.children = tokens;
    token.content = content;
    if (title) {
      attrs.push(["title", title]);
    }
  }
  state.pos = pos;
  state.posMax = max;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/autolink.mjs
var EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function autolink(state, silent) {
  let pos = state.pos;
  if (state.src.charCodeAt(pos) !== 60) {
    return false;
  }
  const start = state.pos;
  const max = state.posMax;
  for (; ; ) {
    if (++pos >= max)
      return false;
    const ch = state.src.charCodeAt(pos);
    if (ch === 60)
      return false;
    if (ch === 62)
      break;
  }
  const url = state.src.slice(start + 1, pos);
  if (AUTOLINK_RE.test(url)) {
    const fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) {
      return false;
    }
    if (!silent) {
      const token_o = state.push("link_open", "a", 1);
      token_o.attrs = [["href", fullUrl]];
      token_o.markup = "autolink";
      token_o.info = "auto";
      const token_t = state.push("text", "", 0);
      token_t.content = state.md.normalizeLinkText(url);
      const token_c = state.push("link_close", "a", -1);
      token_c.markup = "autolink";
      token_c.info = "auto";
    }
    state.pos += url.length + 2;
    return true;
  }
  if (EMAIL_RE.test(url)) {
    const fullUrl = state.md.normalizeLink("mailto:" + url);
    if (!state.md.validateLink(fullUrl)) {
      return false;
    }
    if (!silent) {
      const token_o = state.push("link_open", "a", 1);
      token_o.attrs = [["href", fullUrl]];
      token_o.markup = "autolink";
      token_o.info = "auto";
      const token_t = state.push("text", "", 0);
      token_t.content = state.md.normalizeLinkText(url);
      const token_c = state.push("link_close", "a", -1);
      token_c.markup = "autolink";
      token_c.info = "auto";
    }
    state.pos += url.length + 2;
    return true;
  }
  return false;
}

// node_modules/markdown-it/lib/rules_inline/html_inline.mjs
function isLinkOpen2(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose2(str) {
  return /^<\/a\s*>/i.test(str);
}
function isLetter(ch) {
  const lc = ch | 32;
  return lc >= 97 && lc <= 122;
}
function html_inline(state, silent) {
  if (!state.md.options.html) {
    return false;
  }
  const max = state.posMax;
  const pos = state.pos;
  if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
    return false;
  }
  const ch = state.src.charCodeAt(pos + 1);
  if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) {
    return false;
  }
  const match2 = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match2) {
    return false;
  }
  if (!silent) {
    const token = state.push("html_inline", "", 0);
    token.content = match2[0];
    if (isLinkOpen2(token.content))
      state.linkLevel++;
    if (isLinkClose2(token.content))
      state.linkLevel--;
  }
  state.pos += match2[0].length;
  return true;
}

// node_modules/markdown-it/lib/rules_inline/entity.mjs
var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
function entity(state, silent) {
  const pos = state.pos;
  const max = state.posMax;
  if (state.src.charCodeAt(pos) !== 38)
    return false;
  if (pos + 1 >= max)
    return false;
  const ch = state.src.charCodeAt(pos + 1);
  if (ch === 35) {
    const match2 = state.src.slice(pos).match(DIGITAL_RE);
    if (match2) {
      if (!silent) {
        const code2 = match2[1][0].toLowerCase() === "x" ? parseInt(match2[1].slice(1), 16) : parseInt(match2[1], 10);
        const token = state.push("text_special", "", 0);
        token.content = isValidEntityCode(code2) ? fromCodePoint3(code2) : fromCodePoint3(65533);
        token.markup = match2[0];
        token.info = "entity";
      }
      state.pos += match2[0].length;
      return true;
    }
  } else {
    const match2 = state.src.slice(pos).match(NAMED_RE);
    if (match2) {
      const decoded = decodeHTML(match2[0]);
      if (decoded !== match2[0]) {
        if (!silent) {
          const token = state.push("text_special", "", 0);
          token.content = decoded;
          token.markup = match2[0];
          token.info = "entity";
        }
        state.pos += match2[0].length;
        return true;
      }
    }
  }
  return false;
}

// node_modules/markdown-it/lib/rules_inline/balance_pairs.mjs
function processDelimiters(delimiters) {
  const openersBottom = {};
  const max = delimiters.length;
  if (!max)
    return;
  let headerIdx = 0;
  let lastTokenIdx = -2;
  const jumps = [];
  for (let closerIdx = 0; closerIdx < max; closerIdx++) {
    const closer = delimiters[closerIdx];
    jumps.push(0);
    if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
      headerIdx = closerIdx;
    }
    lastTokenIdx = closer.token;
    closer.length = closer.length || 0;
    if (!closer.close)
      continue;
    if (!openersBottom.hasOwnProperty(closer.marker)) {
      openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
    }
    const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
    let openerIdx = headerIdx - jumps[headerIdx] - 1;
    let newMinOpenerIdx = openerIdx;
    for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
      const opener = delimiters[openerIdx];
      if (opener.marker !== closer.marker)
        continue;
      if (opener.open && opener.end < 0) {
        let isOddMatch = false;
        if (opener.close || closer.open) {
          if ((opener.length + closer.length) % 3 === 0) {
            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
              isOddMatch = true;
            }
          }
        }
        if (!isOddMatch) {
          const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
          jumps[closerIdx] = closerIdx - openerIdx + lastJump;
          jumps[openerIdx] = lastJump;
          closer.open = false;
          opener.end = closerIdx;
          opener.close = false;
          newMinOpenerIdx = -1;
          lastTokenIdx = -2;
          break;
        }
      }
    }
    if (newMinOpenerIdx !== -1) {
      openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
    }
  }
}
function link_pairs(state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;
  processDelimiters(state.delimiters);
  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      processDelimiters(tokens_meta[curr].delimiters);
    }
  }
}

// node_modules/markdown-it/lib/rules_inline/fragments_join.mjs
function fragments_join(state) {
  let curr, last;
  let level = 0;
  const tokens = state.tokens;
  const max = state.tokens.length;
  for (curr = last = 0; curr < max; curr++) {
    if (tokens[curr].nesting < 0)
      level--;
    tokens[curr].level = level;
    if (tokens[curr].nesting > 0)
      level++;
    if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    } else {
      if (curr !== last) {
        tokens[last] = tokens[curr];
      }
      last++;
    }
  }
  if (curr !== last) {
    tokens.length = last;
  }
}

// node_modules/markdown-it/lib/parser_inline.mjs
var _rules3 = [
  ["text", text],
  ["linkify", linkify2],
  ["newline", newline],
  ["escape", escape2],
  ["backticks", backtick],
  ["strikethrough", strikethrough_default.tokenize],
  ["emphasis", emphasis_default.tokenize],
  ["link", link],
  ["image", image],
  ["autolink", autolink],
  ["html_inline", html_inline],
  ["entity", entity]
];
var _rules22 = [
  ["balance_pairs", link_pairs],
  ["strikethrough", strikethrough_default.postProcess],
  ["emphasis", emphasis_default.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", fragments_join]
];
function ParserInline() {
  this.ruler = new ruler_default();
  for (let i2 = 0; i2 < _rules3.length; i2++) {
    this.ruler.push(_rules3[i2][0], _rules3[i2][1]);
  }
  this.ruler2 = new ruler_default();
  for (let i2 = 0; i2 < _rules22.length; i2++) {
    this.ruler2.push(_rules22[i2][0], _rules22[i2][1]);
  }
}
ParserInline.prototype.skipToken = function(state) {
  const pos = state.pos;
  const rules = this.ruler.getRules("");
  const len = rules.length;
  const maxNesting = state.md.options.maxNesting;
  const cache = state.cache;
  if (typeof cache[pos] !== "undefined") {
    state.pos = cache[pos];
    return;
  }
  let ok = false;
  if (state.level < maxNesting) {
    for (let i2 = 0; i2 < len; i2++) {
      state.level++;
      ok = rules[i2](state, true);
      state.level--;
      if (ok) {
        if (pos >= state.pos) {
          throw new Error("inline rule didn't increment state.pos");
        }
        break;
      }
    }
  } else {
    state.pos = state.posMax;
  }
  if (!ok) {
    state.pos++;
  }
  cache[pos] = state.pos;
};
ParserInline.prototype.tokenize = function(state) {
  const rules = this.ruler.getRules("");
  const len = rules.length;
  const end = state.posMax;
  const maxNesting = state.md.options.maxNesting;
  while (state.pos < end) {
    const prevPos = state.pos;
    let ok = false;
    if (state.level < maxNesting) {
      for (let i2 = 0; i2 < len; i2++) {
        ok = rules[i2](state, false);
        if (ok) {
          if (prevPos >= state.pos) {
            throw new Error("inline rule didn't increment state.pos");
          }
          break;
        }
      }
    }
    if (ok) {
      if (state.pos >= end) {
        break;
      }
      continue;
    }
    state.pending += state.src[state.pos++];
  }
  if (state.pending) {
    state.pushPending();
  }
};
ParserInline.prototype.parse = function(str, md, env, outTokens) {
  const state = new this.State(str, md, env, outTokens);
  this.tokenize(state);
  const rules = this.ruler2.getRules("");
  const len = rules.length;
  for (let i2 = 0; i2 < len; i2++) {
    rules[i2](state);
  }
};
ParserInline.prototype.State = state_inline_default;
var parser_inline_default = ParserInline;

// node_modules/linkify-it/lib/re.mjs
function re_default(opts) {
  const re = {};
  opts = opts || {};
  re.src_Any = regex_default.source;
  re.src_Cc = regex_default2.source;
  re.src_Z = regex_default6.source;
  re.src_P = regex_default4.source;
  re.src_ZPCc = [re.src_Z, re.src_P, re.src_Cc].join("|");
  re.src_ZCc = [re.src_Z, re.src_Cc].join("|");
  const text_separators = "[><｜]";
  re.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re.src_ZPCc + ")" + re.src_Any + ")";
  re.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
  re.src_auth = "(?:(?:(?!" + re.src_ZCc + "|[@/\\[\\]()]).)+@)?";
  re.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
  re.src_host_terminator = "(?=$|" + text_separators + "|" + re.src_ZPCc + ")(?!" + (opts["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + re.src_ZPCc + "))";
  re.src_path = "(?:[/?#](?:(?!" + re.src_ZCc + "|" + text_separators + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + re.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + re.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + re.src_ZCc + "|[']).)+\\'|\\'(?=" + re.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + re.src_ZCc + "|[.]|$)|" + (opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
  ",(?!" + re.src_ZCc + "|$)|;(?!" + re.src_ZCc + "|$)|\\!+(?!" + re.src_ZCc + "|[!]|$)|\\?(?!" + re.src_ZCc + "|[?]|$))+|\\/)?";
  re.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
  re.src_xn = "xn--[a-z0-9\\-]{1,59}";
  re.src_domain_root = // Allow letters & digits (http://test1)
  "(?:" + re.src_xn + "|" + re.src_pseudo_letter + "{1,63})";
  re.src_domain = "(?:" + re.src_xn + "|(?:" + re.src_pseudo_letter + ")|(?:" + re.src_pseudo_letter + "(?:-|" + re.src_pseudo_letter + "){0,61}" + re.src_pseudo_letter + "))";
  re.src_host = "(?:(?:(?:(?:" + re.src_domain + ")\\.)*" + re.src_domain + "))";
  re.tpl_host_fuzzy = "(?:" + re.src_ip4 + "|(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%)))";
  re.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%))";
  re.src_host_strict = re.src_host + re.src_host_terminator;
  re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
  re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
  re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
  re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;
  re.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re.src_ZPCc + "|>|$))";
  re.tpl_email_fuzzy = "(^|" + text_separators + '|"|\\(|' + re.src_ZCc + ")(" + re.src_email_name + "@" + re.tpl_host_fuzzy_strict + ")";
  re.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re.src_ZPCc + "))((?![$+<=>^`|｜])" + re.tpl_host_port_fuzzy_strict + re.src_path + ")";
  re.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re.src_ZPCc + "))((?![$+<=>^`|｜])" + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ")";
  return re;
}

// node_modules/linkify-it/index.mjs
function assign2(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function(source) {
    if (!source) {
      return;
    }
    Object.keys(source).forEach(function(key) {
      obj[key] = source[key];
    });
  });
  return obj;
}
function _class2(obj) {
  return Object.prototype.toString.call(obj);
}
function isString2(obj) {
  return _class2(obj) === "[object String]";
}
function isObject(obj) {
  return _class2(obj) === "[object Object]";
}
function isRegExp(obj) {
  return _class2(obj) === "[object RegExp]";
}
function isFunction(obj) {
  return _class2(obj) === "[object Function]";
}
function escapeRE2(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};
function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function(acc, k2) {
    return acc || defaultOptions.hasOwnProperty(k2);
  }, false);
}
var defaultSchemas = {
  "http:": {
    validate: function(text2, pos, self2) {
      const tail = text2.slice(pos);
      if (!self2.re.http) {
        self2.re.http = new RegExp(
          "^\\/\\/" + self2.re.src_auth + self2.re.src_host_port_strict + self2.re.src_path,
          "i"
        );
      }
      if (self2.re.http.test(tail)) {
        return tail.match(self2.re.http)[0].length;
      }
      return 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(text2, pos, self2) {
      const tail = text2.slice(pos);
      if (!self2.re.no_http) {
        self2.re.no_http = new RegExp(
          "^" + self2.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          "(?:localhost|(?:(?:" + self2.re.src_domain + ")\\.)+" + self2.re.src_domain_root + ")" + self2.re.src_port + self2.re.src_host_terminator + self2.re.src_path,
          "i"
        );
      }
      if (self2.re.no_http.test(tail)) {
        if (pos >= 3 && text2[pos - 3] === ":") {
          return 0;
        }
        if (pos >= 3 && text2[pos - 3] === "/") {
          return 0;
        }
        return tail.match(self2.re.no_http)[0].length;
      }
      return 0;
    }
  },
  "mailto:": {
    validate: function(text2, pos, self2) {
      const tail = text2.slice(pos);
      if (!self2.re.mailto) {
        self2.re.mailto = new RegExp(
          "^" + self2.re.src_email_name + "@" + self2.re.src_host_strict,
          "i"
        );
      }
      if (self2.re.mailto.test(tail)) {
        return tail.match(self2.re.mailto)[0].length;
      }
      return 0;
    }
  }
};
var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function resetScanCache(self2) {
  self2.__index__ = -1;
  self2.__text_cache__ = "";
}
function createValidator(re) {
  return function(text2, pos) {
    const tail = text2.slice(pos);
    if (re.test(tail)) {
      return tail.match(re)[0].length;
    }
    return 0;
  };
}
function createNormalizer() {
  return function(match2, self2) {
    self2.normalize(match2);
  };
}
function compile(self2) {
  const re = self2.re = re_default(self2.__opts__);
  const tlds2 = self2.__tlds__.slice();
  self2.onCompile();
  if (!self2.__tlds_replaced__) {
    tlds2.push(tlds_2ch_src_re);
  }
  tlds2.push(re.src_xn);
  re.src_tlds = tlds2.join("|");
  function untpl(tpl) {
    return tpl.replace("%TLDS%", re.src_tlds);
  }
  re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), "i");
  re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), "i");
  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "i");
  re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), "i");
  const aliases = [];
  self2.__compiled__ = {};
  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }
  Object.keys(self2.__schemas__).forEach(function(name) {
    const val = self2.__schemas__[name];
    if (val === null) {
      return;
    }
    const compiled = { validate: null, link: null };
    self2.__compiled__[name] = compiled;
    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }
      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }
      return;
    }
    if (isString2(val)) {
      aliases.push(name);
      return;
    }
    schemaError(name, val);
  });
  aliases.forEach(function(alias) {
    if (!self2.__compiled__[self2.__schemas__[alias]]) {
      return;
    }
    self2.__compiled__[alias].validate = self2.__compiled__[self2.__schemas__[alias]].validate;
    self2.__compiled__[alias].normalize = self2.__compiled__[self2.__schemas__[alias]].normalize;
  });
  self2.__compiled__[""] = { validate: null, normalize: createNormalizer() };
  const slist = Object.keys(self2.__compiled__).filter(function(name) {
    return name.length > 0 && self2.__compiled__[name];
  }).map(escapeRE2).join("|");
  self2.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + re.src_ZPCc + "))(" + slist + ")", "i");
  self2.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + re.src_ZPCc + "))(" + slist + ")", "ig");
  self2.re.schema_at_start = RegExp("^" + self2.re.schema_search.source, "i");
  self2.re.pretest = RegExp(
    "(" + self2.re.schema_test.source + ")|(" + self2.re.host_fuzzy_test.source + ")|@",
    "i"
  );
  resetScanCache(self2);
}
function Match(self2, shift) {
  const start = self2.__index__;
  const end = self2.__last_index__;
  const text2 = self2.__text_cache__.slice(start, end);
  this.schema = self2.__schema__.toLowerCase();
  this.index = start + shift;
  this.lastIndex = end + shift;
  this.raw = text2;
  this.text = text2;
  this.url = text2;
}
function createMatch(self2, shift) {
  const match2 = new Match(self2, shift);
  self2.__compiled__[match2.schema].normalize(match2, self2);
  return match2;
}
function LinkifyIt(schemas, options) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options);
  }
  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }
  this.__opts__ = assign2({}, defaultOptions, options);
  this.__index__ = -1;
  this.__last_index__ = -1;
  this.__schema__ = "";
  this.__text_cache__ = "";
  this.__schemas__ = assign2({}, defaultSchemas, schemas);
  this.__compiled__ = {};
  this.__tlds__ = tlds_default;
  this.__tlds_replaced__ = false;
  this.re = {};
  compile(this);
}
LinkifyIt.prototype.add = function add2(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};
LinkifyIt.prototype.set = function set(options) {
  this.__opts__ = assign2(this.__opts__, options);
  return this;
};
LinkifyIt.prototype.test = function test(text2) {
  this.__text_cache__ = text2;
  this.__index__ = -1;
  if (!text2.length) {
    return false;
  }
  let m, ml, me, len, shift, next, re, tld_pos, at_pos;
  if (this.re.schema_test.test(text2)) {
    re = this.re.schema_search;
    re.lastIndex = 0;
    while ((m = re.exec(text2)) !== null) {
      len = this.testSchemaAt(text2, m[2], re.lastIndex);
      if (len) {
        this.__schema__ = m[2];
        this.__index__ = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }
  if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
    tld_pos = text2.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text2.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
          shift = ml.index + ml[1].length;
          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__ = "";
            this.__index__ = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }
  if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
    at_pos = text2.indexOf("@");
    if (at_pos >= 0) {
      if ((me = text2.match(this.re.email_fuzzy)) !== null) {
        shift = me.index + me[1].length;
        next = me.index + me[0].length;
        if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
          this.__schema__ = "mailto:";
          this.__index__ = shift;
          this.__last_index__ = next;
        }
      }
    }
  }
  return this.__index__ >= 0;
};
LinkifyIt.prototype.pretest = function pretest(text2) {
  return this.re.pretest.test(text2);
};
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text2, schema, pos) {
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0;
  }
  return this.__compiled__[schema.toLowerCase()].validate(text2, pos, this);
};
LinkifyIt.prototype.match = function match(text2) {
  const result = [];
  let shift = 0;
  if (this.__index__ >= 0 && this.__text_cache__ === text2) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }
  let tail = shift ? text2.slice(shift) : text2;
  while (this.test(tail)) {
    result.push(createMatch(this, shift));
    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }
  if (result.length) {
    return result;
  }
  return null;
};
LinkifyIt.prototype.matchAtStart = function matchAtStart(text2) {
  this.__text_cache__ = text2;
  this.__index__ = -1;
  if (!text2.length)
    return null;
  const m = this.re.schema_at_start.exec(text2);
  if (!m)
    return null;
  const len = this.testSchemaAt(text2, m[2], m[0].length);
  if (!len)
    return null;
  this.__schema__ = m[2];
  this.__index__ = m.index + m[1].length;
  this.__last_index__ = m.index + m[0].length + len;
  return createMatch(this, 0);
};
LinkifyIt.prototype.tlds = function tlds(list2, keepOld) {
  list2 = Array.isArray(list2) ? list2 : [list2];
  if (!keepOld) {
    this.__tlds__ = list2.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }
  this.__tlds__ = this.__tlds__.concat(list2).sort().filter(function(el, idx, arr) {
    return el !== arr[idx - 1];
  }).reverse();
  compile(this);
  return this;
};
LinkifyIt.prototype.normalize = function normalize2(match2) {
  if (!match2.schema) {
    match2.url = "http://" + match2.url;
  }
  if (match2.schema === "mailto:" && !/^mailto:/i.test(match2.url)) {
    match2.url = "mailto:" + match2.url;
  }
};
LinkifyIt.prototype.onCompile = function onCompile() {
};
var linkify_it_default = LinkifyIt;

// node_modules/punycode.js/punycode.es6.js
var maxInt = 2147483647;
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128;
var delimiter = "-";
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7F]/;
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
var errors = {
  "overflow": "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
};
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;
function error(type) {
  throw new RangeError(errors[type]);
}
function map(array, callback) {
  const result = [];
  let length = array.length;
  while (length--) {
    result[length] = callback(array[length]);
  }
  return result;
}
function mapDomain(domain, callback) {
  const parts = domain.split("@");
  let result = "";
  if (parts.length > 1) {
    result = parts[0] + "@";
    domain = parts[1];
  }
  domain = domain.replace(regexSeparators, ".");
  const labels = domain.split(".");
  const encoded = map(labels, callback).join(".");
  return result + encoded;
}
function ucs2decode(string) {
  const output = [];
  let counter = 0;
  const length = string.length;
  while (counter < length) {
    const value = string.charCodeAt(counter++);
    if (value >= 55296 && value <= 56319 && counter < length) {
      const extra = string.charCodeAt(counter++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
var ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
var basicToDigit = function(codePoint) {
  if (codePoint >= 48 && codePoint < 58) {
    return 26 + (codePoint - 48);
  }
  if (codePoint >= 65 && codePoint < 91) {
    return codePoint - 65;
  }
  if (codePoint >= 97 && codePoint < 123) {
    return codePoint - 97;
  }
  return base;
};
var digitToBasic = function(digit, flag) {
  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};
var adapt = function(delta, numPoints, firstTime) {
  let k2 = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k2 += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k2 + (baseMinusTMin + 1) * delta / (delta + skew));
};
var decode2 = function(input) {
  const output = [];
  const inputLength = input.length;
  let i2 = 0;
  let n2 = initialN;
  let bias = initialBias;
  let basic = input.lastIndexOf(delimiter);
  if (basic < 0) {
    basic = 0;
  }
  for (let j = 0; j < basic; ++j) {
    if (input.charCodeAt(j) >= 128) {
      error("not-basic");
    }
    output.push(input.charCodeAt(j));
  }
  for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
    const oldi = i2;
    for (let w = 1, k2 = base; ; k2 += base) {
      if (index >= inputLength) {
        error("invalid-input");
      }
      const digit = basicToDigit(input.charCodeAt(index++));
      if (digit >= base) {
        error("invalid-input");
      }
      if (digit > floor((maxInt - i2) / w)) {
        error("overflow");
      }
      i2 += digit * w;
      const t2 = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
      if (digit < t2) {
        break;
      }
      const baseMinusT = base - t2;
      if (w > floor(maxInt / baseMinusT)) {
        error("overflow");
      }
      w *= baseMinusT;
    }
    const out = output.length + 1;
    bias = adapt(i2 - oldi, out, oldi == 0);
    if (floor(i2 / out) > maxInt - n2) {
      error("overflow");
    }
    n2 += floor(i2 / out);
    i2 %= out;
    output.splice(i2++, 0, n2);
  }
  return String.fromCodePoint(...output);
};
var encode2 = function(input) {
  const output = [];
  input = ucs2decode(input);
  const inputLength = input.length;
  let n2 = initialN;
  let delta = 0;
  let bias = initialBias;
  for (const currentValue of input) {
    if (currentValue < 128) {
      output.push(stringFromCharCode(currentValue));
    }
  }
  const basicLength = output.length;
  let handledCPCount = basicLength;
  if (basicLength) {
    output.push(delimiter);
  }
  while (handledCPCount < inputLength) {
    let m = maxInt;
    for (const currentValue of input) {
      if (currentValue >= n2 && currentValue < m) {
        m = currentValue;
      }
    }
    const handledCPCountPlusOne = handledCPCount + 1;
    if (m - n2 > floor((maxInt - delta) / handledCPCountPlusOne)) {
      error("overflow");
    }
    delta += (m - n2) * handledCPCountPlusOne;
    n2 = m;
    for (const currentValue of input) {
      if (currentValue < n2 && ++delta > maxInt) {
        error("overflow");
      }
      if (currentValue === n2) {
        let q = delta;
        for (let k2 = base; ; k2 += base) {
          const t2 = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
          if (q < t2) {
            break;
          }
          const qMinusT = q - t2;
          const baseMinusT = base - t2;
          output.push(
            stringFromCharCode(digitToBasic(t2 + qMinusT % baseMinusT, 0))
          );
          q = floor(qMinusT / baseMinusT);
        }
        output.push(stringFromCharCode(digitToBasic(q, 0)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }
    ++delta;
    ++n2;
  }
  return output.join("");
};
var toUnicode = function(input) {
  return mapDomain(input, function(string) {
    return regexPunycode.test(string) ? decode2(string.slice(4).toLowerCase()) : string;
  });
};
var toASCII = function(input) {
  return mapDomain(input, function(string) {
    return regexNonASCII.test(string) ? "xn--" + encode2(string) : string;
  });
};
var punycode = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  "version": "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  "ucs2": {
    "decode": ucs2decode,
    "encode": ucs2encode
  },
  "decode": decode2,
  "encode": encode2,
  "toASCII": toASCII,
  "toUnicode": toUnicode
};
var punycode_es6_default = punycode;

// node_modules/markdown-it/lib/presets/default.mjs
var default_default = {
  options: {
    // Enable HTML tags in source
    html: false,
    // Use '/' to close single tags (<br />)
    xhtmlOut: false,
    // Convert '\n' in paragraphs into <br>
    breaks: false,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: false,
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 100
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
};

// node_modules/markdown-it/lib/presets/zero.mjs
var zero_default = {
  options: {
    // Enable HTML tags in source
    html: false,
    // Use '/' to close single tags (<br />)
    xhtmlOut: false,
    // Convert '\n' in paragraphs into <br>
    breaks: false,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: false,
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
};

// node_modules/markdown-it/lib/presets/commonmark.mjs
var commonmark_default = {
  options: {
    // Enable HTML tags in source
    html: true,
    // Use '/' to close single tags (<br />)
    xhtmlOut: true,
    // Convert '\n' in paragraphs into <br>
    breaks: false,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: false,
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
};

// node_modules/markdown-it/lib/index.mjs
var config2 = {
  default: default_default,
  zero: zero_default,
  commonmark: commonmark_default
};
var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
function validateLink(url) {
  const str = url.trim().toLowerCase();
  return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true;
}
var RECODE_HOSTNAME_FOR = ["http:", "https:", "mailto:"];
function normalizeLink(url) {
  const parsed = parse_default(url, true);
  if (parsed.hostname) {
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode_es6_default.toASCII(parsed.hostname);
      } catch (er) {
      }
    }
  }
  return encode_default(format(parsed));
}
function normalizeLinkText(url) {
  const parsed = parse_default(url, true);
  if (parsed.hostname) {
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode_es6_default.toUnicode(parsed.hostname);
      } catch (er) {
      }
    }
  }
  return decode_default(format(parsed), decode_default.defaultChars + "%");
}
function MarkdownIt(presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options);
  }
  if (!options) {
    if (!isString(presetName)) {
      options = presetName || {};
      presetName = "default";
    }
  }
  this.inline = new parser_inline_default();
  this.block = new parser_block_default();
  this.core = new parser_core_default();
  this.renderer = new renderer_default();
  this.linkify = new linkify_it_default();
  this.validateLink = validateLink;
  this.normalizeLink = normalizeLink;
  this.normalizeLinkText = normalizeLinkText;
  this.utils = utils_exports;
  this.helpers = assign({}, helpers_exports);
  this.options = {};
  this.configure(presetName);
  if (options) {
    this.set(options);
  }
}
MarkdownIt.prototype.set = function(options) {
  assign(this.options, options);
  return this;
};
MarkdownIt.prototype.configure = function(presets) {
  const self2 = this;
  if (isString(presets)) {
    const presetName = presets;
    presets = config2[presetName];
    if (!presets) {
      throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
    }
  }
  if (!presets) {
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  }
  if (presets.options) {
    self2.set(presets.options);
  }
  if (presets.components) {
    Object.keys(presets.components).forEach(function(name) {
      if (presets.components[name].rules) {
        self2[name].ruler.enableOnly(presets.components[name].rules);
      }
      if (presets.components[name].rules2) {
        self2[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }
  return this;
};
MarkdownIt.prototype.enable = function(list2, ignoreInvalid) {
  let result = [];
  if (!Array.isArray(list2)) {
    list2 = [list2];
  }
  ["core", "block", "inline"].forEach(function(chain) {
    result = result.concat(this[chain].ruler.enable(list2, true));
  }, this);
  result = result.concat(this.inline.ruler2.enable(list2, true));
  const missed = list2.filter(function(name) {
    return result.indexOf(name) < 0;
  });
  if (missed.length && !ignoreInvalid) {
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
  }
  return this;
};
MarkdownIt.prototype.disable = function(list2, ignoreInvalid) {
  let result = [];
  if (!Array.isArray(list2)) {
    list2 = [list2];
  }
  ["core", "block", "inline"].forEach(function(chain) {
    result = result.concat(this[chain].ruler.disable(list2, true));
  }, this);
  result = result.concat(this.inline.ruler2.disable(list2, true));
  const missed = list2.filter(function(name) {
    return result.indexOf(name) < 0;
  });
  if (missed.length && !ignoreInvalid) {
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
  }
  return this;
};
MarkdownIt.prototype.use = function(plugin) {
  const args = [this].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};
MarkdownIt.prototype.parse = function(src, env) {
  if (typeof src !== "string") {
    throw new Error("Input data should be a String");
  }
  const state = new this.core.State(src, this, env);
  this.core.process(state);
  return state.tokens;
};
MarkdownIt.prototype.render = function(src, env) {
  env = env || {};
  return this.renderer.render(this.parse(src, env), this.options, env);
};
MarkdownIt.prototype.parseInline = function(src, env) {
  const state = new this.core.State(src, this, env);
  state.inlineMode = true;
  this.core.process(state);
  return state.tokens;
};
MarkdownIt.prototype.renderInline = function(src, env) {
  env = env || {};
  return this.renderer.render(this.parseInline(src, env), this.options, env);
};
var lib_default = MarkdownIt;

// node_modules/markdown-it-image-figures/dist/markdown-it-images-figures.mjs
var t = /* @__PURE__ */ new Set([true, false, "alt", "title"]);
function e(t2, e2) {
  return (Array.isArray(t2) ? t2 : []).filter(([t3]) => t3 !== e2);
}
function n(t2, n2) {
  t2 && t2.attrs && (t2.attrs = e(t2.attrs, n2));
}
function i(e2, i2) {
  if (!t.has(e2))
    throw new TypeError(`figcaption must be one of: ${[...t]}.`);
  if ("alt" === e2)
    return i2.content;
  const r2 = i2.attrs.find(([t2]) => "title" === t2);
  return Array.isArray(r2) && r2[1] ? (n(i2, "title"), r2[1]) : void 0;
}
function r(t2, r2) {
  r2 = r2 || {}, t2.core.ruler.before("linkify", "image_figures", function(s) {
    let a = 1;
    for (let o = 1, c = s.tokens.length; o < c - 1; ++o) {
      const l = s.tokens[o];
      if ("inline" !== l.type)
        continue;
      if (!l.children || 1 !== l.children.length && 3 !== l.children.length)
        continue;
      if (1 === l.children.length && "image" !== l.children[0].type)
        continue;
      if (3 === l.children.length) {
        const [t3, e2, n2] = l.children;
        if ("link_open" !== t3.type || "image" !== e2.type || "link_close" !== n2.type)
          continue;
      }
      if (0 !== o && "paragraph_open" !== s.tokens[o - 1].type)
        continue;
      if (o !== c - 1 && "paragraph_close" !== s.tokens[o + 1].type)
        continue;
      const f = s.tokens[o - 1];
      let h2;
      if (f.type = "figure_open", f.tag = "figure", s.tokens[o + 1].type = "figure_close", s.tokens[o + 1].tag = "figure", r2.dataType && s.tokens[o - 1].attrPush(["data-type", "image"]), r2.link && 1 === l.children.length) {
        [h2] = l.children;
        const t3 = new s.Token("link_open", "a", 1);
        t3.attrPush(["href", h2.attrGet("src")]), l.children.unshift(t3), l.children.push(new s.Token("link_close", "a", -1));
      }
      if (h2 = 1 === l.children.length ? l.children[0] : l.children[1], r2.figcaption) {
        const n2 = i(r2.figcaption, h2);
        if (n2) {
          const [i2] = t2.parseInline(n2, s.env);
          l.children.push(new s.Token("figcaption_open", "figcaption", 1)), l.children.push(...i2.children), l.children.push(new s.Token("figcaption_close", "figcaption", -1)), h2.attrs && (h2.attrs = e(h2.attrs, "title"));
        }
      }
      if (r2.copyAttrs && h2.attrs) {
        const t3 = true === r2.copyAttrs ? "" : r2.copyAttrs;
        f.attrs = h2.attrs.filter(([e2]) => e2.match(t3)).map((t4) => Array.from(t4));
      }
      if (r2.tabindex && (s.tokens[o - 1].attrPush(["tabindex", a]), a++), r2.lazy && (h2.attrs.some(([t3]) => "loading" === t3) || h2.attrs.push(["loading", "lazy"])), r2.async && (h2.attrs.some(([t3]) => "decoding" === t3) || h2.attrs.push(["decoding", "async"])), r2.classes && "string" == typeof r2.classes) {
        let t3 = false;
        for (let e2 = 0, n2 = h2.attrs.length; e2 < n2 && !t3; e2++) {
          const n3 = h2.attrs[e2];
          "class" === n3[0] && (n3[1] = `${n3[1]} ${r2.classes}`, t3 = true);
        }
        t3 || h2.attrs.push(["class", r2.classes]);
      }
      if (r2.removeSrc) {
        const t3 = h2.attrs.find(([t4]) => "src" === t4);
        h2.attrs.push(["data-src", t3[1]]), n(h2, "src");
      }
    }
  });
}

// node_modules/md-editor-v3/lib/es/chunks/index.mjs
var import_markdown_it_task_lists = __toESM(require_markdown_it_task_lists(), 1);
var import_markdown_it_xss = __toESM(require_markdown_it_xss(), 1);

// node_modules/lru-cache/dist/esm/index.js
var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
var warned = /* @__PURE__ */ new Set();
var PROCESS = typeof process === "object" && !!process ? process : {};
var emitWarning = (msg, type, code2, fn) => {
  typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type, code2, fn) : console.error(`[${code2}] ${type}: ${msg}`);
};
var AC = globalThis.AbortController;
var AS = globalThis.AbortSignal;
var _a2;
if (typeof AC === "undefined") {
  AS = class AbortSignal {
    constructor() {
      __publicField(this, "onabort");
      __publicField(this, "_onabort", []);
      __publicField(this, "reason");
      __publicField(this, "aborted", false);
    }
    addEventListener(_, fn) {
      this._onabort.push(fn);
    }
  };
  AC = class AbortController {
    constructor() {
      __publicField(this, "signal", new AS());
      warnACPolyfill();
    }
    abort(reason) {
      var _a4, _b;
      if (this.signal.aborted)
        return;
      this.signal.reason = reason;
      this.signal.aborted = true;
      for (const fn of this.signal._onabort) {
        fn(reason);
      }
      (_b = (_a4 = this.signal).onabort) == null ? void 0 : _b.call(_a4, reason);
    }
  };
  let printACPolyfillWarning = ((_a2 = PROCESS.env) == null ? void 0 : _a2.LRU_CACHE_IGNORE_AC_WARNING) !== "1";
  const warnACPolyfill = () => {
    if (!printACPolyfillWarning)
      return;
    printACPolyfillWarning = false;
    emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
  };
}
var shouldWarn = (code2) => !warned.has(code2);
var TYPE = Symbol("type");
var isPosInt = (n2) => n2 && n2 === Math.floor(n2) && n2 > 0 && isFinite(n2);
var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
var ZeroArray = class extends Array {
  constructor(size) {
    super(size);
    this.fill(0);
  }
};
var _constructing;
var _Stack = class _Stack {
  constructor(max, HeapCls) {
    __publicField(this, "heap");
    __publicField(this, "length");
    if (!__privateGet(_Stack, _constructing)) {
      throw new TypeError("instantiate Stack using Stack.create(n)");
    }
    this.heap = new HeapCls(max);
    this.length = 0;
  }
  static create(max) {
    const HeapCls = getUintArray(max);
    if (!HeapCls)
      return [];
    __privateSet(_Stack, _constructing, true);
    const s = new _Stack(max, HeapCls);
    __privateSet(_Stack, _constructing, false);
    return s;
  }
  push(n2) {
    this.heap[this.length++] = n2;
  }
  pop() {
    return this.heap[--this.length];
  }
};
_constructing = new WeakMap();
// private constructor
__privateAdd(_Stack, _constructing, false);
var Stack = _Stack;
var _max, _maxSize, _dispose, _disposeAfter, _fetchMethod, _size, _calculatedSize, _keyMap, _keyList, _valList, _next, _prev, _head, _tail, _free, _disposed, _sizes, _starts, _ttls, _hasDispose, _hasFetchMethod, _hasDisposeAfter, _initializeTTLTracking, initializeTTLTracking_fn, _updateItemAge, _statusTTL, _setItemTTL, _isStale, _initializeSizeTracking, initializeSizeTracking_fn, _removeItemSize, _addItemSize, _requireSize, _indexes, indexes_fn, _rindexes, rindexes_fn, _isValidIndex, isValidIndex_fn, _a3, _evict, evict_fn, _backgroundFetch, backgroundFetch_fn, _isBackgroundFetch, isBackgroundFetch_fn, _connect, connect_fn, _moveToTail, moveToTail_fn;
var _LRUCache = class _LRUCache {
  constructor(options) {
    __privateAdd(this, _initializeTTLTracking);
    __privateAdd(this, _initializeSizeTracking);
    __privateAdd(this, _indexes);
    __privateAdd(this, _rindexes);
    __privateAdd(this, _isValidIndex);
    __privateAdd(this, _evict);
    __privateAdd(this, _backgroundFetch);
    __privateAdd(this, _isBackgroundFetch);
    __privateAdd(this, _connect);
    __privateAdd(this, _moveToTail);
    // properties coming in from the options of these, only max and maxSize
    // really *need* to be protected. The rest can be modified, as they just
    // set defaults for various methods.
    __privateAdd(this, _max, void 0);
    __privateAdd(this, _maxSize, void 0);
    __privateAdd(this, _dispose, void 0);
    __privateAdd(this, _disposeAfter, void 0);
    __privateAdd(this, _fetchMethod, void 0);
    /**
     * {@link LRUCache.OptionsBase.ttl}
     */
    __publicField(this, "ttl");
    /**
     * {@link LRUCache.OptionsBase.ttlResolution}
     */
    __publicField(this, "ttlResolution");
    /**
     * {@link LRUCache.OptionsBase.ttlAutopurge}
     */
    __publicField(this, "ttlAutopurge");
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnGet}
     */
    __publicField(this, "updateAgeOnGet");
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnHas}
     */
    __publicField(this, "updateAgeOnHas");
    /**
     * {@link LRUCache.OptionsBase.allowStale}
     */
    __publicField(this, "allowStale");
    /**
     * {@link LRUCache.OptionsBase.noDisposeOnSet}
     */
    __publicField(this, "noDisposeOnSet");
    /**
     * {@link LRUCache.OptionsBase.noUpdateTTL}
     */
    __publicField(this, "noUpdateTTL");
    /**
     * {@link LRUCache.OptionsBase.maxEntrySize}
     */
    __publicField(this, "maxEntrySize");
    /**
     * {@link LRUCache.OptionsBase.sizeCalculation}
     */
    __publicField(this, "sizeCalculation");
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
     */
    __publicField(this, "noDeleteOnFetchRejection");
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
     */
    __publicField(this, "noDeleteOnStaleGet");
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
     */
    __publicField(this, "allowStaleOnFetchAbort");
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
     */
    __publicField(this, "allowStaleOnFetchRejection");
    /**
     * {@link LRUCache.OptionsBase.ignoreFetchAbort}
     */
    __publicField(this, "ignoreFetchAbort");
    // computed properties
    __privateAdd(this, _size, void 0);
    __privateAdd(this, _calculatedSize, void 0);
    __privateAdd(this, _keyMap, void 0);
    __privateAdd(this, _keyList, void 0);
    __privateAdd(this, _valList, void 0);
    __privateAdd(this, _next, void 0);
    __privateAdd(this, _prev, void 0);
    __privateAdd(this, _head, void 0);
    __privateAdd(this, _tail, void 0);
    __privateAdd(this, _free, void 0);
    __privateAdd(this, _disposed, void 0);
    __privateAdd(this, _sizes, void 0);
    __privateAdd(this, _starts, void 0);
    __privateAdd(this, _ttls, void 0);
    __privateAdd(this, _hasDispose, void 0);
    __privateAdd(this, _hasFetchMethod, void 0);
    __privateAdd(this, _hasDisposeAfter, void 0);
    // conditionally set private methods related to TTL
    __privateAdd(this, _updateItemAge, () => {
    });
    __privateAdd(this, _statusTTL, () => {
    });
    __privateAdd(this, _setItemTTL, () => {
    });
    /* c8 ignore stop */
    __privateAdd(this, _isStale, () => false);
    __privateAdd(this, _removeItemSize, (_i) => {
    });
    __privateAdd(this, _addItemSize, (_i, _s, _st) => {
    });
    __privateAdd(this, _requireSize, (_k, _v, size, sizeCalculation) => {
      if (size || sizeCalculation) {
        throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
      }
      return 0;
    });
    /**
     * A String value that is used in the creation of the default string description of an object.
     * Called by the built-in method Object.prototype.toString.
     */
    __publicField(this, _a3, "LRUCache");
    const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
    if (max !== 0 && !isPosInt(max)) {
      throw new TypeError("max option must be a nonnegative integer");
    }
    const UintArray = max ? getUintArray(max) : Array;
    if (!UintArray) {
      throw new Error("invalid max value: " + max);
    }
    __privateSet(this, _max, max);
    __privateSet(this, _maxSize, maxSize);
    this.maxEntrySize = maxEntrySize || __privateGet(this, _maxSize);
    this.sizeCalculation = sizeCalculation;
    if (this.sizeCalculation) {
      if (!__privateGet(this, _maxSize) && !this.maxEntrySize) {
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      }
      if (typeof this.sizeCalculation !== "function") {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }
    if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
      throw new TypeError("fetchMethod must be a function if specified");
    }
    __privateSet(this, _fetchMethod, fetchMethod);
    __privateSet(this, _hasFetchMethod, !!fetchMethod);
    __privateSet(this, _keyMap, /* @__PURE__ */ new Map());
    __privateSet(this, _keyList, new Array(max).fill(void 0));
    __privateSet(this, _valList, new Array(max).fill(void 0));
    __privateSet(this, _next, new UintArray(max));
    __privateSet(this, _prev, new UintArray(max));
    __privateSet(this, _head, 0);
    __privateSet(this, _tail, 0);
    __privateSet(this, _free, Stack.create(max));
    __privateSet(this, _size, 0);
    __privateSet(this, _calculatedSize, 0);
    if (typeof dispose === "function") {
      __privateSet(this, _dispose, dispose);
    }
    if (typeof disposeAfter === "function") {
      __privateSet(this, _disposeAfter, disposeAfter);
      __privateSet(this, _disposed, []);
    } else {
      __privateSet(this, _disposeAfter, void 0);
      __privateSet(this, _disposed, void 0);
    }
    __privateSet(this, _hasDispose, !!__privateGet(this, _dispose));
    __privateSet(this, _hasDisposeAfter, !!__privateGet(this, _disposeAfter));
    this.noDisposeOnSet = !!noDisposeOnSet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
    this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
    this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
    this.ignoreFetchAbort = !!ignoreFetchAbort;
    if (this.maxEntrySize !== 0) {
      if (__privateGet(this, _maxSize) !== 0) {
        if (!isPosInt(__privateGet(this, _maxSize))) {
          throw new TypeError("maxSize must be a positive integer if specified");
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      }
      __privateMethod(this, _initializeSizeTracking, initializeSizeTracking_fn).call(this);
    }
    this.allowStale = !!allowStale;
    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.updateAgeOnHas = !!updateAgeOnHas;
    this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
    this.ttlAutopurge = !!ttlAutopurge;
    this.ttl = ttl || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError("ttl must be a positive integer if specified");
      }
      __privateMethod(this, _initializeTTLTracking, initializeTTLTracking_fn).call(this);
    }
    if (__privateGet(this, _max) === 0 && this.ttl === 0 && __privateGet(this, _maxSize) === 0) {
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    }
    if (!this.ttlAutopurge && !__privateGet(this, _max) && !__privateGet(this, _maxSize)) {
      const code2 = "LRU_CACHE_UNBOUNDED";
      if (shouldWarn(code2)) {
        warned.add(code2);
        const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
        emitWarning(msg, "UnboundedCacheWarning", code2, _LRUCache);
      }
    }
  }
  /**
   * Do not call this method unless you need to inspect the
   * inner workings of the cache.  If anything returned by this
   * object is modified in any way, strange breakage may occur.
   *
   * These fields are private for a reason!
   *
   * @internal
   */
  static unsafeExposeInternals(c) {
    return {
      // properties
      starts: __privateGet(c, _starts),
      ttls: __privateGet(c, _ttls),
      sizes: __privateGet(c, _sizes),
      keyMap: __privateGet(c, _keyMap),
      keyList: __privateGet(c, _keyList),
      valList: __privateGet(c, _valList),
      next: __privateGet(c, _next),
      prev: __privateGet(c, _prev),
      get head() {
        return __privateGet(c, _head);
      },
      get tail() {
        return __privateGet(c, _tail);
      },
      free: __privateGet(c, _free),
      // methods
      isBackgroundFetch: (p) => {
        var _a4;
        return __privateMethod(_a4 = c, _isBackgroundFetch, isBackgroundFetch_fn).call(_a4, p);
      },
      backgroundFetch: (k2, index, options, context) => {
        var _a4;
        return __privateMethod(_a4 = c, _backgroundFetch, backgroundFetch_fn).call(_a4, k2, index, options, context);
      },
      moveToTail: (index) => {
        var _a4;
        return __privateMethod(_a4 = c, _moveToTail, moveToTail_fn).call(_a4, index);
      },
      indexes: (options) => {
        var _a4;
        return __privateMethod(_a4 = c, _indexes, indexes_fn).call(_a4, options);
      },
      rindexes: (options) => {
        var _a4;
        return __privateMethod(_a4 = c, _rindexes, rindexes_fn).call(_a4, options);
      },
      isStale: (index) => {
        var _a4;
        return __privateGet(_a4 = c, _isStale).call(_a4, index);
      }
    };
  }
  // Protected read-only members
  /**
   * {@link LRUCache.OptionsBase.max} (read-only)
   */
  get max() {
    return __privateGet(this, _max);
  }
  /**
   * {@link LRUCache.OptionsBase.maxSize} (read-only)
   */
  get maxSize() {
    return __privateGet(this, _maxSize);
  }
  /**
   * The total computed size of items in the cache (read-only)
   */
  get calculatedSize() {
    return __privateGet(this, _calculatedSize);
  }
  /**
   * The number of items stored in the cache (read-only)
   */
  get size() {
    return __privateGet(this, _size);
  }
  /**
   * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
   */
  get fetchMethod() {
    return __privateGet(this, _fetchMethod);
  }
  /**
   * {@link LRUCache.OptionsBase.dispose} (read-only)
   */
  get dispose() {
    return __privateGet(this, _dispose);
  }
  /**
   * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
   */
  get disposeAfter() {
    return __privateGet(this, _disposeAfter);
  }
  /**
   * Return the remaining TTL time for a given entry key
   */
  getRemainingTTL(key) {
    return __privateGet(this, _keyMap).has(key) ? Infinity : 0;
  }
  /**
   * Return a generator yielding `[key, value]` pairs,
   * in order from most recently used to least recently used.
   */
  *entries() {
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      if (__privateGet(this, _valList)[i2] !== void 0 && __privateGet(this, _keyList)[i2] !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield [__privateGet(this, _keyList)[i2], __privateGet(this, _valList)[i2]];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.entries}
   *
   * Return a generator yielding `[key, value]` pairs,
   * in order from least recently used to most recently used.
   */
  *rentries() {
    for (const i2 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      if (__privateGet(this, _valList)[i2] !== void 0 && __privateGet(this, _keyList)[i2] !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield [__privateGet(this, _keyList)[i2], __privateGet(this, _valList)[i2]];
      }
    }
  }
  /**
   * Return a generator yielding the keys in the cache,
   * in order from most recently used to least recently used.
   */
  *keys() {
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const k2 = __privateGet(this, _keyList)[i2];
      if (k2 !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield k2;
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.keys}
   *
   * Return a generator yielding the keys in the cache,
   * in order from least recently used to most recently used.
   */
  *rkeys() {
    for (const i2 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const k2 = __privateGet(this, _keyList)[i2];
      if (k2 !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield k2;
      }
    }
  }
  /**
   * Return a generator yielding the values in the cache,
   * in order from most recently used to least recently used.
   */
  *values() {
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i2];
      if (v !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield __privateGet(this, _valList)[i2];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.values}
   *
   * Return a generator yielding the values in the cache,
   * in order from least recently used to most recently used.
   */
  *rvalues() {
    for (const i2 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i2];
      if (v !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield __privateGet(this, _valList)[i2];
      }
    }
  }
  /**
   * Iterating over the cache itself yields the same results as
   * {@link LRUCache.entries}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Find a value for which the supplied fn method returns a truthy value,
   * similar to Array.find().  fn is called as fn(value, key, cache).
   */
  find(fn, getOptions = {}) {
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i2];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      if (fn(value, __privateGet(this, _keyList)[i2], this)) {
        return this.get(__privateGet(this, _keyList)[i2], getOptions);
      }
    }
  }
  /**
   * Call the supplied function on each item in the cache, in order from
   * most recently used to least recently used.  fn is called as
   * fn(value, key, cache).  Does not update age or recenty of use.
   * Does not iterate over stale values.
   */
  forEach(fn, thisp = this) {
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i2];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, __privateGet(this, _keyList)[i2], this);
    }
  }
  /**
   * The same as {@link LRUCache.forEach} but items are iterated over in
   * reverse order.  (ie, less recently used items are iterated over first.)
   */
  rforEach(fn, thisp = this) {
    for (const i2 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i2];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, __privateGet(this, _keyList)[i2], this);
    }
  }
  /**
   * Delete any stale entries. Returns true if anything was removed,
   * false otherwise.
   */
  purgeStale() {
    let deleted = false;
    for (const i2 of __privateMethod(this, _rindexes, rindexes_fn).call(this, { allowStale: true })) {
      if (__privateGet(this, _isStale).call(this, i2)) {
        this.delete(__privateGet(this, _keyList)[i2]);
        deleted = true;
      }
    }
    return deleted;
  }
  /**
   * Get the extended info about a given entry, to get its value, size, and
   * TTL info simultaneously. Like {@link LRUCache#dump}, but just for a
   * single key. Always returns stale values, if their info is found in the
   * cache, so be sure to check for expired TTLs if relevant.
   */
  info(key) {
    const i2 = __privateGet(this, _keyMap).get(key);
    if (i2 === void 0)
      return void 0;
    const v = __privateGet(this, _valList)[i2];
    const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
    if (value === void 0)
      return void 0;
    const entry = { value };
    if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
      const ttl = __privateGet(this, _ttls)[i2];
      const start = __privateGet(this, _starts)[i2];
      if (ttl && start) {
        const remain = ttl - (perf.now() - start);
        entry.ttl = remain;
        entry.start = Date.now();
      }
    }
    if (__privateGet(this, _sizes)) {
      entry.size = __privateGet(this, _sizes)[i2];
    }
    return entry;
  }
  /**
   * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
   * passed to cache.load()
   */
  dump() {
    const arr = [];
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this, { allowStale: true })) {
      const key = __privateGet(this, _keyList)[i2];
      const v = __privateGet(this, _valList)[i2];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0 || key === void 0)
        continue;
      const entry = { value };
      if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
        entry.ttl = __privateGet(this, _ttls)[i2];
        const age = perf.now() - __privateGet(this, _starts)[i2];
        entry.start = Math.floor(Date.now() - age);
      }
      if (__privateGet(this, _sizes)) {
        entry.size = __privateGet(this, _sizes)[i2];
      }
      arr.unshift([key, entry]);
    }
    return arr;
  }
  /**
   * Reset the cache and load in the items in entries in the order listed.
   * Note that the shape of the resulting cache may be different if the
   * same options are not used in both caches.
   */
  load(arr) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        const age = Date.now() - entry.start;
        entry.start = perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }
  /**
   * Add a value to the cache.
   *
   * Note: if `undefined` is specified as a value, this is an alias for
   * {@link LRUCache#delete}
   */
  set(k2, v, setOptions = {}) {
    var _a4, _b, _c, _d, _e;
    if (v === void 0) {
      this.delete(k2);
      return this;
    }
    const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
    let { noUpdateTTL = this.noUpdateTTL } = setOptions;
    const size = __privateGet(this, _requireSize).call(this, k2, v, setOptions.size || 0, sizeCalculation);
    if (this.maxEntrySize && size > this.maxEntrySize) {
      if (status) {
        status.set = "miss";
        status.maxEntrySizeExceeded = true;
      }
      this.delete(k2);
      return this;
    }
    let index = __privateGet(this, _size) === 0 ? void 0 : __privateGet(this, _keyMap).get(k2);
    if (index === void 0) {
      index = __privateGet(this, _size) === 0 ? __privateGet(this, _tail) : __privateGet(this, _free).length !== 0 ? __privateGet(this, _free).pop() : __privateGet(this, _size) === __privateGet(this, _max) ? __privateMethod(this, _evict, evict_fn).call(this, false) : __privateGet(this, _size);
      __privateGet(this, _keyList)[index] = k2;
      __privateGet(this, _valList)[index] = v;
      __privateGet(this, _keyMap).set(k2, index);
      __privateGet(this, _next)[__privateGet(this, _tail)] = index;
      __privateGet(this, _prev)[index] = __privateGet(this, _tail);
      __privateSet(this, _tail, index);
      __privateWrapper(this, _size)._++;
      __privateGet(this, _addItemSize).call(this, index, size, status);
      if (status)
        status.set = "add";
      noUpdateTTL = false;
    } else {
      __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
      const oldVal = __privateGet(this, _valList)[index];
      if (v !== oldVal) {
        if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, oldVal)) {
          oldVal.__abortController.abort(new Error("replaced"));
          const { __staleWhileFetching: s } = oldVal;
          if (s !== void 0 && !noDisposeOnSet) {
            if (__privateGet(this, _hasDispose)) {
              (_a4 = __privateGet(this, _dispose)) == null ? void 0 : _a4.call(this, s, k2, "set");
            }
            if (__privateGet(this, _hasDisposeAfter)) {
              (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([s, k2, "set"]);
            }
          }
        } else if (!noDisposeOnSet) {
          if (__privateGet(this, _hasDispose)) {
            (_c = __privateGet(this, _dispose)) == null ? void 0 : _c.call(this, oldVal, k2, "set");
          }
          if (__privateGet(this, _hasDisposeAfter)) {
            (_d = __privateGet(this, _disposed)) == null ? void 0 : _d.push([oldVal, k2, "set"]);
          }
        }
        __privateGet(this, _removeItemSize).call(this, index);
        __privateGet(this, _addItemSize).call(this, index, size, status);
        __privateGet(this, _valList)[index] = v;
        if (status) {
          status.set = "replace";
          const oldValue = oldVal && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, oldVal) ? oldVal.__staleWhileFetching : oldVal;
          if (oldValue !== void 0)
            status.oldValue = oldValue;
        }
      } else if (status) {
        status.set = "update";
      }
    }
    if (ttl !== 0 && !__privateGet(this, _ttls)) {
      __privateMethod(this, _initializeTTLTracking, initializeTTLTracking_fn).call(this);
    }
    if (__privateGet(this, _ttls)) {
      if (!noUpdateTTL) {
        __privateGet(this, _setItemTTL).call(this, index, ttl, start);
      }
      if (status)
        __privateGet(this, _statusTTL).call(this, status, index);
    }
    if (!noDisposeOnSet && __privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt == null ? void 0 : dt.shift()) {
        (_e = __privateGet(this, _disposeAfter)) == null ? void 0 : _e.call(this, ...task);
      }
    }
    return this;
  }
  /**
   * Evict the least recently used item, returning its value or
   * `undefined` if cache is empty.
   */
  pop() {
    var _a4;
    try {
      while (__privateGet(this, _size)) {
        const val = __privateGet(this, _valList)[__privateGet(this, _head)];
        __privateMethod(this, _evict, evict_fn).call(this, true);
        if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, val)) {
          if (val.__staleWhileFetching) {
            return val.__staleWhileFetching;
          }
        } else if (val !== void 0) {
          return val;
        }
      }
    } finally {
      if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
        const dt = __privateGet(this, _disposed);
        let task;
        while (task = dt == null ? void 0 : dt.shift()) {
          (_a4 = __privateGet(this, _disposeAfter)) == null ? void 0 : _a4.call(this, ...task);
        }
      }
    }
  }
  /**
   * Check if a key is in the cache, without updating the recency of use.
   * Will return false if the item is stale, even though it is technically
   * in the cache.
   *
   * Will not update item age unless
   * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
   */
  has(k2, hasOptions = {}) {
    const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
    const index = __privateGet(this, _keyMap).get(k2);
    if (index !== void 0) {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) && v.__staleWhileFetching === void 0) {
        return false;
      }
      if (!__privateGet(this, _isStale).call(this, index)) {
        if (updateAgeOnHas) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        if (status) {
          status.has = "hit";
          __privateGet(this, _statusTTL).call(this, status, index);
        }
        return true;
      } else if (status) {
        status.has = "stale";
        __privateGet(this, _statusTTL).call(this, status, index);
      }
    } else if (status) {
      status.has = "miss";
    }
    return false;
  }
  /**
   * Like {@link LRUCache#get} but doesn't update recency or delete stale
   * items.
   *
   * Returns `undefined` if the item is stale, unless
   * {@link LRUCache.OptionsBase.allowStale} is set.
   */
  peek(k2, peekOptions = {}) {
    const { allowStale = this.allowStale } = peekOptions;
    const index = __privateGet(this, _keyMap).get(k2);
    if (index === void 0 || !allowStale && __privateGet(this, _isStale).call(this, index)) {
      return;
    }
    const v = __privateGet(this, _valList)[index];
    return __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
  }
  async fetch(k2, fetchOptions = {}) {
    const {
      // get options
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
      // set options
      ttl = this.ttl,
      noDisposeOnSet = this.noDisposeOnSet,
      size = 0,
      sizeCalculation = this.sizeCalculation,
      noUpdateTTL = this.noUpdateTTL,
      // fetch exclusive options
      noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
      ignoreFetchAbort = this.ignoreFetchAbort,
      allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
      context,
      forceRefresh = false,
      status,
      signal
    } = fetchOptions;
    if (!__privateGet(this, _hasFetchMethod)) {
      if (status)
        status.fetch = "get";
      return this.get(k2, {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
        status
      });
    }
    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort,
      status,
      signal
    };
    let index = __privateGet(this, _keyMap).get(k2);
    if (index === void 0) {
      if (status)
        status.fetch = "miss";
      const p = __privateMethod(this, _backgroundFetch, backgroundFetch_fn).call(this, k2, index, options, context);
      return p.__returned = p;
    } else {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
        const stale = allowStale && v.__staleWhileFetching !== void 0;
        if (status) {
          status.fetch = "inflight";
          if (stale)
            status.returnedStale = true;
        }
        return stale ? v.__staleWhileFetching : v.__returned = v;
      }
      const isStale = __privateGet(this, _isStale).call(this, index);
      if (!forceRefresh && !isStale) {
        if (status)
          status.fetch = "hit";
        __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
        if (updateAgeOnGet) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        if (status)
          __privateGet(this, _statusTTL).call(this, status, index);
        return v;
      }
      const p = __privateMethod(this, _backgroundFetch, backgroundFetch_fn).call(this, k2, index, options, context);
      const hasStale = p.__staleWhileFetching !== void 0;
      const staleVal = hasStale && allowStale;
      if (status) {
        status.fetch = isStale ? "stale" : "refresh";
        if (staleVal && isStale)
          status.returnedStale = true;
      }
      return staleVal ? p.__staleWhileFetching : p.__returned = p;
    }
  }
  /**
   * Return a value from the cache. Will update the recency of the cache
   * entry found.
   *
   * If the key is not found, get() will return `undefined`.
   */
  get(k2, getOptions = {}) {
    const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
    const index = __privateGet(this, _keyMap).get(k2);
    if (index !== void 0) {
      const value = __privateGet(this, _valList)[index];
      const fetching = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, value);
      if (status)
        __privateGet(this, _statusTTL).call(this, status, index);
      if (__privateGet(this, _isStale).call(this, index)) {
        if (status)
          status.get = "stale";
        if (!fetching) {
          if (!noDeleteOnStaleGet) {
            this.delete(k2);
          }
          if (status && allowStale)
            status.returnedStale = true;
          return allowStale ? value : void 0;
        } else {
          if (status && allowStale && value.__staleWhileFetching !== void 0) {
            status.returnedStale = true;
          }
          return allowStale ? value.__staleWhileFetching : void 0;
        }
      } else {
        if (status)
          status.get = "hit";
        if (fetching) {
          return value.__staleWhileFetching;
        }
        __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
        if (updateAgeOnGet) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        return value;
      }
    } else if (status) {
      status.get = "miss";
    }
  }
  /**
   * Deletes a key out of the cache.
   * Returns true if the key was deleted, false otherwise.
   */
  delete(k2) {
    var _a4, _b, _c, _d;
    let deleted = false;
    if (__privateGet(this, _size) !== 0) {
      const index = __privateGet(this, _keyMap).get(k2);
      if (index !== void 0) {
        deleted = true;
        if (__privateGet(this, _size) === 1) {
          this.clear();
        } else {
          __privateGet(this, _removeItemSize).call(this, index);
          const v = __privateGet(this, _valList)[index];
          if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
            v.__abortController.abort(new Error("deleted"));
          } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
            if (__privateGet(this, _hasDispose)) {
              (_a4 = __privateGet(this, _dispose)) == null ? void 0 : _a4.call(this, v, k2, "delete");
            }
            if (__privateGet(this, _hasDisposeAfter)) {
              (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([v, k2, "delete"]);
            }
          }
          __privateGet(this, _keyMap).delete(k2);
          __privateGet(this, _keyList)[index] = void 0;
          __privateGet(this, _valList)[index] = void 0;
          if (index === __privateGet(this, _tail)) {
            __privateSet(this, _tail, __privateGet(this, _prev)[index]);
          } else if (index === __privateGet(this, _head)) {
            __privateSet(this, _head, __privateGet(this, _next)[index]);
          } else {
            const pi = __privateGet(this, _prev)[index];
            __privateGet(this, _next)[pi] = __privateGet(this, _next)[index];
            const ni = __privateGet(this, _next)[index];
            __privateGet(this, _prev)[ni] = __privateGet(this, _prev)[index];
          }
          __privateWrapper(this, _size)._--;
          __privateGet(this, _free).push(index);
        }
      }
    }
    if (__privateGet(this, _hasDisposeAfter) && ((_c = __privateGet(this, _disposed)) == null ? void 0 : _c.length)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt == null ? void 0 : dt.shift()) {
        (_d = __privateGet(this, _disposeAfter)) == null ? void 0 : _d.call(this, ...task);
      }
    }
    return deleted;
  }
  /**
   * Clear the cache entirely, throwing away all values.
   */
  clear() {
    var _a4, _b, _c;
    for (const index of __privateMethod(this, _rindexes, rindexes_fn).call(this, { allowStale: true })) {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
        v.__abortController.abort(new Error("deleted"));
      } else {
        const k2 = __privateGet(this, _keyList)[index];
        if (__privateGet(this, _hasDispose)) {
          (_a4 = __privateGet(this, _dispose)) == null ? void 0 : _a4.call(this, v, k2, "delete");
        }
        if (__privateGet(this, _hasDisposeAfter)) {
          (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([v, k2, "delete"]);
        }
      }
    }
    __privateGet(this, _keyMap).clear();
    __privateGet(this, _valList).fill(void 0);
    __privateGet(this, _keyList).fill(void 0);
    if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
      __privateGet(this, _ttls).fill(0);
      __privateGet(this, _starts).fill(0);
    }
    if (__privateGet(this, _sizes)) {
      __privateGet(this, _sizes).fill(0);
    }
    __privateSet(this, _head, 0);
    __privateSet(this, _tail, 0);
    __privateGet(this, _free).length = 0;
    __privateSet(this, _calculatedSize, 0);
    __privateSet(this, _size, 0);
    if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt == null ? void 0 : dt.shift()) {
        (_c = __privateGet(this, _disposeAfter)) == null ? void 0 : _c.call(this, ...task);
      }
    }
  }
};
_a3 = Symbol.toStringTag;
_max = new WeakMap();
_maxSize = new WeakMap();
_dispose = new WeakMap();
_disposeAfter = new WeakMap();
_fetchMethod = new WeakMap();
_size = new WeakMap();
_calculatedSize = new WeakMap();
_keyMap = new WeakMap();
_keyList = new WeakMap();
_valList = new WeakMap();
_next = new WeakMap();
_prev = new WeakMap();
_head = new WeakMap();
_tail = new WeakMap();
_free = new WeakMap();
_disposed = new WeakMap();
_sizes = new WeakMap();
_starts = new WeakMap();
_ttls = new WeakMap();
_hasDispose = new WeakMap();
_hasFetchMethod = new WeakMap();
_hasDisposeAfter = new WeakMap();
_initializeTTLTracking = new WeakSet();
initializeTTLTracking_fn = function() {
  const ttls = new ZeroArray(__privateGet(this, _max));
  const starts = new ZeroArray(__privateGet(this, _max));
  __privateSet(this, _ttls, ttls);
  __privateSet(this, _starts, starts);
  __privateSet(this, _setItemTTL, (index, ttl, start = perf.now()) => {
    starts[index] = ttl !== 0 ? start : 0;
    ttls[index] = ttl;
    if (ttl !== 0 && this.ttlAutopurge) {
      const t2 = setTimeout(() => {
        if (__privateGet(this, _isStale).call(this, index)) {
          this.delete(__privateGet(this, _keyList)[index]);
        }
      }, ttl + 1);
      if (t2.unref) {
        t2.unref();
      }
    }
  });
  __privateSet(this, _updateItemAge, (index) => {
    starts[index] = ttls[index] !== 0 ? perf.now() : 0;
  });
  __privateSet(this, _statusTTL, (status, index) => {
    if (ttls[index]) {
      const ttl = ttls[index];
      const start = starts[index];
      if (!ttl || !start)
        return;
      status.ttl = ttl;
      status.start = start;
      status.now = cachedNow || getNow();
      const age = status.now - start;
      status.remainingTTL = ttl - age;
    }
  });
  let cachedNow = 0;
  const getNow = () => {
    const n2 = perf.now();
    if (this.ttlResolution > 0) {
      cachedNow = n2;
      const t2 = setTimeout(() => cachedNow = 0, this.ttlResolution);
      if (t2.unref) {
        t2.unref();
      }
    }
    return n2;
  };
  this.getRemainingTTL = (key) => {
    const index = __privateGet(this, _keyMap).get(key);
    if (index === void 0) {
      return 0;
    }
    const ttl = ttls[index];
    const start = starts[index];
    if (!ttl || !start) {
      return Infinity;
    }
    const age = (cachedNow || getNow()) - start;
    return ttl - age;
  };
  __privateSet(this, _isStale, (index) => {
    const s = starts[index];
    const t2 = ttls[index];
    return !!t2 && !!s && (cachedNow || getNow()) - s > t2;
  });
};
_updateItemAge = new WeakMap();
_statusTTL = new WeakMap();
_setItemTTL = new WeakMap();
_isStale = new WeakMap();
_initializeSizeTracking = new WeakSet();
initializeSizeTracking_fn = function() {
  const sizes = new ZeroArray(__privateGet(this, _max));
  __privateSet(this, _calculatedSize, 0);
  __privateSet(this, _sizes, sizes);
  __privateSet(this, _removeItemSize, (index) => {
    __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) - sizes[index]);
    sizes[index] = 0;
  });
  __privateSet(this, _requireSize, (k2, v, size, sizeCalculation) => {
    if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
      return 0;
    }
    if (!isPosInt(size)) {
      if (sizeCalculation) {
        if (typeof sizeCalculation !== "function") {
          throw new TypeError("sizeCalculation must be a function");
        }
        size = sizeCalculation(v, k2);
        if (!isPosInt(size)) {
          throw new TypeError("sizeCalculation return invalid (expect positive integer)");
        }
      } else {
        throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      }
    }
    return size;
  });
  __privateSet(this, _addItemSize, (index, size, status) => {
    sizes[index] = size;
    if (__privateGet(this, _maxSize)) {
      const maxSize = __privateGet(this, _maxSize) - sizes[index];
      while (__privateGet(this, _calculatedSize) > maxSize) {
        __privateMethod(this, _evict, evict_fn).call(this, true);
      }
    }
    __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) + sizes[index]);
    if (status) {
      status.entrySize = size;
      status.totalCalculatedSize = __privateGet(this, _calculatedSize);
    }
  });
};
_removeItemSize = new WeakMap();
_addItemSize = new WeakMap();
_requireSize = new WeakMap();
_indexes = new WeakSet();
indexes_fn = function* ({ allowStale = this.allowStale } = {}) {
  if (__privateGet(this, _size)) {
    for (let i2 = __privateGet(this, _tail); true; ) {
      if (!__privateMethod(this, _isValidIndex, isValidIndex_fn).call(this, i2)) {
        break;
      }
      if (allowStale || !__privateGet(this, _isStale).call(this, i2)) {
        yield i2;
      }
      if (i2 === __privateGet(this, _head)) {
        break;
      } else {
        i2 = __privateGet(this, _prev)[i2];
      }
    }
  }
};
_rindexes = new WeakSet();
rindexes_fn = function* ({ allowStale = this.allowStale } = {}) {
  if (__privateGet(this, _size)) {
    for (let i2 = __privateGet(this, _head); true; ) {
      if (!__privateMethod(this, _isValidIndex, isValidIndex_fn).call(this, i2)) {
        break;
      }
      if (allowStale || !__privateGet(this, _isStale).call(this, i2)) {
        yield i2;
      }
      if (i2 === __privateGet(this, _tail)) {
        break;
      } else {
        i2 = __privateGet(this, _next)[i2];
      }
    }
  }
};
_isValidIndex = new WeakSet();
isValidIndex_fn = function(index) {
  return index !== void 0 && __privateGet(this, _keyMap).get(__privateGet(this, _keyList)[index]) === index;
};
_evict = new WeakSet();
evict_fn = function(free) {
  var _a4, _b;
  const head = __privateGet(this, _head);
  const k2 = __privateGet(this, _keyList)[head];
  const v = __privateGet(this, _valList)[head];
  if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
    v.__abortController.abort(new Error("evicted"));
  } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
    if (__privateGet(this, _hasDispose)) {
      (_a4 = __privateGet(this, _dispose)) == null ? void 0 : _a4.call(this, v, k2, "evict");
    }
    if (__privateGet(this, _hasDisposeAfter)) {
      (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([v, k2, "evict"]);
    }
  }
  __privateGet(this, _removeItemSize).call(this, head);
  if (free) {
    __privateGet(this, _keyList)[head] = void 0;
    __privateGet(this, _valList)[head] = void 0;
    __privateGet(this, _free).push(head);
  }
  if (__privateGet(this, _size) === 1) {
    __privateSet(this, _head, __privateSet(this, _tail, 0));
    __privateGet(this, _free).length = 0;
  } else {
    __privateSet(this, _head, __privateGet(this, _next)[head]);
  }
  __privateGet(this, _keyMap).delete(k2);
  __privateWrapper(this, _size)._--;
  return head;
};
_backgroundFetch = new WeakSet();
backgroundFetch_fn = function(k2, index, options, context) {
  const v = index === void 0 ? void 0 : __privateGet(this, _valList)[index];
  if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
    return v;
  }
  const ac = new AC();
  const { signal } = options;
  signal == null ? void 0 : signal.addEventListener("abort", () => ac.abort(signal.reason), {
    signal: ac.signal
  });
  const fetchOpts = {
    signal: ac.signal,
    options,
    context
  };
  const cb = (v2, updateCache = false) => {
    const { aborted } = ac.signal;
    const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
    if (options.status) {
      if (aborted && !updateCache) {
        options.status.fetchAborted = true;
        options.status.fetchError = ac.signal.reason;
        if (ignoreAbort)
          options.status.fetchAbortIgnored = true;
      } else {
        options.status.fetchResolved = true;
      }
    }
    if (aborted && !ignoreAbort && !updateCache) {
      return fetchFail(ac.signal.reason);
    }
    const bf2 = p;
    if (__privateGet(this, _valList)[index] === p) {
      if (v2 === void 0) {
        if (bf2.__staleWhileFetching) {
          __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
        } else {
          this.delete(k2);
        }
      } else {
        if (options.status)
          options.status.fetchUpdated = true;
        this.set(k2, v2, fetchOpts.options);
      }
    }
    return v2;
  };
  const eb = (er) => {
    if (options.status) {
      options.status.fetchRejected = true;
      options.status.fetchError = er;
    }
    return fetchFail(er);
  };
  const fetchFail = (er) => {
    const { aborted } = ac.signal;
    const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
    const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
    const noDelete = allowStale || options.noDeleteOnFetchRejection;
    const bf2 = p;
    if (__privateGet(this, _valList)[index] === p) {
      const del = !noDelete || bf2.__staleWhileFetching === void 0;
      if (del) {
        this.delete(k2);
      } else if (!allowStaleAborted) {
        __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
      }
    }
    if (allowStale) {
      if (options.status && bf2.__staleWhileFetching !== void 0) {
        options.status.returnedStale = true;
      }
      return bf2.__staleWhileFetching;
    } else if (bf2.__returned === bf2) {
      throw er;
    }
  };
  const pcall = (res, rej) => {
    var _a4;
    const fmp = (_a4 = __privateGet(this, _fetchMethod)) == null ? void 0 : _a4.call(this, k2, v, fetchOpts);
    if (fmp && fmp instanceof Promise) {
      fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej);
    }
    ac.signal.addEventListener("abort", () => {
      if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
        res(void 0);
        if (options.allowStaleOnFetchAbort) {
          res = (v2) => cb(v2, true);
        }
      }
    });
  };
  if (options.status)
    options.status.fetchDispatched = true;
  const p = new Promise(pcall).then(cb, eb);
  const bf = Object.assign(p, {
    __abortController: ac,
    __staleWhileFetching: v,
    __returned: void 0
  });
  if (index === void 0) {
    this.set(k2, bf, { ...fetchOpts.options, status: void 0 });
    index = __privateGet(this, _keyMap).get(k2);
  } else {
    __privateGet(this, _valList)[index] = bf;
  }
  return bf;
};
_isBackgroundFetch = new WeakSet();
isBackgroundFetch_fn = function(p) {
  if (!__privateGet(this, _hasFetchMethod))
    return false;
  const b = p;
  return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
};
_connect = new WeakSet();
connect_fn = function(p, n2) {
  __privateGet(this, _prev)[n2] = p;
  __privateGet(this, _next)[p] = n2;
};
_moveToTail = new WeakSet();
moveToTail_fn = function(index) {
  if (index !== __privateGet(this, _tail)) {
    if (index === __privateGet(this, _head)) {
      __privateSet(this, _head, __privateGet(this, _next)[index]);
    } else {
      __privateMethod(this, _connect, connect_fn).call(this, __privateGet(this, _prev)[index], __privateGet(this, _next)[index]);
    }
    __privateMethod(this, _connect, connect_fn).call(this, __privateGet(this, _tail), index);
    __privateSet(this, _tail, index);
  }
};
var LRUCache = _LRUCache;

// node_modules/md-editor-v3/lib/es/chunks/index.mjs
var userZoom = (props7, html) => {
  const editorId = inject("editorId");
  const { noImgZoomIn } = props7;
  let zoomHander = () => {
  };
  watch(
    [html, toRef(props7.setting, "preview")],
    () => {
      if (!noImgZoomIn && props7.setting.preview) {
        zoomHander();
      }
    },
    {
      immediate: true
    }
  );
  onMounted(() => {
    zoomHander = x(() => {
      const imgs = document.querySelectorAll(`#${editorId}-preview img`);
      if (imgs.length === 0) {
        return;
      }
      medium_zoom_esm_default(imgs, {
        background: "#00000073"
      });
    });
  });
};
var StrIcon = (name, customIcon) => {
  if (typeof customIcon[name] === "string") {
    return customIcon[name];
  }
  const defaultStr = `<i class="${prefix}-iconfont ${prefix}-icon-${name}"></i>`;
  switch (configOption.iconfontType) {
    case "svg": {
      return `<svg class="${prefix}-icon" aria-hidden="true"><use xlink:href="#${prefix}-icon-${name}"></use></svg>`;
    }
    default: {
      return defaultStr;
    }
  }
};
var useCopyCode = (props7, html, key) => {
  const editorId = inject("editorId");
  const ult = inject("usedLanguageText");
  const customIcon = inject("customIcon");
  const initCopyEntry = () => {
    document.querySelectorAll(`#${editorId}-preview pre`).forEach((pre) => {
      var _a4, _b;
      let clearTimer = -1;
      (_a4 = pre.querySelector(".copy-button")) == null ? void 0 : _a4.remove();
      const copyBtnText = ((_b = ult.value.copyCode) == null ? void 0 : _b.text) || "复制代码";
      const copyButton = document.createElement("span");
      copyButton.setAttribute("class", "copy-button");
      copyButton.dataset.tips = copyBtnText;
      copyButton.innerHTML = StrIcon("copy", customIcon.value);
      copyButton.addEventListener("click", () => {
        var _a22, _b2;
        clearTimeout(clearTimer);
        const codeText = pre.querySelector("code").innerText;
        const success = (0, import_copy_to_clipboard.default)(props7.formatCopiedText(codeText));
        const succssTip = ((_a22 = ult.value.copyCode) == null ? void 0 : _a22.successTips) || "已复制！";
        const failTip = ((_b2 = ult.value.copyCode) == null ? void 0 : _b2.failTips) || "已复制！";
        copyButton.dataset.tips = success ? succssTip : failTip;
        clearTimer = window.setTimeout(() => {
          copyButton.dataset.tips = copyBtnText;
        }, 1500);
      });
      pre.appendChild(copyButton);
    });
  };
  const htmlChanged = () => {
    nextTick(initCopyEntry);
  };
  const settingPreviewChanged = (nVal) => {
    if (nVal) {
      nextTick(initCopyEntry);
    }
  };
  watch([html, key], htmlChanged);
  watch(() => props7.setting.preview, settingPreviewChanged);
  watch(() => props7.setting.htmlPreview, settingPreviewChanged);
  watch(() => ult.value, initCopyEntry);
  onMounted(initCopyEntry);
};
var useHighlight = (props7) => {
  var _a4;
  const hljsConf = (_a4 = configOption.editorExtensions) == null ? void 0 : _a4.highlight;
  const hljs = hljsConf == null ? void 0 : hljsConf.instance;
  const highlightUrl2 = inject("highlight");
  const hljsRef = shallowRef(hljs);
  onMounted(() => {
    if (props7.noHighlight) {
      return;
    }
    if (!hljsRef.value) {
      const highlightScript = document.createElement("script");
      highlightScript.src = highlightUrl2.value.js;
      highlightScript.onload = () => {
        hljsRef.value = window.hljs;
      };
      highlightScript.id = `${prefix}-hljs`;
      appendHandler(highlightScript, "hljs");
      const highlightLink = document.createElement("link");
      highlightLink.rel = "stylesheet";
      highlightLink.href = highlightUrl2.value.css;
      highlightLink.id = `${prefix}-hlCss`;
      appendHandler(highlightLink);
    }
  });
  watch(
    () => highlightUrl2.value.css,
    (url) => {
      updateHandler(`${prefix}-hlCss`, "href", url);
    }
  );
  return hljsRef;
};
var useMermaid = (props7) => {
  const theme = inject("theme");
  const { editorExtensions, mermaidConfig } = configOption;
  const mermaidConf = editorExtensions == null ? void 0 : editorExtensions.mermaid;
  const mermaidRef = shallowRef(mermaidConf == null ? void 0 : mermaidConf.instance);
  const reRenderRef = shallowRef(-1);
  const mermaidCache = new LRUCache({
    max: 1e3,
    // 缓存10分钟
    ttl: 6e5
  });
  const configMermaid = () => {
    const mermaid = mermaidRef.value;
    if (!props7.noMermaid && mermaid) {
      mermaid.initialize(
        mermaidConfig({
          startOnLoad: false,
          theme: theme.value === "dark" ? "dark" : "default"
        })
      );
      reRenderRef.value = reRenderRef.value + 1;
    }
  };
  watch(
    () => theme.value,
    () => {
      mermaidCache.clear();
      configMermaid();
    }
  );
  onMounted(() => {
    if (props7.noMermaid) {
      return;
    }
    if (!(mermaidConf == null ? void 0 : mermaidConf.instance)) {
      const jsSrc = (mermaidConf == null ? void 0 : mermaidConf.js) || mermaidUrl;
      if (/\.mjs/.test(jsSrc)) {
        import(
          /* @vite-ignore */
          /* webpackIgnore: true */
          jsSrc
        ).then((module) => {
          mermaidRef.value = module.default;
          configMermaid();
        });
      } else {
        const mermaidScript = document.createElement("script");
        mermaidScript.id = `${prefix}-mermaid`;
        mermaidScript.src = jsSrc;
        mermaidScript.onload = () => {
          mermaidRef.value = window.mermaid;
          configMermaid();
        };
        appendHandler(mermaidScript, "mermaid");
      }
    }
  });
  const replaceMermaid = () => {
    nextTick(() => {
      if (!props7.noMermaid && mermaidRef.value) {
        const mermaidSourceEles = document.querySelectorAll(
          `div.${prefix}-mermaid`
        );
        const svgContainingElement = document.createElement("div");
        svgContainingElement.style.width = document.body.offsetWidth + "px";
        svgContainingElement.style.height = document.body.offsetHeight + "px";
        svgContainingElement.style.position = "fixed";
        svgContainingElement.style.zIndex = "-10000";
        svgContainingElement.style.top = "-10000";
        let count = mermaidSourceEles.length;
        if (count > 0) {
          document.body.appendChild(svgContainingElement);
        }
        mermaidSourceEles.forEach(async (item) => {
          let mermaidHtml = mermaidCache.get(item.innerText);
          if (!mermaidHtml) {
            const idRand = k();
            const render = mermaidRef.value.renderAsync || mermaidRef.value.render;
            let svg2 = "";
            try {
              svg2 = await render(idRand, item.innerText, svgContainingElement);
            } catch (error2) {
            }
            mermaidHtml = await props7.sanitizeMermaid(
              typeof svg2 === "string" ? svg2 : svg2.svg
            );
            mermaidCache.set(item.innerText, mermaidHtml);
          }
          const p = document.createElement("p");
          p.className = `${prefix}-mermaid`;
          p.setAttribute("data-processed", "");
          p.innerHTML = mermaidHtml;
          if (item.dataset.line !== void 0) {
            p.dataset.line = item.dataset.line;
          }
          item.replaceWith(p);
          if (--count === 0) {
            svgContainingElement.remove();
          }
        });
      }
    });
  };
  return { mermaidRef, reRenderRef, replaceMermaid };
};
var useKatex = (props7) => {
  var _a4;
  const katexConf = (_a4 = configOption.editorExtensions) == null ? void 0 : _a4.katex;
  const katexIns = katexConf == null ? void 0 : katexConf.instance;
  const katex = shallowRef(katexIns);
  onMounted(() => {
    if (!props7.noKatex && !katex.value) {
      const katexScript = document.createElement("script");
      katexScript.src = (katexConf == null ? void 0 : katexConf.js) || katexUrl.js;
      katexScript.onload = () => {
        katex.value = window.katex;
      };
      katexScript.id = `${prefix}-katex`;
      const katexLink = document.createElement("link");
      katexLink.rel = "stylesheet";
      katexLink.href = (katexConf == null ? void 0 : katexConf.css) || katexUrl.css;
      katexLink.id = `${prefix}-katexCss`;
      appendHandler(katexScript, "katex");
      appendHandler(katexLink);
    }
  });
  return katex;
};
var MermaidPlugin = (md, options) => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, ops, env, slf) => {
    const token = tokens[idx];
    const code2 = token.content.trim();
    if (token.info === "mermaid") {
      let line;
      if (tokens[idx].map && tokens[idx].level === 0) {
        line = tokens[idx].map[0];
        tokens[idx].attrSet("data-line", String(line));
      }
      return `<div class="${prefix}-mermaid" ${line !== void 0 ? "data-line=" + line : ""} data-mermaid-theme=${options.themeRef.value}>${code2}</div>`;
    }
    return temp(tokens, idx, ops, env, slf);
  };
};
var MermaidPlugin$1 = MermaidPlugin;
var isValidDelim = (state, pos) => {
  let can_open = true, can_close = true;
  const max = state.posMax;
  const prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
  const nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;
  if (prevChar === 32 || prevChar === 9 || nextChar >= 48 && nextChar <= 57) {
    can_close = false;
  }
  if (nextChar === 32 || nextChar === 9) {
    can_open = false;
  }
  return {
    can_open,
    can_close
  };
};
var math_inline = (state, silent) => {
  let match2, token, res, pos;
  if (state.src[state.pos] !== "$") {
    return false;
  }
  res = isValidDelim(state, state.pos);
  if (!res.can_open) {
    if (!silent) {
      state.pending += "$";
    }
    state.pos += 1;
    return true;
  }
  const start = state.pos + 1;
  match2 = start;
  while ((match2 = state.src.indexOf("$", match2)) !== -1) {
    pos = match2 - 1;
    while (state.src[pos] === "\\") {
      pos -= 1;
    }
    if ((match2 - pos) % 2 == 1) {
      break;
    }
    match2 += 1;
  }
  if (match2 === -1) {
    if (!silent) {
      state.pending += "$";
    }
    state.pos = start;
    return true;
  }
  if (match2 - start === 0) {
    if (!silent) {
      state.pending += "$$";
    }
    state.pos = start + 1;
    return true;
  }
  res = isValidDelim(state, match2);
  if (!res.can_close) {
    if (!silent) {
      state.pending += "$";
    }
    state.pos = start;
    return true;
  }
  if (!silent) {
    token = state.push("math_inline", "math", 0);
    token.markup = "$";
    token.content = state.src.slice(start, match2);
  }
  state.pos = match2 + 1;
  return true;
};
var math_block = (state, start, end, silent) => {
  let firstLine, lastLine, next, lastPos, found = false, pos = state.bMarks[start] + state.tShift[start], max = state.eMarks[start];
  if (pos + 2 > max) {
    return false;
  }
  if (state.src.slice(pos, pos + 2) !== "$$") {
    return false;
  }
  pos += 2;
  firstLine = state.src.slice(pos, max);
  if (silent) {
    return true;
  }
  if (firstLine.trim().slice(-2) === "$$") {
    firstLine = firstLine.trim().slice(0, -2);
    found = true;
  }
  for (next = start; !found; ) {
    next++;
    if (next >= end) {
      break;
    }
    pos = state.bMarks[next] + state.tShift[next];
    max = state.eMarks[next];
    if (pos < max && state.tShift[next] < state.blkIndent) {
      break;
    }
    if (state.src.slice(pos, max).trim().slice(-2) === "$$") {
      lastPos = state.src.slice(0, max).lastIndexOf("$$");
      lastLine = state.src.slice(pos, lastPos);
      found = true;
    }
  }
  state.line = next + 1;
  const token = state.push("math_block", "math", 0);
  token.block = true;
  token.content = (firstLine && firstLine.trim() ? firstLine + "\n" : "") + state.getLines(start + 1, next, state.tShift[start], true) + (lastLine && lastLine.trim() ? lastLine : "");
  token.map = [start, state.line];
  token.markup = "$$";
  return true;
};
var KatexPlugin = (md, options) => {
  const katexInline = (str) => {
    if (options.katexRef.value) {
      const html = options.katexRef.value.renderToString(str, {
        throwOnError: false
      });
      return `<span class="${prefix}-katex-inline" data-processed>${html}</span>`;
    } else {
      return `<span class="${prefix}-katex-inline">${str}</span>`;
    }
  };
  const katexBlock = (str, lineNum) => {
    if (options.katexRef.value) {
      const html = options.katexRef.value.renderToString(str, {
        throwOnError: false,
        displayMode: true
      });
      return `<p class="${prefix}-katex-block" data-line=${lineNum} data-processed>${html}</p>`;
    } else {
      return `<p class="${prefix}-katex-block" data-line=${lineNum}>${str}</p>`;
    }
  };
  md.inline.ruler.after("escape", "math_inline", math_inline);
  md.block.ruler.after("blockquote", "math_block", math_block, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  md.renderer.rules.math_inline = (tokens, idx) => {
    return katexInline(tokens[idx].content);
  };
  md.renderer.rules.math_block = (tokens, idx) => {
    return katexBlock(tokens[idx].content, tokens[idx].map[0]) + "\n";
  };
};
var KatexPlugin$1 = KatexPlugin;
var AdmonitionPlugin = (md, options) => {
  options = options || {};
  const markers = 3, markerStr = options.marker || "!", markerChar = markerStr.charCodeAt(0), markerLen = markerStr.length;
  let type = "", title = "";
  const render = (tokens, idx, _options, _env, self2) => {
    const token = tokens[idx];
    if (token.type === "admonition_open") {
      tokens[idx].attrPush([
        "class",
        `${prefix}-admonition ${prefix}-admonition-${token.info}`
      ]);
      tokens[idx].attrSet("data-line", String(tokens[idx].map[0]));
    } else if (token.type === "admonition_title_open") {
      tokens[idx].attrPush(["class", `${prefix}-admonition-title`]);
    }
    return self2.renderToken(tokens, idx, _options);
  };
  const validate = (params) => {
    const array = params.trim().split(" ", 2);
    title = "";
    type = array[0];
    if (array.length > 1) {
      title = params.substring(type.length + 2);
    }
    if (title === "" || !title) {
      title = type;
    }
  };
  md.block.ruler.before(
    "code",
    "admonition",
    (state, startLine, endLine, silent) => {
      let pos, nextLine, token, autoClosed = false, start = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (markerChar !== state.src.charCodeAt(start)) {
        return false;
      }
      for (pos = start + 1; pos <= max; pos++) {
        if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
          break;
        }
      }
      const markerCount = Math.floor((pos - start) / markerLen);
      if (markerCount !== markers) {
        return false;
      }
      pos -= (pos - start) % markerLen;
      const markup = state.src.slice(start, pos);
      const params = state.src.slice(pos, max);
      validate(params);
      if (silent) {
        return true;
      }
      nextLine = startLine;
      for (; ; ) {
        nextLine++;
        if (nextLine >= endLine) {
          break;
        }
        start = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (start < max && state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        if (markerChar !== state.src.charCodeAt(start)) {
          continue;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          continue;
        }
        for (pos = start + 1; pos <= max; pos++) {
          if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
            break;
          }
        }
        if (Math.floor((pos - start) / markerLen) < markerCount) {
          continue;
        }
        pos -= (pos - start) % markerLen;
        pos = state.skipSpaces(pos);
        if (pos < max) {
          continue;
        }
        autoClosed = true;
        break;
      }
      const oldParent = state.parentType;
      const oldLineMax = state.lineMax;
      state.parentType = "root";
      state.lineMax = nextLine;
      token = state.push("admonition_open", "div", 1);
      token.markup = markup;
      token.block = true;
      token.info = type;
      token.map = [startLine, nextLine];
      token = state.push("admonition_title_open", "p", 1);
      token.markup = markup + " " + type;
      token.map = [startLine, nextLine];
      token = state.push("inline", "", 0);
      token.content = title;
      token.map = [startLine, state.line - 1];
      token.children = [];
      token = state.push("admonition_title_close", "p", -1);
      token.markup = markup + " " + type;
      state.md.block.tokenize(state, startLine + 1, nextLine);
      token = state.push("admonition_close", "div", -1);
      token.markup = state.src.slice(start, pos);
      token.block = true;
      state.parentType = oldParent;
      state.lineMax = oldLineMax;
      state.line = nextLine + (autoClosed ? 1 : 0);
      return true;
    },
    {
      alt: ["paragraph", "reference", "blockquote", "list"]
    }
  );
  md.renderer.rules["admonition_open"] = render;
  md.renderer.rules["admonition_title_open"] = render;
  md.renderer.rules["admonition_title_close"] = render;
  md.renderer.rules["admonition_close"] = render;
};
var AdmonitionPlugin$1 = AdmonitionPlugin;
var HeadingPlugin = (md, options) => {
  md.renderer.rules.heading_open = (tokens, idx) => {
    var _a4;
    const token = tokens[idx];
    const text2 = ((_a4 = tokens[idx + 1].children) == null ? void 0 : _a4.reduce((p, c) => {
      return p + (c.content || "");
    }, "")) || "";
    const level = token.markup.length;
    options.headsRef.value.push({
      text: text2,
      level
    });
    if (token.map && token.level === 0) {
      token.attrSet("data-line", String(token.map[0]));
      token.attrSet(
        "id",
        options.mdHeadingId(text2, level, options.headsRef.value.length)
      );
    }
    return md.renderer.renderToken(tokens, idx, options);
  };
  md.renderer.rules.heading_close = (tokens, idx, opts, _env, self2) => {
    return self2.renderToken(tokens, idx, opts);
  };
};
var HeadingPlugin$1 = HeadingPlugin;
var codetabs = (md, _opts) => {
  const defaultRender = md.renderer.rules.fence, unescapeAll2 = md.utils.unescapeAll, re = /\[(\w*)(?::([\w ]*))?\]/;
  function getInfo(token) {
    return token.info ? unescapeAll2(token.info).trim() : "";
  }
  function getGroupAndTab(token) {
    const info = getInfo(token), [group = null, tab = ""] = (re.exec(info) || []).slice(1);
    return [group, tab];
  }
  function getLangName(token) {
    const info = getInfo(token);
    return info ? info.split(/(\s+)/g)[0] : "";
  }
  const fenceGroup = (tokens, idx, options, env, slf) => {
    if (tokens[idx].hidden) {
      return "";
    }
    const [GROUP, _] = getGroupAndTab(tokens[idx]);
    if (GROUP === null) {
      return defaultRender(tokens, idx, options, env, slf);
    }
    let token, group, tab, checked, labels = "", pres = "";
    for (let i2 = idx; i2 < tokens.length; i2++) {
      token = tokens[i2];
      [group, tab] = getGroupAndTab(token);
      if (group !== GROUP) {
        break;
      }
      token.info = token.info.replace(re, "");
      token.hidden = true;
      checked = i2 - idx > 0 ? "" : " checked";
      labels += `<li><input type="radio" name="label-group-${_opts.editorId}-${idx}"${checked}><label for="group-${_opts.editorId}-${idx}-tab-${i2 - idx}" onclick="this.previousElementSibling.click()">${tab || getLangName(token)}</label></li>
`;
      pres += `<input type="radio" id="group-${_opts.editorId}-${idx}-tab-${i2 - idx}" name="group-${_opts.editorId}-${idx}"${checked}>
` + defaultRender(tokens, i2, options, env, slf);
    }
    return '<div class="code-tabs">\n<ul>\n' + labels + "</ul>\n" + pres + "</div>";
  };
  md.renderer.rules.fence = fenceGroup;
};
var CodeTabsPlugin = codetabs;
var initLineNumber = (md) => {
  [
    "paragraph_open",
    "table_open",
    "ordered_list_open",
    "bullet_list_open",
    "blockquote_open",
    "hr",
    "html_block",
    "fence"
  ].forEach((rule) => {
    const backup = md.renderer.rules[rule];
    if (!backup) {
      md.renderer.rules[rule] = (tokens, idx, options, _env, self2) => {
        let line;
        if (tokens[idx].map && tokens[idx].level === 0) {
          line = tokens[idx].map[0];
          tokens[idx].attrSet("data-line", String(line));
        }
        return self2.renderToken(tokens, idx, options);
      };
    } else {
      md.renderer.rules[rule] = (tokens, idx, options, env, self2) => {
        let line;
        const _htmlCode = backup(tokens, idx, options, env, self2);
        if (tokens[idx].map && tokens[idx].level === 0 && !/^<!--/.test(_htmlCode)) {
          line = tokens[idx].map[0];
          return _htmlCode.replace(/^(<[^>]*)/, `$1 data-line="${line}"`);
        }
        return _htmlCode;
      };
    }
  });
};
var useMarkdownIt = (props7, previewOnly) => {
  const { editorConfig, markdownItConfig, markdownItPlugins } = configOption;
  const editorId = inject("editorId");
  const showCodeRowNumber = inject("showCodeRowNumber");
  const themeRef = inject("theme");
  const headsRef = ref([]);
  const hljsRef = useHighlight(props7);
  const katexRef = useKatex(props7);
  const { reRenderRef, replaceMermaid } = useMermaid(props7);
  const md = lib_default({
    html: true,
    breaks: true
  });
  markdownItConfig(md, {
    editorId
  });
  const plugins = [
    {
      type: "katex",
      plugin: KatexPlugin$1,
      options: { katexRef }
    },
    {
      type: "image",
      plugin: r,
      options: { figcaption: true, classes: "md-zoom" }
    },
    {
      type: "admonition",
      plugin: AdmonitionPlugin$1,
      options: {}
    },
    {
      type: "taskList",
      plugin: import_markdown_it_task_lists.default,
      options: {}
    },
    {
      type: "heading",
      plugin: HeadingPlugin$1,
      options: { mdHeadingId: props7.mdHeadingId, headsRef }
    },
    {
      type: "codeTabs",
      plugin: CodeTabsPlugin,
      options: { editorId }
    },
    {
      type: "xss",
      plugin: import_markdown_it_xss.default,
      options: {
        // https://github.com/leizongmin/js-xss/blob/master/README.zh.md
        xss(xss) {
          return {
            whiteList: Object.assign({}, xss.getDefaultWhiteList(), {
              // 支持任务列表
              input: ["class", "disabled", "type", "checked"],
              // 主要支持youtobe、腾讯视频、哔哩哔哩等内嵌视频代码
              iframe: [
                "class",
                "width",
                "height",
                "src",
                "title",
                "border",
                "frameborder",
                "framespacing",
                "allow",
                "allowfullscreen"
              ]
            })
          };
        }
      }
    }
  ];
  if (!props7.noMermaid) {
    plugins.push({
      type: "mermaid",
      plugin: MermaidPlugin$1,
      options: { themeRef }
    });
  }
  markdownItPlugins(plugins, {
    editorId
  }).forEach((item) => {
    md.use(item.plugin, item.options);
  });
  const userDefHighlight = md.options.highlight;
  md.set({
    highlight: (str, language, attrs) => {
      if (userDefHighlight) {
        const result = userDefHighlight(str, language, attrs);
        if (result) {
          return result;
        }
      }
      let codeHtml;
      if (!props7.noHighlight && hljsRef.value) {
        const hljsLang = hljsRef.value.getLanguage(language);
        if (hljsLang) {
          codeHtml = hljsRef.value.highlight(str, {
            language,
            ignoreIllegals: true
          }).value;
        } else {
          codeHtml = hljsRef.value.highlightAuto(str).value;
        }
      } else {
        codeHtml = md.utils.escapeHtml(str);
      }
      const codeSpan = showCodeRowNumber ? generateCodeRowNumber(codeHtml.replace(/^\n+|\n+$/g, "")) : `<span class="code-block">${codeHtml.replace(/^\n+|\n+$/g, "")}</span>`;
      return `<pre><code class="language-${language}" language=${language}>${codeSpan}</code></pre>`;
    }
  });
  initLineNumber(md);
  const key = ref(`_article-key_${k()}`);
  const html = ref(props7.sanitize(md.render(props7.modelValue)));
  const updatedTodo = () => {
    bus.emit(editorId, BUILD_FINISHED, html.value);
    props7.onHtmlChanged(html.value);
    props7.onGetCatalog(headsRef.value);
    bus.emit(editorId, CATALOG_CHANGED, headsRef.value);
    replaceMermaid();
  };
  onMounted(updatedTodo);
  const markHtml = () => {
    headsRef.value = [];
    html.value = props7.sanitize(md.render(props7.modelValue));
    updatedTodo();
  };
  const needReRender = computed(() => {
    return (props7.noKatex || katexRef.value) && (props7.noHighlight || hljsRef.value);
  });
  watch(
    [toRef(props7, "modelValue"), needReRender, reRenderRef],
    x(
      markHtml,
      (editorConfig == null ? void 0 : editorConfig.renderDelay) !== void 0 ? editorConfig == null ? void 0 : editorConfig.renderDelay : previewOnly ? 0 : 500
    )
  );
  onMounted(() => {
    bus.on(editorId, {
      name: PUSH_CATALOG,
      callback() {
        bus.emit(editorId, CATALOG_CHANGED, headsRef.value);
      }
    });
    bus.on(editorId, {
      name: RERENDER,
      callback: () => {
        markHtml();
        key.value = `_article-key_${k()}`;
      }
    });
  });
  return { html, key };
};
var useMarkdownIt$1 = useMarkdownIt;
var contentPreviewProps = {
  modelValue: {
    type: String,
    default: ""
  },
  setting: {
    type: Object,
    default: () => ({ preview: true })
  },
  onHtmlChanged: {
    type: Function,
    default: () => {
    }
  },
  onGetCatalog: {
    type: Function,
    default: () => {
    }
  },
  mdHeadingId: {
    type: Function,
    default: () => ""
  },
  noMermaid: {
    type: Boolean,
    default: false
  },
  sanitize: {
    type: Function,
    default: (html) => html
  },
  // 不使用该函数功能
  noKatex: {
    type: Boolean,
    default: false
  },
  formatCopiedText: {
    type: Function,
    default: (text2) => text2
  },
  noHighlight: {
    type: Boolean,
    default: false
  },
  previewOnly: {
    type: Boolean,
    default: false
  },
  noImgZoomIn: {
    type: Boolean
  },
  sanitizeMermaid: {
    type: Function
  }
};
var contentProps = {
  ...contentPreviewProps,
  updateModelValue: {
    type: Function,
    default: () => {
    }
  },
  onChange: {
    type: Function,
    default: () => {
    }
  },
  placeholder: {
    type: String,
    default: ""
  },
  scrollAuto: {
    type: Boolean
  },
  autofocus: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  readonly: {
    type: Boolean
  },
  maxlength: {
    type: Number
  },
  autoDetectCode: {
    type: Boolean
  },
  /**
   * 输入框失去焦点时触发事件
   */
  onBlur: {
    type: Function,
    default: () => {
    }
  },
  /**
   * 输入框获得焦点时触发事件
   */
  onFocus: {
    type: Function,
    default: () => {
    }
  },
  noPrettier: {
    type: Boolean
  },
  completions: {
    type: Array
  },
  catalogVisible: {
    type: Boolean
  },
  theme: {
    type: String,
    default: "light"
  },
  onInput: {
    type: Function
  },
  onDrop: {
    type: Function,
    default: () => {
    }
  },
  inputBoxWitdh: {
    type: String
  },
  onInputBoxWitdhChange: {
    type: Function
  }
};
var ContentPreview = defineComponent({
  name: "ContentPreview",
  props: contentPreviewProps,
  setup(props7) {
    const editorId = inject("editorId");
    const previewTheme = inject("previewTheme");
    const showCodeRowNumber = inject("showCodeRowNumber");
    const {
      html,
      key
    } = useMarkdownIt$1(props7, props7.previewOnly);
    useCopyCode(props7, html, key);
    userZoom(props7, html);
    return () => {
      return createVNode(Fragment, null, [props7.setting.preview && createVNode("div", {
        "id": `${editorId}-preview-wrapper`,
        "class": `${prefix}-preview-wrapper`,
        "key": "content-preview-wrapper"
      }, [createVNode("div", {
        "key": key.value,
        "id": `${editorId}-preview`,
        "class": [`${prefix}-preview`, `${previewTheme == null ? void 0 : previewTheme.value}-theme`, showCodeRowNumber && `${prefix}-scrn`],
        "innerHTML": html.value
      }, null)]), !props7.previewOnly && props7.setting.htmlPreview && createVNode("div", {
        "id": `${editorId}-html-wrapper`,
        "class": `${prefix}-preview-wrapper`,
        "key": "html-preview-wrapper"
      }, [createVNode("div", {
        "class": `${prefix}-html`
      }, [html.value])])]);
    };
  }
});
var useOnSave = (props7, context) => {
  const { editorId } = props7;
  const state = reactive({
    // 是否已编译成html
    buildFinished: false,
    // 存储当前最新的html
    html: ""
  });
  watch(
    () => props7.modelValue,
    () => {
      state.buildFinished = false;
    }
  );
  onMounted(() => {
    bus.on(editorId, {
      name: BUILD_FINISHED,
      callback(html) {
        state.buildFinished = true;
        state.html = html;
      }
    });
    bus.on(editorId, {
      name: ON_SAVE,
      callback() {
        const htmlPromise = new Promise((rev) => {
          if (state.buildFinished) {
            rev(state.html);
          } else {
            const buildFinishedCallback = (html) => {
              rev(html);
              bus.remove(editorId, BUILD_FINISHED, buildFinishedCallback);
            };
            bus.on(editorId, {
              name: BUILD_FINISHED,
              callback: buildFinishedCallback
            });
          }
        });
        if (props7.onSave) {
          props7.onSave(props7.modelValue, htmlPromise);
        } else {
          context.emit("onSave", props7.modelValue, htmlPromise);
        }
      }
    });
  });
};
var useProvidePreview = (props7) => {
  var _a4, _b;
  const { editorId } = props7;
  const highlightConfig2 = (_b = (_a4 = configOption) == null ? void 0 : _a4.editorExtensions) == null ? void 0 : _b.highlight;
  provide("editorId", editorId);
  provide(
    "theme",
    computed(() => props7.theme)
  );
  provide(
    "language",
    computed(() => props7.language)
  );
  provide(
    "highlight",
    computed(() => {
      const cssList = {
        ...codeCss,
        ...highlightConfig2 == null ? void 0 : highlightConfig2.css
      };
      const theme = props7.codeStyleReverse && props7.codeStyleReverseList.includes(props7.previewTheme) ? "dark" : props7.theme;
      return {
        js: (highlightConfig2 == null ? void 0 : highlightConfig2.js) || highlightUrl,
        css: cssList[props7.codeTheme] ? cssList[props7.codeTheme][theme] : codeCss.atom[theme]
      };
    })
  );
  provide("showCodeRowNumber", props7.showCodeRowNumber);
  const usedLanguageText = computed(() => {
    var _a22, _b2;
    const allText = {
      ...staticTextDefault,
      ...(_b2 = (_a22 = configOption) == null ? void 0 : _a22.editorConfig) == null ? void 0 : _b2.languageUserDefined
    };
    if (allText[props7.language]) {
      return allText[props7.language];
    } else {
      return staticTextDefault["zh-CN"];
    }
  });
  provide("usedLanguageText", usedLanguageText);
  provide(
    "previewTheme",
    computed(() => props7.previewTheme)
  );
  provide(
    "customIcon",
    computed(() => props7.customIcon)
  );
};
var useProvide = (props7) => {
  useProvidePreview(props7);
  provide("tabWidth", props7.tabWidth);
};
var useExpansionPreview = (props7) => {
  onMounted(() => {
    var _a4, _b;
    if (!props7.noIconfont) {
      if (configOption.iconfontType === "svg") {
        const iconfontScript = document.createElement("script");
        iconfontScript.src = ((_a4 = configOption.editorExtensions) == null ? void 0 : _a4.iconfont) || iconfontSvgUrl;
        iconfontScript.id = `${prefix}-icon`;
        appendHandler(iconfontScript);
      } else {
        const iconfontLink = document.createElement("link");
        iconfontLink.rel = "stylesheet";
        iconfontLink.href = ((_b = configOption.editorExtensions) == null ? void 0 : _b.iconfontClass) || iconfontClassUrl;
        iconfontLink.id = `${prefix}-icon-class`;
        appendHandler(iconfontLink);
      }
    }
  });
};
var useExpansion = (props7) => {
  var _a4, _b, _c, _d, _e, _f;
  const { noPrettier, noUploadImg } = props7;
  const { editorExtensions } = configOption;
  const noPrettierScript = noPrettier || !!((_b = (_a4 = configOption.editorExtensions) == null ? void 0 : _a4.prettier) == null ? void 0 : _b.prettierInstance);
  const noParserMarkdownScript = noPrettier || !!((_d = (_c = configOption.editorExtensions) == null ? void 0 : _c.prettier) == null ? void 0 : _d.parserMarkdownInstance);
  const noCropperScript = noUploadImg || !!((_f = (_e = configOption.editorExtensions) == null ? void 0 : _e.cropper) == null ? void 0 : _f.instance);
  onMounted(() => {
    var _a22, _b2, _c2, _d2;
    const prettierScript = document.createElement("script");
    const prettierMDScript = document.createElement("script");
    prettierScript.src = ((_a22 = editorExtensions == null ? void 0 : editorExtensions.prettier) == null ? void 0 : _a22.standaloneJs) || prettierUrl.main;
    prettierScript.id = `${prefix}-prettier`;
    prettierMDScript.src = ((_b2 = editorExtensions == null ? void 0 : editorExtensions.prettier) == null ? void 0 : _b2.parserMarkdownJs) || prettierUrl.markdown;
    prettierMDScript.id = `${prefix}-prettierMD`;
    const cropperLink = document.createElement("link");
    cropperLink.rel = "stylesheet";
    cropperLink.href = ((_c2 = editorExtensions == null ? void 0 : editorExtensions.cropper) == null ? void 0 : _c2.css) || cropperUrl.css;
    cropperLink.id = `${prefix}-cropperCss`;
    const cropperScript = document.createElement("script");
    cropperScript.src = ((_d2 = editorExtensions == null ? void 0 : editorExtensions.cropper) == null ? void 0 : _d2.js) || cropperUrl.js;
    cropperScript.id = `${prefix}-cropper`;
    if (!noCropperScript) {
      appendHandler(cropperLink);
      appendHandler(cropperScript);
    }
    if (!noPrettierScript) {
      appendHandler(prettierScript);
    }
    if (!noParserMarkdownScript) {
      appendHandler(prettierMDScript);
    }
  });
  useExpansionPreview(props7);
};
var useErrorCatcher = (props7, context) => {
  const { editorId } = props7;
  onMounted(() => {
    bus.on(editorId, {
      name: ERROR_CATCHER,
      callback: (err) => {
        if (props7.onError instanceof Function) {
          props7.onError(err);
        } else {
          context.emit("onError", err);
        }
      }
    });
  });
};
var useConfig = (props7, context) => {
  const { editorId } = props7;
  const setting = reactive({
    pageFullscreen: props7.pageFullscreen,
    fullscreen: false,
    preview: props7.preview,
    htmlPreview: props7.preview ? false : props7.htmlPreview
  });
  const updateSetting = (k2, v) => {
    setting[k2] = v === void 0 ? !setting[k2] : v;
    if (k2 === "preview" && setting.preview) {
      setting.htmlPreview = false;
    } else if (k2 === "htmlPreview" && setting.htmlPreview) {
      setting.preview = false;
    }
  };
  let bodyOverflowHistory = "";
  const adjustBody = () => {
    if (setting.pageFullscreen || setting.fullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = bodyOverflowHistory;
    }
  };
  watch(() => [setting.pageFullscreen, setting.fullscreen], adjustBody);
  onMounted(() => {
    bus.on(editorId, {
      name: UPLOAD_IMAGE,
      callback(files, cb) {
        const insertHanlder = (urls) => {
          bus.emit(editorId, REPLACE, "image", {
            desc: "",
            urls
          });
          cb && cb();
        };
        if (props7.onUploadImg) {
          props7.onUploadImg(files, insertHanlder);
        } else {
          context.emit("onUploadImg", files, insertHanlder);
        }
      }
    });
    bodyOverflowHistory = document.body.style.overflow;
    adjustBody();
  });
  return [setting, updateSetting];
};
var useCatalog = (props7) => {
  const { editorId } = props7;
  const catalogShow = ref(false);
  onMounted(() => {
    bus.on(editorId, {
      name: CHANGE_CATALOG_VISIBLE,
      callback: (v) => {
        if (v === void 0) {
          catalogShow.value = !catalogShow.value;
        } else {
          catalogShow.value = v;
        }
      }
    });
  });
  const catalogVisible = computed(() => {
    return !props7.toolbarsExclude.includes("catalog") && props7.toolbars.includes("catalog") && catalogShow.value;
  });
  return catalogVisible;
};
var useExpose$1 = (props7, ctx, catalogVisible, setting, updateSetting, codeRef) => {
  const { editorId } = props7;
  watch(
    () => setting.pageFullscreen,
    (newVal) => {
      bus.emit(editorId, PAGE_FULL_SCREEN_CHANGED, newVal);
    }
  );
  watch(
    () => setting.fullscreen,
    (newVal) => {
      bus.emit(editorId, FULL_SCREEN_CHANGED, newVal);
    }
  );
  watch(
    () => setting.preview,
    (newVal) => {
      bus.emit(editorId, PREVIEW_CHANGED, newVal);
    }
  );
  watch(
    () => setting.htmlPreview,
    (newVal) => {
      bus.emit(editorId, HTML_PREVIEW_CHANGED, newVal);
    }
  );
  watch(catalogVisible, (newVal) => {
    bus.emit(editorId, CATALOG_VISIBLE_CHANGED, newVal);
  });
  const exposeParam = {
    on(eventName, callBack) {
      switch (eventName) {
        case "pageFullscreen": {
          bus.on(editorId, {
            name: PAGE_FULL_SCREEN_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
        case "fullscreen": {
          bus.on(editorId, {
            name: FULL_SCREEN_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
        case "preview": {
          bus.on(editorId, {
            name: PREVIEW_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
        case "htmlPreview": {
          bus.on(editorId, {
            name: HTML_PREVIEW_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
        case "catalog": {
          bus.on(editorId, {
            name: CATALOG_VISIBLE_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
      }
    },
    togglePageFullscreen(status) {
      updateSetting("pageFullscreen", status);
    },
    toggleFullscreen(status) {
      bus.emit(editorId, CHANGE_FULL_SCREEN, status);
    },
    togglePreview(status) {
      updateSetting("preview", status);
    },
    toggleHtmlPreview(status) {
      updateSetting("htmlPreview", status);
    },
    toggleCatalog(status) {
      bus.emit(editorId, CHANGE_CATALOG_VISIBLE, status);
    },
    triggerSave() {
      bus.emit(editorId, ON_SAVE);
    },
    insert(generate) {
      bus.emit(editorId, REPLACE, "universal", { generate });
    },
    focus(options) {
      var _a4;
      (_a4 = codeRef.value) == null ? void 0 : _a4.focus(options);
    },
    rerender() {
      bus.emit(editorId, RERENDER);
    },
    getSelectedText() {
      var _a4;
      return (_a4 = codeRef.value) == null ? void 0 : _a4.getSelectedText();
    },
    resetHistory() {
      var _a4;
      (_a4 = codeRef.value) == null ? void 0 : _a4.resetHistory();
    },
    domEventHandlers(handlers) {
      bus.emit(editorId, EVENT_LISTENER, handlers);
    }
  };
  ctx.expose(exposeParam);
};
var mdHeadingId = (text2) => text2;
var mdPreviewProps = {
  /**
   * markdown content.
   *
   * @default ''
   */
  modelValue: {
    type: String,
    default: ""
  },
  /**
   * 主题，支持light和dark
   *
   * @default 'light'
   */
  theme: {
    type: String,
    default: "light"
  },
  /**
   * 外层类名
   *
   * @default ''
   */
  class: {
    type: String,
    default: ""
  },
  /**
   * 预设语言名称
   *
   * @default 'zh-CN'
   */
  language: {
    type: String,
    default: "zh-CN"
  },
  /**
   * html变化事件
   */
  onHtmlChanged: {
    type: Function
  },
  /**
   * 获取目录结构
   */
  onGetCatalog: {
    type: Function
  },
  /**
   * 编辑器唯一标识
   *
   * @default 'md-editor-v3'
   */
  editorId: {
    type: String,
    default: () => getNextId("md-editor-v3_")
  },
  /**
   * 预览中代码是否显示行号
   *
   * @default false
   */
  showCodeRowNumber: {
    type: Boolean,
    default: false
  },
  /**
   * 预览内容样式
   *
   * @default 'default'
   */
  previewTheme: {
    type: String,
    default: "default"
  },
  /**
   * 编辑器样式
   */
  style: {
    type: Object,
    default: () => ({})
  },
  /**
   * 标题的id生成方式
   *
   * @default (text: string) => text
   */
  mdHeadingId: {
    type: Function,
    default: mdHeadingId
  },
  /**
   *
   * 不能保证文本正确的情况，在marked编译md文本后通过该方法处理
   * 推荐DOMPurify、sanitize-html
   *
   * @default (text: string) => text
   */
  sanitize: {
    type: Function,
    default: (html) => html
  },
  /**
   * 不使用该mermaid
   *
   * @default false
   */
  noMermaid: {
    type: Boolean,
    default: false
  },
  /**
   * 不使用katex
   *
   * @default false
   */
  noKatex: {
    type: Boolean,
    default: false
  },
  /**
   * 代码主题
   *
   * @default 'atom'
   */
  codeTheme: {
    type: String,
    default: "atom"
  },
  /**
   * 不插入iconfont链接
   *
   * @default false
   */
  noIconfont: {
    type: Boolean
  },
  /**
   * 复制代码格式化方法
   *
   * @default (text) => text
   */
  formatCopiedText: {
    type: Function,
    default: (text2) => text2
  },
  /**
   * 某些预览主题的代码模块背景是暗色系
   * 将这个属性设置为true，会自动在该主题下的light模式下使用暗色系的代码风格
   *
   * @default true
   */
  codeStyleReverse: {
    type: Boolean,
    default: true
  },
  /**
   * 需要自动调整的预览主题
   *
   * @default ['default', 'mk-cute']
   */
  codeStyleReverseList: {
    type: Array,
    default: ["default", "mk-cute"]
  },
  noHighlight: {
    type: Boolean,
    default: false
  },
  /**
   * 是否关闭编辑器默认的放大缩小功能
   */
  noImgZoomIn: {
    type: Boolean,
    default: false
  },
  /**
   * 自定义的图标
   */
  customIcon: {
    type: Object,
    default: {}
  },
  sanitizeMermaid: {
    type: Function,
    default: (h2) => Promise.resolve(h2)
  }
};
var editorProps = {
  ...mdPreviewProps,
  /**
   * input回调事件
   */
  onChange: {
    type: Function
  },
  /**
   * input回调事件
   */
  onSave: {
    type: Function
  },
  /**
   * 上传图片事件
   */
  onUploadImg: {
    type: Function
  },
  /**
   * 是否页面内全屏
   *
   * @default false
   */
  pageFullscreen: {
    type: Boolean,
    default: false
  },
  /**
   * 是否展开预览
   *
   * @default true
   */
  preview: {
    type: Boolean,
    default: true
  },
  /**
   * 是否展开html预览
   *
   * @default false
   */
  htmlPreview: {
    type: Boolean,
    default: false
  },
  /**
   * 仅预览模式，不显示toolbar和编辑框
   *
   * @4.0.0开始移除该设置，使用组件MdPreview替换
   *
   * @default false
   */
  // previewOnly: {
  //   type: Boolean as PropType<boolean>,
  //   default: false
  // },
  /**
   * 工具栏选择显示
   *
   * @default allToolbar
   */
  toolbars: {
    type: Array,
    default: allToolbar
  },
  /**
   * 工具栏选择不显示
   *
   * @default []
   */
  toolbarsExclude: {
    type: Array,
    default: []
  },
  /**
   * 格式化md
   *
   * @default true
   */
  noPrettier: {
    type: Boolean,
    default: false
  },
  /**
   * 一个tab等于空格数
   *
   * @default 2
   */
  tabWidth: {
    type: Number,
    default: 2
  },
  /**
   * 表格预设格子数
   *
   * @default [6, 4]
   */
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  /**
   * 空提示
   *
   * @default ''
   */
  placeholder: {
    type: String,
    default: ""
  },
  /**
   * 自定义的工具栏列表
   */
  defToolbars: {
    type: [String, Object]
  },
  /**
   * 内部错误捕获
   */
  onError: {
    type: Function
  },
  /**
   * 页脚列表显示顺序
   */
  footers: {
    type: Array,
    default: allFooter
  },
  /**
   * 是否默认激活输入框和预览框同步滚动
   *
   * @default true
   */
  scrollAuto: {
    type: Boolean,
    default: true
  },
  /**
   * 自定义的也叫工具组件列表
   */
  defFooters: {
    type: [String, Object]
  },
  /**
   * 是否禁用上传图片
   *
   * @default false
   */
  noUploadImg: {
    type: Boolean
  },
  /**
   * 文本区域自动获得焦点
   *
   * @default false
   */
  autoFocus: {
    type: Boolean
  },
  /**
   * 禁用文本区域
   *
   * @default false
   */
  disabled: {
    type: Boolean
  },
  /**
   * 文本区域为只读
   *
   * @default false
   */
  readOnly: {
    type: Boolean
  },
  /**
   * 文本区域允许的最大字符数
   */
  maxLength: {
    type: Number
  },
  /**
   * 是否启用自动识别粘贴代码类别
   * 目前支持 vscode 复制的代码识别
   *
   * @default false
   */
  autoDetectCode: {
    type: Boolean
  },
  /**
   * 输入框失去焦点时触发事件
   */
  onBlur: {
    type: Function
  },
  /**
   * 输入框获得焦点时触发事件
   */
  onFocus: {
    type: Function
  },
  /**
   * @codemirror/autocomplete匹配关键词的方法列表
   *
   * 它会被像下面这样嵌入编辑器
   *
   * import { autocompletion } from '@codemirror/autocomplete';
   * autocompletion({
   *   override: [...completions]
   * })
   */
  completions: {
    type: Array
  },
  /**
   * 是否在工具栏下面显示对应的文字名称
   *
   * @default false
   */
  showToolbarName: {
    type: Boolean,
    default: false
  },
  /**
   * 字符输入事件
   */
  onInput: {
    type: Function
  },
  onDrop: {
    type: Function
  },
  /**
   * 输入框的默认宽度
   *
   * @example '100px'/'50%'
   * @default '50%
   */
  inputBoxWitdh: {
    type: String,
    default: "50%"
  },
  /**
   * 输入框宽度变化事件
   */
  onInputBoxWitdhChange: {
    type: Function
  }
};
var mdPreviewEmits = ["onHtmlChanged", "onGetCatalog"];
var editorEmits = [
  ...mdPreviewEmits,
  "onChange",
  "onSave",
  "onUploadImg",
  "onError",
  "update:modelValue",
  "onBlur",
  "onFocus",
  "onInput",
  "onDrop",
  "onInputBoxWitdhChange"
];
var useExpose = (props7, ctx) => {
  const { editorId } = props7;
  const exposeParam = {
    rerender() {
      bus.emit(editorId, RERENDER);
    }
  };
  ctx.expose(exposeParam);
};
var MdPreview = defineComponent({
  name: "MdPreview",
  props: mdPreviewProps,
  emits: mdPreviewEmits,
  setup(props7, ctx) {
    const {
      editorId,
      noKatex,
      noMermaid,
      noHighlight
    } = props7;
    useProvidePreview(props7);
    useExpansionPreview(props7);
    useExpose(props7, ctx);
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });
    return () => {
      return createVNode("div", {
        "id": editorId,
        "class": [prefix, props7.class, props7.theme === "dark" && `${prefix}-dark`, `${prefix}-previewOnly`],
        "style": props7.style
      }, [createVNode(ContentPreview, {
        "modelValue": props7.modelValue,
        "onHtmlChanged": (html) => {
          if (props7.onHtmlChanged) {
            props7.onHtmlChanged(html);
          } else {
            ctx.emit("onHtmlChanged", html);
          }
        },
        "onGetCatalog": (list2) => {
          if (props7.onGetCatalog) {
            props7.onGetCatalog(list2);
          } else {
            ctx.emit("onGetCatalog", list2);
          }
        },
        "mdHeadingId": props7.mdHeadingId,
        "noMermaid": noMermaid,
        "sanitize": props7.sanitize,
        "noKatex": noKatex,
        "formatCopiedText": props7.formatCopiedText,
        "noHighlight": noHighlight,
        "noImgZoomIn": props7.noImgZoomIn,
        "previewOnly": true,
        "sanitizeMermaid": props7.sanitizeMermaid
      }, null)]);
    };
  }
});
MdPreview.install = (app) => {
  app.component(MdPreview.name, MdPreview);
  return app;
};

// node_modules/md-editor-v3/lib/es/MdCatalog.mjs
var props$12 = {
  tocItem: {
    type: Object,
    default: () => ({})
  },
  mdHeadingId: {
    type: Function,
    default: () => {
    }
  },
  scrollElement: {
    type: [String, Object],
    default: ""
  },
  onClick: {
    type: Function,
    default: () => {
    }
  },
  scrollElementOffsetTop: {
    type: Number,
    default: 0
  }
};
var CatalogLink = defineComponent({
  props: props$12,
  setup(props22) {
    return () => {
      const {
        tocItem,
        mdHeadingId: mdHeadingId2,
        scrollElement,
        onClick,
        scrollElementOffsetTop
      } = props22;
      return createVNode("div", {
        "class": [`${prefix}-catalog-link`, tocItem.active && `${prefix}-catalog-active`],
        "onClick": (e2) => {
          onClick(e2, tocItem);
          e2.stopPropagation();
          const id = mdHeadingId2(tocItem.text, tocItem.level, tocItem.index);
          const targetHeadEle = document.getElementById(id);
          const scrollContainer = scrollElement instanceof Element ? scrollElement : document.querySelector(scrollElement);
          if (targetHeadEle && scrollContainer) {
            let par = targetHeadEle.offsetParent;
            let offsetTop = targetHeadEle.offsetTop;
            if (scrollContainer.contains(par)) {
              while (par && scrollContainer != par) {
                offsetTop += par == null ? void 0 : par.offsetTop;
                par = par == null ? void 0 : par.offsetParent;
              }
            }
            scrollContainer == null ? void 0 : scrollContainer.scrollTo({
              top: offsetTop - scrollElementOffsetTop,
              behavior: "smooth"
            });
          }
        }
      }, [createVNode("span", {
        "title": tocItem.text
      }, [tocItem.text]), createVNode("div", {
        "class": `${prefix}-catalog-wrapper`
      }, [tocItem.children && tocItem.children.map((item) => createVNode(CatalogLink, {
        "mdHeadingId": mdHeadingId2,
        "key": `${tocItem.text}-link-${item.level}-${item.text}`,
        "tocItem": item,
        "scrollElement": scrollElement,
        "onClick": onClick,
        "scrollElementOffsetTop": scrollElementOffsetTop
      }, null))])]);
    };
  }
});
var CatalogLink$1 = CatalogLink;
var props3 = {
  /**
   * 编辑器的Id，务必与需要绑定的编辑器Id相同
   */
  editorId: {
    type: String
  },
  class: {
    type: String,
    default: ""
  },
  mdHeadingId: {
    type: Function,
    default: (text2) => text2
  },
  /**
   * 指定滚动的容器，选择器需带上对应的符号，默认预览框
   * 元素必须定位！！！！！！
   *
   * 默认：#md-editor-preview-wrapper
   */
  scrollElement: {
    type: [String, Object]
  },
  theme: {
    type: String,
    default: "light"
  },
  /**
   * 高亮标题相对滚动容器顶部偏移量，即距离该值时，高亮当前目录菜单项
   *
   * 默认：20px
   */
  offsetTop: {
    type: Number,
    default: 20
  },
  /**
   * 滚动区域的固定顶部高度
   *
   * 默认：0
   */
  scrollElementOffsetTop: {
    type: Number,
    default: 0
  },
  onClick: {
    type: Function
  },
  onActive: {
    type: Function
  }
};
var MdCatalog = defineComponent({
  name: "MdCatalog",
  props: props3,
  emits: ["onClick", "onActive"],
  setup(props22, ctx) {
    const editorId = props22.editorId;
    const state = reactive({
      list: [],
      show: false,
      scrollElement: props22.scrollElement || `#${editorId}-preview-wrapper`
    });
    const activeItem = shallowRef();
    const catalogs = computed(() => {
      const tocItems = [];
      state.list.forEach((listItem, index) => {
        const {
          text: text2,
          level
        } = listItem;
        const item = {
          level,
          text: text2,
          index: index + 1,
          active: activeItem.value === listItem
        };
        if (tocItems.length === 0) {
          tocItems.push(item);
        } else {
          let lastItem = tocItems[tocItems.length - 1];
          if (item.level > lastItem.level) {
            for (let i2 = lastItem.level + 1; i2 <= 6; i2++) {
              const {
                children
              } = lastItem;
              if (!children) {
                lastItem.children = [item];
                break;
              }
              lastItem = children[children.length - 1];
              if (item.level <= lastItem.level) {
                children.push(item);
                break;
              }
            }
          } else {
            tocItems.push(item);
          }
        }
      });
      return tocItems;
    });
    const getScrollElement = () => {
      const scrollElement = state.scrollElement instanceof HTMLElement ? state.scrollElement : document.querySelector(state.scrollElement);
      return scrollElement;
    };
    const findActiveHeading = (list2) => {
      if (list2.length === 0) {
        state.list = [];
        return false;
      }
      const {
        activeHead
      } = list2.reduce((activeData, link2, index) => {
        const linkEle = document.getElementById(props22.mdHeadingId(link2.text, link2.level, index + 1));
        if (linkEle instanceof HTMLElement) {
          const scrollElement = getScrollElement();
          const relativeTop = getRelativeTop(linkEle, scrollElement);
          if (relativeTop < props22.offsetTop && relativeTop > activeData.minTop) {
            return {
              activeHead: link2,
              minTop: relativeTop
            };
          }
        }
        return activeData;
      }, {
        activeHead: list2[0],
        minTop: Number.MIN_SAFE_INTEGER
      });
      activeItem.value = activeHead;
      state.list = list2;
    };
    const scrollHandler = () => {
      findActiveHeading(state.list);
    };
    watch(() => activeItem.value, (nVal) => {
      const activeHeading = nVal ? {
        ...nVal
      } : void 0;
      if (props22.onActive) {
        props22.onActive(activeHeading);
      } else {
        ctx.emit("onActive", activeHeading);
      }
    });
    onMounted(() => {
      const scrollElement = getScrollElement();
      const eventEle = scrollElement === document.documentElement ? window : scrollElement;
      eventEle == null ? void 0 : eventEle.addEventListener("scroll", scrollHandler);
      bus.on(editorId, {
        name: CATALOG_CHANGED,
        callback: (_list) => {
          eventEle == null ? void 0 : eventEle.removeEventListener("scroll", scrollHandler);
          findActiveHeading(_list);
          eventEle == null ? void 0 : eventEle.addEventListener("scroll", scrollHandler);
        }
      });
      bus.emit(editorId, PUSH_CATALOG);
    });
    onBeforeUnmount(() => {
      var _a4;
      const scrollElement = getScrollElement();
      (_a4 = scrollElement === document.documentElement ? window : scrollElement) == null ? void 0 : _a4.removeEventListener("scroll", scrollHandler);
    });
    return () => createVNode("div", {
      "class": `${prefix}-catalog${props22.theme === "dark" ? "-dark" : ""} ${props22.class}`
    }, [catalogs.value.map((item) => {
      return createVNode(CatalogLink$1, {
        "mdHeadingId": props22.mdHeadingId,
        "tocItem": item,
        "key": `link-${item.level}-${item.text}`,
        "scrollElement": state.scrollElement,
        "onClick": (e2, t2) => {
          if (props22.onClick) {
            props22.onClick(e2, t2);
          } else {
            ctx.emit("onClick", e2, t2);
          }
        },
        "scrollElementOffsetTop": props22.scrollElementOffsetTop
      }, null);
    })]);
  }
});
MdCatalog.install = (app) => {
  app.component(MdCatalog.name, MdCatalog);
  return app;
};

// node_modules/md-editor-v3/lib/es/NormalToolbar.mjs
var props4 = {
  title: {
    type: String,
    default: ""
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object]
  },
  onClick: {
    type: Function
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  insert: {
    type: Function
  },
  language: {
    type: String
  },
  theme: {
    type: String
  }
  /**
   * ==结束
   */
};
var NormalToolbar = defineComponent({
  name: "NormalToolbar",
  props: props4,
  emits: ["onClick"],
  setup(props22, ctx) {
    return () => {
      const Trigger = getSlot({
        props: props22,
        ctx
      }, "trigger");
      return createVNode("div", {
        "class": `${prefix}-toolbar-item`,
        "title": props22.title,
        "onClick": (e2) => {
          if (props22.onClick instanceof Function) {
            props22.onClick(e2);
          } else {
            ctx.emit("onClick", e2);
          }
        }
      }, [Trigger]);
    };
  }
});
NormalToolbar.install = (app) => {
  app.component(NormalToolbar.name, NormalToolbar);
  return app;
};

// node_modules/md-editor-v3/lib/es/ModalToolbar.mjs
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var props5 = {
  title: {
    type: String,
    default: ""
  },
  modalTitle: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean
  },
  width: {
    type: String,
    default: "auto"
  },
  height: {
    type: String,
    default: "auto"
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object]
  },
  onClick: {
    type: Function
  },
  onClose: {
    type: Function
  },
  /**
   * 显示全屏按钮
   */
  showAdjust: {
    type: Boolean,
    default: false
  },
  isFullscreen: {
    type: Boolean,
    default: false
  },
  onAdjust: {
    type: Function
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  insert: {
    type: Function
  },
  language: {
    type: String
  },
  theme: {
    type: String
  }
  /**
   * ==结束
   */
};
var ModalToolbar = defineComponent({
  name: "ModalToolbar",
  props: props5,
  emits: ["onClick", "onClose", "onAdjust"],
  setup(props22, ctx) {
    return () => {
      const Trigger = getSlot({
        props: props22,
        ctx
      }, "trigger");
      const Default = getSlot({
        props: props22,
        ctx
      }, "default");
      return createVNode(Fragment, null, [createVNode("div", {
        "class": `${prefix}-toolbar-item`,
        "title": props22.title,
        "onClick": () => {
          if (props22.onClick instanceof Function) {
            props22.onClick();
          } else {
            ctx.emit("onClick");
          }
        }
      }, [Trigger]), createVNode(MdModal, {
        "width": props22.width,
        "height": props22.height,
        "title": props22.modalTitle,
        "visible": props22.visible,
        "onClose": () => {
          if (props22.onClose instanceof Function) {
            props22.onClose();
          } else {
            ctx.emit("onClose");
          }
        },
        "showAdjust": props22.showAdjust,
        "isFullscreen": props22.isFullscreen,
        "onAdjust": (v) => {
          if (props22.onAdjust instanceof Function) {
            props22.onAdjust(v);
          } else {
            ctx.emit("onAdjust", v);
          }
        }
      }, _isSlot(Default) ? Default : {
        default: () => [Default]
      })]);
    };
  }
});
ModalToolbar.install = (app) => {
  app.component(ModalToolbar.name, ModalToolbar);
  return app;
};

// node_modules/md-editor-v3/lib/es/MdEditor.mjs
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField3 = (obj, key, value) => {
  __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var Divider = defineComponent({
  setup() {
    return () => createVNode("div", {
      "class": `${prefix}-divider`
    }, null);
  }
});
var toolbarProps = {
  noPrettier: {
    type: Boolean
  },
  // 工具栏选择显示
  toolbars: {
    type: Array,
    default: () => []
  },
  // 工具栏选择不显示
  toolbarsExclude: {
    type: Array,
    default: () => []
  },
  setting: {
    type: Object,
    default: () => ({})
  },
  screenfull: {
    type: Object,
    default: null
  },
  screenfullJs: {
    type: String,
    default: ""
  },
  updateSetting: {
    type: Function,
    default: () => {
    }
  },
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  defToolbars: {
    type: Object
  },
  noUploadImg: {
    type: Boolean
  },
  /**
   * 是否在工具栏下面显示对应的文字名称
   *
   * @default false
   */
  showToolbarName: {
    type: Boolean
  }
};
var useSreenfull = (props22) => {
  var _a4, _b, _c, _d;
  const editorId = inject("editorId");
  let screenfull = (_b = (_a4 = configOption.editorExtensions) == null ? void 0 : _a4.screenfull) == null ? void 0 : _b.instance;
  const screenfullJs = (_d = (_c = configOption.editorExtensions) == null ? void 0 : _c.screenfull) == null ? void 0 : _d.js;
  const screenfullMe = ref(false);
  const fullscreenHandler = (status) => {
    if (!screenfull) {
      bus.emit(editorId, ERROR_CATCHER, {
        name: "fullscreen",
        message: "fullscreen is undefined"
      });
      return;
    }
    if (screenfull.isEnabled) {
      screenfullMe.value = true;
      const targetStatus = status === void 0 ? !screenfull.isFullscreen : status;
      if (targetStatus) {
        screenfull.request();
      } else {
        screenfull.exit();
      }
    } else {
      console.error("browser does not support screenfull!");
    }
  };
  const onScreenfullEvent = () => {
    if (screenfull && screenfull.isEnabled) {
      screenfull.on("change", () => {
        if (screenfullMe.value || props22.setting.fullscreen) {
          screenfullMe.value = false;
          props22.updateSetting("fullscreen");
        }
      });
    }
  };
  const screenfullLoad = () => {
    screenfull = window.screenfull;
    onScreenfullEvent();
  };
  onMounted(() => {
    onScreenfullEvent();
    if (!screenfull) {
      const screenScript = document.createElement("script");
      screenScript.src = screenfullJs || screenfullUrl;
      screenScript.onload = screenfullLoad;
      screenScript.id = `${prefix}-screenfull`;
      appendHandler(screenScript, "screenfull");
    }
  });
  onMounted(() => {
    bus.on(editorId, {
      name: CHANGE_FULL_SCREEN,
      callback: fullscreenHandler
    });
  });
  return { fullscreenHandler };
};
var props$6 = {
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  onSelected: {
    type: Function,
    default: () => {
    }
  }
};
var TableShape = defineComponent({
  name: "TableShape",
  props: props$6,
  setup(props22) {
    const hoverPosition = reactive({
      x: -1,
      y: -1
    });
    return () => createVNode("div", {
      "class": `${prefix}-table-shape`,
      "onMouseleave": () => {
        hoverPosition.x = -1;
        hoverPosition.y = -1;
      }
    }, [new Array(props22.tableShape[1]).fill("").map((_, rowIndex) => createVNode("div", {
      "class": `${prefix}-table-shape-row`,
      "key": `table-shape-row-${rowIndex}`
    }, [new Array(props22.tableShape[0]).fill("").map((_2, colIndex) => createVNode("div", {
      "class": `${prefix}-table-shape-col`,
      "key": `table-shape-col-${colIndex}`,
      "onMouseenter": () => {
        hoverPosition.x = rowIndex;
        hoverPosition.y = colIndex;
      },
      "onClick": () => {
        props22.onSelected(hoverPosition);
      }
    }, [createVNode("div", {
      "class": [`${prefix}-table-shape-col-default`, rowIndex <= hoverPosition.x && colIndex <= hoverPosition.y && `${prefix}-table-shape-col-include`]
    }, null)]))]))]);
  }
});
var TableShape$1 = TableShape;
var props$5 = {
  type: {
    type: String,
    default: "link"
  },
  visible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
var LinkModal = defineComponent({
  props: props$5,
  setup(props22) {
    const ult = inject("usedLanguageText");
    const editorId = inject("editorId");
    const title = computed(() => {
      var _a4, _b;
      switch (props22.type) {
        case "link": {
          return (_a4 = ult.value.linkModalTips) == null ? void 0 : _a4.linkTitle;
        }
        case "image": {
          return (_b = ult.value.linkModalTips) == null ? void 0 : _b.imageTitle;
        }
        default: {
          return "";
        }
      }
    });
    const linkData = reactive({
      desc: "",
      url: ""
    });
    watch(() => props22.visible, (nVal) => {
      if (!nVal) {
        setTimeout(() => {
          linkData.desc = "";
          linkData.url = "";
        }, 200);
      }
    });
    return () => createVNode(MdModal, {
      "title": title.value,
      "visible": props22.visible,
      "onClose": props22.onCancel
    }, {
      default: () => {
        var _a4, _b, _c, _d, _e;
        return [createVNode("div", {
          "class": `${prefix}-form-item`
        }, [createVNode("label", {
          "class": `${prefix}-label`,
          "for": `link-desc-${editorId}`
        }, [(_a4 = ult.value.linkModalTips) == null ? void 0 : _a4.descLabel]), createVNode("input", {
          "placeholder": (_b = ult.value.linkModalTips) == null ? void 0 : _b.descLabelPlaceHolder,
          "class": `${prefix}-input`,
          "id": `link-desc-${editorId}`,
          "type": "text",
          "value": linkData.desc,
          "onChange": (e2) => {
            linkData.desc = e2.target.value;
          },
          "autocomplete": "off"
        }, null)]), createVNode("div", {
          "class": `${prefix}-form-item`
        }, [createVNode("label", {
          "class": `${prefix}-label`,
          "for": `link-url-${editorId}`
        }, [(_c = ult.value.linkModalTips) == null ? void 0 : _c.urlLabel]), createVNode("input", {
          "placeholder": (_d = ult.value.linkModalTips) == null ? void 0 : _d.urlLabelPlaceHolder,
          "class": `${prefix}-input`,
          "id": `link-url-${editorId}`,
          "type": "text",
          "value": linkData.url,
          "onChange": (e2) => {
            linkData.url = e2.target.value;
          },
          "autocomplete": "off"
        }, null)]), createVNode("div", {
          "class": `${prefix}-form-item`
        }, [createVNode("button", {
          "class": [`${prefix}-btn`, `${prefix}-btn-row`],
          "type": "button",
          "onClick": () => {
            props22.onOk(linkData);
            linkData.desc = "";
            linkData.url = "";
          }
        }, [(_e = ult.value.linkModalTips) == null ? void 0 : _e.buttonOK])])];
      }
    });
  }
});
var props$4 = {
  visible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
var ClipModal = defineComponent({
  props: props$4,
  setup(props22) {
    var _a4, _b, _c;
    const ult = inject("usedLanguageText");
    const editorId = inject("editorId");
    let Cropper = (_c = (_b = (_a4 = configOption) == null ? void 0 : _a4.editorExtensions) == null ? void 0 : _b.cropper) == null ? void 0 : _c.instance;
    const uploadRef = ref();
    const uploadImgRef = ref();
    const previewTargetRef = ref();
    const data = reactive({
      cropperInited: false,
      imgSelected: false,
      imgSrc: "",
      // 是否全屏
      isFullscreen: false
    });
    let cropper = null;
    watch(() => props22.visible, () => {
      if (props22.visible && !data.cropperInited) {
        Cropper = Cropper || window.Cropper;
        uploadRef.value.onchange = () => {
          if (!Cropper) {
            bus.emit(editorId, ERROR_CATCHER, {
              name: "Cropper",
              message: "Cropper is undefined"
            });
            return;
          }
          const fileList = uploadRef.value.files || [];
          data.imgSelected = true;
          if ((fileList == null ? void 0 : fileList.length) > 0) {
            const fileReader = new FileReader();
            fileReader.onload = (e2) => {
              data.imgSrc = e2.target.result;
              nextTick(() => {
                cropper = new Cropper(uploadImgRef.value, {
                  viewMode: 2,
                  preview: `.${prefix}-clip-preview-target`
                  // aspectRatio: 16 / 9,
                });
              });
            };
            fileReader.readAsDataURL(fileList[0]);
          }
        };
      }
    });
    watch(() => [data.imgSelected], () => {
      previewTargetRef.value.style = "";
    });
    watch(() => data.isFullscreen, () => {
      nextTick(() => {
        cropper == null ? void 0 : cropper.destroy();
        previewTargetRef.value.style = "";
        if (uploadImgRef.value) {
          cropper = new Cropper(uploadImgRef.value, {
            viewMode: 2,
            preview: `.${prefix}-clip-preview-target`
            // aspectRatio: 16 / 9,
          });
        }
      });
    });
    const reset = () => {
      cropper.clear();
      cropper.destroy();
      cropper = null;
      uploadRef.value.value = "";
      data.imgSelected = false;
    };
    return () => {
      var _a22;
      return createVNode(MdModal, {
        "class": `${prefix}-modal-clip`,
        "title": (_a22 = ult.value.clipModalTips) == null ? void 0 : _a22.title,
        "visible": props22.visible,
        "onClose": props22.onCancel,
        "showAdjust": true,
        "isFullscreen": data.isFullscreen,
        "onAdjust": (val) => {
          data.isFullscreen = val;
        },
        "width": "668px",
        "height": "421px"
      }, {
        default: () => {
          var _a32, _b2;
          return [createVNode("div", {
            "class": `${prefix}-form-item ${prefix}-clip`
          }, [createVNode("div", {
            "class": `${prefix}-clip-main`
          }, [data.imgSelected ? createVNode("div", {
            "class": `${prefix}-clip-cropper`
          }, [createVNode("img", {
            "src": data.imgSrc,
            "ref": uploadImgRef,
            "style": {
              display: "none"
            },
            "alt": ""
          }, null), createVNode("div", {
            "class": `${prefix}-clip-delete`,
            "onClick": reset
          }, [createVNode(Icon, {
            "name": "delete"
          }, null)])]) : createVNode("div", {
            "class": `${prefix}-clip-upload`,
            "onClick": () => {
              uploadRef.value.click();
            }
          }, [createVNode(Icon, {
            "name": "upload"
          }, null)])]), createVNode("div", {
            "class": `${prefix}-clip-preview`
          }, [createVNode("div", {
            "class": `${prefix}-clip-preview-target`,
            "ref": previewTargetRef
          }, null)])]), createVNode("div", {
            "class": `${prefix}-form-item`
          }, [createVNode("button", {
            "class": `${prefix}-btn`,
            "type": "button",
            "onClick": () => {
              if (cropper) {
                const cvs = cropper.getCroppedCanvas();
                bus.emit(editorId, UPLOAD_IMAGE, [base642File(cvs.toDataURL("image/png"))], props22.onOk);
                reset();
              }
            }
          }, [((_a32 = ult.value.clipModalTips) == null ? void 0 : _a32.buttonUpload) || ((_b2 = ult.value.linkModalTips) == null ? void 0 : _b2.buttonOK)])]), createVNode("input", {
            "ref": uploadRef,
            "accept": "image/*",
            "type": "file",
            "multiple": false,
            "style": {
              display: "none"
            }
          }, null)];
        }
      });
    };
  }
});
var props$3 = {
  type: {
    type: String,
    default: "link"
  },
  linkVisible: {
    type: Boolean,
    default: false
  },
  clipVisible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
var Modals = defineComponent({
  props: props$3,
  setup(props22) {
    return () => createVNode(Fragment, null, [createVNode(LinkModal, {
      "type": props22.type,
      "visible": props22.linkVisible,
      "onOk": props22.onOk,
      "onCancel": props22.onCancel
    }, null), createVNode(ClipModal, {
      "visible": props22.clipVisible,
      "onOk": props22.onOk,
      "onCancel": props22.onCancel
    }, null)]);
  }
});
var ToolBar = defineComponent({
  name: "MDEditorToolbar",
  props: toolbarProps,
  setup(props22) {
    const editorId = inject("editorId");
    const ult = inject("usedLanguageText");
    const theme = inject("theme");
    const language = inject("language");
    const {
      fullscreenHandler
    } = useSreenfull(props22);
    const wrapperId = `${editorId}-toolbar-wrapper`;
    const wrapperRef = ref();
    const visible = reactive({
      title: false,
      catalog: false,
      // 图片上传下拉
      image: false,
      // 表格预选
      table: false,
      // mermaid
      mermaid: false,
      katex: false
    });
    const emitHandler = (direct, params) => {
      bus.emit(editorId, REPLACE, direct, params);
    };
    const modalData = reactive({
      type: "link",
      linkVisible: false,
      clipVisible: false
    });
    const toolbarLeftRef = ref();
    onMounted(() => {
      bus.on(editorId, {
        name: OPEN_MODALS,
        callback(type) {
          modalData.type = type;
          modalData.linkVisible = true;
        }
      });
    });
    const splitedbar = computed(() => {
      const excluedBars = props22.toolbars.filter((barItem) => !props22.toolbarsExclude.includes(barItem));
      const moduleSplitIndex = excluedBars.indexOf("=");
      const barLeft = moduleSplitIndex === -1 ? excluedBars : excluedBars.slice(0, moduleSplitIndex + 1);
      const barRight = moduleSplitIndex === -1 ? [] : excluedBars.slice(moduleSplitIndex, Number.MAX_SAFE_INTEGER);
      return [barLeft, barRight];
    });
    const uploadRef = ref();
    const uploadHandler = () => {
      bus.emit(editorId, UPLOAD_IMAGE, Array.from(uploadRef.value.files || []));
      uploadRef.value.value = "";
    };
    onMounted(() => {
      uploadRef.value.addEventListener("change", uploadHandler);
    });
    const barRender = (barItem) => {
      var _a4, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma;
      if (allToolbar.includes(barItem)) {
        switch (barItem) {
          case "-": {
            return createVNode(Divider, null, null);
          }
          case "bold": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_a4 = ult.value.toolbarTips) == null ? void 0 : _a4.bold,
              "onClick": () => {
                emitHandler("bold");
              }
            }, [createVNode(Icon, {
              "name": "bold"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_b = ult.value.toolbarTips) == null ? void 0 : _b.bold])]);
          }
          case "underline": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_c = ult.value.toolbarTips) == null ? void 0 : _c.underline,
              "onClick": () => {
                emitHandler("underline");
              }
            }, [createVNode(Icon, {
              "name": "underline"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_d = ult.value.toolbarTips) == null ? void 0 : _d.underline])]);
          }
          case "italic": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_e = ult.value.toolbarTips) == null ? void 0 : _e.italic,
              "onClick": () => {
                emitHandler("italic");
              }
            }, [createVNode(Icon, {
              "name": "italic"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_f = ult.value.toolbarTips) == null ? void 0 : _f.italic])]);
          }
          case "strikeThrough": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_g = ult.value.toolbarTips) == null ? void 0 : _g.strikeThrough,
              "onClick": () => {
                emitHandler("strikeThrough");
              }
            }, [createVNode(Icon, {
              "name": "strike-through"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_h = ult.value.toolbarTips) == null ? void 0 : _h.strikeThrough])]);
          }
          case "title": {
            return createVNode(Dropdown, {
              "relative": `#${wrapperId}`,
              "visible": visible.title,
              "onChange": (v) => {
                visible.title = v;
              },
              "overlay": createVNode("ul", {
                "class": `${prefix}-menu`,
                "onClick": () => {
                  visible.title = false;
                }
              }, [createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h1");
                }
              }, [(_i = ult.value.titleItem) == null ? void 0 : _i.h1]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h2");
                }
              }, [(_j = ult.value.titleItem) == null ? void 0 : _j.h2]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h3");
                }
              }, [(_k = ult.value.titleItem) == null ? void 0 : _k.h3]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h4");
                }
              }, [(_l = ult.value.titleItem) == null ? void 0 : _l.h4]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h5");
                }
              }, [(_m = ult.value.titleItem) == null ? void 0 : _m.h5]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h6");
                }
              }, [(_n = ult.value.titleItem) == null ? void 0 : _n.h6])])
            }, {
              default: () => {
                var _a22, _b2;
                return [createVNode("div", {
                  "class": `${prefix}-toolbar-item`,
                  "title": (_a22 = ult.value.toolbarTips) == null ? void 0 : _a22.title
                }, [createVNode(Icon, {
                  "name": "title"
                }, null), props22.showToolbarName && createVNode("div", {
                  "class": `${prefix}-toolbar-item-name`
                }, [(_b2 = ult.value.toolbarTips) == null ? void 0 : _b2.title])])];
              }
            });
          }
          case "sub": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_o = ult.value.toolbarTips) == null ? void 0 : _o.sub,
              "onClick": () => {
                emitHandler("sub");
              }
            }, [createVNode(Icon, {
              "name": "sub"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_p = ult.value.toolbarTips) == null ? void 0 : _p.sub])]);
          }
          case "sup": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_q = ult.value.toolbarTips) == null ? void 0 : _q.sup,
              "onClick": () => {
                emitHandler("sup");
              }
            }, [createVNode(Icon, {
              "name": "sup"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_r = ult.value.toolbarTips) == null ? void 0 : _r.sup])]);
          }
          case "quote": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_s = ult.value.toolbarTips) == null ? void 0 : _s.quote,
              "onClick": () => {
                emitHandler("quote");
              }
            }, [createVNode(Icon, {
              "name": "quote"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_t = ult.value.toolbarTips) == null ? void 0 : _t.quote])]);
          }
          case "unorderedList": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_u = ult.value.toolbarTips) == null ? void 0 : _u.unorderedList,
              "onClick": () => {
                emitHandler("unorderedList");
              }
            }, [createVNode(Icon, {
              "name": "unordered-list"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_v = ult.value.toolbarTips) == null ? void 0 : _v.unorderedList])]);
          }
          case "orderedList": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_w = ult.value.toolbarTips) == null ? void 0 : _w.orderedList,
              "onClick": () => {
                emitHandler("orderedList");
              }
            }, [createVNode(Icon, {
              "name": "ordered-list"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_x = ult.value.toolbarTips) == null ? void 0 : _x.orderedList])]);
          }
          case "task": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_y = ult.value.toolbarTips) == null ? void 0 : _y.task,
              "onClick": () => {
                emitHandler("task");
              }
            }, [createVNode(Icon, {
              "name": "task"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_z = ult.value.toolbarTips) == null ? void 0 : _z.task])]);
          }
          case "codeRow": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_A = ult.value.toolbarTips) == null ? void 0 : _A.codeRow,
              "onClick": () => {
                emitHandler("codeRow");
              }
            }, [createVNode(Icon, {
              "name": "code-row"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_B = ult.value.toolbarTips) == null ? void 0 : _B.codeRow])]);
          }
          case "code": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_C = ult.value.toolbarTips) == null ? void 0 : _C.code,
              "onClick": () => {
                emitHandler("code");
              }
            }, [createVNode(Icon, {
              "name": "code"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_D = ult.value.toolbarTips) == null ? void 0 : _D.code])]);
          }
          case "link": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_E = ult.value.toolbarTips) == null ? void 0 : _E.link,
              "onClick": () => {
                modalData.type = "link";
                modalData.linkVisible = true;
              }
            }, [createVNode(Icon, {
              "name": "link"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_F = ult.value.toolbarTips) == null ? void 0 : _F.link])]);
          }
          case "image": {
            return props22.noUploadImg ? createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_G = ult.value.toolbarTips) == null ? void 0 : _G.image,
              "onClick": () => {
                modalData.type = "image";
                modalData.linkVisible = true;
              }
            }, [createVNode(Icon, {
              "name": "image"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_H = ult.value.toolbarTips) == null ? void 0 : _H.image])]) : createVNode(Dropdown, {
              "relative": `#${wrapperId}`,
              "visible": visible.image,
              "onChange": (v) => {
                visible.image = v;
              },
              "overlay": createVNode("ul", {
                "class": `${prefix}-menu`,
                "onClick": () => {
                  visible.title = false;
                }
              }, [createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-image`,
                "onClick": () => {
                  modalData.type = "image";
                  modalData.linkVisible = true;
                }
              }, [(_I = ult.value.imgTitleItem) == null ? void 0 : _I.link]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-image`,
                "onClick": () => {
                  uploadRef.value.click();
                }
              }, [(_J = ult.value.imgTitleItem) == null ? void 0 : _J.upload]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-image`,
                "onClick": () => {
                  modalData.clipVisible = true;
                }
              }, [(_K = ult.value.imgTitleItem) == null ? void 0 : _K.clip2upload])])
            }, {
              default: () => {
                var _a22, _b2;
                return [createVNode("div", {
                  "class": `${prefix}-toolbar-item`,
                  "title": (_a22 = ult.value.toolbarTips) == null ? void 0 : _a22.image
                }, [createVNode(Icon, {
                  "name": "image"
                }, null), props22.showToolbarName && createVNode("div", {
                  "class": `${prefix}-toolbar-item-name`
                }, [(_b2 = ult.value.toolbarTips) == null ? void 0 : _b2.image])])];
              }
            });
          }
          case "table": {
            return createVNode(Dropdown, {
              "relative": `#${wrapperId}`,
              "visible": visible.table,
              "onChange": (v) => {
                visible.table = v;
              },
              "key": "bar-table",
              "overlay": createVNode(TableShape$1, {
                "tableShape": props22.tableShape,
                "onSelected": (selectedShape) => {
                  emitHandler("table", {
                    selectedShape
                  });
                }
              }, null)
            }, {
              default: () => {
                var _a22, _b2;
                return [createVNode("div", {
                  "class": `${prefix}-toolbar-item`,
                  "title": (_a22 = ult.value.toolbarTips) == null ? void 0 : _a22.table
                }, [createVNode(Icon, {
                  "name": "table"
                }, null), props22.showToolbarName && createVNode("div", {
                  "class": `${prefix}-toolbar-item-name`
                }, [(_b2 = ult.value.toolbarTips) == null ? void 0 : _b2.table])])];
              }
            });
          }
          case "revoke": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_L = ult.value.toolbarTips) == null ? void 0 : _L.revoke,
              "onClick": () => {
                bus.emit(editorId, CTRL_Z);
              }
            }, [createVNode(Icon, {
              "name": "revoke"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_M = ult.value.toolbarTips) == null ? void 0 : _M.revoke])]);
          }
          case "next": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_N = ult.value.toolbarTips) == null ? void 0 : _N.next,
              "onClick": () => {
                bus.emit(editorId, CTRL_SHIFT_Z);
              }
            }, [createVNode(Icon, {
              "name": "next"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_O = ult.value.toolbarTips) == null ? void 0 : _O.next])]);
          }
          case "save": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_P = ult.value.toolbarTips) == null ? void 0 : _P.save,
              "onClick": () => {
                bus.emit(editorId, ON_SAVE);
              }
            }, [createVNode(Icon, {
              "name": "baocun"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_Q = ult.value.toolbarTips) == null ? void 0 : _Q.save])]);
          }
          case "prettier": {
            return !props22.noPrettier ? createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_R = ult.value.toolbarTips) == null ? void 0 : _R.prettier,
              "onClick": () => {
                emitHandler("prettier");
              }
            }, [createVNode(Icon, {
              "name": "prettier"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_S = ult.value.toolbarTips) == null ? void 0 : _S.prettier])]) : "";
          }
          case "pageFullscreen": {
            return !props22.setting.fullscreen && createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_T = ult.value.toolbarTips) == null ? void 0 : _T.pageFullscreen,
              "onClick": () => {
                props22.updateSetting("pageFullscreen");
              }
            }, [createVNode(Icon, {
              "name": props22.setting.pageFullscreen ? "suoxiao" : "fangda"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_U = ult.value.toolbarTips) == null ? void 0 : _U.pageFullscreen])]);
          }
          case "fullscreen": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_V = ult.value.toolbarTips) == null ? void 0 : _V.fullscreen,
              "onClick": () => {
                fullscreenHandler();
              }
            }, [createVNode(Icon, {
              "name": props22.setting.fullscreen ? "fullscreen-exit" : "fullscreen"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_W = ult.value.toolbarTips) == null ? void 0 : _W.fullscreen])]);
          }
          case "preview": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_X = ult.value.toolbarTips) == null ? void 0 : _X.preview,
              "onClick": () => {
                props22.updateSetting("preview");
              }
            }, [createVNode(Icon, {
              "name": "preview"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_Y = ult.value.toolbarTips) == null ? void 0 : _Y.preview])]);
          }
          case "htmlPreview": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_Z = ult.value.toolbarTips) == null ? void 0 : _Z.htmlPreview,
              "onClick": () => {
                props22.updateSetting("htmlPreview");
              }
            }, [createVNode(Icon, {
              "name": "coding"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(__ = ult.value.toolbarTips) == null ? void 0 : __.htmlPreview])]);
          }
          case "catalog": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_$ = ult.value.toolbarTips) == null ? void 0 : _$.catalog,
              "onClick": () => {
                bus.emit(editorId, CHANGE_CATALOG_VISIBLE);
              },
              "key": "bar-catalog"
            }, [createVNode(Icon, {
              "name": "catalog"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_aa = ult.value.toolbarTips) == null ? void 0 : _aa.catalog])]);
          }
          case "github": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_ba = ult.value.toolbarTips) == null ? void 0 : _ba.github,
              "onClick": () => C("https://github.com/imzbf/md-editor-v3")
            }, [createVNode(Icon, {
              "name": "github"
            }, null), props22.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_ca = ult.value.toolbarTips) == null ? void 0 : _ca.github])]);
          }
          case "mermaid": {
            return createVNode(Dropdown, {
              "relative": `#${wrapperId}`,
              "visible": visible.mermaid,
              "onChange": (v) => {
                visible.mermaid = v;
              },
              "overlay": createVNode("ul", {
                "class": `${prefix}-menu`,
                "onClick": () => {
                  visible.mermaid = false;
                }
              }, [createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("flow");
                }
              }, [(_da = ult.value.mermaid) == null ? void 0 : _da.flow]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("sequence");
                }
              }, [(_ea = ult.value.mermaid) == null ? void 0 : _ea.sequence]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("gantt");
                }
              }, [(_fa = ult.value.mermaid) == null ? void 0 : _fa.gantt]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("class");
                }
              }, [(_ga = ult.value.mermaid) == null ? void 0 : _ga.class]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("state");
                }
              }, [(_ha = ult.value.mermaid) == null ? void 0 : _ha.state]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("pie");
                }
              }, [(_ia = ult.value.mermaid) == null ? void 0 : _ia.pie]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("relationship");
                }
              }, [(_ja = ult.value.mermaid) == null ? void 0 : _ja.relationship]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("journey");
                }
              }, [(_ka = ult.value.mermaid) == null ? void 0 : _ka.journey])]),
              "key": "bar-mermaid"
            }, {
              default: () => {
                var _a22, _b2;
                return [createVNode("div", {
                  "class": `${prefix}-toolbar-item`,
                  "title": (_a22 = ult.value.toolbarTips) == null ? void 0 : _a22.mermaid
                }, [createVNode(Icon, {
                  "name": "mermaid"
                }, null), props22.showToolbarName && createVNode("div", {
                  "class": `${prefix}-toolbar-item-name`
                }, [(_b2 = ult.value.toolbarTips) == null ? void 0 : _b2.mermaid])])];
              }
            });
          }
          case "katex": {
            return createVNode(Dropdown, {
              "relative": `#${wrapperId}`,
              "visible": visible.katex,
              "onChange": (v) => {
                visible.katex = v;
              },
              "overlay": createVNode("ul", {
                "class": `${prefix}-menu`,
                "onClick": () => {
                  visible.katex = false;
                }
              }, [createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-katex`,
                "onClick": () => {
                  emitHandler("katexInline");
                }
              }, [(_la = ult.value.katex) == null ? void 0 : _la.inline]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-katex`,
                "onClick": () => {
                  emitHandler("katexBlock");
                }
              }, [(_ma = ult.value.katex) == null ? void 0 : _ma.block])]),
              "key": "bar-katex"
            }, {
              default: () => {
                var _a22, _b2;
                return [createVNode("div", {
                  "class": `${prefix}-toolbar-item`,
                  "title": (_a22 = ult.value.toolbarTips) == null ? void 0 : _a22.katex
                }, [createVNode(Icon, {
                  "name": "formula"
                }, null), props22.showToolbarName && createVNode("div", {
                  "class": `${prefix}-toolbar-item-name`
                }, [(_b2 = ult.value.toolbarTips) == null ? void 0 : _b2.katex])])];
              }
            });
          }
        }
      } else if (props22.defToolbars instanceof Array) {
        const defItem = props22.defToolbars[barItem];
        if (defItem) {
          const defItemCloned = cloneVNode(defItem, {
            theme: theme.value,
            language: language.value,
            insert(generate) {
              bus.emit(editorId, REPLACE, "universal", {
                generate
              });
            }
          });
          return defItemCloned;
        }
        return "";
      } else if (props22.defToolbars && props22.defToolbars.children instanceof Array) {
        const defItem = props22.defToolbars.children[barItem];
        if (defItem) {
          const defItemCloned = cloneVNode(defItem, {
            theme: theme.value,
            language: language.value,
            insert(generate) {
              bus.emit(editorId, REPLACE, "universal", {
                generate
              });
            }
          });
          return defItemCloned;
        }
        return "";
      } else {
        return "";
      }
    };
    watch(() => props22.toolbars, () => {
      nextTick(() => {
        if (wrapperRef.value) {
          $(wrapperRef.value);
        }
      });
    }, {
      immediate: true
    });
    return () => {
      const LeftBar = splitedbar.value[0].map((barItem) => barRender(barItem));
      const RightBar = splitedbar.value[1].map((barItem) => barRender(barItem));
      return createVNode(Fragment, null, [props22.toolbars.length > 0 && createVNode("div", {
        "class": `${prefix}-toolbar-wrapper`,
        "ref": wrapperRef,
        "id": wrapperId
      }, [createVNode("div", {
        "class": [`${prefix}-toolbar`, props22.showToolbarName && `${prefix}-stn`]
      }, [createVNode("div", {
        "class": `${prefix}-toolbar-left`,
        "ref": toolbarLeftRef
      }, [LeftBar]), createVNode("div", {
        "class": `${prefix}-toolbar-right`
      }, [RightBar])])]), createVNode("input", {
        "ref": uploadRef,
        "accept": "image/*",
        "type": "file",
        "multiple": true,
        "style": {
          display: "none"
        }
      }, null), createVNode(Modals, {
        "linkVisible": modalData.linkVisible,
        "clipVisible": modalData.clipVisible,
        "type": modalData.type,
        "onCancel": () => {
          modalData.linkVisible = false;
          modalData.clipVisible = false;
        },
        "onOk": (data) => {
          if (data) {
            emitHandler(modalData.type, {
              desc: data.desc,
              url: data.url
            });
          }
          modalData.linkVisible = false;
          modalData.clipVisible = false;
        }
      }, null)]);
    };
  }
});
var DATA_LINE_SELECTOR = `.${prefix}-preview > [data-line]`;
var scrollAutoWithScale = (pEle, cEle) => {
  const addEvent = x(() => {
    pEle.removeEventListener("scroll", scrollHandler);
    pEle.addEventListener("scroll", scrollHandler);
    cEle.removeEventListener("scroll", scrollHandler);
    cEle.addEventListener("scroll", scrollHandler);
  }, 50);
  const scrollHandler = (e2) => {
    const pHeight = pEle.clientHeight;
    const cHeight = cEle.clientHeight;
    const pScrollHeight = pEle.scrollHeight;
    const cScrollHeight = cEle.scrollHeight;
    const scale = (pScrollHeight - pHeight) / (cScrollHeight - cHeight);
    if (e2.target === pEle) {
      cEle.removeEventListener("scroll", scrollHandler);
      cEle.scrollTo({
        top: pEle.scrollTop / scale
        // behavior: 'smooth'
      });
      addEvent();
    } else {
      pEle.removeEventListener("scroll", scrollHandler);
      pEle.scrollTo({
        top: cEle.scrollTop * scale
        // behavior: 'smooth'
      });
      addEvent();
    }
  };
  return [
    () => {
      addEvent().finally(() => {
        pEle.dispatchEvent(new Event("scroll"));
      });
    },
    () => {
      pEle.removeEventListener("scroll", scrollHandler);
      cEle.removeEventListener("scroll", scrollHandler);
    }
  ];
};
var scrollAuto = (pEle, cEle, codeMirrorUt) => {
  const { view } = codeMirrorUt;
  const smoothScroll = M();
  const getTopByLine = (line) => {
    return view.lineBlockAt(view.state.doc.line(line).from).top;
  };
  const getHeightByLine = (line) => {
    return view.lineBlockAt(view.state.doc.line(line).from).height;
  };
  let blockMap = [];
  let elesHasLineNumber = [];
  let startLines = [];
  const buildMap = () => {
    blockMap = [];
    elesHasLineNumber = [];
    startLines = [];
    elesHasLineNumber = elesHasLineNumber.concat(
      Array.from(cEle.querySelectorAll(DATA_LINE_SELECTOR))
    );
    const startLinesCalc = elesHasLineNumber.map((item) => Number(item.dataset.line) + 1);
    startLines = startLines.concat(startLinesCalc);
    const { lines } = view.state.doc;
    let start = 1;
    let end = startLinesCalc.shift() ?? lines;
    for (let i2 = 1; i2 <= lines; i2++) {
      if (i2 === end) {
        start = i2;
        end = startLinesCalc.shift() || lines + 1;
      }
      blockMap.push({
        start,
        end: end - 1
      });
    }
  };
  let pLock = 0;
  let cLock = 0;
  const pEleHandler = () => {
    var _a4, _b;
    if (cLock !== 0) {
      return false;
    }
    pLock++;
    const { scrollDOM, contentHeight } = view;
    let cElePaddingTop = +getComputedStyle(cEle).paddingTop.replace("px", "");
    const blockInfo = view.lineBlockAtHeight(scrollDOM.scrollTop);
    const { number: currLine } = view.state.doc.lineAt(blockInfo.from);
    const blockData = blockMap[currLine - 1];
    if (!blockData) {
      return false;
    }
    let endLinePosition = getTopByLine(blockData.end) + getHeightByLine(blockData.end);
    let scale = 0;
    const startTop = getTopByLine(blockData.start);
    const startEle = cEle.querySelector(`[data-line="${blockData.start - 1}"]`) || ((_a4 = cEle.firstElementChild) == null ? void 0 : _a4.firstElementChild);
    const endEle = cEle.querySelector(`[data-line="${blockData.end}"]`) || ((_b = cEle.lastElementChild) == null ? void 0 : _b.lastElementChild);
    let blockHeight = 0;
    let startEleOffetTop = 0;
    if (startTop === 0) {
      scale = scrollDOM.scrollTop / endLinePosition;
      if (startEle === endEle) {
        cElePaddingTop = 0;
        endLinePosition = contentHeight - scrollDOM.offsetHeight;
        blockHeight = endEle.offsetTop + endEle.offsetHeight - cEle.clientHeight;
      } else {
        blockHeight = endEle.offsetTop;
      }
    } else {
      scale = (scrollDOM.scrollTop - startTop) / (endLinePosition - startTop);
      startEleOffetTop = startEle.offsetTop;
      blockHeight = endEle.offsetTop - startEleOffetTop;
    }
    if (endLinePosition > scrollDOM.scrollHeight - scrollDOM.clientHeight) {
      scale = (scrollDOM.scrollTop - startTop) / (scrollDOM.scrollHeight - scrollDOM.clientHeight - startTop);
      startEleOffetTop = startEle.offsetTop;
      blockHeight = cEle.scrollHeight - cEle.clientHeight - startEleOffetTop + 10;
    }
    const scrollToTop = startEleOffetTop - cElePaddingTop + blockHeight * scale;
    smoothScroll(cEle, scrollToTop, () => {
      pLock--;
    });
  };
  const cEleHandler = () => {
    var _a4, _b, _c, _d, _e, _f;
    if (pLock !== 0) {
      return;
    }
    cLock++;
    const { scrollDOM } = view;
    const cScrollTop = cEle.scrollTop;
    const cScrollHeight = cEle.scrollHeight;
    let realEleStart = (_a4 = cEle.firstElementChild) == null ? void 0 : _a4.firstElementChild;
    let realEleEnd = (_b = cEle.firstElementChild) == null ? void 0 : _b.lastElementChild;
    if (startLines.length > 0) {
      let virtualLine = Math.ceil(
        Number(startLines[startLines.length - 1]) * (cScrollTop / cScrollHeight)
      );
      let startLineIndex = startLines.findLastIndex((value) => value <= virtualLine);
      startLineIndex = startLineIndex === -1 ? 0 : startLineIndex;
      virtualLine = startLines[startLineIndex];
      for (let i2 = startLineIndex; i2 >= 0 && i2 < startLines.length; ) {
        const currentElementTop = elesHasLineNumber[i2].offsetTop;
        if (currentElementTop > cScrollTop) {
          if (i2 - 1 >= 0) {
            i2--;
            continue;
          }
          virtualLine = -1;
          startLineIndex = i2;
          break;
        } else {
          if (i2 + 1 <= startLines.length && elesHasLineNumber[i2 + 1].offsetTop < cScrollTop) {
            i2++;
            continue;
          }
          virtualLine = startLines[i2];
          startLineIndex = i2;
          break;
        }
      }
      switch (virtualLine) {
        case -1: {
          realEleStart = (_c = cEle.firstElementChild) == null ? void 0 : _c.firstElementChild;
          realEleEnd = elesHasLineNumber[startLineIndex];
          break;
        }
        case startLines.length - 1: {
          realEleStart = elesHasLineNumber[startLineIndex];
          realEleEnd = (_d = cEle.firstElementChild) == null ? void 0 : _d.lastElementChild;
          break;
        }
        default: {
          realEleStart = elesHasLineNumber[startLineIndex];
          realEleEnd = elesHasLineNumber[startLineIndex + 1];
        }
      }
    }
    const eleStartOffsetTop = realEleStart === ((_e = cEle.firstElementChild) == null ? void 0 : _e.firstElementChild) ? 0 : realEleStart.offsetTop;
    let eleEndOffsetTop = realEleEnd.offsetTop;
    let scale = 0;
    const { start, end } = blockMap[Number(realEleStart.dataset.line || 0)];
    const firstLineScrollTop = getTopByLine(start);
    let endLineScrollTop = getTopByLine(end + 1);
    let blockHeight = 0;
    if (endLineScrollTop > scrollDOM.scrollHeight - scrollDOM.clientHeight || realEleEnd.scrollTop > cEle.scrollHeight - cEle.clientHeight) {
      scale = Math.max(
        (cScrollTop - eleStartOffsetTop) / (cEle.scrollHeight - eleStartOffsetTop - cEle.clientHeight),
        0
      );
      endLineScrollTop = getTopByLine(view.state.doc.lines) + getHeightByLine(view.state.doc.lines);
      blockHeight = 8 + endLineScrollTop - firstLineScrollTop - pEle.clientHeight;
    } else if (realEleStart === ((_f = cEle.firstElementChild) == null ? void 0 : _f.firstElementChild)) {
      if (realEleStart === realEleEnd) {
        eleEndOffsetTop = realEleEnd.offsetTop + realEleEnd.offsetHeight + +getComputedStyle(realEleEnd).marginBottom.replace("px", "");
        blockHeight = endLineScrollTop;
      } else {
        blockHeight = endLineScrollTop;
      }
      scale = Math.max(cScrollTop / eleEndOffsetTop, 0);
    } else {
      scale = Math.max(
        (cScrollTop - eleStartOffsetTop) / (eleEndOffsetTop - eleStartOffsetTop),
        0
      );
      blockHeight = endLineScrollTop - firstLineScrollTop;
    }
    smoothScroll(pEle, firstLineScrollTop + blockHeight * scale, () => {
      cLock--;
    });
  };
  const scrollHandler = F((e2) => {
    var _a4;
    const { scrollDOM, contentHeight } = view;
    const scrollDomHeight = scrollDOM.clientHeight;
    if (contentHeight <= scrollDomHeight || cEle.firstElementChild.clientHeight <= cEle.clientHeight) {
      return false;
    }
    if (view.state.doc.lines < ((_a4 = blockMap[blockMap.length - 1]) == null ? void 0 : _a4.end)) {
      return false;
    }
    if (e2.target === pEle) {
      pEleHandler();
    } else {
      cEleHandler();
    }
  }, 8);
  return [
    () => {
      buildMap();
      pEle.addEventListener("scroll", scrollHandler);
      cEle.addEventListener("scroll", scrollHandler);
      pEle.dispatchEvent(new Event("scroll"));
    },
    () => {
      pEle.removeEventListener("scroll", scrollHandler);
      cEle.removeEventListener("scroll", scrollHandler);
    }
  ];
};
var useAutoScroll = (props22, html, codeMirrorUt) => {
  const editorId = inject("editorId");
  let clearScrollAuto = () => {
  };
  let initScrollAuto = () => {
  };
  const rebindEvent = () => {
    clearScrollAuto();
    const cmScroller = document.querySelector(
      `#${editorId} .cm-scroller`
    );
    const previewEle = document.querySelector(
      `[id="${editorId}-preview-wrapper"]`
    );
    const htmlEle = document.querySelector(
      `[id="${editorId}-html-wrapper"]`
    );
    if (previewEle || htmlEle) {
      const scrollHandler = previewEle ? scrollAuto : scrollAutoWithScale;
      const cEle = previewEle || htmlEle;
      [initScrollAuto, clearScrollAuto] = scrollHandler(
        cmScroller,
        cEle,
        codeMirrorUt.value
      );
    }
    if (props22.scrollAuto) {
      initScrollAuto();
    }
  };
  watch(
    [
      html,
      toRef(props22.setting, "preview"),
      toRef(props22.setting, "htmlPreview"),
      toRef(props22.setting, "fullscreen"),
      toRef(props22.setting, "pageFullscreen")
    ],
    () => {
      nextTick(rebindEvent);
    }
  );
  watch(
    () => props22.scrollAuto,
    (sa) => {
      if (sa) {
        initScrollAuto();
      } else {
        clearScrollAuto();
      }
    }
  );
  onMounted(rebindEvent);
};
var directive2flag = (direct, codeMirrorUt, params) => {
  var _a4, _b, _c, _d, _e, _f;
  let targetValue = "";
  let deviationStart = 0;
  let deviationEnd = 0;
  let select = true;
  let replaceAll2 = false;
  const selectedText = codeMirrorUt.getSelectedText();
  const mermaidTemplate = (_a4 = configOption.editorConfig) == null ? void 0 : _a4.mermaidTemplate;
  if (/^h[1-6]{1}$/.test(direct)) {
    const pix = direct.replace(/^h(\d)/, (_, num) => {
      return new Array(Number(num)).fill("#", 0, num).join("");
    });
    targetValue = `${pix} ${selectedText}`;
    deviationStart = pix.length + 1;
  } else if (direct === "prettier") {
    const prettier = window.prettier || ((_c = (_b = configOption.editorExtensions) == null ? void 0 : _b.prettier) == null ? void 0 : _c.prettierInstance);
    const prettierPlugins = [
      ((_d = window.prettierPlugins) == null ? void 0 : _d.markdown) || ((_f = (_e = configOption.editorExtensions) == null ? void 0 : _e.prettier) == null ? void 0 : _f.parserMarkdownInstance)
    ];
    if (!prettier || prettierPlugins[0] === void 0) {
      bus.emit(params.editorId, ERROR_CATCHER, {
        name: "prettier",
        message: "prettier is undefined"
      });
      targetValue = codeMirrorUt.getValue();
    } else {
      targetValue = prettier.format(codeMirrorUt.getValue(), {
        parser: "markdown",
        plugins: prettierPlugins
      });
    }
    select = false;
    replaceAll2 = true;
  } else {
    switch (direct) {
      case "bold": {
        targetValue = `**${selectedText}**`;
        deviationStart = 2;
        deviationEnd = -2;
        break;
      }
      case "underline": {
        targetValue = `<u>${selectedText}</u>`;
        deviationStart = 3;
        deviationEnd = -4;
        break;
      }
      case "italic": {
        targetValue = `*${selectedText}*`;
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case "strikeThrough": {
        targetValue = `~~${selectedText}~~`;
        deviationStart = 2;
        deviationEnd = -2;
        break;
      }
      case "sub": {
        targetValue = `<sub>${selectedText}</sub>`;
        deviationStart = 5;
        deviationEnd = -6;
        break;
      }
      case "sup": {
        targetValue = `<sup>${selectedText}</sup>`;
        deviationStart = 5;
        deviationEnd = -6;
        break;
      }
      case "codeRow": {
        targetValue = "`" + selectedText + "`";
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case "quote": {
        targetValue = `> ${selectedText}`;
        deviationStart = 2;
        break;
      }
      case "orderedList": {
        targetValue = `1. ${selectedText}`;
        deviationStart = 3;
        break;
      }
      case "unorderedList": {
        targetValue = `- ${selectedText}`;
        deviationStart = 2;
        break;
      }
      case "task": {
        targetValue = `- [ ] ${selectedText}`;
        deviationStart = 6;
        break;
      }
      case "code": {
        const text2 = params.text || selectedText || "";
        const mode = params.mode || "language";
        targetValue = `\`\`\`${mode}
${text2}
\`\`\`
`;
        deviationStart = 3;
        deviationEnd = 3 + mode.length - targetValue.length;
        break;
      }
      case "table": {
        targetValue = "|";
        const { selectedShape = { x: 1, y: 1 } } = params;
        const { x: x2, y } = selectedShape;
        for (let i2 = 0; i2 <= y; i2++) {
          targetValue += " col |";
        }
        targetValue += "\n|";
        for (let i2 = 0; i2 <= y; i2++) {
          targetValue += " - |";
        }
        for (let row = 0; row <= x2; row++) {
          targetValue += "\n|";
          for (let col = 0; col <= y; col++) {
            targetValue += " content |";
          }
        }
        deviationStart = 2;
        deviationEnd = 5 - targetValue.length;
        break;
      }
      case "link": {
        const { desc, url } = params;
        targetValue = `[${desc}](${url})`;
        select = false;
        break;
      }
      case "image": {
        const { desc, url, urls } = params;
        if (urls instanceof Array) {
          targetValue = urls.reduce((pVal, _url) => {
            const {
              url: url2 = "",
              alt = "",
              title = ""
            } = typeof _url === "object" ? _url : { url: _url };
            return pVal + `![${alt}](${url2}${title ? " '" + title + "'" : ""})
`;
          }, "");
        } else {
          targetValue = `![${desc}](${url})
`;
        }
        select = false;
        break;
      }
      case "flow": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.flow) || "flowchart TD \n  Start --> Stop"}
\`\`\`
`;
        deviationStart = 3;
        deviationEnd = 10 - targetValue.length;
        break;
      }
      case "sequence": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.sequence) || "sequenceDiagram\n  A->>B: hello!\n  B-->>A: hi!\n  A-)B: bye!"}
\`\`\`
`;
        deviationStart = 3;
        deviationEnd = 10 - targetValue.length;
        break;
      }
      case "gantt": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.gantt) || "gantt\ntitle A Gantt Diagram\ndateFormat  YYYY-MM-DD\nsection Section\nA task  :a1, 2014-01-01, 30d\nAnother task  :after a1, 20d"}
\`\`\`
`;
        deviationStart = 3;
        deviationEnd = 10 - targetValue.length;
        break;
      }
      case "class": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.class) || "classDiagram\n  class Animal\n  Vehicle <|-- Car"}
\`\`\`
`;
        deviationStart = 3;
        deviationEnd = 10 - targetValue.length;
        break;
      }
      case "state": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.state) || "stateDiagram-v2\n  s1 --> s2"}
\`\`\`
`;
        deviationStart = 3;
        deviationEnd = 10 - targetValue.length;
        break;
      }
      case "pie": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.pie) || 'pie title Pets adopted by volunteers\n  "Dogs" : 386\n  "Cats" : 85\n  "Rats" : 15'}
\`\`\`
`;
        deviationStart = 3;
        deviationEnd = 10 - targetValue.length;
        break;
      }
      case "relationship": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.relationship) || "erDiagram\n  CAR ||--o{ NAMED-DRIVER : allows\n  PERSON ||--o{ NAMED-DRIVER : is"}
\`\`\`
`;
        deviationStart = 3;
        deviationEnd = 10 - targetValue.length;
        break;
      }
      case "journey": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.journey) || "journey\n  title My working day\n  section Go to work\n    Make tea: 5: Me\n    Go upstairs: 3: Me\n    Do work: 1: Me, Cat\n  section Go home\n    Go downstairs: 5: Me\n    Sit down: 5: Me"}
\`\`\`
`;
        deviationStart = 3;
        deviationEnd = 10 - targetValue.length;
        break;
      }
      case "katexInline": {
        targetValue = "$$";
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case "katexBlock": {
        targetValue = "$$\n\n$$\n";
        deviationStart = 3;
        deviationEnd = -4;
        break;
      }
      case "universal": {
        const { generate } = params;
        const insertOptions = generate(selectedText);
        targetValue = insertOptions.targetValue;
        select = insertOptions.select ?? true;
        deviationStart = insertOptions.deviationStart || 0;
        deviationEnd = insertOptions.deviationEnd || 0;
      }
    }
  }
  return {
    text: targetValue,
    options: {
      // 是否选中
      select,
      // 选中时，开始位置的偏移量
      deviationStart,
      // 结束的偏移量
      deviationEnd,
      // 是否整个替换
      replaceAll: replaceAll2
    }
  };
};
var chalky$1 = "#e5c07b";
var coral$1 = "var(--md-color)";
var cyan$1 = "#56b6c2";
var invalid$1 = "#ffffff";
var ivory$1 = "var(--md-color)";
var stone$1 = "#e5c07b";
var malibu$1 = "#e5c07b";
var sage$1 = "var(--md-color)";
var whiskey$1 = "#d19a66";
var violet$1 = "#c678dd";
var darkBackground$1 = "#21252b";
var highlightBackground$1 = "#2c313a";
var background$1 = "var(--md-bk-color)";
var tooltipBackground$1 = "var(--md-bk-color)";
var selection$1 = "#ceedfa33";
var cursor$1 = "#528bff";
var oneDarkTheme = EditorView.theme(
  {
    "&": {
      color: ivory$1,
      backgroundColor: background$1
    },
    ".cm-content": {
      caretColor: cursor$1
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor$1 },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: selection$1 },
    ".cm-panels": { backgroundColor: darkBackground$1, color: ivory$1 },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#ceedfa33" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: background$1,
      color: ivory$1,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: highlightBackground$1
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "1px solid var(--md-border-color)",
      backgroundColor: tooltipBackground$1
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground$1,
      borderBottomColor: tooltipBackground$1
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        color: ivory$1
      }
    }
  },
  { dark: true }
);
var oneDarkHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: violet$1 },
  { tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName], color: coral$1 },
  { tag: [tags.function(tags.variableName), tags.labelName], color: malibu$1 },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: whiskey$1 },
  { tag: [tags.definition(tags.name), tags.separator], color: ivory$1 },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace
    ],
    color: chalky$1
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string)
    ],
    color: cyan$1
  },
  { tag: [tags.meta, tags.comment], color: stone$1 },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: stone$1, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: coral$1 },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: whiskey$1 },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: sage$1 },
  { tag: tags.invalid, color: invalid$1 }
]);
var oneDark = [
  oneDarkTheme,
  syntaxHighlighting(oneDarkHighlightStyle)
];
var chalky = "#e5c07b";
var coral = "#3f4a54";
var cyan = "#56b6c2";
var invalid = "#fff";
var ivory = "#3f4a54";
var stone = "#2d8cf0";
var malibu = "#2d8cf0";
var sage = "#3f4a54";
var whiskey = "#d19a66";
var violet = "#c678dd";
var darkBackground = "#21252b";
var highlightBackground = "#ceedfa33";
var background = "var(--md-bk-color)";
var tooltipBackground = "var(--md-bk-color)";
var selection = "#bad5fa";
var cursor = "#3f4a54";
var oneLightTheme = EditorView.theme(
  {
    "&": {
      color: ivory,
      backgroundColor: background
    },
    ".cm-content": {
      caretColor: cursor
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: selection },
    ".cm-panels": { backgroundColor: darkBackground, color: ivory },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#ceedfa33" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: background,
      color: ivory,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: highlightBackground
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "1px solid var(--md-border-color)",
      backgroundColor: tooltipBackground
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        color: ivory
      }
    }
  }
  // { dark: true }
);
var oneLightHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: violet },
  { tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName], color: coral },
  { tag: [tags.function(tags.variableName), tags.labelName], color: malibu },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: whiskey },
  { tag: [tags.definition(tags.name), tags.separator], color: ivory },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace
    ],
    color: chalky
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string)
    ],
    color: cyan
  },
  { tag: [tags.meta, tags.comment], color: stone },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: stone, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: coral },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: whiskey },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: sage },
  { tag: tags.invalid, color: invalid }
]);
var oneLight = [
  oneLightTheme,
  syntaxHighlighting(oneLightHighlightStyle)
];
var getPairApply = (flag, type, title, suffix, selectType) => {
  return (view, _completion, from, to) => {
    const label = `${flag}${type}`.slice(to - from);
    view.dispatch(view.state.replaceSelection(`${label}${title}${suffix}`));
    const newTo = from + _completion.label.length + (selectType === "title" ? title.length : 0);
    view.dispatch({
      selection: EditorSelection.create(
        [
          EditorSelection.range(
            from + _completion.label.length + (selectType === "title" ? 1 : -type.length),
            newTo
          ),
          EditorSelection.cursor(newTo)
        ],
        1
      )
    });
    view.focus();
  };
};
var getApply = (_label) => {
  return (view, _completion, from, to) => {
    const label = _label.slice(to - from);
    view.dispatch(view.state.replaceSelection(`${label} `));
  };
};
var createAutocompletion = (completions) => {
  const defaultCompletion = (context) => {
    const word = context.matchBefore(
      /^#+|^-\s*\[*\s*\]*|`+|\[|!\[*|^\|\s?\|?|^\$\$?|!+\s*\w*/
    );
    if (word === null || word.from == word.to && context.explicit) {
      return null;
    }
    return {
      from: word.from,
      options: [
        // 标题
        ...["h1", "h2", "h3", "h4", "h5", "h6"].map((key, index) => {
          const label = new Array(index + 1).fill("#").join("");
          return {
            label,
            type: "text",
            apply: getApply(label)
          };
        }),
        // 任务列表
        ...["unchecked", "checked"].map((key) => {
          const label = key === "checked" ? "- [x]" : "- [ ]";
          return {
            label,
            type: "text",
            apply: getApply(label)
          };
        }),
        // 代码
        ...[
          ["`", ""],
          ["```", "language"],
          ["```mermaid\n", ""]
        ].map((c) => {
          return {
            label: `${c[0]}${c[1]}`,
            type: "text",
            apply: getPairApply(c[0], c[1], "", c[0] === "`" ? "`" : "\n```", "type")
          };
        }),
        // 链接
        {
          label: "[]()",
          type: "text"
        },
        {
          label: "![]()",
          type: "text"
        },
        // 表格
        {
          label: "| |",
          type: "text",
          detail: "table",
          apply: "| col | col | col |\n| - | - | - |\n| content | content | content |\n| content | content | content |"
        },
        // 公式
        {
          label: "$",
          type: "text",
          apply: getPairApply("$", "", "", "$", "type")
        },
        {
          label: "$$",
          type: "text",
          apply: getPairApply("$$", "", "\n", "\n$$", "title")
        },
        // 那啥？
        ...[
          "note",
          "abstract",
          "info",
          "tip",
          "success",
          "question",
          "warning",
          "failure",
          "danger",
          "bug",
          "example",
          "quote",
          "hint",
          "caution",
          "error",
          "attention"
        ].map((key) => {
          const label = `!!! ${key}`;
          return {
            label,
            type: "text",
            apply: getPairApply("!!!", ` ${key}`, " Title", "\n\n!!!", "title")
          };
        })
      ]
    };
  };
  return autocompletion({
    override: completions ? [defaultCompletion, ...completions] : [defaultCompletion]
  });
};
var toggleWith = (view) => {
  const mc = new Compartment();
  const toggle = (extension) => {
    mc.get(view.state) ? view.dispatch({ effects: mc.reconfigure(extension) }) : view.dispatch({
      effects: StateEffect.appendConfig.of(mc.of(extension))
    });
    return true;
  };
  return toggle;
};
var CodeMirrorUt = class {
  constructor(view) {
    __publicField3(this, "view");
    __publicField3(this, "maxLength", Number.MAX_SAFE_INTEGER);
    __publicField3(this, "toggleTabSize");
    __publicField3(this, "togglePlaceholder");
    __publicField3(this, "setExtensions");
    __publicField3(this, "toggleDisabled");
    __publicField3(this, "toggleReadOnly");
    __publicField3(this, "toggleMaxlength");
    this.view = view;
    this.toggleTabSize = toggleWith(this.view);
    this.togglePlaceholder = toggleWith(this.view);
    this.setExtensions = toggleWith(this.view);
    this.toggleDisabled = toggleWith(this.view);
    this.toggleReadOnly = toggleWith(this.view);
    this.toggleMaxlength = toggleWith(this.view);
  }
  getValue() {
    return this.view.state.doc.toString();
  }
  /**
   * 设置内容
   *
   * @param insert 待插入内容
   * @param from 插入开始位置
   * @param to 插入结束位置
   */
  setValue(insert, from = 0, to = this.view.state.doc.length) {
    this.view.dispatch({
      changes: {
        from,
        to,
        insert
      }
    });
  }
  /**
   * 获取选中的文本
   */
  getSelectedText() {
    const { from, to } = this.view.state.selection.main;
    return this.view.state.sliceDoc(from, to);
  }
  /**
   * 使用新的内容替换选中的内容
   *
   * @param text 待替换内容
   * @param options 替换后是否选中
   */
  replaceSelectedText(text2, options = {
    // 是否选中
    select: true,
    // 选中时，开始位置的偏移量
    deviationStart: 0,
    // 结束的偏移量
    deviationEnd: 0,
    // 直接替换所有文本
    replaceAll: false
  }, editorId) {
    try {
      if (options.replaceAll) {
        this.setValue(text2);
        if (text2.length > this.maxLength) {
          throw new Error("The input text is too long");
        }
        return;
      }
      if (this.view.state.doc.length - this.getSelectedText().length + text2.length > this.maxLength) {
        throw new Error("The input text is too long");
      }
      const { from } = this.view.state.selection.main;
      this.view.dispatch(this.view.state.replaceSelection(text2));
      if (options.select) {
        const to = from + text2.length + options.deviationEnd;
        this.view.dispatch({
          selection: EditorSelection.create(
            [
              EditorSelection.range(from + options.deviationStart, to),
              EditorSelection.cursor(to)
            ],
            1
          )
        });
      }
      this.view.focus();
    } catch (e2) {
      if (e2.message === "The input text is too long") {
        bus.emit(editorId, ERROR_CATCHER, {
          name: "overlength",
          message: e2.message,
          data: text2
        });
      } else {
        throw e2;
      }
    }
  }
  /**
   * 设置tabSize
   *
   * @param tabSize 需要切换的大小
   */
  setTabSize(tabSize) {
    this.toggleTabSize([
      EditorState.tabSize.of(tabSize),
      indentUnit.of(" ".repeat(tabSize))
    ]);
  }
  /**
   * 设置placeholder
   *
   * @param t 目标内容
   */
  setPlaceholder(t2) {
    this.togglePlaceholder(placeholder(t2));
  }
  focus(options) {
    this.view.focus();
    if (!options) {
      return;
    }
    let anchor = 0;
    let head = 0;
    let pos = 0;
    switch (options) {
      case "start": {
        break;
      }
      case "end": {
        const length = this.getValue().length;
        anchor = head = pos = length;
        break;
      }
      default: {
        anchor = options.rangeAnchor || options.cursorPos;
        head = options.rangeHead || options.cursorPos;
        pos = options.cursorPos;
      }
    }
    this.view.dispatch({
      scrollIntoView: true,
      selection: EditorSelection.create(
        [EditorSelection.range(anchor, head), EditorSelection.cursor(pos)],
        1
      )
    });
  }
  setDisabled(d) {
    this.toggleDisabled([EditorView.editable.of(!d)]);
  }
  setReadOnly(r2) {
    this.toggleReadOnly([EditorState.readOnly.of(r2)]);
  }
  setMaxLength(ml) {
    this.maxLength = ml;
    this.toggleMaxlength([
      EditorState.changeFilter.of((tr) => {
        return tr.newDoc.length <= ml;
      })
    ]);
  }
};
var usePasteUpload = (props22) => {
  const editorId = inject("editorId");
  const pasteHandler = (e2) => {
    if (!e2.clipboardData) {
      return;
    }
    if (e2.clipboardData.files.length > 0) {
      const { files } = e2.clipboardData;
      bus.emit(
        editorId,
        UPLOAD_IMAGE,
        Array.from(files).filter((file) => {
          return /image\/.*/.test(file.type);
        })
      );
      e2.preventDefault();
      return;
    }
    if (props22.autoDetectCode && e2.clipboardData.types.includes("vscode-editor-data")) {
      const vscCoodInfo = JSON.parse(e2.clipboardData.getData("vscode-editor-data"));
      bus.emit(editorId, REPLACE, "code", {
        mode: vscCoodInfo.mode,
        text: e2.clipboardData.getData("text/plain")
      });
      e2.preventDefault();
      return;
    }
    const targetValue = e2.clipboardData.getData("text/plain");
    if (props22.maxlength && targetValue.length + props22.modelValue.length > props22.maxlength) {
      bus.emit(editorId, ERROR_CATCHER, {
        name: "overlength",
        message: "The input text is too long",
        data: targetValue
      });
    }
  };
  return pasteHandler;
};
var createCommands = (id, contentProps2) => {
  const CtrlB = {
    key: "Ctrl-b",
    mac: "Cmd-b",
    run: () => {
      bus.emit(id, REPLACE, "bold");
      return true;
    }
  };
  const CtrlS = {
    key: "Ctrl-s",
    mac: "Cmd-s",
    run: (view) => {
      bus.emit(id, ON_SAVE, view.state.doc.toString());
      return true;
    },
    shift: () => {
      bus.emit(id, REPLACE, "strikeThrough");
      return true;
    }
  };
  const CtrlU = {
    key: "Ctrl-u",
    mac: "Cmd-u",
    run: () => {
      bus.emit(id, REPLACE, "underline");
      return true;
    },
    shift: () => {
      bus.emit(id, REPLACE, "unorderedList");
      return true;
    }
  };
  const CtrlI = {
    key: "Ctrl-i",
    mac: "Cmd-i",
    run: () => {
      bus.emit(id, REPLACE, "italic");
      return true;
    },
    shift: () => {
      bus.emit(id, OPEN_MODALS, "image");
      return true;
    }
  };
  const Ctrl1 = {
    key: "Ctrl-1",
    mac: "Cmd-1",
    run: () => {
      bus.emit(id, REPLACE, "h1");
      return true;
    }
  };
  const Ctrl2 = {
    key: "Ctrl-2",
    mac: "Cmd-2",
    run: () => {
      bus.emit(id, REPLACE, "h2");
      return true;
    }
  };
  const Ctrl3 = {
    key: "Ctrl-3",
    mac: "Cmd-3",
    run: () => {
      bus.emit(id, REPLACE, "h3");
      return true;
    }
  };
  const Ctrl4 = {
    key: "Ctrl-4",
    mac: "Cmd-4",
    run: () => {
      bus.emit(id, REPLACE, "h4");
      return true;
    }
  };
  const Ctrl5 = {
    key: "Ctrl-5",
    mac: "Cmd-5",
    run: () => {
      bus.emit(id, REPLACE, "h5");
      return true;
    }
  };
  const Ctrl6 = {
    key: "Ctrl-6",
    mac: "Cmd-6",
    run: () => {
      bus.emit(id, REPLACE, "h6");
      return true;
    }
  };
  const CtrlArrowUp = {
    key: "Ctrl-ArrowUp",
    mac: "Cmd-ArrowUp",
    run: () => {
      bus.emit(id, REPLACE, "sup");
      return true;
    }
  };
  const CtrlArrowDown = {
    key: "Ctrl-ArrowDown",
    mac: "Cmd-ArrowDown",
    run: () => {
      bus.emit(id, REPLACE, "sub");
      return true;
    }
  };
  const CtrlO = {
    key: "Ctrl-o",
    mac: "Cmd-o",
    run: () => {
      bus.emit(id, REPLACE, "orderedList");
      return true;
    }
  };
  const CtrlC = {
    key: "Ctrl-c",
    mac: "Cmd-c",
    shift: () => {
      bus.emit(id, REPLACE, "code");
      return true;
    },
    any(_view, e2) {
      if ((e2.ctrlKey || e2.metaKey) && e2.altKey && e2.code === "KeyC") {
        bus.emit(id, REPLACE, "codeRow");
        return true;
      }
      return false;
    }
  };
  const CtrlL = {
    key: "Ctrl-l",
    mac: "Cmd-l",
    run: () => {
      bus.emit(id, OPEN_MODALS, "link");
      return true;
    }
  };
  const CtrlF = {
    key: "Ctrl-f",
    mac: "Cmd-f",
    shift: () => {
      if (!contentProps2.noPrettier) {
        bus.emit(id, REPLACE, "prettier");
        return true;
      }
      return false;
    }
  };
  const CtrlT = {
    any: (_view, e2) => {
      if ((e2.ctrlKey || e2.metaKey) && e2.altKey && e2.shiftKey && e2.code === "KeyT") {
        bus.emit(id, REPLACE, "table");
        return true;
      }
      return false;
    }
  };
  const CtrlD = {
    key: "Ctrl-d",
    mac: "Cmd-d",
    run: deleteLine,
    preventDefault: true
  };
  return [
    CtrlB,
    CtrlD,
    CtrlS,
    CtrlU,
    CtrlI,
    Ctrl1,
    Ctrl2,
    Ctrl3,
    Ctrl4,
    Ctrl5,
    Ctrl6,
    CtrlArrowUp,
    CtrlArrowDown,
    CtrlO,
    CtrlC,
    CtrlL,
    CtrlF,
    CtrlT
  ];
};
var useCodeMirror = (props22) => {
  const tabWidth = inject("tabWidth");
  const editorId = inject("editorId");
  const theme = inject("theme");
  const inputWrapperRef = ref();
  const codeMirrorUt = shallowRef();
  const languageComp = new Compartment(), themeComp = new Compartment(), autocompletionComp = new Compartment(), historyComp = new Compartment(), eventComp = new Compartment();
  const mdEditorCommands = createCommands(editorId, props22);
  const spelling = ref(false);
  const pasteHandler = usePasteUpload(props22);
  const domEventHandlers = {
    paste: pasteHandler,
    blur: props22.onBlur,
    focus: props22.onFocus,
    drop: props22.onDrop,
    compositionstart: () => {
      console.log("compositionstart");
      spelling.value = true;
    },
    compositionend: (_e, view) => {
      console.log("compositionend");
      spelling.value = false;
      props22.updateModelValue(view.state.doc.toString());
    },
    input: (e2) => {
      if (props22.onInput) {
        props22.onInput(e2);
      }
      const { data } = e2;
      if (props22.maxlength && props22.modelValue.length + data.length > props22.maxlength) {
        bus.emit(editorId, ERROR_CATCHER, {
          name: "overlength",
          message: "The input text is too long",
          data
        });
      }
    }
  };
  const defaultExtensions = [
    keymap.of([...defaultKeymap, ...historyKeymap, ...mdEditorCommands, indentWithTab]),
    historyComp.of(history()),
    languageComp.of(markdown({ codeLanguages: languages })),
    // 横向换行
    EditorView.lineWrapping,
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        props22.onChange(update.state.doc.toString());
        if (!spelling.value) {
          props22.updateModelValue(update.state.doc.toString());
        }
      }
    }),
    eventComp.of(EditorView.domEventHandlers(domEventHandlers))
  ];
  const getExtensions = () => {
    const extensions = [
      ...defaultExtensions,
      themeComp.of(theme.value === "light" ? oneLight : oneDark),
      autocompletionComp.of(createAutocompletion(props22.completions))
    ];
    return configOption.codeMirrorExtensions(theme.value, extensions, [
      ...mdEditorCommands
    ]);
  };
  onMounted(() => {
    const view = new EditorView({
      doc: props22.modelValue,
      parent: inputWrapperRef.value,
      extensions: [getExtensions()]
    });
    const nc = new CodeMirrorUt(view);
    codeMirrorUt.value = nc;
    setTimeout(() => {
      nc.setTabSize(tabWidth);
      nc.setDisabled(props22.disabled);
      nc.setReadOnly(props22.readonly);
      props22.placeholder && nc.setPlaceholder(props22.placeholder);
      typeof props22.maxlength === "number" && nc.setMaxLength(props22.maxlength);
      props22.autofocus && view.focus();
    }, 0);
    bus.on(editorId, {
      name: CTRL_Z,
      callback() {
        undo(view);
      }
    });
    bus.on(editorId, {
      name: CTRL_SHIFT_Z,
      callback() {
        redo(view);
      }
    });
    bus.on(editorId, {
      name: REPLACE,
      callback(direct, params = {}) {
        var _a4;
        const { text: text2, options } = directive2flag(direct, codeMirrorUt.value, params);
        (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.replaceSelectedText(text2, options, editorId);
      }
    });
    bus.on(editorId, {
      name: EVENT_LISTENER,
      callback(handlers) {
        var _a4;
        const nextDomEventHandlers = {
          ...domEventHandlers
        };
        const defaultEventNames = Object.keys(domEventHandlers);
        for (const eventName in handlers) {
          const en = eventName;
          if (defaultEventNames.includes(en)) {
            nextDomEventHandlers[en] = (e2, v) => {
              handlers[en](e2, v);
              if (!e2.defaultPrevented) {
                domEventHandlers[en](e2, v);
              }
            };
          } else {
            nextDomEventHandlers[en] = handlers[en];
          }
        }
        (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.view.dispatch({
          effects: eventComp.reconfigure(
            EditorView.domEventHandlers(nextDomEventHandlers)
          )
        });
      }
    });
  });
  watch(
    theme,
    () => {
      var _a4;
      (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.view.dispatch({
        effects: themeComp.reconfigure(theme.value === "light" ? oneLight : oneDark)
      });
    },
    {
      deep: true
    }
  );
  watch(
    () => props22.completions,
    () => {
      var _a4;
      (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.view.dispatch({
        effects: autocompletionComp.reconfigure(createAutocompletion(props22.completions))
      });
    },
    {
      deep: true
    }
  );
  watch(
    () => props22.modelValue,
    () => {
      var _a4, _b;
      if (((_a4 = codeMirrorUt.value) == null ? void 0 : _a4.getValue()) !== props22.modelValue) {
        (_b = codeMirrorUt.value) == null ? void 0 : _b.setValue(props22.modelValue);
      }
    }
  );
  watch(
    () => props22.placeholder,
    () => {
      var _a4;
      (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.setPlaceholder(props22.placeholder);
    }
  );
  watch(
    () => props22.disabled,
    () => {
      var _a4;
      (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.setDisabled(props22.disabled);
    }
  );
  watch(
    () => props22.readonly,
    () => {
      var _a4;
      (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.setDisabled(props22.readonly);
    }
  );
  watch(
    () => props22.maxlength,
    () => {
      var _a4;
      if (props22.maxlength) {
        (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.setMaxLength(props22.maxlength);
      }
    }
  );
  return {
    inputWrapperRef,
    codeMirrorUt,
    resetHistory() {
      var _a4, _b;
      (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.view.dispatch({
        effects: historyComp.reconfigure([])
      });
      (_b = codeMirrorUt.value) == null ? void 0 : _b.view.dispatch({
        effects: historyComp.reconfigure(history())
      });
    }
  };
};
var useResize = (props22, contentRef, resizeRef) => {
  const state = reactive({
    resizedWidth: props22.inputBoxWitdh
  });
  const inputWrapperStyle = reactive({
    width: props22.inputBoxWitdh
  });
  const resizeOperateStyle = reactive({
    left: props22.inputBoxWitdh,
    display: "initial"
  });
  const resizeMousemove = (e2) => {
    var _a4, _b, _c;
    const maxWidth = ((_a4 = contentRef.value) == null ? void 0 : _a4.offsetWidth) || 0;
    const contentX = ((_b = contentRef.value) == null ? void 0 : _b.getBoundingClientRect().x) || 0;
    let nextWidth = e2.x - contentX;
    if (nextWidth < MinInputBoxWidth) {
      nextWidth = MinInputBoxWidth;
    } else if (nextWidth > maxWidth - MinInputBoxWidth) {
      nextWidth = maxWidth - MinInputBoxWidth;
    }
    const ibw = `${nextWidth}px`;
    inputWrapperStyle.width = ibw;
    resizeOperateStyle.left = ibw;
    state.resizedWidth = ibw;
    (_c = props22.onInputBoxWitdhChange) == null ? void 0 : _c.call(props22, ibw);
  };
  const resizeMousedown = () => {
    document.addEventListener("mousemove", resizeMousemove);
  };
  const resizeMouseup = () => {
    document.removeEventListener("mousemove", resizeMousemove);
  };
  onMounted(() => {
    var _a4;
    (_a4 = resizeRef.value) == null ? void 0 : _a4.addEventListener("mousedown", resizeMousedown);
    document.addEventListener("mouseup", resizeMouseup);
  });
  onBeforeUnmount(() => {
    var _a4, _b;
    (_a4 = resizeRef.value) == null ? void 0 : _a4.removeEventListener("mousedown", resizeMousedown);
    (_b = resizeRef.value) == null ? void 0 : _b.removeEventListener("mouseup", resizeMouseup);
  });
  watch(
    () => props22.inputBoxWitdh,
    (nVal) => {
      if (nVal) {
        inputWrapperStyle.width = nVal;
        resizeOperateStyle.left = nVal;
      }
    }
  );
  watch(
    [toRef(props22.setting, "htmlPreview"), toRef(props22.setting, "preview")],
    () => {
      if (!props22.setting.htmlPreview && !props22.setting.preview) {
        inputWrapperStyle.width = "100%";
        resizeOperateStyle.display = "none";
      } else {
        inputWrapperStyle.width = state.resizedWidth;
        resizeOperateStyle.display = "initial";
      }
    },
    {
      immediate: true
    }
  );
  return { inputWrapperStyle, resizeOperateStyle };
};
var Content = defineComponent({
  name: "MDEditorContent",
  props: contentProps,
  setup(props22, ctx) {
    const editorId = inject("editorId");
    const html = ref("");
    const contentRef = ref();
    const resizeRef = ref();
    const {
      inputWrapperRef,
      codeMirrorUt,
      resetHistory
    } = useCodeMirror(props22);
    const {
      inputWrapperStyle,
      resizeOperateStyle
    } = useResize(props22, contentRef, resizeRef);
    useAutoScroll(props22, html, codeMirrorUt);
    ctx.expose({
      getSelectedText() {
        var _a4;
        return (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.getSelectedText();
      },
      focus(options) {
        var _a4;
        (_a4 = codeMirrorUt.value) == null ? void 0 : _a4.focus(options);
      },
      resetHistory
    });
    return () => {
      return createVNode("div", {
        "class": `${prefix}-content${props22.setting.htmlPreview || props22.setting.preview ? " has-preview" : ""}`,
        "ref": contentRef
      }, [createVNode("div", {
        "class": `${prefix}-input-wrapper`,
        "style": inputWrapperStyle,
        "ref": inputWrapperRef
      }, null), (props22.setting.htmlPreview || props22.setting.preview) && createVNode("div", {
        "class": `${prefix}-resize-operate`,
        "style": resizeOperateStyle,
        "ref": resizeRef
      }, null), createVNode(ContentPreview, {
        "modelValue": props22.modelValue,
        "setting": props22.setting,
        "onHtmlChanged": (html_) => {
          html.value = html_;
          props22.onHtmlChanged(html_);
        },
        "onGetCatalog": props22.onGetCatalog,
        "mdHeadingId": props22.mdHeadingId,
        "noMermaid": props22.noMermaid,
        "sanitize": props22.sanitize,
        "noKatex": props22.noKatex,
        "formatCopiedText": props22.formatCopiedText,
        "noHighlight": props22.noHighlight,
        "noImgZoomIn": props22.noImgZoomIn,
        "sanitizeMermaid": props22.sanitizeMermaid
      }, null), props22.catalogVisible && createVNode(MdCatalog, {
        "theme": props22.theme,
        "class": `${prefix}-catalog-editor`,
        "editorId": editorId,
        "mdHeadingId": props22.mdHeadingId,
        "key": "internal-catalog"
      }, null)]);
    };
  }
});
var MarkdownTotal = defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  setup(props22) {
    const ult = inject("usedLanguageText");
    return () => {
      var _a4, _b;
      return createVNode("div", {
        "class": `${prefix}-footer-item`
      }, [createVNode("label", {
        "class": `${prefix}-footer-label`
      }, [`${(_a4 = ult.value.footer) == null ? void 0 : _a4.markdownTotal}:`]), createVNode("span", null, [((_b = props22.modelValue) == null ? void 0 : _b.length) || 0])]);
    };
  }
});
var props$2 = {
  checked: {
    type: Boolean,
    default: false
  },
  onChange: {
    type: Function,
    default: () => {
    }
  }
};
var Checkbox = defineComponent({
  props: props$2,
  setup(props22) {
    return () => {
      return createVNode("div", {
        "class": [`${prefix}-checkbox`, props22.checked && `${prefix}-checkbox-checked`],
        "onClick": () => {
          props22.onChange(!props22.checked);
        }
      }, null);
    };
  }
});
var props$13 = {
  scrollAuto: {
    type: Boolean
  },
  onScrollAutoChange: {
    type: Function,
    default: () => {
    }
  }
};
var ScrollAuto = defineComponent({
  props: props$13,
  setup(props22) {
    const ult = inject("usedLanguageText");
    return () => {
      var _a4;
      return createVNode("div", {
        "class": `${prefix}-footer-item`
      }, [createVNode("label", {
        "class": `${prefix}-footer-label`,
        "onClick": () => {
          props22.onScrollAutoChange(!props22.scrollAuto);
        }
      }, [(_a4 = ult.value.footer) == null ? void 0 : _a4.scrollAuto]), createVNode(Checkbox, {
        "checked": props22.scrollAuto,
        "onChange": props22.onScrollAutoChange
      }, null)]);
    };
  }
});
var props6 = {
  modelValue: {
    type: String,
    default: ""
  },
  footers: {
    type: Array,
    default: []
  },
  scrollAuto: {
    type: Boolean
  },
  onScrollAutoChange: {
    type: Function,
    default: () => {
    }
  },
  defFooters: {
    type: Object
  }
};
var Footer = defineComponent({
  name: "MDEditorFooter",
  props: props6,
  setup(props22) {
    const splitedItems = computed(() => {
      const moduleSplitIndex = props22.footers.indexOf("=");
      const barLeft = moduleSplitIndex === -1 ? props22.footers : props22.footers.slice(0, moduleSplitIndex);
      const barRight = moduleSplitIndex === -1 ? [] : props22.footers.slice(moduleSplitIndex, Number.MAX_SAFE_INTEGER);
      return [barLeft, barRight];
    });
    const footerRender = (name) => {
      if (allFooter.includes(name)) {
        switch (name) {
          case "markdownTotal": {
            return createVNode(MarkdownTotal, {
              "modelValue": props22.modelValue
            }, null);
          }
          case "scrollSwitch": {
            return createVNode(ScrollAuto, {
              "scrollAuto": props22.scrollAuto,
              "onScrollAutoChange": props22.onScrollAutoChange
            }, null);
          }
        }
      } else if (props22.defFooters instanceof Array) {
        return props22.defFooters[name] || "";
      } else if (props22.defFooters && props22.defFooters.children instanceof Array) {
        return props22.defFooters.children[name] || "";
      } else {
        return "";
      }
    };
    return () => {
      const LeftFooter = splitedItems.value[0].map((name) => footerRender(name));
      const RightFooter = splitedItems.value[1].map((name) => footerRender(name));
      return createVNode("div", {
        "class": `${prefix}-footer`
      }, [createVNode("div", {
        "class": `${prefix}-footer-left`
      }, [LeftFooter]), createVNode("div", {
        "class": `${prefix}-footer-right`
      }, [RightFooter])]);
    };
  }
});
var Editor = defineComponent({
  name: "MdEditorV3",
  props: editorProps,
  emits: editorEmits,
  setup(props22, ctx) {
    const {
      editorId,
      noKatex,
      noMermaid,
      noPrettier,
      noUploadImg,
      noHighlight
    } = props22;
    const state = reactive({
      scrollAuto: props22.scrollAuto
    });
    const codeRef = ref();
    useOnSave(props22, ctx);
    useProvide(props22);
    useExpansion(props22);
    useErrorCatcher(props22, ctx);
    const [setting, updateSetting] = useConfig(props22, ctx);
    const catalogVisible = useCatalog(props22);
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });
    useExpose$1(props22, ctx, catalogVisible, setting, updateSetting, codeRef);
    return () => {
      var _a4;
      const defToolbars = getSlot({
        props: props22,
        ctx
      }, "defToolbars");
      const defFooters = getSlot({
        props: props22,
        ctx
      }, "defFooters");
      return createVNode("div", {
        "id": editorId,
        "class": [prefix, props22.class, props22.theme === "dark" && `${prefix}-dark`, setting.fullscreen || setting.pageFullscreen ? `${prefix}-fullscreen` : ""],
        "style": props22.style
      }, [createVNode(ToolBar, {
        "noPrettier": noPrettier,
        "toolbars": props22.toolbars,
        "toolbarsExclude": props22.toolbarsExclude,
        "setting": setting,
        "updateSetting": updateSetting,
        "tableShape": props22.tableShape,
        "defToolbars": defToolbars,
        "noUploadImg": noUploadImg,
        "showToolbarName": props22.showToolbarName
      }, null), createVNode(Content, {
        "ref": codeRef,
        "modelValue": props22.modelValue,
        "setting": setting,
        "mdHeadingId": props22.mdHeadingId,
        "noMermaid": noMermaid,
        "noPrettier": noPrettier,
        "sanitize": props22.sanitize,
        "placeholder": props22.placeholder,
        "noKatex": noKatex,
        "scrollAuto": state.scrollAuto,
        "formatCopiedText": props22.formatCopiedText,
        "autofocus": props22.autoFocus,
        "disabled": props22.disabled,
        "readonly": props22.readOnly,
        "maxlength": props22.maxLength,
        "autoDetectCode": props22.autoDetectCode,
        "noHighlight": noHighlight,
        "updateModelValue": (value) => {
          ctx.emit("update:modelValue", value);
        },
        "onChange": (value) => {
          if (props22.onChange) {
            props22.onChange(value);
          }
          ctx.emit("onChange", value);
        },
        "onHtmlChanged": (html) => {
          if (props22.onHtmlChanged) {
            props22.onHtmlChanged(html);
          }
          ctx.emit("onHtmlChanged", html);
        },
        "onGetCatalog": (list2) => {
          if (props22.onGetCatalog) {
            props22.onGetCatalog(list2);
          }
          ctx.emit("onGetCatalog", list2);
        },
        "onBlur": (e2) => {
          if (props22.onBlur) {
            props22.onBlur(e2);
          }
          ctx.emit("onBlur", e2);
        },
        "onFocus": (e2) => {
          if (props22.onFocus) {
            props22.onFocus(e2);
          }
          ctx.emit("onFocus", e2);
        },
        "onInput": (e2) => {
          if (props22.onInput) {
            props22.onInput(e2);
          }
          ctx.emit("onInput", e2);
        },
        "completions": props22.completions,
        "catalogVisible": catalogVisible.value,
        "theme": props22.theme,
        "noImgZoomIn": props22.noImgZoomIn,
        "onDrop": (e2) => {
          if (props22.onDrop) {
            props22.onDrop(e2);
          }
          ctx.emit("onDrop", e2);
        },
        "inputBoxWitdh": props22.inputBoxWitdh,
        "onInputBoxWitdhChange": (width) => {
          if (props22.onInputBoxWitdhChange) {
            props22.onInputBoxWitdhChange(width);
          }
          ctx.emit("onInputBoxWitdhChange", width);
        },
        "sanitizeMermaid": props22.sanitizeMermaid
      }, null), ((_a4 = props22.footers) == null ? void 0 : _a4.length) > 0 && createVNode(Footer, {
        "modelValue": props22.modelValue,
        "footers": props22.footers,
        "defFooters": defFooters,
        "scrollAuto": state.scrollAuto,
        "onScrollAutoChange": (v) => state.scrollAuto = v
      }, null)]);
    };
  }
});
Editor.install = (app) => {
  app.component(Editor.name, Editor);
  app.use(NormalToolbar).use(DropdownToolbar).use(ModalToolbar).use(MdCatalog).use(MdPreview);
  return app;
};

// node_modules/md-editor-v3/lib/es/config.mjs
var zh_CN = staticTextDefault["zh-CN"];
var en_US = staticTextDefault["en-US"];
export {
  DropdownToolbar,
  MdCatalog,
  Editor as MdEditor,
  MdModal,
  MdPreview,
  ModalToolbar,
  NormalToolbar,
  allFooter,
  allToolbar,
  config,
  en_US,
  iconfontClassUrl,
  iconfontSvgUrl,
  zh_CN
};
/*! Bundled license information:

medium-zoom/dist/medium-zoom.esm.js:
  (*! medium-zoom 1.1.0 | MIT License | https://github.com/francoischalifour/medium-zoom *)
*/
//# sourceMappingURL=md-editor-v3.js.map
