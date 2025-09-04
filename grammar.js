/**
 * @file Tree-sitter grammar for kitty.conf files.
 * @author MD. Mouinul Hossain <mdmouinulhossainshawon@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const primitives = require("./grammar/primitive");
const colors = require("./grammar/colors");
const actions = require("./grammar/actions");

const includes = require("./grammar/includes");
const options = require("./grammar/options");
const mouse = require("./grammar/mouse");
const keyboard = require("./grammar/keyboard");

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
        $._option,
        $.color_option,
        $.keyboard_shortcut,
        $.mouse_shortcut
      ),
      /\r?\n+/,
    ),

    comment: $ => seq(
        "#",
        alias(/[^\n\r]*/, $.comment_content),
    ),

    ...primitives.rules,
    ...colors.rules,
    ...actions.rules,

    ...includes.rules,
    ...options.rules,

    ...mouse.rules,
    ...keyboard.rules,
  }
});
