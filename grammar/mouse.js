module.exports.rules = {
  mouse_shortcut: $ => seq(
    "mouse_map",
    field("sequence", $.mouse_sequence),
    field("event_type", $.mouse_event),
    field("modes", $.mouse_mode),

    optional(
      field("action", $._action)
    )
  ),

  mouse_sequence: $ => seq(
    $._key,
    repeat($._key_later)
  ),

  mouse_event: _ => choice(
    "press",
    "release",
    "doublepress",
    "triplepress",
    "click",
    "doubleclick"
  ),

  mouse_mode: _ => seq(
    choice("grabbed", "ungrabbed"),

    optional(
      seq(
        token.immediate(","),
        choice(
          token.immediate("grabbed"),
          token.immediate("ungrabbed"),
        )
      )
    ),
  ),
};
