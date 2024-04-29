"use client"
import type { Data } from "@measured/puck"
import { Puck } from "@measured/puck"
import config from "../../../puck.config"
import { drupal } from "@/lib/drupal"
import { drupalFieldPrefix } from "@powerstack/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { triggerRevalidation } from "@/lib/trigger-revalidation"

export function Client({ path, data }: { path: string; data: Data }) {
  const router = useRouter()

  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data: Data) => {
        async function processBlocks(data) {
          try {
            const blocks = await Promise.all(
              data.content.map(async (block) => {
                const blockType = block.type.toString().toLowerCase()
                const fields = {}

                Object.keys(block.props).forEach((field) => {
                  const fieldName = `${drupalFieldPrefix}${field}`

                  if (field !== "id" && field !== "uuid") {
                    fields[fieldName] = block.props[field]
                  }
                })
                if (Object.hasOwn(block.props, "uuid")) {
                  return drupal.updateResource(
                    `paragraph--${blockType}`,
                    block.props.uuid,
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
                }
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
            toast.error("This didn't work.")
          }
        }
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
        try {
          const page = await drupal.updateResource(
            "node--page",
            data.root.props?.uuid,
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
          triggerRevalidation(path)
          toast.success(`Published ${data.root?.props?.title}`, {
            action: {
              label: "View",
              onClick: () => router.push(path),
            },
            duration: 5000,
          })
        } catch (error) {
          console.error("Error processing page:", error)
          toast("Something didn't work.")
        }
      }}
    />
  )
}
