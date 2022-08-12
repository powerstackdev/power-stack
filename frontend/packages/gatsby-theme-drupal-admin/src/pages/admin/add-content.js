/** @jsx jsx */

// External Imports
import { jsx, Card, Divider, Heading, Grid, Box } from "theme-ui"
import React from "react"
import { Link } from "gatsby"

// Internal package imports
import { isLoggedIn } from "@powerstack/drupal-oauth-connector"

// Internal imports
import Layout from "../../components/Layout/Layout"
import Seo from "gatsby-theme-core-design-system/src/components/Misc/Seo"
import ContentCard from "../../components/Cards/ContentCard"

const DrupalAdminPage = ({ serverData }) => {
  return (
    <>
      <Layout serverData={serverData.adminMenu}>
        <Seo title="Content" />
        <Grid gap={2} columns={[2, "1fr 1fr"]} sx={{ my: 4, mx: 0 }}>
          <Heading as={"h1"} sx={{ m: 4, ml: 0 }}>
            Add content
          </Heading>
        </Grid>
        <Divider
          sx={{
            my: 2,
            mb: 4,
          }}
        />
        <Grid gap={2} columns={[2, "1fr 1fr"]} sx={{ my: 4, mx: 0 }}>
          <Heading as={"h2"}>Types</Heading>
        </Grid>
        <Grid gap={2} columns={4} sx={{ my: 4, mx: 0 }}>
          <ContentCard title="Page" />
        </Grid>

        <Grid gap={2} columns={[2, "1fr 1fr"]} sx={{ my: 4, mx: 0 }}>
          <Heading as={"h2"} sx={{ m: 4, ml: 0 }}>
            Templates
          </Heading>
          <Box
            sx={{
              margin: `0 auto`,
              width: "100%",
              m: 4,
              mr: 0,
              textAlign: "right",
            }}
          >
            <Link
              variant="button"
              to={"/edit/new/page"}
              sx={{
                color: "background",
                bg: "primary",
                fontWeight: "link",
                borderRadius: "medium",
                textDecoration: "none",
                py: `12px`,
                px: 3,
                "&:hover": {
                  bg: "text",
                },
              }}
            >
              + Add template
            </Link>
          </Box>
        </Grid>
        <Grid gap={2} columns={4} sx={{ my: 4, mx: 0 }}>
          <ContentCard title="Template 1" type="page" isTemplate />
          <ContentCard title="Template 2" type="page" isTemplate />
          <ContentCard title="Template 3" type="post" isTemplate />
          <ContentCard title="Template 4" type="page" isTemplate />
          <ContentCard title="Template 5" type="page" isTemplate />
          <ContentCard title="Template 6" type="post" isTemplate />
        </Grid>
      </Layout>
    </>
  )
}

export default DrupalAdminPage

export async function getServerData(context) {
  const token = await isLoggedIn(Object.fromEntries(context.headers).cookie)

  const headers = {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }
  try {
    const [adminMenu, content] = await Promise.all([
      fetch(
        process.env.GATSBY_DRUPAL_HOST + `/jsonapi/menu_items/admin`,
        headers
      ),
      fetch(process.env.GATSBY_DRUPAL_HOST + `/jsonapi/node`, headers),
    ])

    if (!adminMenu.ok || !content.ok) {
      throw new Error(`Response failed`)
    }

    return {
      headers: { "Set-Cookie": `access-token=${JSON.stringify(token)}` },
      props: {
        adminMenu: await adminMenu.json(),
        content: await content.json(),
      },
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
