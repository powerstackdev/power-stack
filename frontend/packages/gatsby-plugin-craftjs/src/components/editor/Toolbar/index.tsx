import { useEditor } from '@craftjs/core';
import React from 'react';
import { Box } from 'theme-ui';

export * from './ToolbarItem';
export * from './ToolbarSection';
export * from './ToolbarTextInput';
export * from './ToolbarDropdown';

export const Toolbar = () => {
  const { active, related } = useEditor((state, query) => {
    // TODO: handle multiple selected elements
    const currentlySelectedNodeId = query.getEvent('selected').first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <Box>
      {active && related.toolbar && React.createElement(related.toolbar)}
      {!active && (
        <Box
          sx={{
            color: 'rgba(0, 0, 0, 0.5607843137254902)',
            px: 5,
            py: 2,
            flex: 1,
            alignItems: 'center',
            textAlign: 'center',
            flexDirection: "column",
            justifyContent: "center",
            fontSize: '11px',
          }}
        >
          <h2>Click on a component to start editing.</h2>
    
        </Box>
      )}
    </Box>
  );
};
