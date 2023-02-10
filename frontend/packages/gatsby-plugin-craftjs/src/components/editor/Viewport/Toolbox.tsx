import { Element, useEditor } from '@craftjs/core';
import React from 'react';

import { Box, Link } from "theme-ui"

import ButtonSvg from '../../../public/icons/toolbox/button.svg';
import SquareSvg from '../../../public/icons/toolbox/rectangle.svg';
import TypeSvg from '../../../public/icons/toolbox/text.svg';
import YoutubeSvg from '../../../public/icons/toolbox/video-line.svg';
import { Button } from '../../selectors/Button';
import { Container } from '../../selectors/Container';
import { Text } from '../../selectors/Text';
import { Video } from '../../selectors/Video';

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <Box
      className="toolbox"
      sx={{
        transition: '0.4s cubic-bezier(0.19, 1, 0.22, 1)',
        width: enabled ? `200px` : '0',
        opacity: enabled ? `1` : '0'
      }}
    >
      <div>
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
            <Link move>
              <SquareSvg />
              Container
            </Link>
        </div>
        <div
          ref={(ref) =>
            create(ref, <Text fontSize="14" textAlign="left" text="Hi there" />)
          }
        >
            <Link move>
              <TypeSvg />
              Text
            </Link>
        </div>
        <div ref={(ref) => create(ref, <Button />)}>
            <Link move>
              <ButtonSvg /> Button
            </Link>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
            <Link move>
              <YoutubeSvg />
              Video
            </Link>
        </div>
      </div>
    </Box>
  );
};
