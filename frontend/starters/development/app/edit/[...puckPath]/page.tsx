/**
 * This file implements a *magic* catch-all route that renders the Puck editor.
 *
 * This route exposes /puck/[...puckPath], but is disabled by middleware.ts. The middleware
 * then rewrites all URL requests ending in `/edit` to this route, allowing you to visit any
 * page in your application and add /edit to the end to spin up a Puck editor.
 *
 * This approach enables public pages to be statically rendered whilst the /puck route can
 * remain dynamic.
 *
 * NB this route is public, and you will need to add authentication
 */

import { notFound } from "next/navigation"
import { drupal } from "@/lib/drupal"
import type { Metadata, NextPage } from "next"
import type { DrupalNode, JsonApiParams } from "next-drupal"
import "@measured/puck/puck.css"
import { Client } from "./client"
import {
  capitalize,
  formatDrupalType,
  formatDrupalField,
  drupalFieldPrefix,
} from "@powerstack/utils"
import { unstable_noStore as noStore } from "next/cache"

export async function generateMetadata({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] }
}): Promise<Metadata> {
  const path = `/${puckPath.join("/")}`

  return {
    title: "Editing: " + path,
  }
}

async function getNode(slug: string[]) {
  const path = `/${slug.join("/")}`

  const params: JsonApiParams = {}

  // Translating the path also allows us to discover the entity type.
  const translatedPath = await drupal.translatePath(path)

  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath.jsonapi?.resourceName!
  const uuid = translatedPath.entity.uuid

  if (type === "node--article") {
    params.include = "field_image,uid"
  }

  if (type === "node--page") {
    params.include = "field_page_builder,uid"
  }
  noStore()
  const resource = await drupal.getResource<DrupalNode>(type, uuid, {
    params,
  })

  if (!resource) {
    throw new Error(
      `Failed to fetch resource: ${translatedPath?.jsonapi?.individual}`,
      {
        cause: "DrupalError",
      }
    )
  }

  return resource
}

export default async function Page({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] }
}) {
  const path = `/${puckPath.join("/")}`

  let node
  try {
    node = await getNode(puckPath)
  } catch (error) {
    // If getNode throws an error, tell Next.js the path is 404.
    notFound()
  }

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
        props: {
          uuid: block.id,
          id: `${type}-${block.id}`,
          ...extractFieldKeys(block),
        },
      }
    }
  })

  const data = {
    root: {
      props: {
        title: node.title,
        nid: node.drupal_internal__nid,
        uuid: node.id,
        path: node.path?.alias
          ? node.path?.alias
          : `node/${node.drupal_internal__nid}`,
      },
    },
    content: content,
  }

  return <Client path={path} data={data} />
}
