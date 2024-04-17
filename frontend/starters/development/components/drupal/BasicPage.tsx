"use client"

import type { DrupalNode } from "next-drupal"
import config from "../../puck.config";
import { Render } from "@measured/puck";
import { capitalize, formatDrupalType, formatDrupalField, drupalFieldPrefix } from "@powerstack/utils"


interface BasicPageProps {
  node: DrupalNode
}

export function BasicPage({ node, ...props }: BasicPageProps) {

  function extractFieldKeys(data) {
    const result = {};
    for (const key in data) {
        if (data.hasOwnProperty(key) && key.startsWith(drupalFieldPrefix)) {
            const newKey = formatDrupalField(key); // Remove 'field_' prefix
            const fieldData = data[key].hasOwnProperty('value') ? data[key].value : data[key]
            result[newKey] = fieldData;
        }
    }
    return result;
}

  const content = node?.field_page_builder.map((block) => {

    const type = capitalize(formatDrupalType(block.type));
    if (type === 'Hero' ||  'Text') {
      
      console.log(extractFieldKeys(block))
      return {
        type: type,
        id: `${type}-${block.id}`,
        props: extractFieldKeys(block)
      }
    }
  }
    
  )

  const data = {
    root: {
      props: {
        title: node.title
      }
    },
    content: content
  }

  return (
    <Render config={config} data={data} />
  )
}
