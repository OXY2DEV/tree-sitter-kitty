module.exports.rules = {
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
};
