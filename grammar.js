/**
 * @file Tree-sitter grammar for kitty.conf files.
 * @author MD. Mouinul Hossain <mdmouinulhossainshawon@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

function immediate (tokens) {
  let output = [];

  tokens.forEach(t => {
    output.push(
      token.immediate(t)
    );
  })

  return choice(...output);
}

module.exports = grammar({
  name: "kitty",

  extras: _ => [
    token(
      seq(/\r?\n/, "\\"),
    ),
    /[\t ]/,
  ],
  rules: {
    configuration_file: $ => repeat(
      $._common_node
    ),

    _common_node: $ => seq(
      choice(
        $.comment,
        $.include,
        $.option,
        $.keyboard_shortcut,
        $.mouse_action
      ),
      /\r?\n+/,
    ),

    comment: $ => seq(
        "#",
        alias(/[^\n\r]*/, $.comment_content),
    ),

    include: $ => choice(
      $._path_include,
      $._glob_include,
      $._gen_include,
      $._env_include,
    ),

    _path_include: $ => seq(
      "include",
      field(
        "path",
        alias(/[^\s]+/, $.path)
      ),
    ),
    _glob_include: $ => seq(
      "globinclude",
      field(
        "glob",
        alias(/[^\s]+/, $.pattern)
      ),
    ),
    _gen_include: $ => seq(
      "geninclude",
      field(
        "file",
        alias(/[^\s]+/, $.path)
      ),
    ),
    _env_include: $ => seq(
      "envinclude",
      field(
        "environment_variable",
        alias(/[^\s]+/, $.name)
      ),
    ),


    option: $ => seq(
      field(
        "key",
        alias(/[\w_]+/, $.string)
      ),
      field(
        "value",
        alias(repeat1($._primitive), $.value),
      )
    ),

    _primitive: $ => choice(
      $.pixel,
      $.percentage,
      $.number,
      $.boolean,
      $.color,
      $.string,
      prec(-100, alias(".", $.inherit)),
    ),

    pixel: _ => token(/\d+px/),
    percentage: _ => token(/[\d\.]+%/),
    number: _ => token(/[\d\.\-]+/),
    boolean: _ => choice("yes", "no", "true", "false"),
    color: _ => token(/#[0-9A-Fa-f]{3,6}/),
    string: _ => token(/\S+/),


    mouse_action: $ => seq(
      "mouse_map",
      field("button_name", $.mouse_sequence),
      /[ \t]+/,
      field("event_type", $.mouse_event),
      /[ \t]+/,
      field("modes", $.mouse_mode),

      optional(
        seq(
          /[ \t]+/,
          field("action", $._action)
        )
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

    left: _ => "left",
    middle: _ => "middle",
    right: _ => "right",
    mouse_button: _ => /b[1-8]/,

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

    launch: $ => seq(
      "launch",
      field(
        "options", $.launch_options
      ),
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

      // alias(/--\S+/, $.flag),
      // alias(/[^-]{2}\S+/, $.parameter),
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


    keyboard_shortcut: $ => seq(
      "map",
      optional(
        field("criteria", $.key_criteria)
      ),

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
    key_action: _ => /[^\r\n]+/,
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

    ctrl: _ => choice("ctrl", "control", "^"),
    alt: _ => choice("alt", "opt", "option"),
    shift: _ => "shift",
    function: _ => /f[1-9]/,
    super: _ => choice("super", "cmd", "command"),
    special: _ => choice(
      "kitty_mod",

      "escape",
      "tab",
      "insert",
      "left",
      "up",
      "page_up",
      "home",
      "caps_lock",
      "num_lock",
      "pause",
      "enter",
      "backspace",
      "delete",
      "right",
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
    ),

    key: _ => /[a-z]/,
    together: _ => "+",
    after: _ => ">",
  }
});
