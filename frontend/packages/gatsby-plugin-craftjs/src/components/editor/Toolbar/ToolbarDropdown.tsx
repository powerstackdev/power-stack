import React from "react"
import { Label, Select } from 'theme-ui'


export const ToolbarDropdown = ({ title, value, onChange, children }: any) => {
  return (
      <>
        <Label>{title}</Label>
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
          {children}
        </Select>
      </>
  );
};
