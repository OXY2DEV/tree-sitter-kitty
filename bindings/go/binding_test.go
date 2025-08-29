package tree_sitter_kitty_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_kitty "github.com/tree-sitter/tree-sitter-kitty/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_kitty.Language())
	if language == nil {
		t.Errorf("Error loading Kitty grammar")
	}
}
