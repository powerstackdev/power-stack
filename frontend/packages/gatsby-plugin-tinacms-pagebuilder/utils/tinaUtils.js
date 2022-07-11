import React from 'react'
import set from "lodash.set";
import get from "lodash.get"
import { BlocksControls, InlineBlocks, InlineWysiwyg } from "react-tinacms-inline";
import { PageBuilderContext } from "../src/pages/edit/new/[...]";
import { Box } from "theme-ui";
import { capitalize } from "@powerstack/utils";
import { getRequestFetchMultiple } from "./getRequestUtils";

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

export const createTinaField = (name, data, serverData) => {
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
        if (typeof value.attributes.drupal_internal__uid !== undefined) {
          uid = value.attributes.drupal_internal__uid
        }
        if (value.attributes.drupal_internal__uid === serverData.currentUser) {
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


/**
 * Recursively build out the Tina Blocks data and save to a nested object
 *
 * @param bundle
 * @param data
 * @param headers
 * @param parent
 * @param path
 * @param blocks
 * @returns {Promise<{}>}
 */

export const createTinaInlineBlocks = async (bundle, data, headers, parent, path, blocks = {}) => {

  const requests = {
    fieldConfig: `field_config/field_config?filter[bundle]=${bundle}`,
    paragraphsData: `entity_form_display/entity_form_display?filter[targetEntityType]=paragraph&filter[bundle]=${bundle}`
  }

  const subRequestsData = await getRequestFetchMultiple(headers, requests)

  console.log(subRequestsData.success.paragraphsData.data[0]?.attributes.third_party_settings.field_group)

  if (data.type !== 'entity_reference_paragraphs') {
    if (typeof path == 'undefined') {
      path = bundle
    } else {
      path = `${path}.children.${bundle}`
    }
    let blockObj = {
      template: {
        key: bundle,
        label: capitalize(bundle),
        defaultItem: {
          _template: bundle,
          path
        },
        fields: [
          {
            name: 'text_color',
            label: 'Text Color',
            component: "color",
            widget: "block",
            colors: ["#051e26", "#f2dfc6", "#cfdcc8", "#ebbbbb", "#8a1414"]
          },
          {
            name: "align",
            label: "Alignment",
            component: "select",
            options: ["center", "left"]
          }
        ]
      },
    }
    set(blocks, path, blockObj)
  }
  for (const data1 of subRequestsData.success.fieldConfig.data) {
    if (data1.hasOwnProperty('attributes') && data1.attributes.settings.handler_settings && data1.attributes.settings.handler_settings.hasOwnProperty('target_bundles')) {
      await createTinaInlineBlocks(Object.keys(data1.attributes.settings.handler_settings.target_bundles)[0], data1, headers, bundle, path, blocks)
    }
  }
  return blocks
}

export const createBlockComponent = ({index, data}) => {

  const blocksDataContext = React.useContext(PageBuilderContext)

  if (get(blocksDataContext, data.path) && get(blocksDataContext, data.path).hasOwnProperty("children")) {
    const blockKey = Object.keys(get(blocksDataContext, data.path).children)[0]
    const availableBlocks = {}

    set(availableBlocks, `${blockKey}`, Object.values(get(blocksDataContext, data.path).children)[0])
    set(availableBlocks, `${blockKey}.Component`, createBlockComponent)
    return (
      <BlocksControls index={index} focusRing={{offset: 0}} insetControls>
        <Section/>
        <InlineBlocks className={`${blockKey}-blocks`} name={`blocks`} blocks={availableBlocks}/>
      </BlocksControls>
    )
  } else {
    return (
      <BlocksControls index={index} focusRing={{offset: 0}} insetControls>
        <InlineWysiwyg name="text" format="html">
          <p
            className="paragraph__text"
            dangerouslySetInnerHTML={{
              __html: data.text,
            }}
          />
        </InlineWysiwyg>
      </BlocksControls>
    )
  }
}

const Section = ({index, data}) => {

  return (
    <Box sx={{
      p: 2
    }}>test</Box>
  )
}
