/** @jsx jsx */
import { jsx } from "theme-ui";
import { Grid, Heading, Flex } from "theme-ui";

import { Link } from "gatsby";
import { DrupalAdminMenu } from "../Menus/DrupalAdminMenu";
import Logo from "../../images/logo.svg";
import LoginLogoutButton from "../Buttons/LoginLogoutButton";
import ToggleColorModeButton from "../Buttons/ToggleColorModeButton";
import SearchButton from "../Buttons/SearchButton";
import NotificationsButton from "../Buttons/NotificationsButton";
import SettingsButton from "../Buttons/SettingsButton";

export const AdminHeader = ({siteTitle, serverData}) => (
  <header
    sx={{
      bg: `white`,
      width: `100%`,
      position: "sticky",
      top: 0,
      zIndex: 1000,
      height: "70px",
      borderBottom: `1px solid lightGrey`,
    }}
  >
    <div
      sx={{
        margin: `0 auto`,
        pt: `7px`
      }}
    >
      <Grid gap={2} columns={[2, "3fr 1fr"]} sx={{m: `0 min(5vw, 48px)`, pt: 2 }}>
        <Flex>
          <Heading as={"h1"} >
            <Link
              to="/"
              style={{
                textDecoration: `none`,
                verticalAlign: `middle`
              }}
            >
              <img src={Logo} alt="logo" sx={{
                height: `35px`
              }} />
            </Link>
          </Heading>

          <DrupalAdminMenu serverData={serverData}/>
        </Flex>

        <div sx={{
          margin: `0 auto`,
          width: "100%",
          textAlign: "right"
        }}>
          <SearchButton />
          <SettingsButton />
          <ToggleColorModeButton />
          <NotificationsButton />
          <LoginLogoutButton />
        </div>
      </Grid>

    </div>
  </header>
);
