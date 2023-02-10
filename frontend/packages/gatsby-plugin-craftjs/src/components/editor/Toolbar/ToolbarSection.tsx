import { useNode } from '@craftjs/core';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import React from 'react';
import { Box } from 'theme-ui';


export const ToolbarSection = ({ title, props, summary, children }: any) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));
  return (
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                      {title}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {children}
                </AccordionItemPanel>
            </AccordionItem>
            
  );
};
