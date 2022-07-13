import React from 'react'
import set from "lodash.set";
import get from "lodash.get"
import { isSet } from 'lodash';
import { BlocksControls, InlineBlocks, InlineWysiwyg } from "react-tinacms-inline";
import { Box } from "theme-ui";
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
    if (data1.hasOwnProperty('attributes') && data1.attributes.settings.handler_settings && data1.attributes.settings.handler_settings.hasOwnProperty('target_bundles')) {
      await createTinaInlineBlocks(Object.keys(data1.attributes.settings.handler_settings.target_bundles)[0], data1, headers, bundle, blockPath, blocks)
    }
  }
  return blocks
}

export const createBlockComponent = ({index, data}) => {


  const LoadedComponent = loadable(props => import(`gatsby-theme-core-design-system/src/components/${props.component}`), {
    resolveComponent: (components) => components.Paragraph,
  })

  const blocksDataContext = React.useContext(PageBuilderContext)

  if (get(blocksDataContext, data.blockPath) && !get(blocksDataContext, data.blockPath).hasOwnProperty("children")) {
    return (
      <LoadedComponent component={'Text/Paragraph'} index data />
    )
  }

  if (get(blocksDataContext, data.blockPath) && get(blocksDataContext, data.blockPath).hasOwnProperty("children")) {
    const blockKey = Object.keys(get(blocksDataContext, data.blockPath).children)[0]
    const availableBlocks = {}

    set(availableBlocks, `${blockKey}`, Object.values(get(blocksDataContext, data.blockPath).children)[0])
    set(availableBlocks, `${blockKey}.Component`, createBlockComponent)
    return (
      <Box sx={{
        width: data?.group_styling_options?.field_full_width ? `100%`: '1200px',
        m: `0 auto`
      }}>
        <BlocksControls index={index} focusRing={{offset: 0}} insetControls>
          <Section data={data} />
          <InlineBlocks className={`${blockKey}-blocks`} name={`blocks`} blocks={availableBlocks}/>
        </BlocksControls>
      </Box>
    )
  }
}

const Section = ({index, data}) => {
  return (
    <Box sx={{
      p: 2,
    }}> test</Box>
  )
}
