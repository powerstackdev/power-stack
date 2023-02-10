import React from "react"
import { Element, useNode } from "@craftjs/core"


export const Section = ({ children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={connect} id="drop-zone" style={{background: "red", margin: "20px"}}>
      Section drop area
      {children}
    </div>
  )
}

Section.craft = {
  rules: {
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((incomingNode) => incomingNode.data.name === "Button" || incomingNode.data.name === "Text"),
  },
}
