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
      alias(/\S+/, $.string)
    ),
  ),

  _glob_include: $ => seq(
    "globinclude",
    field(
      "glob",
      alias(/\S+/, $.string)
    ),
  ),

  _gen_include: $ => seq(
    "geninclude",
    field(
      "path",
      alias(/\S+/, $.string)
    ),
  ),

  _env_include: $ => seq(
    "envinclude",
    field(
      "environment_variable",
      alias(/\S+/, $.string)
    ),
  ),
};
