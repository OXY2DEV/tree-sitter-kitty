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
  _option: $ => choice(
    $.numeric_option,
    $.boolean_option,
    $.string_option,

    $.font_option,
    $.symbol_map,
    $.font_features,
    $.modify_font,
    $.undercurl_style,
    $.text_composition_strategy,
    $.text_fg_override_threshold,
    $.cursor_shape,
    $.cursor_shape_unfocused,
    $.cursor_blink_interval,
    $.cursor_trail_decay,
    $.scrollback_pager,
    $.mouse_hide_wait,
    $.url_prefixes,
    $.url_excluded_characters,
    $.paste_actions,
    $.visual_bell_color,
    $.enabled_layouts,
    $.window_border_width,
    $.window_margin_width,
    $.box_drawing_scale,
    $.single_window_margin_width,
    $.window_padding_width,
    $.single_window_padding_width,
    $.resize_debounce_time,
    $.tab_bar_margin_height,
    $.transparent_background_colors,
    $.remote_control_password,
    $.env,
    $.filter_notification,
    $.clipboard_control,
    $.shell_integration,
    $.clone_source_strategies,
    $.notify_on_cmd_finish,
    $.menu_map,
    $.wayland_titlebar_color,
    $.narrow_symbols,
    $.pointer_shape_when_dragging,

    $.window_logo_scale,
    $.confirm_os_window_close,
    $.tab_fade,
    $.kitty_mod,
    $.action_alias,
   ),

  numeric_option: $ => seq(
    $._numeric_option_name,
    field("value", $.number)
  ),

  _numeric_option_name: _ => choice(
    "font_size",
    "underline_exclusion",
    "cursor_beam_thickness",
    "cursor_underline_thickness",
    "cursor_stop_blinking_after",
    "cursor_trail",
    "cursor_trail_start_threshold",
    "scrollback_lines",
    "scrollback_indicator_opacity",
    "scrollback_pager_history_size",
    "wheel_scroll_multiplier",
    "wheel_scroll_min_lines",
    "touch_scroll_multiplier",
    "click_interval",
    "repaint_delay",
    "input_delay",
    "initial_window_width",
    "initial_window_height",
    "window_resize_step_cells",
    "window_resize_step_lines",
    "inactive_text_alpha",
    "tab_bar_min_tabs",
    "tab_title_max_length",
    "background_tint",
    "background_tint_gaps",
    "dim_opacity",
    "background_opacity",
    "background_blur",
    "window_logo_alpha",
    "background_tint",
    "tab_bar_margin_width",
    "tab_bar_min_tabs",
    "update_check_interval",
    "macos_thicken_font",
    "macos_menubar_title_max_length",
    "visual_bell_duration",

    "clipboard_max_size",
  ),


  boolean_option: $ => seq(
    $._boolean_option_name,
    field("value", $.boolean)
  ),

  _boolean_option_name: _ => choice(
    "force_ltr",
    "scrollback_fill_enlarged_window",
    "detect_urls",
    "show_hyperlink_targets",
    "clear_selection_on_clipboard_loss",
    "focus_follows_mouse",
    "clear_all_mouse_actions",
    "sync_to_monitor",
    "enable_audio_bell",
    "window_alert_on_bell",
    "remember_window_position",
    "draw_minimal_borders",
    "resize_in_steps",
    "background_image_linear",
    "close_on_child_death",
    "forward_stdio",
    "macos_option_as_alt",
    "macos_hide_from_tasks",
    "macos_quit_when_last_window_closed",
    "macos_window_resizable",
    "macos_traditional_fullscreen",
    "macos_custom_beam_cursor",
    "wayland_enable_ime",
    "clear_all_shortcuts",
    "remember_window_size",

    "dynamic_background_opacity",
    "allow_hyperlinks",
  ),


 string_option: $ => seq(
    $._string_option_name,
    field("value", $.string)
  ),

  _string_option_name: _ => choice(
    "select_by_word_characters",
    "select_by_word_characters_forward",
    "bell_on_tab",
    "visual_window_select_characters",
    "tab_separator",
    "tab_title_template",
    "active_tab_title_template",
    "background_image",
    "shell",
    "editor",
    "listen_on",
    "watcher",
    "exe_search_path",
    "startup_session",
    "file_transfer_confirmation_bypass",
    "term",

    "strip_trailing_spaces",
    "pointer_options",
    "command_on_bell",
    "bell_path",
    "linux_bell_theme",
    "placement_strategy",
    "hide_window_decorations",
    "window_logo_position",
    "tab_bar_edge",
    "tab_bar_style",
    "tab_bar_align",
    "tab_switch_strategy",
    "tab_powerline_style",
    "tab_activity_symbol",
    "active_tab_font_style",
    "inactive_tab_font_style",
    "background_image_layout",
    "allow_remote_control",
    "allow_cloning",
    "terminfo_type",
    "macos_titlebar_color",
    "macos_show_window_title_in",
    "macos_colorspace",
    "linux_display_server",
    "disable_ligatures",
    "url_style",
    "open_url_with",
    "underline_hyperlinks",
    "copy_on_select",
    "pointer_shape_when_grabbed",
    "default_pointer_shape",
    "window_logo_path",
    "tab_bar_background",
  ),

  ////////////////////////////////////////////////////////////////////////////

  font_option: $ => seq(
    choice("font_family", "bold_font", "italic_font", "bold_italic_font"),
    choice(
      "monospace",
      "auto",
      repeat1($.font_property)
    )
  ),

  font_property: $ => seq(
    field(
      "name",
      alias(/[^\s=][^\s=][^\s=][^\s=]+/, $.string)
    ),
    token.immediate("="),
    field("value", $._primitive),
  ),

  ////////////////////////////////////////////////////////////////////////////

  symbol_map: $ => seq(
    "symbol_map",
    field("codepoints", $.string),
    field("font_name", $.string),
  ),

  narrow_symbols: $ => seq(
    "narrow_symbols",
    field("codepoints", $.string),
    optional(
      field("width", $.number)
    ),
  ),

  // disable_ligatures: $ => seq(
  //   "disable_ligatures",
  //   field("type", $.ligature_disabled),
  // ),

  ////////////////////////////////////////////////////////////////////////////

  font_features: $ => seq(
    "font_features",
    choice(
      "none",
      seq(
        field("font", $.string),
        field("features", $.feature_list),
      )
    )
  ),

  feature_list: $ => repeat1($.string),

  ////////////////////////////////////////////////////////////////////////////

  modify_font: $ => seq(
    "modify_font",
    field("type", $.font_modification_type),
    field("value", $._font_unit),
  ),

  font_modification_type: _ => choice(
    "underline_position",
    "underline_thickness",
    "strikethrough_position",

    "cell_width",
    "cell_height",
    "baseline",
  ),

  _font_unit: $ => choice(
    $.pixel,
    $.percentage,
    $.number,
  ),

  ////////////////////////////////////////////////////////////////////////////

  undercurl_style: _ => seq(
    "undercurl_style",

    choice("thin", "thick"),
    token.immediate("-"),
    choice(
      token.immediate("sparse"),
      token.immediate("dense"),
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  text_composition_strategy: $ => seq(
    "text_composition_strategy",
    field("strategy", $.composition_value),
  ),

  composition_value: $ => choice(
    "platform",
    seq(
      field("gamma_adjustment", $.number),
      field("multiplicative_contrast", $.number),
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  text_fg_override_threshold: $ => seq(
    "text_fg_override_threshold",
    field("threshold", $.fg_override_threshold)
  ),

  fg_override_threshold: $ => seq(
    $.number,
    optional(
      choice("%", "ratio")
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  cursor_shape: $ => seq(
    "cursor_shape",
    field("shape", $.cursor)
  ),

  cursor: _ => choice(
    "block",
    "beam",
    "underline",
  ),

  cursor_shape_unfocused: $ => seq(
    "cursor_shape_unfocused",
    field(
      "shape",
      alias($.cursor_unfocused, $.cursor)
    )
  ),

  cursor_unfocused: _ => choice(
    "block",
    "beam",
    "underline",
    "hollow",
    "unchanged",
  ),

  ////////////////////////////////////////////////////////////////////////////

  cursor_blink_interval: $ => seq(
    "cursor_blink_interval",
    field("interval", $.number),

    optional(
      field("ease", $.ease)
    )
  ),

  ease: $ => choice(
    "linear",

    "ease",
    "ease-in-out",
    "ease-in",
    "ease-out",

    "step-start",
    "step-end",

    $.ease_step,

    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",

    $.cubic_bezier
  ),

  ease_step: $ => seq(
    "steps",
    "(",
    field("count", $.number),
    ",",
    field("position", $.ease_step_position),
    ")"
  ),

  ease_step_position: _ => choice(
    "end",
    "jump-end",

    "start",
    "jump-start",

    "jump-none",
    "jump-both",
  ),

  cubic_bezier: $ => seq(
    "cubic-bezier",
    "(",
    $.number,
    ",",
    $.number,
    ",",
    $.number,
    ",",
    $.number,
    ")",
  ),

  ////////////////////////////////////////////////////////////////////////////

  cursor_trail_decay: $ => seq(
    "cursor_trail_decay",
    field("fastest_time", $.number),
    field("slowest_time", $.number),
  ),

  ////////////////////////////////////////////////////////////////////////////

  scrollback_pager: $ => seq(
    "scrollback_pager",
    field(
      "command",
      alias(/[^\n\r]+/, $.string)
    ),
  ),

  ////////////////////////////////////////////////////////////////////////////

  mouse_hide_wait: $ => seq(
    "mouse_hide_wait",
    field("hide_wait", $.number),

    optional(
      seq(
        field("unhide_wait", $.number),
        field("unhide_threshold", $.number),
        field("scroll_unhide", $.boolean),
      )
    ),
  ),

  ////////////////////////////////////////////////////////////////////////////

  // url_style: $ => seq(
  //   "url_style",
  //   field("style", $.url_style_type)
  // ),
  //
  // url_style_type: _ => choice(
  //   "none",
  //   "straight",
  //   "double",
  //   "curly",
  //   "dotted",
  //   "dashed",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // open_url_with: $ => seq(
  //   "open_url_with",
  //   field("target", $.url_opener)
  // ),
  //
  // url_opener: _ => choice(
  //   "default",
  //   "open",
  //   "xdg-open",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  url_prefixes: $ => seq(
    "url_prefixes",
    field("prefixes", $.url_prefix_list),
  ),

  url_prefix_list: $ => repeat1($.string),

  ////////////////////////////////////////////////////////////////////////////

  url_excluded_characters: $ => seq(
    "url_excluded_characters",
    field("characters", $.string)
  ),

  ////////////////////////////////////////////////////////////////////////////

  // underline_hyperlinks: $ => seq(
  //   "underline_hyperlinks",
  //   field("value", $.underline_condition)
  // ),
  //
  // underline_condition: _ => choice(
  //   "always",
  //   "never",
  //   "hover",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // copy_on_select: $ => seq(
  //   "copy_on_select",
  //   field("target", $.copy_target),
  // ),
  //
  // copy_target: $ => choice(
  //   "no",
  //   $.string
  // ),

  ////////////////////////////////////////////////////////////////////////////

  paste_actions: $ => seq(
    "paste_actions",
    field("actions", $.paste_action_list)
  ),

  paste_action_list: $ => seq(
    $.paste_action,
    repeat(
      seq(
        token.immediate(","),
        alias($.paste_action_, $.paste_action)
      )
    )
  ),

  paste_action: _ => choice(
    "quote-urls-at-prompt",
    "replace-dangerous-control-codes",
    "replace-newline",
    "confirm",
    "confirm-if-large",
    "filter",

    "no-op",
  ),

  paste_action_: _ => immediate(
    "quote-urls-at-prompt",
    "replace-dangerous-control-codes",
    "replace-newline",
    "confirm",
    "confirm-if-large",
    "filter",

    "no-op",
  ),

  ////////////////////////////////////////////////////////////////////////////

  // strip_trailing_spaces: $ => seq(
  //   "strip_trailing_spaces",
  //   field("value", $.strip_space_condition)
  // ),
  //
  // strip_space_condition: _ => choice(
  //   "always",
  //   "never",
  //   "smart",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // pointer_options: $ => seq(
  //   choice(
  //     "pointer_shape_when_grabbed",
  //     "default_pointer_shape",
  //   ),
  //   field("type", $.pointer_type)
  // ),

  pointer_shape_when_dragging: $ => seq(
    "pointer_shape_when_dragging",
    field("default", $.pointer),

    optional(
      field("rectangular", $.pointer)
    ),
  ),

  pointer: _ => choice(
    "arrow",
    "beam",
    "hand",
    "crosshair",
  ),

  ////////////////////////////////////////////////////////////////////////////

  visual_bell_color: $ => seq(
    "visual_bell_color",
    field("color", $.color)
  ),

  ////////////////////////////////////////////////////////////////////////////

  // command_on_bell: $ => seq(
  //   "command_on_bell",
  //   field("command", $.bell_command)
  // ),
  //
  // bell_command: $ => choice(
  //   "none",
  //   $.string
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // bell_path: $ => seq(
  //   "bell_path",
  //   field("path", $.bell_path_value)
  // ),
  //
  // bell_path_value: $ => choice(
  //   "none",
  //   $.string
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // linux_bell_theme: $ => seq(
  //   "linux_bell_theme",
  //   field("theme", $.string)
  // ),

  ////////////////////////////////////////////////////////////////////////////

  enabled_layouts: $ => seq(
    "enabled_layouts",
    field("layouts", $.layout_list)
  ),

  layout_list: $ => seq(
    $.layout,

    optional(
      seq(
        token.immediate(","),
        alias($.layout_, $.layout)
      )
    )
  ),

  layout: _ => choice(
    "Fat",
    "Grid",
    "Horizontal",
    "Splits",
    "Stack",
    "Tall",
    "Vertical",

    "all",
    "*"
  ),

  layout_: _ => immediate(
    "Fat",
    "Grid",
    "Horizontal",
    "Splits",
    "Stack",
    "Tall",
    "Vertical",

    "all",
    "*"
  ),

  ////////////////////////////////////////////////////////////////////////////

  window_border_width: $ => seq(
    "window_border_width",
    field("value", $.border_width),
  ),

  border_width: $ => seq(
    $.number,
    optional(
      immediate(
        "pt",
        "px"
      )
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  box_drawing_scale: $ => seq(
    "box_drawing_scale",
    field("value", $.scale_value)
  ),

  scale_value: $ => seq(
    $.number,
    ",",
    $.number,
    ",",
    $.number,
    ",",
    $.number,
  ),

  window_margin_width: $ => seq(
    "window_margin_width",
    field("value", $.box_value)
  ),

  single_window_margin_width: $ => seq(
    "single_window_margin_width",
    field("value", $.box_value)
  ),

  window_padding_width: $ => seq(
    "window_padding_width",
    field("value", $.box_value)
  ),

  single_window_padding_width: $ => seq(
    "single_window_padding_width",
    field("value", $.box_value)
  ),

  box_value: $ => repeat1($.number),

  ////////////////////////////////////////////////////////////////////////////

  // placement_strategy: $ => seq(
  //   "placement_strategy",
  //   field("strategy", $.placement_type)
  // ),
  //
  // placement_type: _ => choice(
  //   "top-left",
  //   "top",
  //   "top-right",
  //   "left",
  //   "center",
  //   "right",
  //   "bottom-left",
  //   "bottom",
  //   "bottom-right"
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // hide_window_decorations: $ => seq(
  //   "hide_window_decorations",
  //   field("decorations", $.decoration_type)
  // ),
  //
  // decoration_type: _ => choice(
  //   "no",
  //   "yes",
  //   "titlebar-only",
  //   "titlebar-and-corners",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // window_logo_position: $ => seq(
  //   "window_logo_position",
  //   field("position", $.placement_type)
  // ),

  ////////////////////////////////////////////////////////////////////////////

  resize_debounce_time: $ => seq(
    "resize_debounce_time",
    field("debounce", $.number),
    field("after_pause", $.number),
  ),

  ////////////////////////////////////////////////////////////////////////////

  // tab_bar_edge: $ => seq(
  //   "tab_bar_edge",
  //   field("position", $.edge_position)
  // ),
  //
  // edge_position: _ => choice(
  //   "top",
  //   "bottom",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  tab_bar_margin_height: $ => seq(
    "tab_bar_margin_height",
    field("outer", $.number),
    field("inner", $.number),
  ),

  ////////////////////////////////////////////////////////////////////////////

  // tab_bar_style: $ => seq(
  //   "tab_bar_style",
  //   field("style", $.tab_bar_style_value)
  // ),
  //
  // tab_bar_style_value: _ => choice(
  //   "fade",
  //   "slant",
  //   "separtor",
  //   "powerline",
  //   "custom",
  //   "hidden",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // tab_bar_align: $ => seq(
  //   "tab_bar_align",
  //   field("alignment", $.tab_bar_align_value)
  // ),
  //
  // tab_bar_align_value: _ => choice(
  //   "left",
  //   "center",
  //   "right",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // tab_switch_strategy: $ => seq(
  //   "tab_switch_strategy",
  //   field("strategy", $.switch_strategy)
  // ),
  //
  // switch_strategy: _ => choice(
  //   "previous",
  //
  //   "left",
  //   "right",
  //
  //   "last"
  // ),

  ////////////////////////////////////////////////////////////////////////////

  tab_fade: $ => seq(
    "tab_fade",
    field("fade", $.fade_list)
  ),

  fade_list: $ => repeat1($.number),

  ////////////////////////////////////////////////////////////////////////////

  // tab_powerline_style: $ => seq(
  //   "tab_powerline_style",
  //   field("style", $.powerline_style)
  // ),
  //
  // powerline_style: _ => choice(
  //   "angled",
  //   "round",
  //   "slanted"
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // tab_activity_symbol: $ => seq(
  //   "tab_activity_symbol",
  //   field("style", $.activity_symbol)
  // ),
  //
  // activity_symbol: $ => choice(
  //   "none",
  //   $.string
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // active_tab_font_style: $ => seq(
  //   "active_tab_font_style",
  //   field("style", $.font_style)
  // ),
  //
  // inactive_tab_font_style: $ => seq(
  //   "inactive_tab_font_style",
  //   field("style", $.font_style)
  // ),
  //
  // font_style: _ => choice(
  //   "normal",
  //   "italic",
  //   "bold-italic",
  //   "bold",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  transparent_background_colors: $ => seq(
    "transparent_background_colors",
    field("value", $.transparency_list)
  ),

  transparency_list: $ => repeat1(
    $.transparent_color,
  ),

  transparent_color: $ => seq(
    $.color,
    optional(
      seq(
        token.immediate("@"),
        $.alpha
      )
    )
  ),

  alpha: _ => token.immediate(/[\d\.]+/),

  ////////////////////////////////////////////////////////////////////////////

  // background_image_layout: $ => seq(
  //   "background_image_layout",
  //   field("layout", $.image_layout)
  // ),
  //
  // image_layout: _ => choice(
  //   "tiled", 
  //   "mirror-tiled",
  //   "scaled",
  //   "clamped",
  //   "centered",
  //   "cscaled",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  remote_control_password: $ => seq(
    "remote_control_password",
    field("password", $.string),
    optional(
      field("actions", $.remote_actions)
    )
  ),

  remote_actions: $ => repeat1(
    alias(/[^'\s]+/, $.string)
  ),

  ////////////////////////////////////////////////////////////////////////////

  // allow_remote_control: $ => seq(
  //   "allow_remote_control",
  //   field("type", $.remote_control_type)
  // ),
  //
  // remote_control_type: _ => choice(
  //   "password",
  //   "socket-only",
  //   "socket",
  //   "no",
  //   "yes",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  env: $ => seq(
    "env",
    field("variable", alias(/[^\s\=]+/, $.string)),
    token.immediate("="),
    field("value", $._primitive),
  ),

  ////////////////////////////////////////////////////////////////////////////

  filter_notification: $ => seq(
    "filter_notification",
    field("filter", $.filter_sequence)
  ),

  filter_sequence: $ => choice(
    repeat1($.filter_element),
    "all",
  ),

  filter_element: $ => choice(
    $._filter_element,
    $.boolean_expression
  ),

  _filter_element: $ => seq(
    choice(
      "title",
      "body",
      "app",
      "type",
    ),
    token.immediate(":"),
    $._filter_string
  ),

  _filter_string: $ => choice(
    seq(
      token.immediate('"'),
      alias(
        token.immediate(/[^"]*/),
        $.string
      ),
      token.immediate('"'),
    ),
    alias(
      token.immediate(/[^\s"]+/),
      $.string
    )
  ),

  boolean_expression: _ => choice(
    "and",
    "or",
    "not"
  ),

  ////////////////////////////////////////////////////////////////////////////

  clipboard_control: $ => seq(
    "clipboard_control",
    field("actions", $.clipboard_actions)
  ),

  clipboard_actions: $ => repeat1($.clipboard_action),

  clipboard_action: _ => choice(
    "write-clipboard",
    "read-clipboard",
    "write-primary",
    "read-primary",
    "read-clipboard-ask",
    "read-primary-ask",
  ),

  ////////////////////////////////////////////////////////////////////////////

  shell_integration: $ => seq(
    "shell_integration",
    field("features", $.shell_features)
  ),

  shell_features: $ => choice(
    "enabled",
    "disabled",
    repeat1($.shell_feature)
  ),

  shell_feature: _ => choice(
    "no-rc",
    "no-cursor",
    "no-title",
    "no-cwd",
    "no-prompt-mark",
    "no-complete",
    "no-sudo",
  ),

  ////////////////////////////////////////////////////////////////////////////

  // allow_cloning: $ => seq()

  ////////////////////////////////////////////////////////////////////////////

  clone_source_strategies: $ => seq(
    "clone_source_strategies",
    field("strategy", $.source_stratagies)
  ),

  source_stratagies: $ => seq(
    $.source_strategy,
    repeat(
      seq(
        token.immediate(","),
        alias($.source_strategy_, $.source_strategy)
      )
    )
  ),
  source_strategy: _ => choice(
    "venv",
    "conda",
    "env_var",
    "path"
  ),
  source_strategy_: _ => immediate(
    "venv",
    "conda",
    "env_var",
    "path"
  ),

  ////////////////////////////////////////////////////////////////////////////

  notify_on_cmd_finish: $ => seq(
    "notify_on_cmd_finish",
    field("when", $.notification_time),

    optional(
      choice(
        seq(
          field("duration", $.number),
          field("action", $.notification_action),
        ),
        field("duration", $.number)
      )
    ),
  ),

  notification_time: _ => choice(
    "never",
    "unfocused",
    "invisible",
    "always",
  ),

  notification_action: $ => choice(
    "notify",
    "bell",

    seq(
      "command",
      /[ \t]+/,
      field(
        "command",
        alias(/[^\n\r]+/, $.string)
      )
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  // terminfo_type: $ => seq(
  //   "terminfo_type",
  //   field("value", $.terminfo_type)
  // ),
  //
  // terminfo_type: _ => choice(
  //   "path",
  //   "direct",
  //   "none",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  menu_map: $ => seq(
    "menu_map",
    field(
      "value",
      alias(/[^\n\r]+/, $.string)
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  wayland_titlebar_color: $ => seq(
    "wayland_titlebar_color",
    field("value", $.titlebar_color)
  ),

  titlebar_color: $ => choice(
    "system",
    "background",
    $.color,
  ),

  ////////////////////////////////////////////////////////////////////////////

  // macos_titlebar_color: $ => seq(
  //   "macos_titlebar_color",
  //   field("value", $.macos_titlebar_color)
  // ),
  //
  // macos_titlebar_color: $ => choice(
  //   "system",
  //   "background",
  //   "light",
  //   "dark",
  //   $.color,
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // macos_show_window_title_in: $ => seq(
  //   "macos_show_window_title_in",
  //   field("value", $.title_in)
  // ),
  //
  // title_in: _ => choice(
  //   "all",
  //   "none",
  //   "window",
  //   "menubar",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // macos_colorspace: $ => seq(
  //   "macos_colorspace",
  //   field("value", $.colorspace)
  // ),
  //
  // colorspace: _ => choice(
  //   "srgb",
  //   "default",
  //   "display3",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  // linux_display_server: $ => seq(
  //   "linux_display_server",
  //   field("value", $.display_server)
  // ),
  //
  // display_server: _ => choice(
  //   "wayland",
  //   "x11",
  //   "auto",
  // ),

  ////////////////////////////////////////////////////////////////////////////

  window_logo_scale: $ => seq(
    "window_logo_scale",
    choice(
      seq(
        field("scale_w", $.number),
        field("scale_h", $.number),
      ),
      field("scale", $.number),
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  confirm_os_window_close: $ => seq(
    "confirm_os_window_close",
    field("min_win_count", $.number),
    optional(
      field(
        "count_background",
        alias("count-background", $.string)
      ),
    )
  ),

  ////////////////////////////////////////////////////////////////////////////

  kitty_mod: $ => seq(
    "kitty_mod",
    field("sequence", $.key_sequence)
  ),

  ////////////////////////////////////////////////////////////////////////////

  action_alias: $ => seq(
    choice(
      "action_alias",
      "kitten_alias",
    ),
    field("name", $.string),
    field(
      "action",
      alias(/[^\n\r]+/, $.string)
    )
  ),
};
