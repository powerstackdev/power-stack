import { Box } from "theme-ui";
import { BlocksControls, InlineBlocks } from "react-tinacms-inline";
import React from "react";

export const EditColumn = ({blockKey, availableBlocks, data, index}) => {
  console.log('triggered')
  return (
    <Box>
      <BlocksControls index={index} focusRing={{offset: 0}} insetControls>
        test column
        <InlineBlocks className={`${blockKey}-blocks`} name={blockKey} blocks={availableBlocks}/>
      </BlocksControls>
    </Box>
  )
}
