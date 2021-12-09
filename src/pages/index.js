import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const UsingSSR = ({ serverData }) => {
  return (
    <Layout serverData={serverData}>
      <Seo title="Using SSR" />
      <h1>SSR page</h1>
      <p>Welcome to a server side rendered page with a random dog photo</p>
      <p>
        To learn more, head over to our{" "}
        <a href="https://www.gatsbyjs.com/docs/reference/rendering-options/server-side-rendering/">
          documentation about Server Side Rendering
        </a>
        .
      </p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default UsingSSR

export async function getServerData() {
  try {
    const res = await fetch(process.env.GATSBY_DRUPAL_HOST + `/jsonapi/menu_items/admin`, {
      headers: {
        "api-key": "1d30a1ea6ebb5918f5f454cab859055b"
      }
    })
    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
