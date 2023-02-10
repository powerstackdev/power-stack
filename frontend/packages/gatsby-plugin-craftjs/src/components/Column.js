import React from "react"
import { Element } from "@craftjs/core"

export const Column = () => {
  return (
    <Element is="div" id="drop-zone" canvas>
      Column drop area
    </Element>
  )
}

Column.craft = {
  rules: {
    canMoveIn: (nodes) => nodes.every((node) => node.data.type === Text),
  },
}
