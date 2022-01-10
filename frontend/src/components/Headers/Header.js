/** @jsx jsx */
import {Button, jsx} from 'theme-ui'

import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Grid } from "theme-ui"
import { DrupalAdminMenu } from "../Menus/DrupalAdminMenu"
import Menu from "gatsby-plugin-drupal-menus";
import Logo from "../../images/quantum.svg"
import { darken } from "@theme-ui/color";
import { isLoggedIn } from "../../services/Auth";

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
      <Grid gap={2} columns={[3, '1fr 6fr 1fr']}>
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
        {serverData
          ?
          <DrupalAdminMenu serverData={serverData} />
          :
          <div sx={{
            a: {
              color: `white`,
              textDecoration: "none"
            },
            nav: {
              ul: {display: "flex", flex: 1, float: "right", listStyle: "none"}
            }
          }}>
            <Menu />
          </div>
        }
        <div sx={{margin: `0 auto`, botton: {verticalAlign: `middle`}}}>
          {
            isLoggedIn() ? <Button variant='secondary'> Log out </Button> :
              <Button>Login</Button>
          }
        </div>
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
