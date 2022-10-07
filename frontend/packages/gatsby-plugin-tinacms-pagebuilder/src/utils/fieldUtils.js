import {
  languageSelectField,
  userSelectField,
  publishStatusToggleField,
} from "./listUtils"
import { capitalize } from "@powerstack/utils"

export const drupalFieldTypeToTinaFieldType = (type) => {
  switch (type) {
    case "string_textfield":
      return "text"
    case "boolean_checkbox":
    case "boolean":
      return "toggle"
    case "language_select":
    case "list_string":
      return "select"
    case "entity_reference_autocomplete":
      return "select"
    case "datetime_timestamp":
      return "date"
    default:
      return "text"
  }
}

export const defaultField = (name, fieldData) => {
  const type = fieldData.type || fieldData.field_type
  const label = fieldData.label || capitalize(name)

  return {
    label,
    name: name,
    component: drupalFieldTypeToTinaFieldType(type),
  }
}

export const createTinaField = (name, fieldData, serverData) => {
  if (name === "status") {
    return publishStatusToggleField(name, fieldData)
  }

  if (name === "uid") {
    return userSelectField(name, fieldData, serverData)
  }

  if (fieldData.type === "language_select") {
    return languageSelectField(name, fieldData, serverData)
  }

  return defaultField(name, fieldData)
}
