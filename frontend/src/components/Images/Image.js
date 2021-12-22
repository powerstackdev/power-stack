/** @jsx jsx */
import { jsx } from "theme-ui";

import { BlocksControls, InlineImage } from "react-tinacms-inline";

function Image({ data, index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div
        sx={{
          img: {
            objectFit: `cover`,
            width: `100%`,
          },
        }}
      >
        {console.log('ImageData', data)}
        <InlineImage
          name="image.src"
          parse={(media) => `${media.src}`}
          previewSrc={(src) => src}
          focusRing={false}
          alt={data.image?.alt}
          mid={(media) => `${media.mid}`}
          vid={data.image?.vid}
        />
      </div>

    </BlocksControls>
  );
}

export const imageBlock = {
  Component: Image,
  template: {
    label: "Image",
    defaultItem: {
      _template: "image",
      image: {
        src: "/martin-sanchez-unsplash-square.jpg",
        alt: "dunes",
        mid: '',
        vid: '',
      },
    },
    fields: [
      {
        name: "image.src",
        label: "Image",
        component: "image",
        parse: (media) => `${media.src}`,
        mid: (media) => `${media.mid}`,
        previewSrc: (src) => src,
        focusRing: false,
      },
      {
        name: "image.alt",
        label: "Alt Text",
        component: "text",
      },
    ],
  },
};
