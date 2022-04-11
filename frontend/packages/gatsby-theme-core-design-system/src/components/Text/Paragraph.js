/** @jsx jsx */
import { jsx } from "theme-ui";
import Zoom from 'react-reveal/Zoom';

import { BlocksControls, InlineWysiwyg } from "react-tinacms-inline";

function Paragraph({ index, data }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div>
        <div
          sx={{
            width: `100%`,
            maxWidth: `1200px`,
            m: `0 auto`,
            p: `5rem 4rem`,
          }}
        >
          <Zoom>
            <InlineWysiwyg name="text" format="html">
              <p
                className="paragraph__text"
                dangerouslySetInnerHTML={{
                  __html: data.text,
                }}
              />
            </InlineWysiwyg>
          </Zoom>
        </div>
      </div>
    </BlocksControls>
  );
}

export const paragraphBlock = {
  Component: Paragraph,
  template: {
    label: "Paragraph",
    defaultItem: {
      text: "Take root and flourish quis nostrum exercitationem ullam corporis suscipit laboriosam culture Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur descended from astronomers encyclopaedia galactica? Nisi ut aliquid ex ea commodi consequatur something incredible is waiting to be known sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ",
    },
    fields: [],
  },
};
