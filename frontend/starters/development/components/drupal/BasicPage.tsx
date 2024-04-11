"use client"

import type { DrupalNode } from "next-drupal"

interface BasicPageProps {
  node: DrupalNode
}

export function BasicPage({ node, ...props }: BasicPageProps) {
  console.log(node)

  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>

      {node?.field_page_builder[0].field_section_fields[0].field_column_fields[0].field_text.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node?.field_page_builder[0].field_section_fields[0].field_column_fields[0].field_text.processed}}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
    </article>
  )
}
