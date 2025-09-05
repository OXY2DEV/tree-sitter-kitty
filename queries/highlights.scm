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

