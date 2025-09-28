module.exports.rules = {
  keyboard_shortcut: $ => seq(
    "map",
    optional(
      field("criteria", $.key_focus_on)
    ),

    field("sequence", $.key_sequence),

    optional(
      field("action", $.key_action)
    )
  ),

  key_focus_on: $ => seq(
    alias("--when-focus-on", $.flag),
    field("condition", $.string)
  ),

  key_action: $ => $._action,
  key_sequence: $ => seq(
    $._key,
    repeat($._key_later)
  ),
};
