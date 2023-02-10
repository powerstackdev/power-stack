import React from 'react';
import {
  Accordion,
} from 'react-accessible-accordion';
import { ToolbarSection, ToolbarItem } from '../../editor';

export const VideoSettings = () => {
  return (
    <React.Fragment>
      <Accordion>
      <ToolbarSection title="Youtube">
        <ToolbarItem
          full={true}
          propKey="videoId"
          type="text"
          label="Video ID"
        />
      </ToolbarSection>
      </Accordion>
    </React.Fragment>
  );
};
