
import { Box } from "theme-ui"
import React from 'react';

export type SidebarItemProps = {
  title: string;
  height?: string;
  icon?: string;
  visible?: boolean;
  children?: React.ReactNode;
  onChange?: (bool: boolean) => void;
}

export const SidebarItem = ({
  visible,
  icon,
  title,
  children,
  height,
  onChange,
}: SidebarItemProps) => {
  return (
    <Box
      sx={{
        height: visible && height && height !== 'full' ? height : 'auto',
        flex: visible && height && height !== 'full' ?  `1` : 'unset',
        color: "#545454"
      }}
    >
      <Box
        onClick={() => {
          if (onChange) onChange(!visible);
        }}
        sx={{
          color: '#615c5c',
          height: '45px',
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          svg: {
            fill: '#707070'
          }
        }}
      >
        <h2>{title}</h2>
        <Box
          sx={{
            transform: `rotate(${visible ? 180 : 0}deg)`,
            svg: {
              width: "8px",
              height: "8px"
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
            <title>ChevronDownMedium</title>
            <rect id="ToDelete" fill="#ff13dc" opacity="0" /><path d="M9.99,1.01A.9999.9999,0,0,0,8.28266.30327L5,3.58594,1.71734.30327A.9999.9999,0,1,0,.30327,1.71734L4.29266,5.69673a.99965.99965,0,0,0,1.41468,0L9.69673,1.71734A.99669.99669,0,0,0,9.99,1.01Z" />
          </svg>
        </Box>
      </Box>
      {visible ? (
        <Box
          sx={{
            width: "100%",
            overflow: "auto"
          }}
        >{children}</Box>
      ) : null}
    </Box>
  );
};
