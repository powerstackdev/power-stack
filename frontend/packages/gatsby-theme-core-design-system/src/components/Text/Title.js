/** @jsx jsx */
import { jsx } from "theme-ui"

import { InlineText } from "react-tinacms-inline"
import Zoom from "react-reveal/Zoom"
import { darken } from "@theme-ui/color"

export const Title = ({ title }) => {
  return (
    <div
      className="hero"
      sx={{
        color: `background`,
        backgroundImage: (theme) =>
          `linear-gradient(45deg, ${theme.colors.secondary}, ${darken(
            "secondary",
            0.15
          )(theme)})`,
        textAlign: `center`,
      }}
    >
      <div
        sx={{
          width: `100%`,
          maxWidth: `1200px`,
          m: `0 auto`,
          p: `5rem 4rem`,
        }}
      >
        <Zoom>
          <h1>
            <InlineText name="title" focusRing={{ offset: 0 }} insetControls />
          </h1>
        </Zoom>
      </div>
    </div>
  )
}
