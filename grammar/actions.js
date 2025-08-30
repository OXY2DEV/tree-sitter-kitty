module.exports.rules = {
  _action: $ => choice(
    $.generic_action,
    $.send_key,
    $.send_text,
    $.show_kitty_doc,
    $.signal_child,
    $.clear_terminal,
    $.combine,
    $.disable_ligatures,
    $.kitten,
    $.launch,
  ),

  generic_action: _ => choice(
    "clear_selection",
    "copy_and_clear_or_interrupt",
    "copy_ansi_to_clipboard",
    "copy_or_interrupt",
    "copy_to_clipboard",
    "pass_selection_to_program",
    "paste",
    "show_first_command_output_on_screen",
    "show_last_command_output",
    "show_last_non_empty_command_output",
    "show_last_visited_command_output",
    "show_scrollback",
    "copy_to_buffer",
    "paste_from_buffer",
    "paste_from_clipboard",
    "paste_from_selection",

    "dump_lines_with_attrs",
    "close_shared_ssh_connections",
    "debug_config",
    "show_kitty_env_vars",
    "simulate_color_scheme_preference_change",

    "goto_layout",
    "last_used_layout",
    "layout_action",
    "next_layout",
    "toggle_layout",

    "remove_marker",
    "scroll_to_mark",
    "scroll_to_mark",
    "create_marker",

    "discard_event",
    "edit_config_file",
    "grab_keyboard",
    "hide_macos_app",
    "hide_macos_other_apps",
    "input_unicode_character",

    "kitty_shell",
  ),

  send_key: $ => seq(
    "send_key",
    field(
      "keys",
      $.key_sequence
    )
  ),

  send_text: $ => seq(
    "send_text",
    field("mode", $.keyboard_mode),
    /[\t ]+/,
    field("text", alias(/[^\n\r]+/, $.string))
  ),

  keyboard_mode: $ => seq(
    $._keyboard_mode,
    repeat(
      seq(
        ",",
        $._keyboard_mode,
      )
    )
  ),

  _keyboard_mode: _ => choice(
    "normal",
    "application",
    "kitty",
    "all"
  ),

  show_kitty_doc: $ => seq(
    "show_kitty_doc",
    field("topic", $.string)
  ),

  signal_child: $ => seq(
    "signal_child",
    field(
      "signal",
      alias(/[A-Z0-9]+/, $.signal_name)
    )
  ),

  clear_terminal: $ => seq(
    "clear_terminal",
    field("action", $.clear_action),
    field("target", $.clear_target)
  ),

  clear_action: _ => choice(
    "reset",
    "clear",
    "scroll",
    "scrollback",
    "to_cursor",
    "to_cursor_scroll"
  ),

  clear_target: _ => choice(
    "active",
    "all"
  ),

  combine: $ => prec.left(seq(
    "combine",
    repeat1($.combine_action)
  )),

  separator: _ => choice(":", "|"),
  combine_action: $ => seq(
    $.separator,
    $._action
  ),

  disable_ligatures: $ => seq(
    "disable_ligatures",
    field("target", $.ligature_target),
    field("disabled_type", $.ligature_disabled)
  ),

  ligature_target: _ => choice(
    "active",
    "all",
    "tab"
  ),

  ligature_disabled: _ => choice(
    "always",
    "never",
    "cursor"
  ),

  kitten: $ => seq(
    "kitten",
    field("target", $.string)
  ),

  // Launch command //////////////////////////////////////////////////////////

  launch: $ => seq(
    "launch",
    optional(
      field("options", $.launch_options)
    ),
    field("command", $.string),
  ),

  launch_options: $ => repeat1($._launch_option),

  _launch_option: $ => choice(
    $.launch_source_window,
    $.launch_window_title,
    $.launch_tab_title,
    $.launch_type,
    $.launch_focus,
    $.launch_cwd,
    $.launch_env,
    $.launch_var,
    $.launch_hold,
    $.launch_copy_colors,
    $.launch_copy_cmd,
    $.launch_copy_env,
    $.launch_window_location,
    $.launch_next_to,
    $.launch_bias,
    $.launch_remote_control,
    // $.launch_remote_password,
    $.launch_stdin_source,
    $.launch_stdin_formatting,
    $.launch_stdin_line_wrap,
    $.launch_marker,
    $.launch_os_window_class,
    $.launch_os_window_name,
    $.launch_os_window_title,
    $.launch_os_window_state,
    $.launch_logo,
    $.launch_logo_position,
    $.launch_logo_alpha,
    // $.launch_color
    // $.launch_spacing
    $.launch_watcher,
    // $.launch_os_panel
    $.launch_hold_after_ssh,
  ),


  launch_source_window: $ => seq(
    "--source-window",
    field("pattern", $.string),
  ),

  launch_window_title: $ => seq(
    choice("--title", "window-title"),
    field("title", $.string)
  ),

  launch_tab_title: $ => seq(
    "--tab-title",
    field("title", $.string)
  ),

  launch_type: _ => seq(
    "--type",
    choice(
      "window",
      "tab",
      "os-window",
      "overlay-main",
      "overlay",
      "background",
      "clipboard,primary",
      "os-panel"
    )
  ),

  launch_focus: _ => choice(
    "--dont-take-focus=no",
    "--dont-take-focus",
    "--keep_focus=no",
    "--keep_focus",
  ),

  launch_cwd: $ => seq(
    "--cwd",
    field("directory", $.string)
  ),

  launch_env: $ => seq(
    "--env",

    field("variable", alias(/[^\s=]+/, $.string)),
    token.immediate("="),
    field("value", $.string),
  ),

  launch_var: $ => seq(
    "--var",

    field("variable", alias(/[^\s=]+/, $.string)),
    token.immediate("="),
    field("value", $.string),
  ),

  launch_hold: _ => choice(
    "--hold=no",
    "--hold"
  ),

  launch_copy_colors: _ => choice(
    "--copy-colors=no",
    "--copy-colors"
  ),

  launch_copy_cmd: _ => choice(
    "--copy-cmd=no",
    "--copy-cmd"
  ),

  launch_copy_env: _ => choice(
    "--copy-env=no",
    "--copy-env"
  ),

  launch_window_location: $ => choice(
    "--location",
    field("location", $.window_location)
  ),

  window_location: _ => choice(
    "before",
    "after",
    "neighbor",

    "vsplit",
    "hsplit",
    "split",
  ),

  launch_next_to: $ => seq(
    "--next-to",
    field("pattern", $.string),
  ),

  launch_bias: $ => seq(
    "--bias",
    field(
      "amount",
      alias(/[0-9\-]+/, $.number),
    ),
  ),

  launch_remote_control: _ => choice(
    "--allow-remote-control=no",
    "--allow-remote-control"
  ),

  launch_stdin_source: $ => seq(
    "--stdin-source",
    field("source", $.stdin_source)
  ),

  stdin_source: _ => choice(
    "@selection",
    "@screen_scrollback",
    "@screen",
    "@alternate",
    "@first_cmd_output_on_screen",
    "@last_cmd_output",
    "@last_visited_cmd_output",
    "none",
  ),

  launch_stdin_formatting: _ => choice(
    "--stdin-add-formatting=no",
    "--stdin-add-formatting",
  ),

  launch_stdin_line_wrap: _ => choice(
    "--stdin-add-line-wrap-markers=no",
    "--stdin-add-line-wrap-markers",
  ),

  launch_marker: $ => seq(
    "--marker",
    field("markers", $.markers)
  ),

  markers: $ => seq(
    field("type", $.marker_type),
    field("markers", $.marker_entries)
  ),

  marker_type: _ => choice(
    "text",
    "itext",
    "regex",
    "iregex",
    "function"
  ),

  marker_entries: $ => repeat1($.marker_entry),

  marker_entry: $ => seq(
    field("id", $.marker_id),
    field("pattern", $.string)
  ),

  marker_id: _ => choice("1", "2", "3"),

  launch_os_window_class: $ => seq(
    "--os-window-class",
    field("class", $.string)
  ),

  launch_os_window_name: $ => seq(
    "--os-window-name",
    field("name", $.string)
  ),

  launch_os_window_title: $ => seq(
    "--os-window-title",
    field("title", $.string)
  ),

  launch_os_window_state: $ => seq(
    "--os-window-state",
    field("state", $.window_state)
  ),

  window_state: _ => choice(
    "normal",
    "fullscreen",
    "maximized",
    "minimized"
  ),

  launch_logo: $ => seq(
    "--logo",
    field("path", $.string)
  ),

  launch_logo_position: $ => seq(
    "--logo-position",
    field("path", $.string)
  ),

  logo_position: _ => choice(
    "top-left",
    "top",
    "top-right",
    "left",
    "center",
    "right",
    "bottom-left",
    "bottom",
    "bottom-right"
  ),

  launch_logo_alpha: $ => seq(
    "--logo-alpha",
    field("alpha", $.number)
  ),

  launch_watcher: $ => seq(
    choice("--watcher", "-w"),
    field("path", $.string)
  ),

  launch_hold_after_ssh: _ => choice(
    "--hold-after-ssh=no",
    "--hold-after-ssh",
  ),
};
