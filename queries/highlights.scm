; Primitive data types ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[
 (pixel)
 (percentage)
 (number)
] @number

(pixel
  "px" @type)

(percentage
  "%" @type)

[
 (boolean)
 "enabled"
 "disabled"
] @boolean

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

; Hexadecimal colors.
(color) @string.special

; Color names & `none`.
((color) @constant
  (#match? @constant "^[^#]"))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(string) @string

(time
  duration: (number) @number
  suffix: (time_suffix) @type)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

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
 (with)
 (together)
] @punctuation.delimiter

(special) @constant.macro
(key) @character

; Actions ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(generic_action) @function.call

(copy_to_buffer
  "copy_to_buffer" @function.call
  buffer: (string) @character)

(paste_from_buffer
  "paste_from_buffer" @function.call
  buffer: (string) @character)

(send_key
  "send_key" @function.call)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(send_text
  "send_text" @function.call)

(keyboard_mode
  "," @punctuation.delimiter)

(keyboard_mode
  [
    "normal"
    "application"
    "kitty"
    "all"
  ] @constant)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(show_kitty_doc
  "show_kitty_doc" @function.call
  topic: (string) @label)

(signal_child
  "signal_child" @function.call
  signal: (signal_name) @type)

(clear_terminal
  "clear_terminal" @function.call
  action: (clear_action) @constant
  target: (clear_target) @type)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(combine
  "combine" @function.call)

(combine_action
  (separator) @punctuation.delimiter)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(disable_ligatures_in
  "disable_ligatures_in" @function.call
  target: (ligature_target) @type
  type: (ligature_disabled) @constant)


(kitten
  "kitten" @function.call
  target: (string) @type)

; Command flags(`--flag`) should be highlighted *differently*.
(kitten_arguments
  (string) @variable.parameter
  (#match? @variable.parameter "^-"))

;; Launch ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(launch
  "launch" @function.call)

(launch_source_window
  "--source-window" @constant
  pattern: (string) @string.regex)

(launch_window_title
  [
    "--title"
    "--window-title"
  ] @constant)

(launch_tab_title
  "--tab-title" @constant)

(launch_type
  "--type" @constant
  "=" @punctuation.delimiter
  _ @type)

(launch_focus
  [
    "--dont-take-focus"
    "--keep-focus"
  ] @constant
  "="? @punctuation.delimiter
  _? @type)

(launch_cwd
  "--cwd" @constant
  "=" @punctuation.delimiter
  directory: (string) @string.special.path)

(launch_env
  "--env" @constant

  variable: (string) @variable.builtin
  "=" @punctuation.delimiter
  value: (string) @string)

(launch_var
  "--var" @constant

  variable: (string) @variable.builtin
  "=" @punctuation.delimiter
  value: (string) @string)

(launch_hold
  "--hold" @constant
  "="? @punctuation.delimiter
  _? @type)

(launch_copy_colors
  "--copy-colors" @constant
  "="? @punctuation.delimiter
  _? @type)

(launch_copy_cmd
  "--copy-cmd" @constant
  "="? @punctuation.delimiter
  _? @type)

(launch_copy_env
  "--copy-env" @constant
  "="? @punctuation.delimiter
  _? @type)

(launch_window_location
  "--location" @constant
  "=" @punctuation.delimiter
  location: (window_location) @type)

(launch_next_to
  "--next-to" @constant
  pattern: (string) @string.regex)

(launch_bias
  "--bias" @constant)

(launch_remote_control
  "--allow-remote-control" @constant
  "="? @punctuation.delimiter
  _? @type)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(launch_remote_password
  "--remote-control-password" @constant)

(launch_remote_password
  [
   "'"
   "\""
  ] @punctuation.delimiter)

(launch_remote_password
  password: (password) @string.special)

(remote_actions
  (string) @constant.macro) 

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(launch_stdin_source
  "--stdin-source" @constant
  "=" @punctuation.delimiter
  source: (stdin_source) @type)

(launch_stdin_formatting
  "--stdin-add-formatting" @constant
  "="? @punctuation.delimiter
  _? @type)

(launch_stdin_line_wrap
  "--stdin-add-line-wrap-markers" @constant
  "="? @punctuation.delimiter
  _? @type)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(launch_marker
  "--marker" @constant)

(markers
  type: (marker_type) @type)

(marker_entry
  id: (marker_id) @label
  pattern: (string) @string.regex)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(launch_os_window_class
  "--os-window-class" @constant
  class: (string) @type)

(launch_os_window_name
  "--os-window-name" @constant
  name: (string) @string.special)

(launch_os_window_title
  "--os-window-title" @constant
  title: (string) @string.special)

(launch_os_window_state
  "--os-window-state" @constant
  state: (window_state) @type)

(launch_logo
  "--logo" @constant
  path: (string) @string.special.path)

(launch_logo_position
  "--logo-position" @constant
  position: (logo_position) @type)

(launch_logo_alpha
  "--logo-alpha" @constant)

(launch_color
  "--color" @constant
  name: (color_option_name) @variable.builtin
  "=" @punctuation.delimiter)

(launch_spacing
  "--spacing" @constant
  name: (string) @variable.builtin
  "=" @punctuation.delimiter)

;;; OS Panel ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

; `option` may include any of the `os_panel_*` nodes.
; The first child of these nodes are **always** the 
; option name.
(launch_os_panel
  "--os-panel" @constant
  option: (_
    _ @variable.builtin
    "=" @punctuation.delimiter))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(launch_watcher
  [
    "--watcher"
    "-w"
  ] @constant
  path: (string) @string.special.path)

(launch_hold_after_ssh
  "--hold-after-ssh" @constant
  "="? @punctuation.delimiter
  _? @type)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(load_config_file
  "load_config_file" @function.call
  path: (string)? @string.special.path)

(open_url
  "open_url" @function.call
  url: (string) @string.special.url)

(remote_control_script
  "remote_control_script" @function.call
  path: (string) @string.special.path)

(sleep
  "sleep" @function.call)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(mouse_handle_click
  "mouse_handle_click" @function.call)

(handle_click_actions
  _ @type)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(mouse_selection
  "mouse_selection" @function.call
  selection: (mouse_selection_type) @type)

(scroll_prompt_to_top
  "scroll_prompt_to_top" @function.call
  "y"? @boolean)

(scroll_to_prompt
  "scroll_to_prompt" @function.call
  prompt_number: (number) @number
  lines_above: (number)? @operator)

(goto_tab
  "goto_tab" @function.call
  tab: (number) @label)

(set_tab_title
  "set_tab_title" @function.call
  title: (title)? @string.special)

(set_window_title
  "set_window_title" @function.call
  title: (title) @string.special)

(move_window
  "move_window" @function.call
  direction: (direction) @constant)

(neighboring_window
  "neighboring_window" @function.call
  direction: (direction) @constant)

(nth_window
  "nth_window" @function.call
  window: (number) @label)

(resize_window
  "resize_window" @function.call
  layout: (window_layout) @type)

(change_font_size
  "change_font_size" @function.call
  target: (os_window) @type)

(font_change_amount
  sign: (font_change_sign)? @operator)

(close_window_with_confirmation
  "close_window_with_confirmation" @function.call
  "ignore-shell"? @type)

(detach_window
  "detach_window" @function.call
  into: (detach_into)? @type)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(set_background_opacity
  "set_background_opacity" @function.call)

((background_alpha) @constant
  (#eq? @constant "default"))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(nth_os_window
  "nth_os_window" @function.call
  window: (number) @label)

(toggle_layout
  "toggle_layout" @function.call
  name: (layout_name)? @type)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(goto_layout
  "goto_layout" @function.call
  name: (layout_name) @type
  ":"? @punctuation.delimiter)

; Only color known option values
(layout_option
  name: (string) @variable.parameter
  (#match? @variable.parameter "^(bias|full_size|mirrored|split_axis)$")
  "=" @punctuation.delimiter)

; Strings are mostly pre-defined keywords.
(layout_option
  value: (string) @constant)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(remote_control
  "remote_control" @function.call)

(aliased_action
  name: (string) @function.call)

(pass_selection_to_program
  "pass_selection_to_program" @function.call
  program: (string) @string.special)

(new_window
  "new_window" @function.call
  program: (string)? @string.special
  "@selection"? @type)

(kitty_shell
  "kitty_shell" @function.call
  open_as: (kitty_shell_open_as)? @type)

; Colors ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(set_colors
  "set_colors" @function.call)

(color_all
  [
    "-a"
    "--all"
  ] @constant
  "="? @punctuation.delimiter
  "no"? @boolean)

(color_configured
  [
    "-c"
    "--configured"
  ] @constant
  "="? @punctuation.delimiter
  "no"? @boolean)

(color_reset
  "--reset" @constant
  "="? @punctuation.delimiter
  "no"? @boolean)

(color_match
  [
   "-m"
    "--match"
  ] @constant
  (string) @string.regex)

(color_match_tab
  [
   "-t"
    "--match-tab"
  ] @constant
  (string) @string.regex)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(color_option
  name: (color_option_name) @variable.builtin)

(color_value
  .
  (color_data
    path: (string) @string.special.path))

(color_data
  name: (color_option_name) @variable.builtin)

; Includes ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(include
  "include" @keyword
  path: (string) @string.special.path)

(include
  "globinclude" @keyword
  glob: (string) @string.regex)

(include
  "geninclude" @keyword
  path: (string) @string.special.path)

(include
  "envinclude" @keyword
  environment_variable: (string) @variable.builtin)

; Keyboard shortcut ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(keyboard_shortcut
  "map" @keyword)

(key_focus_on
  "--when-focus-on" @constant
  condition: (string) @string.special)

