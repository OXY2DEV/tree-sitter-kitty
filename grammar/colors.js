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

  color_all: _ => choice(
    "-a=no",
    "-a",
    "--all=no",
    "--all",
  ),

  color_configured: _ => choice(
    "-c=no",
    "-c",
    "--configured=no",
    "--configured",
  ),

  color_reset: _ => choice(
    "--reset=no",
    "--reset",
  ),

  color_match: $ => seq(
    choice("--match", "-m"),
    field("query", $.string),
  ),

  color_match_tab: $ => seq(
    choice("--match-tab", "-t"),
    field("query", $.string),
  ),

  ////////////////////////////////////////////////////////////////////////////

  color_value: $ => choice(
    "none",
    repeat1($.color_option),
    alias($.string, $.path),
  ),

  color_option: $ => seq(
    field("name", $.color_option_name),
    token.immediate("="),
    field("value", $.color),
  ),

  color_option_name: _ => choice(
    "foreground",
    "background",

    "selection_foreground",
    "selection_background",

    "cursor",

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
