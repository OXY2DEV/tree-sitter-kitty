module.exports.rules = {
  set_colors: $ => seq(
    "set_colors",
    optional(
      field("options", $.color_options)
    ),

    field("value", $.color_value),
  ),

  color_options: $ => repeat1(
      $._color_option
  ),

  _color_option: $ => choice(
    $.color_all,
    $.color_configured,
    $.color_reset,
    $.color_match,
    $.color_match_tab,
  ),

  color_all: $ => seq(
    alias(
      choice(
        "-a",
        "--all"
      ),
      $.flag
    ),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    ),
  ),

  color_configured: $ => seq(
    alias(
      choice(
        "-c",
        "--configured"
      ),
      $.flag
    ),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    ),
  ),

  color_reset: $ => seq(
    alias("--reset", $.flag),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    ),
  ),

  color_match: $ => seq(
    alias(
      choice("--match", "-m"),
      $.flag
    ),
    field("query", $.string),
  ),

  color_match_tab: $ => seq(
    alias(
      choice("--match-tab", "-t"),
      $.flag
    ),
    field("query", $.string),
  ),

  ////////////////////////////////////////////////////////////////////////////

  color_option: $ => seq(
    field("name", $.color_option_name),
    field("value", $.color),
  ),

  ////////////////////////////////////////////////////////////////////////////

  color_value: $ =>  repeat1($.color_data),

  color_data: $ => choice(
    seq(
      field("name", $.color_option_name),
      token.immediate("="),
      field("value", $.color),
    ),
    field("path", alias(/[^\s\=]+/, $.path))
  ),

  color_option_name: _ => choice(
    "foreground",
    "background",

    "selection_foreground",
    "selection_background",

    "cursor",
    "cursor_text_color",

    "url_color",

    "active_border_color",
    "inactive_border_color",
    "bell_border_color",

    "active_tab_foreground",
    "active_tab_background",
    "inactive_tab_foreground",
    "inactive_tab_background",
    "tab_bar_background",
    "tab_bar_margin_color",

    "mark1_foreground",
    "mark1_background",
    "mark2_foreground",
    "mark2_background",
    "mark3_foreground",
    "mark3_background",

    "color0",
    "color8",

    "color1",
    "color9",

    "color2",
    "color10",

    "color3",
    "color11",

    "color4",
    "color12",

    "color5",
    "color13",

    "color6",
    "color14",

    "color7",
    "color15",
  ),
};
