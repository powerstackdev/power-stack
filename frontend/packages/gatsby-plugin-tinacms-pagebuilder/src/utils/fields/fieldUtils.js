import { languageSelectField, userSelectField, publishStatusToggleField} from "./list";

export const drupalFieldTypeToTinaFieldType = (type) => {
  console.log(type)
  switch (type) {
    case 'string_textfield':
      return 'text'
      break;
    case '':
      return
    case 'boolean_checkbox':
    case 'boolean':
      return 'toggle'
      break;
    case 'language_select':
    case 'list_string':
      return 'select'
      break;
    case 'entity_reference_autocomplete':
      return 'select'
      break;
    case 'datetime_timestamp':
      return 'date'
      break;
    default:
      return 'text';
  }
}

export const defaultField = (name, fieldData) => {
  return {
    label: name,
    name: name,
    component: drupalFieldTypeToTinaFieldType(fieldData.type),
  }
}

export const createTinaField = (name, fieldData, serverData) => {
  if (name === 'status') {
    return publishStatusToggleField(name, fieldData)
  }

  if (name === 'uid') {
    return userSelectField(name, fieldData, serverData)
  }

  if (fieldData.type === 'language_select') {
    return languageSelectField(name, fieldData, serverData)
  }

  return defaultField(name, fieldData)
}