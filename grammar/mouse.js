module.exports.rules = {
  mouse_action: $ => seq(
    "mouse_map",
    field("button_name", $.mouse_sequence),
    /[ \t]+/,
    field("event_type", $.mouse_event),
    /[ \t]+/,
    field("modes", $.mouse_mode),

    optional(
        field("action", $._action)
    )
  ),

  mouse_sequence: $ => repeat1($._mouse_element),

  _mouse_element: $ => choice(
    $.ctrl,
    $.alt,
    $.shift,
    $.super,
    $.left,
    $.middle,
    $.right,
    $.mouse_button,
    $.together
  ),

  mouse_event: _ => choice(
    "press",
    "release",
    "doublepress",
    "tripplepress",
    "click",
    "doubleclick"
  ),

  mouse_mode: _ => choice(
    "grabbed",
    "ungrabbed",
    "ungrabbed,grabbed"
  ),
};
