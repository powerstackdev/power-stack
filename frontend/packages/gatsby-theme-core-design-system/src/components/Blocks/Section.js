import { Box } from "theme-ui"
import { BlocksControls, InlineBlocks } from "react-tinacms-inline"
import React from "react"

export const EditSection = ({ blockKey, availableBlocks, data, index }) => {
  return (
    <Box
      sx={{
        width: data?.group_styling_options?.field_full_width
          ? `100%`
          : "1200px",
        m: `0 auto`,
      }}
    >
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <InlineBlocks
          className={`${blockKey}-blocks`}
          name={blockKey}
          blocks={availableBlocks}
        />
      </BlocksControls>
    </Box>
  )
}
