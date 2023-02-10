/** @jsx jsx */
import { Button, Card, jsx } from "theme-ui"
import React, { useState } from "react"

import { Editor, Element, Frame } from "@craftjs/core"

import Layout from "gatsby-theme-drupal-admin/src/components/Layout/Layout"
import { Section } from "../../../components/Section"
import { Column } from "../../../components/Column"
import { Sidebar } from "../../../components/Sidebar"
import { Text } from "../../../components/Text"
import { RenderNode } from "../../../components/RenderNode";

/**
 * Page template to create a new CMS page with Tina inline blocks enabled
 *
 * @returns {JSX.Element}
 */
const NewPage = () => {
  const [canvasFullscreen, setCanvasFullscreen] = useState(false)

  const toggleFullscreen = (event) => {
    setCanvasFullscreen(!canvasFullscreen)
  }

  return (
    <Layout isFull>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr",
          minHeight: "100%",
          mt: 3,
        }}
      >
        <Editor resolver={{ Text, Section, Column }} onRender={RenderNode}>
          <Sidebar />
          <main
            sx={{
              mx: 4,
              height: "calc(100vh - 152px)",
            }}
          >
            <Button
              onClick={toggleFullscreen}
              sx={{
                position: `${canvasFullscreen && "fixed"}`,
                top: `${canvasFullscreen && 3}`,
                right: `${canvasFullscreen && 3}`,
                zIndex: `${canvasFullscreen && 1002}`,
              }}
            >
              {!canvasFullscreen ? "Fullscreen" : "Minimize"}
            </Button>
            <Card
              sx={{
                width: "100%",
                height: "100%",
                position: `${canvasFullscreen && "fixed"}`,
                top: `${canvasFullscreen && 0}`,
                left: `${canvasFullscreen && 0}`,
                zIndex: `${canvasFullscreen && 1001}`,
              }}
              className={"page-container"}
            >
              <header
                sx={{
                  background: "primary",
                  color: "white",
                  p: 3,
                }}
              >
                Header
              </header>
              <Frame>
                <Element is={'div'} canvas>
                  <Element id="sections" is={Section} canvas>

                  </Element>
                  <Text>Test text</Text>
                  <Text>Test text 2</Text>
                  <Text>Test text 3</Text>
                </Element>
              </Frame>
              <footer>Site Footer</footer>
            </Card>

            <footer
              sx={{
                width: "100%",
                bottom: 0,
              }}
            >
              Footer
            </footer>
          </main>
        </Editor>
      </div>
    </Layout>
  )
}

export default NewPage
