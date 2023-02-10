import { useNode } from '@craftjs/core';
import { Grid, Slider, Radio, Label, Box } from 'theme-ui';
import React from 'react';

import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarTextInput } from './ToolbarTextInput';


export type ToolbarItemProps = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey?: string;
  index?: number;
  children?: React.ReactNode;
  type: string;
  onChange?: (value: any) => any;
};
export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }));
  const value = Array.isArray(propValue) ? propValue[index] : propValue;

  return (
    <Grid>
      <div>
        {['text', 'color', 'bg', 'number'].includes(type) ? (
          <ToolbarTextInput
            {...props}
            type={type}
            value={value}
            onChange={(value) => {
              setProp((props: any) => {
                if (Array.isArray(propValue)) {
                  props[propKey][index] = onChange ? onChange(value) : value;
                } else {
                  props[propKey] = onChange ? onChange(value) : value;
                }
              }, 500);
            }}
          />
        ) : type === 'slider' ? (
          <>
            {props.label ? (
              <h4>{props.label}</h4>
            ) : null}
            <Slider
              defaultValue={parseInt(value) || 0}
              sx={{
                color: '#3880ff',
                height: 2,
                padding: '5px 0',
                width: '100%'
              }}
              onChange={
                ((event) => {
                  setProp((props: any) => {
                    if (Array.isArray(propValue)) {
                      props[propKey][index] = onChange
                        ? onChange(event.target.value)
                        : event.target.value;
                    } else {
                      props[propKey] = onChange ? onChange(event.target.value) : event.target.value;
                    }
                  }, 1000);
                }) as any
              }
            />
          </>
        ) : type === 'radio' ? (
          <>
            {props.label ? (
              <h4>{props.label}</h4>
            ) : null}
            <Box
              onChange={(e) => {

                const value = e.target.value;
                setProp((props: any) => {
                  props[propKey] = onChange ? onChange(value) : value;
                });
              }}
            > 
              
              {props.children?.map((item, i) => {
                return (
                  <Label>
                    <Radio
                      name={props.label}
                      value={item.props.value}
                      defaultChecked={value === item.props.value ? true : false}
                    />
                    {item.props.label}
                  </Label>
                );
              })}
            </Box>
          </>
        ) : type === 'select' ? (
          <ToolbarDropdown
            value={value || ''}
            onChange={(value) =>
              setProp(
                (props: any) =>
                  (props[propKey] = onChange ? onChange(value) : value)
              )
            }
            {...props}
          />
        ) : null}
      </div>
    </Grid>
  );
};
