import * as React from "react";
import { navigate } from "gatsby";
import absolution from "absolution"

import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { isLoggedIn } from "../../services/auth";


const DrupalAdminPage = ({ serverData }) => {
  const html = absolution(serverData.content, process.env.GATSBY_DRUPAL_HOST )

  return (
    <>
     {!serverData ?
       navigate("/admin/login", {
        state: { message: "your session has been timed out, please login" },
      })
      :
      <Layout serverData={serverData.adminMenu}>
        <Seo title="Using SSR" />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
     }
    </>
  );
};

export default DrupalAdminPage;

export async function getServerData({ params, headers }) {

  const token = await isLoggedIn(Object.fromEntries(headers).cookie)


  const requestHeaders = {headers: {
    Authorization: `Bearer ${token.access_token}`
  }}

  const currentRoute = `admin/` + params['*']
  
  try {
    const [adminMenu, content] = await Promise.all([
      fetch(process.env.GATSBY_DRUPAL_HOST + `/jsonapi/menu_items/admin`, requestHeaders),
      fetch(process.env.GATSBY_DRUPAL_HOST + `/`+ currentRoute, requestHeaders),
    ]);

    // if (
    //   adminMenu.status !== 200 ||
    //   adminMenu.status !== 403 ||
    //   content.status !== 200 ||
    //   content.status !== 403
    // ) {
    //   throw new Error(`Response failed`);
    // }

    if (
      !adminMenu.ok
    ) {
      throw new Error(`Response failed`);
    }
    console.log(content)
    return {
      props: {
        adminMenu: await adminMenu.json(),
        content: await content.text()
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
