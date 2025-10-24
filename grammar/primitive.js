// Primitive types.

function immediate (...tokens) {
  let output = [];

  tokens.forEach(t => {
    output.push(
      token.immediate(t)
    );
  })

  return choice(...output);
}

function function_keys (use_as_immediate) {
  let output = [];

  for (let f = 1; f <= 35; f++) {
    output.push(
      "f" + f
    );
  }

  if (use_as_immediate == true) {
    return choice(...output);
  } else {
    return immediate(...output);
  }
}

// Special keymap symbols.
const special_symbols = [
  "kitty_mod",
  "kitty",

  "escape",
  "enter",
  "tab",
  "backspace",
  "insert",
  "delete",
  "page_up",
  "page_down",
  "home",
  "end",
  "caps_lock",
  "scroll_lock",
  "num_lock",
  "print_screen",
  "pause",
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

  "plus",
  "equal",

  "space",
  "minus",
  "apostrophe",
  "comma",
  "period",
  "semicolon",
  "slash",
  "backslash",
  "left_bracket",
  "right_bracket",
  "grave_accent",
];

const keys = {
  ctrl: [ /ctrl/i, /control/i, "^" ],
  alt: [ /alt/i, /opt/i, /option/i, "⌥" ],
  shift: [ /shift/i, "⇧" ],
  super: [ /super/i, /cmd/i, /command/i, "⌘" ]
};

module.exports.rules = {
  _primitive: $ => choice(
    $.pixel,
    $.percentage,
    $.number,
    $.boolean,
    $.color,
    $.string,
    $.time,
    prec(-100, alias(".", $.inherit)),
  ),

  pixel: $ => seq(
    $.number,
    token.immediate("px"),
  ),
  percentage: $ => seq(
    $.number,
    token.immediate("%"),
  ),
  number: _ => token(/[\d\.\-\+]+/),
  boolean: _ => choice("yes", "no"),
  color: $ => choice(
    "none",
    "background",
    /#[0-9A-Fa-f]{3,6}/,
    $._color_name
  ),
  string: _ => token(
    choice(
      /'[^']*'/,
      /"[^"]*"/,
      /\S+/,
    )
  ),

  path: $ => alias($.string, $.path),
  label: $ => alias($.string, $.label),
  constant: $ => alias($.string, $.constant),
  variable: $ => alias($.string, $.variable),
  pattern: $ => alias($.string, $.pattern),

  time: $ => seq(
    field("duration", $.number),
    field("suffix", $.time_suffix)
  ),

  time_suffix: _ => immediate("s", "m", "h", "d"),
  direction: $ => choice($.up, $.down, $.left, $.right),

  layout_type: _ => choice(
    "fat",
    "grid",
    "horizontal",
    "splits",
    "stack",
    "tall",
    "vertical"
  ),

  // Keyboard & mouse primitives /////////////////////////////////////////////

  _key: $ => choice(
    $.modified_key,
    $._non_modified_key,
  ),
  _key_later: $ => choice(
    alias($.modified_key_, $.modified_key),
    $._non_modified_key_,

    $._and,
    $._also,
  ),

  ////////////////////////////////////////////////////////////////////////////

  modified_key: $ => prec.right(seq(
    choice(
      $.ctrl,
      $.alt,
      $.shift,
      $.super
    ),
    repeat($._sub_modifier),

    optional(
      seq(
      $._and,
      $._non_modified_key_,
      )
    ),
  )),

  modified_key_: $ => prec.right(seq(
    choice(
      alias($.ctrl_, $.ctrl),
      alias($.alt_, $.alt),
      alias($.shift_, $.shift),
      alias($.super_, $.super),
    ),
    repeat($._sub_modifier),

    optional(
      seq(
      $._and,
      $._non_modified_key_,
      )
    ),
  )),

  _sub_modifier: $ => seq(
    $._and,
    choice(
      alias($.ctrl_, $.ctrl),
      alias($.alt_, $.alt),
      alias($.shift_, $.shift),
      alias($.super_, $.super),
    ),
  ),

  _and: _ => token.immediate("+"),
  _also: _ => token.immediate(">"),

  ////////////////////////////////////////////////////////////////////////////

  _non_modified_key: $ => choice(
    $.function,
    $.mouse_button,

    $.up,
    $.down,
    $.left,
    $.right,
    $.middle,

    $.special,
    $.key,
  ),

  _non_modified_key_: $ => choice(
    alias($.function_, $.function),
    alias($.mouse_button_, $.mouse_button),

    alias($.up_, $.up),
    alias($.down_, $.down),
    alias($.left_, $.left),
    alias($.middle_, $.middle),
    alias($.right_, $.right),

    alias($.special_, $.special),
    alias($.key_, $.key),
  ),

  ////////////////////////////////////////////////////////////////////////////

  ctrl: _ => choice(...keys.ctrl),
  ctrl_: _ => immediate(...keys.ctrl),

  ////////////////////////////////////////////////////////////////////////////

  alt: _ => choice(...keys.alt),
  alt_: _ => immediate(...keys.alt),

  ////////////////////////////////////////////////////////////////////////////

  shift: _ => choice(...keys.shift),
  shift_: _ => immediate(...keys.shift),

  ////////////////////////////////////////////////////////////////////////////

  mouse_button: _ => /b[1-8]/,
  mouse_button_: _ => token.immediate(/b[1-8]/),

  ////////////////////////////////////////////////////////////////////////////

  up: _ => /up/i,
  up_: _ => token.immediate(/up/i),

  ////////////////////////////////////////////////////////////////////////////

  down: _ => /down/i,
  down_: _ => token.immediate(/down/i),

  ////////////////////////////////////////////////////////////////////////////

  left: _ => /left/i,
  left_: _ => token.immediate(/left/i),

  ////////////////////////////////////////////////////////////////////////////

  middle: _ => /middle/i,
  middle_: _ => token.immediate(/middle/i),

  ////////////////////////////////////////////////////////////////////////////

  right: _ => /right/i,
  right_: _ => token.immediate(/right/i),

  ////////////////////////////////////////////////////////////////////////////

  function: _ => function_keys(false),
  function_: _ => function_keys(true),

  ////////////////////////////////////////////////////////////////////////////

  super: _ => choice(...keys.super),
  super_: _ => immediate(...keys.super),

  ////////////////////////////////////////////////////////////////////////////

  special: _ => choice(...special_symbols),
  special_: _ => immediate(...special_symbols),

  ////////////////////////////////////////////////////////////////////////////

  key: _ => /\S/,
  key_: _ => token.immediate(/\S/),

  ////////////////////////////////////////////////////////////////////////////

  with: _ => "+",
  with_: _ => token.immediate("+"),

  ////////////////////////////////////////////////////////////////////////////

  together: _ => ">",
  together_: _ => token.immediate(">"),

  // X11 color list //////////////////////////////////////////////////////////

  _color_name: _ => choice(
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "green",
    "greenyellow",
    "grey",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightgrey",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "slategrey",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen",
  ),
};
