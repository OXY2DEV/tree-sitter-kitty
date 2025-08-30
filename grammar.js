/**
 * @file Tree-sitter grammar for kitty.conf files.
 * @author MD. Mouinul Hossain <mdmouinulhossainshawon@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const primitives = require("./grammar/primitive");
const actions = require("./grammar/actions");

const includes = require("./grammar/includes");
const mouse = require("./grammar/mouse");
const keyboard = require("./grammar/keyboard");

function immediate (tokens) {
  let output = [];

  tokens.forEach(t => {
    output.push(
      token.immediate(t)
    );
  })

  return choice(...output);
}

module.exports = grammar({
  name: "kitty",

  extras: _ => [
    token(
      seq(/\r?\n/, "\\"),
    ),
    /[\t ]/,
  ],
  rules: {
    configuration_file: $ => repeat(
      $._common_node
    ),

    _common_node: $ => seq(
      choice(
        $.comment,
        $.include,
        $.option,
        $.keyboard_shortcut,
        $.mouse_action
      ),
      /\r?\n+/,
    ),

    comment: $ => seq(
        "#",
        alias(/[^\n\r]*/, $.comment_content),
    ),

    ...primitives.rules,
    ...actions.rules,

    ...includes.rules,

    ...mouse.rules,
    ...keyboard.rules,

    option: $ => seq(
      field(
        "key",
        alias(/[\w_]+/, $.string)
      ),
      field(
        "value",
        alias(repeat1($._primitive), $.value),
      )
    ),
  }
});
