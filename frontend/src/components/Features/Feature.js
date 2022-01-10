import React from "react";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";
import { Card, Text } from 'theme-ui';
import Zoom from 'react-reveal/Zoom';

function Feature({ index, data }) {

  return (
    <BlocksControls index={index}>
      <Zoom delay={data.delay}>
        <Card className="feature">
          <h3>
            <InlineTextarea name="heading" focusRing={false} />
          </h3>
          <Text>
            <InlineTextarea name="supporting_copy" focusRing={false} />
          </Text>
        </Card>
      </Zoom>
    </BlocksControls>
  );
}

export const featureBlock = {
  Component: Feature,
  template: {
    label: "Feature",
    defaultItem: {
      _template: "feature",
      heading: "Marie Skłodowska Curie",
      supporting_copy:
        "Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ",
    },
    fields: [],
  },
};
