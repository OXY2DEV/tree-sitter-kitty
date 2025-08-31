module.exports.rules = {
  _option: $ => choice(
    $.numeric_option
  ),

  numeric_option: $ => seq(
    $._numeric_option_name,
    field("value", $.number)
  ),

  _numeric_option_name: _ => choice(
    "font_size",
    "underline_exclusion",
    "text_fg_override_threshold",
    "cursor_beam_thickness",
    "cursor_underline_thickness",
    "cursor_blink_interval",
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
    "background_opacity",
    "background_blur",
    "window_logo_alpha",
    "background_tint",
    "tab_bar_min_tabs",
    "update_check_interval",
    "macos_thicken_font",
    "macos_menubar_title_max_length",
  ),
};
