module.exports.rules = {
  keyboard_shortcut: $ => seq(
    "map",
    optional(
      field("criteria", $.key_criteria)
    ),

    field("sequence", $.key_sequence),

    optional(
      field("action", $.key_action)
    )
  ),

  key_criteria: $ => seq(
    "--when-focus-on",
    /[ \t]+/,
    alias($.string, $.condition)
  ),
  key_action: $ => $._action,
  key_sequence: $ => seq(
    $._key,
    repeat($._key_later)
  ),
};
