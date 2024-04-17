"use client"
import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../puck.config";
import { drupal } from "@/lib/drupal";
import { drupalFieldPrefix } from "@powerstack/utils";

export function Client({ path, data }: { path: string; data: Data }) {
  const backendUrl = process.env.NEXT_PUBLIC_DRUPAL_HOST

  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data: Data) => {
        console.log(JSON.stringify({ data, path }))
        async function processBlocks(data) {
          try {
              const blocks = await Promise.all(data.content.map(async block => {
                  const blockType = block.type.toString().toLowerCase();
                  const fields = {};
      
                  Object.keys(block.props).forEach(field => {
                      const fieldName = `${drupalFieldPrefix}${field}`;
      
                      if (field !== 'id') {
                          fields[fieldName] = block.props[field];
                      }
                  });
      
                  return drupal.createResource(`paragraph--${blockType}`, {
                      data: {
                          attributes: {...fields},
                      },
                  }, {
                      withAuth: {
                          clientId: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_ID as string,
                          clientSecret: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_SECRET as string,
                      },
                  });
              }));

              return blocks; // Returns the fully resolved array of blocks
          } catch (error) {
              console.error('Error processing blocks:', error);
          }
      }
      const blocks = await processBlocks(data)
      const blocksRef: { id: string; type: string; }[] = []
      blocks && blocks.forEach(block => blocksRef.push({
        id: block.id,
        type: block.type,
        meta: {
          target_revision_id: block.drupal_internal__revision_id
        }
    }));

    const page = await drupal.createResource("node--page", {
        data: {
            attributes: {
                title: data.root?.props?.title || 'Default Title',
            },
            relationships: {
                field_page_builder: {
                    data: blocksRef
                }
            }
        },
    }, {
        withAuth: {
            clientId: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_SECRET,
        },
    });
      }}
    />
  );
}
