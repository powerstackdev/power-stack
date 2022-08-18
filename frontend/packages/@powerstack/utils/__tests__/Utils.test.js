import { formatDrupalType, snakeToCamel, capitalize } from "../src/Utils"

it("Format paragraph to type", () => {
  expect(formatDrupalType("paragraph--type")).toBe("type")
})

it("Snakecase changes to camelcase", () => {
  expect(snakeToCamel("snake_case")).toEqual("snakeCase")
  expect(snakeToCamel("snake_case_test_more_chars")).toEqual(
    "snakeCaseTestMoreChars"
  )
})

it("Capitalize letters changes to uppercase on first letter", () => {
  expect(capitalize("word")).toEqual("Word")
  expect(capitalize("Word")).toEqual("Word")
  expect(capitalize("word1 word2")).toEqual("Word1 word2")
})
