; Generic ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(comment) @comment

(include
  "include" @keyword
  path: ((path) @string.special.path))

(include
  "globinclude" @keyword
  glob: ((pattern) @string.regex))

(include
  "envinclude" @keyword
  environment_variable: ((name) @constant))

(include
  "geninclude" @keyword
  file: ((path) @string.special.path))


(option
  key: ((string) @keyword))

; (option
;   value: (value
;     [
;       (number)
;       (percentage)
;       (color)] @number))
;
; (option
;   value: (value
;     (boolean) @boolean))
;
; (option
;   value: (value
;     (string) @string))
;
; (option
;   value: (value
;     (inherit) @constant))

(keyboard_shortcut
  "map" @keyword)

(mouse_action
  "mouse_map" @keyword)

(key_sequence
  [
   (ctrl)
   (alt)
   (shift)
   (function)
   (super)
   ] @constant)

(key_sequence
  (together) @operator)

(key_sequence
  (special) @constant)

(key_sequence
  (key) @string.special)

(keyboard_shortcut
  action: ((key_action) @variable.builtin))


(mouse_action
  event_type: ((mouse_event) @variable.parameter)
  modes: ((mouse_mode) @type))

(mouse_sequence
  [
   (ctrl)
   (alt)
   (shift)
   (super)
   (left)
   (middle)
   (right)
   ] @constant)

(mouse_sequence
  (together) @operator)

(mouse_sequence
  (mouse_button) @constant)

; Option specific;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

; font_family      monospace
; bold_font        auto
; italic_font      auto
; bold_italic_font auto
; open_url_with default
; pointer_shape_when_grabbed arrow
; default_pointer_shape beam
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "bold_font"
    "italic_font"
    "bold_italic_font"
    "font_family"
    "open_url_with"
    "pointer_shape_when_grabbed"
    "default_pointer_shape")
  value: (value
    .
    (string) @constant
    .))

; force_ltr no
; scrollback_fill_enlarged_window no
; detect_urls yes
; show_hyperlink_targets no
; copy_on_select no
; clear_selection_on_clipboard_loss no
; focus_follows_mouse no
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "force_ltr"
    "scrollback_fill_enlarged_window"
    "detect_urls"
    "show_hyperlink_targets"
    "copy_on_select"
    "clear_selection_on_clipboard_loss"
    "focus_follows_mouse")
  value: (value
    .
    (boolean) @boolean
    .))

; symbol_map U+E0A0-U+E0A3,U+E0C0-U+E0C7 PowerlineSymbols
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "symbol_map")
  value: (value
    .
    (string) @string.special
    (string) @operator
    .))

; narrow_symbols U+E0A0-U+E0A3,U+E0C0-U+E0C7 1
; narrow_symbols U+E0A0-U+E0A3,U+E0C0-U+E0C7
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "narrow_symbols")
  value: (value
    .
    (string) @string.special
    (number)? @number
    .))

; disable_ligatures never
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "disable_ligatures")
  value: (value
    .
    (string) @string.special
    (#any-of? @string.special
      "always"
      "never"
      "cursor")
    .))

; font_features none
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "font_features")
  value: (value
    .
    (string) @constant
    (#any-of? @constant
      "none")
    .))

; font_features FiraCode-Retina +zero +onum
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "font_features")
  value: (value
    .
    (string) @constant
    (string)+ @parameter))


; modify_font underline_position -2
; modify_font underline_thickness 150%
; modify_font strikethrough_position 2px
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "modify_font")
  value: (value
    .
    (string) @constant
    (_) @number
    .))

; box_drawing_scale 0.001, 1, 1.5, 2
; TODO: Needs *better grammar*.
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "box_drawing_scale")
  value: (value
    .
    (_) @number
    (_) @number
    (_) @number
    (_) @number
    .))

; undercurl_style thin-sparse
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "undercurl_style")
  value: (value
    .
    (string) @number
    .))

; text_composition_strategy platform
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "text_composition_strategy")
  value: (value
    .
    (string) @constant
    (#any-of? @constant
      "platform"
      "lagecy")
    .))

; text_composition_strategy 1.7 30
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "text_composition_strategy")
  value: (value
    .
    (number) @number
    (number) @number
    .))

; text_fg_override_threshold 0.0 ratio
; text_fg_override_threshold 0 %
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "text_fg_override_threshold")
  value: (value
    .
    (number) @number
    (string) @string.special
    (#any-of? @string.special
      "%"
      "ratio")
    .))

