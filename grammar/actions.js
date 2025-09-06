function immediate (...tokens) {
  let output = [];

  tokens.forEach(t => {
    output.push(
      token.immediate(t)
    );
  })

  return choice(...output);
}

module.exports.rules = {
  _action: $ => choice(
    $.generic_action,

    $.copy_to_buffer,
    $.paste_from_buffer,
    $.send_key,
    $.send_text,
    $.show_kitty_doc,
    $.signal_child,
    $.clear_terminal,
    $.combine,
    $.disable_ligatures_in,
    $.kitten,
    $.launch,
    $.load_config_file,
    $.open_url,
    $.remote_control,
    $.remote_control_script,
    $.set_colors,
    $.sleep,

    $.mouse_handle_click,
    $.mouse_selection,

    $.scroll_prompt_to_top,
    $.scroll_to_prompt,

    $.goto_tab,
    $.set_tab_title,

    $.set_window_title,
    $.move_window,
    $.neighboring_window,
    $.nth_window,
    $.resize_window,
    $.close_window_with_confirmation,
    $.detach_window,
    $.set_background_opacity,

    $.nth_os_window,
    $.goto_layout,

    $.pass_selection_to_program,
    $.new_window,
    $.toggle_layout,
    $.kitty_shell,

    $.aliased_action,
  ),

  generic_action: _ => choice(
    "clear_selection",
    "copy_and_clear_or_interrupt",
    "copy_ansi_to_clipboard",
    "copy_or_interrupt",
    "copy_to_clipboard",
    "paste",
    "show_first_command_output_on_screen",
    "show_last_command_output",
    "show_last_non_empty_command_output",
    "show_last_visited_command_output",
    "show_scrollback",
    "paste_from_clipboard",
    "paste_from_selection",

    "dump_lines_with_attrs",
    "close_shared_ssh_connections",
    "debug_config",
    "show_kitty_env_vars",
    "simulate_color_scheme_preference_change",

    "last_used_layout",
    "layout_action",
    "next_layout",

    "remove_marker",
    "scroll_to_mark",
    "create_marker",
    "scroll_home",

    "discard_event",
    "edit_config_file",
    "grab_keyboard",
    "hide_macos_app",
    "hide_macos_other_apps",
    "input_unicode_character",

    "minimize_macos_window",
    "open_url_with_hints",

    "pop_keyboard_mode",
    "push_keyboard_mode",

    "show_error",
    "toggle_macos_secure_keyboard_entry",
    "ungrab_keyboard",
    "no_op",

    "mouse_click_url",
    "mouse_click_url_or_select",
    "mouse_select_command_output",
    "mouse_show_command_output",
    "paste_selection",
    "paste_selection_or_clipboard",

    "scroll_end",
    "scroll_line_down",
    "scroll_line_up",
    "scroll_page_down",
    "scroll_page_up",
    "scroll_prompt_to_bottom",

    "close_tab",
    "detach_tab",
    "move_tab_backward",
    "move_tab_forward",
    "new_tab",
    "new_tab_with_cwd",
    "next_tab",
    "previous_tab",
    "select_tab",

    "close_other_windows_in_tab",
    "close_other_tabs_in_os_window",
    "eighth_window",
    "fifth_window",
    "first_window",
    "focus_visible_window",
    "fourth_window",
    "move_window_backward",
    "move_window_forward",
    "move_window_to_top",
    "next_window",
    "ninth_window",
    "previous_window",
    "reset_window_sizes",
    "second_window",
    "seventh_window",
    "sixth_window",
    "swap_with_window",
    "tenth_window",
    "third_window",
    "close_os_window",
    "close_other_os_windows",
    "close_window",
    "new_os_window",
    "new_os_window_with_cwd",
    "new_window_with_cwd",
    "quit",
    "start_resizing_window",
    "toggle_fullscreen",
    "toggle_maximized",
    "toggle_tab",

    "toggle_marker",
  ),

  ////////////////////////////////////////////////////////////////////////////

  copy_to_buffer: $ => seq(
    "copy_to_buffer",
    field(
      "buffer",
      $.string
    )
  ),

  paste_from_buffer: $ => seq(
    "paste_from_buffer",
    field(
      "buffer",
      $.string
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  send_key: $ => seq(
    "send_key",
    field(
      "keys",
      $.keys
    )
  ),

  keys: $ => repeat1(
    seq(
      $._key,
      repeat($._key_later)
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////////////////////

  combine: $ => prec.left(seq(
    "combine",
    repeat1($.combine_action)
  )),

  separator: _ => choice(":", "|"),
  combine_action: $ => seq(
    $.separator,
    $._combine_action
  ),

  _combine_action: $ => choice(
    $.generic_action,

    $.copy_to_buffer,
    $.paste_from_buffer,
    $.send_key,
    $.send_text,
    $.show_kitty_doc,
    $.signal_child,
    $.clear_terminal,
    $.disable_ligatures_in,
    $.kitten,
    $.launch,
    $.load_config_file,
    $.open_url,
    $.remote_control,
    $.remote_control_script,
    $.set_colors,
    $.sleep,

    $.mouse_handle_click,
    $.mouse_selection,

    $.scroll_prompt_to_top,
    $.scroll_to_prompt,

    $.goto_tab,
    $.set_tab_title,

    $.set_window_title,
    $.move_window,
    $.neighboring_window,
    $.nth_window,
    $.resize_window,
    $.close_window_with_confirmation,
    $.detach_window,
    $.set_background_opacity,

    $.nth_os_window,
    $.goto_layout,

    $.pass_selection_to_program,
    $.new_window,

    $.aliased_action,
  ),

  ////////////////////////////////////////////////////////////////////////////

  disable_ligatures_in: $ => seq(
    "disable_ligatures_in",
    field("target", $.ligature_target),
    field("type", $.ligature_disabled)
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

  ////////////////////////////////////////////////////////////////////////////

  kitten: $ => seq(
    "kitten",
    field("target", $.string),
    optional(
      field("arguments", $.kitten_arguments)
    )
  ),

  kitten_arguments: $ => repeat1($._primitive),

  // Launch command //////////////////////////////////////////////////////////

  launch: $ => seq(
    "launch",
    optional(
      field("options", $.launch_options),
    ),
    optional(
      field("command", alias(/\w[^\n\r]+/, $.string)),
    )
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
    $.launch_remote_password,
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
    $.launch_color,
    $.launch_spacing,
    $.launch_watcher,
    $.launch_os_panel,
    $.launch_hold_after_ssh,
  ),


  launch_source_window: $ => seq(
    "--source-window",
    field("pattern", $.string),
  ),

  launch_window_title: $ => seq(
    choice("--title", "--window-title"),
    field("title", $.string)
  ),

  launch_tab_title: $ => seq(
    "--tab-title",
    field("title", $.string)
  ),

  launch_type: _ => seq(
    "--type",
    token.immediate("="),
    immediate(
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

  // Take as many characters as possible.
  launch_focus: _ => prec.right(choice(
    seq(
      "--dont-take-focus",

      optional(
        seq(
          token.immediate("="),
          token.immediate("no")
        )
      )
    ),
    seq(
      "--keep-focus",

      optional(
        seq(
          token.immediate("="),
          token.immediate("no")
        )
      )
    ),
  )),

  launch_cwd: $ => seq(
    "--cwd",
    token.immediate("="),
    field(
      "directory",
      alias(token.immediate(/\S+/), $.string)
    )
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

  // Match as many characters as possible.
  launch_hold: _ => prec.right(
    seq(
      "--hold",

      optional(
        seq(
          token.immediate("="),
          token.immediate("no")
        )
      ),
    )
  ),

  launch_copy_colors: _ => prec.right(
    seq(
      "--copy-colors",

      optional(
        seq(
          token.immediate("="),
          token.immediate("no")
        )
      ),
    )
  ),

  launch_copy_cmd: _ => prec.right(
    seq(
      "--copy-cmd",

      optional(
        seq(
          token.immediate("="),
          token.immediate("no")
        )
      ),
    )
  ),

  launch_copy_env: _ => prec.right(
    seq(
      "--copy-env",

      optional(
        seq(
          token.immediate("="),
          token.immediate("no")
        )
      ),
    )
  ),

  launch_window_location: $ => seq(
    "--location",
    token.immediate("="),
    field("location", $.window_location)
  ),

  window_location: _ => immediate(
    "before",
    "after",
    "neighbor",
    "first",
    "last",

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
      alias(/[0-9\-\.]+/, $.number),
    ),
  ),

  launch_remote_control: _ => prec.right(
    seq(
      "--allow-remote-control",

      optional(
        seq(
          token.immediate("="),
          token.immediate("no")
        )
      ),
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_remote_password: $ => seq(
    "--remote-control-password",

    "'",
    '"',
    field("password", $.password),
    '"',

    optional(
      field("actions", $.remote_actions)
    ),
    "'",
  ),

  password: _ => token(/[^"]+/),

  ////////////////////////////////////////////////////////////////////////////

  launch_stdin_source: $ => seq(
    "--stdin-source",
    token.immediate("="),
    field("source", $.stdin_source)
  ),

  stdin_source: _ => immediate(
    "@selection",
    "@screen_scrollback",
    "@screen",
    "@alternate",
    "@first_cmd_output_on_screen",
    "@last_cmd_output",
    "@last_visited_cmd_output",
    "none",
  ),

  launch_stdin_formatting: _ => prec.right(
    seq(
      "--stdin-add-formatting",

      optional(
        seq(
          token.immediate("="),
          token.immediate("no")
        )
      ),
    )
  ),

  launch_stdin_line_wrap: _ => prec.right(
    seq(
      "--stdin-add-line-wrap-markers",

      optional(
        seq(
          token.immediate("="),
          token.immediate("no")
        )
      ),
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////////////////////

  launch_logo_position: $ => seq(
    "--logo-position",
    field("position", $.logo_position)
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

  ////////////////////////////////////////////////////////////////////////////

  launch_logo_alpha: $ => seq(
    "--logo-alpha",
    field("alpha", $.number)
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_color: $ => seq(
    "--color",
    field("name", $.color_option_name),
    token.immediate("="),
    field("value", $.color),
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_spacing: $ => seq(
    "--spacing",
    field(
      "name",
      alias(/[^\s\=]+/, $.string)
    ),
    token.immediate("="),
    field("value", $.number),
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_os_panel: $ => seq(
    "--os-panel",
    field("option", $._os_panel_option),
  ),

  _os_panel_option: $ => choice(
    $.os_panel_lines,
    $.os_panel_columns,

    $.os_panel_margin_top,
    $.os_panel_margin_left,
    $.os_panel_margin_bottom,
    $.os_panel_margin_right,

    $.os_panel_edge,
    $.os_panel_layer,
    $.os_panel_output_name,
    $.os_panel_app_id,
    $.os_panel_name,
    $.os_panel_focus_policy,
    $.os_panel_grab_keyboard,
    $.os_panel_exclusive_zone,
    $.os_panel_override_exclusive_zone,
    $.os_panel_single_instancw,
    $.os_panel_instance_group,
    $.os_panel_wait_for_single_instance_window_close,
    $.os_panel_listen_on,
    $.os_panel_toggle_visibility,
    $.os_panel_start_as_hidden,
    $.os_panel_detach,
    $.os_panel_detach_log,
    $.os_panel_debug_rendering,
    $.os_panel_debug_input,
  ),

  os_panel_lines: $ => seq(
    "lines",
    token.immediate("="),
    field(
      "value",
      choice($.number, $.pixel)
    ),
  ),

  os_panel_columns: $ => seq(
    "columns",
    token.immediate("="),
    field(
      "value",
      choice($.number, $.pixel)
    ),
  ),

  os_panel_margin_top: $ => seq(
    "margin-top",
    token.immediate("="),
    field("value", $.number),
  ),

  os_panel_margin_left: $ => seq(
    "margin-left",
    token.immediate("="),
    field("value", $.number),
  ),

  os_panel_margin_bottom: $ => seq(
    "margin-bottom",
    token.immediate("="),
    field("value", $.number),
  ),

  os_panel_margin_right: $ => seq(
    "margin-right",
    token.immediate("="),
    field("value", $.number),
  ),

  os_panel_edge: $ => seq(
    "edge",
    token.immediate("="),
    field("value", $.edge),
  ),

  edge: _ => immediate(
    "background",
    "bottom",
    "center",
    "center-sized",
    "left",
    "none",
    "right",
    "top",
  ),

  os_panel_layer: $ => seq(
    "layer",
    token.immediate("="),
    field("value", $.layer),
  ),

  layer: _ => immediate(
    "background",
    "bottom",
    "overlay",
    "top",
  ),

  os_panel_output_name: $ => seq(
    "output-name",
    token.immediate("="),
    field("path", $.output_name),
  ),

  output_name: _ => immediate(
    "list",
    "listjson"
  ),

  os_panel_app_id: $ => seq(
    choice(
      "app-id",
      "class",
    ),
    token.immediate("="),
    field("value", $.output_name),
  ),

  os_panel_name: $ => seq(
    choice(
      "name",
      "os-window-tag",
    ),
    token.immediate("="),
    field("value", $.output_name),
  ),

  os_panel_focus_policy: $ => seq(
    "focus-policy",
    token.immediate("="),
    field("value", $.focus_policy),
  ),

  focus_policy: _ => choice(
    "exclusive",
    "not-allowed",
    "on-demand",
  ),

  os_panel_grab_keyboard: $ => seq(
    "grab-keyboard",
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_exclusive_zone: $ => seq(
    "exclusive-zone",
    token.immediate("="),
    field("value", $.number),
  ),

  os_panel_override_exclusive_zone: $ => seq(
    "override-exclusive-zone",
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_single_instancw: $ => seq(
    choice(
      "single-instance",
      "1",
    ),
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_instance_group: $ => seq(
    "instance-group",
    token.immediate("="),
    field("value", $.string),
  ),

  os_panel_wait_for_single_instance_window_close: $ => seq(
    "wait-for-single-instance-window-close",
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_listen_on: $ => seq(
    "listen-on",
    token.immediate("="),
    field("value", $.string),
  ),

  os_panel_toggle_visibility: $ => seq(
    "toggle-visibility",
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_start_as_hidden: $ => seq(
    "start-as-hidden",
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_detach: $ => seq(
    "detach",
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_detach_log: $ => seq(
    "detached-log",
    token.immediate("="),
    field("path", $.string),
  ),

  os_panel_debug_rendering: $ => seq(
    "debug-rendering",
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_debug_input: $ => seq(
    "debug-input",
    token.immediate("="),
    field("value", $.boolean),
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_watcher: $ => seq(
    choice("--watcher", "-w"),
    field("path", $.string)
  ),

  launch_hold_after_ssh: _ => prec.right(
    seq(
      "--hold-after-ssh",

      optional(
        seq(
          token.immediate("="),
          token.immediate("no")
        )
      ),
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  load_config_file: $ => seq(
    "load_config_file",

    optional(
      field("path", $.string)
    )
  ),

  open_url: $ => seq(
    "open_url",
    field("url", $.string)
  ),

  remote_control_script: $ => seq(
    "remote_control_script",
    field("path", $.string),

    optional(
      field("arguments", $.remote_args)
    )
  ),

  remote_args: $ => repeat1($._primitive),

  ////////////////////////////////////////////////////////////////////////////

  sleep: $ => seq(
    "sleep",
    field("time", $.time)
  ),

  mouse_handle_click: $ => seq(
    "mouse_handle_click",
    field("actions", $.handle_click_actions)
  ),

  handle_click_actions: $ => repeat1($._handle_click_action),
  _handle_click_action: _ => choice(
    "selection",
    "link",
    "prompt"
  ),

  ////////////////////////////////////////////////////////////////////////////

  mouse_selection: $ => seq(
    "mouse_selection",
    field("selection", $.mouse_selection_type)
  ),

  mouse_selection_type: _ => choice(
    "normal",
    "rectangle",
    "word",
    "line",
    "line_from_point",
    "extend",
  ),

  ////////////////////////////////////////////////////////////////////////////

  scroll_prompt_to_top: _ => seq(
    "scroll_prompt_to_top",
    optional(
      "y",
    ),
  ),

  scroll_to_prompt: $ => seq(
    "scroll_to_prompt",
    field("prompt_number", $.number),
    optional(
      field("lines_above", $.number),
    ),
  ),

  goto_tab: $ => seq(
    "goto_tab",
    field("tab", $.number),
  ),

  set_tab_title: $ => seq(
    "set_tab_title",
    optional(
      field("title", $.title),
    )
  ),

  set_window_title: $ => seq(
    "set_window_title",
    field("tab", $.title),
  ),

  title: _ => choice(
    token(/"[^"]+"/),
    prec(-100, token(/[^\n\r]+/))
  ),

  move_window: $ => seq(
    "move_window",
    field("direction", $.direction),
  ),

  ////////////////////////////////////////////////////////////////////////////

  neighboring_window: $ => seq(
    "neighboring_window",
    field("direction", $.direction),
  ),

  ////////////////////////////////////////////////////////////////////////////

  nth_window: $ => seq(
    "nth_window",
    field("window", $.number),
  ),

  resize_window: $ => seq(
    "resize_window",
    field("layout", $.window_layout),
    optional(
      seq(
        /[ \t]+/,
        field("amount", $.number),
      )
    ),
  ),

  window_layout: _ => choice(
    "narrowee",
    "wider",
    "taller",
    "shorter",
  ),

  change_font_size: $ => seq(
    "change_font_size",
    field("target", $.os_window),
    field("amount", $.font_change_amount),
  ),

  os_window: _ => choice(
    "all",
    "current"
  ),

  font_change_amount: $ => seq(
    /[\+\-\*\\]?/,
    $.number
  ),

  close_window_with_confirmation: _ => seq(
    "close_window_with_confirmation",
    optional(
      seq(
        /[ \t]+/,
        "ignore-shell"
      )
    ),
  ),

  detach_window: $ => seq(
    "detach_window",
    optional(
      seq(
        /[ \t]+/,
        field("into", $.detach_into),
      )
    ),
  ),

  detach_into: _ => choice(
    "new-tab-prev",
    "new-tab-left",
    "new-tab-next",
    "new-tab-right",
    "new-tab",

    "tab-prev",
    "tab-left",
    "tab-next",
    "tab-right",

    "ask",
  ),

  set_background_opacity: $ => seq(
    "set_background_opacity",
    field("alpha", $.background_alpha),
  ),

  background_alpha: $ => choice(
    "default",
    $.number
  ),

  ////////////////////////////////////////////////////////////////////////////

  nth_os_window: $ => seq(
    "nth_os_window",
    field("window", $.number),
  ),

  toggle_layout: $ => seq(
    "toggle_layout",
    optional(
      field("name", $.layout_name)
    ),
  ),

  goto_layout: $ => seq(
    "goto_layout",
    field("name", $.layout_name),
    optional(
      field("options", $.layout)
    ),
  ),

  layout_name: _ => choice(
    "stack",
    "tall",
    "fat",
    "grid",
    "splits",
    "horizontal",
    "vertical",
  ),

  layout: $ => seq(
    token.immediate(":"),
    $._layout_item,
    repeat(
      seq(
        ";",
        $._layout_item
      )
    )
  ),

  _layout_item: $ => choice(
    $.layout_bias,
    $.layout_full_size,
    $.layout_mirrored,
    $.layout_split_axis,
  ),

  layout_bias: $ => seq(
    field(
      "name",
      alias(
        token.immediate("bias"),
        $.string
      )
    ),
    token.immediate("="),
    field(
      "value",
      $.number
    )
  ),

  layout_full_size: $ => seq(
    field(
      "name",
      alias(
        token.immediate("full_size"),
        $.string
      )
    ),
    token.immediate("="),
    field(
      "value",
      $.number
    )
  ),

  layout_mirrored: $ => seq(
    field(
      "name",
      alias(
        token.immediate("mirrored"),
        $.string
      )
    ),
    token.immediate("="),
    field(
      "value",
      $.boolean
    )
  ),

  layout_split_axis: $ => seq(
    field(
      "name",
      alias(
        token.immediate("split_axis"),
        $.string
      )
    ),
    token.immediate("="),
    field(
      "value",
      $.axis
    )
  ),

  axis: _ => choice("horizontal", "vertical"),

  ////////////////////////////////////////////////////////////////////////////

  remote_control: $ => seq(
    "remote_control",
    /[ \t]+/,
    field(
      "commands",
      alias(/[^\n\r]+/, $.string)
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  aliased_action: $ => seq(
    field("name", alias(/\w+/, $.string)),
    optional(
      field("arguments", $.action_arguments)
    )
  ),

  action_arguments: $ => repeat1($._primitive),


  pass_selection_to_program: $ => seq(
    "pass_selection_to_program",
    field("program", $.string)
  ),

  ////////////////////////////////////////////////////////////////////////////

  new_window: $ => seq(
    "new_window",

    optional(
      seq(
        field("program",
          alias(/\w+/, $.string)
        ),
        optional("@selection")
      )
    ),
  ),

  ////////////////////////////////////////////////////////////////////////////

  kitty_shell: $ => seq(
    "kitty_shell",
    optional(
      field("arguments", $.kitty_shell_open_as)
    )
  ),

  kitty_shell_open_as: _ => choice(
    "window",
    "tab",
    "overlay",
    "os_window",
  ),
};
