import lex from "./lexer";

const defaultIgnores = ["comment", "newLine", "space", "indent"];

export default function parse(input) {
  let tokens = lex(input);
  let result = [];

  let currentMode = "findItem";
  let indentLevel = 0;

  var item;

  const resetToken = () => {
    item = {
      indentLevel: 0,
      classes: [],
      parameters: {},
      children: [],
    };
  };

  resetToken();

  const modes = {
    findItem: {
      expect: {
        findItem: ["indent", "newLine"],
        findItemType: ["word"],
      },
    },

    findItemType: {
      expect: {
        findItemParameterOpen: ["braceOpen"],
        findItemEnd: ["newLine"],
        findItemClassSeperator: ["dot"],
        findItemContent: ["space"],
      },
    },

    findItemClassSeperator: {
      expect: {
        findItemClass: ["word"],
      },
    },

    findItemClass: {
      expect: {
        findItemClassSeperator: ["dot"],
        findItemParameterOpen: ["braceOpen"],
        findItemContent: ["space"],
        findItemEnd: ["newLine"],
      },
    },

    findItemParameterOpen: {
      expect: {
        findItemParameterName: ["word"],
        findItemType: ["braceClose"],
      },
    },

    findItemParameterName: {
      expect: {
        findItemParameterSeperator: ["equals"],
      },
    },
    findItemParameterSeperator: {
      expect: {
        findItemParameterValue: ["string", "boolean", "number"],
      },
    },

    findItemParameterValue: {
      expect: {
        findItemType: ["braceClose"],
        findItemParameterOpen: ["comma"],
      },
    },

    findItemContent: {
      expect: {
        findItemContent: [
          "word",
          "space",
          "number",
          "include",
          "indent",
          "comma",
          "dot",
          "equals",
          "braceOpen",
          "braceClose",
          "singleQuote",
          "doubleQuote",
          "string",
          "boolean",
          "forwardSlash",
        ],
        findItemEnd: ["newLine"],
      },
    },
    findItemEnd: {
      expect: {
        findItem: ["indent", "newLine"],
        findItemType: ["word"],
      },
    },
  };

  let currentParameter = null;
  let currentContent = "";

  const listeners = {
    findItem: {
      indent: (token) => {
        item.indentLevel++;
      },
      newLine: (token) => {
        item.indentLevel = 0;
      },
    },

    findItemEnd: {
      newLine: (token) => {
        item.text = currentContent;

        currentContent = "";

        result.push(item);
        resetToken();
      },
    },
    findItemClass: {
      word: (token) => {
        item.classes.push(token.value);
      },
    },
    findItemContent: {
      any: (token) => {
        if (token.value != null) currentContent += token.value;
      },
    },

    findItemType: {
      word: (token) => {
        item.type = token.value.trim();
      },
    },
    findItemParameterName: {
      word: (token) => {
        currentParameter = token.value;
      },
    },
    findItemParameterValue: {
      any: (token) => {
        item.parameters[currentParameter] = token.value;
      },
    },
  };

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    if (modes[currentMode] != null) {
      let mode = modes[currentMode];

      let found = false;

      let options = mode.expect;

      let nextModes = Object.keys(options);

      for (let i = 0; i < nextModes.length; i++) {
        let expectedTokens = options[nextModes[i]];

        if (expectedTokens.indexOf(token.type) != -1) {
          // Found the next mode

          currentMode = nextModes[i];

          if (listeners[currentMode] != null) {
            if (listeners[currentMode][token.type] != null) {
              listeners[currentMode][token.type](token);
            }

            if (listeners[currentMode].any != null) {
              listeners[currentMode].any(token);
            }
          }

          found = true;

          break;
        }
      }

      if (!found) {
        let ignore = defaultIgnores;
        if (modes[currentMode].ignore != null) {
          ignore = modes[currentMode].ignore;
        }

        if (ignore.indexOf(token.type) == -1) {
          let expected = [];

          let modeKeys = Object.keys(modes[currentMode].expect);

          for (let i = 0; i < modeKeys.length; i++) {
            expected = expected.concat(modes[currentMode].expect[modeKeys[i]]);
          }

          throw new Error(
            "Syntax Error: Expected " +
              expected.join() +
              " but got " +
              token.type +
              " instead. At line " +
              token.line +
              ":" +
              token.linePos +
              " (" +
              currentMode +
              ")"
          );
        }
      }
    }
  }

  if (item != null && item.type != null) {
    item.text = currentContent;
    result.push(item);
  }

  return result;
}