; cursor #cccccc
; cursor_text_color #111111
; url_color #0087bd
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "cursor"
    "cursor_text_color"
    "url_color")
  value: (value
    .
    (color) @constant
    .))

; cursor_shape block
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "cursor_shape")
  value: (value
    .
    (string) @constant
    (#any-of? @constant
      "block"
      "beam"
      "underline")
    .))

; cursor_shape_unfocused hollow
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "cursor_shape_unfocused")
  value: (value
    .
    (string) @constant
    (#any-of? @constant
      "block"
      "beam"
      "underline"
      "hollow"
      "unchanged")
    .))

; cursor_beam_thickness 1.5
; cursor_underline_thickness 2.0
; cursor_blink_interval -1
; cursor_stop_blinking_after 15.0
; cursor_trail 0
; cursor_trail_start_threshold 2
; scrollback_lines 2000
; scrollback_indicator_opacity 1.0
; scrollback_pager_history_size 0
; wheel_scroll_multiplier 5.0
; wheel_scroll_min_lines 1
; touch_scroll_multiplier 1.0
; mouse_hide_wait 3.0
; underline_exclusion 1
; font_size 11.0
; text_fg_override_threshold 0
; click_interval -1.0
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "cursor_beam_thickness"
    "cursor_underline_thickness"
    "cursor_blink_interval"
    "cursor_stop_blinking_after"
    "cursor_trail"
    "cursor_trail_start_threshold"
    "scrollback_lines"
    "scrollback_indicator_opacity"
    "scrollback_pager_history_size"
    "wheel_scroll_multiplier"
    "wheel_scroll_min_lines"
    "touch_scroll_multiplier"
    "mouse_hide_wait"
    "underline_exclusion"
    "font_size"
    "text_fg_override_threshold"
    "click_interval")
  value: (value
    .
    (number) @number
    .))

; cursor_trail_decay 0.1 0.4
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "cursor_trail_decay")
  value: (value
    .
    (number) @number
    (number) @number
    .))

; scrollback_pager less --chop-long-lines --RAW-CONTROL-CHARS +INPUT_LINE_NUMBER
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "scrollback_pager")
  value: (value
    .
    (string) @constant
    (_)* @parameter))

; mouse_hide_wait 3.0 4.0 5.0 6.0
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "mouse_hide_wait")
  value: (value
    .
    (number) @number
    (number) @number
    (number) @number
    (boolean) @boolean
    .))

; url_style curly
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "url_style")
  value: (value
    .
    (string) @constant
    (#any-of? @constant
      "none"
      "straight"
      "double"
      "curly"
      "dotted"
      "dashed")
    .))

; open_url_with default
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "open_url_with")
  value: (value
    .
    (string) @constant
    (#any-of? @constant
      "default")
    .))

; url_prefixes file ftp ftps gemini git gopher http https irc ircs kitty mailto news sftp ssh
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "url_prefixes")
  value: (value
    .
    (string)+ @string))

; url_excluded_characters A B C \n
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "url_excluded_characters")
  value: (value
    .
    (string)+ @character))

; underline_hyperlinks hover
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "underline_hyperlinks")
  value: (value
    .
    (string) @constant
    (#any-of? @constant
      "hover"
      "always"
      "never")
    .))

; copy_on_select a1
; paste_actions quote-urls-at-prompt,confirm
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "copy_on_select"
    "paste_actions")
  value: (value
    .
    (string) @parameter
    .))

; strip_trailing_spaces never
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "strip_trailing_spaces")
  value: (value
    .
    (string) @constant
    (#any-of? @constant
      "smart"
      "always"
      "never")
    .))

; select_by_word_characters @-./_~?&=%+#
; select_by_word_characters_forward @-./_~?&=%+#
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "select_by_word_characters"
    "select_by_word_characters_forward")
  value: (value
    .
    (string) @character.special
    .))

; pointer_shape_when_dragging beam crosshair
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "pointer_shape_when_dragging")
  value: (value
    .
    (string) @constant
    (string) @constant
    .))

; Mouse action ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

; (launch
;   "launch" @keyword
;   options: (launch_options
;     (flag) @type))

; (mouse_action
;     button_name: (mouse_sequence
;       (middle))
;     event_type: (mouse_event)
;     modes: (mouse_mode)
;     action: (launch
;       options: (launch_options
;         (flag)
;         (parameter)
;         (parameter))))

