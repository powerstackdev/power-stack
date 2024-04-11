/** @jsx jsx */
import { jsx } from "theme-ui"

import React, { useEffect, useState } from "react"

import Zoom from "react-reveal/Zoom"
import { BlocksControls } from "react-tinacms-inline"
import { Card, Heading, Message, Paragraph, Spinner } from "theme-ui"
import { isLoggedIn } from "@powerstack/drupal-oauth-connector"

const SignpostDefault = ({ index, data }) => {
  const [drupalData, setDrupalData] = useState()

  useEffect(() => {
    const pageData = async (id) => {
      const token = await isLoggedIn(document.cookie)

      const requestHeaders = {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }

      const response = await fetch(
        process.env.GATSBY_DRUPAL_HOST +
          `/jsonapi/node?filter[drupal_internal__nid]=` +
          id,
        requestHeaders
      )

      const data = await response.json()

      let pageInfo = {
        id: data.data[0].attributes.drupal_internal__nid,
        title: data.data[0].attributes.title,
        summary: data.data[0].attributes.drupal_internal__nid,
        link: `/edit/page/` + data.data[0].attributes.drupal_internal__nid,
      }

      setDrupalData(pageInfo)
    }
    if (data.page_reference) {
      pageData(data.page_reference)
    }
  }, [data.page_reference, setDrupalData])

  const NoResults = () => {
    if (data.page_reference) {
      return <Spinner />
    } else {
      return (
        <Message>
          {" "}
          You need to select a page to reference first. <br />{" "}
          <Paragraph as="small" sx={{ fontStyle: "italic" }}>
            Hint: Select the{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 32 32"
              fill="inherit"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24.3324 8.96875C24.754 9.42578 25 9.95312 25 10.5859C25 11.2188 24.754 11.7461 24.3324 12.168L11.9634 24.543L7.85212 25C7.57101 25 7.36018 24.9297 7.21962 24.7188C7.04392 24.543 6.97365 24.332 7.00878 24.0508L7.46559 20.043L19.8346 7.66797C20.2562 7.24609 20.7833 7 21.4158 7C22.0483 7 22.5754 7.24609 23.0322 7.66797L24.3324 8.96875ZM11.1903 22.9258L20.3968 13.7148L18.2884 11.6055L9.08199 20.8164L8.80088 23.207L11.1903 22.9258ZM23.1376 10.9727C23.243 10.8672 23.3133 10.7266 23.3133 10.5859C23.3133 10.4453 23.243 10.3047 23.1376 10.1641L21.8375 8.86328C21.6969 8.75781 21.5564 8.6875 21.4158 8.6875C21.2753 8.6875 21.1347 8.75781 21.0293 8.86328L19.4832 10.4102L21.5915 12.5195L23.1376 10.9727Z"></path>
            </svg>{" "}
            icon for this element in the menu above.
          </Paragraph>
        </Message>
      )
    }
  }

  return (
    <BlocksControls index={index}>
      <Zoom delay={data.delay}>
        {drupalData ? (
          <Card className="signpost default">
            <Heading>{drupalData.title}</Heading>
            <Heading>{drupalData.subtitle}</Heading>
            <a href={drupalData.link}>Read more</a>
          </Card>
        ) : (
          <NoResults />
        )}
      </Zoom>
    </BlocksControls>
  )
}

const fetchReferences = async () => {
  const token = await isLoggedIn(document.cookie)

  const requestHeaders = {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }

  const response = await fetch(
    process.env.GATSBY_DRUPAL_HOST + `/jsonapi/node?&sort=-changed,-created`,
    requestHeaders
  )

  const data = await response.json()

  let iterator = []

  for (const [key, value] of Object.entries(data.data)) {
    iterator[key] = {
      value: value.attributes.drupal_internal__nid,
      label: value.attributes.title,
    }
  }

  return iterator
}

export const signpostDefaultBlock = {
  Component: SignpostDefault,
  template: {
    label: "Generic Signpost",
    defaultItem: {
      _template: "signpostDefault",
    },
    fields: [
      {
        name: "page_reference",
        label: "Page",
        component: "select",
        options: await fetchReferences(),
      },
    ],
  },
}

export default signpostDefaultBlock
