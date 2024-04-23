"use client"

import type { DrupalNode } from "next-drupal"
import config from "../../puck.config"
import { Render } from "@measured/puck"
import {
  capitalize,
  formatDrupalType,
  formatDrupalField,
  drupalFieldPrefix,
} from "@powerstack/utils"
import { Button } from "../ui/button"
import Link from "next/link"

interface BasicPageProps {
  node: DrupalNode
  path: string
}

export async function BasicPage({ node, path }: BasicPageProps) {
  function extractFieldKeys(data) {
    const result = {}
    for (const key in data) {
      if (
        data.hasOwnProperty(key) &&
        key.startsWith(drupalFieldPrefix) &&
        data[key] !== null
      ) {
        const newKey = formatDrupalField(key) // Remove 'field_' prefix
        const fieldData = data[key].hasOwnProperty("value")
          ? data[key].value
          : data[key]
        result[newKey] = fieldData
      }
    }
    return result
  }

  const content = node?.field_page_builder.map((block) => {
    const type = capitalize(formatDrupalType(block.type))
    if (type === "Hero" || "Text") {
      return {
        type: type,
        id: `${type}-${block.id}`,
        props: extractFieldKeys(block),
      }
    }
  })

  const data = {
    root: {
      props: {
        title: node.title,
      },
    },
    content: content,
  }

  return (
    <>
      <Render config={config} data={data} />
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Button asChild>
          <Link href={`${path}/edit`}>Edit</Link>
        </Button>
      </div>
    </>
  )
}
