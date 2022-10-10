/** @jsx jsx */
import { jsx, Heading, Box, Card, Input, Button, Slider, Label, Flex, Textarea, Checkbox, Select, Radio } from "theme-ui"
import React from "react"
import { Tabs, Tab, TabList, TabPanel } from "react-tabs"

import Layout  from "gatsby-theme-drupal-admin/src/components/Layout/Layout"

/**
 * Page template to create a new CMS page with Tina inline blocks enabled
 *
 * @returns {JSX.Element}
 */
const NewPage = () => {
  return (
    <Layout isFull>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr"
        }}
      >
        <aside sx={{
          px: 4,
          background: "white"
        }}>
          <Tabs>
            <TabList sx={{
              p: 0,
              li: {
                display: `inline-block`,
                border: `1px solid transparent`,
                borderBottom: `none`,
                bottom: `-1px`,
                position: `relative`,
                listStyle: `none`,
                padding: `6px 12px`,
                cursor: `pointer`
              }
            }}>
              <Tab>Blocks</Tab>
              <Tab>Page settings</Tab>
            </TabList>
            <TabPanel>
              <Heading>Blocks</Heading>
              <Input placeholder="Search blocks..."/>
              <Heading as="h3">Templates</Heading>
              <Box sx={{
                display: "grid",
                gridTemplateColumns: ["1fr", "1fr", "1fr", "1fr 1fr"],
                div: {
                  m:2
                }
              }}>
                <Card>
                  Test
                </Card>
                <Card>
                  Test 2
                </Card>
                <Card>
                  Test 3
                </Card>
                <Card>
                  Test 4
                </Card>
                <Card>
                  Test 5
                </Card>
                <Card>
                  Test 6
                </Card>
              </Box>
              <Heading as="h3">Components</Heading>
              <Box sx={{
                display: "grid",
                gridTemplateColumns: ["1fr", "1fr", "1fr", "1fr 1fr"],
                div: {
                  m:2
                }
              }}>

                <Card>
                  Test
                </Card>
                <Card>
                  Test 2
                </Card>
                <Card>
                  Test 3
                </Card>
                <Card>
                  Test 4
                </Card>
                <Card>
                  Test 5
                </Card>
                <Card>
                  Test 6
                </Card>
              </Box>
            </TabPanel>
            <TabPanel>
              <Heading>Page settings</Heading>
              <Box as="form" onSubmit={(e) => e.preventDefault()}>
                <Label htmlFor="username">Username</Label>
                <Input name="username" id="username" mb={3} />
                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" id="password" mb={3} />
                <Box>
                  <Label mb={3}>
                    <Checkbox />
                    Remember me
                  </Label>
                </Box>
                <Label htmlFor="sound">Sound</Label>
                <Select name="sound" id="sound" mb={3}>
                  <option>Beep</option>
                  <option>Boop</option>
                  <option>Blip</option>
                </Select>
                <Label htmlFor="comment">Comment</Label>
                <Textarea name="comment" id="comment" rows={6} mb={3} />
                <Flex mb={3}>
                  <Label>
                    <Radio name="letter" /> Alpha
                  </Label>
                  <Label>
                    <Radio name="letter" /> Bravo
                  </Label>
                  <Label>
                    <Radio name="letter" /> Charlie
                  </Label>
                </Flex>
                <Label>Slider</Label>
                <Slider mb={3} />
                <Button>Submit</Button>
              </Box>
            </TabPanel>
          </Tabs>
        </aside>
        <main>
          Canvas
        </main>
        <aside>
          Sidebar
        </aside>
      </div>
      <footer
        sx={{
          width: "100%",
        }}
      >
        Footer
      </footer>
    </Layout>
  )
}

export default NewPage
