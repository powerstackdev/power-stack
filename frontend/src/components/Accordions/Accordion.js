import React from "react";
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";

export const Accordion = ({ data, index }) => {
  return (
    <AccordionItem >
      <AccordionItemHeading>
        <AccordionItemButton>
          {data.heading}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        {data.supporting_copy}
      </AccordionItemPanel>
    </AccordionItem>
  );
}

export const accordionBlock = {
    label: "Accordion Tab",
    key: 'accordion',
    defaultItem: {
      _template: "accordion",
      heading: "Marie Skłodowska Curie",
      supporting_copy:
        "Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ",
    },
    fields: [
      {
        name: 'heading',
        component: 'text',
        label: 'Heading'
      },
      {
        name: 'supporting_copy',
        component: 'textarea',
        label: 'Description'
      },
    ],
};
