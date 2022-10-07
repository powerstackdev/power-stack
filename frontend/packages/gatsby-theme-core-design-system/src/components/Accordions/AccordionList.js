/** @jsx jsx */
import { jsx } from "theme-ui"
import { BlocksControls } from "react-tinacms-inline"
import { Accordion } from "react-accessible-accordion"
import { Accordion as AccordionInner, accordionBlock } from "./Accordion"
import "react-accessible-accordion/dist/fancy-example.css"

function AccordionList({ data, index }) {
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
        <Accordion className={"accordion-wrapper"}>
          {data.accordions &&
            data.accordions.map(({ _template, ...data }, i) => {
              return (
                <AccordionInner
                  className={"accordion-tab"}
                  key={data.heading}
                  data={data}
                />
              )
            })}
        </Accordion>
      </div>
    </BlocksControls>
  )
}

const ACCORDION_BLOCKS = {
  accordion: accordionBlock,
}

export const accordionListBlock = {
  Component: AccordionList,
  template: {
    label: "Accordion",
    defaultItem: {
      _template: "accordions",
      accordions: [
        {
          _template: "accordion",
          heading: "What is a FAQ page?",
          supporting_copy:
            "FAQ stands for “Frequently Asked Questions.” An FAQ is a list of commonly asked questions and answers on a website about topics such as hours, shipping and handling, product information, and return policies.",
        },
        {
          _template: "accordion",
          heading: "Why you should make an FAQ page?",
          supporting_copy:
            "An FAQ page is a time-saving customer service tactic that provides the most commonly asked questions and answers for current or potential customers. Before diving into how to make an FAQ page, you need to know why having one is so important. There are so many reasons beyond improving the customer experience for perfecting your FAQ page. Keep in mind the importance of an FAQ page when developing your own e-commerce website so you can make sure it increases sales and not the other way around.",
        },
        {
          _template: "accordion",
          heading: "FAQs are good for SEO?",
          supporting_copy:
            "Yes! In order to take full advantage of your FAQ page’s ability to improve website SEO, create one page with all of the questions and then link out to dedicated pages that answer each question in more depth.Creating this web of connections will make search engines very happy, and when shoppers are googling questions about your product they will be directed to your dedicated page. Addressing these questions on separate pages will also help your URL appear when people are looking for answers about the competitors’ product or service. Once you become a search result for a query about your competitor, you can convert these shoppers by directing them to your homepage or product page after they get the answer to their question.",
        },
        {
          _template: "accordion",
          heading: "When is an FAQ page appropriate?",
          supporting_copy:
            "If you’re considering making an FAQ page and don’t know if it’s completely necessary, that’s ok. An FAQ page is almost always appropriate. If you get lots of the same questions over and over again, then you definitely need to create an FAQ page. When you have a blog with a multitude of great content, an FAQ page is needed to educate customers about your product through those articles. The only time an FAQ page isn’t necessary is if your product or service needs to be installed and controlled by a professional. For example, there would never be an FAQ about performing a surgery. Sure, there could be FAQs about what to expect after the surgery and how to take care of yourself, but patients don’t need to know how to perform the surgery.",
        },
        {
          _template: "accordion",
          heading: "How to make an FAQ page",
          supporting_copy:
            'Add an "Accordion" comoponent to your page and fill in the fields as required',
        },
      ],
    },
    fields: [
      {
        label: "Accordion Items",
        name: "accordions",
        component: "blocks",
        templates: ACCORDION_BLOCKS,
      },
    ],
  },
}
