import { useNode, useEditor } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button as Btn } from "theme-ui";

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

    const getPos = useCallback((dom: HTMLElement) => {
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
        let el = document.querySelector('.craftjs-renderer')
        if(el) {
            el.addEventListener('scroll', scroll);
        }
        return () => {
            let el = document.querySelector('.craftjs-renderer')
            if(el) {
                el.removeEventListener('scroll', scroll);
            }
        };
    }, [scroll]);

    return (
        <>
            { window && isHover || isActive
                ? ReactDOM.createPortal(
                    <Box
                        ref={currentRef}
                        className="px-2 py-2 text-white bg-primary fixed flex items-center"
                        style={{
                            left: getPos(dom).left,
                            top: getPos(dom).top,
                            zIndex: 9999,
                        }}
                    >
                        <h2 className="flex-1 mr-4">{name}</h2>
                        {moveable ? (
                            <Btn className="mr-2 cursor-move" ref={drag}>
                                Move
                            </Btn>
                        ) : null}
                        {id !== ROOT_NODE && (
                            <Btn
                                className="mr-2 cursor-pointer"
                                onClick={() => {
                                    actions.selectNode(parent);
                                }}
                            >
                                Up
                            </Btn>
                        )}
                        {deletable ? (
                            <Btn
                                className="cursor-pointer"
                                onMouseDown={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    actions.delete(id);
                                }}
                            >
                                Delete
                            </Btn>
                        ) : null}
                    </Box>,
                    document.querySelector('.page-container')
                )
                : null}
            {render}
        </>
    );
};