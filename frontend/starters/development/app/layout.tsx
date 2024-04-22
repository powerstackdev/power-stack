import { DraftAlert } from "@/components/misc/DraftAlert"
import { HeaderNav } from "@/components/navigation/HeaderNav"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";

import "@/styles/globals.css"
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Power Stack Frontend",
    template: "%s | Power Stack Frontend",
  },
  description: "Power Stack Frontend",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <DraftAlert />
        <Toaster position="bottom-right" />
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  )
}
