/** @jsx jsx */
import { jsx } from "theme-ui"
import { Box, Heading, Paragraph } from "theme-ui"

import React from "react"
import { darken } from "@theme-ui/color"
import { cssVar, rgba } from "polished"

export const Slider = ({ data, index }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${
          typeof data.image !== "undefined" ? data.image.src : ""
        })`,
        backgroundSize: `cover`,
        height: `100%`,
      }}
    >
      <Box
        sx={{
          height: `100%`,
          width: `100%`,
          background: (theme) =>
            `linear-gradient(45deg, ${
              data.background_color
                ? rgba(data.background_color, 0.72)
                : "transparent"
            }, ${
              data.background_color
                ? rgba(darken(data.background_color, 0.2)(theme), 0.72)
                : "transparent"
            })`,
        }}
      >
        <Box
          sx={{
            maxWidth: `1200px`,
            m: `0 auto`,
            p: `5rem 4rem`,
            color: data.text_color || "#000",
          }}
        >
          <Heading as="h2" sx={{ mb: 4 }}>
            {data.heading}
          </Heading>
          <Paragraph>{data.supporting_copy}</Paragraph>
        </Box>
      </Box>
    </Box>
  )
}

export const sliderBlock = {
  label: "Slider Tab",
  key: "slider",
  defaultItem: {
    _template: "slider",
    heading: "Marie Skłodowska Curie",
    supporting_copy:
      "Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ",
    image: {
      src: "/martin-sanchez-unsplash-square.jpg",
      alt: "",
    },
  },
  itemProps: (item) => ({
    key: item.heading,
    label: item.heading,
  }),
  fields: [
    {
      name: "heading",
      component: "text",
      label: "Heading",
    },
    {
      name: "supporting_copy",
      component: "textarea",
      label: "Description",
    },
    {
      name: "image.src",
      label: "Image",
      component: "image",
      parse: (media) => `${media.src}?id=${media.id}&vid=${media.vid}`,
      previewSrc: (image) => image,
    },
    {
      name: "text_color",
      label: "Text Color",
      component: "color",
      widget: "block",
      colors: [
        `${cssVar("--theme-ui-colors-text", "#000")}`,
        `${cssVar("--theme-ui-colors-background", "#000")}`,
        `${cssVar("--theme-ui-colors-primary", "#000")}`,
        `${cssVar("--theme-ui-colors-secondary", "#000")}`,
        `${cssVar("--theme-ui-colors-muted", "#000")}`,
        `${cssVar("--theme-ui-colors-white", "#000")}`,
      ],
    },
    {
      name: "align",
      label: "Alignment",
      component: "select",
      options: ["center", "left"],
    },
    {
      name: "background_color",
      label: "Background Color",
      component: "color",
      widget: "block",
      colors: ["#051e26", "#f2dfc6", "#cfdcc8", "#ebbbbb", "#8a1414"],
    },
  ],
}
