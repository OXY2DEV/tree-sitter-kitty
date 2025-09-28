; Extra Nodes ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(line_continuation) @comment

(comment
  (comment_content) @spell) @comment

; Primitive data types ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[
  (pixel)
  (percentage)
  (number)
] @number

[
  "steps"
  "cubic-bezier"
] @function.call

(boolean) @boolean

(color) @constant

((color) @constant
  (#match? @constant "^[^#]"))

(string) @string

[
  (ctrl)
  (alt)
  (shift)
  (function)
  (super)

  (mouse_button)

  (left)
  (right)
  (middle)
  (down)
] @constant.builtin

[
  "+"
  ">"
 
  ":"
  "-"
  (separator)

  "="
  ","

  "'"
  "\""

  ":"
] @punctuation.delimiter

[
  "("
  ")"
] @punctuation.bracket

(special) @variable.builtin
(key) @character

(path) @string.special.path
(label) @label
(constant) @constant
(direction) @constant

; Actions ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(generic_action) @function.call
(action_name) @function.call

[
  "pt"
  "px"
  "%"
  "ratio"

  (signal_name)
  (clear_target)
  (ligature_target)
  (window_location)
  (stdin_source)
  (marker_type)
  (window_state)
  (logo_position)
  (mouse_selection_type)
  (window_layout)
  (os_window)
  "ignore-shell"
  (detach_into)
  "@selection"
  (kitty_shell_open_as)
  (mouse_event)
  (font_modification_type)
  (ease_step_position)
  "c"
  (filter_element_type)
  "all"
  (ligature_disabled)

  (clipboard_action)
  (shell_feature)
  (source_strategy)
  (notification_time)
  (paste_action)
  (pointer)
  (layout)
  (launch_type_value)
  (os_window_class)

  (layout_type)
  (time_suffix)
  (cursor)

  (spacing_type)
] @type

(kitten
  target: (string) @type)

[
  (color_option_name)
  "map"
  "mouse_map"
  (option_name)
] @keyword

;; Launch ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(flag) @constant
((string) @constant
  (#match? @constant "^-"))

(launch_source_window
  value: (string) @string.regexp)

(launch_next_to
  value: (string) @string.regexp)

(marker_entry
  pattern: (string) @string.regexp)

;;; OS Panel ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(open_url
  value: (string) @string.special.url)

(handle_click_actions
  _ @type)

(scroll_to_prompt
  prompt_number: (number) @number)

(scroll_to_prompt
  lines_above: (number) @operator)

(title) @string.special

(font_change_amount
  sign: (font_change_sign) @operator)

(aliased_action
  name: (string) @function.call)

(new_window
  value: (string) @string.special)

; Colors ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(set_colors
  "set_colors" @function.call)

(color_match
  (string) @string.regexp)

(color_match_tab
  (string) @string.regexp)

; Includes ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(include
  glob: (string) @string.regexp)

(include
  environment_variable: (string) @variable.builtin)

; Keyboard shortcut ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(key_focus_on
  condition: (string) @string.special)

; Mouse shortcuts ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(mouse_mode
  [
    "grabbed"
    "ungrabbed"
  ] @variable.parameter)

; Options ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(font_property
  name: (string) @variable.parameter)

(feature_list
  (string) @string.special)

(url_excluded_characters
  value: (string) @character)

(transparent_color
  "@" @punctuation.special
  (alpha) @number)

(remote_actions
  (string) @type)

(env
  variable: (string) @variable.builtin)

(boolean_operator) @keyword.operator

(filter_element
  (string) @string.regexp)

(notification_action) @function.call
