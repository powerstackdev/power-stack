/** @jsx jsx */
import { jsx } from 'theme-ui'

import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { DrupalAdminMenu } from "./DrupalAdminMenu"

const Header = ({ siteTitle, serverData }) => (
  <header
    sx={{
      bg: `primary`,
    }}
  >
    <div
      sx={{
        margin: `0 auto`,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <DrupalAdminMenu serverData={serverData} />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
