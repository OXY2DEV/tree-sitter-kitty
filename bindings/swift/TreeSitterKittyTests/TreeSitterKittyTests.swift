import XCTest
import SwiftTreeSitter
import TreeSitterKitty

final class TreeSitterKittyTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_kitty())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Kitty grammar")
    }
}
