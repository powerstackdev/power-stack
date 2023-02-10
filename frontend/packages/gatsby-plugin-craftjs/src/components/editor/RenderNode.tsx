/** @jsx jsx */

import { useNode, useEditor } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { Box, jsx } from "theme-ui"

import ArrowUp from '../../public/icons/arrow-up.svg';
import Delete from '../../public/icons/delete.svg';
import Move from '../../public/icons/move.svg';

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add('component-selected');
      else dom.classList.remove('component-selected');
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement | null) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    const renderer = document

    if ( renderer !== null) {
      renderer.addEventListener('scroll', scroll);

      return () => {
        renderer.removeEventListener('scroll', scroll);
      };
    }
    
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <Box
              ref={currentRef}
              sx={{
                height: "30px",
                mt: "-29px",
                fontSize: "12px",
                lineHeight: "12px",
                svg: {
                  fill: "#fff",
                  width: "15px",
                  height: "15px"
                },
                position: "fixed",
                bg: 'primary',
                display: "flex",
                textAlign: "center",
                color: "white",
                p: 2 
              }}
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
                zIndex: 9999,
              }}
            >
              <span sx={{
                flex: "1 1 0%",
                mr: 2
              }}>{name}</span>
              {moveable ? (
                <span 
                  sx={{
                    padding: "0 0px",
                    opacity: 0.9,
                    display: "flex",
                    alignItems: "center",
                    "> div": {
                      position: "relative",
                      top: "-50%",
                      left: "-50%"
                    },
                    mr: 2,
                    cursor: "move"
                  }}
                  ref={drag}>
                  <Move />
                </span>
              ) : null}
              {id !== ROOT_NODE && (
                <span
                  sx={{
                    padding: "0 0px",
                    opacity: 0.9,
                    display: "flex",
                    alignItems: "center",
                    "> div": {
                      position: "relative",
                      top: "-50%",
                      left: "-50%"
                    },
                    mr: 2,
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    actions.selectNode(parent);
                  }}
                >
                  <ArrowUp />
                </span>
              )}
              {deletable ? (
                <span
                  sx={{
                    padding: "0 0px",
                    opacity: 0.9,
                    display: "flex",
                    alignItems: "center",
                    "> div": {
                      position: "relative",
                      top: "-50%",
                      left: "-50%"
                    },
                    mr: 2,
                    cursor: "pointer"
                  }}
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Delete />
                </span>
              ) : null}
            </Box>,
            document.querySelector('.page-container')
          )
        : null}
      {render}
    </>
  );
};
