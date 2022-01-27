import Zoom from "react-reveal/Zoom";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";
import { Card, Button, Badge, Box, Input } from "theme-ui";
import React from "react";
import { MdEmail } from "react-icons/md"

const SignpostEmailsignup = ({ index, data }) => {

  return (
    <BlocksControls index={index}>
      <Zoom delay={data.delay}>
        <Card className="signpost emailsignup">
          <Badge variant='icon'>
            <MdEmail />
          </Badge>
          <h3>
            <InlineTextarea name="heading" focusRing={false} />
          </h3>
          <em>
            <InlineTextarea name="supporting_copy" focusRing={false} />
          </em>

          <Box as="form" onSubmit={(e) => e.preventDefault()}>
            <Input type={"email"} placeholder={'Email'}/>&nbsp;
            <Button>Sign up</Button>
          </Box>
        </Card>
      </Zoom>
    </BlocksControls>
  );
}

export const signpostEmailsignupBlock = {
  Component: SignpostEmailsignup,
  template: {
    label: "Email Signup",
    defaultItem: {
      _template: "signpostEmailsignup",
      heading: "Sign up to our newsletter",
      supporting_copy: "We won't spam you or share your details with anyone else",
    },
    fields: [],
  },
};

export default signpostEmailsignupBlock