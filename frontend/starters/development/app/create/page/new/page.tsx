"use client"
import type { Data } from "@measured/puck"
import { Puck } from "@measured/puck"
import "@measured/puck/puck.css"
import config from "@/puck.config"
import { drupal } from "@/lib/drupal"
import { drupalFieldPrefix } from "@powerstack/utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"

export const dynamic = "force-dynamic"

export default function Page({ params }) {
  const data = params
  const backendUrl = process.env.NEXT_PUBLIC_DRUPAL_HOST
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data: Data) => {
        if (!loading) {
          setLoading(true)
          async function processBlocks(data) {
            try {
              const blocks = await Promise.all(
                data.content.map(async (block) => {
                  const blockType = block.type.toString().toLowerCase()
                  const fields = {}

                  Object.keys(block.props).forEach((field) => {
                    const fieldName = `${drupalFieldPrefix}${field}`

                    if (field !== "id") {
                      fields[fieldName] = block.props[field]
                    }
                  })

                  return drupal.createResource(
                    `paragraph--${blockType}`,
                    {
                      data: {
                        attributes: { ...fields },
                      },
                    },
                    {
                      withAuth: {
                        clientId: process.env
                          .NEXT_PUBLIC_DRUPAL_CLIENT_ID as string,
                        clientSecret: process.env
                          .NEXT_PUBLIC_DRUPAL_CLIENT_SECRET as string,
                      },
                    }
                  )
                })
              )

              return blocks // Returns the fully resolved array of blocks
            } catch (error) {
              console.error("Error processing blocks:", error)
            }
          }

          // Check that we are already POSTing to Drupal
          const blocks = await processBlocks(data)
          const blocksRef: {
            id: string
            type: string
            meta?: Record<string, any>
          }[] = []
          blocks &&
            blocks.forEach((block) =>
              blocksRef.push({
                id: block.id,
                type: block.type,
                meta: {
                  target_revision_id: block.drupal_internal__revision_id,
                },
              })
            )

          const page = drupal.createResource(
            "node--page",
            {
              data: {
                attributes: {
                  title: data.root?.props?.title || "Default Title",
                },
                relationships: {
                  field_page_builder: {
                    data: blocksRef,
                  },
                },
              },
            },
            {
              withAuth: {
                clientId: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_ID,
                clientSecret: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_SECRET,
              },
            }
          )

          const path = (await page)?.path?.alias
            ? `${(await page)?.path?.alias}/edit`
            : `/node/${(await page).drupal_internal__nid}/edit`

          toast(`Published ${data.root?.props?.title}`, {
            action: {
              label: "View",
              onClick: () => router.push(path),
            },
          })

          router.push(path)

          return page
        }
      }}
    />
  )
}
