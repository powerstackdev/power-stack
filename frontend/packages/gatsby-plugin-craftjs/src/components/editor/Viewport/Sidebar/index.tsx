/** @jsx jsx */

import { useEditor } from '@craftjs/core';
import { useState } from 'react';
import { Box, jsx } from 'theme-ui' 

import { SidebarItem } from './SidebarItem';
import { Toolbar } from '../../Toolbar';

export const Sidebar = () => {
  const [toolbarVisible, setToolbarVisible] = useState(true);

  const { nodes, events, options: { enabled} } = useEditor((state) => state);

  let currentNodeTitle;
  
  if (events.selected) {
    const selectedId = [...events.selected][0];
    const selectedNode = Object.values(nodes).find(node => node.id === selectedId);
    currentNodeTitle = selectedNode && selectedNode.data && selectedNode.data.custom.displayName ? selectedNode.data.custom.displayName : selectedNode?.data.name;
  }

  if (currentNodeTitle) {
    return (
      <Box
        sx={{
          width: "280px",
          opacity: enabled ? 1 : 0,
          background: '#fff',
          marginRight: enabled ? 0 : "-280px"
        }}
      >
        <div>
          <SidebarItem
            title={`Edit ${currentNodeTitle}`}
            height={'full'}
            visible={toolbarVisible}
            onChange={(val) => setToolbarVisible(val)}
          >
            <Toolbar />
          </SidebarItem>
        </div>
      </Box>
    );
  } 
  
};
