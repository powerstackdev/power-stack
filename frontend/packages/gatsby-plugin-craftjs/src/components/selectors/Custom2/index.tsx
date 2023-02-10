import { Element, useNode } from '@craftjs/core';
import React from 'react';

import { Container } from '../Container';
import { Video } from '../Video';

export const Custom2VideoDrop = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={connect} >
      {children}
    </div>
  );
};
Custom2VideoDrop.craft = {
  rules: {
    canMoveIn: (nodes, self, helper) => {
      return (
        nodes.every((node) => node.data.type === Video) &&
        helper(self.id).decendants().length === 0
      );
    },
  },
};
export const Custom2 = (props: any) => {
  return (
    <Container {...props}>
        <h2>
          You can only drop
          <br />
          one video here.
        </h2>
      <Element canvas is={Custom2VideoDrop} id="wow">
        <Video />
      </Element>
    </Container>
  );
};

Custom2.craft = {
  ...Container.craft,
  displayName: 'Custom 2',
};
