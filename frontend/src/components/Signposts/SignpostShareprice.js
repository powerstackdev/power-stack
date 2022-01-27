/** @jsx jsx */
import { jsx } from "theme-ui";

import Zoom from "react-reveal/Zoom";
import { BlocksControls } from "react-tinacms-inline";
import { Card, Paragraph, Box } from "theme-ui";
import React from "react";

const SignpostShareprice = ({ index, data }) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <BlocksControls index={index}>
      <Zoom delay={data.delay}>
        <Card className="signpost shareprice">
          <Paragraph as="small" sx={{textTransform: 'uppercase'}}>
            Shareprice
          </Paragraph>
          <Box sx={{textAlign: "center"}}>
            <Paragraph>
              {new Date().getDate()} {months[new Date().getMonth()]} {new Date().getFullYear()}
            </Paragraph>
            <Paragraph as={'h1'}>
              13.06 <em>Gbp</em>
            </Paragraph>
            <Paragraph as={'h2'} sx={{
              color:"green"
            }}>
              ⬆+.50
            </Paragraph>
          </Box>
        </Card>
      </Zoom>
    </BlocksControls>
  );
}

export const signpostSharepriceBlock = {
  Component: SignpostShareprice,
  template: {
    label: "Shareprice",
    defaultItem: {
      _template: "signpostShareprice",
    },
    fields: [],
  },
};

export default signpostSharepriceBlock