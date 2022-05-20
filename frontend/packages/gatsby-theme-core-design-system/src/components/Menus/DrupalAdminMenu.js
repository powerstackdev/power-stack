/** @jsx jsx */
import { jsx } from "theme-ui";
import { Button } from "theme-ui";
import { React, useEffect, useState} from "react";
import { Link } from "gatsby";
import { isLoggedIn } from "@powerstack/drupal-oauth-connector";

export const DrupalAdminMenu = ({ serverData }) => {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    isLoggedIn().then( result => {
      setLoggedIn(result)
    })
  }, [])


   return (
    <nav>
      <ul sx={{
        mt: "7px"
      }}>
        {serverData &&
        serverData.data.map((link) => (
          <>
            {link.attributes.parent &&
            link.attributes.parent === "system.admin" ? (
              <li
                key={link.attributes.title}
                sx={{
                  listStyleType: `none`,
                  display: "inline",
                  px: 3
                }}
                >
                <Link sx={{color: `#222`, textDecoration: "none", "&:hover": {color: `#0071e3`}}}
                      to={link.attributes.url}>
                  {link.attributes.title}
                </Link>
                </li>
              ) : (
                <></>
              )}

              {/* {link.links.map((link) => (
                <li
                  key={link.label}
                  style={{
                    listStyleType: `none`,
                    padding: `1rem`,
                  }}
                >
                  <Link style={{ color: `white` }} to={link.url.path}>
                    {link.label}
                  </Link> */}
              {/* <ul>
                    {link.links.map((link) => (
                      <li
                        key={link.label}
                        style={{
                          listStyleType: `none`,
                          padding: `1rem`,
                        }}
                      >
                        <Link style={{ color: `white` }} to={link.url.path}>
                          {link.label}
                        </Link>
                        <ul>
                          {link.links.map((link) => (
                            <li
                              key={link.label}
                              style={{
                                listStyleType: `none`,
                                padding: `1rem`,
                              }}
                            >
                              <Link
                                style={{ color: `white` }}
                                to={link.url.path}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul> */}
            {/* </li>
              ))} */}
          </>
        ))}
        <li sx={{
          listStyleType: `none`,
          display: "inline",
          px: 3
        }}>

          { loggedIn ? <Button variant="primary" sx={{display: "inline"}}> Log out</Button> : <Button>Login</Button> }
        </li>
      </ul>

    </nav>
  );
};
