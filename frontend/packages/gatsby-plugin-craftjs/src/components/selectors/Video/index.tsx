import { useNode, useEditor } from '@craftjs/core';
import React from 'react';
import YouTube from 'react-youtube';
import { Box } from 'theme-ui'

import { VideoSettings } from './VideoSettings';

export const Video = (props: any) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { videoId } = props;

  return (
    <Box ref={connect} sx={{
      width: '100%',
      height: '100%',
      "> div": {
        height: "100%"
      },
      "iframe": {
        pointerEvents: enabled ? 'none' : 'auto'
      }
    }}>
      <YouTube
        videoId={videoId}
        opts={{
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

Video.craft = {
  displayName: 'Video',
  props: {
    videoId: 'IwzUs1IMdyQ',
  },
  related: {
    toolbar: VideoSettings,
  },
};
