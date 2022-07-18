/** @jsx jsx */
import { jsx } from "theme-ui";
import Zoom from 'react-reveal/Zoom';

import { BlocksControls, InlineWysiwyg } from "react-tinacms-inline";

export const Paragraph = ({ text }) => (
  <Zoom>
    <p
      className="paragraph__text"
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  </Zoom>
)

export const EditParagraph = ({ index, data }) => {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <InlineWysiwyg name="text" format="html">
       <Paragraph text={data.text} />
      </InlineWysiwyg>
    </BlocksControls>
  )
}
