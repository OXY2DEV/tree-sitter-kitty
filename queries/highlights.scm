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

