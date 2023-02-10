import React from "react"
import { Box, Heading } from "theme-ui"
import { useEditor } from "@craftjs/core"

export const SettingsPanel = () => {
  const { selected } = useEditor((state) => {
    const currentNodeId = state.events.selected.values().next().value
    let selected

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
      }
    }

    return {
      selected,
    }
  })
  return selected ? (
    <Box
      sx={{
        p: 3,
        background: "white",
      }}
    >
      <Heading
        as="h4"
        sx={{
          my: 3,
        }}
      >
        Selected: {selected.name}
      </Heading>
      {selected.settings && React.createElement(selected.settings)}
    </Box>
  ) : null
}
