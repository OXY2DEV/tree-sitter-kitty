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
  _boolean: $ => immediate("yes", "no"),

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
    $.change_font_size,
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
    alias("copy_to_buffer", $.action_name),
    field(
      "value",
      $.string
    )
  ),

  paste_from_buffer: $ => seq(
    alias("paste_from_buffer", $.action_name),
    field(
      "value",
      $.string
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  send_key: $ => seq(
    alias("send_key", $.action_name),
    field(
      "value",
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
    alias("send_text", $.action_name),
    field("mode", $.keyboard_mode),
    /[\t ]+/,
    field("text", alias(/[^\n\r]+/, $.string))
  ),

  keyboard_mode: $ => seq(
    alias($._keyboard_mode, $.constant),
    repeat(
      seq(
        ",",
        alias($._keyboard_mode, $.constant)
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
    alias("show_kitty_doc", $.action_name),
    field("value", $.label)
  ),

  signal_child: $ => seq(
    alias("signal_child", $.action_name),
    field(
      "signal",
      alias(/[A-Z0-9]+/, $.signal_name)
    )
  ),

  clear_terminal: $ => seq(
    alias("clear_terminal", $.action_name),
    field("action", alias($.clear_action, $.constant)),
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
    alias("combine", $.action_name),
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
    $.change_font_size,
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
    alias("disable_ligatures_in", $.action_name),
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
    alias("kitten", $.action_name),
    field("target", $.string),
    optional(
      field("arguments", $.kitten_arguments)
    )
  ),

  kitten_arguments: $ => repeat1($._primitive),

  // Launch command //////////////////////////////////////////////////////////

  launch: $ => seq(
    alias("launch", $.action_name),
    optional(
      field("options", $.launch_options),
    ),
    optional(
      field("command", alias(
        // Command can't start with **special characters**!
        token(/[^-=\s][^\n\r]+/),
        $.string
      )),
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
    alias("--source-window", $.flag),
    field("value", $.string),
  ),

  launch_window_title: $ => seq(
    alias(
      choice("--title", "--window-title"),
      $.flag
    ),
    field("value", $.string)
  ),

  launch_tab_title: $ => seq(
    alias("--tab-title", $.flag),
    field("value", $.string)
  ),

  launch_type: $ => seq(
    alias("--type", $.flag),
    token.immediate("="),
    field("value", $.launch_type_value),
  ),

  launch_type_value: _ => immediate(
    "window",
    "tab",
    "os-window",
    "overlay-main",
    "overlay",
    "background",
    "clipboard,primary",
    "os-panel"
  ),

  launch_focus: $ => seq(
    alias(
      choice("--dont-take-focus", "--keep-focus"),
      $.flag
    ),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    )
  ),

  launch_cwd: $ => seq(
    alias("--cwd", $.flag),
    token.immediate("="),
    field(
      "value",
      alias(token.immediate(/\S+/), $.path)
    )
  ),

  launch_env: $ => seq(
    alias("--env", $.flag),

    field("variable", alias(/[^\s=]+/, $.string)),
    token.immediate("="),
    field("value", $.variable),
  ),

  launch_var: $ => seq(
    alias("--var", $.flag),

    field("variable", alias(/[^\s=]+/, $.string)),
    token.immediate("="),
    field("value", $.variable),
  ),

  // Match as many characters as possible.
  launch_hold: $ => seq(
    alias("--hold", $.flag),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    ),
  ),

  launch_copy_colors: $ => seq(
    alias("--copy-colors", $.flag),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    )
  ),

  launch_copy_cmd: $ => seq(
    alias("--copy-cmd", $.flag),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    ),
  ),

  launch_copy_env: $ => seq(
    alias("--copy-env", $.flag),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    ),
  ),

  launch_window_location: $ => seq(
    alias("--location", $.flag),
    token.immediate("="),
    field("value", $.window_location)
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
    alias("--next-to", $.flag),
    field("value", $.string),
  ),

  launch_bias: $ => seq(
    alias("--bias", $.flag),
    field(
      "value",
      alias(/[0-9\-\.]+/, $.number),
    ),
  ),

  launch_remote_control: $ => seq(
    alias("--allow-remote-control", $.flag),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    ),
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_remote_password: $ => seq(
    alias("--remote-control-password", $.flag),

    "'",
    field("password", alias($.password, $.string)),

    optional(
      field("actions", $.remote_actions)
    ),
    "'",
  ),

  password: _ => token(/"[^"]+"/),

  ////////////////////////////////////////////////////////////////////////////

  launch_stdin_source: $ => seq(
    alias("--stdin-source", $.flag),
    token.immediate("="),
    field("value", $.stdin_source)
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

  launch_stdin_formatting: $ => seq(
    alias("--stdin-add-formatting", $.flag),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    ),
  ),

  launch_stdin_line_wrap: $ => seq(
    alias("--stdin-add-line-wrap-markers", $.flag),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    ),
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_marker: $ => seq(
    alias("--marker", $.flag),
    field("value", $.markers)
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
    field("id", alias($.marker_id, $.label)),
    field("pattern", $.pattern)
  ),

  marker_id: _ => choice("1", "2", "3"),

  ////////////////////////////////////////////////////////////////////////////

  launch_os_window_class: $ => seq(
    alias("--os-window-class", $.flag),
    field("value", alias($.string, $.os_window_class))
  ),

  launch_os_window_name: $ => seq(
    alias("--os-window-name", $.flag),
    field("value", $.string)
  ),

  launch_os_window_title: $ => seq(
    alias("--os-window-title", $.flag),
    field("value", $.string)
  ),

  launch_os_window_state: $ => seq(
    alias("--os-window-state", $.flag),
    field("value", $.window_state)
  ),

  window_state: _ => choice(
    "normal",
    "fullscreen",
    "maximized",
    "minimized"
  ),

  launch_logo: $ => seq(
    alias("--logo", $.flag),
    field("value", $.path)
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_logo_position: $ => seq(
    alias("--logo-position", $.flag),
    field("value", $.logo_position)
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
    alias("--logo-alpha", $.flag),
    field("value", $.number)
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_color: $ => seq(
    alias("--color", $.flag),
    field("name", $.color_option_name),
    token.immediate("="),
    field("value", $.color),
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_spacing: $ => seq(
    alias("--spacing", $.flag),
    field(
      "name",
      alias(/[^\s\=]+/, $.spacing_type)
    ),
    token.immediate("="),
    field("value", $.number),
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_os_panel: $ => seq(
    alias("--os-panel", $.flag),
    field("value", $._os_panel_option),
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
    alias("lines", $.option_name),
    token.immediate("="),
    field(
      "value",
      choice($.number, $.pixel)
    ),
  ),

  os_panel_columns: $ => seq(
    alias("columns", $.option_name),
    token.immediate("="),
    field(
      "value",
      choice($.number, $.pixel)
    ),
  ),

  os_panel_margin_top: $ => seq(
    alias("margin-top", $.option_name),
    token.immediate("="),
    field("value", $.number),
  ),

  os_panel_margin_left: $ => seq(
    alias("margin-left", $.option_name),
    token.immediate("="),
    field("value", $.number),
  ),

  os_panel_margin_bottom: $ => seq(
    alias("margin-bottom", $.option_name),
    token.immediate("="),
    field("value", $.number),
  ),

  os_panel_margin_right: $ => seq(
    alias("margin-right", $.option_name),
    token.immediate("="),
    field("value", $.number),
  ),

  os_panel_edge: $ => seq(
    alias("edge", $.option_name),
    token.immediate("="),
    field("value", alias($.edge, $.constant)),
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
    alias("layer", $.option_name),
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
    alias("output-name", $.option_name),
    token.immediate("="),
    field("value", $.output_name),
  ),

  output_name: _ => immediate(
    "list",
    "listjson"
  ),

  os_panel_app_id: $ => seq(
    alias(
      choice(
        "app-id",
        "class",
      ),
      $.option_name
    ),
    token.immediate("="),
    field("value", $.output_name),
  ),

  os_panel_name: $ => seq(
    alias(
      choice(
        "name",
        "os-window-tag",
      ),
      $.option_name
    ),
    token.immediate("="),
    field("value", $.output_name),
  ),

  os_panel_focus_policy: $ => seq(
    alias("focus-policy", $.option_name),
    token.immediate("="),
    field("value", $.focus_policy),
  ),

  focus_policy: _ => choice(
    "exclusive",
    "not-allowed",
    "on-demand",
  ),

  os_panel_grab_keyboard: $ => seq(
    alias("grab-keyboard", $.option_name),
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_exclusive_zone: $ => seq(
    alias("exclusive-zone", $.option_name),
    token.immediate("="),
    field("value", $.number),
  ),

  os_panel_override_exclusive_zone: $ => seq(
    alias("override-exclusive-zone", $.option_name),
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_single_instancw: $ => seq(
    alias(
      choice(
        "single-instance",
        "1"
      ),
      $.option_name
    ),
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_instance_group: $ => seq(
    alias("instance-group", $.option_name),
    token.immediate("="),
    field("value", $.string),
  ),

  os_panel_wait_for_single_instance_window_close: $ => seq(
    alias("wait-for-single-instance-window-close", $.option_name),
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_listen_on: $ => seq(
    alias("listen-on", $.option_name),
    token.immediate("="),
    field("value", $.string),
  ),

  os_panel_toggle_visibility: $ => seq(
    alias("toggle-visibility", $.option_name),
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_start_as_hidden: $ => seq(
    alias("start-as-hidden", $.option_name),
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_detach: $ => seq(
    alias("detach", $.option_name),
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_detach_log: $ => seq(
    alias("detached-log", $.option_name),
    token.immediate("="),
    field("value", $.string),
  ),

  os_panel_debug_rendering: $ => seq(
    alias("debug-rendering", $.option_name),
    token.immediate("="),
    field("value", $.boolean),
  ),

  os_panel_debug_input: $ => seq(
    alias("debug-input", $.option_name),
    token.immediate("="),
    field("value", $.boolean),
  ),

  ////////////////////////////////////////////////////////////////////////////

  launch_watcher: $ => seq(
    choice("--watcher", "-w"),
    field("value", $.path)
  ),

  launch_hold_after_ssh: $ => seq(
    alias("--hold-after-ssh", $.flag),

    optional(
      seq(
        token.immediate("="),
        alias($._boolean, $.boolean),
      )
    ),
  ),

  ////////////////////////////////////////////////////////////////////////////

  load_config_file: $ => seq(
    alias("load_config_file", $.action_name),

    optional(
      field("value", $.path)
    )
  ),

  open_url: $ => seq(
    alias("open_url", $.action_name),
    field("value", $.string)
  ),

  remote_control_script: $ => seq(
    alias("remote_control_script", $.action_name),
    field("path", $.path),

    optional(
      field("arguments", $.remote_args)
    )
  ),

  remote_args: $ => repeat1($._primitive),

  ////////////////////////////////////////////////////////////////////////////

  sleep: $ => seq(
    alias("sleep", $.action_name),
    field("value", $.time)
  ),

  mouse_handle_click: $ => seq(
    alias("mouse_handle_click", $.action_name),
    field("value", $.handle_click_actions)
  ),

  handle_click_actions: $ => repeat1($.click_action),
  click_action: _ => choice(
    "selection",
    "link",
    "prompt"
  ),

  ////////////////////////////////////////////////////////////////////////////

  mouse_selection: $ => seq(
    alias("mouse_selection", $.action_name),
    field("value", $.mouse_selection_type)
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

  scroll_prompt_to_top: $ => seq(
    alias("scroll_prompt_to_top", $.action_name),
    optional(
      alias("y", $.boolean)
    ),
  ),

  scroll_to_prompt: $ => seq(
    alias("scroll_to_prompt", $.action_name),
    field("prompt_number", $.number),
    optional(
      field("lines_above", $.number),
    ),
  ),

  goto_tab: $ => seq(
    alias("goto_tab", $.action_name),
    field("value", alias($.number, $.label)),
  ),

  set_tab_title: $ => seq(
    alias("set_tab_title", $.action_name),
    optional(
      field("value", $.title),
    )
  ),

  set_window_title: $ => seq(
    alias("set_window_title", $.action_name),
    field("title", $.title),
  ),

  title: _ => choice(
    token(/"[^"]+"/),
    prec(-100, token(/[^\n\r]+/))
  ),

  move_window: $ => seq(
    alias("move_window", $.action_name),
    field("value", $.direction),
  ),

  ////////////////////////////////////////////////////////////////////////////

  neighboring_window: $ => prec.right(seq(
    alias("neighboring_window", $.action_name),
    field("value", $.direction),
  )),

  ////////////////////////////////////////////////////////////////////////////

  nth_window: $ => seq(
    alias("nth_window", $.action_name),
    field("value", alias($.number, $.label)),
  ),

  resize_window: $ => seq(
    alias("resize_window", $.action_name),
    field("layout", $.window_layout),
    optional(
      field("amount", $.number),
    ),
  ),

  window_layout: _ => choice(
    "narrower",
    "wider",
    "taller",
    "shorter",
  ),

  ////////////////////////////////////////////////////////////////////////////

  change_font_size: $ => seq(
    alias("change_font_size", $.action_name),
    field("target", $.os_window),
    field("amount", $.font_change_amount),
  ),

  os_window: _ => choice(
    "all",
    "current"
  ),

  font_change_amount: $ => seq(
    optional(
      field("sign", $.font_change_sign)
    ),
    alias($.font_change_number, $.number)
  ),

  font_change_sign: _ => choice("+", "-", "*", "/"),
  font_change_number: _ => token(/[\d\.]+/),

  ////////////////////////////////////////////////////////////////////////////

  close_window_with_confirmation: $ => seq(
    alias("close_window_with_confirmation", $.action_name),
    optional("ignore-shell"),
  ),

  detach_window: $ => seq(
    alias("detach_window", $.action_name),
    optional(
      field("value", $.detach_into),
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

  ////////////////////////////////////////////////////////////////////////////

  set_background_opacity: $ => seq(
    alias("set_background_opacity", $.action_name),
    field("alpha", $.background_alpha),
  ),

  background_alpha: $ => choice(
    alias("default", $.constant),
    $.number
  ),

  ////////////////////////////////////////////////////////////////////////////

  nth_os_window: $ => seq(
    alias("nth_os_window", $.action_name),
    field("value", alias($.number, $.label)),
  ),

  toggle_layout: $ => seq(
    alias("toggle_layout", $.action_name),
    optional(
      field("value", $.layout_type)
    ),
  ),

  goto_layout: $ => seq(
    alias("goto_layout", $.action_name),
    field("name", $.layout_type),
    optional(
      seq(
        token.immediate(":"),
        field("options", $.layout_option)
      )
    ),
  ),

  layout_option: $ => seq(
    field(
      "name",
      alias(
        token.immediate(/[\w]+/),
        $.constant
      )
    ),
    token.immediate("="),
    field(
      "value",
      $._primitive
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  remote_control: $ => seq(
    alias("remote_control", $.action_name),
    /[ \t]+/,
    field(
      "value",
      alias(/[^\n\r]+/, $.string)
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  aliased_action: $ => seq(
    field("name", alias(/\w+/, $.string)),
    optional(
      field("value", $.action_arguments)
    )
  ),

  action_arguments: $ => repeat1($._primitive),

  pass_selection_to_program: $ => seq(
    alias("pass_selection_to_program", $.action_name),
    field("value", $.constant)
  ),

  ////////////////////////////////////////////////////////////////////////////

  new_window: $ => seq(
    alias("new_window", $.action_name),

    optional(
      seq(
        field("value", alias($.string, $.title)),
        optional("@selection")
      )
    ),
  ),

  ////////////////////////////////////////////////////////////////////////////

  kitty_shell: $ => seq(
    alias("kitty_shell", $.action_name),
    optional(
      field("value", $.kitty_shell_open_as)
    )
  ),

  kitty_shell_open_as: _ => choice(
    "window",
    "tab",
    "overlay",
    "os_window",
  ),
};
