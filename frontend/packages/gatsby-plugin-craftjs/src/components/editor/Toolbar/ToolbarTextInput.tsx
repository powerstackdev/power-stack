import React, { useEffect } from 'react';
import { useState } from 'react';
import { BlockPicker } from 'react-color';
import { useThemeUI } from 'theme-ui'

export type ToolbarTextInputProps = {
  prefix?: string;
  label?: string;
  type: string;
  onChange?: (value: any) => void;
  value?: any;
};
export const ToolbarTextInput = ({
  onChange,
  value,
  prefix,
  label,
  type,
  ...props
}: ToolbarTextInputProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [active, setActive] = useState(false);
  const context = useThemeUI()
  const { theme, colorMode } = context
  useEffect(() => {
    let val = value;
    if (val && type === 'color' || type === 'bg' )
      val = `rgba(${Object.values(value)})`;
    setInternalValue(val);
  }, [value, type]);

  return (
    <div
      style={{ width: '100%', position: 'relative' }}
    >
      {(type === 'color' || type === 'bg') ? (
        <div
          style={{
            zIndex: 99999,
            top: 'calc(100% + 10px)',
            left: '-5%',
          }}
        >
          {label}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(false);
            }}
          ></div>
          <BlockPicker
            color={value}
            colors={Object.values(theme.rawColors)}
            onChange={(color: any) => {
              onChange(color.rgb);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
