/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useRef } from "react"

import { BlocksControls } from "react-tinacms-inline"
import { Slider as SliderInner, sliderBlock } from "./Slider"
import { Rerousel } from "rerousel"

function SliderList({ data, index }) {
  const slideshow = useRef(null)

  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div
        sx={{
          m: `0 auto`,
          display: `grid`,
          gridTemplateColumns: `repeat(1, 1fr)`,
          gridAutoRows: `1fr`,
        }}
      >
        <Rerousel itemRef={slideshow} interval={data.delay || 5000}>
          {data.sliders &&
            data.sliders.map((data) => {
              return (
                <div
                  key={`sliders-slide-${data.heading}`}
                  sx={{
                    width: `100%`,
                    height: `100%`,
                  }}
                  ref={slideshow}
                >
                  <SliderInner key={data.heading} data={data} />
                </div>
              )
            })}
        </Rerousel>
      </div>
    </BlocksControls>
  )
}

const SLIDER_BLOCKS = {
  slider: sliderBlock,
}

export const sliderListBlock = {
  Component: SliderList,
  template: {
    label: "Slider",
    defaultItem: {
      _template: "sliders",
      delay: 5000,
      sliders: [
        {
          _template: "slider",
          heading: "Slide 1",
          supporting_copy: "Add text and images to ",
          text_color: "#fffaf4",
          align: "center",
        },
        {
          _template: "slider",
          heading: "Slide 2",
          supporting_copy:
            "An FAQ page is a time-saving customer service tactic that provides the most commonly asked questions and answers for current or potential customers. Before diving into how to make an FAQ page, you need to know why having one is so important. There are so many reasons beyond improving the customer experience for perfecting your FAQ page. Keep in mind the importance of an FAQ page when developing your own e-commerce website so you can make sure it increases sales and not the other way around.",
          text_color: "#fffaf4",
          align: "center",
        },
      ],
    },
    fields: [
      {
        label: "Slider Items",
        name: "sliders",
        component: "blocks",
        templates: SLIDER_BLOCKS,
      },
      {
        name: "delay",
        label: "Delay",
        component: "number",
      },
    ],
  },
}
