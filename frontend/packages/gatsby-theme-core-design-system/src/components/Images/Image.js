/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { BlocksControls, InlineImage } from "react-tinacms-inline"
import Zoom from "react-reveal/Zoom"

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
        <Zoom delay={data.delay}>
          <InlineImage
            name="image.src"
            parse={(media) => `${media.src}?id=${media.id}&vid=${media.vid}`}
            previewSrc={(src) => src}
            focusRing={false}
          />
        </Zoom>
      </div>
    </BlocksControls>
  )
}

export const imageBlock = {
  Component: Image,
  template: {
    label: "Image",
    defaultItem: {
      _template: "image",
      image: {
        src: "/martin-sanchez-unsplash-square.jpg",
      },
    },
    fields: [
      {
        name: "image.src",
        label: "Image",
        component: "image",
        parse: (media) => `${media.src}?id=${media.id}&vid=${media.vid}`,
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
}
