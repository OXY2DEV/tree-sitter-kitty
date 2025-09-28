module.exports.rules = {
  include: $ => choice(
    $._path_include,
    $._glob_include,
    $._gen_include,
    $._env_include,
  ),

  _path_include: $ => seq(
    alias("include", $.option_name),
    field(
      "path",
      alias(/\S+/, $.path)
    ),
  ),

  _glob_include: $ => seq(
    alias("globinclude", $.option_name),
    field(
      "glob",
      alias(/\S+/, $.string)
    ),
  ),

  _gen_include: $ => seq(
    alias("geninclude", $.option_name),
    field(
      "path",
      alias(/\S+/, $.path)
    ),
  ),

  _env_include: $ => seq(
    alias("envinclude", $.option_name),
    field(
      "environment_variable",
      alias(/\S+/, $.string)
    ),
  ),
};
