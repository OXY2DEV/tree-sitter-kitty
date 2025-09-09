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

// Special keymap symbols.
const special_symbols = [
  "kitty_mod",

  "escape",
  "tab",
  "insert",
  "up",
  "page_up",
  "home",
  "caps_lock",
  "num_lock",
  "pause",
  "enter",
  "backspace",
  "space",
  "delete",
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

  "plus",
  "equal",
];

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

  time: $ => seq(
    field("duration", $.number),
    field("suffix", $.time_suffix)
  ),

  time_suffix: _ => immediate("s", "m", "h", "d"),
  direction: _ => choice("top", "bottom", "left", "right"),

  // Keyboard & mouse primitives /////////////////////////////////////////////

  _key: $ => choice(
    $.ctrl,
    $.alt,
    $.shift,
    $.function,
    $.super,

    $.mouse_button,

    $.left,
    $.right,
    $.middle,

    $.special,
    $.key,
  ),
  _key_later: $ => choice(
    alias($.ctrl_, $.ctrl),
    alias($.alt_, $.alt),
    alias($.shift_, $.shift),
    alias($.function_, $.function),
    alias($.super_, $.super),

    alias($.mouse_button_, $.mouse_button),

    alias($.left_, $.left),
    alias($.middle_, $.middle),
    alias($.right_, $.right),

    alias($.special_, $.special),
    alias($.key_, $.key),

    alias($.with_, $.with),
    alias($.together_, $.together),
  ),

  ////////////////////////////////////////////////////////////////////////////

  ctrl: _ => choice("ctrl", "control", "^"),
  ctrl_: _ => immediate("ctrl", "control", "^"),

  ////////////////////////////////////////////////////////////////////////////

  alt: _ => choice("alt", "opt", "option"),
  alt_: _ => immediate("alt", "opt", "option"),

  ////////////////////////////////////////////////////////////////////////////

  shift: _ => "shift",
  shift_: _ => token.immediate("shift"),

  ////////////////////////////////////////////////////////////////////////////

  mouse_button: _ => /b[1-8]/,
  mouse_button_: _ => token.immediate(/b[1-8]/),

  ////////////////////////////////////////////////////////////////////////////

  left: _ => "left",
  left_: _ => token.immediate("left"),

  ////////////////////////////////////////////////////////////////////////////

  middle: _ => "middle",
  middle_: _ => token.immediate("middle"),

  ////////////////////////////////////////////////////////////////////////////

  right: _ => "right",
  right_: _ => token.immediate("right"),

  ////////////////////////////////////////////////////////////////////////////

  function: _ => /f[1-9]/,
  function_: _ => token.immediate(/f[1-9]/),

  ////////////////////////////////////////////////////////////////////////////

  super: _ => choice("super", "cmd", "command"),
  super_: _ => immediate("super", "cmd", "command"),

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
