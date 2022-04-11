/** @jsx jsx */
import { jsx } from "theme-ui";
import { Grid, Heading } from "theme-ui";

import PropTypes from "prop-types";
import { Link } from "gatsby";
import { DrupalAdminMenu } from "../Menus/DrupalAdminMenu";
import Menu from "gatsby-plugin-drupal-menus";
import Logo from "../../images/quantum.svg";
import { darken } from "@theme-ui/color";

const Header = ({siteTitle, serverData}) => (
  <header
    sx={{
      backgroundImage: (theme) => `linear-gradient(45deg,${theme.rawColors.primary}, ${darken(theme.rawColors.primary, .2)(theme)})`,
      width: `100%`
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
      </Grid>

    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;

export const AdminHeader = ({siteTitle, serverData}) => (
  <header
    sx={{
      backdropFilter: "saturate(180%) blur(20px)",
      background: "rgba(255,255,255,0.72)",
      width: `100%`,
      position: "sticky",
      top: 0,
      zIndex: 1000,
      height: "62px",
      fontSize: "13px"
    }}
  >
    <div
      sx={{
        margin: `0 auto`,
        pt: `7px`
      }}
    >
      <Grid gap={2} columns={[2, "1fr 6fr"]}>
        <Heading as={"h1"} sx={{m: 2}}>
          <Link
            to="/"
            style={{
              color: `#0071e3`,
              textDecoration: `none`,
              verticalAlign: `middle`
            }}
          >

            {siteTitle}
          </Link>
        </Heading>

        <div sx={{
          margin: `0 auto`,
          width: "100%",
          textAlign: "right"
        }}>
          <DrupalAdminMenu serverData={serverData}/>

        </div>
      </Grid>

    </div>
  </header>
);
