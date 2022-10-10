import { defaultField } from "./fieldUtils"

export const publishStatusToggleField = (name, fieldData) => {
  return {
    ...defaultField(name, fieldData),
    toggleLabels: {
      true: "On",
      false: "Off",
    },
  }
}

export const userSelectField = (name, fieldData, serverData) => {
  if (serverData?.usersData?.data) {
    let options = []
    Object.entries(serverData.usersData.data).forEach((entry) => {
      const [, value] = entry

      let uid = 0
      uid = value?.attributes?.drupal_internal__uid
      if (uid === serverData.currentUser) {
        options = [
          {
            value: uid,
            label: value.attributes.display_name,
          },
          ...options,
        ]
      } else {
        options = [
          ...options,
          {
            value: uid,
            label: value.attributes.display_name,
          },
        ]
      }
    })
    return {
      ...defaultField(name, fieldData),
      options,
    }
  } else {
    return null
  }
}

export const languageSelectField = (name, fieldData, serverData) => {
  if (serverData?.languagesData?.data) {
    // Build out Language drop down options
    let options = []

    Object.entries(serverData.languagesData.data).forEach((entry) => {
      const [, value] = entry
      options = [
        ...options,
        {
          value: value.attributes.drupal_internal__id,
          label: value.attributes.label,
        },
      ]
    })
    return {
      ...defaultField(name, fieldData, serverData),
      options,
    }
  } else {
    return null
  }
}
