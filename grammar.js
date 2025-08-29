/**
 * @file Tree-sitter grammar for kitty.conf files.
 * @author MD. Mouinul Hossain <mdmouinulhossainshawon@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

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
      ),
      /\r?\n+/,
    ),

    comment: $ => seq(
        "#",
        alias(/[^\n\r]*/, $.comment_content),
    ),

    include: $ => choice(
      $._path_include,
      $._glob_include,
      $._gen_include,
      $._env_include,
    ),

    _path_include: $ => seq(
      "include",
      field(
        "path",
        alias(/[^\s]+/, $.path)
      ),
    ),
    _glob_include: $ => seq(
      "globinclude",
      field(
        "glob",
        alias(/[^\s]+/, $.pattern)
      ),
    ),
    _gen_include: $ => seq(
      "geninclude",
      field(
        "file",
        alias(/[^\s]+/, $.path)
      ),
    ),
    _env_include: $ => seq(
      "envinclude",
      field(
        "environment_variable",
        alias(/[^\s]+/, $.name)
      ),
    ),


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

    _primitive: $ => choice(
      $.pixel,
      $.percentage,
      $.number,
      $.boolean,
      $.color,
      $.string,
      prec(-100, alias(".", $.inherit)),
    ),

    pixel: _ => token(/\d+px/),
    percentage: _ => token(/[\d\.]+%/),
    number: _ => token(/[\d\.\-]+/),
    boolean: _ => choice("yes", "no", "true", "false"),
    color: _ => token(/#[0-9A-Fa-f]{3,6}/),
    string: _ => token(/\S+/),


    keyboard_shortcut: $ => seq(
      "map",
      field("sequence", $.key_sequence),
      /[ \t]+/,
      field("action", $.key_action)
    ),

    key_action: _ => /[^\r\n]+/,
    key_sequence: $ => repeat1($._key_element),

    _key_element: $ => choice(
      $.ctrl,
      $.alt,
      $.shift,
      $.function,
      $.super,
      $.special,
      $.key,
      $.add,
    ),

    ctrl: _ => choice("ctrl", "control", "^"),
    alt: _ => choice("alt", "opt", "option"),
    shift: _ => "shift",
    function: _ => /f[1-9]/,
    super: _ => choice("super", "cmd", "command"),
    special: _ => choice(
      "escape",
      "tab",
      "insert",
      "left",
      "up",
      "page_up",
      "home",
      "caps_lock",
      "num_lock",
      "pause",
      "enter",
      "backspace",
      "delete",
      "right",
      "down",
      "page_down",
      "end",
      "scroll_lock",
      "menu",
      "kp_0",
      "kp_1",
      "kp_2",
      "kp_3",
      "kp_4",
      "kp_5",
      "kp_6",
      "kp_7",
      "kp_8",
      "kp_9",
      "kp_decimal",
      "kp_divide",
      "kp_multiply",
      "kp_subtract",
      "kp_add",
      "kp_enter",
      "kp_equal",
      "kp_separator",
      "kp_left",
      "kp_right",
      "kp_up",
      "kp_down",
      "kp_page_up",
      "kp_page_down",
      "kp_home",
      "kp_end",
      "kp_insert",
      "kp_delete",
      "kp_begin",
      "media_play",
      "media_pause",
      "media_play_pause",
      "media_reverse",
      "media_stop",
      "media_fast_forward",
      "media_rewind",
      "media_track_next",
      "media_track_previous",
      "media_record",
      "lower_volume",
      "raise_volume",
      "mute_volume",
      "left_shift",
      "left_control",
      "left_alt",
      "left_super",
      "left_hyper",
      "left_meta",
      "right_shift",
      "right_control",
      "right_alt",
      "right_super",
      "right_hyper",
      "right_meta",
      "iso_level3_shift",
      "iso_level5_shift",
    ),

    key: _ => /[a-z]/,
    add: _ => "\+",
  }
});
