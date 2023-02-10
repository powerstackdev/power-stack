/** @jsx jsx */

import { useEditor } from '@craftjs/core';
import React, { useEffect } from 'react';
import { Container, jsx } from 'theme-ui';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toolbox } from './Toolbox';

type Props = {
  children?: React.ReactNode
};

export const Viewport = ({ children }: Props) => {
  const {
    enabled,
    connectors,
    actions: { setOptions },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      // Notify doc site
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        '*'
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  return (
    <Container>
      <div className="page-container">
        <Header />
        <div
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          <aside
            sx={{
              flexGrow: 1,
              flexBasis: 'sidebar',
            }}>
            <Toolbox />
            <Sidebar />
          </aside>
          <main
            sx={{
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 320,
              ".component-selected:after": {
                content: '" "',
                pointerEvents: "none",
                position: "absolute",
                left: 0,
                top: 0,
                display: "block",
                height: "100%",
                width: "100%",
                border: "1px dashed",
                borderColor: "primary"
              }
            }}>
            <div
              className={
                'craftjs-renderer'}
              ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </Container>
  );
};
