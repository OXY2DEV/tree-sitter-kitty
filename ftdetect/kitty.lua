--[[
	Filetype detection for config files of `kitty`.
	Language:          kitty
	Maintainer:        MD. Mouinul Hossain Shawon
	Last Change:       19 February, 2026
	URL:               https://github.com/OXY2DEV/tree-sitter-kitty/blob/main/ftdetect/kitty.lua
]]


--[[ Gets `kitty`'s config directory. ]]
---@return string
local function get_kitty_config_dir ()
	if vim.env.KITTY_CONFIG_DIR then
		return vim.env.KITTY_CONFIG_DIR;
	elseif vim.env.XDG_CONFIG_HOME then
		return vim.env.XDG_CONFIG_HOME;
	elseif vim.env.XDG_CONFIG_DIRS then
		return vim.env.XDG_CONFIG_DIRS;
	elseif vim.fn.has("win32") == 1 then
		return ".config\\kitty\\";
	else
		return ".config/kitty/";
	end
end

vim.api.nvim_create_autocmd({
	"BufRead",
	"BufNewFile"
}, {
	pattern = "*.conf",
	callback = function (event)
		local path = event.match;
		local kitty_config_path = vim.pesc(
			get_kitty_config_dir()
		);

		-- theme.conf files work OK
		local unsupported = {
			"open%-actions%.conf$",
			"launch%-actions%.conf$",
			"diff%.conf$",
			"ssh%.conf$",
			"choose%-files%.conf$",
			"quick%-access%-terminal%.conf$",
		}
		for i = 1, #unsupported do
			if string.match(path, unsupported[i]) then
				return
			end
		end

		if
			string.match(path, kitty_config_path) or
			string.match(path, "kitty%.conf$")
		then
			vim.bo[event.buf].ft = "kitty";
		end
	end
});
