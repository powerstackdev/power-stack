/** @jsx jsx */
import { jsx } from "theme-ui";

import { BlocksControls, InlineImage } from "react-tinacms-inline";
import Zoom from 'react-reveal/Zoom';

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
        <Zoom>
          <InlineImage
            name="image.src"
            parse={(media) => `${media.src}`}
            previewSrc={(src) => src}
            focusRing={false}
            alt={data.image?.alt}
            mid={(media) => `${media.mid}`}
            vid={data.image?.vid}
          />
        </Zoom>

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
        alt: "",
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
