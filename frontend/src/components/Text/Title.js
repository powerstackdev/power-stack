/** @jsx jsx */
import { jsx } from "theme-ui";

import { InlineText } from "react-tinacms-inline";

export const Title = ({ title }) => {
  return (
    <h1>
      <InlineText name="title" focusRing={{ offset: 0 }} insetControls/>
    </h1>
  );
};
