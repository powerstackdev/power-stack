/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"

import Header, { AdminHeader } from "../Headers/Header"

const Layout = ({ isAdmin, children, serverData }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      {isAdmin ? (
        <AdminHeader
          siteTitle={data.site.siteMetadata?.title || `Title`}
          serverData={serverData}
        />
      ) : (
        <Header
          siteTitle={data.site.siteMetadata?.title || `Title`}
          serverData={serverData}
        />
      )}

      <div
        style={{
          margin: `0 auto`,
          maxWidth: `1200px`,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
