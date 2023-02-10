import React from "react"
import { Card } from "theme-ui"
import { useEditor } from "@craftjs/core"

export const DraggableCard = ({ component, children, type }, props) => {
  const Component = component

  const { connectors } = useEditor()
  return (
    <Card
      sx={{
        textAlign: "center",
        height: "70px",
      }}
      ref={(ref) => connectors.create(ref, <Component {...props} />)}
    >
      {children}
    </Card>
  )
}
