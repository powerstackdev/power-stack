/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

/** @jsx jsx */
import { jsx } from "theme-ui";

import * as React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";

import Header, { AdminHeader } from "../Headers/Header";

const Layout = ({isFull, children, serverData}) => {
  const data = useStaticQuery(graphql`
    query AdminSiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
        <AdminHeader
            siteTitle={data.site.siteMetadata?.title || `Title`}
            serverData={serverData}
        />

      <div
        sx={{
          m: isFull ? `0 auto` : `0 min(5vw, 48px)`
        }}
      >
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
