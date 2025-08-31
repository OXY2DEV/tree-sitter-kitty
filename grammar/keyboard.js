module.exports.rules = {
  keyboard_shortcut: $ => seq(
    "map",
    optional(
      seq(
        /[ \t]+/,
        field("criteria", $.key_criteria)
      )
    ),

    /[ \t]+/,
    field("sequence", $.key_sequence),

    optional(
      seq(
        /[ \t]+/,
        field("action", $.key_action)
      )
    )
  ),

  key_criteria: $ => seq(
    "--when-focus-on",
    /[ \t]+/,
    alias($.string, $.condition)
  ),
  key_action: $ => $._action,
  key_sequence: $ => repeat1($._key_element),

  _key_element: $ => choice(
    $.ctrl,
    $.alt,
    $.shift,
    $.function,
    $.super,
    $.special,
    $.key,
    $.together,
    $.after,
  ),
};
