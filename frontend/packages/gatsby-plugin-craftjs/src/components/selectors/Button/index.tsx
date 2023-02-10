import { UserComponent, useNode } from '@craftjs/core';
import React from 'react';
import { Button as TButton} from 'theme-ui'

import { ButtonSettings } from './ButtonSettings';

import { Text } from '../Text';

type ButtonProps = {
  background?: Record<'r' | 'g' | 'b' | 'a', number>;
  buttonStyle?: string;
  margin?: any[];
  text?: string;
  textComponent?: any;
};

export const Button: UserComponent<ButtonProps> = (props: any) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { text, textComponent, buttonStyle, background, margin, ...otherProps } = props;
  return (
    <TButton
      ref={connect}
      variant={buttonStyle}
      sx={{
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
      }}
      {...otherProps}
    >
      <Text {...textComponent} text={text} />
    </TButton>
  );
};

Button.craft = {
  displayName: 'Button',
  props: {
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    buttonStyle: 'primary',
    text: 'Button',
    margin: ['5', '0', '5', '0'],
    textComponent: {
      ...Text.craft.props,
      textAlign: 'center',
    },
  },
  related: {
    toolbar: ButtonSettings,
  },
};
