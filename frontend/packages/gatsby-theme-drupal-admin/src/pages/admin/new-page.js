// External Imports
import { Badge, Card, Heading, Switch } from "theme-ui";
import React, { useEffect, useState } from "react";
import { navigate, Link } from "gatsby";

// Internal package imports
import { isLoggedIn } from "@powerstack/drupal-oauth-connector";

// Internal imports
import Layout from "../../components/Layout/Layout";
import Seo from "gatsby-theme-core-design-system/src/components/Misc/Seo";

const DrupalAdminPage = ({serverData}) => {

  return (
    <>
      <Layout serverData={serverData.adminMenu}>
        <Seo title="Content"/>
        <Heading as={"h1"} sx={{m: 4, ml: 0}}>Create a new page</Heading>
        <Heading as={"h2"} sx={{m: 4, ml: 0}}>Types</Heading>
        <Card sx={{
          p: 5,
        }}>
          Create
        </Card>
        <Heading as={"h2"} sx={{m: 4, ml: 0}} >Templates</Heading>
        <Card sx={{
          p: 5,
        }}>
          Create
        </Card>
      </Layout>
    </>
  );
};

export default DrupalAdminPage;

export async function getServerData(context) {
  const token = await isLoggedIn(Object.fromEntries(context.headers).cookie);

  const headers = {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  };
  try {
    const [adminMenu, content] = await Promise.all([
      fetch(
        process.env.GATSBY_DRUPAL_HOST + `/jsonapi/menu_items/admin`,
        headers
      ),
      fetch(process.env.GATSBY_DRUPAL_HOST + `/jsonapi/node`, headers),
    ]);

    if (!adminMenu.ok || !content.ok) {
      throw new Error(`Response failed`);
    }

    return {
      headers: {"Set-Cookie": `access-token=${JSON.stringify(token)}`},
      props: {
        adminMenu: await adminMenu.json(),
        content: await content.json(),
      },
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
