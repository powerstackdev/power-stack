import {
  drupalFieldTypeToTinaFieldType,
  defaultField,
} from "../src/utils/fieldUtils"

it("Drupal fields convert to Tina fields", () => {
  expect(drupalFieldTypeToTinaFieldType("string_textfield")).toEqual("text")
  expect(drupalFieldTypeToTinaFieldType("boolean_checkbox")).toEqual("toggle")
  expect(drupalFieldTypeToTinaFieldType("boolean")).toEqual("toggle")
  expect(drupalFieldTypeToTinaFieldType("language_select")).toEqual("select")
  expect(drupalFieldTypeToTinaFieldType("list_string")).toEqual("select")
  expect(
    drupalFieldTypeToTinaFieldType("entity_reference_autocomplete")
  ).toEqual("select")
  expect(drupalFieldTypeToTinaFieldType("datetime_timestamp")).toEqual("date")
  expect(drupalFieldTypeToTinaFieldType("something_else")).toEqual("text")
})

it("Default field to format data for Tina format", () => {
  expect(defaultField("name", { name: "test", label: "test" })).toEqual({
    component: "text",
    label: "test",
    name: "name",
  })
  expect(defaultField("name", { name: "test", label: "test" }))
})
