/** @jsx jsx */
import { jsx } from "theme-ui"
import Zoom from "react-reveal/Zoom"

import { BlocksControls, InlineWysiwyg } from "react-tinacms-inline"

export const EditParagraph = ({ index, data }) => {
  console.log("triggered")
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div>
        <div
          sx={{
            width: `100%`,
            maxWidth: `1200px`,
            m: `0 auto`,
            p: `5rem 4rem`,
            background: `blue`,
          }}
        >
          <Zoom>
            test
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
  )
}
