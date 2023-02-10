/** @jsx jsx */
import { SettingsPanel } from "./SettingsPanel"
import { DraggableCard } from "./DraggableCard"
import { Section } from "./Section"
import { Column } from "./Column"
import {
  jsx,
  Card,
  Heading,
  Input,
  Label,
  Box,
  Checkbox,
  Select,
  Textarea,
  Flex,
  Radio,
  Slider,
  Button,
} from "theme-ui"
import { Tabs, Tab, TabList, TabPanel } from "react-tabs"
import { Text } from "./Text"

export const Sidebar = () => {
  return (
    <aside>
      <SettingsPanel />
      <Tabs>
        <TabList
          sx={{
            p: 0,
            li: {
              display: `inline-block`,
              border: `1px solid transparent`,
              borderBottom: `none`,
              bottom: `-1px`,
              position: `relative`,
              listStyle: `none`,
              padding: `6px 12px`,
              cursor: `pointer`,
            },
          }}
        >
          <Tab>Blocks</Tab>
          <Tab>Page settings</Tab>
          <Tab>Global settings</Tab>
        </TabList>
        <TabPanel>
          <Card
            sx={{
              p: 3,
              background: "white",
              height: "calc(100vh - 152px)",
              overflow: "scroll",
            }}
          >
            <Input placeholder="Search " />
            <Heading
              as="h4"
              sx={{
                my: 3,
              }}
            >
              Templates
            </Heading>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: ["1fr", null, null, "1fr 1fr"],
                gridGap: 2,
                div: {
                  my: 2,
                },
              }}
            >
              <DraggableCard component={Text} text={"Lorem Ipsum"}>
                2 column
              </DraggableCard>
            </Box>
            <Heading
              as="h4"
              sx={{
                my: 3,
              }}
            >
              Layout
            </Heading>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: ["1fr", null, null, "1fr 1fr"],
                gridGap: 2,
                div: {
                  my: 2,
                },
              }}
            >
              <DraggableCard component={Section}>Section</DraggableCard>
              <DraggableCard component={Column}>Column</DraggableCard>
            </Box>
            <Heading
              as="h4"
              sx={{
                my: 3,
              }}
            >
              Components
            </Heading>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: ["1fr", null, null, "1fr 1fr"],
                gridGap: 2,
                div: {
                  my: 2,
                },
              }}
            >
              <DraggableCard component={Text}>Text</DraggableCard>
              <DraggableCard component={Text}>Card</DraggableCard>
            </Box>
          </Card>
        </TabPanel>
        <TabPanel>
          <Card
            sx={{
              p: 3,
              background: "white",
              height: "calc(100vh - 152px)",
              overflow: "scroll",
            }}
          >
            <Heading>Page settings</Heading>
            <Box as="form">
              <Label htmlFor="title">Page title</Label>
              <Input name="title" id="title" mb={3} />
              <Button>Submit</Button>
            </Box>
          </Card>
        </TabPanel>
        <TabPanel>
          <Card
            sx={{
              p: 3,
              background: "white",
              height: "calc(100vh - 152px)",
              overflow: "scroll",
            }}
          >
            <Heading>Page settings</Heading>
            <Box as="form">
              <Label htmlFor="title">Page title</Label>
              <Input name="title" id="title" mb={3} />
              <Button>Submit</Button>
            </Box>
          </Card>
        </TabPanel>
      </Tabs>
    </aside>
  )
}
