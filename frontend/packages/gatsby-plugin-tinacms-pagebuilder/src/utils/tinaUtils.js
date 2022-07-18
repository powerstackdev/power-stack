import React from 'react'
import set from "lodash.set";
import get from "lodash.get"
import loadable from '@loadable/component'

import { capitalize } from "@powerstack/utils";

import { drupalFieldTypeToTinaFieldType } from "./fields/fieldUtils";

import { PageBuilderContext } from "../contexts/PageBuilderContext";
import { getRequestFetchMultiple } from "../api/fetch/getRequestUtils";

/**
 * Checks to see if the window and window.tinacms objects have been loaded into the DOM
 *
 * @type {boolean}
 */
export const isTinaWindow = typeof window !== "undefined" && typeof window.tinacms !== "undefined"

/**
 * Recursively build out the Tina Blocks data and save to a nested object
 *
 * @param bundle
 * @param data
 * @param headers
 * @param parent
 * @param blockPath
 * @param blocks
 * @returns {Promise<{}>}
 */
export const createTinaInlineBlocks = async (bundle, data, headers, parent, blockPath, blocks = {}) => {

  const requests = {
    fieldConfig: `field_config/field_config?filter[bundle]=${bundle}`,
    paragraphsData: `entity_form_display/entity_form_display?filter[targetEntityType]=paragraph&filter[bundle]=${bundle}`
  }

  const subRequestsData = await getRequestFetchMultiple(headers, requests)

  if (data.type !== 'entity_reference_paragraphs') {
    if (typeof blockPath == 'undefined') {
      blockPath = bundle
    } else {
      blockPath = `${blockPath}.children.${bundle}`
    }

    let blockObj = {
      template: {
        fields: []
      }
    }

    for(const [fieldGroupName, fieldGroupData] of Object.entries(subRequestsData.success.paragraphsData.data[0]?.attributes.third_party_settings.field_group)) {
      if(fieldGroupData.children.length > 0) {

        let fieldData = []
        fieldGroupData.children.forEach(field => {
          for(const [, fieldConfig] of Object.entries(subRequestsData.success.fieldConfig.data)) {
            if(fieldConfig.attributes.field_name && fieldConfig.attributes.field_name == field ) {
              fieldData = [...fieldData, {
                name: fieldConfig.attributes.field_name,
                label: fieldConfig.attributes.label,
                component: drupalFieldTypeToTinaFieldType(fieldConfig.attributes.field_type),
                type: fieldConfig.attributes.field_type
              }]
            }
          }
        })

        switch (fieldGroupName) {
          case 'group_inline_fields':
            set(blockObj,'template.key', bundle)
            set(blockObj,'template.label', capitalize(bundle))
            set(blockObj, 'template.defaultItem', {
              _template: bundle,
              blockPath
            })
            set(blockObj,'template.type', fieldData[0].type)
            break;
          case 'group_form_fields':
            blockObj.template.fields = [...blockObj.template.fields, ...fieldData]
            break;
          case 'group_styling_options':
            if(fieldData.length > 0) {
              blockObj.template.fields = [...blockObj.template.fields,
                {
                  label: fieldGroupData.label,
                  name: fieldGroupName,
                  component: 'group',
                  fields: fieldData
                }
              ]
            }
            break;
        }
      }
    }

    set(blocks, blockPath, blockObj)
  }

  // Check if field has children and nest appropriately
  for (const data1 of subRequestsData.success.fieldConfig.data) {
    if (data1?.attributes?.settings?.handler_settings && 'target_bundles' in data1.attributes.settings.handler_settings) {
      await createTinaInlineBlocks(Object.keys(data1.attributes.settings.handler_settings.target_bundles)[0], data1, headers, bundle, blockPath, blocks)
    }
  }
  return blocks
}



export const createBlockComponent = ({index, data}) => {
  const LoadedComponent = loadable(( { group, component } ) => import(`gatsby-theme-core-design-system/src/components/${group}/${component}`),  {
    resolveComponent: (components, { component }) => components[`Edit${component}`]
  })

  const blocksDataContext = React.useContext(PageBuilderContext)

  if (get(blocksDataContext, data.blockPath) && !('children' in get(blocksDataContext, data.blockPath))) {

  }

  if (get(blocksDataContext, data.blockPath) && 'children' in get(blocksDataContext, data.blockPath)) {

    const parentBlockKey = data["_template"]
    const childBlockKey = Object.keys(get(blocksDataContext, data.blockPath).children)[0]
    const availableBlocks = {}

    set(availableBlocks, `${childBlockKey}`, Object.values(get(blocksDataContext, data.blockPath).children)[0])
    set(availableBlocks, `${childBlockKey}.Component`, createBlockComponent)

    console.log(parentBlockKey, childBlockKey, availableBlocks)

    return (
      <LoadedComponent key={`block-text-${parentBlockKey}-${index}`} group={'Blocks'} component={capitalize(parentBlockKey)} blockKey={parentBlockKey} availableBlocks={availableBlocks} index={index} data={data}/>
    )
  }

  return (
    <LoadedComponent key={`block-text-paragraph-${index}`} group='Text' component='Paragraph' index={index} data={data}/>
  )
}

