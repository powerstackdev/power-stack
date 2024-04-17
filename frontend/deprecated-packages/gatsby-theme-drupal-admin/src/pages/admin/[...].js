import * as React from "react"
import { navigate } from "gatsby"
import absolution from "absolution"
import { useThemeUI } from "theme-ui"

// Internal imports
import Layout from "../../components/Layout/Layout"
import { isLoggedIn } from "@powerstack/drupal-oauth-connector"

const DrupalAdminPage = ({ serverData }) => {
  const context = useThemeUI()

  const parser = new DOMParser()
  const serverHtml = parser.parseFromString(serverData.content, "text/html")
  const serverHead = serverHtml.head.innerHTML
  const title = serverHtml.title

  const convertHeadToAbsolutePaths = absolution(
    serverHead,
    process.env.GATSBY_DRUPAL_HOST
  )
  let html =
    convertHeadToAbsolutePaths +
    '<base target="_parent" />' +
    `
    <style>
      [data-gin-accent] {
        --colorGinAppBackground:${context.theme.rawColors.background}
      }
    </style>`

  const body = absolution(
    serverHtml.body.innerHTML,
    process.env.GATSBY_DRUPAL_HOST,
    { urlAttributes: ["src", "action"] }
  )

  html += body

  const resizeIFrame = () => {
    const iframe = document.getElementById("myIframe")
    iframe !== null
      ? (iframe.style.height =
          iframe.contentWindow.document.body.scrollHeight + "px")
      : null
  }

  return (
    <>
      {!serverData ? (
        navigate("/admin/login", {
          state: { message: "your session has been timed out, please login" },
        })
      ) : (
        <Layout isFull serverData={serverData.adminMenu}>
          <Seo title={title} />
          <iframe
            id="myIframe"
            srcDoc={html}
            width="100%"
            height="100%"
            onLoad={resizeIFrame}
            style={{ border: `none` }}
          />
        </Layout>
      )}
    </>
  )
}

export default DrupalAdminPage

export async function getServerData({ params, headers }) {
  const token = await isLoggedIn(Object.fromEntries(headers).cookie)

  const requestHeaders = {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }

  const currentRoute = `admin/` + params["*"]

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
    ])

    if (!adminMenu.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: {
        adminMenu: await adminMenu.json(),
        content: await content.text(),
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
