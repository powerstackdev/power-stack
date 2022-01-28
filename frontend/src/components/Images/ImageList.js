/** @jsx jsx */
import { jsx } from "theme-ui";
import { BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { imageBlock } from "./Image";

function ImageList({ data, index }) {
  const columns = `1fr `.repeat(data.columns ? data.columns : 2)
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
            gridTemplateColumns: columns,
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
      columns: 2,
      images: [
        {
          _template: "image",
          image: {
            src: "/martin-sanchez-unsplash-square.jpg",
            alt: ""
          }
        },
        {
          _template: "image",
          image: {
            src: "/martin-sanchez-unsplash-square.jpg",
            alt: "",
          },
        },
      ],
    },
    fields: [
      {
        name: "columns",
        label: "Images per row",
        component: "number"
      }
    ],
  },
};
