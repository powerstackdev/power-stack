import Zoom from "react-reveal/Zoom"
import { BlocksControls, InlineTextarea } from "react-tinacms-inline"
import { Badge, Box, Button, Card, Input } from "theme-ui"
import React from "react"
import { MdEmail } from "react-icons/md"

const SignpostEmailSignup = ({ index, data }) => {
  return (
    <BlocksControls index={index}>
      <Zoom delay={data.delay}>
        <Card className="signpost emailsignup" sx={{ pt: 3 }}>
          <Badge variant="icon">
            <MdEmail />
          </Badge>
          <Box sx={{ mt: 5 }}>
            <h3>
              <InlineTextarea name="heading" focusRing={false} />
            </h3>
            <em>
              <InlineTextarea name="supporting_copy" focusRing={false} />
            </em>
          </Box>
          <Box as="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 3 }}>
            <Input
              type={"email"}
              placeholder={"Email"}
              sx={{ width: "75%", display: "inline", mr: 3 }}
            />
            <Button type={"submit"}>Sign up</Button>
          </Box>
        </Card>
      </Zoom>
    </BlocksControls>
  )
}

export const signpostEmailSignupBlock = {
  Component: SignpostEmailSignup,
  template: {
    label: "Email Signup",
    defaultItem: {
      _template: "signpostEmailSignup",
      heading: "Sign up to our newsletter",
      supporting_copy:
        "We won't spam you or share your details with anyone else",
    },
    fields: [],
  },
}

export default signpostEmailSignupBlock
