/** @jsx jsx */
import { jsx } from "theme-ui";
import { BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { imageBlock } from "./Image";

function ImageList({ index }) {
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
          name="images"
          blocks={IMAGE_BLOCKS}
          direction="horizontal"
          className="image-list"
          sx={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gridGap: `3rem`,
            gridTemplateRows: `auto`,
          }}
        />
      </div>
    </BlocksControls>
  );
}

const IMAGE_BLOCKS = {
  image: imageBlock,
};

export const imageListBlock = {
  Component: ImageList,
  template: {
    label: "Image Grid",
    defaultItem: {
      _template: "images",
      images: [
        {
          _template: "image",
          image: {
            src: "/martin-sanchez-unsplash-square.jpg",
            alt: "dunes",
          },
        },
        {
          _template: "image",
          image: {
            src: "/martin-sanchez-unsplash-square.jpg",
            alt: "dunes",
          },
        },
      ],
    },
    fields: [],
  },
};
