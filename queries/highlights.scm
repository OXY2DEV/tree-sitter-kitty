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

(keymap
  "map" @keyword)

(key_sequence
  [
   (ctrl)
   (alt)
   (shift)
   (function)
   (super)
   ] @constant)

(key_sequence
  (add) @operator)

(key_sequence
  (special) @constant)

(key_sequence
  (key) @string.special)

(keymap
  action: ((key_action) @variable.builtin))

; Option specific;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

; font_family      monospace
; bold_font        auto
; italic_font      auto
; bold_italic_font auto
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "bold_font"
    "italic_font"
    "bold_italic_font"
    "font_family")
  value: (value
    .
    (string) @constant
    .))

; font_size 11.0
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "font_size")
  value: (value
    .
    (number) @number
    .))

; force_ltr no
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "force_ltr")
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
    (string)+ @string))


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

; underline_exclusion 1
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "underline_exclusion")
  value: (value
    .
    (number) @number
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

; text_fg_override_threshold 0
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "text_fg_override_threshold")
  value: (value
    .
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
(option 
  key: ((string) @keyword)
  (#any-of? @keyword
    "cursor"
    "cursor_text_color")
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

