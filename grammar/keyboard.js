module.exports.rules = {
  keyboard_shortcut: $ => seq(
    "map",
    optional(
      repeat1($._shortcut_property)
    ),

    field("sequence", $.key_sequence),

    optional(
      field("action", $.key_action)
    )
  ),

  _shortcut_property: $ => choice(
    $.key_focus_on,
    $.new_mode,
    $.mode
  ),

  key_focus_on: $ => seq(
    alias("--when-focus-on", $.flag),
    field("condition", $.string)
  ),

  new_mode: $ => seq(
    alias("--new-mode", $.flag),
    field("mode", $.constant)
  ),

  mode: $ => seq(
    alias("--mode", $.flag),
    field("mode", $.constant)
  ),

  key_action: $ => $._action,
  key_sequence: $ => seq(
    $._key,
    repeat($._key_later)
  ),
};
