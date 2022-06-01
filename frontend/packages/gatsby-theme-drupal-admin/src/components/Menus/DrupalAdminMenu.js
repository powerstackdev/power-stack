/** @jsx jsx */
import {jsx} from "theme-ui";
import {Button} from "theme-ui";
import React, {useEffect, useState} from "react";
import {Link} from "gatsby";
import {isLoggedIn} from "@powerstack/drupal-oauth-connector";

export const DrupalAdminMenu = ({serverData}) => {
  return (
    <nav>
      <ul sx={{
        mt: "7px",
        p: 0
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
                    px: 3,
                    fontWeight: 'link'
                  }}
                >
                  <Link sx={{
                    color: `darkGrey`,
                    textDecoration: "none",
                    "&:hover": {
                      color: `primary`
                    }
                  }}
                        to={link.attributes.url}
                  >
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
      </ul>
    </nav>
  );
};
