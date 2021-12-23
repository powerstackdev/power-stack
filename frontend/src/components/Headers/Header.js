/** @jsx jsx */
import { jsx } from 'theme-ui'

import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Grid } from "theme-ui"
import { DrupalAdminMenu } from "../Menus/DrupalAdminMenu"
import Logo from "../../images/quantum.svg"
import { darken } from "@theme-ui/color";

const Header = ({ siteTitle, serverData }) => (
  <header
    sx={{
      backgroundImage: (theme) => `linear-gradient(45deg, ${theme.colors.primary}, ${darken('primary', .15)(theme)})`,
    }}
  >
    <div
      sx={{
        margin: `0 auto`,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <Grid gap={2} columns={[2, '1fr 4fr']}>
        <h1 style={{ margin: 0 }}>
          <img src={ Logo } height={35} sx={{
            verticalAlign: `middle`
          }} />
          &nbsp;
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
              verticalAlign: `middle`,
            }}
          >

            {siteTitle}
          </Link>
        </h1>
        {serverData && <DrupalAdminMenu serverData={serverData} />}
      </Grid>

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
