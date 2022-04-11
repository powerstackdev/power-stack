import * as React from "react";
import { navigate } from "gatsby";
import absolution from "absolution";

import Layout from "gatsby-theme-core-design-system/src/components/Layout/Layout";
import Seo from "gatsby-theme-core-design-system/src/components/Misc/Seo";
import { isLoggedIn } from "@powerstack/drupal-oauth-connector";

const DrupalAdminPage = ({serverData}) => {
  const html = absolution(serverData.content, process.env.GATSBY_DRUPAL_HOST);

  return (
    <>
      {!serverData ? (
        navigate("/admin/login", {
          state: {message: "your session has been timed out, please login"},
        })
      ) : (
        <Layout isAdmin serverData={serverData.adminMenu}>
          <Seo title="Using SSR"/>
          <div dangerouslySetInnerHTML={{__html: html}}/>
        </Layout>
      )}
    </>
  );
};

export default DrupalAdminPage;

export async function getServerData({params, headers}) {
  const token = await isLoggedIn(Object.fromEntries(headers).cookie);

  const requestHeaders = {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  const currentRoute = `admin/` + params["*"];

  try {
    const [adminMenu, content] = await Promise.all([
      fetch(
        process.env.GATSBY_DRUPAL_HOST + `/jsonapi/menu_items/admin`,
        requestHeaders
      ),
      fetch(
        process.env.GATSBY_DRUPAL_HOST + `/` + currentRoute,
        requestHeaders
      ),
    ]);

    // if (
    //   adminMenu.status !== 200 ||
    //   adminMenu.status !== 403 ||
    //   content.status !== 200 ||
    //   content.status !== 403
    // ) {
    //   throw new Error(`Response failed`);
    // }

    if (!adminMenu.ok) {
      throw new Error(`Response failed`);
    }
    return {
      props: {
        adminMenu: await adminMenu.json(),
        content: await content.text(),
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
