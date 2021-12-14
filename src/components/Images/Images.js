/** @jsx jsx */
import { jsx } from "theme-ui";

import { BlocksControls, InlineImage } from "react-tinacms-inline";

function Images({ data, index }) {
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
        <div
          sx={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            gridGap: `3rem`,
            img: {
              objectFit: `cover`,
              width: `100%`,
            },
          }}
        >
          <InlineImage
            name="left.src"
            parse={(media) => `/${media.filename}`}
            uploadDir={() => "/public"}
            previewSrc={(src) => src}
            focusRing={false}
            alt={data.left.alt}
          />
          <InlineImage
            name="right.src"
            parse={(media) => `/${media.filename}`}
            uploadDir={() => "/public"}
            previewSrc={(src) => src}
            focusRing={false}
            alt={data.right.alt}
          />
        </div>
      </div>
    </BlocksControls>
  );
}

export const imagesBlock = {
  Component: Images,
  template: {
    label: "Image Diptych",
    defaultItem: {
      _template: "images",
      left: {
        src: "/ivan-bandura-unsplash-square.jpg",
        alt: "ocean",
      },
      right: {
        src: "/martin-sanchez-unsplash-square.jpg",
        alt: "dunes",
      },
    },
    fields: [
      {
        name: "left.src",
        label: "Left-Hand Image",
        component: "image",
        parse: (media) => `/${media.filename}`,
        uploadDir: () => "/public",
        previewSrc: (src) => src,
        focusRing: false,
      },
      {
        name: "left.alt",
        label: "Left-Hand Image Alt Text",
        component: "text",
      },
      {
        name: "right.src",
        label: "Right-Hand Image",
        component: "image",
        parse: (media) => `/${media.filename}`,
        uploadDir: () => "/public",
        previewSrc: (src) => src,
        focusRing: false,
      },
      {
        name: "right.alt",
        label: "Right-Hand Image Alt Text",
        component: "text",
      },
    ],
  },
};
