/**
 * Checks to see if the window and window.tinacms objects have been loaded into the DOM
 *
 * @type {boolean}
 */
export const isTinaWindow = typeof window !== "undefined" && typeof window.tinacms !== "undefined"

export const drupalDataTypeToTinaDataType = (type) => {
  switch (type) {
    case 'string_textfield':
      return 'text'
      break;
    case 'boolean_checkbox':
      return 'toggle'
      break;
    case 'language_select':
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

export const createTinaField = ( name, data, serverData ) => {
  const defaultField = {
    label: name,
    name: name,
    component: drupalDataTypeToTinaDataType(data.type),
  }
  if (name === 'status') {
    return {
      ...defaultField,
      toggleLabels: {
        true: 'On',
        false: 'Off',
      },
    }
  } else if (name === 'uid') {
    if (serverData.usersData.hasOwnProperty('data')) {
      const options = []

      Object.entries(serverData.usersData.data).forEach(entry => {
        const [, value] = entry;
        let uid = 0
        if(typeof value.attributes.drupal_internal__uid != undefined) {
          uid = value.attributes.drupal_internal__uid
        }
        if(value.attributes.drupal_internal__uid === serverData.currentUser) {
          options.unshift({
            value: uid,
            label: value.attributes.display_name
          })
        } else {
          options.push({
            value: uid,
            label: value.attributes.display_name
          })
        }
      })
      return {
        ...defaultField,
        options
      }
    } else {
      return null
    }
  } else if (data.type === 'language_select') {
    if (serverData.languagesData.hasOwnProperty('data')) {
      // Build out Language drop down options
      const options = []

      Object.entries(serverData.languagesData.data).forEach(entry => {
        const [, value] = entry;
        options.push({
          value: value.attributes.drupal_internal__id,
          label: value.attributes.label
        })
      })
      return {
        ...defaultField,
        options
      }
    } else {
      return null
    }
  } else {
    return defaultField
  }
}