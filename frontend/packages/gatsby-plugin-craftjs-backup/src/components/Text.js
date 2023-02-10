import React from "react"
import { useNode } from "@craftjs/core"
import ContentEditable from "react-contenteditable"

export const Text = ({ text, children }) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode()

  if (useNode() !== null) {
    return (
      <div ref={(ref) => connect(drag(ref))}>
        <ContentEditable
          html={text || children}
          onChange={(e) =>
            setProp(
              (props) =>
                (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
            )
          }
          tagName="p"
        />
      </div>
    )
  } else {
    return <p>{text || children}</p>
  }
}

Text.craft = {
  rules: {
    canMoveIn: (nodes, self, helper) => {
      return (
        nodes.every((node) => node.data.type === Column) &&
        helper(self.id).decendants().length === 0
      )
    },
  },
}
