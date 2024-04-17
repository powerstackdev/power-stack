/** @jsx jsx */
import { jsx } from "theme-ui"
import { BlocksControls, InlineBlocks } from "react-tinacms-inline"
import { featureBlock } from "./Feature"
import { lighten } from "@theme-ui/color"

export function FeatureList({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div
        sx={{
          width: `100%`,
          maxWidth: `1200px`,
          m: `0 auto`,
          p: `5rem 4rem`,
        }}
      >
        <InlineBlocks
          name="features"
          blocks={FEATURE_BLOCKS}
          direction="horizontal"
          className="feature-list"
          sx={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr 1fr`,
            gridGap: `3rem`,
            gridTemplateRows: `auto`,
          }}
        />
      </div>
    </BlocksControls>
  )
}

const FEATURE_BLOCKS = {
  feature: featureBlock,
}

export const featureListBlock = {
  Component: FeatureList,
  template: {
    label: "Feature List",
    defaultItem: {
      _template: "features",
      features: [
        {
          _template: "feature",
          heading: "heading 1",
          supporting_copy: "supporting copy",
        },
        {
          _template: "feature",
          heading: "heading 2",
          supporting_copy: "supporting copy",
        },
        {
          _template: "feature",
          heading: "heading 3",
          supporting_copy: "supporting copy",
        },
      ],
    },
    fields: [],
  },
}
