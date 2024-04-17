"use client";
import { createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
  "#fff8e1",
  "#ffefcc",
  "#ffdd9b",
  "#ffca64",
  "#ffba38",
  "#ffb01b",
  "#ffab09",
  "#e39500",
  "#ca8500",
  "#af7100"
]

const theme = createTheme({
  colors: {
    myColor,
  }
});