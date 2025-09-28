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
  "pt"
  "px"
  "%"
  "ratio"
] @type

[
  "steps"
  "cubic-bezier"
] @function.call

(boolean) @boolean

(layout_type) @type

(color) @constant

((color) @constant
  (#match? @constant "^[^#]"))

(string) @string

(time
  duration: (number) @number
  suffix: (time_suffix) @type)

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

; Actions ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(generic_action) @function.call
(action_name) @function.call

(keyboard_mode
  [
    "normal"
    "application"
    "kitty"
    "all"
  ] @constant)

[
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

(launch_env
  variable: (string) @variable.builtin)

(launch_var
  variable: (string) @variable.builtin)

(launch_next_to
  value: (string) @string.regexp)

(marker_entry
  pattern: (string) @string.regexp)

(launch_spacing
  name: (string) @variable.builtin)

;;; OS Panel ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

; `option` may include any of the `os_panel_*` nodes.
; The first child of these nodes are **always** the 
; option name.
(launch_os_panel
  value: (_
    (option) @variable.builtin))

(open_url
  value: (string) @string.special.url)

(handle_click_actions
  _ @type)

(scroll_to_prompt
  prompt_number: (number) @number)

(scroll_to_prompt
  lines_above: (number) @operator)

(title) @string.special

(move_window
  value: (direction) @constant)

(neighboring_window
  value: (direction) @constant)

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
  "--when-focus-on" @constant
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

(cursor) @type

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
